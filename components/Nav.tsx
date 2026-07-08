"use client";

import { motion } from "framer-motion";
import { Waves } from "lucide-react";

const links = ["Home", "About", "Initiatives", "Events", "Team", "Research & Policy"];

export default function Navbar() {
  return (
    <div className="fixed top-0 z-20 w-full border-b border-white/10  backdrop-blur-sm">

    <header
      className=" z-20 relative mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6"
    >
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-600 shadow-sm">
          <Waves size={18} strokeWidth={2.4} />
        </span>
        <span className="text-[13px] font-semibold tracking-tight text-white uppercase">
          Cameroon Fintech Lab
        </span>
      </div>

      <nav className="hidden items-center gap-1 rounded-full bg-white/10 p-1 backdrop-blur-sm md:flex">
        {links.map((link, i) =>
          i === 0 ? (
              <span
              key={link}
              className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-brand-600 shadow-sm"
            >
              {link}
            </span>
          ) : (
              <a
              key={link}
              href="#"
              className="rounded-full px-4 py-1.5 text-sm font-medium text-white/85 transition hover:text-white"
            >
              {link}
            </a>
          )
        )}
      </nav>

      <div className="flex items-center gap-2">
        <button className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20">
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
