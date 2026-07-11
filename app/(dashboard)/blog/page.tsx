import ArticleForm from "@/components/ArticleForm";
import { createArticle } from "@/lib/actions/article.action";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


export default async function NewArticlePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  
    if (!session) return redirect("/login");
  return (
    <main className="px-4 py-10">
      <ArticleForm action={createArticle} submitLabel="Publish article" />
    </main>
  );
}