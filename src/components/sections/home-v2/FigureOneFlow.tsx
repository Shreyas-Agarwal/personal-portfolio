"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { plexMono } from "@/lib/fonts";

const EASE = [0.16, 1, 0.3, 1] as const;
/** This figure sits on the cream paper surface (#ECE5D4), not graphite, so its structural
 * ink is dark — same ink-on-cream convention as EditorialInterlude's prose. */
const INK = "#1B1D1F";
const ACCENT_INK = "#DE4B31";

/** Packet colors — the one deliberately non-monochrome element on the page: this diagram
 * is meant to read as "the actual internet," not the site's usual drafting-desk palette. */
const PACKET_COLORS = ["#3E6FD1", "#2E8F6E", "#B9812B", "#B84A66", "#7360C4", "#2E93A3"];

interface Vec {
  x: number;
  y: number;
}

interface NodeSpec {
  id: string;
  label: string;
  kind: "io" | "compute";
  pos: Vec;
  labelSide?: "top" | "bottom" | "left" | "right";
}

interface EdgeSpec {
  id: string;
  from: string;
  to: string;
}

const DESKTOP_NODES: NodeSpec[] = [
  { id: "reality", label: "REALITY", kind: "io", pos: { x: 70, y: 120 }, labelSide: "right" },
  { id: "signals", label: "SIGNALS", kind: "io", pos: { x: 150, y: 260 }, labelSide: "top" },
  {
    id: "observations",
    label: "OBSERVATIONS",
    kind: "io",
    pos: { x: 260, y: 80 },
    labelSide: "bottom",
  },
  { id: "state", label: "STATE", kind: "io", pos: { x: 410, y: 50 }, labelSide: "bottom" },
  { id: "context", label: "CONTEXT", kind: "io", pos: { x: 230, y: 290 }, labelSide: "top" },
  { id: "memory", label: "MEMORY", kind: "io", pos: { x: 430, y: 200 }, labelSide: "right" },
  { id: "history", label: "HISTORY", kind: "io", pos: { x: 380, y: 300 }, labelSide: "top" },
  {
    id: "coordination",
    label: "COORDINATION",
    kind: "io",
    pos: { x: 570, y: 270 },
    labelSide: "top",
  },
  { id: "models", label: "MODELS", kind: "io", pos: { x: 590, y: 90 }, labelSide: "bottom" },
  { id: "decisions", label: "DECISIONS", kind: "io", pos: { x: 740, y: 180 }, labelSide: "left" },
  { id: "c1", label: "", kind: "compute", pos: { x: 170, y: 150 } },
  { id: "c2", label: "", kind: "compute", pos: { x: 330, y: 130 } },
  { id: "c3", label: "", kind: "compute", pos: { x: 500, y: 150 } },
  { id: "c4", label: "", kind: "compute", pos: { x: 670, y: 240 } },
];

const DESKTOP_EDGES: EdgeSpec[] = [
  // Core flow
  { id: "e1", from: "reality", to: "signals" },
  { id: "e2", from: "signals", to: "c1" },
  { id: "e3", from: "c1", to: "observations" },
  { id: "e4", from: "observations", to: "state" },
  { id: "e5", from: "observations", to: "context" },
  { id: "e6", from: "state", to: "c2" },
  { id: "e7", from: "context", to: "c2" },
  { id: "e8", from: "c2", to: "models" },
  { id: "e9", from: "memory", to: "models" },
  { id: "e10", from: "history", to: "models" },
  { id: "e11", from: "models", to: "c3" },
  { id: "e12", from: "c3", to: "coordination" },
  { id: "e13", from: "coordination", to: "decisions" },
  { id: "e14", from: "decisions", to: "c4" },
  { id: "e15", from: "c4", to: "reality" },

  // Overlapping/colliding and direct bypass connections
  { id: "e16", from: "signals", to: "state" },
  { id: "e17", from: "reality", to: "memory" },
  { id: "e18", from: "observations", to: "models" },
  { id: "e19", from: "context", to: "memory" },
  { id: "e20", from: "memory", to: "history" },
  { id: "e21", from: "history", to: "coordination" },
  { id: "e22", from: "state", to: "coordination" },
  { id: "e23", from: "models", to: "decisions" },
  { id: "e24", from: "coordination", to: "reality" },
  { id: "e25", from: "decisions", to: "history" },
  { id: "e26", from: "history", to: "state" },
  { id: "e27", from: "c1", to: "c2" },
  { id: "e28", from: "c2", to: "c3" },
  { id: "e29", from: "c3", to: "c4" },
];

