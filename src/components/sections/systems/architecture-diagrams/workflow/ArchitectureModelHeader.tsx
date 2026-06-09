"use client";

export function ArchitectureModelHeader() {
  return (
    <div className="mb-24 grid gap-12 md:grid-cols-[1.1fr_0.9fr]">
      <div className="max-w-4xl">
        <span className="mb-5 block font-mono text-[10px] tracking-[0.22em] text-white/25">
          TECHNICAL_SYSTEM_MODEL
        </span>

        <h2 className="max-w-5xl text-4xl font-medium leading-tight tracking-tight text-white/92 md:text-6xl">
          Federated Operational Architecture
        </h2>
      </div>

      <div className="max-w-md md:pt-5">
        <p className="text-sm leading-relaxed text-white/42">
          This architectural case study models a reference distributed system: a federated
          execution plane separating governance, execution, tenancy, and event orchestration
          into independently scalable, decoupled layers.
        </p>

        <div className="mt-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
          <p className="text-xs leading-relaxed text-white/40">
            This model serves as a case study in federated systems design, demonstrating 
            patterns for workload isolation and cross-cluster coordination.
          </p>
        </div>
      </div>
    </div>
  );
}
