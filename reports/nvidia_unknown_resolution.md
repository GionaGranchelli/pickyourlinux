# NVIDIA UNKNOWN Resolution

Objective: remove all `nvidiaExperience: "UNKNOWN"` entries without changing the taxonomy.

## Rubric Used

See `docs/distro_contribution_guide.md` (`nvidiaExperience` section):
- `GOOD`: low-friction NVIDIA path
- `OK`: workable with moderate manual steps
- `HARD`: mostly manual/high-friction

## Changes

- `rocky_linux`: `UNKNOWN` -> `HARD`
  - Enterprise/server-first profile; NVIDIA desktop path is not a first-class low-friction flow.
- `almalinux`: `UNKNOWN` -> `HARD`
  - Enterprise/server-first profile; setup usually manual for consumer desktop use.
- `centos_stream`: `UNKNOWN` -> `HARD`
  - Rolling enterprise base; NVIDIA path is generally hands-on.
- `solus`: `UNKNOWN` -> `OK`
  - Desktop-focused distro with practical driver path, but not as turnkey as top beginner picks.
- `mageia`: `UNKNOWN` -> `OK`
  - Desktop distro with documented NVIDIA path; moderate setup effort.
- `pclinuxos`: `UNKNOWN` -> `OK`
  - Desktop-focused, workable NVIDIA setup with some manual steps.
- `deepin`: `UNKNOWN` -> `OK`
  - Desktop-oriented system where NVIDIA can be configured with moderate friction.
- `bodhi_linux`: `UNKNOWN` -> `HARD`
  - Lightweight/community profile; NVIDIA setup is less streamlined.
- `kali_linux`: `UNKNOWN` -> `HARD`
  - Security/testing focus rather than consumer desktop NVIDIA experience.

## Post-check

- Remaining `UNKNOWN` values: `0`
- Validation: `npm run validate:distros` passes.
