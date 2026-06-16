import type { JournalEntry } from "./journal";

// ─────────────────────────────────────────────────────────────────────────────
// Related articles algorithm
//
// Scoring:
//   +3 per shared domain
//   +2 if same series
//   +1 per shared tag
//
// Minimum score > 0 required to appear. Sorted descending by score.
// ─────────────────────────────────────────────────────────────────────────────

export function getRelatedEntries(
  current: JournalEntry,
  all: JournalEntry[],
  limit = 4,
): JournalEntry[] {
  const scored = all
    .filter((e) => e.slug !== current.slug)
    .map((entry) => {
      let score = 0;

      // Shared domains
      for (const domain of current.domains) {
        if (entry.domains.includes(domain)) score += 3;
      }

      // Same series
      if (current.series && entry.series === current.series) score += 2;

      // Shared tags
      for (const tag of current.tags) {
        if (entry.tags.includes(tag)) score += 1;
      }

      return { entry, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map(({ entry }) => entry);
}
