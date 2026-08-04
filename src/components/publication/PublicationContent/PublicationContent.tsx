/**
 * PublicationContent — MDX renderer
 *
 * Renders the MDX source for a publication document.
 * All standard markdown elements are routed through mdx-primitives.tsx
 * via the global mdx-components.tsx file.
 *
 * Custom semantic blocks (Observation, Decision, Evidence, etc.) must be
 * imported explicitly inside each .mdx file or provided via the components
 * prop below.
 *
 * This is a Server Component — MDX compilation happens on the server.
 */

import type { ReactNode } from "react";
import {
  Callout,
  Citation,
  Decision,
  Evidence,
  Figure,
  InteractiveDemo,
  Observation,
  Process,
  Reference,
  Step,
  Tradeoff,
} from "@/components/publication/blocks";
import { CodeBlock } from "@/components/publication/blocks/CodeBlock";

/**
 * Components available to every publication MDX file without an explicit import.
 * These are injected as the MDX component map so authors don't need to import
 * semantic blocks manually.
 */
export const publicationComponents = {
  Figure,
  Observation,
  Decision,
  Evidence,
  Tradeoff,
  Callout,
  Reference,
  Citation,
  InteractiveDemo,
  Process,
  Step,
  CodeBlock,
};

/**
 * Wrapper around the MDX output — provides consistent spacing and
 * the correct document prose context.
 */
export function PublicationContent({ children }: { children: ReactNode }) {
  return <article className="min-h-[60vh]">{children}</article>;
}
