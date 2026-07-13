"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

interface PaperInsertProps {
  children: ReactNode;
}

/**
 * A physical cream sheet, scarce by design — reserved for the two prose
 * moments on the page. Rises and settles as it scrolls into frame, lifts
 * away in reverse as the reader scrolls past, and reappears on scroll-back.
 * Tied to intersection, never a timer.
 */
export function PaperInsert({ children }: PaperInsertProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.2,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section data-header-theme="light" className="relative bg-[#ECE5D4] px-6 py-24 md:px-12">
      <div
        ref={ref}
        className="mx-auto max-w-3xl transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] motion-reduce:transition-none"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(28px)",
        }}
      >
        {children}
      </div>
    </section>
  );
}
