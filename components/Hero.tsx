"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import VolumeChart from "./VolumeChart";
import FloatingCards from "./FloatingCards";

export default function Hero() {
  return (
    <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pt-20 pb-20 text-center ">
            <FloatingCards />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mb-7  rounded-full  p-1 px-4 text-[13px] font-medium bg-[#C8F701] backdrop-blur-sm"
      >
        {/* <span className="rounded-full bg-white px-3 py-1 text-brand-600">
        
        </span> */}
        <span className="text-[#3A3A3A] font-bold">
           Cameroon Fintech Lab</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.25, ease: "easeOut" }}
        className="text-[42px] font-bold leading-[1.12] tracking-tight text-[#3A3A3A]  sm:text-6xl"
      >
       Working Towards a Better 
        <br />
      Financial System for Cameroon.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mx-auto mt-6 max-w-lg text-[#6B6B6D] text-[15px] leading-relaxed"
      >
        An independent think tank focused on financial innovation, regulatory engagement, and building practical infrastructure that helps Cameroon's fintech sector grow — responsibly.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.55 }}
        className="mt-9 flex items-center gap-3"
      >
       <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
  <motion.button
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    className="flex items-center justify-center gap-2 rounded-full hover:bg-[#1B1B1B]/90 text-white px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold bg-[#1B1B1B] shadow-lg shadow-black/10 whitespace-nowrap"
  >
    Get Our Initiatives
    <span className="flex h-4 w-4 sm:h-5 sm:w-5 shrink-0 items-center justify-center rounded-full bg-[#1B1B1B] text-white">
      <ArrowUpRight size={12} strokeWidth={2.5} />
    </span>
  </motion.button>

  <motion.button
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    className="flex items-center justify-center gap-2 rounded-full bg-[#1B1B1B]/10 px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-[#1B1B1B] backdrop-blur-sm transition hover:bg-[#1B1B1B]/20 hover:text-dark hover:border-none whitespace-nowrap"
  >
    <Play size={14} fill="currentColor" />
    Who we are
  </motion.button>
</div>
      </motion.div>
    </div>
  );
}
