"use client";

import { useState } from "react";

interface Fragment {
  category: string;
  title: string;
  description: string;
  accent: string;
  accentHex: string;
  backQuestion: string;
  backBody: string;
  backShift: string;
  backTag: string;
}

const fragments: Fragment[] = [
  {
    category: "PHILOSOPHY",
    title: "Systems are ultimately stories about coordination.",
    description:
      "Whether technical or human, most systems fail at the boundaries — where assumptions diverge, context disappears, and coordination breaks down.",
    accent: "bg-[#7284A3]",
    accentHex: "#7284A3",
    backQuestion: "If everything is process, what exactly are you trying to design?",
    backBody:
      "Process philosophy reframed everything I thought I understood about organisations. A company is not a structure that has people in it — it is a process of continuous coordination that temporarily takes the shape of a structure. The moment you treat it as a static thing, you start making the wrong decisions.",
    backShift: "From asking what something is → asking what it's doing.",
    backTag: "PHILOSOPHY — BECOMING OVER BEING",
  },
  {
    category: "FICTION",
    title: "Fantasy and science fiction shaped how I think about worlds.",
    description:
      "Good worldbuilding behaves like good architecture. Rules matter. Constraints matter. Internal consistency matters. Complexity emerges naturally from structure.",
    accent: "bg-[#8AA392]",
    accentHex: "#8AA392",
    backQuestion: "What rules must be true for this world to hold together?",
    backBody:
      "Long before I cared about systems, I was fascinated by worlds, not characters. The best stories operated according to invisible rules — economies, institutions, mythologies. I kept reading past the plot, wanting to see the scaffolding underneath. Fiction was my first laboratory for understanding systems.",
    backShift: "From reading for story → reading for structure.",
    backTag: "FICTION — A GOVERNANCE PROBLEM IN DISGUISE",
  },
  {
    category: "MOVEMENT",
    title: "Dance changed how I understand rhythm and flow.",
    description:
      "Movement introduced a different perspective on coordination — one less analytical and more embodied. Timing, transition, balance, tension, release.",
    accent: "bg-[#C58B6C]",
    accentHex: "#C58B6C",
    backQuestion: "How do two people produce order without agreeing on it first?",
    backBody:
      "In partner dance, two people have to produce something coherent in real time, without words, without a plan. Coordination isn't agreed upon. It's negotiated — continuously — through tension, release, weight, timing. Salsa made it visible at human scale, in a body.",
    backShift: "From thinking coordination is designed → understanding it's emergent.",
    backTag: "DANCE — A COORDINATION SYSTEM WITHOUT WORDS",
  },
  {
    category: "EXPLORATION",
    title: "Travel makes systems visible.",
    description:
      "Cities, trails, transport networks, and cultures reveal how humans organize themselves under different environmental and operational constraints.",
    accent: "bg-[#9B7B72]",
    accentHex: "#9B7B72",
    backQuestion: "Whose behaviour does this structure assume?",
    backBody:
      "Switzerland's train network runs to the second. That's not an accident — it's a philosophy. A timetable is a coordination contract between millions of strangers. What cities made visible is that infrastructure is frozen coordination: prior decisions about human behaviour congealed into concrete and steel.",
    backShift: "From seeing infrastructure as neutral → seeing it as accumulated decision-making.",
    backTag: "CITIES — FROZEN DECISIONS ABOUT HUMAN BEHAVIOUR",
  },
];

