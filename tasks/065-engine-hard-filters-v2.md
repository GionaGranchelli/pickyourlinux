# Task 065 – Hard Filters v2 (Secure Boot + NVIDIA constraints)

## Objective
Add deterministic elimination rules for new high-impact constraints.

## Scope
- src/engine/eliminate.ts
- reason templates mapping

## Requirements
Hard exclusions:
- If secureBootNeeded === true -> exclude distros where secureBootOutOfBox === false
- If gpu === NVIDIA and nvidiaTolerance === WANT_EASY -> exclude distros where nvidiaExperience === HARD
- If proprietary === AVOID and gpu === NVIDIA -> exclude distros where nvidiaExperience !== UNKNOWN and nvidiaExperience !== HARD? (must define exact deterministic rule)

All exclusions must provide consistent reason keys.

## Definition of Done
- Unit tests cover each new rule
- Reasons appear in exclusion output
