import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export async function generateStaticParams() {
  const adrDirectory = path.join(process.cwd(), "content/adr");
  if (!fs.existsSync(adrDirectory)) return [];
  const filenames = fs.readdirSync(adrDirectory);
  return filenames.map((filename) => ({
    slug: filename.replace(/\.md$/, ""),
  }));
}

export default async function ADRPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), "content/adr", `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { content } = matter(fileContent);

  return (
    <div
      data-header-theme="light"
      className="min-h-screen bg-[#F3F1EC] text-[#1a1a1a] selection:bg-black/10"
    >
      <div className="mx-auto max-w-4xl px-6 py-32 md:px-12">
        <Link
          href="/systems"
          className="group mb-12 inline-flex items-center gap-2 text-sm font-medium tracking-tight text-neutral-500 transition-colors hover:text-black"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Systems Archive
        </Link>

        <article
          className="prose prose-neutral max-w-none 
                    prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-black
                    prose-p:leading-relaxed prose-p:text-neutral-800
                    prose-strong:text-black
                    prose-code:rounded prose-code:bg-neutral-200/50 prose-code:px-1 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
                    prose-pre:rounded-none prose-pre:bg-white prose-pre:border prose-pre:border-neutral-200 prose-pre:text-neutral-900
                    prose-table:border-collapse prose-table:border prose-table:border-neutral-300
                    prose-th:border prose-th:border-neutral-300 prose-th:bg-neutral-100/50 prose-th:p-3 prose-th:text-left
                    prose-td:border prose-td:border-neutral-200 prose-td:p-3
                    prose-hr:border-neutral-300
                    prose-li:text-neutral-800
                    "
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
