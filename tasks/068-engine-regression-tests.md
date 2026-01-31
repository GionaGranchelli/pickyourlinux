# Task 068 – Engine Regression Tests (v2)

## Objective
Ensure v2 changes don’t break determinism or existing behavior.

## Scope
- tests/engine/*.spec.ts

## Requirements
Add scenarios:
- Secure boot required excludes X includes Y
- NVIDIA easy excludes HARD distros
- Desktop preference adds include reason but does not exclude
- NO_PREFERENCE does not affect output

## Definition of Done
- Tests pass
- Stable output ordering verified (by id)
