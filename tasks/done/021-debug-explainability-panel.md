# Task 021 – Explainability Debug Panel

## Objective
Expose decision reasoning for development and QA.

---

## Scope
- src/components/DebugPanel.vue
- engine/state.ts (read-only access)

---

## Requirements
- Show:
    - UserIntent
    - Applied patches
    - Skipped questions
    - Exclusion reasons
- Dev-only visibility

---

## Definition of Done
- Developers can trace every decision
