# Task 009 – Recommendation Engine (Phase 2)

## Objective
Filter Linux distributions deterministically.

## Scope
- src/engine/recommend.ts
- src/data/distros.json
- src/data/distro-types.ts

## Requirements
- Rule-based elimination only
- No weighted scores
- Output explanation per distro:
    - includedReason
    - excludedReason

## Definition of Done
- Engine filters distros based on UserIntent
- Explanations are explicit
