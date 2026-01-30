# Task 006 – Flow Validation Script

## Objective
Prevent invalid logic from being deployed.

## Scope
- scripts/validate-flow.ts
- package.json scripts

## Requirements
- Validate showIf fields exist in UserIntentSchema
- Validate patch fields exist in UserIntentSchema
- Validate no empty option arrays
- Fail with clear error messages

## Definition of Done
- `npm run validate:flow` fails on invalid logic
