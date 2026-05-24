import type { Metadata } from "next";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Seven production case studies — 4D simulation engines, enterprise data pipelines, document stamping FSMs, conversational AI gateways, notification brokers, and enterprise operational rollouts.",
  openGraph: {
    title: "Projects | Shreyas Agarwal",
    description:
      "Production-grade systems across AEC platforms, data infrastructure, operational automation, and enterprise transformations.",
  },
};

export default function ProjectsPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        data-header-theme="dark"
        className="relative overflow-hidden border-b border-white/[0.06] bg-[#0B0D10] px-6 py-28 md:px-12"
      >
        {/* Structural grid lines */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/3 h-full w-px bg-white/[0.02]" />
          <div className="absolute top-0 left-2/3 h-full w-px bg-white/[0.02]" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <span className="mb-6 block font-mono text-[10px] tracking-[0.25em] text-white/25">
            CASE_STUDIES {/* PRODUCTION_SYSTEMS */}
          </span>

          <h1 className="max-w-3xl text-pretty text-[2.2rem] font-normal leading-[1.15] tracking-tight text-white/90 md:text-[3rem]">
            Systems built under{" "}
            <span className="font-medium text-white">real operational pressure.</span>
          </h1>

          <p className="mt-8 max-w-xl text-base leading-relaxed text-white/45">
            Seven production case studies spanning AEC data platforms, enterprise pipelines,
            compliance automation, and operational transformation rollouts — each with a deep
            breakdown.
          </p>
        </div>
      </section>

      {/* ── Projects Grid ────────────────────────────────────────────────── */}
      <section data-header-theme="dark" className="relative bg-[#0B0D10] px-6 py-20 md:px-12">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/3 h-full w-px bg-white/[0.02]" />
          <div className="absolute top-0 left-2/3 h-full w-px bg-white/[0.02]" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          {/* 5-card grid: 2 top + 3 bottom on xl, 2-col on md, 1-col on mobile */}
          <div className="grid gap-px bg-white/[0.04] sm:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, i) => (
              <div
                key={project.id}
                className={
                  // Give the first card (featured) full width on xl so we get 1+2+2 layout
                  i === 0 ? "xl:col-span-3" : ""
                }
              >
                <ProjectCard project={project} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
