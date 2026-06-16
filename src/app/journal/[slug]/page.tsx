import fs from "node:fs";
import path from "node:path";
import { ArticleBody } from "@/components/journal/ArticleBody";
import { ArticleFooterNav } from "@/components/journal/ArticleFooterNav";
import { ArticleHeader } from "@/components/journal/ArticleHeader";
import { ArticleMetaRail } from "@/components/journal/ArticleMetaRail";
import { GiscusSection } from "@/components/journal/GiscusSection";
import { RelatedArticles } from "@/components/journal/RelatedArticles";
import { TableOfContents } from "@/components/journal/TableOfContents";
import { getJournalEntries, type JournalEntry } from "@/lib/journal";
import { getRelatedEntries } from "@/lib/related";
import { parseTocHeadings } from "@/lib/toc";
import matter from "gray-matter";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const JOURNAL_DIR = path.join(process.cwd(), "content/journal");
const WORDS_PER_MINUTE = 238;

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function computeReadingTime(content: string): string {
  const wordCount = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
  return `${minutes} min read`;
}

function resolveFilePath(slug: string): string | null {
  // Try exact slug match first, then fall back to scanning for a frontmatter slug match
  const direct = path.join(JOURNAL_DIR, `${slug}.md`);
  if (fs.existsSync(direct)) return direct;

  // Scan for a file with matching frontmatter slug field
  if (!fs.existsSync(JOURNAL_DIR)) return null;
  for (const file of fs.readdirSync(JOURNAL_DIR)) {
    if (!file.endsWith(".md")) continue;
    const fp = path.join(JOURNAL_DIR, file);
    const { data } = matter(fs.readFileSync(fp, "utf8"));
    if (data.slug === slug) return fp;
  }
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Metadata
// ─────────────────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const filePath = resolveFilePath(slug);
  if (!filePath) return { title: "Not Found" };

  const { data } = matter(fs.readFileSync(filePath, "utf8"));
  const description = data.abstract ?? data.subtitle;

  return {
    title: `${data.title} — Journal`,
    description,
    openGraph: {
      title: `${data.title} | Shreyas Agarwal`,
      description,
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Static params
// ─────────────────────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  if (!fs.existsSync(JOURNAL_DIR)) return [];
  return fs
    .readdirSync(JOURNAL_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const { data } = matter(
        fs.readFileSync(path.join(JOURNAL_DIR, filename), "utf8"),
      );
      return { slug: data.slug ?? filename.replace(/\.md$/, "") };
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default async function JournalEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const filePath = resolveFilePath(slug);

  if (!filePath) notFound();

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);

  // ── Normalise entry data ──────────────────────────────────────────────────
  const allEntries = getJournalEntries();
  const entryFromLib = allEntries.find((e) => e.slug === slug);

  // Build the entry from raw frontmatter + lib normalisation fallback
  const entry: JournalEntry = entryFromLib ?? {
    slug,
    title: (data.title as string) || slug,
    subtitle: data.subtitle as string | undefined,
    abstract: data.abstract as string | undefined,
    year: (data.year as string) || String(new Date().getFullYear()),
    published: data.published as string | undefined,
    updated: data.updated as string | undefined,
    domains: Array.isArray(data.domains) ? (data.domains as string[]) : [],
    format: (data.format as string) || "Essay",
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    series: data.series as string | undefined,
    featured: Boolean(data.featured),
    featuredPriority: typeof data.featuredPriority === "number" ? data.featuredPriority : 99,
    readingTime: computeReadingTime(content),
    github: data.github as string | undefined,
  };

  // ── Derived data ─────────────────────────────────────────────────────────
  const readingTime = computeReadingTime(content);
  const tocHeadings = parseTocHeadings(content);
  const relatedEntries = getRelatedEntries(entry, allEntries, 4);

  // Prev / next in sorted archive order
  const currentIndex = allEntries.findIndex((e) => e.slug === slug);
  const prev = currentIndex > 0 ? allEntries[currentIndex - 1] : null;
  const next =
    currentIndex < allEntries.length - 1 ? allEntries[currentIndex + 1] : null;

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div
      data-header-theme="light"
      className="min-h-screen bg-[#F3F1EC] text-[#1a1a1a] selection:bg-black/10"
    >
      {/* ── Compact article header ──────────────────────────────────── */}
      <ArticleHeader entry={entry} readingTime={readingTime} />

      {/* ── Three-column reading layout ─────────────────────────────── */}
      <div className="mx-auto max-w-[1400px] px-6 py-12 md:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[220px_1fr_200px] xl:gap-16">

          {/* ── Left rail: Table of Contents (desktop only) ─────────── */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents headings={tocHeadings} />
            </div>
          </div>

          {/* ── Center: Article + appendices ────────────────────────── */}
          <div className="min-w-0">
            {/* Mobile TOC — shown above content on smaller screens */}
            {tocHeadings.length > 0 && (
              <details className="mb-8 rounded border border-neutral-200 bg-white/50 px-4 py-3 lg:hidden">
                <summary className="cursor-pointer font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                  Contents
                </summary>
                <div className="mt-3 space-y-1 border-t border-neutral-100 pt-3">
                  {tocHeadings.map((h) => (
                    <a
                      key={h.id}
                      href={`#${h.id}`}
                      className={`block text-[12px] leading-relaxed text-neutral-500 hover:text-neutral-900 ${h.level === 3 ? "pl-3 text-[11px]" : ""}`}
                    >
                      {h.text}
                    </a>
                  ))}
                </div>
              </details>
            )}

            {/* Article body */}
            <ArticleBody content={content} />

            {/* Related writing */}
            <RelatedArticles entries={relatedEntries} />

            {/* Discussion */}
            <GiscusSection slug={slug} />

            {/* Prev / next navigation */}
            <ArticleFooterNav prev={prev} next={next} />
          </div>

          {/* ── Right rail: Metadata (desktop only) ─────────────────── */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <ArticleMetaRail entry={entry} readingTime={readingTime} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
