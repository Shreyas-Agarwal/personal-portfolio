export interface CaseStudy {
  slug: string;
  title: string;
  kind: "system" | "research";
  summary: string;
  tags: string[];
  readingTime: string;
  topology: string;
  metrics: { label: string; value: string }[];
  stack?: string[];
  sections: { heading: string; body: string[] }[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "aec-saas-platform",
    title: "AEC SaaS Platform — 0→1",
    kind: "system",
    summary:
      "A multi-module platform built from scratch to coordinate construction workflows across enterprise projects.",
    tags: ["Systems", "AEC", "Product"],
    readingTime: "8 min",
    topology:
      "Client → API Gateway → Service Mesh (Auth · Projects · Forms · Files) → MongoDB / Object Store → Event Bus → Worker Pool",
    metrics: [
      { label: "active projects", value: "10+" },
      { label: "daily workflows", value: "100+" },
      { label: "modules shipped", value: "6" },
      { label: "time to first user", value: "11 weeks" },
    ],
    stack: ["TypeScript", "Node", "MongoDB", "Redis", "APS", "React"],
    sections: [
      {
        heading: "Problem",
        body: [
          "Construction teams were operating across email, spreadsheets, and a fragmented vendor stack. There was no single surface where project state actually lived — which meant decisions were made on stale information, and accountability was diffuse.",
        ],
      },
      {
        heading: "Context & Constraints",
        body: [
          "Enterprise procurement cycles meant the platform had to be production-credible from day one: SSO, audit trails, tenant isolation, exportable data.",
          "We could not assume connectivity on site. Forms had to capture offline and reconcile later without losing edits.",
        ],
      },
      {
        heading: "System Design",
        body: [
          "I split the platform into independently deployable modules behind a shared identity and project graph. Each module owned its data and emitted events; cross-module workflows were composed at the event layer rather than via direct calls.",
          "This kept blast radius small: a regression in Forms could not take down File Management, and we could ship modules on independent cadences.",
        ],
      },
      {
        heading: "Key Decisions",
        body: [
          "Event-sourced workflow state instead of mutable status columns — every transition was inspectable.",
          "Treated the integration layer (APS, identity providers, mail) as a first-class module, not glue code.",
        ],
      },
      {
        heading: "Tradeoffs",
        body: [
          "Event sourcing added operational complexity early. In return we got debuggability that paid back the cost within the first three production incidents.",
          "Module isolation meant some duplicated read models. Acceptable price for independent deploys.",
        ],
      },
      {
        heading: "Failures / Limitations",
        body: [
          "The first version of the offline reconciliation strategy was too optimistic about clock drift on site devices. We rebuilt it around server-assigned causal IDs after the second pilot.",
        ],
      },
      {
        heading: "Outcomes",
        body: [
          "Platform reached 10+ active enterprise projects with 100+ daily workflows. Onboarding for new projects dropped from weeks to under two days once the project graph stabilised.",
        ],
      },
    ],
  },
  {
    slug: "decision-engine",
    title: "Decision Engine — state-driven automation",
    kind: "system",
    summary:
      "A state machine driving task lifecycles, escalations, and notifications across high-volume workflows.",
    tags: ["Systems", "Data"],
    readingTime: "7 min",
    topology:
      "Ingest API → Validator → State Store → Rule Evaluator → Action Dispatcher (Notify · Escalate · Persist)",
    metrics: [
      { label: "records / day", value: "~200K" },
      { label: "p95 evaluation", value: "<200ms" },
      { label: "rule sets", value: "40+" },
      { label: "downtime since launch", value: "0" },
    ],
    stack: ["TypeScript", "Node", "Redis", "MongoDB", "BullMQ"],
    sections: [
      {
        heading: "Problem",
        body: [
          "Operational tasks were being tracked through ad-hoc cron jobs and trigger-based callbacks. The system could not answer the question: 'why is this task in this state right now?'",
        ],
      },
      {
        heading: "Context & Constraints",
        body: [
          "Throughput target: ~200K records per day with sub-second decision latency.",
          "Rules had to be editable by non-engineers without redeploying the service.",
        ],
      },
      {
        heading: "System Design",
        body: [
          "Modeled every task as a finite state machine with explicit allowed transitions. Rules were data, not code — declarative predicates evaluated against the current state and a small set of computed facts.",
          "All transitions were logged with a causal pointer to the rule and inputs that produced them.",
        ],
      },
      {
        heading: "Key Decisions",
        body: [
          "Chose state-driven over trigger-driven: triggers describe what just happened, states describe what is true now. The latter is what operators actually need.",
          "Idempotent evaluators — replaying the same inputs always produces the same transition.",
        ],
      },
      {
        heading: "Tradeoffs",
        body: [
          "Authoring rules in data is harder to express for power users than raw code. We accepted this in exchange for safe runtime edits.",
        ],
      },
      {
        heading: "Failures / Limitations",
        body: [
          "Early version conflated 'rule fired' with 'action succeeded'. We separated evaluation and dispatch into two stages with their own retry semantics.",
        ],
      },
      {
        heading: "Outcomes",
        body: [
          "Sustained ~200K records/day at <200ms p95 evaluation latency with zero unplanned downtime since launch.",
        ],
      },
    ],
  },
  {
    slug: "autodesk-automation-pipeline",
    title: "Autodesk Automation Pipeline",
    kind: "system",
    summary:
      "An automation layer over Autodesk Platform Services for file lifecycle, form workflows, and audit trails.",
    tags: ["Systems", "AEC", "Integration"],
    readingTime: "6 min",
    topology:
      "APS Webhooks → Queue → Worker Pool → MongoDB (state) → APS Data Management API → Audit Log",
    metrics: [
      { label: "files managed", value: "10K+" },
      { label: "automated submissions", value: "10K+" },
      { label: "manual hours saved / mo", value: "~400" },
      { label: "API failure recovery", value: "automatic" },
    ],
    stack: ["Node", "APS / Forge", "MongoDB", "BullMQ"],
    sections: [
      {
        heading: "Problem",
        body: [
          "Teams were copy-pasting files across folder structures and re-entering form data into multiple systems. Audit trails were reconstructed manually after the fact.",
        ],
      },
      {
        heading: "Context & Constraints",
        body: [
          "APS APIs have strict rate limits and unstable webhook semantics; the pipeline had to assume failure as the default case.",
        ],
      },
      {
        heading: "System Design",
        body: [
          "Every external action was wrapped in an idempotent job with a stable key derived from the source event. Retries were free.",
          "State of every file and submission was mirrored locally so the system could answer questions without round-tripping APS.",
        ],
      },
      {
        heading: "Key Decisions",
        body: [
          "Treat APS as an unreliable upstream. Local mirror of state is the source of truth for orchestration; APS is the source of truth for documents.",
        ],
      },
      {
        heading: "Tradeoffs",
        body: [
          "Mirrored state can drift. We added a reconciliation worker that walks the tree on a schedule and reports divergence rather than silently fixing it.",
        ],
      },
      {
        heading: "Failures / Limitations",
        body: [
          "Initial design used webhook order as causal order. APS does not guarantee this. Switched to event timestamps + per-resource sequence numbers.",
        ],
      },
      {
        heading: "Outcomes",
        body: [
          "Automated 10K+ file movements and 10K+ form submissions, with full audit trails generated as a side effect of the pipeline rather than as a separate process.",
        ],
      },
    ],
  },
  {
    slug: "agile-vs-waterfall-bim",
    title: "Agile vs Waterfall in BIM Implementation",
    kind: "research",
    summary:
      "A research-style analysis of why neither pure Agile nor pure Waterfall fits BIM delivery in the AEC industry, and what a hybrid actually looks like in practice.",
    tags: ["Research", "AEC", "Process"],
    readingTime: "14 min",
    topology:
      "Pre-construction (Waterfall planning) → Design coordination (Agile loops) → Construction handover (Waterfall gates) → Operations feedback (continuous)",
    metrics: [
      { label: "case projects observed", value: "6" },
      { label: "delivery models compared", value: "3" },
      { label: "interview hours", value: "24" },
    ],
    sections: [
      {
        heading: "Abstract",
        body: [
          "BIM implementation in AEC organisations is routinely framed as a methodology choice between Agile and Waterfall. This framing is misleading. BIM delivery spans contractual, design, and construction phases that have fundamentally different feedback geometries. This piece argues that the unit of analysis should be the phase, not the project, and proposes a hybrid model where each phase adopts the cadence its feedback loop can actually support.",
        ],
      },
      {
        heading: "Problem Statement",
        body: [
          "Teams adopting BIM frequently inherit either a Waterfall stage-gate model (from traditional project management) or an Agile sprint cadence (from software-influenced consultancies). Both fail in characteristic ways: Waterfall under-reacts to design discovery, Agile over-promises certainty in contractually fixed phases.",
        ],
      },
      {
        heading: "Industry Context (AEC / BIM)",
        body: [
          "BIM is not a software product; it is a coordination protocol layered over physical delivery. Contracts are signed against deliverables that must be specified before they are designed in detail, while the design itself depends on iterative clash resolution that is inherently empirical.",
        ],
      },
      {
        heading: "Methodology / Observations",
        body: [
          "Observations were drawn from six projects across commercial and infrastructure delivery, supplemented by structured interviews with project leads, BIM coordinators, and discipline engineers.",
          "Each project was mapped against its dominant delivery cadence per phase, and incident logs were used to identify where the cadence failed to absorb new information.",
        ],
      },
      {
        heading: "Comparative Analysis (Agile vs Waterfall)",
        body: [
          "Waterfall offered legibility to clients and contracts but punished late-arriving design information by absorbing it as scope change rather than learning.",
          "Agile produced faster local convergence in design coordination but eroded contractual clarity and exhausted teams when applied across phases that did not need weekly cadence.",
        ],
      },
      {
        heading: "Key Insights",
        body: [
          "The decisive variable is not methodology but the feedback latency of the phase. Phases with short, cheap feedback (clash detection, model federation) reward Agile loops. Phases with long, expensive feedback (procurement, fabrication) reward Waterfall gates.",
          "Tooling choices encode this. A team that runs every phase through the same kanban board has implicitly chosen one cadence for all feedback geometries.",
        ],
      },
      {
        heading: "Implications for Industry",
        body: [
          "Delivery frameworks should be specified per phase, not per project, with explicit handover artifacts between cadences. BIM execution plans are the natural place to encode this.",
          "Procurement language needs to acknowledge iterative design phases without converting every iteration into a variation order.",
        ],
      },
      {
        heading: "Conclusion",
        body: [
          "The Agile-vs-Waterfall debate in BIM is a category error. The useful question is which phases can support short feedback loops and which cannot, and how to design clean interfaces between them. Hybrid is not a compromise — it is the model that matches the structure of the work.",
        ],
      },
    ],
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
