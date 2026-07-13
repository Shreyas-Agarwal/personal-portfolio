"use client"
import { motion } from "framer-motion";

export function ArrowVisual() {
  return (
    <svg viewBox="0 0 160 40" className="w-full h-10 mt-2 bg-[#1B1D1F]/70 rounded border border-[#E6E1D6]/5 p-1 select-none">
      <g stroke="#E6E1D6" strokeOpacity={0.3} fill="none">
        <rect x="15" y="5" width="20" height="30" rx="1" />
        <rect x="45" y="5" width="20" height="30" rx="1" />
        <rect x="75" y="5" width="20" height="30" rx="1" />
      </g>
      <line x1="15" y1="15" x2="35" y2="15" stroke="#E6E1D6" strokeOpacity={0.15} />
      <line x1="15" y1="25" x2="35" y2="25" stroke="#E6E1D6" strokeOpacity={0.15} />
      <line x1="45" y1="15" x2="65" y2="15" stroke="#E6E1D6" strokeOpacity={0.15} />
      <line x1="45" y1="25" x2="65" y2="25" stroke="#E6E1D6" strokeOpacity={0.15} />
      <line x1="75" y1="15" x2="95" y2="15" stroke="#E6E1D6" strokeOpacity={0.15} />
      <line x1="75" y1="25" x2="95" y2="25" stroke="#E6E1D6" strokeOpacity={0.15} />

      <motion.rect
        x={110}
        y={5}
        width={20}
        height={30}
        rx={1}
        fill="none"
        stroke="#DE4B31"
        strokeWidth={1}
        animate={{ x: [110, 130, 110] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}
