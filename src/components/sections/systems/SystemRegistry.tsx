"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

type SystemStatus = "ACTIVE" | "IN_DEVELOPMENT" | "ARCHIVED" | "UNDER_REVIEW";
type SystemMaturity = "PRODUCTION" | "EXPERIMENTAL" | "RESEARCH" | "CONCEPT";

interface SystemEntry {
  id: string;
  name: string;
  category: string;
  status: SystemStatus;
  maturity: SystemMaturity;
  technologies: string[];
  description: string;
  href: string;
}

const STATUS_STYLES: Record<SystemStatus, { dot: string; label: string }> = {
  ACTIVE: { dot: "bg-emerald-500", label: "ACTIVE" },
  IN_DEVELOPMENT: { dot: "bg-amber-400", label: "IN_DEVELOPMENT" },
  ARCHIVED: { dot: "bg-neutral-400", label: "ARCHIVED" },
  UNDER_REVIEW: { dot: "bg-sky-400", label: "UNDER_REVIEW" },
};

const MATURITY_STYLES: Record<SystemMaturity, string> = {
  PRODUCTION: "border-emerald-500/30 text-emerald-700",
  EXPERIMENTAL: "border-amber-400/30 text-amber-700",
  RESEARCH: "border-sky-400/30 text-sky-700",
  CONCEPT: "border-neutral-300 text-neutral-500",
};

const systems: SystemEntry[] = [
  {
    id: "analytics-semantic-layer",
    name: "Analytics Semantic Execution Model",
    category: "DISTRIBUTED_SEMANTICS",
    status: "ACTIVE",
    maturity: "PRODUCTION",
    technologies: ["IndexedDB", "DSL Engine", "Client-Side Aggregation", "TypeScript"],
    description:
      "A distributed data interaction architecture exploring whether analytical semantics should execute centrally on the backend or locally within the client runtime. Shifts execution toward the frontend for highly responsive interaction patterns within constrained dataset boundaries.",
    href: "/systems/analytics-semantic-layer-architecture",
  },
  {
    id: "frontend-backend-boundary",
    name: "Frontend–Backend Responsibility Boundaries",
    category: "FRONTEND_ARCHITECTURE",
    status: "UNDER_REVIEW",
    maturity: "EXPERIMENTAL",
    technologies: ["React", "Node.js", "Event-Driven Architecture"],
    description:
      "Architectural separation between interaction systems, orchestration layers, and operational processing infrastructure. Focused on reducing coupling between interaction state, orchestration logic, and distributed processing workflows.",
    href: "/under-review",
  },
  {
    id: "dynamic-feature-injection",
    name: "Dynamic Feature Injection & Modular Expansion",
    category: "PLATFORM_SYSTEMS",
    status: "UNDER_REVIEW",
    maturity: "CONCEPT",
    technologies: ["Module Federation", "Plugin Architecture", "TypeScript"],
    description:
      "Extensible operational systems capable of evolving without destabilizing foundational workflow infrastructure. Explores modular expansion patterns, isolated feature domains, and controlled injection boundaries.",
    href: "/under-review",
  },
];

