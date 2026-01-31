# Task 040 – Debug Panel (Dev Only)

## Objective
Add a dev-only debug panel to inspect intent + flow state.

## Scope
- src/components/DebugPanel.vue
- integration in pages/index.vue or app shell

## Requirements
- Show:
    - status
    - answeredIds
    - intent
    - lastAppliedPatches (if available)
- Must be visible only when `process.dev === true` (Nuxt) or equivalent.

## Definition of Done
- DebugPanel renders in dev mode and is hidden in production build
