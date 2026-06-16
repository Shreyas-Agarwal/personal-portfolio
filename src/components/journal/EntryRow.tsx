import type { JournalEntry } from "@/lib/journal";
import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";

interface EntryRowProps {
  entry: JournalEntry;
}

// Color assignments for domain labels
const DOMAIN_COLORS: Record<string, string> = {
  "AI & Computation": "text-sky-600 bg-sky-50 border-sky-100",
  "Ecology & Complexity": "text-emerald-700 bg-emerald-50 border-emerald-100",
  "Systems & Architecture": "text-violet-600 bg-violet-50 border-violet-100",
  "Operational Thinking": "text-amber-700 bg-amber-50 border-amber-100",
  "Process & Organization": "text-rose-600 bg-rose-50 border-rose-100",
};

const DEFAULT_DOMAIN_COLOR = "text-neutral-600 bg-neutral-100 border-neutral-200";

export function EntryRow({ entry }: EntryRowProps) {
  return (
    <article className="group relative border-b border-neutral-200 py-10 transition-colors hover:bg-black/[0.015] last:border-0">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        {/* Left content area */}
        <div className="min-w-0 flex-1 space-y-3">
          {/* Meta row: domains + format + year */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Domains */}
            {entry.domains.map((d) => (
              <span
                key={d}
                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-wide ${DOMAIN_COLORS[d] ?? DEFAULT_DOMAIN_COLOR}`}
              >
                {d}
              </span>
            ))}

            {/* Format */}
            <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-widest">
              {entry.format}
            </span>

            {/* Series badge */}
            {entry.series && (
              <span className="text-[10px] text-neutral-300">
                ↳ {entry.series}
              </span>
            )}

            {/* Year — visually muted, pushed right on larger screens */}
            <span className="ml-auto text-[11px] text-neutral-300 tabular-nums">
              {entry.year}
            </span>
          </div>

          {/* Title */}
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-neutral-900 leading-snug md:text-2xl">
              <Link
                href={`/journal/${entry.slug}`}
                className="before:absolute before:inset-0"
              >
                {entry.title}
              </Link>
            </h2>
            {entry.subtitle && (
              <p className="mt-1.5 line-clamp-2 max-w-2xl text-[15px] leading-relaxed text-neutral-500">
                {entry.subtitle}
              </p>
            )}
          </div>

          {/* Tags */}
          {entry.tags.length > 0 && (
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {entry.tags.slice(0, 5).map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] text-neutral-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Right CTA: reading time + arrow */}
        <div className="flex shrink-0 items-center gap-2 text-[12px] font-medium text-neutral-500 opacity-0 transition-all duration-200 group-hover:opacity-100 md:mt-1 md:ml-12">
          <Clock className="h-3.5 w-3.5" />
          {entry.readingTime}
          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </article>
  );
}
