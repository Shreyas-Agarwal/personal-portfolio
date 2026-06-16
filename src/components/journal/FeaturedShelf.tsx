import type { JournalEntry } from "@/lib/journal";
import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface FeaturedShelfProps {
  entries: JournalEntry[];
}

type ShelfTab = "picks" | "trending";

function DomainDot({ domain }: { domain: string }) {
  // A subtle colored dot for visual domain identity
  const colors: Record<string, string> = {
    "AI & Computation": "bg-sky-400",
    "Ecology & Complexity": "bg-emerald-400",
    "Systems & Architecture": "bg-violet-400",
    "Operational Thinking": "bg-amber-400",
    "Process & Organization": "bg-rose-400",
  };
  const color = colors[domain] ?? "bg-neutral-400";
  return <span className={`inline-block h-1.5 w-1.5 rounded-full ${color} shrink-0`} />;
}

export function FeaturedShelf({ entries }: FeaturedShelfProps) {
  const [activeTab, setActiveTab] = useState<ShelfTab>("picks");

  if (entries.length === 0) return null;

  const sorted = [...entries].sort((a, b) => a.featuredPriority - b.featuredPriority);

  return (
    <section className="mb-16">
      {/* Shelf header with tab switcher */}
      <div className="mb-6 flex items-center gap-6 border-b border-neutral-200 pb-4">
        <button
          type="button"
          onClick={() => setActiveTab("picks")}
          className={`font-mono text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors ${
            activeTab === "picks"
              ? "text-neutral-900"
              : "text-neutral-400 hover:text-neutral-600"
          }`}
        >
          Editor&apos;s Picks
        </button>
        <span className="text-neutral-200">|</span>
        <button
          type="button"
          onClick={() => setActiveTab("trending")}
          className={`font-mono text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors ${
            activeTab === "trending"
              ? "text-neutral-900"
              : "text-neutral-400 hover:text-neutral-600"
          }`}
        >
          Trending
        </button>
      </div>

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
