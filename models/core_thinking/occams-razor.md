---
id: occams-razor
title: Occam's Razor
domain: Epistemology & Scientific Method
category: Core Thinking & Reasoning
summary: Among competing hypotheses or design solutions that predict or achieve identical outcomes, the one requiring the fewest assumptions and simplest components should be selected.
triggers:
  - Over-engineered software architectures and overly convoluted theories
  - Debugging root causes in complex, failing distributed systems
  - Evaluating speculative conspiracies vs straightforward mundane explanations
counter_models:
  - Hickam's Dictum ("Patients can have as many diseases as they damn well please")
  - Conjunction Fallacy
paired_models:
  - Hanlon's Razor
  - First-Principles Thinking
  - Theory of Constraints
---

# Occam's Razor

> "Entities should not be multiplied beyond necessity." — William of Ockham

---

## 1. Core Intuition & Mechanism

Occam's Razor (the principle of parsimony) posits that when multiple explanations or solutions account for the observed facts equally well, the simplest one—the one that requires the fewest unverified assumptions and the fewest moving parts—is most likely to be correct.

In probability, every additional assumption or moving part represents a fractional probability:
$$P(A \land B \land C) \le P(A)$$
The more variables and conditional dependencies you introduce into an explanation or an engineering design, the higher the compound probability that at least one component will fail or be mathematically false.

Simplicity is not merely aesthetic elegance; it is structural resilience. A hypothesis that relies on twelve coordinated coincidences is statistically far less probable than one that relies on a single observable mechanism.

---

## 2. When to Apply (Diagnostic Checklist)

Use this checklist during system architecture, debugging, and strategic evaluation:

- [ ] **Are we introducing theoretical entities, microservices, or layers of abstraction that aren't strictly required by the data?**
- [ ] **Between explanation A (simple, common mechanism) and explanation B (complex chain of extraordinary events), which makes fewer assumptions?**
- [ ] **Could a simpler, boring mechanism fully explain all observed telemetry/symptoms?**
- [ ] **Are we prematurely optimizing for hypothetical edge cases that may never materialize?**
- [ ] **If we strip away the cleverest 30% of this design, does the system still fulfill its core mandate?**

---

## 3. Real-World Case Studies

### Technology & Engineering
*Microservice Sprawl vs. Monolith:* A startup with 3 engineers and 500 daily active users breaks its product into 22 Kubernetes microservices with distributed tracing, service meshes, and gRPC message brokers. The team spends 80% of its time debugging networking timeouts, distributed transactions, and deployment pipeline failures. Applying Occam's Razor: a simple, modular monolithic architecture running on a single robust relational database solves the actual business requirement with a fraction of the failure surface.

### Business & Strategy
*Corporate Strategy and Strategy Consulting:* An executive creates a 90-slide strategy deck featuring intricate matrix organizational restructuring, six new product lines, and synergistic cross-promotions to fix declining revenue. A competitor identifies the real driver: the core product's checkout page has a 4-second latency and an unintuitive payment interface. Fixing the checkout page reverses the revenue decline immediately, validating parsimony over convoluted strategic theater.

### Everyday High-Stakes Decisions
*Medical Diagnostics:* A patient presents with fever, joint aches, fatigue, and headache during influenza season. A junior resident considers an obscure tropical autoimmune disorder requiring complex genetic sequencing. The attending physician invokes parsimony: the patient has the common flu. Rare conditions occur rarely; common conditions occur commonly.

---

## 4. Failure Modes & Cognitive Blindspots

- **Over-Simplification (Crude Reductionism):** As Albert Einstein famously cautioned: *"Everything should be made as simple as possible, but not simpler."* Stripping away essential nuance to force a simple explanation when the underlying reality is genuinely non-linear and complex produces catastrophic error.
- **Hickam's Dictum:** In medicine and complex systems, multiple independent problems often co-exist simultaneously. Assuming a single unifying cause when a system is experiencing multiple concurrent failures leads to misdiagnosis.

---

## 5. The Latticework (Related Models)

- **[[Hanlon's Razor]]**: The psychological parsimony companion: never attribute to malice that which is adequately explained by ignorance or carelessness.
- **[[First-Principles Thinking]]**: Starting from minimal axiomatic building blocks.
- **[[Theory of Constraints]]**: Focus on the single primary bottleneck rather than trying to optimize fifty non-critical components simultaneously.

---

## 6. AI Agent Reasoning Protocol

When an AI agent is proposing an architectural design or diagnosing a bug:

```text
[STEP 1: LIST CANDIDATE HYPOTHESES/DESIGNS]
Enumerate all plausible explanations or designs that satisfy the functional requirements.

[STEP 2: COUNT ASSUMPTIONS & MOVING PARTS]
For each candidate, explicitly count the number of unverified assumptions, external dependencies, and stateful transitions.

[STEP 3: PRUNE PARASITIC COMPLEXITY]
Eliminate candidates that add speculative complexity without measurable performance or explanatory gain.

[STEP 4: SELECT PARSIMONIOUS OPTIMUM]
Select the design with the minimal moving parts that fully satisfies the observable constraints.
```
