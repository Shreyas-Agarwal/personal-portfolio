"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FigureOneFlow } from "@/components/sections/home-v2/FigureOneFlow";
import { CONCEPTS_MAP } from "@/data/concepts";
import { plexMono, serif } from "@/lib/fonts";

const EASE = [0.16, 1, 0.3, 1] as const;

const NODE_DEFINITIONS: Record<string, string> = {
  reality: "Physical ground truth of an environment prior to observation or measurement.",
  signals: "Raw, uninterpreted environmental emissions captured as discrete events.",
  observations: "Structured telemetry formed when raw signals are bound to timestamps and schemas.",
  state: "Persistent representation of observed reality formed through consensus.",
  context: "Operational frame of reference required for deterministic data interpretation.",
  memory: "Ephemeral storage pools optimized for low-latency computational access.",
  history: "Immutable event ledgers preserving the exact temporal ordering of past states.",
  models: "Formal domain representations used to project outcomes and test assumptions.",
  coordination: "Protocols and consensus mechanisms through which independent actors align.",
  decisions: "Deterministically executed operations emitted back into reality to alter state.",
};

export function SystemsHero() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const activeDefinition = hoveredNode ? NODE_DEFINITIONS[hoveredNode.toLowerCase()] : null;
  const activeConceptTitle = hoveredNode
    ? CONCEPTS_MAP.get(hoveredNode.toLowerCase())?.title || hoveredNode.toUpperCase()
    : null;

  return (
    <section
      data-header-theme="dark"
      className="relative flex flex-col overflow-hidden bg-[#1B1D1F] px-6 pt-28 pb-20 md:px-12 md:pt-36 md:pb-28"
    >
      <div className="relative mx-auto w-full max-w-6xl">
        {/* Monograph Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="max-w-3xl"
        >
          <div className="mb-6 flex items-center gap-3">
            <span
              className={`${plexMono.className} text-[11px] uppercase tracking-[0.25em] text-[#DE4B31]`}
            >
              VOLUME I
            </span>
            <span className="h-px w-8 bg-[#DE4B31]/40" />
            <span
              className={`${plexMono.className} text-[11px] uppercase tracking-[0.2em] text-[#E6E1D6]/40`}
            >
              THE PHYSICS OF INFORMATION
            </span>
          </div>

          <h1
            className={`${serif.className} text-pretty text-[3.25rem] font-normal leading-[1.06] tracking-tight text-[#E6E1D6] md:text-[4.75rem]`}
          >
            Foundations of Information Systems
          </h1>

          <p
            className={`${serif.className} mt-8 max-w-2xl text-xl italic leading-relaxed text-[#E6E1D6]/80 md:text-2xl`}
          >
            The systems I build are applications of a broader set of ideas about how information
            behaves, evolves, and flows through complex environments.
          </p>
        </motion.div>

        {/* Centerpiece Hero Figure (HUGE Plate directly after thesis) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="mt-12 md:mt-16"
        >
          {/* Monograph Figure Plate */}
          <div className="relative border border-[#E6E1D6]/15 bg-[#ECE5D4] p-6 md:p-12 shadow-2xl">
            {/* Monograph Top Plate Header */}
            <div className="mb-6 flex items-center justify-between border-b border-[#1B1D1F]/15 pb-5">
              <div className="flex items-center gap-4">
                <span
                  className={`${plexMono.className} text-xs font-medium uppercase tracking-[0.22em] text-[#1B1D1F]`}
                >
                  FIGURE 01
                </span>
                <span className="h-3 w-px bg-[#1B1D1F]/20" />
                <span
                  className={`${plexMono.className} text-[11px] uppercase tracking-[0.18em] text-[#1B1D1F]/70`}
                >
                  CANONICAL INFORMATION FLOW
                </span>
              </div>
              <span
                className={`${plexMono.className} text-[10px] uppercase tracking-[0.2em] text-[#1B1D1F]/45`}
              >
                REVISION 2026.08
              </span>
            </div>

            {/* Visual Centerpiece Diagram */}
            <div className="flex w-full items-center justify-center py-4 md:py-8">
              <FigureOneFlow activeHoverNode={hoveredNode} onHoverNode={setHoveredNode} />
            </div>

            {/* Monograph Figure Caption (Dynamic Teaching Mode) */}
            <div className="mt-6 border-t border-[#1B1D1F]/15 pt-5 min-h-[70px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {activeDefinition ? (
                  <motion.div
                    key={hoveredNode}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2, ease: EASE }}
                    className="flex flex-col md:flex-row md:items-baseline justify-between gap-3"
                  >
                    <p
                      className={`${serif.className} text-base md:text-lg text-[#1B1D1F] leading-relaxed max-w-3xl`}
                    >
                      <span
                        className={`${plexMono.className} font-medium tracking-[0.15em] text-[#DE4B31] uppercase mr-3 text-xs`}
                      >
                        {activeConceptTitle}
                      </span>
                      {activeDefinition}
                    </p>
                    <span
                      className={`${plexMono.className} text-[10px] uppercase tracking-[0.18em] text-[#1B1D1F]/50 shrink-0`}
                    >
                      STAGE PRIMITIVE
                    </span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="default-caption"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2, ease: EASE }}
                    className="flex flex-col md:flex-row md:items-baseline justify-between gap-3"
                  >
                    <p
                      className={`${serif.className} max-w-3xl text-sm italic leading-relaxed text-[#1B1D1F]/75 md:text-base`}
                    >
                      Figure 1. Every information system can be understood as a sequence of
                      observation, state formation, contextualization, modelling, coordination, and
                      decision. The concepts introduced below describe each stage independently.
                    </p>
                    <span
                      className={`${plexMono.className} shrink-0 text-[10px] uppercase tracking-[0.18em] text-[#1B1D1F]/45`}
                    >
                      HOVER NODE TO EXPLORE
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Explanatory Paragraph (Placed below the figure as evidence) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          className="mt-12 max-w-3xl border-t border-[#E6E1D6]/10 pt-8"
        >
          <p
            className={`${serif.className} text-base leading-relaxed text-[#E6E1D6]/60 md:text-lg`}
          >
            Every case study, architecture paper, research article, and implementation across this
            archive eventually traces back to the fundamental information dynamics introduced above.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
