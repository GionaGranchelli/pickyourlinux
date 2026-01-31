# Task 037 – ResultsView Component (Pure Presentation)

## Objective
Create a dumb results component that renders compatibility output.

## Scope
- src/components/ResultsView.vue

## Requirements
- Props:
    - results (CompatibilityResult[])
    - distros (Distro[])
- Render:
    - Compatible distros section
    - Excluded distros section (collapsed is ok)
    - includedBecause / excludedBecause lists
- No filtering logic; assume results are precomputed.

## Definition of Done
- Renders both included and excluded distros
- Matches engine output exactly
