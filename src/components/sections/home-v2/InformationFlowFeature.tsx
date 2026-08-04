import { plexMono, serif } from "@/lib/fonts";
import { FigureOneFlow } from "./FigureOneFlow";

/**
 * The diagram half of the "Data was never the destination" moment — that
 * paragraph (in the PaperInsert just above) is this figure's caption. Same
 * cream paper surface as EditorialInterlude, its own section, full column
 * width — not a caption-and-figure block squeezed onto the paper sheet.
 */
export function InformationFlowFeature() {
  return (
    <section data-header-theme="light" className="relative mt-16 flex flex-col gap-12 md:gap-16">
      {/* Figure Annotation (Header) */}
      <div className="border-t border-[#1B1D1F]/10 pt-12">
        <div
          className={`${plexMono.className} text-[10px] tracking-[0.22em] text-[#1B1D1F]/50 uppercase mb-2`}
        >
          FIGURE 01
        </div>
        <div
          className={`${plexMono.className} text-xs font-medium tracking-[0.15em] text-[#1B1D1F]/80 uppercase mb-4`}
        >
          INFORMATION FLOW
        </div>
        <p
          className={`${serif.className} text-lg md:text-xl italic leading-relaxed text-[#1B1D1F]/75 max-w-xl`}
        >
          An operational system is rarely constrained by computation alone.
          <br className="hidden md:inline" /> It is constrained by the movement of information
          between independent representations of reality.
        </p>
      </div>

      {/* The Animation */}
      <div className="w-full">
        <FigureOneFlow />
      </div>

      {/* Reflective Copy Below */}
      <div className="border-t border-[#1B1D1F]/10 pt-12 md:pt-16 max-w-xl">
        <h3
          className={`${serif.className} mb-8 text-[2rem] italic leading-[1.2] text-[#1B1D1F]/90 md:text-[2.6rem]`}
        >
          The question isn’t where computation happens.
          <br />
          It’s where meaning becomes stable.
        </h3>

        <div className={`${serif.className} text-base leading-relaxed text-[#1B1D1F]/65 space-y-6`}>
          <p>
            Once meaning becomes unstable, every downstream layer - APIs, workflows, storage
            engines, dashboards, reports, and eventually human decisions - starts compensating for
            ambiguity that should never have existed.
          </p>
          <p>
            Stable systems emerge when modelling happens first at the data and semantic layer.
            Infrastructure is then free to evolve around that meaning instead of quietly redefining
            it.
          </p>
          <p>
            That idea sits underneath every system documented in this journal. Transit Intelligence
            is simply the first place where those ideas are explored at operational scale.
          </p>
        </div>
      </div>
    </section>
  );
}
