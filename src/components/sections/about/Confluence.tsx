"use client";

import React, { useState, useEffect } from "react";

interface Stage {
  id: number;
  label: string;
  heading: string;
  observation: string;
}

const stages: Stage[] = [
  {
    id: 0,
    label: "LIVING SYSTEMS",
    heading: "For a while, I thought I was interested in biology.",
    observation:
      "Biology was the first place I encountered systems that could coordinate without a central controller. I spent hours reading about cells, self-organization, and how feedback loops allow life to adapt and maintain balance without a single authority.",
  },
  {
    id: 1,
    label: "COMPLEXITY",
    heading: "Later, I thought I was interested in complex systems.",
    observation:
      "The more I studied complex systems, the less convinced I became that outcomes could be understood by examining individual parts alone. Order arises spontaneously from simple rules playing out at scale, and complexity is something that must be allowed, not micromanaged.",
  },
  {
    id: 2,
    label: "INFORMATION",
    heading: "Then information systems.",
    observation:
      "Eventually my attention shifted from the components themselves to the signals moving between them. I realized that a database node, an API gateway, or a cell signaling path are all governed by the same constraints of flow, noise, and consensus.",
  },
  {
    id: 3,
    label: "ARCHITECTURE",
    heading: "Then architecture and infrastructure.",
    observation:
      "Structure stopped looking like an implementation detail and started looking like the thing that determines behavior. Physical layouts, transit lines, and database schemas are desire lines—the physical pathways that guide how energy and data flow.",
  },
  {
    id: 4,
    label: "ORGANIZATIONS",
    heading: "Then human organizations.",
    observation:
      "Whether coordination is technical or social, it fails at the same boundaries where context is lost. Teams scale, align, or fail under the same mathematical constraints as software clusters. Human organization is just another distributed network.",
  },
  {
    id: 5,
    label: "COORDINATION",
    heading: "Eventually I realized the subject kept changing, but the questions did not.",
    observation:
      "The interests were never random. They were chapters of the same search: how do independent entities cooperate, how does flow shape behavior, and how do systems scale without collapsing? I was looking for the hidden structure beneath coordination itself.",
  },
];

export function ConfluenceSection() {
  const [activeStage, setActiveStage] = useState<number>(0);

  // Set up intersection observer to track active card during scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-stage-index"));
            setActiveStage(index);
          }
        }
      },
      {
        rootMargin: "-30% 0px -40% 0px",
        threshold: 0.1,
      }
    );

    const elements = document.querySelectorAll("[data-stage-index]");
    for (const el of elements) {
      observer.observe(el);
    }

    return () => {
      for (const el of elements) {
        observer.unobserve(el);
      }
    };
  }, []);

  return (
    <section
      id="systems-confluence"
      className="relative overflow-clip border-t border-black/[0.06] bg-[#E3DDD4] px-6 py-32 md:px-12"
    >
      {/* Ambient Color Fields */}
      <div className="absolute left-[10%] top-[-10%] h-[420px] w-[420px] rounded-full bg-[#7284A3]/10 blur-3xl" />
      <div className="absolute bottom-[-10%] right-[10%] h-[480px] w-[480px] rounded-full bg-[#8AA392]/10 blur-3xl" />

      {/* Structural Grid Lines */}
      <div className="absolute top-0 left-1/3 h-full w-px bg-black/[0.04]" />
      <div className="absolute top-0 left-2/3 h-full w-px bg-black/[0.04]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Intro */}
        <div className="mb-32 max-w-3xl">
          <span className="mb-6 block font-mono text-[10px] tracking-[0.22em] text-black/28">
            CONFLUENCE_OF_INQUIRY
          </span>
          <h2 className="text-[2.8rem] font-medium leading-[1.02] tracking-[-0.05em] text-black/92 md:text-[5.2rem]">
            The same questions, appearing repeatedly.
          </h2>
          <p className="mt-8 text-lg font-light leading-relaxed text-black/55 md:text-xl">
            My interests were never random. Biology, complexity, information, architecture, and
            organizations were simply chapters of the same investigation.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid gap-16 md:grid-cols-12">
          {/* Left Column: Poster-like Sticky Progression (Desktop only) */}
          <div className="hidden md:block md:col-span-5">
            <div className="sticky top-[30vh] flex flex-col items-start space-y-4">
              {stages.map((stage, idx) => {
                const isActive = activeStage === stage.id;

                return (
                  <React.Fragment key={stage.id}>
                    <button
                      type="button"
                      onClick={() => {
                        const element = document.querySelector(`[data-stage-index="${stage.id}"]`);
                        element?.scrollIntoView({ behavior: "smooth", block: "center" });
                      }}
                      className={`text-left leading-none tracking-tighter uppercase transition-all duration-700 ease-in-out cursor-pointer hover:text-black/80 ${
                        isActive
                          ? "text-black/90 font-bold scale-[1.03] text-[2rem] lg:text-[2.8rem]"
                          : "text-black/10 font-normal scale-100 text-[1.6rem] lg:text-[2.2rem]"
                      }`}
                    >
                      {stage.label}
                    </button>
                    {idx < stages.length - 1 && (
                      <span
                        className={`font-mono text-xs transition-colors duration-700 leading-none pl-2 ${
                          isActive ? "text-black/40" : "text-black/10"
                        }`}
                      >
                        ↓
                      </span>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Right Column: Narrative Observations */}
          <div className="col-span-12 md:col-span-7 space-y-32 md:space-y-40 pb-24">
            {stages.map((stage) => {
              const isActive = activeStage === stage.id;

              return (
                <div
                  key={stage.id}
                  data-stage-index={stage.id}
                  className="transition-all duration-750 ease-out"
                >
                  {/* Mobile-only Poster Label Header */}
                  <div className="md:hidden mb-6 flex flex-col items-start">
                    <span className="text-[2.2rem] font-bold tracking-tighter uppercase text-black/90 leading-none">
                      {stage.label}
                    </span>
                    <span className="text-black/20 text-lg font-light pl-2 mt-2">↓</span>
                  </div>

                  {/* Autobiographical Heading */}
                  <h3
                    className={`text-2xl md:text-3xl font-medium tracking-tight leading-tight transition-colors duration-700 ${
                      isActive ? "text-black/90" : "text-black/35"
                    }`}
                  >
                    {stage.heading}
                  </h3>

                  {/* Observation Text */}
                  <p
                    className={`mt-6 text-base md:text-lg leading-relaxed font-light max-w-xl transition-colors duration-700 ${
                      isActive ? "text-black/55" : "text-black/30"
                    }`}
                  >
                    {stage.observation}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
