"use client"

import { useState } from "react";
import Link from "next/link";
import { plexMono, serif } from "@/lib/fonts";
import { AnimatePresence, motion } from "framer-motion";
import type { JournalEntry } from "@/lib/journal";

interface ResearchProgrammeClientProps {
  essays: JournalEntry[];
}

function VisualElement() {
  return (
    <svg viewBox="0 0 320 60" className="w-full max-w-sm h-auto select-none mt-6">
      {/* Build */}
      <text x="35" y="25" textAnchor="middle" dominantBaseline="middle" className={`${plexMono.className} text-[9px] fill-[#E6E1D6]/40 uppercase tracking-[0.2em]`}>
        Build
      </text>
      <line x1="65" y1="25" x2="115" y2="25" stroke="#E6E1D6" strokeWidth={0.5} strokeOpacity={0.15} />

      {/* Observe */}
      <text x="145" y="25" textAnchor="middle" dominantBaseline="middle" className={`${plexMono.className} text-[9px] fill-[#E6E1D6]/40 uppercase tracking-[0.2em]`}>
        Observe
      </text>
      <line x1="175" y1="25" x2="225" y2="25" stroke="#E6E1D6" strokeWidth={0.5} strokeOpacity={0.15} />

      {/* Generalise (Red accent) */}
      <text x="270" y="25" textAnchor="middle" dominantBaseline="middle" className={`${plexMono.className} text-[9px] fill-[#DE4B31] font-semibold uppercase tracking-[0.2em]`}>
        Generalise
      </text>

      {/* Underline dot indicators */}
      <circle cx="35" cy="38" r="1.5" fill="#E6E1D6" fillOpacity={0.2} />
      <circle cx="145" cy="38" r="1.5" fill="#E6E1D6" fillOpacity={0.2} />
      <circle cx="270" cy="38" r="1.5" fill="#DE4B31" />
    </svg>
  );
}

