import type { JournalEntry } from "@/lib/journal";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { TRACK_COLORS } from "./ArticleHeader";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface SeriesSummary {
  name: string;
  tracks: string[];            // unique track names, e.g. ["Data", "Infrastructure"]
  totalParts: number;
  firstEntry: JournalEntry;    // part 1 (or first by part order)
  domains: string[];           // union of domains across all parts
}

interface FeaturedShelfProps {
  entries: JournalEntry[];
  series: SeriesSummary[];
}

type ShelfTab = "picks" | "series" | "trending";

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function DomainDot({ domain }: { domain: string }) {
  const colors: Record<string, string> = {
    "AI & Computation": "bg-sky-400",
    "Ecology & Complexity": "bg-emerald-400",
    "Systems & Architecture": "bg-violet-400",
    "Operational Thinking": "bg-amber-400",
    "Process & Organization": "bg-rose-400",
    "Analytics Architecture": "bg-indigo-400",
    "Systems Architecture": "bg-slate-400",
    "Data Engineering": "bg-cyan-400",
    "Data Modeling": "bg-purple-400",
    "Database Engineering": "bg-orange-400",
    "Infrastructure Engineering": "bg-zinc-400",
    "Reliability Engineering": "bg-red-400",
    "Runtime Engineering": "bg-lime-400",
  };
  const color = colors[domain] ?? "bg-neutral-400";
  return <span className={`inline-block h-1.5 w-1.5 rounded-full ${color} shrink-0`} />;
}

function SeriesCard({ s }: { s: SeriesSummary }) {
  return (
    <article className="group relative flex flex-col gap-4 rounded-xl border border-neutral-200 bg-white/70 p-5 transition-all duration-200 hover:border-neutral-300 hover:shadow-sm">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-1.5">
          {s.tracks.map((track) => (
            <span
              key={track}
              className={`rounded border px-1.5 py-0.5 text-[9px] font-semibold tracking-wide ${TRACK_COLORS[track] ?? "text-neutral-500 bg-neutral-50 border-neutral-200"}`}
            >
              {track} Track
            </span>
          ))}
          <span className="ml-auto flex items-center gap-1 text-[10px] text-neutral-400">
            <BookOpen className="h-3 w-3" />
            {s.totalParts} {s.totalParts === 1 ? "part" : "parts"}
          </span>
        </div>

        <h3 className="text-[15px] font-semibold leading-snug tracking-tight text-neutral-900">
          <Link
            href={`/journal/${s.firstEntry.slug}`}
            className="before:absolute before:inset-0"
          >
            {s.name}
          </Link>
        </h3>
      </div>

      {/* Domain dots */}
      {s.domains.length > 0 && (
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {[...new Set(s.domains)].slice(0, 4).map((d) => (
            <span key={d} className="flex items-center gap-1.5 text-[10px] text-neutral-400">
              <DomainDot domain={d} />
              {d}
            </span>
          ))}
        </div>
      )}

      {/* Footer: start reading CTA */}
      <div className="mt-auto flex items-center justify-between border-t border-neutral-100 pt-3">
        <span className="text-[11px] text-neutral-400">
          Start with Part 1
        </span>
        <ArrowRight className="h-3.5 w-3.5 text-neutral-300 transition-all group-hover:translate-x-0.5 group-hover:text-neutral-700" />
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export function FeaturedShelf({ entries, series }: FeaturedShelfProps) {
  const [activeTab, setActiveTab] = useState<ShelfTab>("picks");

  if (entries.length === 0 && series.length === 0) return null;

  const sorted = [...entries].sort((a, b) => a.featuredPriority - b.featuredPriority);
  const hasSeries = series.length > 0;

  const tabs: { id: ShelfTab; label: string }[] = [
    { id: "picks", label: "Editor's Picks" },
    ...(hasSeries ? [{ id: "series" as ShelfTab, label: "Series" }] : []),
    { id: "trending", label: "Trending" },
  ];

  return (
    <section className="mb-16">
      {/* Shelf header with tab switcher */}
      <div className="mb-6 flex items-center gap-6 border-b border-neutral-200 pb-4">
        {tabs.map((tab, i) => (
          <span key={tab.id} className="flex items-center gap-6">
            {i > 0 && <span className="text-neutral-200">|</span>}
            <button
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`font-mono text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors ${
                activeTab === tab.id
                  ? "text-neutral-900"
                  : "text-neutral-400 hover:text-neutral-600"
              }`}
            >
              {tab.label}
              {tab.id === "series" && hasSeries && (
                <span className="ml-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-neutral-900 px-1 text-[8px] font-bold text-white">
                  {series.length}
                </span>
              )}
            </button>
          </span>
        ))}
      </div>

      {/* ── Editor's Picks ─────────────────────────────────────────────── */}
      {activeTab === "picks" && (
        <div className="space-y-0">
          {sorted.map((entry) => (
            <article
              key={entry.slug}
              className="group relative border-b border-neutral-100 py-5 transition-colors last:border-0 hover:bg-black/[0.015]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1 space-y-1">
                  {/* Domain indicators */}
                  <div className="flex flex-wrap items-center gap-2">
                    {entry.domains.slice(0, 2).map((d) => (
                      <span
                        key={d}
                        className="flex items-center gap-1.5 text-[10px] font-medium text-neutral-400"
                      >
                        <DomainDot domain={d} />
                        {d}
                      </span>
                    ))}
                    <span className="ml-auto text-[10px] text-neutral-300">{entry.format}</span>
                  </div>
                  {/* Title */}
                  <h3 className="text-[15px] font-semibold tracking-tight text-neutral-900 leading-snug">
                    <Link
                      href={`/journal/${entry.slug}`}
                      className="before:absolute before:inset-0"
                    >
                      {entry.title}
                    </Link>
                  </h3>
                  {/* Subtitle */}
                  {entry.subtitle && (
                    <p className="line-clamp-1 text-[13px] text-neutral-500">{entry.subtitle}</p>
                  )}
                </div>
                {/* Reading time + arrow */}
                <div className="flex shrink-0 items-center gap-1.5 text-[11px] text-neutral-400 opacity-0 transition-opacity group-hover:opacity-100">
                  <Clock className="h-3 w-3" />
                  {entry.readingTime}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* ── Series ────────────────────────────────────────────────────── */}
      {activeTab === "series" && (
        <div className="grid gap-4 sm:grid-cols-2">
          {series.map((s) => (
            <SeriesCard key={s.name} s={s} />
          ))}
        </div>
      )}

      {/* ── Trending ──────────────────────────────────────────────────── */}
      {activeTab === "trending" && (
        <div className="py-8 text-center">
          <p className="text-[13px] text-neutral-400">
            Trending will surface entries by engagement and views.
          </p>
          <p className="mt-1 text-[12px] text-neutral-300">
            Data source forthcoming.
          </p>
        </div>
      )}
    </section>
  );
}
