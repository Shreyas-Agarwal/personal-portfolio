"use client";

import type { ReactElement, SVGProps } from "react";

type DiagramVariant = "4d-sim" | "powerbi" | "fsm" | "whatsapp" | "broker";

interface SystemMicroDiagramProps extends SVGProps<SVGSVGElement> {
  variant: DiagramVariant;
}

// ─── Node + Edge primitives ───────────────────────────────────────────────────

function Node({
  x,
  y,
  label,
  accent = false,
  w = 54,
}: {
  x: number;
  y: number;
  label: string;
  accent?: boolean;
  w?: number;
}) {
  return (
    <g>
      <rect
        x={x - w / 2}
        y={y - 10}
        width={w}
        height={20}
        rx={2.5}
        fill={accent ? "rgba(147,197,253,0.12)" : "rgba(255,255,255,0.04)"}
        stroke={accent ? "rgba(147,197,253,0.4)" : "rgba(255,255,255,0.12)"}
        strokeWidth={0.75}
      />
      <text
        x={x}
        y={y + 4}
        textAnchor="middle"
        fontSize={5}
        fill={accent ? "rgba(147,197,253,0.9)" : "rgba(255,255,255,0.5)"}
        fontFamily="monospace"
        letterSpacing={0.3}
      >
        {label}
      </text>
    </g>
  );
}

function Badge({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g>
      <rect
        x={x - 24}
        y={y - 7}
        width={48}
        height={13}
        rx={6}
        fill="rgba(251,191,36,0.10)"
        stroke="rgba(251,191,36,0.35)"
        strokeWidth={0.6}
      />
      <text
        x={x}
        y={y + 4}
        textAnchor="middle"
        fontSize={4.5}
        fill="rgba(251,191,36,0.85)"
        fontFamily="monospace"
        letterSpacing={0.3}
      >
        {label}
      </text>
    </g>
  );
}

function Edge({
  x1,
  y1,
  x2,
  y2,
  dashed = false,
  color = "rgba(255,255,255,0.1)",
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  dashed?: boolean;
  color?: string;
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={color}
      strokeWidth={0.75}
      strokeDasharray={dashed ? "3 2" : undefined}
    />
  );
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  color = "rgba(255,255,255,0.15)",
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
}) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const ux = dx / len;
  const uy = dy / len;
  const hx = x2 - ux * 5;
  const hy = y2 - uy * 5;
  const px = -uy * 2.5;
  const py = ux * 2.5;
  return (
    <g>
      <line x1={x1} y1={y1} x2={hx} y2={hy} stroke={color} strokeWidth={0.75} />
      <polygon points={`${x2},${y2} ${hx + px},${hy + py} ${hx - px},${hy - py}`} fill={color} />
    </g>
  );
}

function Dot({
  x,
  y,
  pulse = false,
  color = "rgba(147,197,253,0.6)",
}: {
  x: number;
  y: number;
  pulse?: boolean;
  color?: string;
}) {
  return (
    <circle
      cx={x}
      cy={y}
      r={2.5}
      fill={pulse ? color : "rgba(255,255,255,0.2)"}
      className={pulse ? "animate-pulse" : undefined}
    />
  );
}

function Label({ x, y, text }: { x: number; y: number; text: string }) {
  return (
    <text
      x={x}
      y={y}
      fontSize={4}
      fill="rgba(255,255,255,0.18)"
      fontFamily="monospace"
      letterSpacing={0.3}
    >
      {text}
    </text>
  );
}

// ─── 1. 4D Simulation Engine ──────────────────────────────────────────────────
// ACC (native params) → Web Worker (off-thread) → WebGL/Three.js viewer
// Key: no middleware, 60 FPS, isolate() batching

