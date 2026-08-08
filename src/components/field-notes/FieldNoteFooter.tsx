import Link from "next/link";
import { plexMono } from "@/lib/fonts";
import type { FieldNote } from "@/lib/field-notes/types";

function NavCard({
  note,
  direction,
}: {
  note: FieldNote;
  direction: "prev" | "next";
}) {
  const isPrev = direction === "prev";

  return (
    <Link
      href={`/writing/field-notes/${note.slug}`}
      className={`group flex flex-col gap-2 border border-[#2C2E32] px-5 py-4 transition-colors duration-200 hover:border-[#4E9A8A]/40 ${
        isPrev ? "" : "items-end text-right"
      }`}
    >
      <span
        className={`${plexMono.className} flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] text-[#8A8F99] transition-colors group-hover:text-[#4E9A8A]`}
      >
        {isPrev && (
          <span aria-hidden="true" className="transition-transform group-hover:-translate-x-0.5">
            ←
          </span>
        )}
        <span>{isPrev ? "Older" : "Newer"}</span>
        {!isPrev && (
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        )}
      </span>
      <span
        className={`${plexMono.className} text-[13px] leading-snug text-[#ECE5D4]/80 transition-colors group-hover:text-[#ECE5D4]`}
      >
        {note.title}
      </span>
    </Link>
  );
}

export function FieldNoteFooter({ prev, next }: { prev?: FieldNote; next?: FieldNote }) {
  return (
    <footer className="mt-16 border-t border-[#2C2E32] pt-10">
      {(prev || next) && (
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {prev ? <NavCard note={prev} direction="prev" /> : <div />}
          {next && <NavCard note={next} direction="next" />}
        </div>
      )}
      <Link
        href="/writing/field-notes"
        className={`${plexMono.className} inline-flex items-center gap-1.5 text-xs text-[#4E9A8A] uppercase tracking-wider hover:gap-2.5 transition-all`}
      >
        <span>←</span> All Field Notes
      </Link>
    </footer>
  );
}
