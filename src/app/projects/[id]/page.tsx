import { ArrowLeft, ArrowUpRight, ExternalLink, Layers } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ImplementationLayout } from "@/components/projects/ImplementationLayout";
import { LinkedInEmbed } from "@/components/projects/LinkedInEmbed";
import { SystemMicroDiagram } from "@/components/projects/SystemMicroDiagram";
import { getProjectById, projects } from "@/data/projects";

const DIAGRAM_VARIANT_MAP: Record<string, "4d-sim" | "powerbi" | "fsm" | "whatsapp" | "broker"> = {
  "planned-vs-actual-4d": "4d-sim",
  "powerbi-4d-viewer": "powerbi",
  "document-stamping": "fsm",
  "whatsapp-chatbots": "whatsapp",
  "notification-broker": "broker",
};

// ── Static generation ─────────────────────────────────────────────────────────

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) return { title: "Not Found" };

  return {
    title: project.title,
    description: project.subtitle,
    openGraph: {
      title: `${project.title} | Shreyas Agarwal`,
      description: project.subtitle,
    },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function CaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) notFound();

  if (project.type === "implementation") {
    return <ImplementationLayout project={project} />;
  }

  const diagramVariant = DIAGRAM_VARIANT_MAP[project.id] ?? "broker";

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
            <span className="font-mono text-[9px] tracking-[0.2em] text-white/20">CASE_STUDY</span>
          </div>
        </div>
      </div>

      {/* ── Page Header ────────────────────────────────────────────────── */}
      <header className="border-b border-white/[0.06] px-6 py-16 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <h1 className="text-pretty text-3xl font-medium leading-tight tracking-tight text-white/95 md:text-4xl">
                {project.title}
              </h1>
              <p className="text-lg leading-relaxed text-white/50">{project.subtitle}</p>
            </div>

            {/* Live demo CTA */}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex shrink-0 items-center gap-2 border border-white/[0.12] bg-white/[0.04] px-5 py-3 font-mono text-[10px] tracking-[0.2em] text-white/50 transition-all hover:border-white/30 hover:bg-white/[0.08] hover:text-white/90"
              >
                <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                LAUNCH_LIVE_SANDBOX
              </a>
            )}

            {/* Presentation CTA */}
            {project.presentationUrl && (
              <a
                href={project.presentationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex shrink-0 items-center gap-2 border border-white/[0.12] bg-white/[0.04] px-5 py-3 font-mono text-[10px] tracking-[0.2em] text-white/50 transition-all hover:border-white/30 hover:bg-white/[0.08] hover:text-white/90"
              >
                <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                VIEW_PRESENTATION
              </a>
            )}
          </div>

          {/* Tech stack tags */}
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

      {/* ── Split-screen body ─────────────────────────────────────────── */}
      <main className="mx-auto max-w-7xl px-6 py-16 md:px-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* ── LEFT: Evidence Engine ──────────────────────────────────── */}
          <div className="space-y-6">
            <div>
              <span className="font-mono text-[9px] tracking-[0.25em] text-white/20">
                EVIDENCE_ENGINE
              </span>
            </div>

            {/* LinkedIn embed / video fallback / image fallback */}
            {project.linkedinEmbedId || project.backupVideoPath ? (
              <LinkedInEmbed
                embedId={project.linkedinEmbedId}
                backupVideoPath={project.backupVideoPath}
                title={project.title}
              />
            ) : project.imagePath ? (
              <div className="relative w-full overflow-hidden rounded-sm border border-white/[0.08] bg-[#05070A] aspect-video">
                <Image src={project.imagePath} alt={project.title} fill className="object-cover" />
              </div>
            ) : (
              <div className="flex w-full items-center justify-center rounded-sm border border-white/[0.08] bg-[#05070A] aspect-video">
                <span className="font-mono text-[9px] tracking-[0.2em] text-white/20">
                  AWAITING_MEDIA
                </span>
              </div>
            )}

            {/* Architecture micro-diagram below the video */}
            {project.solutionCode && (
              <div className="rounded-sm border border-white/[0.06] bg-[#05070A] p-4">
                <span className="mb-3 block font-mono text-[9px] tracking-[0.2em] text-white/20">
                  SYSTEM_TOPOLOGY
                </span>
                <SystemMicroDiagram
                  variant={diagramVariant}
                  className="w-full"
                  style={{ height: "180px" }}
                />
              </div>
            )}
          </div>

          {/* ── RIGHT: Deep Spec Sheet ─────────────────────────────────── */}
          <div className="space-y-10">
            {/* Section A: Impact Metrics */}
            <div className="space-y-4">
              <span className="font-mono text-[9px] tracking-[0.25em] text-white/20">
                SECTION_A {/* BUSINESS_IMPACT */}
              </span>

              <div className="grid grid-cols-2 gap-px bg-white/[0.06]">
                {project.impactMetrics.map((m) => (
                  <div key={m.label} className="bg-[#0E1013] px-5 py-4">
                    <div className="text-2xl font-semibold tracking-tight text-white/90">
                      {m.value}
                    </div>
                    <div className="mt-1 font-mono text-[9px] leading-relaxed tracking-[0.15em] text-white/30">
                      {m.label.toUpperCase().replace(/ /g, "_")}
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-sm leading-relaxed text-white/45">{project.impactNarrative}</p>
            </div>

            {/* Section B: Core Challenge */}
            <div className="space-y-4 border-t border-white/[0.06] pt-8">
              <span className="font-mono text-[9px] tracking-[0.25em] text-white/20">
                SECTION_B {/* CORE_CHALLENGE */}
              </span>
              <p className="text-base leading-relaxed text-white/60">{project.challenge}</p>
            </div>

            {/* Section C: Technical Implementation */}
            {project.solutionCode && (
              <div className="space-y-4 border-t border-white/[0.06] pt-8">
                <span className="font-mono text-[9px] tracking-[0.25em] text-white/20">
                  SECTION_C {/* IMPLEMENTATION_PSEUDOCODE */}
                </span>

                <div className="overflow-hidden rounded-sm border border-white/[0.08]">
                  {/* Code block header bar */}
                  <div className="flex items-center justify-between border-b border-white/[0.08] bg-white/[0.03] px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-red-500/40" />
                      <div className="h-2 w-2 rounded-full bg-yellow-500/40" />
                      <div className="h-2 w-2 rounded-full bg-green-500/40" />
                    </div>
                    <span className="font-mono text-[9px] tracking-[0.2em] text-white/20">
                      NDA_COMPLIANT_PSEUDOCODE
                    </span>
                  </div>

                  {/* Scrollable code area */}
                  <pre className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 max-h-96 overflow-auto bg-[#05070A] p-5 text-[11px] leading-relaxed text-white/60">
                    <code>{project.solutionCode}</code>
                  </pre>
                </div>
              </div>
            )}
            {/* Section D: Applied Systems (cross-link) */}
            {project.appliedSystems && project.appliedSystems.length > 0 && (
              <div className="space-y-4 border-t border-white/[0.06] pt-8">
                <span className="font-mono text-[9px] tracking-[0.25em] text-white/20">
                  SECTION_D {/* APPLIED_SYSTEMS */}
                </span>
                <div className="space-y-2">
                  {project.appliedSystems.map((sys) => (
                    <Link
                      key={sys.href}
                      href={sys.href}
                      className="group flex items-center justify-between border border-white/[0.06] bg-white/[0.02] px-5 py-4 transition-all hover:border-white/20 hover:bg-white/[0.05]"
                    >
                      <div>
                        <span className="mb-1 block font-mono text-[9px] tracking-[0.18em] text-white/20">
                          SYSTEM_REF
                        </span>
                        <span className="text-sm font-medium tracking-tight text-white/70 transition-colors group-hover:text-white/90">
                          {sys.label}
                        </span>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-white/25 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/60" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ── Footer nav ─────────────────────────────────────────────────── */}
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
            {(() => {
              const idx = projects.findIndex((p) => p.id === project.id);
              const prev = projects[idx - 1];
              const next = projects[idx + 1];
              return (
                <>
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
                </>
              );
            })()}
          </div>
        </div>
      </footer>
    </div>
  );
}
