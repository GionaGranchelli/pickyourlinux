# Task 045 – Human-Readable Reason Templates

## Objective
Normalize inclusion/exclusion explanations so they feel intentional and consistent.

## Context
Raw reason strings from rules can feel technical or uneven.

## Requirements
- Introduce a reason template layer:
    - Input: rule key / constraint key
    - Output: human-readable sentence
- Example:
    - maintenance=NO_TERMINAL → "You said you don’t want to use the terminal"
- No logic duplication; mapping only

## Definition of Done
- All results use templates
- No raw rule text exposed to users
