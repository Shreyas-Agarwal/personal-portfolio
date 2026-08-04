"use client";
import { motion } from "framer-motion";

export function HistoricalReplayVisual() {
  return (
    <svg
      viewBox="0 0 160 40"
      className="w-full h-10 mt-2 bg-[#1B1D1F]/70 rounded border border-[#E6E1D6]/5 p-1 select-none"
    >
      <line
        x1="15"
        y1="20"
        x2="145"
        y2="20"
        stroke="#E6E1D6"
        strokeOpacity="0.2"
        strokeWidth={1.5}
      />
      <circle cx={30} cy={20} r={2} fill="#E6E1D6" fillOpacity={0.5} />
      <circle cx={65} cy={20} r={2} fill="#E6E1D6" fillOpacity={0.5} />
      <circle cx={100} cy={20} r={2} fill="#E6E1D6" fillOpacity={0.5} />
      <circle cx={135} cy={20} r={2} fill="#E6E1D6" fillOpacity={0.5} />

      <motion.g
        animate={{ x: [0, 105, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <circle cx={30} cy={20} r={4} fill="#DE4B31" />
        <line x1="30" y1="10" x2="30" y2="30" stroke="#DE4B31" strokeWidth={0.5} />
      </motion.g>
    </svg>
  );
}
