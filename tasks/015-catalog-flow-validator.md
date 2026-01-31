# Task 015 – Catalog ↔ Flow Alignment Validator

## Objective
Prevent drift between the Question Catalog and the runtime question flow.

---

## Scope
- scripts/validate-question-catalog.ts
- package.json scripts

---

## Requirements
- Ensure every question ID in questions.ts exists in QUESTION_CATALOG.md
- Ensure no undocumented question IDs are used
- Fail CI with clear error messages

---

## Definition of Done
- npm run validate:questions fails on mismatch
- Validator is deterministic and readable
