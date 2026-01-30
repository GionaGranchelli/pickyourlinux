# Task 013 – Human-Centered Question Catalog

## Objective
Replace the existing technical question framing with a **human-centered, non-technical Question Catalog** suitable for Windows/macOS users trying Linux for the first time.

The goal is to keep the **engine and schemas unchanged**, while rewriting user-facing questions to focus on **goals, comfort, and expectations**, not technical concepts.

---

## Scope
- docs/QUESTION_CATALOG.md

---

## Constraints (Non-Negotiable)

- DO NOT modify:
    - UserIntentSchema
    - Patch semantics
    - Condition logic
    - Engine or UI code

- DO NOT introduce:
    - Technical jargon (CLI, terminal, codecs, drivers, architecture)
    - Skill labels (beginner, advanced, expert)
    - Subjective language (“best”, “recommended”, “popular”)

- Every question MUST:
    - Be understandable by a non-technical user
    - Map deterministically to existing intent fields via patches
    - Avoid exposing implementation details

---

## Requirements

### 1. Rewrite Question Catalog
Create a new version of `docs/QUESTION_CATALOG.md` that:

- Uses **plain, friendly language**
- Frames questions around:
    - What the user wants to do
    - How much friction they tolerate
    - Whether things should “just work”
- Explicitly documents how each answer maps to intent fields

### 2. Preserve Determinism
For each question, document:
- Target UserIntent fields
- Allowed answers
- Exact patches applied

### 3. Explicitly Mark System-Only Concerns
- Hardware detection (architecture) must be marked as **non-user-facing**
- Any hidden/system logic must be clearly labeled

### 4. Define Forbidden Language
Add a section listing:
- Disallowed terms
- Disallowed concepts
- Examples of *bad* vs *acceptable* phrasing

---

## Acceptance Criteria (Definition of Done)

- [ ] `docs/QUESTION_CATALOG.md` exists and is fully rewritten
- [ ] No technical jargon appears in user-facing questions
- [ ] Every question maps cleanly to existing intent fields
- [ ] No new intent fields are introduced
- [ ] The catalog can be used as the sole source for building `questions.ts`
- [ ] The document is readable by a non-technical person without explanation

---

## Validation Checklist (Self-Check)

Before marking complete, verify:

- Could a Windows user understand every question?
- Could an AI agent build `questions.ts` **only** from this catalog?
- Is every answer deterministic and schema-compliant?

If any answer is “no”, revise.

---

## Notes

This task is **UX-critical** but **engine-neutral**.

Success means:
> The user never sees complexity,  
> while the engine never loses precision.
