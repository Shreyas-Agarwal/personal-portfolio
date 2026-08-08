"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useHeaderTitle } from "@/components/layout/HeaderContext";
import { DraftingGrid } from "@/components/ui/DraftingGrid";
import type { ConceptData } from "@/data/concepts";
import { plexMono, serif } from "@/lib/fonts";

const EASE = [0.16, 1, 0.3, 1] as const;

interface ConceptMonographViewProps {
  concept: ConceptData;
  onClose?: () => void;
}

export function ConceptMonographView({ concept, onClose }: ConceptMonographViewProps) {
  // Automatically updates the running header: SHREYAS AGARWAL | THE PHYSICS OF STATE
  useHeaderTitle(concept.runningHeader);

  // Close on Escape key press if in modal/overlay mode
  useEffect(() => {
    if (!onClose) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleReturnClick = (e: React.MouseEvent) => {
    if (onClose) {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <motion.div
      layoutId={`concept-card-${concept.slug}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="relative min-h-screen bg-[#1B1D1F] text-[#E6E1D6] z-40"
    >
      <DraftingGrid />

      <main className="relative mx-auto max-w-4xl px-6 pt-28 pb-24 md:px-12 md:pt-36">
        {/* Navigation & Monograph Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <Link
            href="/systems"
            onClick={handleReturnClick}
            className={`${plexMono.className} group mb-10 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#E6E1D6]/50 transition-colors hover:text-[#E6E1D6]`}
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            Return to Systems Foundation
          </Link>

          {/* Monograph Top Metadata Plate */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span
              className={`${plexMono.className} text-[11px] uppercase tracking-[0.25em] text-[#DE4B31]`}
            >
              CONCEPT {concept.num}
            </span>
            <span className="h-px w-6 bg-[#E6E1D6]/20" />
            <span
              className={`${plexMono.className} text-[10px] uppercase tracking-[0.2em] text-[#E6E1D6]/40`}
            >
              {concept.category}
            </span>
            <span className="h-px w-6 bg-[#E6E1D6]/20" />
            <span
              className={`${plexMono.className} rounded-xs border border-[#E6E1D6]/15 px-2 py-0.5 text-[9px] uppercase tracking-[0.18em] text-[#E6E1D6]/40`}
            >
              {concept.status} · REV {concept.revDate}
            </span>
          </div>

          <motion.h1
            layoutId={`concept-title-${concept.slug}`}
            className={`${serif.className} text-pretty text-[3.5rem] font-normal leading-[1.05] tracking-tight text-[#E6E1D6] md:text-[5rem]`}
          >
            {concept.title}
          </motion.h1>

          <p
            className={`${serif.className} mt-6 border-l-2 border-[#DE4B31] pl-6 text-xl italic leading-relaxed text-[#E6E1D6]/80 md:text-2xl`}
          >
            {concept.oneLiner}
          </p>
        </motion.div>

        {/* Monograph Content Sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          className="mt-16 space-y-16 border-t border-[#E6E1D6]/10 pt-14"
        >
          {/* Section 01: Introduction */}
          <section className="space-y-4">
            <span
              className={`${plexMono.className} block text-[10px] uppercase tracking-[0.25em] text-[#DE4B31]`}
            >
              01 / INTRODUCTION
            </span>
            <h2 className={`${serif.className} text-2xl font-normal text-[#E6E1D6]`}>
              Definition & Bounds
            </h2>
            <p
              className={`${serif.className} text-base leading-relaxed text-[#E6E1D6]/70 md:text-lg`}
            >
              {concept.intro}
            </p>
          </section>

          {/* Section 02: Why It Matters */}
          <section className="space-y-4 border-t border-[#E6E1D6]/10 pt-12">
            <span
              className={`${plexMono.className} block text-[10px] uppercase tracking-[0.25em] text-[#DE4B31]`}
            >
              02 / OPERATIONAL IMPLICATIONS
            </span>
            <h2 className={`${serif.className} text-2xl font-normal text-[#E6E1D6]`}>
              Why It Matters
            </h2>
            <p
              className={`${serif.className} text-base leading-relaxed text-[#E6E1D6]/70 md:text-lg`}
            >
              {concept.whyItMatters}
            </p>
          </section>

          {/* Section 03: Core Principles */}
          <section className="space-y-6 border-t border-[#E6E1D6]/10 pt-12">
            <span
              className={`${plexMono.className} block text-[10px] uppercase tracking-[0.25em] text-[#DE4B31]`}
            >
              03 / CORE PRINCIPLES
            </span>
            <h2 className={`${serif.className} text-2xl font-normal text-[#E6E1D6]`}>
              Axiomatic Constraints
            </h2>
            <ul className="space-y-4">
              {concept.corePrinciples.map((principle, idx) => (
                <li key={principle} className="flex items-start gap-4">
                  <span className={`${plexMono.className} shrink-0 pt-0.5 text-xs text-[#DE4B31]`}>
                    0{idx + 1}.
                  </span>
                  <span
                    className={`${serif.className} text-base leading-relaxed text-[#E6E1D6]/80 md:text-lg`}
                  >
                    {principle}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 04: Conceptual Relationships */}
          <section className="space-y-6 border-t border-[#E6E1D6]/10 pt-12">
            <span
              className={`${plexMono.className} block text-[10px] uppercase tracking-[0.25em] text-[#DE4B31]`}
            >
              04 / CONCEPTUAL RELATIONSHIPS
            </span>
            <h2 className={`${serif.className} text-2xl font-normal text-[#E6E1D6]`}>
              Adjacent Concepts
            </h2>
            <div className="flex flex-wrap gap-4">
              {concept.relatedConcepts.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/systems/${rel.slug}`}
                  onClick={(e) => {
                    if (onClose) {
                      e.preventDefault();
                      // Transition smoothly into new concept if in overlay mode
                      window.history.pushState(null, "", `/systems/${rel.slug}`);
                      window.dispatchEvent(new Event("popstate"));
                    }
                  }}
                  className="group flex items-center gap-2 border border-[#E6E1D6]/15 bg-[#1B1D1F] px-4 py-3 transition-colors hover:border-[#DE4B31]"
                >
                  <span
                    className={`${serif.className} text-base text-[#E6E1D6] transition-colors group-hover:text-[#DE4B31]`}
                  >
                    {rel.title}
                  </span>
                  <span
                    className={`${plexMono.className} text-xs text-[#E6E1D6]/40 transition-transform group-hover:translate-x-1 group-hover:text-[#DE4B31]`}
                  >
                    →
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* Section 05: Referenced In Works */}
          <section className="space-y-6 border-t border-[#E6E1D6]/10 pt-12">
            <span
              className={`${plexMono.className} block text-[10px] uppercase tracking-[0.25em] text-[#DE4B31]`}
            >
              05 / REFERENCED IN WORKS
            </span>
            <h2 className={`${serif.className} text-2xl font-normal text-[#E6E1D6]`}>
              Active Implementations & Case Studies
            </h2>
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {concept.referencedIn.map((pub) => (
                <li
                  key={pub}
                  className="flex items-baseline gap-3 border border-[#E6E1D6]/10 bg-[#1B1D1F] p-4"
                >
                  <span className={`${plexMono.className} text-xs text-[#DE4B31]`}>—</span>
                  <span className={`${serif.className} text-base text-[#E6E1D6]/80`}>{pub}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 06: Further Reading */}
          <section className="space-y-6 border-t border-[#E6E1D6]/10 pt-12">
            <span
              className={`${plexMono.className} block text-[10px] uppercase tracking-[0.25em] text-[#DE4B31]`}
            >
              06 / FURTHER READING
            </span>
            <h2 className={`${serif.className} text-2xl font-normal text-[#E6E1D6]`}>
              Theoretical References
            </h2>
            <div className="space-y-4">
              {concept.furtherReading.map((item) => (
                <div key={item.title} className="border-l border-[#E6E1D6]/20 py-1 pl-4">
                  <h3 className={`${serif.className} text-base text-[#E6E1D6]`}>{item.title}</h3>
                  <p className={`${serif.className} mt-0.5 text-sm italic text-[#E6E1D6]/50`}>
                    {item.note}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 07: Revision History */}
          <section className="border-t border-[#E6E1D6]/10 pt-12">
            <div className="border border-[#E6E1D6]/10 bg-[#141618] p-6">
              <span
                className={`${plexMono.className} mb-4 block text-[10px] uppercase tracking-[0.2em] text-[#E6E1D6]/40`}
              >
                REVISION HISTORY & AUDIT TRAIL
              </span>
              <ul className="space-y-2">
                {concept.revisionHistory.map((rev) => (
                  <li
                    key={rev.date + rev.note}
                    className={`${plexMono.className} flex items-center justify-between text-[11px] text-[#E6E1D6]/50`}
                  >
                    <span>{rev.note}</span>
                    <span className="text-[#DE4B31]">{rev.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </motion.div>

        {/* Footer Navigation */}
        <div className="mt-20 flex items-center justify-between border-t border-[#E6E1D6]/10 pt-10">
          <Link
            href="/systems"
            onClick={handleReturnClick}
            className={`${plexMono.className} group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#E6E1D6]/50 transition-colors hover:text-[#E6E1D6]`}
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            Return to Systems Foundation
          </Link>
          <span
            className={`${plexMono.className} text-[10px] uppercase tracking-[0.18em] text-[#E6E1D6]/30`}
          >
            END OF CHAPTER · {concept.num}
          </span>
        </div>
      </main>
    </motion.div>
  );
}
