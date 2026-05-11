"use client";

// system-evolution/ArchitectureDiagram.tsx
// Renders the evolving topology over time. Nodes maintain absolute coordinates
// to communicate a persistent, evolving system rather than a sequence of clean states.

import type { DiagramEdge, DiagramNode } from "./data";

type Props = {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
};

const NODE_W = 130;
const NODE_H = 34;

export function ArchitectureDiagram({ nodes, edges }: Props) {
  const SVG_W = 460;
  const SVG_H = 360;

  return (
    <div className="select-none relative w-full aspect-[460/360] max-w-[460px] mx-auto overflow-hidden rounded-md border border-white/[0.03] bg-white/[0.01]">
      <div className="absolute top-3 left-4 font-mono text-[9px] uppercase tracking-[0.22em] text-white/20">
        arch.topology
      </div>

      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        fill="none"
        aria-hidden="true"
        className="overflow-visible"
      >
        <defs>
          <style>
            {`
                        @keyframes flow {
                            to { stroke-dashoffset: -12; }
                        }
                        .edge-animated {
                            animation: flow 0.6s linear infinite;
                        }
                        .topology-element {
                            transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                        }
                        `}
          </style>
        </defs>

        {/* Edges */}
        {edges.map((edge) => {
          const fromNode = nodes.find((n) => n.id === edge.from);
          const toNode = nodes.find((n) => n.id === edge.to);
          if (!fromNode || !toNode) return null;

          const status = edge.status || "active";

          const x1 = fromNode.x + NODE_W / 2;
          const y1 = fromNode.y + NODE_H / 2;
          const x2 = toNode.x + NODE_W / 2;
          const y2 = toNode.y + NODE_H / 2;

          // Organic routing: straight line but curved if Y is different.
          // Actually, let's just use cubic bezier for all to make it look like "cables".
          const dy = Math.abs(y2 - y1);
          const pathD = `M ${x1} ${y1} C ${x1} ${y1 + dy / 2}, ${x2} ${y2 - dy / 2}, ${x2} ${y2}`;

          const isDimmed = status === "dimmed";
          const isObsolete = status === "obsolete";

          const strokeColor = isObsolete
            ? "rgba(252,165,165,0.12)"
            : isDimmed
              ? "rgba(255,255,255,0.06)"
              : edge.animated
                ? "rgba(134,239,172,0.3)"
                : "rgba(255,255,255,0.18)";

          // Animation dash vs dashed status
          let strokeDash = "none";
          if (edge.animated && status === "active") strokeDash = "3 4";
          else if (edge.dashed) strokeDash = "2 4";
          else if (isObsolete) strokeDash = "4 4";

          return (
            <g key={edge.id} className="topology-element">
              <path
                d={pathD}
                stroke={strokeColor}
                strokeWidth="1.5"
                strokeDasharray={strokeDash}
                fill="none"
                className={edge.animated && status === "active" ? "edge-animated" : ""}
              />
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => {
          const status = node.status || "active";
          const isDimmed = status === "dimmed";
          const isObsolete = status === "obsolete";

          // Theming based on state and type
          const fill = isObsolete
            ? "rgba(252,165,165,0.02)"
            : isDimmed
              ? "rgba(255,255,255,0.01)"
              : node.type === "primary"
                ? "rgba(255,255,255,0.05)"
                : node.type === "secondary"
                  ? "rgba(255,255,255,0.02)"
                  : "transparent";

          const stroke = isObsolete
            ? "rgba(252,165,165,0.2)"
            : isDimmed
              ? "rgba(255,255,255,0.08)"
              : node.type === "primary"
                ? "rgba(255,255,255,0.2)"
                : node.type === "secondary"
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(255,255,255,0.25)";

          const textFill = isObsolete
            ? "rgba(252,165,165,0.4)"
            : isDimmed
              ? "rgba(255,255,255,0.25)"
              : "rgba(255,255,255,0.75)";

          const dash = node.type === "boundary" || isObsolete ? "4 3" : "none";

          return (
            <g
              key={node.id}
              style={{ transform: `translate(${node.x}px, ${node.y}px)` }}
              className="topology-element"
            >
              <rect
                x={0}
                y={0}
                width={NODE_W}
                height={NODE_H}
                rx="3"
                fill={fill}
                stroke={stroke}
                strokeWidth="1"
                strokeDasharray={dash}
              />
              <text
                x={NODE_W / 2}
                y={NODE_H / 2 + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="9"
                fontFamily="'JetBrains Mono', ui-monospace, monospace"
                letterSpacing="0.04em"
                fill={textFill}
              >
                {node.label}
              </text>

              {/* Activity Indicator for active nodes */}
              {status === "active" && (
                <circle
                  cx={8}
                  cy={NODE_H / 2}
                  r={1.5}
                  fill={node.type === "primary" ? "rgba(134,239,172,0.6)" : "rgba(255,255,255,0.3)"}
                />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
