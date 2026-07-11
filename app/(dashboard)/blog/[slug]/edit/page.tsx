// app/dashboard/[id]/edit/page.tsx
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getArticleById, updateArticle } from "@/lib/actions/article.action";
import ArticleForm from "@/components/ArticleForm";


export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await auth.api.getSession({ headers: await headers() });
  const article = await getArticleById(slug);

  if (!article) notFound();
  if (!session || article.authorId !== session.user.id) notFound();

  const action = updateArticle.bind(null, article.id);

  return (
    <main className="px-4 py-10">
      <ArticleForm
        action={action}
        defaultValues={{
          title: article.title,
          content: article.content,
          coverImage: article.coverImage,
        }}
        submitLabel="Save changes"
        imageRequired={false}
      />
    </main>
  );
}