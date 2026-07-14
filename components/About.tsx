"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";



const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function AboutSection() {
  return (
    <section className={` px-6 py-16 sm:px-10 sm:py-20 md:px-16 md:py-24 lg:px-24`}>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-[minmax(140px,200px)_1fr] md:gap-10 lg:gap-16"
      >
        <motion.div
          variants={fadeUp}
          className="flex items-center gap-2 md:pt-2"
        >
          <span className="h-2 w-2 shrink-0 bg-[#1a1a1a]" />
          <span className="text-xs font-medium uppercase tracking-wide  sm:text-sm">
            About Us
          </span>
        </motion.div>

        <div className="flex flex-col gap-5 sm:gap-6 md:gap-8">
          <motion.p
            variants={fadeUp}
            style={{ fontFamily: "var(--font-playfair)" }}
            className="text-[#161616] text-xl leading-snug sm:text-2xl sm:leading-snug md:text-[1.75rem] md:leading-snug lg:text-3xl lg:leading-snug"
          >
            An independent (self-funded) think tank focused on building a more inclusive and well-regulated financial system for Cameroon and the wider CEMAC region — one practical initiative at a time.
          </motion.p>

          <motion.div variants={fadeUp}>
            <Link
              href="/about"
              className="group inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-[#a6592f] transition-colors hover:text-[#8a4726] sm:text-sm"
            >
              <span aria-hidden="true">[</span>
              <span className="underline-offset-4 group-hover:underline">
                Learn More
              </span>
              <ArrowUpRight
                size={14}
                strokeWidth={2}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
              <span aria-hidden="true">]</span>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}