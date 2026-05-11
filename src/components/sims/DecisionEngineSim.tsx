"use client";

import { useMemo, useState } from "react";

type State = "idle" | "pending" | "validating" | "escalated" | "resolved";

const transitions: Record<State, { next: State; label: string }[]> = {
  idle: [{ next: "pending", label: "trigger" }],
  pending: [
    { next: "validating", label: "validate" },
    { next: "idle", label: "cancel" },
  ],
  validating: [
    { next: "resolved", label: "pass" },
    { next: "escalated", label: "fail" },
  ],
  escalated: [{ next: "resolved", label: "override" }],
  resolved: [{ next: "idle", label: "reset" }],
};

const positions: Record<State, { x: number; y: number }> = {
  idle: { x: 60, y: 110 },
  pending: { x: 200, y: 60 },
  validating: { x: 360, y: 110 },
  escalated: { x: 360, y: 200 },
  resolved: { x: 520, y: 110 },
};

const order: State[] = ["idle", "pending", "validating", "escalated", "resolved"];

export function DecisionEngineSim() {
  const [state, setState] = useState<State>("idle");
  const [history, setHistory] = useState<State[]>(["idle"]);

  const edges = useMemo(() => {
    return order.flatMap((from) =>
      transitions[from].map((t) => ({ from, to: t.next, label: t.label })),
    );
  }, []);

  const fire = (next: State) => {
    setState(next);
    setHistory((h) => [...h.slice(-6), next]);
  };

  return (
    <div className="rounded-lg border border-border bg-card/40">
      <div className="flex items-center justify-between border-b border-border px-4 py-2 font-mono text-xs text-muted-foreground">
        <span>decision_engine.sim</span>
        <span>
          state: <span className="text-foreground">{state}</span>
        </span>
      </div>
      <div className="overflow-x-auto p-4">
        <svg viewBox="0 0 600 280" className="w-full min-w-[560px]">
          <title>Decision Engine Simulation</title>
          <defs>
            <marker
              id="arrow"
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
          <g className="text-border">
            {edges.map((e, _i) => {
              const a = positions[e.from];
              const b = positions[e.to];
              const active = state === e.from;
              return (
                <line
                  key={`${e.from}-${e.to}-${e.label}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke="currentColor"
                  strokeWidth={active ? 1.5 : 1}
                  strokeDasharray={active ? "0" : "3 3"}
                  markerEnd="url(#arrow)"
                  className={active ? "text-primary" : "text-border"}
                />
              );
            })}
          </g>
          {order.map((s) => {
            const p = positions[s];
            const active = s === state;
            return (
              <g key={s}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={28}
                  className={active ? "fill-primary/20 stroke-primary" : "fill-card stroke-border"}
                  strokeWidth={1.2}
                />
                <text
                  x={p.x}
                  y={p.y + 4}
                  textAnchor="middle"
                  className={`font-mono text-[10px] ${active ? "fill-foreground" : "fill-muted-foreground"}`}
                >
                  {s}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="flex flex-wrap gap-2 border-t border-border p-4">
        {transitions[state].map((t) => (
          <button
            type="button"
            key={t.label}
            onClick={() => fire(t.next)}
            className="rounded border border-border px-3 py-1.5 font-mono text-xs text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            → {t.label}
          </button>
        ))}
        <span className="ml-auto truncate font-mono text-[10px] text-muted-foreground">
          trace: {history.join(" → ")}
        </span>
      </div>
    </div>
  );
}
