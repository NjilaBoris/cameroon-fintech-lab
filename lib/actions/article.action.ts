"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import anyAscii from "any-ascii";

import { headers } from "next/headers";
import { eq, and, asc, desc, count, or, ilike } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import cloudinary from "../cloudinary";


interface CloudinaryResult {
  public_id: string;
  secure_url: string;
  [key: string]: any;
}

export type ArticleFormState = {
  error?: string;
};



function slugify(title: string) {
  const ascii = anyAscii(title);
  return ascii
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

async function uniqueSlug(title: string) {
  const base = slugify(title);
  let slug = base;
  let i = 1;
  while (await db.query.posts.findFirst({ where: eq(posts.slug, slug) })) {
    slug = `${base}-${i++}`;
  }
  return slug;
}



export async function createArticle(
  _prevState: ArticleFormState,
  formData: FormData,
): Promise<ArticleFormState> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return { error: "You must be signed in to publish an article" };

  const title = (formData.get("title") as string)?.trim();
  const content = (formData.get("content") as string)?.trim();
  const file = formData.get("file") as File | null;

  if (!title) return { error: "Title is required" };
  if (!content) return { error: "Content is required" };
  if (!file || file.size === 0) return { error: "Cover image is required" };
  if (!file.type.startsWith("image/")) return { error: "Only image files are allowed" };
  if (file.size > 4 * 1024 * 1024) return { error: "Image must be under 4MB" };

  let uploadResult: CloudinaryResult;
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    uploadResult = await new Promise<CloudinaryResult>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "mbiparlementaire", resource_type: "image" },
        (error, result) => (error ? reject(error) : resolve(result as CloudinaryResult)),
      );
      stream.end(buffer);
    });
  } catch (err) {
    console.error("Cloudinary upload failed:", err);
    return { error: "Image upload failed. Please try again." };
  }

  const slug = await uniqueSlug(title);

  try {
    await db.insert(posts).values({
      title,
      slug,
      content,
      coverImage: uploadResult.secure_url,
      coverImagePublicId: uploadResult.public_id,
      authorId: session.user.id,
    });
  } catch (err) {
    console.error("Failed to save article:", err);
    return { error: "Failed to save the article. Please try again." };
  }

  revalidatePath("/blog");
  redirect(`/blog/${slug}`);
}



type SortField = "createdAt" | "updatedAt" | "title";
type SortOrder = "asc" | "desc";

const SORT_COLUMNS = {
  createdAt: posts.createdAt,
  updatedAt: posts.updatedAt,
  title: posts.title,
} as const;

export type GetArticlesParams = {
  page?: number;
  pageSize?: number;
  sortBy?: SortField;
  sortOrder?: SortOrder;
  category?: string;
  publishedOnly?: boolean;
  authorId?: string;
  query?: string; // ← new
};

export async function getArticles({
  page = 1,
  pageSize = 10,
  sortBy = "createdAt",
  sortOrder = "desc",
  publishedOnly = true,
  authorId,
  query,
}: GetArticlesParams = {}) {
  const safePage = Math.max(1, page);
  const safePageSize = Math.min(Math.max(1, pageSize), 50);
  const offset = (safePage - 1) * safePageSize;

  const column = SORT_COLUMNS[sortBy] ?? posts.createdAt;
  const orderFn = sortOrder === "asc" ? asc : desc;

  const conditions = [];
  if (publishedOnly) conditions.push(eq(posts.published, true));
  if (authorId) conditions.push(eq(posts.authorId, authorId));
 
  if (query?.trim()) {
    conditions.push(
      or(
        ilike(posts.title, `%${query.trim()}%`),
        ilike(posts.content, `%${query.trim()}%`),
      ),
    );
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  const [items, totalResult] = await Promise.all([
    db.query.posts.findMany({
      where: whereClause,
      orderBy: [orderFn(column)],
      limit: safePageSize,
      offset,
      with: { author: true },
    }),
    whereClause
      ? db.select({ value: count() }).from(posts).where(whereClause)
      : db.select({ value: count() }).from(posts),
  ]);

  const total = totalResult[0]?.value ?? 0;
  return {
    items,
    page: safePage,
    pageSize: safePageSize,
    total,
    totalPages: Math.max(1, Math.ceil(total / safePageSize)),
  };
}



export async function getArticleById(id: string) {
  return db.query.posts.findFirst({
    where: eq(posts.id, id),
    with: { author: true },
  });
}

export async function getArticleBySlug(slug: string) {
  return db.query.posts.findFirst({
    where: eq(posts.slug, slug),
    with: { author: true },
  });
}



export async function updateArticle(
  id: string,
  _prevState: ArticleFormState,
  formData: FormData,
): Promise<ArticleFormState> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return { error: "You must be signed in to edit an article" };

  const existing = await db.query.posts.findFirst({ where: eq(posts.id, id) });
  if (!existing) return { error: "Article not found" };
  if (existing.authorId !== session.user.id) {
    return { error: "You can only edit your own articles" };
  }

  const title = (formData.get("title") as string)?.trim();
  const content = (formData.get("content") as string)?.trim();
  const file = formData.get("file") as File | null;

  if (!title) return { error: "Title is required" };
  if (!content) return { error: "Content is required" };
 

  let coverImage = existing.coverImage;
  let coverImagePublicId = existing.coverImagePublicId;

  // Only touch Cloudinary if the user actually picked a new file
  if (file && file.size > 0) {
    if (!file.type.startsWith("image/")) return { error: "Only image files are allowed" };
    if (file.size > 4 * 1024 * 1024) return { error: "Image must be under 4MB" };

    try {
      const buffer = Buffer.from(await file.arrayBuffer());
      const uploadResult = await new Promise<CloudinaryResult>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "mbiparlementaire", resource_type: "image" },
          (error, result) => (error ? reject(error) : resolve(result as CloudinaryResult)),
        );
        stream.end(buffer);
      });

      
      if (existing.coverImagePublicId) {
        await cloudinary.uploader.destroy(existing.coverImagePublicId).catch(() => null);
      }

      coverImage = uploadResult.secure_url;
      coverImagePublicId = uploadResult.public_id;
    } catch (err) {
      console.error("Cloudinary upload failed:", err);
      return { error: "Image upload failed. Please try again." };
    }
  }


  let slug = existing.slug;
  if (slugify(title) !== slugify(existing.title)) {
    slug = await uniqueSlug(title);
  }

  try {
    await db
      .update(posts)
      .set({ title, slug, content, coverImage, coverImagePublicId })
      .where(eq(posts.id, id));
  } catch (err) {
    console.error("Failed to update article:", err);
    return { error: "Failed to update the article. Please try again." };
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  redirect(`/blog/${slug}`);
}



export async function deleteArticle(id: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Unauthorized");

  const existing = await db.query.posts.findFirst({ where: eq(posts.id, id) });
  if (!existing) throw new Error("Article not found");
  if (existing.authorId !== session.user.id) {
    throw new Error("You can only delete your own articles");
  }

  if (existing.coverImagePublicId) {
    await cloudinary.uploader.destroy(existing.coverImagePublicId).catch((err) => {
      console.error("Failed to delete Cloudinary image:", err);
    });
  }

  await db.delete(posts).where(eq(posts.id, id));

  revalidatePath("/blog");
  revalidatePath("/new");
}