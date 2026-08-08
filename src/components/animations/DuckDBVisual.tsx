"use client";
import { motion } from "framer-motion";

export function DuckDBVisual() {
  return (
    <svg
      viewBox="0 0 160 40"
      className="w-full h-10 mt-2 bg-[#1B1D1F]/70 rounded border border-[#E6E1D6]/5 p-1 select-none"
    >
      <motion.path
        d="M 10 20 Q 40 5, 70 20"
        fill="none"
        stroke="#E6E1D6"
        strokeOpacity={0.3}
        strokeWidth={1}
        animate={{ pathLength: [0, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <rect
        x="70"
        y="10"
        width="20"
        height="20"
        rx="2"
        fill="none"
        stroke="#DE4B31"
        strokeWidth={1}
      />
      <motion.circle
        cx={80}
        cy={20}
        r={4}
        fill="none"
        stroke="#DE4B31"
        strokeWidth={1.5}
        animate={{ rotate: 360 }}
        style={{ transformOrigin: "80px 20px" }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      <motion.path
        d="M 90 20 Q 120 35, 150 20"
        fill="none"
        stroke="#E6E1D6"
        strokeOpacity={0.3}
        strokeWidth={1}
        animate={{ pathLength: [0, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
      />
    </svg>
  );
}
