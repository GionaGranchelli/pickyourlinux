# User Intent -> Distro Constraint Mapping

This document defines how UserIntent fields map to distro attributes.
It is deterministic and mechanical. No ranking or scoring is allowed.

---

## HARD Constraints (Pass/Fail)

These constraints **exclude** distros that do not meet the requirement.

- **installation = GUI**
  - Require `installerExperience = GUI`
  - Exclude `installerExperience = MANUAL`

- **maintenance = NO_TERMINAL**
  - Require `maintenanceStyle = LOW_FRICTION`
  - Exclude `maintenanceStyle = HANDS_ON`

- **proprietary = AVOID**
  - Require `proprietarySupport = NONE`
  - Exclude `proprietarySupport = OPTIONAL` or `FULL`

- **proprietary = REQUIRED**
  - Require `proprietarySupport = FULL` or `OPTIONAL`
  - Exclude `proprietarySupport = NONE`

- **tags contains OldHardware**
  - Require `suitableForOldHardware = true`
  - Exclude `suitableForOldHardware = false`

Notes
- `architecture` is a system-only signal and is handled outside distro data.
- If `installation = CLI_OK`, no installer constraint is applied.

---

## SOFT Constraints (Compatibility Reasons)

These do **not** exclude distros. They only explain fit.

- **tags contains Gaming**
  - Match against `gamingSupport`
  - Reasons can be:
    - GOOD -> "Gaming support is good."
    - LIMITED -> "Gaming support is limited but available."

- **tags contains Privacy**
  - Match against `privacyPosture`
  - STRONG -> "Has a strong privacy posture."

- **tags contains OldHardware**
  - If `suitableForOldHardware = true`, add reason:
    - "Suitable for older hardware."

Notes
- `Work` and `Server` tags are collected but currently do not map to hard constraints.
- Soft matches never change ordering or ranking.

---

## Example

If a user wants things to just work:
- installation = GUI
- maintenance = NO_TERMINAL
- proprietary = REQUIRED

Then exclude distros that are MANUAL, HANDS_ON, or NONE.
