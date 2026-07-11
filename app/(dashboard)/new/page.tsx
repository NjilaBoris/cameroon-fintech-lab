// app/dashboard/page.tsx
import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getArticles } from "@/lib/actions/article.action";
import { SortSelect } from "@/components/SortSelect";

import { redirect } from "next/navigation";

import Image from "next/image";
import LogOutButton from "@/components/LogoutButton";
import { DeleteArticleButton } from "@/components/DeleteButton";


export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; sort?: string }>;
}) {
  const { page, sort } = await searchParams;
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) return redirect("/login");

  const [sortBy, sortOrder] = (sort ?? "createdAt-desc").split("-") as [
    "createdAt" | "title",
    "asc" | "desc",
  ];

  const { items, page: currentPage, totalPages, total } = await getArticles({
    page: page ? Number(page) : 1,
    pageSize: 8,
    sortBy,
    sortOrder,
    authorId: session.user.id,
    publishedOnly: false,
  });


  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">My articles</h1>
          <p className="text-sm text-zinc-500">
            {total} article{total === 1 ? "" : "s"} total
          </p>
        </div>
        <div className="flex items-center gap-3">
          <SortSelect />
          <Link
            href="/blog"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            New article
          </Link>
          {session && <Image src={session.user.image!} className="rounded-full" alt="User avatar" width={32} height={32} /> && <LogOutButton/>}
        </div>
      </div>

      <div className="space-y-3">
        {items.length === 0 && (
          <p className="text-zinc-500">You haven&apos;t written anything yet.</p>
        )}

        {items.map((article) => (
          <div key={article.id} className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <div className="flex items-center gap-2">
                <p className="font-medium">{article.title}</p>
                {!article.published && (
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                    Draft
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs text-zinc-500">
                {new Date(article.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-3 text-sm">
              <Link href={`/blog/${article.slug}`} className="underline">View</Link>
              <Link href={`/blog/${article.id}/edit`} className="underline">Edit</Link>
              <DeleteArticleButton articleId={article.id} />
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/new?page=${p}${sort ? `&sort=${sort}` : ""}`}
              className={`rounded-md px-3 py-1 text-sm ${
                p === currentPage
                  ? "bg-indigo-600 text-white"
                  : "border text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            >
              {p}
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}