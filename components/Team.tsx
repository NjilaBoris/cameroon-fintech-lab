"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";


type Member = {
  role: string;
  name: string;
  bio: string;
  image: string;
  imageAlt: string;
};

const team: Member[] = [
  {
    role: "Design & Layout (Junior Developer)",
    name: "Abdel Oumar El-bashi",
    bio: "Digital Communications Specialist",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQHBrDYLPKETfw/profile-displayphoto-scale_400_400/B4DZndaxh3H4Ag-/0/1760356408846?e=1785369600&v=beta&t=OHrzQe2-r8czD_HFYa6PFKNUiuxZkTXTy0ZTwyzpuAk",
    imageAlt: "Abdel Oumar El-bashi",
  },
  {
    role: "Senior Software Engineer",
    name: "Foti Georges",
    bio: "Senior Software Engineer | FinTech Professional",
    image: "https://media.licdn.com/dms/image/v2/D5603AQGDJAXe3_fF7A/profile-displayphoto-shrink_400_400/B56ZcdjxELHUAg-/0/1748547606287?e=1785369600&v=beta&t=LoM3Kc7OAlHu6oIQARKgYDz44c14-wz2tkxPT32elcw",
    imageAlt: "Foti Georges",
  },
  {
    role: "Co-Founder — Research, Policy & Stakeholder Engagemen",
    name: "Emmanuel Babila",
    bio: "FinTech Architect | MSc Financial Technology",
    image: "/babila.jpeg",
    imageAlt: "Emmanuel Babila",
  },
  {
    role: "BRAND & COPY",
    name: "Dr. Malucha Walter Chama",
    bio: "Advisor, Ecology, Environmental Science & Climate Finance | Chair, Finance Committee",
    image: "/Malucha1.jpg",
    imageAlt: "Dr. Malucha Walter Chama",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

function PhotoCell({ member, index }: { member: Member; index: number }) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden rounded-xl sm:rounded-2xl bg-neutral-200"
    >
      <Image
        src={member.image}
        alt={member.imageAlt}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 40vw, 100vw"
        className="object-cover grayscale-0 transition duration-500 hover:scale-[1.03]"
      />
    </motion.div>
  );
}

function TextCell({ member, index }: { member: Member; index: number }) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="flex  flex-col justify-between rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 md:p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
    >
      <span className="text-[10px] sm:text-[11px] font-medium tracking-widest text-neutral-500">
        [&nbsp;{member.role}&nbsp;]
      </span>
      <div className="mt-6 sm:mt-8">
        <h3 className="text-sm sm:text-base font-bold tracking-tight text-neutral-900">
          {member.name.toUpperCase()}
        </h3>
        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-neutral-500">
          {member.bio}
        </p>
      </div>
    </motion.div>
  );
}

export default function Team() {
  const [mohamed, alex, sarah, marcus] = team;

  return (
    <section className="w-full bg-[#f2f2f0] px-4 py-16 sm:px-8 sm:py-20 md:px-12 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-7xl">
       
        <div className="flex items-center justify-between">
          <span className="text-[10px] sm:text-xs font-medium tracking-widest text-neutral-500">
            [&nbsp;THE TEAM&nbsp;]
          </span>
          <span className="text-[10px] sm:text-xs font-medium tracking-widest text-neutral-500">
            [&nbsp;CFL&nbsp;]
          </span>
        </div>

       
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 text-[clamp(2rem,6vw,3.5rem)] font-black leading-[0.95] tracking-tight text-neutral-900"
        >
          Meet the minds.
        </motion.h2>

       
        <div className="mt-3 flex items-end justify-between gap-4">
          <p className="text-sm sm:text-base text-neutral-500">
            A  team of obsessive perfectionists.
          </p>
          <Link
            href="/team"
            className="shrink-0 text-[10px] uppercase sm:text-xs font-medium tracking-widest text-orange-600 transition hover:text-orange-700"
          >
            [&nbsp;View More&nbsp;]
          </Link>
        </div>

       
        <div className="mt-8 sm:mt-10 md:mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
         
          <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
            <PhotoCell member={mohamed} index={0} />
            <TextCell member={mohamed} index={1} />
          </div>

         
          <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
            <TextCell member={alex} index={1} />
            <PhotoCell member={alex} index={2} />
          </div>

          
          <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
            <PhotoCell member={sarah} index={2} />
            <TextCell member={sarah} index={3} />
          </div>

        
          <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
            <TextCell member={marcus} index={3} />
            <PhotoCell member={marcus} index={4} />
          </div>
        </div>
      </div>
    </section>
  );
}