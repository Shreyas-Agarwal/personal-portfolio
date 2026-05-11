# ADR-003: Monorepo Strategy and Tally Desktop Connector Architecture

| Field | Value |
|---|---|
| ADR ID | ADR-003 |
| Title | Monorepo Strategy and Tally Desktop Connector Architecture |
| Status | Accepted |
| Date | 2026-05-08 |
| Authors | Shreyas Agarwal |
| Stakeholders | Product Engineering, Backend Engineering, Data Engineering |
| Decision Type | Architecture |
| Supersedes | None |
| Superseded By | None |

---

# 1. Context

The Sales Analytics platform requires integration with Tally ERP systems deployed within customer-controlled local environments.

Tally commonly exposes data through XML-based HTTP interfaces running on local machines or internal networks. In most customer environments, direct cloud connectivity to Tally systems is either impractical or operationally undesirable due to:

- local-only ERP deployments
- enterprise firewall restrictions
- network isolation policies
- inconsistent infrastructure maturity
- absence of native cloud integration capabilities
- XML-centric integration patterns

To enable reliable ingestion into the cloud analytics platform, a lightweight local connector application is required.

At the same time, the broader platform architecture is still in an early-to-mid maturity stage where:
- schemas are evolving rapidly
- ingestion patterns are still being discovered
- internal APIs are expected to change frequently
- development velocity is prioritized
- the engineering team remains relatively small

A repository strategy decision was therefore required:
- separate repositories for all deployable components
- OR a shared monorepo structure with logical application boundaries

The connector itself is intentionally lightweight and currently expected to:
- query Tally over local HTTP/XML interfaces
- minimally normalize data
- securely push payloads to the cloud ingestion API

The connector is not currently intended to:
- execute business logic
- perform analytical transformations
- maintain complex local state
- operate as a heavy desktop application

---

# 2. Problem Statement

The platform requires a reliable and operationally manageable mechanism for extracting data from locally hosted Tally ERP systems and transmitting it into the cloud analytics pipeline.

The primary architectural challenges include:
- enabling ingestion from customer-local ERP systems
- maintaining fast development velocity during platform evolution
- avoiding premature repository fragmentation
- preventing tight coupling between ingestion agents and backend internals
- preserving the ability to scale architecture later without major rewrites

Without a clear architectural decision:
- repository organization may become inconsistent
- backend and connector boundaries may become tightly coupled
- future extraction into independent services may become difficult
- deployment and ownership responsibilities may become unclear

---

# 3. Architectural Considerations

The following considerations influenced the decision:

- rapid platform evolution and schema iteration
- small engineering team size
- operational simplicity
- shared API contract evolution
- maintainability
- future scalability
- eventual separability of deployable components
- customer network restrictions
- offline/retry handling requirements
- local system integration constraints
- development velocity
- deployment independence potential
- minimization of premature operational complexity

Special consideration was given to ensuring that:
- the connector remains operationally lightweight
- cloud systems retain ownership of business transformations
- architectural separation is preserved even within a shared repository

---

# 4. Options Evaluated

## Option 1: Fully Separate Repositories

### Description

Maintain:
- backend platform repository
- connector repository
- shared contracts repository

as independently managed codebases.

### Advantages

- clear deployment boundaries
- stronger ownership isolation
- independent release lifecycles
- cleaner operational separation
- easier future scaling by team

### Disadvantages

- increased coordination overhead
- duplicated CI/CD configuration
- higher operational complexity
- schema synchronization friction
- slower iteration speed during discovery phase

### Operational Implications

This model introduces additional release management and cross-repository coordination requirements early in platform development.

### Reason Not Selected

The current platform maturity and team size do not justify the additional operational overhead.

---

## Option 2: Monorepo with Logical Application Boundaries

### Description

Maintain all platform components within a shared repository while preserving strict architectural boundaries between applications.

### Advantages

- faster iteration speed
- simplified shared contract management
- easier schema evolution
- centralized CI/CD
- reduced operational overhead
- simplified onboarding

### Disadvantages

- weaker deployment isolation
- potential for accidental coupling
- future extraction work may be required

### Operational Implications

Requires disciplined boundary enforcement between applications despite repository colocation.

### Reason Selected

This approach provides the best balance between:
- development velocity
- architectural cleanliness
- operational simplicity
- future scalability

during the current platform stage.

---

# 5. Decision

The platform will adopt a monorepo architecture.

The Tally connector will exist as an isolated application boundary within the monorepo under:

```text
apps/tally-connector/
```

The connector will:

- communicate exclusively through HTTP/XML endpoints exposed by local Tally installations
- perform minimal data normalization required for ingestion
- push validated payloads directly to the platform ingestion API
- remain operationally lightweight
- avoid implementing business logic or analytical transformations
- be deployable as a standalone service within the monorepo

Architectural boundaries will be strictly enforced to ensure:
- no coupling between connector components and backend business logic
- clear ownership lines within the monorepo
- future extraction into independent deployable services remains possible

The connector will be implemented as:
- a lightweight Python application
- compiled into a Windows executable using PyInstaller or equivalent tooling

---

# 6. Canonical Architectural Direction

The platform will favour

- modular monorepo 
- strict application boundaries
- API-driven inter-service communication
- shared contract definitions
- lightweight ingestion agents
- cloud-centric business processing

Future applications added to the platform should:

- maintain explicit ownership boundaries
- avoid direct cross-application coupling
- communicate through stable interfaces
- remain independently deployable where feasible

The connector layer should remain:

- operationally lightweight
- minimally stateful
- transport-focused rather than transformation-focused

---

# 7. Principles Adopted

- operational simplicity over premature optimization
- separation of concerns
- API-first integration boundaries
- cloud-centric processing architecture
- modularization within monorepo structure
- future extraction readiness
- development velocity during discovery phase
- explicit ownership boundaries
- minimal local business logic
- shared contract consistency

---

# 8. Consequences

## Positive outcomes

- faster development cycles
- simplified schema evolution
- reduced operational overhead
- easier cross-component coordination
- centralized repository governance
- improved developer onboarding

## Tradeoffs Accepted

- deployment independence is partially reduced
- architectural discipline must be actively maintained
- future repository extraction may require effort
- accidental coupling risk increases within shared repository structures

## Risks Accepted

- the connector may gradually accumulate operational complexity over time
- future scaling requirements may eventually justify repository separation
- local retry and persistence requirements may expand connector responsibilities

---

# 9. Future Considerations

The following conditions may trigger reevaluation of this decision:

- introduction of auto-update systems
- dedicated connector engineering ownership
- large-scale customer deployments
- offline synchronization complexity growth
- background Windows service requirements
- installer and deployment lifecycle expansion
- independent release cadence requirements
- substantial local persistence requirements

Future evolution may include:

- extraction of the connector into a standalone repository
- introduction of shared package registries
- dedicated deployment pipelines
- connector fleet management infrastructure

---

# 10. Final Rationale

The selected architecture provides the best balance between:

- speed of execution
- architectural discipline
- operational simplicity
- future scalability

at the current maturity stage of the platform.

A monorepo enables rapid iteration and shared contract evolution while avoiding unnecessary operational fragmentation during early platform growth.

At the same time, preserving strict application boundaries ensures that future architectural evolution remains possible without major system redesign.

The lightweight connector approach aligns with the platform philosophy of:

- keeping ingestion agents thin
- centralizing business logic in cloud systems
- minimizing operational burden on customer environments