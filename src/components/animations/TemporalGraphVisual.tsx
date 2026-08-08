"use client";
import { motion } from "framer-motion";

export function TemporalGraphVisual() {
  return (
    <svg
      viewBox="0 0 160 40"
      className="w-full h-10 mt-2 bg-[#1B1D1F]/70 rounded border border-[#E6E1D6]/5 p-1 select-none"
    >
      {/* Node A */}
      <circle cx="20" cy="20" r="4" fill="none" stroke="#E6E1D6" strokeWidth={1} />

      {/* Node B (Fades in/out representing temporal existence) */}
      <motion.circle
        cx="80"
        cy="10"
        r="4"
        fill="none"
        stroke="#DE4B31"
        strokeWidth={1}
        initial={{ opacity: 0.2 }}
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Node C */}
      <circle cx="140" cy="20" r="4" fill="none" stroke="#E6E1D6" strokeWidth={1} />

      {/* Node D (Temporal) */}
      <motion.circle
        cx="80"
        cy="30"
        r="4"
        fill="none"
        stroke="#DE4B31"
        strokeWidth={1}
        initial={{ opacity: 1 }}
        animate={{ opacity: [1, 0.1, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Connection Lines (Draw dynamically) */}
      {/* A to B */}
      <motion.path
        d="M 24 18 L 76 12"
        fill="none"
        stroke="#E6E1D6"
        strokeWidth={0.75}
        animate={{ strokeOpacity: [0.1, 0.8, 0.1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* A to D */}
      <motion.path
        d="M 24 22 L 76 28"
        fill="none"
        stroke="#E6E1D6"
        strokeWidth={0.75}
        animate={{ strokeOpacity: [0.8, 0.1, 0.8] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* B to C */}
      <motion.path
        d="M 84 12 L 136 18"
        fill="none"
        stroke="#E6E1D6"
        strokeWidth={0.75}
        animate={{ strokeOpacity: [0.1, 0.8, 0.1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* D to C */}
      <motion.path
        d="M 84 28 L 136 22"
        fill="none"
        stroke="#E6E1D6"
        strokeWidth={0.75}
        animate={{ strokeOpacity: [0.8, 0.1, 0.8] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}
