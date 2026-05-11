# ADR-001: Primary Database Architecture Selection

| Field         | Value                                                         |
| ------------- | ------------------------------------------------------------- |
| ADR ID        | ADR-002                                                       |
| Title         | Selection of PostgreSQL as Primary Operational Database       |
| Status        | Accepted                                                    |
| Date          | 2026-05-08                                                    |
| Authors       | Shreyas Agarwal                                               |
| Stakeholders  | Product Engineering, Data Engineering, BI Team, Platform Team |
| Decision Type | Foundational Architecture Decision                            |
| Supersedes | |
| Superseded By |   |

---

# 1. Context

The platform is being designed as a multi-tenant retail intelligence and catalog normalization system focused primarily on garment retail use cases.

The system is expected to support:

- ingestion from heterogeneous client systems (Shopify, Tally ERP, CSV uploads, custom ERPs, etc.)
- canonical product and variant normalization
- historical sales and inventory analytics
- time-series reporting
- BI integrations
- downstream forecasting and analytical workloads
- extensible retail metadata and attributes
- high-cardinality garment variant structures
- MCP and agent integrations

The platform is not a traditional eCommerce storefront. It is primarily a:

```text
Retail Data Platform + Analytics Layer
```

The database selection must therefore support both:

- operational ingestion and normalization workloads
- analytical querying and aggregation workloads

while remaining maintainable for a small-to-medium engineering team.

---

# 2. Problem Statement

The system requires a primary database platform capable of handling:

## Operational Workloads (OLTP-like)

- catalog ingestion
- SKU normalization
- inventory updates
- client synchronization
- transactional writes

## Analytical Workloads (OLAP-like)

- historical sales analytics
- trend analysis
- inventory aging
- sell-through calculations
- BI reporting
- time-series aggregations

Additionally, the platform must support:

- semi-structured retail attributes
- evolving client schemas
- flexible metadata
- multi-tenant isolation
- extensible canonical models

without requiring frequent schema rewrites.

---

# 3. Architectural Considerations

---

# 3.1 OLTP vs OLAP Analysis

The workload was evaluated across both transactional and analytical dimensions.

| Capability                 | OLTP Characteristics | OLAP Characteristics |
| -------------------------- | -------------------- | -------------------- |
| Catalog ingestion          | Yes                  | No                   |
| Inventory synchronization  | Yes                  | No                   |
| Historical sales reporting | No                   | Yes                  |
| Power BI integrations      | No                   | Yes                  |
| Trend analysis             | No                   | Yes                  |
| Variant normalization      | Yes                  | Partial              |
| Time-series analytics      | No                   | Yes                  |

Conclusion:

```text
The platform represents a hybrid transactional and analytical workload (HTAP-lite).
```

The system therefore requires strong transactional guarantees while also supporting analytical querying efficiently.

---

# 3.2 Relational vs Non-Relational Analysis

## Relational Database Strengths

- strong joins and relationships
- transactional consistency
- dimensional modeling support
- SQL analytical ecosystem
- BI interoperability
- indexing and partitioning capabilities

## Non-Relational Database Strengths

- flexible schema evolution
- semi-structured document ingestion
- dynamic attribute support
- rapid adaptation to client variability

### Key Finding

The platform requires:

```text
Relational analytical structure
+
Semi-structured attribute flexibility
```

rather than a purely relational or purely document-oriented model.

---

# 4. Options Evaluated

---

# Option A — MongoDB

## Advantages

- JSON-native
- flexible schemas
- fast ingestion prototyping
- suitable for dynamic retail attributes

## Disadvantages

- weaker analytical semantics
- inefficient complex aggregations at scale
- weaker BI interoperability
- poor fit for star-schema analytical modeling
- more difficult dimensional analytics

## Assessment

MongoDB is well-suited for ingestion staging or metadata-heavy workloads but is not ideal as the canonical analytical backbone for the platform.

---

# Option B — PostgreSQL

## Advantages

- strong transactional guarantees
- mature SQL ecosystem
- excellent analytical compatibility
- support for joins and dimensional modeling
- native JSONB support for semi-structured attributes
- partitioning support
- materialized views
- strong BI interoperability
- mature operational tooling
- extensibility for future analytical scaling

