"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

const images = [
  {
    src: "/190.jpg",
    alt: "Gardener tending potted plants",
  },
  {
    src: "/220.jpg",
    alt: "Hand holding a young seedling",
  },
  {
    src: "/260.jpg",
    alt: "Person watering plants at golden hour",
  },
  {
    src: "/310.jpg",
    alt: "Team collaborating around a laptop",
  },
  {
    src: "/296.jpg",
    alt: "Team collaborating around a laptop",
  },
  {
    src: "/411.jpg",
    alt: "Team collaborating around a laptop",
  },
];


const REPEAT_COUNT = 3;

export default function LandscapeMarquee() {
  const shouldReduceMotion = useReducedMotion();
  const track = Array.from({ length: REPEAT_COUNT }).flatMap(() => images);

  return (
    <section className="relative w-full overflow-hidden py-8 sm:py-12 md:py-16">
      <div className="relative h-[130px] sm:h-[190px] md:h-[250px] lg:h-[310px] xl:h-[370px]">
        <div className="absolute inset-0 flex items-center overflow-hidden">
          <motion.div
            className="flex w-max items-center"
            animate={shouldReduceMotion ? { x: "0%" } : { x: ["0%", "-50%"] }}
            transition={
              shouldReduceMotion
                ? { duration: 150 }
                : { duration: 160, ease: "linear", repeat: Infinity }
            }
          >
           
            <div className="flex shrink-0 gap-4 pr-4 sm:gap-6 sm:pr-6">
              {track.map((img, i) => (
                <div
                  key={`a-${i}`}
                  className="relative h-24 w-36 shrink-0 overflow-hidden rounded-xl shadow-lg ring-1 ring-black/5 sm:h-32 sm:w-48 md:h-40 md:w-60 lg:h-48 lg:w-72"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 200px, 300px"
                  />
                </div>
              ))}
            </div>
            <div
              aria-hidden="true"
              className="flex shrink-0 gap-4 pr-4 sm:gap-6 sm:pr-6"
            >
              {track.map((img, i) => (
                <div
                  key={`b-${i}`}
                  className="relative h-24 w-36 shrink-0 overflow-hidden rounded-xl shadow-lg ring-1 ring-black/5 sm:h-32 sm:w-48 md:h-40 md:w-60 lg:h-48 lg:w-72"
                >
                  <Image
                    src={img.src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 200px, 300px"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}