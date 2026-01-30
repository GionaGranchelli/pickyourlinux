# Architecture Overview

This system is a deterministic decision machine.

---

## High-Level Flow

User Click
↓
Patch (JSON)
↓
applyPatch() → UserIntent (validated)
↓
evaluateCondition()
↓
Visible Questions


---

## Layers

### Data Layer (`/src/data`)
- Static, immutable at runtime
- Defines:
    - UserIntent schema
    - Condition & Patch primitives
    - Question Flow DSL

### Logic Layer (`/src/engine/logic.ts`)
- Pure functions only
- No Vue imports
- No side effects

### State Layer (`/src/engine/state.ts`)
- Orchestrates flow
- Tracks progress, undo, status
- Calls logic VM

### UI Layer (`/components`)
- Renders current question
- Dispatches patches
- No branching logic

---

## Invariants

- State is always schema-valid
- Questions are shown strictly via `showIf`
- Undo restores **entire** session state