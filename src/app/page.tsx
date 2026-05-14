import type { Metadata } from "next";
import { Hero } from "@/components/sections/home/Hero";
import { SystemEvolutionPreview } from "@/components/sections/home/SystemEvolution";
import { SelectedWorkSection } from "@/components/sections/home/SelectedWork";
import { OperationalIntelligenceSection } from "@/components/sections/home/OperationalIntelligence";
import { NotesAndClosureSection } from "@/components/sections/home/NotesAndClosure";

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
    <>
      <Hero />
      <SystemEvolutionPreview />
      <SelectedWorkSection />
      <OperationalIntelligenceSection />
      <NotesAndClosureSection />
    </>
  );
}
