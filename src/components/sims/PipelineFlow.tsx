const stages = [
  { id: "aps", label: "APS", sub: "source" },
  { id: "worker", label: "Worker", sub: "ingest" },
  { id: "db", label: "MongoDB", sub: "store" },
  { id: "engine", label: "Decision", sub: "evaluate" },
  { id: "out", label: "Output", sub: "notify" },
];

export function PipelineFlow() {
  return (
    <div className="rounded-lg border border-border bg-card/40">
      <div className="flex items-center justify-between border-b border-border px-4 py-2 font-mono text-xs text-muted-foreground">
        <span>data_pipeline.flow</span>
        <span>throughput: ~200K/day</span>
      </div>
      <div className="grid grid-cols-1 gap-3 p-4 md:grid-cols-5">
        {stages.map((s, i) => (
          <div
            key={s.id}
            className="relative rounded border border-border bg-card p-3 font-mono text-xs"
          >
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
              {String(i + 1).padStart(2, "0")} · {s.sub}
            </div>
            <div className="mt-1 text-foreground">{s.label}</div>
            {i < stages.length - 1 && (
              <span className="absolute right-[-12px] top-1/2 hidden h-px w-6 -translate-y-1/2 bg-primary/60 md:block" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
