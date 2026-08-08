"use client";

import type { ReactNode } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { plexMono } from "@/lib/fonts";

interface AnnotatedTermProps {
  note: string;
  children: ReactNode;
}

/**
 * The one hover-reveal mechanism on the page: anchored to a specific named
 * thing (a lab, a stack tag, a term) with real reasoning about that item.
 * Factual context, not a human pausing to flag doubt — stays in graphite/
 * chalk, never red. That's RedPenNote's job, a separate mechanism.
 */
export function AnnotatedTerm({ note, children }: AnnotatedTermProps) {
  return (
    <HoverCard openDelay={150}>
      <HoverCardTrigger asChild>
        <span className="cursor-help border-b border-dotted border-[#E6E1D6]/25 transition-colors hover:border-[#E6E1D6]/50">
          {children}
        </span>
      </HoverCardTrigger>
      <HoverCardContent
        side="top"
        align="start"
        sideOffset={8}
        className="w-64 border-[#E6E1D6]/10 bg-[#25282A] p-3"
      >
        <p className={`${plexMono.className} text-xs leading-relaxed text-[#E6E1D6]/80`}>{note}</p>
      </HoverCardContent>
    </HoverCard>
  );
}
