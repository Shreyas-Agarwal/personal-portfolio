import type { JournalEntry } from "./journal";

// ─────────────────────────────────────────────────────────────────────────────
// Related articles algorithm
//
// For articles that belong to a series with a global `part` number, we always
// include the immediately adjacent parts first (prev + next within the series),
// then fill remaining slots with score-based suggestions.
//
// Scoring (for non-adjacent candidates):
//   +3 per shared domain
//   +2 if same series (same track)
//   +1 if same series (different track, i.e. the companion track)
//   +1 per shared tag
//
// Minimum score > 0 required to appear. Sorted descending by score.
// ─────────────────────────────────────────────────────────────────────────────

export function getRelatedEntries(
  current: JournalEntry,
  all: JournalEntry[],
  limit = 4,
): JournalEntry[] {
  const pinned: JournalEntry[] = [];

  // ─────────────────────────────────────────────────────────────────────────────
  if (current.series && current.part != null) {
    const seriesEntries = all
      .filter((e) => e.series === current.series && e.part != null && e.slug !== current.slug)
      .sort((a, b) => (a.part ?? 0) - (b.part ?? 0));

    const prevPart = seriesEntries.filter((e) => (e.part ?? 0) < current.part!).at(-1);
    const nextPart = seriesEntries.filter((e) => (e.part ?? 0) > current.part!).at(0);

    if (prevPart) pinned.push(prevPart);
    if (nextPart) pinned.push(nextPart);
  }

  const pinnedSlugs = new Set(pinned.map((e) => e.slug));
  const remaining = limit - pinned.length;

  if (remaining <= 0) return pinned.slice(0, limit);

  // ─────────────────────────────────────────────────────────────────────────────
  const scored = all
    .filter((e) => e.slug !== current.slug && !pinnedSlugs.has(e.slug))
    .map((entry) => {
      let score = 0;

      // Shared domains
      for (const domain of current.domains) {
        if (entry.domains.includes(domain)) score += 3;
      }

      // Same series — same track = stronger signal, different track = weaker
      if (current.series && entry.series === current.series) {
        score += entry.track === current.track ? 2 : 1;
      }

      // Shared tags
      for (const tag of current.tags) {
        if (entry.tags.includes(tag)) score += 1;
      }

      return { entry, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  const suggestions = scored.slice(0, remaining).map(({ entry }) => entry);
  return [...pinned, ...suggestions];
}
