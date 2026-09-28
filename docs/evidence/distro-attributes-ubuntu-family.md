# Verification: proprietarySupport + secureBootOutOfBox — Ubuntu family, Mint, LMDE, Pop!_OS, Zorin, MX, Debian

All reads done **2026-09-28**. Definition applied: the *default-path* definition supplied with the task
(proprietarySupport = how far a DEFAULT install of the main desktop edition gets you to proprietary
drivers/codecs using only first-party means; firmware/non-free-firmware excluded).
Sources are upstream (distro site/wiki/manifest) wherever possible; forum/user-report evidence is labelled.

## Table

| id | field | current | proposed | confidence | primary source (read 2026-09-28) | exact quote |
|---|---|---|---|---|---|---|
| ubuntu | proprietarySupport | FULL | **FULL** | upstream-verified | https://documentation.ubuntu.com/desktop/en/latest/tutorial/install-ubuntu-desktop/ | "Here, you can install third-party software. It can improve device support and performance (for example, NVIDIA graphics drivers) and adds support for additional media formats. We recommend that you enable both options." |
| ubuntu | secureBootOutOfBox | false | **true** | upstream-verified | https://documentation.ubuntu.com/security/security-features/platform-protections/secure-boot/ | "amd64: A shim binary signed by Microsoft and a GRUB binary signed by Canonical are provided in the Ubuntu main archive as shim-signed or grub-efi-amd64-signed." |
| linux_mint | proprietarySupport | OPTIONAL | **FULL** | upstream-verified | https://www.linuxmint.com/rel_zena.php | "If your graphics card is from NVIDIA, once in Linux Mint, perform the following steps to install the NVIDIA drivers: - Run the Driver Manager - Choose the NVIDIA drivers and wait for them to be installed - Reboot the computer" |
| linux_mint | secureBootOutOfBox | false | **true** | upstream-verified | https://www.linuxmint.com/rel_virginia_whatsnew.php | "Linux Mint 21.3 comes with full support for SecureBoot and compatibility with a wider variety of BIOS and EFI implementations." |
| lmde | proprietarySupport | OPTIONAL | **FULL** | medium | https://forums.linuxmint.com/viewtopic.php?t=469122 | "Active apt repos in: /etc/apt/sources.list.d/official-package-repositories.list 1: deb http://packages.linuxmint.com gigi main upstream import backport 2: deb https://deb.debian.org/debian trixie main contrib non-free non-free-firmware" |
| lmde | secureBootOutOfBox | false | **true** | medium | https://github.com/linuxmint/linuxmint/issues/787 | "/EFI/boot/bootx64.efi* Signed by 'Microsoft Corporation UEFI CA 2011' … /EFI/boot/grubx64.efi Signed by 'Debian Secure Boot Signer 2022 - grub2'" (with caveat: same report shows an SBAT revocation failure on newer firmware) |
| kubuntu | secureBootOutOfBox | true | **true** | upstream-verified | https://cdimage.ubuntu.com/kubuntu/releases/24.04/release/kubuntu-24.04.5-desktop-amd64.manifest | "shim-signed\t1.58+15.8-0ubuntu1" / "grub-efi-amd64-signed\t1.202.5+2.12-1ubuntu7.3" |
| xubuntu | secureBootOutOfBox | true | **true** | upstream-verified | https://cdimage.ubuntu.com/xubuntu/releases/24.04/release/xubuntu-24.04.5-desktop-amd64.manifest | "grub-efi-amd64-signed\t1.202.5+2.12-1ubuntu7.3" / "shim-signed\t1.58+15.8-0ubuntu1" |
| lubuntu | secureBootOutOfBox | true | **true** | medium | https://documentation.ubuntu.com/security/security-features/platform-protections/secure-boot/ | Manifest caveat (https://cdimage.ubuntu.com/lubuntu/releases/24.04/release/lubuntu-24.04.5-desktop-amd64.manifest: no shim-signed/grub-efi-amd64-signed entry, only "snap:ubuntu-desktop-bootstrap"; official Ubuntu flavour using the Ubuntu archive where "A shim binary signed by Microsoft … [is] provided in the Ubuntu main archive as shim-signed") |
| ubuntu_budgie | secureBootOutOfBox | true | **true** | upstream-verified | https://cdimage.ubuntu.com/ubuntu-budgie/releases/24.04/release/ubuntu-budgie-24.04.5-desktop-amd64.manifest | "grub-efi-amd64-signed\t1.202.5+2.12-1ubuntu7.3" / "shim-signed\t1.58+15.8-0ubuntu1" |
| ubuntu_studio | secureBootOutOfBox | true | **true** | medium | https://documentation.ubuntu.com/security/security-features/platform-protections/secure-boot/ | Manifest caveat (https://cdimage.ubuntu.com/ubuntustudio/releases/24.04/release/ubuntustudio-24.04.5-dvd-amd64.manifest: no shim-signed/grub-efi-amd64-signed entry; official Ubuntu flavour built from the Ubuntu archive containing Microsoft-signed shim-signed) |
| pop_os | proprietarySupport | FULL | **FULL** | upstream-verified | https://system76.com/support/install-pop | "choose DOWNLOAD under the section best matching your computer (generic, NVIDIA, or Raspberry Pi)" + "sudo apt install system76-driver-nvidia" |
| pop_os | secureBootOutOfBox | false | **false** | upstream-verified | https://system76.com/support/install-pop | "Secure boot must be disabled before installing Pop!_OS." |
| zorin_os | proprietarySupport | FULL | **FULL** | upstream-verified | https://help.zorin.com/docs/hardware/activate-nvidia-drivers/ | "you can use the down/up keys to select the 'Try or install Zorin OS (modern NVIDIA drivers)' option … This uses the NVIDIA version 580 proprietary drivers"; post-install via the built-in "Additional Drivers" app |
| zorin_os | secureBootOutOfBox | false | **true** | upstream-verified | https://help.zorin.com/docs/getting-started/unable-to-boot-from-the-usb-install-drive/ | "Zorin OS should work normally when the Secure Boot feature is enabled on most modern computers (produced after 2011)." |
| mx_linux | proprietarySupport | OPTIONAL | **FULL** | upstream-verified | https://mxlinux.org/wiki/system/repos-mx-25/ | "debian.list # Debian Stable deb http://deb.debian.org/debian trixie main contrib non-free" (and mx.list "trixie main non-free") |
| mx_linux | secureBootOutOfBox | false | **false** | upstream-verified | https://mxlinux.org/wiki/help-files/mx-faqs/ | "Most users are urged to turn off Secure Boot by entering the BIOS as the machine starts to boot." |
| debian | proprietarySupport | OPTIONAL | **OPTIONAL** | upstream-verified | https://wiki.debian.org/SourcesList | "Components: main non-free-firmware" + "## If you want access to contrib and non-free components, ## add \" contrib non-free\" after every \"non-free-firmware\" in this file" |
| debian | secureBootOutOfBox | false | **true** | upstream-verified | https://wiki.debian.org/SecureBoot | "Starting with Debian version 10 (\"Buster\"), Debian supports UEFI Secure Boot by employing a small UEFI loader called shim which is signed by Microsoft and embeds Debian's signing keys." |

