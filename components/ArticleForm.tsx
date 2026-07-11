
"use client";
import { ImagePlus, X, Loader2 } from "lucide-react";
import { useActionState, useRef, useState, type DragEvent } from "react";
import Image from "next/image";
import { ArticleFormState } from "@/lib/actions/article.action";


const initialState: ArticleFormState = {};

type ArticleFormProps = {
  action: (prevState: ArticleFormState, formData: FormData) => Promise<ArticleFormState>;
  defaultValues?: {
    title?: string;
    content?: string;
    category?: string;
    coverImage?: string | null;
  };
  submitLabel?: string;
  imageRequired?: boolean;
};

export default function ArticleForm({
  action,
  defaultValues,
  submitLabel = "Publish article",
  imageRequired = true,
}: ArticleFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);
  const [category, setCategory] = useState(defaultValues?.category ?? "politics");
  const [preview, setPreview] = useState<string | null>(defaultValues?.coverImage ?? null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function setFile(file: File | null) {
    if (!file) {
      setPreview(defaultValues?.coverImage ?? null);
      return;
    }
    if (fileInputRef.current) {
      const dt = new DataTransfer();
      dt.items.add(file);
      fileInputRef.current.files = dt.files;
    }
    setPreview(URL.createObjectURL(file));
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) setFile(file);
  }

  function handleReset() {
    setPreview(defaultValues?.coverImage ?? null);
    setCategory(defaultValues?.category ?? "politics");
  }

  return (
    <form
      action={formAction}
      onReset={handleReset}
      className="mx-auto w-full max-w-2xl space-y-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-8"
    >
      <div className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          {defaultValues ? "Edit article" : "New article"}
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Fields marked with an asterisk are required.
        </p>
      </div>

      {state.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-950/40 dark:text-red-400">
          {state.error}
        </p>
      )}

      {/* Cover image */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Cover image {imageRequired && <span className="text-red-500">*</span>}
        </label>

        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="relative flex h-56 cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border-2 border-dashed text-center transition hover:border-indigo-400 sm:h-72"
        >
          {preview ? (
            <>
              <Image src={preview} alt="Cover preview" fill className="object-cover" />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="absolute right-2 top-2 z-10 rounded-full bg-black/70 p-1 text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </>
          ) : (
            <>
              <ImagePlus className="h-7 w-7 text-zinc-400" />
              <p className="text-sm text-zinc-600 dark:text-zinc-300">
                <span className="font-medium text-indigo-600 dark:text-indigo-400">
                  Click to upload
                </span>{" "}
                or drag an image here
              </p>
            </>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          name="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
        {defaultValues && (
          <p className="text-xs text-zinc-500">
            Leave unchanged to keep the current image — only upload a new one to replace it.
          </p>
        )}
      </div>

      {/* Title */}
      <div className="space-y-1.5">
        <label htmlFor="title" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          type="text"
          name="title"
          defaultValue={defaultValues?.title}
          placeholder="Give your article a clear, specific title"
          required
          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
        />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="content" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Content <span className="text-red-500">*</span>
        </label>
        <textarea
          id="content"
          name="content"
          defaultValue={defaultValues?.content}
          placeholder="Write the article body here…"
          required
          rows={10}
          className="w-full resize-y rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
        />
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-zinc-100 pt-6 dark:border-zinc-800">
        <button
          type="reset"
          className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          Reset
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          {isPending ? "Saving…" : submitLabel}
        </button>
      </div>
    </form>
  );
}