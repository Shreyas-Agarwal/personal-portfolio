// ─────────────────────────────────────────────────────────────────────────────
// Plain-text extractor for the "dry read" view and .txt download.
//
// Deliberately approximate: it flattens MDX/markdown to readable text by
// stripping syntax line-by-line. Custom capitalized JSX components (Callout,
// Tradeoff, Decision, Figure, mermaid diagrams, ...) are dropped entirely —
// they're visual/card-style elements that don't read well as loose text.
// GFM tables are parsed into structured rows so they can render as real
// <table> markup instead of raw pipe-delimited text.
// ─────────────────────────────────────────────────────────────────────────────

export interface PublicationTextBlock {
  type: "text";
  text: string;
}

export interface PublicationTableBlock {
  type: "table";
  headers: string[];
  rows: string[][];
}

export type PublicationPlainBlock = PublicationTextBlock | PublicationTableBlock;

function stripFrontmatter(source: string): string {
  return source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, "");
}

function stripInlineMarkdown(text: string): string {
  return text
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*\*([^*]+)\*\*\*/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/_([^_]+)_/g, "$1");
}

function isTableSeparatorRow(line: string): boolean {
  return (
    /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/.test(line) && line.includes("-")
  );
}

function isTableRow(line: string): boolean {
  return line.includes("|") && line.trim().length > 0;
}

function splitTableRow(line: string): string[] {
  let trimmed = line.trim();
  if (trimmed.startsWith("|")) trimmed = trimmed.slice(1);
  if (trimmed.endsWith("|")) trimmed = trimmed.slice(0, -1);
  return trimmed.split("|").map((cell) => stripInlineMarkdown(cell.trim()));
}

/**
 * Parses raw MDX source into an ordered list of plain-text and table
 * blocks — the input to the dry-read view. Line-based, not a real MDX
 * parser: good enough for prose, tables, and dropping known JSX shapes.
 */
export function parsePublicationPlainText(mdxSource: string): PublicationPlainBlock[] {
  const lines = stripFrontmatter(mdxSource).split("\n");
  const blocks: PublicationPlainBlock[] = [];
  let textBuffer: string[] = [];

  let inCodeBlock = false;
  let codeBlockIsMermaid = false;

  // Custom component skipping: `awaitingOpen` covers a multi-line opening
  // tag (attributes spanning several lines before the `>`/`/>`); once open,
  // `skipTagName`/`skipDepth` track same-tag nesting so we drop everything
  // through to the matching closing tag.
  let awaitingOpen: string | null = null;
  let skipTagName: string | null = null;
  let skipDepth = 0;

  const flushText = () => {
    if (textBuffer.length === 0) return;
    const text = textBuffer.join("\n").replace(/\n{3,}/g, "\n\n").trim();
    if (text) blocks.push({ type: "text", text });
    textBuffer = [];
  };

  let i = 0;
  while (i < lines.length) {
    const rawLine = lines[i];
    const fenceMatch = rawLine.match(/^\s*(```|~~~)\s*([\w-]*)/);

    if (fenceMatch && !inCodeBlock) {
      inCodeBlock = true;
      codeBlockIsMermaid = fenceMatch[2].toLowerCase() === "mermaid";
      if (!codeBlockIsMermaid) textBuffer.push(rawLine);
      i++;
      continue;
    }
    if (fenceMatch && inCodeBlock) {
      inCodeBlock = false;
      if (!codeBlockIsMermaid) textBuffer.push(rawLine);
      codeBlockIsMermaid = false;
      i++;
      continue;
    }
    if (inCodeBlock) {
      if (!codeBlockIsMermaid) textBuffer.push(rawLine);
      i++;
      continue;
    }

    if (awaitingOpen) {
      if (/\/>\s*$/.test(rawLine)) {
        awaitingOpen = null;
      } else if (/>\s*$/.test(rawLine)) {
        skipTagName = awaitingOpen;
        skipDepth = 1;
        awaitingOpen = null;
      }
      i++;
      continue;
    }

    if (skipTagName) {
      const opens = (rawLine.match(new RegExp(`<${skipTagName}(\\s|>|/)`, "g")) ?? []).length;
      const closes = (rawLine.match(new RegExp(`</${skipTagName}>`, "g")) ?? []).length;
      skipDepth += opens - closes;
      if (skipDepth <= 0) skipTagName = null;
      i++;
      continue;
    }

    // Self-closing custom component entirely on one line.
    if (/^\s*<([A-Z][\w.]*)(\s[^>]*)?\/>\s*$/.test(rawLine)) {
      i++;
      continue;
    }

    // Opening tag that closes on the same line — children follow on later lines.
    const sameLineOpen = rawLine.match(/^\s*<([A-Z][\w.]*)(\s[^>]*)?>\s*$/);
    if (sameLineOpen) {
      skipTagName = sameLineOpen[1];
      skipDepth = 1;
      i++;
      continue;
    }

    // Multi-line opening tag begins — attributes continue on later lines.
    const multiLineOpenStart = rawLine.match(/^\s*<([A-Z][\w.]*)\s*$/);
    if (multiLineOpenStart) {
      awaitingOpen = multiLineOpenStart[1];
      i++;
      continue;
    }

    // GFM table: a row immediately followed by a valid separator row.
    if (isTableRow(rawLine) && i + 1 < lines.length && isTableSeparatorRow(lines[i + 1])) {
      flushText();
      const headers = splitTableRow(rawLine);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && isTableRow(lines[i])) {
        rows.push(splitTableRow(lines[i]));
        i++;
      }
      blocks.push({ type: "table", headers, rows });
      continue;
    }

    if (/^\s*(-{3,}|\*{3,}|_{3,})\s*$/.test(rawLine)) {
      i++;
      continue;
    }

    let line = rawLine
      .replace(/^\s{0,3}#{1,6}\s+/, "")
      .replace(/^\s{0,3}>\s?/, "")
      .replace(/^(\s*)[-*+]\s+/, "$1• ")
      .replace(/^(\s*)\d+\.\s+/, "$1");
    line = stripInlineMarkdown(line);
    textBuffer.push(line);
    i++;
  }

  flushText();
  return blocks;
}

/** Flattens parsed blocks back to a single string, for .txt download. */
export function blocksToPlainText(blocks: PublicationPlainBlock[]): string {
  return blocks
    .map((block) => {
      if (block.type === "text") return block.text;

      const widths = block.headers.map((header, col) =>
        Math.max(header.length, ...block.rows.map((row) => (row[col] ?? "").length)),
      );
      const renderRow = (cells: string[]) =>
        cells.map((cell, col) => (cell ?? "").padEnd(widths[col])).join("  ");

      return [
        renderRow(block.headers),
        widths.map((w) => "-".repeat(w)).join("  "),
        ...block.rows.map(renderRow),
      ].join("\n");
    })
    .join("\n\n");
}

/** Convenience wrapper for callers that only need the flat text. */
export function toPlainText(mdxSource: string): string {
  return blocksToPlainText(parsePublicationPlainText(mdxSource));
}
