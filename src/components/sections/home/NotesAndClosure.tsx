"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const notes = [
    {
        type: "AI PHILOSOPHY",
        title: "The Silicon Ceiling: The Road to AGI",
        excerpt:
            "Why modern AI may be a historic breakthrough, a civilizational inflection point… and still fundamentally incapable of becoming true Artificial General Intelligence.",
        href: "/notes/the-silicon-ceiling",
    },
    {
        type: "SYSTEMS ECOLOGY",
        title: "Ecological Networks and AI Systems",
        excerpt:
            "Why ecosystems may already be performing forms of distributed computation",
        href: "/notes/ecology-and-ai",
    },
    {
        type: "AI ARCHITECTURE",
        title: "The Context Rot Paradox: MCPs at T-Minus Zero",
        excerpt:
            "A deep dive into the physics of LLM attention, agentic architectures, and why connecting an AI to everything may quietly make it worse at thinking",
        href: "/notes/mcp-context-rot",
    },
];

export function NotesAndClosureSection() {
    return (
        <section data-header-theme="light" className="relative overflow-hidden bg-[#F3F1EC] px-6 py-32 md:px-12">
            {/* Soft Structural Rules */}
            <div className="absolute top-0 left-1/3 h-full w-px bg-black/[0.04]" />
            <div className="absolute top-0 left-2/3 h-full w-px bg-black/[0.04]" />

            <div className="relative mx-auto max-w-6xl">

                {/* Section Header */}
                <div className="mb-24 grid gap-10 md:grid-cols-[1fr_320px] md:items-end">
                    <div className="max-w-3xl">
                        <span className="mb-5 block font-mono text-[10px] tracking-[0.2em] text-black/30">
                            NOTES_AND_OBSERVATIONS
                        </span>

                        <h2 className="text-3xl font-medium leading-tight tracking-tight text-black/90 md:text-5xl">
                            Systems eventually become conversations about coordination.
                        </h2>
                    </div>

                    <div>
                        <p className="text-sm leading-relaxed text-black/50">
                            Ongoing observations around operational systems, information
                            architecture, workflow coordination, and infrastructural thinking.
                        </p>
                    </div>
                </div>

                {/* Notes List */}
                <div className="border-t border-black/[0.08]">
                    {notes.map((note, _index) => (
                        <Link
                            key={note.title}
                            href={note.href}
                            className="group grid gap-8 border-b border-black/[0.06] py-10 transition-colors hover:bg-black/[0.02] md:grid-cols-[140px_1fr_40px]"
                        >
                            {/* Type */}
                            <div className="pt-1">
                                <span className="font-mono text-[10px] tracking-[0.2em] text-black/30">
                                    {note.type}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="max-w-3xl">
                                <h3 className="mb-4 text-xl font-medium leading-snug tracking-tight text-black/90">
                                    {note.title}
                                </h3>

                                <p className="text-sm leading-relaxed text-black/55">
                                    {note.excerpt}
                                </p>
                            </div>

                            {/* Icon */}
                            <div className="hidden items-start justify-end md:flex">
                                <ArrowUpRight className="h-4 w-4 text-black/30 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-black/70" />
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Closing Footnote */}
                <div className="mt-32 border-t border-black/[0.08] pt-10">
                    <p className="max-w-2xl text-lg font-light leading-relaxed text-black/60">
                        Currently exploring systems around operational coordination,
                        workflow architecture, and information flow under scale.
                    </p>
                </div>
            </div>
        </section>
    );
}