"use client";
import { motion } from "framer-motion";

export function ConcurrencyVisual() {
  return (
    <svg
      viewBox="0 0 160 40"
      className="w-full h-10 mt-2 bg-[#1B1D1F]/70 rounded border border-[#E6E1D6]/5 p-1 select-none"
    >
      <path d="M 10 10 L 80 17" fill="none" stroke="#E6E1D6" strokeOpacity={0.15} />
      <path d="M 10 20 L 80 20" fill="none" stroke="#E6E1D6" strokeOpacity={0.15} />
      <path d="M 10 30 L 80 23" fill="none" stroke="#E6E1D6" strokeOpacity={0.15} />

      <motion.circle
        cx={10}
        cy={10}
        r={2}
        fill="#DE4B31"
        animate={{ cx: [10, 80], cy: [10, 17] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
      />
      <motion.circle
        cx={10}
        cy={20}
        r={2}
        fill="#DE4B31"
        animate={{ cx: [10, 80] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "linear", delay: 0.4 }}
      />
      <motion.circle
        cx={10}
        cy={30}
        r={2}
        fill="#DE4B31"
        animate={{ cx: [10, 80], cy: [30, 23] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "linear", delay: 0.8 }}
      />

      <circle cx={80} cy={20} r={4} fill="none" stroke="#E6E1D6" strokeWidth={1} />
      <motion.circle
        cx={84}
        cy={20}
        r={2}
        fill="#E6E1D6"
        animate={{ cx: [84, 150] }}
        transition={{ duration: 1.0, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  );
}
