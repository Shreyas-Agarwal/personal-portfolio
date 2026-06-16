import { Search, X } from "lucide-react";

interface SearchBarProps {
  query: string;
  onChange: (value: string) => void;
}

export function SearchBar({ query, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
        <Search className="h-4 w-4 text-neutral-400" />
      </div>
      <input
        id="journal-search"
        type="search"
        autoComplete="off"
        spellCheck={false}
        placeholder="Search by title, domain, format, or tag…"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full rounded-none border-0 border-b border-neutral-200
          bg-transparent py-4 pl-11 pr-10
          text-[15px] text-neutral-900 placeholder:text-neutral-400
          outline-none ring-0
          transition-colors
          focus:border-neutral-900
        "
      />
      {query && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute inset-y-0 right-0 flex items-center pr-4 text-neutral-400 transition-colors hover:text-neutral-900"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
