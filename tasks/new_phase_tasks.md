Task 0 — Project bootstrap + baseline validation report

Objective: Confirm clean baseline before any diffs.

Codex steps:

npm ci

Run and capture outputs:

npm run typecheck

npm run lint

npm test

npm run validate

Record:

Node + npm versions

Test count + pass/fail summary (Vitest output)

Write reports/baseline.md with the above.

Acceptance criteria:

All commands pass.

reports/baseline.md exists and contains command outputs + counts.

Repo refs: quality gates described in README + scripts in package.json.

Task A — Schema source-of-truth audit + map

Objective: Prevent “updated Zod but missed types/validators” failures.

Codex steps:

Locate and document:

All enums in src/data/types.ts (e.g., PackageManagerPreferenceEnum, etc.)

Distro schema source (likely referenced by scripts/validate-distros.js and src/data/distros.json)

Question DSL schema (QuestionSchema) in src/data/types.ts

Any derived schemas (JSON Schema generators, script validators, etc.)

Produce docs/schema_map.md describing:

“single source of truth” policy

where to add new fields/enums

which scripts validate what (validate:*)

Acceptance criteria:

docs/schema_map.md created.

It lists every file that must be edited for schema changes (or explicitly states “only Zod schema exists”).

Task C — Recommendation regression snapshot suite (personas → expected outputs)

Objective: Prevent silent breaking changes across scoring/filters.

Codex steps:

Create a deterministic test harness that:

Loads src/data/distros.json

Loads question flow from src/data/questions.ts

Applies patches to an initial UserIntentSchema intent

Produces ranked distro IDs