## Fresh-install component / repo state (what the definition turns on)

| distro | component state in a fresh install | source |
|---|---|---|
| ubuntu | installer "Optimise your computer" page offers third-party drivers + media formats ("We recommend that you enable both options"); `restricted` (nvidia-driver) is part of the standard Ubuntu component set | documentation.ubuntu.com install tutorial (above) |
| linux_mint | Ubuntu components **main restricted universe multiverse** in `sources.list.d` (user pastes of the default file; upstream docs do not publish it) → nvidia-driver from `restricted` available; Driver Manager (mintdrivers) shipped by default; codecs NOT installed by default (`mint-meta-codecs` opt-in) | https://forums.linuxmint.com/viewtopic.php?t=274130 ; codecs: https://www.linuxmint.com/rel_virginia.php ("apt download mint-meta-codecs") |
| lmde | `official-package-repositories.list`: `deb https://deb.debian.org/debian <suite> main contrib non-free non-free-firmware` (+ Mint repo) → Debian `non-free` (nvidia-driver) enabled by default | https://forums.linuxmint.com/viewtopic.php?t=469122 (LMDE 7), same file shape reported for LMDE 6 |
| pop_os | separate NVIDIA ISO image (branded); `system76-driver-nvidia` on the generic ISO | https://system76.com/support/install-pop |
| zorin_os | boot-menu entry installs NVIDIA proprietary drivers; "Additional Drivers" app; per user reports the sources are Ubuntu `jammy main restricted universe multiverse` + Zorin repos | https://help.zorin.com/docs/hardware/activate-nvidia-drivers/ ; repo paste: https://forum.zorin.com/t/default-repositories-zorin-os-17-core/35396 (user report) |
| mx_linux | `debian.list`: `deb http://deb.debian.org/debian trixie main contrib non-free`; `debian-stable-updates.list`: `… main contrib non-free non-free-firmware`; `mx.list`: `trixie main non-free` → non-free enabled by default | https://mxlinux.org/wiki/system/repos-mx-25/ (same for MX-23: https://mxlinux.org/wiki/system/repos-mx-23/) |
| debian | `debian.sources`: `Components: main non-free-firmware` only (non-free-firmware is firmware → out of scope for this field) | https://wiki.debian.org/SourcesList |

