"use client";

import { motion, type Transition } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";
import SpendBarChart from "./SpendBarChart";

function float(delay: number) {
  const transition: Transition = {
    opacity: { duration: 0.5, delay },
    scale: { duration: 0.5, delay },
    y: { duration: 4.5, delay: delay + 0.5, repeat: Infinity, ease: "easeInOut" },
  };

  return {
    initial: { opacity: 0, scale: 0.7, y: 20 },
    animate: {
      opacity: 1,
      scale: 1,
      y: [0, -8, 0],
    },
    transition,
  };
}

export default function FloatingCards() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden lg:block">
      {/* +$347.23 pill */}
      <motion.div
        {...float(0.2)}
        className="absolute -left-40 top-20 flex items-center gap-2 rounded-full bg-[#C8F701] px-4 py-2.5 shadow-lg"
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white">
          <Check className="h-3 w-3 text-ink" strokeWidth={3} />
        </span>
        <span className="text-sm font-semibold text-ink">+$347.23</span>
      </motion.div>

      {/* PayPal money transfer */}
      <motion.div
        {...float(0.35)}
        className="absolute -left-38 top-[43%] flex w-52 items-center gap-3 rounded-2xl bg-white p-4 shadow-xl"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eef2ff]">
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-[#003087]">
            <path d="M7.5 20.5 9 12.8h3.2c3 0 5.4-1.6 6-4.8.6-3.2-1.3-5.5-4.6-5.5H7.9L5 20.5h2.5Zm2-9.7 1-5.3h2.7c1.5 0 2.4.9 2.1 2.4-.3 1.5-1.6 2.5-3.2 2.9H9.5Z" />
          </svg>
        </span>
        <div>
          <p className="text-xs font-semibold text-ink">PayPal</p>
          <p className="text-[11px] text-ink-soft">Money transfer</p>
        </div>
      </motion.div>

      {/* Jhon Barrel account card */}
      <motion.div
        {...float(0.5)}
        className="absolute -left-20 top-[76%] w-56 rounded-2xl bg-white p-4 shadow-xl"
      >
        <div className="flex items-center gap-3">
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-semibold text-amber-500">
            JB
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-mint-500" />
          </span>
          <div>
            <p className="text-xs font-semibold text-ink">Jhon Barrel</p>
            <p className="text-[11px] text-ink-soft">Personal account</p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[11px] font-medium text-ink-soft">
            <ArrowUpRight className="h-3.5 w-3.5 -rotate-45" />
            Tranfer
          </span>
          <span className="text-xs font-bold italic tracking-tight text-[#1a1f71]">VISA</span>
        </div>
      </motion.div>

      {/* Amazon icon */}
      <motion.div
        {...float(0.4)}
        className="absolute right-5 top-59 flex h-11 w-11 rotate-6 items-center justify-center rounded-full bg-[#ff9900] shadow-lg"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white">
          <path d="M18.5 16.2c-2 1.5-4.9 2.3-7.4 2.3-3.5 0-6.7-1.3-9.1-3.5-.2-.2 0-.4.2-.3 2.6 1.5 5.8 2.4 9.1 2.4 2.2 0 4.7-.5 7-1.4.3-.1.5.2.2.5Zm.9-1c-.3-.3-1.7-.2-2.4-.1-.2 0-.2-.2-.1-.3 1.2-.8 3.1-.6 3.3-.3.2.3-.1 2.2-1.2 3.1-.2.1-.3 0-.3-.2.3-.7.9-2.2.7-2.2Z" />
        </svg>
      </motion.div>

      {/* Average spend chart */}
      <motion.div
        {...float(0.55)}
        className="absolute -right-40 top-[8%] w-56 rounded-2xl bg-white p-4 shadow-xl"
      >
        <p className="mb-3 text-[11px] font-medium text-ink-soft">Average spend in half a year</p>
        <SpendBarChart />
      </motion.div>

      {/* Spotify icon */}
      <motion.div
        {...float(0.65)}
        className="absolute -right-6 top-[54%] flex h-10 w-10 items-center justify-center rounded-full bg-[#1DB954] shadow-lg"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white">
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2Zm4.6 14.4a.7.7 0 0 1-1 .2c-2.6-1.6-5.9-2-9.8-1.1a.7.7 0 1 1-.3-1.4c4.2-1 7.9-.5 10.8 1.3.4.2.5.7.3 1Zm1.2-2.8a.9.9 0 0 1-1.2.3c-3-1.8-7.5-2.4-11-1.3a.9.9 0 1 1-.5-1.7c4-1.2 8.9-.6 12.4 1.5.4.2.5.8.3 1.2Zm.1-2.9c-3.5-2.1-9.4-2.3-12.8-1.3a1 1 0 1 1-.6-2c3.9-1.2 10.3-1 14.3 1.4a1 1 0 1 1-1 1.9Z" />
        </svg>
      </motion.div>

      {/* Share spendings */}
      <motion.div
        {...float(0.7)}
        className="absolute -right-13 top-[82%] flex w-56 items-center justify-between rounded-2xl bg-white p-4 shadow-xl"
      >
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            <span className="h-7 w-7 rounded-full border-2 border-white bg-violet-100" />
            <span className="h-7 w-7 rounded-full border-2 border-white bg-amber-100" />
            <span className="h-7 w-7 rounded-full border-2 border-white bg-mint-100" />
          </div>
          <p className="text-xs font-medium text-ink">Share spendings</p>
        </div>
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-mint-500">
          <ArrowUpRight className="h-3.5 w-3.5 text-white" />
        </span>
      </motion.div>
    </div>
  );
}
