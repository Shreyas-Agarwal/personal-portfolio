"use client";
import { motion } from "framer-motion";

export function PolarsVisual() {
  return (
    <svg
      viewBox="0 0 160 40"
      className="w-full h-10 mt-2 bg-[#1B1D1F]/70 rounded border border-[#E6E1D6]/5 p-1 select-none"
    >
      <line x1="10" y1="10" x2="150" y2="10" stroke="#E6E1D6" strokeOpacity="0.15" />
      <line x1="10" y1="20" x2="150" y2="20" stroke="#E6E1D6" strokeOpacity="0.15" />
      <line x1="10" y1="30" x2="150" y2="30" stroke="#E6E1D6" strokeOpacity="0.15" />

      <motion.circle
        cx={10}
        cy={10}
        r={2.5}
        fill="#DE4B31"
        animate={{ cx: [10, 150] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        cx={10}
        cy={20}
        r={2.5}
        fill="#DE4B31"
        animate={{ cx: [10, 150] }}
        transition={{ duration: 1.0, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
      />
      <motion.circle
        cx={10}
        cy={30}
        r={2.5}
        fill="#DE4B31"
        animate={{ cx: [10, 150] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      />
    </svg>
  );
}
