"use client";

import Link from "next/link";
import { useHeaderTitle } from "@/components/layout/HeaderContext";
import { plexMono } from "@/lib/fonts";
import type { FieldNote } from "@/lib/field-notes/types";

function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function FieldNoteHeader({ note }: { note: FieldNote }) {
  useHeaderTitle(note.title);

  return (
    <header className="mb-10 border-b border-[#2C2E32] pb-8">
      <div className="mb-5 flex items-center gap-2">
        <Link
          href="/writing/field-notes"
          className={`${plexMono.className} text-[10px] uppercase tracking-[0.2em] text-[#4E9A8A]/70 transition-colors hover:text-[#4E9A8A]`}
        >
          Field Notes
        </Link>
      </div>

      <h1 className={`${plexMono.className} mb-4 text-2xl font-medium leading-snug text-[#ECE5D4] md:text-3xl`}>
        {note.title}
      </h1>

      <div
        className={`${plexMono.className} flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-[#8A8F99]`}
      >
        <time>{formatDate(note.date)}</time>
        <span aria-hidden="true" className="text-[#4A4F55]">
          ·
        </span>
        <span>{note.readingTime}</span>
      </div>

      {note.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
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
    </header>
  );
}
