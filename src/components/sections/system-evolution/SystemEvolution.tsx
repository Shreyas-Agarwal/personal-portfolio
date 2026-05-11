"use client";

// system-evolution/SystemEvolution.tsx
// Sticky scroll section: section occupies (N + 1) × 100vh of page height.
// The inner container is sticky, pinned to the top at 100vh.
// Scroll position drives which phase is "active" — content cross-fades.

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { ComplexityStack } from "./ComplexityStack";
import { evolutionPhases } from "./data";

// ─── Background ──────────────────────────────────────────────────────────────
function EngineeringGrid() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
                        linear-gradient(to right,  rgba(255,255,255,0.028) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255,255,255,0.028) 1px, transparent 1px)
                    `,
          backgroundSize: "64px 64px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
                        linear-gradient(to right,  rgba(255,255,255,0.05) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
                    `,
          backgroundSize: "256px 256px",
        }}
      />
    </div>
  );
}

function RoutingTraces() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <svg
        className="h-full w-full"
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label="Decorative routing traces representing system connectivity"
      >
        <title>Routing Traces</title>
        <path
          d="M0 180 L280 180 L280 420 L600 420"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="1"
        />
        <path
          d="M1440 520 L1100 520 L1100 280 L780 280"
          stroke="rgba(255,255,255,0.035)"
          strokeWidth="1"
        />
        <circle cx="600" cy="420" r="2" fill="rgba(255,255,255,0.06)" />
        <circle cx="780" cy="280" r="2" fill="rgba(255,255,255,0.06)" />
      </svg>
    </div>
  );
}

