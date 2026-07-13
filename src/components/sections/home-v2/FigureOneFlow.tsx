"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { plexMono } from "@/lib/fonts";

const EASE = [0.16, 1, 0.3, 1] as const;
/** This figure sits on the cream paper surface (#ECE5D4), not graphite, so its structural
 * ink is dark — same ink-on-cream convention as EditorialInterlude's prose. */
const INK = "#1B1D1F";

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
  { id: "schedule", label: "SCHEDULE", kind: "io", pos: { x: 73, y: 42 }, labelSide: "left" },
  { id: "sensor", label: "SENSOR", kind: "io", pos: { x: 283, y: 18 }, labelSide: "top" },
  { id: "telemetry", label: "TELEMETRY", kind: "io", pos: { x: 515, y: 16 }, labelSide: "top" },
  { id: "ledger", label: "LEDGER", kind: "io", pos: { x: 732, y: 58 }, labelSide: "right" },
  { id: "queue", label: "QUEUE", kind: "io", pos: { x: 771, y: 158 }, labelSide: "right" },
  { id: "archive", label: "ARCHIVE", kind: "io", pos: { x: 737, y: 262 }, labelSide: "right" },
  { id: "cache", label: "CACHE", kind: "io", pos: { x: 510, y: 312 }, labelSide: "bottom" },
  { id: "log", label: "LOG", kind: "io", pos: { x: 278, y: 318 }, labelSide: "bottom" },
  { id: "events", label: "EVENTS", kind: "io", pos: { x: 61, y: 278 }, labelSide: "left" },
  { id: "stream", label: "STREAM", kind: "io", pos: { x: 29, y: 158 }, labelSide: "left" },
  { id: "c1", label: "", kind: "compute", pos: { x: 225, y: 120 } },
  { id: "c2", label: "", kind: "compute", pos: { x: 486, y: 100 } },
  { id: "c3", label: "", kind: "compute", pos: { x: 370, y: 222 } },
  { id: "c4", label: "", kind: "compute", pos: { x: 587, y: 200 } },
];

const DESKTOP_EDGES: EdgeSpec[] = [
  { id: "e1", from: "schedule", to: "c1" },
  { id: "e2", from: "stream", to: "c1" },
  { id: "e3", from: "sensor", to: "c1" },
  { id: "e4", from: "sensor", to: "c2" },
  { id: "e5", from: "telemetry", to: "c2" },
  { id: "e6", from: "ledger", to: "c2" },
  { id: "e7", from: "ledger", to: "c4" },
  { id: "e8", from: "queue", to: "c4" },
  { id: "e9", from: "archive", to: "c4" },
  { id: "e10", from: "archive", to: "c3" },
  { id: "e11", from: "cache", to: "c3" },
  { id: "e12", from: "cache", to: "c4" },
  { id: "e13", from: "log", to: "c3" },
  { id: "e14", from: "events", to: "c3" },
  { id: "e15", from: "events", to: "c1" },
  { id: "e16", from: "c1", to: "c3" },
  { id: "e17", from: "c1", to: "c2" },
  { id: "e18", from: "c2", to: "c4" },
  { id: "e19", from: "c3", to: "c4" },
];

const MOBILE_NODES: NodeSpec[] = [
  { id: "m-schedule", label: "SCHEDULE", kind: "io", pos: { x: 34, y: 26 }, labelSide: "left" },
  { id: "m-sensor", label: "SENSOR", kind: "io", pos: { x: 168, y: 44 }, labelSide: "right" },
  { id: "m-c1", label: "", kind: "compute", pos: { x: 108, y: 104 } },
  { id: "m-ledger", label: "LEDGER", kind: "io", pos: { x: 28, y: 150 }, labelSide: "left" },
  { id: "m-c2", label: "", kind: "compute", pos: { x: 90, y: 216 } },
  { id: "m-telemetry", label: "TELEMETRY", kind: "io", pos: { x: 186, y: 178 }, labelSide: "right" },
  { id: "m-c3", label: "", kind: "compute", pos: { x: 138, y: 296 } },
  { id: "m-queue", label: "QUEUE", kind: "io", pos: { x: 38, y: 300 }, labelSide: "left" },
  { id: "m-archive", label: "ARCHIVE", kind: "io", pos: { x: 98, y: 378 }, labelSide: "bottom" },
];

