/tasks/081-ui-vm-contract.md
# Task 081 – Define UI View Model Contract in State Engine

## Objective
Expose render-ready View Models so UI components remain dumb.

## Scope
- src/engine/state.ts (or composable)
- new VM module if needed: src/ui/vm.ts

## Requirements
Expose computed VMs:
- progressVM: { current: number, total: number, phaseLabel: string }
- currentQuestionVM: { id, text, options: [{ id, label, description? }] } | null
- answersVM: array of { questionId, questionText, optionLabel, phaseLabel }
- wizardMode: "QUESTION" | "PHASE_GATE" | "COMPLETE" | "DISQUALIFIED"
- resultsVM:
    - shortlist: DistroCardVM[]
    - allCompatible: DistroCardVM[]
    - excluded: { name, reason: string }[]
    - activeConstraints: string[]
- debugVM: { intent, status, answeredIds, currentQuestionId }

All strings must be human-ready (no enums).

## Definition of Done
- UI can render without importing distros.json or engine logic
- TypeScript strict passes

/tasks/082-ui-shell-layout.md
# Task 082 – Implement App Shell Layout

## Objective
Create consistent page framing and navigation baseline.

## Scope
- components/AppLayout.vue
- components/AppHeader.vue

## Requirements
- Centered container max width
- Minimal header with product name + short trust tagline
- Slots for content

## Definition of Done
- All screens use AppLayout
- No decision logic in shell components

/tasks/083-welcome-screen.md
# Task 083 – Implement Welcome Screen (Promise + Start)

## Objective
Screen 1 that sets expectations and starts the journey.

## Scope
- pages/index.vue (or components/WelcomeScreen.vue)

## Requirements
- Promise Card with 3 bullets:
    - No rankings / no opinions
    - Explainable results
    - Stop anytime / refine later
- Primary CTA: Start
- Secondary link: How it works (placeholder route ok)

Start action must call state engine start/reset and navigate to wizard.

## Definition of Done
- No scroll required on common screens
- Start leads to wizard

/tasks/084-wizard-screen-container.md
# Task 084 – Implement Wizard Screen Container

## Objective
Screen 2 host that renders wizard based on wizardMode.

## Scope
- pages/wizard.vue (or similar)

## Requirements
Render by wizardMode:
- QUESTION -> QuestionCard + WizardNavBar + WizardProgress
- PHASE_GATE -> PhaseGateCard + WizardNavBar + WizardProgress
- COMPLETE -> navigate/show ResultsScreen CTA
- DISQUALIFIED -> DisqualifiedCard

Wizard does not compute modes; it consumes VMs.

## Definition of Done
- Wizard screen works end-to-end with stub VMs

/tasks/085-question-card-component.md
# Task 085 – Implement QuestionCard Component

## Objective
Dumb question renderer.

## Scope
- components/QuestionCard.vue
- components/OptionButton.vue

## Requirements
- Render question text
- Render options (3–5 usually)
- Option click calls state action: selectOption(optionId)
- Support optional descriptions
- Keyboard + focus visible

## Definition of Done
- No patches applied in UI
- No showIf logic in UI

/tasks/086-wizard-progress-component.md
# Task 086 – Implement WizardProgress Component

## Objective
Show progress and phase label.

## Scope
- components/WizardProgress.vue

## Requirements
- Display: "Question X of Y"
- Display phase badge: Beginner / Refine / Expert
- Inputs from progressVM only

## Definition of Done
- Updates reactively
- No local progress computation

/tasks/087-wizard-navbar-component.md
# Task 087 – Implement WizardNavBar Component

## Objective
Provide user control (Undo / Restart / Review Answers).

## Scope
- components/WizardNavBar.vue

## Requirements
Buttons:
- Back (undo) disabled if !canUndo
- Restart (reset)
- Review Answers (opens drawer)

Actions provided by state engine.

## Definition of Done
- Keyboard accessible
- No history logic in UI

/tasks/088-phase-gate-card.md
# Task 088 – Implement PhaseGateCard Component

## Objective
Let user stop after Beginner phase or refine further.

## Scope
- components/PhaseGateCard.vue

## Requirements
- Render gate message + two options
- Calls state action selectPhaseGate(choiceId)

## Definition of Done
- Deterministic; uses VM only

/tasks/089-review-answers-drawer.md
# Task 089 – Implement ReviewAnswersDrawer

## Objective
Review and jump back safely.

## Scope
- components/ReviewAnswersDrawer.vue

