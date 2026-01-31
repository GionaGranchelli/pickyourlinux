# Data Contract

This document explains what the schemas *mean*.

---

## UserIntent Fields

| Field | Meaning |
|------|--------|
| installation | GUI vs CLI tolerance during install |
| maintenance | Terminal usage after install |
| proprietary | Acceptance of closed-source software |
| architecture | CPU architecture |
| minRam | Minimum RAM in GB |
| tags | Use-case flags (enum only) |
| experience | Flow depth selection (BEGINNER, INTERMEDIATE, ADVANCED) |
| desktopPreference | Preferred desktop style or NO_PREFERENCE |
| releaseModel | Update cadence preference (FIXED, ROLLING, or NO_PREFERENCE) |
| initSystem | Advanced init preference (SYSTEMD, OPENRC, RUNIT, or NO_PREFERENCE) |
| packageManager | Advanced package manager preference (APT, DNF, PACMAN, ZYPPER, APK, NIX, or NO_PREFERENCE) |
| secureBootNeeded | Whether Secure Boot must stay on (true/false/null) |
| gpu | GPU vendor (UNKNOWN, INTEL_AMD, NVIDIA) |
| nvidiaTolerance | NVIDIA setup tolerance (NO_PREFERENCE, WANT_EASY, OK_HANDS_ON, AVOID_PROPRIETARY) |

---

## Condition Operators

| Operator | Semantics |
|--------|-----------|
| eq | strict equality |
| neq | strict inequality |
| in | scalar ∈ set |
| contains | array contains scalar |
| and / or | boolean logic |

---

## Patch Operations

| Patch | Effect |
|-----|--------|
| set | Replace field value |
| add_tag | Add enum tag (idempotent) |
| remove_tag | Remove enum tag |

---

## Guarantees

- No invalid state can be produced
- All logic is diffable and serializable
- All decisions are explainable

---

## Phased Flow (Optional Refinement)

- **BEGINNER**: fast answers, minimal detail.
- **INTERMEDIATE**: adds clarity on desktop look, update style, and hardware quirks.
- **ADVANCED**: adds expert-only preferences (init system, package manager).

Users can stop after the beginner phase and still get results.

---

## Beginner-Friendly Meanings

- **Desktop preference** describes the visual layout and interaction style (menus, panels, window controls).
- **Release model** describes update style:
  - **Fixed**: major updates in batches.
  - **Rolling**: smaller updates arrive continuously.

---

## Why NO_PREFERENCE Exists

- Choosing **NO_PREFERENCE** tells the engine **not** to filter on that attribute.
- It is not the same as “unknown”; it is an explicit choice to keep options broad.
