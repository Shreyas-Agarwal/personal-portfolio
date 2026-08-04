/**
 * PublicationMetadata — editorial metadata panel
 *
 * Compact right-rail masthead. Shows only: type label, author,
 * reading time, and revision. Nothing else.
 */

import { plexMono } from "@/lib/fonts";
import type { PublicationManifest } from "@/lib/publication/types";

interface PublicationMetadataProps {
  manifest: PublicationManifest;
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span
        className={`${plexMono.className} block text-[8px] uppercase tracking-[0.2em] text-[#E6E1D6]/20`}
      >
        {label}
      </span>
      <span className={`${plexMono.className} block text-[11px] tracking-wide text-[#E6E1D6]/55`}>
        {value}
      </span>
    </div>
  );
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

export function PublicationMetadata({ manifest }: PublicationMetadataProps) {
  return (
    <div className="space-y-2.5">
      {/* Type label — header */}
      <div className="mb-4 border-b border-[#2C2E32] pb-3">
        <span
          className={`${plexMono.className} text-[9px] uppercase tracking-[0.25em] text-[#DE4B31]/70`}
        >
          {manifest.type.replace(/-/g, " ")}
        </span>
      </div>

      {manifest.author && <MetaRow label="Author" value={manifest.author} />}
      {manifest.readingTime && <MetaRow label="Reading time" value={manifest.readingTime} />}
      <MetaRow label="Date" value={formatDate(manifest.date)} />
      {manifest.revision && <MetaRow label="Revision" value={manifest.revision} />}

      {/* GitHub link — kept if present */}
      {manifest.github && (
        <div className="border-t border-[#2C2E32] pt-3 mt-1">
          <a
            href={manifest.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`${plexMono.className} flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-[#E6E1D6]/30 transition-colors hover:text-[#E6E1D6]/70`}
          >
            <span>Repository</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      )}
    </div>
  );
}
