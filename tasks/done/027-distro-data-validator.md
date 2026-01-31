# Task 027 – Distro Data Validator

## Objective
Ensure distro data integrity in CI.

---

## Scope
- scripts/validate-distros.ts
- package.json scripts

---

## Requirements
- Validate distros.json against schema
- Fail with clear messages on:
    - missing attributes
    - invalid enum values
    - duplicate IDs

---

## Definition of Done
- npm run validate:distros exists
- CI fails on invalid distro data
