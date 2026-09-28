# Coverage review — non-Arch distros missing from whichdistro.com

**Read date for every figure below: 2026-09-28.** Dataset reviewed: `~/Development/pickyourlinux/src/data/distros.json` (read-only; 54 entries per parent).
**Primary popularity source:** DistroWatch page-hit ranking and per-distro pages (`https://distrowatch.com/table.php?distribution=<slug>`, `https://distrowatch.com/dwres.php?resource=popularity`, per-distro news feeds `https://distrowatch.com/news/distro/<slug>.xml`).

**Caveat on DistroWatch numbers (applies to all DW figures below):** DistroWatch page hits measure *web traffic to a distro's DistroWatch page*, not installed base. It is the only uniform cross-distro metric available, and is influenced by news cycles. Treat it as a weak-but-comparable signal, not a user count. Where a vendor-published or GitHub figure exists, it is given too. Only two figures are vendor-published user/shipment numbers (Raspberry Pi, TUXEDO hardware); the rest are traffic or repo metrics.

---

## 1. Candidate records (distros absent from the dataset)

### 1.1 RHEL — Red Hat Enterprise Linux
- Upstream: https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux
- Latest release: **RHEL 10.2, GA 2026-05-19** (kernel `6.12.0-211.7.1.el10_2`), alongside 9.8 — https://access.redhat.com/articles/red-hat-enterprise-linux-release-dates (read 2026-09-28); DistroWatch news 2026-05-20 (https://distrowatch.com/table.php?distribution=redhat)
- Base: Fedora-derived, independent (DW "Based on: Fedora") — https://distrowatch.com/table.php?distribution=redhat
- Default desktop: GNOME (GNOME Shell); KDE available via EPEL
- Installer: GUI (Anaconda) + Kickstart for automation
- Init: systemd · Package manager: RPM / dnf (yum)
- Release model: fixed; ~6-month minor releases; 10-year lifecycle (5 full + 5 maintenance)
- Immutable: no (Image Mode / bootc is opt-in, not the default product)
- Secure Boot: **yes** — RHEL ships Microsoft-signed `shim`; Red Hat documents its Secure Boot chain — https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/10/html/considerations_in_adopting_rhel_10/kernel
- Proprietary posture: includes proprietary binary blobs/drivers; Wikipedia lists licence as "various free software licences, plus proprietary binary blobs" — https://en.wikipedia.org/wiki/Red_Hat_Enterprise_Linux
- Maintained: yes (Active on DW)
- Popularity: DW **6-month rank 77 (171 hits/day)**, 12-month rank 75 (187 hits/day) — https://distrowatch.com/table.php?distribution=redhat (read 2026-09-28). Vendor-published install-base figure: **unverified**.
- Desktop-picker note: subscription-gated commercially, though a free developer subscription covers 16 systems.

### 1.2 Raspberry Pi OS
- Upstream: https://www.raspberrypi.com/software/operating-systems/
- Latest release: **images dated 15 Sep 2026** (version 6.3 per Wikipedia) — https://www.raspberrypi.com/software/operating-systems/ (read 2026-09-28); DW news 2026-09-16 — https://distrowatch.com/table.php?distribution=raspios
- Base: Debian (Debian stable images) — https://en.wikipedia.org/wiki/Raspberry_Pi_OS
- Default desktop: labwc (Wayland) over an LXDE-derived stack — https://en.wikipedia.org/wiki/Raspberry_Pi_OS
- Installer: Raspberry Pi Imager (GUI) or CLI image write — no on-device installer
- Init: systemd · Package manager: APT / dpkg — https://en.wikipedia.org/wiki/Raspberry_Pi_OS
- Release model: dated snapshots tracking Debian stable (Bookworm → Trixie)
- Immutable: no
- Secure Boot: **no** — the Pi family boots from its GPU bootloader; pre-Pi4 models require a non-free blob to boot at all — https://wiki.debian.org/RaspberryPi
- Proprietary posture: non-free firmware/boot blobs required and shipped by default (same source)
- Maintained: yes (DW Active)
- Popularity: DW **6-month rank 154 (89 hits/day)**, 12-month rank 142 (98) — https://distrowatch.com/table.php?distribution=raspios. Vendor: **Raspberry Pi Holdings FY2025 shipped 7.8M boards+modules (+9%) and 8.4M MCU chips** — https://quartr.com/events/raspberry-pi-holdings-plc-rpi-h2-2025_F3auQH9y and https://cambridgeindependent.co.uk/business/raspberry-pi-s-share-price-has-doubled-since-2025-results-ann-9462063 (read 2026-09-28). Hardware-bound: install base ≈ Pi ownership.

