# Task 064 – Migrate Existing Distro Dataset to Schema v2

## Objective
Update all current distro entries to include the new required fields.

## Scope
- src/data/distros.json

## Requirements
For each distro, set:
- supportedDesktops
- releaseModel
- initSystem
- packageManager
- secureBootOutOfBox
- nvidiaExperience

Use conservative choices.
If unknown, use UNKNOWN/OTHER where defined.

## Definition of Done
- validate:distros passes
- No missing keys
