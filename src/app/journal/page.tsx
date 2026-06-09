import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { ArrowRight, Clock, Tag } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Public writing on systems, architecture, AI, ecology, and operational thinking. Essays, observations, and research commentary.",
  openGraph: {
    title: "Journal | Shreyas Agarwal",
    description:
      "Essays, industry observations, architectural discussions, and long-form thinking on systems, AI, and complexity.",
  },
};

interface JournalEntry {
  slug: string;
  title: string;
  subtitle?: string;
  category?: string;
  year?: string;
  tags?: string[];
}

function getJournalEntries(): JournalEntry[] {
  const journalDirectory = path.join(process.cwd(), "content/journal");
  if (!fs.existsSync(journalDirectory)) return [];

  const filenames = fs.readdirSync(journalDirectory);
  const entries = filenames
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => {
      const filePath = path.join(journalDirectory, filename);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContent);

      return {
        slug: filename.replace(/\.md$/, ""),
        title: data.title || filename.replace(/\.md$/, ""),
        subtitle: data.subtitle,
        category: data.category,
        year: data.year,
        tags: data.tags,
      };
    })
    .sort((a, b) => {
      // Sort by year descending, then alphabetically
      if (b.year && a.year && b.year !== a.year) {
        return b.year.localeCompare(a.year);
      }
      return a.title.localeCompare(b.title);
    });

  return entries;
}

export default function JournalIndexPage() {
  const entries = getJournalEntries();

  return (
    <div
      data-header-theme="light"
      className="min-h-screen bg-[#F3F1EC] text-[#1a1a1a] selection:bg-black/10"
    >
      {/* Journal Header */}
      <header className="border-b border-neutral-200 bg-white/50 backdrop-blur-md">
        <div className="mx-auto max-w-4xl px-6 py-24 md:px-12">
          <div className="space-y-6">
            <div className="space-y-4">
              <span className="block font-mono text-[10px] tracking-[0.25em] text-neutral-400 uppercase">
                PUBLIC_WRITING
              </span>
              <h1 className="text-4xl font-semibold tracking-tight text-black md:text-5xl lg:text-6xl">
                Journal
              </h1>
              <p className="max-w-2xl text-xl leading-relaxed text-neutral-600">
                Essays, observations, and long-form thinking on systems,
                architecture, AI, and operational complexity.
              </p>
            </div>
            <div className="flex items-center gap-6 pt-2">
              <span className="font-mono text-[10px] tracking-[0.2em] text-neutral-400">
                {entries.length} ENTRIES
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Journal List */}
      <main className="mx-auto max-w-4xl px-6 py-24 md:px-12">
        <div className="space-y-0">
          {entries.map((entry) => (
            <article
              key={entry.slug}
              className="group relative flex flex-col items-start justify-between border-b border-neutral-200 py-12 transition-colors hover:bg-black/[0.01] md:flex-row md:items-center"
            >
              <div className="flex-1 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  {entry.category && (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                      {entry.category}
                    </span>
                  )}
                  {entry.year && (
                    <span className="flex items-center gap-1.5 text-[11px] font-medium text-neutral-400">
                      <Clock className="h-3 w-3" />
                      {entry.year}
                    </span>
                  )}
                </div>

                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-black">
                    <Link
                      href={`/journal/${entry.slug}`}
                      className="before:absolute before:inset-0"
                    >
                      {entry.title}
                    </Link>
                  </h2>
                  {entry.subtitle && (
                    <p className="mt-2 text-base text-neutral-600 line-clamp-2 max-w-2xl">
                      {entry.subtitle}
                    </p>
                  )}
                </div>

                {entry.tags && entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {entry.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1 text-[11px] font-medium text-neutral-400"
                      >
                        <Tag className="h-3 w-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6 flex shrink-0 items-center gap-2 text-sm font-medium text-black opacity-0 transition-opacity group-hover:opacity-100 md:mt-0 md:ml-12">
                Read
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </article>
          ))}

          {entries.length === 0 && (
            <div className="py-24 text-center">
              <p className="text-neutral-400">No journal entries yet.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
