import { MermaidDiagram } from "@/components/ui/mermaid-diagram";
import { slugify } from "@/lib/toc";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// ─────────────────────────────────────────────────────────────────────────────
// Callout configuration
// ─────────────────────────────────────────────────────────────────────────────

type CalloutType =
  | "NOTE"
  | "IMPORTANT"
  | "WARNING"
  | "THESIS"
  | "FRAMEWORK"
  | "CAUTION";

const CALLOUT_STYLES: Record<
  CalloutType,
  { border: string; bg: string; label: string; icon: string; textColor: string }
> = {
  NOTE: {
    border: "border-sky-400",
    bg: "bg-sky-50/70",
    label: "Note",
    icon: "ℹ",
    textColor: "text-sky-700",
  },
  IMPORTANT: {
    border: "border-amber-400",
    bg: "bg-amber-50/70",
    label: "Important",
    icon: "◆",
    textColor: "text-amber-800",
  },
  WARNING: {
    border: "border-red-400",
    bg: "bg-red-50/70",
    label: "Warning",
    icon: "⚠",
    textColor: "text-red-700",
  },
  THESIS: {
    border: "border-violet-400",
    bg: "bg-violet-50/70",
    label: "Thesis",
    icon: "◉",
    textColor: "text-violet-700",
  },
  FRAMEWORK: {
    border: "border-emerald-400",
    bg: "bg-emerald-50/70",
    label: "Framework",
    icon: "⬡",
    textColor: "text-emerald-700",
  },
  CAUTION: {
    border: "border-orange-400",
    bg: "bg-orange-50/70",
    label: "Caution",
    icon: "⚡",
    textColor: "text-orange-700",
  },
};

const CALLOUT_TYPES = Object.keys(CALLOUT_STYLES).join("|");

// ─────────────────────────────────────────────────────────────────────────────
// Callout block renderer
// ─────────────────────────────────────────────────────────────────────────────

