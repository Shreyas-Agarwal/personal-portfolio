import { SectionHeader } from "@/components/layout/SectionHeader";

const principles = [
  "State-driven, not trigger-driven",
  "Designed for failure, not ideal conditions",
  "Observable before scalable",
  "Built around constraints, not assumptions",
  "Systems over features",
];

export function Principles() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto w-full max-w-5xl px-6 py-24 md:py-32">
        <SectionHeader label="Principles" title="Principles behind the systems I build" />
        <ol className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2">
          {principles.map((p, i) => (
            <li key={p} className="flex items-start gap-5 bg-card p-6 md:p-8">
              <span className="font-mono text-xs text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-base font-medium text-foreground md:text-lg">{p}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
