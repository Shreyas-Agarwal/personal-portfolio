import type { JournalEntry } from "@/lib/journal";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

// ─────────────────────────────────────────────────────────────────────────────
// Domain colour palette — shared across article components
// ─────────────────────────────────────────────────────────────────────────────

export const DOMAIN_CHIP_COLORS: Record<string, string> = {
  "AI & Computation": "text-sky-600 bg-sky-50 border-sky-100",
  "Ecology & Complexity": "text-emerald-700 bg-emerald-50 border-emerald-100",
  "Systems & Architecture": "text-violet-600 bg-violet-50 border-violet-100",
  "Operational Thinking": "text-amber-700 bg-amber-50 border-amber-100",
  "Process & Organization": "text-rose-600 bg-rose-50 border-rose-100",
};

export const DOMAIN_TEXT_COLORS: Record<string, string> = {
  "AI & Computation": "text-sky-600",
  "Ecology & Complexity": "text-emerald-700",
  "Systems & Architecture": "text-violet-600",
  "Operational Thinking": "text-amber-700",
  "Process & Organization": "text-rose-600",
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
      <div className="mx-auto max-w-[1400px] px-6 pb-8 pt-6 md:px-12">
        {/* ── Breadcrumb / Back link ───────────────────────────────────── */}
        <Link
          href="/journal"
          className="group mb-5 inline-flex items-center gap-1.5 text-[11px] font-medium text-neutral-400 transition-colors hover:text-neutral-900"
        >
          <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
          Journal
        </Link>

        {/* ── Domain chips + Format + Series ─────────────────────────── */}
        <div className="mb-3 flex flex-wrap items-center gap-2">
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
            <span className="text-[10px] text-neutral-300">
              ↳ {entry.series}
            </span>
          )}
        </div>

        {/* ── Title (canonical H1 — not repeated in article body TOC) ─── */}
        <h1 className="mb-2 text-[28px] font-semibold leading-tight tracking-tight text-black md:text-4xl">
          {entry.title}
        </h1>

        {/* ── Subtitle ─────────────────────────────────────────────────── */}
        {entry.subtitle && (
          <p className="mb-3 max-w-3xl text-[15px] leading-relaxed text-neutral-500 md:text-base">
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
