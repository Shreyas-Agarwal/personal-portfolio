import { consultingEngagements, engineeringEngagements } from "@/data/works-programs";
import { plexMono, serif } from "@/lib/fonts";

export function ProfessionalEngineeringSection() {
  return (
    <section className="space-y-10">
      <div className="flex items-baseline justify-between border-b border-[#33373B] pb-4">
        <span className={`${plexMono.className} text-xs font-semibold tracking-widest text-[#DE4B31] uppercase`}>
          Professional Engineering
        </span>
        <span className={`${plexMono.className} text-xs text-[#8A8F99]`}>
          {engineeringEngagements.length + consultingEngagements.length} Engagements
        </span>
      </div>

      <div className="space-y-3">
        <span className={`${plexMono.className} text-[10px] font-semibold tracking-widest text-[#8A8F99] uppercase`}>
          Engineering
        </span>
        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {engineeringEngagements.map((engagement) => (
            <div key={engagement.id} className="border-t border-[#33373B] pt-6 space-y-3">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className={`${serif.className} text-xl text-[#ECE5D4]`}>{engagement.name}</h3>
                {engagement.status && (
                  <span
                    className={`${plexMono.className} text-[10px] text-[#8A8F99] uppercase tracking-wider shrink-0`}
                  >
                    {engagement.status}
                  </span>
                )}
              </div>
              <p className="text-sm text-[#A0A5AD] leading-relaxed font-sans font-light">
                {engagement.abstract}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className={`${plexMono.className} text-[10px] text-[#8A8F99] uppercase tracking-wider`}>
                  {engagement.domain}
                </span>
                {engagement.relatedTo && engagement.relatedTo.length > 0 && (
                  <span className={`${plexMono.className} text-[10px] text-[#8A8F99]/70 uppercase tracking-wider`}>
                    Connects to {engagement.relatedTo.join(" · ")}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3 pt-4">
        <span className={`${plexMono.className} text-[10px] font-semibold tracking-widest text-[#8A8F99] uppercase`}>
          Consulting
        </span>
        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {consultingEngagements.map((engagement) => (
            <div key={engagement.id} className="border-t border-[#33373B] pt-6 space-y-3">
              <h3 className={`${serif.className} text-xl text-[#ECE5D4]`}>{engagement.name}</h3>
              <p className="text-sm text-[#A0A5AD] leading-relaxed font-sans font-light">
                {engagement.abstract}
              </p>
              <span className={`${plexMono.className} text-[10px] text-[#8A8F99] uppercase tracking-wider`}>
                {engagement.domain}
              </span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-[#8A8F99]/80 italic font-sans font-light pt-2">
        Client names and internal architecture are withheld by agreement — these are described by
        function, not implementation.
      </p>
    </section>
  );
}
