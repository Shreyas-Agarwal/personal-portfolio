import Link from "next/link";
import { plexMono } from "@/lib/fonts";
import type { FieldNote } from "@/lib/field-notes/types";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function FieldNoteCard({ note }: { note: FieldNote }) {
  return (
    <article className="group relative py-5">
      <Link href={`/writing/field-notes/${note.slug}`} className="after:absolute after:inset-0" />
      <div
        className={`${plexMono.className} flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] uppercase tracking-wider text-[#8A8F99]`}
      >
        <time>{formatDate(note.date)}</time>
        <span aria-hidden="true" className="text-[#4A4F55]">
          ·
        </span>
        <span>{note.readingTime}</span>
      </div>

      <h3
        className={`${plexMono.className} mt-2 text-base font-medium leading-snug text-[#ECE5D4] transition-colors group-hover:text-[#4E9A8A]`}
      >
        {note.title}
      </h3>

      {note.excerpt && (
        <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-[#A0A5AD]">{note.excerpt}</p>
      )}

      {note.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {note.tags.map((tag) => (
            <span
              key={tag}
              className={`${plexMono.className} rounded-xs border border-[#33373B] px-2 py-0.5 text-[10px] text-[#8A8F99]`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
