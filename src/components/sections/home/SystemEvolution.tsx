"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const evolution = [
  {
    stage: "01",
    title: "Form Collection",
    description:
      "Initial systems focused on structured capture, validation, and operational consistency.",
  },
  {
    stage: "02",
    title: "Workflow Coordination",
    description:
      "As processes expanded, state synchronization and event sequencing became architectural concerns.",
  },
  {
    stage: "03",
    title: "Distributed Processing",
    description:
      "Background workers, queued execution, and isolated services emerged naturally from operational pressure.",
  },
  {
    stage: "04",
    title: "System Governance",
    description:
      "Auditability, traceability, and infrastructure visibility became essential for scale and reliability.",
  },
];

export function SystemEvolutionPreview() {
  return (
    <section
      data-header-theme="dark"
      className="relative overflow-hidden border-t border-white/[0.06] bg-[#0B0D10] px-6 py-28 md:px-12"
    >
      {/* Structural Grid */}
      <div className="absolute top-0 left-1/3 h-full w-[1px] bg-white/[0.02]" />
      <div className="absolute top-0 left-2/3 h-full w-[1px] bg-white/[0.02]" />

      <div className="relative mx-auto grid max-w-6xl gap-20 md:grid-cols-[320px_1fr]">
        {/* Editorial Column */}
        <div className="space-y-8">
          <div>
            <span className="font-mono text-[10px] tracking-[0.2em] text-white/25">
              SYSTEM_EVOLUTION
            </span>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-medium tracking-tight text-white/90 md:text-3xl">
              Complexity rarely arrives intentionally.
            </h2>

            <p className="text-sm leading-relaxed text-white/50">
              Most systems begin as isolated operational tools. Over time, coordination pressure
              introduces workflows, state management, distributed execution, and eventually
              governance constraints.
            </p>

            <p className="text-sm leading-relaxed text-white/40">
              My architectural thinking emerged through observing how these layers evolve under real
              operational conditions.
            </p>
          </div>

          <Button
            asChild
            size="lg"
            className="h-12 rounded-none bg-white px-8 text-sm font-medium text-black transition-colors hover:bg-white/90"
          >
            <Link href="/system-evolution" className="flex items-center gap-2">
              Trace System Evolution
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Evolution Timeline */}
        <div className="relative">
          {/* Vertical Rule */}
          <div className="absolute left-[11px] top-0 h-full w-px bg-white/[0.06]" />

          <div className="space-y-14">
            {evolution.map((item) => (
              <div key={item.stage} className="relative grid gap-6 pl-10 md:grid-cols-[80px_1fr]">
                {/* Node */}
                <div className="absolute left-0 top-[6px] flex h-6 w-6 items-center justify-center rounded-full border border-white/[0.08] bg-[#0B0D10]">
                  <div className="h-1.5 w-1.5 rounded-full bg-white/40" />
                </div>

                {/* Index */}
                <div className="font-mono text-[10px] tracking-[0.2em] text-white/20">
                  INDEX_{item.stage}
                </div>

                {/* Content */}
                <div className="max-w-xl">
                  <h3 className="mb-2 text-[15px] font-medium tracking-tight text-white/90">
                    {item.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-white/45">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
