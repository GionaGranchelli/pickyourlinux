# Testing Strategy

All logic must be testable without UI.

---

## Required Tests

### Engine Logic
- evaluateCondition
- applyPatch
- contains / in edge cases

### State Engine
- Navigation order
- Visibility changes
- Undo restores full state
- Disqualifier handling
- Completion detection

### Data Validation
- distros.json schema validation
- questions.ts schema validation

---

## Coverage Rules

- Engine logic: 100% coverage expected
- State engine: critical paths covered