import type { ReactNode } from "react";
import { plexMono } from "@/lib/fonts";
import { CopyButton } from "./CopyButton";

interface CodeBlockProps {
  children?: ReactNode;
  code?: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
}

function extractString(node: unknown): string {
  if (node === undefined || node === null) return "";
  if (typeof node === "string") return node;
  if (typeof node === "number" || typeof node === "boolean") return String(node);

  if (Array.isArray(node)) {
    return node.map(extractString).filter(Boolean).join("\n");
  }

  if (typeof node === "object") {
    const obj = node as Record<string, unknown>;
    if (obj.props && typeof obj.props === "object") {
      const props = obj.props as Record<string, unknown>;
      if (props.children !== undefined) return extractString(props.children);
      if (typeof props.value === "string") return props.value;
      if (typeof props.code === "string") return props.code;
    }
    if (typeof obj.value === "string") return obj.value;
    if (typeof obj.code === "string") return obj.code;
    if (obj.children !== undefined) return extractString(obj.children);
  }

  return "";
}

function TerminalPrompt() {
  return (
    <span className="mr-2 text-[#DE4B31] font-bold" aria-hidden="true">
      $
    </span>
  );
}

function DiffLine({
  line,
  lineNumber,
  showLineNumbers,
}: {
  line: string;
  lineNumber: number;
  showLineNumbers: boolean;
}) {
  const isAdd = line.startsWith("+");
  const isRemove = line.startsWith("-");
  const content = isAdd || isRemove ? line.slice(1) : line;

  return (
    <span
      className={`flex min-w-0 ${
        isAdd
          ? "bg-emerald-800/10 text-emerald-900 font-medium"
          : isRemove
            ? "bg-[#DE4B31]/10 text-[#DE4B31] font-medium"
            : "text-[#1B1D1F]/85"
      }`}
    >
      {showLineNumbers && (
        <span
          className={`${plexMono.className} mr-5 w-6 shrink-0 select-none text-right text-[#1B1D1F]/30`}
          aria-hidden="true"
        >
          {lineNumber}
        </span>
      )}
      <span
        className={`${plexMono.className} mr-3 w-3 shrink-0 select-none ${
          isAdd
            ? "text-emerald-800 font-bold"
            : isRemove
              ? "text-[#DE4B31] font-bold"
              : "text-[#1B1D1F]/30"
        }`}
        aria-hidden="true"
      >
        {isAdd ? "+" : isRemove ? "−" : " "}
      </span>
      <span>{content}</span>
    </span>
  );
}

export function CodeBlock({
  children,
  code,
  language = "text",
  filename,
  showLineNumbers = false,
  highlightLines = [],
}: CodeBlockProps) {
  const rawText = (code ?? extractString(children)).trim();
  const isTerminal = language === "terminal" || language === "bash" || language === "sh";
  const isDiff = language === "diff";
  const lines = rawText ? rawText.split("\n") : [];

  return (
    <div className="my-8 overflow-hidden border border-[#D9D0BC] bg-[#ECE5D4] shadow-sm">
      {/* ── Header Bar (Paper Insert style) ── */}
      <div className="flex items-center justify-between border-b border-[#D9D0BC] bg-[#E5DCCB] px-4 py-2.5">
        <div className="flex items-center gap-3">
          {isTerminal ? (
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-[#DE4B31]" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-600" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />
            </div>
          ) : (
            <span
              className={`${plexMono.className} text-[9px] font-bold uppercase tracking-[0.18em] text-[#1B1D1F]/60`}
            >
              {language}
            </span>
          )}
          {filename && (
            <>
              <span className="text-[#1B1D1F]/25" aria-hidden="true">
                /
              </span>
              <span className={`${plexMono.className} text-[11px] font-semibold text-[#1B1D1F]/80`}>
                {filename}
              </span>
            </>
          )}
        </div>

        {/* Copy button */}
        <CopyButton text={rawText} theme="paper" />
      </div>

      {/* ── Code body (Paper Insert style) ── */}
      <pre
        className={`${plexMono.className} overflow-x-auto bg-[#ECE5D4] p-5 text-[13px] leading-relaxed text-[#1B1D1F]/90`}
      >
        <code className="flex flex-col gap-0 min-w-0">
          {lines.length > 0 ? (
            lines.map((line, i) => {
              const lineNum = i + 1;
              const isHighlighted = highlightLines.includes(lineNum);

              if (isDiff) {
                return (
                  <DiffLine
                    key={lineNum}
                    line={line}
                    lineNumber={lineNum}
                    showLineNumbers={showLineNumbers}
                  />
                );
              }

              return (
                <span
                  key={lineNum}
                  className={`flex min-w-0 min-h-[1.5em] ${isHighlighted ? "bg-[#D9D0BC]/40" : ""}`}
                >
                  {showLineNumbers && (
                    <span
                      className="mr-5 w-6 shrink-0 select-none text-right text-[#1B1D1F]/30"
                      aria-hidden="true"
                    >
                      {lineNum}
                    </span>
                  )}
                  {isTerminal && <TerminalPrompt />}
                  <span className="min-w-0 whitespace-pre">{line || " "}</span>
                </span>
              );
            })
          ) : (
            <span className="min-w-0 whitespace-pre">
              {typeof children === "string" ? children : ""}
            </span>
          )}
        </code>
      </pre>
    </div>
  );
}
