"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useConsoleEasterEgg } from "@/hooks/use-console-easter-egg";
import { inter, plexMono, serif } from "@/lib/fonts";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Last commit date at time of writing — not wired to git automatically. */
const REV_DATE = "2026.06";

/**
 * Static, not tied to Field Note rotation — placeholder copy, edit to taste.
 */
const CURRENTLY = "Distributed state, and the cost of keeping a record honest.";

interface FieldNote {
  number: string;
  topic: string;
  paragraph: string;
  filed: string[];
}

const FIELD_NOTES: FieldNote[] = [
  {
    number: "00",
    topic: "STATE COORDINATION",
    paragraph:
      "Reality rarely changes everywhere at once. Most failures begin when one subsystem learns the truth before another.",
    filed: ["consensus", "storage", "time"],
  },
  {
    number: "01",
    topic: "INFORMATION FLOW",
    paragraph:
      "Information doesn't become valuable when it's stored. It becomes valuable when it reaches the next decision before it becomes stale.",
    filed: ["pipelines", "latency", "staleness"],
  },
  {
    number: "02",
    topic: "FAULT TOLERANCE",
    paragraph:
      "Reliability isn't preventing failure. It's preserving forward progress after failure inevitably arrives.",
    filed: ["retries", "recovery", "degradation"],
  },
  {
    number: "03",
    topic: "COMPUTATIONAL MODELS",
    paragraph:
      "Models simplify reality. Good systems make it obvious where that simplification begins to leak.",
    filed: ["abstraction", "modeling", "drift"],
  },
  {
    number: "04",
    topic: "TEMPORAL SYSTEMS",
    paragraph:
      "Most distributed systems aren't synchronizing machines. They're negotiating different versions of the present.",
    filed: ["time", "ordering", "snapshots"],
  },
  {
    number: "05",
    topic: "DATA MOVEMENT",
    paragraph:
      "Computation keeps getting cheaper. Transport doesn't. Modern systems increasingly spend more effort moving information than understanding it.",
    filed: ["serialization", "networks", "throughput"],
  },
  {
    number: "06",
    topic: "SYSTEM EVOLUTION",
    paragraph:
      "Complexity rarely arrives intentionally. It accumulates wherever coordination becomes more expensive than computation.",
    filed: ["growth", "architecture", "coordination"],
  },
  {
    number: "07",
    topic: "OBSERVABILITY",
    paragraph:
      "Metrics tell you something happened. Good observability explains why reality diverged from expectation.",
    filed: ["telemetry", "diagnostics", "feedback"],
  },
  {
    number: "08",
    topic: "BOUNDARIES",
    paragraph:
      "Every architectural boundary reduces coupling while increasing the cost of moving information across it.",
    filed: ["interfaces", "contracts", "latency"],
  },
  {
    number: "09",
    topic: "AUTOMATION",
    paragraph:
      "Automation isn't about removing people. It's about removing the need to repeatedly remember the same operational decision.",
    filed: ["workflows", "operations", "repeatability"],
  },
  {
    number: "10",
    topic: "FAILURE",
    paragraph:
      "Failure is rarely catastrophic in isolation. Cascades begin when independent assumptions quietly become dependent on one another.",
    filed: ["resilience", "cascades", "dependencies"],
  },
  {
    number: "11",
    topic: "SCALABILITY",
    paragraph:
      "Scale doesn't create architectural problems. It reveals the ones that were always there.",
    filed: ["scale", "capacity", "tradeoffs"],
  },
  {
    number: "12",
    topic: "ARCHITECTURE",
    paragraph:
      "Architecture is the shape information takes while moving through an organization.",
    filed: ["systems", "flow", "design"],
  },
  {
    number: "13",
    topic: "OPERATIONAL REALITY",
    paragraph:
      "Every dashboard is an opinion about the state of the world. Good systems make it easy to discover when that opinion becomes wrong.",
    filed: ["operations", "state", "visibility"],
  },
  {
    number: "14",
    topic: "STATE",
    paragraph:
      "State isn't difficult because it's large. It's difficult because somebody has to decide which version is true.",
    filed: ["consistency", "coordination", "truth"],
  },
  {
    number: "15",
    topic: "ABSTRACTION",
    paragraph:
      "Every abstraction eventually leaks. The interesting engineering begins when it does.",
    filed: ["interfaces", "models", "tradeoffs"],
  },
  {
    number: "16",
    topic: "PRODUCTION",
    paragraph:
      "Everything works in staging. Production is where systems start negotiating with reality.",
    filed: ["production", "operations", "reality"],
  },
  {
    number: "17",
    topic: "OPTIMIZATION",
    paragraph:
      "Every optimization moves a bottleneck somewhere else. Good architecture chooses where.",
    filed: ["tradeoffs", "performance", "design"],
  },
  {
    number: "18",
    topic: "COORDINATION",
    paragraph:
      "Most engineering is coordination disguised as computation.",
    filed: ["teams", "systems", "communication"],
  },
  {
    number: "19",
    topic: "INFORMATION",
    paragraph:
      "Data records what happened. Information changes what happens next.",
    filed: ["decision-making", "analytics", "flow"],
  },
];

