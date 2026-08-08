"use client";

/**
 * PublicationSidebar — structured publication navigation
 *
 * This is not a file explorer. It represents the intellectual structure of
 * the publication: sections, sub-sections, and grouped chapters. Typography
 * carries hierarchy — no icons except where genuinely warranted.
 *
 * Groups are separated by hairline rules with a mono label.
 * Active section is highlighted without being garish.
 */

import Link from "next/link";
import { useState } from "react";
import { inter, plexMono, serif } from "@/lib/fonts";
import type { PublicationManifest, PublicationSection } from "@/lib/publication/types";

interface PublicationSidebarProps {
  manifest: PublicationManifest;
  /** href of the currently active section */
  activeHref: string;
  /** Base path for all section links, e.g. "/publication/desktop-connector" */
  basePath: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Section item
// ─────────────────────────────────────────────────────────────────────────────

function SectionItem({
  section,
  basePath,
  activeHref,
  depth = 0,
}: {
  section: PublicationSection;
  basePath: string;
  activeHref: string;
  depth?: number;
}) {
  const isNavigable = section.href !== undefined;
  const href = !isNavigable ? null : section.href === "" ? basePath : `${basePath}/${section.href}`;
  const isActive =
    isNavigable && (section.href === activeHref || (section.href === "" && activeHref === ""));

  const labelClasses = [
    "block leading-snug transition-colors duration-150",
    depth === 0
      ? `${serif.className} text-[14px]`
      : depth === 1
        ? `${serif.className} text-[13px]`
        : `${plexMono.className} text-[11px] uppercase tracking-[0.1em]`,
    isActive
      ? "text-[#E6E1D6]/90"
      : isNavigable
        ? "text-[#E6E1D6]/38 group-hover:text-[#E6E1D6]/70"
        : "text-[#E6E1D6]/25 cursor-default",
  ].join(" ");

  const inner = (
    <>
      <span
        aria-hidden="true"
        className={`h-[1px] w-3 shrink-0 self-center transition-all duration-200 ${
          isActive
            ? "bg-[#DE4B31]/70 opacity-100"
            : isNavigable
              ? "bg-transparent opacity-0 group-hover:bg-[#E6E1D6]/20 group-hover:opacity-100"
              : "bg-transparent opacity-0"
        }`}
      />
      <span className={labelClasses}>{section.title}</span>
    </>
  );

  return (
    <>
      <li>
        {href ? (
          <Link
            href={href}
            className={[
              "group flex w-full items-baseline gap-2 py-[5px] text-left transition-colors duration-150",
              depth === 0 ? "pl-0" : depth === 1 ? "pl-4" : "pl-7",
            ].join(" ")}
            aria-current={isActive ? "page" : undefined}
          >
            {inner}
          </Link>
        ) : (
          <div
            className={[
              "flex w-full items-baseline gap-2 py-[5px]",
              depth === 0 ? "pl-0" : depth === 1 ? "pl-4" : "pl-7",
            ].join(" ")}
          >
            {inner}
          </div>
        )}
      </li>

      {/* Render children */}
      {section.children && section.children.length > 0 && (
        <ul className="mb-1">
          {section.children.map((child) => (
            <SectionItem
              key={child.id}
              section={child}
              basePath={basePath}
              activeHref={activeHref}
              depth={depth + 1}
            />
          ))}
        </ul>
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Group divider
// ─────────────────────────────────────────────────────────────────────────────

function GroupDivider({ label }: { label: string }) {
  return (
    <li className="mb-1 mt-6" aria-hidden="true">
      <div className="flex items-center gap-2">
        <div className="h-px flex-1 bg-[#2C2E32]" />
        <span
          className={`${plexMono.className} text-[8px] uppercase tracking-[0.25em] text-[#E6E1D6]/20`}
        >
          {label}
        </span>
        <div className="h-px flex-1 bg-[#2C2E32]" />
      </div>
    </li>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Publication header in sidebar
// ─────────────────────────────────────────────────────────────────────────────

function SidebarHeader({ manifest }: { manifest: PublicationManifest }) {
  return (
    <div className="mb-6 border-b border-[#2C2E32] pb-5">
      {/* Publication type */}
      <span
        className={`${plexMono.className} mb-3 block text-[9px] uppercase tracking-[0.25em] text-[#DE4B31]/70`}
      >
        {manifest.type.replace("-", " ")}
      </span>

      {/* Title */}
      <p className={`${serif.className} text-[15px] italic leading-snug text-[#E6E1D6]/80`}>
        {manifest.title}
      </p>

      {/* Volume + revision */}
      {(manifest.volume || manifest.revision) && (
        <div
          className={`${plexMono.className} mt-2 flex flex-wrap gap-x-3 text-[10px] text-[#E6E1D6]/30`}
        >
          {manifest.volume && <span>{manifest.volume}</span>}
          {manifest.revision && <span>{manifest.revision}</span>}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

import { FadingScrollContainer } from "../FadingScrollContainer";

export function PublicationSidebar({ manifest, activeHref, basePath }: PublicationSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const nav = (
    <nav aria-label="Publication navigation">
      <SidebarHeader manifest={manifest} />

      <ul className="space-y-0">
        {manifest.sections.map((section, i) => {
          const prevGroup = i > 0 ? manifest.sections[i - 1].group : undefined;
          const showDivider = section.group && section.group !== prevGroup;

          return (
            <span key={section.id}>
              {showDivider && section.group && <GroupDivider label={section.group} />}
              <SectionItem
                section={section}
                basePath={basePath}
                activeHref={activeHref}
                depth={0}
              />
            </span>
          );
        })}
      </ul>
    </nav>
  );

  const backLink = (
    <Link
      href="/works/publications"
      className={`${plexMono.className} flex shrink-0 items-center gap-2 pb-5 text-[10px] uppercase tracking-[0.18em] text-[#E6E1D6]/45 transition-colors hover:text-[#DE4B31]`}
    >
      <span aria-hidden="true">←</span>
      <span>All Publications</span>
    </Link>
  );

  return (
    <>
      {/* ── Desktop sidebar ──
          `h-full` on the aside is load-bearing: it's a grid item's child, and
          without an explicit height it shrink-wraps to the nav's own content
          height instead of the full stretched row height. That short height
          becomes the sticky div's containing block, so the sidebar detaches
          and scrolls off screen partway down the document instead of
          sticking for the full page. */}
      <aside aria-label="Publication sidebar" className="hidden h-full lg:block">
        {/* `h-[...]` (not `max-h-[...]`) is load-bearing: an auto-height box
            clamped by max-height doesn't count as a definite size for
            descendants, so the `flex-1`/`h-full` chain into the scrollable
            pane below would collapse to its content size instead of the
            available height, and never overflow enough to scroll. */}
        <div className="sticky top-24 flex h-[calc(100vh-7rem)] flex-col">
          {backLink}
          <div className="min-h-0 flex-1">
            <FadingScrollContainer className="pr-2 pb-6" fadeHeight={26}>
              {nav}
            </FadingScrollContainer>
          </div>
        </div>
      </aside>

      {/* ── Mobile: floating button + drawer overlay ── */}
      <div className="lg:hidden print:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open publication navigation"
          className={`${plexMono.className} fixed bottom-6 left-6 z-40 flex items-center gap-2 border border-[#2C2E32] bg-[#1B1D1F]/95 px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-[#E6E1D6]/60 shadow-lg backdrop-blur-md transition-colors hover:text-[#E6E1D6]/90`}
        >
          <span aria-hidden="true">≡</span>
          <span>Contents</span>
        </button>

        {/* Overlay */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-50 flex"
            role="dialog"
            aria-modal="true"
            aria-label="Publication navigation"
          >
            {/* Backdrop */}
            <button
              type="button"
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation"
            />

            {/* Drawer */}
            <div className="relative z-10 flex h-full w-72 flex-col border-r border-[#2C2E32] bg-[#141517] p-6 shadow-2xl">
              <div className="mb-4 flex items-center justify-between">
                <span
                  className={`${plexMono.className} text-[9px] uppercase tracking-[0.22em] text-[#E6E1D6]/30`}
                >
                  Navigation
                </span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close"
                  className={`${inter.className} text-[#E6E1D6]/40 transition-colors hover:text-[#E6E1D6]/80`}
                >
                  ✕
                </button>
              </div>
              {backLink}
              <div className="flex-1 overflow-y-auto">{nav}</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
