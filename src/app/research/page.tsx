import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { ArrowRight, Clock, Tag } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Research",
  description: "Archive of applied systems research and tangible projects.",
};

interface ResearchData {
  slug: string;
  title: string;
  subtitle?: string;
  category?: string;
  year?: string;
  tags?: string[];
}

function getResearch(): ResearchData[] {
  const researchDirectory = path.join(process.cwd(), "content/research");
  if (!fs.existsSync(researchDirectory)) return [];

  const filenames = fs.readdirSync(researchDirectory);
  const researchFiles = filenames
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => {
      const filePath = path.join(researchDirectory, filename);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContent);

      return {
        slug: filename.replace(/\.md$/, ""),
        title: data.title || filename.replace(/\.md$/, ""),
        subtitle: data.subtitle,
        category: data.category,
        year: data.year,
        tags: data.tags,
      };
    });

  return researchFiles;
}

export default function ResearchIndexPage() {
  const researchFiles = getResearch();

  return (
    <div
      data-header-theme="light"
      className="min-h-screen bg-[#F3F1EC] text-[#1a1a1a] selection:bg-black/10"
    >
      {/* Research Archive Header */}
      <header className="border-b border-neutral-200 bg-white/50 backdrop-blur-md">
        <div className="mx-auto max-w-4xl px-6 py-24 md:px-12">
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight text-black md:text-5xl lg:text-6xl">
                Applied Research
              </h1>
              <p className="max-w-2xl text-xl leading-relaxed text-neutral-600">
                An archive of tangible systems research, architectural case studies, and concrete
                implementations.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Research List */}
      <main className="mx-auto max-w-4xl px-6 py-24 md:px-12">
        <div className="space-y-16">
          {researchFiles.map((item) => (
            <article
              key={item.slug}
              className="group relative flex flex-col items-start justify-between border-l-2 border-neutral-200 pl-6 transition-colors hover:border-black md:flex-row md:items-center"
            >
              <div className="flex-1 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  {item.category && (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                      {item.category}
                    </span>
                  )}
                  {item.year && (
                    <span className="flex items-center gap-1.5 text-[11px] font-medium text-neutral-400">
                      <Clock className="h-3 w-3" />
                      {item.year}
                    </span>
                  )}
                </div>

                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-black">
                    <Link
                      href={`/research/${item.slug}`}
                      className="before:absolute before:inset-0"
                    >
                      {item.title}
                    </Link>
                  </h2>
                  {item.subtitle && (
                    <p className="mt-2 text-lg text-neutral-600 line-clamp-2">{item.subtitle}</p>
                  )}
                </div>

                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1 text-[11px] font-medium text-neutral-400"
                      >
                        <Tag className="h-3 w-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6 flex shrink-0 items-center gap-2 text-sm font-medium text-black opacity-0 transition-opacity group-hover:opacity-100 md:mt-0 md:ml-8">
                Read Research
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
