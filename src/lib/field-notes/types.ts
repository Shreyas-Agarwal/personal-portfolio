// ─────────────────────────────────────────────────────────────────────────────
// Field Notes — shared TypeScript types
//
// A field note is a single short MDX file (no manifest, no sections) —
// deliberately lighter-weight than the Publication framework.
// ─────────────────────────────────────────────────────────────────────────────

export type FieldNoteStatus = "draft" | "published";

export interface FieldNoteFrontmatter {
  title: string;
  /** ISO 8601 date string */
  date: string;
  tags?: string[];
  /** Short hook shown in list views. */
  excerpt?: string;
  status?: FieldNoteStatus;
  /**
   * Id of a content/publications/<id> this note may later evolve into.
   * Forward-compatible field for the observation → field note → publication
   * pipeline; not yet surfaced in the UI.
   */
  relatedPublication?: string;
}

export interface FieldNote extends FieldNoteFrontmatter {
  slug: string;
  tags: string[];
  /** Human-readable reading time, e.g. "3 min read" */
  readingTime: string;
  /** Raw MDX body (frontmatter stripped) — passed to compileMDX. */
  source: string;
}
