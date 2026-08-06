/**
 * PublicationShell — three-column publication layout
 *
 * Desktop:
 *   [220px sidebar] | [max-w-740px document] | [200px right rail]
 */

import type { ReactNode } from "react";
import { ReadingProgressBar } from "../ReadingProgressBar";

interface PublicationShellProps {
  sidebar: ReactNode;
  document: ReactNode;
  rightRail: ReactNode;
}

export function PublicationShell({ sidebar, document, rightRail }: PublicationShellProps) {
  return (
    <div className="relative min-h-screen bg-[#1B1D1F] no-scrollbar print:bg-white">
      {/* ── 2px Editorial Reading Progress Bar fixed at top of viewport ── */}
      <div className="print:hidden">
        <ReadingProgressBar />
      </div>

      {/* Subtle drafting grid — same as landing page */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.03] print:hidden"
        style={{
          backgroundImage:
            "linear-gradient(to right, #E6E1D6 1px, transparent 1px), linear-gradient(to bottom, #E6E1D6 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 md:px-8 print:max-w-none print:px-0">
        <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[220px_1fr_200px] lg:gap-0 print:!grid-cols-1">
          {/* ── Left sidebar ── */}
          <div className="lg:border-r lg:border-[#2C2E32] lg:py-14 lg:pr-6 print:hidden">
            {sidebar}
          </div>

          {/* ── Center document column ── */}
          <div className="py-14 lg:px-12 xl:px-16 print:py-0">
            {/* `publication-print-content` forces readable black-on-white text
                for every descendant when printing — the editorial palette
                otherwise uses pale colors tuned for the dark theme only, and
                touching every content component to make them print-safe
                individually isn't worth it for a plain print output. */}
            <div className="mx-auto max-w-[740px] publication-print-content">{document}</div>
          </div>

          {/* ── Right rail: metadata + TOC ── */}
          <div className="hidden lg:block lg:border-l lg:border-[#2C2E32] lg:py-14 lg:pl-6 print:hidden">
            {rightRail}
          </div>
        </div>
      </div>
    </div>
  );
}
