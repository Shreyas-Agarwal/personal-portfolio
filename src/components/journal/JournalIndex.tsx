"use client";

import type { JournalEntry } from "@/lib/journal";
import { useMemo, useState } from "react";
import { EmptyState } from "./EmptyState";
import { EntryRow } from "./EntryRow";
import { FeaturedShelf } from "./FeaturedShelf";
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
          (entry.series?.toLowerCase().includes(q) ?? false);
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

  // ─── Derived state ─────────────────────────────────────────────────────────
  const featuredEntries = entries.filter((e) => e.featured);

  const hasActiveFilters =
    selectedDomains.size > 0 ||
    selectedFormats.size > 0 ||
    selectedTags.size > 0 ||
    selectedSeries !== null ||
    selectedYears.size > 0;

  const showFeatured =
    featuredEntries.length > 0 &&
    !searchQuery.trim() &&
    !hasActiveFilters;

  function clearAll() {
    setSelectedDomains(new Set());
    setSelectedFormats(new Set());
    setSelectedTags(new Set());
    setSelectedSeries(null);
    setSelectedYears(new Set());
  }

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div
      data-header-theme="light"
      className="min-h-screen bg-[#F3F1EC] text-[#1a1a1a] selection:bg-black/10"
    >
      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <header className="border-b border-neutral-200 bg-white/50 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12">
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
          <div className="mt-10 max-w-2xl">
            <SearchBar query={searchQuery} onChange={setSearchQuery} />
          </div>
        </div>
      </header>

      {/* ── Body ────────────────────────────────────────────────────────── */}
      <main className="mx-auto max-w-7xl px-6 py-16 md:px-12">
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
              <FeaturedShelf entries={featuredEntries} />
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

            {/* Entry list */}
            {filteredEntries.length > 0 ? (
              <div>
                {filteredEntries.map((entry) => (
                  <EntryRow key={entry.slug} entry={entry} />
                ))}
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
