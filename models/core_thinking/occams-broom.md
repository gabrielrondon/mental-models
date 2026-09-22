---
id: occams-broom
title: Occam's Broom
domain: Epistemology & Scientific Method
category: Core Thinking & Reasoning
summary: The intellectually dishonest practice where an advocate or theorist subtly sweeps inconvenient, contradictory facts and anomalies under the carpet to make their preferred explanation or architecture appear deceptively simple, clean, and parsimonious.
triggers:
  - Vendor sales demos presenting "flawless, effortless" cloud migrations
  - Academic or corporate presentations with suspiciously neat, outlier-free data charts
  - Technical proposals that omit critical operational costs, licensing fees, or latency taxes
counter_models:
  - Steelmanning & Falsifiability (deliberately surfacing the dirt from under the carpet)
paired_models:
  - Occam's Razor
  - Confirmation Bias
  - Map vs Territory
---

# Occam's Broom

> "Occam's Razor prefers the simplest explanation. Occam's Broom is the process by which inconvenient facts are swept under the rug to make an explanation look simpler than it actually is." — Sydney Brenner

---

## 1. Core Intuition & Mechanism

We are all taught to revere **Occam's Razor**: between competing hypotheses that explain the data, choose the simplest one.

Nobel laureate molecular biologist Sydney Brenner coined the satirical counter-concept: **Occam's Broom**.

When someone is passionately committed to a theory, an architecture, or a political narrative, reality rarely cooperates completely. The world is full of messy anomalies, contradictory telemetry, awkward edge cases, and ugly physical frictions.

Instead of revising their theory, the advocate pulls out **Occam's Broom**:
- They quietly delete the 5 outliers from the benchmark chart.
- They hide the footnote explaining that their distributed database only achieves 1,000,000 requests per second when all safety ACID guarantees and replication checks are turned off.
- They omit the ongoing \$50,000/month AWS network egress costs from their presentation to the board.

Having swept all the contradictory dirt under the carpet, they turn around with a clean smile and declare: *"Look how simple, elegant, and parsimonious our proposal is! By Occam's Razor, you must approve it!"*

Occam's Broom is **weaponized parsimony**: creating the illusion of simplicity through the deliberate concealment of complexity.

---

## 2. When to Apply (Diagnostic Checklist)

Use this checklist during vendor demos, executive proposals, or technical benchmark evaluations:

- [ ] **This proposal looks suspiciously clean and frictionless—what inconvenient facts were swept under the broom?**
- [ ] **What edge cases, error conditions, or operational burdens are absent from this benchmark slide?**
- [ ] **Are we sweeping inconvenient production telemetry under the rug because it contradicts our preferred narrative?**
- [ ] **What questions are the presenters actively avoiding or brushing off as "trivial details to be solved later"?**
- [ ] **What does this system look like when subjected to dirty, real-world network turbulence and user error?**

---

## 3. Real-World Case Studies

### Technology & Engineering
*The "Infinite Scale" NoSQL Benchmark Scam:* In the early 2010s, vendors published benchmark charts showing their distributed NoSQL database writing 1,000,000 records per second, compared to MySQL's 20,000. It looked like an obvious, simple victory by Occam's Razor. What was swept under Occam's Broom: the benchmark was run with write-acknowledgment set to `Unacknowledged` (fire-and-forget)—meaning the database was dropping 15% of writes during network drops without telling the client! In real production with durability turned on, the database was slower than MySQL.

### Business & Strategy
*WeWork's "Community Adjusted EBITDA":* In its 2019 IPO prospectus, co-working company WeWork claimed it was a wildly profitable, asset-light technology platform by inventing a metric called "Community-Adjusted EBITDA." Swept under Occam's Broom: billions of dollars in actual cash lease obligations, office renovation capital expenditures, marketing costs, and corporate administrative bloat. When investors looked under the carpet, the company was hemorrhaging \$2 billion in cash per year.

### Everyday High-Stakes Decisions
*Diet and Miracle Supplements:* A wellness influencer claims that drinking celery juice cured their chronic fatigue and gave them glowing skin, presenting celery as a "simple, natural miracle." Swept under the broom: the influencer also sleeps 9 hours every night, stopped drinking alcohol, exercises with a personal trainer five days a week, and has a private chef cooking organic whole foods. Attributing health to celery juice is pure Occam's Broom.

---

## 4. Failure Modes & Cognitive Blindspots

- **Chronic Cynicism & Paranoia:** Assuming that *every* elegant, simple solution is hiding a sinister secret. True elegance and first-principles simplicity do exist; Occam's Broom is about looking under the carpet to verify, not rejecting simplicity out of hand.
- **Drowning in Accidental Trivialities:** Demanding that a presenter account for every irrelevant atom in the universe, confusing legitimate high-level abstraction (a good map) with malicious concealment.

---

## 5. The Latticework (Related Models)

- **[[Occam's Razor]]**: The foundational model that Occam's Broom mimics and corrupts.
- **[[Confirmation Bias]]**: The psychological engine that makes people blind to the dirt they sweep under the broom.
- **[[Map vs Territory]]**: Occam's Broom intentionally erases rugged mountains from the map to make the hike look easy.

---

## 6. AI Agent Reasoning Protocol

When an AI agent is auditing proposals, benchmarks, or architectural claims:

```text
[STEP 1: INSPECT THE CARPET EDGES]
Identify what standard operational real-world frictions are conspicuously missing from the proposal (e.g., latency, failure recovery, security audits, maintenance costs).

[STEP 2: DEMAND THE OUTLIER TELEMETRY]
Query raw, unfiltered distribution data (p99 latency, worst-case tail performance, failure rates under chaos injection).

[STEP 3: LIFT THE BROOM]
Formulate the exact uncomfortable, unmentioned questions that reveal the hidden operational tax.

[STEP 4: RECALCULATE TRUE TOTAL COST OF OWNERSHIP (TCO)]
Re-evaluate the proposal with the concealed variables restored to the spreadsheet before rendering a verdict.
```
