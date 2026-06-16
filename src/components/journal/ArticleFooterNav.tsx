import type { JournalEntry } from "@/lib/journal";
import { ArrowLeft, ArrowRight, LayoutList } from "lucide-react";
import Link from "next/link";

interface ArticleFooterNavProps {
  prev: JournalEntry | null; // previous in sorted list (newer entry)
  next: JournalEntry | null; // next in sorted list (older entry)
}

export function ArticleFooterNav({ prev, next }: ArticleFooterNavProps) {
  return (
    <footer className="mt-16 border-t border-neutral-200 pt-12">
      {/* ── Prev / Browse / Next ─────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-4">
        {/* Previous (newer) */}
        <div>
          {prev ? (
            <Link href={`/journal/${prev.slug}`} className="group block space-y-1">
              <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-neutral-400 transition-colors group-hover:text-neutral-600">
                <ArrowLeft className="h-3 w-3" />
                Previous
              </div>
              <p className="line-clamp-2 text-[13px] font-medium leading-snug text-neutral-600 transition-colors group-hover:text-black">
                {prev.title}
              </p>
            </Link>
          ) : null}
        </div>

        {/* Browse */}
        <div className="flex justify-center">
          <Link
            href="/journal"
            className="group flex flex-col items-center gap-1.5 text-neutral-400 transition-colors hover:text-neutral-900"
          >
            <LayoutList className="h-4 w-4" />
            <span className="font-mono text-[9px] uppercase tracking-[0.18em]">
              Browse
            </span>
          </Link>
        </div>

        {/* Next (older) */}
        <div className="text-right">
          {next ? (
            <Link href={`/journal/${next.slug}`} className="group block space-y-1">
              <div className="flex items-center justify-end gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-neutral-400 transition-colors group-hover:text-neutral-600">
                Next
                <ArrowRight className="h-3 w-3" />
              </div>
              <p className="line-clamp-2 text-[13px] font-medium leading-snug text-neutral-600 transition-colors group-hover:text-black">
                {next.title}
              </p>
            </Link>
          ) : null}
        </div>
      </div>

      {/* ── Copyright ────────────────────────────────────────────────── */}
      <div className="mt-10 border-t border-neutral-100 pt-6 text-center">
        <p className="text-[11px] text-neutral-300">
          &copy; {new Date().getFullYear()} Shreyas Agarwal
        </p>
      </div>
    </footer>
  );
}
