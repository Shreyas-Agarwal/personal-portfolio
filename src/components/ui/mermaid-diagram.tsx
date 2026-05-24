"use client";

import { useEffect, useRef, useState } from "react";

interface MermaidDiagramProps {
  code: string;
}

export function MermaidDiagram({ code }: MermaidDiagramProps) {
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderDiagram = async () => {
      if (!code) return;

      try {
        // Dynamically import mermaid to ensure it's client-side only
        const mermaid = (await import("mermaid")).default;

        mermaid.initialize({
          startOnLoad: false,
          theme: "base",
          themeVariables: {
            primaryColor: "#ffffff",
            primaryTextColor: "#1a1a1a",
            primaryBorderColor: "#1a1a1a",
            lineColor: "#1a1a1a",
            secondaryColor: "#f3f1ec",
            tertiaryColor: "#ffffff",
            fontFamily: "var(--font-sans)",
            fontSize: "14px",
          },
          securityLevel: "loose",
        });

        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const { svg } = await mermaid.render(id, code);
        setSvg(svg);
        setError(false);
      } catch (err) {
        console.error("Mermaid rendering failed:", err);
        setError(true);
      }
    };

    renderDiagram();
  }, [code]);

  useEffect(() => {
    if (containerRef.current && svg) {
      containerRef.current.innerHTML = svg;
    }
  }, [svg]);

  if (error) {
    return (
      <div className="my-8 p-4 border border-red-200 bg-red-50 text-red-600 rounded-md font-mono text-sm">
        Failed to render Mermaid diagram. Check syntax.
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="mermaid-container my-12 flex justify-center overflow-x-auto py-8 bg-white/40 border border-neutral-200/60 rounded-xl backdrop-blur-sm"
    />
  );
}
