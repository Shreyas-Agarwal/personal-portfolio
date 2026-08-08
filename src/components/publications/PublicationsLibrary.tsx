"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { plexMono, serif } from "@/lib/fonts";
import type { PublicationManifest } from "@/lib/publication/types";
import { DraftingGrid } from "@/components/ui/DraftingGrid";

// ─────────────────────────────────────────────────────────────────────────────
// Display labels for known publication types. Anything unlisted falls back
// to a de-hyphenated version of the raw type string.
// ─────────────────────────────────────────────────────────────────────────────

const TYPE_LABELS: Record<string, string> = {
  "case-study": "Case Study",
  research: "Research",
  "adr-collection": "ADR Collection",
  essay: "Essay",
  "white-paper": "White Paper",
  "architecture-notes": "Architecture Notes",
  "architecture-note": "Architecture Note",
  "design-review": "Design Review",
  rfc: "RFC",
  "research-series": "Research Series",
  "research-note": "Research Note",
};

function typeLabel(type: string): string {
  return TYPE_LABELS[type] ?? type.replace(/-/g, " ");
}

const UNGROUPED_PROGRAM = "Unaffiliated";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatYearMonth(iso: string): { year: string; month: string } {
  const d = new Date(iso);
  return {
    year: String(d.getFullYear()),
    month: d.toLocaleDateString("en-GB", { month: "long" }),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Facet pill
// ─────────────────────────────────────────────────────────────────────────────

function FacetPill({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${plexMono.className} flex items-center gap-2 rounded-xs border px-3 py-1.5 text-xs uppercase tracking-wider transition-colors ${
        active
          ? "border-[#DE4B31] bg-[#DE4B31]/10 text-[#DE4B31]"
          : "border-[#33373B] text-[#A0A5AD] hover:border-[#4A4F55] hover:text-[#ECE5D4]"
      }`}
    >
      <span>{label}</span>
      <span className={active ? "text-[#DE4B31]/70" : "text-[#8A8F99]"}>{count}</span>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Catalogue card
// ─────────────────────────────────────────────────────────────────────────────

function PublicationCard({ pub }: { pub: PublicationManifest }) {
  return (
    <article className="group relative border border-[#33373B] hover:border-[#DE4B31]/40 transition-colors duration-200 rounded-sm p-6 bg-[#24272A]">
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <span
          className={`${plexMono.className} text-[10px] px-2 py-0.5 bg-[#2A2E33] border border-[#3E4349] text-[#DE4B31] font-medium uppercase tracking-wider rounded-xs`}
        >
          {typeLabel(pub.type)}
        </span>
        {pub.program && (
          <span className={`${plexMono.className} text-[10px] text-[#8A8F99] uppercase tracking-wider`}>
            {pub.program}
          </span>
        )}
        <time className={`${plexMono.className} text-[10px] text-[#8A8F99] ml-auto`}>
          {formatDate(pub.date)}
        </time>
      </div>

      <h3
        className={`${serif.className} text-xl text-[#ECE5D4] group-hover:text-[#DE4B31] transition-colors duration-200 leading-snug font-normal mb-2`}
      >
        <Link
          href={`/works/publications/${pub.id}`}
          className="after:absolute after:inset-0 focus:outline-none"
        >
          {pub.title}
        </Link>
      </h3>

      {pub.subtitle && (
        <p className="text-sm text-[#A0A5AD] italic font-sans font-light leading-relaxed mb-3">
          {pub.subtitle}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-1.5">
        {(pub.domains || []).map((domain) => (
          <span
            key={domain}
            className={`${plexMono.className} text-[10px] px-2 py-0.5 bg-[#1B1D1F] border border-[#33373B] text-[#8A8F99] rounded-xs`}
          >
            {domain}
          </span>
        ))}
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

interface PublicationsLibraryProps {
  publications: PublicationManifest[];
}

export function PublicationsLibrary({ publications }: PublicationsLibraryProps) {
  const [query, setQuery] = useState("");
  const [activeProgram, setActiveProgram] = useState<string | null>(null);
  const [activeType, setActiveType] = useState<string | null>(null);

  const programs = useMemo(() => {
    const counts = new Map<string, number>();
    for (const pub of publications) {
      const key = pub.program ?? UNGROUPED_PROGRAM;
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, [publications]);

  const types = useMemo(() => {
    const counts = new Map<string, number>();
    for (const pub of publications) {
      counts.set(pub.type, (counts.get(pub.type) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, [publications]);

  const yearRange = useMemo(() => {
    const years = publications.map((p) => new Date(p.date).getFullYear());
    const min = Math.min(...years);
    const max = Math.max(...years);
    return min === max ? String(min) : `${min}–${max}`;
  }, [publications]);

  const hasActiveFilters = Boolean(query.trim() || activeProgram || activeType);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return publications.filter((pub) => {
      if (activeProgram && (pub.program ?? UNGROUPED_PROGRAM) !== activeProgram) return false;
      if (activeType && pub.type !== activeType) return false;
      if (q) {
        const haystack = [pub.title, pub.subtitle, pub.abstract, pub.program, ...(pub.domains ?? [])]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [publications, query, activeProgram, activeType]);

  const featured = publications[0];

  const groupedByProgram = useMemo(() => {
    const map = new Map<string, PublicationManifest[]>();
    for (const pub of filtered) {
      const key = pub.program ?? UNGROUPED_PROGRAM;
      const group = map.get(key) ?? [];
      group.push(pub);
      map.set(key, group);
    }
    return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [filtered]);

  const timelineGroups = useMemo(() => {
    const map = new Map<string, { month: string; pub: PublicationManifest }[]>();
    for (const pub of publications) {
      const { year, month } = formatYearMonth(pub.date);
      const group = map.get(year) ?? [];
      group.push({ month, pub });
      map.set(year, group);
    }
    return [...map.entries()].sort((a, b) => b[0].localeCompare(a[0]));
  }, [publications]);

  return (
    <main className="min-h-screen bg-[#1B1D1F] text-[#ECE5D4] relative py-20 px-6 sm:px-12 lg:px-24 overflow-hidden">
      <DraftingGrid />

      <div className="max-w-6xl mx-auto relative z-10 space-y-16">
        {/* ── Header ──────────────────────────────────────────────────────── */}
        <header className="space-y-6 border-b border-[#33373B] pb-12">
          <span
            className={`${plexMono.className} text-xs font-semibold tracking-widest text-[#DE4B31] uppercase`}
          >
            ENGINEERING LIBRARY
          </span>

          <h1
            className={`${serif.className} text-4xl sm:text-5xl lg:text-6xl font-normal text-[#ECE5D4] leading-[1.1] tracking-tight`}
          >
            Publications
          </h1>

          <p className="text-lg text-[#A0A5AD] max-w-3xl leading-relaxed font-sans font-light">
            Case studies, architecture notes, and research on data systems, local-first computing,
            and information architecture.
          </p>

          <div
            className={`${plexMono.className} text-xs text-[#8A8F99] uppercase tracking-wider`}
          >
            {publications.length} Publications · {programs.length} Research Programs · {yearRange}
          </div>

          <div className="max-w-xl pt-2">
            <div className="flex items-center gap-3 border border-[#33373B] bg-[#24272A] rounded-sm px-4 py-3 focus-within:border-[#DE4B31]/50 transition-colors">
              <span className={`${plexMono.className} text-[#DE4B31] text-sm`}>{">"}</span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the library — title, domain, program…"
                className={`${plexMono.className} flex-1 bg-transparent text-sm text-[#ECE5D4] placeholder:text-[#8A8F99] outline-none`}
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="text-[#8A8F99] hover:text-[#ECE5D4] text-xs"
                >
                  clear
                </button>
              )}
            </div>
          </div>
        </header>

        {/* ── Featured Publication ───────────────────────────────────────── */}
        {!hasActiveFilters && featured && (
          <section className="space-y-4">
            <span
              className={`${plexMono.className} text-xs font-semibold tracking-widest text-[#8A8F99] uppercase`}
            >
              Current Reading
            </span>
            <article className="relative border border-[#DE4B31]/30 bg-gradient-to-br from-[#24272A] to-[#1F2225] rounded-sm p-8 sm:p-10">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span
                  className={`${plexMono.className} text-[10px] px-2 py-0.5 bg-[#2A2E33] border border-[#3E4349] text-[#DE4B31] font-medium uppercase tracking-wider rounded-xs`}
                >
                  {typeLabel(featured.type)}
                </span>
                {featured.program && (
                  <span
                    className={`${plexMono.className} text-[10px] text-[#8A8F99] uppercase tracking-wider`}
                  >
                    {featured.program}
                  </span>
                )}
                <time className={`${plexMono.className} text-[10px] text-[#8A8F99] ml-auto`}>
                  {formatDate(featured.date)}
                </time>
              </div>
              <h2
                className={`${serif.className} text-2xl sm:text-3xl text-[#ECE5D4] leading-snug font-normal mb-3`}
              >
                <Link href={`/works/publications/${featured.id}`} className="hover:text-[#DE4B31] transition-colors">
                  {featured.title}
                </Link>
              </h2>
              {featured.abstract && (
                <p className="text-base text-[#A0A5AD] leading-relaxed font-sans font-light max-w-3xl mb-5">
                  {featured.abstract}
                </p>
              )}
              <Link
                href={`/works/publications/${featured.id}`}
                className={`${plexMono.className} inline-flex items-center gap-1.5 text-xs text-[#DE4B31] font-medium uppercase tracking-wider hover:gap-2.5 transition-all`}
              >
                Read Publication <span>→</span>
              </Link>
            </article>
          </section>
        )}

        {/* ── Facets ──────────────────────────────────────────────────────── */}
        <section className="space-y-5">
          <div className="space-y-2.5">
            <span
              className={`${plexMono.className} text-[10px] font-semibold tracking-widest text-[#8A8F99] uppercase`}
            >
              Research Programs
            </span>
            <div className="flex flex-wrap gap-2">
              {programs.map(([name, count]) => (
                <FacetPill
                  key={name}
                  label={name}
                  count={count}
                  active={activeProgram === name}
                  onClick={() => setActiveProgram(activeProgram === name ? null : name)}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2.5">
            <span
              className={`${plexMono.className} text-[10px] font-semibold tracking-widest text-[#8A8F99] uppercase`}
            >
              Document Type
            </span>
            <div className="flex flex-wrap gap-2">
              {types.map(([type, count]) => (
                <FacetPill
                  key={type}
                  label={typeLabel(type)}
                  count={count}
                  active={activeType === type}
                  onClick={() => setActiveType(activeType === type ? null : type)}
                />
              ))}
            </div>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActiveProgram(null);
                setActiveType(null);
              }}
              className={`${plexMono.className} text-xs text-[#8A8F99] hover:text-[#DE4B31] uppercase tracking-wider transition-colors`}
            >
              × Clear filters
            </button>
          )}
        </section>

        {/* ── Catalogue ───────────────────────────────────────────────────── */}
        <section className="space-y-10">
          <div className="flex items-baseline justify-between border-b border-[#33373B] pb-4">
            <span
              className={`${plexMono.className} text-xs font-semibold tracking-widest text-[#8A8F99] uppercase`}
            >
              Catalogue
            </span>
            <span className={`${plexMono.className} text-xs text-[#8A8F99]`}>
              {filtered.length === 0
                ? "No results"
                : filtered.length === 1
                  ? "1 publication"
                  : `${filtered.length} publications`}
            </span>
          </div>

          {filtered.length === 0 ? (
            <p className="text-sm text-[#8A8F99] font-sans">
              Nothing matches those filters. Try clearing them.
            </p>
          ) : hasActiveFilters ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {filtered
                .slice()
                .sort((a, b) => (a.date > b.date ? -1 : 1))
                .map((pub) => (
                  <PublicationCard key={pub.id} pub={pub} />
                ))}
            </div>
          ) : (
            <div className="space-y-12">
              {groupedByProgram.map(([programName, pubs]) => (
                <div key={programName} className="space-y-5">
                  <div className="flex items-baseline gap-3">
                    <h3 className={`${serif.className} text-xl text-[#ECE5D4]`}>{programName}</h3>
                    <span className={`${plexMono.className} text-[10px] text-[#8A8F99]`}>
                      {pubs.length} {pubs.length === 1 ? "publication" : "publications"}
                    </span>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    {pubs
                      .slice()
                      .sort((a, b) => (a.date > b.date ? -1 : 1))
                      .map((pub) => (
                        <PublicationCard key={pub.id} pub={pub} />
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── Timeline ────────────────────────────────────────────────────── */}
        {!hasActiveFilters && (
          <section className="space-y-8 border-t border-[#33373B] pt-12">
            <span
              className={`${plexMono.className} text-xs font-semibold tracking-widest text-[#8A8F99] uppercase`}
            >
              Timeline
            </span>
            <div className="space-y-8">
              {timelineGroups.map(([year, entries]) => (
                <div key={year} className="flex gap-8">
                  <div className={`${serif.className} text-2xl text-[#ECE5D4]/50 w-16 shrink-0`}>
                    {year}
                  </div>
                  <div className="flex-1 space-y-3 border-l border-[#33373B] pl-6">
                    {entries.map(({ month, pub }) => (
                      <div key={pub.id} className="flex items-baseline gap-3">
                        <span
                          className={`${plexMono.className} text-[10px] text-[#8A8F99] uppercase w-16 shrink-0`}
                        >
                          {month}
                        </span>
                        <Link
                          href={`/works/publications/${pub.id}`}
                          className="text-sm text-[#A0A5AD] hover:text-[#DE4B31] transition-colors font-sans"
                        >
                          {pub.title}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
