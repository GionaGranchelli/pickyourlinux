# FRONTEND IMPLEMENTATION RULES (Component-by-Component)
## Pick Your Linux — Dumb UI Contract

This document defines **how frontend components must be implemented** so that:
- UI remains **dumb** (no business logic)
- Engine remains **source of truth**
- UX stays **clean, lean, explainable**

> Rule of thumb:  
> If you’re about to write `if (...)` about Linux, distros, ranking, or recommendations → STOP.  
> That belongs in the engine/state layer.

---

## 0. Global Frontend Rules

### 0.1 Allowed Inputs
Components may only depend on:
- `useDecisionEngine()` (state/derived view models)
- serialized objects already computed by state engine (e.g., `visibleQuestions`, `currentQuestion`, `resultsVM`)

### 0.2 Forbidden Inputs
Components must not:
- import `distros.json` directly
- import engine “compatibility” functions directly
- compute filtering, matching, scoring, or “best” lists
- maintain their own copy of intent state

### 0.3 Rendering Rule
Components render based on **View Models**.
If a component needs extra derived data, add it to the state engine and expose it as a computed property.

### 0.4 Styling Rule
Use Tailwind only:
- no component-specific CSS files unless strictly needed
- prefer utility classes
- use consistent spacing & typography tokens

---

## 1. App Shell Components

### 1.1 `AppLayout.vue`
**Purpose:** global layout wrapper.

**Responsibilities**
- Provide page frame: centered container, consistent padding
- Render header/footer shells

**Must NOT**
- contain decision logic
- fetch distros or call engine

**Props / Inputs**
- slot content only

**Implementation Notes**
- single `<main class="max-w-3xl mx-auto px-4 py-8">`
- header minimal, no distractions

---

### 1.2 `AppHeader.vue`
**Purpose:** set expectation & trust.

**Responsibilities**
- Show product name
- Optional tagline: “Compatibility-based, explainable, no rankings”

**Must NOT**
- change state
- show phase info (belongs in wizard)

---

## 2. Journey Components

### 2.1 `WelcomeScreen.vue`
**Purpose:** Screen 1 — promise + entry point.

**Responsibilities**
- show Promise Card (3 bullets)
- CTA: Start
- secondary CTA: “How it works” (link)

**Inputs**
- from state: `start()` action (or `reset()` + navigate wizard)
- from router: navigation only

**Must NOT**
- show questions
- inspect intent values

**Acceptance**
- no scroll required
- single primary action

---

### 2.2 `WizardScreen.vue`
**Purpose:** Screen 2 — host wizard.

**Responsibilities**
- render Wizard Card + progress
- provide review drawer trigger
- handle phase gating prompts (when state reports it)

**Inputs (from engine/state)**
- `status`
- `phaseLabel`
- `progressVM` (e.g., { current, total })
- `currentQuestionVM | null`
- `wizardMode` (e.g., "QUESTION" | "PHASE_GATE" | "COMPLETE")

**Must NOT**
- compute next question
- interpret showIf

**Acceptance**
- only 1 question visible at a time

---

## 3. Wizard Components (Core)

### 3.1 `QuestionCard.vue`
**Purpose:** display current question.

**Responsibilities**
- render question text
- render option buttons
- call `selectOption(questionId, optionId)` action

**Inputs**
- `questionVM`:
    - `id`
    - `text`
    - `options[]` (id, label, description?)
    - optional `helpText` (if provided in schema)
- `onSelect(optionId)`

**Must NOT**
- apply patches directly
- mutate intent directly
- infer which options are “better”

**UI Rules**
- max 5 options visible (if more, UI must scroll inside card)
- keep descriptions short

---

### 3.2 `OptionButton.vue`
**Purpose:** reusable option UI.

**Responsibilities**
- accessible button behavior
- consistent styling

**Inputs**
- `label`
- optional `description`
- `onClick`

**Must NOT**
- handle patches
- handle navigation

**Accessibility**
- `button` element, not div
- focus ring visible
- keyboard selectable

---

### 3.3 `WizardProgress.vue`
**Purpose:** show progress + phase label.

**Responsibilities**
- display “Question X of Y”
- display phase badge: Beginner / Refine / Expert

**Inputs**
- `progressVM`: { current, total }
- `phaseLabel`: string

**Must NOT**
- compute progress (state does)
- decide which phase user is in

---

### 3.4 `WizardNavBar.vue`
**Purpose:** actions below question.

**Responsibilities**
- Back / Undo
- Restart
- Review Answers trigger

**Inputs**
- `canUndo`
- actions: `undo()`, `reset()`, `openReview()`

**Must NOT**
- manage history logic

---

### 3.5 `PhaseGateCard.vue`
**Purpose:** explicit early exit / refine further choice.

