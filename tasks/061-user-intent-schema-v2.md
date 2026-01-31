# Task 061 – UserIntent Schema v2 (New Attributes + Defaults)

## Objective
Extend UserIntent schema to support richer preferences while remaining deterministic.

## Scope
- src/data/types.ts (UserIntentSchema)
- Update related TypeScript types

## Requirements
Add fields (all must be schema-enforced):
- experience: BEGINNER | INTERMEDIATE | ADVANCED (default BEGINNER)
- desktopPreference: NO_PREFERENCE | GNOME | KDE | XFCE | CINNAMON | MATE | LXQT
- releaseModel: NO_PREFERENCE | FIXED | ROLLING
- initSystem: NO_PREFERENCE | SYSTEMD | OPENRC | RUNIT
- packageManager: NO_PREFERENCE | APT | DNF | PACMAN | ZYPPER | APK | NIX
- secureBootNeeded: null | true | false (default null)
- gpu: UNKNOWN | INTEL_AMD | NVIDIA (default UNKNOWN)
- nvidiaTolerance: NO_PREFERENCE | WANT_EASY | OK_HANDS_ON | AVOID_PROPRIETARY

All existing fields must remain.

## Definition of Done
- TypeScript builds
- Validators updated for new enums
- No any types introduced
