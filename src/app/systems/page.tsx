import type { Metadata } from "next";
import { SystemsHero } from "@/components/sections/systems/Hero";
import { SystemRegistry } from "@/components/sections/systems/SystemRegistry";

export const metadata: Metadata = {
  title: "Systems",
  description:
    "Engineering registry of architectural systems, integration patterns, and infrastructure artifacts built under real operational pressure.",
  openGraph: {
    title: "Systems | Shreyas Agarwal",
    description:
      "A catalog of architectural systems, integration patterns, and infrastructure artifacts — each representing a real design decision under operational constraint.",
  },
};

export default function SystemsPage() {
  return (
    <>
      <SystemsHero />
      <SystemRegistry />
    </>
  );
}
