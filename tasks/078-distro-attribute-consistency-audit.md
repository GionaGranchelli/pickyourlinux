# Task 078 – Attribute Consistency Audit

## Objective
Prevent inconsistent data (e.g., rolling distro marked FIXED).

## Scope
- scripts/audit-distros.ts (new)
- docs/DATA_RULES.md

## Requirements
Add checks such as:
- If releaseModel=ROLLING, maintenanceStyle should usually be HANDS_ON (unless explicitly justified)
- secureBootOutOfBox true must be rare and defensible
- nvidiaExperience cannot be GOOD if proprietarySupport=NONE

These are audits (warnings) not hard fails unless you choose.

## Definition of Done
- Audit script runs and reports issues clearly
