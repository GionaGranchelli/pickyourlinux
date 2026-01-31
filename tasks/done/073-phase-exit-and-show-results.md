# Task 073 – Phase Exit (Show Results Early)

## Objective
Allow users to stop after beginner phase and still get results.

## Scope
- engine/state.ts
- UI

## Requirements
- After beginner phase completes, if experience=BEGINNER -> status COMPLETED
- For INTERMEDIATE/ADVANCED -> prompt:
    - “See results now” OR “Refine further”
      This must be deterministic:
- Implement as an explicit question that sets experience? or a control flag (if you refuse new schema fields, implement as a question whose options either:
    - set experience to BEGINNER (finish) OR keep as is (continue))

## Definition of Done
- Users can end early without hacks
- No UI-only branching
