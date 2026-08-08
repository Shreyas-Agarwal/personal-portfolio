"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
}

/**
 * Same intersection-driven fade/rise as PaperInsert, without the paper —
 * fires once and stays settled, so scrolling back up doesn't re-animate it.
 */
export function Reveal({ children, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] motion-reduce:transition-none ${className ?? ""}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
      }}
    >
      {children}
    </div>
  );
}
