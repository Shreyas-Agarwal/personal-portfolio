/**
 * MDX primitives for Field Notes — the notebook typographic voice.
 *
 * Deliberately plainer than the Publication framework's Pub* primitives:
 * Plex Mono throughout (no serif), smaller type scale, teal accent instead
 * of burnt orange. No Callout/Process/Decision blocks — notes are plain
 * prose, lists, and the occasional code snippet.
 */

import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { plexMono } from "@/lib/fonts";

export function NoteH1({ children, id }: { children?: ReactNode; id?: string }) {
  return (
    <h1
      id={id}
      className={`${plexMono.className} mt-10 mb-4 text-xl font-medium leading-snug text-[#ECE5D4] scroll-mt-24`}
    >
      {children}
    </h1>
  );
}

export function NoteH2({ children, id }: { children?: ReactNode; id?: string }) {
  return (
    <h2
      id={id}
      className={`${plexMono.className} mt-9 mb-3 text-lg font-medium leading-snug text-[#ECE5D4]/90 scroll-mt-24`}
    >
      {children}
    </h2>
  );
}

export function NoteH3({ children, id }: { children?: ReactNode; id?: string }) {
  return (
    <h3
      id={id}
      className={`${plexMono.className} mt-7 mb-2 text-sm font-medium uppercase tracking-wider text-[#ECE5D4]/70 scroll-mt-24`}
    >
      {children}
    </h3>
  );
}

export function NoteParagraph({ children }: { children?: ReactNode }) {
  return <p className="mb-5 text-[15px] leading-[1.85] text-[#A0A5AD]">{children}</p>;
}

export function NoteBlockquote({ children }: { children?: ReactNode }) {
  return (
    <blockquote className="my-6 border-l-2 border-[#4E9A8A]/50 pl-5">
      <div className="text-[15px] leading-relaxed text-[#A0A5AD]/90 italic">{children}</div>
    </blockquote>
  );
}

export function NoteStrong({ children }: { children?: ReactNode }) {
  return <strong className="font-semibold text-[#ECE5D4]/90">{children}</strong>;
}

export function NoteEm({ children }: { children?: ReactNode }) {
  return <em className="italic text-[#ECE5D4]/80">{children}</em>;
}

export function NoteA({ href, children }: { href?: string; children?: ReactNode }) {
  const cls =
    "border-b border-[#4E9A8A]/40 text-[#ECE5D4]/85 transition-colors hover:border-[#4E9A8A] hover:text-[#ECE5D4]";
  if (!href || href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function NoteUl({ children }: { children?: ReactNode }) {
  return <ul className="mb-5 space-y-1.5 pl-0">{children}</ul>;
}

export function NoteOl({ children }: { children?: ReactNode }) {
  return <ol className="mb-5 list-none space-y-1.5 pl-0">{children}</ol>;
}

export function NoteLi({ children }: { children?: ReactNode }) {
  return (
    <li className="relative flex gap-3 text-[15px] leading-[1.8] text-[#A0A5AD]">
      <span
        className={`${plexMono.className} mt-1 shrink-0 text-[10px] text-[#4E9A8A]/70`}
        aria-hidden="true"
      >
        —
      </span>
      <span>{children}</span>
    </li>
  );
}

export function NoteHr() {
  return <div className="my-10 h-px bg-[#2C2E32]" />;
}

export function NoteCode({ children, className, ...props }: ComponentPropsWithoutRef<"code">) {
  const isInline = !className?.includes("language-");
  if (isInline) {
    return (
      <code
        className={`${plexMono.className} rounded border border-[#33373B] bg-[#24272A] px-1.5 py-0.5 text-[13px] text-[#4E9A8A]`}
        {...props}
      >
        {children}
      </code>
    );
  }
  return (
    <code className={className} {...props}>
      {children}
    </code>
  );
}

export function NotePre({ children, ...props }: ComponentPropsWithoutRef<"pre">) {
  return (
    <pre
      className={`${plexMono.className} my-6 overflow-x-auto rounded-sm border border-[#33373B] bg-[#24272A] p-4 text-[13px] leading-relaxed text-[#ECE5D4]/85 whitespace-pre`}
      {...props}
    >
      {children}
    </pre>
  );
}
