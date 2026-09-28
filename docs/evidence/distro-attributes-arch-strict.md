# Verify proprietarySupport + Secure Boot — arch, endeavouros, manjaro, qubes_os, whonix, parrot

Definition used: **default-path** proprietarySupport (FULL = non-free installed by default / offered by default / boot-menu driver choice / first-party driver tool / installable from repos enabled by default in a fresh install; OPTIONAL = nothing on by default but officially documented first-party opt-in; NONE = no first-party path). Firmware blobs excluded. All sources read **2026-09-28**.

## Table

| distro_id | field | current | proposed | confidence | evidence (URL read 2026-09-28) |
|---|---|---|---|---|---|
| arch | proprietarySupport | OPTIONAL | **FULL** | upstream-verified | https://archlinux.org/packages/extra/x86_64/nvidia-utils/ — "Repository: Extra … License(s): LicenseRef-NVIDIA-Driver-License-Agreement" |
| arch | secureBootOutOfBox | false | **false** | upstream-verified | https://wiki.archlinux.org/title/Unified_Extensible_Firmware_Interface/Secure_Boot — "Disabling Secure Boot: The Secure Boot feature can be disabled via the UEFI firmware interface." (Secure Boot is a manual, user-signed-keys procedure) |
| endeavouros | proprietarySupport | OPTIONAL | **FULL** | upstream-verified | https://raw.githubusercontent.com/endeavouros-team/EndeavourOS-ISO/main/efiboot/loader/entries/archiso-x86_64-linux-nv.conf — "title EndeavourOS with NVIDIA drivers: Only RTX GPUs, Turing, or later … module_blacklist=pcspkr,nouveau,nouveau_drm nouveau.modeset=0 nvidia_drm.modeset=1" |
| endeavouros | secureBootOutOfBox | false | **false** | medium | https://forum.endeavouros.com/t/enable-or-disable-secure-boot/32384 — dalto (EOS team): "You won't be able to boot the live ISO if it is enabled. If you want to use EOS, you have to disable it." |
| manjaro | proprietarySupport | OPTIONAL | **FULL** | upstream-verified | https://wiki.manjaro.org/index.php?title=UEFI_-_Install_Guide — "use the rEFInd - Main Menu… to choose which GPU drivers you want to have installed, the open-source or proprietary" |
| manjaro | secureBootOutOfBox | false | **false** | upstream-verified | https://wiki.manjaro.org/index.php?title=UEFI_-_Install_Guide — "Check your BIOS, UEFI must be ON and Secure boot OFF." |
| qubes_os | proprietarySupport | OPTIONAL | **NONE** | medium | https://doc.qubes-os.org/en/latest/user/hardware/system-requirements.html — "Graphics: Intel integrated graphics processor (IGP) strongly recommended - Nvidia GPUs may require significant troubleshooting." |
| qubes_os | secureBootOutOfBox | false | **false** | upstream-verified | https://doc.qubes-os.org/en/latest/user/downloading-installing-upgrading/installation-guide.html — "Then, if you are on a computer using UEFI, you'll have to disable Secure Boot to allow Qubes OS to boot." |
| whonix | proprietarySupport | OPTIONAL | **FULL** | medium | https://forums.whonix.org/t/whonix-and-free-system-distribution-guidelines-gnu-fsdg/5877 — HulaHoop (Whonix KVM maintainer): "…we ship with non-free and contrib enabled and because we depend on non-free firmware in some cases like microcode security updates for physical builds." |
| whonix | secureBootOutOfBox | false | **false** | medium | https://forums.whonix.org/t/uefi-secure-boot-support/7943 — HulaHoop (Whonix KVM maintainer), still-open proposal: "enable Linux kernel gpg verification in grub and/or enable Secure Boot by default" |
| parrot | proprietarySupport | OPTIONAL | **FULL** | upstream-verified | https://raw.githubusercontent.com/ParrotSec/parrot-core/master/system_configs/apt/sources.list.d/parrot.list — "the non-free suite provides additional packages that don't comply with the Debian Free Software Guidelines. They are mostly proprietary software." + shipped default line "deb https://deb.parrot.sh/parrot echo main contrib non-free non-free-firmware" |
| parrot | secureBootOutOfBox | false | **false** | upstream-verified | https://parrotsec.org/docs/installation/manual-installation/ — "Ensure that Secure Boot and CSM (Compatibility Support Module) are disabled in your machine's UEFI settings before proceeding with the operations described below." |

