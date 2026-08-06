import Link from "next/link";
import { plexMono, serif } from "@/lib/fonts";

interface LibraryTeaserProps {
  publicationCount: number;
}

const CATEGORIES = ["Essays", "Research Notes", "Architecture Notes"];

export function LibraryTeaser({ publicationCount }: LibraryTeaserProps) {
  return (
    <section className="border border-[#33373B] bg-[#24272A] rounded-sm p-8 sm:p-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="space-y-3">
          <span className={`${plexMono.className} text-xs font-semibold tracking-widest text-[#8A8F99] uppercase`}>
            Engineering Library
          </span>
          <h3 className={`${serif.className} text-2xl text-[#ECE5D4]`}>
            {publicationCount} Publications
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((category) => (
              <span
                key={category}
                className={`${plexMono.className} text-[10px] px-2 py-0.5 bg-[#1B1D1F] border border-[#33373B] text-[#8A8F99] rounded-xs`}
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        <Link
          href="/works/publications"
          className={`${plexMono.className} inline-flex items-center gap-1.5 text-xs text-[#DE4B31] font-medium uppercase tracking-wider hover:gap-2.5 transition-all shrink-0`}
        >
          Enter Library <span>→</span>
        </Link>
      </div>
    </section>
  );
}
