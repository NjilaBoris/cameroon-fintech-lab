// components/sort-select.tsx
"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

const SORT_OPTIONS = [
  { value: "createdAt-desc", label: "Newest first" },
  { value: "createdAt-asc", label: "Oldest first" },
  { value: "title-asc", label: "Title (A–Z)" },
  { value: "title-desc", label: "Title (Z–A)" },
];

export function SortSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get("sort") ?? "createdAt-desc";

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="text-sm text-zinc-500">Sort by</label>
      <select
        id="sort"
        value={current}
        onChange={(e) => handleChange(e.target.value)}
        className="rounded-md border px-2 py-1 text-sm"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}