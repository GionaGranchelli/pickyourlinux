# Task 063 – Update Validators & CI for v2 Schemas

## Objective
Ensure CI enforces both new intent schema and distro schema.

## Scope
- scripts/validate-distros.ts
- scripts/validate-flow.ts
- CI config

## Requirements
- validate-distros checks distros.json against v2 schema
- validate-flow ensures patches and conditions only reference existing UserIntent fields
- CI runs validate:distros, validate:flow, typecheck, lint, test

## Definition of Done
- CI fails on invalid schema usage
- Error messages are clear and actionable
