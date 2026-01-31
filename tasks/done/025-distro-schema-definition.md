# Task 025 – Distro Schema Definition

## Objective
Define the strict schema for Linux distribution data.

---

## Scope
- src/data/distro-types.ts

---

## Requirements
Schema must include:
- id (stable identifier)
- name
- installerExperience (GUI / MANUAL)
- maintenanceStyle (LOW_FRICTION / HANDS_ON)
- proprietarySupport (FULL / OPTIONAL / NONE)
- suitableForOldHardware (boolean)
- gamingSupport (NONE / LIMITED / GOOD)
- privacyPosture (DEFAULT / STRONG)

No subjective labels allowed.

---

## Definition of Done
- Zod schema compiles
- No free-text decision fields
- Schema can express trade-offs cleanly
