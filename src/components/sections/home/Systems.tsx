import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { caseStudies } from "@/lib/case-studies";

export function Systems() {
  const systems = caseStudies.filter((c) => c.kind === "system");
  return (
    <section id="systems" className="border-b border-border">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 md:py-32">
        <SectionHeader label="Work" title="Selected Systems" />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {systems.map((s, i) => (
            <Link
              key={s.slug}
              href={`/case-studies/${s.slug}`}
              className="group flex flex-col justify-between rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/60 md:p-8"
            >
              <div>
                <div className="mb-6 flex items-center justify-between font-mono text-xs text-muted-foreground">
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                </div>
                <h3 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {s.summary}
                </p>
              </div>
              <div className="mt-8 border-t border-border pt-5">
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  Topology
                </p>
                <p className="mt-1 line-clamp-2 font-mono text-xs text-foreground/80">
                  {s.topology}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm text-foreground transition-colors group-hover:text-primary">
                  View Case Study
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