const MOBILE_NODES: NodeSpec[] = [
  { id: "m-reality", label: "REALITY", kind: "io", pos: { x: 40, y: 40 }, labelSide: "right" },
  { id: "m-signals", label: "SIGNALS", kind: "io", pos: { x: 180, y: 70 }, labelSide: "left" },
  {
    id: "m-obs",
    label: "OBSERVATIONS",
    kind: "io",
    pos: { x: 60, y: 150 },
    labelSide: "right",
  },
  { id: "m-state", label: "STATE", kind: "io", pos: { x: 170, y: 190 }, labelSide: "left" },
  { id: "m-context", label: "CONTEXT", kind: "io", pos: { x: 50, y: 260 }, labelSide: "right" },
  { id: "m-models", label: "MODELS", kind: "io", pos: { x: 180, y: 290 }, labelSide: "left" },
  {
    id: "m-[#1B1D1F]",
    label: "COORDINATION",
    kind: "io",
    pos: { x: 60, y: 350 },
    labelSide: "right",
  },
  { id: "m-decisions", label: "DECISIONS", kind: "io", pos: { x: 170, y: 390 }, labelSide: "left" },
  { id: "m-c1", label: "", kind: "compute", pos: { x: 110, y: 100 } },
  { id: "m-c2", label: "", kind: "compute", pos: { x: 110, y: 220 } },
  { id: "m-c3", label: "", kind: "compute", pos: { x: 110, y: 320 } },
];

const MOBILE_EDGES: EdgeSpec[] = [
  { id: "m-e1", from: "m-reality", to: "m-signals" },
  { id: "m-e2", from: "m-signals", to: "m-c1" },
  { id: "m-e3", from: "m-c1", to: "m-obs" },
  { id: "m-e4", from: "m-obs", to: "m-state" },
  { id: "m-e5", from: "m-state", to: "m-context" },
  { id: "m-e6", from: "m-context", to: "m-c2" },
  { id: "m-e7", from: "m-c2", to: "m-models" },
  { id: "m-e8", from: "m-models", to: "m-[#1B1D1F]" },
  { id: "m-e9", from: "m-[#1B1D1F]", to: "m-c3" },
  { id: "m-e10", from: "m-c3", to: "m-decisions" },
  { id: "m-e11", from: "m-decisions", to: "m-reality" },
];

function curvedPath(from: Vec, to: Vec, offset: number): string {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const cx = (from.x + to.x) / 2 - dy * offset;
  const cy = (from.y + to.y) / 2 + dx * offset;
  return `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`;
}

function edgeOffset(index: number): number {
  const table = [0.18, -0.22, 0.15, -0.19, 0.24, -0.16];
  return table[index % table.length];
}

function findNode(nodes: NodeSpec[], id: string): NodeSpec {
  const n = nodes.find((item) => item.id === id);
  if (n) return n;
  return { id, label: "", kind: "compute", pos: { x: 0, y: 0 } };
}

function labelOffset(side: NodeSpec["labelSide"]) {
  switch (side) {
    case "top":
      return { dx: 0, dy: -14, anchor: "middle" as const };
    case "bottom":
      return { dx: 0, dy: 20, anchor: "middle" as const };
    case "left":
      return { dx: -12, dy: 4, anchor: "end" as const };
    default:
      return { dx: 12, dy: 4, anchor: "start" as const };
  }
}

function DiagramNode({
  node,
  isHovered,
  onHover,
}: {
  node: NodeSpec;
  isHovered: boolean;
  onHover: (id: string | null) => void;
}) {
  if (node.kind === "compute") {
    return (
      <rect
        x={node.pos.x - 6}
        y={node.pos.y - 6}
        width={12}
        height={12}
        transform={`rotate(45 ${node.pos.x} ${node.pos.y})`}
        fill="none"
        stroke={isHovered ? ACCENT_INK : INK}
        strokeOpacity={isHovered ? 0.9 : 0.55}
        strokeWidth={1}
      />
    );
  }

  const { dx, dy, anchor } = labelOffset(node.labelSide);
  return (
    <g
      className="cursor-pointer transition-all duration-300"
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
    >
      <circle
        cx={node.pos.x}
        cy={node.pos.y}
        r={isHovered ? 9 : 7}
        fill={isHovered ? ACCENT_INK : "none"}
        fillOpacity={isHovered ? 0.15 : 0}
        stroke={isHovered ? ACCENT_INK : INK}
        strokeOpacity={isHovered ? 1 : 0.5}
        strokeWidth={isHovered ? 2 : 1}
        className="transition-all duration-300"
      />
      <text
        x={node.pos.x + dx}
        y={node.pos.y + dy}
        textAnchor={anchor}
        fontSize={isHovered ? 10 : 9}
        letterSpacing="0.08em"
        fill={isHovered ? ACCENT_INK : INK}
        fillOpacity={isHovered ? 1 : 0.4}
        fontWeight={isHovered ? 500 : 400}
        className={`${plexMono.className} transition-all duration-300`}
      >
        {node.label}
      </text>
    </g>
  );
}

