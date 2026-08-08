/**
 * Publication framework — barrel export
 *
 * Import from "@/components/publication" to access any component.
 */

// Semantic blocks
export {
  Callout,
  Citation,
  Decision,
  Evidence,
  Figure,
  FormalNote,
  InteractiveDemo,
  Observation,
  Reference,
  Tradeoff,
} from "./blocks";
export { CodeBlock } from "./blocks/CodeBlock";
export { Publication } from "./Publication";
export { PublicationContent, publicationComponents } from "./PublicationContent/PublicationContent";
export { PublicationFooter } from "./PublicationFooter/PublicationFooter";
export { PublicationHeader } from "./PublicationHeader/PublicationHeader";
export { PublicationMetadata } from "./PublicationMetadata/PublicationMetadata";
export { PublicationShell } from "./PublicationShell/PublicationShell";
export { PublicationSidebar } from "./PublicationSidebar/PublicationSidebar";
export { PublicationTOC } from "./PublicationTOC/PublicationTOC";
