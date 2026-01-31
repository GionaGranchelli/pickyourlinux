# Task 034 – Frontend Harness Layout (App Shell)

## Objective
Create a minimal app shell to host the wizard + results.

## Scope
- app.vue (or layouts/default.vue)
- pages/index.vue

## Requirements
- Single page flow:
    - If status IN_PROGRESS -> render QuestionWizard
    - If status COMPLETED -> render ResultsView
    - If status DISQUALIFIED -> render DisqualifiedView
- No business logic in components; only status-based rendering.

## Definition of Done
- Visiting `/` shows the wizard
- Completion routes to results (no navigation needed)
