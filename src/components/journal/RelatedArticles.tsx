import type { JournalEntry } from "@/lib/journal";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { DOMAIN_TEXT_COLORS } from "./ArticleHeader";

interface RelatedArticlesProps {
  entries: JournalEntry[];
}

export function RelatedArticles({ entries }: RelatedArticlesProps) {
  if (entries.length === 0) return null;

  return (
    <section className="mt-20 border-t border-neutral-200 pt-12">
      <h2 className="mb-8 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
        Continue Exploring
      </h2>

      <div className="space-y-0">
        {entries.map((entry) => (
          <article
            key={entry.slug}
            className="group relative border-b border-neutral-100 py-6 transition-colors last:border-0 hover:bg-black/[0.015]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1 space-y-1.5">
                {/* Domain + format */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5">
                  {entry.domains.slice(0, 2).map((d) => (
                    <span
                      key={d}
                      className={`text-[10px] font-medium ${DOMAIN_TEXT_COLORS[d] ?? "text-neutral-500"}`}
                    >
                      {d}
                    </span>
                  ))}
                  <span className="text-[10px] uppercase tracking-widest text-neutral-300">
                    {entry.format}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-[15px] font-semibold leading-snug tracking-tight text-neutral-900">
                  <Link
                    href={`/journal/${entry.slug}`}
                    className="before:absolute before:inset-0"
                  >
                    {entry.title}
                  </Link>
                </h3>

                {/* Subtitle */}
                {entry.subtitle && (
                  <p className="line-clamp-1 text-[13px] text-neutral-500">
                    {entry.subtitle}
                  </p>
                )}
              </div>

              <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-neutral-300 transition-all group-hover:translate-x-0.5 group-hover:text-neutral-600" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
