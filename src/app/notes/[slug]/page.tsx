import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { ArrowLeft, Clock, Github, Tag } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MermaidDiagram } from "@/components/ui/mermaid-diagram";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), "content/notes", `${slug}.md`);
  if (!fs.existsSync(filePath)) return { title: "Not Found" };

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data } = matter(fileContent);

  return {
    title: `${data.title} — Notes`,
    description: data.subtitle,
  };
}

export async function generateStaticParams() {
  const notesDirectory = path.join(process.cwd(), "content/notes");
  if (!fs.existsSync(notesDirectory)) return [];
  const filenames = fs.readdirSync(notesDirectory);
  return filenames.map((filename) => ({
    slug: filename.replace(/\.md$/, ""),
  }));
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), "content/notes", `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);

  return (
    <div
      data-header-theme="light"
      className="min-h-screen bg-[#F3F1EC] text-[#1a1a1a] selection:bg-black/10"
    >
      {/* Note Header */}
      <header className="border-b border-neutral-200 bg-white/50 backdrop-blur-md">
        <div className="mx-auto max-w-4xl px-6 py-24 md:px-12">
          <Link
            href="/notes"
            className="group mb-12 inline-flex items-center gap-2 text-sm font-medium tracking-tight text-neutral-500 transition-colors hover:text-black"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Notes
          </Link>

          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-neutral-200 bg-neutral-100/50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                {data.category || "Note"}
              </span>
              <span className="flex items-center gap-1.5 text-[11px] font-medium text-neutral-400">
                <Clock className="h-3 w-3" />
                {data.year || new Date().getFullYear()}
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight text-black md:text-5xl lg:text-6xl">
                {data.title}
              </h1>
              {data.subtitle && (
                <p className="max-w-2xl text-xl leading-relaxed text-neutral-600">
                  {data.subtitle}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
              {data.tags && (
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(data.tags)
                    ? data.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="flex items-center gap-1 text-[11px] font-medium text-neutral-500"
                        >
                          <Tag className="h-3 w-3" />
                          {tag}
                        </span>
                      ))
                    : null}
                </div>
              )}

              {data.github && (
                <a
                  href={data.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-medium text-neutral-700 shadow-sm transition-all hover:border-black hover:text-black"
                >
                  <Github className="h-3.5 w-3.5" />
                  View Repository
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Note Content */}
      <main className="mx-auto max-w-4xl px-6 py-24 md:px-12">
        <article
          className="prose prose-neutral max-w-none 
                    prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-black
                    prose-h1:text-3xl prose-h1:mb-8 prose-h1:mt-16
                    prose-h2:text-2xl prose-h2:mb-6 prose-h2:mt-12
                    prose-p:leading-relaxed prose-p:text-neutral-800 prose-p:text-lg
                    prose-strong:text-black
                    prose-blockquote:border-l-2 prose-blockquote:border-black prose-blockquote:bg-white/50 prose-blockquote:py-2 prose-blockquote:italic prose-blockquote:text-neutral-700
                    prose-code:rounded prose-code:bg-neutral-200/50 prose-code:px-1 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
                    prose-pre:rounded-none prose-pre:bg-white prose-pre:border prose-pre:border-neutral-200 prose-pre:text-neutral-900
                    prose-table:border-collapse prose-table:border prose-table:border-neutral-300
                    prose-th:border prose-th:border-neutral-300 prose-th:bg-neutral-100/50 prose-th:p-3 prose-th:text-left
                    prose-td:border prose-td:border-neutral-200 prose-td:p-3
                    prose-hr:border-neutral-300
                    prose-li:text-neutral-800
                    "
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                const isInline = !match && !String(children).includes("\n");

                return !isInline && match && match[1] === "mermaid" ? (
                  <MermaidDiagram code={String(children).replace(/\n$/, "")} />
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {content}
          </ReactMarkdown>
        </article>

        <footer className="mt-32 border-t border-neutral-200 pt-12 text-center">
          <p className="text-sm text-neutral-400">
            &copy; {new Date().getFullYear()} Shreyas Agarwal. Systems Research.
          </p>
        </footer>
      </main>
    </div>
  );
}