## Disadvantages

- requires disciplined schema governance
- more complex initial modeling than pure document databases

## Assessment

PostgreSQL provides the best balance between:

- transactional integrity
- analytical capability
- schema flexibility
- operational maintainability

for the expected workload profile.

---

# Option C — ClickHouse

## Advantages

- exceptional analytical performance
- highly optimized columnar OLAP engine
- excellent time-series aggregation capabilities

## Disadvantages

- weaker transactional guarantees
- not suitable as primary operational datastore
- additional operational complexity

## Assessment

ClickHouse may become a future analytical acceleration layer but is not suitable as the initial primary platform database.

---

# Option D — Snowflake / BigQuery

## Advantages

- enterprise-scale warehousing
- highly scalable analytical processing

## Disadvantages

- excessive complexity for current scale
- operational overhead
- unsuitable as operational datastore
- cost considerations

## Assessment

Premature for current platform maturity and engineering requirements.

---

# 5. Decision

The platform will adopt:

# PostgreSQL

as the primary database platform.

The implementation will use:

- relational canonical models
- JSONB extensibility for dynamic retail attributes
- partitioned fact tables for time-series analytics
- materialized aggregate views where appropriate
- dimensional modeling principles for analytical workloads

---

# 6. Canonical Architectural Direction

The database architecture will follow a layered data model.

---

# 6.1 Raw Ingestion Layer

Stores source-native payloads for auditability and replay.

Examples:

```text
shopify_raw_payloads
tally_raw_xml
csv_import_batches
```

Characteristics:

- append-only
- immutable
- source-specific

---

# 6.2 Normalized Layer

Stores cleaned source-system representations.

Examples:

```text
normalized_shopify_products
normalized_tally_inventory
```

Characteristics:

- source-cleaned
- partially standardized
- ingestion-oriented

---

# 6.3 Canonical Business Layer

Stores unified retail business entities.

Examples:

```text
products
variants
inventory_snapshots
sales_transactions
sales_daily
brands
categories
stores
```

Characteristics:

- source-agnostic
- analytical-friendly
- canonical business semantics

---

# 7. Data Modeling Principles

The following modeling principles are adopted:

---

# 7.1 Variant-Centric Commerce Model

The system will model:

```text
Product = conceptual retail item
Variant = sellable SKU
```

All inventory and sales analytics will operate at variant/SKU granularity.

---

# 7.2 Separation of Dimensions and Facts

The platform will separate:

## Dimensions

Descriptive business entities.

Examples:

```text
dim_products
dim_variants
dim_brands
dim_stores
```

## Facts

Time-series measurable events.

Examples:

```text
fact_sales_transactions
fact_sales_daily
fact_inventory_snapshots
```

---

# 7.3 Flexible Attribute Modeling

Dynamic retail attributes will use:

```sql
JSONB
```

for extensibility.

Examples:

- fabric
- fit
- wash instructions
- seasonal metadata
- marketplace-specific attributes

---

# 7.4 Surrogate Internal IDs

The system will not use external platform IDs as primary business identifiers.

Instead:

```text
internal UUIDs
+
source mapping tables
```

will be maintained.

---

# 8. Consequences

---

# Positive Consequences

- strong BI interoperability
- scalable analytical querying
- flexible catalog modeling
- transactional reliability
- future extensibility
- lower operational complexity
- strong ecosystem support
- compatibility with AWS managed services

---

# Negative Consequences

- increased schema governance requirements
- more complex modeling than pure document databases
- potential future need for dedicated OLAP acceleration layers at scale

---

# 9. Future Considerations

The architecture intentionally allows future evolution toward:

- ClickHouse for analytical acceleration
- dedicated warehouse layers
- event-driven streaming pipelines
- search indexing layers
- machine learning feature stores

without requiring replacement of the canonical PostgreSQL layer.

---

# 10. Final Rationale

PostgreSQL was selected because it provides the strongest alignment with the platform’s combined requirements for:

- operational consistency
- analytical capability
- semi-structured extensibility
- retail catalog modeling
- time-series analytics
- BI compatibility
- long-term maintainability

within the expected engineering and operational constraints of the project.