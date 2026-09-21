---
name: mental-models
description: Consult and apply the Mental Models Latticework to analyze engineering architecture, evaluate strategic decisions, conduct pre-mortems, and eliminate cognitive biases.
---

# Mental Models Latticework Skill

This skill equips an AI agent with the ability to query, cross-examine, and apply multidisciplinary mental models from `models/` to any complex dilemma, code proposal, or strategic decision.

---

## When to Use This Skill

Activate this skill when:
- **Architecture & Refactoring Decisions:** Evaluating whether to delete, refactor, or rewrite critical subsystems (e.g., [[Chesterton's Fence]], [[First-Principles Thinking]], [[Second-Order Thinking]]).
- **Risk & Reliability Engineering:** Conducting pre-mortems, designing circuit breakers, and assessing catastrophic tail risks (e.g., [[Inversion]], [[Margin of Safety]], [[Ergodicity]], [[Antifragility]]).
- **Performance & Capacity Bottlenecks:** Deciding where to optimize a system with sequential dependencies (e.g., [[Theory of Constraints]], [[Feedback Loops]]).
- **Strategic Prioritization & Trade-offs:** Allocating engineering time, capital, and roadmap focus (e.g., [[Opportunity Cost]], [[Expected Value]], [[Asymmetric Payoffs]]).
- **Cognitive Debiasing:** Checking human assumptions against historical data and cognitive traps (e.g., [[Base Rate Fallacy]], [[Loss Aversion]], [[Map vs Territory]], [[Hanlon's Razor]]).

---

## How to Consult the Library

The library resides in `models/` within the repository. You can interact with it via the CLI or by reading the markdown files directly.

### CLI Commands Available
```bash
# Search for models relevant to a domain or concept
./cli/mm search "uncertainty"

# Diagnose a specific dilemma and obtain recommended model triads
./cli/mm diagnose "We want to replace an old legacy microservice"

# Inspect the full diagnostic checklist and agent protocol of a model
./cli/mm show chestertons-fence
```

---

## Multi-Perspective Decision Protocol

When tasked with conducting a **Mental Models Evaluation** on a proposal or PR, structure your response as follows:

```markdown
### 1. Situational Diagnosis
- **Core Dilemma**: [Clear statement of the architectural or strategic choice]
- **Relevant Models**: [3-4 models selected from the latticework, e.g., Chesterton's Fence, Second-Order Thinking, Margin of Safety]

### 2. Multi-Model Cross-Examination
- **Perspective A ([[Model 1]])**: [What does this lens reveal? What failure mode does it anticipate?]
- **Perspective B ([[Model 2]])**: [What does the complementary lens suggest?]
- **Counter-Perspective ([[Counter-Model]])**: [What is the danger of over-applying Perspective A?]

### 3. Concrete Diagnostic Checklist
- [ ] [Key question from Model 1's checklist]
- [ ] [Key question from Model 2's checklist]

### 4. Synthesis & Prescribed Action
[Definitive, actionable recommendation with specific safeguards and invariants]
```
