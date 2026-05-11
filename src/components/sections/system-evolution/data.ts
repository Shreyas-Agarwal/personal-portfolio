// system-evolution/data.ts

export type DiagramNode = {
  id: string;
  label: string;
  type: "primary" | "secondary" | "boundary";
  x: number;
  y: number;
  status?: "active" | "dimmed" | "obsolete";
};

export type DiagramEdge = {
  id: string;
  from: string;
  to: string;
  animated?: boolean;
  dashed?: boolean;
  status?: "active" | "dimmed" | "obsolete";
};

export type OperationalBurden = {
  label: string;
  value: number; // 0 to 100
};

export type EvolutionPhase = {
  id: string;
  phase: string;
  title: string;
  assumption: string;
  whatBroke: string;
  architecturalResponse: string;
  diagram: { nodes: DiagramNode[]; edges: DiagramEdge[] };
  burden: OperationalBurden[];
  realization: string;
};

export const evolutionPhases: EvolutionPhase[] = [
  {
    id: "phase-01",
    phase: "Phase 01",
    title: "Single Product Monolith",
    assumption:
      "“We can optimize purely for iteration speed. There are no tenants, no scale constraints, and infrastructure is just a cost to defer.”",
    whatBroke:
      "Enterprise isolation requirements invalidated shared-state assumptions. A single database across all clients became a hard blocker for enterprise security compliance.",
    architecturalResponse:
      "Tenant-separated deployments. A platform identity layer was introduced to manage shared licensing while strictly isolating client data.",
    diagram: {
      nodes: [
        { id: "fe", label: "Frontend", type: "primary", x: 200, y: 70 },
        { id: "be", label: "Backend", type: "primary", x: 200, y: 130 },
        { id: "db", label: "PostgreSQL", type: "secondary", x: 200, y: 310 },
      ],
      edges: [
        { id: "e-fe-be", from: "fe", to: "be" },
        { id: "e-be-db", from: "be", to: "db" },
      ],
    },
    burden: [
      { label: "Deployment Complexity", value: 10 },
      { label: "Coordination Overhead", value: 5 },
      { label: "Failure Surface", value: 10 },
      { label: "Operational Visibility", value: 5 },
      { label: "Distributed State Risk", value: 0 },
    ],
    realization: "“The system stopped being a single product and started becoming a platform.”",
  },
  {
    id: "phase-02",
    phase: "Phase 02",
    title: "Enterprise Isolation & Platform Identity",
    assumption: "“We can simply deploy separate copies of the application per enterprise client.”",
    whatBroke:
      "Source-of-truth consistency fractured. Shared logic like licensing, routing, and global identity couldn't live in isolated tenant databases without falling out of sync.",
    architecturalResponse:
      "A modular platform layer. Identity and licensing moved to shared platform services, while tenant databases became completely isolated environments.",
    diagram: {
      nodes: [
        { id: "fe", label: "Shared Frontend", type: "primary", x: 200, y: 70, status: "dimmed" },
        { id: "be", label: "Platform Services", type: "primary", x: 200, y: 130 },
        { id: "db_shared", label: "Platform DB", type: "boundary", x: 80, y: 310 },
        { id: "db_a", label: "Tenant A DB", type: "secondary", x: 200, y: 310 },
        { id: "db_b", label: "Tenant B DB", type: "secondary", x: 320, y: 310 },
      ],
      edges: [
        { id: "e-fe-be", from: "fe", to: "be", status: "dimmed" },
        { id: "e-be-dbs", from: "be", to: "db_shared" },
        { id: "e-be-dba", from: "be", to: "db_a", animated: true },
        { id: "e-be-dbb", from: "be", to: "db_b", animated: true },
      ],
    },
    burden: [
      { label: "Deployment Complexity", value: 40 },
      { label: "Coordination Overhead", value: 25 },
      { label: "Failure Surface", value: 20 },
      { label: "Operational Visibility", value: 15 },
      { label: "Distributed State Risk", value: 20 },
    ],
    realization:
      "“Ownership boundaries and operational truth became harder to define than the feature logic itself.”",
  },
  {
    id: "phase-03",
    phase: "Phase 03",
    title: "Asynchronous Workflows",
    assumption:
      "“We can handle orchestration and processing synchronously during the API request lifecycle.”",
    whatBroke:
      "Synchronous APIs bottlenecked under load. Long-running tasks timed out, and transient failures surfaced as visible user errors with no reliable recovery path.",
    architecturalResponse:
      "Execution moved off the request path. Worker layers and Redis queues were introduced to absorb operational variance and guarantee eventual completion.",
    diagram: {
      nodes: [
        { id: "fe", label: "Frontend", type: "primary", x: 200, y: 70, status: "obsolete" },
        { id: "be", label: "API Gateway", type: "primary", x: 200, y: 130 },
        { id: "queue", label: "Redis Queue", type: "boundary", x: 200, y: 190 },
        { id: "worker", label: "Async Workers", type: "primary", x: 200, y: 250 },
        {
          id: "db_shared",
          label: "Platform DB",
          type: "boundary",
          x: 80,
          y: 310,
          status: "dimmed",
        },
        { id: "db_a", label: "Tenant DBs", type: "secondary", x: 200, y: 310 },
      ],
      edges: [
        { id: "e-fe-be", from: "fe", to: "be", status: "obsolete" },
        { id: "e-be-q", from: "be", to: "queue", animated: true },
        { id: "e-q-w", from: "queue", to: "worker", animated: true },
        { id: "e-w-dba", from: "worker", to: "db_a" },
        { id: "e-be-dbs", from: "be", to: "db_shared", status: "dimmed" },
      ],
    },
    burden: [
      { label: "Deployment Complexity", value: 55 },
      { label: "Coordination Overhead", value: 60 },
      { label: "Failure Surface", value: 45 },
      { label: "Operational Visibility", value: 30 },
      { label: "Distributed State Risk", value: 40 },
    ],
    realization:
      "“I began thinking less in terms of APIs, and more in terms of event-driven system behavior.”",
  },
  {
    id: "phase-04",
    phase: "Phase 04",
    title: "Deployment Abstraction",
    assumption: "“A single codebase deploy will behave the same for all clients.”",
    whatBroke:
      "Client-specific frontend behavior required independent builds. Maintaining separate codebases became operationally unsustainable and halted deployment velocity.",
    architecturalResponse:
      "Feature injection and CDN distribution. A single application artifact was built, distributed, and behaviorally modified at runtime based on platform configurations.",
    diagram: {
      nodes: [
        { id: "cdn", label: "Edge CDN", type: "boundary", x: 200, y: 10 },
        { id: "fe_inj", label: "Feature-Injected FE", type: "primary", x: 200, y: 70 },
        { id: "be", label: "API Gateway", type: "primary", x: 200, y: 130 },
        { id: "queue", label: "Redis Queue", type: "boundary", x: 200, y: 190, status: "dimmed" },
        { id: "worker", label: "Async Workers", type: "primary", x: 200, y: 250, status: "dimmed" },
        {
          id: "db_shared",
          label: "Platform DB",
          type: "boundary",
          x: 80,
          y: 310,
          status: "obsolete",
        },
        { id: "db_a", label: "Tenant DBs", type: "secondary", x: 200, y: 310, status: "dimmed" },
      ],
      edges: [
        { id: "e-cdn-fe", from: "cdn", to: "fe_inj" },
        { id: "e-fe-be", from: "fe_inj", to: "be" },
        { id: "e-be-q", from: "be", to: "queue", animated: true, status: "dimmed" },
        { id: "e-q-w", from: "queue", to: "worker", animated: true, status: "dimmed" },
      ],
    },
    burden: [
      { label: "Deployment Complexity", value: 85 },
      { label: "Coordination Overhead", value: 70 },
      { label: "Failure Surface", value: 60 },
      { label: "Operational Visibility", value: 50 },
      { label: "Distributed State Risk", value: 45 },
    ],
    realization:
      "“Deployment itself became an architectural component, rather than just an operational task.”",
  },
  {
    id: "phase-05",
    phase: "Phase 05",
    title: "Distributed Coordination & Resilience",
    assumption: "“As long as the services are running, the system is healthy.”",
    whatBroke:
      "Distributed failures were silent. Partial processing failure meant corrupt state with no shared context for recovery. Debugging became impossible without distributed tracing.",
    architecturalResponse:
      "Observability and distributed coordination became first-class requirements. SAGA patterns, telemetry pipelines, and circuit breakers were layered deeply into the infrastructure.",
    diagram: {
      nodes: [
        { id: "cdn", label: "Edge CDN", type: "boundary", x: 200, y: 10, status: "obsolete" },
        { id: "fe_inj", label: "Clients", type: "primary", x: 200, y: 70, status: "obsolete" },
        { id: "be", label: "API Gateway", type: "primary", x: 200, y: 130 },
        { id: "sns", label: "SNS / SQS", type: "secondary", x: 200, y: 190 },
        { id: "worker", label: "Distributed Workers", type: "primary", x: 200, y: 250 },
        { id: "saga", label: "SAGA Coordinator", type: "boundary", x: 80, y: 250 },
        { id: "tel", label: "Telemetry & Audit", type: "secondary", x: 320, y: 190 },
        { id: "db_a", label: "Tenant DBs", type: "secondary", x: 200, y: 310, status: "dimmed" },
      ],
      edges: [
        { id: "e-fe-be", from: "fe_inj", to: "be", status: "obsolete" },
        { id: "e-be-sns", from: "be", to: "sns", animated: true },
        { id: "e-sns-w", from: "sns", to: "worker", animated: true },
        { id: "e-w-saga", from: "worker", to: "saga", animated: true },
        { id: "e-saga-db", from: "saga", to: "db_a", dashed: true },
        { id: "e-w-tel", from: "worker", to: "tel", dashed: true, animated: true },
        { id: "e-be-tel", from: "be", to: "tel", dashed: true, animated: true },
      ],
    },
    burden: [
      { label: "Deployment Complexity", value: 90 },
      { label: "Coordination Overhead", value: 95 },
      { label: "Failure Surface", value: 85 },
      { label: "Operational Visibility", value: 100 },
      { label: "Distributed State Risk", value: 90 },
    ],
    realization:
      "“At scale, resilience and visibility stop being support systems and become part of the product itself.”",
  },
];
