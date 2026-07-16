"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Image from "next/image";

type Category =
  | "Management"
  | "Product"
  | "Design"
  | "Marketing"
  | "Sales"
  | "Customer Success"
  | "Operations";

interface TeamMember {
  name: string;
  role: string;
  category: Category;
  image: string;
  linkedinUrl: string;
  accent: "cream" | "white" | "gradient" | "gold" | "dark";
}

const team: TeamMember[] = [
  {
    name: "Abdel Oumar El-bashi",
    role: "Digital Communications Specialist",
    category: "Management",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQHBrDYLPKETfw/profile-displayphoto-scale_400_400/B4DZndaxh3H4Ag-/0/1760356408846?e=1785369600&v=beta&t=OHrzQe2-r8czD_HFYa6PFKNUiuxZkTXTy0ZTwyzpuAk",
    linkedinUrl: "https://www.linkedin.com/in/abdel-oumar-el-bashi-273a59167/",
    accent: "cream",
  },
  {
    name: "Emmanuel Babila",
    role: "FinTech Architect | MSc Financial Technology",
    category: "Management",
    image: "/babila.jpeg",
    linkedinUrl: "https://www.linkedin.com/in/emmanuel-babila-22a96563/",
    accent: "white",
  },
  {
    name: "Foti Georges",
    role: "Senior Software Engineer | FinTech Professional",
    category: "Sales",
    image: "https://media.licdn.com/dms/image/v2/D5603AQGDJAXe3_fF7A/profile-displayphoto-shrink_400_400/B56ZcdjxELHUAg-/0/1748547606287?e=1785369600&v=beta&t=LoM3Kc7OAlHu6oIQARKgYDz44c14-wz2tkxPT32elcw",
    linkedinUrl: "https://www.linkedin.com/in/georges-foti-421302146/",
    accent: "white",
  },
  {
    name: "Dr. Malucha Walter Chama",
    role: "Advisor, Carbon Markets & Climate Finance",
    category: "Customer Success",
    image: "/Malucha1.jpg",
    linkedinUrl: "https://www.linkedin.com/in/malucha-walter-84783b41b/",
    accent: "gradient",
  },
  {
    name: "Dr. Christiana Mbogue",
    role: "Advisor, Ecology, Environmental Science & Climate Finance | Chair, Finance Committee",
    category: "Product",
    image: "/dr.jpg",
    linkedinUrl: "https://www.linkedin.com/in/christiana-mbogue-phd-97897b63/",
    accent: "gold",
  },
  // {
  //   name: "Njila Boris",
  //   role: "Webmaster",
  //   category: "Operations",
  //   image: "/nb.svg",
  //   linkedinUrl: "https://www.linkedin.com/in/njila-boris-54a726291/",
  //   accent: "white",
  // },
];

const filters: Array<"View all" | Category> = [
  "View all",
  "Management",
  "Product",
  "Design",
  "Marketing",
  "Sales",
  "Customer Success",
  "Operations",
];

const accentStyles: Record<TeamMember["accent"], string> = {
  cream: "bg-orange-50/90 ring-1 ring-orange-100",
  white: "bg-white/95 ring-1 ring-slate-100",
  gradient: "bg-gradient-to-r from-orange-100/90 to-rose-100/90 ring-1 ring-orange-200",
  gold: "bg-amber-100/90 ring-1 ring-amber-200",
  dark: "bg-slate-900 ring-1 ring-slate-800",
};

const textStyles: Record<TeamMember["accent"], { name: string; role: string }> = {
  cream: { name: "text-slate-900", role: "text-slate-500" },
  white: { name: "text-slate-900", role: "text-slate-500" },
  gradient: { name: "text-slate-900", role: "text-slate-500" },
  gold: { name: "text-slate-900", role: "text-slate-600" },
  dark: { name: "text-white", role: "text-slate-300" },
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, y: -12, scale: 0.96, transition: { duration: 0.25 } },
};

export default function TeamSection() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("View all");

  const visibleMembers =
    activeFilter === "View all"
      ? team
      : team.filter((member) => member.category === activeFilter);

  return (
    <section className="w-full bg-[#f4f1ec] px-4 py-16 sm:px-6 md:py-30 py-28 lg:py-35">
      <div className="mx-auto flex max-w-6xl flex-col items-center">
       
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={headingVariants}
          className="max-w-2xl text-center"
        >
          <h2 className=" text-3xl leading-tight text-slate-900 sm:text-4xl md:text-5xl">
            Meet the team that makes
            <br className="hidden sm:block" /> the <em className="italic">magic</em> happen
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-slate-500 sm:text-base">
            Meet our diverse team of world-class  problem solvers.
          </p>
        </motion.div>

        
        {/* <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={headingVariants}
          className="mt-8 flex max-w-full flex-wrap justify-center gap-1 rounded-full bg-black/5 p-1.5 sm:mt-10"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`relative rounded-full px-3 py-1.5 text-xs font-medium transition-colors sm:px-4 sm:text-sm ${
                activeFilter === filter
                  ? "text-slate-900"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {activeFilter === filter && (
                <motion.span
                  layoutId="active-filter-pill"
                  className="absolute inset-0 rounded-full bg-white shadow-sm"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{filter}</span>
            </button>
          ))}
        </motion.div> */}

       
        <motion.div
          layout
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="mt-10 grid w-full grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {visibleMembers.map((member) => (
              <motion.a
                key={member.name}
                href={member.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                layout
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.97 }}
                className="group block"
              >
                <div className="relative aspect-[3/3.4] w-full overflow-hidden rounded-2xl bg-slate-200">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div
                    className={`absolute inset-x-3 bottom-3 rounded-xl px-3 py-2.5 backdrop-blur-sm sm:px-4 sm:py-3 ${accentStyles[member.accent]}`}
                  >
                    <p className={`truncate text-sm font-semibold sm:text-base ${textStyles[member.accent].name}`}>
                      {member.name}
                    </p>
                    <p className={`truncate text-xs sm:text-sm ${textStyles[member.accent].role}`}>
                      {member.role}
                    </p>
                  </div>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}