function CalloutBlock({
  type,
  children,
}: {
  type: CalloutType;
  children: React.ReactNode;
}) {
  const style = CALLOUT_STYLES[type];
  return (
    <div
      className={`not-prose my-7 border-l-4 ${style.border} ${style.bg} rounded-r-sm px-5 py-4`}
    >
      <div
        className={`mb-2.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] ${style.textColor}`}
      >
        <span aria-hidden="true">{style.icon}</span>
        <span>{style.label}</span>
      </div>
      <div className="space-y-2 text-[14px] leading-relaxed text-neutral-700">
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Markdown preprocessing
//
// Converts GitHub-style callout syntax:
//   > [!NOTE]
//   > Content here
// Into a uniquely-markered blockquote that the custom renderer can detect:
//   > |||CALLOUT:NOTE|||
//   > Content here
//
// The marker is distinctive enough that it will never appear in real prose.
// ─────────────────────────────────────────────────────────────────────────────

function preprocessCallouts(markdown: string): string {
  const pattern = new RegExp(
    `^> \\[!(${CALLOUT_TYPES})\\]\\s*$`,
    "gim",
  );
  return markdown.replace(
    pattern,
    (_, type: string) => `> |||CALLOUT:${type.toUpperCase()}|||`,
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Text extraction utility for heading ID generation
// ─────────────────────────────────────────────────────────────────────────────

function extractText(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(extractText).join("");
  if (React.isValidElement(children)) {
    return extractText(
      (children.props as { children?: React.ReactNode }).children,
    );
  }
  return "";
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

interface ArticleBodyProps {
  content: string;
}

export function ArticleBody({ content }: ArticleBodyProps) {
  const processedContent = preprocessCallouts(content);

  return (
    <article
      className="
        prose prose-neutral max-w-none
        prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-black
        prose-h1:text-3xl prose-h1:mb-6 prose-h1:mt-14
        prose-h2:text-2xl prose-h2:mb-5 prose-h2:mt-12
        prose-h3:text-xl prose-h3:mb-4 prose-h3:mt-9
        prose-h4:text-base prose-h4:mb-3 prose-h4:mt-7 prose-h4:font-semibold
        prose-p:leading-[1.85] prose-p:text-neutral-800 prose-p:text-[17px]
        prose-strong:text-black prose-strong:font-semibold
        prose-em:text-neutral-700
        prose-a:text-neutral-900 prose-a:underline prose-a:underline-offset-2 prose-a:decoration-neutral-300
        hover:prose-a:decoration-neutral-900
        prose-blockquote:border-l-[3px] prose-blockquote:border-neutral-300
        prose-blockquote:bg-transparent prose-blockquote:pl-5 prose-blockquote:pr-0
        prose-blockquote:py-0 prose-blockquote:not-italic prose-blockquote:text-neutral-600
        prose-blockquote:font-normal
        prose-code:rounded prose-code:bg-neutral-200/60 prose-code:px-1.5 prose-code:py-0.5
        prose-code:font-mono prose-code:text-[13px] prose-code:text-neutral-800
        prose-code:before:content-none prose-code:after:content-none
        prose-pre:rounded-none prose-pre:bg-white prose-pre:border
        prose-pre:border-neutral-200 prose-pre:text-neutral-900 prose-pre:text-[13px]
        prose-pre:shadow-none
        prose-table:border-collapse prose-table:border prose-table:border-neutral-300
        prose-th:border prose-th:border-neutral-300 prose-th:bg-neutral-50 prose-th:p-3 prose-th:text-left prose-th:text-sm
        prose-td:border prose-td:border-neutral-200 prose-td:p-3 prose-td:text-sm
        prose-hr:border-neutral-200 prose-hr:my-12
        prose-li:text-neutral-800 prose-li:leading-relaxed
        prose-ol:text-neutral-800 prose-ul:text-neutral-800
        prose-img:rounded-sm prose-img:border prose-img:border-neutral-200
      "
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // ── H1: render normally, excluded from TOC ─────────────────────
          h1: ({ children }) => (
            <h1>{children}</h1>
          ),

          // ── H2: inject id for TOC anchoring ───────────────────────────
          h2: ({ children }) => {
            const text = extractText(children);
            const id = slugify(text);
            return <h2 id={id}>{children}</h2>;
          },

          // ── H3: inject id for TOC anchoring ───────────────────────────
          h3: ({ children }) => {
            const text = extractText(children);
            const id = slugify(text);
            return <h3 id={id}>{children}</h3>;
          },

          // ── Code blocks: Mermaid diagrams or standard pre/code ─────────
          code({ node: _node, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const isBlock = !!match;

            if (isBlock && match?.[1] === "mermaid") {
              return (
                <MermaidDiagram code={String(children).replace(/\n$/, "")} />
              );
            }

            if (!isBlock) {
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }

            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },

          // ── Blockquote: detect callouts vs standard editorial quote ────
          blockquote({ node, children }) {
            // Peek at the AST for the callout marker in the first paragraph
            const firstBlock = (node as unknown as {
              children?: Array<{
                type: string;
                children?: Array<{ type: string; value?: string }>;
              }>;
            })?.children?.[0];

            if (firstBlock?.type === "paragraph") {
              const firstInline = firstBlock.children?.[0];
              if (firstInline?.type === "text") {
                const match = firstInline.value?.match(
                  /^\|\|\|CALLOUT:(\w+)\|\|\|$/,
                );
                if (match) {
                  const type = match[1] as CalloutType;
                  if (CALLOUT_STYLES[type]) {
                    // children[0] is the rendered <p> for |||CALLOUT:TYPE|||
                    // Slice it off — only pass the body content.
                    const childArray = React.Children.toArray(children);
                    return (
                      <CalloutBlock type={type}>
                        {childArray.slice(1)}
                      </CalloutBlock>
                    );
                  }
                }
              }
            }

            // Standard editorial blockquote
            return (
              <blockquote>
                {children}
              </blockquote>
            );
          },
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </article>
  );
}
