"use client";
import { motion } from "motion/react";
import Image from "next/image";
import React from "react";

const LogoCloud = () => {
  const logos = [
    { title: "logo1", src: "/logo1.png" },
    { title: "logo2", src: "/logo2.png" },
    { title: "logo3", src: "/logo3.png" },
    { title: "logo4", src: "/logo4.png" },
  ];
  return (
    <section>
      <h2 className="text-neutral-600 font-medium dark:text-neutral-400 text-lg pt-10 text-center max-w-xl mx-auto">
        Trusted by moderm operators industries.
        <br className="hidden md:block" />{" "}
        <span className="text-neutral-400">
          From pilots to scale without chaos
        </span>
      </h2>
      <div className="grid grid-cols-2 gap-8 pt-10 md:grid-cols-3 max-w-3xl mx-auto mt-10">
        {logos.map((logo, index) => (
          <motion.div
            initial={{ y: -10, opacity: 0, filter: "blur(10px)" }}
            whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
              delay: index * 0.2,
            }}
            key={index}
          >
            <Image
              src={logo.src}
              width={100}
              height={100}
              alt={logo.title}
              className="size-14 object-contain mx-auto"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default LogoCloud;