function NetworkDiagram({
  nodes,
  edges,
  viewBox,
  reducedMotion,
  hoveredNode,
  onHoverNode,
}: {
  nodes: NodeSpec[];
  edges: EdgeSpec[];
  viewBox: string;
  reducedMotion: boolean;
  hoveredNode: string | null;
  onHoverNode: (id: string | null) => void;
}) {
  return (
    <svg
      viewBox={viewBox}
      className="h-full w-full"
      role="img"
      aria-label="Diagram of colored data packets traveling curved paths between systems through computation nodes"
    >
      <defs>
        <marker
          id="fig01-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill={INK} fillOpacity={0.45} />
        </marker>
      </defs>

      {/* structural wiring — always visible, low-opacity, curved rather than straight */}
      {edges.map((edge, i) => {
        const from = findNode(nodes, edge.from);
        const to = findNode(nodes, edge.to);
        const d = curvedPath(from.pos, to.pos, edgeOffset(i));
        const isConnected = hoveredNode && (edge.from === hoveredNode || edge.to === hoveredNode);
        return (
          <path
            key={edge.id}
            d={d}
            stroke={isConnected ? ACCENT_INK : INK}
            strokeOpacity={isConnected ? 0.7 : 0.12}
            strokeWidth={isConnected ? 2 : 1}
            fill="none"
            markerEnd={reducedMotion ? "url(#fig01-arrow)" : undefined}
            className="transition-all duration-300"
          />
        );
      })}

      {/* colored packets */}
      {!reducedMotion &&
        edges.map((edge, i) => {
          const from = findNode(nodes, edge.from);
          const to = findNode(nodes, edge.to);
          const offset = edgeOffset(i);
          const forwardD = curvedPath(from.pos, to.pos, offset);
          const backwardD = curvedPath(to.pos, from.pos, -offset);
          const color = PACKET_COLORS[i % PACKET_COLORS.length];
          const duration = 2.4 + ((i * 7) % 5) * 0.55;
          const delay = (i * 0.37) % duration;

          return (
            <g key={`${edge.id}-packets`}>
              <motion.path
                d={forwardD}
                stroke={color}
                strokeWidth={2.2}
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 0.16, 0.16, 0],
                  pathOffset: [0, 0, 0.86, 1],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{ duration, ease: "easeInOut", repeat: Infinity, delay }}
              />
              <motion.path
                d={backwardD}
                stroke={color}
                strokeOpacity={0.45}
                strokeWidth={1.3}
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
                animate={{
                  pathLength: [0, 0.16, 0.16, 0],
                  pathOffset: [0, 0, 0.86, 1],
                  opacity: [0, 0.6, 0.6, 0],
                }}
                transition={{
                  duration: duration * 0.85,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: delay + duration / 2,
                }}
              />
            </g>
          );
        })}

      {nodes.map((node) => (
        <DiagramNode
          key={node.id}
          node={node}
          isHovered={hoveredNode === node.id}
          onHover={onHoverNode}
        />
      ))}
    </svg>
  );
}

interface FigureOneFlowProps {
  activeHoverNode?: string | null;
  onHoverNode?: (nodeId: string | null) => void;
}

export function FigureOneFlow({ activeHoverNode, onHoverNode }: FigureOneFlowProps = {}) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [internalHover, setInternalHover] = useState<string | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const currentHovered = activeHoverNode !== undefined ? activeHoverNode : internalHover;
  const handleHover = (id: string | null) => {
    setInternalHover(id);
    onHoverNode?.(id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="w-full"
    >
      <div className="hidden aspect-[810/340] w-full md:block">
        <NetworkDiagram
          nodes={DESKTOP_NODES}
          edges={DESKTOP_EDGES}
          viewBox="0 0 810 340"
          reducedMotion={reducedMotion}
          hoveredNode={currentHovered}
          onHoverNode={handleHover}
        />
      </div>
      <div className="aspect-[220/420] w-full max-w-xs md:hidden">
        <NetworkDiagram
          nodes={MOBILE_NODES}
          edges={MOBILE_EDGES}
          viewBox="0 0 220 420"
          reducedMotion={reducedMotion}
          hoveredNode={currentHovered}
          onHoverNode={handleHover}
        />
      </div>
    </motion.div>
  );
}