export function ResearchProgrammeClient({ essays }: ResearchProgrammeClientProps) {
  const [hoveredTrack, setHoveredTrack] = useState<"architecture" | "physics" | "laws">("architecture");
  const [mobileTrack, setMobileTrack] = useState<"architecture" | "physics" | "laws" | null>("architecture");

  return (
    <section data-header-theme="dark" className="relative bg-[#1B1D1F] px-6 py-24 md:px-12">
      <div className="mx-auto max-w-5xl">

        {/* Title Block with Metadata */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_220px] mb-16 pb-8 border-b border-[#E6E1D6]/10">
          <div>
            <div className={`${plexMono.className} text-[9px] uppercase tracking-[0.22em] text-[#E6E1D6]/40 mb-4`}>
              CASE STUDY 02
            </div>
            <h2 className={`${serif.className} text-[3rem] italic leading-tight text-[#E6E1D6]/95 md:text-[3.5rem]`}>
              Research & Writing
            </h2>
          </div>

          <div className="flex items-center">
            <div className={`${plexMono.className} space-y-2.5 text-[11px] tracking-wide text-[#E6E1D6]/35`}>
              <div>
                <span className="block text-[8px] uppercase tracking-[0.15em] text-[#E6E1D6]/20 mb-0.5">TYPE</span>
                <span className="text-[#E6E1D6]/70">Research Series</span>
              </div>
              <div>
                <span className="block text-[8px] uppercase tracking-[0.15em] text-[#E6E1D6]/20 mb-0.5">STATUS</span>
                <span className="text-[#E6E1D6]/70">Architecture ongoing</span>
              </div>
              <div>
                <span className="block text-[8px] uppercase tracking-[0.15em] text-[#E6E1D6]/20 mb-0.5">PHYSICS</span>
                <span className="text-[#E6E1D6]/70">Active research</span>
              </div>
              <div>
                <span className="block text-[8px] uppercase tracking-[0.15em] text-[#E6E1D6]/20 mb-0.5">LAWS</span>
                <span className="text-[#E6E1D6]/70">Research notebook</span>
              </div>
              <div>
                <span className="block text-[8px] uppercase tracking-[0.15em] text-[#E6E1D6]/20 mb-0.5">REVISION</span>
                <span className="text-[#E6E1D6]/70">07.2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Grid Layout: Tracks/essays on left, Blueprints card on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">

          {/* Left Column */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Opening Thesis */}
            <div className="max-w-2xl space-y-6">
              <h3 className={`${serif.className} text-xl md:text-2xl italic leading-relaxed text-[#E6E1D6]/85`}>
                “Every production system eventually teaches the same lessons. Writing is how I check whether those lessons actually generalise.”
              </h3>
              <p className={`${serif.className} text-base md:text-lg leading-relaxed text-[#E6E1D6]/70`}>
                The software projects are experiments. The writing attempts to extract the reusable engineering principles hiding underneath those projects. The goal is not documentation; it is building a vocabulary for understanding information systems.
              </p>
            </div>

            {/* Restrained Editorial Visualization */}
            <VisualElement />

            {/* Desktop list of tracks */}
            <div className="hidden lg:block space-y-4 pt-4 max-w-2xl">
              <span className={`${plexMono.className} block text-[9px] uppercase tracking-wider text-[#E6E1D6]/35 mb-2`}>
                SERIES TRACKS // HOVER TO EXPLORE
              </span>
              <div className="space-y-4">
                {([
                  { id: "architecture", title: "Architecture of Information Systems", status: "Ongoing" },
                  { id: "physics", title: "Physics of Information Systems", status: "Active Research" },
                  { id: "laws", title: "Laws of Information Systems", status: "Research Notebook" },
                ] as const).map((track) => (
                  <div
                    key={track.id}
                    className={`cursor-pointer border-l-2 pl-4 py-2 transition-all ${
                      hoveredTrack === track.id
                        ? "border-[#DE4B31] bg-[#E6E1D6]/[0.01]"
                        : "border-transparent hover:border-[#E6E1D6]/10"
                    }`}
                    onMouseEnter={() => setHoveredTrack(track.id)}
                  >
                    <div className="flex justify-between items-baseline">
                      <span className={`${serif.className} text-lg font-medium text-[#E6E1D6]/90`}>
                        {track.title}
                      </span>
                      <span className={`${plexMono.className} text-[8px] uppercase tracking-wider text-[#E6E1D6]/45`}>
                        {track.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile interactive details list */}
            <div className="lg:hidden mt-8 space-y-6">
              <span className={`${plexMono.className} text-[9px] text-[#E6E1D6]/35 uppercase tracking-widest block`}>
                Tracks // Tap to explore
              </span>

              {/* Track 1: Architecture */}
              <div className="border border-[#E6E1D6]/10 p-5 bg-[#E6E1D6]/[0.02] rounded-sm">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => setMobileTrack(mobileTrack === "architecture" ? null : "architecture")}>
                  <span className={`${plexMono.className} text-xs text-[#DE4B31] tracking-wider`}>
                    ◇ ARCHITECTURE
                  </span>
                  <span className="text-[#E6E1D6]/40 text-xs">{mobileTrack === "architecture" ? "▲" : "▼"}</span>
                </div>
                <AnimatePresence>
                  {mobileTrack === "architecture" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden mt-4 space-y-4 text-xs text-[#E6E1D6]/70 leading-relaxed"
                    >
                      <p className={`${serif.className}`}>
                        <strong>Question:</strong> How should information systems be designed?
                      </p>
                      <p className={`${plexMono.className} text-[10px]`}>
                        <strong>Focus:</strong> modelling, state, events, storage, computation, operational architecture
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Track 2: Physics */}
              <div className="border border-[#E6E1D6]/10 p-5 bg-[#E6E1D6]/[0.02] rounded-sm">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => setMobileTrack(mobileTrack === "physics" ? null : "physics")}>
                  <span className={`${plexMono.className} text-xs text-[#E6E1D6]/60 tracking-wider`}>
                    ◇ PHYSICS
                  </span>
                  <span className="text-[#E6E1D6]/40 text-xs">{mobileTrack === "physics" ? "▲" : "▼"}</span>
                </div>
                <AnimatePresence>
                  {mobileTrack === "physics" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden mt-4 space-y-4 text-xs text-[#E6E1D6]/70 leading-relaxed"
                    >
                      <p className={`${serif.className}`}>
                        <strong>Question:</strong> What behaviours consistently emerge once information begins moving through complex systems?
                      </p>
                      <p className={`${plexMono.className} text-[10px]`}>
                        <strong>Focus:</strong> emergence, coordination, propagation, bottlenecks, temporal behaviour, scaling pressure
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Track 3: Laws */}
              <div className="border border-[#E6E1D6]/10 p-5 bg-[#E6E1D6]/[0.02] rounded-sm">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => setMobileTrack(mobileTrack === "laws" ? null : "laws")}>
                  <span className={`${plexMono.className} text-xs text-[#E6E1D6]/60 tracking-wider`}>
                    ◇ LAWS
                  </span>
                  <span className="text-[#E6E1D6]/40 text-xs">{mobileTrack === "laws" ? "▲" : "▼"}</span>
                </div>
                <AnimatePresence>
                  {mobileTrack === "laws" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden mt-4 space-y-4 text-xs text-[#E6E1D6]/70 leading-relaxed"
                    >
                      <p className={`${serif.className}`}>
                        <strong>Question:</strong> Are there engineering principles that remain true regardless of language, framework, or implementation?
                      </p>
                      <p className={`${plexMono.className} text-[10px] space-y-1`}>
                        <strong>Examples:</strong><br />
                        · information always decays<br />
                        · coordination has cost<br />
                        · state must exist somewhere<br />
                        · locality dominates latency
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Selected Works - Display Featured Papers */}
            {essays.length > 0 && (
              <div className="space-y-6 border-t border-[#E6E1D6]/10 pt-8 mt-12 max-w-2xl">
                <span className={`${plexMono.className} block text-[9px] uppercase tracking-wider text-[#E6E1D6]/35`}>
                  SELECTED WORKS
                </span>
                <div className="space-y-6">
                  {essays.map((essay) => (
                    <Link
                      key={essay.slug}
                      href={`/journal/${essay.slug}`}
                      className="group block border-b border-[#E6E1D6]/5 pb-6 last:border-b-0 hover:border-b-[#DE4B31]/30 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-2">
                        <span className={`${serif.className} text-xl italic text-[#E6E1D6]/90 group-hover:text-[#DE4B31] transition-colors`}>
                          {essay.title}
                        </span>
                        <span className={`${plexMono.className} text-[9px] text-[#E6E1D6]/45 uppercase tracking-widest`}>
                          PART {essay.part} // {essay.readingTime}
                        </span>
                      </div>
                      {essay.abstract && (
                        <p className={`${serif.className} text-sm text-[#E6E1D6]/60 leading-relaxed max-w-2xl`}>
                          {essay.abstract}
                        </p>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Margin notes display (Desktop only) */}
          <div className="lg:col-span-4 hidden lg:block relative">
            <div className="sticky top-28 space-y-6">
              <span className={`${plexMono.className} block text-[9px] text-[#E6E1D6]/30 uppercase tracking-widest border-b border-[#E6E1D6]/10 pb-2`}>
                Series Blueprint
              </span>

              <AnimatePresence mode="wait">
                {hoveredTrack === "architecture" && (
                  <motion.div
                    key="architecture"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="border border-[#E6E1D6]/10 p-6 bg-[#E6E1D6]/[0.02]"
                  >
                    <div className={`${plexMono.className} text-[10px] font-semibold uppercase tracking-wider text-[#DE4B31] mb-2`}>
                      ◇ ARCHITECTURE
                    </div>
                    <span className={`${plexMono.className} block text-[9px] text-[#E6E1D6]/40 uppercase mb-3`}>
                      Active writing track
                    </span>
                    <div className="space-y-4">
                      <div>
                        <span className={`${plexMono.className} block text-[9px] uppercase tracking-wider text-[#E6E1D6]/30`}>
                          Question
                        </span>
                        <p className={`${serif.className} text-xs text-[#E6E1D6]/70 leading-relaxed mt-1`}>
                          How should information systems be designed?
                        </p>
                      </div>
                      <div>
                        <span className={`${plexMono.className} block text-[9px] uppercase tracking-wider text-[#E6E1D6]/30`}>
                          Focus Areas
                        </span>
                        <div className={`${plexMono.className} text-[11px] text-[#E6E1D6]/80 mt-1.5 flex flex-wrap gap-1.5`}>
                          {["modelling", "state", "events", "storage", "computation", "operational architecture"].map((f) => (
                            <span key={f} className="border border-[#E6E1D6]/10 px-2 py-0.5 text-[9px] rounded-sm bg-[#E6E1D6]/5">
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {hoveredTrack === "physics" && (
                  <motion.div
                    key="physics"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="border border-[#E6E1D6]/10 p-6 bg-[#E6E1D6]/[0.02]"
                  >
                    <div className={`${plexMono.className} text-[10px] font-semibold uppercase tracking-wider text-[#E6E1D6]/80 mb-2`}>
                      ◇ PHYSICS
                    </div>
                    <span className={`${plexMono.className} block text-[9px] text-[#E6E1D6]/40 uppercase mb-3`}>
                      Active Research // Unpublished
                    </span>
                    <div className="space-y-4">
                      <div>
                        <span className={`${plexMono.className} block text-[9px] uppercase tracking-wider text-[#E6E1D6]/30`}>
                          Question
                        </span>
                        <p className={`${serif.className} text-xs text-[#E6E1D6]/70 leading-relaxed mt-1`}>
                          What behaviours consistently emerge once information begins moving through complex systems?
                        </p>
                      </div>
                      <div>
                        <span className={`${plexMono.className} block text-[9px] uppercase tracking-wider text-[#E6E1D6]/30`}>
                          Focus Areas
                        </span>
                        <div className={`${plexMono.className} text-[11px] text-[#E6E1D6]/80 mt-1.5 flex flex-wrap gap-1.5`}>
                          {["emergence", "coordination", "propagation", "bottlenecks", "temporal behaviour", "scaling pressure"].map((f) => (
                            <span key={f} className="border border-[#E6E1D6]/10 px-2 py-0.5 text-[9px] rounded-sm bg-[#E6E1D6]/5">
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {hoveredTrack === "laws" && (
                  <motion.div
                    key="laws"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="border border-[#E6E1D6]/10 p-6 bg-[#E6E1D6]/[0.02]"
                  >
                    <div className={`${plexMono.className} text-[10px] font-semibold uppercase tracking-wider text-[#E6E1D6]/80 mb-2`}>
                      ◇ LAWS
                    </div>
                    <span className={`${plexMono.className} block text-[9px] text-[#E6E1D6]/40 uppercase mb-3`}>
                      Research Notebook // In progress
                    </span>
                    <div className="space-y-4">
                      <div>
                        <span className={`${plexMono.className} block text-[9px] uppercase tracking-wider text-[#E6E1D6]/30`}>
                          Question
                        </span>
                        <p className={`${serif.className} text-xs text-[#E6E1D6]/70 leading-relaxed mt-1`}>
                          Are there engineering principles that remain true regardless of language, framework, or implementation?
                        </p>
                      </div>
                      <div>
                        <span className={`${plexMono.className} block text-[9px] uppercase tracking-wider text-[#E6E1D6]/30`}>
                          Focus Examples
                        </span>
                        <div className={`${plexMono.className} text-[11px] text-[#E6E1D6]/80 mt-1.5 flex flex-col gap-2`}>
                          {[
                            "information always decays",
                            "coordination has cost",
                            "state must exist somewhere",
                            "locality dominates latency",
                          ].map((f) => (
                            <span key={f} className="text-xs italic text-[#E6E1D6]/70">
                              · {f}
                            </span>
                          ))}
                        </div>
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
            href="/journal"
            className={`${plexMono.className} group inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#E6E1D6]/80 transition-colors hover:text-[#DE4B31] border border-[#E6E1D6]/20 px-5 py-3 hover:bg-[#E6E1D6]/5`}
          >
            Open the Research Notebook
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
}
