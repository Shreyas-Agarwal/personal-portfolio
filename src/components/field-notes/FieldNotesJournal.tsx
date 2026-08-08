"use client";

import { useMemo, useState } from "react";
import { plexMono, serif } from "@/lib/fonts";
import type { FieldNote } from "@/lib/field-notes/types";
import { FieldNoteCard } from "./FieldNoteCard";

function formatYearMonth(iso: string): { year: string; month: string } {
  const d = new Date(iso);
  return {
    year: String(d.getFullYear()),
    month: d.toLocaleDateString("en-GB", { month: "long" }),
  };
}

interface FieldNotesJournalProps {
  notes: FieldNote[];
}

export function FieldNotesJournal({ notes }: FieldNotesJournalProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const tags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const note of notes) {
      for (const tag of note.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, [notes]);

  const filtered = useMemo(() => {
    if (!activeTag) return notes;
    return notes.filter((note) => note.tags.includes(activeTag));
  }, [notes, activeTag]);

  const grouped = useMemo(() => {
    const map = new Map<string, { month: string; note: FieldNote }[]>();
    for (const note of filtered) {
      const { year, month } = formatYearMonth(note.date);
      const group = map.get(year) ?? [];
      group.push({ month, note });
      map.set(year, group);
    }
    return [...map.entries()].sort((a, b) => b[0].localeCompare(a[0]));
  }, [filtered]);

  return (
    <main className="min-h-screen bg-[#1B1D1F] text-[#ECE5D4] py-20 px-6 sm:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto space-y-14">
        <header className="space-y-5 border-b border-[#33373B] pb-10">
          <span
            className={`${plexMono.className} text-xs font-semibold tracking-widest text-[#4E9A8A] uppercase`}
          >
            Field Notes
          </span>
          <h1 className={`${serif.className} text-4xl sm:text-5xl font-normal text-[#ECE5D4] leading-[1.1] tracking-tight`}>
            Field Notes
          </h1>
          <p className="text-base text-[#A0A5AD] leading-relaxed max-w-xl">
            Short, unfinished observations from engineering, product, and systems work — a
            notebook, not a publication.
          </p>
          <p className={`${plexMono.className} text-xs text-[#8A8F99] uppercase tracking-wider`}>
            {notes.length} {notes.length === 1 ? "note" : "notes"}
          </p>
        </header>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map(([tag, count]) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`${plexMono.className} flex items-center gap-1.5 rounded-xs border px-2.5 py-1 text-[11px] uppercase tracking-wider transition-colors ${
                  activeTag === tag
                    ? "border-[#4E9A8A] bg-[#4E9A8A]/10 text-[#4E9A8A]"
                    : "border-[#33373B] text-[#A0A5AD] hover:border-[#4A4F55] hover:text-[#ECE5D4]"
                }`}
              >
                <span>{tag}</span>
                <span className={activeTag === tag ? "text-[#4E9A8A]/70" : "text-[#8A8F99]"}>
                  {count}
                </span>
              </button>
            ))}
          </div>
        )}

        {filtered.length === 0 ? (
          <p className="text-sm text-[#8A8F99]">No notes match that tag yet.</p>
        ) : (
          <div className="space-y-12">
            {grouped.map(([year, entries]) => (
              <div key={year} className="space-y-1">
                <div className={`${plexMono.className} text-xs text-[#8A8F99] uppercase tracking-wider mb-2`}>
                  {year}
                </div>
                <div className="divide-y divide-[#2C2E32]">
                  {entries.map(({ note }) => (
                    <FieldNoteCard key={note.slug} note={note} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
