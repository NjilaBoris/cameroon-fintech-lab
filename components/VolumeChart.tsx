"use client";

import { motion } from "framer-motion";

const yLabels = [70, 60, 50, 40, 30, 20, 10];
const xLabels = ["Fri, Jun 8", "Sat, Jun 9", "Sun, Jun 10", "Mon, Jun 11", "Tue, Jun 12", "Wed, Jun 13", "Thu, Jun 14", "Fri, Jun 15", "Sat, Jun 16"];

const linePoints =
  "0,90 60,70 120,110 180,60 240,95 300,40 360,85 420,55 480,100 540,45 600,75 660,30 720,65";

export default function VolumeChart() {
  return (
    <div className="relative rounded-2xl border border-black/5 bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-medium text-ink">Payment volume over time</p>
      </div>

      <div className="flex gap-3">
        <div className="flex flex-col justify-between py-1 text-[10px] text-ink-soft/60">
          {yLabels.map((y) => (
            <span key={y}>{y}</span>
          ))}
        </div>

        <div className="relative flex-1">
          {/* Callout: point 1 */}
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="absolute left-[28%] top-2 z-10 rounded-lg bg-ink px-3 py-1.5 text-white shadow-lg"
          >
            <p className="text-[9px] text-white/60">Friday, Jun 12</p>
            <p className="text-xs font-semibold">$2,340.00</p>
          </motion.div>

          {/* Callout: point 2 */}
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.75 }}
            className="absolute left-[62%] top-10 z-10 rounded-lg bg-white px-3 py-1.5 shadow-lg ring-1 ring-black/5"
          >
            <p className="text-[9px] text-ink-soft">Friday, Jun 16</p>
            <p className="text-xs font-semibold text-ink">$816.49</p>
          </motion.div>

          <svg viewBox="0 0 720 140" className="h-40 w-full overflow-visible" preserveAspectRatio="none">
            <defs>
              <linearGradient id="volFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-violet-500)" stopOpacity="0.22" />
                <stop offset="100%" stopColor="var(--color-violet-500)" stopOpacity="0" />
              </linearGradient>
            </defs>

            {[0, 1, 2, 3].map((i) => (
              <line
                key={i}
                x1="0"
                x2="720"
                y1={i * 40 + 10}
                y2={i * 40 + 10}
                stroke="black"
                strokeOpacity="0.05"
              />
            ))}

            <motion.polyline
              points={linePoints}
              fill="none"
              stroke="var(--color-violet-500)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
            />

            <motion.polygon
              points={`0,140 ${linePoints} 720,140`}
              fill="url(#volFill)"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </svg>

          <div className="mt-2 flex justify-between text-[9px] text-ink-soft/60">
            {xLabels.map((x) => (
              <span key={x} className="hidden sm:inline">
                {x}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