Define 5–8 personas as JSON fixtures in tests/fixtures/personas/*.json, e.g.:

Beginner + gaming + NVIDIA + wants easy

Beginner + old hardware + low friction

Intermediate + privacy + fixed release

Advanced + rolling + system preferences

Server-focused + low friction

For each persona: store the current expected top N distro IDs as snapshots.

Add CI test file: tests/recommendation.regression.spec.ts.

Acceptance criteria:

npm test runs the regression suite.

Snapshots committed and stable across runs.

Task 01 — Coverage audit script for Phase 3 (explicit question parsing)

Objective: Identify trap answer options (<3 matching distros).

Codex steps:

Implement scripts/audit-coverage-phase3.js:

Import the question catalog from src/data/questions.ts.

Select “advanced” questions by identifying those that use showIf referring to advanced gating (or by explicit list if needed).

For each option: extract its patches and identify set operations (field/value).

Count distros matching those field/value constraints in src/data/distros.json.

Output reports/coverage_phase3.json and reports/coverage_phase3.md.

Include distro IDs per option.

Acceptance criteria:

Report clearly flags every option with matchCount < 3.

Script runs via node scripts/audit-coverage-phase3.js.

Repo refs: Question DSL + patches live in src/data/types.ts; distro dataset is src/data/distros.json.

Task 02 — Low-coverage answers become “soft weights,” not hard filters

Objective: Remove trap UX.

Codex steps:

Locate scoring/filtering logic inside src/engine/state.ts and/or related engine files (README indicates engine lives under /src/engine).

Implement policy:

If selected preference maps to <3 distros (use Task 01 output or compute at runtime), do not exclude distros.

Instead apply a ranking boost to matching distros.

Add unit tests:

When coverage <3: list still includes non-matching distros.

When coverage ≥3: filtering behavior remains (if filtering exists).

Acceptance criteria:

Regression snapshots (Task C) updated intentionally and reviewed.

Tests cover both low-coverage and normal cases.

Task 03 — Fix nvidiaExperience: UNKNOWN entries (no scale redesign)

Objective: Clean data without expanding taxonomy.

Codex steps:

Add/confirm rubric in docs/distro_contribution_guide.md draft section “nvidiaExperience”.

Update all distros in src/data/distros.json where nvidiaExperience === "UNKNOWN" to GOOD | OK | HARD.

Log every change in reports/nvidia_unknown_resolution.md with rationale.

Acceptance criteria:

No UNKNOWN remains for nvidiaExperience.

npm run validate:distros passes.

Task B — i18n coverage for any new questions/options

Objective: Prevent missing locale keys when adding questions.

Codex steps (template to reuse in tasks 05/07/08/11):

Identify how i18n keys are structured in /i18n (inspect locale files).

For each new question:

Add keys for question text and each option label/description in every locale file.

Add a validator step (script or test) that fails if a question references missing i18n keys.

Acceptance criteria:

UI never renders raw keys.

Validation/test fails if i18n coverage is incomplete.

Repo refs: i18n/ exists; Nuxt i18n dependency present.

Task 04 — Add package manager enums needed for advanced matching (minimum: XBPS, PORTAGE)

Objective: Make Phase 3 package manager preference truthful.

Codex steps:

Update the relevant enum(s) in src/data/types.ts:

Add XBPS, PORTAGE (where you model distro package managers; do not confuse with user preference enums).

Update distro entries in src/data/distros.json:

Void → XBPS

Gentoo → PORTAGE

Update any validators referencing allowed values.

Acceptance criteria:

Dataset validates.

Coverage audit shows these options now map correctly.

Repo refs: enums in src/data/types.ts.

Task 05 — Add immutable field + question + populate + scoring

Objective: Enable immutable path (Silverblue/MicroOS etc.).

Codex steps:

Add immutable: boolean to distro schema (wherever distro schema is defined/validated).

Update src/data/distros.json:

Bazzite → immutable: true (already in dataset; add field)

Add question q_atomic_preference to src/data/questions.ts with patches that set a user intent field (or tag) used by scoring.

Implement scoring rule in engine.

Also do Task B (i18n) for all new strings.

Acceptance criteria:

Selecting immutable preference changes ranking.

Validation + regression snapshots updated intentionally.

Task 06 — Add distros that unlock honest Phase 3: Artix, Silverblue, Kinoite, MicroOS

Objective: Ensure advanced preferences have ≥3 credible matches.

Codex steps:

Add distro entries to src/data/distros.json:

Artix Linux

Fedora Silverblue

Fedora Kinoite

openSUSE MicroOS

Populate all fields consistently using the contribution guide rubric (Task E).

Re-run:

node scripts/audit-coverage-phase3.js

Save updated reports under reports/coverage_phase3_after_task06.*

Acceptance criteria:

Coverage report demonstrates fewer trap options.

Dataset validates.

Task 07 — Add primaryUseCase or serverFocused and wire to Server purpose

Objective: Make Server purpose meaningful without adding Ubuntu Server variant entities.

Codex steps:

Add field:

primaryUseCase: "DESKTOP" | "SERVER" | "BOTH" (preferred)

Populate existing distros accordingly.

Update scoring so q_purpose=Server boosts SERVER/BOTH, penalizes DESKTOP-only.

Add/adjust regression personas for server case.

Also do Task B (i18n) if any new question text is introduced.

Acceptance criteria:

Server persona’s top results are server-focused.

Task 08 — Add laptopFriendly + Phase 1 q_device_type

Objective: Broad-impact improvement.

Codex steps:

Add laptopFriendly: boolean to distro schema + dataset.

Add q_device_type in src/data/questions.ts (Laptop/Desktop/Server).

Update scoring:

Laptop → boost laptopFriendly=true

Update regression suite personas.

Also do Task B (i18n).

Acceptance criteria:

Laptop persona changes ranking predictably.

Validation passes.

Task 09 — Add lastVerified + deterministic backfill strategy

Objective: Prevent dataset rot + avoid noisy diffs.

Codex steps:

Add lastVerified: "YYYY-MM-DD" to distro schema and enforce format.

Backfill policy:

Use one date constant stored in scripts/constants.ts (or similar) for this migration commit, e.g. BACKFILL_DATE=YYYY-MM-DD.

Do not compute “today” dynamically during script execution.

Add verificationMethod?: "MANUAL" | "INFERRED" | "COMMUNITY" (optional but recommended).

Update distros changed in Task 03/06 to MANUAL if you want.

Acceptance criteria:

All distros have lastVerified.

Backfill is stable across agent reruns.

Repo refs: dataset is src/data/distros.json.

Task D — CI enforcement for critical dataset invariants

Objective: Make correctness non-optional.

Codex steps:

Update .github/workflows/* to run:

npm ci

npm run typecheck

npm test

npm run validate

Add a custom script scripts/validate-distro-invariants.js that fails if:

any distro missing lastVerified

any distro has nvidiaExperience: "UNKNOWN"

Hook it into npm run validate or CI step.

Acceptance criteria:

CI fails on invariant violations.

Repo refs: workflows folder exists; validate scripts already exist.

Task 10 — Add docsEcosystem and wire to beginner success

Objective: Make documentation/community a first-class recommendation axis.

Codex steps:

Add docsEcosystem: "EXCELLENT" | "GOOD" | "OK" | "THIN" to distro schema + dataset.

Populate (including “inherited Arch Wiki benefit” for Arch-based).

Update scoring:

Beginner + low troubleshooting tolerance → boost high docsEcosystem.

Acceptance criteria:

Beginner personas rank high-doc distros higher.

Regression suite updated intentionally.

Task 11 — Desktop preference: add “Tiling WM” option

Objective: Close advanced DE gap.

Codex steps:

Extend DesktopPreferenceEnum in src/data/types.ts to include TILING.

Update Phase 3 question options in src/data/questions.ts.

Update scoring/distro support mapping if you model “supported desktops” on distros.

Also do Task B (i18n).

Acceptance criteria:

Selecting tiling changes ranking without excluding everything.

Task 12 — Add Whonix + Parrot (privacy tier completion)

Objective: Improve privacy recommendations between Tails and Qubes, and “daily-driver security”.

Codex steps:

Add distro entries for Whonix and Parrot to src/data/distros.json.

Populate fields using rubric (Task E).

Add privacy personas to regression suite, confirm outputs.

Acceptance criteria:

Privacy personas show nuanced outputs beyond Tails/Qubes.

Task E — Distro entry template + contribution guide (rubrics)

Objective: Make agent decisions consistent.

Codex steps:

Create docs/distro_contribution_guide.md including:

Field-by-field rubric (what each enum/value means)

Examples for tricky fields: nvidiaExperience, secureBootOutOfBox, gamingSupport, laptopFriendly, docsEcosystem

Required metadata: lastVerified, verificationMethod

Add a template file:

docs/templates/distro_entry.template.json

Acceptance criteria:

All future distro additions reference this doc.

Doc defines what qualifies as GOOD vs OK vs HARD for Nvidia (and other critical fields).