"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Playfair_Display } from "next/font/google";


// Replace these with your own images (e.g. in /public/images/)
const images = [
  {
    src: "https://media.licdn.com/dms/image/v2/D4D03AQHBrDYLPKETfw/profile-displayphoto-scale_400_400/B4DZndaxh3H4Ag-/0/1760356408846?e=1785369600&v=beta&t=OHrzQe2-r8czD_HFYa6PFKNUiuxZkTXTy0ZTwyzpuAk",
    alt: "Gardener tending potted plants",
    position: "left-[-4%] top-[16%] sm:top-[14%] md:top-[12%]",
    rotate: "-rotate-3",
    delay: 0,
  },
  {
    src: "https://media.licdn.com/dms/image/v2/D4E03AQHuc5dV6y0ksA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1728238140441?e=1785369600&v=beta&t=-T020v2F5RtEZVPclFjzizYxJsJWspxtRBHl1hN4j3M",
    alt: "Hand holding a young seedling",
    position: "left-1/2 top-[54%] -translate-x-1/2 sm:top-[56%]",
    rotate: "rotate-2",
    delay: 0.15,
  },
  {
    src: "https://media.licdn.com/dms/image/v2/D5603AQGDJAXe3_fF7A/profile-displayphoto-shrink_400_400/B56ZcdjxELHUAg-/0/1748547606287?e=1785369600&v=beta&t=LoM3Kc7OAlHu6oIQARKgYDz44c14-wz2tkxPT32elcw",
    alt: "Person watering plants at golden hour",
    position: "right-[-4%] top-[10%] sm:top-[8%]",
    rotate: "rotate-3",
    delay: 0.3,
  },
];

const PHRASE = "CAMEROON\u2014FINTECH\u2014LAB\u2014"; // phrase to repeat in the marquee
const REPEAT_COUNT = 10; // wide enough to tile across very large screens

export default function LandscapeMarquee() {
  const shouldReduceMotion = useReducedMotion();
  const row = PHRASE.repeat(REPEAT_COUNT);

  return (
    <section
      className={`relative w-full overflow-hidden  py-8 sm:py-12 md:py-16`}
    >
      <div className="relative h-[130px] sm:h-[190px] md:h-[250px] lg:h-[310px] xl:h-[370px]">
        <div className="absolute inset-0 flex items-center overflow-hidden">
          <motion.div
            className="flex w-max whitespace-nowrap"
            animate={
              shouldReduceMotion ? { x: "0%" } : { x: ["0%", "-50%"] }
            }
            transition={
              shouldReduceMotion
                ? { duration: 50 }
                : { duration: 50, ease: "linear", repeat: Infinity }
            }
          >
            <span
              style={{ fontFamily: "var(--font-playfair)" }}
              className="pr-6 text-[2.75rem] font-extrabold uppercase leading-none tracking-tight text-[#3A3A3A]  sm:text-[4rem] md:text-[5.5rem] lg:text-[7rem] xl:text-[8.5rem]"
            >
              {row}
            </span>
            <span
              aria-hidden="true"
              style={{ fontFamily: "var(--font-playfair)" }}
              className="pr-6 text-[2.75rem] font-extrabold uppercase leading-none tracking-tight text-[#3A3A3A]  sm:text-[4rem] md:text-[5.5rem] lg:text-[7rem] xl:text-[8.5rem]"
            >
              {row}
            </span>
          </motion.div>
        </div>

        {images.map((img, i) => (
          <motion.div
            key={img.alt}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: 0.6,
              delay: img.delay,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`absolute ${img.position} ${img.rotate} z-10 w-24 sm:w-32 md:w-40 lg:w-48 xl:w-56`}
          >
            <motion.div
              animate={
                shouldReduceMotion ? { y: 0 } : { y: [0, -8, 0] }
              }
              transition={{
                duration: 4 + i * 0.6,
                repeat: shouldReduceMotion ? 0 : Infinity,
                ease: "easeInOut",
              }}
              className="overflow-hidden rounded-xl shadow-xl ring-1 ring-black/5"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                className="h-24 w-full object-cover sm:h-32 md:h-40 lg:h-48 xl:h-56"
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}