import { getJournalEntries } from "@/lib/journal";
import { ResearchProgrammeClient } from "./ResearchProgrammeClient";

export function ResearchProgramme() {
  const essays = getJournalEntries()
    .filter((entry) => entry.series === "Architecture of Information Systems")
    .sort((a, b) => (a.part ?? 0) - (b.part ?? 0))
    .slice(0, 2);

  return <ResearchProgrammeClient essays={essays} />;
}
