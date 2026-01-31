# Pick Your Linux – Roadmap

## Phase 1: Core Engine (MVP)
Goal: Deterministic question flow → valid UserIntent

- Engine VM (conditions + patches)
- State engine with undo & disqualify
- Minimal question flow (3–5 questions)
- Debug overlay

## Phase 2: Recommendation Engine
Goal: Filter distros deterministically

- Distro schema
- Distro filtering rules
- Explanation output ("why included / excluded")

## Phase 3: UX Polish
Goal: Make it usable without breaking determinism

- Progress indicator
- Restart flow
- Shareable state (URL or JSON)

## Phase 4: Content Expansion
Goal: Scale data, not logic

- More distros
- More questions
- Localization

## Post-MVP Roadmap
Focus: Expand accessibility and comparison depth without adding ranking.

- Localization for the full question flow
- Accessibility-first pass (keyboard, screen reader, contrast)
- Advanced comparison mode (side-by-side constraints and tradeoffs)
- Experimental flows for non-Linux domains using the same logic model
