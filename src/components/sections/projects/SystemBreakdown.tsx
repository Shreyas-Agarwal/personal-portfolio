interface Props {
  topology: string;
  metrics: { label: string; value: string }[];
  stack?: string[];
}

export function SystemBreakdown({ topology, metrics, stack }: Props) {
  return (
    <div className="rounded-lg border border-border bg-card/50 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-border px-4 py-2 text-muted-foreground">
        <span>system.breakdown</span>
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-primary/80" />
          live
        </span>
      </div>
      <div className="space-y-5 p-4 md:p-5">
        <div>
          <p className="mb-2 uppercase tracking-wider text-muted-foreground">topology</p>
          <p className="text-foreground leading-relaxed break-words">{topology}</p>
        </div>
        <div>
          <p className="mb-2 uppercase tracking-wider text-muted-foreground">metrics</p>
          <ul className="space-y-1">
            {metrics.map((m) => (
              <li
                key={m.label}
                className="flex justify-between gap-4 border-b border-dashed border-border/60 py-1 last:border-0"
              >
                <span className="text-muted-foreground">{m.label}</span>
                <span className="text-foreground">{m.value}</span>
              </li>
            ))}
          </ul>
        </div>
        {stack && (
          <div>
            <p className="mb-2 uppercase tracking-wider text-muted-foreground">stack</p>
            <div className="flex flex-wrap gap-1.5">
              {stack.map((s) => (
                <span key={s} className="rounded border border-border px-2 py-0.5 text-foreground">
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
