"use client";

const fragments = [
    {
        category: "PHILOSOPHY",
        title: "Systems are ultimately stories about coordination.",
        description:
            "Whether technical or human, most systems fail at the boundaries — where assumptions diverge, context disappears, and coordination breaks down.",
        accent: "bg-[#7284A3]",
    },
    {
        category: "FICTION",
        title: "Fantasy and science fiction shaped how I think about worlds.",
        description:
            "Good worldbuilding behaves like good architecture. Rules matter. Constraints matter. Internal consistency matters. Complexity emerges naturally from structure.",
        accent: "bg-[#8AA392]",
    },
    {
        category: "MOVEMENT",
        title: "Dance changed how I understand rhythm and flow.",
        description:
            "Movement introduced a different perspective on coordination — one less analytical and more embodied. Timing, transition, balance, tension, release.",
        accent: "bg-[#C58B6C]",
    },
    {
        category: "EXPLORATION",
        title: "Travel makes systems visible.",
        description:
            "Cities, trails, transport networks, and cultures reveal how humans organize themselves under different environmental and operational constraints.",
        accent: "bg-[#9B7B72]",
    },
];

export function PersonalFragmentsSection() {
    return (
        <section
            id="personal-fragments"
            className="relative overflow-hidden bg-[#E7E1D7] px-6 py-32 md:px-12"
        >
            {/* Ambient Fields */}
            <div className="absolute left-[-10%] top-[10%] h-[420px] w-[420px] rounded-full bg-[#7284A3]/10 blur-3xl" />
            <div className="absolute bottom-[-10%] right-[0%] h-[480px] w-[480px] rounded-full bg-[#8AA392]/10 blur-3xl" />

            {/* Structural Rules */}
            <div className="absolute top-0 left-1/3 h-full w-px bg-black/[0.04]" />
            <div className="absolute top-0 left-2/3 h-full w-px bg-black/[0.04]" />

            <div className="relative mx-auto max-w-7xl">

                {/* Intro */}
                <div className="mb-24 grid gap-12 md:grid-cols-[1fr_360px] md:items-end">

                    <div className="max-w-5xl">
                        <span className="mb-6 block font-mono text-[10px] tracking-[0.22em] text-black/28">
                            PERSONAL_FRAGMENTS
                        </span>

                        <h2 className="max-w-5xl text-[2.8rem] font-medium leading-[1.02] tracking-[-0.05em] text-black/92 md:text-[5.2rem]">
                            The systems mindset did not emerge from engineering alone.
                        </h2>
                    </div>

                    <div className="max-w-sm">
                        <p className="text-sm leading-relaxed text-black/48">
                            Many of the ideas that shape how I think about architecture,
                            coordination, and operational systems were formed outside software
                            entirely.
                        </p>
                    </div>
                </div>

                {/* Fragment Layout */}
                <div className="grid gap-6 md:grid-cols-12">

                    {/* Large Left Feature */}
                    <div className="group relative overflow-hidden rounded-[32px] border border-black/[0.06] bg-white/40 p-10 backdrop-blur-sm transition-all hover:bg-white/55 md:col-span-7 md:min-h-[420px]">

                        <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[#7284A3]/10 blur-2xl transition-transform duration-700 group-hover:scale-125" />

                        <div className="relative flex h-full flex-col justify-between">

                            <div>
                                <div className="mb-8 flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-[#7284A3]" />

                                    <span className="font-mono text-[10px] tracking-[0.18em] text-black/30">
                                        {fragments[0].category}
                                    </span>
                                </div>

                                <h3 className="max-w-2xl text-3xl font-medium leading-tight tracking-tight text-black/90">
                                    {fragments[0].title}
                                </h3>
                            </div>

                            <p className="mt-16 max-w-xl text-base leading-relaxed text-black/55">
                                {fragments[0].description}
                            </p>
                        </div>
                    </div>

                    {/* Right Stack */}
                    <div className="space-y-6 md:col-span-5">

                        {fragments.slice(1, 3).map((item) => (
                            <div
                                key={item.title}
                                className="group relative overflow-hidden rounded-[28px] border border-black/[0.06] bg-white/35 p-8 backdrop-blur-sm transition-all hover:bg-white/50"
                            >
                                <div className={`absolute right-0 top-0 h-24 w-24 rounded-full ${item.accent}/10 blur-2xl`} />

                                <div className="relative">
                                    <div className="mb-6 flex items-center gap-3">
                                        <div className={`h-2 w-2 rounded-full ${item.accent}`} />

                                        <span className="font-mono text-[10px] tracking-[0.18em] text-black/30">
                                            {item.category}
                                        </span>
                                    </div>

                                    <h3 className="max-w-md text-xl font-medium leading-snug tracking-tight text-black/90">
                                        {item.title}
                                    </h3>

                                    <p className="mt-6 text-sm leading-relaxed text-black/52">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Wide Fragment */}
                    <div className="group relative overflow-hidden rounded-[32px] border border-black/[0.06] bg-white/35 p-10 backdrop-blur-sm transition-all hover:bg-white/50 md:col-span-12">

                        <div className="absolute bottom-0 right-[10%] h-40 w-40 rounded-full bg-[#C58B6C]/10 blur-3xl" />

                        <div className="relative grid gap-10 md:grid-cols-[220px_1fr]">

                            <div>
                                <div className="mb-6 flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-[#9B7B72]" />

                                    <span className="font-mono text-[10px] tracking-[0.18em] text-black/30">
                                        {fragments[3].category}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <h3 className="max-w-3xl text-2xl font-medium leading-tight tracking-tight text-black/90 md:text-3xl">
                                    {fragments[3].title}
                                </h3>

                                <p className="mt-6 max-w-3xl text-base leading-relaxed text-black/55">
                                    {fragments[3].description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Closing Observation */}
                <div className="mt-28 border-t border-black/[0.08] pt-10">

                    <div className="max-w-4xl">
                        <p className="text-2xl font-light leading-relaxed tracking-tight text-black/68 md:text-3xl">
                            I’ve become increasingly interested in the places where technical
                            systems, human coordination, narrative structure, and philosophy
                            begin to overlap.
                        </p>

                        <p className="mt-6 text-xl font-light leading-relaxed text-black/40">
                            Most of my work eventually traces back to that curiosity.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}