### 1.3 Devuan
- Upstream: https://devuan.org/
- Latest release: **Devuan 6.0.0 "Excalibur", 2025-11-02** (Debian 13 "Trixie" base) — https://devuan.org/os/announce/excalibur-release-announce-2025-11-02; DW news 2025-11-03 — https://distrowatch.com/news/distro/devuan.xml
- Base: Debian (stable) — https://distrowatch.com/table.php?distribution=devuan
- Default desktop: Xfce (DW also lists Cinnamon, KDE Plasma, LXQt, MATE, labwc, Wayfire) — same source
- Installer: Devuan installer (ncurses) + live images; **GUI-ness: partly verified** (Devuan's own installer, not Calamares, on the classic ISO)
- Init: **sysvinit default**; OpenRC/runit offered (explicit anti-systemd project) — https://distrowatch.com/table.php?distribution=devuan
- Package manager: APT / dpkg
- Release model: fixed, tracks Debian stable
- Immutable: no
- Secure Boot: **partial** — signed kernel + `shim` are in the repos but Secure Boot is not enabled out of the box; users must mark `shimx64.efi` manually — https://dev1galaxy.org/viewtopic.php?id=3970
- Proprietary posture: Debian-style; `main` is free, non-free components separate and not enabled by default (Debian policy; **per-component verification: unverified**)
- Maintained: yes (DW Active)
- Popularity: DW **6-month rank 42 (271 hits/day)**, 12-month rank 38 (303) — https://distrowatch.com/table.php?distribution=devuan

### 1.4 Guix System
- Upstream: https://guix.gnu.org/
- Latest release: **GNU Guix 1.5.0, 2026-01-23** (3 years after 1.4.0) — https://guix.gnu.org/blog/2026/gnu-guix-1.5.0-released/ and https://lwn.net/Articles/1055675/
- Base: independent (GNU Guix; DW OS Type Linux) — https://distrowatch.com/table.php?distribution=guix
- Default desktop: GNOME (numerous others declarable)
- Installer: scripted installer (ncurses); **graphical installer status: unverified**
- Init: **GNU Shepherd** — https://guix.gnu.org/manual/1.5.0/en/html_node/Shepherd-Services.html
- Package manager: GNU Guix (functional, declarative, transactional generations)
- Release model: rolling (`guix pull`) + periodic stable releases
- Immutable: **effectively** — declarative system generations with atomic rollback, though not an immutable OS image
- Secure Boot: **unverified** (no published Secure Boot support found)
- Proprietary posture: 100% free by default, FSF-endorsed; non-free requires the third-party `nonguix` channel — https://guix.gnu.org/ (**explicit default-freedom claim: verified at project level**)
- Maintained: yes (DW Active)
- Popularity: DW **6-month rank 179 (80 hits/day)**, 12-month rank 148 (91) — https://distrowatch.com/table.php?distribution=guix

### 1.5 Vanilla OS
- Upstream: https://vanillaos.org/ (docs: https://docs.vanillaos.org/)
- Latest release: **Vanilla OS 3 "Reunion", 2026-08-24** (first major release since OS 2) — https://distrowatch.com/12931 and https://tux.fan/2026/08/29/vanilla-os-3-reunion-2026
- Base: Debian (testing) — https://distrowatch.com/table.php?distribution=vanilla (previously Ubuntu)
- Default desktop: GNOME — same source
- Installer: GUI (Albius installer) — https://docs.vanillaos.org/handbook/en/installation
- Init: systemd · Package manager: `apx` (containerised) over dpkg/apt + Flatpak
- Release model: point releases
- Immutable: **yes** (image/atomic root) — https://distrowatch.com/12931 describes it as the project's immutable Linux distribution
- Secure Boot: **unverified**
- Proprietary posture: **unverified** (docs mention proprietary NVIDIA driver support; default state not confirmed)
- Maintained: yes (DW Active)
- Popularity: DW **6-month rank 80 (168 hits/day)**, 12-month rank 88 (168) — https://distrowatch.com/table.php?distribution=vanilla. GitHub: `Vanilla-OS/ABRoot` **391 stars**, last push 2026-09-16 — https://api.github.com/repos/Vanilla-OS/ABRoot

### 1.6 Bluefin
- Upstream: https://projectbluefin.io/ · repo https://github.com/ublue-os/bluefin
- Latest release: monthly Fedora-atomic images; DW screenshot **44.20260801** (i.e. Aug 2026) — https://distrowatch.com/table.php?distribution=bluefin; DW feed records "Bluefin 44.20260511" — https://distrowatch.com/news/distro/bluefin.xml
- Base: Fedora Atomic (Silverblue) / CentOS bootc — DW "Based on: CentOS, Fedora" — https://distrowatch.com/table.php?distribution=bluefin
- Default desktop: GNOME — same source
- Installer: GUI (Anaconda) — https://docs.projectbluefin.io/installation/
- Init: systemd · Package manager: rpm-ostree/bootc + Flatpak + Homebrew
- Release model: rolling image (plus an LTS branch) — https://docs.projectbluefin.io/lts/
- Immutable: **yes**
- Secure Boot: **yes** — install docs cover "UEFI with Secure Boot" — https://docs.projectbluefin.io/installation/
- Proprietary posture: ships multimedia codecs and offers the proprietary NVIDIA driver (ublue convention); **default-state verification: unverified**
- Maintained: yes — repo pushed **2026-09-27** — https://api.github.com/repos/ublue-os/bluefin
- Popularity: DW **6-month rank 175 (81 hits/day)**, 12-month rank 161 (86) — https://distrowatch.com/table.php?distribution=bluefin. GitHub **2,609 stars / 261 forks** — https://api.github.com/repos/ublue-os/bluefin (read 2026-09-28)

### 1.7 Aurora
- Upstream: https://github.com/ublue-os/aurora (Universal Blue)
- Latest release: DW screenshot **44.20260804**; DW news "Distribution Release: Aurora 43" 2025-11-19 — https://distrowatch.com/news/distro/aurora.xml
- Base: Fedora (Kinoite) → CentOS bootc — https://distrowatch.com/table.php?distribution=aurora
- Default desktop: KDE Plasma — same source
- Installer: GUI (Anaconda) · Init: systemd · Package manager: rpm-ostree/bootc + Flatpak
- Release model: rolling image
- Immutable: yes
- Secure Boot: **yes** (Fedora-atomic base; same mechanism as Bluefin) — **direct Aurora doc: unverified**
- Proprietary posture: as Bluefin (codecs/NVIDIA option)
- Maintained: yes — repo pushed 2026-09-27 — https://github.com/ublue-os/aurora
- Popularity: DW **6-month rank 83 (165 hits/day)**, 12-month rank 79 (182) — https://distrowatch.com/table.php?distribution=aurora. GitHub **796 stars / 72 forks** — https://api.github.com/repos/ublue-os/aurora (read 2026-09-28)

### 1.8 Ultramarine Linux
- Upstream: https://ultramarine-linux.org/ · wiki https://wiki.ultramarine-linux.org/
- Latest release: **Ultramarine 44, 2026-07-02** (Fedora 44 base) — https://distrowatch.com/12891 and https://9to5linux.com/ultramarine-44-is-out-based-on-fedora-linux-44-linux-7-0-and-kde-plasma-6-7
- Base: Fedora — https://distrowatch.com/table.php?distribution=ultramarine
- Default desktop: **KDE Plasma as of 44** (9to5linux, above); DW lists Budgie, GNOME, KDE Plasma, Xfce editions — https://distrowatch.com/table.php?distribution=ultramarine
- Installer: GUI (Anaconda); project notes a replacement installer in development — https://wiki.ultramarine-linux.org/en/setup/getting/
- Init: systemd · Package manager: RPM/dnf + Flatpak
- Release model: point releases tracking Fedora
- Immutable: no
- Secure Boot: **partial** — documented as a manual post-install step — https://wiki.ultramarine-linux.org/en/setup/post-advanced/
- Proprietary posture: ships proprietary codecs/NVIDIA driver support (Fyra Labs); **default-state verification: unverified**
- Maintained: yes (Active on DW)
- Popularity: DW **6-month rank 57 (209 hits/day)**, 12-month rank 63 (210) — https://distrowatch.com/table.php?distribution=ultramarine

### 1.9 TUXEDO OS
- Upstream: https://www.tuxedocomputers.com/en/TUXEDO-OS (vendor: TUXEDO Computers, DE)
- Latest release: rolling hybrid; DW recorded development release **20260813** and unannounced **20260916** — https://distrowatch.com/news/distro/tuxedo.xml
- Base: **moving from Ubuntu LTS to Debian Testing, announced 2026-07-07** — https://tuxedocomputers.com/en/A-new-foundation-for-TUXEDO-OS-Switching-to-Debian.tuxedo
- Default desktop: KDE Plasma — https://distrowatch.com/table.php?distribution=tuxedo
- Installer: GUI (Calamares) · Init: systemd · Package manager: APT/dpkg + Flatpak
- Release model: hybrid rolling + point (vendor-described)
- Immutable: no
- Secure Boot: **no** — "we currently don't officially support Secure Boot as we don't (yet) have a Microsoft signed shim"; kernel signed with a self-signed cert — https://github.com/tuxedocomputers/Tuxedo-Linux-Kernel-Self-Signed-Certificate ; vendor notes Secure Boot is disabled by default on TUXEDO hardware — https://www.tuxedocomputers.com/en/What-you-always-wanted-to-know-about-Secure-Boot.tuxedo
- Proprietary posture: yes — ships proprietary NVIDIA drivers/codecs (vendor hardware distro)
- Maintained: yes (DW Active)
- Popularity: DW **6-month rank 27 (350 hits/day)**, 12-month rank 30 (358) — https://distrowatch.com/table.php?distribution=tuxedo. Vendor-published user count: **unverified** (preinstalled on TUXEDO hardware).

### 1.10 antiX
- Upstream: https://antixlinux.com/
- Latest release: **antiX-26 "Stephen Kapos", 2026-03-21** (Debian 13 "Trixie" base) — https://antixlinux.com/antix-26-released/
- Base: Debian (stable) — https://distrowatch.com/table.php?distribution=antix
- Default desktop: IceWM/Fluxbox/JWM (ROX-IceWM per Wikipedia) — https://en.wikipedia.org/wiki/AntiX
- Installer: GUI (antiX installer) · Package manager: APT / dpkg
- Init: **runit default; also sysvinit, dinit, s6-rc, s6-66 — 5 init systems, no systemd** — https://antixlinux.com/antix-26-released/
- Release model: fixed, tracks Debian stable
- Immutable: no
- Secure Boot: **unverified** (no official Secure Boot support located)
- Proprietary posture: **partial** — non-free firmware/drivers available for hardware support; default-state unverified
- Maintained: yes (DW Active)
- Popularity: DW **6-month rank 21 (467 hits/day)**, 12-month rank 18 (541) — https://distrowatch.com/table.php?distribution=antix. Note: antiX is the upstream parent of MX Linux, which **is** already in the dataset.

### 1.11 Nura (formerly postmarketOS)
- Upstream: https://nura.eco/ (project site https://postmarketos.org/) · images https://images.postmarketos.org/
- Latest release: **postmarketOS 26.06 "Alpen Avocado", 2026-06-21** — https://postmarketos.org/blog/2026/06/21/v26.06-release ; **renamed to "Nura" on 2026-09-27** — https://nura.eco/blog/2026/09/27/nura-rename/ and https://linuxiac.com/postmarketos-is-now-nura-after-major-project-rebrand/
- Base: Alpine Linux — https://distrowatch.com/table.php?distribution=postmarketos (DW name now shows "Nura")
- Default desktop: mobile UIs — GNOME/Phosh, Plasma Mobile, Sway, Sxmo, COSMIC — same source; https://en.wikipedia.org/wiki/Nura_(operating_system)
- Installer: **manual CLI (`pmbootstrap`)** — no GUI installer
- Init: OpenRC (Alpine) · Package manager: apk (Alpine) — https://en.wikipedia.org/wiki/Nura_(operating_system)
- Release model: stable every ~6 months + rolling `edge` — https://docs.postmarketos.org/pmaports/main/releases.html
- Immutable: no
- Secure Boot: N/A (mobile hardware boot chains)
- Proprietary posture: device firmware blobs required
- Maintained: yes (DW Active)
- Popularity: DW **6-month rank 235 (67 hits/day)**, 12-month rank 153 (90) — https://distrowatch.com/table.php?distribution=postmarketos
- Scope note: phones/tablets only — out of scope for an ordinary-desktop picker.

### 1.12 blendOS *(Arch-based — outside the stated non-Arch scope)*
- Upstream: https://blendos.co/
- Latest release: v4 announced 2024-06-05; DW records rolling image "blendOS 2026.08.01" — https://blendos.co/blog/2024/06/05/blendos-v4-released-arch-linux-made-immutable-declarative-and-atomic/ and https://distrowatch.com/news/distro/blendos.xml
- Base: **Arch Linux** — https://distrowatch.com/table.php?distribution=blendos
- Default desktop: GNOME · Installer: GUI · Init: systemd
- Package manager: pacman/AUR inside containers; declarative `/system.yaml`
- Release model: rolling · **Immutable: yes** (atomic Arch)
- Secure Boot: **no** — install guide requires disabling Secure Boot — https://blendos.co/install/normal-pc ; corroborated https://github.com/sebanc/linuxloops/blob/main/Readme/Distro-notes.md
- Maintained: yes (repo pushed 2025-10-21) — https://api.github.com/repos/blend-os/blendos
- Popularity: DW **6-month rank 97 (147 hits/day)**, 12-month rank 87 (169) — https://distrowatch.com/table.php?distribution=blendos. GitHub **778 stars** — https://api.github.com/repos/blend-os/blendos

### 1.13 openSUSE Aeon
- Upstream: https://aeondesktop.org/ (docs on en.opensuse.org); name change from "MicroOS Desktop GNOME" 2023-05-31 — https://news.opensuse.org/2023/05/31/microos-desktop-has-new-name
- Latest release: rolling; DW image tag 20260901 — https://distrowatch.com/news/distro/aeon.xml
- Base: openSUSE Tumbleweed (MicroOS) — https://distrowatch.com/table.php?distribution=aeon
- Default desktop: GNOME · Installer: GUI · Init: systemd
- Package manager: zypper + `transactional-update` (rpm) + Flatpak
- Release model: rolling · **Immutable: yes** (read-only root)
- Secure Boot: **yes** (openSUSE's signed shim; openSUSE ships Secure Boot support) — https://news.opensuse.org/ (**project-level, direct Aeon page: unverified**)
- Proprietary posture: **partial** — openSUSE ships firmware; codecs via Packman are not enabled by default
- Maintained: yes (DW Active)
- Popularity: DW **6-month rank 124 (106 hits/day)**, 12-month rank 126 (106) — https://distrowatch.com/table.php?distribution=aeon

### 1.14 openSUSE Kalpa
- Upstream: openSUSE project; Plasma counterpart to Aeon, from the same 2023-05-31 rename — https://news.opensuse.org/2023/05/31/microos-desktop-has-new-name ; Plasma 6 landed in Kalpa 2024-03-22 — https://news.opensuse.org/2024/03/22/plasma-arrives-in-os-distributions
- Latest release: rolling (Tumbleweed/MicroOS base)
- Base: openSUSE · Default desktop: KDE Plasma · Immutable: yes · Init: systemd · Pkg: zypper + transactional-update
- Secure Boot: yes (openSUSE shim) · Maintained: yes
- Popularity: **no separate DistroWatch slug** (`table.php?distribution=kalpa` → not found, read 2026-09-28); use Aeon as proxy. Vendor/published user numbers: none.

### 1.15 openSUSE Slowroll
- Upstream: https://download.opensuse.org/slowroll/ ; concept: https://news.opensuse.org/2024/01/19/clarifying-misunderstandings-of-slowroll/
- Latest release: rolling ISO refreshed 2026-08-07 — https://download.opensuse.org/slowroll/
- Base: openSUSE Tumbleweed, slower cadence (vendor-described)
- Default desktop: KDE Plasma / GNOME editions · Init: systemd · Pkg: zypper
- Immutable: no · Secure Boot: yes (openSUSE shim) · Maintained: yes
- Popularity: **not separately ranked on DistroWatch** (its page resolves to the main openSUSE entry — https://distrowatch.com/table.php?distribution=slowroll). Vendor numbers: none.

### 1.16 Nitrux
- Upstream: https://nxos.org/
- Latest release: **Nitrux 6.1.0** — https://nxos.org/ (read 2026-09-28); 6.0.0 released 2026-03-03 — https://helpnetsecurity.com/2026/03/04/immutable-linux-distribution-nitrux-6-release ; 5.0.0 on 2025-11-12 — https://distrowatch.com/12633
- Base: Debian → DistroWatch now lists "Based on: Devuan" — https://distrowatch.com/table.php?distribution=nitrux
- Default desktop: **Hyprland** (dropped KDE at 5.0) — https://news.tuxmachines.org/n/2025/11/12/Systemd_Free_Nitrux_5_0_Officially_Released_with_Hyprland_Deskt.shtml
- Installer: GUI (Calamares) · Init: **OpenRC (systemd-free)** — https://nxos.org/
- Package manager: APT/dpkg + AppImage (NX AppHub) — https://nxos.org/
- Release model: point releases · **Immutable: yes** — "built on an immutable foundation" — https://nxos.org/
- Secure Boot: **unverified** · Proprietary: **partial/unverified** (NVIDIA driver support)
- Maintained: yes (DW Active)
- Popularity: DW **6-month rank 133 (97 hits/day)**, 12-month rank 100 (145) — https://distrowatch.com/table.php?distribution=nitrux

### 1.17 KaOS
- Upstream: https://kaosx.us/
- Latest release: **KaOS 2026.09** (DW image tag) — https://distrowatch.com/table.php?distribution=kaos ; the dinit migration shipped in **KaOS 2026.06, 2026-06-24** — https://kaosx.us/news/2026/kaosdinit06/
- Base: independent (KDE/Qt-focused) — https://distrowatch.com/table.php?distribution=kaos
- Default desktop: **Niri + Noctalia** (as of 2026) — https://kaosx.us/desktop/niri/ ; DW image `kaos-2026.09-niri`
- Installer: GUI (Calamares) · Init: **dinit** (reduced systemd retained for some services) — https://kaosx.us/release_notes/
- Package manager: pacman (own repositories) · Release model: rolling (monthly ISOs)
- Immutable: no
- Secure Boot: **no** — "secure boot is not supported" — https://kaosx.us/pages/download/ (cited via https://forum.kaosx.us/d/2209-kaos-installs-but-doesn-t-boot)
- Proprietary posture: **unverified** (KaOS is Qt/KDE-centric; not confirmed)
- Maintained: yes (DW Active)
- Popularity: DW **6-month rank 58 (206 hits/day)**, 12-month rank 64 (208) — https://distrowatch.com/table.php?distribution=kaos

### 1.18 Oracle Linux
- Upstream: https://www.oracle.com/linux/
- Latest release: **Oracle Linux 10.2, August 2026** — https://docs.oracle.com/en/operating-systems/oracle-linux/10/relnotes10.2/ ; 10.1 on 2025-12-06 — https://distrowatch.com/news/distro/oracle.xml
- Base: RHEL (source-compatible rebuild + Oracle's own kernel) — https://distrowatch.com/table.php?distribution=oracle
- Default desktop: GNOME (KDE selectable) — https://en.wikipedia.org/wiki/Oracle_Linux
- Installer: GUI (Anaconda) · Init: systemd · Pkg: RPM/dnf — https://en.wikipedia.org/wiki/Oracle_Linux
- Release model: fixed, tracks RHEL; long premier + extended support
- Immutable: no · Secure Boot: yes (signed shim, RHEL lineage)
- Proprietary posture: ships firmware; free to download/use, support is paid
- Maintained: yes (DW Active)
- Popularity: DW **6-month rank 255 (60 hits/day)**, 12-month rank 159 (87) — https://distrowatch.com/table.php?distribution=oracle
- Redundancy note: dataset already has rocky_linux, almalinux, centos_stream — Oracle Linux is a fourth RHEL rebuild.

### 1.19 Amazon Linux
- Upstream: https://aws.amazon.com/linux/ ; docs https://docs.aws.amazon.com/linux/al2023/
- Latest release: **AL2023.10.20260330 (2026-03-30)**; quarterly minor cadence; supported to **2029-06-30** — https://docs.aws.amazon.com/linux/al2023/release-notes/relnotes-2023.10.20260330.html and https://docs.amazonaws.cn/en_us/linux/al2023/ug/release-cadence.html
- Base: independent (Fedora-derived, RHEL-family tooling) · **not listed on DistroWatch** (`table.php?distribution=amazon` → no entry, read 2026-09-28)
- Default desktop: **none** (cloud/server; no desktop spin)
- Installer: n/a (AMIs/container images, cloud-init)
- Init: systemd · Pkg: RPM/dnf
- Release model: quarterly minor releases, 5-year support (AL2 separate)
- Immutable: no · Secure Boot: **yes, since AL2023.1** on UEFI-capable EC2 — https://docs.aws.amazon.com/linux/al2023/ug/uefi-secure-boot.html
- Proprietary posture: includes Amazon-proprietary agents; free to use on AWS
- Maintained: yes
- Popularity: not on DistroWatch; AWS-published user numbers: **unverified**
- Scope note: cloud/server only — not an ordinary-desktop candidate.

### 1.20 Regata OS
- Upstream: https://get.regataos.com.br/
- Latest release: **Regata OS 25.1.2**, ISOs dated 2026-02-23 — https://sourceforge.net/projects/regataos/files/regataos-25
- Base: openSUSE — https://distrowatch.com/table.php?distribution=regata
- Default desktop: KDE Plasma — same source · Installer: GUI
- Init: systemd · Pkg: zypper/rpm + Flatpak + own store
- Release model: point/rolling hybrid · Immutable: no
- Secure Boot: **unverified** · Proprietary: yes (gaming distro; NVIDIA/codecs)
- Maintained: yes (DW Active)
- Popularity: DW **6-month rank 334 (44 hits/day)** vs 12-month rank 185 (79) — a large fall; https://distrowatch.com/table.php?distribution=regata

### 1.21 Rhino Linux
- Upstream: https://rhinolinux.org/
- Latest release: **Rhino Linux 2026.1, 2026-05-25** (Linux 7.0; added a Lomiri edition) — https://distrowatch.com/12849 and https://lxer.com/module/newswire/ext_link.php?rid=365118
- Base: Ubuntu (rolling, tracking devel) — https://distrowatch.com/table.php?distribution=rhino
- Default desktop: Xfce; Lomiri edition added 2026.1 — https://opensourcefeed.org/rhino-linux-2026-1-release
- Installer: GUI · Init: systemd
- Package manager: apt + **Pacstall** ("AUR for Ubuntu") + Nala — https://rhinolinux.org/
- Release model: rolling · Immutable: no
- Secure Boot: **likely yes (Ubuntu shim) — unverified**
- Proprietary posture: yes (Ubuntu non-free/firmware)
- Maintained: yes (DW Active)
- Popularity: DW **6-month rank 229 (68 hits/day)**, 12-month rank 173 (82) — https://distrowatch.com/table.php?distribution=rhino. GitHub `rhino-linux/rhino-pkg` **38 stars** — https://api.github.com/repos/rhino-linux/rhino-pkg

### 1.22 Puppy Linux
- Upstream: https://puppylinux.com/ (community forum https://forum.puppylinux.com/)
- Latest release: family of variants, not one product — DW records "Puppy Linux 22.12" (2022-12-10) and a 2026 build tag `2606-260901`; variants include F96-CE (https://f96.puppylinux.com/), BookwormPup64 and NoblePup32 24.04 — https://en.wikipedia.org/wiki/Puppy_Linux and https://distrowatch.com/news/distro/puppy.xml
- Base: independent (binary-compatible with Debian/Ubuntu/Slackware per build, via woof-CE) — https://distrowatch.com/table.php?distribution=puppy
- Default desktop: JWM / Openbox / labwc (+ ROX) — https://distrowatch.com/table.php?distribution=puppy
- Installer: GUI (Puppy's own) · Init: BusyBox init
- Package manager: PET/`pkg` plus build-specific apt/slackpkg
- Release model: irregular community releases · Immutable: no
- Secure Boot: **no/unverified** · Proprietary: **partial/unverified**
- Maintained: yes (DW Active; community releases continue)
- Popularity: DW **6-month rank 37 (290 hits/day)**, 12-month rank 32 (337) — https://distrowatch.com/table.php?distribution=puppy

### 1.23 Tiny Core Linux
- Upstream: http://www.tinycorelinux.net/
- Latest release: **Tiny Core 17.0, 2026-02-11** (Linux 6.18.2) — https://distrowatch.com/12727 and http://www.tinycorelinux.net/ (17.1 ISO present in the release dir)
- Base: independent (forked from Damn Small Linux) — https://distrowatch.com/table.php?distribution=tinycore
- Default desktop: FLWM (dwm/Fluxbox/i3/JWM etc. available) — same source
- Installer: CLI/scripted (Core installer); App Browser is GUI
- Init: BusyBox init · Package manager: **tce / App Browser** — https://wiki.tinycorelinux.net/doku.php?id=wiki:app_browser
- Release model: occasional point releases · Immutable: no (runs in RAM)
- Secure Boot: **no** · Proprietary: free by default; repo mostly free
- Maintained: yes (DW Active)
- Popularity: DW **6-month rank 81 (166 hits/day)**, 12-month rank 67 (198) — https://distrowatch.com/table.php?distribution=tinycore

### 1.24 Slax
- Upstream: https://slax.org/
- Latest release: **Slax 15.0.4 (Slackware-based) / 12.2.0 (Debian-based), 2023-10-10** — https://slax.org/changelog.php
- Base: Slackware (15.x series) / Debian (12.x series) — https://distrowatch.com/table.php?distribution=slax
- Default desktop: Fluxbox — same source
- Installer: live-USB (runs live; no traditional installer) · Init: sysvinit (Slackware)
- Package manager: Slackware `pkgtools` (.txz) / Debian apt for the 12.x line
- Release model: occasional · Immutable: no (live) · Secure Boot: **no**
- **Maintained: NO — DistroWatch status is "Dormant"; no release in ~3 years (last 2023-10-10)** — https://distrowatch.com/table.php?distribution=slax (read 2026-09-28)
- Popularity: Dormant → DistroWatch assigns no rank.

### 1.25 Porteus
- Upstream: https://porteus.org/
- Latest release: 5.0 stable / **5.1-alpha (2025-01)**; modules refreshed 2026-05-20 — http://dl.porteus.org/x86_64/Porteus-v5.1/ and https://news.tuxmachines.org/n/2025/01/09/Porteus_v5_1_alpha.shtml
- Base: Slackware — https://distrowatch.com/table.php?distribution=porteus
- Default desktop: KDE Plasma, LXQt, Xfce, MATE, Cinnamon, GNOME, Openbox — same source
- Installer: GUI installer · Init: sysvinit (Slackware)
- Package manager: USM — https://en.wikipedia.org/wiki/Porteus_(operating_system)
- Release model: point releases from Slackware-current snapshots · Immutable: no (RAM/live)
- Secure Boot: **no/unverified** · Proprietary: **partial/unverified**
- Maintained: yes but slow — DW Active, stable branch 5.0 dates from 2022
- Popularity: DW **6-month rank 223 (69 hits/day)** vs 12-month 184 (79) — falling — https://distrowatch.com/table.php?distribution=porteus

### 1.26 Ubuntu Core
- Upstream: https://ubuntu.com/core
- Latest release: Ubuntu Core 24 (24.04 LTS line) — https://documentation.ubuntu.com/core/reference/release-notes
- Base: Ubuntu · Default desktop: **none** (IoT/embedded; device shells only) — https://assets.ubuntu.com/v1/76f8247d-digital_ubuntu_core_datasheet.pdf
- Installer: image-based provisioning (no desktop installer) · Init: systemd
- Package manager: **snap only** · **Immutable: yes** (image-based, every element sandboxed) — same datasheet
- Release model: tracks Ubuntu LTS · **Secure Boot: yes** — https://ubuntu.com/core/features/secure-boot
- Proprietary posture: yes (Ubuntu non-free firmware)
- Maintained: yes · **not a separate DistroWatch entry** (slug `ubuntucore` resolves to the Ubuntu page, read 2026-09-28)
- Popularity: no DW rank; Canonical-published device numbers: **unverified**
- Scope note: not a desktop OS — not an ordinary-desktop candidate.

---

## 2. Ranking by evidence of real user base

Ordered strongest → weakest, using (a) hardware/vendor figures, (b) DistroWatch 6-month hits/day, (c) GitHub activity. Page-hit figures are web traffic, not installs (caveat above).

| # | Distro | Strongest evidence of real base | DW 6-mo rank (hits/day) |
|---|--------|--------------------------------|--------------------------|
| 1 | **Raspberry Pi OS** | 7.8M boards+modules shipped FY2025 (vendor) | 154 (89) |
| 2 | **RHEL** | Enterprise standard; underlies Rocky/Alma/Oracle | 77 (171) |
| 3 | **TUXEDO OS** | Preinstalled on TUXEDO hardware; DW rank 27 | 27 (350) |
| 4 | **antiX** | DW rank 21; parent of MX Linux (in dataset) | 21 (467) |
| 5 | **Devuan** | DW rank 42; distinct systemd-free Debian niche | 42 (271) |
| 6 | **Ultramarine** | DW rank 57; Fedora desktop daily driver | 57 (209) |
| 7 | **KaOS** | DW rank 58 | 58 (206) |
| 8 | **Aurora** | DW rank 83 + 796 GitHub stars | 83 (165) |
| 9 | **Vanilla OS** | DW rank 80; 391 stars on ABRoot | 80 (168) |
| 10 | **Guix System** | GNU flagship; DW rank 179 | 179 (80) |
| 11 | **Bluefin** | 2,609 GitHub stars; DW rank 175 | 175 (81) |
| 12 | **Nitrux** | DW rank 133 | 133 (97) |
| 13 | **Aeon/Kalpa** | openSUSE-family; DW rank 124 for Aeon | 124 (106) |
| 14 | **Puppy Linux** | DW rank 37 (traffic heavy, install base unproven) | 37 (290) |
| 15 | **Tiny Core** | DW rank 81 | 81 (166) |
| 16 | **Rhino Linux** | DW rank 229; 38 stars | 229 (68) |
| 17 | **Porteus** | DW rank 223, falling | 223 (69) |
| 18 | **Nura/postmarketOS** | DW rank 235; mobile-only | 235 (67) |
| 19 | **Regata OS** | DW rank collapsed 185→334 in 6 months | 334 (44) |
| 20 | **Oracle Linux** | DW rank 255; fourth RHEL rebuild | 255 (60) |
| 21 | **Amazon Linux** | Not on DistroWatch; cloud-only | — |
| 22 | **Ubuntu Core** | Not on DistroWatch; IoT-only | — |
| 23 | **Slax** | Dormant; no rank | — |
| — | blendOS (Arch) | DW 97 (147); 778 stars — *out of scope* | 97 (147) |

Raw DW figures (6-mo rank / hits per day, read 2026-09-28 from `https://distrowatch.com/table.php?distribution=<slug>`): redhat 77/171 · raspios 154/89 · devuan 42/271 · guix 179/80 · vanilla 80/168 · bluefin 175/81 · aurora 83/165 · ultramarine 57/209 · tuxedo 27/350 · antix 21/467 · postmarketos(Nura) 235/67 · blendos 97/147 · aeon 124/106 · nitrux 133/97 · kaos 58/206 · oracle 255/60 · regata 334/44 · rhino 229/68 · puppy 37/290 · tinycore 81/166 · slax Dormant · porteus 223/69.

---

## 3. Tier recommendations (picker aimed at ordinary desktop users)

### Tier 1 — add now
Distinct role, actively maintained, real install base, no analogue already in the dataset.

1. **RHEL** — the commercial enterprise reference point; the dataset has its clones (Rocky, Alma, CentOS Stream) but not the original. Add with a "paid subscription" caveat.
2. **Raspberry Pi OS** — the single most-installed ARM desktop; no other dataset entry targets Pi hardware.
3. **antiX** — top-25 DW traffic, systemd-free, ultra-light; the parental project of MX Linux which *is* already listed, so the gap is conspicuous. Note 5 init systems.
4. **Devuan** — the systemd-free Debian; a real, maintained philosophy-distinct choice at DW rank 42.
5. **Ultramarine Linux** — Fedora-based daily driver with a genuine following (DW rank 57); the "Fedora but friendlier" slot.

### Tier 2 — add if scope allows (notable, but niche, partially redundant, or vendor/mobile-bound)
- **openSUSE Aeon (+ Kalpa)** — the immutable openSUSE desktops; complements the existing Leap/Tumbleweed/MicroOS entries rather than duplicating them.
- **Vanilla OS** — immutable Debian GNOME; notable 2026 release (OS 3).
- **Bluefin** and **Aurora** — the uBlue atomic desktops; strong GitHub signal (2,609 / 796 stars) but *partly redundant* with fedora_silverblue, fedora_kinoite and bazzite already present.
- **Guix System** — distinct functional paradigm and a GNU flagship; desktop user base is small (DW 179).
- **TUXEDO OS** — real boxed users via TUXEDO hardware and DW rank 27, but bound to purchasing the vendor's machines.
- **KaOS** — independent KDE/Qt distro, DW rank 58; now dinit-based and Niri-default.
- **Nitrux** — immutable, systemd-free (OpenRC), Hyprland; interesting but small (DW 133).
- **Tiny Core Linux** — the canonical "tiny" distro (DW 81); useful for low-resource questions.
- **Puppy Linux** — long-standing lightweight option (DW 37 traffic) but chaotic multi-variant releases and no single installable product.
- **Rhino Linux** — rolling Ubuntu with Pacstall; small but distinct (DW 229).
- **openSUSE Slowroll** — better folded into the existing openSUSE entry as an option than as its own row.

### Tier 3 — skip, with reason
- **Amazon Linux** — cloud/server only, no desktop; no DistroWatch entry. Not a desktop pick.
- **Ubuntu Core** — IoT/snap-only, no desktop; already conceptually covered by the Ubuntu entry.
- **postmarketOS / Nura** — mobile (phones/tablets) only; manual `pmbootstrap` install.
- **Slax** — DistroWatch **Dormant**, last release 2023-10-10 (~3 years).
- **Porteus** — DW rank falling (184→223), stable branch 5.0 dates from 2022; stable-vs-alpha gap is a maintenance smell.
- **Oracle Linux** — fourth RHEL rebuild with the lowest DW rank of the four (255); adds no desktop-user value over RHEL/Rocky/Alma.
- **blendOS** — Arch-based, so outside the stated non-Arch scope, and the dataset is already Arch-saturated; also requires Secure Boot disabled.

---

## 4. Existing dataset entries flagged by this research

Checked against DistroWatch status + upstream release history, read 2026-09-28.

### Re-evaluate / remove candidates
| Entry | Finding | Evidence |
|-------|---------|----------|
| **bodhi_linux** | **DistroWatch status: Dormant.** Latest release is **Bodhi 7.0.0 (2023-08-21)**, Ubuntu 22.04 base — ~3 years without a release. Still reads "7.0.0 Standard Edition" on the download page. | https://distrowatch.com/table.php?distribution=bodhi · https://www.bodhilinux.com/download/ · https://distrowatch.com/news/distro/bodhi.xml |
| **feren_os** | **Stalled.** No release since **2025.03 (2025-04-10)**; the developer's own post concedes "there hasn't been any new releases since 2025.03" and the 10th-anniversary release slipped past its 2026 target. DW still marks "Active" but 6-mo rank has slid to **253 (60 hits/day)**. | https://medium.com/feren-os/an-update-on-the-upcoming-feren-os-releases-437e707fb22e · https://medium.com/feren-os/2025-still-relatively-uneventful-fc8b141649f5 · https://distrowatch.com/table.php?distribution=ferenos |
| **centos_stream** | **Not discontinued — but mis-scoped for this picker.** CentOS Stream 10 (2024-12-13) is the *upstream development branch* of RHEL with a 5-year lifecycle, not a stable desktop distro; snapshots continue into 2026-09. It is not "commercially dead" (CentOS **Linux** 8/7 EOL'd 2021/2024), but it is a dev/upstream target, and the dataset already carries Rocky + Alma as the stable RHEL rebuilds. | https://www.redhat.com/en/topics/linux/what-is-centos-stream · https://www.openlogic.com/blog/centos-stream-10 · https://distrowatch.com/table.php?distribution=centos |

### Checked and confirmed healthy — keep
| Entry | Latest release (evidence) |
|-------|---------------------------|
| **solus** | 4.9 "Serenity", **2026-04-18** — https://getsol.us/2026/04/solus-4-9-released · DW Active, rank 44/269 |
| **mageia** | Mageia 10, **2026-06-29** — https://news.tuxmachines.org/n/2026/06/29/Mageia_10_Released.shtml · DW Active, rank 29/335 |
| **pclinuxos** | Rolling ISO released **2026-07-30** — https://pclosusers.com/ · DW Active, rank 30/314 (note: DW's last formal release *news* item is 2023.07, but the project publishes rolling ISOs) |
| **peppermint_os** | **2025-10-12** release plus a new Devuan-Excalibur edition (2026-06) — https://en.wikipedia.org/wiki/Peppermint_OS · https://thedistrowriteproject.blogspot.com/2026/06/peppermintos-devuan-excalibur-launched.html · DW Active, rank 78/170 |
| **deepin** | deepin 25.2.0, **2026-07-08** — https://distrowatch.com/news/distro/deepin.xml · DW Active, rank 62/202 |

### Bonus checks on other existing entries (no action needed)
- **trisquel** — Trisquel 12.0 "Ecne", 2026-04-11, supported to 2029 — https://trisquel.info/en/wiki/versions (Active).
- **pureos** — PureOS 11 "Crimson", 2026-05-22 (DistroWatch news item, via syndicated copy) — http://en.zicos.com/tech/i32619128-Distribution-Release-PureOS-11.html ; Purism ships PureOS on its laptops per https://theregister.com/personal-tech/2026/07/01/purism-launches-supersized-16-inch-laptop-for-buyers-who-put-privacy-before-price/5264938. *(DistroWatch's own `pureos.xml` feed was not fetched directly — flagged as a secondary source.)*
- **qubes_os** — Qubes 4.3.1, 2026-06-11; 4.3.2-rc1 2026-09-18 — https://www.qubes-os.org/news/ (Active).
- **slackware** — still 15.0 (2022-02-02) with the package tree updated 2026-09-17; slow but not abandoned — https://packages.slackware.com/ and http://www.slackware.com/announce/15.0.php (DW shows a 2026-09-25 date beside "15.0"; **whether that is a re-release or a tree-update marker: unverified**).
- **kde_neon** — rolling builds through 2026-07 on Ubuntu 24.04 LTS — https://www.linuxcompatible.org/story/kde-neon-20260730-build-released-rolling-plasma-6-on-ubuntu-2404-lts (Active).
- **zorin_os** — Zorin OS 18 (2025-10-14) / 18.1, Ubuntu 24.04 LTS base — https://zorin.com/os/details (Active).

---

## 5. Caveats / unverified items
- **DistroWatch page hits ≠ install base** (see header caveat). Several entries here (Puppy 290/day, Tiny Core 166/day) have traffic disproportionate to any plausible desktop install base.
- Marked **unverified** above and not guessed: Vanilla OS Secure Boot + proprietary posture; Nitrux Secure Boot + proprietary posture; KaOS proprietary posture; antiX Secure Boot + proprietary default; Regata OS Secure Boot; Rhino Secure Boot; Guix Secure Boot; Aeon/Kalpa/Slowroll direct Secure-Boot doc page; Puppy/Tiny Core/Slax/Porteus Secure Boot & proprietary defaults; Ubuntu Core device counts; TUXEDO OS user counts.
- **DistroWatch does not track** Amazon Linux, Ubuntu Core, Kalpa or Slowroll as separate entries — popularity for those is unavailable from the required source.
- **postmarketOS → Nura rename (2026-09-27)** is very recent; DistroWatch already shows the page as "Nura". Any dataset addition should use the new name.
- Two `artix`/`artix_linux` duplicate is known to the parent task and not re-litigated here.
