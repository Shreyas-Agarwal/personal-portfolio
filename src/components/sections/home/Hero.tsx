"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const observations = [
  {
    id: "obs-01",
    label: "OBSERVATION 01",
    title: "Systems inherit the assumptions of their data.",
    description:
      "Operational fragility usually begins long before infrastructure fails. Most systems become unstable when the underlying data model no longer matches reality.",
  },
  {
    id: "obs-02",
    label: "OBSERVATION 02",
    title: "Architecture emerges from information flow.",
    description:
      "Queues, orchestration layers, retries, and distributed coordination are not architectural trends. They are responses to how operational data behaves at scale.",
  },
  {
    id: "obs-03",
    label: "OBSERVATION 03",
    title: "Failures propagate through state.",
    description:
      "Most production incidents are ultimately coordination problems — partial state, delayed synchronization, broken assumptions, or unreconciled workflows.",
  },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/[0.05] bg-[#0A0B0C]">
      {/* ───────────────────────────────────────────────────── */}
      {/* BACKGROUND */}
      {/* ───────────────────────────────────────────────────── */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Structural Grid */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
                            linear-gradient(to right, rgba(255,255,255,1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,1) 1px, transparent 1px)
                        `,
            backgroundSize: "64px 64px",
          }}
        />

        {/* Large Grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
                            linear-gradient(to right, rgba(255,255,255,1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,1) 1px, transparent 1px)
                        `,
            backgroundSize: "256px 256px",
          }}
        />

        {/* Ambient Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_65%)]" />

        {/* Ambient Labels */}
        <div className="absolute left-[5%] top-[14%] font-mono text-[9px] uppercase tracking-[0.28em] text-white/[0.03]">
          state_transition_boundary
        </div>

        <div className="absolute right-[6%] top-[28%] font-mono text-[9px] uppercase tracking-[0.28em] text-white/[0.03]">
          operational_signal_flow
        </div>

        <div className="absolute bottom-[16%] left-[18%] font-mono text-[9px] uppercase tracking-[0.28em] text-white/[0.03]">
          distributed_coordination
        </div>

        <div className="absolute bottom-[10%] right-[12%] font-mono text-[9px] uppercase tracking-[0.28em] text-white/[0.03]">
          information_consistency
        </div>
      </div>

      {/* ───────────────────────────────────────────────────── */}
      {/* MAIN */}
      {/* ───────────────────────────────────────────────────── */}

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 py-20 md:px-10 lg:px-16">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1.08fr_0.92fr]">
          {/* ───────────────────────────────────────── */}
          {/* LEFT */}
          {/* ───────────────────────────────────────── */}

          <div className="max-w-3xl">
            {/* Top Label */}
            <div className="mb-8 flex items-center gap-4">
              <div className="h-px w-6 bg-white/12" />

              <span className="font-mono text-[10px] uppercase tracking-[0.38em] text-white/28">
                Data Systems & Operational Architecture
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-pretty text-[3rem] font-medium leading-[1.02] tracking-[-0.04em] text-white/92 sm:text-[4.2rem] lg:text-[4.8rem]">
              Data shapes
              <span className="block text-white/34">every system.</span>
            </h1>

            {/* Body Copy */}
            <div className="mt-8 max-w-2xl space-y-5">
              <p className="text-[1.02rem] font-light leading-[1.9] text-white/62 md:text-[1.08rem]">
                I am fundamentally a data person. Because I understand data - its structure,
                movement, constraints, and operational behavior - I understand the systems built
                around it.
              </p>

              <p className="text-[1rem] font-light leading-[1.9] text-white/40 md:text-[1.05rem]">
                I am not inherently a backend engineer or infrastructure specialist. I can operate
                in those domains because I understand the underlying information flow, and therefore
                where systems eventually fracture under scale and coordination.
              </p>
            </div>

            {/* Capability Tags */}
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
              {[
                "Operational Analytics",
                "Workflow Infrastructure",
                "Distributed Coordination",
                "Failure Analysis",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="h-1 w-1 rounded-full bg-white/12" />

                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button
                asChild
                size="lg"
                className="group h-11 rounded-none border border-white/10 bg-white/92 px-7 text-black hover:bg-white"
              >
                <Link
                  href="/system-evolution"
                  className="flex items-center gap-3 font-medium tracking-wide"
                >
                  Explore System Evolution
                  <ArrowRight className="h-4 w-4 opacity-70 transition-transform duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="ghost"
                className="h-11 rounded-none border border-white/[0.06] bg-transparent px-7 text-white/58 hover:bg-white/[0.025] hover:text-white"
              >
                <Link href="#systems">View Technical Work</Link>
              </Button>
            </div>

            {/* Bottom Reflection */}
            <div className="mt-10 border-t border-white/[0.05] pt-5">
              <p className="max-w-2xl text-[0.9rem] leading-[1.9] text-white/28">
                Most architectural complexity emerges from coordinating information across time,
                systems, and operational uncertainty — not from infrastructure alone.
              </p>
            </div>
          </div>

          {/* ───────────────────────────────────────── */}
          {/* RIGHT */}
          {/* ───────────────────────────────────────── */}

          <div className="relative hidden lg:block">
            {/* Panel */}
            <div className="relative overflow-hidden border border-white/[0.05] bg-white/[0.015] px-10 py-10 backdrop-blur-sm">
              {/* Header */}
              <div className="mb-10 border-b border-white/[0.05] pb-4">
                <div className="flex items-center justify-between">
                  <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-white/22">
                    Operational Observations
                  </div>

                  <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/12">
                    systems.log
                  </div>
                </div>
              </div>

              {/* Observation List */}
              <div className="space-y-8">
                {observations.map((item, i) => (
                  <div key={item.id} className="relative">
                    {/* Connector */}
                    {i !== observations.length - 1 && (
                      <div className="absolute left-[1px] top-[88px] h-8 w-px bg-white/[0.05]" />
                    )}

                    {/* Label */}
                    <div className="mb-3 flex items-center gap-3">
                      <div className="h-[1px] w-4 bg-white/[0.08]" />

                      <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/18">
                        {item.label}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="max-w-md text-[1rem] font-medium leading-[1.5] tracking-[0.01em] text-white/72">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-3 max-w-md text-[0.88rem] font-light leading-[1.9] text-white/34">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-10 border-t border-white/[0.05] pt-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/14">
                    operational_reasoning
                  </span>

                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/10">
                    stable
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
