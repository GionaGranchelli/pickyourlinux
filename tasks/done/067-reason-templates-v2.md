# Task 067 – Reason Template Extensions for New Attributes

## Objective
Ensure all new rule reasons render human-friendly messages.

## Scope
- src/engine/reasons.ts (or wherever template mapping lives)
- UI ResultsView uses templates only

## Requirements
Add templates for:
- secure boot exclusions
- nvidia constraints
- desktop preference matches
- release model matches
- init system / package manager matches

## Definition of Done
- No raw enum text shown to end users
- All new reasons have templates
