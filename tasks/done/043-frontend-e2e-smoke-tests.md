# Task 043 – Frontend Smoke Tests (Minimal)

## Objective
Add minimal automated tests to ensure the UI flow is wired correctly.

## Scope
- tests/ui/wizard.spec.ts (Vitest + Vue Test Utils) OR Playwright if already included (no new deps).

## Requirements
- Test that:
    - first question renders
    - selecting an option advances
    - undo returns to previous question
- Do not test distro correctness here (engine tests cover that).

## Definition of Done
- Smoke tests pass and validate core wiring
