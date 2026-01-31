# Task 074 – Flow Validator v2 (Nested Conditions + Contains)

## Objective
Ensure flow integrity remains safe with more questions.

## Scope
- scripts/validate-flow.ts

## Requirements
- Validate all leaf condition fields exist
- Validate nested conditions recursively (and/or)
- Validate patches set only known fields
- Validate add_tag/remove_tag values are valid TagEnum

## Definition of Done
- Broken flow fails CI with clear error
