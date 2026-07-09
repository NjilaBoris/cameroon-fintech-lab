"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}


type Author = {
  id: string;
  name: string;
  specialty: string;
  image: string;
};

const authors: Author[] = [
  {
    id: "anna-williams",
    name: "Anna Williams",
    specialty: "Personal Finance and Stocks",
    image: "https://i.pravatar.cc/600?img=47",
  },
  {
    id: "chris-evans",
    name: "Chris Evans",
    specialty: "Real Estate and Urban Development",
    image: "https://i.pravatar.cc/600?img=13",
  },
  {
    id: "daniel-nguyen",
    name: "Daniel Nguyen",
    specialty: "Space Exploration and Technology",
    image: "https://i.pravatar.cc/600?img=53",
  },
  {
    id: "david-brown",
    name: "David Brown",
    specialty: "Sports and Fitness",
    image: "https://i.pravatar.cc/600?img=52",
  },
  {
    id: "emily-davis",
    name: "Emily Davis",
    specialty: "Health, Science and Technology",
    image: "https://i.pravatar.cc/600?img=32",
  },
  {
    id: "james-carter",
    name: "James Carter",
    specialty: "Economics, Business and Finance",
    image: "https://i.pravatar.cc/600?img=59",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.09 },
  }),
};

function AuthorCard({ author, index }: { author: Author; index: number }) {
  const imgRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imgRef.current || !cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { scale: 1.18 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 90%",
            end: "top 40%",
            scrub: 0.6,
          },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <motion.div
      ref={cardRef}
      custom={index}
      variants={cardVariants}
      className="group"
    >
      <div
        ref={imgRef}
        className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-neutral-100 will-change-transform"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={author.image}
          alt={author.name}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="mt-3">
        <p className="text-[15px] font-medium text-[#1F3A93]">
          {author.name}
        </p>
        <p className="text-sm text-emerald-700/90 relative inline-block">
          {author.specialty}
          <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-emerald-700/70 transition-all duration-300 group-hover:w-full" />
        </p>
      </div>
    </motion.div>
  );
}

export default function TeamSection() {
  const introRef = useRef<HTMLDivElement>(null);
  const introInView = useInView(introRef, { once: true, margin: "-15% 0px" });

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[280px_1fr] lg:gap-12">
        {/* Intro copy */}
        <motion.div
          ref={introRef}
          initial={{ opacity: 0, y: 16 }}
          animate={introInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:sticky lg:top-24 lg:self-start"
        >
          <div className="space-y-4 text-sm leading-relaxed text-neutral-600">
            <p>
              Our team of authors at NewsFlash is composed of professionals
              from diverse backgrounds, each bringing their unique expertise
              from various industries.
            </p>
            <p>
              With decades of collective experience, they have penned
              articles that have reached millions of readers worldwide.
              Their work spans topics from breaking news to in-depth
              features, consistently delivering high-quality journalism
              that informs and engages audiences.
            </p>
            <p>
              Many of our authors have been recognized with prestigious
              awards, further underscoring their commitment to excellence
              in writing. Whether covering global events, investigative
              stories, or cultural phenomena, our authors ensure that
              every article meets the highest standards of accuracy,
              insight, and impact.
            </p>
          </div>
        </motion.div>

        {/* Author grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
          className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {authors.map((author, i) => (
            <AuthorCard key={author.id} author={author} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}