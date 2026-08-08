/**
 * PublicationFooter — prev/next document navigation
 *
 * Bottom of the center column. Renders two navigation cards:
 * previous section on the left, next on the right. Quiet until hover.
 */

import Link from "next/link";
import { plexMono, serif } from "@/lib/fonts";
import { withPublicationQuery } from "@/lib/publication/query";
import type { PublicationSection } from "@/lib/publication/types";

interface PublicationFooterProps {
  prev?: PublicationSection;
  next?: PublicationSection;
  basePath: string;
  /** Preserve reader mode across Previous/Next — the reader stays in the
   *  distraction-free layout until they explicitly navigate elsewhere. */
  readerMode?: boolean;
}

function NavCard({
  section,
  basePath,
  direction,
  readerMode,
}: {
  section: PublicationSection;
  basePath: string;
  direction: "prev" | "next";
  readerMode: boolean;
}) {
  const path = (section.href ?? "") === "" ? basePath : `${basePath}/${section.href}`;
  const href = withPublicationQuery(path, { readerMode });
  const isPrev = direction === "prev";

  return (
    <Link
      href={href}
      className={`group flex flex-col gap-2 border border-[#2C2E32] px-5 py-4 transition-colors duration-200 hover:border-[#E6E1D6]/15 ${
        isPrev ? "" : "items-end text-right"
      }`}
    >
      <span
        className={`${plexMono.className} flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] text-[#E6E1D6]/25 transition-colors group-hover:text-[#E6E1D6]/50`}
      >
        {isPrev && (
          <span aria-hidden="true" className="transition-transform group-hover:-translate-x-0.5">
            ←
          </span>
        )}
        <span>{isPrev ? "Previous" : "Next"}</span>
        {!isPrev && (
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        )}
      </span>
      <span
        className={`${serif.className} text-[15px] italic leading-snug text-[#E6E1D6]/55 transition-colors group-hover:text-[#E6E1D6]/85`}
      >
        {section.title}
      </span>
    </Link>
  );
}

export function PublicationFooter({
  prev,
  next,
  basePath,
  readerMode = false,
}: PublicationFooterProps) {
  if (!prev && !next) return null;

  return (
    <footer className="mt-20 border-t border-[#2C2E32] pt-10">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {prev ? (
          <NavCard section={prev} basePath={basePath} direction="prev" readerMode={readerMode} />
        ) : (
          <div />
        )}
        {next && (
          <NavCard section={next} basePath={basePath} direction="next" readerMode={readerMode} />
        )}
      </div>
    </footer>
  );
}
