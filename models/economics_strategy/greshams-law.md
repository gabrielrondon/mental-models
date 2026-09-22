---
id: greshams-law
title: Gresham's Law
domain: Monetary Economics & Social Dynamics
category: Economics, Strategy & Games
summary: The monetary principle that "bad money drives out good money" when legal tender laws mandate an equal face value between undervalued and overvalued currencies; extended to organizations where bad cultural behavior, sloppy code, or low standards drive out high standards when leadership treats them as equal.
triggers:
  - Codebase quality degradation when sloppy hacks and clean code are reviewed identically
  - Currency crises, hyperinflation, and digital currency adoption (e.g., Bitcoin vs. fiat)
  - Workplace culture decay where toxic political actors drive out top ethical performers
counter_models:
  - Thiers' Law ("Good money drives out bad" when legal exchange rates collapse completely)
paired_models:
  - Adverse Selection & The Market for Lemons
  - Thermodynamics & Entropy
  - Broken Windows Theory
---

# Gresham's Law

> "Bad money drives out good." — Sir Thomas Gresham

---

## 1. Core Intuition & Mechanism

In 1558, English financier Sir Thomas Gresham explained a recurring monetary crisis to Queen Elizabeth I:

In medieval times, coins were made of precious metals (gold and silver). Periodically, monarchs debased the currency by melting the coins down and mixing in cheap copper, while legally decreeing that a debased copper-heavy shilling had the **exact same legal face value** as an old pure silver shilling.

What did citizens do?
- Whenever citizens had to pay taxes or buy bread, they spent the **debased, cheap copper coins ("bad money")**.
- They took the **pure silver coins ("good money")**, took them out of circulation, and hoarded them under their floorboards or melted them down into silver bullion to sell abroad!

The result: pure silver completely vanished from daily circulation, leaving only degraded copper junk circulating in the market: **Bad money drove out good.**

In organizations, software architecture, and social culture, Gresham's Law applies universally whenever **unequal quality is artificially rewarded or tolerated equally**:
- If a management team treats a quick, hacky, un-tested PR with the exact same praise and promotion velocity as a meticulously architected, fully tested PR, engineers stop writing clean code. Writing clean code takes effort; if sloppy code receives identical reward, **sloppy code drives out clean code across the entire engineering department.**
- If toxic, political bullies receive the same compensation as empathetic high-performers, top ethical talent quietly quits and leaves, leaving only political mercenaries behind.

---

## 2. When to Apply (Diagnostic Checklist)

Use this checklist during culture audits, code review policy design, or performance evaluations:

- [ ] **Are we rewarding low-quality output or hacks with the exact same status/pay as high-quality craftsmanship?**
- [ ] **Are our top-performing, high-integrity engineers quietly leaving the company while toxic low-performers stay?**
- [ ] **Has technical debt and copy-paste code become the dominant currency in our codebase because speed was prioritized over rigor?**
- [ ] **Can we establish clear quality differentials (strict code reviews, architecture awards) to protect "good money"?**
- [ ] **Are we hoarding our best talent on legacy maintenance while assigning high-visibility greenfield projects to political actors?**

---

## 3. Real-World Case Studies

### Technology & Engineering
*The GitHub Open-Source Issue Tracker Decay:* A popular open-source repository allows un-templated, 1-sentence bug reports from anonymous users ("it doesnt work fix it"). Maintainers spend hours politely begging for reproduction steps, while thoughtful, meticulously documented bug reports with reproduction repos sit unread in the queue. Experienced contributors realize their high-effort contributions are treated identically to low-effort spam. The good contributors stop filing issues; the repository becomes flooded with low-effort noise: bad issues drove out good.

### Business & Strategy
*Hyperinflation and US Dollars in Latin America:* In countries experiencing hyperinflation (e.g., Venezuela, Argentina, Zimbabwe), the local national currency loses 50% of its purchasing power every month. Citizens immediately spend their local currency the second they receive their paycheck, buying groceries or canned goods before prices rise. Meanwhile, they hoard US dollar bills in private safes. Bad money circulates at lightspeed; good money is hoarded.

### Everyday High-Stakes Decisions
*Office Communication Quality:* In a company where leadership allows vague, passive-aggressive, gossip-filled Slack messages to go unaddressed, high-clarity professional communicators become frustrated and stop participating in public channels. Discourse degrades to the lowest common denominator, until the entire company culture is poisoned.

---

## 4. Failure Modes & Cognitive Blindspots

- **Thiers' Law (The Currency Collapse Reversal):** When the "bad money" becomes so worthless and degraded that vendors refuse to accept it *even under penalty of law*, the dynamic inverts: citizens completely abandon the local fiat currency and conduct transactions exclusively in foreign stable currencies or gold. Good money drives out bad when the legal mandate breaks.
- **Elitism and Perfectionist Paralysis:** Using Gresham's Law to justify blocking every minor pragmatic fix under the false pretense that "anything less than theoretical perfection is bad money."

---

## 5. The Latticework (Related Models)

- **[[Adverse Selection & The Market for Lemons]]**: The close cousin: asymmetric quality uncertainty driving good products out of the market.
- **[[Thermodynamics & Entropy]]**: The natural tendency for sloppy habits (entropy) to displace disciplined order without energy input.
- **[[Broken Windows Theory]]**: Tolerating minor degradation signals that all standards are abandoned.

---

## 6. AI Agent Reasoning Protocol

When an AI agent is evaluating code quality standards or cultural governance:

```text
[STEP 1: AUDIT PARITY IN REWARD/STANDARDS]
Examine whether high-quality and low-quality outputs receive identical peer review scrutiny or operational compensation.

[STEP 2: DETECT HOARDING OR EXODUS]
Track whether high-effort craftsmanship is declining in frequency while low-effort workarounds proliferate.

[STEP 3: ENFORCE AUTOMATED QUALITY DIFFERENTIALS]
Install automated gates: linters, strict static analysis, and code-coverage minimums that make merging "bad money" code physically impossible.

[STEP 4: REWARD CRAFTSMANSHIP PUBLICLY]
Prescribe visible, non-negotiable incentives (promotions, public praise, architectural ownership) for high-integrity craftsmanship to keep "good money" circulating.
```
