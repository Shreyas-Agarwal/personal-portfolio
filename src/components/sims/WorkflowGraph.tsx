const nodes = [
  { id: "task", label: "Task", x: 60 },
  { id: "validation", label: "Validation", x: 200 },
  { id: "escalation", label: "Escalation", x: 350 },
  { id: "notification", label: "Notification", x: 500 },
];

export function WorkflowGraph() {
  return (
    <div className="rounded-lg border border-border bg-card/40">
      <div className="flex items-center justify-between border-b border-border px-4 py-2 font-mono text-xs text-muted-foreground">
        <span>workflow.graph</span>
        <span>4 nodes · 3 edges</span>
      </div>
      <div className="overflow-x-auto p-4">
        <svg viewBox="0 0 580 140" className="w-full min-w-[540px]">
          <title>Workflow Graph</title>
          <defs>
            <marker
              id="wf-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
            </marker>
          </defs>
          {nodes.slice(0, -1).map((n, i) => {
            const next = nodes[i + 1];
            return (
              <line
                key={n.id}
                x1={n.x + 50}
                y1={70}
                x2={next.x - 8}
                y2={70}
                className="text-primary/70"
                stroke="currentColor"
                strokeWidth={1.2}
                markerEnd="url(#wf-arrow)"
              >
                <animate
                  attributeName="stroke-dasharray"
                  values="0,200;100,0"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </line>
            );
          })}
          {nodes.map((n) => (
            <g key={n.id}>
              <rect
                x={n.x - 8}
                y={50}
                width={70}
                height={40}
                rx={4}
                className="fill-card stroke-border"
                strokeWidth={1}
              />
              <text
                x={n.x + 27}
                y={74}
                textAnchor="middle"
                className="fill-foreground font-mono text-[10px]"
              >
                {n.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
