# ADR-003: Dumb UI

## Context
UI logic causes drift and hidden rules.

## Decision
UI renders state only. No decisions allowed.

## Consequences
- Predictable behavior
- Easier testing
- Agent-proof UI