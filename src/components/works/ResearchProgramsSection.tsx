import Link from "next/link";
import { researchPrograms } from "@/data/works-programs";
import { plexMono, serif } from "@/lib/fonts";

const NUMERALS = ["I", "II", "III", "IV"];

export function ResearchProgramsSection() {
  return (
    <section className="space-y-14">
      <div className="flex items-baseline justify-between border-b border-[#33373B] pb-4">
        <span className={`${plexMono.className} text-xs font-semibold tracking-widest text-[#DE4B31] uppercase`}>
          Research Programs
        </span>
        <span className={`${plexMono.className} text-xs text-[#8A8F99]`}>
          {researchPrograms.length} Programmes
        </span>
      </div>

      <div className="space-y-20">
        {researchPrograms.map((program, i) => (
          <article
            key={program.id}
            className="grid gap-x-10 gap-y-8 md:grid-cols-[minmax(0,180px)_1fr] border-t border-[#33373B] pt-14 first:border-t-0 first:pt-0"
          >
            <div className="space-y-5">
              <span className={`${serif.className} block text-6xl italic text-[#ECE5D4]/10 leading-none`}>
                {NUMERALS[i] ?? String(i + 1)}
              </span>
              <dl className={`${plexMono.className} space-y-3 text-[10px] uppercase tracking-wider text-[#8A8F99]`}>
                <div>
                  <dt className="text-[#8A8F99]/70">Status</dt>
                  <dd className="text-[#A0A5AD] mt-0.5">{program.status}</dd>
                </div>
                {program.duration && (
                  <div>
                    <dt className="text-[#8A8F99]/70">Duration</dt>
                    <dd className="text-[#A0A5AD] mt-0.5">{program.duration}</dd>
                  </div>
                )}
              </dl>
            </div>

            <div className="space-y-6">
              <h3 className={`${serif.className} text-3xl sm:text-4xl text-[#ECE5D4] leading-snug font-normal`}>
                {program.name}
              </h3>

              <p className="text-base text-[#A0A5AD] leading-relaxed font-sans font-light max-w-2xl">
                {program.abstract}
              </p>

              {program.labs && program.labs.length > 0 && (
                <div className="space-y-4 border-l border-[#33373B] pl-6 max-w-2xl">
                  {program.labs.map((lab) => (
                    <div key={lab.name} className="space-y-1">
                      <h4 className={`${serif.className} text-lg text-[#ECE5D4]/80`}>{lab.name}</h4>
                      <p className="text-sm text-[#8A8F99] leading-relaxed font-sans font-light">
                        {lab.context}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                {program.domains.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5">
                    {program.domains.map((domain) => (
                      <span
                        key={domain}
                        className={`${plexMono.className} text-[10px] px-2 py-0.5 bg-[#24272A] border border-[#33373B] text-[#8A8F99] rounded-xs`}
                      >
                        {domain}
                      </span>
                    ))}
                  </div>
                )}

                {program.relatedTo && program.relatedTo.length > 0 && (
                  <div className={`${plexMono.className} text-[10px] text-[#8A8F99]/80 uppercase tracking-wider`}>
                    Connects to {program.relatedTo.join(" · ")}
                  </div>
                )}
              </div>

              {program.href && (
                <Link
                  href={program.href}
                  className={`${plexMono.className} inline-flex items-center gap-1.5 text-xs text-[#DE4B31] font-medium uppercase tracking-wider hover:gap-2.5 transition-all`}
                >
                  Read More <span>→</span>
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
