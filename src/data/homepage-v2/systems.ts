export interface SystemDossier {
  id: string;
  name: string;
  /** One-sentence abstract shown in compact index rows — flagship uses `abstract` instead */
  oneLiner?: string;
  /** Fuller narrative paragraph — only rendered for the flagship system */
  abstract?: string;
  /** What's actually going wrong in the world before the system enters the picture — flagship only */
  problem?: string;
  /** Sub-projects listed under "Contains:" — flagship only, kept factual and complete */
  contains?: string[];
  /** The research labs, each given a line of context — flagship only */
  labs?: { name: string; context: string }[];
  /** Tufte-style flow diagram steps — flagship only */
  diagram?: string[];
  stack: string[];
  status: string;
  /** Structured metadata block — consistent across every system's own page */
  domains: string[];
  artifacts: string[];
  started: string;
  lastUpdated: string;
  href: string;
  usesPatterns: string[];
  flagship?: boolean;
  /** Surfaced on the homepage as one of the 2-3 curated entries under the featured system */
  curated?: boolean;
}

export const systems: SystemDossier[] = [
  {
    id: "transit-intelligence",
    name: "Transit Intelligence",
    flagship: true,
    problem:
      "Public transport isn't late because vehicles drift. It's late because schedules become disconnected from reality faster than operators notice. Transit Intelligence exists to measure that gap.",
    abstract:
      "It ingests live vehicle telemetry alongside the static schedule and asks a simple question continuously: does the vehicle currently agree with the plan? When it doesn't, the drift surfaces on a dispatcher's screen before a rider is left standing at a stop that already happened.",
    contains: [
      "Operational Platform",
      "Go Event Lab",
      "Lakehouse Engineering Lab",
      "Architecture",
      "Research",
      "Live demonstrations",
    ],
    labs: [
      {
        name: "Operational Platform",
        context: "Where dispatchers watch the gap between plan and reality widen in real time, and decide what to do about it.",
      },
      {
        name: "Go Event Lab",
        context:
          "Understanding event systems before building production systems — high-throughput ingestion proven against synthetic load first.",
      },
      {
        name: "Lakehouse Engineering Lab",
        context:
          "Makes months of positional history queryable in seconds, so a drift pattern is traceable, not just visible today.",
      },
    ],
    diagram: ["Planned Schedule", "Observed Reality", "Operational Drift", "Decision Support"],
    stack: ["Go", "Kafka", "Parquet", "DuckDB", "PostGIS", "TypeScript"],
    status: "Research & Development",
    domains: ["Distributed Systems", "Data Engineering", "Optimization"],
    artifacts: ["Architecture", "Research", "Patterns", "Case Studies"],
    started: "2026",
    lastUpdated: "13 July 2026",
    href: "/systems/transit-intelligence",
    usesPatterns: [
      "event-sourcing",
      "transactional-checkpointing",
      "bulkheads",
      "graph-traversal",
    ],
  },
  {
    id: "quant",
    name: "Quant",
    oneLiner:
      "Most strategies look good on one historical run and fall apart on the next. Quant replays every strategy as an event stream so luck and robustness stop looking the same.",
    stack: ["Python", "Polars", "DuckDB"],
    status: "Active research",
    domains: ["Quantitative Finance", "Data Engineering"],
    artifacts: ["Research", "Case Studies"],
    started: "2026",
    lastUpdated: "13 July 2026",
    href: "/under-review",
    usesPatterns: ["event-sourcing", "atomic-publication"],
    curated: true,
  },
  {
    id: "aps-viewer-sdk-wrapper",
    name: "APS Viewer SDK Wrapper",
    oneLiner:
      "The APS Viewer SDK is powerful and unpredictable in roughly equal measure. This wrapper trades away some of that flexibility for a lifecycle you can actually reason about.",
    stack: ["TypeScript", "APS Viewer SDK", "WebGL"],
    status: "In production",
    domains: ["Frontend Architecture", "3D Rendering"],
    artifacts: ["Architecture", "Case Studies"],
    started: "2025",
    lastUpdated: "13 July 2026",
    href: "/projects/planned-vs-actual-4d",
    usesPatterns: ["bulkheads", "idempotency-keys"],
    curated: true,
  },
  {
    id: "etis-pulse",
    name: "etiS Pulse",
    oneLiner:
      "A compliance flag that arrives after the fact is just a postmortem. etiS Pulse turns webhook events into role-gated field alerts before the request path even notices it happened.",
    stack: ["Node.js", "BullMQ", "Redis"],
    status: "In production",
    domains: ["Systems Architecture", "Reliability Engineering"],
    artifacts: ["Architecture", "Case Studies"],
    started: "2025",
    lastUpdated: "13 July 2026",
    href: "/projects/notification-broker",
    usesPatterns: ["circuit-breaker", "retry-classification", "idempotency-keys"],
    curated: true,
  },
  {
    id: "aps-crawler",
    name: "APS Crawler & Report Service",
    oneLiner:
      "A scheduled crawler that walks Autodesk Construction Cloud project hierarchies and materializes them into flat, report-ready tables.",
    stack: ["Node.js", "TypeScript", "Cron"],
    status: "In development",
    domains: ["Data Engineering", "Automation"],
    artifacts: ["Architecture"],
    started: "2026",
    lastUpdated: "13 July 2026",
    href: "/under-review",
    usesPatterns: ["retry-classification", "graph-traversal"],
  },
  {
    id: "analytics-semantic-layer",
    name: "Analytics Semantic Execution Model",
    oneLiner:
      "A distributed data-interaction architecture exploring whether analytical semantics should execute centrally on the backend or locally within the client runtime.",
    stack: ["IndexedDB", "DSL Engine", "TypeScript"],
    status: "In production",
    domains: ["Distributed Systems", "Frontend Architecture"],
    artifacts: ["Architecture", "Research"],
    started: "2025",
    lastUpdated: "13 July 2026",
    href: "/systems/analytics-semantic-layer-architecture",
    usesPatterns: ["atomic-publication", "graph-traversal"],
  },
  {
    id: "frontend-backend-boundary",
    name: "Frontend–Backend Responsibility Boundaries",
    oneLiner:
      "Architectural separation between interaction systems, orchestration layers, and operational processing infrastructure.",
    stack: ["React", "Node.js", "Event-Driven Architecture"],
    status: "Under review",
    domains: ["Frontend Architecture", "Systems Architecture"],
    artifacts: ["Architecture"],
    started: "2026",
    lastUpdated: "13 July 2026",
    href: "/under-review",
    usesPatterns: ["bulkheads", "event-sourcing"],
  },
  {
    id: "dynamic-feature-injection",
    name: "Dynamic Feature Injection & Modular Expansion",
    oneLiner:
      "Extensible operational systems capable of evolving without destabilizing foundational workflow infrastructure.",
    stack: ["Module Federation", "Plugin Architecture", "TypeScript"],
    status: "Concept",
    domains: ["Platform Engineering"],
    artifacts: ["Architecture"],
    started: "2026",
    lastUpdated: "13 July 2026",
    href: "/under-review",
    usesPatterns: ["bulkheads"],
  },
];

export const flagshipSystem = systems.find((s) => s.flagship);
export const otherSystems = systems.filter((s) => !s.flagship);
export const curatedSystems = systems.filter((s) => s.curated);

/** Inverts system -> patterns edges into pattern -> systems, computed once at build time. */
export function getPatternUsage(): Map<string, SystemDossier[]> {
  const usage = new Map<string, SystemDossier[]>();
  for (const system of systems) {
    for (const patternId of system.usesPatterns) {
      const list = usage.get(patternId) ?? [];
      list.push(system);
      usage.set(patternId, list);
    }
  }
  return usage;
}
