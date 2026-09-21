---
id: expected-value
title: Expected Value
domain: Probability & Decision Theory
category: Probability & Mathematics
summary: The anticipated value of an investment, decision, or action calculated by multiplying each possible outcome by its mathematical probability and summing the results.
triggers:
  - High-stakes bets, capital allocation, and risky product feature launches
  - Making decisions under uncertainty where outcomes have extreme variability
  - When a choice has a high probability of a small gain but a tiny probability of total ruin
counter_models:
  - Ergodicity & Ruin Constraints (expected value is invalid if a loss causes game-over extinction)
paired_models:
  - Asymmetric Payoffs
  - Base Rate Fallacy
  - Ergodicity
  - Margin of Safety
---

# Expected Value

> "Take the probability of loss times the amount of possible loss from the probability of gain times the amount of possible gain. That is what we're trying to do."

---

## 1. Core Intuition & Mechanism

Expected Value ($\mathbb{E}[X]$) is the foundational mathematical compass for making rational decisions under uncertainty. It quantifies the long-run average outcome if an identical decision were made repeatedly across thousands of trials:

$$\mathbb{E}[X] = \sum_{i=1}^{n} P(x_i) \cdot x_i$$

Where $P(x_i)$ is the probability of outcome $i$, and $x_i$ is the payoff (positive or negative) of that outcome.

Most humans judge decisions by their **outcomes** rather than the **process** (a bias known as *resulting*):
- If you make a +EV bet with an 80% chance of winning \$100 and a 20% chance of losing \$100, and you happen to hit the 20% loss, you did not make a bad decision; you experienced bad variance.
- Conversely, driving home intoxicated without crashing is a catastrophic -EV decision that happened to have a lucky outcome.

Rational strategy requires making decisions that consistently generate positive expected value, while ensuring that the cost of negative outcomes never crosses the threshold of irreversible ruin.

---

## 2. When to Apply (Diagnostic Checklist)

Use this checklist before allocating capital, launching features, or taking strategic risks:

- [ ] **Have we enumerated all plausible outcomes, including fat-tail black swan events?**
- [ ] **Are we using objective Bayesian probabilities calibrated against real base rates?**
- [ ] **What is the mathematical Expected Value ($\sum P \times \text{Payoff}$)? Is it firmly positive?**
- [ ] **Does any single possible outcome carry an infinite negative penalty (bankruptcy, death, imprisonment, total reputational wipeout)?**
- [ ] **Are we evaluating this decision by the rigor of its expected value calculation rather than emotional fear or greed?**

---

## 3. Real-World Case Studies

### Technology & Engineering
*Investing in Automated Test Suites:* A development team debates spending 3 weeks building comprehensive automated end-to-end regression tests.
- Cost: 3 weeks of 3 developers = \$30,000.
- Outage Risk without tests: 40% chance per year of a critical production outage causing \$250,000 in customer SLA penalties and churn.
- Expected Annual Cost of Outage = $0.40 \times \$250,000 = \$100,000$.
- Expected Value in Year 1 = $+\$70,000$, compounding every subsequent year. The investment is massively +EV.

### Business & Strategy
*R&D Drug Discovery in Pharmaceuticals:* A biotech firm spends \$50 million developing a novel oncology compound. The probability of navigating Phase I, II, and III clinical trials and obtaining FDA approval is only 8%. However, if approved, the present value of global revenue is \$2.5 billion.
- $\mathbb{E}[X] = (0.08 \times \$2,500,000,000) - \$50,000,000 = \$200,000,000 - \$50,000,000 = +\$150,000,000$.
- Even with a 92% failure rate, the project represents massive positive expected value.

### Everyday High-Stakes Decisions
*Playing the Lottery:* A state lottery ticket costs \$5. The jackpot is \$100 million with winning odds of 1 in 300 million. The expected value is:
$$\mathbb{E}[X] = \left(\frac{1}{300,000,000} \times \$100,000,000\right) - \$5 \approx \$0.33 - \$5.00 = -\$4.67$$
Every single ticket purchased represents a voluntary surrender of \$4.67 in expected wealth.

---

## 4. Failure Modes & Cognitive Blindspots

- **The Petersburg Paradox & Ergodicity Failure:** Expected value assumes an *ensemble average* (averaging outcomes across millions of parallel universes). In individual real life, you experience a *time average*. If an outcome carries a 1% chance of total liquidation, you will eventually go bankrupt, rendering positive mathematical EV completely moot (see [[Ergodicity]]).
- **Garbage In, Garbage Out:** Inventing arbitrary probabilities and valuations out of thin air to justify a gut emotional preference under the guise of pseudo-rigorous math.

---

## 5. The Latticework (Related Models)

- **[[Ergodicity]]**: The non-negotiable prerequisite. You can only play +EV games if you survive the downside.
- **[[Asymmetric Payoffs]]**: Structuring bets where the upside is vast and the downside is capped.
- **[[Base Rate Fallacy]]**: Ensuring the probabilities fed into your EV formula reflect historical reality.

---

## 6. AI Agent Reasoning Protocol

When an AI agent is evaluating a strategic dilemma:

```text
[STEP 1: ENUMERATE MUTUALLY EXCLUSIVE SCENARIOS]
List best-case, base-case, and worst-case outcomes for each candidate path.

[STEP 2: ASSIGN CALIBRATED PROBABILITIES]
Assign probabilities that sum to 1.0, explicitly checking historical base rates for support.

[STEP 3: CALCULATE EXPECTED VALUE]
Multiply assigned probabilities by numerical impact (revenue, latency, risk score) and calculate net EV.

[STEP 4: SCREEN FOR ABSORBING BARRIERS]
Verify that no negative branch breaches the ruin threshold. If ruin is possible, disqualify the path regardless of EV.
```
