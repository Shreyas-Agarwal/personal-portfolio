"use client";

import { plexMono } from "@/lib/fonts";

interface DownloadActionsProps {
  plainText: string;
  filenameBase: string;
  /**
   * DOM id of the node to capture for the PDF download. Omit to hide the
   * PDF button entirely (e.g. the dry-read view has nothing worth
   * screenshotting).
   */
  pdfTargetId?: string;
  className?: string;
}

function downloadTextFile(text: string, filename: string) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// The PDF spec caps a single page at 14400pt (200in) on either axis — a
// hard format limit, not a jsPDF choice. When a page exceeds it, jsPDF
// only warns and silently clamps the page to 14400pt, which crops
// whatever the image drew past that point rather than throwing — that
// silent crop is what was cutting long publications short.
//
// Empirically (measured, not documented): a jsPDF doc created with
// `unit: "px"` converts format/addImage values to pt at ×4/3, not the
// standards px→pt factor of ×0.75 — e.g. passing 740 produced a 986.67pt
// page. So the safe ceiling in *our* px-labeled input units is
// 14400 / (4/3) = 10800; stay a bit under it for float-rounding safety.
const MAX_PAGE_HEIGHT_PX = 10700;

function sliceCanvas(source: HTMLCanvasElement, sy: number, sHeight: number): HTMLCanvasElement {
  const slice = document.createElement("canvas");
  slice.width = source.width;
  slice.height = sHeight;
  const ctx = slice.getContext("2d");
  ctx?.drawImage(source, 0, sy, source.width, sHeight, 0, 0, source.width, sHeight);
  return slice;
}

/**
 * Renders the target node to a tall canvas and wraps it in a PDF sized to
 * match — a continuous "scroll" rather than paginated, so nothing splits
 * mid-heading/mid-table/mid-diagram the way the browser's own print
 * pagination does. Falls back to multiple full-height pages only if the
 * content is longer than a single PDF page can physically be (rare — this
 * is a hard PDF format ceiling, not a preference). Trade-off: the PDF text
 * is a raster image, not selectable/searchable.
 */
async function downloadPdf(targetId: string, filename: string) {
  const node = document.getElementById(targetId);
  if (!node) return;

  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import("html2canvas-pro"),
    import("jspdf"),
  ]);

  // Book-like margins for the capture. Set inline rather than via a CSS
  // class: Tailwind's build only keeps classes it finds literally written
  // as `className="..."` somewhere — a class only ever toggled through
  // `classList.add` in JS is invisible to that scan and gets purged from
  // the compiled stylesheet, so the "class" silently does nothing.
  const previousPadding = node.style.padding;
  node.style.padding = "72px 76px";
  try {
    // scale 1.5 + JPEG keeps long publications from producing an
    // unreasonably large file — a full-length essay at scale 2 + PNG came
    // out over 100MB, which is unusable as a download. JPEG compresses a
    // mostly-text page far better than lossless PNG ever will.
    const scale = 1.5;
    const canvas = await html2canvas(node, {
      backgroundColor: "#1B1D1F",
      scale,
      useCORS: true,
    });

    const pageWidth = canvas.width / scale;
    const pageHeight = canvas.height / scale;

    if (pageHeight <= MAX_PAGE_HEIGHT_PX) {
      const pdf = new jsPDF({ unit: "px", format: [pageWidth, pageHeight], compress: true });
      pdf.addImage(canvas.toDataURL("image/jpeg", 0.88), "JPEG", 0, 0, pageWidth, pageHeight);
      pdf.save(filename);
      return;
    }

    // Too tall for one page: split into the fewest even slices that each
    // fit, rather than a full page followed by one tiny leftover sliver.
    const pageCount = Math.ceil(pageHeight / MAX_PAGE_HEIGHT_PX);
    const sliceHeight = Math.ceil(pageHeight / pageCount);
    const sliceHeightScaled = Math.ceil(sliceHeight * scale);

    let pdf: InstanceType<typeof jsPDF> | null = null;
    for (let i = 0; i < pageCount; i++) {
      const sy = i * sliceHeightScaled;
      const remaining = canvas.height - sy;
      const thisSliceHeightScaled = Math.min(sliceHeightScaled, remaining);
      const thisSliceHeight = thisSliceHeightScaled / scale;
      const slice = sliceCanvas(canvas, sy, thisSliceHeightScaled);

      if (!pdf) {
        pdf = new jsPDF({ unit: "px", format: [pageWidth, thisSliceHeight], compress: true });
      } else {
        pdf.addPage([pageWidth, thisSliceHeight], "portrait");
      }
      pdf.addImage(slice.toDataURL("image/jpeg", 0.88), "JPEG", 0, 0, pageWidth, thisSliceHeight);
    }
    pdf?.save(filename);
  } finally {
    node.style.padding = previousPadding;
  }
}

export function DownloadActions({
  plainText,
  filenameBase,
  pdfTargetId,
  className,
}: DownloadActionsProps) {
  return (
    <div
      data-html2canvas-ignore="true"
      className={`flex flex-wrap items-center gap-x-4 gap-y-1 ${className ?? ""}`}
    >
      <button
        type="button"
        onClick={() => downloadTextFile(plainText, `${filenameBase}.txt`)}
        className={`${plexMono.className} text-[10px] uppercase tracking-[0.18em] text-[#E6E1D6]/45 transition-colors hover:text-[#DE4B31]`}
      >
        Download .txt
      </button>
      {pdfTargetId && (
        <button
          type="button"
          onClick={() => downloadPdf(pdfTargetId, `${filenameBase}.pdf`)}
          className={`${plexMono.className} text-[10px] uppercase tracking-[0.18em] text-[#E6E1D6]/45 transition-colors hover:text-[#DE4B31]`}
        >
          Download PDF
        </button>
      )}
    </div>
  );
}