## Notes / judgement calls

1. **Ubuntu flavours (kubuntu, xubuntu, ubuntu_budgie)** — the ISO package manifest literally lists
   `shim-signed` (Microsoft-signed per Ubuntu's security docs) and `grub-efi-amd64-signed`, so Secure Boot
   works out of the box; proposed value = current = true.
2. **Lubuntu and Ubuntu Studio** — their 24.04.5 manifests contain **no** shim-signed/grub-efi-amd64-signed
   entry (they install through the `ubuntu-desktop-bootstrap` snap), so the signed shim could not be confirmed
   from the ISO contents. They are official Ubuntu flavours served from the Ubuntu archive where shim-signed
   (Microsoft-signed) lives in `main`, so the answer is true at **medium** confidence, not upstream-verified.
3. **Mint / LMDE Secure Boot history** — Mint 21.2's release notes documented broken Secure Boot
   ("An update in Ubuntu's shim-signed broke the compatibility of all Linux Mint (and past Ubuntu and
   derivative) ISOs with secureboot … we recommend to disable secureboot") and 21.3 fixed it
   ("comes with full support for SecureBoot"). LMDE has no equivalent upstream statement; its Secure Boot case
   rests on it shipping Debian's Microsoft-signed shim + Debian-signed GRUB/kernel, with a known SBAT-revocation
   failure reported for the LMDE 6 image — hence medium.
4. **MX Linux** — Secure Boot is *partially* possible (Debian-signed kernel on the live ISO, manual shim/grub-install
   + MOK steps on the installed system) but not out of the box; MX's own FAQ tells users to turn Secure Boot off.
5. **Confidence tally** — upstream-verified: 16 field-rows; medium: 4 (lmde ps, lmde sb, lubuntu sb, ubuntu_studio sb);
   **unverified: 0**. No claim above is unverified, but the 4 medium rows rest on user-posted file contents
   (LMDE) or an inference from the shared Ubuntu archive (lubuntu/ubuntu_studio).
6. Not investigated (outside this task's scope): proprietarySupport for the five Ubuntu flavours, and
   MX/Zorin/Mint nvidiaExperience or codec policy beyond what the default path shows.
