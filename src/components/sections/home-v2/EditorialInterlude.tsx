import { plexMono, serif } from "@/lib/fonts";

interface EditorialInterludeProps {
  eyebrow: string;
  headline: string;
  body: string;
}

/**
 * The prose content of a paper insert — rendered on cream, ink-dark text.
 * Rendered inside <PaperInsert>, which owns the scroll-triggered entrance
 * and the surface itself.
 */
export function EditorialInterlude({ eyebrow, headline, body }: EditorialInterludeProps) {
  return (
    <div>
      <span className={`${plexMono.className} mb-6 block text-[10px] tracking-[0.22em] text-[#1B1D1F]/40`}>
        {eyebrow}
      </span>
      <h2 className={`${serif.className} mb-8 text-[2rem] italic leading-[1.2] text-[#1B1D1F]/90 md:text-[2.6rem]`}>
        {headline}
      </h2>
      <p className={`${serif.className} max-w-xl text-base leading-relaxed text-[#1B1D1F]/65`}>
        {body}
      </p>
    </div>
  );
}
