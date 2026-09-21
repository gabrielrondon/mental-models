---
id: anchoring-bias
title: Anchoring & Adjustment
domain: Cognitive Psychology & Behavioral Economics
category: Psychology & Human Behavior
summary: The cognitive bias where an individual relies excessively on the first piece of information encountered (the "anchor") when making subsequent estimations or decisions, making insufficient adjustments away from that initial reference point.
triggers:
  - Price negotiations, enterprise sales contracts, and salary discussions
  - Software engineering sprint estimates and timeline commitments
  - Valuing real estate, technology startups, and public company shares
counter_models:
  - First-Principles Independent Valuation (deriving value from raw inputs before looking at asking prices)
paired_models:
  - Map vs Territory
  - Base Rate Fallacy
  - Confirmation Bias
---

# Anchoring & Adjustment

> "The first number placed on the table exerts a gravitational pull on all subsequent thinking." — Daniel Kahneman

---

## 1. Core Intuition & Mechanism

In a famous 1974 experiment by Daniel Kahneman and Amos Tversky, participants were asked to spin a roulette wheel rigged to stop on either **10** or **65**.

Immediately after the wheel stopped, participants were asked:
*"Is the percentage of African nations in the United Nations higher or lower than the number on the wheel?"*

Then they were asked: *"What is your best estimate of the actual percentage?"*

The roulette wheel number was completely random and obviously irrelevant to African geopolitics.
Yet:
- People who saw **10** estimated the average percentage at **25%**.
- People who saw **65** estimated the average percentage at **45%**!

The arbitrary initial number acted as a cognitive **anchor**. Once an anchor is dropped in the mind, subsequent rational deliberation does not start from a blank slate; it starts at the anchor and makes minor, hesitant adjustments along a narrow tether.

In salary negotiations, real estate listings, and project timelines, whoever states the first number subtly commands the cognitive territory.

---

## 2. When to Apply (Diagnostic Checklist)

Use this checklist during negotiations, sprint estimations, or asset pricing:

- [ ] **Was our project deadline or budget dictated by a client's arbitrary first number rather than our bottom-up estimation?**
- [ ] **Are we evaluating this vendor's "50% discount" against an inflated, fictional list price designed solely as an anchor?**
- [ ] **Did I calculate my valuation independently before looking at the counterparty's asking price?**
- [ ] **In negotiations: can we drop the first ambitious, well-justified anchor to establish the gravitational center?**
- [ ] **Is our engineering team anchoring on legacy story-point estimates that no longer reflect modern tooling velocity?**

---

## 3. Real-World Case Studies

### Technology & Engineering
*Software Project Estimation (The Executive Anchor):* During an initial kickoff meeting, an executive casually remarks: *"I'm hoping we can ship this mobile overhaul by Thanksgiving."* When the engineering team later sits down to estimate the actual work, they do not calculate from first principles. Anchored to Thanksgiving, they shave off test coverage, cut scope, and convince themselves that 6 months of work can miraculously fit into 8 weeks. When the deadline is inevitably missed with crippling bugs, the team wonders why they committed to an impossible schedule.

### Business & Strategy
*Menu Design & Enterprise Pricing Tier Anchoring:* A luxury restaurant places a \$250 dry-aged ribeye at the top of the menu. Almost no one buys it. However, the presence of the \$250 anchor makes the \$65 salmon and \$55 pasta look like reasonable, moderate bargains! Similarly, SaaS companies introduce an "Enterprise Platinum" tier at \$5,000/month solely to make the \$499/month tier feel accessible.

### Everyday High-Stakes Decisions
*Salary Negotiations:* An engineer applying for a job is asked on an initial phone screen: *"What is your current salary?"* Stating their past \$80,000 salary immediately anchors the employer's offer to \$90,000, even though the company had budgeted up to \$150,000 for the role. Professional negotiators deflect early salary questions or anchor high with market research data.

---

## 4. Failure Modes & Cognitive Blindspots

- **The Insulting Anchor (Negotiation Blow-Up):** Dropping an anchor that is so absurdly aggressive or insulting that the counterparty walks away from the table entirely rather than negotiating. The anchor must remain within the boundary of plausible credibility.
- **Anchoring on Past Glory:** Holding onto a stock or crypto asset that crashed from \$500 to \$50 because you are anchored to the \$500 all-time high, refusing to accept that the company's fundamentals have permanently deteriorated.

---

## 5. The Latticework (Related Models)

- **[[Map vs Territory]]**: Confusing the arbitrary anchor (the map) with intrinsic economic value (the territory).
- **[[First-Principles Thinking]]**: The intellectual antidote: calculate value bottom-up from axioms before looking at the market price.
- **[[Confirmation Bias]]**: Seeking out data points that justify why the anchor was reasonable.

---

## 6. AI Agent Reasoning Protocol

When an AI agent is evaluating estimates, negotiations, or valuations:

```text
[STEP 1: DETECT THE INITIAL ANCHOR]
Identify the first quantitative value, deadline, or price mentioned in the context.

[STEP 2: QUARANTINE THE ANCHOR]
Temporarily hide the anchor from the calculation pipeline.

[STEP 3: EXECUTE BOTTOM-UP INDEPENDENT ESTIMATION]
Calculate the timeline, cost, or valuation using first principles, historical velocity, and component task breakdowns.

[STEP 4: MEASURE THE DISPARITY]
Compare the independent estimate against the anchor. Flag any cognitive distortion or wishful scope-cutting intended solely to fit the anchor.
```
