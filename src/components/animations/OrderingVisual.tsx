"use client";
import { motion } from "framer-motion";

export function OrderingVisual() {
  return (
    <svg
      viewBox="0 0 160 40"
      className="w-full h-10 mt-2 bg-[#1B1D1F]/70 rounded border border-[#E6E1D6]/5 p-1 select-none"
    >
      {/* Sorting Gateway */}
      <line
        x1="80"
        y1="5"
        x2="80"
        y2="35"
        stroke="#DE4B31"
        strokeWidth={0.75}
        strokeDasharray="2 2"
      />

      {/* Out-of-order ingress */}
      <motion.g
        animate={{ x: [10, 70] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      >
        <circle cx={0} cy={13} r={3} fill="#E6E1D6" fillOpacity={0.4} />
        <text x={0} y={15} fontSize={5} fill="#1B1D1F" textAnchor="middle" fontWeight="bold">
          3
        </text>
      </motion.g>
      <motion.g
        animate={{ x: [30, 70] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.3 }}
      >
        <circle cx={0} cy={20} r={3} fill="#E6E1D6" fillOpacity={0.4} />
        <text x={0} y={22} fontSize={5} fill="#1B1D1F" textAnchor="middle" fontWeight="bold">
          1
        </text>
      </motion.g>
      <motion.g
        animate={{ x: [20, 70] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.6 }}
      >
        <circle cx={0} cy={27} r={3} fill="#E6E1D6" fillOpacity={0.4} />
        <text x={0} y={29} fontSize={5} fill="#1B1D1F" textAnchor="middle" fontWeight="bold">
          2
        </text>
      </motion.g>

      {/* Ordered egress */}
      <motion.g
        animate={{ x: [80, 150] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.3 }}
      >
        <circle cx={0} cy={20} r={3.5} fill="#DE4B31" />
        <text x={0} y={22} fontSize={6} fill="#E6E1D6" textAnchor="middle" fontWeight="bold">
          1
        </text>
      </motion.g>
      <motion.g
        animate={{ x: [80, 150] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.8 }}
      >
        <circle cx={0} cy={20} r={3.5} fill="#DE4B31" />
        <text x={0} y={22} fontSize={6} fill="#E6E1D6" textAnchor="middle" fontWeight="bold">
          2
        </text>
      </motion.g>
      <motion.g
        animate={{ x: [80, 150] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 1.3 }}
      >
        <circle cx={0} cy={20} r={3.5} fill="#DE4B31" />
        <text x={0} y={22} fontSize={6} fill="#E6E1D6" textAnchor="middle" fontWeight="bold">
          3
        </text>
      </motion.g>
    </svg>
  );
}
