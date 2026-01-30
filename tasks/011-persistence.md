# Task 011 – Session Persistence

## Objective
Allow restoring a session deterministically.

## Scope
- src/engine/state.ts

## Requirements
- Serialize intent + answeredIds + status
- Restore via JSON
- Validate restored state

## Definition of Done
- Reload restores identical behavior
