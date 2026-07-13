import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { curatedSystems } from "@/data/homepage-v2/systems";
import { inter, plexMono, serif } from "@/lib/fonts";
import { RedPenNote } from "../../ui/RedPenNote";
import { RevisionLog } from "./RevisionLog";

const TRADEOFF_NOTE: Record<string, string> = {
  quant: "Chose fidelity over speed: full event replay costs runtime a vectorized backtest wouldn't.",
};

/**
 * Compact artifact entries — mono title, observational one-liner, a
 * compact revision-log row standing in for the metadata block. Curated
 * (2-3 entries), not exhaustive; the full catalogue lives at /systems.
 */
export function SelectedSystems() {
  return (
    <section data-header-theme="dark" className="relative bg-[#1B1D1F] px-6 py-20 md:px-12">
      <div className="mx-auto max-w-5xl">
        <span className={`${plexMono.className} mb-8 block text-[10px] tracking-[0.22em] text-[#E6E1D6]/25`}>
          SELECTED_SYSTEMS
        </span>

        <div className="mb-8">
          {curatedSystems.map((system) => (
            <Link
              key={system.id}
              href={system.href}
              className="group block border-t border-[#E6E1D6]/[0.08] py-5 leading-snug transition-colors first:border-t-0 hover:bg-[#E6E1D6]/[0.02]"
            >
              <span
                className={`${plexMono.className} mb-1.5 block text-[13px] tracking-tight text-[#E6E1D6]/95 transition-colors group-hover:text-[#E6E1D6]`}
              >
                {system.name}
              </span>
              <p className={`${serif.className} mb-2 max-w-2xl text-sm leading-snug text-[#E6E1D6]/75`}>
                {system.oneLiner}{" "}
                {TRADEOFF_NOTE[system.id] && (
                  <>
                    —{" "}
                    <RedPenNote type="Tradeoff" note={TRADEOFF_NOTE[system.id]}>
                      slower than a vectorized one
                    </RedPenNote>
                    .
                  </>
                )}
              </p>
              <RevisionLog
                compact
                entries={[
                  { n: 2, date: system.lastUpdated, description: system.status },
                ]}
              />
            </Link>
          ))}
        </div>

        <Link
          href="/systems"
          className={`${inter.className} group inline-flex items-center gap-2 text-sm font-medium text-[#E6E1D6]/50 transition-colors hover:text-[#E6E1D6]/90`}
        >
          View the full systems catalog
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </section>
  );
}
