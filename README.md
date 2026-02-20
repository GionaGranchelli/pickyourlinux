# Pick Your Linux

A deterministic, rule-based Linux distribution picker built with Nuxt 3.
This project uses **logic-as-data** and a **compiler-enforced decision engine**.
UI components are strictly dumb. All decision logic lives in the engine.

---

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
