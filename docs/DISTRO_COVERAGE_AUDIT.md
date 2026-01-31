# Distro Coverage Audit

This checklist ensures the dataset is balanced without value judgments.
All counts are derived directly from `src/data/distros.json`.

## Category Definitions
- **Privacy-focused**: `privacyPosture = STRONG`
- **Old-hardware-friendly**: `suitableForOldHardware = true`
- **General desktop**: `installerExperience = GUI` and `maintenanceStyle = LOW_FRICTION`
- **Gaming-focused**: `gamingSupport = GOOD`
- **Server-leaning**: `maintenanceStyle = HANDS_ON` and `gamingSupport = NONE`

## Checklist (Minimum Targets)
- Privacy-focused distros: **>= 4**
- Old-hardware-friendly distros: **>= 6**
- General desktop distros: **>= 8**
- Gaming-focused distros: **>= 3**
- Server-leaning distros: **>= 3**

## Current Coverage
- Total distros: **33** (target range: 30–40)

- Privacy-focused (5): `alpine`, `tails`, `qubes_os`, `trisquel`, `pureos`
- Old-hardware-friendly (14): `linux_mint`, `debian`, `zorin_os`, `mx_linux`, `void_linux`, `alpine`, `tails`, `trisquel`, `slackware`, `ubuntu_mate`, `lubuntu`, `xubuntu`, `linux_lite`, `peppermint_os`
- General desktop (20): `ubuntu`, `linux_mint`, `pop_os`, `fedora`, `manjaro`, `opensuse_leap`, `elementary_os`, `zorin_os`, `mx_linux`, `tails`, `trisquel`, `kubuntu`, `ubuntu_mate`, `lubuntu`, `xubuntu`, `kde_neon`, `linux_lite`, `peppermint_os`, `nobara`, `pureos`
- Gaming-focused (5): `ubuntu`, `pop_os`, `manjaro`, `garuda`, `nobara`
- Server-leaning (5): `alpine`, `qubes_os`, `rocky_linux`, `almalinux`, `centos_stream`

## Gaps
- None identified against the minimum targets.
