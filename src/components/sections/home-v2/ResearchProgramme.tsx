import { loadPublicationDocument } from "@/lib/publication/loader";
import { ResearchProgrammeClient, type SelectedWork } from "./ResearchProgrammeClient";

const PUBLICATION_ID = "architecture-of-information-systems";

const PICKS = [
  { part: 1, slugPath: ["data", "oltp-vs-olap"] },
  { part: 2, slugPath: ["infrastructure", "application-is-not-system"] },
];

export async function ResearchProgramme() {
  const essays: SelectedWork[] = await Promise.all(
    PICKS.map(async ({ part, slugPath }) => {
      const doc = await loadPublicationDocument(PUBLICATION_ID, slugPath);
      return {
        slug: `${PUBLICATION_ID}/${slugPath.join("/")}`,
        title: (doc.frontmatter.title as string | undefined) ?? doc.current.title,
        part,
        readingTime: doc.manifest.readingTime ?? "",
      };
    }),
  );

  return <ResearchProgrammeClient essays={essays} />;
}
