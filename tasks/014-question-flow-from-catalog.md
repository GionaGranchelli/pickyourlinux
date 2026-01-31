# Task 014 – Build Question Flow from Human-Centered Catalog

## Objective
Rewrite `src/data/questions.ts` so that **all questions strictly follow** `docs/QUESTION_CATALOG.md`.

This task translates human-centered questions into deterministic DSL objects.

---

## Scope
- src/data/questions.ts

---

## Constraints
- DO NOT invent new questions
- DO NOT introduce technical language
- DO NOT modify schemas or engine logic
- Every question MUST exist in QUESTION_CATALOG.md

---

## Requirements
- Implement a minimal linear flow using catalog questions
- Use showIf only where explicitly documented
- Ensure all patches match UserIntentSchema

---

## Definition of Done
- questions.ts validates via QuestionSchema
- Flow can be rendered end-to-end
- No drift from catalog wording or intent mapping
