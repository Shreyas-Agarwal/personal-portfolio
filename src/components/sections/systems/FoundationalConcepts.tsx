"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ConceptMonographView } from "@/components/sections/systems/ConceptMonographView";
import { CONCEPTS, CONCEPTS_MAP } from "@/data/concepts";
import { plexMono, serif } from "@/lib/fonts";

const EASE = [0.16, 1, 0.3, 1] as const;

export function FoundationalConcepts() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  // Sync state with browser URL path and popstate (browser Back / Forward navigation)
  useEffect(() => {
    const updateFromUrl = () => {
      const path = window.location.pathname;
      const match = path.match(/^\/systems\/([^/]+)$/);
      if (match && CONCEPTS_MAP.has(match[1])) {
        setActiveSlug(match[1]);
      } else {
        setActiveSlug(null);
      }
    };

    updateFromUrl();
    window.addEventListener("popstate", updateFromUrl);
    return () => window.removeEventListener("popstate", updateFromUrl);
  }, []);

  const handleCardClick = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    setActiveSlug(slug);
    window.history.pushState(null, "", `/systems/${slug}`);
  };

  const handleClose = () => {
    setActiveSlug(null);
    window.history.pushState(null, "", "/systems");
  };

  const activeConcept = activeSlug ? CONCEPTS_MAP.get(activeSlug) : null;

  return (
    <section
      data-header-theme="dark"
      className="relative border-t border-[#E6E1D6]/10 bg-[#1B1D1F] px-6 py-24 md:px-12"
    >
      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="mb-16 border-b border-[#E6E1D6]/10 pb-8">
          <div
            className={`${plexMono.className} mb-2 text-[10px] uppercase tracking-[0.25em] text-[#DE4B31]`}
          >
            EDITORIAL CONCEPT ATLAS
          </div>
          <h2
            className={`${serif.className} text-3xl font-normal tracking-tight text-[#E6E1D6] md:text-4xl`}
          >
            Foundational Concepts
          </h2>
          <p
            className={`${serif.className} mt-3 max-w-2xl text-base italic text-[#E6E1D6]/60 md:text-lg`}
          >
            Click any concept to open its monograph chapter. Each concept is an independent entry
            point into the theoretical physics of information systems.
          </p>
        </div>

        {/* Editorial Atlas Grid */}
        <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
          {CONCEPTS.map((item, idx) => (
            <motion.div
              key={item.slug}
              layoutId={`concept-card-${item.slug}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (idx % 2) * 0.08, ease: EASE }}
              className="group"
            >
              <Link
                href={`/systems/${item.slug}`}
                onClick={(e) => handleCardClick(item.slug, e)}
                className="block border-b border-[#E6E1D6]/10 pb-8 transition-colors hover:border-[#DE4B31]/40"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span
                    className={`${plexMono.className} text-[11px] uppercase tracking-[0.2em] text-[#E6E1D6]/35 transition-colors group-hover:text-[#DE4B31]/80`}
                  >
                    CONCEPT {item.num}
                  </span>
                  <span
                    className={`${plexMono.className} flex items-center gap-1 text-[10px] uppercase tracking-[0.18em] text-[#E6E1D6]/40 transition-colors group-hover:text-[#E6E1D6]`}
                  >
                    Open Chapter{" "}
                    <span
                      aria-hidden="true"
                      className="transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </div>

                <motion.h3
                  layoutId={`concept-title-${item.slug}`}
                  className={`${serif.className} text-2xl font-normal text-[#E6E1D6] transition-colors group-hover:text-[#DE4B31]`}
                >
                  {item.title}
                </motion.h3>

                <p
                  className={`${serif.className} mt-3 text-sm leading-relaxed text-[#E6E1D6]/60 transition-colors group-hover:text-[#E6E1D6]/80 md:text-base`}
                >
                  {item.oneLiner}
                </p>

                {item.editorialNote && (
                  <p
                    className={`${serif.className} mt-4 border-l border-[#DE4B31]/30 pl-4 text-sm italic leading-relaxed text-[#E6E1D6]/45 transition-colors group-hover:text-[#E6E1D6]/65 md:text-[0.95rem]`}
                  >
                    {item.editorialNote}
                  </p>
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Active Monograph Overlay with Seamless Reverse Shared Layout Animation */}
      <AnimatePresence>
        {activeConcept && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1B1D1F]">
            <ConceptMonographView concept={activeConcept} onClose={handleClose} />
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
