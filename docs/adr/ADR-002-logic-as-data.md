# ADR-002: Logic as Data

## Context
Functions in config are unsafe for agents and serialization.

## Decision
All logic is represented as JSON-compatible data structures.

## Consequences
- Safe for LLM editing
- Serializable
- Validatable in CI