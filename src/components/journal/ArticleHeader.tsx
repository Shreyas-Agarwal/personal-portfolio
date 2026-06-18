import type { JournalEntry } from "@/lib/journal";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

// ─────────────────────────────────────────────────────────────────────────────
// Domain colour palette — shared across article components
// ─────────────────────────────────────────────────────────────────────────────

// Track pill colors used in headers and entry rows
export const TRACK_COLORS: Record<string, string> = {
  Data: "text-indigo-600 bg-indigo-50 border-indigo-200",
  Infrastructure: "text-zinc-600 bg-zinc-100 border-zinc-200",
};
export const DOMAIN_CHIP_COLORS: Record<string, string> = {
  // ─────────────────────────────────────────────────────────────────────────
  "AI & Computation": "text-sky-600 bg-sky-50 border-sky-100",
  "Ecology & Complexity": "text-emerald-700 bg-emerald-50 border-emerald-100",
  "Systems & Architecture": "text-violet-600 bg-violet-50 border-violet-100",
  "Operational Thinking": "text-amber-700 bg-amber-50 border-amber-100",
  "Process & Organization": "text-rose-600 bg-rose-50 border-rose-100",
  // ───────────────── Architecture of Information Systems series domains ─────
  "Analytics Architecture": "text-indigo-600 bg-indigo-50 border-indigo-100",
  "Systems Architecture": "text-slate-600 bg-slate-50 border-slate-200",
  "Data Engineering": "text-cyan-700 bg-cyan-50 border-cyan-100",
  "Data Modeling": "text-purple-600 bg-purple-50 border-purple-100",
  "Database Engineering": "text-orange-600 bg-orange-50 border-orange-100",
  "Infrastructure Engineering": "text-zinc-600 bg-zinc-50 border-zinc-200",
  "Reliability Engineering": "text-red-600 bg-red-50 border-red-100",
  "Runtime Engineering": "text-lime-700 bg-lime-50 border-lime-100",
};

export const DOMAIN_TEXT_COLORS: Record<string, string> = {
  // ─────────────────────────────────────────────────────────────────────────
  "AI & Computation": "text-sky-600",
  "Ecology & Complexity": "text-emerald-700",
  "Systems & Architecture": "text-violet-600",
  "Operational Thinking": "text-amber-700",
  "Process & Organization": "text-rose-600",
  // ───────────────── Architecture of Information Systems series domains ─────
  "Analytics Architecture": "text-indigo-600",
  "Systems Architecture": "text-slate-600",
  "Data Engineering": "text-cyan-700",
  "Data Modeling": "text-purple-600",
  "Database Engineering": "text-orange-600",
  "Infrastructure Engineering": "text-zinc-600",
  "Reliability Engineering": "text-red-600",
  "Runtime Engineering": "text-lime-700",
};

const DEFAULT_CHIP_COLOR = "text-neutral-600 bg-neutral-100 border-neutral-200";

// ─────────────────────────────────────────────────────────────────────────────
// Date helpers
// ─────────────────────────────────────────────────────────────────────────────

function formatDate(iso: string, style: "short" | "long" = "short"): string {
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: style === "long" ? "long" : "short",
      year: "numeric",
    }).format(d);
  } catch {
    return iso;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

interface ArticleHeaderProps {
  entry: JournalEntry;
  readingTime: string;
}

export function ArticleHeader({ entry, readingTime }: ArticleHeaderProps) {
  const publishedLabel = entry.published
    ? formatDate(entry.published)
    : entry.year;

  const updatedLabel = entry.updated ? formatDate(entry.updated) : null;

  return (
    <header className="border-b border-neutral-200 bg-white/50 backdrop-blur-md">
      <div className="mx-auto max-w-[1400px] px-6 pb-5 pt-4 md:px-12">
        {/* ── Breadcrumb / Back link ───────────────────────────────────── */}
        <Link
          href="/journal"
          className="group mb-3 inline-flex items-center gap-1.5 text-[11px] font-medium text-neutral-400 transition-colors hover:text-neutral-900"
        >
          <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
          Journal
        </Link>

        {/* ── Domain chips + Format + Series ─────────────────────────── */}
        <div className="mb-2 flex flex-wrap items-center gap-2">
          {entry.domains.map((d) => (
            <span
              key={d}
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-wide ${DOMAIN_CHIP_COLORS[d] ?? DEFAULT_CHIP_COLOR}`}
            >
              {d}
            </span>
          ))}
          <span className="text-[10px] font-medium uppercase tracking-widest text-neutral-400">
            {entry.format}
          </span>
          {entry.series && (
            <span className="flex items-center gap-1.5 text-[10px] text-neutral-400">
              <span>↳ {entry.series}</span>
              {entry.track && (
                <span
                  className={`rounded border px-1.5 py-0.5 text-[9px] font-semibold tracking-wide ${TRACK_COLORS[entry.track] ?? "text-neutral-500 bg-neutral-50 border-neutral-200"}`}
                >
                  {entry.track}{entry.part != null ? ` · Part ${entry.part}` : ""}
                </span>
              )}
            </span>
          )}
        </div>

        {/* ── Title (canonical H1 — not repeated in article body TOC) ─── */}
        <h1 className="mb-2 text-[28px] font-semibold leading-tight tracking-tight text-black md:text-4xl">
          {entry.title}
        </h1>

        {/* ── Subtitle ─────────────────────────────────────────────────── */}
        {entry.subtitle && (
          <p className="mb-2 max-w-3xl text-[15px] leading-relaxed text-neutral-500 md:text-base">
            {entry.subtitle}
          </p>
        )}

        {/* ── Abstract (if present) ────────────────────────────────────── */}
        {entry.abstract && (
          <div className="mb-4 border-l-2 border-neutral-200 pl-4">
            <p className="max-w-2xl text-[13px] italic leading-relaxed text-neutral-500">
              {entry.abstract}
            </p>
          </div>
        )}

        {/* ── Compact metadata row ─────────────────────────────────────── */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-[11px] text-neutral-400">
          <span>{readingTime}</span>

          <span className="text-neutral-200">·</span>
          <span>{publishedLabel}</span>

          {updatedLabel && (
            <>
              <span className="text-neutral-200">·</span>
              <span>Updated {updatedLabel}</span>
            </>
          )}

          {entry.github && (
            <>
              <span className="text-neutral-200">·</span>
              <a
                href={entry.github}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-neutral-900"
              >
                GitHub ↗
              </a>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
