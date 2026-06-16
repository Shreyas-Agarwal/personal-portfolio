"use client";

import { useEffect, useRef } from "react";

interface GiscusSectionProps {
  slug: string;
}

export function GiscusSection({ slug }: GiscusSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Intentionally reload Giscus when article changes.
  useEffect(() => {
    if (!containerRef.current) return;

    const repo = process.env.NEXT_PUBLIC_GISCUS_REPO ?? "";
    const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID ?? "";
    const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY ?? "Journal Discussion";
    const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID ?? "";

    // Don't load Giscus if credentials are not configured
    if (!repo || !repoId) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", repo);
    script.setAttribute("data-repo-id", repoId);
    script.setAttribute("data-category", category);
    script.setAttribute("data-category-id", categoryId);
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    // data-emit-metadata enables comment count retrieval for future
    // "most discussed" and "trending" article features.
    script.setAttribute("data-emit-metadata", "1");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", "light");
    script.setAttribute("data-lang", "en");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  const isConfigured = Boolean(
    process.env.NEXT_PUBLIC_GISCUS_REPO &&
    process.env.NEXT_PUBLIC_GISCUS_REPO_ID,
  );

  return (
    <section className="mt-20 border-t border-neutral-200 pt-16">
      {/* Header */}
      <header className="mb-8">
        <h2 className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
          Discussion
        </h2>
        <p className="mt-2 max-w-prose text-[13px] leading-relaxed text-neutral-500">
          Thoughtful disagreement, extensions, critiques, and questions are
          encouraged.
        </p>
      </header>

      {/* Giscus widget or unconfigured notice */}
      {isConfigured ? (
        <div ref={containerRef} />
      ) : (
        <div className="rounded border border-dashed border-neutral-200 bg-neutral-50/50 px-6 py-8 text-center">
          <p className="text-[12px] text-neutral-400">
            Discussion is not yet configured.{" "}
            <span className="font-mono text-[11px] text-neutral-500">
              NEXT_PUBLIC_GISCUS_*
            </span>{" "}
            environment variables are required.
          </p>
          <p className="mt-1 text-[11px] text-neutral-300">
            See <span className="font-mono">.env.example</span> for setup
            instructions.
          </p>
        </div>
      )}
    </section>
  );
}
