"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { plexMono, serif } from "@/lib/fonts";
import { withPublicationQuery } from "@/lib/publication/query";
import type { PublicationArticle } from "@/lib/publication/types";
import { DraftingGrid } from "@/components/ui/DraftingGrid";

// ─────────────────────────────────────────────────────────────────────────────
// Display labels for known publication types — kept in sync with
// PublicationsLibrary's TYPE_LABELS.
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
          ? "border-[#B08D57] bg-[#B08D57]/10 text-[#B08D57]"
          : "border-[#33373B] text-[#A0A5AD] hover:border-[#4A4F55] hover:text-[#ECE5D4]"
      }`}
    >
      <span>{label}</span>
      <span className={active ? "text-[#B08D57]/70" : "text-[#8A8F99]"}>{count}</span>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Article card
// ─────────────────────────────────────────────────────────────────────────────

function ArticleCard({ article }: { article: PublicationArticle }) {
  const breadcrumb = [article.publicationTitle, article.group, article.trackTitle]
    .filter((part, i, arr) => Boolean(part) && arr.indexOf(part) === i)
    .join(" › ");

  return (
    <article className="group relative border border-[#33373B] hover:border-[#B08D57]/40 transition-colors duration-200 rounded-sm p-6 bg-[#24272A]">
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <span
          className={`${plexMono.className} text-[10px] px-2 py-0.5 bg-[#2A2E33] border border-[#3E4349] text-[#B08D57] font-medium uppercase tracking-wider rounded-xs`}
        >
          {typeLabel(article.publicationType)}
        </span>
        <time className={`${plexMono.className} text-[10px] text-[#8A8F99] ml-auto`}>
          {formatDate(article.date)}
        </time>
      </div>

      <p className={`${plexMono.className} text-[11px] text-[#8A8F99] mb-2 truncate`}>
        {breadcrumb}
      </p>

      <h3
        className={`${serif.className} text-xl text-[#ECE5D4] group-hover:text-[#B08D57] transition-colors duration-200 leading-snug font-normal mb-2`}
      >
        <Link
          href={withPublicationQuery(article.url, { readerMode: true })}
          className="after:absolute after:inset-0 focus:outline-none"
        >
          {article.title}
        </Link>
      </h3>

      <div className="flex flex-wrap items-center gap-1.5">
        {article.domains.map((domain) => (
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

interface ArticlesIndexProps {
  articles: PublicationArticle[];
}

export function ArticlesIndex({ articles }: ArticlesIndexProps) {
  const [query, setQuery] = useState("");
  const [activeSeries, setActiveSeries] = useState<string | null>(null);
  const [activeProgram, setActiveProgram] = useState<string | null>(null);

  const seriesList = useMemo(() => {
    const counts = new Map<string, number>();
    for (const a of articles) counts.set(a.publicationTitle, (counts.get(a.publicationTitle) ?? 0) + 1);
    return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, [articles]);

  const programs = useMemo(() => {
    const counts = new Map<string, number>();
    for (const a of articles) {
      const key = a.program ?? UNGROUPED_PROGRAM;
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, [articles]);

  const hasActiveFilters = Boolean(query.trim() || activeSeries || activeProgram);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      if (activeSeries && a.publicationTitle !== activeSeries) return false;
      if (activeProgram && (a.program ?? UNGROUPED_PROGRAM) !== activeProgram) return false;
      if (q) {
        const haystack = [a.title, a.publicationTitle, a.group, a.trackTitle, a.program, ...a.domains]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [articles, query, activeSeries, activeProgram]);

  const groupedBySeries = useMemo(() => {
    const map = new Map<string, PublicationArticle[]>();
    for (const a of filtered) {
      const group = map.get(a.publicationTitle) ?? [];
      group.push(a);
      map.set(a.publicationTitle, group);
    }
    return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [filtered]);

  return (
    <main className="min-h-screen bg-[#1B1D1F] text-[#ECE5D4] relative py-20 px-6 sm:px-12 lg:px-24 overflow-hidden">
      <DraftingGrid />

      <div className="max-w-6xl mx-auto relative z-10 space-y-16">
        {/* ── Header ──────────────────────────────────────────────────────── */}
        <header className="space-y-6 border-b border-[#33373B] pb-12">
          <span
            className={`${plexMono.className} text-xs font-semibold tracking-widest text-[#B08D57] uppercase`}
          >
            INDIVIDUAL ARTICLES
          </span>

          <h1
            className={`${serif.className} text-4xl sm:text-5xl lg:text-6xl font-normal text-[#ECE5D4] leading-[1.1] tracking-tight`}
          >
            Articles
          </h1>

          <p className="text-lg text-[#A0A5AD] max-w-3xl leading-relaxed font-sans font-light">
            Every chapter of every series, on its own — the individual essays that make up the
            multi-part publications, without having to browse a series' full table of contents
            first.
          </p>

          <div className={`${plexMono.className} text-xs text-[#8A8F99] uppercase tracking-wider`}>
            {articles.length} Articles · {seriesList.length} Series
          </div>

          <div className="max-w-xl pt-2">
            <div className="flex items-center gap-3 border border-[#33373B] bg-[#24272A] rounded-sm px-4 py-3 focus-within:border-[#B08D57]/50 transition-colors">
              <span className={`${plexMono.className} text-[#B08D57] text-sm`}>{">"}</span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles — title, series, domain…"
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

        {/* ── Facets ──────────────────────────────────────────────────────── */}
        <section className="space-y-5">
          <div className="space-y-2.5">
            <span
              className={`${plexMono.className} text-[10px] font-semibold tracking-widest text-[#8A8F99] uppercase`}
            >
              Series
            </span>
            <div className="flex flex-wrap gap-2">
              {seriesList.map(([name, count]) => (
                <FacetPill
                  key={name}
                  label={name}
                  count={count}
                  active={activeSeries === name}
                  onClick={() => setActiveSeries(activeSeries === name ? null : name)}
                />
              ))}
            </div>
          </div>

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

          {hasActiveFilters && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActiveSeries(null);
                setActiveProgram(null);
              }}
              className={`${plexMono.className} text-xs text-[#8A8F99] hover:text-[#B08D57] uppercase tracking-wider transition-colors`}
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
              All Articles
            </span>
            <span className={`${plexMono.className} text-xs text-[#8A8F99]`}>
              {filtered.length === 0
                ? "No results"
                : filtered.length === 1
                  ? "1 article"
                  : `${filtered.length} articles`}
            </span>
          </div>

          {filtered.length === 0 ? (
            <p className="text-sm text-[#8A8F99] font-sans">
              Nothing matches those filters. Try clearing them.
            </p>
          ) : hasActiveFilters ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {filtered.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="space-y-12">
              {groupedBySeries.map(([seriesName, items]) => (
                <div key={seriesName} className="space-y-5">
                  <div className="flex items-baseline gap-3">
                    <h3 className={`${serif.className} text-xl text-[#ECE5D4]`}>{seriesName}</h3>
                    <span className={`${plexMono.className} text-[10px] text-[#8A8F99]`}>
                      {items.length} {items.length === 1 ? "article" : "articles"}
                    </span>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    {items.map((article) => (
                      <ArticleCard key={article.id} article={article} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
