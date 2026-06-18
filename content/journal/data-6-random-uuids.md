---
title: "Database Page Physics: Why Random UUIDs Are Anti-Performance"
subtitle: "How a seemingly harmless identifier choice influences indexes, storage layout, and disk I/O."
year: "2026"
domains:
- Analytics Architecture
- Database Engineering
format: Essay
series: "Architecture of Information Systems"
track: Data
part: 11
tags:
- Database Internals
- PostgreSQL
- UUID
- UUIDv7
- ULID
- B-Tree
- Storage Engines
---

# Database Page Physics: Why Random UUIDs Are Anti-Performance

*How a seemingly harmless identifier choice influences indexes, storage layout, and disk I/O.*

---

In the previous article, we peeled back another layer of abstraction.

Applications became sockets.

Sockets became operating-system resources.

The lesson was simple:

> Every abstraction eventually collides with a physical constraint.

The same principle applies inside databases.

Most developers think of records as rows.

Databases think of them as pages.

And once you understand pages, a surprising realization emerges:

> Even your primary keys have physics.

---

## The Comfortable Illusion

Consider a simple table:

```sql
CREATE TABLE projects (
    id UUID PRIMARY KEY,
    name TEXT
);
```

Nothing about this schema appears controversial.

In fact, UUIDs have become extremely common.

They are globally unique.

They eliminate coordination between systems.

They work well in distributed environments.

They avoid predictable identifiers.

Architecturally, they solve several genuine problems.

The issue is not uniqueness.

The issue is randomness.

---

## Databases Do Not Store Rows

Most developers mentally picture a table as something resembling a spreadsheet.

Rows stacked neatly beneath one another.

The reality is more physical.

Databases store information inside fixed-size pages.

For example, PostgreSQL typically uses:

```text
8 KB Pages
```

Each page contains:

```text
+----------------------+
| Page Header          |
+----------------------+
| Line Pointers        |
+----------------------+
| Tuple Data           |
+----------------------+
| Free Space           |
+----------------------+
```

Pages are the fundamental unit of storage.

Not rows.

Not tables.

Pages.

When the database reads data from disk, it reads pages.

When the database writes data to disk, it writes pages.

Understanding database performance starts here.

---

## The Hidden Cost of Alignment

Storage engines also care deeply about memory alignment.

Many systems align data according to machine word boundaries.

In PostgreSQL this is often enforced through MAXALIGN rules.

The result is that tuples are not packed together arbitrarily.

Padding may be introduced to preserve efficient access patterns.

A row occupying 37 bytes rarely consumes exactly 37 bytes.

Physical layout matters.

Small inefficiencies multiplied across millions of records become measurable storage overhead.

The database is constantly balancing density against access efficiency.

---

## Why Indexes Exist

Without indexes, databases would need to scan every page.

Every query.

Every time.

Indexes exist to avoid that cost.

The most common index structure is the B-Tree.

Conceptually, a B-Tree allows the database to navigate rapidly toward a target record.

Rather than reading an entire table, it follows an ordered path through index pages.

This is where identifier selection becomes important.

Because B-Trees depend on order.

---

## Sequential Identifiers Are Predictable

Imagine inserting records using:

```sql
BIGSERIAL
```

The identifiers might look like:

```text
1001
1002
1003
1004
1005
```

Every new record arrives at the end of the index.

The storage engine performs relatively little reorganization.

Pages fill gradually.

Writes remain predictable.

The B-Tree grows in a mostly orderly fashion.

The database is happy.

---

## UUIDv4 Breaks Locality

Now consider UUIDv4:

```text
5d8d9c4f...
b124f9e1...
1c62ab8d...
f7e991a2...
```

The identifiers are intentionally random.

Every new insert may belong anywhere inside the index.

Not at the end.

Not near recent records.

Anywhere.

The storage engine must constantly reorganize pages to maintain index order.

The consequence is subtle but important.

The database loses locality.

Adjacent inserts are no longer adjacent on disk.

Cache efficiency declines.

Index maintenance increases.

Disk activity increases.

The physical cost of randomness begins accumulating.

---

## The Page Split Problem

Eventually a page becomes full.

A new record arrives.

There is no room.

The database performs a page split.

Conceptually:

```text
Before

[Page A]
████████████

After

[Page A]
██████

[Page B]
██████
```

Records are redistributed.

Pointers are updated.

The B-Tree is modified.

A few page splits are normal.

Millions of random inserts create substantially more work.

The database spends increasing effort maintaining the structure rather than storing information.

This is why large UUIDv4-heavy systems often experience index bloat over time.

The randomness that improved distributed uniqueness degraded storage efficiency.

---

## The Industry's False Debate

For years, identifier discussions were framed incorrectly.

The debate sounded like:

> Sequential IDs or UUIDs?

That is no longer the most useful question.

The real question is:

> How much randomness do we actually need?

Modern systems increasingly recognize that uniqueness and locality are not mutually exclusive.

---

## Enter UUIDv7 and ULIDs

Newer identifier schemes attempt to preserve the advantages of UUIDs while reducing their storage penalties.

ULIDs introduced a timestamp-based prefix combined with randomness.

UUIDv7 follows a similar philosophy and has rapidly gained momentum.

Instead of being entirely random like UUIDv4, UUIDv7 incorporates time ordering.

The result is:

```text
Earlier Records
      ↓
Later Records
```

Identifiers remain globally unique.

They remain distributed-friendly.

But they also arrive in a mostly sequential order.

The B-Tree experiences dramatically less disruption.

Page splits decrease.

Cache locality improves.

Index growth becomes more predictable.

The database performs less housekeeping and more useful work.

---

## The Physics of Identifier Design

What makes this discussion interesting is that it appears unrelated to performance.

Developers choose identifiers for application reasons:

* Security
* Uniqueness
* Distributed generation
* Interoperability

Rarely does anyone ask:

> What will this do to my storage engine?

Yet the storage engine cares.

A lot.

The identifier influences:

* Index layout
* Page density
* Cache locality
* Write amplification
* Disk I/O

A software abstraction quietly becomes a physical storage decision.

---

## A More Important Lesson

This article is not really about UUIDs.

Nor is it about PostgreSQL.

It is about unintended consequences.

Every layer of abstraction hides the mechanics beneath it.

A UUID looks like a string.

A database sees insertion patterns.

A developer sees uniqueness.

A storage engine sees page splits.

Neither perspective is wrong.

The challenge is understanding both simultaneously.

Architecture becomes significantly more effective when decisions are evaluated not only for their logical correctness, but also for their physical consequences.

---

## Looking Ahead

So far, this series has followed data all the way down to storage engines and disk structures.

We have seen how schemas influence queries.

How state influences memory.

How transport influences performance.

And now, how identifiers influence storage topology.

Next, we return to infrastructure.

Because before requests ever reach application code, they encounter another critical component sitting at the edge of the system.

A component responsible for routing traffic, terminating TLS, serving static assets, and protecting runtimes from the public Internet.

The reverse proxy.

And despite being one of the most common pieces of modern infrastructure, many teams only appreciate its importance when it disappears.

And that is where we go next.

---

*Part 11 of the Architecture of Information Systems series.*
