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