function Diagram4DSim() {
  return (
    <>
      {/* ACC Cloud source */}
      <Node x={50} y={18} label="ACC Cloud" w={52} />
      <Label x={77} y={21} text="native params" />

      <Arrow x1={50} y1={28} x2={50} y2={44} />

      {/* Native param extractor */}
      <Node x={50} y={52} label="Param Extractor" w={64} accent />
      <Dot x={50} y={52} pulse />

      {/* Fork to worker */}
      <Arrow x1={50} y1={62} x2={50} y2={76} />

      {/* Web Worker box */}
      <rect
        x={16}
        y={76}
        width={68}
        height={22}
        rx={2}
        fill="rgba(147,197,253,0.06)"
        stroke="rgba(147,197,253,0.25)"
        strokeWidth={0.75}
      />
      <text
        x={50}
        y={85}
        textAnchor="middle"
        fontSize={5}
        fill="rgba(147,197,253,0.8)"
        fontFamily="monospace"
      >
        Web Worker
      </text>
      <text
        x={50}
        y={93}
        textAnchor="middle"
        fontSize={4}
        fill="rgba(147,197,253,0.4)"
        fontFamily="monospace"
      >
        date interpolation · off-thread
      </text>
      <Dot x={50} y={88} pulse />

      <Arrow x1={50} y1={98} x2={50} y2={112} />

      {/* Three.js / WebGL viewer */}
      <Node x={50} y={120} label="WebGL Viewer" w={60} accent />
      <Label x={80} y={123} text="isolate() batch" />
      <Dot x={50} y={120} pulse />

      {/* 60 FPS badge */}
      <Badge x={130} y={120} label="60 FPS" />
      <Edge x1={80} y1={120} x2={106} y2={120} dashed color="rgba(251,191,36,0.2)" />

      {/* Zero dependency label */}
      <Label x={8} y={148} text="ZERO EXTERNAL MIDDLEWARE" />
    </>
  );
}

// ─── 2. Serverless PowerBI Pipeline ──────────────────────────────────────────
// ADX webhook → Cloud fn → Power Automate → MS Fabric → PowerBI
// Key: no DB, no server, cloud-to-cloud

function DiagramPowerBI() {
  return (
    <>
      {/* Top: Data Connectors */}
      <Node x={35} y={16} label="ACC Data Exchange" w={56} />
      <Node x={105} y={16} label="ACC Data Connector" w={58} />

      {/* Flow down to PowerQuery */}
      <Arrow x1={35} y1={26} x2={55} y2={42} color="rgba(147,197,253,0.3)" />
      <Arrow x1={105} y1={26} x2={85} y2={42} color="rgba(147,197,253,0.3)" />

      {/* PowerQuery / M */}
      <rect
        x={19}
        y={42}
        width={102}
        height={24}
        rx={2}
        fill="rgba(147,197,253,0.07)"
        stroke="rgba(147,197,253,0.3)"
        strokeWidth={0.75}
      />
      <text
        x={70}
        y={51}
        textAnchor="middle"
        fontSize={5}
        fill="rgba(147,197,253,0.8)"
        fontFamily="monospace"
      >
        PowerQuery (M)
      </text>
      <text
        x={70}
        y={58}
        textAnchor="middle"
        fontSize={4}
        fill="rgba(147,197,253,0.4)"
        fontFamily="monospace"
      >
        schema harmonization & join
      </text>
      <Dot x={70} y={51} pulse />

      <Arrow x1={70} y1={66} x2={70} y2={82} />

      {/* DAX Modeling */}
      <Node x={70} y={90} label="DAX Data Modeling" w={76} accent />
      <Label x={108} y={93} text="4D logic" />

      <Arrow x1={70} y1={100} x2={70} y2={116} />

      {/* PowerBI Dashboard */}
      <Node x={70} y={124} label="PowerBI Dashboard" w={72} accent />
      <Dot x={70} y={124} pulse />

      {/* Badges */}
      <Badge x={140} y={54} label="NATIVE" />
      <Badge x={140} y={90} label="ZERO DB" />

      <Label x={20} y={148} text="NATIVE CONNECTORS · POWERQUERY · DAX" />
    </>
  );
}

// ─── 3. Document Stamping FSM ─────────────────────────────────────────────────
// Autodesk webhook → RBAC FSM → PDF stamper (burn) → QR registry
// Key: cryptographic immutability, RBAC roles, QR verification

