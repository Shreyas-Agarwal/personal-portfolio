import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { flagshipSystem } from "@/data/homepage-v2/systems";
import { AnnotatedTerm } from "../../ui/AnnotatedTerm";
import { FlowDiagram } from "./FlowDiagram";
import { inter, plexMono, serif } from "@/lib/fonts";
import { RedPenMargin } from "../../ui/RedPenMargin";
import { RedPenNote } from "../../ui/RedPenNote";
import { RevisionLog } from "./RevisionLog";

const LAB_NOTES: Record<string, string> = {
  "Go Event Lab":
    "Research lab. Understanding event systems before building production systems.",
};

const STACK_NOTES: Record<string, string> = {
  DuckDB: "Used because moving less data is often more valuable than computing faster.",
};

/**
 * Transit Intelligence gets its own short chapter within the desk surface:
 * problem framing before the system itself, three labs each with context,
 * one flow diagram, and the metadata block kept fully precise underneath.
 * Heaviest artifact on the page alongside the masthead.
 */
export function TransitIntelligenceFeature() {
  const system = flagshipSystem;
  if (!system) return null;

  return (
    <section data-header-theme="dark" className="relative bg-[#1B1D1F] px-6 py-24 md:px-12">
      <div className="mx-auto max-w-5xl">
        <span className={`${plexMono.className} mb-8 block text-[10px] tracking-[0.22em] text-[#E6E1D6]/25`}>
          FEATURED_SYSTEM
        </span>

        <h3 className={`${plexMono.className} mb-10 text-3xl tracking-tight text-[#E6E1D6]/95 md:text-4xl`}>
          {system.name}
        </h3>

        {system.problem && (
          <p className={`${serif.className} mb-8 max-w-2xl text-lg leading-relaxed text-[#E6E1D6]/90`}>
            {system.problem}
          </p>
        )}

        {system.abstract && (
          <p className={`${serif.className} mb-6 max-w-2xl text-[15px] leading-relaxed text-[#E6E1D6]/75`}>
            {system.abstract}
          </p>
        )}

        <p className={`${serif.className} mb-10 max-w-2xl text-[15px] leading-relaxed text-[#E6E1D6]/75`}>
          The live feed and the lakehouse{" "}
          <RedPenNote
            type="Architectural tension"
            note="Freshness vs. depth: the lakehouse always lags the live feed by design, so drift patterns stay traceable over months instead of only visible today."
          >
            disagree by design
          </RedPenNote>
          .
        </p>

        {/* The three labs, each with a line of context rather than just named */}
        {system.labs && (
          <div className="mb-10 space-y-6">
            {system.labs.map((lab) => (
              <div key={lab.name}>
                <h4 className={`${plexMono.className} mb-1.5 text-sm tracking-tight text-[#E6E1D6]/90`}>
                  {LAB_NOTES[lab.name] ? (
                    <AnnotatedTerm note={LAB_NOTES[lab.name]}>{lab.name}</AnnotatedTerm>
                  ) : (
                    lab.name
                  )}
                </h4>
                <p className={`${serif.className} max-w-xl text-sm leading-relaxed text-[#E6E1D6]/60`}>
                  {lab.context}
                  {lab.name === "Lakehouse Engineering Lab" && (
                    <>
                      {" "}
                      Replay tooling for backfilled drift analysis is still manual.{" "}
                      <RedPenMargin type="Todo" />
                    </>
                  )}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* One flow diagram — the memorable artifact for this viewport */}
        {system.diagram && (
          <div className="mb-10">
            <FlowDiagram
              steps={system.diagram.map((label, i, all) => ({
                label,
                shape: i === 0 ? "square" : i === all.length - 1 ? "diamond" : "circle",
              }))}
            />
          </div>
        )}

        {/* Precise, complete metadata — never compressed into vague language */}
        <div className="border-t border-[#E6E1D6]/[0.08] pt-8">
          {system.contains && (
            <div className="mb-6">
              <span className={`${plexMono.className} mb-3 block text-[9px] uppercase tracking-[0.18em] text-[#E6E1D6]/25`}>
                Contains
              </span>
              <div className={`${plexMono.className} flex flex-wrap gap-x-6 gap-y-2`}>
                {system.contains.map((item) => (
                  <span key={item} className="text-[13px] text-[#E6E1D6]/75">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mb-6">
            <span className={`${plexMono.className} mb-3 block text-[9px] uppercase tracking-[0.18em] text-[#E6E1D6]/25`}>
              Domains
            </span>
            <div className={`${plexMono.className} flex flex-wrap gap-x-6 gap-y-2`}>
              {system.domains.map((domain) => (
                <span key={domain} className="text-[13px] text-[#E6E1D6]/75">
                  {domain}
                </span>
              ))}
            </div>
          </div>

          <div className={`${plexMono.className} mb-8 flex flex-wrap items-center gap-3`}>
            {system.stack.map((tech) =>
              STACK_NOTES[tech] ? (
                <AnnotatedTerm key={tech} note={STACK_NOTES[tech]}>
                  <span className="text-[9px] uppercase tracking-[0.14em] text-[#E6E1D6]/35">
                    {tech}
                  </span>
                </AnnotatedTerm>
              ) : (
                <span key={tech} className="text-[9px] uppercase tracking-[0.14em] text-[#E6E1D6]/35">
                  {tech}
                </span>
              ),
            )}
          </div>

          <div className="flex flex-wrap items-end justify-between gap-4">
            <RevisionLog
              entries={[
                { n: 2, date: system.lastUpdated, description: system.status },
                { n: 1, date: system.started, description: "Started" },
              ]}
            />
            <Link
              href={system.href}
              className={`${inter.className} group inline-flex items-center gap-2 text-sm font-medium text-[#E6E1D6]/60 transition-colors hover:text-[#E6E1D6]`}
            >
              Read documentation
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
