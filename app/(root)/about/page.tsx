"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, easeOut } from "framer-motion";
import { IconBrain, IconMapPin, IconShield, IconSparkle, IconWorld } from "@tabler/icons-react";


const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easeOut, delay },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.55, ease: easeOut, delay },
  }),
};

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};


function Counter({
  target,
  suffix = "",
  prefix = "",
  duration = 1800,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      setCount(start);
      if (start >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

function Section({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.section
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      custom={delay}
      className={className}
    >
      {children}
    </motion.section>
  );
}

const PRINCIPLES = [
  {
    label: "Intellectual Independence",
    body: "Our positions are shaped by evidence, not by who funds us.",
    icon: <IconBrain stroke={2} />,
  },
  {
    label: "Local Context First",
    body: "What works in Nairobi or London often doesn't work in Yaoundé. We understand Cameroon's specific constraints before reaching for ready-made solutions.",
    icon: <IconMapPin stroke={2} />,
  },
  {
    label: "Practical Over Perfect",
    body: "We'd rather build something that works and iterate than wait for perfect conditions.",
    icon: <IconSparkle stroke={2} />,
  },
  {
    label: "Responsible by Design",
    body: "Privacy, consumer protection, and data governance are design constraints from the start — not afterthoughts.",
    icon: <IconShield stroke={2} />,
  },
];

const STATS = [
  { value: 18, suffix: "%", label: "Adult formal banking penetration", note: "In Cameroon today" },
  { value: 1, suffix: "", label: "Formal credit bureau at national scale", note: "A critical gap" },
  { value: 5, suffix: "", prefix: "Top ", label: "Mobile money growth markets in Sub-Saharan Africa", note: "Cameroon's ranking" },
];


export default function AboutPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <main className=" overflow-x-hidden">

     
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center  overflow-hidden"
      >

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 mx-auto max-w-5xl px-6 sm:px-10 py-32"
        >
          <motion.p
            variants={fadeIn}
            initial="hidden"
            animate="show"
            custom={0}
            className="text-[#E8AE45] text-xs sm:text-sm font-mono tracking-[0.25em] uppercase mb-6"
          >
            About Us
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.1}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight  leading-[1.1] tracking-tight"
          >
            Independent.{" "}
            <br className="hidden sm:block" />
            <span className="text-[#E8AE45]">Evidence-Driven.</span> {" "}
            <br className="hidden sm:block" />
            Focused on Cameroon.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.25}
            className="mt-8 max-w-2xl text-base sm:text-lg  leading-relaxed font-light"
          >
            An independent (self-funded) think tank building a more inclusive and well-regulated
            financial system for Cameroon and the wider CEMAC region —
            one practical initiative at a time.
          </motion.p>

          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="show"
            custom={0.5}
            className="mt-16 flex items-center gap-4"
          >
           
            <span className="text-slate-400 text-xs font-mono tracking-widest uppercase">
              Cameroon FinTech Lab
            </span>
          </motion.div>
        </motion.div>
       
      </section>

      <Section className="mx-auto max-w-5xl px-6 sm:px-10 py-24 sm:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start">
          <div>
            <p className="text-[#E8AE45] text-xs font-mono tracking-[0.2em] uppercase mb-3">
              Our Mission
            </p>
            <h2 className="text-3xl sm:text-4xl font-extralight leading-tight text-[#0B1D3A]">
              Why We Exist
            </h2>
          </div>
          <div className="space-y-6 text-[#3D5068] leading-relaxed text-base sm:text-lg font-light">
            <p>
              Cameroon's financial sector is full of promise but still faces critical gaps.
              Mobile money has reached millions. Fintech companies are emerging. Regulators
              are beginning to engage.
            </p>
            <p>
              But the foundations of a modern digital economy — credit data infrastructure,
              clear compliance frameworks, and open finance protocols — remain underdeveloped.
              The Cameroon FinTech Lab exists to help close those gaps.
            </p>
            <div className="border-l-2 border-[#E8AE45] pl-6 space-y-3 mt-8">
              {[
                ["Innovators", "Insights, data, and prototypes that accelerate fintech solutions."],
                ["Regulators", "Evidence-based policy briefs that balance innovation with stability."],
                ["Communities", "Promoting inclusive finance so digital tools reach those who need them most."],
              ].map(([who, what]) => (
                <div key={who}>
                  <span className="text-[#0B1D3A] font-medium text-sm">Useful to {who}</span>
                  <span className="text-[#3D5068] text-sm"> — {what}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

    
      <section className=" py-24 sm:py-32 overflow-hidden">
        <div className="mx-auto max-w-5xl px-6 sm:px-10">
          <motion.div
            ref={useRef(null)}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="mb-16"
          >
            <p className="text-[#E8AE45] text-xs font-mono tracking-[0.2em] uppercase mb-3">
              The Context
            </p>
            <h2 className="text-3xl sm:text-4xl font-extralight  leading-tight">
              Where Cameroon's Financial Sector Stands Today
            </h2>
            <p className="mt-4 text-slate-400 font-light max-w-xl">
              These aren't unsolvable problems — they just need sustained, focused attention.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-px rounded-xl overflow-hidden"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                custom={i * 0.1}
                className=" p-8 sm:p-10 flex flex-col gap-3"
              >
                <div className="font-mono text-5xl sm:text-6xl font-light">
                  <Counter
                    target={stat.value}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                  />
                </div>
                <p className="text-[#E8AE45] text-xs font-mono tracking-widest uppercase">
                  {stat.note}
                </p>
                <p className="text-slate-400 text-sm leading-relaxed font-light">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>

          
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0.3}
            className="mt-8 flex items-center gap-4 p-6 rounded-xl border border-white/10"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#E8AE45]/20 flex items-center justify-center text-[#E8AE45] text-lg">
              <IconWorld stroke={2} />
            </div>
            <div>
              <p className=" text-sm font-medium">CEMAC Region</p>
              <p className="text-slate-400 text-sm font-light">
                Regional body with a growing fintech agenda — our work serves the wider Central African economic community.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Section className="mx-auto max-w-5xl px-6 sm:px-10 py-24 sm:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start">
          <div>
            <p className="text-[#E8AE45] text-xs font-mono tracking-[0.2em] uppercase mb-3">
              Our Approach
            </p>
            <h2 className="text-3xl sm:text-4xl font-extralight leading-tight text-[#0B1D3A]">
              How We Work
            </h2>
          </div>
          <div className="space-y-10">
            {[
              ["Define", "We start with a clearly defined problem — something specific that's holding the market back."],
              ["Investigate", "We gather evidence, speak to the right stakeholders, and develop a view on what a practical solution looks like."],
              ["Build or Advocate", "Then we either advocate for it, build it, or both. Our initiatives are designed to be usable by real institutions — not just referenced in reports."],
              ["Measure", "We measure progress by whether things actually change: systems built, regulations clarified, capital unlocked."],
            ].map(([step, desc], i) => (
              <motion.div
                key={step}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                custom={i * 0.08}
                className="flex gap-6 items-start"
              >
                <div className="flex-shrink-0 w-7 h-7 rounded-full border border-[#E8AE45] flex items-center justify-center mt-0.5">
                  <span className="text-[#E8AE45] text-xs font-mono">{i + 1}</span>
                </div>
                <div>
                  <p className="text-[#0B1D3A] font-medium mb-1">{step}</p>
                  <p className="text-[#3D5068] text-base font-light leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-5xl px-6 sm:px-10">
          <Section className="mb-16">
            <p className="text-[#E8AE45] text-xs font-mono tracking-[0.2em] uppercase mb-3">
              Our Principles
            </p>
            <h2 className="text-3xl sm:text-4xl font-extralight text-[#0B1D3A] leading-tight">
              What We Stand For
            </h2>
          </Section>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {PRINCIPLES.map((p, i) => (
              <motion.div
                key={p.label}
                variants={fadeUp}
                custom={i * 0.08}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative rounded-2xl border border-zinc-100 bg-[#F7F5F0] p-8 cursor-default overflow-hidden"
              >
                
                <div className="absolute top-0 left-0 w-0 h-0.5 bg-[#E8AE45] transition-all duration-300 group-hover:w-full" />

                <div className="text-2xl mb-4">{p.icon}</div>
                <h3 className="text-[#0B1D3A] font-medium text-lg mb-3">{p.label}</h3>
                <p className="text-[#3D5068] text-sm leading-relaxed font-light">{p.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    
      <section className="relative  py-20 sm:py-40 overflow-hidden">
        

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="relative z-10 mx-auto max-w-3xl px-6 sm:px-10 text-center"
        >
          <p className="text-[#E8AE45] text-xs font-mono tracking-[0.2em] uppercase mb-6">
            Our Vision
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight  leading-[1.2]">
            To position Cameroon as a leading think tank for inclusive digital finance
            in{" "}
            <span className="text-[#E8AE45]">Central Africa.</span>
          </h2>
          <p className="mt-8 text-slate-400 text-base sm:text-lg font-light leading-relaxed">
            By fostering innovation, bridging structural barriers, and building collaborative
            ecosystems that empower individuals, institutions, and communities across the
            CEMAC region.
          </p>

          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0.3}
            className="mt-16 flex justify-center"
          >
            <div className="flex items-center gap-4">
              <span className="text-slate-500 text-xs font-mono tracking-widest uppercase">
                Cameroon FinTech Lab
              </span>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}