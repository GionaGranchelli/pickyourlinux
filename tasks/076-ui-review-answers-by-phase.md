# Task 076 – Review Answers by Phase

## Objective
Let users see what they answered without editing raw JSON.

## Scope
- components/ReviewAnswers.vue
- state exports answered question objects

## Requirements
- Show answered questions grouped by phase (based on question metadata or id prefix)
- Provide “jump back” to a specific question (uses state undo/restore, no UI logic)

## Definition of Done
- Users can review and change earlier choices safely
