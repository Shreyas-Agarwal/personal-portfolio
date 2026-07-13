"use client";

import { useState } from "react";
import Link from "next/link";
import { patterns } from "@/data/homepage-v2/patterns";
import { getPatternUsage } from "@/data/homepage-v2/systems";

const usage = getPatternUsage();

export function PatternLibrary() {
  const [activeId, setActiveId] = useState(patterns[0]?.id ?? "");
  const active = patterns.find((p) => p.id === activeId) ?? patterns[0];
  const usedBy = usage.get(activeId) ?? [];

  return (
    <section data-header-theme="light" className="relative bg-[#F3F1EC] px-6 py-24 md:px-12">
      <div className="mx-auto max-w-5xl">
        <span className="mb-12 block font-mono text-[10px] tracking-[0.22em] text-black/30">
          PATTERN_LIBRARY
        </span>

        <div className="grid gap-12 md:grid-cols-[1fr_1fr]">
          {/* Left: pattern list */}
          <div>
            {patterns.map((pattern) => {
              const isActive = pattern.id === activeId;
              return (
                <button
                  key={pattern.id}
                  type="button"
                  onMouseEnter={() => setActiveId(pattern.id)}
                  onFocus={() => setActiveId(pattern.id)}
                  onClick={() => setActiveId(pattern.id)}
                  className={`block w-full border-t border-black/[0.06] py-4 text-left text-sm transition-all ${
                    isActive
                      ? "border-l-2 border-l-black pl-3 text-black"
                      : "border-l-2 border-l-transparent pl-3 text-black/40 hover:text-black/70"
                  }`}
                >
                  {pattern.name}
                </button>
              );
            })}
          </div>

          {/* Right: reveal panel — the left accent bar echoes the active row on the left,
              a faint typographic stand-in for a connector line between the two lists. */}
          <div className="border-t border-black/[0.06] pt-4 md:border-t-0 md:border-l md:pl-12 md:pt-0">
            {active && (
              <>
                <h3 className="mb-3 font-mono text-lg text-black/90">{active.name}</h3>
                <p className="mb-8 max-w-md text-sm leading-relaxed text-black/80">
                  {active.description}
                </p>

                <span className="mb-3 block font-mono text-[9px] uppercase tracking-[0.18em] text-black/25">
                  Used by
                </span>
                <div className="space-y-3">
                  {usedBy.length === 0 && (
                    <span className="text-sm text-black/30">No systems reference this yet.</span>
                  )}
                  {usedBy.map((system) => (
                    <Link
                      key={system.id}
                      href={system.href}
                      className="block border-l-2 border-l-black/20 pl-3 text-sm text-black/75 transition-colors hover:border-l-black hover:text-black"
                    >
                      {system.name}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
