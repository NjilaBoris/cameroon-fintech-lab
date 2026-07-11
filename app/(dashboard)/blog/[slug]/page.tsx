// app/(root)/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import { getArticleBySlug } from "@/lib/actions/article.action";
import { ShareSidebar } from "@/components/ShareSideBar";
import { DownloadPdfButton } from "@/components/DownloadPdfButton";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article || !article.published) notFound();

  return (
    <>

      <ShareSidebar title={article.title} slug={article.slug} />

      <main className="mx-auto max-w-3xl px-4 py-10
        xl:pr-20"> 

        <div id="article-content">
          {article.coverImage && (
            <div className="relative mb-6 h-72 w-full overflow-hidden rounded-lg">
              <Image
                src={article.coverImage}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <h1 className="mb-2 mt-2 text-4xl font-bold">{article.title}</h1>

          <p className="mb-8 text-sm text-zinc-500">
            By {article.author?.name ?? "Unknown"} ·{" "}
            {new Date(article.createdAt).toLocaleDateString()}
          </p>

          <div className="whitespace-pre-wrap text-zinc-800 dark:text-zinc-200">
            {article.content}
          </div>
        </div>
        <div className="mt-10 flex justify-end border-t border-zinc-100 pt-6 dark:border-zinc-800
          mb-20 xl:mb-0"> 
          <DownloadPdfButton title={article.title} contentId="article-content" />
        </div>
      </main>
    </>
  );
}