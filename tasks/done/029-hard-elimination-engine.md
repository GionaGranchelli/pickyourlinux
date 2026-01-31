# Task 029 – Hard Elimination Engine

## Objective
Implement the first phase of distro filtering: HARD constraints.

---

## Scope
- src/engine/eliminate.ts

---

## Requirements
- Binary pass/fail per distro
- Each exclusion must produce a reason
- No partial scores or weights
- No distro ordering

---

## Definition of Done
- Given UserIntent, engine excludes incompatible distros
- Output includes exclusion reasons
