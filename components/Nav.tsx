"use client";
import { Waves } from "lucide-react";
import Link from "next/link";

const links = ["Home", "About", "Initiatives", "Events", "Team", "Research & Policy"];

export default function Navbar() {
  return (
    <div className="fixed top-5 z-20 w-full border-b border-white/10  backdrop-blur-sm">

    <header
      className=" z-20 relative mx-auto flex w-full rounded-full bg-[#1B1B1B] max-w-6xl items-center justify-between px-6 py-6"
    >
        <Link href={"/"}>
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C8F701] text-dark shadow-sm">
          CFL
        </span>
        <span className="text-[13px] font-semibold tracking-tight text-white uppercase">
          Cameroon Fintech Lab
        </span>
      </div>
        </Link>

      <nav className="hidden items-center gap-1 rounded-full bg-white/10 p-1 backdrop-blur-sm md:flex">
        {links.map((link, i) =>
          i === 0 ? (
              <Link
              key={link}
              href={`/${link.toLowerCase().replace(/\s+/g, "-")}`}
              className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-brand-600 shadow-sm"
            >
              {link}
            </Link>
          ) : (
              <Link
              key={link}
              href={`/${link.toLowerCase().replace(/\s+/g, "-")}`}
              className="rounded-full px-4 py-1.5 text-sm font-medium text-white/85 transition hover:text-white"
            >
              {link}
            </Link>
          )
        )}
      </nav>

      <div className="flex items-center gap-2">
        <button className="rounded-full bg-[#C8F701] px-4 py-2 text-sm font-medium  backdrop-blur-sm transition hover:bg-[#C8F701]/20">
         GET INVOLVED
        </button>
        {/* <button className="rounded-full bg-ink-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-black">
          Sign Up
        </button> */}
      </div>
    </header>
          </div>
  );
}
