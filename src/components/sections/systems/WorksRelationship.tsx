"use client";

import { motion } from "framer-motion";
import { plexMono, serif } from "@/lib/fonts";

const EASE = [0.16, 1, 0.3, 1] as const;

interface ConceptReference {
  concept: string;
  tag: string;
  publications: string[];
}

const SAMPLE_REFERENCES: ConceptReference[] = [
  {
    concept: "STATE",
    tag: "FOUNDATION 04",
    publications: [
      "Desktop Synchronization Architecture",
      "Transit Intelligence",
      "Lakehouse Engineering Lab",
      "Architecture of Information Systems",
    ],
  },
  {
    concept: "COORDINATION",
    tag: "FOUNDATION 09",
    publications: [
      "Distributed Consensus Notes",
      "Workflow Engine Design",
      "AEC Platform Federation",
    ],
  },
  {
    concept: "MODELS",
    tag: "FOUNDATION 08",
    publications: [
      "Canonical Business Models",
      "Domain Event Modeling",
      "OLTP vs OLAP System Boundaries",
    ],
  },
  {
    concept: "SIGNALS & OBSERVATIONS",
    tag: "FOUNDATION 02 & 03",
    publications: ["Telemetry Pipeline Architecture", "Operational Observer Patterns"],
  },
];

export function WorksRelationship() {
  return (
    <section
      data-header-theme="dark"
      className="relative border-t border-[#E6E1D6]/10 bg-[#1B1D1F] px-6 py-24 md:px-12"
    >
      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="mb-16 border-b border-[#E6E1D6]/10 pb-8">
          <span
            className={`${plexMono.className} mb-2 block text-[10px] uppercase tracking-[0.25em] text-[#DE4B31]`}
          >
            CROSS-REFERENCE MATRIX
          </span>
          <h2
            className={`${serif.className} text-3xl font-normal tracking-tight text-[#E6E1D6] md:text-4xl`}
          >
            Relationship to Works
          </h2>
          <p
            className={`${serif.className} mt-3 max-w-2xl text-base italic text-[#E6E1D6]/60 md:text-lg`}
          >
            In future revisions, each foundational concept will explicitly map to every publication,
            specification, and implementation where its dynamics are active.
          </p>
        </div>

        {/* References Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {SAMPLE_REFERENCES.map((item, idx) => (
            <motion.div
              key={item.concept}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: EASE }}
              className="border border-[#E6E1D6]/10 bg-[#1B1D1F] p-8"
            >
              <div className="mb-6 flex items-center justify-between border-b border-[#E6E1D6]/10 pb-4">
                <h3
                  className={`${serif.className} text-2xl font-normal tracking-wide text-[#E6E1D6]`}
                >
                  {item.concept}
                </h3>
                <span
                  className={`${plexMono.className} text-[10px] uppercase tracking-[0.18em] text-[#E6E1D6]/40`}
                >
                  {item.tag}
                </span>
              </div>

              <span
                className={`${plexMono.className} mb-4 block text-[10px] uppercase tracking-[0.2em] text-[#DE4B31]`}
              >
                Referenced in:
              </span>

              <ul className="space-y-3">
                {item.publications.map((pub) => (
                  <li key={pub} className="flex items-baseline gap-2">
                    <span className={`${plexMono.className} text-xs text-[#E6E1D6]/30`}>—</span>
                    <span
                      className={`${serif.className} cursor-default text-base text-[#E6E1D6]/75 transition-colors hover:text-[#E6E1D6]`}
                    >
                      {pub}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
