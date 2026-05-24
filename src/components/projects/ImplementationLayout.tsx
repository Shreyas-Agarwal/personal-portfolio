"use client";

import { Activity, ArrowLeft, Award, ExternalLink, Layers, ShieldAlert, Users } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { projects } from "@/data/projects";
import { PdfViewer } from "./PdfViewer";

interface ImplementationLayoutProps {
  project: Project;
}

export function ImplementationLayout({ project }: ImplementationLayoutProps) {
  // Navigation indexes for Prev / Next links
  const idx = projects.findIndex((p) => p.id === project.id);
  const prev = projects[idx - 1];
  const next = projects[idx + 1];

  return (
    <div data-header-theme="dark" className="min-h-screen bg-[#0B0D10] text-white">
      {/* ── Sticky back navigation ─────────────────────────────────────── */}
      <div className="sticky top-[72px] z-40 border-b border-white/[0.06] bg-[#0B0D10]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 md:px-12">
          <Link
            href="/projects"
            className="group flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-white/30 transition-colors hover:text-white/70"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            BACK_TO_PROJECTS
          </Link>

          <div className="flex items-center gap-2">
            <Layers className="h-3.5 w-3.5 text-white/20" />
            <span className="font-mono text-[9px] tracking-[0.2em] text-white/20">
              IMPLEMENTATION_STUDY
            </span>
          </div>
        </div>
      </div>

      {/* ── Header Section ────────────────────────────────────────────────── */}
      <header className="border-b border-white/[0.06] px-6 py-16 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <span className="font-mono text-[9px] font-semibold tracking-[0.25em] text-orange-400/90 uppercase">
                Enterprise Rollout & Analytics
              </span>
              <h1 className="text-pretty text-3xl font-medium leading-tight tracking-tight text-white/95 md:text-4xl">
                {project.title}
              </h1>
              <p className="text-lg leading-relaxed text-white/50">{project.subtitle}</p>
            </div>

            {/* External / Presentation Link CTA (if exists) */}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex shrink-0 items-center gap-2 border border-white/[0.12] bg-white/[0.04] px-5 py-3 font-mono text-[10px] tracking-[0.2em] text-white/50 transition-all hover:border-white/30 hover:bg-white/[0.08] hover:text-white/90"
              >
                <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                VIEW_CASE_PLATFORM
              </a>
            )}
          </div>

          {/* Tech & Framework tags */}
          <div className="mt-8 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-sm border border-white/[0.08] bg-white/[0.04] px-3 py-1 font-mono text-[10px] tracking-wider text-white/35"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* ── Main Layout ─────────────────────────────────────────────── */}
      <main className="mx-auto max-w-7xl px-6 py-16 md:px-12 space-y-16">
        {/* ── Section A: Business Impact Metrics Grid ──────────────────── */}
        <section className="space-y-6">
          <div>
            <span className="font-mono text-[9px] tracking-[0.25em] text-white/20">
              SECTION_A | OPERATIONAL_IMPACT
            </span>
          </div>

          <div className="grid grid-cols-1 gap-px bg-white/[0.06] sm:grid-cols-3">
            {project.impactMetrics.map((m) => (
              <div
                key={m.label}
                className="bg-[#0E1013] p-6 relative group overflow-hidden transition-colors duration-300 hover:bg-[#121519]"
              >
                {/* Subtle visual accent */}
                <div className="absolute top-0 left-0 h-1 w-0 bg-orange-500/80 transition-all duration-300 group-hover:w-full" />
                <div className="text-3xl font-bold tracking-tight text-white/95">{m.value}</div>
                <div className="mt-2 font-mono text-[9px] leading-relaxed tracking-[0.15em] text-white/30 uppercase">
                  {m.label.replace(/ /g, "_")}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section B: Strategic Narrative (Split) ────────────────────── */}
        <section className="grid grid-cols-1 gap-12 lg:grid-cols-2 border-t border-white/[0.06] pt-12">
          {/* Left Column: Challenge & Gap */}
          <div className="space-y-4">
            <span className="font-mono text-[9px] tracking-[0.25em] text-white/20">
              SECTION_B_1 | THE_CHALLENGE
            </span>
            <h3 className="text-xl font-medium tracking-tight text-white/90">
              Core Bottlenecks & Strategic Ambitions
            </h3>
            <p className="text-base leading-relaxed text-white/60 font-light">
              {project.challenge}
            </p>
          </div>

          {/* Right Column: Narrative & Rollout */}
          <div className="space-y-4">
            <span className="font-mono text-[9px] tracking-[0.25em] text-white/20">
              SECTION_B_2 | ROLLOUT_&_TRANSFORMATION
            </span>
            <h3 className="text-xl font-medium tracking-tight text-white/90">
              Methodology, Coordination, & Output
            </h3>
            <p className="text-base leading-relaxed text-white/60 font-light">
              {project.impactNarrative}
            </p>
          </div>
        </section>

        {/* ── Section C: Strategic Asset Showcase ────────────────────────── */}
        <section className="border-t border-white/[0.06] pt-12 space-y-6">
          <div>
            <span className="font-mono text-[9px] tracking-[0.25em] text-white/20">
              SECTION_C | STRATEGIC_SHOWCASE
            </span>
          </div>

          {project.id === "dlf-acc-implementation" && project.presentationUrl ? (
            <div className="space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-sm border border-white/[0.06] bg-white/[0.02] p-5">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-white/90 flex items-center gap-2">
                    <Award className="h-4 w-4 text-orange-400 shrink-0" />
                    Autodesk University 2025 Contribution
                  </h4>
                  <p className="text-xs text-white/45 max-w-2xl">
                    Coordinated directly with the DLF GM for Tech Transformation to co-lead this
                    rollout. The results, workflows, and contributions were presented at the
                    Autodesk University 2025 global conference.
                  </p>
                </div>
                <a
                  href="https://www.autodesk.com/autodesk-university/class/DLFs-Journey-Toward-Smarter-Faster-Sharper-Construction-Delivery-Across-a-50-Million-Square-Foot-Portfolio-2025"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex shrink-0 items-center gap-1.5 border border-white/[0.12] bg-white/[0.04] px-4 py-2.5 font-mono text-[9px] tracking-[0.15em] text-white/50 transition-all hover:border-white/30 hover:bg-white/[0.08] hover:text-white/90"
                >
                  <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  AU2025_CLASS_RECORDING
                </a>
              </div>

              {/* Secure read-only PDF document viewer */}
              <PdfViewer url={project.presentationUrl} title={project.title} />
            </div>
          ) : project.id === "experion-implementation" ? (
            <div className="rounded-none border border-white/[0.08] bg-[#0E1013] p-8 space-y-8">
              <div className="border-b border-white/[0.06] pb-6">
                <h4 className="text-base font-medium text-white/90 flex items-center gap-2">
                  <Activity className="h-4.5 w-4.5 text-orange-400" />
                  Dashboard Suite Architecture Breakdown
                </h4>
                <p className="text-xs text-white/40 mt-1 max-w-3xl">
                  A high-level tracking matrix developed for Experion, monitoring structural
                  workflows, labor constraints, and future forecasts across active workspaces.
                </p>
              </div>

              {/* Grid of structured detailed info card sheets to replace images */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="border border-white/[0.06] bg-white/[0.01] p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-1.5 w-1.5 rounded-full bg-orange-400" />
                    <span className="font-mono text-[9px] tracking-widest text-white/40 uppercase">
                      T1 / Project Productivity
                    </span>
                  </div>
                  <h5 className="text-xs font-semibold text-white/80">Macro Progress Dashboards</h5>
                  <p className="text-xs text-white/50 leading-relaxed">
                    Integrates raw schedule progress with material log indexes. Tracks progress
                    rates across concrete pouring, masonry, and structural framing against schedule
                    benchmarks.
                  </p>
                </div>

                <div className="border border-white/[0.06] bg-white/[0.01] p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    <span className="font-mono text-[9px] tracking-widest text-white/40 uppercase">
                      T2 / Labor Efficiency
                    </span>
                  </div>
                  <h5 className="text-xs font-semibold text-white/80">
                    Manpower Allocations & KPIs
                  </h5>
                  <p className="text-xs text-white/50 leading-relaxed">
                    Correlates sub-contractor headcounts directly to daily output parameters.
                    Visualizes labor burn-rates, output factors (sq ft/man-day), and flags cost
                    anomalies dynamically.
                  </p>
                </div>

                <div className="border border-white/[0.06] bg-white/[0.01] p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-1.5 w-1.5 rounded-full bg-purple-400" />
                    <span className="font-mono text-[9px] tracking-widest text-white/40 uppercase">
                      T3 / Activity Forecasting
                    </span>
                  </div>
                  <h5 className="text-xs font-semibold text-white/80">Predictive Trend Lines</h5>
                  <p className="text-xs text-white/50 leading-relaxed">
                    Runs DAX moving-averages and variance measures to forecast project completion
                    dates. Enables site managers to run sandbox recovery scenarios directly in the
                    browser.
                  </p>
                </div>
              </div>

              {/* Technical constraints checklist */}
              <div className="border-t border-white/[0.06] pt-6 flex flex-col gap-4 md:flex-row md:items-center justify-between">
                <div className="flex items-center gap-3">
                  <Users className="h-4.5 w-4.5 text-white/30 shrink-0" />
                  <span className="font-mono text-[9px] tracking-wider text-white/40">
                    Direct Coordination: Experion Project Controls Director & Lead Engineers
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-sm bg-orange-500/[0.03] px-3.5 py-2 border border-orange-500/10">
                  <ShieldAlert className="h-3.5 w-3.5 text-orange-400/80" />
                  <span className="font-mono text-[9.5px] tracking-wider text-orange-400/70">
                    COMPLIANCE STATS: ENFORCED VIA NDA-COMPLIANT AGGREGATION
                  </span>
                </div>
              </div>
            </div>
          ) : null}
        </section>
      </main>

      {/* ── Footer Navigation ───────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.06] px-6 py-12 md:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link
            href="/projects"
            className="group flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-white/25 transition-colors hover:text-white/60"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            ALL_PROJECTS
          </Link>

          {/* Prev / Next navigation */}
          <div className="flex gap-8">
            {prev && (
              <Link
                href={`/projects/${prev.id}`}
                className="font-mono text-[9px] tracking-[0.2em] text-white/20 transition-colors hover:text-white/60"
              >
                ← PREV
              </Link>
            )}
            {next && (
              <Link
                href={`/projects/${next.id}`}
                className="font-mono text-[9px] tracking-[0.2em] text-white/20 transition-colors hover:text-white/60"
              >
                NEXT →
              </Link>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
