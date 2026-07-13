import { plexMono } from "@/lib/fonts";
import type { RedPenType } from "./RedPenNote";

interface RedPenMarginProps {
  type: RedPenType;
}

/** A tag hanging off a line, e.g. "← TODO" — the margin-note half of the red pen. */
export function RedPenMargin({ type }: RedPenMarginProps) {
  return (
    <span
      className={`${plexMono.className} whitespace-nowrap text-[9px] uppercase tracking-[0.14em] text-[#DE4B31]`}
    >
      ← {type}
    </span>
  );
}
