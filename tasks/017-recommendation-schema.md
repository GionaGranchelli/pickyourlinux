# Task 017 – Recommendation Output Schema

## Objective
Define the deterministic output format for distro recommendations.

---

## Scope
- src/data/recommendation-types.ts

---

## Requirements
- Define RecommendedDistro schema with:
    - distroId
    - includedReason[]
    - excludedReason[]
    - matchedTags[]
- No scoring or ranking fields

---

## Definition of Done
- Schema compiles
- Can represent both inclusion and exclusion explanations
