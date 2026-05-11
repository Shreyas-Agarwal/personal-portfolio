import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SectionHeader } from "@/components/layout/SectionHeader";

export function About() {
  return (
    <section id="about" className="border-b border-border">
      <div className="mx-auto w-full max-w-4xl px-6 py-24 md:py-32">
        <SectionHeader label="About" title="Systems that survive incomplete information." />
        <div className="space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg">
          <p className="text-foreground">
            I'm interested in systems that continue operating under incomplete information,
            operational chaos, and real-world constraints — not the ones that look correct in a
            slide deck.
          </p>
          <p>
            My work sits between product, data, and infrastructure: decision engines, automation
            pipelines, and platforms for industries where the cost of a wrong state transition is
            measured in days of field work, not refresh cycles.
          </p>
          <p>
            I treat reliability, observability, and clear failure modes as first-class product
            features. Most of what I build is judged less by what it does on day one and more by how
            it behaves on day 400, on a bad network, with a partial input.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="mailto:hello@example.com"
            className="inline-flex items-center gap-1 text-sm text-foreground transition-colors hover:text-primary"
          >
            Get in touch <ArrowRight className="h-4 w-4" />
          </a>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Read case studies <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
