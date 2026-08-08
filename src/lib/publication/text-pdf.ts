// ─────────────────────────────────────────────────────────────────────────────
// Selectable-text PDF for the dry-read view.
//
// Unlike the styled page's "Download PDF" (an html2canvas screenshot, which
// preserves rich visuals but produces a raster image), this draws real
// vector text with jsPDF — the output is selectable/searchable/copyable,
// matching what a plain-text reading mode should produce. A single
// continuous page whenever the content fits one — the PDF spec itself caps
// a page at 14400pt (200in), a hard format limit — falling back to extra
// pages only past that ceiling, and only ever breaking between paragraphs
// or table rows, never mid-content.
// ─────────────────────────────────────────────────────────────────────────────

import type { PublicationPlainBlock } from "./plain-text";

const PAGE_WIDTH = 612; // 8.5in at 72pt/in
const MARGIN_X = 64;
const MARGIN_TOP = 72;
const MARGIN_BOTTOM = 72;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_X * 2;
const BODY_SIZE = 11;
const LINE_HEIGHT_FACTOR = 1.55;
const LINE_HEIGHT = BODY_SIZE * LINE_HEIGHT_FACTOR;
const PARAGRAPH_GAP = LINE_HEIGHT * 0.6;
const TITLE_SIZE = 22;
const CELL_PADDING = 8;
// Stay a little under the PDF spec's 14400pt page-size ceiling for safety.
const MAX_PAGE_HEIGHT = 14300;

type JsPdfDoc = {
  setFont: (family: string, style: string) => void;
  setFontSize: (size: number) => void;
  setLineHeightFactor: (factor: number) => void;
  setLineWidth: (width: number) => void;
  addPage: (format: [number, number]) => void;
  splitTextToSize: (text: string, width: number) => string[];
  text: (text: string | string[], x: number, y: number) => void;
  line: (x1: number, y1: number, x2: number, y2: number) => void;
  save: (filename: string) => void;
};

function paragraphsOf(text: string): string[] {
  return text.split(/\n{2,}/).filter((p) => p.trim().length > 0);
}

/** Row height in pt for a table row, given each cell's wrapped line count. */
function tableRowHeight(doc: JsPdfDoc, cells: string[], colWidth: number): number {
  const lineCounts = cells.map(
    (cell) => doc.splitTextToSize(cell, colWidth - CELL_PADDING * 2).length,
  );
  return Math.max(1, ...lineCounts) * LINE_HEIGHT + CELL_PADDING * 1.5;
}

/**
 * Measures total content height by replaying the same layout logic used
 * for rendering, without drawing anything — used only to decide whether
 * everything fits on one page.
 */
function measureHeight(doc: JsPdfDoc, blocks: PublicationPlainBlock[]): number {
  let height = MARGIN_TOP + TITLE_SIZE * 1.4 + PARAGRAPH_GAP * 1.5;

  doc.setFont("times", "normal");
  doc.setFontSize(BODY_SIZE);

  for (const block of blocks) {
    if (block.type === "text") {
      for (const paragraph of paragraphsOf(block.text)) {
        const lines = doc.splitTextToSize(paragraph, CONTENT_WIDTH);
        height += lines.length * LINE_HEIGHT + PARAGRAPH_GAP;
      }
    } else {
      const colWidth = CONTENT_WIDTH / block.headers.length;
      height += tableRowHeight(doc, block.headers, colWidth);
      for (const row of block.rows) height += tableRowHeight(doc, row, colWidth);
      height += PARAGRAPH_GAP;
    }
  }

  return height + MARGIN_BOTTOM;
}

export async function downloadSelectableTextPdf(
  blocks: PublicationPlainBlock[],
  title: string,
  filename: string,
) {
  const { jsPDF } = await import("jspdf");

  // Measurement pass: page size doesn't affect splitTextToSize, so a
  // throwaway doc is enough to decide whether this fits one page.
  const measureDoc = new jsPDF({ unit: "pt", format: [PAGE_WIDTH, 1000] }) as unknown as JsPdfDoc;
  measureDoc.setLineHeightFactor(LINE_HEIGHT_FACTOR);
  const measuredHeight = measureHeight(measureDoc, blocks);

  const pageHeight = Math.min(measuredHeight, MAX_PAGE_HEIGHT);
  const doc = new jsPDF({ unit: "pt", format: [PAGE_WIDTH, pageHeight] }) as unknown as JsPdfDoc;
  doc.setLineHeightFactor(LINE_HEIGHT_FACTOR);

  const pageBottom = pageHeight - MARGIN_BOTTOM;
  let y = MARGIN_TOP;

  /** Starts a new page if `neededHeight` won't fit in what's left of this one. */
  const ensureSpace = (neededHeight: number) => {
    if (y + neededHeight > pageBottom && y > MARGIN_TOP) {
      doc.addPage([PAGE_WIDTH, pageHeight]);
      y = MARGIN_TOP;
    }
  };

  doc.setFont("times", "bold");
  doc.setFontSize(TITLE_SIZE);
  doc.text(doc.splitTextToSize(title, CONTENT_WIDTH), MARGIN_X, y);
  y += TITLE_SIZE * 1.4 + PARAGRAPH_GAP * 1.5;

  doc.setFont("times", "normal");
  doc.setFontSize(BODY_SIZE);

  for (const block of blocks) {
    if (block.type === "text") {
      for (const paragraph of paragraphsOf(block.text)) {
        const lines = doc.splitTextToSize(paragraph, CONTENT_WIDTH);
        const neededHeight = lines.length * LINE_HEIGHT + PARAGRAPH_GAP;
        ensureSpace(neededHeight);
        doc.text(lines, MARGIN_X, y + BODY_SIZE);
        y += neededHeight;
      }
      continue;
    }

    const colWidth = CONTENT_WIDTH / block.headers.length;

    doc.setFont("times", "bold");
    const headerHeight = tableRowHeight(doc, block.headers, colWidth);
    ensureSpace(headerHeight);
    block.headers.forEach((header, col) => {
      const lines = doc.splitTextToSize(header, colWidth - CELL_PADDING * 2);
      doc.text(lines, MARGIN_X + col * colWidth, y + BODY_SIZE);
    });
    y += headerHeight;
    doc.setLineWidth(0.75);
    doc.line(MARGIN_X, y - CELL_PADDING * 0.5, MARGIN_X + CONTENT_WIDTH, y - CELL_PADDING * 0.5);

    doc.setFont("times", "normal");
    for (const row of block.rows) {
      const rowHeight = tableRowHeight(doc, row, colWidth);
      ensureSpace(rowHeight);
      row.forEach((cell, col) => {
        const lines = doc.splitTextToSize(cell, colWidth - CELL_PADDING * 2);
        doc.text(lines, MARGIN_X + col * colWidth, y + BODY_SIZE);
      });
      y += rowHeight;
    }
    y += PARAGRAPH_GAP;
  }

  doc.save(filename);
}
