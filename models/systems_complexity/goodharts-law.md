---
id: goodharts-law
title: Goodhart's Law
domain: Economics & Cybernetics
category: Systems & Complexity
summary: When a measure becomes a target, it ceases to be a good measure, because actors will optimize to maximize the target while corrupting the underlying process it was intended to represent.
triggers:
  - Setting KPIs, OKRs, and bonus incentives for teams
  - Monitoring developer productivity metrics (e.g., commit count, PR count, story points)
  - Gaming of search engine rankings, algorithmic metrics, or academic citation counts
counter_models:
  - Balanced Scorecards & Holistically Coupled Constraints (counterbalancing metrics)
paired_models:
  - Second-Order Thinking
  - Map vs Territory
  - Principal-Agent Problem
---

# Goodhart's Law

> "When a measure becomes a target, it ceases to be a good measure." — Charles Goodhart

---

## 1. Core Intuition & Mechanism

Suppose a hospital measures emergency room quality by tracking *"Percentage of patients admitted to an exam room within 4 horas."* It seems like a reasonable proxy for patient care.

However, once hospital administrators make that metric a formal KPI tied to departmental bonuses, doctors and nurses adapt. In the UK, some hospitals began leaving ambulances parked in the driveway with dying patients inside because the 4-hour clock only started ticking once the patient crossed the physical hospital threshold. Other hospitals moved chairs into hallways and called them "observation units."

The target was hit with 99% compliance, while actual patient care degraded catastrophically.

This dynamic is universal. **Campbell's Law** states the identical truth in sociology: *"The more any quantitative social indicator is used for social decision-making, the more subject it will be to corruption pressures."*

Human beings are intelligent, adaptive agents. When you reward a simplistic numerical proxy (the map), people will ruthlessly optimize the proxy while ignoring or actively damaging the underlying reality (the territory).

---

## 2. When to Apply (Diagnostic Checklist)

Use this checklist when designing OKRs, executive bonuses, or operational scorecards:

- [ ] **If people optimize 100% to maximize this metric, what negative unintended behaviors will they execute?**
- [ ] **Are we confusing the proxy metric (e.g., lines of code, test coverage %) with true business/system value?**
- [ ] **Can this metric be trivially gamed without creating real-world customer value?**
- [ ] **Have we paired this quantity metric with an opposing quality constraint (e.g., velocity paired with defect escape rate)?**
- [ ] **Are we auditing the ground reality periodically rather than staring exclusively at automated dashboards?**

---

## 3. Real-World Case Studies

### Technology & Engineering
*Measuring Developers by Code Output or Test Coverage:* A company decrees that all developers must achieve 95% unit test coverage. Developers quickly write thousands of meaningless assertions that call methods without actually validating state, or generate automated mock loops that touch every file to turn the CI pipeline green. Code coverage jumps to 98%, but critical bugs continue escaping to production. The measure became the target, corrupting testing integrity.

### Business & Strategy
*Call Center Average Handling Time (AHT):* A customer support department rewards agents who resolve calls in under 3 minutes. Agents quickly realize they can hit their bonus by hanging up on complex, angry customers, claiming "the call disconnected," and taking three easy password-reset tickets. Customer churn explodes, even though executive dashboards show all-time high agent efficiency.

### Everyday High-Stakes Decisions
*Academic Publication Metrics (The H-Index & Citations):* Academics evaluated by citation counts and volume of papers published form "citation cartels"—informal networks of researchers who agree to cite each other's papers in every bibliography. Thousands of low-value, derivative papers are published to game the metric, clogging scientific literature with noise.

---

## 4. Failure Modes & Cognitive Blindspots

- **Measurement Nihilism:** Concluding that because metrics can be gamed, organizations should measure nothing and run entirely on gut feel. Metrics remain essential; they must simply be treated as **imperfect diagnostic indicators**, never as infallible autonomous targets.
- **The Metric Overload Trap:** Adding 50 simultaneous metrics to prevent gaming, creating so much bureaucratic reporting friction that real operational work grinds to a halt.

---

## 5. The Latticework (Related Models)

- **[[Map vs Territory]]**: Confusing the performance dashboard (the map) with actual operational health (the territory).
- **[[Second-Order Thinking]]**: Projecting the perverse incentive loops that emerge when targets are tied to compensation.
- **[[Principal-Agent Problem]]**: How employees optimize for their personal compensation rather than the firm's long-term prosperity.

---

## 6. AI Agent Reasoning Protocol

When an AI agent is evaluating metrics, evaluation suites, or reward models:

```text
[STEP 1: ISOLATE THE PROXY METRIC]
Identify the specific numerical variable being targeted or optimized.

[STEP 2: SIMULATE ADVERSARIAL EXPLOITATION]
Imagine an actor whose sole goal is to maximize the metric with the lowest possible expenditure of authentic effort. What shortcuts do they take?

[STEP 3: DESIGN BALANCING CONSTRAINTS]
Pair the primary target with an orthogonal balancing metric (e.g., Pair Speed with Error Rate; Pair Acquisition with 90-day Retention).

[STEP 4: RECOMMEND QUALITATIVE AUDITS]
Include periodic human-in-the-loop qualitative spot-checks that cannot be algorithmically anticipated or gamed.
```
