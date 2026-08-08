"use client";
import { motion } from "framer-motion";

export function BenchmarkingVisual() {
  return (
    <svg
      viewBox="0 0 160 40"
      className="w-full h-10 mt-2 bg-[#1B1D1F]/70 rounded border border-[#E6E1D6]/5 p-1 select-none"
    >
      <motion.path
        d="M 10 35 L 30 25 L 50 28 L 70 15 L 90 20 L 110 8 L 130 12 L 150 5"
        fill="none"
        stroke="#DE4B31"
        strokeWidth={1}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <line x1="10" y1="35" x2="150" y2="35" stroke="#E6E1D6" strokeOpacity={0.15} />
    </svg>
  );
}
