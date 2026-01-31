# Task 069 – Add Experience/Phase Selection Entry Point

## Objective
Introduce a first question that sets experience level.

## Scope
- src/data/questions.ts (ALL_QUESTIONS)

## Requirements
Add a first question:
- “How deep do you want to go?”
  Options:
- Quick (BEGINNER)
- More accurate (INTERMEDIATE)
- Expert mode (ADVANCED)

This sets intent.experience.

## Definition of Done
- Flow gates later questions based on experience