export function HeroV2() {
  useConsoleEasterEgg();

  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    setIndex(Math.floor(Math.random() * FIELD_NOTES.length));
  }, []);

  const current = FIELD_NOTES[index ?? 0];

  return (
    <section
      data-header-theme="dark"
      className="relative flex min-h-screen flex-col justify-start bg-[#1B1D1F] px-6 pt-28 pb-16 md:px-12 md:pt-36 md:pb-24"
    >
      <div className="relative mx-auto w-full max-w-5xl">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-[1fr_220px]">
          <div className="max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className={`${serif.className} text-pretty text-[3rem] font-normal leading-[1.08] tracking-tight text-[#E6E1D6] md:text-[4rem]`}
            >
              Systems are just{" "}
              <HoverCard openDelay={200}>
                <HoverCardTrigger asChild>
                  <span className="cursor-help italic border-b border-dotted border-[#E6E1D6]/30 transition-colors hover:border-[#E6E1D6]/60">
                    stories
                  </span>
                </HoverCardTrigger>
                <HoverCardContent
                  side="top"
                  align="start"
                  sideOffset={8}
                  className="w-64 border-[#E6E1D6]/10 bg-[#1B1D1F]/95 p-4"
                >
                  <div className="space-y-3">
                    <p
                      className={`${serif.className} text-base italic leading-relaxed tracking-wide text-[#E6E1D6]/80`}
                    >
                      "Not all stories compile into systems."
                    </p>
                    <Link
                      href="https://www.fanfiction.net/u/12959962/The-Dragonstaff-and-Technomage"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${inter.className} group/link flex items-center gap-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[#E6E1D6]/40 transition-colors hover:text-[#E6E1D6]/80`}
                    >
                      View archive{" "}
                      <ChevronRight className="h-3 w-3 transition-transform group-hover/link:translate-x-0.5" />
                    </Link>
                  </div>
                </HoverCardContent>
              </HoverCard>{" "}
              told in silicon.
            </motion.h1>

            <div
              className="mt-16 border-t border-[#E6E1D6]/10 pt-6 md:mt-20"
              aria-live="polite"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.number}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <span
                    className={`${plexMono.className} block text-xs tracking-[0.18em] text-[#DE4B31]`}
                  >
                    — FIELD NOTE {current.number} · {current.topic}
                  </span>
                  <p
                    className={`${serif.className} mt-4 max-w-xl border-l-2 border-[#DE4B31] pl-5 text-xl italic leading-relaxed text-[#E6E1D6] md:text-2xl`}
                  >
                    {current.paragraph}
                  </p>
                  <div className="mt-4 md:hidden">
                    <span className={`${plexMono.className} text-[11px] tracking-wide text-[#E6E1D6]/40`}>
                      Filed: {current.filed.join(" · ")}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="mt-6 max-w-xl border-t border-[#E6E1D6]/10" />
            </div>

            <button
              type="button"
              onClick={() => setIndex(((index ?? 0) + 1) % FIELD_NOTES.length)}
              aria-label="Next field note"
              className={`${inter.className} group mt-6 flex items-center gap-1.5 text-xs text-[#E6E1D6]/50 transition-colors hover:text-[#E6E1D6]/80`}
            >
              <span className="border-b border-transparent group-hover:border-[#E6E1D6]/40">Next</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>

          <div className="hidden md:block">
            <div className={`${plexMono.className} space-y-1.5 text-[11px] tracking-wide text-[#E6E1D6]/35`}>
              <div>VOL. I</div>
              <div>No. 00</div>
              <div>Rev {REV_DATE}</div>
            </div>

            <div className="mt-5 border-t border-[#E6E1D6]/10 pt-5">
              <span className={`${plexMono.className} block text-[10px] uppercase tracking-[0.18em] text-[#E6E1D6]/25`}>
                Currently
              </span>
              <p className={`${serif.className} mt-2 text-sm leading-relaxed text-[#E6E1D6]/70`}>
                {CURRENTLY}
              </p>
            </div>

            <div className="mt-5 border-t border-[#E6E1D6]/10 pt-5">
              <span className={`${plexMono.className} block text-[10px] uppercase tracking-[0.18em] text-[#E6E1D6]/25`}>
                Filed
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.number}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className={`${plexMono.className} mt-2 text-[11px] tracking-wide text-[#E6E1D6]/35`}
                >
                  {current.filed.join(" · ")}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          className="mt-16 max-w-2xl border-t border-[#E6E1D6]/10 pt-6 md:mt-20"
        >
          <p className={`${serif.className} text-base leading-relaxed text-[#E6E1D6]/60 md:text-lg`}>
            I didn't start by building distributed systems. I started by asking why operational
            reality and the record of that reality drift apart. Every project collected here is
            another attempt at answering that question—from analytics and workflow automation to
            event streams, temporal state, and system architecture.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
