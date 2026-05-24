"use client";

import { ArrowDownRight } from "lucide-react";
import Link from "next/link";

const domains = [
  "WORKFLOW_COORDINATION",
  "STATE_MANAGEMENT",
  "DISTRIBUTED_EXECUTION",
  "SYSTEM_GOVERNANCE",
];

export function SystemsHero() {
  return (
    <section
      data-header-theme="dark"
      className="relative overflow-hidden bg-[#0A0F14] px-6 pt-32 pb-24 md:px-12"
    >
      {/* Structural Grid */}
      <div className="absolute top-0 left-1/3 h-full w-px bg-white/[0.04]" />
      <div className="absolute top-0 left-2/3 h-full w-px bg-white/[0.04]" />

      {/* Ambient Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.03),transparent_45%)]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Main Layout */}
        <div className="grid gap-20 md:grid-cols-[1.2fr_0.8fr]">
          {/* Left Column */}
          <div className="max-w-4xl">
            <h1 className="max-w-4xl text-[3rem] font-medium leading-[1.02] tracking-[-0.04em] text-white/92 md:text-[5.5rem]">
              Systems evolve under operational pressure.
            </h1>

            <div className="mt-10 max-w-2xl space-y-6">
              <p className="text-xl font-light leading-relaxed text-white/62">
                Most architectures do not begin as complex systems. Complexity emerges gradually
                through coordination requirements, workflow scaling, distributed execution, and
                accumulated operational constraints.
              </p>

              <p className="max-w-xl text-sm leading-relaxed text-white/38">
                This archive documents how information systems evolve under real operational
                conditions — from structured workflows and audit systems to orchestration layers,
                governance boundaries, and architectural tradeoffs.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-14">
              <Link
                href="#system-evolution"
                className="group inline-flex items-center gap-3 text-sm text-white/45 transition-colors hover:text-white"
              >
                Enter System Evolution
                <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col justify-between">
            {/* Domains */}
            <div>
              <span className="mb-8 block font-mono text-[10px] tracking-[0.2em] text-white/18">
                OPERATIONAL_DOMAINS
              </span>

              <div className="space-y-4">
                {domains.map((domain) => (
                  <div
                    key={domain}
                    className="flex items-center justify-between border-b border-white/[0.04] pb-4"
                  >
                    <span className="font-mono text-[11px] tracking-[0.12em] text-white/40">
                      {domain}
                    </span>

                    <div className="h-1 w-1 rounded-full bg-white/20" />
                  </div>
                ))}
              </div>
            </div>

            {/* Observation Block */}
            <div className="mt-20 border-l border-white/[0.08] pl-6">
              <span className="mb-4 block font-mono text-[10px] tracking-[0.2em] text-white/18">
                OBSERVATION
              </span>

              <p className="max-w-sm text-sm leading-relaxed text-white/42">
                Architectural complexity is rarely introduced intentionally. Most systems accumulate
                complexity as operational coordination expands across teams, workflows, and
                information boundaries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
