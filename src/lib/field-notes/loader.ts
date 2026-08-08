// ─────────────────────────────────────────────────────────────────────────────
// Field Notes loader
//
// Reads field notes from content/field-notes/*.mdx — one file per note,
// frontmatter only. Mirrors the read patterns in src/lib/publication/loader.ts
// (gray-matter, fs.readdirSync) without the manifest/section machinery those
// need for multi-file publications.
// ─────────────────────────────────────────────────────────────────────────────

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { FieldNote, FieldNoteFrontmatter } from "./types";

const FIELD_NOTES_ROOT = path.join(process.cwd(), "content/field-notes");

function computeReadingTime(source: string): string {
  const words = source.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 238));
  return `${minutes} min read`;
}

function loadFieldNoteFile(filePath: string): FieldNote {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as FieldNoteFrontmatter;
  const slug = path.basename(filePath, ".mdx");

  return {
    ...frontmatter,
    slug,
    tags: frontmatter.tags ?? [],
    readingTime: computeReadingTime(content),
    source: content,
  };
}

/**
 * Returns all published field notes, sorted by date descending.
 */
export function getAllFieldNotes(): FieldNote[] {
  if (!fs.existsSync(FIELD_NOTES_ROOT)) return [];

  const files = fs.readdirSync(FIELD_NOTES_ROOT).filter((f) => f.endsWith(".mdx"));
  const notes: FieldNote[] = [];

  for (const file of files) {
    try {
      const note = loadFieldNoteFile(path.join(FIELD_NOTES_ROOT, file));
      if (note.status === "draft") continue;
      notes.push(note);
    } catch {
      // ignore invalid files
    }
  }

  return notes.sort((a, b) => (a.date > b.date ? -1 : 1));
}

/**
 * Loads a single field note by slug. Throws if not found — callers should
 * catch and call notFound(), same convention as loadPublicationDocument.
 */
export function getFieldNote(slug: string): FieldNote {
  const filePath = path.join(FIELD_NOTES_ROOT, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Field note not found: ${slug}`);
  }
  return loadFieldNoteFile(filePath);
}
