import { ArrowUpRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { inter } from "@/lib/fonts";
import { RevisionLog } from "./RevisionLog";

/** Back on graphite after the closing paper insert — links, then the site's own log entry. */
export function HumanLayer() {
  return (
    <section data-header-theme="dark" className="relative bg-[#1B1D1F] px-6 py-20 md:px-12">
      <div className="mx-auto max-w-3xl text-center">
        <div className={`${inter.className} flex flex-wrap items-center justify-center gap-8`}>
          <Link
            href="mailto:shreyas.agarwal@etishub.com"
            className="group flex items-center gap-2 border border-[#E6E1D6]/15 px-6 py-3 text-sm font-medium text-[#E6E1D6]/85 transition-colors hover:border-[#E6E1D6]/30 hover:text-[#E6E1D6]"
          >
            Get in touch
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          <Link
            href="/about"
            className="group flex items-center gap-2 text-sm font-medium text-[#E6E1D6]/50 transition-colors hover:text-[#E6E1D6]/90"
          >
            The Human Layer
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Site-level freshness marker — a maintained notebook, not a static brochure */}
        <div className="mt-16 flex justify-center">
          <RevisionLog compact entries={[{ n: 1, date: "13 Jul 2026", description: "Site updated" }]} />
        </div>
      </div>
    </section>
  );
}
