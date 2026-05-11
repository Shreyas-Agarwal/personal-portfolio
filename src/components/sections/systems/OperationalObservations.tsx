"use client";

const observations = [
    {
        index: "01",
        title: "Complexity rarely disappears.",
        description:
            "Most systems do not eliminate operational complexity. They redistribute it across coordination layers, deployment boundaries, and organizational processes.",
    },
    {
        index: "02",
        title: "Scaling changes the nature of problems.",
        description:
            "At smaller scales, engineering challenges are often implementation-focused. At larger scales, coordination, observability, and governance become dominant architectural concerns.",
    },
    {
        index: "03",
        title: "Architecture is organizational.",
        description:
            "System boundaries frequently mirror communication structures, workflow ownership, and operational accountability across teams.",
    },
    {
        index: "04",
        title: "Operational visibility shapes decision quality.",
        description:
            "Once workflows become observable, hidden bottlenecks, state inconsistencies, and coordination failures become architectural signals rather than isolated incidents.",
    },
];

export function OperationalObservationsSection() {
    return (
        <section data-header-theme="dark" className="relative overflow-hidden bg-[#0A0F14] px-6 py-32 md:px-12">
            {/* Structural Rules */}
            <div className="absolute top-0 left-1/3 h-full w-px bg-white/[0.04]" />
            <div className="absolute top-0 left-2/3 h-full w-px bg-white/[0.04]" />

            {/* Ambient Layer */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.025),transparent_50%)]" />

            <div className="relative mx-auto max-w-7xl">

                {/* Intro */}
                <div className="mb-24 grid gap-12 md:grid-cols-[1fr_380px] md:items-end">

                    <div className="max-w-5xl">
                        <span className="mb-6 block font-mono text-[10px] tracking-[0.22em] text-white/22">
                            OPERATIONAL_OBSERVATIONS
                        </span>

                        <h2 className="max-w-5xl text-[2.8rem] font-medium leading-[1.04] tracking-[-0.04em] text-white/92 md:text-[5rem]">
                            Systems eventually become coordination problems.
                        </h2>
                    </div>

                    <div className="max-w-sm">
                        <p className="text-sm leading-relaxed text-white/42">
                            The most valuable architectural lessons rarely emerge during
                            implementation. They emerge later — through scaling pressure,
                            operational friction, coordination failure, and organizational growth.
                        </p>
                    </div>
                </div>

                {/* Observations */}
                <div className="border-t border-white/[0.06]">

                    {observations.map((item) => (
                        <div
                            key={item.index}
                            className="grid gap-8 border-b border-white/[0.05] py-12 md:grid-cols-[100px_1fr_320px]"
                        >
                            {/* Index */}
                            <div>
                                <span className="font-mono text-[10px] tracking-[0.22em] text-white/18">
                                    OBS_{item.index}
                                </span>
                            </div>

                            {/* Main Content */}
                            <div className="max-w-3xl">
                                <h3 className="mb-5 text-2xl font-medium tracking-tight text-white/90">
                                    {item.title}
                                </h3>

                                <p className="max-w-2xl text-base leading-relaxed text-white/52">
                                    {item.description}
                                </p>
                            </div>

                            {/* Right Rail */}
                            <div className="hidden border-l border-white/[0.05] pl-8 md:block">
                                <span className="mb-4 block font-mono text-[9px] tracking-[0.18em] text-white/14">
                                    FIELD_NOTE
                                </span>

                                <p className="text-sm leading-relaxed text-white/30">
                                    Architectural maturity often comes less from technical
                                    sophistication, and more from understanding how operational
                                    systems behave under real coordination pressure.
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Closing Layer */}
                <div className="mt-32 border-t border-white/[0.06] pt-12">

                    <div className="grid gap-16 md:grid-cols-[1fr_320px]">

                        {/* Closing Statement */}
                        <div className="max-w-4xl">
                            <span className="mb-6 block font-mono text-[10px] tracking-[0.22em] text-white/18">
                                CLOSING_OBSERVATION
                            </span>

                            <p className="text-2xl font-light leading-relaxed tracking-tight text-white/70 md:text-3xl">
                                The longer I work around systems, the less architecture feels
                                like software design.
                            </p>

                            <p className="mt-6 text-2xl font-light leading-relaxed tracking-tight text-white/38 md:text-3xl">
                                And the more it feels like designing for coordination,
                                visibility, operational clarity, and organizational memory.
                            </p>
                        </div>

                        {/* Side Annotation */}
                        <div className="border-l border-white/[0.05] pl-8">
                            <span className="mb-4 block font-mono text-[9px] tracking-[0.18em] text-white/14">
                                SYSTEM_CONTEXT
                            </span>

                            <p className="text-sm leading-relaxed text-white/30">
                                Current exploration areas include workflow orchestration,
                                operational infrastructure, distributed coordination systems,
                                architectural governance, and information flow under scale.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}