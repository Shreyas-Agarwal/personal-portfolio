"use client";

import Link from "next/link";
import { ArrowDownRight } from "lucide-react";

const fragments = [
    "SYSTEMS",
    "PHILOSOPHY",
    "FANTASY",
    "COORDINATION",
    "WORLDBUILDING",
    "MOVEMENT",
];

export function AboutHero() {
    return (
        <section data-header-theme="light" className="relative overflow-hidden bg-[#EAE6DF] px-6 pt-32 pb-24 md:px-12">
            {/* Ambient Color Fields */}
            <div className="absolute left-[-10%] top-[-10%] h-[420px] w-[420px] rounded-full bg-[#8DAA91]/10 blur-3xl" />
            <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-[#6E7FA3]/10 blur-3xl" />

            {/* Structural Rules */}
            <div className="absolute top-0 left-1/3 h-full w-px bg-black/[0.04]" />
            <div className="absolute top-0 left-2/3 h-full w-px bg-black/[0.04]" />

            <div className="relative mx-auto max-w-7xl">

                {/* Metadata Layer */}
                <div className="mb-20 flex items-center justify-between border-b border-black/[0.08] pb-5">
                    <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-[#6E7FA3]" />

                        <span className="font-mono text-[10px] tracking-[0.22em] text-black/35">
                            HUMAN_LAYER
                        </span>
                    </div>

                    <span className="font-mono text-[10px] tracking-[0.18em] text-black/22">
                        INDEX / ABOUT
                    </span>
                </div>

                {/* Main Layout */}
                <div className="grid gap-20 md:grid-cols-[1.1fr_0.9fr]">

                    {/* Left Column */}
                    <div className="max-w-4xl">

                        <h1 className="max-w-4xl text-[3rem] font-medium leading-[1.02] tracking-[-0.05em] text-black/90 md:text-[5.8rem]">
                            Systems are only one part of how I see the world.
                        </h1>

                        <div className="mt-10 max-w-2xl space-y-6">
                            <p className="text-xl font-light leading-relaxed text-black/65">
                                Outside operational systems and architectural thinking, I am
                                deeply interested in philosophy, fiction, movement, narrative
                                structures, exploration, and the way people coordinate around
                                ideas.
                            </p>

                            <p className="max-w-xl text-sm leading-relaxed text-black/45">
                                The same curiosity that drives my interest in information flow
                                and organizational systems also appears in fantasy worlds,
                                process philosophy, travel, dance, and the strange ways humans
                                create meaning collectively.
                            </p>
                        </div>

                        {/* CTA */}
                        <div className="mt-14">
                            <Link
                                href="#personal-fragments"
                                className="group inline-flex items-center gap-3 text-sm text-black/50 transition-colors hover:text-black"
                            >
                                Explore Personal Fragments

                                <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-y-0.5 group-hover:translate-x-0.5" />
                            </Link>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col justify-between">

                        {/* Fragment Grid */}
                        <div>
                            <span className="mb-8 block font-mono text-[10px] tracking-[0.2em] text-black/22">
                                CURRENT_OBSESSIONS
                            </span>

                            <div className="flex flex-wrap gap-3">
                                {fragments.map((fragment) => (
                                    <div
                                        key={fragment}
                                        className="rounded-full border border-black/[0.08] bg-white/40 px-4 py-2 backdrop-blur-sm"
                                    >
                                        <span className="font-mono text-[10px] tracking-[0.16em] text-black/55">
                                            {fragment}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Observation Block */}
                        <div className="mt-24 rounded-[28px] border border-black/[0.08] bg-white/40 p-8 backdrop-blur-sm">
                            <span className="mb-5 block font-mono text-[10px] tracking-[0.2em] text-black/25">
                                PERSONAL_OBSERVATION
                            </span>

                            <p className="text-lg font-light leading-relaxed text-black/68">
                                I am less interested in mastering a single discipline, and more
                                interested in understanding how seemingly unrelated systems —
                                technical, human, philosophical, or fictional — begin to mirror
                                each other under enough complexity.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}