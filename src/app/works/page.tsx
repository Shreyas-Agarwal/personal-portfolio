import type { Metadata } from "next";
import { DraftingGrid } from "@/components/ui/DraftingGrid";
import { Reveal } from "@/components/ui/Reveal";
import { LibraryTeaser } from "@/components/works/LibraryTeaser";
import { ProfessionalEngineeringSection } from "@/components/works/ProfessionalEngineeringSection";
import { ResearchProgramsSection } from "@/components/works/ResearchProgramsSection";
import { WorksHero } from "@/components/works/WorksHero";
import { getAllPublications } from "@/lib/publication/loader";

export const metadata: Metadata = {
  title: "Works",
  description:
    "Research programmes, production engineering, and the publications that connect them.",
  openGraph: {
    title: "Works | Shreyas Agarwal",
    description:
      "Two research programmes, a production engineering practice, and an engineering library — the bodies of work behind the case studies.",
  },
};

export default function WorksPage() {
  const publicationCount = getAllPublications().length;

  return (
    <main className="min-h-screen bg-[#1B1D1F] text-[#ECE5D4] relative py-20 px-6 sm:px-12 lg:px-24 overflow-hidden">
      <DraftingGrid />

      <div className="max-w-6xl mx-auto relative z-10 space-y-24">
        <WorksHero publicationCount={publicationCount} />

        <Reveal>
          <ResearchProgramsSection />
        </Reveal>

        <Reveal>
          <ProfessionalEngineeringSection />
        </Reveal>

        <Reveal>
          <LibraryTeaser publicationCount={publicationCount} />
        </Reveal>
      </div>
    </main>
  );
}
