import {
  consultingEngagements,
  engineeringEngagements,
  researchPrograms,
} from "@/data/works-programs";
import { plexMono, serif } from "@/lib/fonts";

interface WorksHeroProps {
  publicationCount: number;
}

export function WorksHero({ publicationCount }: WorksHeroProps) {
  const engagementCount = engineeringEngagements.length + consultingEngagements.length;

  return (
    <header className="space-y-6 border-b border-[#33373B] pb-12">
      <span className={`${plexMono.className} text-xs font-semibold tracking-widest text-[#DE4B31] uppercase`}>
        Bodies of Work
      </span>

      <h1
        className={`${serif.className} text-4xl sm:text-5xl lg:text-6xl font-normal text-[#ECE5D4] leading-[1.1] tracking-tight max-w-3xl`}
      >
        Research doesn&rsquo;t stop being research once it starts paying rent.
      </h1>

      <p className="text-lg text-[#A0A5AD] max-w-2xl leading-relaxed font-sans font-light">
        {researchPrograms.length} research programmes run alongside a production engineering
        practice — internal products and enterprise engagements built under real operational
        pressure. The publications below are where the thinking, in both directions, gets written
        down.
      </p>

      <div className={`${plexMono.className} text-xs text-[#8A8F99] uppercase tracking-wider`}>
        {researchPrograms.length} Research Programmes · {engagementCount} Professional Engagements
        · {publicationCount} Publications
      </div>
    </header>
  );
}
