# AGENTS.md — Project Constitution

This file defines non-negotiable rules for autonomous agents.

---

## Architectural Laws

1. **Logic is Data**
    - All decision logic must be expressed as JSON-compatible structures.
    - No functions in data. No callbacks. No eval.

2. **Dumb UI**
    - UI components render data only.
    - UI must never inspect distro attributes or make decisions.

3. **Single Source of Truth**
    - Zod schemas in `src/data/types.ts` define all legal states.
    - If something doesn’t fit the schema, update the schema first.

4. **No Magic**
    - No scores, weights, heuristics, or “best for X”.
    - Only explicit boolean / enum filtering.

---

## Dependency Policy

- ❌ Do NOT add dependencies without an ADR.
- ❌ Do NOT add state managers (Pinia, Vuex, Redux).
- ❌ Do NOT add UI frameworks beyond Tailwind.
- ✅ Pure TypeScript + Vue reactivity only.

---

## Allowed Import Directions

UI → state → logic
logic ❌→ state
logic ❌→ UI


Violating this is a hard failure.

---

## Validation Requirements

Every change must pass:
- TypeScript strict mode
- Zod validation
- Engine unit tests
- Flow validation scripts
