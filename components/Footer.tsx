"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Waves,
  ArrowRight,
  Mail,
  MapPin,
} from "lucide-react";
import { IconBrandLinkedin } from '@tabler/icons-react';
import { IconBrandX } from '@tabler/icons-react';
import { IconBrandInstagram } from '@tabler/icons-react';
import { IconBrandFacebook } from '@tabler/icons-react';

const footerLinks = {
  Company: ["About", "Initiatives", "Events", "Team"],
  Resources: ["Research & Policy", "Blog", "Careers", "FAQs"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

const socials = [
  { icon: IconBrandX, href: "#", label: "Twitter" },
  { icon: IconBrandLinkedin, href: "#", label: "LinkedIn" },
  { icon: IconBrandInstagram, href: "#", label: "Instagram" },
  { icon: IconBrandFacebook, href: "#", label: "Facebook" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#1B1B1B] px-6 py-16">
      <div className="mx-auto max-w-6xl">
        {/* Top: Brand + Newsletter */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="flex flex-col items-start justify-between gap-10 border-b border-white/10 pb-12 md:flex-row md:items-end"
        >
          <div className="max-w-sm">
            <Link href="/">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C8F701] text-[#1B1B1B] shadow-sm">
                  CFL
                </span>
                <span className="text-[13px] font-semibold tracking-tight text-white uppercase">
                  Cameroon Fintech Lab
                </span>
              </div>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Building the future of financial technology in Cameroon —
              through research, policy, and community.
            </p>
          </div>

          <div className="w-full max-w-sm">
            <p className="mb-3 text-[13px] font-medium tracking-tight text-white/85 uppercase">
              Stay in the loop
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center gap-1 rounded-full bg-white/10 p-1.5 backdrop-blur-sm"
            >
              <input
                type="email"
                placeholder="Your email address"
                className="w-full flex-1 rounded-full bg-transparent px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none"
              />
              <button
                type="submit"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#C8F701] text-[#1B1B1B] transition hover:bg-[#C8F701]/80"
                aria-label="Subscribe"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </motion.div>

        {/* Middle: Link columns */}
        <div className="grid grid-cols-2 gap-10 py-12 sm:grid-cols-3 md:grid-cols-4">
          {Object.entries(footerLinks).map(([title, links], colIndex) => (
            <motion.div
              key={title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              custom={colIndex + 1}
            >
              <p className="mb-4 text-[13px] font-semibold tracking-tight text-white uppercase">
                {title}
              </p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href={`/${link.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-sm text-white/60 transition hover:text-white"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            custom={4}
          >
            <p className="mb-4 text-[13px] font-semibold tracking-tight text-white uppercase">
              Contact
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-white/60">
                <Mail className="h-4 w-4 shrink-0" />
                hello@cameroonfintechlab.com
              </li>
              <li className="flex items-center gap-2 text-sm text-white/60">
                <MapPin className="h-4 w-4 shrink-0" />
                Yaoundé, Cameroon
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          custom={5}
          className="flex flex-col-reverse items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row"
        >
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Cameroon Fintech Lab. All rights
            reserved.
          </p>

          <div className="flex items-center gap-2 rounded-full bg-white/10 p-1 backdrop-blur-sm">
            {socials.map(({ icon: Icon, href, label }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition hover:bg-[#C8F701] hover:text-[#1B1B1B]"
              >
                <Icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}