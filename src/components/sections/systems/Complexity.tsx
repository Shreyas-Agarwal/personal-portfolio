"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const evolution = [
  {
    phase: "FOUNDATION",
    architecture: "MVC Applications",
    pressure: "Single-team coordination",
    response:
      "Early systems optimize for delivery speed, centralized logic, and direct operational visibility.",
    observation: "At smaller scales, simplicity is often more valuable than abstraction.",
  },
  {
    phase: "EXPANSION",
    architecture: "Monolithic Platforms",
    pressure: "Growing operational scope",
    response:
      "As workflows, user states, and business rules expand, centralized systems begin accumulating coordination pressure.",
    observation: "Complexity initially concentrates before it decentralizes.",
  },
  {
    phase: "SEPARATION",
    architecture: "Modular Monoliths",
    pressure: "Bounded context emergence",
    response:
      "Internal separation layers emerge to reduce coupling between workflows, domains, and operational responsibilities.",
    observation: "Most systems require clearer boundaries before they require distribution.",
  },
  {
    phase: "COORDINATION",
    architecture: "Distributed Services",
    pressure: "Independent execution requirements",
    response:
      "Background workers, event pipelines, orchestration layers, and service decomposition emerge through scaling pressure.",
    observation:
      "Distribution introduces new coordination problems rather than eliminating complexity.",
  },
  {
    phase: "GOVERNANCE",
    architecture: "Platform Systems",
    pressure: "Organizational scale",
    response:
      "Auditability, deployment orchestration, observability, and governance become architectural concerns rather than operational afterthoughts.",
    observation: "At scale, architecture becomes organizational infrastructure.",
  },
];

export function ComplexityCoordinationSection() {
  return (
    <section
      id="system-evolution"
      data-header-theme="dark"
      className="relative overflow-hidden bg-[#0A0F14] px-6 py-32 md:px-12"
    >
      {/* Structural Rules */}
      <div className="absolute top-0 left-1/3 h-full w-px bg-white/[0.04]" />
      <div className="absolute top-0 left-2/3 h-full w-px bg-white/[0.04]" />

      {/* Ambient Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Intro */}
        <div className="mb-28 grid gap-16 md:grid-cols-[1fr_420px] md:items-end">
          <div className="max-w-4xl">
            <span className="mb-6 block font-mono text-[10px] tracking-[0.22em] text-white/22">
              COMPLEXITY_AND_COORDINATION
            </span>

            <h2 className="max-w-5xl text-[2.8rem] font-medium leading-[1.04] tracking-[-0.04em] text-white/92 md:text-[5rem]">
              Architecture evolves through operational pressure.
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-sm leading-relaxed text-white/42">
              Systems rarely transition from monoliths to distributed architectures intentionally.
              Most architectural shifts emerge from scaling coordination requirements, workflow
              complexity, team boundaries, and operational visibility constraints.
            </p>
          </div>
        </div>

        {/* Evolution Map */}
        <div className="relative">
          {/* Main Rule */}
          <div className="absolute left-[140px] top-0 hidden h-full w-px bg-white/[0.05] md:block" />

          <div className="space-y-24">
            {evolution.map((item, _index) => (
              <div key={item.phase} className="grid gap-10 md:grid-cols-[120px_1fr_260px]">
                {/* Phase */}
                <div className="relative">
                  <span className="font-mono text-[10px] tracking-[0.22em] text-white/20">
                    {item.phase}
                  </span>

                  {/* Connector Node */}
                  <div className="absolute right-[-27px] top-[3px] hidden h-3 w-3 rounded-full border border-white/[0.08] bg-[#0A0F14] md:block">
                    <div className="absolute inset-[3px] rounded-full bg-white/30" />
                  </div>
                </div>

                {/* Main Architecture Layer */}
                <div className="max-w-3xl">
                  <div className="mb-5 flex flex-wrap items-center gap-4">
                    <h3 className="text-2xl font-medium tracking-tight text-white/90">
                      {item.architecture}
                    </h3>

                    <span className="border border-white/[0.06] px-2 py-1 font-mono text-[9px] tracking-[0.18em] text-white/22">
                      {item.pressure}
                    </span>
                  </div>

                  <p className="max-w-2xl text-base leading-relaxed text-white/55">
                    {item.response}
                  </p>
                </div>

                {/* Observation */}
                <div className="border-l border-white/[0.05] pl-6">
                  <span className="mb-4 block font-mono text-[9px] tracking-[0.18em] text-white/16">
                    OBSERVATION
                  </span>

                  <p className="text-sm leading-relaxed text-white/34">{item.observation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Closing Layer */}
        <div className="mt-32 border-t border-white/[0.06] pt-10">
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="text-lg font-light leading-relaxed text-white/62">
                Complexity rarely disappears.
              </p>

              <p className="mt-4 text-lg font-light leading-relaxed text-white/38">
                Most architectures simply redistribute coordination pressure across new operational
                boundaries.
              </p>
            </div>

            <Link
              href="/system-evolution"
              className="group inline-flex items-center gap-3 text-sm text-white/42 transition-colors hover:text-white"
            >
              Trace Full Evolution Flow
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
