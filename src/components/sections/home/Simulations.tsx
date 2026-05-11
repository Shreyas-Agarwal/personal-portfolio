import { SectionHeader } from "@/components/layout/SectionHeader";
import { DecisionEngineSim } from "@/components/sims/DecisionEngineSim";
import { PipelineFlow } from "@/components/sims/PipelineFlow";
import { WorkflowGraph } from "@/components/sims/WorkflowGraph";

export function Simulations() {
  return (
    <section id="simulations" className="border-b border-border">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 md:py-32">
        <SectionHeader label="Interactive" title="System Simulations" />
        <p className="mb-12 max-w-2xl text-sm text-muted-foreground md:text-base">
          Interactive sketches of the kinds of systems I design — state machines, workflow graphs,
          and data pipelines. Simplified, but the mechanics are real.
        </p>
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="lg:col-span-2">
            <DecisionEngineSim />
          </div>
          <WorkflowGraph />
          <PipelineFlow />
        </div>
      </div>
    </section>
  );
}
