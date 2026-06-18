import type { Metadata } from "next";
import { AboutHero } from "@/components/sections/about/Hero";
import { PersonalFragmentsSection } from "@/components/sections/about/PersonalFragments";
import { ConfluenceSection } from "@/components/sections/about/Confluence";
import { ConclusionSection } from "@/components/sections/about/Conclusion";

export const metadata: Metadata = {
  title: "About",
  description:
    "The human layer behind the systems. Personal fragments, philosophies, and operational context.",
  openGraph: {
    title: "About | Shreyas Agarwal",
    description:
      "The human layer behind the systems. Personal fragments, philosophies, and operational context.",
  },
};

export default function Home() {
  return (
    <>
      <AboutHero />
      <PersonalFragmentsSection />
      <ConfluenceSection />
      <ConclusionSection />
    </>
  );
}


