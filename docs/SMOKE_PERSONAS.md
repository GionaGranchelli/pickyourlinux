# Persona Smoke Pack v2

Use this checklist for manual product validation before release.
Each persona defines expected includes, excludes, and reasons.

---

## 1) Windows Casual (Quick)

Profile
- Wants a simple installer and no terminal.
- Prefers things to work out of the box.

Expected Include
- Ubuntu
- Linux Mint
- Zorin OS
- Pop!_OS

Expected Exclude
- Arch (manual installer)
- Gentoo (manual installer)
- Slackware (hands-on maintenance)

Expected Reasons
- Exclusions should cite manual installer or hands-on maintenance.

---

## 2) Old Laptop (Quick)

Profile
- Old hardware, low RAM.
- Wants a lightweight experience.

Expected Include
- Lubuntu
- Xubuntu
- Linux Lite
- Bodhi Linux
- MX Linux

Expected Exclude
- Pop!_OS
- Garuda
- Qubes OS

Expected Reasons
- Exclusions should cite “Not suitable for older hardware.”

---

## 3) Privacy-First (Quick)

Profile
- Privacy is critical.
- Avoids proprietary software.

Expected Include
- Tails
- Trisquel
- PureOS
- Alpine

Expected Exclude
- Ubuntu
- Fedora
- Pop!_OS
- Nobara

Expected Reasons
- Includes should cite strong privacy posture.
- Exclusions should cite reliance on proprietary software.

---

## 4) Gamer with NVIDIA (Refine)

Profile
- Wants gaming support.
- NVIDIA GPU, wants easy setup.

Expected Include
- Pop!_OS
- Nobara
- Garuda

Expected Exclude
- Arch
- Gentoo
- Void Linux

Expected Reasons
- Exclusions should cite “NVIDIA setup is likely to be hands-on.”
- Includes should cite good gaming support.

---

## 5) Home Server (Quick)

Profile
- Home server use.
- Prefers minimal terminal usage.

Expected Include
- Ubuntu
- Fedora
- openSUSE Leap

Expected Exclude
- Rocky Linux
- AlmaLinux
- CentOS Stream

Expected Reasons
- Exclusions should cite hands-on maintenance.

---

## 6) Needs Proprietary Apps (Quick)

Profile
- Requires proprietary apps or drivers.
- Accepts closed-source software.

Expected Include
- Ubuntu
- Pop!_OS
- Fedora

Expected Exclude
- Alpine
- Tails
- Trisquel
- PureOS

Expected Reasons
- Exclusions should cite missing proprietary support.

---

## 7) Secure Boot Required (Refine)

Profile
- Must keep Secure Boot enabled.

Expected Include
- Ubuntu
- Fedora
- openSUSE Leap
- Kubuntu

Expected Exclude
- Arch
- Linux Mint
- Debian

Expected Reasons
- Exclusions should cite lack of Secure Boot support out of the box.

---

## 8) NVIDIA but Open-Source Only (Refine)

Profile
- NVIDIA GPU.
- Wants to avoid proprietary drivers.

Expected Include
- Distros with NVIDIA marked HARD or UNKNOWN (e.g., Arch, Gentoo).

Expected Exclude
- Pop!_OS
- Nobara
- Garuda

Expected Reasons
- Exclusions should cite likely reliance on proprietary NVIDIA drivers.

---

## 9) KDE Desktop Fan (Refine)

Profile
- Prefers the KDE desktop.
- Wants a graphical installer.

Expected Include
- Kubuntu
- KDE Neon
- openSUSE Tumbleweed

Expected Exclude
- Arch
- Gentoo

Expected Reasons
- Includes should cite desktop preference match.
- Exclusions should cite manual installer.

---

## 10) Tinker Mode (Expert)

Profile
- Comfortable with manual setup and terminal.
- Prefers rolling releases and pacman.

Expected Include
- Arch
- EndeavourOS
- Manjaro
- Garuda

Expected Exclude
- None expected from hard constraints (verify no unexpected exclusions).

Expected Reasons
- Includes should cite release model and package manager matches.
