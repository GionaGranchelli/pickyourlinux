# Distro Contribution Guide

## Purpose

This guide defines how distro metadata must be assigned in `src/data/distros.json`.
Use explicit rubric-based values, never placeholders.

## `nvidiaExperience` Rubric

Allowed values: `GOOD` | `OK` | `HARD`.

- `GOOD`
  - NVIDIA setup is typically straightforward for mainstream users.
  - Distro commonly documents and supports proprietary drivers with low friction.
- `OK`
  - NVIDIA setup is possible and documented, but may require a few manual steps.
  - Suitable for users comfortable following distro docs.
- `HARD`
  - NVIDIA setup is usually manual, fragile, or outside the distro’s primary focus.
  - Not a low-friction path for non-expert users.

Rules:
- Do not use `UNKNOWN`.
- Choose the most conservative value when evidence is mixed.
- Keep values stable unless there is a concrete distro-level change.

## Evidence Notes (for reviewers)

When editing `nvidiaExperience`, include short rationale in `reports/` for the change set.