function DiagramFSM() {
  return (
    <>
      {/* Webhook source */}
      <Node x={50} y={14} label="Autodesk Webhook" w={70} />
      <Arrow x1={50} y1={24} x2={50} y2={37} />

      {/* FSM / RBAC engine */}
      <rect
        x={8}
        y={37}
        width={84}
        height={28}
        rx={2}
        fill="rgba(147,197,253,0.06)"
        stroke="rgba(147,197,253,0.3)"
        strokeWidth={0.75}
      />
      <text
        x={50}
        y={47}
        textAnchor="middle"
        fontSize={5}
        fill="rgba(147,197,253,0.9)"
        fontFamily="monospace"
      >
        RBAC FSM Engine
      </text>
      {/* State flow inside */}
      <text x={16} y={58} fontSize={4} fill="rgba(255,255,255,0.3)" fontFamily="monospace">
        REVIEWER →
      </text>
      <text x={50} y={58} fontSize={4} fill="rgba(255,255,255,0.3)" fontFamily="monospace">
        AUTHORITY →
      </text>
      <text x={78} y={58} fontSize={4} fill="rgba(147,197,253,0.7)" fontFamily="monospace">
        STAMPED
      </text>
      <Dot x={50} y={48} pulse />

      {/* Rejection dashed */}
      <Edge x1={92} y1={52} x2={130} y2={70} dashed color="rgba(248,113,113,0.3)" />
      <Node x={133} y={76} label="REJECTED" w={44} />
      <Label x={100} y={62} text="dashed=reject" />

      <Arrow x1={50} y1={65} x2={50} y2={78} />

      {/* PDF Stamper */}
      <Node x={50} y={86} label="PDF Stamper" w={58} accent />
      <Label x={79} y={89} text="binary burn" />
      <Dot x={50} y={86} pulse />

      <Arrow x1={50} y1={96} x2={50} y2={108} />

      {/* Two outputs: stamped PDF + QR */}
      <Edge x1={50} y1={115} x2={28} y2={128} />
      <Edge x1={50} y1={115} x2={80} y2={128} />

      <Node x={28} y={136} label="Stamped PDF" w={52} />
      <Node x={80} y={136} label="QR Registry" w={50} accent />
      <Dot x={80} y={136} pulse />

      <Label x={6} y={148} text="IMMUTABLE · RBAC-GATED · SCAN-VERIFY" />
    </>
  );
}

// ─── 4. WhatsApp Agentic Gateway ──────────────────────────────────────────────
// Meta Cloud → FastAPI → Redis → 3-tier agent: Intent | Constructor | Formatter
// Air gap: LLM never touches raw API or credentials

function DiagramWhatsApp() {
  return (
    <>
      {/* Meta Cloud API */}
      <Node x={50} y={12} label="Meta Cloud API" w={62} />
      <Arrow x1={50} y1={22} x2={50} y2={34} />

      {/* FastAPI + Redis queue */}
      <Node x={50} y={42} label="FastAPI + Redis" w={60} accent />
      <Dot x={50} y={42} pulse />
      <Arrow x1={50} y1={52} x2={50} y2={63} />

      {/* 3-Tier Agent block */}
      <rect
        x={6}
        y={63}
        width={88}
        height={52}
        rx={2}
        fill="rgba(147,197,253,0.05)"
        stroke="rgba(147,197,253,0.2)"
        strokeWidth={0.75}
      />
      <text
        x={50}
        y={71}
        textAnchor="middle"
        fontSize={4.5}
        fill="rgba(147,197,253,0.5)"
        fontFamily="monospace"
      >
        3-TIER AGENTIC PIPELINE
      </text>

      {/* Tier 1 */}
      <Node x={50} y={80} label="Intent Parser" w={54} />
      <Arrow x1={50} y1={90} x2={50} y2={99} color="rgba(255,255,255,0.12)" />
      {/* Tier 2 */}
      <Node x={50} y={107} label="Query Constructor" w={62} />
      <Dot x={50} y={107} />

      {/* Air gap label */}
      <rect
        x={100}
        y={100}
        width={48}
        height={14}
        rx={2}
        fill="rgba(248,113,113,0.08)"
        stroke="rgba(248,113,113,0.3)"
        strokeWidth={0.6}
        strokeDasharray="3 2"
      />
      <text
        x={124}
        y={105}
        textAnchor="middle"
        fontSize={4}
        fill="rgba(248,113,113,0.8)"
        fontFamily="monospace"
      >
        AIR-GAP
      </text>
      <text
        x={124}
        y={111}
        textAnchor="middle"
        fontSize={3.8}
        fill="rgba(248,113,113,0.5)"
        fontFamily="monospace"
      >
        LLM ≠ API
      </text>
      <Edge x1={94} y1={107} x2={100} y2={107} dashed color="rgba(248,113,113,0.3)" />

          {/* Secure server call */}
      <Arrow x1={50} y1={117} x2={50} y2={127} />
      <Node x={50} y={125} label="Secure API Call" w={60} />
      <Arrow x1={50} y1={135} x2={50} y2={145} />
      {/* Tier 3 */}
      <Node x={50} y={148} label="Answer Formatter" w={62} accent />
      <Dot x={50} y={148} pulse />
    </>
  );
}

