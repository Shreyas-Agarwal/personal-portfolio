"use client";

import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";

interface FadingScrollContainerProps {
  children: ReactNode;
  className?: string;
  fadeHeight?: number;
}

/**
 * FadingScrollContainer — hides native scrollbars while preserving native scrolling.
 * Dynamically overlays subtle background-blended fade & blur masks (24-30px) at top/bottom when
 * hidden content exists above or below.
 */
export function FadingScrollContainer({
  children,
  className = "",
  fadeHeight = 26,
}: FadingScrollContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showTopFade, setShowTopFade] = useState(false);
  const [showBottomFade, setShowBottomFade] = useState(false);

  const checkScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const { scrollTop, scrollHeight, clientHeight } = el;
    // Content exists above
    setShowTopFade(scrollTop > 4);
    // Content exists below
    setShowBottomFade(scrollTop + clientHeight < scrollHeight - 6);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    checkScroll();

    el.addEventListener("scroll", checkScroll, { passive: true });
    const ro = new ResizeObserver(checkScroll);
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      ro.disconnect();
    };
  }, [checkScroll]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* ── Top 24-30px Fade & Blur Mask ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 right-0 z-20 backdrop-blur-[2px] transition-opacity duration-300 ease-out"
        style={{
          height: `${fadeHeight}px`,
          opacity: showTopFade ? 1 : 0,
          background: "linear-gradient(to bottom, #1B1D1F 20%, rgba(27, 29, 31, 0) 100%)",
        }}
      />

      {/* ── Scrollable Pane (Hidden Scrollbar) ── */}
      <div
        ref={containerRef}
        className={`no-scrollbar overflow-y-auto ${className}`}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {children}
      </div>

      {/* ── Bottom 24-30px Fade & Blur Mask ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 backdrop-blur-[2px] transition-opacity duration-300 ease-out"
        style={{
          height: `${fadeHeight + 6}px`,
          opacity: showBottomFade ? 1 : 0,
          background: "linear-gradient(to top, #1B1D1F 20%, rgba(27, 29, 31, 0) 100%)",
        }}
      />
    </div>
  );
}
