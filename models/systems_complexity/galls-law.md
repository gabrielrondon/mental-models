---
id: galls-law
title: Gall's Law
domain: Systems Engineering & Cybernetics
category: Systems & Complexity
summary: The rule of thumb that a complex system that works is invariably found to have evolved from a simple system that worked; conversely, a complex system designed from scratch never works and cannot be patched to make it work.
triggers:
  - Big-bang legacy system rewrites and multi-year greenfield software projects
  - Designing brand-new enterprise workflows or large-scale distributed architectures
  - When multi-million-dollar software initiatives collapse upon launch
counter_models:
  - First-Principles Modular Synthesis (building clean, minimal working modules from scratch)
paired_models:
  - Theory of Constraints
  - Chesterton's Fence
  - Feedback Loops
---

# Gall's Law

> "A complex system that works is invariably found to have evolved from a simple system that worked. A complex system designed from scratch never works and cannot be patched to make it work. You have to start over with a working simple system." — John Gall

---

## 1. Core Intuition & Mechanism

In 1975, pediatrician and systems theorist John Gall published *Systemantics*, documenting a fundamental law of engineering and institutional design:

You **cannot** sit down in a conference room with a blank sheet of paper and architect an intricate, 50-service complex distributed system from scratch and expect it to work in production.

Why?
Complex systems possess countless non-linear interactions, feedback loops, race conditions, edge-case failure modes, and human behavioral nuances that no human brain or architecture diagram can anticipate in advance.

A complex system that **works in the real world** (like the human immune system, the internet, Linux, or Amazon) did *not* begin as a complex system. It began as a tiny, simple, crude system that **worked reliably**. Through decades of real-world evolutionary stress, bugs, traffic shocks, and incremental adaptations, it gradually added layers of complexity while maintaining its operational equilibrium.

Attempting a "Big-Bang" launch of an un-evolved complex system invariably produces catastrophic failure.

---

## 2. When to Apply (Diagnostic Checklist)

Use this checklist during architecture planning, enterprise migrations, or product scoping:

- [ ] **Are we attempting to design and launch an intricate, multi-layered complex system from scratch in one giant release?**
- [ ] **What is the simplest, working, end-to-end prototype we can deploy to production this week? (Tracer Bullet / Walking Skeleton)**
- [ ] **Have we verified that every layer in our architecture has been empirically proven under real load before adding the next layer?**
- [ ] **Are we trying to "patch" a fundamentally broken big-bang system that never worked in the first place?**
- [ ] **Can we break this multi-year enterprise rewrite into 20 incremental, working evolutionary steps (Strangler Fig Pattern)?**

---

## 3. Real-World Case Studies

### Technology & Engineering
*The FBI Virtual Case File (VCF) Catastrophe:* In 2001, the FBI launched a \$170 million project to replace its antiquated paper-based case management system. Rather than incrementally evolving working modules, contractors attempted to build an all-encompassing, massive, monolithic system from scratch covering every possible investigative workflow. After three years and \$170 million spent, the system was a tangled, unusable mess of 700,000 lines of brittle code that crashed constantly. In 2005, the entire project was scrapped and written off as a complete loss—a textbook victim of Gall's Law.

### Business & Strategy
*The Evolution of Amazon:* Amazon did not begin in 1994 as a global logistics network with AWS cloud computing, Prime video streaming, grocery stores, and robotic warehouses. It began as a simple, working web page that sold books out of a garage. Once the simple book delivery system worked, they evolved to CDs, then electronics, then marketplace sellers, then cloud infrastructure. Each complex layer was built upon an already functional foundation.

### Everyday High-Stakes Decisions
*Writing a Book or PhD Thesis:* An aspiring author attempts to write an epic 1,000-page historical fiction masterpiece from scratch on day one, becoming overwhelmed by character webs and plot holes, ultimately abandoning the manuscript. A wiser author writes a simple, compelling 10-page short story that works. Once the core narrative works, they expand it into a novella, and eventually into an epic novel.

---

## 4. Failure Modes & Cognitive Blindspots

- **The Stagnation Trap (Never Adding Complexity):** Gall's Law does not forbid complexity; it dictates the *sequence* of how complexity must be achieved. Refusing to ever evolve beyond a primitive script out of fear of complexity stunts organizational potential.
- **Accidental Complexity vs. Essential Complexity:** Confusing the natural evolutionary complexity required by real-world edge cases with gratuitous architectural bloat.

---

## 5. The Latticework (Related Models)

- **[[Chesterton's Fence]]**: Understanding that existing complex systems look ugly precisely because they evolved to survive real-world scars.
- **[[Feedback Loops]]**: Evolving systems rely on rapid real-world feedback loops to shape each incremental layer.
- **[[Antifragility]]**: Incremental evolution allows systems to absorb small errors and grow stronger, whereas big-bang designs are profoundly fragile.

---

## 6. AI Agent Reasoning Protocol

When an AI agent is asked to architect a large-scale system:

```text
[STEP 1: IDENTIFY THE MINIMAL WORKING NUCLEUS]
Strip away all advanced features and isolate the single, simplest end-to-end loop that delivers core value.

[STEP 2: ENFORCE PRODUCTION GROUNDING]
Mandate that the nucleus be deployed, tested, and validated under real conditions before expanding scope.

[STEP 3: MAP EVOLUTIONARY STAGES]
Design an incremental roadmap (Phase 1, Phase 2, Phase 3) where each stage preserves systemic stability.

[STEP 4: REJECT BIG-BANG GREENFIELD REWRITES]
If presented with a proposal to rewrite a complex legacy system from scratch, recommend the Strangler Fig evolutionary pattern instead.
```
