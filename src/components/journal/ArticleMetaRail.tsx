import type { JournalEntry } from "@/lib/journal";
import { DOMAIN_TEXT_COLORS } from "./ArticleHeader";

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(d);
  } catch {
    return iso;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function MetaRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
        {label}
      </p>
      {children}
    </div>
  );
}

const Divider = () => <div className="border-t border-neutral-100" />;

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

interface ArticleMetaRailProps {
  entry: JournalEntry;
  readingTime: string;
}

export function ArticleMetaRail({ entry, readingTime }: ArticleMetaRailProps) {
  const publishedLabel = entry.published
    ? formatDate(entry.published)
    : entry.year;

  const updatedLabel = entry.updated ? formatDate(entry.updated) : null;

  return (
    <aside className="space-y-5">
      <MetaRow label="Reading Time">
        <p className="text-[12px] text-neutral-600">{readingTime}</p>
      </MetaRow>

      <Divider />

      <MetaRow label="Format">
        <p className="text-[12px] text-neutral-600">{entry.format}</p>
      </MetaRow>

      {entry.domains.length > 0 && (
        <>
          <Divider />
          <MetaRow label="Domains">
            <div className="space-y-1">
              {entry.domains.map((d) => (
                <p
                  key={d}
                  className={`text-[12px] font-medium ${DOMAIN_TEXT_COLORS[d] ?? "text-neutral-600"}`}
                >
                  {d}
                </p>
              ))}
            </div>
          </MetaRow>
        </>
      )}

      {entry.series && (
        <>
          <Divider />
          <MetaRow label="Series">
            <p className="text-[12px] text-neutral-600">
              {entry.series}{entry.part != null ? ` · Part ${entry.part}` : ""}
            </p>
          </MetaRow>
        </>
      )}

      <Divider />

      <MetaRow label="Published">
        <p className="text-[12px] text-neutral-600">{publishedLabel}</p>
      </MetaRow>

      {updatedLabel && (
        <>
          <Divider />
          <MetaRow label="Updated">
            <p className="text-[12px] text-neutral-600">{updatedLabel}</p>
          </MetaRow>
        </>
      )}

      {entry.tags.length > 0 && (
        <>
          <Divider />
          <MetaRow label="Tags">
            <div className="flex flex-wrap gap-x-2 gap-y-1">
              {entry.tags.map((t) => (
                <span key={t} className="text-[11px] text-neutral-400">
                  #{t}
                </span>
              ))}
            </div>
          </MetaRow>
        </>
      )}

      {entry.github && (
        <>
          <Divider />
          <MetaRow label="Repository">
            <a
              href={entry.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] text-neutral-500 underline underline-offset-2 transition-colors hover:text-neutral-900"
            >
              View on GitHub ↗
            </a>
          </MetaRow>
        </>
      )}
    </aside>
  );
}
