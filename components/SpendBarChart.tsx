"use client";

import { motion } from "framer-motion";

const bars = [
  { month: "Jul", h: 34 },
  { month: "Aug", h: 52 },
  { month: "Sep", h: 40 },
  { month: "Oct", h: 60 },
  { month: "Nov", h: 46 },
  { month: "Dec", h: 58 },
];

export default function SpendBarChart() {
  return (
    <div className="flex items-end gap-2">
      {bars.map((b, i) => (
        <div key={b.month} className="flex flex-col items-center gap-1.5">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: b.h }}
            transition={{ duration: 0.6, delay: 0.5 + i * 0.08, ease: "easeOut" }}
            className="w-2 rounded-full bg-violet-500"
          />
          <span className="text-[9px] text-ink-soft/70">{b.month}</span>
        </div>
      ))}
    </div>
  );
}
