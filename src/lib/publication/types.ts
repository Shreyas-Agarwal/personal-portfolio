// ─────────────────────────────────────────────────────────────────────────────
// Publication framework — shared TypeScript types
//
// Every piece of publication data flows through these types. The loader
// produces them; the components consume them. Nothing in the rendering layer
// should parse raw frontmatter directly.
// ─────────────────────────────────────────────────────────────────────────────

// ── Document types ────────────────────────────────────────────────────────────

export type PublicationType =
  | "case-study"
  | "research"
  | "adr-collection"
  | "essay"
  | "white-paper"
  | "architecture-notes"
  | "design-review"
  | "rfc";

export type PublicationStatus =
  | "draft"
  | "in-review"
  | "accepted"
  | "published"
  | "superseded"
  | "deprecated";

// ── Sidebar structure ─────────────────────────────────────────────────────────

/**
 * A single entry in the publication sidebar navigation tree.
 * Children are nested sections (e.g. design notes under Architecture).
 */
export interface PublicationSection {
  /** Machine-readable identifier, used in cross-references and URLs. */
  id: string;
  /** Display label in the sidebar. */
  title: string;
  /**
   * Relative URL within the publication.
   * When omitted, the section is a non-navigable group header (label only).
   */
  href?: string;
  /** Optional group divider label above this section (e.g. "Architecture"). */
  group?: string;
  children?: PublicationSection[];
}

// ── Publication manifest ──────────────────────────────────────────────────────

/**
 * The authoritative descriptor for a publication.
 * Loaded from publication.json or MDX frontmatter; passed to all shell components.
 */
export interface PublicationManifest {
  /** Unique identifier, used as the base URL segment. */
  id: string;
  type: PublicationType;

  /** Display title of the publication. */
  title: string;
  subtitle?: string;
  /** Short description for SEO and listing cards. */
  abstract?: string;

  /** e.g. "Volume I" — editorial volume label. */
  volume?: string;
  /** e.g. "Revision 03" */
  revision?: string;
  /** ISO 8601 date string */
  date: string;
  /** Human-readable reading time, e.g. "24 min read" */
  readingTime?: string;

  /** Domain tags, e.g. ["Systems Architecture", "Data Engineering"] */
  domains: string[];
  /** Author(s) display string */
  author?: string;
  /** GitHub repository URL if applicable */
  github?: string;

  status?: PublicationStatus;

  /** Ordered sidebar sections — defines navigation and URL structure. */
  sections: PublicationSection[];
}

// ── TOC heading ───────────────────────────────────────────────────────────────

export interface TocHeading {
  id: string;
  text: string;
  level: 1 | 2 | 3 | 4;
}

// ── Resolved document ─────────────────────────────────────────────────────────

/**
 * A fully resolved publication document, ready to render.
 * Produced by the publication loader for a specific slug path.
 */
export interface PublicationDocument {
  manifest: PublicationManifest;
  /** The current section being viewed. */
  current: PublicationSection;
  /** Raw MDX source — passed to the MDX renderer. */
  source: string;
  /** Frontmatter extracted from the MDX file. */
  frontmatter: Record<string, unknown>;
  /** Headings extracted for TOC generation. */
  toc: TocHeading[];
  prev?: PublicationSection;
  next?: PublicationSection;
}
