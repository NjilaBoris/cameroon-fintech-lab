"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";


const team = [
  { src: "https://media.licdn.com/dms/image/v2/D4D03AQHBrDYLPKETfw/profile-displayphoto-scale_400_400/B4DZndaxh3H4Ag-/0/1760356408846?e=1785369600&v=beta&t=OHrzQe2-r8czD_HFYa6PFKNUiuxZkTXTy0ZTwyzpuAk", alt: "Team member among garden foliage" },
  { src: "https://media.licdn.com/dms/image/v2/D5603AQGDJAXe3_fF7A/profile-displayphoto-shrink_400_400/B56ZcdjxELHUAg-/0/1748547606287?e=1785369600&v=beta&t=LoM3Kc7OAlHu6oIQARKgYDz44c14-wz2tkxPT32elcw", alt: "Team member in a sun hat inside the greenhouse" },
  { src: "https://media.licdn.com/dms/image/v2/D4E03AQHuc5dV6y0ksA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1728238140441?e=1785369600&v=beta&t=-T020v2F5RtEZVPclFjzizYxJsJWspxtRBHl1hN4j3M", alt: "Team member inspecting leaves up close" },
  { src: "https://i.pravatar.cc/600?img=5", alt: "Team member tending seedlings" },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const headerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const gridContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const photoReveal: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function TeamSection() {
  return (
    <section
      className={`bg-white px-6 py-12 sm:px-10 sm:py-16 md:px-16 md:py-20 lg:px-24`}
    >
      <div className="mx-auto max-w-7xl">
       
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={fadeUp}
          className="flex items-center gap-2 border-b border-black/10 pb-4 sm:pb-5"
        >
          <span className="h-2 w-2 shrink-0 bg-[#141414]" />
          <span className="text-xs font-medium text-[#141414] sm:text-sm">
            Team Member
          </span>
        </motion.div>

      
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={headerContainer}
          className="flex flex-col gap-6 pt-8 sm:pt-10 md:flex-row md:items-start md:justify-between md:gap-8 lg:pt-12"
        >
          <motion.h2
            variants={fadeUp}
            style={{ fontFamily: "var(--font-playfair)" }}
            className="text-[#3A3A3A] text-[3rem] font-extrabold uppercase leading-[0.95] tracking-tight sm:text-[4.5rem] md:text-[5.5rem] lg:text-[6.5rem] xl:text-[7.5rem]"
          >
            Incredible
            <br />
            Team
          </motion.h2>

          <motion.div
            variants={fadeUp}
            className="flex max-w-xs flex-col gap-4 md:pt-2 md:text-right"
          >
            <p className="text-sm leading-relaxed text-[#3a3a3a] sm:text-base">
              cameroon fintech lab
            </p>
            <Link
              href="/team"
              className="group inline-flex items-center gap-1.5 self-start text-xs font-medium uppercase tracking-wide text-[#141414] transition-colors hover:text-[#141414]/60 md:self-end sm:text-sm"
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
        </motion.div>

      
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={gridContainer}
          className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 md:grid-cols-4 md:gap-5 lg:gap-6"
        >
          {team.map((member) => (
            <motion.div
              key={member.src}
              variants={photoReveal}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="aspect-[3/4] overflow-hidden rounded-2xl bg-[#e8e8e3]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={member.src}
                alt={member.alt}
                className="h-full w-full object-cover"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}