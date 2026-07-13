import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { getJournalEntries } from "@/lib/journal";
import { inter, plexMono, serif } from "@/lib/fonts";
import { RedPenNote } from "../../ui/RedPenNote";

const SERIES_NAME = "Architecture of Information Systems";

/**
 * Framed as an invitation rather than dry metadata — Newsreader carries the
 * argument here, Plex Mono stays reserved for the essay count and the
 * latest-essay meta line.
 */
export function ResearchProgramme() {
  const entries = getJournalEntries()
    .filter((entry) => entry.series === SERIES_NAME && entry.part != null)
    .sort((a, b) => (b.part ?? 0) - (a.part ?? 0));
  const latest = entries[0];
  const essayCount = entries.length;

  return (
    <section data-header-theme="dark" className="relative bg-[#1B1D1F] px-6 py-20 md:px-12">
      <div className="mx-auto max-w-5xl">
        <span className={`${plexMono.className} mb-8 block text-[10px] tracking-[0.22em] text-[#E6E1D6]/25`}>
          RESEARCH_PROGRAMME
        </span>

        <div className="max-w-2xl">
          <h3 className={`${serif.className} mb-6 text-4xl italic leading-[1.15] text-[#E6E1D6]/90 md:text-5xl`}>
            Architecture of Information
          </h3>

          <p className={`${serif.className} mb-8 text-lg leading-[1.8] text-[#E6E1D6]/75`}>
            An ongoing exploration into the physics of information movement, system boundaries,
            operational complexity, and large-scale software architecture. The Data and
            Infrastructure tracks were{" "}
            <RedPenNote
              type="Revision note"
              note="Originally one undifferentiated draft — split into two tracks after the fourth entry made the seams obvious."
            >
              split out of a single draft after the fourth entry
            </RedPenNote>
            .
          </p>

          <div className={`${plexMono.className} mb-8 flex flex-wrap gap-x-10 gap-y-3`}>
            <span className="text-[10px] uppercase tracking-[0.18em] text-[#E6E1D6]/35">
              Contains {essayCount} essays
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-[#E6E1D6]/35">
              Started 2026
            </span>
          </div>

          {latest && (
            <Link
              href={`/journal/${latest.slug}`}
              className="group mb-8 block border-t border-[#E6E1D6]/[0.08] pt-6"
            >
              <span className={`${plexMono.className} mb-2 block text-[9px] uppercase tracking-[0.18em] text-[#E6E1D6]/35`}>
                Latest — Essay {latest.part}
              </span>
              <span className={`${serif.className} block text-xl italic text-[#E6E1D6]/90`}>
                {latest.title}
              </span>
              <span className={`${plexMono.className} mt-2 block text-[11px] text-[#E6E1D6]/45`}>
                published {latest.published ?? latest.year} · {latest.readingTime}
              </span>
            </Link>
          )}

          <Link
            href="/journal"
            className={`${inter.className} group inline-flex items-center gap-2 text-sm font-medium text-[#E6E1D6]/60 transition-colors hover:text-[#E6E1D6]`}
          >
            Read the programme
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
