import { plexMono } from "@/lib/fonts";

interface FlowStep {
  label: string;
  shape?: "circle" | "diamond" | "square";
}

interface FlowDiagramProps {
  steps: FlowStep[];
}

function Node({ shape }: { shape: FlowStep["shape"] }) {
  const base = "h-3 w-3 border border-[#E6E1D6]/50 bg-[#1B1D1F]";
  if (shape === "circle") return <div className={`${base} rounded-full`} />;
  if (shape === "diamond") return <div className={`${base} rotate-45`} />;
  return <div className={base} />;
}

/**
 * One memorable artifact per viewport: plain node shapes on a 1px line, no
 * gradients or fills, a single dot traveling the path to show flow. This
 * exists to make a reader pause — the real architecture detail lives on the
 * system's own documentation page.
 */
export function FlowDiagram({ steps }: FlowDiagramProps) {
  return (
    <div className="relative py-8">
      <div className="absolute inset-x-0 top-[22px] h-px bg-[#E6E1D6]/15" />
      <div
        aria-hidden="true"
        className="absolute top-[19px] h-[7px] w-[7px] rounded-full bg-[#E6E1D6]/60 motion-safe:animate-flow-travel motion-reduce:hidden"
      />
      <div className="relative flex items-start justify-between gap-2">
        {steps.map((step) => (
          <div key={step.label} className="flex flex-col items-center gap-2">
            <Node shape={step.shape} />
            <span
              className={`${plexMono.className} max-w-[7rem] text-center text-[9px] uppercase leading-tight tracking-wide text-[#E6E1D6]/55`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