**Responsibilities**
- show message: “Want results now or refine further?”
- show two buttons:
    - “Show results now”
    - “Refine further”

**Inputs**
- `phaseGateVM` (text + options)
- action: `selectPhaseGate(choiceId)`

**Must NOT**
- decide when to show (state decides)
- mutate experience directly unless via action

---

## 4. Review & Debug Components

### 4.1 `ReviewAnswersDrawer.vue`
**Purpose:** allow users to see and change answers safely.

**Responsibilities**
- list answered questions grouped by phase
- allow jump back to a specific question via `goTo(questionId)` action

**Inputs (from state)**
- `answersVM`:
    - array of { questionId, questionText, selectedOptionLabel, phase }
- actions: `jumpTo(questionId)`

**Must NOT**
- reconstruct answers from patches
- compute phases by inspecting ids (state supplies phase label per answer)

---

### 4.2 `DebugOverlay.vue` (dev-only)
**Purpose:** visibility for development and agent debugging.

**Responsibilities**
- render `<pre>` with:
    - intent
    - status
    - answeredIds
    - currentQuestionId

**Inputs**
- from state engine only

**Must NOT**
- exist in production builds (guard by env flag)

---

## 5. Results Components (Screen 3)

### 5.1 `ResultsScreen.vue`
**Purpose:** host result views.

**Responsibilities**
- render Shortlist
- render “show all” toggle
- render explainability drawer

**Inputs (from state)**
- `resultsVM` containing:
    - `shortlist[]`
    - `allCompatible[]`
    - `excludedSummary[]`
    - `activeConstraints[]`

**Must NOT**
- compute shortlist ordering
- filter compatible results
- compute “why excluded”

---

### 5.2 `DistroCard.vue`
**Purpose:** show one distro.

**Responsibilities**
- name + neutral description
- “Why it fits” bullets
- “Potential friction” bullets
- optional: link buttons (disabled if not implemented)

**Inputs**
- `distroVM`:
    - `id`
    - `name`
    - `description`
    - `reasonsIncluded[]` (human strings)
    - `reasonsFriction[]` (human strings)
    - `tags[]` (optional for badges)

**Must NOT**
- decide reason categories (state provides)
- invent copy like “best for beginners”

**UI Rules**
- max 3 “why fits” shown by default (expand if more)
- friction always visible if any

---

### 5.3 `ResultsShortlist.vue`
**Purpose:** show top N compatible distros.

**Responsibilities**
- render list of `DistroCard`
- show “Show all compatible distros” toggle

**Inputs**
- `shortlist[]`
- `all[]`
- `isExpanded`
- action `toggleExpanded()`

**Must NOT**
- calculate top N
- sort

---

### 5.4 `ExplainabilityDrawer.vue`
**Purpose:** show transparency breakdown.

**Responsibilities**
- show:
    - active constraints (human text)
    - excluded breakdown: distro + reason key template
- purely presentation

**Inputs**
- `explainVM`:
    - `activeConstraints[]`
    - `excluded[]`: { distroName, reason }

**Must NOT**
- evaluate rules
- translate enums (template mapping done in engine)

---

### 5.5 `CompareTray.vue` (optional future)
**Purpose:** hold selected distros to compare.

**Responsibilities**
- show selected distros
- navigate to compare view

**Inputs**
- `compareVM` from state (selected list)
- actions: add/remove

**Must NOT**
- derive selection rules

---

## 6. View Model Contract (State Engine Output)
Frontend components should **not** consume raw engine output directly if it is complex.

State engine must expose stable VMs:
- `currentQuestionVM`
- `progressVM`
- `answersVM`
- `resultsVM`
- `explainVM`

VMs must contain **ready-to-render strings**, not enums.

---

## 7. Copy & Microcopy Rules

### 7.1 Tone
- calm, supportive, non-judgmental
- avoids slang and memes in core journey

### 7.2 Forbidden Copy
- “best”
- “recommended #1”
- “perfect for beginners”
- “ultimate distro”

### 7.3 Required Copy Patterns
- “compatible with your choices”
- “based on what you selected”
- “you can refine this”

---

## 8. Performance & Quality Rules
- No heavy animations
- Keep lists virtualized only if needed (40 distros usually fine)
- All buttons accessible
- All drawers keyboard dismissible (Esc)

---

## 9. Implementation Checklist (PR Gate)
A PR cannot be merged if:
- UI imports distros.json directly
- UI calls engine filtering logic directly
- UI introduces ranking or scoring
- UI shows raw enums (must show templated strings)
- components mutate intent state directly

---

## 10. Summary
The UI is a **presentation layer** driven by state VMs.
The engine/state is the **brain**.
Our differentiator—**transparent compatibility**—must be visible, calm, and delightful.

If the UI stays dumb, the product stays trustworthy.
