# Task 038 – Results Integration (Call Engine, No UI Logic)

## Objective
Compute compatibility results from state + distro dataset and pass them to ResultsView.

## Scope
- pages/index.vue (or a composable like useResults.ts)

## Requirements
- When status becomes COMPLETED:
    - Load distros from src/data/distros.json
    - Call compatibility engine (eliminate + compatibility) using current intent
    - Produce CompatibilityResult[] (validated via schema if exists)
- UI must not decide; only render returned data.

## Definition of Done
- Completing wizard shows results from engine
- No distro logic in UI components
