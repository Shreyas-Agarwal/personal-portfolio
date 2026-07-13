import { plexMono } from "@/lib/fonts";

export interface RevisionEntry {
  n: number;
  date: string;
  description: string;
}

interface RevisionLogProps {
  entries: RevisionEntry[];
  compact?: boolean;
}

/**
 * Where temporal signals actually live: `r{n} · {date} · {description}`,
 * most recent first — a maintained log, not a prose sentence or a generic
 * metadata line. Caller supplies entries already ordered most-recent-first.
 */
export function RevisionLog({ entries, compact = false }: RevisionLogProps) {
  return (
    <div className={`${plexMono.className} space-y-1`}>
      {entries.map((entry) => (
        <div
          key={entry.n}
          className={`flex flex-wrap gap-2 tracking-tight text-[#E6E1D6]/45 ${
            compact ? "text-[10px]" : "text-[11px]"
          }`}
        >
          <span>r{entry.n}</span>
          <span aria-hidden="true">·</span>
          <span>{entry.date}</span>
          <span aria-hidden="true">·</span>
          <span>{entry.description}</span>
        </div>
      ))}
    </div>
  );
}
