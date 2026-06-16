import { Search, X } from "lucide-react";

interface EmptyStateProps {
  searchQuery: string;
  hasActiveFilters: boolean;
  onClearSearch: () => void;
  onClearFilters: () => void;
}

export function EmptyState({
  searchQuery,
  hasActiveFilters,
  onClearSearch,
  onClearFilters,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100">
        <Search className="h-6 w-6 text-neutral-400" />
      </div>

      {searchQuery ? (
        <>
          <p className="text-[15px] font-medium text-neutral-700">
            No entries match &ldquo;{searchQuery}&rdquo;
          </p>
          <p className="mt-1 text-[13px] text-neutral-400">
            Try different keywords, or browse by domain and format.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onClearSearch}
              className="flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-[12px] font-medium text-neutral-600 transition-colors hover:border-neutral-400 hover:text-neutral-900"
            >
              <X className="h-3.5 w-3.5" />
              Clear search
            </button>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={onClearFilters}
                className="flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-[12px] font-medium text-neutral-600 transition-colors hover:border-neutral-400 hover:text-neutral-900"
              >
                Clear filters too
              </button>
            )}
          </div>
        </>
      ) : hasActiveFilters ? (
        <>
          <p className="text-[15px] font-medium text-neutral-700">
            No entries match your current filters
          </p>
          <p className="mt-1 text-[13px] text-neutral-400">
            Try removing some filters to broaden the results.
          </p>
          <button
            type="button"
            onClick={onClearFilters}
            className="mt-6 flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-[12px] font-medium text-neutral-600 transition-colors hover:border-neutral-400 hover:text-neutral-900"
          >
            <X className="h-3.5 w-3.5" />
            Clear all filters
          </button>
        </>
      ) : (
        <p className="text-[15px] text-neutral-400">No journal entries yet.</p>
      )}
    </div>
  );
}
