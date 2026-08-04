"use client";

import { useState } from "react";
import { plexMono } from "@/lib/fonts";

function CopyIcon({ done }: { done: boolean }) {
  if (done) {
    return (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    );
  }
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

export function CopyButton({ text, theme = "paper" }: { text: string; theme?: "paper" | "dark" }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API unavailable
    }
  }

  const isPaper = theme === "paper";

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copied" : "Copy to clipboard"}
      className={`${plexMono.className} flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors ${
        copied
          ? "text-emerald-700 font-bold"
          : isPaper
            ? "text-[#1B1D1F]/60 hover:text-[#1B1D1F]"
            : "text-[#E6E1D6]/40 hover:text-[#E6E1D6]"
      }`}
    >
      <CopyIcon done={copied} />
      <span>{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}
