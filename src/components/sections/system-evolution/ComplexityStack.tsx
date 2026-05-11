"use client";

// system-evolution/ComplexityStack.tsx
// Visualizes the accumulating operational burden over the phases.

import { cn } from "@/lib/utils";
import type { OperationalBurden } from "./data";

type Props = {
  burdens: OperationalBurden[];
};

export function ComplexityStack({ burdens }: Props) {
  if (!burdens) return null;

  return (
    <div className="select-none">
      <div className="mb-5 flex items-center justify-between">
        <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/25">
          operational.burden
        </div>
        <div className="font-mono text-[8px] tracking-[0.1em] text-white/15">SYS_LOAD</div>
      </div>

      <div className="flex flex-col gap-4">
        {burdens.map((burden, i) => {
          const intensity = burden.value;

          // Theming based on intensity to show "stress"
          const isHigh = intensity >= 75;
          const isMedium = intensity >= 40 && intensity < 75;

          const labelColor = isHigh
            ? "text-red-400"
            : isMedium
              ? "text-orange-400/80"
              : "text-white/40";
          const trackBg = isHigh
            ? "bg-red-950/30"
            : isMedium
              ? "bg-orange-950/20"
              : "bg-white/[0.03]";
          const barFill = isHigh ? "bg-red-500/60" : isMedium ? "bg-orange-500/50" : "bg-white/20";

          return (
            <div
              key={burden.label}
              className="flex flex-col gap-1.5"
              style={{ transition: `opacity 0.3s ease ${i * 40}ms` }}
            >
              <div className="flex justify-between items-end font-mono">
                <span className={cn("text-[9.5px] uppercase tracking-[0.05em]", labelColor)}>
                  {burden.label}
                </span>
                <span className={cn("text-[8.5px]", labelColor, "opacity-70")}>{intensity}%</span>
              </div>

              <div className={cn("h-[3px] w-full overflow-hidden rounded-full relative", trackBg)}>
                {/* Grid marks overlay */}
                <div
                  className="absolute inset-0 z-10 opacity-20"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(to right, transparent, transparent 10%, black 10%, black 11%)",
                  }}
                />
                <div
                  className={cn(
                    "h-full transition-all duration-1000 ease-out relative z-0",
                    barFill,
                  )}
                  style={{ width: `${intensity}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
