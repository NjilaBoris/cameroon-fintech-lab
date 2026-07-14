"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";



const attendees = [
  "Fintech founders and product leads",
  "Regulatory staff and compliance officers",
  "Researchers and academics",
  "Data professionals and engineers",
  "Investors and development finance representatives",
];

const facts = [
  { label: "FORMAT", value: "In person, Yaoundé" },
  { label: "FREQUENCY", value: "Monthly" },
  { label: "SIZE", value: "15–20" },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
};

function RecurringStamp() {
  const label = "MONTHLY • RECURRING • ";
  const repeated = label.repeat(3);

  return (
    <motion.div
      className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.svg
        viewBox="0 0 200 200"
        className="h-full w-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
      >
        <defs>
          <path
            id="stampCircle"
            d="M 100,100 m -80,0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"
          />
        </defs>
        <circle cx="100" cy="100" r="80" fill="#C89B3C" />
        <circle cx="100" cy="100" r="66" fill="none" stroke="#10131F" strokeOpacity="0.15" strokeWidth="1" />
        <text fill="#10131F" fontSize="12.5" fontFamily="var(--font-mono, monospace)" letterSpacing="1.5">
          <textPath href="#stampCircle" startOffset="0%">
            {repeated}
          </textPath>
        </text>
      </motion.svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-[#10131F] flex items-center justify-center">
          <span className="text-[9px] font-mono font-medium text-[#C89B3C]">01</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function FintechDataChatInitiative() {
  return (
    <section className="w-full  px-4 py-16 sm:px-8 sm:py-25 mt-6 md:mt-8 md:px-12 lg:mt-10 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between"
        >
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] text-[#C89B3C]">
            INITIATIVE 
          </span>
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] text-white/40">
            YAOUNDÉ, CM
          </span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4  text-[clamp(2rem,5.5vw,3.75rem)] text-[#3A3A3A] font-medium leading-[1.03] tracking-tight"
        >
          Cameroon FinTech &amp; Data Chat
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed"
        >
          A structured monthly forum bringing together fintech practitioners,
          regulators, researchers, and data professionals for open dialogue
          on sector challenges and opportunities.
        </motion.p>
        <div className="mt-10 sm:mt-12 grid grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative lg:col-span-2 aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-full min-h-[260px] overflow-hidden rounded-2xl"
          >
            <Image
              src="/cfl.jpg"
              alt="Fintech and data professionals in discussion around a table in Yaoundé"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
              priority
            />
            {/* <div className="absolute inset-0 bg-gradient-to-t from-[#10131F]/70 via-[#10131F]/0 to-[#10131F]/0" />
            <RecurringStamp />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
              <p className="font-mono text-[10px] sm:text-xs tracking-widest text-white/70">
                ROUND 01 · OPEN DIALOGUE
              </p>
            </div> */}
          </motion.div>

          <div className="lg:col-span-3 flex flex-col gap-5 sm:gap-6 rounded-2xl bg-[#F7F4EC] p-5 sm:p-7 md:p-8">
           
            <div className="grid grid-cols-1 divide-y divide-[#10131F]/10 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
              {facts.map((fact, i) => (
                <motion.div
                  key={fact.label}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.4 }}
                  className="py-3 sm:py-0 sm:px-4 first:pl-0 first:pt-0"
                >
                  <p className="font-mono text-[10px] tracking-[0.18em] text-[#10131F]/50">
                    {fact.label}
                  </p>
                  <p className="mt-1 text-sm sm:text-base font-medium text-[#10131F]">
                    {fact.value}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="h-px w-full bg-[#10131F]/10" />
            <div>
              <p className="font-mono text-[10px] tracking-[0.18em] text-[#10131F]/50">
                WHO ATTENDS
              </p>
              <ul className="mt-3 flex flex-col gap-2.5 sm:gap-3">
                {attendees.map((role, i) => (
                  <motion.li
                    key={role}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="flex items-baseline gap-3 border-b border-[#10131F]/8 pb-2.5 sm:pb-3 last:border-b-0 last:pb-0"
                  >
                    <span className="font-mono text-xs text-[#C89B3C]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm sm:text-[15px] text-[#10131F]/80">
                      {role}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="h-px w-full bg-[#10131F]/10" />
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <p className="text-xs sm:text-sm text-[#10131F]/55">
                Seats are limited to keep the room in dialogue, not lecture.
              </p>
              <motion.a
                href="#express-interest"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#10131F] px-6 py-3 text-xs sm:text-sm font-medium tracking-wide text-[#F7F4EC] transition-colors hover:bg-[#10131F]/90"
              >
                Express Interest
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}