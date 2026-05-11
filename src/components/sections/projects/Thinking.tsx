import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { articles } from "@/lib/articles";
import { caseStudies } from "@/lib/case-studies";

export function Thinking() {
  const research = caseStudies.find((c) => c.kind === "research");
  return (
    <section id="thinking" className="border-b border-border">
      <div className="mx-auto w-full max-w-5xl px-6 py-24 md:py-32">
        <SectionHeader label="Writing" title="Research &amp; Thinking" />
        <p className="mb-10 max-w-2xl text-sm text-muted-foreground md:text-base">
          Long-form notes on system design, data infrastructure, and the industries I build for.
          Closer to working papers than blog posts.
        </p>
        <ul className="divide-y divide-border border-y border-border">
          {research && (
            <li>
              <Link
                href={`/case-studies/${research.slug}`}
                className="group flex flex-col gap-2 py-5 transition-colors hover:text-primary md:flex-row md:items-center md:justify-between md:gap-6"
              >
                <div className="flex items-start gap-6">
                  <span className="mt-1 font-mono text-xs text-primary">PAPER</span>
                  <div>
                    <span className="text-base text-foreground transition-colors group-hover:text-primary md:text-lg">
                      {research.title}
                    </span>
                    <div className="mt-1 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      {research.tags.map((t) => (
                        <span key={t}>#{t.toLowerCase()}</span>
                      ))}
                      <span>· {research.readingTime}</span>
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              </Link>
            </li>
          )}
          {articles.map((a, i) => (
            <li key={a.title}>
              <Link
                href="/research"
                className="group flex flex-col gap-2 py-5 transition-colors hover:text-primary md:flex-row md:items-center md:justify-between md:gap-6"
              >
                <div className="flex items-start gap-6">
                  <span className="mt-1 font-mono text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <span className="text-base text-foreground transition-colors group-hover:text-primary md:text-lg">
                      {a.title}
                    </span>
                    <p className="mt-1 max-w-xl text-sm text-muted-foreground">{a.excerpt}</p>
                    <div className="mt-2 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      {a.tags.map((t) => (
                        <span key={t}>#{t.toLowerCase()}</span>
                      ))}
                      <span>· {a.readingTime}</span>
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/research"
          className="mt-10 inline-flex items-center gap-1 text-sm text-foreground transition-colors hover:text-primary"
        >
          All writing <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
