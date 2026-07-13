import { serif } from "@/lib/fonts";
import { FigureOneFlow } from "./FigureOneFlow";

/**
 * The diagram half of the "Data was never the destination" moment — that
 * paragraph (in the PaperInsert just above) is this figure's caption. Same
 * cream paper surface as EditorialInterlude, its own section, full column
 * width — not a caption-and-figure block squeezed onto the paper sheet.
 */
export function InformationFlowFeature() {
  return (
    <section data-header-theme="light" className="relative mt-4">
      <div>
        <FigureOneFlow />
      </div>
    </section>
  );
}
