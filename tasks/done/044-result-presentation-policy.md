# Task 044 – Result Presentation Policy (Cardinality Control)

## Objective
Prevent overwhelming users with too many compatible distros while remaining deterministic.

## Context
The engine may return 10+ compatible distros. This is correct but unusable.

## Requirements
- Introduce a deterministic presentation rule:
    - Default: show first N compatible distros (N = 3 or 5)
    - Order must be stable and explainable (e.g. alphabetical by id)
- Provide "Show all compatible distros" toggle in UI
- No scoring, no ranking, no weights

## Definition of Done
- Default results view shows limited set
- User can expand to see full list
- Engine output remains unchanged
