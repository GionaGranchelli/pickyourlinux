# Task 031 – Compatibility Result Schema

## Objective
Define the schema for compatibility results shown to the user.

---

## Scope
- src/data/compatibility-types.ts

---

## Requirements
Schema must include:
- distroId
- compatible (boolean)
- includedBecause: string[]
- excludedBecause: string[]

---

## Definition of Done
- Schema validates engine output
- Can fully explain every decision
