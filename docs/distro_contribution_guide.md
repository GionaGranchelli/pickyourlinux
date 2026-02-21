# Distro Contribution Guide

Use this guide whenever adding or editing entries in `src/data/distros.json`.

## Required Workflow

1. Update schema first if new values are needed (`src/data/distro-types.ts`).
2. Add/edit distro entry in `src/data/distros.json`.
3. Run `npm run validate` and `npm test`.
4. If you changed recommendation behavior, update regression snapshots intentionally.

## Field-by-Field Rubric

- `id`: stable snake_case slug, never reused for another distro.
- `name`: official distro name.
- `description`: one short, neutral sentence.
- `installerExperience`:
  - `GUI`: standard guided installer path.
  - `MANUAL`: expert/manual install expected.
- `maintenanceStyle`:
  - `LOW_FRICTION`: routine use mostly GUI/docs-friendly.
  - `HANDS_ON`: frequent terminal/manual operations expected.
- `proprietarySupport`:
  - `FULL`: strongly supports proprietary workflows out of box.
  - `OPTIONAL`: proprietary available but not the default posture.
  - `NONE`: explicitly free/open-only stance.
- `suitableForOldHardware`:
  - `true` when a typical older system has a realistic path.
- `gamingSupport`:
  - `GOOD`: mainstream gaming path is strong.
  - `LIMITED`: possible with caveats.
  - `NONE`: not a practical gaming target.
- `privacyPosture`:
  - `STRONG`: privacy/security-first defaults.
  - `DEFAULT`: general-purpose defaults.
- `docsEcosystem`:
  - `EXCELLENT`: deep official + community docs, active support channels.
  - `GOOD`: solid docs/support for most issues.
  - `OK`: usable but patchy docs/support.
  - `THIN`: sparse docs/community; high self-support burden.
- `supportedDesktops`: include major desktop(s) users actually get for this distro profile.
- `releaseModel`: `FIXED` or `ROLLING`.
- `initSystem`: `SYSTEMD`, `OPENRC`, `RUNIT`, or `OTHER`.
- `packageManager`: canonical package manager enum value.
- `primaryUseCase`:
  - `DESKTOP`: primarily desktop/workstation users.
  - `SERVER`: primarily server/infrastructure users.
  - `BOTH`: actively used in both scenarios.
- `laptopFriendly`:
  - `true` when laptop workflows (power/wifi/suspend) are generally practical.
- `immutable`:
  - `true` for atomic/immutable root model distros.
- `secureBootOutOfBox`:
  - `true` only when standard install flow supports Secure Boot without advanced manual work.
- `nvidiaExperience`:
  - `GOOD`: straightforward NVIDIA path for mainstream users.
  - `OK`: workable with moderate manual steps.
  - `HARD`: mostly manual/high-friction path.
  - `UNKNOWN` is not allowed.
- `lastVerified`:
  - must be `YYYY-MM-DD`.
- `verificationMethod`:
  - `MANUAL`: human-reviewed explicitly.
  - `INFERRED`: derived from stable distro characteristics.
  - `COMMUNITY`: validated by trusted community contribution.

## Tricky Field Examples

- `nvidiaExperience`
  - `GOOD`: Pop!_OS-style turnkey GPU story.
  - `OK`: Fedora/openSUSE-class documented setup.
  - `HARD`: Arch/Gentoo-style manual-heavy path.
- `secureBootOutOfBox`
  - `true` only when regular install path works with Secure Boot enabled.
- `gamingSupport`
  - `GOOD` for distro families with proven gaming user base and compatibility.
- `laptopFriendly`
  - `false` for distros where laptop ergonomics are commonly advanced/manual.
- `docsEcosystem`
  - Arch/Ubuntu/Fedora families often `EXCELLENT`; niche/low-traffic projects trend `OK`/`THIN`.

## Required Metadata

Every entry must include:
- `lastVerified`
- `verificationMethod`

These are invariant-checked by validation scripts and CI.
