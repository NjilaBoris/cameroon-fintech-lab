// components/Card.tsx
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import { IconArrowRight } from "@tabler/icons-react";


type CardProps = {
  slug: string;
  title: string;
  coverImage: string | null;
  createdAt: Date | string;
};

export const Card = ({ slug, title,  coverImage, createdAt }: CardProps) => {
  const href = `/blog/${slug}`;

  return (
    <div className="group flex h-full w-full flex-col gap-3">
      <Link href={href}>
        <div className="relative h-50 w-full flex-1 overflow-hidden rounded-md bg-zinc-100">
          {coverImage ? (
            <Image src={coverImage} alt={title} fill className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-zinc-400">
              No image
            </div>
          )}
        </div>
      </Link>
      <div className="flex flex-2 flex-col gap-1">
        <Link href={href}>
          <div className="font-inter space-x-1 text-xs text-gray-600">
            <span>{dayjs(createdAt).format("D MMMM YYYY")}</span>
          </div>
        </Link>
        <Link href={href}>
          <p className="text-sm font-extralight text-[#020a1c] group-hover:underline md:text-lg/tight">
            {title}
          </p>
        </Link>
      </div>
    </div>
  );
};

export const Title = ({ title, id }: { title: string; id: string }) => {
  return (
    <div className="relative flex w-full items-center justify-between gap-5 pb-5">
      <p className="relative text-nowrap pl-4 text-sm capitalize text-gray-600 before:absolute before:left-0 before:h-full before:w-1 before:bg-red-600 before:content-['']">
        {title}
      </p>
      <div className="h-0.5 w-full bg-neutral-100" />
      <Link href={`/blog?category=${id}`} className="flex items-center gap-2 text-sm">
        <p className="text-nowrap text-gray-600">view all</p>
        <IconArrowRight className="size-4 text-red-600" />
      </Link>
    </div>
  );
};