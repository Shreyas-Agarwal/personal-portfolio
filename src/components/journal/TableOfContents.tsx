"use client";

import type { TocHeading } from "@/lib/toc";
import { useEffect, useState } from "react";

interface TableOfContentsProps {
  headings: TocHeading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (headings.length === 0) return;

    // IntersectionObserver: when a heading enters the upper portion of the
    // viewport, mark it as active. The root margin pushes the bottom trigger
    // high so the TOC item lights up before the heading scrolls off screen.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0% -72% 0%", threshold: 0 },
    );

    for (const heading of headings) {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
    }
  }

  return (
    <nav aria-label="Table of contents">
      <p className="mb-4 font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
        Contents
      </p>

      <div className="space-y-0.5">
        {headings.map((h) => (
          <button
            key={h.id}
            type="button"
            onClick={() => scrollTo(h.id)}
            className={[
              "block w-full text-left py-0.5 leading-snug transition-colors duration-150",
              h.level === 3
                ? "pl-3 text-[11px]"
                : "text-[12px]",
              activeId === h.id
                ? "font-medium text-neutral-900"
                : "text-neutral-400 hover:text-neutral-700",
            ].join(" ")}
          >
            {h.text}
          </button>
        ))}
      </div>
    </nav>
  );
}
