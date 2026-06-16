import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

// ─────────────────────────────────────────────────────────────────────────────
// Schema
// ─────────────────────────────────────────────────────────────────────────────

export interface JournalEntry {
  slug: string;
  title: string;
  subtitle?: string;
  year: string;
  domains: string[];
  format: string;
  tags: string[];
  series?: string;
  featured: boolean;
  featuredPriority: number;
  readingTime: string;
  github?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const WORDS_PER_MINUTE = 238;
const JOURNAL_DIR = path.join(process.cwd(), "content/journal");

// Map legacy `category` strings to new domain taxonomy
const LEGACY_CATEGORY_MAP: Record<string, string[]> = {
  "COMPLEX SYSTEMS": ["Ecology & Complexity", "Systems & Architecture"],
  "DISTRIBUTED SYSTEMS": ["AI & Computation", "Systems & Architecture"],
  "AI Architecture": ["AI & Computation", "Systems & Architecture"],
  "AI Philosophy": ["AI & Computation"],
  "Computation Physics": ["AI & Computation", "Systems & Architecture"],
  "Systems Biology": ["Ecology & Complexity", "Systems & Architecture"],
  "Systems Ecology": ["Ecology & Complexity"],
  "Process Management": ["Process & Organization", "Operational Thinking"],
};

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function computeReadingTime(content: string): string {
  const wordCount = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
  return `${minutes} min read`;
}

function normalizeDomains(data: matter.GrayMatterFile<string>["data"]): string[] {
  if (Array.isArray(data.domains) && data.domains.length > 0) {
    return data.domains as string[];
  }
  if (typeof data.category === "string" && data.category) {
    return LEGACY_CATEGORY_MAP[data.category] ?? [data.category];
  }
  return [];
}

function normalizeFormat(data: matter.GrayMatterFile<string>["data"]): string {
  if (typeof data.format === "string" && data.format) return data.format;
  return "Essay";
}

function normalizeTags(data: matter.GrayMatterFile<string>["data"]): string[] {
  if (!data.tags) return [];
  if (Array.isArray(data.tags)) return data.tags as string[];
  return [];
}

// ─────────────────────────────────────────────────────────────────────────────
// Main reader
// ─────────────────────────────────────────────────────────────────────────────

export function getJournalEntries(): JournalEntry[] {
  if (!fs.existsSync(JOURNAL_DIR)) return [];

  const filenames = fs.readdirSync(JOURNAL_DIR).filter((f) => f.endsWith(".md"));

  const entries = filenames.map((filename): JournalEntry => {
    const filePath = path.join(JOURNAL_DIR, filename);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContent);

    const slug = data.slug ?? filename.replace(/\.md$/, "");

    return {
      slug,
      title: (data.title as string) || slug,
      subtitle: data.subtitle as string | undefined,
      year: (data.year as string) || String(new Date().getFullYear()),
      domains: normalizeDomains(data),
      format: normalizeFormat(data),
      tags: normalizeTags(data),
      series: data.series as string | undefined,
      featured: Boolean(data.featured),
      featuredPriority: typeof data.featuredPriority === "number" ? data.featuredPriority : 99,
      readingTime: computeReadingTime(content),
      github: data.github as string | undefined,
    };
  });

  // Sort: by year descending, then title alphabetically
  entries.sort((a, b) => {
    if (b.year !== a.year) return b.year.localeCompare(a.year);
    return a.title.localeCompare(b.title);
  });

  return entries;
}

// ─────────────────────────────────────────────────────────────────────────────
// Facet helpers — called once on the server, passed as props to client component
// ─────────────────────────────────────────────────────────────────────────────

export function getJournalFacets(entries: JournalEntry[]) {
  const domains = new Set<string>();
  const formats = new Set<string>();
  const tags = new Set<string>();
  const series = new Set<string>();
  const years = new Set<string>();

  for (const entry of entries) {
    for (const d of entry.domains) domains.add(d);
    formats.add(entry.format);
    for (const t of entry.tags) tags.add(t);
    if (entry.series) series.add(entry.series);
    years.add(entry.year);
  }

  return {
    domains: [...domains].sort(),
    formats: [...formats].sort(),
    tags: [...tags].sort(),
    series: [...series].sort(),
    years: [...years].sort((a, b) => b.localeCompare(a)), // descending
  };
}
