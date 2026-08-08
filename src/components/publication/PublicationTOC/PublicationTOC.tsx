"use client";

/**
 * PublicationTOC — sticky right-column table of contents
 *
 * - Tracks active heading via IntersectionObserver
 * - Smooth scrolls on click
 * - Nested H3/H4 with indentation
 * - Deep-link support (updates URL hash without hard navigation)
 * - Stays visually quiet until a section is active
 */

import { useEffect, useState } from "react";
import { plexMono, serif } from "@/lib/fonts";
import type { TocHeading } from "@/lib/publication/types";

interface PublicationTOCProps {
  headings: TocHeading[];
}

export function PublicationTOC({ headings }: PublicationTOCProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      // Trigger slightly below the top so the item activates
      // just as the heading enters the reading area.
      { rootMargin: "-96px 0% -70% 0%", threshold: 0 },
    );

    for (const heading of headings) {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  function handleClick(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
    // Update the URL hash without triggering a navigation
    history.replaceState(null, "", `#${id}`);
  }

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="w-full">
      {/* Label */}
      <div className="mb-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-[#2C2E32]" />
        <span
          className={`${plexMono.className} text-[9px] uppercase tracking-[0.22em] text-[#E6E1D6]/25`}
        >
          Contents
        </span>
        <div className="h-px flex-1 bg-[#2C2E32]" />
      </div>

      {/* Heading list */}
      <ol className="space-y-0" aria-label="Document headings">
        {headings.map((heading) => {
          const isActive = heading.id === activeId;
          const indent = heading.level === 3 ? "pl-3" : heading.level === 4 ? "pl-6" : "";

          return (
            <li key={heading.id}>
              <button
                type="button"
                onClick={() => handleClick(heading.id)}
                className={[
                  "group w-full text-left transition-colors duration-200",
                  "py-1.5",
                  indent,
                  "focus-visible:outline-none",
                ].join(" ")}
                aria-current={isActive ? "location" : undefined}
              >
                <span
                  className={[
                    serif.className,
                    "block text-[13px] leading-snug transition-colors duration-200",
                    heading.level === 1
                      ? "font-normal"
                      : heading.level === 2
                        ? "font-normal"
                        : "font-light",
                    isActive
                      ? "text-[#E6E1D6]/90"
                      : "text-[#E6E1D6]/28 group-hover:text-[#E6E1D6]/60",
                  ].join(" ")}
                >
                  {/* Active indicator line */}
                  <span
                    className={`${plexMono.className} mr-1.5 transition-opacity duration-200 text-[#DE4B31] text-[9px] ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                    aria-hidden="true"
                  >
                    ›
                  </span>
                  {heading.text}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
