# Schema Map

## Single Source of Truth Policy

`src/data/types.ts` and `src/data/distro-types.ts` are the legal-state contracts.

- `src/data/types.ts` defines user intent, question DSL, and patch/condition semantics.
- `src/data/distro-types.ts` defines distro dataset shape and allowed enum values.
- Data files and engine logic must conform to these schemas.

If a value/field does not fit, update schema(s) first, then update data and validators.

## Canonical Schemas

### User intent + question DSL

File: `src/data/types.ts`

- Enums:
  - `TagEnum`
  - `ArchitectureEnum`
  - `ExperienceEnum`
  - `DesktopPreferenceEnum`
  - `ReleaseModelPreferenceEnum`
  - `InitSystemPreferenceEnum`
  - `PackageManagerPreferenceEnum`
  - `GpuEnum`
  - `NvidiaToleranceEnum`
- State schema:
  - `UserIntentSchema`
- Logic DSL schemas:
  - `ConditionSchema`
  - `PatchSchema`
- Flow schema:
  - `QuestionSchema`

### Distro dataset schema

File: `src/data/distro-types.ts`

- Enums:
  - `InstallerExperienceEnum`
  - `MaintenanceStyleEnum`
  - `ProprietarySupportEnum`
  - `GamingSupportEnum`
  - `PrivacyPostureEnum`
  - `DesktopEnum`
  - `ReleaseModelEnum`
  - `InitSystemEnum`
  - `PackageManagerEnum`
  - `NvidiaExperienceEnum`
- Dataset schema:
  - `DistroSchema`
  - `DistroListSchema`

## Data Sources Bound to Schemas

- Question flow data: `src/data/questions.ts`
  - Export: `ALL_QUESTIONS = QuestionSchema.array().parse(questions)`
- Distro data: `src/data/distros.json`
  - Validated by `DistroListSchema` in scripts and engine imports.

## Validation and Enforcement Map

### npm scripts

- `npm run validate:flow` -> `scripts/validate-flow.js` -> `scripts/validate-flow.ts`
  - Validates question `showIf` and `patches` against `UserIntentSchema` keys and `TagEnum`.
- `npm run validate:questions` -> `scripts/validate-question-catalog.js` -> `scripts/validate-question-catalog.ts`
  - Validates all question IDs are documented in `docs/QUESTION_CATALOG.md`.
- `npm run validate:distros` -> `scripts/validate-distros.js` -> `scripts/validate-distros.ts`
  - Parses `src/data/distros.json` with `DistroListSchema` and checks duplicate IDs.
- `npm run validate`
  - Runs all three validators above.

### Additional schema-aware tooling

- `scripts/audit-distros.ts`
  - Parses distro data with `DistroListSchema` and reports coverage/warnings.
- Engine runtime parsing:
  - `src/engine/recommend.ts` parses distros with `DistroListSchema`.
  - `src/engine/eliminate.ts` parses distros with `DistroListSchema`.
  - `src/engine/logic.ts` parses intent updates with `UserIntentSchema`.
  - `src/engine/state.ts` initializes defaults via `UserIntentSchema` and consumes `ALL_QUESTIONS`.

## Required Edit List for Schema Changes

When changing intent fields/enums or question DSL:

1. `src/data/types.ts`
2. `src/data/questions.ts` (if options/patches/showIf reference changed fields/enums)
3. `src/engine/logic.ts` and/or `src/engine/state.ts` (if behavior depends on changed fields)
4. `scripts/validate-flow.ts` (if validation rules expand)
5. Tests under `tests/engine/*` and `tests/ui/*` that construct intent or expect flow behavior
6. i18n keys in locale files when adding/changing question or option text keys

When changing distro fields/enums:

1. `src/data/distro-types.ts`
2. `src/data/distros.json`
3. `scripts/validate-distros.ts` (if extra invariant checks are required)
4. `scripts/audit-distros.ts` (if audit logic depends on changed fields)
5. `src/engine/recommend.ts` / `src/engine/eliminate.ts` / `src/engine/state.ts` if scoring/filtering consumes changed fields
6. Tests that parse distros or assert recommendations (`tests/engine/*.spec.ts`)

## Derived Schemas / Generators

No JSON Schema generator is present in the repository at this time.
