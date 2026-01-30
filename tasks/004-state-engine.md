# Task 004 – Decision State Engine

## Objective
Implement the reactive decision engine that orchestrates the flow.

## Scope
- src/engine/state.ts

## Requirements
- Implement useDecisionEngine composable
- Track:
    - intent
    - answeredIds (order matters)
    - status (IN_PROGRESS | COMPLETED | DISQUALIFIED)
- Navigation must be ID-based (not index-based)
- Undo must restore full state

## Definition of Done
- Flow progresses deterministically
- Undo restores intent + progress + status
