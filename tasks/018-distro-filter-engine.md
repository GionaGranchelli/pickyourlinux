018-distro-filter-engine.md# Task 018 – Deterministic Distro Filter Engine

## Objective
Implement rule-based filtering of distros using UserIntent.

---

## Scope
- src/engine/recommend.ts

---

## Requirements
- Binary elimination only (pass/fail)
- No weighted scores
- Every exclusion must include a reason
- Use only schema-defined attributes

---

## Definition of Done
- Engine returns explainable results
- No hardcoded distro IDs
