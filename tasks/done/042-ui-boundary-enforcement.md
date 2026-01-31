# Task 042 – Enforce Dumb UI Boundaries (ESLint)

## Objective
Prevent UI components from importing engine VM logic directly.

## Scope
- ESLint config

## Requirements
- Disallow imports from:
    - ~/engine/logic
    - ~/engine/eliminate
    - ~/engine/compatibility
- Allow importing only from:
    - ~/engine/state (or composables as defined)
    - data files

## Definition of Done
- Lint fails if a UI component imports forbidden engine modules