## Per-entry detail

### arch — OPTIONAL → FULL
- The proprietary NVIDIA userspace driver package **`nvidia-utils` is in `extra`** (official repo, enabled by default in a stock `pacman.conf`): https://archlinux.org/packages/extra/x86_64/nvidia-utils/ → "Repository: Extra", "License(s): LicenseRef-NVIDIA-Driver-License-Agreement".
- Note: the package named exactly `nvidia` is **not present** in the official repos at verification time — `https://archlinux.org/packages/extra/x86_64/nvidia/` now renders **nvidia-open** (`Repository: Extra`, "Replaces: nvidia<=580.119.02-2", depends on `nvidia-utils`). Arch's own wiki NVIDIA page's Installation step installs from the official repos (https://wiki.archlinux.org/title/NVIDIA). No repo needs to be added → FULL.
- Caveat on evidence chain: the raw default `pacman.conf` that ships `[core]`/`[extra]` (https://gitlab.archlinux.org/archlinux/packaging/packages/pacman/-/raw/main/pacman.conf) could not be rendered by the available fetch tooling, so "extra is enabled by default" is asserted from the package-DB repo field + wiki install instructions, not from a quoted pacman.conf line. Does not change the verdict (the wiki's documented install path requires no repo addition).
- Secure Boot: Arch ships no Secure-Boot-signed ISO/boot chain; enabling it is a manual user-signed-keys/sbctl procedure on the wiki page. → false.

### endeavouros — OPTIONAL → FULL
- ISO ships a **boot-menu NVIDIA entry** in the archiso image: `archiso-x86_64-linux-nv.conf` titled *"EndeavourOS with NVIDIA drivers: Only RTX GPUs, Turing, or later"*, blacklisting nouveau and setting `nvidia_drm.modeset=1`.
- First-party driver tool: `nvidia-inst` (https://github.com/endeavouros-team/PKGBUILDS/tree/master/nvidia-inst), PKGBUILD `pkgdesc="Script to install/uninstall nvidia driver packages in EndeavourOS"`, depends/recommends `nvidia-dkms`/`nvidia-open-dkms`.
- Note: the EndeavourOS docs domain linked from endeavouros.com, `discovery.endeavouros.com`, now serves unrelated (parked/hijacked) content, and `endeavouros.com/docs/...` 404s — docs could not be used as a source. ISO repo + PKGBUILDS repo (upstream) used instead.
- Secure Boot: EOS team member states the live ISO will not boot with Secure Boot on (forum, medium confidence — no wiki page exists).

### manjaro — OPTIONAL → FULL
- Wiki UEFI Install Guide: boot menu offers "the open-source or proprietary" GPU drivers.
- Wiki Configure Graphics Cards: "Where installing the full version of Manjaro… the mhwd command will be automatically run by the GUI and CLI installer to automatically detect your graphics card and install the most appropriate driver for it. **Whether free or proprietary drivers are installed will depend on your initial choice of using free or nonfree graphics drivers to boot up**." (https://wiki.manjaro.org/index.php?title=Configure_Graphics_Cards) plus `mhwd`/Manjaro Settings Manager as first-party driver tooling and `sudo mhwd -a pci nonfree 0300`.
- Secure Boot: wiki "Check your BIOS, UEFI must be ON and Secure boot OFF." Official forum thread title also states it is "not supported OOB" (https://forum.manjaro.org/t/info-what-is-it-with-secure-boot-why-is-it-not-supported-oob/175958).

### qubes_os — OPTIONAL → NONE
- Qubes' own docs document only free drivers for the dom0 desktop: system requirements *strongly recommend* Intel IGP and note "Nvidia GPUs may require significant troubleshooting"; the linked "how to" is a **community guide** that installs the driver via **rpmfusion** (a third-party repo the user must add) or by manually compiling NVIDIA's .run installer (https://forum.qubes-os.org/t/nvidia-proprietary-driver-installation/18987, https://doc.qubes-os.org/en/latest/user/hardware/system-requirements.html).
- No Qubes-hosted repository ships proprietary drivers → no **first-party** path; the only first-party "extra" mechanism is contributed *community* packages (`qubes-dom0-update qubes-repo-contrib`, https://doc.qubes-os.org/en/latest/user/advanced-topics/installing-contributed-packages.html), which is not a proprietary-driver path.
- Templates note (asked for): default install ships Fedora, Debian and Whonix templates. Which non-free components those templates enable by default could **not** be confirmed from an upstream primary source (qubes-builder-debian / template sources not retrievable with the available tooling) → **unverified sub-claim**. If a reviewer counts "non-free repo enabled by default inside a shipped template" as satisfying the definition, Qubes would read FULL mechanically; the desktop-edition reading (dom0 graphics, free-only) gives NONE. Flagging because this is the single biggest judgement call in this sheet (hence medium confidence).
- Secure Boot: Qubes installation guide requires Secure Boot to be **disabled** → false.

### whonix — OPTIONAL → FULL (medium; judgement call)
- Whonix does **not** exclude non-free. Upstream statement, Whonix KVM maintainer on the official Whonix forum: "We do not conform to the FSF's strict definition of distros that 'respect your freedom' because we ship with non-free and contrib enabled…" (forums.whonix.org/t/…/5877). Corroborated by the 2016 official forum thread "adding non-freedom (contrib, non-free) APT repositories by default is it safe?" (https://forums.whonix.org/t/adding-non-freedom-contrib-non-free-apt-repositories-by-default-is-it-safe/3300), where maintainers confirm non-free is in the shipped Debian source file by default.
- The Whonix wiki only *advises against* non-free ("For system privacy, freedom and security it is strongly advised to not install proprietary, non-freedom software", https://www.whonix.org/wiki/Avoid_nonfreedom_software — page currently 500s on whonix.org; text read from the upstream wiki HTML mirror, whonix.org wiki oldid 71200); it does not remove it.
- Mechanical verdict under the definition: non-free component enabled by default → non-free packages installable from repos enabled by default → **FULL**. Practical caveat a reviewer may weight: Whonix is a VM guest, so proprietary GPU drivers are not actually usable even when installable — downgrade to OPTIONAL if the intent of the field is "usable on the desktop". Confidence: medium (defaults statement is from 2016/2018 and was not re-read from a current-release `/etc/apt/sources.list*`).
- Secure Boot: Whonix images are VirtualBox/KVM/Qubes VM images (no signed bare-metal boot chain); the wiki/forum still list "enable Secure Boot by default" as an open, unimplemented item → false, medium confidence.

### parrot — OPTIONAL → FULL
- Default APT sources shipped by the first-party `parrot-core` package enable non-free: `deb https://deb.parrot.sh/parrot echo main contrib non-free non-free-firmware`, with the file's own comment "the non-free suite provides additional packages that don't comply with the Debian Free Software Guidelines. They are mostly proprietary software." (https://raw.githubusercontent.com/ParrotSec/parrot-core/master/system_configs/apt/sources.list.d/parrot.list).
- Official Parrot docs document the proprietary driver install from those same repos: "you can install Nvidia's official (closed source) drivers … Install the driver via the Parrot repositories: `sudo apt update && sudo apt install nvidia-driver`" (https://parrotsec.org/docs/configuration/nvidia-drivers). No driver *tool* (GUI wrapper) was found; the repo path alone satisfies FULL.
- Secure Boot: Parrot docs require it disabled for install → false.

## Unverified / weak items
- **unverified count: 0** entries. Every row has at least one upstream/first-party URL with a directly observed quotable sentence.
- 3 rows rest on **medium** confidence, none of them "unverified":
  1. `endeavouros.secureBootOutOfBox` — official forum statement by a team member (no upstream wiki page; EOS docs domain is hijacked/404).
  2. `qubes_os.proprietarySupport` — proposal NONE rests on the dom0/desktop reading; the templates' default repo components are an **unverified sub-claim** (primary source not retrievable).
  3. `whonix.proprietarySupport` + `whonix.secureBootOutOfBox` — maintainer forum statements (Whonix wiki pages for the current release could not be loaded; whonix.org returns HTTP 500 on the relevant pages).
- Rejected as sources: SEO/aggregator pages (itsfoss, internetstories, vmme), the parked `discovery.endeavouros.com`, and the unofficial `whonixos.ink`/`parrotlinux.org` mirrors.
