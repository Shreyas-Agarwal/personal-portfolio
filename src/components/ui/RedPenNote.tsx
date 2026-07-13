"use client";

import type { ReactNode } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { plexMono, serif } from "@/lib/fonts";

export type RedPenType =
  | "Open question"
  | "Tradeoff"
  | "Todo"
  | "Revision note"
  | "Architectural tension"
  | "Unresolved";

interface RedPenNoteProps {
  type: RedPenType;
  note: string;
  children: ReactNode;
}

/**
 * The red pen — a human pausing to flag doubt, not factual context (that's
 * AnnotatedTerm, kept neutral). Marks a contested phrase with a wavy
 * underline; the hover reveals the specific doubt. One of the six defined
 * moment types only. Keep total usage sparse — this is authorial annotation,
 * not a UI affordance.
 */
export function RedPenNote({ type, note, children }: RedPenNoteProps) {
  return (
    <HoverCard openDelay={150}>
      <HoverCardTrigger asChild>
        <span
          className="cursor-help text-[#DE4B31] decoration-wavy decoration-[#DE4B31] underline underline-offset-4"
        >
          {children}
        </span>
      </HoverCardTrigger>
      <HoverCardContent
        side="top"
        align="start"
        sideOffset={8}
        className="w-72 border-[#DE4B31]/25 bg-[#25282A] p-3"
      >
        <span
          className={`${plexMono.className} mb-2 block text-[9px] uppercase tracking-[0.18em] text-[#DE4B31]`}
        >
          {type}
        </span>
        <p className={`${serif.className} text-sm italic leading-relaxed text-[#E6E1D6]/85`}>
          {note}
        </p>
      </HoverCardContent>
    </HoverCard>
  );
}
