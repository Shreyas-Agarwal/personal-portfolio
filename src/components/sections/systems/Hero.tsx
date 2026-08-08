"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
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
  const pinRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end start"],
  });

  // The header yields space as the reader scrolls, and the figure fills it —
  // a layout unfold rather than a camera move. Everything finishes by the
  // midpoint of the pinned scroll range, leaving a quiet dwell at full scale.
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);
  const subtitleHeight = useTransform(scrollYProgress, [0, 0.28], [1.75, 0]);
  const eyebrowOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0.45]);
  const figureScale = useTransform(scrollYProgress, [0, 0.5], [0.68, 1]);
  const figureMarginTop = useTransform(scrollYProgress, [0, 0.5], [1.5, 4]);
  const figureChromeOpacity = useTransform(scrollYProgress, [0, 0.4], [0.5, 1]);
  const subtitleHeightRem = useTransform(subtitleHeight, (v) => `${v}rem`);
  const subtitleMarginTopRem = useTransform(subtitleOpacity, (v) => `${v}rem`);
  const figureMarginTopRem = useTransform(figureMarginTop, (v) => `${v}rem`);

  const activeDefinition = hoveredNode ? NODE_DEFINITIONS[hoveredNode.toLowerCase()] : null;
  const activeConceptTitle = hoveredNode
    ? CONCEPTS_MAP.get(hoveredNode.toLowerCase())?.title || hoveredNode.toUpperCase()
    : null;

  return (
    <section data-header-theme="dark" className="relative bg-[#1B1D1F] px-6 md:px-12">
      {/* Pinned Stage — the header recedes and the figure expands into its canonical
          presentation as the reader scrolls, like a fold-out plate unfolding in a
          technical monograph. Skipped for reduced-motion, where everything is static. */}
      <div
        ref={pinRef}
        className="relative"
        style={prefersReducedMotion ? undefined : { height: "220vh" }}
      >
        <div
          className={
            prefersReducedMotion
              ? "flex flex-col justify-center py-24 md:py-28"
              : "sticky top-0 flex min-h-screen flex-col justify-center overflow-hidden py-24 md:py-28"
          }
        >
          <div className="relative mx-auto w-full max-w-6xl">
            {/* Compressed Monograph Header — abstract, not a landing-page hero */}
            <div>
              <h1
                className={`${serif.className} whitespace-nowrap text-[clamp(1.75rem,5.2vw,3.75rem)] font-normal leading-[1.06] tracking-tight text-[#E6E1D6]`}
              >
                Foundations of Information Systems
              </h1>
            </div>

            {/* Centerpiece Figure — the conceptual backbone of the section, progressively
                expanding into its full canonical presentation as the header recedes */}
            <motion.div
              style={
                prefersReducedMotion
                  ? undefined
                  : {
                      scale: figureScale,
                      marginTop: figureMarginTopRem,
                      transformOrigin: "top center",
                    }
              }
              className="mt-10 md:mt-12"
            >
              {/* Figure Header */}
              <motion.div
                style={prefersReducedMotion ? undefined : { opacity: figureChromeOpacity }}
                className="mb-8 flex items-center justify-between border-b border-[#E6E1D6]/12 pb-5"
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`${plexMono.className} text-xs font-medium uppercase tracking-[0.22em] text-[#E6E1D6]/85`}
                  >
                    FIGURE 01
                  </span>
                  <span className="h-3 w-px bg-[#E6E1D6]/20" />
                  <span
                    className={`${plexMono.className} text-[11px] uppercase tracking-[0.18em] text-[#E6E1D6]/50`}
                  >
                    CANONICAL INFORMATION FLOW
                  </span>
                </div>
                <span
                  className={`${plexMono.className} text-[10px] uppercase tracking-[0.2em] text-[#E6E1D6]/35`}
                >
                  REVISION 2026.08
                </span>
              </motion.div>

              {/* Visual Centerpiece Diagram — the focal point of the composition */}
              <div className="flex w-full items-center justify-center py-6 md:py-12">
                <FigureOneFlow
                  activeHoverNode={hoveredNode}
                  onHoverNode={setHoveredNode}
                  theme="dark"
                />
              </div>

              {/* Figure Caption (Dynamic Teaching Mode) */}
              <div className="mt-6 border-t border-[#E6E1D6]/12 pt-5 min-h-[70px] flex flex-col justify-center">
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
                        className={`${serif.className} text-base md:text-lg text-[#E6E1D6] leading-relaxed max-w-3xl`}
                      >
                        <span
                          className={`${plexMono.className} font-medium tracking-[0.15em] text-[#DE4B31] uppercase mr-3 text-xs`}
                        >
                          {activeConceptTitle}
                        </span>
                        {activeDefinition}
                      </p>
                      <span
                        className={`${plexMono.className} text-[10px] uppercase tracking-[0.18em] text-[#E6E1D6]/40 shrink-0`}
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
                        className={`${serif.className} max-w-3xl text-sm italic leading-relaxed text-[#E6E1D6]/65 md:text-base`}
                      >
                        Figure 1. Every information system can be understood as a sequence of
                        observation, state formation, contextualization, modelling, coordination,
                        and decision. The concepts introduced below describe each stage
                        independently.
                      </p>
                      <span
                        className={`${plexMono.className} shrink-0 text-[10px] uppercase tracking-[0.18em] text-[#E6E1D6]/35`}
                      >
                        HOVER NODE TO EXPLORE
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Continued Reading — commentary on the figure, arriving only once the reader
          has had a moment with the expanded diagram */}
      <div className="relative mx-auto w-full max-w-6xl pb-20 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="max-w-2xl border-l-2 border-[#DE4B31]/50 pl-6 md:pl-8"
        >
          <p
            className={`${serif.className} text-xl leading-relaxed tracking-tight text-[#E6E1D6] md:text-[1.6rem]`}
          >
            The longer I work around systems, the less architecture feels like software design.
          </p>
          <p
            className={`${serif.className} mt-2 text-xl leading-relaxed tracking-tight text-[#E6E1D6]/55 md:text-[1.6rem]`}
          >
            The more it feels like designing for coordination, visibility, operational clarity,
            and organizational memory.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="mt-10 max-w-3xl border-t border-[#E6E1D6]/10 pt-8"
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
