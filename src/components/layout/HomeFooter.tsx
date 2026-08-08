"use client";

import Link from "next/link";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { changelog } from "@/lib/changelog";
import { plexMono, serif } from "@/lib/fonts";

interface ColophonTooltipProps {
  children: React.ReactNode;
  note: string;
}

function ColophonTooltip({ children, note }: ColophonTooltipProps) {
  return (
    <HoverCard openDelay={100}>
      <HoverCardTrigger asChild>
        <span className="cursor-help transition-colors border-b border-dotted border-[#1B1D1F]/15 hover:border-[#1B1D1F]/50">
          {children}
        </span>
      </HoverCardTrigger>
      <HoverCardContent
        side="top"
        align="center"
        sideOffset={6}
        className="w-48 border border-[#1B1D1F]/10 bg-[#FBF9F5] p-2.5 text-left z-50 text-[10px] font-mono tracking-wider text-[#1B1D1F]/75 shadow-sm rounded-sm"
      >
        {note}
      </HoverCardContent>
    </HoverCard>
  );
}

export function HomeFooter({ gitHubCommits = 500 }: { gitHubCommits?: number }) {
  return (
    <footer className="space-y-16 select-none text-[#1B1D1F]">
      <div className="space-y-16">
        {/* Section Title & Opening (Closing Notes style) */}
        <div className="space-y-6 max-w-2xl border-b border-[#1B1D1F]/[0.08] pb-10">
          <span
            className={`${plexMono.className} text-[10px] tracking-[0.22em] text-[#1B1D1F]/40 block`}
          >
            § CLOSING NOTES
          </span>
          <h2
            className={`${serif.className} text-2xl md:text-3xl italic leading-tight text-[#1B1D1F]/90`}
          >
            Engineering Library // Vol. I · Revision 2026.07
          </h2>
          <p className={`${serif.className} text-base leading-relaxed text-[#1B1D1F]/65`}>
            This library is an ongoing exploration of systems, information, architecture, and the
            patterns that emerge when complexity begins coordinating itself. Some ideas become
            software. Some become publications. Some remain open questions.
          </p>
        </div>

        {/* Four Asymmetric Columns Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 border-b border-[#1B1D1F]/[0.08] pb-12">
          {/* Column 1: CONTENTS */}
          <div className="space-y-4">
            <span
              className={`${plexMono.className} block text-[9px] uppercase tracking-wider text-[#1B1D1F]/35`}
            >
              CONTENTS
            </span>
            <div className={`${serif.className} flex flex-col gap-2.5 text-sm`}>
              <div>
                <ColophonTooltip note="8 active systems cataloged">
                  <Link href="/systems" className="hover:text-[#DE4B31] transition-colors">
                    Systems
                  </Link>
                </ColophonTooltip>
              </div>
              <div>
                <ColophonTooltip note="11 publications across 6 research programs">
                  <Link
                    href="/works/publications"
                    className="hover:text-[#DE4B31] transition-colors"
                  >
                    Publications
                  </Link>
                </ColophonTooltip>
              </div>
              <div>
                <ColophonTooltip note="Identity & portfolio index">
                  <Link href="/about" className="hover:text-[#DE4B31] transition-colors">
                    Identity
                  </Link>
                </ColophonTooltip>
              </div>
            </div>
          </div>

          {/* Column 2: CURRENTLY */}
          <div className="space-y-4">
            <span
              className={`${plexMono.className} block text-[9px] uppercase tracking-wider text-[#DE4B31]`}
            >
              CURRENTLY
            </span>
            <div className={`${serif.className} flex flex-col gap-2.5 text-sm`}>
              <div>
                <ColophonTooltip note="R&D Active / Operational platform">
                  <Link
                    href="/systems/transit-intelligence"
                    className="hover:text-[#DE4B31] transition-colors"
                  >
                    Transit Intelligence
                  </Link>
                </ColophonTooltip>
              </div>
              <div>
                <ColophonTooltip note="Active writing series">
                  <Link
                    href="/works/publications/architecture-of-information-systems"
                    className="hover:text-[#DE4B31] transition-colors"
                  >
                    Architecture of Information
                  </Link>
                </ColophonTooltip>
              </div>
              <div>
                <ColophonTooltip note="Research active / Conceptual study">
                  <Link
                    href="/works/publications/ecology-and-ai"
                    className="hover:text-[#DE4B31] transition-colors"
                  >
                    Ecology as Computation
                  </Link>
                </ColophonTooltip>
              </div>
            </div>
          </div>

          {/* Column 3: ELSEWHERE */}
          <div className="space-y-4">
            <span
              className={`${plexMono.className} block text-[9px] uppercase tracking-wider text-[#1B1D1F]/35`}
            >
              ELSEWHERE
            </span>
            <div className={`${serif.className} flex flex-col gap-2.5 text-sm`}>
              <div>
                <ColophonTooltip note={`${gitHubCommits} contributions in the last year`}>
                  <a
                    href="https://github.com/Shreyas-Agarwal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#DE4B31] transition-colors"
                  >
                    GitHub
                  </a>
                </ColophonTooltip>
              </div>
              <div>
                <ColophonTooltip note="Usually active / Shreyas Agarwal">
                  <a
                    href="https://www.linkedin.com/in/shreyasagarwal01/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#DE4B31] transition-colors"
                  >
                    LinkedIn
                  </a>
                </ColophonTooltip>
              </div>
              <div>
                <ColophonTooltip note="Replies within a business day">
                  <a
                    href="mailto:shreyas.agarwal31@gmail.com"
                    className="hover:text-[#DE4B31] transition-colors"
                  >
                    Email
                  </a>
                </ColophonTooltip>
              </div>
            </div>
          </div>

          {/* Column 4: PUBLICATION */}
          <div className="space-y-4">
            <span
              className={`${plexMono.className} block text-[9px] uppercase tracking-wider text-[#1B1D1F]/35`}
            >
              PUBLICATION
            </span>
            <div
              className={`${plexMono.className} flex flex-col gap-2 text-[10px] text-[#1B1D1F]/50 tracking-wide`}
            >
              <div>
                <span className="text-[#1B1D1F]/30">Volume:</span> I
              </div>
              <div>
                <span className="text-[#1B1D1F]/30">Revision:</span>{" "}
                <ColophonTooltip note="Revision log updated automatically">
                  <span>2026.07</span>
                </ColophonTooltip>
              </div>
              <div>
                <span className="text-[#1B1D1F]/30">Status:</span> Living
              </div>
              <div className="pt-2 leading-relaxed">
                <span className="block text-[8px] uppercase tracking-wider text-[#1B1D1F]/35 mb-0.5">
                  Written with
                </span>
                Next.js · TypeScript · Tailwind
              </div>
            </div>
          </div>
        </div>

        {/* Open Questions Block */}
        <div className="space-y-4 border-b border-[#1B1D1F]/[0.08] pb-12 max-w-2xl">
          <span
            className={`${plexMono.className} block text-[9px] uppercase tracking-wider text-[#DE4B31]`}
          >
            OPEN QUESTIONS
          </span>
          <div
            className={`${serif.className} text-base italic leading-relaxed text-[#1B1D1F]/75 space-y-3.5`}
          >
            <p>· How should meaning propagate through isolated coordinate pings?</p>
            <p>· Can biological coordination principles inform software systems architecture?</p>
            <p>· What belongs inside a truly stable semantic schema layer?</p>
          </div>
        </div>

        {/* Footer Bottom: Revision Log & Technical Colophon */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-4 pt-4 items-start">
          {/* Revision Log (Bottom Left) */}
          <div className="space-y-3.5 max-w-xs">
            <span
              className={`${plexMono.className} block text-[9px] uppercase tracking-wider text-[#1B1D1F]/35`}
            >
              REVISION LOG
            </span>
            <div className={`${plexMono.className} text-[10px] text-[#1B1D1F]/45 space-y-1.5`}>
              {changelog.slice(0, 3).map((entry) => (
                <div key={entry.revision} className="flex justify-between gap-2">
                  <span className="shrink-0">{entry.revision}</span>
                  <span className="text-[#1B1D1F]/30">·</span>
                  <span className="text-right">{entry.title}</span>
                </div>
              ))}
            </div>
            <Link
              href="/changelog"
              className={`${plexMono.className} inline-block text-[9px] uppercase tracking-widest text-[#DE4B31] mt-1 transition-colors hover:text-[#1B1D1F]`}
            >
              View complete history →
            </Link>
          </div>

          {/* Technical Colophon (Bottom Right) */}
          <div className="md:text-right space-y-4">
            <div className={`${plexMono.className} text-[9px] text-[#1B1D1F]/40 space-y-1`}>
              <p>First published 2026.</p>
              <p>Built in public.</p>
              <p>Revised continuously.</p>
            </div>

            <div className="border-t border-[#1B1D1F]/10 pt-4 inline-block md:text-right">
              <span
                className={`${plexMono.className} block text-[10px] tracking-[0.25em] font-semibold text-[#1B1D1F]/80 leading-none`}
              >
                BUILT AS A SYSTEM,
              </span>
              <span
                className={`${plexMono.className} block text-[10px] tracking-[0.25em] font-semibold text-[#1B1D1F]/80 mt-1.5 leading-none`}
              >
                NOT A PORTFOLIO.
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
