"use client";

export function ArchitectureModelHeader() {
    return (
        <div className="mb-24 grid gap-12 md:grid-cols-[1.1fr_0.9fr]">
            <div className="max-w-4xl">
                <span className="mb-5 block font-mono text-[10px] tracking-[0.22em] text-white/25">
                    TECHNICAL_SYSTEM_MODEL
                </span>

                <h2 className="max-w-5xl text-4xl font-medium leading-tight tracking-tight text-white/92 md:text-6xl">
                    Proposed distributed coordination architecture for
                    the etiS platform ecosystem.
                </h2>
            </div>

            <div className="max-w-md md:pt-5">
                <p className="text-sm leading-relaxed text-white/42">
                    This model represents the ideal long-term execution
                    architecture originally proposed for the etiS
                    product suite: a federated operational system
                    separating governance, execution, tenancy, and event
                    orchestration into independently scalable layers.
                </p>

                <div className="mt-6 rounded-2xl border border-amber-500/15 bg-amber-500/[0.04] p-4">
                    <p className="text-xs leading-relaxed text-amber-100/60">
                        This architecture represents the proposed target
                        system model — not the currently deployed
                        production implementation.
                    </p>
                </div>
            </div>
        </div>
    );
}
