"use client";

import { motion } from "framer-motion";
import { Bell, ExternalLink, Receipt } from "lucide-react";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Features() {
  return (
    <section className="bg-mist py-8">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl text-ink md:text-4xl">
            Our Four Pillars
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          <motion.div variants={item} className="rounded-2xl bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-card">
            <div className="mb-2 flex items-center justify-between rounded-xl bg-mist p-4">
              <div className="flex items-center  text-lg  font-bold text-[#E8AE45]">
                 01
              </div>
              
            </div>
            <h3 className="mt-4 text-base font-semibold text-ink">
             Research & Intelligence
            </h3>
            <p className="mt-1 text-sm text-slate-400">
             Data-driven analysis of Cameroon's financial landscape — identifying gaps and where focused effort can make a real difference.
            </p>
          </motion.div>
          <motion.div variants={item} className="rounded-2xl bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-card">
            <div className="mb-2 flex items-center justify-between rounded-xl bg-mist p-4">
              <div className="flex items-center  text-lg  font-bold  text-[#E8AE45]">
                 02
              </div>
              
            </div>
            <h3 className="mt-4 text-base font-semibold text-ink">
            Policy & Advocacy
            </h3>
            <p className="mt-1 text-sm text-slate-400">
             Engaging regulators and policymakers with evidence-based positions — contributing to frameworks that give fintech companies clearer rules and more room to innovate.
            </p>
          </motion.div>
          <motion.div variants={item} className="rounded-2xl bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-card">
            <div className="mb-2 flex items-center justify-between rounded-xl bg-mist p-4">
              <div className="flex items-center  text-lg font-medium font-bold  text-[#E8AE45]">
                 03
              </div>
              
            </div>
            <h3 className="mt-4 text-base font-semibold text-ink">
             Infrastructure & Tools
            </h3>
            <p className="mt-1 text-sm text-slate-400">
             Building practical tools that address real market problems — so companies and institutions don't have to start from zero.
            </p>
          </motion.div>
          <motion.div variants={item} className="rounded-2xl bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-card">
            <div className="mb-2 flex items-center justify-between rounded-xl bg-mist p-4">
              <div className="flex items-center  text-lg font-bold  text-[#E8AE45]">
                 04
              </div>
              
            </div>
            <h3 className="mt-4 text-base font-semibold text-ink">
             Data Governance
            </h3>
            <p className="mt-1 text-sm text-slate-400">
             Frameworks for how consumer financial data is collected, used, and protected — because privacy and accountability aren't afterthoughts; they're the foundation.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
