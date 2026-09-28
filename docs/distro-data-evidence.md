# Distro data evidence

Every value in `src/data/distros.json` should be traceable to a source. This file records
the sources for values that were verified by hand, plus the operational definitions the
verification uses. Values not listed here are the pre-existing dataset values
(`verificationMethod` says whether they were verified or inferred).

## Operational definitions

**`proprietarySupport`** — how far a *default* install of the distro's main desktop edition
gets you to proprietary (non-free) drivers and codecs using only first-party means (its own
repositories, installers and tools), with no repository added or edited by the user:

- `FULL` — proprietary drivers/codecs are installed by default, **or** offered by default
  (installer option, branded NVIDIA image, boot-menu driver choice, first-party driver GUI),
  **or** installable from repositories enabled by default in a fresh install.
- `OPTIONAL` — nothing non-free is enabled or installed by default, but the distro documents
  a first-party opt-in (enable `non-free`/`contrib`, RPM Fusion, NVIDIA repository, or run the
  distro's driver tool after enabling a repository).
- `NONE` — no first-party path at all; the archive or image excludes non-free.

Firmware blobs (`non-free-firmware`) are deliberately excluded from this field: nearly every
distro ships them, and mixing them into the enum makes Debian-class entries unclassifiable.

**`secureBootOutOfBox`** — a default install boots and works with UEFI Secure Boot *enabled*,
without the user disabling it (signed shim + signed kernel, no hand-enrolled MOK).

## Verified values

| Distro | Field | Value | Source (read 2026-09-28) |
|---|---|---|---|
| ubuntu | secureBootOutOfBox | `true` (was `false`) | <https://help.ubuntu.com/community/UEFI> — "All current Ubuntu 64bit (not 32bit) versions now support this feature [Secure Boot]" |
| kubuntu, xubuntu, lubuntu, ubuntu_budgie, ubuntu_studio, ubuntu_mate | proprietarySupport | `FULL` (was `OPTIONAL`) | Official flavours are built from the same Ubuntu archive with the same default components (`main restricted universe multiverse`, "restricted: Proprietary drivers") and the same first-party `ubuntu-drivers` tooling, so they cannot differ from `ubuntu` on this field. Archive and shim are shared with `ubuntu`, whose value is `FULL`. |
| artix | installerExperience | `GUI` (was `MANUAL`) | <https://artixlinux.org/download.php> — graphical ISOs ship the Calamares installer and the page tells non-experts "use a graphical or community edition" |
| artix | supportedDesktops | `KDE, XFCE, MATE, CINNAMON, LXQT, OTHER` (was `OTHER, TILING`) | Same page: graphical images are "LXQt, LXDE, MATE, Cinnamon, KDE/Plasma, XFCE"; stable ISO listing confirms `artix-cinnamon-*`, `artix-mate-*`, `artix-plasma-*`, `artix-xfce-*`, `artix-lxqt-*` |
| artix | suitableForOldHardware | `true` (unchanged) | Same page: the `lowmem` ISO "can boot and install on machines with as little as 300MB of RAM" |

## Corrections applied from the verification records

Source records live in `docs/evidence/`. `upstream-verified` means the value was read off an
upstream doc/package page; `medium` means the upstream statement is indirect (forum post by a
maintainer, user-posted file contents, or inference from a shared archive).

| Distro | Field | Change | Confidence |
|---|---|---|---|
| linux_mint | proprietarySupport | OPTIONAL → `FULL` | upstream-verified (default sources carry main/restricted/universe/multiverse; first-party Driver Manager) |
| linux_mint | secureBootOutOfBox | false → `true` | upstream-verified ("full support for SecureBoot" since 21.3) |
| lmde | proprietarySupport | OPTIONAL → `FULL` | medium (LMDE configures `main contrib non-free non-free-firmware`) |
| lmde | secureBootOutOfBox | false → `true` | medium (Debian signed chain; LMDE 6 shim later hit by an SBAT revocation) |
| zorin_os | secureBootOutOfBox | false → `true` | upstream-verified (help docs: works with Secure Boot on) |
| debian | secureBootOutOfBox | false → `true` | upstream-verified (shim since Debian 10) |
| arch | proprietarySupport | OPTIONAL → `FULL` | upstream-verified (`nvidia-utils` is in `extra`, enabled by default) |
| endeavouros | proprietarySupport | OPTIONAL → `FULL` | upstream-verified (ISO ships an NVIDIA boot entry + first-party `nvidia-inst`) |
| manjaro | proprietarySupport | OPTIONAL → `FULL` | upstream-verified (installer offers free vs proprietary drivers; `mhwd`) |
| mx_linux | proprietarySupport | OPTIONAL → `FULL` | upstream-verified (first-party "Nvidia Driver Installer" in MX Tools) |
| qubes_os | proprietarySupport | OPTIONAL → `NONE` | medium (no first-party non-free path; NVIDIA "may require significant troubleshooting"; only third-party repos) |
| whonix | proprietarySupport | OPTIONAL → `FULL` | medium (maintainer states non-free and contrib ship enabled; upstream wiki pages were unreachable) |
| parrot | proprietarySupport | OPTIONAL → `FULL` | upstream-verified (`parrot.list` ships `main contrib non-free non-free-firmware`) |

Unchanged after verification: `pop_os` (FULL, Secure Boot off), `mx_linux` Secure Boot (false),
`qubes_os` Secure Boot (false — upstream requires it disabled), Arch/EndeavourOS/Manjaro Secure
Boot (false), `debian` proprietarySupport (OPTIONAL — official media ship `main` +
`non-free-firmware` only).

## New entries

Field-level quotes for each entry are in `docs/evidence/new-distros-tier1.md`. Values I decided
against a direct upstream statement, and why:

| Entry | Field | Call | Reason |
|---|---|---|---|
| omarchy | installerExperience = `MANUAL` | the ISO ships the Omarchy Configurator, a guided **text-mode** wizard over `archinstall`; the enum has no "guided CLI" value, and `GUI` would hand Omarchy to a no-terminal beginner |
| omarchy | maintenanceStyle = `LOW_FRICTION` | updates run from the Omarchy menu and migrations are automatic (omarchy.org/manual/updates) |
| steamos | supportedArchitectures = `["x86_64"]` | Valve ships SteamOS on x86_64 handhelds/machines only; no ARM build exists |
| raspios | nvidiaExperience = `HARD` | no NVIDIA path on Raspberry Pi hardware; `UNKNOWN` is banned by the dataset invariant |
| rhel | maintenanceStyle = `HANDS_ON`, proprietarySupport = `OPTIONAL` | kept consistent with the existing rocky/alma/centos_stream entries rather than inventing a different standard for the same product family |
| antix | proprietarySupport = `OPTIONAL` | non-free is reachable through first-party opt-in tooling, not enabled by default (its FAQ also installs `broadcom-sta-dkms` from backports, which would read as FULL — flagged, not resolved) |
| devuan | initSystem = `OTHER` | sysvinit has no enum value |
