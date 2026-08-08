"use client";

import { useMemo, useState } from "react";
import { plexMono, serif } from "@/lib/fonts";
import type { ChangelogEntry } from "@/lib/changelog";
import { ChangelogEntryCard } from "./ChangelogEntryCard";

function formatYear(iso: string): string {
  return String(new Date(iso).getFullYear());
}

export function ChangelogList({ entries }: { entries: ChangelogEntry[] }) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const tags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const entry of entries) {
      for (const tag of entry.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, [entries]);

  const filtered = useMemo(() => {
    if (!activeTag) return entries;
    return entries.filter((entry) => entry.tags.includes(activeTag));
  }, [entries, activeTag]);

  const grouped = useMemo(() => {
    const map = new Map<string, ChangelogEntry[]>();
    for (const entry of filtered) {
      const year = formatYear(entry.date);
      const group = map.get(year) ?? [];
      group.push(entry);
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
            Revision Log
          </span>
          <h1
            className={`${serif.className} text-4xl sm:text-5xl font-normal text-[#ECE5D4] leading-[1.1] tracking-tight`}
          >
            Complete History
          </h1>
          <p className="text-base text-[#A0A5AD] leading-relaxed max-w-xl">
            Every revision to this library, in order — what changed, and why. This site is
            revised continuously, not shipped once.
          </p>
          <p className={`${plexMono.className} text-xs text-[#8A8F99] uppercase tracking-wider`}>
            {entries.length} revisions · {entries[0]?.revision} is current
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
          <p className="text-sm text-[#8A8F99]">No revisions match that tag.</p>
        ) : (
          <div className="space-y-12">
            {grouped.map(([year, yearEntries]) => (
              <div key={year} className="space-y-1">
                <div
                  className={`${plexMono.className} text-xs text-[#8A8F99] uppercase tracking-wider mb-2`}
                >
                  {year}
                </div>
                <div className="divide-y divide-[#2C2E32]">
                  {yearEntries.map((entry) => (
                    <ChangelogEntryCard key={entry.revision} entry={entry} />
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
