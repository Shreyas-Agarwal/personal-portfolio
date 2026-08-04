/**
 * Publication semantic blocks — Paper Insert Theme
 *
 * Styled as physical cream paper inserts (#ECE5D4) with dark charcoal typography (#1B1D1F),
 * tying directly back to the visual language of the landing page (src/app/page.tsx).
 */

"use client";

import type { ReactNode } from "react";
import { plexMono, serif } from "@/lib/fonts";

// ─────────────────────────────────────────────────────────────────────────────
// Base block primitive — Paper Insert style
// ─────────────────────────────────────────────────────────────────────────────

interface BlockProps {
  label: string;
  marker: string;
  accentColor: string;
  borderColor: string;
  children: ReactNode;
  number?: number;
}

function SemanticBlock({ label, marker, accentColor, borderColor, children, number }: BlockProps) {
  return (
    <div
      className={`my-10 border-l-4 ${borderColor} bg-[#ECE5D4] p-6 shadow-sm border border-[#D9D0BC] text-[#1B1D1F] [&_p]:!text-[#1B1D1F] [&_span]:!text-[#1B1D1F] [&_strong]:!text-[#1B1D1F] [&_em]:!text-[#1B1D1F] [&_li]:!text-[#1B1D1F] [&_code]:!bg-[#E5DCCB] [&_code]:!text-[#DE4B31] [&_code]:border [&_code]:border-[#D9D0BC] [&_code]:rounded [&_code]:px-1.5 [&_code]:py-0.5`}
    >
      <div className="mb-3 flex items-center gap-2">
        <span
          className={`${plexMono.className} text-[9px] font-bold uppercase tracking-[0.22em] ${accentColor} !text-[#1B1D1F]`}
        >
          {marker}
          {number !== undefined ? ` ${String(number).padStart(2, "0")}` : ""} — {label}
        </span>
      </div>
      <div
        className={`${serif.className} text-[16px] leading-[1.85] text-[#1B1D1F] [&_p]:!text-[#1B1D1F] [&_span]:!text-[#1B1D1F] [&_strong]:!text-[#1B1D1F] [&_em]:!text-[#1B1D1F]`}
      >
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Process & Step — ordered architectural workflow / series
// ─────────────────────────────────────────────────────────────────────────────

export function Process({ children }: { children: ReactNode }) {
  return (
    <div className="my-10 space-y-4 border-l-2 border-[#D9D0BC] pl-4 md:pl-6 text-[#1B1D1F]">
      {children}
    </div>
  );
}

export function Step({ title, children, n }: { title?: string; children: ReactNode; n?: number }) {
  return (
    <div className="my-4 border border-[#D9D0BC] bg-[#ECE5D4] p-5 shadow-sm text-[#1B1D1F] [&_p]:!text-[#1B1D1F] [&_span]:!text-[#1B1D1F] [&_strong]:!text-[#1B1D1F] [&_code]:!bg-[#E5DCCB] [&_code]:!text-[#DE4B31] [&_code]:border [&_code]:border-[#D9D0BC] [&_code]:rounded [&_code]:px-1.5 [&_code]:py-0.5">
      {title && (
        <div className="mb-2 flex items-center gap-2">
          <span
            className={`${plexMono.className} text-[9px] font-extrabold uppercase tracking-[0.2em] !text-[#DE4B31]`}
          >
            {n !== undefined ? `STEP ${String(n).padStart(2, "0")}` : "STEP"}
          </span>
          <span className={`${serif.className} text-[15px] font-bold !text-[#1B1D1F]`}>
            — {title}
          </span>
        </div>
      )}
      <div
        className={`${serif.className} text-[15px] leading-relaxed text-[#1B1D1F] [&_p]:!text-[#1B1D1F] [&_span]:!text-[#1B1D1F] [&_strong]:!text-[#1B1D1F]`}
      >
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Observation — an empirical finding from the field
// ─────────────────────────────────────────────────────────────────────────────

export function Observation({ children, n }: { children: ReactNode; n?: number }) {
  return (
    <SemanticBlock
      label="Observation"
      marker="OBS"
      accentColor="!text-[#1B1D1F]"
      borderColor="border-[#DE4B31]"
      number={n}
    >
      {children}
    </SemanticBlock>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Decision — an architectural decision record entry
// ─────────────────────────────────────────────────────────────────────────────

export function Decision({
  children,
  n,
  status,
}: {
  children: ReactNode;
  n?: number;
  status?: "proposed" | "accepted" | "superseded" | "deprecated";
}) {
  const statusLabel = status ? ` · ${status.toUpperCase()}` : "";

  return (
    <div className="my-10 border border-[#D9D0BC] bg-[#ECE5D4] p-6 shadow-sm border-l-4 border-violet-800 text-[#1B1D1F] [&_p]:!text-[#1B1D1F] [&_span]:!text-[#1B1D1F] [&_strong]:!text-[#1B1D1F] [&_em]:!text-[#1B1D1F] [&_code]:!bg-[#E5DCCB] [&_code]:!text-[#DE4B31] [&_code]:border [&_code]:border-[#D9D0BC] [&_code]:rounded [&_code]:px-1.5 [&_code]:py-0.5">
      <div className="mb-4 flex items-center justify-between">
        <span
          className={`${plexMono.className} text-[9px] font-bold uppercase tracking-[0.22em] !text-[#1B1D1F]`}
        >
          DEC{n !== undefined ? ` ${String(n).padStart(2, "0")}` : ""} — Decision{statusLabel}
        </span>
        {status && (
          <span
            className={`${plexMono.className} rounded px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] ${
              status === "accepted"
                ? "bg-emerald-800/15 !text-emerald-950 border border-emerald-800/40"
                : status === "superseded" || status === "deprecated"
                  ? "bg-stone-300/60 !text-stone-900 border border-stone-400/40"
                  : "bg-amber-800/15 !text-amber-950 border border-amber-800/40"
            }`}
          >
            {status}
          </span>
        )}
      </div>
      <div
        className={`${serif.className} text-[16px] leading-[1.85] text-[#1B1D1F] [&_p]:!text-[#1B1D1F] [&_span]:!text-[#1B1D1F] [&_strong]:!text-[#1B1D1F] [&_em]:!text-[#1B1D1F]`}
      >
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Evidence — supporting data or measurement
// ─────────────────────────────────────────────────────────────────────────────

export function Evidence({ children, n }: { children: ReactNode; n?: number }) {
  return (
    <SemanticBlock
      label="Evidence"
      marker="EVD"
      accentColor="!text-[#1B1D1F]"
      borderColor="border-emerald-700"
      number={n}
    >
      {children}
    </SemanticBlock>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Tradeoff — explicit trade-off analysis
// ─────────────────────────────────────────────────────────────────────────────

export function Tradeoff({
  children,
  gain,
  cost,
}: {
  children?: ReactNode;
  gain?: string;
  cost?: string;
}) {
  return (
    <div className="my-10 border border-[#D9D0BC] bg-[#ECE5D4] p-6 shadow-sm border-l-4 border-[#1B1D1F] text-[#1B1D1F] [&_p]:!text-[#1B1D1F] [&_span]:!text-[#1B1D1F] [&_strong]:!text-[#1B1D1F] [&_em]:!text-[#1B1D1F] [&_code]:!bg-[#E5DCCB] [&_code]:!text-[#DE4B31] [&_code]:border [&_code]:border-[#D9D0BC] [&_code]:rounded [&_code]:px-1.5 [&_code]:py-0.5">
      <span
        className={`${plexMono.className} mb-4 block text-[9px] font-bold uppercase tracking-[0.22em] !text-[#1B1D1F]`}
      >
        TRD — Trade-off
      </span>

      {(gain || cost) && (
        <div className="mb-5 grid grid-cols-1 md:grid-cols-2 gap-0 border border-[#D9D0BC] bg-[#E5DCCB]">
          <div className="border-b md:border-b-0 md:border-r border-[#D9D0BC] p-4">
            <span
              className={`${plexMono.className} mb-2 block text-[9px] font-extrabold uppercase tracking-[0.18em] !text-emerald-950`}
            >
              Gain
            </span>
            <p className={`${serif.className} text-sm leading-relaxed !text-[#1B1D1F]`}>{gain}</p>
          </div>
          <div className="p-4">
            <span
              className={`${plexMono.className} mb-2 block text-[9px] font-extrabold uppercase tracking-[0.18em] !text-[#DE4B31]`}
            >
              Cost
            </span>
            <p className={`${serif.className} text-sm leading-relaxed !text-[#1B1D1F]`}>{cost}</p>
          </div>
        </div>
      )}

      {children && (
        <div
          className={`${serif.className} text-[16px] leading-[1.85] text-[#1B1D1F] [&_p]:!text-[#1B1D1F] [&_span]:!text-[#1B1D1F] [&_strong]:!text-[#1B1D1F] [&_em]:!text-[#1B1D1F]`}
        >
          {children}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Callout — generic semantic callout
// ─────────────────────────────────────────────────────────────────────────────

type CalloutVariant = "note" | "warning" | "important" | "historical" | "constraint" | "failure";

const CALLOUT_VARIANTS: Record<CalloutVariant, { label: string; accent: string; border: string }> =
  {
    note: {
      label: "Note",
      accent: "!text-[#1B1D1F]",
      border: "border-[#1B1D1F]",
    },
    warning: {
      label: "Warning",
      accent: "!text-[#1B1D1F]",
      border: "border-amber-700",
    },
    important: {
      label: "Important",
      accent: "!text-[#1B1D1F]",
      border: "border-[#DE4B31]",
    },
    historical: {
      label: "Historical Context",
      accent: "!text-[#1B1D1F]",
      border: "border-sky-700",
    },
    constraint: {
      label: "Constraint",
      accent: "!text-[#1B1D1F]",
      border: "border-orange-700",
    },
    failure: {
      label: "Failure Mode",
      accent: "!text-[#1B1D1F]",
      border: "border-[#DE4B31]",
    },
  };

export function Callout({ type = "note", children }: { type?: string; children: ReactNode }) {
  const variant = (type && CALLOUT_VARIANTS[type as CalloutVariant]) || CALLOUT_VARIANTS.note;
  return (
    <SemanticBlock
      label={variant.label}
      marker="—"
      accentColor={variant.accent}
      borderColor={variant.border}
    >
      {children}
    </SemanticBlock>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Figure — numbered figure with caption
// ─────────────────────────────────────────────────────────────────────────────

export function Figure({
  n,
  title,
  caption,
  children,
}: {
  n?: number;
  title?: string;
  caption?: string;
  children: ReactNode;
}) {
  return (
    <figure className="my-12 border border-[#D9D0BC] bg-[#ECE5D4] p-6 shadow-sm text-[#1B1D1F] [&_p]:!text-[#1B1D1F] [&_span]:!text-[#1B1D1F] [&_code]:!bg-[#E5DCCB] [&_code]:!text-[#DE4B31] [&_code]:border [&_code]:border-[#D9D0BC] [&_code]:rounded [&_code]:px-1.5 [&_code]:py-0.5">
      <div className="mb-4 border-b border-[#D9D0BC] pb-3">
        <span
          className={`${plexMono.className} text-[10px] font-bold uppercase tracking-[0.22em] !text-[#1B1D1F]`}
        >
          {n !== undefined ? `Figure ${n}` : "Figure"}
          {title ? ` — ${title}` : ""}
        </span>
      </div>

      <div className="overflow-x-auto text-[#1B1D1F]">{children}</div>

      {caption && (
        <figcaption className={`${serif.className} mt-3 text-xs italic !text-[#1B1D1F]`}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function Reference({
  title,
  url,
  author,
  year,
}: {
  title: string;
  url?: string;
  author?: string;
  year?: string | number;
}) {
  return (
    <div className="my-4 border border-[#D9D0BC] bg-[#ECE5D4] p-4 text-xs text-[#1B1D1F] [&_p]:!text-[#1B1D1F]">
      <span className={`${serif.className} font-bold !text-[#1B1D1F]`}>{title}</span>
      {author && <span className={`${plexMono.className} ml-2 !text-[#1B1D1F]`}>by {author}</span>}
      {year && <span className={`${plexMono.className} ml-2 !text-[#1B1D1F]`}>({year})</span>}
      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${plexMono.className} ml-3 font-bold !text-[#DE4B31] underline hover:opacity-80`}
        >
          Source ↗
        </a>
      )}
    </div>
  );
}

export function Citation({ children }: { children: ReactNode }) {
  return (
    <span className={`${plexMono.className} text-[10px] text-[#DE4B31] font-bold`}>
      [{children}]
    </span>
  );
}

export function InteractiveDemo({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="my-10 border border-[#D9D0BC] bg-[#ECE5D4] p-6 shadow-sm text-[#1B1D1F] [&_p]:!text-[#1B1D1F]">
      {title && (
        <div className="mb-4 border-b border-[#D9D0BC] pb-2">
          <span
            className={`${plexMono.className} text-[10px] font-bold uppercase tracking-[0.2em] text-[#DE4B31]`}
          >
            Interactive Demo — {title}
          </span>
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}
