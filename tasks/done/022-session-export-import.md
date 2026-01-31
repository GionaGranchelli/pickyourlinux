# Task 022 – Session Export / Import

## Objective
Allow sharing and restoring sessions deterministically.

---

## Scope
- src/engine/state.ts

---

## Requirements
- Export full session to JSON
- Import + validate via schemas
- No partial restores

---

## Definition of Done
- Reloading session produces identical behavior
