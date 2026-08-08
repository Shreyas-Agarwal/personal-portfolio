import { plexMono } from "@/lib/fonts";
import type { ChangelogEntry } from "@/lib/changelog";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function ChangelogEntryCard({ entry }: { entry: ChangelogEntry }) {
  return (
    <article className="py-5">
      <div
        className={`${plexMono.className} flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] uppercase tracking-wider text-[#8A8F99]`}
      >
        <span className="text-[#4E9A8A]">{entry.revision}</span>
        <span aria-hidden="true" className="text-[#4A4F55]">
          ·
        </span>
        <time>{formatDate(entry.date)}</time>
      </div>

      <h3
        className={`${plexMono.className} mt-2 text-base font-medium leading-snug text-[#ECE5D4]`}
      >
        {entry.title}
      </h3>

      <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-[#A0A5AD]">
        {entry.description}
      </p>

      {entry.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {entry.tags.map((tag) => (
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
