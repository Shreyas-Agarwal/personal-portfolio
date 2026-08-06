export interface ConceptData {
  slug: string;
  num: string;
  title: string;
  oneLiner: string;
  runningHeader: string;
  category: string;
  status: string;
  revDate: string;
  intro: string;
  whyItMatters: string;
  corePrinciples: string[];
  relatedConcepts: { slug: string; title: string }[];
  referencedIn: string[];
  furtherReading: { title: string; note: string }[];
  revisionHistory: { date: string; note: string }[];
}

export const CONCEPTS: ConceptData[] = [
  {
    slug: "reality",
    num: "01",
    title: "Reality",
    oneLiner:
      "The physical or external truth of an environment prior to observation or measurement.",
    runningHeader: "THE PHYSICS OF REALITY",
    category: "FOUNDATIONAL CONCEPT",
    status: "MONOGRAPH STUB",
    revDate: "2026.08",
    intro:
      "Reality is the unconstrained physical or operational domain where events occur continuously and independently of computational systems. Before any sensor measures or code executes, reality possesses infinite resolution and zero latency—it simply is.",
    whyItMatters:
      "Engineers frequently confuse digital records with physical ground truth. Understanding reality as an independent domain enforces clear boundaries between physical events and the imperfect digital models created to represent them.",
    corePrinciples: [
      "Physical ground truth exists independently of digital records and telemetry.",
      "Every measurement of reality introduces quantization loss and temporal decay.",
      "Distributed systems negotiate opinions about reality; they do not dictate it.",
      "Failures emerge when software assumes its state model is identical to physical reality.",
    ],
    relatedConcepts: [
      { slug: "signals", title: "Signals" },
      { slug: "observations", title: "Observations" },
      { slug: "context", title: "Context" },
    ],
    referencedIn: [
      "Desktop Synchronization Architecture",
      "Transit Intelligence",
      "Architecture of Information Systems",
    ],
    furtherReading: [
      {
        title: "Shannon Information & Physical Systems",
        note: "Exploration of physical boundaries in measurement theory.",
      },
      {
        title: "The Epistemology of Telemetry",
        note: "On ground truth vs telemetry representations.",
      },
    ],
    revisionHistory: [
      { date: "2026.08", note: "Initial monograph structure stubbed." },
      { date: "2026.06", note: "Conceptual topology defined in Figure 01." },
    ],
  },
  {
    slug: "signals",
    num: "02",
    title: "Signals",
    oneLiner:
      "Raw, uninterpreted emissions captured as discrete events from physical or system interactions.",
    runningHeader: "THE PHYSICS OF SIGNALS",
    category: "FOUNDATIONAL CONCEPT",
    status: "MONOGRAPH STUB",
    revDate: "2026.08",
    intro:
      "Signals are the primary mechanism through which reality interacts with digital boundaries. They arrive as raw, unstructured emissions—pulses, packets, change events, or voltage fluctuations—devoid of semantic context.",
    whyItMatters:
      "Treating raw signals directly as structured business facts causes brittle system design. Signals must pass through normalization and verification before becoming actionable observations.",
    corePrinciples: [
      "Signals are continuous emissions digitized at arbitrary sampling frequencies.",
      "A signal contains noise; attribution and filtering must happen at ingestion boundaries.",
      "Loss of signal sequence degrades downstream model fidelity.",
      "Signals convey that an event occurred, but not what the event means.",
    ],
    relatedConcepts: [
      { slug: "reality", title: "Reality" },
      { slug: "observations", title: "Observations" },
      { slug: "memory", title: "Memory" },
    ],
    referencedIn: [
      "Telemetry Pipeline Architecture",
      "Operational Observer Patterns",
      "Transit Intelligence",
    ],
    furtherReading: [
      {
        title: "Discrete Signal Processing in Data Pipelines",
        note: "Handling high-frequency event ingestion.",
      },
      {
        title: "Noise Reduction & Attenuation",
        note: "Filtering false positive triggers in telemetry streams.",
      },
    ],
    revisionHistory: [{ date: "2026.08", note: "Initial monograph structure stubbed." }],
  },
  {
    slug: "observations",
    num: "03",
    title: "Observations",
    oneLiner:
      "Structured telemetry formed when raw signals are ingested across computational boundaries.",
    runningHeader: "THE PHYSICS OF OBSERVATIONS",
    category: "FOUNDATIONAL CONCEPT",
    status: "MONOGRAPH STUB",
    revDate: "2026.08",
    intro:
      "Observations occur when raw signals are bound to timestamps, schema contracts, and spatial origins. An observation is the first point at which data acquires structural meaning.",
    whyItMatters:
      "Without rigorous observation contracts, upstream system changes quietly break downstream analytics, automated workflows, and decision engines.",
    corePrinciples: [
      "Observations bind raw signals to explicit timestamps and schemas.",
      "An observation is immutable once written to the ingestion journal.",
      "Multiple observations may contradict one another until resolved by state consensus.",
      "Observation throughput determines system reaction time.",
    ],
    relatedConcepts: [
      { slug: "signals", title: "Signals" },
      { slug: "state", title: "State" },
      { slug: "history", title: "History" },
    ],
    referencedIn: [
      "Operational Observer Patterns",
      "Lakehouse Engineering Lab",
      "Architecture of Information Systems",
    ],
    furtherReading: [
      {
        title: "Temporal Schema Resolution",
        note: "Managing schema evolution across observation streams.",
      },
    ],
    revisionHistory: [{ date: "2026.08", note: "Initial monograph structure stubbed." }],
  },
  {
    slug: "state",
    num: "04",
    title: "State",
    oneLiner:
      "The accumulated record of historical transactions and verified facts about a system.",
    runningHeader: "THE PHYSICS OF STATE",
    category: "FOUNDATIONAL CONCEPT",
    status: "MONOGRAPH STUB",
    revDate: "2026.08",
    intro:
      "State represents what a system currently believes to be true. It is formed by folding historical observations through domain rules, establishing a single point of consensus for downstream computation.",
    whyItMatters:
      "State management is the single hardest problem in software engineering. As systems scale across network boundaries, agreeing on state requires balancing consistency, latency, and fault tolerance.",
    corePrinciples: [
      "State is a projection of past observations filtered through consensus rules.",
      "Local state updates are trivial; global state agreement across networks is costly.",
      "Explicit state transitions prevent invalid intermediate conditions.",
      "State corruption cascades downstream faster than hardware failure.",
    ],
    relatedConcepts: [
      { slug: "observations", title: "Observations" },
      { slug: "memory", title: "Memory" },
      { slug: "history", title: "History" },
      { slug: "coordination", title: "Coordination" },
    ],
    referencedIn: [
      "Desktop Synchronization Architecture",
      "Transit Intelligence",
      "Lakehouse Engineering Lab",
      "Architecture of Information Systems",
    ],
    furtherReading: [
      {
        title: "Consensus Protocols & State Replication",
        note: "Raft, Paxos, and CRDT synchronization.",
      },
      {
        title: "State as a Function of Time",
        note: "Event sourcing and event-driven architecture.",
      },
    ],
    revisionHistory: [
      { date: "2026.08", note: "Initial monograph structure stubbed." },
      { date: "2026.05", note: "State synchronization thesis published." },
    ],
  },
  {
    slug: "context",
    num: "05",
    title: "Context",
    oneLiner:
      "Operational metadata and structural conditions required to interpret state transitions correctly.",
    runningHeader: "THE PHYSICS OF CONTEXT",
    category: "FOUNDATIONAL CONCEPT",
    status: "MONOGRAPH STUB",
    revDate: "2026.08",
    intro:
      "Context is the environment in which state and observations exist. A data point without context is ambiguous; context provides the frame of reference required for deterministic interpretation.",
    whyItMatters:
      "Context rot is a primary cause of silent software decay. When AI agents, microservices, or human operators process state without full context, valid operations produce invalid outcomes.",
    corePrinciples: [
      "Context defines the semantic frame of reference for data points.",
      "Context must travel alongside data payload across service boundaries.",
      "Loss of context turns actionable telemetry into meaningless numbers.",
      "Hierarchical context prevents duplicate metadata transmission.",
    ],
    relatedConcepts: [
      { slug: "state", title: "State" },
      { slug: "models", title: "Models" },
      { slug: "decisions", title: "Decisions" },
    ],
    referencedIn: [
      "Context Systems & Memory Boundaries",
      "Context Rot in LLM Agents",
      "Architecture of Information Systems",
    ],
    furtherReading: [
      {
        title: "Context Boundary Propagation",
        note: "Passing operational context across distributed RPCs.",
      },
    ],
    revisionHistory: [{ date: "2026.08", note: "Initial monograph structure stubbed." }],
  },
  {
    slug: "memory",
    num: "06",
    title: "Memory",
    oneLiner: "Ephemeral and transient storage pools optimized for low-latency operational access.",
    runningHeader: "THE PHYSICS OF MEMORY",
    category: "FOUNDATIONAL CONCEPT",
    status: "MONOGRAPH STUB",
    revDate: "2026.08",
    intro:
      "Memory is the working set of information currently active in computational hardware. It sacrifices permanence for speed, acting as the immediate scratchpad for active model execution.",
    whyItMatters:
      "Designing memory hierarchies correctly prevents cache invalidation nightmares, latency spikes, and out-of-memory cascades in high-throughput data engines.",
    corePrinciples: [
      "Memory trades durability for sub-millisecond retrieval speeds.",
      "Cache eviction policies are implicit statements about data priority.",
      "Volatile memory must always be reconstructible from durable history.",
      "Memory locality dictates hardware execution throughput.",
    ],
    relatedConcepts: [
      { slug: "state", title: "State" },
      { slug: "history", title: "History" },
      { slug: "signals", title: "Signals" },
    ],
    referencedIn: [
      "Desktop Synchronization Architecture",
      "Transit Intelligence",
      "Lakehouse Engineering Lab",
    ],
    furtherReading: [
      {
        title: "Hardware Memory Hierarchies & Cache Locality",
        note: "L1/L2/L3 optimizations for high-throughput streaming.",
      },
    ],
    revisionHistory: [{ date: "2026.08", note: "Initial monograph structure stubbed." }],
  },
  {
    slug: "history",
    num: "07",
    title: "History",
    oneLiner: "Immutable event ledgers preserving the exact temporal ordering of past states.",
    runningHeader: "THE PHYSICS OF HISTORY",
    category: "FOUNDATIONAL CONCEPT",
    status: "MONOGRAPH STUB",
    revDate: "2026.08",
    intro:
      "History is the immutable record of every state transition that has ever occurred. Unlike transient state, history can never be mutated—only appended to.",
    whyItMatters:
      "Systems that discard history lose the ability to audit past decisions, debug emergent bugs, replay state transitions, or build event-driven analytical models.",
    corePrinciples: [
      "History is append-only and strictly ordered by monotonic time.",
      "Current state can always be recomputed by replaying history.",
      "Tamper-evident ledgers guarantee historical integrity across parties.",
      "Compaction strategies manage history growth without losing lineage.",
    ],
    relatedConcepts: [
      { slug: "state", title: "State" },
      { slug: "observations", title: "Observations" },
      { slug: "memory", title: "Memory" },
    ],
    referencedIn: [
      "Architecture of Information Systems",
      "Lakehouse Engineering Lab",
      "Canonical Semantic Models",
    ],
    furtherReading: [
      {
        title: "Log-Structured Storage Engines",
        note: "LSM-trees and append-only WAL design.",
      },
    ],
    revisionHistory: [{ date: "2026.08", note: "Initial monograph structure stubbed." }],
  },
  {
    slug: "models",
    num: "08",
    title: "Models",
    oneLiner:
      "Formal representations of domain semantics used to project futures and test assumptions.",
    runningHeader: "THE PHYSICS OF MODELS",
    category: "FOUNDATIONAL CONCEPT",
    status: "MONOGRAPH STUB",
    revDate: "2026.08",
    intro:
      "Models are simplified abstractions of reality. They consume current state and context to simulate outcomes, evaluate rules, and generate projections.",
    whyItMatters:
      "All models are approximations. Robust system engineering ensures that model boundaries and drift are explicitly monitored so decisions remain grounded in reality.",
    corePrinciples: [
      "Models reduce complexity by discarding irrelevant domain dimensions.",
      "Model drift occurs when underlying reality changes faster than model assumptions.",
      "Explicit schema contracts prevent model distortion during evolution.",
      "Deterministic models yield identical results given identical state input.",
    ],
    relatedConcepts: [
      { slug: "context", title: "Context" },
      { slug: "coordination", title: "Coordination" },
      { slug: "decisions", title: "Decisions" },
    ],
    referencedIn: [
      "Canonical Semantic Models",
      "The BIM Data Paradox",
      "Architecture of Information Systems",
    ],
    furtherReading: [
      {
        title: "Domain Event Modeling",
        note: "Mapping complex operational rules into clean code models.",
      },
    ],
    revisionHistory: [{ date: "2026.08", note: "Initial monograph structure stubbed." }],
  },
  {
    slug: "coordination",
    num: "09",
    title: "Coordination",
    oneLiner: "Protocols and consensus mechanisms through which independent actors align on state.",
    runningHeader: "THE PHYSICS OF COORDINATION",
    category: "FOUNDATIONAL CONCEPT",
    status: "MONOGRAPH STUB",
    revDate: "2026.08",
    intro:
      "Coordination is the process by which distributed processes, services, or human teams agree on actions and state transitions across network partitions.",
    whyItMatters:
      "Coordination is where system overhead accumulates. Minimizing coordination frequency while maintaining safety is the core challenge of distributed systems design.",
    corePrinciples: [
      "Coordination latency scales exponentially with network distance.",
      "Asynchronous coordination increases throughput at the cost of immediate consistency.",
      "Partition tolerance requires explicit fallback behavior during network splits.",
      "Coordination boundaries should align with domain authorization boundaries.",
    ],
    relatedConcepts: [
      { slug: "state", title: "State" },
      { slug: "models", title: "Models" },
      { slug: "decisions", title: "Decisions" },
    ],
    referencedIn: [
      "Distributed Consensus Notes",
      "Desktop Synchronization Architecture",
      "Transit Intelligence",
    ],
    furtherReading: [
      {
        title: "Coordination Avoidance in Distributed Systems",
        note: "Design patterns for invariant-preserving asynchronous systems.",
      },
    ],
    revisionHistory: [{ date: "2026.08", note: "Initial monograph structure stubbed." }],
  },
  {
    slug: "decisions",
    num: "10",
    title: "Decisions",
    oneLiner:
      "Deterministically executed operations emitted back into reality to alter environmental state.",
    runningHeader: "THE PHYSICS OF DECISIONS",
    category: "FOUNDATIONAL CONCEPT",
    status: "MONOGRAPH STUB",
    revDate: "2026.08",
    intro:
      "Decisions close the information loop. They represent the final output of model evaluation, translating digital consensus into physical or operational actions that alter reality.",
    whyItMatters:
      "Data and analytics have no value until they influence a decision. Systems must ensure that decisions are traceable back through models, state, and raw observations.",
    corePrinciples: [
      "Decisions emit side effects back into reality, completing the information cycle.",
      "Automated decisions require explicit fallback thresholds when model confidence drops.",
      "Every decision must be auditable back to its originating observations and state snapshot.",
      "The value of a decision decreases as the delay between observation and action increases.",
    ],
    relatedConcepts: [
      { slug: "models", title: "Models" },
      { slug: "coordination", title: "Coordination" },
      { slug: "reality", title: "Reality" },
    ],
    referencedIn: [
      "Transit Intelligence",
      "Architecture of Information Systems",
      "Context Systems & Memory Boundaries",
    ],
    furtherReading: [
      {
        title: "Closed-Loop Decision Automation",
        note: "Architecting real-time decision engines under operational constraint.",
      },
    ],
    revisionHistory: [{ date: "2026.08", note: "Initial monograph structure stubbed." }],
  },
];

export const CONCEPTS_MAP = new Map<string, ConceptData>(
  CONCEPTS.map((concept) => [concept.slug, concept]),
);
