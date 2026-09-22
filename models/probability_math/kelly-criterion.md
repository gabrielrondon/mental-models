---
id: kelly-criterion
title: The Kelly Criterion & Position Sizing
domain: Information Theory & Mathematical Finance
category: Probability & Mathematics
summary: A mathematical formula for sizing a series of bets or capital investments to maximize the long-term compound geometric growth rate of wealth while completely eliminating the risk of catastrophic ruin.
triggers:
  - Capital allocation across investments, marketing ad spend, and venture bets
  - Sizing risk exposure on individual initiatives relative to total corporate runway
  - Preventing over-betting on high-conviction opportunities that still carry tail risk
counter_models:
  - Fixed Fractional Betting & Martingale Strategies (dangerous doubling down on losses)
paired_models:
  - Expected Value
  - Ergodicity & Absorbing Barriers
  - Compounding & Exponential Growth
---

# The Kelly Criterion & Position Sizing

> "Over-betting is the fastest way to turn a positive expected value into absolute mathematical bankruptcy." — John Larry Kelly Jr.

---

## 1. Core Intuition & Mechanism

Suppose you are offered a coin-toss bet with an extraordinary advantage:
- **Heads:** You win **\$2** for every \$1 bet (+2 to 1 payoff).
- **Tails:** You lose your **\$1** bet.
- Probability of Heads = **50%**.

The expected value ($\mathbb{E}[X]$) is massively positive (+50% per toss!).
How much of your total net worth should you bet on the first flip?

If you bet **100% of your money**, you have a 50% chance of tripling your wealth, and a **50% chance of going completely broke (absorbing barrier)**. In sequential trials over time, betting 100% guarantees bankruptcy!

In 1956, Bell Labs scientist John L. Kelly Jr. formulated the **Kelly Criterion** using Claude Shannon's information theory:
$$f^* = \frac{bp - q}{b}$$
Where:
- $f^*$ is the fraction of current bankroll to wager,
- $b$ is the net odds received on the wager ($b$ to 1),
- $p$ is the probability of winning,
- $q$ is the probability of losing ($1 - p$).

For the coin bet above:
$$f^* = \frac{(2 \times 0.5) - 0.5}{2} = \frac{1.0 - 0.5}{2} = 0.25 = 25\%$$

The Kelly formula proves that **betting exactly 25% of your bankroll** maximizes the long-term compound geometric growth rate.
- If you bet **less than 25%**, your wealth grows slower.
- If you bet **more than 25%**, you increase volatility and **actually reduce your compound growth rate**, until at 50% your long-term growth rate collapses toward zero!

In business and investing, Kelly teaches us that **position sizing matters as much as being right**.

---

## 2. When to Apply (Diagnostic Checklist)

Use this checklist during capital allocation, marketing ad campaigns, or portfolio construction:

- [ ] **Even though this opportunity has positive expected value, what fraction of our total runway are we risking?**
- [ ] **Are we betting so much capital on a single project that a streak of bad variance could bankrupt the company?**
- [ ] **Are our estimated probabilities realistic, or are we overconfident about our "edge" ($p$)?**
- [ ] **Are we using "Fractional Kelly" (e.g., half-Kelly = 12.5%) to provide an extra margin of safety against miscalculation?**
- [ ] **Is our bet size dynamically recalculating after every win and loss based on our *current* bankroll?**

---

## 3. Real-World Case Studies

### Technology & Engineering
*Google Ad Spend Budgeting for Startups:* A direct-to-consumer startup discovers a profitable Google search ad keyword: every \$1 spent on ads generates \$2.50 in gross customer revenue (a huge +EV edge). Overjoyed, the founder borrows \$500,000 on a short-term credit line and spends it all on ads in three days. Google experiences a tracking pixel outage; conversion tracking breaks; and the ad campaign burns through the \$500,000 without capturing credit card payments. The company enters bankruptcy. Sizing the ad budget at 15% of free weekly cash flow would have captured the edge while effortlessly surviving the telemetry glitch.

### Business & Strategy
*Warren Buffett and Berkshire Hathaway:* Buffett's investment partner Charlie Munger famously noted that Berkshire's capital allocation philosophy is pure Kelly Criterion: *"When the world gives you an opportunity to bet heavily on a no-brainer, you have to bet big. But you never, ever risk the whole store."* Buffett takes massive concentrated positions (e.g., allocating 40% of Berkshire's public stock portfolio to Apple), but always holds at least \$30-50 billion in liquid Treasury bills so the firm can never hit an absorbing barrier.

### Everyday High-Stakes Decisions
*Betting on Startup Equity vs. Diversification:* An early employee joins a promising seed-stage startup. They invest their entire personal life savings into purchasing their stock options on credit. When the startup fails during a funding freeze, the employee loses their job and their entire net worth simultaneously. Allocating an affordable fraction of savings preserves long-term compounding.

---

## 4. Failure Modes & Cognitive Blindspots

- **Full Kelly Volatility & Psychological Ruin:** Pure Full-Kelly betting mathematically maximizes compound wealth, but it experiences stomach-churning 50% to 80% portfolio drawdowns along the way. Most humans panic, abandon the strategy, and sell at the absolute bottom. Seasoned practitioners use **"Half-Kelly"** to cut volatility by 50% while sacrificing only 25% of growth.
- **Overestimating the Edge:** The Kelly formula is brutally sensitive to the probability of winning ($p$). If you believe your win probability is 70% when it is actually 52%, Kelly will prescribe betting so aggressively that you will bankrupt yourself.

---

## 5. The Latticework (Related Models)

- **[[Expected Value]]**: Expected value tells you *whether* to play; the Kelly Criterion tells you *how much* to bet.
- **[[Ergodicity & Absorbing Barriers]]**: The Kelly Criterion is the exact mathematical formula that solves the non-ergodic survival constraint.
- **[[Compounding & Exponential Growth]]**: Kelly maximizes the compound exponent over infinite trials.

---

## 6. AI Agent Reasoning Protocol

When an AI agent is evaluating capital allocation, ad budgets, or project commitments:

```text
[STEP 1: ESTIMATE RAW ADVANTAGE & ODDS]
Quantify the payoff ratio ($b$) and calibrated win probability ($p$). Discount $p$ by 20% to account for epistemic overconfidence.

[STEP 2: RUN KELLY CRITERION FORMULA]
Calculate optimal fraction: $f^* = \frac{bp - q}{b}$. If $f^* \le 0$, veto the allocation immediately.

[STEP 3: APPLY HALF-KELLY SAFETY BUFFER]
Reduce allocation to Fractional Kelly: $f_{\text{safe}} = 0.5 \times f^*$.

[STEP 4: ENFORCE ABSOLUTE RUNWAY CEILINGS]
Verify that the total capital at risk in any single period does not exceed liquid reserve constraints.
```
