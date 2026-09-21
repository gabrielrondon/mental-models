# Contributing to The Mental Models Latticework

We welcome contributions to expand and refine this open-source latticework of mental models. Our mission is to provide the most rigorous, practically actionable, and machine-readable repository of mental models in existence.

---

## Guiding Principles

1. **Rigorous & First-Principles Grounding**: Every model must trace back to fundamental laws of physics, biology, mathematics, economics, systems science, or cognitive psychology.
2. **Neutral & Timeless**: Focus on the scientific and philosophical origins (e.g., thermodynamics, natural selection, Bayesian inference, game theory) rather than contemporary popularizers or individual brand names.
3. **Actionable over Academic**: Every model must feature a concrete **Diagnostic Checklist** and an **AI Agent Reasoning Protocol**. If a reader cannot use it to make a better decision, it does not belong in this library.
4. **Single Source of Truth**: All models are written in English in `models/<category>/<model-name>.md` and adhere strictly to the template schema in `templates/model-template.md`.

---

## How to Add a New Model

1. **Pick or Propose a Model**: Check existing files in `models/` to ensure it is not already covered under a different name.
2. **Use the Template**: Copy `templates/model-template.md` to the appropriate category directory:
   ```bash
   cp templates/model-template.md models/<category>/<new-model-id>.md
   ```
3. **Fill Out All Sections**:
   - YAML Frontmatter (`id`, `title`, `domain`, `category`, `summary`, `triggers`, `counter_models`, `paired_models`).
   - Core Intuition & Mechanism.
   - When to Apply (Diagnostic Checklist).
   - Real-World Case Studies (Tech, Business, Everyday Decisions).
   - Failure Modes & Cognitive Blindspots.
   - The Latticework (wikilinks to other models `[[Model Name]]`).
   - AI Agent Reasoning Protocol.
4. **Run Validation**:
   ```bash
   python3 scripts/validate_models.py
   ```
   All models must pass validation without errors or broken links.
5. **Submit a Pull Request**: Provide a clear description of the model, its originating discipline, and how it connects to existing nodes in the latticework.

---

## Directory Structure & Categories

- `core_thinking/`: Foundational reasoning, epistemology, and logic.
- `systems_complexity/`: Feedback loops, non-linearity, emergence, and dynamics.
- `probability_math/`: Risk, expected value, priors, and probabilistic thinking.
- `economics_strategy/`: Incentives, competitive dynamics, trade-offs, and payoffs.
- `evolution_biology/`: Adaptation, natural selection, survival, and biological constraints.
- `psychology_cognition/`: Cognitive biases, heuristics, perception, and human behavior.
- `physics_engineering/`: Invariant constraints, mechanics, safety, and structural laws.
- `operations_strategy/`: Execution tempo, conflict, maneuver, and operational resilience.
