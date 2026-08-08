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

  /** Research programme this publication belongs to, e.g. "Data & Information Systems". */
  program?: string;
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

  /**
   * Field Note slugs that evolved into this publication (observation →
   * field note → publication pipeline). Forward-compatible field; not yet
   * surfaced in the UI.
   */
  originFieldNotes?: string[];

  /**
   * Excludes this publication from catalogues, /writing counts, article
   * indexing, and the sitemap. The direct URL still resolves — this is for
   * publications shared with specific people rather than the public.
   */
  unlisted?: boolean;
  /**
   * Requires a passcode (set via a `PUB_PASSCODE_<ID>` env var) before the
   * content renders. See src/lib/publication/access.ts.
   */
  locked?: boolean;

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

// ── Individual article (flattened chapter within a series) ─────────────────────

/**
 * A single navigable article/chapter within a publication, flattened out of
 * the manifest's nested `sections` tree — independent of its place in that
 * tree, so it can be listed, searched, and linked on its own.
 */
export interface PublicationArticle {
  /** Stable identifier: `${publicationId}/${section.id}`. */
  id: string;
  /** Article title (the section's display label). */
  title: string;
  /** Absolute site URL, e.g. "/works/publications/physics-of-information-systems/reality/reality/...". */
  url: string;
  publicationId: string;
  publicationTitle: string;
  publicationType: PublicationType;
  program?: string;
  /** Domain tags inherited from the parent publication. */
  domains: string[];
  /** ISO 8601 date, inherited from the parent publication. */
  date: string;
  /** Top-level track/group label, e.g. "Reality". */
  group?: string;
  /** Nearest parent section title, e.g. "I. Reality" — the article's immediate grouping. */
  trackTitle?: string;
}
