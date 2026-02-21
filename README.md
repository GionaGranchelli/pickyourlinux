# Pick Your Linux

A deterministic, schema-driven Linux distribution picker built with Nuxt 3.

This project is a study in **logic-as-data** and **honest decision engine design**. It evaluates 30+ conditional questions across 3 structured phases to recommend from 40+ Linux distributions, while enforcing a strict boundary between domain logic and presentation.

[**Read the Technical Case Study →**](./docs/CASE_STUDY.md)

---

## 🏗️ Architectural Invariants

* **Logic-as-Data:** All decision rules live in a declarative DSL, not in code.
* **Pure Engine:** Zero business logic exists inside Vue components.
* **Deterministic:** Every state change triggers a full recomputation from a validated snapshot.
* **Zod-Enforced:** Every rule, question, and state transition is schema-validated at runtime.
* **Trap UX Aware:** The engine detects when refinement questions lose utility and prompts for an early exit.


## 🚀 Getting Started

### Requirements
- Node.js 20+
- npm (or pnpm with frozen lockfile)

### Install
```bash
npm ci
```
Run (Dev)
```bash
npm run dev
```
Build
```bash
npm run build
```

### Validation & Quality Gates
Run all of these before committing:

```bash
npm run typecheck
npm run lint
npm test
npm run validate
```
If any command fails, the change is invalid.

### Project Structure
```
/src
  /data
    types.ts        # Zod schemas (source of truth)
    distros.json    # Linux distributions (validated)
    questions.ts    # Question Flow DSL (logic-as-data)
  /engine
    logic.ts        # Pure VM (conditions + patches)
    state.ts        # Reactive decision engine (Vue composable)
  /components
    QuestionWizard.vue  # Dumb UI
```
### Core Rules
❌ No business logic in UI components
❌ No conditional distro logic in templates
❌ No new dependencies without an ADR
V All logic must be serializable and schema-validated
