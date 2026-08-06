import { plexMono, serif } from "@/lib/fonts";

/**
 * Editorial bridge connecting the Research & Writing track to the Biology/Ecology section.
 * Renders on cream paper insert background with ink-dark text.
 */
export function ConvergentSystemsBridge() {
  return (
    <div className="space-y-6">
      <span
        className={`${plexMono.className} block text-[10px] tracking-[0.22em] text-[#1B1D1F]/40`}
      >
        EDITORIAL // CONNECTIVE BRIDGE
      </span>

      <h2
        className={`${serif.className} text-[2rem] italic leading-[1.2] text-[#1B1D1F]/90 md:text-[2.6rem] mb-8`}
      >
        Convergent Systems
      </h2>

      <div
        className={`${serif.className} max-w-xl text-base leading-relaxed text-[#1B1D1F]/70 space-y-5`}
      >
        <p>
          The networks we wire and the systems that evolved in nature were never trying to mimic one
          another. Yet, under the quiet pressure of resource coordination, they steadily converge
          toward the same structural patterns.
        </p>
        <p>
          Information moves locally, but coordination must emerge globally. In both the routing
          table and the mycelial web, state coordination passes along decentralized links where no
          single node holds the absolute representation of reality. Resilience is not the prevention
          of failure; it is the capacity of the network to dynamically route around it.
        </p>
        <p>
          We did not build distributed software to imitate biological ecosystems. Rather, both
          domains are solving the same fundamental constraints of time, drift, and resource
          limitations.
        </p>
        <p className="italic text-[#1B1D1F]/80 font-medium">
          Different histories. The same constraints.
        </p>
      </div>
    </div>
  );
}
