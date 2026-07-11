"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useTransition, useRef } from "react";
import { IconSearch, IconX, IconLoader2 } from "@tabler/icons-react";

export function ArticlesSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentQuery = searchParams.get("query") ?? "";

  const handleChange = useCallback(
    (value: string) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
          params.set("query", value);
        } else {
          params.delete("query");
        }
        params.delete("page"); 
        startTransition(() => {
          router.push(`${pathname}?${params.toString()}`);
        });
      }, 350); 
    },
    [router, pathname, searchParams],
  );

  function handleClear() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("query");
    params.delete("page");
    startTransition(() => router.push(`${pathname}?${params.toString()}`));
  }

  return (
    <div className="relative w-full max-w-xl">
      <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
        {isPending ? (
          <IconLoader2 className="size-4 text-[#00A878] animate-spin" />
        ) : (
          <IconSearch className="size-4 text-zinc-400" />
        )}
      </div>
      <input
        type="text"
        defaultValue={currentQuery}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Search articles by title or content…"
        className="w-full rounded-xl border border-zinc-200 bg-white py-3 pl-11 pr-10 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm transition focus:border-[#00A878] focus:outline-none focus:ring-2 focus:ring-[#00A878]/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
      />
      {currentQuery && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-3 flex items-center text-zinc-400 hover:text-zinc-600"
          aria-label="Clear search"
        >
          <IconX className="size-4" />
        </button>
      )}
    </div>
  );
}