// Individual flippable card — height is controlled by the outer className
function FlippableCard({
  fragment,
  className = "",
  contentClassName = "",
  titleSize = "text-xl",
  isLarge = false,
}: {
  fragment: Fragment;
  className?: string;
  contentClassName?: string;
  titleSize?: string;
  isLarge?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: Hover effect is purely presentational
    <div
      className={`relative flex flex-col transition-all duration-300 ${className} ${hovered ? "z-50" : "z-10"}`}
      style={{ perspective: "1200px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Flip container — fills the wrapper */}
      <div
        className="relative flex-1 w-full transition-transform duration-700 ease-in-out"
        style={{
          transformStyle: "preserve-3d",
          transform: hovered ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* ── FRONT FACE ── */}
        <div
          className="absolute inset-0 rounded-[inherit]"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div
            className={`relative h-full overflow-hidden rounded-[inherit] border border-black/[0.06] bg-white/40 backdrop-blur-sm transition-all duration-300 hover:bg-white/55 ${contentClassName}`}
          >
            {/* Ambient glow */}
            <div
              className="absolute right-0 top-0 h-32 w-32 rounded-full blur-2xl opacity-30 pointer-events-none"
              style={{ backgroundColor: fragment.accentHex }}
            />

            <div className="relative flex h-full flex-col justify-between p-8 md:p-10">
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: fragment.accentHex }} />
                  <span className="font-mono text-[10px] tracking-[0.18em] text-black/30">
                    {fragment.category}
                  </span>
                </div>

                <h3 className={`font-medium leading-tight tracking-tight text-black/90 ${titleSize} ${isLarge ? "max-w-2xl" : "max-w-sm"}`}>
                  {fragment.title}
                </h3>
              </div>

              <div>
                <p className={`leading-relaxed text-black/55 ${isLarge ? "text-base max-w-xl" : "text-sm"}`}>
                  {fragment.description}
                </p>
                <span className="mt-5 block font-mono text-[9px] tracking-[0.14em] text-black/20 uppercase">
                  hover to reveal ↗
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── BACK FACE ── */}
        <div
          className={`absolute inset-x-0 top-0 min-h-full rounded-[inherit] transition-shadow duration-700 ${hovered ? "pointer-events-auto shadow-2xl" : "pointer-events-none"}`}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div
            className="relative min-h-full overflow-hidden rounded-[inherit] border border-black/[0.06] bg-white/95 backdrop-blur-md"
          >
            {/* Tinted glow on back */}
            <div
              className="absolute right-0 top-0 h-40 w-40 rounded-full blur-3xl opacity-20 pointer-events-none"
              style={{ backgroundColor: fragment.accentHex }}
            />

            <div className="relative flex h-full flex-col justify-between p-8 md:p-10">
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: fragment.accentHex }} />
                  <span className="font-mono text-[10px] tracking-[0.18em] text-black/30">
                    {fragment.category}
                  </span>
                </div>

                {/* Hidden question — serif, the centrepiece */}
                <h3 className={`font-serif font-normal leading-snug tracking-tight text-black/88 ${isLarge ? "text-2xl md:text-3xl max-w-xl" : "text-lg md:text-xl"}`}>
                  {fragment.backQuestion}
                </h3>

                {/* Narrative */}
                <p className={`mt-5 font-light leading-relaxed text-black/55 ${isLarge ? "text-base max-w-xl" : "text-sm"}`}>
                  {fragment.backBody}
                </p>
              </div>

              {/* Footer */}
              <div className="border-t border-black/[0.06] pt-5">
                <p className="mb-2 text-xs font-light italic leading-relaxed text-black/45">
                  {fragment.backShift}
                </p>
                <span className="font-mono text-[9px] tracking-[0.14em] text-black/28 uppercase">
                  {fragment.backTag}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PersonalFragmentsSection() {
  return (
    <section
      id="personal-fragments"
      className="relative overflow-hidden bg-[#E7E1D7] px-6 py-32 md:px-12"
    >
      {/* Ambient Fields */}
      <div className="absolute left-[-10%] top-[10%] h-[420px] w-[420px] rounded-full bg-[#7284A3]/10 blur-3xl" />
      <div className="absolute bottom-[-10%] right-[0%] h-[480px] w-[480px] rounded-full bg-[#8AA392]/10 blur-3xl" />

      {/* Structural Rules */}
      <div className="absolute top-0 left-1/3 h-full w-px bg-black/[0.04]" />
      <div className="absolute top-0 left-2/3 h-full w-px bg-black/[0.04]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Intro */}
        <div className="mb-24 grid gap-12 md:grid-cols-[1fr_360px] md:items-end">
          <div className="max-w-5xl">
            <span className="mb-6 block font-mono text-[10px] tracking-[0.22em] text-black/28">
              PERSONAL_FRAGMENTS
            </span>
            <h2 className="max-w-5xl text-[2.8rem] font-medium leading-[1.02] tracking-[-0.05em] text-black/92 md:text-[5.2rem]">
              The systems mindset did not emerge from engineering alone.
            </h2>
          </div>

          <div className="max-w-sm">
            <p className="text-sm leading-relaxed text-black/48">
              Many of the ideas that shape how I think about architecture, coordination, and
              operational systems were formed outside software entirely.{" "}
              <span className="italic text-black/30">Hover any card to find the question hiding inside it.</span>
            </p>
          </div>
        </div>

        {/* Fragment Layout */}
        <div className="grid gap-6 md:grid-cols-12">

          {/* Large Left Feature — PHILOSOPHY */}
          <FlippableCard
            fragment={fragments[0]}
            isLarge={true}
            titleSize="text-3xl"
            className="rounded-[32px] md:col-span-7 min-h-[420px]"
          />

          {/* Right Stack — FICTION + MOVEMENT */}
          <div className="space-y-6 md:col-span-5">
            <FlippableCard
              fragment={fragments[1]}
              titleSize="text-xl"
              className="rounded-[28px] min-h-[196px]"
            />
            <FlippableCard
              fragment={fragments[2]}
              titleSize="text-xl"
              className="rounded-[28px] min-h-[196px]"
            />
          </div>

          {/* Bottom Wide — EXPLORATION */}
          <FlippableCard
            fragment={fragments[3]}
            isLarge={true}
            titleSize="text-2xl md:text-3xl"
            className="rounded-[32px] md:col-span-12 min-h-[220px]"
          />
        </div>

        {/* Closing Observation */}
        <div className="mt-28 border-t border-black/[0.08] pt-10">
          <div className="max-w-4xl">
            <p className="text-2xl font-light leading-relaxed tracking-tight text-black/68 md:text-3xl">
              I've become increasingly interested in the places where technical systems, human
              coordination, narrative structure, and philosophy begin to overlap.
            </p>
            <p className="mt-6 text-xl font-light leading-relaxed text-black/40">
              Most of my work eventually traces back to that curiosity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
