// components/delete-article-button.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteArticle } from "@/lib/actions/article.action";


export function DeleteArticleButton({ articleId }: { articleId: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  return (
    <button
      disabled={pending}
      className="text-red-600 underline disabled:opacity-50"
      onClick={async () => {
        if (!confirm("Delete this article? This cannot be undone.")) return;
        setPending(true);
        try {
          await deleteArticle(articleId);
          router.refresh();
        } catch (err) {
          alert(err instanceof Error ? err.message : "Failed to delete");
        } finally {
          setPending(false);
        }
      }}
    >
      {pending ? "Deleting..." : "Delete"}
    </button>
  );
}