## Requirements
- Uses answersVM grouped by phaseLabel
- Each entry has "Change" -> calls jumpTo(questionId)
- Drawer open/close state lives in parent screen (UI state only)

## Definition of Done
- Jump back works without UI recomputing anything

/tasks/090-debug-overlay-dev-only.md
# Task 090 – Implement DebugOverlay (Dev Only)

## Objective
Make development and agent verification easy.

## Scope
- components/DebugOverlay.vue

## Requirements
- Shows debugVM in <pre>
- Only visible in dev mode (env check)

## Definition of Done
- Not present in production builds

/tasks/091-results-screen-container.md
# Task 091 – Implement Results Screen Container

## Objective
Screen 3 host for shortlist + explainability.

## Scope
- pages/results.vue (or components/ResultsScreen.vue)

## Requirements
- Render shortlist section
- Render "Show all compatible" toggle
- Render explainability drawer trigger
- Render restart CTA

Consumes resultsVM only.

## Definition of Done
- No distro filtering/sorting in UI

/tasks/092-distro-card-component.md
# Task 092 – Implement DistroCard Component

## Objective
Neutral distro card with reasons and friction.

## Scope
- components/DistroCard.vue

## Requirements
- Name, description
- "Why it fits" bullets (max 3 by default, expand if more)
- "Potential friction" bullets (always visible if exists)
- No "best" or ranking UI

## Definition of Done
- UI renders DistroCardVM only
- No enum rendering

/tasks/093-results-shortlist-component.md
# Task 093 – Implement ResultsShortlist Component

## Objective
Show shortlist and expansion to full compatible set.

## Scope
- components/ResultsShortlist.vue

## Requirements
- Default show resultsVM.shortlist
- Toggle expands to resultsVM.allCompatible
- Toggle state held in component local UI state

## Definition of Done
- No ordering logic in UI

/tasks/094-explainability-drawer.md
# Task 094 – Implement ExplainabilityDrawer

## Objective
Expose "why these results" and "why excluded".

## Scope
- components/ExplainabilityDrawer.vue

## Requirements
- Show activeConstraints list
- Show excluded list with distro name + reason string
- Uses explainability VM only

## Definition of Done
- No rule evaluation in UI

/tasks/095-disqualified-screen.md
# Task 095 – Implement DisqualifiedCard / Screen

## Objective
Graceful handling when flow disqualifies user.

## Scope
- components/DisqualifiedCard.vue

## Requirements
- Clear message
- Suggest next steps (neutral): "Linux may not fit these constraints"
- Restart CTA

## Definition of Done
- No judgmental copy

/tasks/096-how-it-works-page.md
# Task 096 – Implement "How It Works" Page

## Objective
Trust-building explainer.

## Scope
- pages/how-it-works.vue (or markdown renderer)

## Requirements
- Explain deterministic filtering
- Explain phases and optional refinement
- Explain "compatible shortlist" concept
- Plain language, no jargon

## Definition of Done
- Linked from Welcome screen

/tasks/097-manifesto-page.md
# Task 097 – Implement Manifesto Page

## Objective
Render manifesto.md as /manifesto.

## Scope
- content rendering pipeline

## Requirements
- Markdown rendering
- Minimal styling consistent with site

## Definition of Done
- /manifesto loads and looks good

/tasks/098-accessibility-pass.md
# Task 098 – Accessibility Pass (Keyboard + Focus + Drawer)

## Objective
Ensure the full journey is keyboard usable.

## Scope
- all interactive components

## Requirements
- Tab order sane
- Focus ring visible
- ESC closes drawers
- Buttons are real <button>

## Definition of Done
- Manual checklist documented and passed

/tasks/099-ui-copy-style-guide.md
# Task 099 – UI Copy Style Guide Enforcement

## Objective
Prevent “best distro” / opinion creep.

## Scope
- docs/COPY_RULES.md
- review existing copy in UI

## Requirements
- Forbidden words list: best, top, perfect, ultimate, recommended #1
- Required phrasing: compatible with your choices, based on what you selected
- Beginner flow jargon rules

## Definition of Done
- Copy rules documented
- UI copy compliant

/tasks/100-ui-smoke-tests.md
# Task 100 – UI Smoke Tests (Playwright or Minimal E2E)

## Objective
Prevent regressions in the wizard journey.

## Scope
- e2e/ tests

## Requirements
Automate:
- Start -> answer beginner -> results
- Undo works
- Review drawer opens
- Show all toggle works
- Disqualified path works

## Definition of Done
- CI runs smoke tests
- Tests stable (no flaky timing)