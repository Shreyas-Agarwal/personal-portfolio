import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";

interface FilterSidebarProps {
  // Facet lists
  allDomains: string[];
  allFormats: string[];
  allTags: string[];
  allSeries: string[];
  allYears: string[];

  // Active filter state
  selectedDomains: Set<string>;
  selectedFormats: Set<string>;
  selectedTags: Set<string>;
  selectedSeries: string | null;
  selectedYears: Set<string>;

  // Setters
  onToggleDomain: (d: string) => void;
  onToggleFormat: (f: string) => void;
  onToggleTag: (t: string) => void;
  onSetSeries: (s: string | null) => void;
  onToggleYear: (y: string) => void;
  onClearAll: () => void;

  // Entry count (for display)
  totalEntries: number;
  filteredCount: number;
}

interface FilterChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

function FilterChip({ label, active, onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        inline-flex items-center gap-1.5 rounded-full border px-3 py-1
        text-[11px] font-medium tracking-wide transition-all duration-150
        ${
          active
            ? "border-neutral-900 bg-neutral-900 text-white"
            : "border-neutral-200 bg-transparent text-neutral-500 hover:border-neutral-400 hover:text-neutral-800"
        }
      `}
    >
      {label}
    </button>
  );
}

interface FilterSectionProps {
  title: string;
  items: string[];
  selected: Set<string>;
  onToggle: (item: string) => void;
}

function FilterSection({ title, items, selected, onToggle }: FilterSectionProps) {
  if (items.length === 0) return null;
  return (
    <div className="space-y-3">
      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
        {title}
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <FilterChip
            key={item}
            label={item}
            active={selected.has(item)}
            onClick={() => onToggle(item)}
          />
        ))}
      </div>
    </div>
  );
}

interface SeriesSectionProps {
  items: string[];
  selected: string | null;
  onSet: (s: string | null) => void;
}

function SeriesSection({ items, selected, onSet }: SeriesSectionProps) {
  if (items.length === 0) return null;
  return (
    <div className="space-y-3">
      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
        Series
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((s) => (
          <FilterChip
            key={s}
            label={s}
            active={selected === s}
            onClick={() => onSet(selected === s ? null : s)}
          />
        ))}
      </div>
    </div>
  );
}

interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  badge?: number;
}

function Collapsible({ title, children, defaultOpen = false, badge }: CollapsibleProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between py-2 text-left"
      >
        <span className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
          {title}
          {badge != null && badge > 0 && (
            <span className="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-neutral-900 px-1 text-[9px] font-bold text-white">
              {badge}
            </span>
          )}
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-neutral-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="mt-3 space-y-4">{children}</div>}
    </div>
  );
}

export function FilterSidebar({
  allDomains,
  allFormats,
  allTags,
  allSeries,
  allYears,
  selectedDomains,
  selectedFormats,
  selectedTags,
  selectedSeries,
  selectedYears,
  onToggleDomain,
  onToggleFormat,
  onToggleTag,
  onSetSeries,
  onToggleYear,
  onClearAll,
  totalEntries,
  filteredCount,
}: FilterSidebarProps) {
  const hasActiveFilters =
    selectedDomains.size > 0 ||
    selectedFormats.size > 0 ||
    selectedTags.size > 0 ||
    selectedSeries !== null ||
    selectedYears.size > 0;

  const moreFiltersCount =
    selectedTags.size + selectedYears.size + (selectedSeries ? 1 : 0);

  return (
    <aside className="w-full space-y-8 lg:w-64 lg:shrink-0">
      {/* Entry count */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-[0.2em] text-neutral-400">
          {filteredCount === totalEntries
            ? `${totalEntries} ENTRIES`
            : `${filteredCount} OF ${totalEntries}`}
        </span>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClearAll}
            className="flex items-center gap-1 text-[11px] text-neutral-400 transition-colors hover:text-neutral-900"
          >
            <X className="h-3 w-3" />
            Clear all
          </button>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-neutral-200" />

      {/* Domains */}
      <FilterSection
        title="Domain"
        items={allDomains}
        selected={selectedDomains}
        onToggle={onToggleDomain}
      />

      {/* Format */}
      <FilterSection
        title="Format"
        items={allFormats}
        selected={selectedFormats}
        onToggle={onToggleFormat}
      />

      {/* More Filters — collapsible */}
      {(allTags.length > 0 || allSeries.length > 0 || allYears.length > 0) && (
        <>
          <div className="border-t border-neutral-200" />
          <Collapsible
            title="More Filters"
            badge={moreFiltersCount}
          >
            {allSeries.length > 0 && (
              <SeriesSection
                items={allSeries}
                selected={selectedSeries}
                onSet={onSetSeries}
              />
            )}
            {allTags.length > 0 && (
              <FilterSection
                title="Tags"
                items={allTags}
                selected={selectedTags}
                onToggle={onToggleTag}
              />
            )}
            {allYears.length > 0 && (
              <FilterSection
                title="Year"
                items={allYears}
                selected={selectedYears}
                onToggle={onToggleYear}
              />
            )}
          </Collapsible>
        </>
      )}

      {/* Mobile filter icon slot */}
      <button
        type="button"
        className="lg:hidden flex items-center gap-2 text-[12px] font-medium text-neutral-500"
        aria-label="Open filters"
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filters
        {hasActiveFilters && (
          <span className="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-neutral-900 px-1 text-[9px] font-bold text-white">
            {selectedDomains.size +
              selectedFormats.size +
              moreFiltersCount}
          </span>
        )}
      </button>
    </aside>
  );
}
