"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
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
    name: "Abdel Oumar El-bashi",
    specialty: "Digital Communications Specialist",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQHBrDYLPKETfw/profile-displayphoto-scale_400_400/B4DZndaxh3H4Ag-/0/1760356408846?e=1785369600&v=beta&t=OHrzQe2-r8czD_HFYa6PFKNUiuxZkTXTy0ZTwyzpuAk",
  },
  {
    id: "chris-evans",
    name: "Foti Georges",
    specialty: "Senior Software Engineer | FinTech Professional",
    image: "https://media.licdn.com/dms/image/v2/D5603AQGDJAXe3_fF7A/profile-displayphoto-shrink_400_400/B56ZcdjxELHUAg-/0/1748547606287?e=1785369600&v=beta&t=LoM3Kc7OAlHu6oIQARKgYDz44c14-wz2tkxPT32elcw",
  },
  {
    id: "daniel-nguyen",
    name: "Emmanuel Babila",
    specialty: "FinTech Architect | MSc Financial Technology",
    image: "/babila.jpeg",
  },
  {
    id: "david-brown",
    name: "Dr. Malucha Walter Chama",
    specialty: "Advisor, Carbon Markets & Climate Finance",
    image: "/Malucha1.jpg",
  },
  {
    id: "emily-davis",
    name: "Dr. Christiana Mbogue",
    specialty: "Advisor, Ecology, Environmental Science & Climate Finance | Chair, Finance Committee",
    image: "/dr.jpg",
  },
  {
    id: "james-carter",
    name: "Njila Boris",
    specialty: "Webmaster",
    image: "/nb.svg",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32, filter: "blur(20px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
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
          className="h-full grayscale hover:grayscale-0 transition duration-500 ease-in-out  w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
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
    <section className="w-full px-4 sm:px-6 mt-22 lg:px-8 py-20 sm:py-16">
      <span className=" text-center font-bold text-neutral-600  w-full font-bold flex items-center pb-4 justify-center mx-auto text-4xl">The People Behind the Work</span>
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[280px_1fr] lg:gap-12">
        
       
        <motion.div
          ref={introRef}
          initial={{ opacity: 0, y: 16 }}
          animate={introInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:sticky lg:top-38 lg:self-start"
        >
          
          <div className="space-y-4 text-sm leading-relaxed text-neutral-600">
            <p>
              Our team  is composed of professionals
              from diverse backgrounds, each bringing their unique expertise
              from various industries.
            </p>
            <p>
             We bring together people with backgrounds in financial regulation, credit infrastructure, technology, and economic development — all focused on the same set of problems.
            </p>
          </div>
        </motion.div>

     
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