"use client"
import { motion } from "framer-motion";

export function RouteReconstructionVisual() {
  return (
    <svg viewBox="0 0 160 40" className="w-full h-10 mt-2 bg-[#1B1D1F]/70 rounded border border-[#E6E1D6]/5 p-1 select-none">
      {/* GPS Coordinate dot Pings */}
      <circle cx="20" cy="30" r="2.5" fill="#DE4B31" />
      <circle cx="50" cy="15" r="2.5" fill="#DE4B31" />
      <circle cx="90" cy="28" r="2.5" fill="#DE4B31" />
      <circle cx="140" cy="10" r="2.5" fill="#DE4B31" />

      {/* Reconstructed road/track matching schedule path */}
      <motion.path
        d="M 20 30 Q 35 22, 50 15 T 90 28 T 140 10"
        fill="none"
        stroke="#E6E1D6"
        strokeWidth={1.25}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Faded direct projection vectors */}
      <path d="M 20 30 L 50 15 L 90 28 L 140 10" fill="none" stroke="#E6E1D6" strokeWidth={0.5} strokeOpacity={0.2} strokeDasharray="2 2" />
    </svg>
  );
}
