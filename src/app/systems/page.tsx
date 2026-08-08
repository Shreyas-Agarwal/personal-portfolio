import type { Metadata } from "next";
import { ConceptExplorerPlaceholder } from "@/components/sections/systems/ConceptExplorerPlaceholder";
import { ConceptualLayers } from "@/components/sections/systems/ConceptualLayers";
import { FoundationalConcepts } from "@/components/sections/systems/FoundationalConcepts";
import { SystemsHero } from "@/components/sections/systems/Hero";
import { WorksRelationship } from "@/components/sections/systems/WorksRelationship";
import { DraftingGrid } from "@/components/ui/DraftingGrid";

export const metadata: Metadata = {
  title: "Foundations of Information Systems | Shreyas Agarwal",
  description:
    "The theoretical monograph and information dynamics underlying every architecture, research paper, and engineering implementation in this archive.",
  openGraph: {
    title: "Foundations of Information Systems | Shreyas Agarwal",
    description:
      "The physics of information systems: canonical information flow, foundational concepts, conceptual layers, and theoretical framework.",
  },
};

export default function SystemsPage() {
  return (
    <div className="relative bg-[#1B1D1F]">
      <DraftingGrid />
      <SystemsHero />
      <FoundationalConcepts />
      <ConceptualLayers />
      <WorksRelationship />
      <ConceptExplorerPlaceholder />
    </div>
  );
}
