# Task 002 – Logic Virtual Machine

## Objective
Implement the pure logic engine that evaluates conditions and applies patches.

## Scope
- src/engine/logic.ts
- tests/engine/logic.spec.ts

## Requirements
- Implement evaluateCondition
- Implement applyPatch
- Must support:
    - eq, neq
    - in (scalar ∈ set)
    - contains (array contains scalar)
    - and / or recursion
- Must use structuredClone
- Must validate output using UserIntentSchema

## Definition of Done
- Unit tests cover all operators
- No Vue imports
- 100% deterministic behavior
