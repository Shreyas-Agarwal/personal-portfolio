"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const work = [
    {
        category: "SYSTEMS",
        title: "Workflow Architecture Under Operational Scale",
        description:
            "Designing multi-stage coordination systems across forms, workflows, distributed workers, and audit infrastructure.",
        href: "/systems/workflow-architecture",
        size: "large",
    },
    {
        category: "RESEARCH",
        title: "ISO 19650 As Information Infrastructure",
        description:
            "Reframing BIM standards as operational information systems rather than compliance documentation.",
        href: "/research/iso-19650",
        size: "small",
    },
    {
        category: "OBSERVATIONS",
        title: "Designing Around State Fracture",
        description:
            "Notes on coordination failure, memory boundaries, and the architectural pressure introduced by scale.",
        href: "/notes/state-fracture",
        size: "small",
    },
];

export function SelectedWorkSection() {
    return (
        <section data-header-theme="light" className="relative overflow-hidden bg-[#F3F1EC] px-6 py-32 md:px-12">
            {/* Soft Structural Rules */}
            <div className="absolute top-0 left-1/3 h-full w-px bg-black/[0.04]" />
            <div className="absolute top-0 left-2/3 h-full w-px bg-black/[0.04]" />

            <div className="relative mx-auto max-w-6xl">

                {/* Section Header */}
                <div className="mb-20 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-2xl">
                        <span className="mb-4 block font-mono text-[10px] tracking-[0.2em] text-black/30">
                            SELECTED_WORK
                        </span>

                        <h2 className="text-3xl font-medium tracking-tight text-black/90 md:text-4xl">
                            Systems, research, and operational thinking.
                        </h2>
                    </div>

                    <p className="max-w-md text-sm leading-relaxed text-black/50">
                        A selection of architectural systems, infrastructure observations,
                        and research artifacts developed through operational work.
                    </p>
                </div>

                {/* Work Grid */}
                <div className="grid gap-px bg-black/[0.06] md:grid-cols-2">

                    {/* Large Feature */}
                    <Link
                        href={work[0].href}
                        className="group relative flex min-h-[420px] flex-col justify-between bg-[#F3F1EC] p-10 transition-colors hover:bg-black/[0.02] md:row-span-2"
                    >
                        <div>
                            <span className="font-mono text-[10px] tracking-[0.2em] text-black/30">
                                {work[0].category}
                            </span>

                            <h3 className="mt-6 max-w-md text-3xl font-medium leading-tight tracking-tight text-black/90">
                                {work[0].title}
                            </h3>
                        </div>

                        <div className="space-y-8">
                            <p className="max-w-lg text-sm leading-relaxed text-black/55">
                                {work[0].description}
                            </p>

                            <div className="flex items-center gap-2 text-sm text-black/50 transition-colors group-hover:text-black">
                                Open Case Study
                                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </div>
                        </div>
                    </Link>

                    {/* Smaller Entries */}
                    {work.slice(1).map((item) => (
                        <Link
                            key={item.title}
                            href={item.href}
                            className="group flex min-h-[210px] flex-col justify-between bg-[#F3F1EC] p-10 transition-colors hover:bg-black/[0.02]"
                        >
                            <div>
                                <span className="font-mono text-[10px] tracking-[0.2em] text-black/30">
                                    {item.category}
                                </span>

                                <h3 className="mt-5 max-w-sm text-xl font-medium leading-snug tracking-tight text-black/90">
                                    {item.title}
                                </h3>
                            </div>

                            <div className="space-y-6">
                                <p className="max-w-md text-sm leading-relaxed text-black/55">
                                    {item.description}
                                </p>

                                <div className="flex items-center gap-2 text-sm text-black/50 transition-colors group-hover:text-black">
                                    Explore
                                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}