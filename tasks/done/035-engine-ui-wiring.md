# Task 035 – Wire UI to State Engine

## Objective
Connect the frontend to the existing useDecisionEngine composable.

## Scope
- src/engine/state.ts (export composable)
- src/components/QuestionWizard.vue (use composable)

## Requirements
- QuestionWizard consumes:
    - currentQuestion
    - status
    - intent
    - answeredIds
    - selectOption(optionId)
    - undo()
- Wizard must not compute visibility; it must use currentQuestion provided by state engine.

## Definition of Done
- Option click advances to next question
- Undo restores previous question + intent
