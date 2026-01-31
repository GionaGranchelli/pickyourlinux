# Task 062 – Distro Schema v2 (Matching Attributes)

## Objective
Extend distro schema to support the new intent fields.

## Scope
- src/data/distro-types.ts (or existing distro schema file)
- Update Distro type + validator

## Requirements
Add distro attributes:
- supportedDesktops: DesktopEnum[] (min 1)
- releaseModel: FIXED | ROLLING
- initSystem: SYSTEMD | OPENRC | RUNIT | OTHER
- packageManager: APT | DNF | PACMAN | ZYPPER | APK | NIX | OTHER
- secureBootOutOfBox: boolean
- nvidiaExperience: GOOD | OK | HARD | UNKNOWN

Allow UNKNOWN/OTHER where appropriate.

## Definition of Done
- distros.json validates with new schema
- No optional missing fields in distros.json entries
