import type { Metadata } from "next";
import { ComplexityCoordinationSection } from "@/components/sections/systems/Complexity";
import { SystemsHero } from "@/components/sections/systems/Hero";
import { OperationalArtefactsSection } from "@/components/sections/systems/OperationalArtefacts";
import { OperationalObservationsSection } from "@/components/sections/systems/OperationalObservations";

export const metadata: Metadata = {
  title: "Systems Architecture",
  description:
    "Explore technical architectures, complexity coordination, and operational artifacts from real-world deployments.",
  openGraph: {
    title: "Systems Architecture | Shreyas Agarwal",
    description:
      "Explore technical architectures, complexity coordination, and operational artifacts from real-world deployments.",
  },
};

export default function Home() {
  return (
    <>
      <SystemsHero />
      <ComplexityCoordinationSection />
      <OperationalArtefactsSection />
      <OperationalObservationsSection />
    </>
  );
}
