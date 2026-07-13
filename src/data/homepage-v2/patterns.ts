export interface Pattern {
  id: string;
  name: string;
  description: string;
}

export const patterns: Pattern[] = [
  {
    id: "transactional-checkpointing",
    name: "Transactional Checkpointing",
    description:
      "Durable progress markers written inside the same transaction as the work they describe, so recovery never re-derives state from guesswork.",
  },
  {
    id: "bulkheads",
    name: "Bulkheads",
    description:
      "Isolating failure domains so a saturated dependency can only ever sink the module that called it, not the platform around it.",
  },
  {
    id: "retry-classification",
    name: "Retry Classification",
    description:
      "Treating failures as a taxonomy — transient, structural, poisoned — instead of a single boolean, so retries fix problems instead of amplifying them.",
  },
  {
    id: "graph-traversal",
    name: "Graph Traversal",
    description:
      "Modeling relationships as edges to walk rather than joins to flatten, when the question is reachability and depth, not aggregation.",
  },
  {
    id: "atomic-publication",
    name: "Atomic Publication",
    description:
      "Building a new version of derived state fully out-of-band, then swapping a single pointer — readers never see a half-built world.",
  },
  {
    id: "event-sourcing",
    name: "Event Sourcing",
    description:
      "Storing the sequence of things that happened as the source of truth, and treating current state as a cached projection of that log.",
  },
  {
    id: "circuit-breaker",
    name: "Circuit Breaker",
    description:
      "Stopping calls to a dependency once it crosses a failure threshold, giving it room to recover instead of drowning it in retries.",
  },
  {
    id: "idempotency-keys",
    name: "Idempotency Keys",
    description:
      "Attaching a stable identity to a request so at-least-once delivery collapses into effectively-once execution on the receiving end.",
  },
];

export const getPatternById = (id: string): Pattern | undefined =>
  patterns.find((p) => p.id === id);
