"use client";

import type { JournalEntry } from "@/lib/journal";
import { useMemo, useState } from "react";
import { TRACK_COLORS } from "@/components/journal/ArticleHeader";
import { EmptyState } from "./EmptyState";
import { EntryRow } from "./EntryRow";
import { FeaturedShelf, type SeriesSummary } from "./FeaturedShelf";
import { FilterSidebar } from "./FilterSidebar";
import { SearchBar } from "./SearchBar";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface JournalIndexProps {
  entries: JournalEntry[];
  allDomains: string[];
  allFormats: string[];
  allTags: string[];
  allSeries: string[];
  allYears: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Series group header — shown above a run of same-series articles
// ─────────────────────────────────────────────────────────────────────────────

function SeriesGroupHeader({
  seriesName,
  entries,
}: {
  seriesName: string;
  entries: JournalEntry[];
}) {
  // Collect unique tracks for this series
  const tracks = [...new Set(entries.map((e) => e.track).filter(Boolean))] as string[];

  return (
    <div className="mb-6 mt-14 flex flex-wrap items-center gap-3 border-t border-neutral-200 pt-8 first:mt-0 first:border-0 first:pt-0">
      <div className="space-y-1">
        <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.25em] text-neutral-400">
          Series
        </p>
        <h2 className="text-[17px] font-semibold tracking-tight text-neutral-800">
          {seriesName}
        </h2>
      </div>
      {/* Track pills */}
      {tracks.length > 0 && (
        <div className="flex flex-wrap gap-1.5 ml-auto">
          {tracks.map((track) => (
            <span
              key={track}
              className={`rounded border px-2 py-0.5 text-[10px] font-semibold tracking-wide ${TRACK_COLORS[track] ?? "text-neutral-500 bg-neutral-50 border-neutral-200"}`}
            >
              {track} Track
            </span>
          ))}
          <span className="text-[10px] text-neutral-400 self-center ml-1">
            {entries.length} {entries.length === 1 ? "part" : "parts"}
          </span>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export function JournalIndex({
  entries,
  allDomains,
  allFormats,
  allTags,
  allSeries,
  allYears,
}: JournalIndexProps) {
  // ─── Filter State ──────────────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomains, setSelectedDomains] = useState<Set<string>>(new Set());
  const [selectedFormats, setSelectedFormats] = useState<Set<string>>(new Set());
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null);
  const [selectedYears, setSelectedYears] = useState<Set<string>>(new Set());

  // ─── Toggle helpers ────────────────────────────────────────────────────────
  function toggleSetItem(set: Set<string>, item: string): Set<string> {
    const next = new Set(set);
    if (next.has(item)) next.delete(item);
    else next.add(item);
    return next;
  }

  // ─── Filtering logic ───────────────────────────────────────────────────────
  const filteredEntries = useMemo(() => {
    return entries.filter((entry) => {
      // Search (case-insensitive)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          entry.title.toLowerCase().includes(q) ||
          (entry.subtitle?.toLowerCase().includes(q) ?? false) ||
          entry.domains.some((d) => d.toLowerCase().includes(q)) ||
          entry.format.toLowerCase().includes(q) ||
          entry.tags.some((t) => t.toLowerCase().includes(q)) ||
          (entry.series?.toLowerCase().includes(q) ?? false) ||
          (entry.track?.toLowerCase().includes(q) ?? false);
        if (!matches) return false;
      }
      // Domains — OR semantics: entry must match at least one selected domain
      if (selectedDomains.size > 0) {
        if (!entry.domains.some((d) => selectedDomains.has(d))) return false;
      }
      // Format
      if (selectedFormats.size > 0 && !selectedFormats.has(entry.format)) return false;
      // Tags — OR semantics
      if (selectedTags.size > 0) {
        if (!entry.tags.some((t) => selectedTags.has(t))) return false;
      }
      // Series — exact match
      if (selectedSeries !== null && entry.series !== selectedSeries) return false;
      // Year
      if (selectedYears.size > 0 && !selectedYears.has(entry.year)) return false;

      return true;
    });
  }, [entries, searchQuery, selectedDomains, selectedFormats, selectedTags, selectedSeries, selectedYears]);

  // ─── Series summaries for FeaturedShelf ───────────────────────────────────
  const seriesSummaries = useMemo((): SeriesSummary[] => {
    const map = new Map<string, JournalEntry[]>();
    for (const entry of entries) {
      if (entry.series && entry.part != null) {
        const group = map.get(entry.series) ?? [];
        group.push(entry);
        map.set(entry.series, group);
      }
    }
    return [...map.entries()].map(([name, parts]) => {
      const sorted = [...parts].sort((a, b) => (a.part ?? 0) - (b.part ?? 0));
      return {
        name,
        tracks: [...new Set(parts.map((e) => e.track).filter(Boolean))] as string[],
        totalParts: parts.length,
        firstEntry: sorted[0],
        domains: [...new Set(parts.flatMap((e) => e.domains))],
      };
    });
  }, [entries]);

  // ─── Derived state ─────────────────────────────────────────────────────────
  const featuredEntries = entries.filter((e) => e.featured);

  const hasActiveFilters =
    selectedDomains.size > 0 ||
    selectedFormats.size > 0 ||
    selectedTags.size > 0 ||
    selectedSeries !== null ||
    selectedYears.size > 0;

  const showFeatured =
    (featuredEntries.length > 0 || seriesSummaries.length > 0) &&
    !searchQuery.trim() &&
    !hasActiveFilters;

  function clearAll() {
    setSelectedDomains(new Set());
    setSelectedFormats(new Set());
    setSelectedTags(new Set());
    setSelectedSeries(null);
    setSelectedYears(new Set());
  }

  // ─── Group entries into runs ───────────────────────────────────────────────
  // Build a list of display segments: each segment is either a standalone entry
  // or a series group (contiguous block of same-series articles).
  // When search/filter is active we skip grouping and render flat.
  type Segment =
    | { kind: "standalone"; entry: JournalEntry }
    | { kind: "series"; seriesName: string; entries: JournalEntry[] };

  const segments = useMemo((): Segment[] => {
    if (searchQuery.trim() || hasActiveFilters) {
      return filteredEntries.map((entry) => ({ kind: "standalone", entry }));
    }

    const result: Segment[] = [];
    const seriesMap = new Map<string, JournalEntry[]>();

    for (const entry of filteredEntries) {
      if (entry.series && entry.part != null) {
        const group = seriesMap.get(entry.series);
        if (group) {
          group.push(entry);
        } else {
          const newGroup = [entry];
          seriesMap.set(entry.series, newGroup);
          result.push({ kind: "series", seriesName: entry.series, entries: newGroup });
        }
      } else {
        result.push({ kind: "standalone", entry });
      }
    }

    return result;
  }, [filteredEntries, searchQuery, hasActiveFilters]);

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div
      data-header-theme="light"
      className="min-h-screen bg-[#F3F1EC] text-[#1a1a1a] selection:bg-black/10"
    >
      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <header className="border-b border-neutral-200 bg-white/50 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 pt-16 pb-12 md:px-12">
          <div className="space-y-4">
            <span className="block font-mono text-[10px] tracking-[0.25em] text-neutral-400 uppercase">
              PUBLIC_WRITING
            </span>
            <h1 className="text-4xl font-semibold tracking-tight text-black md:text-5xl lg:text-6xl">
              Journal
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-neutral-500">
              A living body of thought across systems, AI, ecology, and
              operational complexity. Research notes, essays, frameworks, and
              long-form analysis.
            </p>
          </div>

          {/* Search — inset inside header for prominence */}
          <div className="mt-6 max-w-2xl">
            <SearchBar query={searchQuery} onChange={setSearchQuery} />
          </div>
        </div>
      </header>

      {/* ── Body ────────────────────────────────────────────────────────── */}
      <main className="mx-auto max-w-7xl px-6 py-10 md:px-12">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">

          {/* ── Left Sidebar ──────────────────────────────────────────── */}
          <FilterSidebar
            allDomains={allDomains}
            allFormats={allFormats}
            allTags={allTags}
            allSeries={allSeries}
            allYears={allYears}
            selectedDomains={selectedDomains}
            selectedFormats={selectedFormats}
            selectedTags={selectedTags}
            selectedSeries={selectedSeries}
            selectedYears={selectedYears}
            onToggleDomain={(d) => setSelectedDomains(toggleSetItem(selectedDomains, d))}
            onToggleFormat={(f) => setSelectedFormats(toggleSetItem(selectedFormats, f))}
            onToggleTag={(t) => setSelectedTags(toggleSetItem(selectedTags, t))}
            onSetSeries={setSelectedSeries}
            onToggleYear={(y) => setSelectedYears(toggleSetItem(selectedYears, y))}
            onClearAll={clearAll}
            totalEntries={entries.length}
            filteredCount={filteredEntries.length}
          />

          {/* ── Feed Area ─────────────────────────────────────────────── */}
          <div className="min-w-0 flex-1">

            {/* Featured shelf — only visible when no search or filter active */}
            {showFeatured && (
              <FeaturedShelf entries={featuredEntries} series={seriesSummaries} />
            )}

            {/* Results metadata */}
            {(searchQuery.trim() || hasActiveFilters) && (
              <div className="mb-8">
                <p className="font-mono text-[10px] tracking-[0.2em] text-neutral-400 uppercase">
                  {filteredEntries.length === 0
                    ? "No results"
                    : filteredEntries.length === 1
                      ? "1 entry"
                      : `${filteredEntries.length} entries`}
                </p>
              </div>
            )}

            {/* Entry list — grouped when no active filters, flat otherwise */}
            {filteredEntries.length > 0 ? (
              <div>
                {segments.map((segment, _idx) =>
                  segment.kind === "standalone" ? (
                    <EntryRow key={segment.entry.slug} entry={segment.entry} />
                  ) : (
                    <div key={segment.seriesName}>
                      <SeriesGroupHeader
                        seriesName={segment.seriesName}
                        entries={segment.entries}
                      />
                      {segment.entries.map((entry) => (
                        <EntryRow key={entry.slug} entry={entry} />
                      ))}
                    </div>
                  )
                )}
              </div>
            ) : (
              <EmptyState
                searchQuery={searchQuery}
                hasActiveFilters={hasActiveFilters}
                onClearSearch={() => setSearchQuery("")}
                onClearFilters={clearAll}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
