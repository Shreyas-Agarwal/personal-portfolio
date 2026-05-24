"use client";

const evolution = [
  {
    year: "FOUNDATION",
    title: "Analytics & Exploration",
    description:
      "The initial focus was not infrastructure, but understanding information itself — patterns, anomalies, relationships, and behavioral trends hidden inside structured data.",
    detail:
      "Working with analytical systems created an early sensitivity toward how data reflects operational reality.",
  },
  {
    year: "TRANSITION",
    title: "Operational Visibility",
    description:
      "As datasets became tied to real workflows, the challenge shifted from analysis toward coordination, visibility, and state consistency across systems.",
    detail:
      "The problem was no longer understanding isolated records, but understanding how information moved between teams, processes, and decisions.",
  },
  {
    year: "ARCHITECTURE",
    title: "System Thinking",
    description:
      "At scale, operational pressure naturally introduced workflows, event coordination, distributed execution, and governance requirements.",
    detail:
      "Architecture emerged less from technical ambition, and more from the necessity of maintaining coherent information flow under complexity.",
  },
];

export function OperationalIntelligenceSection() {
  return (
    <section
      data-header-theme="dark"
      className="relative overflow-hidden bg-[#0B0D10] px-6 py-32 md:px-12"
    >
      {/* Structural Rules */}
      <div className="absolute top-0 left-1/3 h-full w-px bg-white/[0.03]" />
      <div className="absolute top-0 left-2/3 h-full w-px bg-white/[0.03]" />

      <div className="relative mx-auto max-w-6xl">
        {/* Section Intro */}
        <div className="mb-24 grid gap-12 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <div className="max-w-3xl">
            <span className="mb-5 block font-mono text-[10px] tracking-[0.2em] text-white/25">
              OPERATIONAL_INTELLIGENCE
            </span>

            <h2 className="text-3xl font-medium leading-tight tracking-tight text-white/90 md:text-5xl">
              Data was never the destination.
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-sm leading-relaxed text-white/45">
              Analytical exploration created the foundation. Operational systems, coordination
              pressure, and information flow transformed that foundation into architectural
              thinking.
            </p>
          </div>
        </div>

        {/* Evolution Flow */}
        <div className="relative">
          {/* Main Vertical Rule */}
          <div className="absolute left-[14px] top-0 h-full w-px bg-white/[0.06]" />

          <div className="space-y-24">
            {evolution.map((item) => (
              <div
                key={item.title}
                className="relative grid gap-8 pl-12 md:grid-cols-[120px_1fr_320px]"
              >
                {/* Timeline Node */}
                <div className="absolute left-0 top-[8px] flex h-7 w-7 items-center justify-center rounded-full border border-white/[0.08] bg-[#0B0D10]">
                  <div className="h-1.5 w-1.5 rounded-full bg-white/40" />
                </div>

                {/* Stage Marker */}
                <div>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-white/20">
                    {item.year}
                  </span>
                </div>

                {/* Main Content */}
                <div className="max-w-2xl">
                  <h3 className="mb-4 text-2xl font-medium tracking-tight text-white/90">
                    {item.title}
                  </h3>

                  <p className="text-base leading-relaxed text-white/55">{item.description}</p>
                </div>

                {/* Supporting Observation */}
                <div className="md:pt-1">
                  <p className="text-sm leading-relaxed text-white/35">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Closing Observation */}
        <div className="mt-32 border-t border-white/[0.06] pt-10">
          <div className="max-w-3xl">
            <p className="text-lg font-light leading-relaxed text-white/60">
              Over time, the question stopped being:
              <span className="text-white/90"> “What does the data say?”</span>
            </p>

            <p className="mt-4 text-lg font-light leading-relaxed text-white/60">
              And became:
              <span className="text-white/90">
                {" "}
                “How do systems preserve meaning, coordination, and operational clarity as
                complexity scales?”
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
