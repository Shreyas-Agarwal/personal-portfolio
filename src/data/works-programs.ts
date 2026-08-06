import { flagshipSystem } from "@/data/homepage-v2/systems";

export interface ResearchProgram {
  id: string;
  name: string;
  abstract: string;
  status: string;
  duration?: string;
  domains: string[];
  labs?: { name: string; context: string }[];
  /** Other programs/engagements this one connects to — surfaced as small cross-reference tags */
  relatedTo?: string[];
  href?: string;
}

export interface EngineeringEngagement {
  id: string;
  name: string;
  abstract: string;
  domain: string;
  status?: string;
  relatedTo?: string[];
}

export interface ConsultingEngagement {
  id: string;
  name: string;
  abstract: string;
  domain: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Research Programs — long-running investigations. Transit Intelligence's
// copy is sourced from its SystemDossier entry so the two never drift apart.
// ─────────────────────────────────────────────────────────────────────────────

export const researchPrograms: ResearchProgram[] = [
  {
    id: "transit-intelligence",
    name: "Transit Intelligence",
    abstract: flagshipSystem?.abstract ?? "",
    status: flagshipSystem?.status ?? "Research & Development",
    duration: flagshipSystem?.started ? `Since ${flagshipSystem.started}` : undefined,
    domains: flagshipSystem?.domains ?? [],
    labs: flagshipSystem?.labs,
    relatedTo: ["Stratum"],
    href: "/under-review",
  },
  {
    id: "stratum",
    name: "Stratum",
    abstract:
      "An edge analytics engine — local-first, running entirely on browser storage and WebAssembly to reproduce the base of what a tool like PowerBI does: analytics, mapping, a full data engine, with no server round-trip in the loop. A text-to-SQL layer and a WebMCP connection are planned above it, but those are additions to the engine, not the engine itself. Its rendering principles carry the visualization layer for Transit Intelligence, and a more constrained variant — scoped to company work only — powers the frontend of Quant and Track.",
    status: "Active",
    domains: ["Edge Computing", "Local-First Systems", "Analytics Engines"],
    relatedTo: ["Transit Intelligence", "Quant", "Track", "Pulse"],
    href: "/under-review",
  },
  {
    id: "network-extinction-dynamics",
    name: "Network Extinction Dynamics",
    abstract:
      "Master's research at ETH Zürich — a real-world simulation of plant–insect networks across multiple scales, timelines, and levels of modularity, built on trait-matching and decay algorithms. The work measures how network structure changes under cascading extinction: which factors drive individual species loss, and where the tipping points sit — the thresholds past which a network can no longer recover.",
    status: "Completed — ETH Zürich",
    domains: ["Computational Ecology", "Network Science", "Simulation"],
    href: "/under-review",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Professional Engineering — internal products built for company use.
// Anonymized by design: no client names, no internal architecture, described
// by function only.
// ─────────────────────────────────────────────────────────────────────────────

export const engineeringEngagements: EngineeringEngagement[] = [
  {
    id: "quant",
    name: "Quant",
    abstract:
      "A backtesting framework that replays trading strategies as event streams, so a strategy's performance is judged by how it responds to sequence and timing — not just by its final number.",
    domain: "Quantitative Systems",
    status: "Active research",
    relatedTo: ["Stratum"],
  },
  {
    id: "pulse",
    name: "Pulse",
    abstract:
      "An analytics layer sitting on top of operational systems — CRM, ERP, and project management software (current integrations: Tally, Autodesk Construction Cloud). Data flows through a medallion architecture into a warehouse, landing in gold-layer tables scoped per business. The pipeline is owned and run server-side; dashboards render directly from the gold tables on the frontend, using the same rendering principles as Stratum.",
    domain: "Analytics Infrastructure",
    status: "Active",
    relatedTo: ["Stratum"],
  },
  {
    id: "nudge",
    name: "Nudge",
    abstract:
      "An event system that turns platform webhooks and scheduled batch syncs into role-gated alerts, decoupled from the request path that triggers them and tolerant of both real-time and delayed delivery windows.",
    domain: "Reliability Engineering",
    status: "In production",
  },
  {
    id: "track",
    name: "Track",
    abstract:
      "A monitoring layer that turns raw field and activity data into forecasted progress, so gaps surface before a deadline does.",
    domain: "Operational Analytics",
    relatedTo: ["Stratum"],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Professional Consulting — client delivery engagements. Company names and
// implementation specifics are withheld; described by scope and outcome.
// ─────────────────────────────────────────────────────────────────────────────

export const consultingEngagements: ConsultingEngagement[] = [
  {
    id: "cloud-construction-rollout",
    name: "Enterprise Construction Cloud Rollout",
    abstract:
      "Co-led a full-scale rollout of a cloud construction management platform for an enterprise construction client, building 50+ reporting dashboards alongside the technical transition over a five-month engagement.",
    domain: "Enterprise Transformation",
  },
  {
    id: "productivity-monitoring-suite",
    name: "Enterprise Productivity Monitoring Suite",
    abstract:
      "A multi-tiered dashboard suite spanning project, labor, and activity productivity for an enterprise client, with forecasting built in to surface risk before it becomes delay.",
    domain: "Business Intelligence",
  },
];
