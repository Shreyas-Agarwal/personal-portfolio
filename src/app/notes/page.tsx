import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { ArrowRight, Clock, Tag } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Notes",
  description: "Archive of systems thinking, architectural reflections, and technical notes.",
};

interface NoteData {
  slug: string;
  title: string;
  subtitle?: string;
  category?: string;
  year?: string;
  tags?: string[];
}

function getNotes(): NoteData[] {
  const notesDirectory = path.join(process.cwd(), "content/notes");
  if (!fs.existsSync(notesDirectory)) return [];

  const filenames = fs.readdirSync(notesDirectory);
  const notes = filenames
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => {
      const filePath = path.join(notesDirectory, filename);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContent);

      return {
        slug: filename.replace(/\.md$/, ""),
        title: data.title || filename.replace(/\.md$/, ""),
        subtitle: data.subtitle,
        category: data.category,
        year: data.year,
        tags: data.tags,
      };
    });

  return notes;
}

export default function NotesIndexPage() {
  const notes = getNotes();

  return (
    <div
      data-header-theme="light"
      className="min-h-screen bg-[#F3F1EC] text-[#1a1a1a] selection:bg-black/10"
    >
      {/* Notes Archive Header */}
      <header className="border-b border-neutral-200 bg-white/50 backdrop-blur-md">
        <div className="mx-auto max-w-4xl px-6 py-24 md:px-12">
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight text-black md:text-5xl lg:text-6xl">
                Research Notes
              </h1>
              <p className="max-w-2xl text-xl leading-relaxed text-neutral-600">
                An archive of systems thinking, architectural reflections, and technical
                observations.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Notes List */}
      <main className="mx-auto max-w-4xl px-6 py-24 md:px-12">
        <div className="space-y-16">
          {notes.map((note) => (
            <article
              key={note.slug}
              className="group relative flex flex-col items-start justify-between border-l-2 border-neutral-200 pl-6 transition-colors hover:border-black md:flex-row md:items-center"
            >
              <div className="flex-1 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  {note.category && (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                      {note.category}
                    </span>
                  )}
                  {note.year && (
                    <span className="flex items-center gap-1.5 text-[11px] font-medium text-neutral-400">
                      <Clock className="h-3 w-3" />
                      {note.year}
                    </span>
                  )}
                </div>

                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-black">
                    <Link href={`/notes/${note.slug}`} className="before:absolute before:inset-0">
                      {note.title}
                    </Link>
                  </h2>
                  {note.subtitle && (
                    <p className="mt-2 text-lg text-neutral-600 line-clamp-2">{note.subtitle}</p>
                  )}
                </div>

                {note.tags && note.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {note.tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1 text-[11px] font-medium text-neutral-400"
                      >
                        <Tag className="h-3 w-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6 flex shrink-0 items-center gap-2 text-sm font-medium text-black opacity-0 transition-opacity group-hover:opacity-100 md:mt-0 md:ml-8">
                Read Note
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
