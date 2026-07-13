"use client"
import { motion } from "framer-motion";

export function BackpressureVisual() {
  return (
    <svg viewBox="0 0 160 40" className="w-full h-10 mt-2 bg-[#1B1D1F]/70 rounded border border-[#E6E1D6]/5 p-1 select-none">
      {/* Queue Box */}
      <rect x="50" y="8" width="60" height="24" rx="2" fill="none" stroke="#E6E1D6" strokeOpacity="0.15" strokeWidth={1} />
      {/* Ingestion Path */}
      <line x1="8" y1="20" x2="50" y2="20" stroke="#E6E1D6" strokeOpacity="0.15" strokeWidth={1} strokeDasharray="3 3" />
      {/* Processing Path */}
      <line x1="110" y1="20" x2="152" y2="20" stroke="#E6E1D6" strokeOpacity="0.15" strokeWidth={1} strokeDasharray="3 3" />

      {/* Fast incoming packets */}
      <motion.circle
        cx={10}
        cy={20}
        r={2.5}
        fill="#DE4B31"
        animate={{ cx: [10, 50] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
      />
      <motion.circle
        cx={10}
        cy={20}
        r={2.5}
        fill="#DE4B31"
        animate={{ cx: [10, 50] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear", delay: 0.27 }}
      />
      <motion.circle
        cx={10}
        cy={20}
        r={2.5}
        fill="#DE4B31"
        animate={{ cx: [10, 50] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear", delay: 0.54 }}
      />

      {/* Slower, congested packets in the queue buffer */}
      <motion.circle
        cx={58}
        cy={20}
        r={3}
        fill="#DE4B31"
        animate={{ cx: [58, 105] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        cx={72}
        cy={20}
        r={3}
        fill="#DE4B31"
        animate={{ cx: [72, 105] }}
        transition={{ duration: 2.0, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      />
      <motion.circle
        cx={86}
        cy={20}
        r={3}
        fill="#DE4B31"
        animate={{ cx: [86, 105] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      />

      {/* Slow output packet */}
      <motion.circle
        cx={110}
        cy={20}
        r={2.5}
        fill="#E6E1D6"
        fillOpacity={0.5}
        animate={{ cx: [110, 150] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
      />

      {/* Bottleneck constraint */}
      <line x1="110" y1="8" x2="110" y2="13" stroke="#DE4B31" strokeWidth={1.5} />
      <line x1="110" y1="27" x2="110" y2="32" stroke="#DE4B31" strokeWidth={1.5} />
    </svg>
  );
}
