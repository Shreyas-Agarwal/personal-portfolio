"use client"
import { motion } from "framer-motion";

export function ReplayVisual() {
  return (
    <svg viewBox="0 0 160 40" className="w-full h-10 mt-2 bg-[#1B1D1F]/70 rounded border border-[#E6E1D6]/5 p-1 select-none">
      {/* Immutable Log tape */}
      <rect x="10" y="15" width="100" height="10" rx="1" fill="none" stroke="#E6E1D6" strokeOpacity={0.2} strokeWidth={1} />
      <line x1="25" y1="15" x2="25" y2="25" stroke="#E6E1D6" strokeOpacity={0.2} />
      <line x1="45" y1="15" x2="45" y2="25" stroke="#E6E1D6" strokeOpacity={0.2} />
      <line x1="65" y1="15" x2="65" y2="25" stroke="#E6E1D6" strokeOpacity={0.2} />
      <line x1="85" y1="15" x2="85" y2="25" stroke="#E6E1D6" strokeOpacity={0.2} />

      {/* Rolling cursor */}
      <motion.line
        x1={20} y1={5} x2={20} y2={35}
        stroke="#DE4B31"
        strokeWidth={1}
        animate={{ x: [20, 100, 20] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* State box built up */}
      <rect x="125" y="10" width="25" height="20" rx="2" fill="none" stroke="#DE4B31" strokeWidth={1} />
      <motion.circle
        cx={137}
        cy={20}
        r={3}
        fill="#DE4B31"
        animate={{ scale: [0.5, 1.2, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </svg>
  );
}
