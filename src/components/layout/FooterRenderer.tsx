"use client";

import { usePathname } from "next/navigation";
import { DefaultFooter } from "./DefaultFooter";
import { HomeFooter } from "./HomeFooter";
import { PaperInsert } from "@/components/ui/PaperInsert";

export function FooterRenderer({ gitHubCommits }: { gitHubCommits: number }) {
  const pathname = usePathname();
  return pathname === "/" ? (
    <PaperInsert>
      <HomeFooter gitHubCommits={gitHubCommits} />
    </PaperInsert>
  ) : (
    <DefaultFooter />
  );
}
