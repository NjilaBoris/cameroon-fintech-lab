// app/page.tsx
import { ArticlesSearch } from "@/components/ArticleSearch";
import { Card } from "@/components/Card";
import Pagination from "@/components/Pagination";

import { getArticles } from "@/lib/actions/article.action";
import { IconArticle } from "@tabler/icons-react";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Cameroon Fintech lab | Home",
  description:
    "Latest news and insights on fintech in Cameroon.",

};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    query?: string;
    category?: string;
  }>;
}) {
  const { page, query, category } = await searchParams;

  const { items, page: currentPage, totalPages, total } = await getArticles({
    page: Number(page) || 1,
    pageSize: 12,
    query,
    category,
    sortBy: "createdAt",
    sortOrder: "desc",
    publishedOnly: true,
  });

  return (
    <main className="min-h-screen ">

      <div className="pt-15">
        <div className="mx-auto max-w-6xl px-6 sm:px-10 py-16 sm:py-20">
          <p className="text-[#00A878] text-xs font-mono tracking-[0.25em] uppercase mb-3">
            Cameroon Fintech Lab
          </p>
          <h1 className="text-4xl sm:text-5xl font-extralight  leading-tight mb-4">
            Latest Events
          </h1>
          <p className="text-slate-400 font-light mb-10 max-w-lg">
            stay updated with the latest news and insights on fintech in Cameroon. Explore our articles to learn more about the industry, trends, and developments shaping the future of finance in the country.
          </p>
          <ArticlesSearch />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 sm:px-10 py-10">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          
          <p className="text-sm text-zinc-500 flex-shrink-0">
            {total} event{total !== 1 ? "s" : ""}
            {query && (
              <span>
                {" "}for{" "}
                <span className="font-medium text-[#0B1D3A]">
                  &ldquo;{query}&rdquo;
                </span>
              </span>
            )}
          </p>
        </div>

        
        {items.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <IconArticle stroke={2} />
            <h2 className="text-xl font-light text-zinc-600 mb-2">
              No events found
            </h2>
            <p className="text-sm text-zinc-400 max-w-xs">
              {query
                ? `Nothing matched "${query}". Try a different search term or clear the filter.`
                : "No events have been published yet."}
            </p>
          </div>
        )}

        {/* ── Article grid ── */}
        {items.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {items.map((article) => (
              <Card
                key={article.id}
                slug={article.slug}
                title={article.title}
                coverImage={article.coverImage}
                createdAt={article.createdAt}
              />
            ))}
          </div>
        )}

       
        <Pagination page={currentPage} totalPages={totalPages} />
      </div>
    </main>
  );
}