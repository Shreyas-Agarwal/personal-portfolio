"use client";

import { usePathname } from "next/navigation";
import { PaperInsert } from "@/components/ui/PaperInsert";
import { DefaultFooter } from "./DefaultFooter";
import { HomeFooter } from "./HomeFooter";

export function FooterRenderer({ gitHubCommits }: { gitHubCommits: number }) {
  const pathname = usePathname();
  return (
    <div className="print:hidden">
      {pathname === "/" ? (
        <PaperInsert>
          <HomeFooter gitHubCommits={gitHubCommits} />
        </PaperInsert>
      ) : (
        <DefaultFooter />
      )}
    </div>
  );
}
