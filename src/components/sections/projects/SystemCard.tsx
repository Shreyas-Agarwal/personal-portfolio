import { ArrowRight } from "lucide-react";

interface Props {
  index: string;
  title: string;
  description: string;
  scale: string;
}

export function SystemCard({ index, title, description, scale }: Props) {
  return (
    <article className="group relative flex flex-col justify-between rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/60 md:p-8">
      <div>
        <div className="mb-6 flex items-center justify-between text-xs font-mono text-muted-foreground">
          <span>{index}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
        </div>
        <h3 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
          {description}
        </p>
      </div>
      <div className="mt-8 border-t border-border pt-5">
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Scale</p>
        <p className="mt-1 text-sm text-foreground">{scale}</p>
        <button
          type="button"
          className="mt-5 inline-flex items-center gap-1 text-sm text-foreground transition-colors group-hover:text-primary"
        >
          View Case Study
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </article>
  );
}
