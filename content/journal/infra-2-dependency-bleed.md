---
title: "Every Dependency Will Eventually Bleed"
subtitle: "Why resilient systems assume external services will fail and are designed accordingly."
year: "2026"
domains:
  - Systems Architecture
  - Reliability Engineering
format: Essay
series: "Architecture of Information Systems"
track: Infrastructure
part: 4
tags:
  - Systems Architecture
  - Reliability Engineering
  - Circuit Breakers
  - Bulkheads
  - Distributed Systems
  - APIs
  - Webhooks
---

# Every Dependency Will Eventually Bleed

*Why resilient systems assume external services will fail and are designed accordingly.*

---

In the previous article, we introduced the idea of a Canonical Business Model.

The goal was simple.

Protect analytical systems from becoming tightly coupled to operational schemas, vendor definitions, and reporting logic scattered across dashboards.

Architecturally, this creates a much cleaner system.

But it does not create an independent system.

The analytics platform still depends on external services.

CRMs.

Project management platforms.

Scheduling tools.

Authentication providers.

Payment processors.

Webhook sources.

Third-party APIs.

And every one of those dependencies shares a common characteristic:

> Eventually, they will fail.

Not because the vendors are incompetent.

Not because the software is poorly written.

Because every sufficiently complex system experiences failure.

The question is not whether a dependency will fail.

The question is what happens to your system when it does.

---

## The Dangerous Assumption

Many software systems begin life with a surprisingly optimistic architecture.

A request arrives.

The application processes it.

The application calls another service.

That service calls another service.

Which calls another service.

Which calls a database.

The flow appears logical.

Each component performs a specific task.

Each dependency contributes a piece of the final answer.

Everything works beautifully in development.

Because development environments are usually healthy.

Production environments are not.

---

## The Linear Cascade

Imagine a reporting platform that needs information from three external systems.

A CRM.

A scheduling platform.

A project management platform.

The request path might look like this:

```text
User Request
      ↓
Analytics API
      ↓
CRM API
      ↓
Scheduling API
      ↓
Project API
      ↓
Response
```

At first glance this seems harmless.

The problem emerges when one dependency slows down.

Suppose the scheduling platform begins responding in ten seconds instead of two hundred milliseconds.

The analytics API waits.

User requests accumulate.

Connections remain open.

Threads remain occupied.

Memory consumption rises.

Request queues begin forming.

Soon a localized dependency problem becomes a platform-wide incident.

Nothing actually crashed.

The system simply ran out of patience.

---

## Failure Is Contagious

One of the most important lessons in distributed systems is that failure propagates.

Not physically.

Architecturally.

An overloaded dependency causes requests to wait.

Waiting requests consume resources.

Resource consumption creates contention.

Contention creates latency.

Latency creates retries.

Retries create additional load.

The dependency becomes even slower.

The cycle reinforces itself.

The original failure was small.

The resulting outage becomes large.

This phenomenon appears so frequently that it has become one of the defining challenges of modern software architecture.

---

## The Lesson from Release It!

One of the most influential books ever written on production software systems is Release It! by Michael T. Nygard.

Its central insight remains remarkably relevant:

> Stability is not created by preventing failure.

> Stability is created by containing failure.

That distinction changes how systems are designed.

Traditional engineering often asks:

> How do we stop failures?

Resilient engineering asks:

> How do we stop failures from spreading?

The difference is subtle.

The implications are enormous.

---

## Circuit Breakers

Consider an electrical circuit.

When excessive current flows through the system, a breaker trips.

The circuit is intentionally interrupted.

This prevents damage from propagating further.

Software circuit breakers operate using the same principle.

If an external dependency begins failing repeatedly, the application temporarily stops calling it.

Instead of:

```text
Request
   ↓
Fail
   ↓
Retry
   ↓
Fail
   ↓
Retry
```

the system becomes:

```text
Request
   ↓
Circuit Open
   ↓
Fallback Response
```

The dependency receives time to recover.

The application preserves resources.

Users receive predictable behavior.

The objective is not perfection.

The objective is controlled degradation.

---

## Bulkheads

Circuit breakers protect against unhealthy dependencies.

Bulkheads protect against unhealthy workloads.

The name originates from shipbuilding.

Ships are divided into isolated compartments.

If one compartment floods, the entire vessel does not sink.

Software systems require similar boundaries.

Imagine a platform receiving:

* Dashboard refresh requests
* API ingestion traffic
* Background processing jobs

If all workloads share the same execution resources, one surge can starve everything else.

A single malfunctioning integration suddenly impacts unrelated services.

Bulkheads prevent this.

Workloads receive isolated pools of resources.

Failures remain contained.

The rest of the platform continues operating.

---

## Resilience Through Isolation

At first glance, circuit breakers and bulkheads appear to be different patterns.

They are not.

Both are expressions of the same architectural principle:

> Healthy systems isolate failure.

The objective is not eliminating dependencies.

That is impossible.

The objective is preventing dependency failures from becoming system failures.

Every additional integration increases complexity.

Every additional dependency increases risk.

Resilience emerges from controlling how those risks interact.

---

## A More Important Lesson

This article is not really about circuit breakers.

Nor is it about bulkheads.

It is about expectations.

Inexperienced architectures assume dependencies will succeed.

Mature architectures assume dependencies will eventually fail.

This shift mirrors the patterns we have already seen throughout this series.

Operational databases became analytical bottlenecks.

Visualization platforms became business-model bottlenecks.

External services eventually become reliability bottlenecks.

The technologies change.

The pattern remains consistent.

Architectures evolve when optimistic assumptions encounter operational reality.

---

## Looking Ahead

So far, this series has explored:

* The separation between operational and analytical systems.
* The separation between application code and infrastructure.
* The separation between vendor schemas and business definitions.
* The separation between dependency failures and system failures.

Next, we return to the data layer.

Specifically, one of the most common architectural temptations in modern systems:

The desire to model everything as a generic relationship graph.

Flexible schemas appear powerful.

Until they collide with query planners, indexing strategies, and performance constraints.

The question becomes:

> How much flexibility can a data model absorb before it begins working against the database itself?

And that is where we go next.

---

*Part 4 of the Architecture of Information Systems series.*
