import { plexMono, serif } from "@/lib/fonts";
import { AnnotatedTerm } from "../../ui/AnnotatedTerm";
import { FlowDiagram } from "./FlowDiagram";
import { RedPenNote } from "../../ui/RedPenNote";

/** The page's one "index of ideas" moment — relocated from the original Hero. */
export function EditorialObservations() {
  return (
    <section data-header-theme="dark" className="relative bg-[#1B1D1F] px-6 py-20 md:px-12">
      <div className="mx-auto max-w-5xl">
        <span className={`${plexMono.className} mb-12 block text-[10px] tracking-[0.22em] text-[#E6E1D6]/25`}>
          EDITORIAL_OBSERVATIONS
        </span>

        <div className="flex flex-col gap-16">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[120px_1fr_240px]">
            <div className={`${plexMono.className} text-[10px] tracking-widest text-[#E6E1D6]/25`}>
              INDEX_01
            </div>
            <div className="max-w-xl">
              <h3 className={`${serif.className} mb-3 text-lg text-[#E6E1D6]/90`}>Data Heritage</h3>
              <p className={`${serif.className} text-sm leading-relaxed text-[#E6E1D6]/70`}>
                Systems inherit the latent assumptions of their data models. Technical debt is
                often simply{" "}
                <RedPenNote
                  type="Unresolved"
                  note="No clean migration path has emerged for retrofitting heritage assumptions without a full rewrite."
                >
                  structural regret
                </RedPenNote>
                .
              </p>
            </div>
            <div className="hidden md:block text-right">
              <span className={`${plexMono.className} text-[9px] uppercase tracking-[0.2em] text-[#E6E1D6]/25 border border-[#E6E1D6]/10 px-2 py-1`}>
                CORE_PRINCIPLE
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-[120px_1fr_240px]">
            <div className={`${plexMono.className} text-[10px] tracking-widest text-[#E6E1D6]/25`}>
              INDEX_02
            </div>
            <div className="max-w-xl">
              <h3 className={`${serif.className} mb-3 text-lg text-[#E6E1D6]/90`}>Flow Emergence</h3>
              <p className={`${serif.className} mb-4 text-sm leading-relaxed text-[#E6E1D6]/70`}>
                Architecture is the natural response to information movement and operational
                pressure.
              </p>
              <FlowDiagram steps={[{ label: "Pressure", shape: "square" }, { label: "Flow", shape: "circle" }, { label: "Structure", shape: "diamond" }]} />
            </div>
            <div className="hidden md:block text-right">
              <span className={`${plexMono.className} text-[9px] uppercase tracking-[0.2em] text-[#E6E1D6]/25 border border-[#E6E1D6]/10 px-2 py-1`}>
                OPERATIONAL_LOGIC
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-[120px_1fr_240px]">
            <div className={`${plexMono.className} text-[10px] tracking-widest text-[#E6E1D6]/25`}>
              INDEX_03
            </div>
            <div className="max-w-xl">
              <h3 className={`${serif.className} mb-3 text-lg text-[#E6E1D6]/90`}>
                <AnnotatedTerm note="Eventually every distributed system rediscovers this.">
                  State Fracture
                </AnnotatedTerm>
              </h3>
              <p className={`${serif.className} text-sm leading-relaxed text-[#E6E1D6]/70`}>
                Failures propagate through broken state coordination and{" "}
                <RedPenNote
                  type="Open question"
                  note="Is this failure mode addressable at the schema level, or only operationally, through retries and reconciliation?"
                >
                  isolated memory boundaries
                </RedPenNote>
                .
              </p>
            </div>
            <div className="hidden md:block text-right">
              <span className={`${plexMono.className} text-[9px] uppercase tracking-[0.2em] text-[#E6E1D6]/25 border border-[#E6E1D6]/10 px-2 py-1`}>
                SCALE_OBSERVATION
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
