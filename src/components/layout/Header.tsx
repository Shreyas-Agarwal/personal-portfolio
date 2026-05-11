"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const nav = [
  { to: "/systems", label: "01. SYSTEMS", subtitle: "architectures" },
  { to: "/research", label: "02. RESEARCH", subtitle: "information-flow" },
  { to: "/notes", label: "03. NOTES", subtitle: "observations" },
  { to: "/about", label: "04. IDENTITY", subtitle: "the-data-person" },
];

type HeaderTheme = "dark" | "light";

export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const headerRef = useRef<HTMLElement>(null);
  const [theme, setTheme] = useState<HeaderTheme>("dark");

  // Compressed state for when the user is deep in the "data"
  const headerHeight = useTransform(scrollY, [0, 100], ["120px", "72px"]);
  const blurAmount = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(20px)"]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 1]);

  // --- Dynamic theme adaptation via IntersectionObserver ---
  // Strategy: observe all sections tagged with [data-header-theme].
  // We use rootMargin to create a thin horizontal "sensor" strip at the
  // top of the viewport (just below the header). Whichever section
  // intersects that strip is the one currently behind the header.
  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is needed to re-initialize observer on route changes
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-header-theme]")
    );

    if (sections.length === 0) return;

    // Start with the theme of the first section
    const firstTheme = sections[0].dataset.headerTheme as HeaderTheme;
    setTheme(firstTheme ?? "dark");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const sectionTheme = (entry.target as HTMLElement).dataset
              .headerTheme as HeaderTheme;
            setTheme(sectionTheme ?? "dark");
          }
        }
      },
      {
        // The rootMargin creates a 1px-tall horizontal slice at the very
        // top of the viewport. A section "intersects" when its top edge
        // passes through that slice — i.e., it's right behind the header.
        rootMargin: "-1px 0px -99% 0px",
        threshold: 0,
      }
    );

    for (const section of sections) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, [pathname]); // Re-run when the route changes (page sections change)

  // -------------------------------------------------------

  const isLight = theme === "light";

  return (
    <motion.header
      ref={headerRef}
      style={{ height: headerHeight, backdropFilter: blurAmount }}
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-500",
        isLight
          ? "bg-[#F3F1EC]/80 text-black"
          : "bg-[#0B0D10]/70 text-white"
      )}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-8">

        {/* IDENTITY: SYSTEM PATH */}
        <div className="flex flex-col font-mono uppercase tracking-[0.2em]">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "h-2 w-2 rounded-full animate-pulse",
                isLight ? "bg-black/60" : "bg-primary"
              )}
            />
            <Link
              href="/"
              className={cn(
                "text-sm font-bold transition-colors",
                isLight
                  ? "text-black hover:text-black/70"
                  : "text-white/90 hover:text-primary"
              )}
            >
              SHREYAS_AGARWAL {"//"}
            </Link>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={cn(
              "mt-1 text-[10px] flex items-center gap-4",
              isLight ? "text-black/40" : "text-muted-foreground"
            )}
          >
            <span>DOM: DATA_INFRASTRUCTURE</span>
          </motion.div>
        </div>

        {/* NAVIGATION: THE WORKBENCH */}
        <nav className="flex items-center gap-12">
          {nav.map((n) => {
            const isActive = pathname.startsWith(n.to);

            return (
              <Link
                key={n.to}
                href={n.to}
                className="group relative flex flex-col items-end"
              >
                <span
                  className={cn(
                    "font-mono text-[10px] tracking-widest transition-colors",
                    isLight
                      ? isActive
                        ? "text-black/70"
                        : "text-black/35 group-hover:text-black/70"
                      : isActive
                        ? "text-primary"
                        : "text-muted-foreground group-hover:text-foreground"
                  )}
                >
                  {n.subtitle}
                </span>
                <span
                  className={cn(
                    "text-sm font-medium transition-all group-hover:tracking-wider",
                    isLight
                      ? isActive
                        ? "text-black"
                        : "text-black/50 group-hover:text-black"
                      : isActive
                        ? "text-foreground"
                        : "text-muted-foreground/60 group-hover:text-foreground"
                  )}
                >
                  {n.label}
                </span>

                {isActive && (
                  <motion.div
                    layoutId="system-underline"
                    className={cn(
                      "absolute -bottom-4 right-0 h-[2px] w-full",
                      isLight
                        ? "bg-black/60"
                        : "bg-primary shadow-[0_0_10px_var(--color-primary)]"
                    )}
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* FRACTURE BORDER */}
      <motion.div
        style={{ opacity: borderOpacity }}
        className={cn(
          "absolute bottom-0 left-0 h-[1px] w-full",
          isLight
            ? "bg-gradient-to-r from-transparent via-black/15 to-transparent"
            : "bg-gradient-to-r from-transparent via-foreground/20 to-transparent"
        )}
      />
    </motion.header>
  );
}