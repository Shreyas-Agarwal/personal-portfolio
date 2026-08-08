"use client";
import { motion } from "framer-motion";

export function DelayPropagationVisual() {
  return (
    <svg
      viewBox="0 0 160 40"
      className="w-full h-10 mt-2 bg-[#1B1D1F]/70 rounded border border-[#E6E1D6]/5 p-1 select-none"
    >
      {/* Target Node 1 (Source delay) */}
      <motion.circle
        cx="20"
        cy="20"
        r="4"
        fill="#DE4B31"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />

      {/* Intermediary nodes */}
      <circle
        cx="65"
        cy="12"
        r="3"
        fill="none"
        stroke="#E6E1D6"
        strokeOpacity={0.5}
        strokeWidth={1}
      />
      <circle
        cx="65"
        cy="28"
        r="3"
        fill="none"
        stroke="#E6E1D6"
        strokeOpacity={0.5}
        strokeWidth={1}
      />
      <circle
        cx="110"
        cy="20"
        r="3"
        fill="none"
        stroke="#E6E1D6"
        strokeOpacity={0.5}
        strokeWidth={1}
      />

      {/* Connected target end node */}
      <motion.circle
        cx="145"
        cy="20"
        r="4"
        animate={{
          fill: ["#E6E1D6", "#DE4B31", "#E6E1D6"],
          stroke: ["#E6E1D6", "#DE4B31", "#E6E1D6"],
        }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.8 }}
      />

      {/* Delay pulse lines propagating downstream */}
      {/* Node 1 to Intermediary Top */}
      <motion.path
        d="M 24 18 L 61 13"
        fill="none"
        stroke="#DE4B31"
        strokeWidth={1}
        animate={{ pathLength: [0, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />

      {/* Node 1 to Intermediary Bottom */}
      <motion.path
        d="M 24 22 L 61 27"
        fill="none"
        stroke="#DE4B31"
        strokeWidth={1}
        animate={{ pathLength: [0, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />

      {/* Intermediary Top to Target 2 */}
      <motion.path
        d="M 69 13 L 106 18"
        fill="none"
        stroke="#DE4B31"
        strokeWidth={1}
        animate={{ pathLength: [0, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.4 }}
      />

      {/* Intermediary Bottom to Target 2 */}
      <motion.path
        d="M 69 27 L 106 22"
        fill="none"
        stroke="#DE4B31"
        strokeWidth={1}
        animate={{ pathLength: [0, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.4 }}
      />

      {/* Target 2 to End Node */}
      <motion.path
        d="M 114 20 L 140 20"
        fill="none"
        stroke="#DE4B31"
        strokeWidth={1}
        animate={{ pathLength: [0, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.8 }}
      />
    </svg>
  );
}
