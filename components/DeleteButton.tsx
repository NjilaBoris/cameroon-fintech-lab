// components/delete-article-button.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteArticle } from "@/lib/actions/article.action";
import { ConfirmDialog } from "./ConfirmDialog";


export function DeleteArticleButton({ articleId }: { articleId: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleConfirm() {
    setPending(true);
    setError(null);
    try {
      await deleteArticle(articleId);
      setOpen(false);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete");
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <button
        disabled={pending}
        className="text-red-600 underline disabled:opacity-50"
        onClick={() => setOpen(true)}
      >
        Delete
      </button>

      <ConfirmDialog
        open={open}
        title="Delete this article?"
        description={
          error ??
          "This will permanently remove the article and its cover image. This cannot be undone."
        }
        confirmLabel="Delete"
        destructive
        pending={pending}
        onConfirm={handleConfirm}
        onCancel={() => !pending && setOpen(false)}
      />
    </>
  );
}