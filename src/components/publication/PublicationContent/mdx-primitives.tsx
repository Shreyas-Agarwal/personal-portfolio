/**
 * MDX primitives — the typographic design system for the publication framework.
 *
 * Every standard markdown element maps to one of these. They carry the full
 * visual language from the landing page:
 *
 *   Newsreader (serif)     → narrative prose, headings
 *   IBM Plex Mono          → metadata, labels, code
 *   Inter                  → UI chrome only
 *
 *   #1B1D1F charcoal       → the desk surface
 *   #ECE5D4 cream          → paper inserts
 *   #E6E1D6                → primary text on charcoal
 *   #DE4B31                → red-orange accent (field notes, emphasis)
 *   #25282A                → elevated surface (tooltips, code)
 */

import Link from "next/link";
import { type ComponentPropsWithoutRef, isValidElement, type ReactNode } from "react";
import { plexMono, serif } from "@/lib/fonts";

// ─────────────────────────────────────────────────────────────────────────────
// Headings
// ─────────────────────────────────────────────────────────────────────────────

export function PubH1({ children, id }: { children?: ReactNode; id?: string }) {
  return (
    <h1
      id={id}
      className={`${serif.className} mt-14 mb-6 text-3xl font-normal italic leading-[1.15] tracking-tight text-[#E6E1D6]/95 md:text-4xl scroll-mt-24`}
    >
      {children}
    </h1>
  );
}

export function PubH2({ children, id }: { children?: ReactNode; id?: string }) {
  return (
    <h2
      id={id}
      className={`${serif.className} mt-14 mb-5 text-2xl font-normal italic leading-tight tracking-tight text-[#E6E1D6]/90 scroll-mt-24`}
    >
      {children}
    </h2>
  );
}

export function PubH3({ children, id }: { children?: ReactNode; id?: string }) {
  return (
    <h3
      id={id}
      className={`${serif.className} mt-10 mb-4 text-xl font-normal leading-snug text-[#E6E1D6]/85 scroll-mt-24`}
    >
      {children}
    </h3>
  );
}

