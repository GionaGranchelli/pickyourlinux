# Task 041 – Skipped Questions Explainability

## Objective
Expose why questions are hidden (showIf false) for debugging.

## Scope
- src/engine/state.ts (or a helper)
- DebugPanel UI

## Requirements
- Compute `skippedQuestions` as:
    - questionId
    - serialized showIf condition
- Must not execute logic in UI; state engine computes and exposes it.

## Definition of Done
- DebugPanel lists skipped questions + showIf JSON
