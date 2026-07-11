// components/Pagination.tsx
"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

type PaginationProps = {
  page: number;
  totalPages: number;
};

function buildHref(pathname: string, searchParams: URLSearchParams, page: number) {
  const params = new URLSearchParams(searchParams.toString());
  params.set("page", String(page));
  return `${pathname}?${params.toString()}`;
}

function getPageWindow(current: number, total: number): (number | "...")[] {
  const delta = 1;
  const range: (number | "...")[] = [1];
  const left = Math.max(2, current - delta);
  const right = Math.min(total - 1, current + delta);

  if (left > 2) range.push("...");
  for (let i = left; i <= right; i++) range.push(i);
  if (right < total - 1) range.push("...");
  if (total > 1) range.push(total);

  return range;
}

export default function Pagination({ page, totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;
  const pageNumbers = getPageWindow(page, totalPages);

  return (
    <nav
      className="flex items-center justify-center gap-2 py-8"
      aria-label="Pagination"
    >
      {/* Prev */}
      {canGoPrev ? (
        <Link
          href={buildHref(pathname, searchParams, page - 1)}
          className="flex items-center gap-1 rounded-md px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <IconChevronLeft className="size-4" />
          Prev
        </Link>
      ) : (
        <span className="flex items-center gap-1 rounded-md px-3 py-1.5 text-sm text-gray-300 cursor-not-allowed">
          <IconChevronLeft className="size-4" />
          Prev
        </span>
      )}

      {/* Page numbers */}
      {pageNumbers.map((p, i) =>
        p === "..." ? (
          <span
            key={`ellipsis-${i}`}
            className="px-2 text-sm text-gray-400 select-none"
          >
            …
          </span>
        ) : (
          <Link
            key={p}
            href={buildHref(pathname, searchParams, p)}
            className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
              p === page
                ? "bg-[#0B1D3A] text-white font-medium"
                : "text-gray-600 hover:bg-gray-100 border border-zinc-200"
            }`}
          >
            {p}
          </Link>
        ),
      )}

      {/* Next */}
      {canGoNext ? (
        <Link
          href={buildHref(pathname, searchParams, page + 1)}
          className="flex items-center gap-1 rounded-md px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 transition-colors"
        >
          Next
          <IconChevronRight className="size-4" />
        </Link>
      ) : (
        <span className="flex items-center gap-1 rounded-md px-3 py-1.5 text-sm text-gray-300 cursor-not-allowed">
          Next
          <IconChevronRight className="size-4" />
        </span>
      )}
    </nav>
  );
}