// ─── 5. Event Broker & Compliance Guardian ────────────────────────────────────
// Webhook → BullMQ/Redis → Compliance audit → fan-out (Messaging/Email) + DLQ

function DiagramBroker() {
  return (
    <>
      {/* Webhook source */}
      <Node x={50} y={12} label="Webhook Ingress" w={58} />
      <Arrow x1={50} y1={22} x2={50} y2={34} />

      {/* Ingest / idempotency */}
      <Node x={50} y={42} label="Ingest + SHA-256" w={66} />
      <Label x={77} y={45} text="idempotency" />

      <Arrow x1={50} y1={52} x2={50} y2={62} />

      {/* BullMQ / Redis */}
      <Node x={50} y={70} label="BullMQ / Redis" w={62} accent />
      <Dot x={50} y={70} pulse />

      <Arrow x1={50} y1={80} x2={50} y2={92} />

      {/* Compliance audit block */}
      <rect
        x={10}
        y={92}
        width={80}
        height={20}
        rx={2}
        fill="rgba(251,191,36,0.07)"
        stroke="rgba(251,191,36,0.3)"
        strokeWidth={0.75}
      />
      <text
        x={50}
        y={101}
        textAnchor="middle"
        fontSize={5}
        fill="rgba(251,191,36,0.9)"
        fontFamily="monospace"
      >
        Compliance Audit
      </text>
      <text
        x={50}
        y={108}
        textAnchor="middle"
        fontSize={4}
        fill="rgba(251,191,36,0.45)"
        fontFamily="monospace"
      >
        folder permission check
      </text>
      <Dot x={50} y={101} pulse color="rgba(251,191,36,0.7)" />

      {/* Fan out: compliant → channels, non-compliant → admin alert */}
      <Arrow x1={50} y1={112} x2={28} y2={126} />
      <Arrow x1={50} y1={112} x2={72} y2={126} />

      <Node x={28} y={133} label="Messaging" w={48} accent />
      <Node x={72} y={133} label="Email Alert" w={48} />

      {/* DLQ branch */}
      <Edge x1={90} y1={100} x2={130} y2={114} dashed color="rgba(248,113,113,0.25)" />
      <rect
        x={108}
        y={114}
        width={44}
        height={14}
        rx={2}
        fill="rgba(255,255,255,0.02)"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth={0.75}
        strokeDasharray="3 2"
      />
      <text
        x={130}
        y={119}
        textAnchor="middle"
        fontSize={4.5}
        fill="rgba(255,255,255,0.3)"
        fontFamily="monospace"
      >
        Dead Letter
      </text>
      <text
        x={130}
        y={125}
        textAnchor="middle"
        fontSize={4}
        fill="rgba(255,255,255,0.2)"
        fontFamily="monospace"
      >
        auto-backoff
      </text>

      <Label x={6} y={148} text="< 800ms · ZERO-LOSS · DECOUPLED" />
    </>
  );
}

// ─── Diagram map ──────────────────────────────────────────────────────────────

const DIAGRAMS: Record<DiagramVariant, () => ReactElement> = {
  "4d-sim": Diagram4DSim,
  powerbi: DiagramPowerBI,
  fsm: DiagramFSM,
  whatsapp: DiagramWhatsApp,
  broker: DiagramBroker,
};

// ─── Export ───────────────────────────────────────────────────────────────────

export function SystemMicroDiagram({ variant, className, ...props }: SystemMicroDiagramProps) {
  const DiagramContent = DIAGRAMS[variant];

  return (
    <svg
      viewBox="0 0 160 155"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {/* Background grid */}
      <defs>
        <pattern id={`grid-${variant}`} width={16} height={16} patternUnits="userSpaceOnUse">
          <path
            d="M 16 0 L 0 0 0 16"
            fill="none"
            stroke="rgba(255,255,255,0.03)"
            strokeWidth={0.5}
          />
        </pattern>
      </defs>
      <rect width={160} height={155} fill={`url(#grid-${variant})`} />

      <DiagramContent />
    </svg>
  );
}
