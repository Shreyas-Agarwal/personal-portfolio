"use client";

import { motion } from "framer-motion";
import { plexMono, serif } from "@/lib/fonts";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ConceptExplorerPlaceholder() {
  return (
    <section
      data-header-theme="dark"
      className="relative border-t border-[#E6E1D6]/10 bg-[#1B1D1F] px-6 py-24 md:px-12"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="border border-dashed border-[#E6E1D6]/20 p-10 text-center md:p-16"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span
              className={`${plexMono.className} text-[10px] uppercase tracking-[0.25em] text-[#E6E1D6]/40`}
            >
              FUTURE EXPANSION
            </span>
            <span className="h-px w-6 bg-[#E6E1D6]/20" />
            <span
              className={`${plexMono.className} text-[10px] uppercase tracking-[0.2em] text-[#DE4B31]`}
            >
              CONCEPT EXPLORER
            </span>
          </div>

          <h2
            className={`${serif.className} mx-auto max-w-xl text-3xl font-normal tracking-tight text-[#E6E1D6] md:text-4xl`}
          >
            An Editorial Encyclopedia of Information Dynamics
          </h2>

          <p
            className={`${serif.className} mx-auto mt-6 max-w-2xl text-base italic leading-relaxed text-[#E6E1D6]/60 md:text-lg`}
          >
            This framework will evolve into a navigable conceptual atlas—a structured editorial
            index connecting core theorems, architectural patterns, and live case studies.
          </p>

          <div className="mt-8 inline-flex items-center gap-2 border border-[#E6E1D6]/15 px-4 py-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#DE4B31]" />
            <span
              className={`${plexMono.className} text-[11px] uppercase tracking-[0.18em] text-[#E6E1D6]/50`}
            >
              Index Structure Under Construction
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
