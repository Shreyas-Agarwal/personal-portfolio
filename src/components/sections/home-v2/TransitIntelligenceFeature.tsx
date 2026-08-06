"use client";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { type ReactNode, useState } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { plexMono, serif } from "@/lib/fonts";

interface TermTooltipProps {
  term: string;
  note: string | ReactNode;
}

function TermTooltip({ term, note }: TermTooltipProps) {
  return (
    <HoverCard openDelay={150}>
      <HoverCardTrigger asChild>
        <span className="cursor-help border-b border-dotted border-[#E6E1D6]/20 transition-colors hover:border-[#E6E1D6]/60">
          {term}
        </span>
      </HoverCardTrigger>
      <HoverCardContent
        side="top"
        align="start"
        sideOffset={6}
        className="w-72 border-[#E6E1D6]/10 bg-[#25282A] p-3 text-left z-50 animate-in fade-in zoom-in-95 duration-150"
      >
        {typeof note === "string" ? (
          <p className={`${plexMono.className} text-[11px] leading-relaxed text-[#E6E1D6]/80`}>
            {note}
          </p>
        ) : (
          note
        )}
      </HoverCardContent>
    </HoverCard>
  );
}

import { ArrowVisual } from "@/components/animations/ArrowVisual";
// Animations Imports
import { BackpressureVisual } from "@/components/animations/BackpressureVisual";
import { BenchmarkingVisual } from "@/components/animations/BenchmarkingVisual";
import { ConcurrencyVisual } from "@/components/animations/ConcurrencyVisual";
import { DelayPropagationVisual } from "@/components/animations/DelayPropagationVisual";
import { DuckDBVisual } from "@/components/animations/DuckDBVisual";
import { HistoricalReplayVisual } from "@/components/animations/HistoricalReplayVisual";
import { IcebergVisual } from "@/components/animations/IcebergVisual";
import { OrderingVisual } from "@/components/animations/OrderingVisual";
import { PolarsVisual } from "@/components/animations/PolarsVisual";
import { ReplayVisual } from "@/components/animations/ReplayVisual";
import { RouteReconstructionVisual } from "@/components/animations/RouteReconstructionVisual";
import { TemporalGraphVisual } from "@/components/animations/TemporalGraphVisual";

