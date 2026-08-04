import type { Metadata } from "next";
import { ClosingQuote } from "@/components/sections/home-v2/ClosingQuote";
import { ConvergentSystemsBridge } from "@/components/sections/home-v2/ConvergentSystemsBridge";
import { EditorialInterlude } from "@/components/sections/home-v2/EditorialInterlude";
import { HeroV2 } from "@/components/sections/home-v2/HeroV2";
import { InformationFlowFeature } from "@/components/sections/home-v2/InformationFlowFeature";
import { ResearchProgramme } from "@/components/sections/home-v2/ResearchProgramme";
import { TransitIntelligenceFeature } from "@/components/sections/home-v2/TransitIntelligenceFeature";
import { DraftingGrid } from "@/components/ui/DraftingGrid";
import { PaperInsert } from "@/components/ui/PaperInsert";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Product and Data Engineer building decision engines, automation pipelines, and platforms that keep operating under real-world constraints.",
  openGraph: {
    title: "Home | Shreyas Agarwal",
    description:
      "Decision engines, data pipelines, AEC platforms. Case studies, simulations, and research.",
  },
};

export default function Home() {
  return (
    <div className="relative">
      <DraftingGrid />
      <HeroV2 />
      <PaperInsert>
        <EditorialInterlude
          eyebrow="EDITORIAL"
          headline="Data was never the destination."
          body="It's the thing everything else has to move through — schedules, transactions, telemetry, conversation. Most of what I build exists to keep that movement honest: to notice the moment reality and the record of reality stop agreeing with each other."
        />
        <InformationFlowFeature />
      </PaperInsert>
      <TransitIntelligenceFeature />
      <ResearchProgramme />

      {/* Editorial bridge leading into the upcoming Biology/Ecology section */}
      <PaperInsert>
        <ConvergentSystemsBridge />
      </PaperInsert>

      <PaperInsert>
        <ClosingQuote />
      </PaperInsert>
    </div>
  );
}
