// ─────────────────────────────────────────────────────────────────────────────
// Publication TOC extractor
//
// Parses H1–H4 from MDX source (skips fenced code blocks).
// Produces the same slugs as rehype-slug so deep-links are consistent.
// ─────────────────────────────────────────────────────────────────────────────

import type { TocHeading } from "./types";

/**
 * Converts heading text to a URL-safe anchor id.
 * Must produce the same output as rehype-slug (which uses github-slugger).
 * This approximation is sufficient for TOC → anchor matching.
 */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/`[^`]*`/g, "") // strip inline code
    .replace(/\*+([^*]+)\*+/g, "$1") // strip bold/italic
    .replace(/_([^_]+)_/g, "$1") // strip italic underscores
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // strip links → keep label
    .replace(/[^\w\s-]/g, "") // remove special chars
    .replace(/\s+/g, "-") // spaces → dashes
    .replace(/-+/g, "-") // collapse dashes
    .trim()
    .replace(/^-+|-+$/g, ""); // trim edge dashes
}

/**
 * Parses H1–H4 headings from raw MDX source.
 * Skips headings inside fenced code blocks.
 */
export function parseTocHeadings(source: string): TocHeading[] {
  const lines = source.split("\n");
  const headings: TocHeading[] = [];
  let inCodeBlock = false;

  for (const line of lines) {
    if (/^```|^~~~/.test(line)) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = line.match(/^(#{1,4})\s+(.+)$/);
    if (!match) continue;

    const level = match[1].length as 1 | 2 | 3 | 4;
    const rawText = match[2].trim();

    const text = rawText
      .replace(/`([^`]*)`/g, "$1")
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/\*([^*]+)\*/g, "$1")
      .replace(/__([^_]+)__/g, "$1")
      .replace(/_([^_]+)_/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .trim();

    const id = slugifyHeading(text);
    if (id) {
      headings.push({ id, text, level });
    }
  }

  return headings;
}
