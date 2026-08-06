"use client";

import { plexMono } from "@/lib/fonts";
import type { PublicationPlainBlock } from "@/lib/publication/plain-text";

interface DryReadDownloadActionsProps {
  blocks: PublicationPlainBlock[];
  plainText: string;
  title: string;
  filenameBase: string;
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

export function DryReadDownloadActions({
  blocks,
  plainText,
  title,
  filenameBase,
  className,
}: DryReadDownloadActionsProps) {
  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 ${className ?? ""}`}>
      <button
        type="button"
        onClick={() => downloadTextFile(plainText, `${filenameBase}.txt`)}
        className={`${plexMono.className} text-[10px] uppercase tracking-[0.18em] text-[#E6E1D6]/45 transition-colors hover:text-[#DE4B31]`}
      >
        Download .txt
      </button>
      <button
        type="button"
        onClick={async () => {
          const { downloadSelectableTextPdf } = await import("@/lib/publication/text-pdf");
          await downloadSelectableTextPdf(blocks, title, `${filenameBase}.pdf`);
        }}
        className={`${plexMono.className} text-[10px] uppercase tracking-[0.18em] text-[#E6E1D6]/45 transition-colors hover:text-[#DE4B31]`}
      >
        Download PDF
      </button>
    </div>
  );
}
