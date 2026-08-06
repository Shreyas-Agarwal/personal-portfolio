"use client";

import { motion } from "framer-motion";
import { plexMono, serif } from "@/lib/fonts";

const EASE = [0.16, 1, 0.3, 1] as const;

interface LayerItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
}

const LAYERS: LayerItem[] = [
  {
    id: "laws",
    name: "Laws",
    subtitle: "Invariable Axioms",
    description:
      "Laws describe what is fundamentally true about information, time, bounds, and entropy.",
  },
  {
    id: "physics",
    name: "Physics",
    subtitle: "System Dynamics",
    description:
      "Physics describes how those fundamental truths interact under operational pressure and real-world constraints.",
  },
  {
    id: "architecture",
    name: "Architecture",
    subtitle: "Structural Patterns",
    description:
      "Architecture describes engineering patterns and structural boundaries that emerge from these physical interactions.",
  },
  {
    id: "implementations",
    name: "Implementations",
    subtitle: "Concrete Software",
    description:
      "Implementations are the concrete systems, services, and software artifacts presented elsewhere in the site.",
  },
];

export function ConceptualLayers() {
  return (
    <section
      data-header-theme="light"
      className="relative bg-[#ECE5D4] px-6 py-24 text-[#1B1D1F] md:px-12"
    >
      <div className="mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="mb-16 border-b border-[#1B1D1F]/15 pb-8">
          <span
            className={`${plexMono.className} mb-2 block text-[10px] uppercase tracking-[0.25em] text-[#1B1D1F]/50`}
          >
            THE HIERARCHY OF IDEAS
          </span>
          <h2
            className={`${serif.className} text-3xl font-normal tracking-tight text-[#1B1D1F] md:text-4xl`}
          >
            Three Layers
          </h2>
          <p
            className={`${serif.className} mt-3 max-w-2xl text-base italic text-[#1B1D1F]/70 md:text-lg`}
          >
            Systems engineering is not a flat discipline. Ideas cascade from immutable principles
            down into concrete software implementations.
          </p>
        </div>

        {/* Stack Cascade */}
        <div className="space-y-4">
          {LAYERS.map((layer, idx) => (
            <motion.div
              key={layer.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: EASE }}
              className="relative"
            >
              <div className="border border-[#1B1D1F]/15 bg-[#F4EFE4] p-8 md:p-10 transition-colors hover:border-[#1B1D1F]/30">
                <div className="mb-3 flex flex-col justify-between gap-2 md:flex-row md:items-baseline">
                  <div className="flex items-center gap-3">
                    <span
                      className={`${plexMono.className} text-xs tracking-[0.2em] text-[#1B1D1F]/40`}
                    >
                      0{idx + 1}
                    </span>
                    <h3
                      className={`${serif.className} text-2xl font-normal text-[#1B1D1F] md:text-3xl`}
                    >
                      {layer.name}
                    </h3>
                  </div>
                  <span
                    className={`${plexMono.className} text-[10px] uppercase tracking-[0.18em] text-[#1B1D1F]/50`}
                  >
                    {layer.subtitle}
                  </span>
                </div>
                <p
                  className={`${serif.className} text-base leading-relaxed text-[#1B1D1F]/75 md:text-lg`}
                >
                  {layer.description}
                </p>
              </div>

              {/* Downward Arrow Connector */}
              {idx < LAYERS.length - 1 && (
                <div className="flex justify-center py-2">
                  <span className={`${plexMono.className} text-sm text-[#1B1D1F]/35`}>↓</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