export function TransitIntelligenceFeature() {
  const [hoveredNode, setHoveredNode] = useState<"operational" | "go" | "lakehouse">("operational");
  const [labsRevealed, setLabsRevealed] = useState(false);
  const [mobileSystem, setMobileSystem] = useState<"operational" | "go" | "lakehouse" | null>(
    "operational",
  );

  const toggleMobileSystem = (sys: "operational" | "go" | "lakehouse") => {
    setMobileSystem(mobileSystem === sys ? null : sys);
  };

  return (
    <section data-header-theme="dark" className="relative bg-[#1B1D1F] px-6 py-24 md:px-12">
      <div className="mx-auto max-w-5xl">
        {/* Title Block with Metadata beside it (matching Hero layout) */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_220px] mb-16 pb-8 border-b border-[#E6E1D6]/10">
          <div>
            <div
              className={`${plexMono.className} text-[9px] uppercase tracking-[0.22em] text-[#E6E1D6]/40 mb-4`}
            >
              CASE STUDY 01
            </div>
            <h2
              className={`${serif.className} text-[3rem] italic leading-tight text-[#E6E1D6]/95 md:text-[3.5rem]`}
            >
              Transit Intelligence
            </h2>
          </div>

          <div className="flex items-center">
            <div
              className={`${plexMono.className} space-y-3 text-[11px] tracking-wide text-[#E6E1D6]/35`}
            >
              <div>
                <span className="block text-[9px] uppercase tracking-[0.15em] text-[#E6E1D6]/20 mb-0.5">
                  STATUS
                </span>
                <span className="text-[#E6E1D6]/70">Research & Development</span>
              </div>
              <div>
                <span className="block text-[9px] uppercase tracking-[0.15em] text-[#E6E1D6]/20 mb-0.5">
                  STARTED
                </span>
                <span className="text-[#E6E1D6]/70">2026</span>
              </div>
              <div>
                <span className="block text-[9px] uppercase tracking-[0.15em] text-[#E6E1D6]/20 mb-0.5">
                  REVISION
                </span>
                <span className="text-[#E6E1D6]/70">07.2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Grid Layout: Main interactive tree on left, margin notes on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Left Column (Main content) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Opening Thesis */}
            <div className="max-w-2xl">
              <p
                className={`${serif.className} text-lg md:text-xl leading-relaxed text-[#E6E1D6]/85`}
              >
                Transit Intelligence is where the ideas explored in this journal become executable.
                It began with public transport, but evolved into a broader investigation of how
                operational systems preserve meaning while computation, infrastructure and time
                continuously reshape reality.
              </p>
            </div>

            {/* The Actual Problem */}
            <div className="border-l border-[#E6E1D6]/25 pl-5 py-2 max-w-2xl">
              <div
                className={`${serif.className} text-base italic text-[#E6E1D6]/75 leading-relaxed space-y-3`}
              >
                <p>A train departure isn’t a fact.</p>
                <p>
                  It is an evolving agreement between schedules, sensors, predictions, historical
                  observations, operators, and passengers.
                </p>
                <p>Every representation is partially true.</p>
                <p>
                  The engineering challenge is deciding which version of reality the system should
                  trust, when, and why.
                </p>
              </div>
            </div>

            {/* Interactive Schematic Diagram (Desktop only) */}
            {/* Shows parent-child dependency mapping from labs to platform */}
            <div
              className="hidden lg:block relative p-6 border border-[#E6E1D6]/5 bg-[#E6E1D6]/[0.01] rounded-sm select-none"
              onMouseEnter={() => setLabsRevealed(true)}
            >
              <span
                className={`${plexMono.className} absolute top-3 right-3 text-[9px] text-[#E6E1D6]/25 uppercase tracking-widest`}
              >
                Interactive Schematic // Hover to explore
              </span>

              <svg viewBox="0 0 540 160" className="w-full h-auto">
                {/* Go Event Lab (Fades in on reveal, on top row) */}
                <motion.text
                  x="130"
                  y="30"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className={`${serif.className} text-lg fill-[#E6E1D6] transition-colors cursor-pointer select-none`}
                  fillOpacity={hoveredNode === "go" ? 1 : 0.5}
                  animate={{ opacity: labsRevealed ? 1 : 0, y: labsRevealed ? 30 : 15 }}
                  transition={{ duration: 0.5 }}
                  onMouseEnter={() => setHoveredNode("go")}
                >
                  Go Event Lab
                </motion.text>

                {/* Lakehouse Lab (Fades in on reveal, on top row) */}
                <motion.text
                  x="410"
                  y="30"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className={`${serif.className} text-lg fill-[#E6E1D6] transition-colors cursor-pointer select-none`}
                  fillOpacity={hoveredNode === "lakehouse" ? 1 : 0.5}
                  animate={{ opacity: labsRevealed ? 1 : 0, y: labsRevealed ? 30 : 15 }}
                  transition={{ duration: 0.5 }}
                  onMouseEnter={() => setHoveredNode("lakehouse")}
                >
                  Lakehouse Lab
                </motion.text>

                {/* Hairlines flowing from labs down and merging */}
                {/* Go Event Lab down and right to junction */}
                <motion.path
                  d="M 130 50 L 130 80 L 258 80"
                  fill="none"
                  stroke="#DE4B31"
                  strokeWidth={0.75}
                  strokeOpacity={hoveredNode === "go" ? 0.8 : 0.2}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: labsRevealed ? 1 : 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
                />

                {/* Lakehouse Lab down and left to junction */}
                <motion.path
                  d="M 410 50 L 410 80 L 282 80"
                  fill="none"
                  stroke="#DE4B31"
                  strokeWidth={0.75}
                  strokeOpacity={hoveredNode === "lakehouse" ? 0.8 : 0.2}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: labsRevealed ? 1 : 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
                />

                {/* Path from Diamond down to Transit Intelligence */}
                <motion.path
                  d="M 270 88 L 270 114"
                  fill="none"
                  stroke="#DE4B31"
                  strokeWidth={0.75}
                  strokeOpacity={hoveredNode === "operational" ? 0.8 : 0.2}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: labsRevealed ? 1 : 0 }}
                  transition={{ duration: 0.4, delay: 0.8, ease: "easeInOut" }}
                />

                {/* Diamond connector */}
                <motion.text
                  x="270"
                  y="81"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className={`${plexMono.className} text-sm fill-[#DE4B31] select-none`}
                  animate={{ opacity: labsRevealed ? 1 : 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                >
                  ◇
                </motion.text>

                {/* Transit Intelligence (Always visible, downstream core at bottom) */}
                <text
                  x="270"
                  y="135"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className={`${serif.className} text-xl fill-[#E6E1D6] transition-colors cursor-pointer select-none font-medium`}
                  fillOpacity={hoveredNode === "operational" ? 1 : 0.5}
                  onMouseEnter={() => setHoveredNode("operational")}
                >
                  Transit Intelligence
                </text>
              </svg>

              {/* Reveal Thesis Statement under diagram */}
              <AnimatePresence>
                {labsRevealed && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 border-t border-[#E6E1D6]/5 pt-4 text-center"
                  >
                    <p
                      className={`${serif.className} text-base md:text-lg italic text-[#E6E1D6]/70 leading-relaxed max-w-xl mx-auto`}
                    >
                      These laboratories don’t exist because of Transit Intelligence.
                      <br />
                      Transit Intelligence exists because these laboratories do.
                      <br />
                      <span className="text-[#DE4B31] font-medium not-italic mt-1 block">
                        The project changes. The engineering questions remain.
                      </span>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile interactive details list */}
            <div className="lg:hidden mt-8 space-y-6">
              <span
                className={`${plexMono.className} text-[9px] text-[#E6E1D6]/35 uppercase tracking-widest block`}
              >
                Lab Divisions // Tap to explore
              </span>

              {/* System 1: Operational Platform */}
              <div className="border border-[#E6E1D6]/10 p-5 bg-[#E6E1D6]/[0.02] rounded-sm">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleMobileSystem("operational")}
                >
                  <span className={`${plexMono.className} text-xs text-[#DE4B31] tracking-wider`}>
                    ◇ OPERATIONAL PLATFORM
                  </span>
                  <span className="text-[#E6E1D6]/40 text-xs">
                    {mobileSystem === "operational" ? "▲" : "▼"}
                  </span>
                </div>
                <AnimatePresence>
                  {mobileSystem === "operational" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden mt-4 space-y-4"
                    >
                      <p className={`${serif.className} text-sm text-[#E6E1D6]/70`}>
                        Where research becomes software.
                      </p>
                      <div className="space-y-3 pt-2">
                        <div>
                          <span
                            className={`${plexMono.className} block text-[9px] uppercase tracking-wider text-[#E6E1D6]/30`}
                          >
                            Current focus
                          </span>
                          <ul
                            className={`${plexMono.className} text-[11px] text-[#E6E1D6]/80 mt-1 space-y-2`}
                          >
                            <li className="flex items-center gap-1">
                              ✓{" "}
                              <TermTooltip
                                term="Temporal Graph"
                                note={
                                  <div className="space-y-2">
                                    <p
                                      className={`${plexMono.className} text-[11px] leading-relaxed text-[#E6E1D6]/80`}
                                    >
                                      Current research direction. Evaluating whether topology
                                      changes should themselves become events.
                                    </p>
                                    <TemporalGraphVisual />
                                  </div>
                                }
                              />
                            </li>
                            <li className="flex items-center gap-1">
                              ✓{" "}
                              <TermTooltip
                                term="Delay propagation"
                                note={
                                  <div className="space-y-2">
                                    <p
                                      className={`${plexMono.className} text-[11px] leading-relaxed text-[#E6E1D6]/80`}
                                    >
                                      Integrated into the platform to simulate how upstream vehicle
                                      delays cascade through downstream stops.
                                    </p>
                                    <DelayPropagationVisual />
                                  </div>
                                }
                              />
                            </li>
                            <li className="flex items-center gap-1">
                              ✓{" "}
                              <TermTooltip
                                term="Route reconstruction"
                                note={
                                  <div className="space-y-2">
                                    <p
                                      className={`${plexMono.className} text-[11px] leading-relaxed text-[#E6E1D6]/80`}
                                    >
                                      Designed to stitch sparse GPS coordinate pings together into
                                      continuous, schedule-aligned paths.
                                    </p>
                                    <RouteReconstructionVisual />
                                  </div>
                                }
                              />
                            </li>
                          </ul>
                        </div>
                        <div>
                          <span
                            className={`${plexMono.className} block text-[9px] uppercase tracking-wider text-[#E6E1D6]/30`}
                          >
                            Status
                          </span>
                          <span className={`${plexMono.className} text-xs text-[#E6E1D6]/80`}>
                            Active
                          </span>
                        </div>
                        <div className="pt-2">
                          <Link
                            href="/systems/transit-intelligence"
                            className={`${plexMono.className} text-[11px] text-[#DE4B31] uppercase tracking-wider`}
                          >
                            Open system →
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* System 2: Go Event Lab */}
              <div className="border border-[#E6E1D6]/10 p-5 bg-[#E6E1D6]/[0.02] rounded-sm">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleMobileSystem("go")}
                >
                  <span
                    className={`${plexMono.className} text-xs text-[#E6E1D6]/60 tracking-wider`}
                  >
                    ◇ GO EVENT LAB
                  </span>
                  <span className="text-[#E6E1D6]/40 text-xs">
                    {mobileSystem === "go" ? "▲" : "▼"}
                  </span>
                </div>
                <AnimatePresence>
                  {mobileSystem === "go" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden mt-4 space-y-4"
                    >
                      <p className={`${serif.className} text-sm text-[#E6E1D6]/70`}>
                        Understanding what event systems actually do under pressure.
                      </p>
                      <div className="space-y-2 pt-2">
                        <span
                          className={`${plexMono.className} block text-[9px] uppercase tracking-wider text-[#E6E1D6]/30`}
                        >
                          Core Focus areas
                        </span>
                        <div className="flex flex-wrap gap-x-2 gap-y-1">
                          <span className="text-xs text-[#E6E1D6]/80">
                            <TermTooltip
                              term="Backpressure"
                              note={
                                <div className="space-y-2">
                                  <p
                                    className={`${plexMono.className} text-[11px] leading-relaxed text-[#E6E1D6]/80`}
                                  >
                                    Learned while benchmarking bounded Go channels under increasing
                                    producer rates. Eventually informed the ingestion layer of
                                    Transit Intelligence.
                                  </p>
                                  <BackpressureVisual />
                                </div>
                              }
                            />
                          </span>
                          <span className="text-[#E6E1D6]/30">·</span>
                          <span className="text-xs text-[#E6E1D6]/80">
                            <TermTooltip
                              term="Ordering"
                              note={
                                <div className="space-y-2">
                                  <p
                                    className={`${plexMono.className} text-[11px] leading-relaxed text-[#E6E1D6]/80`}
                                  >
                                    Proven in Go Event Lab to ensure distributed event streams
                                    execute deterministically.
                                  </p>
                                  <OrderingVisual />
                                </div>
                              }
                            />
                          </span>
                          <span className="text-[#E6E1D6]/30">·</span>
                          <span className="text-xs text-[#E6E1D6]/80">
                            <TermTooltip
                              term="Replay"
                              note={
                                <div className="space-y-2">
                                  <p
                                    className={`${plexMono.className} text-[11px] leading-relaxed text-[#E6E1D6]/80`}
                                  >
                                    Tested under synthetic load to verify how historical system
                                    state can be reliably reconstructed from immutable logs.
                                  </p>
                                  <ReplayVisual />
                                </div>
                              }
                            />
                          </span>
                          <span className="text-[#E6E1D6]/30">·</span>
                          <span className="text-xs text-[#E6E1D6]/80">
                            <TermTooltip
                              term="Concurrency"
                              note={
                                <div className="space-y-2">
                                  <p
                                    className={`${plexMono.className} text-[11px] leading-relaxed text-[#E6E1D6]/80`}
                                  >
                                    Analyzed under lock-free constraints in Go Event Lab to avoid
                                    operational thread contention.
                                  </p>
                                  <ConcurrencyVisual />
                                </div>
                              }
                            />
                          </span>
                          <span className="text-[#E6E1D6]/30">·</span>
                          <span className="text-xs text-[#E6E1D6]/80">
                            <TermTooltip
                              term="Benchmarking"
                              note={
                                <div className="space-y-2">
                                  <p
                                    className={`${plexMono.className} text-[11px] leading-relaxed text-[#E6E1D6]/80`}
                                  >
                                    Executed in the Go lab to measure throughput and memory overhead
                                    under peak simulated pressure.
                                  </p>
                                  <BenchmarkingVisual />
                                </div>
                              }
                            />
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* System 3: Lakehouse Engineering Lab */}
              <div className="border border-[#E6E1D6]/10 p-5 bg-[#E6E1D6]/[0.02] rounded-sm">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleMobileSystem("lakehouse")}
                >
                  <span
                    className={`${plexMono.className} text-xs text-[#E6E1D6]/60 tracking-wider`}
                  >
                    ◇ LAKEHOUSE LAB
                  </span>
                  <span className="text-[#E6E1D6]/40 text-xs">
                    {mobileSystem === "lakehouse" ? "▲" : "▼"}
                  </span>
                </div>
                <AnimatePresence>
                  {mobileSystem === "lakehouse" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden mt-4 space-y-4"
                    >
                      <p className={`${serif.className} text-sm text-[#E6E1D6]/70`}>
                        Understanding how meaning survives across decades of historical computation.
                      </p>
                      <div className="space-y-2 pt-2">
                        <span
                          className={`${plexMono.className} block text-[9px] uppercase tracking-wider text-[#E6E1D6]/30`}
                        >
                          Stack & Focus
                        </span>
                        <div className="flex flex-wrap gap-x-2 gap-y-1">
                          <span className="text-xs text-[#E6E1D6]/80">
                            <TermTooltip
                              term="Arrow"
                              note={
                                <div className="space-y-2">
                                  <p
                                    className={`${plexMono.className} text-[11px] leading-relaxed text-[#E6E1D6]/80`}
                                  >
                                    Chosen as the common columnar transport layout to enable
                                    zero-copy transfers between computation layers.
                                  </p>
                                  <ArrowVisual />
                                </div>
                              }
                            />
                          </span>
                          <span className="text-[#E6E1D6]/30">·</span>
                          <span className="text-xs text-[#E6E1D6]/80">
                            <TermTooltip
                              term="DuckDB"
                              note={
                                <div className="space-y-2">
                                  <p
                                    className={`${plexMono.className} text-[11px] leading-relaxed text-[#E6E1D6]/80`}
                                  >
                                    Selected after benchmarking analytical workloads against Polars
                                    and Pandas.
                                  </p>
                                  <DuckDBVisual />
                                </div>
                              }
                            />
                          </span>
                          <span className="text-[#E6E1D6]/30">·</span>
                          <span className="text-xs text-[#E6E1D6]/80">
                            <TermTooltip
                              term="Polars"
                              note={
                                <div className="space-y-2">
                                  <p
                                    className={`${plexMono.className} text-[11px] leading-relaxed text-[#E6E1D6]/80`}
                                  >
                                    Evaluated alongside DuckDB to compare vectorized in-memory
                                    compute speeds.
                                  </p>
                                  <PolarsVisual />
                                </div>
                              }
                            />
                          </span>
                          <span className="text-[#E6E1D6]/30">·</span>
                          <span className="text-xs text-[#E6E1D6]/80">
                            <TermTooltip
                              term="Iceberg"
                              note={
                                <div className="space-y-2">
                                  <p
                                    className={`${plexMono.className} text-[11px] leading-relaxed text-[#E6E1D6]/80`}
                                  >
                                    Implemented in the Lakehouse lab to establish queryable
                                    historical state snapshots as the schema evolves.
                                  </p>
                                  <IcebergVisual />
                                </div>
                              }
                            />
                          </span>
                          <span className="text-[#E6E1D6]/30">·</span>
                          <span className="text-xs text-[#E6E1D6]/80">
                            <TermTooltip
                              term="Historical replay"
                              note={
                                <div className="space-y-2">
                                  <p
                                    className={`${plexMono.className} text-[11px] leading-relaxed text-[#E6E1D6]/80`}
                                  >
                                    Evaluated to check how long-term drift analysis queries execute
                                    against deep Parquet stores.
                                  </p>
                                  <HistoricalReplayVisual />
                                </div>
                              }
                            />
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile text-reveal statement */}
              <p className={`${serif.className} text-sm italic text-[#E6E1D6]/60 pt-2`}>
                These laboratories don’t exist because of Transit Intelligence. Transit Intelligence
                exists because these laboratories do.
                <br />
                <span className="text-[#DE4B31] not-italic block mt-1">
                  The project changes. The engineering questions remain.
                </span>
              </p>
            </div>

            {/* Working Principle (Renamed from Field Note) */}
            <div className="border border-[#DE4B31]/30 bg-[#DE4B31]/[0.03] p-6 max-w-2xl my-12 relative">
              <div
                className={`${plexMono.className} text-[9px] uppercase tracking-[0.14em] text-[#DE4B31] mb-3`}
              >
                WORKING PRINCIPLE
              </div>
              <div className={`${serif.className} text-base leading-relaxed text-[#E6E1D6]/80`}>
                <p>Stable applications emerge when modelling begins at the semantic layer.</p>
              </div>

              {/* Architectural Sketch Imagery */}
              <div className="flex flex-col items-center pt-6 border-t border-[#E6E1D6]/10 mt-6 select-none">
                {/* Stable: Semantic Model First */}
                <div className="flex flex-col items-center p-4 border border-[#E6E1D6]/5 bg-[#E6E1D6]/[0.01] rounded-sm max-w-[200px] w-full">
                  <span
                    className={`${plexMono.className} text-[9px] text-[#E6E1D6]/70 uppercase tracking-wider mb-4`}
                  >
                    Data-First (Stable)
                  </span>
                  <svg viewBox="0 0 160 100" className="w-full max-w-[140px] h-auto">
                    {/* Small UI Sitting on top */}
                    <rect
                      x="50"
                      y="10"
                      width="60"
                      height="20"
                      fill="none"
                      stroke="#E6E1D6"
                      strokeWidth={0.75}
                      strokeOpacity={0.4}
                    />
                    <text
                      x="80"
                      y="22"
                      textAnchor="middle"
                      className={`${plexMono.className} text-[8px] fill-[#E6E1D6]/60`}
                    >
                      UI Layer
                    </text>

                    {/* Broad, solid Semantic & Data foundation below */}
                    <rect
                      x="15"
                      y="45"
                      width="130"
                      height="42"
                      fill="none"
                      stroke="#E6E1D6"
                      strokeWidth={1}
                      strokeOpacity={0.8}
                    />
                    <text
                      x="80"
                      y="65"
                      textAnchor="middle"
                      className={`${plexMono.className} text-[9px] fill-[#E6E1D6] font-semibold`}
                    >
                      SEMANTIC MODEL
                    </text>
                    <text
                      x="80"
                      y="77"
                      textAnchor="middle"
                      className={`${plexMono.className} text-[7px] fill-[#E6E1D6]/40`}
                    >
                      Immutable Schema
                    </text>

                    {/* Solid support lines */}
                    <line
                      x1="45"
                      y1="30"
                      x2="45"
                      y2="45"
                      stroke="#E6E1D6"
                      strokeWidth={0.5}
                      strokeDasharray="2 2"
                      strokeOpacity={0.3}
                    />
                    <line
                      x1="115"
                      y1="30"
                      x2="115"
                      y2="45"
                      stroke="#E6E1D6"
                      strokeWidth={0.5}
                      strokeDasharray="2 2"
                      strokeOpacity={0.3}
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Open Questions Checklist (Visible Uncertainty) */}
            <div className="my-10 max-w-md border-t border-[#E6E1D6]/10 pt-6">
              <span
                className={`${plexMono.className} block text-[9px] uppercase tracking-wider text-[#E6E1D6]/35 mb-4`}
              >
                OPEN QUESTIONS & REVISIONS
              </span>
              <ul className={`${plexMono.className} text-xs text-[#E6E1D6]/60 space-y-3`}>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#DE4B31] font-semibold">□</span>
                  <span>Should route topology be temporal?</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#DE4B31] font-semibold">□</span>
                  <span>Historical replay benchmark execution</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-500 font-semibold">✓</span>
                  <span className="line-through text-[#E6E1D6]/40">
                    Realtime Event ingestion and processing complete
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Margin notes display (Desktop only) */}
          <div className="lg:col-span-4 hidden lg:block relative">
            <div className="sticky top-28 space-y-6">
              <span
                className={`${plexMono.className} block text-[9px] text-[#E6E1D6]/30 uppercase tracking-widest border-b border-[#E6E1D6]/10 pb-2`}
              >
                System Blueprint
              </span>

              <AnimatePresence mode="wait">
                {hoveredNode === "operational" && (
                  <motion.div
                    key="operational"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="border border-[#E6E1D6]/10 p-6 bg-[#E6E1D6]/[0.02]"
                  >
                    <div
                      className={`${plexMono.className} text-[10px] font-semibold uppercase tracking-wider text-[#DE4B31] mb-2`}
                    >
                      ◇ OPERATIONAL PLATFORM
                    </div>
                    <span
                      className={`${plexMono.className} block text-[9px] text-[#E6E1D6]/40 uppercase mb-3`}
                    >
                      Production Platform
                    </span>
                    <p
                      className={`${serif.className} text-xs text-[#E6E1D6]/70 leading-relaxed mb-4`}
                    >
                      Where research becomes software.
                    </p>
                    <div className="space-y-4 pt-2">
                      <div>
                        <span
                          className={`${plexMono.className} block text-[9px] uppercase tracking-wider text-[#E6E1D6]/30`}
                        >
                          Current focus
                        </span>
                        <ul
                          className={`${plexMono.className} text-[11px] text-[#E6E1D6]/80 mt-1.5 space-y-2`}
                        >
                          <li className="flex items-center gap-1">
                            ✓{" "}
                            <TermTooltip
                              term="Temporal Graph"
                              note={
                                <div className="space-y-2">
                                  <p
                                    className={`${plexMono.className} text-[11px] leading-relaxed text-[#E6E1D6]/80`}
                                  >
                                    Current research direction. Evaluating whether topology changes
                                    should themselves become events.
                                  </p>
                                  <TemporalGraphVisual />
                                </div>
                              }
                            />
                          </li>
                          <li className="flex items-center gap-1">
                            ✓{" "}
                            <TermTooltip
                              term="Delay propagation"
                              note={
                                <div className="space-y-2">
                                  <p
                                    className={`${plexMono.className} text-[11px] leading-relaxed text-[#E6E1D6]/80`}
                                  >
                                    Integrated into the platform to simulate how upstream vehicle
                                    delays cascade through downstream stops.
                                  </p>
                                  <DelayPropagationVisual />
                                </div>
                              }
                            />
                          </li>
                          <li className="flex items-center gap-1">
                            ✓{" "}
                            <TermTooltip
                              term="Route reconstruction"
                              note={
                                <div className="space-y-2">
                                  <p
                                    className={`${plexMono.className} text-[11px] leading-relaxed text-[#E6E1D6]/80`}
                                  >
                                    Designed to stitch sparse GPS coordinate pings together into
                                    continuous, schedule-aligned paths.
                                  </p>
                                  <RouteReconstructionVisual />
                                </div>
                              }
                            />
                          </li>
                        </ul>
                      </div>
                      <div>
                        <span
                          className={`${plexMono.className} block text-[9px] uppercase tracking-wider text-[#E6E1D6]/30`}
                        >
                          Status
                        </span>
                        <span className={`${plexMono.className} text-xs text-[#E6E1D6]/80`}>
                          Active
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {hoveredNode === "go" && (
                  <motion.div
                    key="go"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="border border-[#E6E1D6]/10 p-6 bg-[#E6E1D6]/[0.02]"
                  >
                    <div
                      className={`${plexMono.className} text-[10px] font-semibold uppercase tracking-wider text-[#E6E1D6]/80 mb-2`}
                    >
                      ◇ GO EVENT LAB
                    </div>
                    <span
                      className={`${plexMono.className} block text-[9px] text-[#E6E1D6]/40 uppercase mb-3`}
                    >
                      Engineering Laboratory
                    </span>
                    <p
                      className={`${serif.className} text-xs text-[#E6E1D6]/70 leading-relaxed mb-4`}
                    >
                      Understanding what event systems actually do under pressure.
                    </p>
                    <div>
                      <span
                        className={`${plexMono.className} block text-[9px] uppercase tracking-wider text-[#E6E1D6]/30 mb-2`}
                      >
                        Core Focus Areas
                      </span>
                      <div className="flex flex-col gap-2 mt-1">
                        <span className="text-xs text-[#E6E1D6]/80">
                          <TermTooltip
                            term="Backpressure"
                            note={
                              <div className="space-y-2">
                                <p
                                  className={`${plexMono.className} text-[11px] leading-relaxed text-[#E6E1D6]/80`}
                                >
                                  Learned while benchmarking bounded Go channels under increasing
                                  producer rates. Eventually informed the ingestion layer of Transit
                                  Intelligence.
                                </p>
                                <BackpressureVisual />
                              </div>
                            }
                          />
                        </span>
                        <span className="text-xs text-[#E6E1D6]/80">
                          <TermTooltip
                            term="Ordering"
                            note={
                              <div className="space-y-2">
                                <p
                                  className={`${plexMono.className} text-[11px] leading-relaxed text-[#E6E1D6]/80`}
                                >
                                  Proven in Go Event Lab to ensure distributed event streams execute
                                  deterministically.
                                </p>
                                <OrderingVisual />
                              </div>
                            }
                          />
                        </span>
                        <span className="text-xs text-[#E6E1D6]/80">
                          <TermTooltip
                            term="Replay"
                            note={
                              <div className="space-y-2">
                                <p
                                  className={`${plexMono.className} text-[11px] leading-relaxed text-[#E6E1D6]/80`}
                                >
                                  Tested under synthetic load to verify how historical system state
                                  can be reliably reconstructed from immutable logs.
                                </p>
                                <ReplayVisual />
                              </div>
                            }
                          />
                        </span>
                        <span className="text-xs text-[#E6E1D6]/80">
                          <TermTooltip
                            term="Concurrency"
                            note={
                              <div className="space-y-2">
                                <p
                                  className={`${plexMono.className} text-[11px] leading-relaxed text-[#E6E1D6]/80`}
                                >
                                  Analyzed under lock-free constraints in Go Event Lab to avoid
                                  operational thread contention.
                                </p>
                                <ConcurrencyVisual />
                              </div>
                            }
                          />
                        </span>
                        <span className="text-xs text-[#E6E1D6]/80">
                          <TermTooltip
                            term="Benchmarking"
                            note={
                              <div className="space-y-2">
                                <p
                                  className={`${plexMono.className} text-[11px] leading-relaxed text-[#E6E1D6]/80`}
                                >
                                  Executed in the Go lab to measure throughput and memory overhead
                                  under peak simulated pressure.
                                </p>
                                <BenchmarkingVisual />
                              </div>
                            }
                          />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {hoveredNode === "lakehouse" && (
                  <motion.div
                    key="lakehouse"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="border border-[#E6E1D6]/10 p-6 bg-[#E6E1D6]/[0.02]"
                  >
                    <div
                      className={`${plexMono.className} text-[10px] font-semibold uppercase tracking-wider text-[#E6E1D6]/80 mb-2`}
                    >
                      ◇ LAKEHOUSE LAB
                    </div>
                    <span
                      className={`${plexMono.className} block text-[9px] text-[#E6E1D6]/40 uppercase mb-3`}
                    >
                      Data Engineering Laboratory
                    </span>
                    <p
                      className={`${serif.className} text-xs text-[#E6E1D6]/70 leading-relaxed mb-4`}
                    >
                      Understanding how meaning survives across decades of historical computation.
                    </p>
                    <div>
                      <span
                        className={`${plexMono.className} block text-[9px] uppercase tracking-wider text-[#E6E1D6]/30 mb-2`}
                      >
                        Stack & Focus
                      </span>
                      <div className="flex flex-col gap-2 mt-1">
                        <span className="text-xs text-[#E6E1D6]/80">
                          <TermTooltip
                            term="Arrow"
                            note={
                              <div className="space-y-2">
                                <p
                                  className={`${plexMono.className} text-[11px] leading-relaxed text-[#E6E1D6]/80`}
                                >
                                  Chosen as the common columnar transport layout to enable zero-copy
                                  transfers between computation layers.
                                </p>
                                <ArrowVisual />
                              </div>
                            }
                          />
                        </span>
                        <span className="text-xs text-[#E6E1D6]/80">
                          <TermTooltip
                            term="DuckDB"
                            note={
                              <div className="space-y-2">
                                <p
                                  className={`${plexMono.className} text-[11px] leading-relaxed text-[#E6E1D6]/80`}
                                >
                                  Selected after benchmarking analytical workloads against Polars
                                  and Pandas.
                                </p>
                                <DuckDBVisual />
                              </div>
                            }
                          />
                        </span>
                        <span className="text-xs text-[#E6E1D6]/80">
                          <TermTooltip
                            term="Polars"
                            note={
                              <div className="space-y-2">
                                <p
                                  className={`${plexMono.className} text-[11px] leading-relaxed text-[#E6E1D6]/80`}
                                >
                                  Evaluated alongside DuckDB to compare vectorized in-memory compute
                                  speeds.
                                </p>
                                <PolarsVisual />
                              </div>
                            }
                          />
                        </span>
                        <span className="text-xs text-[#E6E1D6]/80">
                          <TermTooltip
                            term="Iceberg"
                            note={
                              <div className="space-y-2">
                                <p
                                  className={`${plexMono.className} text-[11px] leading-relaxed text-[#E6E1D6]/80`}
                                >
                                  Implemented in the Lakehouse lab to establish queryable historical
                                  state snapshots as the schema evolves.
                                </p>
                                <IcebergVisual />
                              </div>
                            }
                          />
                        </span>
                        <span className="text-xs text-[#E6E1D6]/80">
                          <TermTooltip
                            term="Historical replay"
                            note={
                              <div className="space-y-2">
                                <p
                                  className={`${plexMono.className} text-[11px] leading-relaxed text-[#E6E1D6]/80`}
                                >
                                  Evaluated to check how long-term drift analysis queries execute
                                  against deep Parquet stores.
                                </p>
                                <HistoricalReplayVisual />
                              </div>
                            }
                          />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Teaser Ending */}
        <div className="mt-16 border-t border-[#E6E1D6]/10 pt-8 max-w-xs">
          <Link
            href="/systems/transit-intelligence"
            className={`${plexMono.className} group inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#E6E1D6]/80 transition-colors hover:text-[#DE4B31] border border-[#E6E1D6]/20 px-5 py-3 hover:bg-[#E6E1D6]/5`}
          >
            Continue reading
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
