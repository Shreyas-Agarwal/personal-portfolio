import type { Metadata } from "next";
import { PublicationsLibrary } from "@/components/publications/PublicationsLibrary";
import { getAllPublications } from "@/lib/publication/loader";

export const metadata: Metadata = {
  title: "Publications",
  description:
    "Engineering case studies, technical specifications, and research notes on data systems, local-first computing, and architecture.",
  openGraph: {
    title: "Publications | Shreyas Agarwal",
    description: "Case studies, technical specifications, and architectural essays.",
  },
};

export default function PublicationsPage() {
  const publications = getAllPublications();

  return <PublicationsLibrary publications={publications} />;
}
