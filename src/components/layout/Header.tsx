"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { plexMono, serif } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { useHeaderTitle } from "./HeaderContext";

const nav = [
  { to: "/projects", label: "Works" },
  { to: "/systems", label: "Systems" },
  { to: "/journal", label: "Writing" },
  { to: "/about", label: "About" },
];

const ROUTE_TITLE_MAP: Record<string, string> = {
  "/": "Collected Engineering Works",
  "/projects": "Works & Case Studies",
  "/systems": "Systems Architecture",
  "/journal": "Technical Publications",
  "/about": "Author & Monograph",
  "/projects/publications/architecture-of-information-systems":
    "Architecture of Information Systems",
  "/projects/publications/desktop-connector": "Desktop Synchronization Architecture",
  "/projects/publications/bim-paradox": "The BIM Data Paradox",
  "/projects/publications/semantic-models": "Canonical Semantic Models",
  "/projects/publications/context-systems": "Context Systems & Memory Boundaries",
  "/projects/publications/mcp-context-rot": "Context Rot in LLM Agents",
  "/projects/publications/the-silicon-ceiling": "The Silicon Ceiling",
  "/projects/publications/ecology-and-ai": "Ecology and AI Systems",
  "/projects/publications/evolution-vs-software": "Software vs Biological Evolution",
  "/projects/publications/transformer-vs-qubit": "Transformer vs Qubit Architectures",
  "/projects/publications/network-dynamics": "Network Dynamics & Latency",
};

export function Header() {
  const pathname = usePathname();
  const { activeTitle } = useHeaderTitle();
  const [isMastheadVisible, setIsMastheadVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  // Dynamic publication title resolution
  const resolvedWorkTitle =
    activeTitle ||
    ROUTE_TITLE_MAP[pathname] ||
    (pathname.startsWith("/projects")
      ? "Engineering Work"
      : pathname.startsWith("/systems")
        ? "Systems Architecture"
        : pathname.startsWith("/journal")
          ? "Technical Publication"
          : "Engineering Systems");

  // Editorial scroll choreography: hide masthead on scroll down, show on scroll up / top
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 60) {
        setIsMastheadVisible(true);
      } else {
        if (currentScrollY > lastScrollY.current + 10) {
          // Scrolling down -> hide masthead
          setIsMastheadVisible(false);
        } else if (currentScrollY < lastScrollY.current - 10) {
          // Scrolling up -> show masthead
          setIsMastheadVisible(true);
        }
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is needed to close mobile menu on route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0B0D10] text-[#E6E1D6]">
      {/* ── LAYER 1: PRIMARY MASTHEAD ── */}
      <AnimatePresence initial={false}>
        {isMastheadVisible && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-b border-[#2C2E32]/70 bg-[#0B0D10]"
          >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 md:px-8">
              {/* PUBLICATION IMPRINT BRANDING */}
              <Link href="/" className="group flex flex-col gap-0.5">
                <span
                  className={cn(
                    serif.className,
                    "text-base md:text-lg font-normal tracking-[0.22em] uppercase text-[#E6E1D6] transition-colors group-hover:text-white",
                  )}
                >
                  Shreyas Agarwal
                </span>
                <span
                  className={cn(
                    plexMono.className,
                    "text-[10px] tracking-[0.25em] uppercase text-[#E6E1D6]/45",
                  )}
                >
                  Engineering Systems
                </span>
              </Link>

              {/* EDITORIAL NAVIGATION */}
              <nav className="hidden md:flex items-center gap-10">
                {nav.map((n) => {
                  const isActive = pathname === n.to || (n.to !== "/" && pathname.startsWith(n.to));

                  return (
                    <Link
                      key={n.to}
                      href={n.to}
                      className={cn(
                        plexMono.className,
                        "text-xs uppercase tracking-[0.2em] transition-colors relative py-1",
                        isActive
                          ? "text-[#E6E1D6] font-semibold"
                          : "text-[#E6E1D6]/50 hover:text-[#E6E1D6]",
                      )}
                    >
                      {n.label}
                    </Link>
                  );
                })}
              </nav>

              {/* MOBILE MENU TOGGLE */}
              <button
                type="button"
                className="md:hidden p-2 text-[#E6E1D6]/70 hover:text-[#E6E1D6] transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

            {/* MOBILE NAVIGATION OVERLAY */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-[#2C2E32]/70 bg-[#0B0D10] px-6 py-6 md:hidden"
                >
                  <nav className="flex flex-col gap-5">
                    {nav.map((n) => {
                      const isActive =
                        pathname === n.to || (n.to !== "/" && pathname.startsWith(n.to));
                      return (
                        <Link
                          key={n.to}
                          href={n.to}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            plexMono.className,
                            "text-sm uppercase tracking-[0.2em] transition-colors",
                            isActive ? "text-[#E6E1D6] font-semibold" : "text-[#E6E1D6]/50",
                          )}
                        >
                          {n.label}
                        </Link>
                      );
                    })}
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── LAYER 2: RUNNING HEADER ── */}
      <div className="border-b border-[#2C2E32] bg-[#0B0D10] px-4 py-2.5 text-[10px] md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between font-mono uppercase tracking-[0.2em] text-[#E6E1D6]/60">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className={cn(
                plexMono.className,
                "text-[10px] tracking-[0.2em] font-medium text-[#E6E1D6]/70 hover:text-[#E6E1D6] transition-colors",
              )}
            >
              SHREYAS AGARWAL
            </Link>
          </div>
          <div
            className={cn(
              plexMono.className,
              "truncate text-right text-[10px] tracking-[0.15em] text-[#E6E1D6]/45 max-w-[60%] md:max-w-[70%]",
            )}
          >
            {resolvedWorkTitle}
          </div>
        </div>
      </div>
    </header>
  );
}
