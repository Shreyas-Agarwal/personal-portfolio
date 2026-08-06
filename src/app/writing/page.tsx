import type { Metadata } from "next";
import Link from "next/link";
import { DraftingGrid } from "@/components/ui/DraftingGrid";
import { getAllFieldNotes } from "@/lib/field-notes/loader";
import { plexMono, serif } from "@/lib/fonts";
import { getAllPublications } from "@/lib/publication/loader";

export const metadata: Metadata = {
  title: "Writing",
  description: "Publications and Field Notes — finished essays and ideas still in motion.",
  openGraph: {
    title: "Writing | Shreyas Agarwal",
    description: "Publications and Field Notes — finished essays and ideas still in motion.",
  },
};

export default function WritingPage() {
  const publications = getAllPublications();
  const fieldNotes = getAllFieldNotes();
  const recentNotes = fieldNotes.slice(0, 3);

  return (
    <main className="min-h-screen bg-[#1B1D1F] text-[#ECE5D4] relative py-20 px-6 sm:px-12 lg:px-24 overflow-hidden">
      <DraftingGrid />

      <div className="max-w-5xl mx-auto relative z-10 space-y-16">
        <header className="space-y-5 border-b border-[#33373B] pb-12">
          <span
            className={`${plexMono.className} text-xs font-semibold tracking-widest text-[#8A8F99] uppercase`}
          >
            Writing
          </span>
          <h1
            className={`${serif.className} text-4xl sm:text-5xl lg:text-6xl font-normal text-[#ECE5D4] leading-[1.1] tracking-tight`}
          >
            Writing
          </h1>
          <p className="text-lg text-[#A0A5AD] max-w-2xl leading-relaxed font-sans font-light">
            Two registers of thinking, kept deliberately separate: finished essays, and the raw
            observations that come before them.
          </p>
        </header>

        <div className="grid gap-8 sm:grid-cols-2">
          {/* ── Publications panel — editorial identity ─────────────────── */}
          <section className="border border-[#33373B] bg-[#24272A] rounded-sm p-8 flex flex-col">
            <span
              className={`${plexMono.className} text-xs font-semibold tracking-widest text-[#DE4B31] uppercase`}
            >
              Publications
            </span>
            <h2 className={`${serif.className} mt-3 text-2xl text-[#ECE5D4]`}>
              {publications.length} {publications.length === 1 ? "Publication" : "Publications"}
            </h2>
            <p className="mt-3 text-sm text-[#A0A5AD] leading-relaxed font-sans font-light flex-1">
              Case studies, research notes, and architecture notes — finished arguments, edited
              and complete.
            </p>
            <Link
              href="/works/publications"
              className={`${plexMono.className} mt-6 inline-flex items-center gap-1.5 text-xs text-[#DE4B31] font-medium uppercase tracking-wider hover:gap-2.5 transition-all`}
            >
              Enter Library <span>→</span>
            </Link>
          </section>

          {/* ── Field Notes panel — notebook identity ────────────────────── */}
          <section className="border border-[#33373B] bg-[#1F2422] rounded-sm p-8 flex flex-col">
            <span
              className={`${plexMono.className} text-xs font-semibold tracking-widest text-[#4E9A8A] uppercase`}
            >
              Field Notes
            </span>
            <h2 className={`${plexMono.className} mt-3 text-2xl font-medium text-[#ECE5D4]`}>
              {fieldNotes.length} {fieldNotes.length === 1 ? "Note" : "Notes"}
            </h2>
            <p className="mt-3 text-sm text-[#A0A5AD] leading-relaxed font-sans font-light">
              Short, unfinished observations from engineering, product, and systems work — pages
              from a notebook, not essays.
            </p>

            {recentNotes.length > 0 && (
              <ul className="mt-5 space-y-2.5 border-t border-[#2C2E32] pt-4">
                {recentNotes.map((note) => (
                  <li key={note.slug}>
                    <Link
                      href={`/writing/field-notes/${note.slug}`}
                      className={`${plexMono.className} text-[13px] text-[#A0A5AD] hover:text-[#4E9A8A] transition-colors`}
                    >
                      {note.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            <Link
              href="/writing/field-notes"
              className={`${plexMono.className} mt-6 inline-flex items-center gap-1.5 text-xs text-[#4E9A8A] font-medium uppercase tracking-wider hover:gap-2.5 transition-all`}
            >
              Read Field Notes <span>→</span>
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
}