// ─── Phase progress dots ──────────────────────────────────────────────────────
function PhaseNav({ activePhase }: { activePhase: number }) {
  return (
    <div
      className="absolute left-6 xl:left-12 top-1/2 -translate-y-1/2 hidden flex-col items-start gap-4 lg:flex"
      aria-hidden="true"
    >
      {evolutionPhases.map((p, i) => (
        <div key={p.id} className="flex items-center gap-3">
          <div
            className={cn(
              "h-1.5 w-1.5 rounded-full transition-all duration-300",
              i === activePhase
                ? "bg-white scale-[1.5] shadow-[0_0_12px_rgba(255,255,255,0.6)]"
                : "bg-white/15",
            )}
          />
          <span
            className={cn(
              "font-mono text-[10.5px] uppercase tracking-[0.2em] transition-all duration-300",
              i === activePhase ? "text-white/90 font-semibold" : "text-white/20",
            )}
          >
            {p.phase}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Intro Panel ─────────────────────────────────────────────────────────────
function IntroPanel({ visible }: { visible: boolean }) {
  return (
    <div
      className="absolute inset-0 flex items-center"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-12px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <div className="mx-auto w-full max-w-5xl px-6 md:px-10">
        <div className="max-w-3xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-6 bg-white/15" />
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/30">
              System Evolution
            </span>
          </div>

          <h2 className="text-[1.8rem] font-semibold leading-[1.15] tracking-tight text-foreground md:text-[2.5rem]">
            Designing systems that evolved when operational reality broke the original assumptions.
          </h2>

          <div className="mt-7 space-y-4 max-w-2xl">
            <p className="text-[0.95rem] leading-[1.8] text-muted-foreground">
              The system did not scale linearly. As enterprise deployments, asynchronous workflows,
              distributed processing, and reliability requirements emerged, the architecture evolved
              from a simple monolith into a distributed workflow platform.
            </p>
            <p className="text-[0.95rem] leading-[1.8] text-muted-foreground">
              This section documents the major architectural pivots, the operational failures that
              forced them, and the decisions made under real constraints.
            </p>
          </div>

          <div className="mt-10 flex items-center gap-2">
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/20">
              Scroll to trace the evolution
            </span>
            <div className="h-px w-12 bg-white/10" />
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path
                d="M6 2v8M3 7l3 3 3-3"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Phase Panel ─────────────────────────────────────────────────────────────
function PhasePanel({
  phaseIndex,
  visible,
  direction,
}: {
  phaseIndex: number;
  visible: boolean;
  direction: "up" | "down";
}) {
  const phase = evolutionPhases[phaseIndex];

  const yOffset = visible ? "0px" : direction === "down" ? "16px" : "-16px";

  return (
    <div
      className="absolute inset-0 flex items-center overflow-y-auto"
      style={{
        opacity: visible ? 1 : 0,
        transform: `translateY(${yOffset})`,
        transition: "opacity 0.38s ease, transform 0.38s ease",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <div className="mx-auto w-full max-w-5xl px-6 py-10 md:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_460px] lg:gap-16">
          {/* ── LEFT: narrative ── */}
          <div className="min-w-0">
            {/* Phase label */}
            <div className="mb-4 flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-white/28">
                {phase.phase}
              </span>
              <div className="h-px flex-1 bg-white/[0.05]" />
            </div>

            {/* Title */}
            <h3 className="text-[1.4rem] font-semibold leading-snug tracking-tight text-foreground md:text-[1.75rem]">
              {phase.title}
            </h3>

            {/* 1. Assumption */}
            <div className="mt-6 mb-8 border-l-2 border-white/[0.15] pl-4">
              <div className="mb-1.5 font-mono text-[9px] uppercase tracking-[0.22em] text-white/40">
                Original Assumption
              </div>
              <p className="text-[0.95rem] italic leading-[1.7] text-muted-foreground">
                {phase.assumption}
              </p>
            </div>

            {/* 2. What Broke */}
            <div className="mb-6">
              <div className="mb-2 font-mono text-[9px] uppercase tracking-[0.22em] text-red-400/60">
                What Invalidated It
              </div>
              <p className="text-[0.95rem] leading-[1.8] text-muted-foreground/90">
                {phase.whatBroke}
              </p>
            </div>

            {/* 3. Architectural Response */}
            <div className="mb-8 rounded-[3px] border border-white/[0.06] bg-white/[0.015] px-4 py-3.5">
              <div className="mb-2 font-mono text-[9px] uppercase tracking-[0.22em] text-white/40">
                Architectural Consequence
              </div>
              <p className="text-[0.95rem] leading-[1.8] text-muted-foreground/90">
                {phase.architecturalResponse}
              </p>
            </div>

            {/* 4. Realization */}
            <div className="mt-10 pt-6 border-t border-white/[0.04]">
              <div className="mb-2 font-mono text-[9px] uppercase tracking-[0.22em] text-white/20">
                Realization
              </div>
              <p className="text-[1.05rem] font-medium leading-[1.6] tracking-tight text-white/80">
                {phase.realization}
              </p>
            </div>
          </div>

          {/* ── RIGHT: diagram + complexity (MOBILE ONLY) ── */}
          {/* On desktop, this is rendered statically over the panels so it doesn't crossfade */}
          <div className="flex flex-col gap-10 lg:hidden">
            <ArchitectureDiagram
              nodes={phase.diagram.nodes}
              edges={phase.diagram.edges}
            />
            <ComplexityStack burdens={phase.burden} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Closing reflection panel ─────────────────────────────────────────────────
function ClosingPanel({ visible }: { visible: boolean }) {
  return (
    <div
      className="absolute inset-0 flex items-center"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <div className="mx-auto w-full max-w-5xl px-6 md:px-10">
        <div className="max-w-2xl">
          <div className="mb-8 flex items-center gap-3">
            <div className="h-px w-6 bg-white/15" />
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/28">
              Closing Reflection
            </span>
          </div>
          <p className="text-[1.1rem] leading-[1.85] text-muted-foreground md:text-[1.2rem]">
            The architecture gradually became less about features, and more about controlling state,
            coordination, and operational reliability under uncertainty.
          </p>
          <p className="mt-6 font-mono text-[0.9rem] italic text-white/30 md:text-[1rem]">
            The systems evolved.
            <br />
            So did the way I thought about them.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
// Scroll steps:
//   0        → intro
//   1..N     → phase 0..N-1
//   N+1      → closing reflection
const PHASES = evolutionPhases.length; // 5
const TOTAL_STEPS = PHASES + 2; // intro + 5 phases + closing

export function SystemEvolution() {
  const outerRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [prevStep, setPrevStep] = useState(0);

  const handleScroll = useCallback(() => {
    const el = outerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const scrolled = Math.max(0, window.scrollY - sectionTop);
    const stepH = el.offsetHeight / TOTAL_STEPS;
    const raw = Math.floor(scrolled / stepH);
    const next = Math.min(TOTAL_STEPS - 1, raw);
    setStep((prev) => {
      if (prev !== next) setPrevStep(prev);
      return next;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const direction = step > prevStep ? "down" : "up";

  // step 0 = intro, steps 1..5 = phases 0..4, step 6 = closing
  const showIntro = step === 0;
  const showClosing = step === TOTAL_STEPS - 1;
  const activePhase = showIntro || showClosing ? -1 : step - 1; // 0..4

  return (
    <section
      id="evolution"
      ref={outerRef}
      className="relative border-b border-border bg-[#0B0D10]"
      style={{ height: `${TOTAL_STEPS * 100}vh` }}
    >
      {/* ── Sticky viewport ── */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <EngineeringGrid />
        <RoutingTraces />

        {/* Phase nav dots */}
        <PhaseNav activePhase={activePhase} />

        {/* Step counter — top left annotation */}
        <div
          aria-hidden="true"
          className="absolute left-6 top-6 hidden font-mono text-[9px] uppercase tracking-[0.22em] text-white/[0.07] md:block"
        >
          {showIntro ? "intro" : showClosing ? "closing" : `${step} / ${PHASES}`}
        </div>

        {/* Intro */}
        <IntroPanel visible={showIntro} />

        {/* Phase panels */}
        {evolutionPhases.map((phase, i) => (
          <PhasePanel
            key={phase.id}
            phaseIndex={i}
            visible={!showIntro && !showClosing && activePhase === i}
            direction={direction}
          />
        ))}

        {/* Closing */}
        <ClosingPanel visible={showClosing} />

        {/* ── Persistent Right Column (Desktop Only) ── */}
        {/* 
                  Instead of re-mounting or crossfading per phase, this sits statically
                  over the scroll area. It receives the current active phase data, allowing 
                  its internal components to transition smoothly as coordinates/values change.
                */}
        <div
          className="absolute inset-0 pointer-events-none hidden lg:flex items-center"
          style={{
            opacity: !showIntro && !showClosing ? 1 : 0,
            transform: !showIntro && !showClosing ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.4s ease, transform 0.4s ease",
          }}
        >
          <div className="mx-auto w-full max-w-5xl px-6 md:px-10">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_460px] lg:gap-16">
              <div /> {/* Spacer for Left Column */}
              <div className="pointer-events-auto flex flex-col gap-10">
                <ArchitectureDiagram
                  nodes={evolutionPhases[Math.max(0, activePhase)]?.diagram.nodes || []}
                  edges={evolutionPhases[Math.max(0, activePhase)]?.diagram.edges || []}
                />
                <ComplexityStack
                  burdens={evolutionPhases[Math.max(0, activePhase)]?.burden || []}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom progress bar */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-[1px] bg-white/20 transition-all duration-300 ease-out"
          style={{
            width: `${(step / (TOTAL_STEPS - 1)) * 100}%`,
          }}
        />
      </div>
    </section>
  );
}
