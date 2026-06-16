import { JournalIndex } from "@/components/journal/JournalIndex";
import { getJournalEntries, getJournalFacets } from "@/lib/journal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Public writing on systems, architecture, AI, ecology, and operational thinking. Essays, research notes, analysis, and frameworks.",
  openGraph: {
    title: "Journal | Shreyas Agarwal",
    description:
      "A living body of thought across systems, AI, ecology, and operational complexity. Research notes, essays, frameworks, and long-form analysis.",
  },
};

export default function JournalIndexPage() {
  const entries = getJournalEntries();
  const facets = getJournalFacets(entries);

  return (
    <JournalIndex
      entries={entries}
      allDomains={facets.domains}
      allFormats={facets.formats}
      allTags={facets.tags}
      allSeries={facets.series}
      allYears={facets.years}
    />
  );
}
