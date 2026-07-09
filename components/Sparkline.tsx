"use client";

import { motion } from "framer-motion";

const shapes = {
  up: "0,26 15,22 30,24 45,14 60,17 75,8 90,11 105,3 120,6",
  down: "0,6 15,10 30,8 45,16 60,13 75,20 90,17 105,24 120,20",
  wiggle: "0,18 15,10 30,20 45,6 60,16 75,9 90,19 105,8 120,14",
};

export default function Sparkline({
  variant,
  color,
  delay = 0,
}: {
  variant: keyof typeof shapes;
  color: string;
  delay?: number;
}) {
  return (
    <svg viewBox="0 0 120 30" className="h-8 w-full overflow-visible" preserveAspectRatio="none">
      <motion.polyline
        points={shapes[variant]}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay, ease: "easeInOut" }}
      />
    </svg>
  );
}
