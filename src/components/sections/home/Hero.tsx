"use client";

import { ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section data-header-theme="dark" className="relative overflow-hidden bg-[#0B0D10] px-6 pt-24 pb-20 md:px-12">
      {/* Subtle Structural Rules */}
      <div className="absolute top-0 left-1/3 h-full w-[1px] bg-white/[0.02] pointer-events-none" />
      <div className="absolute top-0 left-2/3 h-full w-[1px] bg-white/[0.02] pointer-events-none" />

      <div className="relative mx-auto max-w-5xl">

        {/* Main Statement */}
        <div className="max-w-3xl space-y-12">
          <h1 className="text-pretty text-[2.5rem] font-normal leading-[1.15] tracking-tight text-white/90 md:text-[3.5rem]">
            I am fundamentally a <span className="font-medium text-white">data person.</span>
          </h1>

          <div className="space-y-8">
            <p className="text-xl font-light leading-relaxed text-white/70 md:text-2xl">
              Because I understand data: its structure, movement, constraints, and operational behavior, I understand the systems built around it.
            </p>

            <p className="max-w-2xl text-base leading-relaxed text-white/40">
              I am not inherently a backend engineer or infrastructure specialist. I operate in those domains because I understand the underlying information flow, and therefore where systems eventually fracture under scale and coordination.
            </p>
          </div>

          {/* Primary Actions */}
          <div className="flex flex-wrap items-center gap-8 pt-6">
            <Button asChild size="lg" className="h-12 rounded-none bg-white px-8 text-sm font-medium text-black transition-colors hover:bg-white/90">
              <Link href="/systems" className="flex items-center gap-2">
                View Systems Architecture <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            <Link
              href="/about"
              className="group flex items-center gap-2 text-sm font-medium text-white/50 transition-colors hover:text-white/90"
            >
              The Human Layer <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Editorial Observations: The System Record Approach */}
        <div className="mt-32 border-t border-white/[0.06] pt-16">
          <div className="flex flex-col gap-16">
            {[
              {
                id: "01",
                title: "Data Heritage",
                desc: "Systems inherit the latent assumptions of their data models. Technical debt is often simply structural regret.",
                metadata: "CORE_PRINCIPLE"
              },
              {
                id: "02",
                title: "Flow Emergence",
                desc: "Architecture is the natural response to information movement and operational pressure.",
                metadata: "OPERATIONAL_LOGIC"
              },
              {
                id: "03",
                title: "State Fracture",
                desc: "Failures propagate through broken state coordination and isolated memory boundaries.",
                metadata: "SCALE_OBSERVATION"
              },
            ].map((item) => (
              <div key={item.id} className="grid grid-cols-1 gap-4 md:grid-cols-[120px_1fr_240px]">
                {/* ID Column */}
                <div className="font-mono text-[10px] tracking-widest text-white/20">
                  INDEX_{item.id}
                </div>

                {/* Content Column */}
                <div className="max-w-xl">
                  <h3 className="mb-3 text-lg font-medium text-white/90">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-white/50">{item.desc}</p>
                </div>

                {/* Metadata/Type Column (Right Aligned) */}
                <div className="hidden md:block text-right">
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/10 border border-white/5 px-2 py-1">
                    {item.metadata}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}