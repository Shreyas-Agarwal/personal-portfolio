"use client";

import { useEffect, useState } from "react";

/**
 * ReadingProgressBar — a subtle, 2px editorial reading progress indicator
 * fixed at the top of the viewport.
 *
 * - Neutral cream/charcoal palette (#ECE5D4 / #E6E1D6 opacity)
 * - Fills smoothly with scroll progress
 * - No scroll-jacking, purely passive
 */
export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const maxScroll = docHeight - winHeight;

      if (maxScroll <= 0) {
        setProgress(0);
      } else {
        const pct = Math.min(1, Math.max(0, scrollY / maxScroll));
        setProgress(pct);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateProgress, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 right-0 z-50 h-[2px] bg-[#2C2E32]"
    >
      <div
        className="h-full bg-[#ECE5D4]/80 transition-transform duration-75 ease-out"
        style={{
          transform: `scaleX(${progress})`,
          transformOrigin: "left",
        }}
      />
    </div>
  );
}