export function SystemRegistry() {
  return (
    <section
      data-header-theme="light"
      className="relative overflow-hidden bg-[#F3F1EC] px-6 py-16 md:px-12"
    >
      {/* Structural Rules */}
      <div className="absolute top-0 left-1/3 h-full w-px bg-black/[0.04]" />
      <div className="absolute top-0 left-2/3 h-full w-px bg-black/[0.04]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Registry Header */}
        <div className="mb-10 grid gap-12 md:grid-cols-[1fr_380px] md:items-end">
          <div>
            <span className="mb-5 block font-mono text-[10px] tracking-[0.22em] text-black/30">
              ENGINEERING_REGISTRY
            </span>
            <h2 className="max-w-3xl text-[2.8rem] font-medium leading-[1.04] tracking-[-0.04em] text-black/92 md:text-[5rem]">
              Systems catalog.
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="text-sm leading-relaxed text-black/50">
              A structured catalog of architectural systems, integration patterns, and infrastructure
              artifacts. Each entry represents a real design decision under operational pressure.
            </p>
            <div className="mt-8 flex items-center gap-6 border-t border-black/[0.06] pt-6">
              <span className="font-mono text-[10px] tracking-[0.2em] text-black/30">
                {systems.length} REGISTERED SYSTEMS
              </span>
            </div>
          </div>
        </div>

        {/* System Cards */}
        <div className="space-y-px bg-black/[0.06]">
          {systems.map((system) => {
            const statusStyle = STATUS_STYLES[system.status];
            const maturityStyle = MATURITY_STYLES[system.maturity];

            return (
              <div
                key={system.id}
                className="group bg-[#F3F1EC] transition-colors hover:bg-black/[0.02]"
              >
                <div className="grid gap-8 px-8 py-8 md:grid-cols-[220px_1fr_240px] md:px-12">
                  {/* Left Rail — Metadata */}
                  <div className="flex flex-col gap-6">
                    <div>
                      <span className="mb-2 block font-mono text-[9px] tracking-[0.18em] text-black/25">
                        CATEGORY
                      </span>
                      <span className="font-mono text-[10px] tracking-[0.14em] text-black/50">
                        {system.category}
                      </span>
                    </div>

                    <div>
                      <span className="mb-2 block font-mono text-[9px] tracking-[0.18em] text-black/25">
                        STATUS
                      </span>
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot} animate-pulse`}
                        />
                        <span className="font-mono text-[9px] tracking-[0.16em] text-black/60">
                          {statusStyle.label}
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="mb-2 block font-mono text-[9px] tracking-[0.18em] text-black/25">
                        MATURITY
                      </span>
                      <span
                        className={`inline-block border px-2 py-0.5 font-mono text-[9px] tracking-[0.14em] ${maturityStyle}`}
                      >
                        {system.maturity}
                      </span>
                    </div>
                  </div>

                  {/* Center — Main Content */}
                  <div className="max-w-3xl">
                    <div className="mb-6 flex items-start justify-between gap-6">
                      <h3 className="text-2xl font-medium leading-tight tracking-tight text-black/90 md:text-[1.7rem]">
                        {system.name}
                      </h3>

                      <Link href={system.href} className="hidden shrink-0 md:block">
                        <ArrowUpRight className="h-5 w-5 text-black/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-black/70" />
                      </Link>
                    </div>

                    <p className="max-w-2xl text-base leading-relaxed text-black/58">
                      {system.description}
                    </p>

                    {/* Technologies */}
                    <div className="mt-10 flex flex-wrap gap-2">
                      {system.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="border border-black/[0.08] bg-black/[0.03] px-2.5 py-1 font-mono text-[9px] tracking-[0.1em] text-black/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Rail */}
                  <div className="hidden border-l border-black/[0.06] pl-8 md:flex md:flex-col md:justify-between">
                    <div>
                      <span className="mb-4 block font-mono text-[9px] tracking-[0.18em] text-black/20">
                        SYSTEM_RECORD
                      </span>
                      <p className="text-sm leading-relaxed text-black/35">
                        Architecture represents a response to coordination pressure and operational
                        constraints rather than purely technical preference.
                      </p>
                    </div>

                    <Link
                      href={system.href}
                      className="group/link mt-8 inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.18em] text-black/30 transition-colors hover:text-black/70"
                    >
                      VIEW_SYSTEM
                      <ArrowUpRight className="h-3 w-3 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Registry Footer */}
        <div className="mt-10 border-t border-black/[0.08] pt-10">
          <div className="flex items-center justify-between">
            <p className="max-w-xl text-sm leading-relaxed text-black/40">
              Architecture diagrams and decision records are available within each system entry.
              Systems under review are documented but not yet publicly detailed.
            </p>
            <div className="hidden items-center gap-8 md:flex">
              {(["ACTIVE", "IN_DEVELOPMENT", "UNDER_REVIEW"] as SystemStatus[]).map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`h-1.5 w-1.5 rounded-full ${STATUS_STYLES[s].dot}`} />
                  <span className="font-mono text-[9px] tracking-[0.14em] text-black/35">
                    {s}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
