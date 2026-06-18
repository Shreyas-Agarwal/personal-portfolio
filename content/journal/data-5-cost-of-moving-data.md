---
title: "The Cost of Moving Data"
subtitle: "Why modern systems increasingly spend more effort transporting information than processing it."
year: "2026"
domains:
- Analytics Architecture
- Data Engineering
format: Essay
series: "Architecture of Information Systems"
track: Data
part: 9
tags:
- Data Engineering
- Serialization
- Analytics Architecture
- Columnar Storage
- Data Transport
- Database Internals
---

# The Cost of Moving Data

*Why modern systems increasingly spend more effort transporting information than processing it.*

---

In the previous article, we explored one of the defining architectural lessons of modern infrastructure:

Compute should be disposable.

State should not.

Application runtimes became stateless.

Historical information moved into dedicated storage systems.

The separation unlocked horizontal scaling, resilience, and operational simplicity.

But it also introduced a new problem.

The moment state and compute become separate, information must move between them.

And moving data turns out to be surprisingly expensive.

---

## The Question Nobody Asks

When a dashboard loads, most people imagine something like this:

```text
Database
    ↓
Application
    ↓
Dashboard
```

The process appears trivial.

The database retrieves information.

The application processes it.

The dashboard displays it.

The assumption is understandable.

After all, moving data sounds easier than calculating data.

Yet in many modern analytical systems, the opposite is true.

The expensive operation is not computation.

The expensive operation is transport.

---

## We Optimized the Wrong Thing

For decades, engineering conversations focused on processing power.

Faster CPUs.

More memory.

Better algorithms.

Larger clusters.

The assumption was that computation represented the primary bottleneck.

And for a long time, it did.

But hardware improved.

Parallelism improved.

Storage improved.

Distributed computing improved.

Meanwhile another cost remained stubbornly persistent:

Moving information from one place to another.

---

## The Journey of a Single Query

Imagine a dashboard requesting one million rows from a database.

The database already possesses the information.

The difficult part should be over.

Instead, a sequence of transformations begins.

The database retrieves the rows.

The rows are converted into a wire format.

The wire format traverses the network.

The client receives the bytes.

The bytes are deserialized.

The application reconstructs objects.

The visualization layer transforms them again.

Only then does analysis begin.

The data has already been processed multiple times before anyone performs a calculation.

---

## Serialization Is Work

Computers do not transmit objects.

They transmit bytes.

This means every structure must be converted into a transferable representation.

A row becomes a sequence of bytes.

The bytes cross a boundary.

The receiving system reconstructs the original structure.

This process is known as serialization.

And despite appearing invisible, serialization is computational work.

Every field must be interpreted.

Every value must be encoded.

Every structure must be rebuilt.

At small scales, the cost is negligible.

At analytical scales, it becomes significant.

---

## The Hidden Tax

Imagine an organization processing hundreds of millions of records daily.

The raw calculations may be relatively simple.

Aggregations.

Filters.

Trend analysis.

The challenge often lies elsewhere.

The same data may be:

* Serialized by the database
* Deserialized by an application
* Re-serialized for transport
* Deserialized again by a visualization tool

The information itself never changed.

Only its representation changed.

Each transition consumes CPU cycles.

Memory allocations.

Network bandwidth.

Latency.

The system pays a tax every time information crosses a boundary.

Most teams never explicitly account for it.

The bill arrives anyway.

---

## Why Rows Become Expensive

Traditional database systems evolved around rows.

This makes perfect sense for operational workloads.

A customer record is retrieved.

An order is updated.

A payment is inserted.

Rows map naturally to transactions.

Analytical workloads behave differently.

Imagine calculating monthly revenue across one hundred million transactions.

The query may only require:

```text
Transaction Date
Revenue
```

Yet row-oriented structures often move entire records.

Information that is never used still occupies bandwidth.

Still consumes memory.

Still participates in serialization.

The architecture transports more information than the computation requires.

The inefficiency compounds with scale.

---

## The Analytical Perspective

This is why modern analytical systems increasingly favor columnar representations.

Instead of storing information row by row:

```text
Order A
Order B
Order C
```

they organize information by attribute:

```text
Date
Date
Date

Revenue
Revenue
Revenue
```

The difference appears subtle.

The implications are enormous.

Queries frequently require only a subset of columns.

Columnar structures allow systems to move less data.

Less movement means less serialization.

Less serialization means less work.

The system becomes faster not because computation improved, but because transport decreased.

---

## Every Boundary Has a Cost

Throughout this series, we have repeatedly separated concerns.

Operational systems from analytical systems.

Application code from infrastructure.

Business models from vendor schemas.

State from compute.

Each separation improved architecture.

Each separation also introduced boundaries.

And boundaries create movement.

Every API call.

Every database query.

Every message queue.

Every service invocation.

Every network hop.

Requires information to cross an execution boundary.

The architectural benefits remain worthwhile.

But the costs remain real.

This is one of the central trade-offs of modern systems design.

---

## Why Scale Changes Everything

At small volumes, data movement feels free.

A few kilobytes cross the network.

A few thousand rows are transferred.

Nobody notices.

At larger scales, transport becomes visible.

A dashboard refresh moves gigabytes.

A machine learning pipeline processes billions of records.

A distributed analytics platform exchanges terabytes between services.

Suddenly the system spends more effort moving information than understanding it.

The bottleneck shifts.

Not because computation became slower.

Because transportation became dominant.

---

## The Physics of Information

There is a temptation to think of software as abstract.

Code feels weightless.

Queries feel instantaneous.

APIs feel virtual.

The reality is more physical.

Information occupies memory.

Memory occupies hardware.

Hardware connects through networks.

Networks transmit finite numbers of bytes per second.

Every architectural decision eventually collides with those constraints.

Data movement is not merely a software concern.

It is a physics problem.

---

## A More Important Lesson

This article is not really about databases.

Nor is it about serialization.

It is about a recurring misconception.

We often assume the value of information lies in storing it.

Or computing it.

Increasingly, the cost lies in moving it.

The modern data stack spends enormous effort transferring information between systems designed to understand it.

Databases.

Applications.

Warehouses.

Visualization platforms.

Machine learning pipelines.

Each boundary introduces friction.

Each transition introduces cost.

The information remains identical.

The effort required to move it continues accumulating.

---

## Looking Ahead

So far, this series has explored how complexity emerges from storage, state, memory, and data movement.

The next challenge takes us even closer to the physical foundations of computing.

Because before information can travel across services, APIs, and databases, it must first enter the machine.

Every network request ultimately arrives through a surprisingly simple construct:

A socket.

Four values.

Two endpoints.

One connection.

And together they govern nearly every interaction on the modern Internet.

That is where we go next.

---

*Part 9 of the Architecture of Information Systems series.*
