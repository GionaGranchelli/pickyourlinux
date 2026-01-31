# Task 066 – Soft Matching v2 (Desktop, Release, Init, Package)

## Objective
Match user preferences to distro attributes without scoring/ranking.

## Scope
- src/engine/compatibility.ts

## Requirements
Soft include reasons when:
- desktopPreference matches supportedDesktops
- releaseModel matches
- initSystem matches (if not NO_PREFERENCE)
- packageManager matches (if not NO_PREFERENCE)

No exclusions in this task—soft matching only.

## Definition of Done
- Results include includedBecause entries for matches
- No ranking introduced