export function PubH4({ children, id }: { children?: ReactNode; id?: string }) {
  return (
    <h4
      id={id}
      className={`${plexMono.className} mt-8 mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[#E6E1D6]/50 scroll-mt-24`}
    >
      {children}
    </h4>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Body text
// ─────────────────────────────────────────────────────────────────────────────

export function PubParagraph({ children }: { children?: ReactNode }) {
  return (
    <p className={`${serif.className} mb-6 text-[17px] leading-[1.9] text-[#E6E1D6]/75`}>
      {children}
    </p>
  );
}

export function PubBlockquote({ children }: { children?: ReactNode }) {
  return (
    <blockquote className="my-8 border-l-2 border-[#DE4B31]/60 pl-6">
      <div className={`${serif.className} text-lg italic leading-relaxed text-[#E6E1D6]/70`}>
        {children}
      </div>
    </blockquote>
  );
}

export function PubStrong({ children }: { children?: ReactNode }) {
  return <strong className="font-semibold text-[#E6E1D6]/90">{children}</strong>;
}

export function PubEm({ children }: { children?: ReactNode }) {
  return <em className="italic text-[#E6E1D6]/80">{children}</em>;
}

export function PubA({ href, children }: { href?: string; children?: ReactNode }) {
  const cls =
    "border-b border-[#E6E1D6]/25 text-[#E6E1D6]/80 transition-colors hover:border-[#DE4B31]/60 hover:text-[#E6E1D6]";

  // External links → new tab
  if (!href || href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  // Internal links (relative, absolute path, or hash) → Next.js client navigation
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Lists
// ─────────────────────────────────────────────────────────────────────────────

export function PubUl({ children }: { children?: ReactNode }) {
  return <ul className="mb-6 ml-0 space-y-2 pl-0">{children}</ul>;
}

export function PubOl({ children }: { children?: ReactNode }) {
  return <ol className="mb-6 ml-0 list-none space-y-2 pl-0 [counter-reset:pub-ol]">{children}</ol>;
}

export function PubLi({ children }: { children?: ReactNode }) {
  return (
    <li
      className={`${serif.className} relative flex gap-3 text-[16px] leading-[1.85] text-[#E6E1D6]/70`}
    >
      <span
        className={`${plexMono.className} mt-1 shrink-0 text-[10px] text-[#DE4B31]/70`}
        aria-hidden="true"
      >
        —
      </span>
      <span>{children}</span>
    </li>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Divider
// ─────────────────────────────────────────────────────────────────────────────

export function PubHr() {
  return (
    <div className="my-14 flex items-center gap-4">
      <div className="h-px flex-1 bg-[#E6E1D6]/10" />
      <span className={`${plexMono.className} text-xs text-[#E6E1D6]/20`} aria-hidden="true">
        §
      </span>
      <div className="h-px flex-1 bg-[#E6E1D6]/10" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Code
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Inline code — used inside paragraphs. Never a block.
 */
export function PubCode({ children, className, ...props }: ComponentPropsWithoutRef<"code">) {
  // Block code is wrapped in <pre>; inline code has no parent <pre>
  const isInline = !className?.includes("language-");
  if (isInline) {
    return (
      <code
        className={`${plexMono.className} rounded border border-[#363A3E] bg-[#25282A] px-1.5 py-0.5 text-[13px] font-medium text-[#DE4B31]`}
        {...props}
      >
        {children}
      </code>
    );
  }
  // Block code — let <pre> handle the outer wrapper
  return (
    <code className={className} {...props}>
      {children}
    </code>
  );
}

import { CopyButton } from "@/components/publication/blocks/CopyButton";

function extractCodeText(node: unknown): string {
  if (node === undefined || node === null) return "";
  if (typeof node === "string") return node;
  if (typeof node === "number" || typeof node === "boolean") return String(node);
  if (Array.isArray(node)) return node.map(extractCodeText).join("");
  if (typeof node === "object") {
    const obj = node as Record<string, unknown>;
    if (obj.props && typeof obj.props === "object") {
      const props = obj.props as Record<string, unknown>;
      if (props.children !== undefined) return extractCodeText(props.children);
      if (typeof props.value === "string") return props.value;
    }
    if (typeof obj.value === "string") return obj.value;
  }
  return "";
}

export function PubPre({ children, ...props }: ComponentPropsWithoutRef<"pre">) {
  let language = "text";
  let filename: string | undefined;

  const rawProps = props as Record<string, unknown>;
  if (typeof rawProps["data-language"] === "string") {
    language = rawProps["data-language"];
  }
  if (typeof rawProps["data-filename"] === "string") {
    filename = rawProps["data-filename"];
  }
  if (typeof rawProps.filename === "string") {
    filename = rawProps.filename;
  }

  if (isValidElement(children)) {
    const childProps = children.props as Record<string, unknown>;
    if (childProps?.className && typeof childProps.className === "string") {
      const match = childProps.className.match(/language-(\w+)/);
      if (match) language = match[1];
    }
    if (typeof childProps.filename === "string") {
      filename = childProps.filename;
    }
  }

  const rawText = extractCodeText(children).trim();

  return (
    <div className="group/pre my-8 overflow-hidden border border-[#D9D0BC] bg-[#ECE5D4] shadow-sm">
      {/* ── Header Bar ── */}
      <div className="flex items-center justify-between border-b border-[#D9D0BC] bg-[#E5DCCB] px-4 py-2.5">
        <div className="flex items-center gap-3">
          <span
            className={`${plexMono.className} text-[9px] font-bold uppercase tracking-[0.18em] text-[#1B1D1F]/70`}
          >
            {language}
          </span>
          {filename && (
            <>
              <span className="text-[#1B1D1F]/25" aria-hidden="true">
                /
              </span>
              <span className={`${plexMono.className} text-[11px] font-semibold text-[#1B1D1F]/90`}>
                {filename}
              </span>
            </>
          )}
        </div>

        <CopyButton text={rawText} theme="paper" />
      </div>

      <pre
        className={`${plexMono.className} overflow-x-auto bg-[#ECE5D4] p-5 text-[13px] leading-relaxed text-[#1B1D1F] whitespace-pre`}
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Table
// ─────────────────────────────────────────────────────────────────────────────

export function PubTable({ children }: { children?: ReactNode }) {
  return (
    <div className="my-8 overflow-x-auto">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  );
}

export function PubThead({ children }: { children?: ReactNode }) {
  return <thead className="border-b border-[#2C2E32]">{children}</thead>;
}

export function PubTbody({ children }: { children?: ReactNode }) {
  return <tbody>{children}</tbody>;
}

export function PubTr({ children }: { children?: ReactNode }) {
  return <tr className="border-b border-[#2C2E32]/50 last:border-0">{children}</tr>;
}

export function PubTh({ children }: { children?: ReactNode }) {
  return (
    <th
      className={`${plexMono.className} px-4 py-3 text-left text-[10px] font-medium uppercase tracking-[0.18em] text-[#E6E1D6]/40`}
    >
      {children}
    </th>
  );
}

export function PubTd({ children }: { children?: ReactNode }) {
  return (
    <td className={`${serif.className} px-4 py-3 text-[15px] leading-relaxed text-[#E6E1D6]/70`}>
      {children}
    </td>
  );
}
