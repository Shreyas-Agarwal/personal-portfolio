/**
 * PublicationHeader — document-level title block
 *
 * Rendered at the top of the center column. Contains:
 * - Type label + breadcrumb
 * - Title (italic serif, editorial scale)
 * - Subtitle (if present)
 * - Abstract (if present) — indented, italic
 * - Compact metadata bar (date · revision · reading time)
 */

import Link from "next/link";
import { plexMono, serif } from "@/lib/fonts";
import type { PublicationManifest, PublicationSection } from "@/lib/publication/types";

interface PublicationHeaderProps {
  manifest: PublicationManifest;
  current: PublicationSection;
  basePath: string;
}

function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function PublicationHeader({ manifest, current, basePath }: PublicationHeaderProps) {
  const isIndex = (current.href ?? "") === "";
  const dateLabel = formatDate(manifest.date);

  return (
    <header className="mb-14 border-b border-[#2C2E32] pb-10">
      {/* ── Breadcrumb ── */}
      <div className="mb-6 flex items-center gap-2">
        <Link
          href={basePath}
          className={`${plexMono.className} text-[10px] uppercase tracking-[0.2em] text-[#E6E1D6]/30 transition-colors hover:text-[#E6E1D6]/65`}
        >
          {manifest.title}
        </Link>
        {!isIndex && (
          <>
            <span
              className={`${plexMono.className} text-[10px] text-[#E6E1D6]/15`}
              aria-hidden="true"
            >
              /
            </span>
            <span
              className={`${plexMono.className} text-[10px] uppercase tracking-[0.2em] text-[#E6E1D6]/55`}
            >
              {current.title}
            </span>
          </>
        )}
      </div>

      {/* ── Type label ── */}
      <div className="mb-4">
        <span
          className={`${plexMono.className} text-[9px] uppercase tracking-[0.25em] text-[#DE4B31]/70`}
        >
          {manifest.type.replace(/-/g, " ")}
        </span>
      </div>

      {/* ── Title ── */}
      <h1
        className={`${serif.className} mb-4 text-[2.6rem] font-normal italic leading-[1.1] tracking-tight text-[#E6E1D6]/95 md:text-[3.2rem]`}
      >
        {isIndex ? manifest.title : current.title}
      </h1>

      {/* ── Subtitle ── */}
      {manifest.subtitle && isIndex && (
        <p className={`${serif.className} mb-6 text-xl italic leading-relaxed text-[#E6E1D6]/55`}>
          {manifest.subtitle}
        </p>
      )}

      {/* ── Abstract ── */}
      {manifest.abstract && isIndex && (
        <div className="mb-6 border-l-2 border-[#2C2E32] pl-5">
          <p className={`${serif.className} text-[15px] italic leading-relaxed text-[#E6E1D6]/50`}>
            {manifest.abstract}
          </p>
        </div>
      )}

      {/* ── Compact metadata bar ── */}
      <div
        className={`${plexMono.className} flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-[#E6E1D6]/30`}
      >
        <span>{dateLabel}</span>

        {manifest.revision && (
          <>
            <span aria-hidden="true" className="text-[#E6E1D6]/15">
              ·
            </span>
            <span>{manifest.revision}</span>
          </>
        )}

        {manifest.readingTime && (
          <>
            <span aria-hidden="true" className="text-[#E6E1D6]/15">
              ·
            </span>
            <span>{manifest.readingTime}</span>
          </>
        )}

        {manifest.author && (
          <>
            <span aria-hidden="true" className="text-[#E6E1D6]/15">
              ·
            </span>
            <span>{manifest.author}</span>
          </>
        )}
      </div>
    </header>
  );
}