const MOBILE_EDGES: EdgeSpec[] = [
  { id: "me1", from: "m-schedule", to: "m-c1" },
  { id: "me2", from: "m-sensor", to: "m-c1" },
  { id: "me3", from: "m-c1", to: "m-ledger" },
  { id: "me4", from: "m-c1", to: "m-c2" },
  { id: "me5", from: "m-telemetry", to: "m-c2" },
  { id: "me6", from: "m-ledger", to: "m-c2" },
  { id: "me7", from: "m-c2", to: "m-c3" },
  { id: "me8", from: "m-queue", to: "m-c3" },
  { id: "me9", from: "m-c3", to: "m-archive" },
];

function findNode(nodes: NodeSpec[], id: string): NodeSpec {
  const node = nodes.find((n) => n.id === id);
  if (!node) throw new Error(`Unknown node id: ${id}`);
  return node;
}

/** Deterministic scatter — every path bows a different amount/direction so the network
 * reads as tangled rather than a clean wiring diagram, without relying on Math.random(). */
function edgeOffset(i: number) {
  const sign = i % 2 === 0 ? 1 : -1;
  return sign * (18 + ((i * 13) % 42));
}

function curvedPath(a: Vec, b: Vec, offset: number) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const cx = mx + nx * offset;
  const cy = my + ny * offset;
  return `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`;
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

function DiagramNode({ node }: { node: NodeSpec }) {
  if (node.kind === "compute") {
    return (
      <rect
        x={node.pos.x - 6}
        y={node.pos.y - 6}
        width={12}
        height={12}
        transform={`rotate(45 ${node.pos.x} ${node.pos.y})`}
        fill="none"
        stroke={INK}
        strokeOpacity={0.55}
        strokeWidth={1}
      />
    );
  }

  const { dx, dy, anchor } = labelOffset(node.labelSide);
  return (
    <g>
      <circle cx={node.pos.x} cy={node.pos.y} r={7} fill="none" stroke={INK} strokeOpacity={0.5} strokeWidth={1} />
      <text
        x={node.pos.x + dx}
        y={node.pos.y + dy}
        textAnchor={anchor}
        fontSize={9}
        letterSpacing="0.08em"
        fill={INK}
        fillOpacity={0.4}
        className={plexMono.className}
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
}: {
  nodes: NodeSpec[];
  edges: EdgeSpec[];
  viewBox: string;
  reducedMotion: boolean;
}) {
  return (
    <svg
      viewBox={viewBox}
      className="h-full w-full"
      role="img"
      aria-label="Diagram of colored data packets traveling curved paths between systems through computation nodes"
    >
      <defs>
        <marker id="fig01-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={INK} fillOpacity={0.45} />
        </marker>
      </defs>

      {/* structural wiring — always visible, low-opacity, curved rather than straight */}
      {edges.map((edge, i) => {
        const from = findNode(nodes, edge.from);
        const to = findNode(nodes, edge.to);
        const d = curvedPath(from.pos, to.pos, edgeOffset(i));
        return (
          <path
            key={edge.id}
            d={d}
            stroke={INK}
            strokeOpacity={0.12}
            strokeWidth={1}
            fill="none"
            markerEnd={reducedMotion ? "url(#fig01-arrow)" : undefined}
          />
        );
      })}

      {/* colored packets — traveling line segments, not dots. Speed varies with an
          ease-in-out timing curve per segment (accelerate, cruise, decelerate) rather
          than constant velocity, and each path gets its own duration so the network
          never falls into visible lockstep. Perpetual, per the named exception below:
          this figure never pauses while off-screen, unlike everything else on the site. */}
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
        <DiagramNode key={node.id} node={node} />
      ))}
    </svg>
  );
}

/**
 * Named exception to the site's visibility-scoped motion rule: this diagram
 * IS the system, in miniature — data keeps moving through real
 * infrastructure whether or not anyone is looking at a dashboard. It runs
 * continuously regardless of scroll position, unlike every other animated
 * element on the page. Do not add an IntersectionObserver pause here; that
 * would be "fixing" the one deliberate exception on the site.
 *
 * This is also the one deliberately non-monochrome element on the page —
 * the packets are colored on purpose, standing in for how genuinely tangled
 * and constantly-in-motion real network architecture is, in contrast to the
 * otherwise chalk/graphite drafting-desk palette used everywhere else.
 */
export function FigureOneFlow() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="w-full"
    >
      <div className="hidden aspect-[810/340] w-full md:block">
        <NetworkDiagram nodes={DESKTOP_NODES} edges={DESKTOP_EDGES} viewBox="0 0 810 340" reducedMotion={reducedMotion} />
      </div>
      <div className="aspect-[220/420] w-full max-w-xs md:hidden">
        <NetworkDiagram nodes={MOBILE_NODES} edges={MOBILE_EDGES} viewBox="0 0 220 420" reducedMotion={reducedMotion} />
      </div>
    </motion.div>
  );
}
