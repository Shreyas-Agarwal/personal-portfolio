// ─────────────────────────────────────────────────────────────────────────────
// TOC heading extraction utility
//
// Parses H2 and H3 headings only. H1 is the canonical page title (frontmatter)
// and is excluded from TOC generation. If a markdown body contains an H1, it
// renders normally in the article but is not listed in the Table of Contents.
// ─────────────────────────────────────────────────────────────────────────────

export interface TocHeading {
  id: string;
  text: string; // clean display text
  level: 2 | 3;
}

/**
 * Converts heading text to a URL-safe anchor ID.
 * Must produce the same output as the heading renderer in ArticleBody.tsx.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/`[^`]*`/g, "") // strip inline code
    .replace(/\*+([^*]+)\*+/g, "$1") // strip bold/italic markers
    .replace(/_([^_]+)_/g, "$1") // strip italic underscores
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // strip markdown links → keep label
    .replace(/[^\w\s-]/g, "") // remove remaining special chars
    .replace(/\s+/g, "-") // spaces → dashes
    .replace(/-+/g, "-") // collapse consecutive dashes
    .trim()
    .replace(/^-+|-+$/g, ""); // trim leading/trailing dashes
}

/**
 * Extracts H2 and H3 headings from raw markdown content for TOC generation.
 * Skips H1 headings (the page title is the canonical H1).
 * Skips headings inside fenced code blocks.
 */
export function parseTocHeadings(markdown: string): TocHeading[] {
  const lines = markdown.split("\n");
  const headings: TocHeading[] = [];
  let inCodeBlock = false;

  for (const line of lines) {
    // Track fenced code block boundaries
    if (line.match(/^```|^~~~/)) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    // Match ## and ### only (levels 2 and 3)
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (!match) continue;

    const level = match[1].length as 2 | 3;
    const rawText = match[2].trim();

    // Strip inline markdown for clean display text
    const text = rawText
      .replace(/`([^`]*)`/g, "$1")
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/\*([^*]+)\*/g, "$1")
      .replace(/__([^_]+)__/g, "$1")
      .replace(/_([^_]+)_/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .trim();

    const id = slugify(text);
    if (id) {
      headings.push({ id, text, level });
    }
  }

  return headings;
}
