"use client";
import logo1 from "@/public/logo1.svg";
import logo2 from "@/public/logo2.svg";
import logo3 from "@/public/logo3.svg";
import logo4 from "@/public/logo4.svg";
import Image from "next/image";
import { motion } from "motion/react";
import React from "react";

const logos = [
  { name: "Logo 1", image: logo1 },
  { name: "Logo 2", image: logo2 },
  { name: "Logo 3", image: logo3 },
  { name: "Logo 4", image: logo4 },
];

export default function LogoTicker() {
  return (
    <section className="py-24 overflow-x-clip">
      <div className="container">
        <h1 className="text-white text-center text-xl">
          Our Partners
        </h1>
        <div
          className="overflow-hidden flex mt-12 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] 
  [-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] 
  [mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat]"
        >
          <motion.div
            animate={{ x: "-50%" }}
            transition={{ duration: 40, ease: "linear", repeat: Infinity }}
            className="flex flex-none gap-20 pr-24"
          >
            {Array.from({ length: 2 }).map((_, i) => (
              <React.Fragment key={i}>
                {logos.map((logo) => (
                  <Image src={logo.image} alt={logo.name} key={logo.name} height={160} width={160}/>
                ))}
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}