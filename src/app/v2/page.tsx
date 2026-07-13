import type { Metadata } from "next";
import { ClosingQuote } from "@/components/sections/home-v2/ClosingQuote";
import { DraftingGrid } from "@/components/ui/DraftingGrid";
import { EditorialInterlude } from "@/components/sections/home-v2/EditorialInterlude";
import { EditorialObservations } from "@/components/sections/home-v2/EditorialObservations";
import { HeroV2 } from "@/components/sections/home-v2/HeroV2";
import { HumanLayer } from "@/components/sections/home-v2/HumanLayer";
import { InformationFlowFeature } from "@/components/sections/home-v2/InformationFlowFeature";
import { PaperInsert } from "@/components/ui/PaperInsert";
import { ResearchProgramme } from "@/components/sections/home-v2/ResearchProgramme";
import { SelectedSystems } from "@/components/sections/home-v2/SelectedSystems";
import { TransitIntelligenceFeature } from "@/components/sections/home-v2/TransitIntelligenceFeature";

export const metadata: Metadata = {
  title: "Home (v2 preview)",
  description:
    "Homepage redesign preview — a field notebook left open on an engineer's workstation: masthead, Transit Intelligence feature, research programme.",
};

export default function HomeV2() {
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
      <SelectedSystems />
      <ResearchProgramme />
      <EditorialObservations />
      <PaperInsert>
        <ClosingQuote />
      </PaperInsert>
      <HumanLayer />
    </div>
  );
}
