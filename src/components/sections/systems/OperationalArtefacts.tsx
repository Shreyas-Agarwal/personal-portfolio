"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const artefacts = [
    {
        category: "DISTRIBUTED_SEMANTICS",
        title: "Pulse Semantic Execution Model",

        description:
            "A distributed data interaction architecture exploring whether analytical semantics should execute centrally on the backend or locally within the client runtime.",

        pressure:
            "As interaction density increased, repeated backend queries introduced growing latency, orchestration overhead, and synchronization complexity across highly dynamic dashboard workflows.",

        response:
            "The final model shifted semantic execution toward the frontend using IndexedDB-backed local datasets, DSL-driven filtering, and client-side aggregation pipelines. This approach traded centralized scalability for highly responsive interaction patterns within intentionally constrained dataset boundaries.",

        href: "/systems/pulse-architecture",
    },
    {
        category: "FRONTEND_ARCHITECTURE",
        title: "Frontend–Backend Responsibility Boundaries",
        description:
            "Exploring architectural separation between interaction systems, orchestration layers, and operational processing infrastructure.",
        pressure:
            "Increasing coordination complexity introduced ambiguity around execution ownership, synchronization, and operational responsibility boundaries.",
        response:
            "Architectural decisions focused on reducing coupling between interaction state, orchestration logic, and distributed processing workflows.",
        href: "/systems/frontend-backend-boundaries",
    },
    {
        category: "PLATFORM_SYSTEMS",
        title: "Dynamic Feature Injection & Modular Expansion",
        description:
            "Designing extensible operational systems capable of evolving without destabilizing foundational workflow infrastructure.",
        pressure:
            "As systems scaled across domains, tightly coupled feature layers introduced deployment friction and operational coordination overhead.",
        response:
            "The architecture evolved toward modular expansion patterns, isolated feature domains, and controlled injection boundaries.",
        href: "/systems/feature-injection",
    },
];

const adrs = [
    {
        id: "ADR_001",
        title: "Primary Database Selection",
        href: "/systems/adr/001-database-selection",
    },
    {
        id: "ADR_002",
        title: "Monorepo Strategy & Connector",
        href: "/systems/adr/002-repo-strategy",
    },
    {
        id: "ADR_003",
        title: "Hook Provider Semantics",
        href: "/systems/adr/003-hook-provider-semantics",
    },
];

export function OperationalArtefactsSection() {
    return (
        <section data-header-theme="light" className="relative overflow-hidden bg-[#F3F1EC] px-6 py-32 md:px-12">
            {/* Structural Rules */}
            <div className="absolute top-0 left-1/3 h-full w-px bg-black/[0.04]" />
            <div className="absolute top-0 left-2/3 h-full w-px bg-black/[0.04]" />

            <div className="relative mx-auto max-w-7xl">

                {/* Section Intro */}
                <div className="mb-28 grid gap-12 md:grid-cols-[1fr_380px] md:items-end">

                    <div className="max-w-5xl">
                        <span className="mb-6 block font-mono text-[10px] tracking-[0.22em] text-black/30">
                            OPERATIONAL_ARTEFACTS
                        </span>

                        <h2 className="max-w-5xl text-[2.8rem] font-medium leading-[1.04] tracking-[-0.04em] text-black/92 md:text-[5rem]">
                            Architectural thinking only matters when it survives operational reality.
                        </h2>
                    </div>

                    <div className="max-w-sm">
                        <p className="text-sm leading-relaxed text-black/50">
                            These systems emerged through real coordination pressure,
                            workflow complexity, operational scaling, and architectural
                            tradeoffs across evolving product infrastructure.
                        </p>
                    </div>
                </div>

                {/* Artefacts */}
                <div className="space-y-px bg-black/[0.08]">

                    {artefacts.map((item) => (
                        <div
                            key={item.title}
                            className="group bg-[#F3F1EC] transition-colors hover:bg-black/[0.02]"
                        >
                            <div className="grid gap-10 px-8 py-14 md:grid-cols-[180px_1fr_280px] md:px-12">

                                {/* Category */}
                                <div>
                                    <span className="font-mono text-[10px] tracking-[0.2em] text-black/30">
                                        {item.category}
                                    </span>
                                </div>

                                {/* Main Content */}
                                <div className="max-w-3xl">

                                    <div className="mb-8 flex items-start justify-between gap-8">
                                        <h3 className="max-w-2xl text-2xl font-medium leading-tight tracking-tight text-black/90 md:text-3xl">
                                            {item.title}
                                        </h3>

                                        <Link
                                            href={item.href}
                                            className="hidden md:block"
                                        >
                                            <ArrowUpRight className="h-5 w-5 text-black/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-black/70" />
                                        </Link>
                                    </div>

                                    <p className="max-w-2xl text-base leading-relaxed text-black/58">
                                        {item.description}
                                    </p>

                                    {/* Pressure / Response */}
                                    <div className="mt-12 grid gap-10 md:grid-cols-2">

                                        <div>
                                            <span className="mb-4 block font-mono text-[9px] tracking-[0.18em] text-black/25">
                                                ARCHITECTURAL_PRESSURE
                                            </span>

                                            <p className="text-sm leading-relaxed text-black/50">
                                                {item.pressure}
                                            </p>
                                        </div>

                                        <div>
                                            <span className="mb-4 block font-mono text-[9px] tracking-[0.18em] text-black/25">
                                                STRUCTURAL_RESPONSE
                                            </span>

                                            <p className="text-sm leading-relaxed text-black/50">
                                                {item.response}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Rail */}
                                <div className="hidden border-l border-black/[0.06] pl-8 md:block">
                                    <span className="mb-5 block font-mono text-[9px] tracking-[0.18em] text-black/20">
                                        SYSTEM_RECORD
                                    </span>

                                    <p className="text-sm leading-relaxed text-black/40">
                                        The resulting architecture represents a response to
                                        coordination pressure, operational complexity, and scaling
                                        constraints rather than purely technical preference.
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ADR Footnote Layer */}
                <div className="mt-32 border-t border-black/[0.08] pt-12">

                    <div className="grid gap-12 md:grid-cols-[1fr_420px]">

                        {/* Left */}
                        <div className="max-w-3xl">
                            <span className="mb-5 block font-mono text-[10px] tracking-[0.2em] text-black/30">
                                ARCHITECTURAL_DECISION_RECORDS
                            </span>

                            <p className="text-lg font-light leading-relaxed text-black/62">
                                Architectural decisions were documented not as static technical
                                documentation, but as operational reasoning records —
                                preserving tradeoffs, constraints, and the evolution of system
                                thinking over time.
                            </p>
                        </div>

                        {/* ADR Links */}
                        <div className="space-y-4">
                            {adrs.map((adr) => (
                                <Link
                                    key={adr.id}
                                    href={adr.href}
                                    className="group flex items-center justify-between border-b border-black/[0.06] pb-4 transition-colors hover:border-black/[0.14]"
                                >
                                    <div>
                                        <span className="block font-mono text-[9px] tracking-[0.18em] text-black/25">
                                            {adr.id}
                                        </span>

                                        <span className="mt-2 block text-sm text-black/70 transition-colors group-hover:text-black">
                                            {adr.title}
                                        </span>
                                    </div>

                                    <ArrowUpRight className="h-4 w-4 text-black/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-black/70" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}