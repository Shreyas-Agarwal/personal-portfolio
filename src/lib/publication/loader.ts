// ─────────────────────────────────────────────────────────────────────────────
// Publication loader
//
// Reads a publication from the filesystem. A publication is a directory
// containing a publication.json manifest and one or more .mdx files.
//
// Usage:
//   const doc = await loadPublicationDocument(
//     "/content/projects/case-studies/desktop-connector",
//     ["notes", "0001-native-change-detection"]
//   );
// ─────────────────────────────────────────────────────────────────────────────

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { parseTocHeadings } from "./toc";
import type { PublicationDocument, PublicationManifest, PublicationSection } from "./types";

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Resolves a publication ID or path to its absolute filesystem root.
 */
export function resolvePublicationSource(idOrPath: string): string {
  if (path.isAbsolute(idOrPath)) return idOrPath;

  const candidates = [
    idOrPath,
    path.join("content/publications", idOrPath),
    path.join("content/projects/case-studies", idOrPath),
    path.join("content", idOrPath),
  ];

  for (const rel of candidates) {
    const abs = path.join(process.cwd(), rel);
    if (fs.existsSync(abs)) return rel;
  }

  return idOrPath;
}

function resolvePublicationRoot(source: string): string {
  const resolved = resolvePublicationSource(source);
  if (path.isAbsolute(resolved)) return resolved;
  return path.join(process.cwd(), resolved);
}

function flattenSections(sections: PublicationSection[]): PublicationSection[] {
  const result: PublicationSection[] = [];
  for (const s of sections) {
    // Only include sections that have an href — they are navigable pages.
    // Sections without href are group header labels only.
    if (s.href !== undefined) {
      result.push(s);
    }
    if (s.children) result.push(...flattenSections(s.children));
  }
  return result;
}

/**
 * Estimate reading time from MDX source (strips frontmatter).
 */
function computeReadingTime(source: string): string {
  const words = source.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 238));
  return `${minutes} min read`;
}

// ── Manifest loading ──────────────────────────────────────────────────────────

/**
 * Loads and validates the publication manifest from publication.json.
 * Falls back to a generated manifest if the JSON doesn't exist (single-file publications).
 */
export function loadPublicationManifest(publicationRoot: string): PublicationManifest {
  const manifestPath = path.join(publicationRoot, "publication.json");

  if (!fs.existsSync(manifestPath)) {
    // Single-file publication: look for index.mdx and generate a minimal manifest
    const indexPath = path.join(publicationRoot, "index.mdx");
    if (!fs.existsSync(indexPath)) {
      throw new Error(`No publication.json or index.mdx found in ${publicationRoot}`);
    }
    const { data } = matter(fs.readFileSync(indexPath, "utf8"));
    const id = path.basename(publicationRoot);
    return {
      id,
      type: (data.type as PublicationManifest["type"]) ?? "essay",
      title: (data.title as string) ?? id,
      subtitle: data.subtitle as string | undefined,
      abstract: data.abstract as string | undefined,
      volume: data.volume as string | undefined,
      revision: data.revision as string | undefined,
      date: (data.date as string) ?? new Date().toISOString().slice(0, 10),
      domains: (data.domains as string[]) ?? [],
      author: data.author as string | undefined,
      github: data.github as string | undefined,
      status: data.status as PublicationManifest["status"],
      sections: [{ id: "index", title: (data.title as string) ?? id, href: "" }],
    };
  }

  const raw = fs.readFileSync(manifestPath, "utf8");
  return JSON.parse(raw) as PublicationManifest;
}

// ── Document loading ──────────────────────────────────────────────────────────

/**
 * Loads a fully resolved publication document for a given slug path.
 *
 * @param source   Path to the publication root directory (absolute or relative to cwd).
 * @param slugPath Remaining URL segments after the publication root, e.g. ["notes", "0001-change-detection"].
 *                 Empty array → loads index.mdx.
 */
export async function loadPublicationDocument(
  source: string,
  slugPath: string[],
): Promise<PublicationDocument> {
  const root = resolvePublicationRoot(source);
  const manifest = loadPublicationManifest(root);
  const flat = flattenSections(manifest.sections);

  const currentHref = slugPath.length === 0 ? "" : slugPath.join("/");
  const current = flat.find((s) => s.href === currentHref);

  if (!current) {
    throw new Error(`Section href '${currentHref}' not found in manifest for ${source}`);
  }

  // Determine MDX file path
  const mdxRelative = current.href === "" ? "index.mdx" : `${current.href}.mdx`;
  const mdxPath = path.join(root, mdxRelative);

  if (!fs.existsSync(mdxPath)) {
    throw new Error(`MDX file not found: ${mdxPath}`);
  }

  const fileContent = fs.readFileSync(mdxPath, "utf8");
  const { data: frontmatter, content: source_content } = matter(fileContent);

  // Compute reading time from the whole file (including frontmatter)
  const readingTime = manifest.readingTime ?? computeReadingTime(source_content);

  // Inject reading time into manifest if not set
  const resolvedManifest: PublicationManifest = {
    ...manifest,
    readingTime,
  };

  // TOC from the actual MDX source
  const toc = parseTocHeadings(source_content);

  // Prev / next navigation from flattened sections
  const currentIndex = flat.findIndex((s) => s.id === current.id);
  const prev = currentIndex > 0 ? flat[currentIndex - 1] : undefined;
  const next = currentIndex < flat.length - 1 ? flat[currentIndex + 1] : undefined;

  return {
    manifest: resolvedManifest,
    current,
    source: fileContent, // full MDX including frontmatter (passed to next-mdx renderer)
    frontmatter,
    toc,
    prev,
    next,
  };
}

/**
 * Returns all section slugs for a publication — used by Next.js generateStaticParams.
 */
export function getPublicationSlugs(source: string): string[][] {
  const root = resolvePublicationRoot(source);
  const manifest = loadPublicationManifest(root);
  const flat = flattenSections(manifest.sections);

  return flat
    .filter((s) => s.href !== undefined)
    .map((s) => (s.href === "" ? [] : (s.href as string).split("/")));
}

/**
 * Returns all available publication manifests sorted by date descending.
 */
export function getAllPublications(): PublicationManifest[] {
  const root = path.join(process.cwd(), "content/publications");
  if (!fs.existsSync(root)) return [];

  const dirs = fs.readdirSync(root, { withFileTypes: true });
  const manifests: PublicationManifest[] = [];

  for (const dir of dirs) {
    if (!dir.isDirectory()) continue;
    try {
      const manifest = loadPublicationManifest(path.join(root, dir.name));
      manifests.push(manifest);
    } catch {
      // ignore invalid directories
    }
  }

  return manifests.sort((a, b) => (a.date > b.date ? -1 : 1));
}
