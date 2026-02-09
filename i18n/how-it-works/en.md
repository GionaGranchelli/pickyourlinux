# How It Works

This page is a docs-driven overview of the decision engine, data model, and explainability rules behind Pick Your Linux.

## Documentation Sources Covered

- ARCHITECTURE.md
- DATA_CONTRACT.md
- DATA_RULES.md
- QUESTION_CATALOG.md
- CONSTRAINT_MAPPING.md
- RESULTS_COPY.md
- TESTING.md
- TONE_AND_COPY.md
- FRONTEND-IMPLEMENTATION-RULES.md

## 1. Product Promise

Pick Your Linux is a deterministic compatibility engine. It does not rank, score, or suggest a single best distro. It only filters with explicit rules and shows transparent reasons.

- Multiple matches are expected when multiple distros satisfy the same constraints.
- No hidden weights, popularity scores, or subjective recommendations are used.
- You can change answers and immediately see how outcomes change.

## 2. Core Architecture

The system is split into strict layers to keep logic testable and UI dumb.

- Data layer (`/src/data`): schemas, question catalog, distro dataset.
- Logic layer (`/src/engine/logic.ts`): pure condition and patch evaluation.
- State layer (`/src/engine/state.ts`): flow orchestration, progress, undo, results view models.
- UI layer (`/src/components`): render-only components that consume view models.
- Import direction is one-way: UI -> state -> logic.

## 3. Data Contract (UserIntent)

Every answer updates a single validated `UserIntent` object. This is the decision state.

- Installation and maintenance preferences define setup and post-install friction tolerance.
- Proprietary preference controls acceptance of closed-source components.
- Hardware context includes architecture, RAM, secure boot, and GPU details.
- Use-case tags include Gaming, Privacy, Work, Server, and OldHardware.
- Optional refinement fields include desktop preference, release model, init system, and package manager.

## 4. Question Engine

Questions are data-driven. Each option contains deterministic JSON patches. Visibility is controlled only by explicit conditions.

- Allowed patch ops: `set`, `add_tag`, `remove_tag`.
- Allowed condition ops: `eq`, `neq`, `in`, `contains`, `and`, `or`.
- No functions in data, no callbacks, and no runtime eval.
- Question order and phase behavior come from the catalog, not UI logic.

## 5. Phased Journey

Flow depth is progressive and forward-only: Quick (Beginner) -> Intermediate -> Advanced.

- Quick gathers high-signal constraints with minimal time.
- Intermediate adds practical refinements (desktop style, update model, hardware clarifiers).
- Advanced adds explicit system preferences (init, package manager, stricter controls).
- Users can stop at results after quick/intermediate and continue refining later without restart.

## 6. Hard Constraints (Pass/Fail)

Hard constraints exclude incompatible distros. If a distro fails one hard rule, it is out.

- GUI installer requirement excludes manual-installer distros.
- No-terminal maintenance requirement excludes hands-on maintenance distros.
- Avoid proprietary excludes distros requiring proprietary support.
- Require proprietary excludes distros with no proprietary support.
- Old hardware requirement excludes distros not suitable for low-end or older hardware.
- Secure boot and NVIDIA preferences apply additional explicit compatibility checks.

## 7. Soft Compatibility Reasons

Soft reasons do not rank distros. They only explain why a compatible distro may fit better for specific goals.

- Gaming and privacy posture generate explainability reasons.
- Desktop/release/init/package-manager preferences add explicit match reasons.
- Choice-driven reasons and strict-filter matches are shown separately in results.

## 8. Results and Explainability

Results are presented as compatibility outcomes, not recommendations.

- Each card includes strict filters matched, choice-driven reasons, and potential friction.
- Explainability panel shows active constraints and excluded distro reasons.
- Compare page exposes distro attributes side-by-side using the same source data.
- Sorting defaults to most matches first; user filters are explicit and reversible.

## 9. Data Quality and Audits

Distro data follows schema validation plus consistency audits.

- Schema validation enforces legal values for every distro attribute.
- Audit rules flag suspect combinations (for example NVIDIA support vs proprietary policy).
- Secure boot claims and rolling-maintenance expectations are audited for defensibility.

## 10. Testing and Validation Gates

Changes are expected to pass deterministic validation pipelines.

- Flow validator checks that question visibility and transitions are coherent.
- Question and distro validators enforce schema and catalog integrity.
- Engine tests cover condition logic, patch behavior, completion, and undo.
- The goal is explainable and reproducible behavior under strict typing and schema control.

## 11. UX and Copy Rules

Language is designed for clarity and reversibility.

- Avoid words like best, top, recommended, or popularity-driven claims.
- Avoid skill-judgment framing in the UI; focus on comfort and goals.
- Every choice should feel reversible: review answers, edit, or restart.
