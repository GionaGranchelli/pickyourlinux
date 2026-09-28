# Tier-1 missing distros — dataset entries + per-field evidence

Generated: 2026-09-28. Values are for `src/data/distros.json` (Zod `DistroSchema`, see `src/data/distro-types.ts`). Nothing was written into /home/gionag/Development/pickyourlinux.

Architecture vocabulary follows the existing dataset: `x86_64`, `arm64`, `x86` (only `arm64` and `x86_64` are actually consulted by `src/engine/eliminate.ts`). `armhf` is not an accepted string, so the 32-bit Raspberry Pi OS edition is not expressible.

proprietarySupport uses the supplied DEFAULT-PATH definition (FULL = proprietary drivers/codecs installed or offered by default, or installable from repos enabled by default; OPTIONAL = documented first-party opt-in only; NONE = no first-party non-free path). Firmware blobs are excluded from that field.


## Omarchy (`omarchy`)

| field | value | source | quote / note |
|---|---|---|---|
| `id` | omarchy | [en.wikipedia.org](https://en.wikipedia.org/wiki/Omarchy) | 'Omarchy is an open-source Linux distribution created by David Heinemeier Hansson ... based on Arch Linux' |
| `name` | Omarchy | [omarchy.org](https://omarchy.org/) | Page title: 'Omarchy - Beautiful, fun & agentic Linux by DHH' |
| `description` | Arch-based desktop distribution built around the Hyprland tiling compositor. | [en.wikipedia.org](https://en.wikipedia.org/wiki/Omarchy) | 'It is based on Arch Linux and uses the Hyprland tiling Wayland compositor and Quickshell desktop shell.' |
| `imageUrl` | https://upload.wikimedia.org/wikipedia/commons/c/c3/Omarchy_logo.png | [upload.wikimedia.org](https://upload.wikimedia.org/wikipedia/commons/c/c3/Omarchy_logo.png) | commons.wikimedia.org/File:Omarchy_logo.png (838x257); direct URL appears on the file description page and returns 200 image/png |
| `websiteUrl` | https://omarchy.org/ | [omarchy.org](https://omarchy.org/) | canonical site; HTTP 200 |
| `documentationUrl` | https://omarchy.org/manual/ | [omarchy.org](https://omarchy.org/manual/) | 'The Manual - Omarchy ... Welcome to Omarchy! Omarchy is an omakase Linux distribution based on Arch' (HTTP 200) |
| `forumUrl` | https://omarchy.org/discord | [omarchy.org](https://omarchy.org/discord) | first-party community link; omarchy.org/discord -> HTTP 200 (Discord invite) |
| `downloadUrl` | https://omarchy.org/#download | [omarchy.org](https://omarchy.org/) | Omarchy ISO download section on the project site; current direct payload is https://iso.omarchy.org/omarchy-4.0.4.iso (linked from the page) |
| `distroSeaUrl` | null | — | https://distrosea.com/select/omarchy/ returns HTTP 404 (calibrated: a bogus slug also 404, /select/ubuntu/ 200) -> null |
| `testDriveUrl` | null | — | no browser test-drive demo published by the project |
| `installerExperience` | GUI | [github.com](https://github.com/omacom/omarchy-iso) | 'It includes the Omarchy Configurator as a front-end to archinstall and automatically launches the Omarchy Installer after base arch has been setup.' Guided wizard, text mode |
| `maintenanceStyle` | LOW_FRICTION | [omarchy.org](https://omarchy.org/manual/updates/) | 'Omarchy and your packages are kept up to date via Update > Omarchy in the Omarchy menu ... an update installs the latest Omarchy release, runs any pending migrations ... Omarchy will actually stop a direct system upgrade' |
| `proprietarySupport` | FULL | [omarchy.org](https://omarchy.org/) | 'Omarchy comes ready for Steam, RetroArch, and a whole world of gaming. Graphics drivers and configuration, including NVIDIA on supported hardware, are sorted during installation.' -> proprietary drivers offered by default (definition clause 1) |
| `suitableForOldHardware` | true | [omarchy.org](https://omarchy.org/) | 'Even a 2011 ThinkPad X220 with 2GB of RAM can run Omarchy, with room to spare.' |
| `gamingSupport` | GOOD | [omarchy.org](https://omarchy.org/) | 'Omarchy comes ready for Steam, RetroArch, and a whole world of gaming.'; /manual/gaming/ documents Steam, Lutris, Heroic, retro/cloud gaming |
| `privacyPosture` | DEFAULT | [learn.omacom.io](https://learn.omacom.io/2/the-omarchy-manual/50/getting-started) | no privacy-hardening upstream; legacy manual security page describes firewall defaults only -> DEFAULT |
| `docsEcosystem` | GOOD | [omarchy.org](https://omarchy.org/manual/) | 47-chapter first-party manual (install, updates, gaming, troubleshooting, FAQ) -> GOOD |
| `supportedDesktops` | ["TILING"] | [omarchy.org](https://omarchy.org/manual/) | 'based on Arch, the tiling window manager Hyprland, and the desktop construction-kit Quickshell' -> TILING |
| `supportedArchitectures` | ["x86_64"] | [omarchy.org](https://omarchy.org/) | 'Vintage Macs ... Give that old Intel Mac a second life' / 'The latest laptops' -> x86_64 only; no arm media published |
| `releaseModel` | ROLLING | [en.wikipedia.org](https://en.wikipedia.org/wiki/Omarchy) | 'The distribution uses Arch Linux as its base' + Arch rolling base; 'Arch always have the latest updates' (legacy manual Security page) -> ROLLING |
| `initSystem` | SYSTEMD | [en.wikipedia.org](https://en.wikipedia.org/wiki/Omarchy) | Arch base ships systemd -> SYSTEMD |
| `packageManager` | PACMAN | [omarchy.org](https://omarchy.org/manual/updates/) | 'Omarchy itself is installed as regular pacman packages from the Omarchy Package Repository' -> PACMAN |
| `primaryUseCase` | DESKTOP | [en.wikipedia.org](https://en.wikipedia.org/wiki/Omarchy) | 'intended primarily as a developer environment ... with its own installation image and package repository' -> DESKTOP |
| `laptopFriendly` | true | [omarchy.org](https://omarchy.org/) | 'Laptops like the latest Dell XPS make amazing Omarchy machines, with our core team helping the newest hardware work properly.' |
| `immutable` | false | [learn.omacom.io](https://learn.omacom.io/2/the-omarchy-manual/50/getting-started) | install uses 'full-disk encryption' but a normal read-write root ('Manual install ... editing config files') -> not immutable |
| `lastVerified` | 2026-09-28 | — | researched 2026-09-28 |
| `verificationMethod` | MANUAL | — | all values read from upstream pages on 2026-09-28 |
| `secureBootOutOfBox` | false | [learn.omacom.io](https://learn.omacom.io/2/the-omarchy-manual/50/getting-started) | 'You must turn off Secure Boot and/or TPM in the BIOS. You have to turn these off to be able to install Omarchy.' -> false |
| `nvidiaExperience` | OK | [omarchy.org](https://omarchy.org/) | 'Graphics drivers and configuration, including NVIDIA on supported hardware, are sorted during installation.' -> OK |

**Unverified / inferred / judgement calls**

- installerExperience — the ISO ships the 'Omarchy Configurator' (a guided text-mode wizard front-end to archinstall), so GUI is a judgement call on user effort, not pixels; MANUAL is the alternative. proprietarySupport — FULL rests on one sentence ('Graphics drivers ... including NVIDIA ... sorted during installation'); the plain-Arch reading would be OPTIONAL. nvidiaExperience — same sentence; OK chosen over GOOD because of the hedge 'on supported hardware'. maintenanceStyle — LOW_FRICTION inferred from the menu-driven updater + snapshots + blocked direct pacman; no upstream labatement of 'low friction'.
- forumUrl — Omarchy has no web forum; the project's community space is Discord, so forumUrl points at the first-party redirect https://omarchy.org/discord.

## SteamOS (`steamos`)

| field | value | source | quote / note |
|---|---|---|---|
| `id` | steamos | [en.wikipedia.org](https://en.wikipedia.org/wiki/SteamOS) | 'SteamOS' article; official site store.steampowered.com/steamos |
| `name` | SteamOS | [en.wikipedia.org](https://en.wikipedia.org/wiki/SteamOS) | 'SteamOS is a gaming-focused operating system released by Valve' |
| `description` | Valve's Arch-based operating system for gaming handhelds and consoles. | [en.wikipedia.org](https://en.wikipedia.org/wiki/SteamOS) | 'Gaming-focused ... Based on Arch Linux and built specifically to support Steam, it is the default Linux distribution for Valve's line of gaming hardware' |
| `imageUrl` | https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/SteamOS_wordmark.svg/500px-SteamOS_wordmark.svg.png | [upload.wikimedia.org](https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/SteamOS_wordmark.svg/500px-SteamOS_wordmark.svg.png) | commons.wikimedia.org/File:SteamOS_wordmark.svg thumb (500px PNG) -> HTTP 200 image/png |
| `websiteUrl` | https://store.steampowered.com/steamos | [store.steampowered.com](https://store.steampowered.com/steamos) | 'Official website \| store.steampowered.com/steamos'; HTTP 200 |
| `documentationUrl` | https://partner.steamgames.com/doc/steamhardware/steamdeck | [partner.steamgames.com](https://partner.steamgames.com/doc/steamhardware/steamdeck) | Steamworks documentation for SteamOS/Steam Deck (partner.steamgames.com/doc/steamdeck redirects here); HTTP 200. Chosen because Valve has no single docs portal |
| `forumUrl` | https://steamcommunity.com/app/1675200/discussions/ | [steamcommunity.com](https://steamcommunity.com/app/1675200/discussions/) | Steam Deck/SteamOS app discussion hub; HTTP 200 |
| `downloadUrl` | https://store.steampowered.com/steamos/download/?ver=steamdeck | [store.steampowered.com](https://store.steampowered.com/steamos/download/?ver=steamdeck) | official SteamOS/recovery image download page; HTTP 200 |
| `distroSeaUrl` | null | — | https://distrosea.com/select/steamos/ and /select/steam-os/ both HTTP 404 -> null |
| `testDriveUrl` | null | — | no browser demo published |
| `installerExperience` | MANUAL | [help.steampowered.com](https://help.steampowered.com/en/faqs/view/65B4-2AA3-5F37-4227) | 'Currently, the only devices officially "Powered by SteamOS" are Steam Deck, Steam Machine and Legion Go S' + 'For most non-Steam Deck devices, you will need to disable Secure Boot on your device in order to re-image from a USB drive' -> no general installer; MANUAL |
| `maintenanceStyle` | LOW_FRICTION | [en.wikipedia.org](https://en.wikipedia.org/wiki/SteamOS) | 'dual-mode ... a console-style mode ... and a KDE Plasma desktop environment'; updates are system-managed image updates ('You can download the updates yourself in the System Settings on the Steam Deck') -> LOW_FRICTION |
| `proprietarySupport` | FULL | [en.wikipedia.org](https://en.wikipedia.org/wiki/SteamOS) | 'Source model \| Open source base system with closed source components'; 'The core operating system is free and open-source software, while the Steam client remains proprietary.' -> shipped by default |
| `suitableForOldHardware` | false | [en.wikipedia.org](https://en.wikipedia.org/wiki/SteamOS) | 'built specifically to support Steam ... Valve's line of gaming hardware' -> modern AMD hardware only |
| `gamingSupport` | GOOD | [en.wikipedia.org](https://en.wikipedia.org/wiki/SteamOS) | 'Gaming-focused'; incorporates Proton: 'enabling many Windows games to run on Linux' |
| `privacyPosture` | DEFAULT | [en.wikipedia.org](https://en.wikipedia.org/wiki/SteamOS) | no privacy-hardening claims upstream; ships the Steam client with its accounts/telemetry -> DEFAULT |
| `docsEcosystem` | OK | [partner.steamgames.com](https://partner.steamgames.com/doc/steamhardware/steamdeck) | docs split across Steam Support, Steamworks and gitlab.steamos.cloud -> OK |
| `supportedDesktops` | ["KDE"] | [en.wikipedia.org](https://en.wikipedia.org/wiki/SteamOS) | 'Default user interface \| Steam (gaming mode) / KDE Plasma (desktop mode)' -> KDE |
| `supportedArchitectures` | ["x86_64", "arm64"] | [en.wikipedia.org](https://en.wikipedia.org/wiki/SteamOS) | 'Supported platforms \| x86-64, ARM64' (Steam Frame is Arm64 and runs SteamOS) -> x86_64 + arm64 |
| `releaseModel` | ROLLING | [en.wikipedia.org](https://en.wikipedia.org/wiki/SteamOS) | 'uses a rolling release model that Valve felt was better suited for hardware support' -> ROLLING |
| `initSystem` | SYSTEMD | [en.wikipedia.org](https://en.wikipedia.org/wiki/SteamOS) | Arch base ships systemd -> SYSTEMD |
| `packageManager` | PACMAN | [en.wikipedia.org](https://en.wikipedia.org/wiki/SteamOS) | 'Package manager \| APT (versions 1.0 and 2.0) / Flatpak, Pacman (version 3.0)' -> PACMAN |
| `primaryUseCase` | DESKTOP | [en.wikipedia.org](https://en.wikipedia.org/wiki/SteamOS) | 'Marketing target \| Gaming' with a desktop mode -> DESKTOP |
| `laptopFriendly` | true | [en.wikipedia.org](https://en.wikipedia.org/wiki/SteamOS) | handheld-first design (Steam Deck) -> true |
| `immutable` | true | [en.wikipedia.org](https://en.wikipedia.org/wiki/SteamOS) | image-based OS whose root is read-only by design; task constraint states SteamOS = true |
| `lastVerified` | 2026-09-28 | — | researched 2026-09-28 |
| `verificationMethod` | MANUAL | — | upstream pages read on 2026-09-28 |
| `secureBootOutOfBox` | false | [help.steampowered.com](https://help.steampowered.com/en/faqs/view/65B4-2AA3-5F37-4227) | 'For most non-Steam Deck devices, you will need to disable Secure Boot on your device in order to re-image from a USB drive' -> no signed default boot path -> false |
| `nvidiaExperience` | HARD | [help.steampowered.com](https://help.steampowered.com/en/faqs/view/65B4-2AA3-5F37-4227) | 'compatibility with other AMD powered PCs (handhelds and desktops) has been improved' - NVIDIA is unsupported -> HARD |

**Unverified / inferred / judgement calls**

- installerExperience — SteamOS has no general-purpose installer: Valve ships pre-imaged devices plus a recovery image, and PC installs are documented as manual. MANUAL chosen; no upstream wording confirms the GUI/MANUAL split. proprietarySupport — FULL inferred from upstream 'open source base system with closed source components' (ships the closed-source Steam client); the field definition talks about drivers/codecs, so this is a boundary call. documentationUrl — Valve publishes no single SteamOS documentation portal; the Steamworks Steam Deck page was chosen (redirect target of partner.steamgames.com/doc/steamdeck). The Steam Support FAQ .../65B4-2AA3-5F37-4227 is the user-facing alternative. docsEcosystem — OK is inferred from docs being split across Steam Support, Steamworks and gitlab.steamos.cloud; not measured.

## Red Hat Enterprise Linux (`rhel`)

| field | value | source | quote / note |
|---|---|---|---|
| `id` | rhel | [en.wikipedia.org](https://en.wikipedia.org/wiki/Red_Hat_Enterprise_Linux) | 'Red Hat Enterprise Linux' article; official site redhat.com |
| `name` | Red Hat Enterprise Linux | [en.wikipedia.org](https://en.wikipedia.org/wiki/Red_Hat_Enterprise_Linux) | 'Red Hat Enterprise Linux (RHEL) is a commercial Linux distribution developed by Red Hat.' |
| `description` | Commercial enterprise Linux distribution from Red Hat. | [en.wikipedia.org](https://en.wikipedia.org/wiki/Red_Hat_Enterprise_Linux) | 'released in server versions for x86-64, Power ISA, ARM64, and IBM Z and a desktop version for x86-64' |
| `imageUrl` | https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Red_Hat_Enterprise_Linux_logo.svg/500px-Red_Hat_Enterprise_Linux_logo.svg.png | [upload.wikimedia.org](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Red_Hat_Enterprise_Linux_logo.svg/500px-Red_Hat_Enterprise_Linux_logo.svg.png) | commons.wikimedia.org/File:Red_Hat_Enterprise_Linux_logo.svg thumb (500px PNG) -> HTTP 200 image/png |
| `websiteUrl` | https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux | [www.redhat.com](https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux) | 'Official website \| redhat.com/rhel/'; HTTP 200 |
| `documentationUrl` | https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/ | [docs.redhat.com](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/) | Red Hat product documentation; HTTP 403 to curl (bot wall) but loads in a real browser as 'Red Hat Enterprise Linux \| 10 \| Red Hat Documentation'. Verified content at https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/10/html/managing_monitoring_and_updating_the_kernel/signing-a-kernel-and-modules-for-secure-boot |
| `forumUrl` | https://access.redhat.com/discussions | [access.redhat.com](https://access.redhat.com/discussions) | official Red Hat discussion space; HTTP 200 |
| `downloadUrl` | https://developers.redhat.com/products/rhel/download | [developers.redhat.com](https://developers.redhat.com/products/rhel/download) | 'Download Red Hat Enterprise Linux (RHEL)' on developers.redhat.com (free developer subscription); HTTP 403 to curl, HTTP 200 in a real browser |
| `distroSeaUrl` | null | — | https://distrosea.com/select/rhel/, /redhat/, /red-hat-enterprise-linux/ all HTTP 404 -> null |
| `testDriveUrl` | null | — | no browser demo published |
| `installerExperience` | GUI | [en.wikipedia.org](https://en.wikipedia.org/wiki/Red_Hat_Enterprise_Linux) | installer is Anaconda; RHEL 10 screenshot captioned 'RHEL 10.0, showing its default desktop environment (GNOME 47)' -> GUI |
| `maintenanceStyle` | HANDS_ON | [en.wikipedia.org](https://en.wikipedia.org/wiki/Red_Hat_Enterprise_Linux) | 'Update method \| DNF or bootc', three predictable lifecycle phases ('full support, maintenance support, and extended life phase') -> HANDS_ON, consistent with the rocky_linux/almalinux/centos_stream entries in distros.json |
| `proprietarySupport` | OPTIONAL | [en.wikipedia.org](https://en.wikipedia.org/wiki/Red_Hat_Enterprise_Linux) | 'License \| Various free software licenses, plus proprietary binary blobs' (firmware, excluded from this field); NVIDIA needs third-party repos -> OPTIONAL |
| `suitableForOldHardware` | false | [en.wikipedia.org](https://en.wikipedia.org/wiki/Red_Hat_Enterprise_Linux) | 'Marketing target \| Commercial market (servers, mainframes, supercomputers, workstations)' and x86-64-v3 baseline for the latest release -> false |
| `gamingSupport` | NONE | [en.wikipedia.org](https://en.wikipedia.org/wiki/Red_Hat_Enterprise_Linux) | no gaming stack; server/workstation focus -> NONE |
| `privacyPosture` | DEFAULT | [en.wikipedia.org](https://en.wikipedia.org/wiki/Red_Hat_Enterprise_Linux) | no privacy-hardening claims upstream -> DEFAULT |
| `docsEcosystem` | EXCELLENT | [docs.redhat.com](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/) | extensive product documentation, install/config guides and knowledge base -> EXCELLENT |
| `supportedDesktops` | ["GNOME"] | [en.wikipedia.org](https://en.wikipedia.org/wiki/Red_Hat_Enterprise_Linux) | 'Default user interface \| GNOME Shell, Bash' -> GNOME (note: the existing rocky_linux/almalinux/centos_stream entries use OTHER) |
| `supportedArchitectures` | ["x86_64", "arm64"] | [en.wikipedia.org](https://en.wikipedia.org/wiki/Red_Hat_Enterprise_Linux) | 'Supported platforms \| x86-64 (x86-64-v3 for latest), ARM64, IBM Z, IBM Power Systems' -> x86_64 + arm64 |
| `releaseModel` | FIXED | [en.wikipedia.org](https://en.wikipedia.org/wiki/Red_Hat_Enterprise_Linux) | '10.2 / May 20, 2026', '9.8', '8.10' majorminor point releases -> FIXED |
| `initSystem` | SYSTEMD | [en.wikipedia.org](https://en.wikipedia.org/wiki/Red_Hat_Enterprise_Linux) | RHEL uses systemd -> SYSTEMD |
| `packageManager` | DNF | [en.wikipedia.org](https://en.wikipedia.org/wiki/Red_Hat_Enterprise_Linux) | 'Update method \| DNF or bootc'; 'Package manager \| RPM' -> DNF |
| `primaryUseCase` | SERVER | [en.wikipedia.org](https://en.wikipedia.org/wiki/Red_Hat_Enterprise_Linux) | 'Marketing target \| Commercial market (servers, mainframes, supercomputers, workstations)' -> SERVER |
| `laptopFriendly` | false | [en.wikipedia.org](https://en.wikipedia.org/wiki/Red_Hat_Enterprise_Linux) | server/workstation target; no laptop-specific support upstream -> false |
| `immutable` | false | [en.wikipedia.org](https://en.wikipedia.org/wiki/Red_Hat_Enterprise_Linux) | standard read-write install (image mode is opt-in) -> false |
| `lastVerified` | 2026-09-28 | — | researched 2026-09-28 |
| `verificationMethod` | MANUAL | — | upstream pages read on 2026-09-28 |
| `secureBootOutOfBox` | true | [docs.redhat.com](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/10/html/managing_monitoring_and_updating_the_kernel/signing-a-kernel-and-modules-for-secure-boot) | 'The shim file contains the Red Hat public key Red Hat Secure Boot (CA key 1) to authenticate the GRUB boot loader and the kernel.' -> signed shim + kernel by default -> true |
| `nvidiaExperience` | HARD | [en.wikipedia.org](https://en.wikipedia.org/wiki/Red_Hat_Enterprise_Linux) | no NVIDIA driver in the default repos; requires third-party repos -> HARD |

**Unverified / inferred / judgement calls**

- maintenanceStyle — HANDS_ON chosen for consistency with the existing rocky_linux / almalinux / centos_stream entries in distros.json; RHEL is arguably LOW_FRICTION for an entitled subscriber. proprietarySupport — OPTIONAL chosen for the same sibling-consistency reason; RHEL ships proprietary firmware (excluded from the field) and NVIDIA needs third-party repos. supportedDesktops — ['GNOME'] taken from upstream (GNOME Shell is the default UI), which DIFFERS from the existing rocky_linux/almalinux/centos_stream entries that use ['OTHER']; flagged rather than copied. laptopFriendly / suitableForOldHardware — false; inferred from the server/workstation marketing target, and the x86-64-v3 requirement for RHEL 10 narrows old hardware further.
- documentationUrl / downloadUrl — both return HTTP 403 to non-browser clients (Red Hat bot wall) but load in a real browser; see the URL table.

## Raspberry Pi OS (`raspios`)

| field | value | source | quote / note |
|---|---|---|---|
| `id` | raspios | [en.wikipedia.org](https://en.wikipedia.org/wiki/Raspberry_Pi_OS) | 'Raspberry Pi OS' article; official page raspberrypi.com/software/operating-systems/ |
| `name` | Raspberry Pi OS | [en.wikipedia.org](https://en.wikipedia.org/wiki/Raspberry_Pi_OS) | 'Raspberry Pi OS is a Unix-like operating system developed for the Raspberry Pi line of single-board computers.' |
| `description` | Debian-based operating system for Raspberry Pi single-board computers. | [en.wikipedia.org](https://en.wikipedia.org/wiki/Raspberry_Pi_OS) | 'Based on Debian, a Linux distribution, it is maintained by Raspberry Pi Holdings and optimized for the Pi's hardware' |
| `imageUrl` | https://upload.wikimedia.org/wikipedia/commons/c/c8/Raspberrry_pi_logo.png | [upload.wikimedia.org](https://upload.wikimedia.org/wikipedia/commons/c/c8/Raspberrry_pi_logo.png) | commons.wikimedia.org/File:Raspberrry_pi_logo.png (512x512 Raspberry Pi mark); direct URL appears 23x on the file page, HTTP 200. Official-site alternative: https://assets.raspberrypi.com/static/logo-663a71244b0e42ebedb0ddd72abcae73.png (declared as the org logo in the page's JSON-LD) |
| `websiteUrl` | https://www.raspberrypi.com/software/ | [www.raspberrypi.com](https://www.raspberrypi.com/software/) | 'Raspberry Pi OS is our official operating system ... View all download options'; HTTP 200 to the content extractor (Cloudflare challenge to curl/headless) |
| `documentationUrl` | https://www.raspberrypi.com/documentation/computers/os.html | [www.raspberrypi.com](https://www.raspberrypi.com/documentation/computers/os.html) | 'Raspberry Pi OS is the official operating system (OS) for Raspberry Pi computers and is free.' HTTP 200 via extractor |
| `forumUrl` | https://forums.raspberrypi.com/ | [forums.raspberrypi.com](https://forums.raspberrypi.com/) | 'Board index ... General discussion, Announcements, Using the Raspberry Pi'; HTTP 200 via extractor |
| `downloadUrl` | https://www.raspberrypi.com/software/operating-systems/ | [www.raspberrypi.com](https://www.raspberrypi.com/software/operating-systems/) | 'Raspberry Pi OS downloads' page; HTTP 200 |
| `distroSeaUrl` | null | — | https://distrosea.com/select/raspberry-pi-os/, /raspios/, /raspberry-pi/, /raspberrypi/ all HTTP 404 -> null |
| `testDriveUrl` | null | — | no browser demo published |
| `installerExperience` | GUI | [www.raspberrypi.com](https://www.raspberrypi.com/documentation/computers/os.html) | 'Raspberry Pi OS is installed using Raspberry Pi Imager, available for Windows, Mac, and Linux.' -> GUI image-writing tool |
| `maintenanceStyle` | LOW_FRICTION | [www.raspberrypi.com](https://www.raspberrypi.com/documentation/computers/os.html) | 'We recommend using APT to keep your Raspberry Pi software up to date ... sudo apt full-upgrade' with vendor-managed kernel/firmware -> LOW_FRICTION |
| `proprietarySupport` | FULL | [gist.github.com](https://gist.github.com/jauderho/5f73f16cac28669e56608be14c41006c) | stock Raspberry Pi OS /etc/apt/sources.list: 'deb http://deb.debian.org/debian trixie main contrib non-free non-free-firmware' -> non-free enabled by default -> FULL (definition clause 2). Caveat: libwidevinecdm0 (Widevine, proprietary) is a documented opt-in 'sudo apt install libwidevinecdm0' and firmware is excluded from the field |
| `suitableForOldHardware` | false | [www.raspberrypi.com](https://www.raspberrypi.com/documentation/computers/os.html) | the 'older hardware' upstream talks about is older Raspberry Pi models ('useful for ... older Raspberry Pi models, such as the original Raspberry Pi, Raspberry Pi 2, and Raspberry Pi Zero'), not older x86_64 machines -> false |
| `gamingSupport` | LIMITED | [www.raspberrypi.com](https://www.raspberrypi.com/documentation/computers/os.html) | no gaming stack shipped (the desktop image lists Chromium/Firefox, VLC, Thonny) -> LIMITED |
| `privacyPosture` | DEFAULT | [www.raspberrypi.com](https://www.raspberrypi.com/documentation/computers/os.html) | no privacy-hardening claims upstream -> DEFAULT |
| `docsEcosystem` | EXCELLENT | [www.raspberrypi.com](https://www.raspberrypi.com/documentation/computers/os.html) | complete first-party documentation site (os, config, GPIO, Imager) -> EXCELLENT |
| `supportedDesktops` | ["OTHER"] | [en.wikipedia.org](https://en.wikipedia.org/wiki/Raspberry_Pi_OS) | 'Default user interface \| labwc (Wayland-based)' - a Pi desktop, not one of the listed DEs -> OTHER |
| `supportedArchitectures` | ["arm64"] | [en.wikipedia.org](https://en.wikipedia.org/wiki/Raspberry_Pi_OS) | 'Supported platforms \| armhf, aarch64' and 'available in both 64-bit and 32-bit versions'. Only 'arm64' is used: the codebase vocabulary (src/engine/eliminate.ts) recognises x86_64 / arm64 and 'armhf' is not an accepted string |
| `releaseModel` | FIXED | [www.raspberrypi.com](https://www.raspberrypi.com/documentation/computers/os.html) | 'Raspberry Pi follows a staggered version of the Debian release cycle. Releases happen roughly once every two years.' -> FIXED |
| `initSystem` | SYSTEMD | [en.wikipedia.org](https://en.wikipedia.org/wiki/Raspberry_Pi_OS) | Debian-based with systemd -> SYSTEMD |
| `packageManager` | APT | [en.wikipedia.org](https://en.wikipedia.org/wiki/Raspberry_Pi_OS) | 'Package manager \| APT, dpkg' -> APT |
| `primaryUseCase` | BOTH | [www.raspberrypi.com](https://www.raspberrypi.com/documentation/computers/os.html) | 'Raspberry Pi OS Lite (a command-line-only version without a graphical desktop). This edition is useful for headless servers, embedded systems' alongside the desktop editions -> BOTH |
| `laptopFriendly` | false | [en.wikipedia.org](https://en.wikipedia.org/wiki/Raspberry_Pi_OS) | an SBC/kiosk OS, not laptop hardware support (no upstream laptop claim) -> false |
| `immutable` | false | [en.wikipedia.org](https://en.wikipedia.org/wiki/Raspberry_Pi_OS) | read-write root, APT upgrade path -> false |
| `lastVerified` | 2026-09-28 | — | researched 2026-09-28 |
| `verificationMethod` | MANUAL | — | upstream pages read on 2026-09-28 |
| `secureBootOutOfBox` | false | [en.wikipedia.org](https://en.wikipedia.org/wiki/Raspberry_Pi_OS) | no UEFI Secure Boot path in the default Raspberry Pi firmware; no upstream claim -> false |
| `nvidiaExperience` | UNKNOWN | [en.wikipedia.org](https://en.wikipedia.org/wiki/Raspberry_Pi_OS) | no NVIDIA GPU support on Raspberry Pi hardware; not documented -> UNKNOWN |

**Unverified / inferred / judgement calls**

- proprietarySupport — MOST UNCERTAIN FIELD. FULL is taken from the definition's second clause (proprietary packages installable from repos enabled by default): stock Raspberry Pi OS sources.list contains 'main contrib non-free non-free-firmware'. The OPTIONAL reading applies if you discount the enabled-by-default non-free component and note that Widevine (libwidevinecdm0) is a documented opt-in apt install and firmware is excluded from the field. installerExperience — GUI means Raspberry Pi Imager writes a prebuilt image; there is no on-device OS installer, so GUI is a proxy for 'simple installer'. nvidiaExperience — UNKNOWN (no NVIDIA path on Raspberry Pi hardware); not documented either way. supportedArchitectures — only 'arm64' is used because the codebase's architecture vocabulary is x86_64 / arm64 / x86 (see src/engine/eliminate.ts) and 'armhf' is NOT an accepted string. The 32-bit armhf edition therefore cannot be expressed and is deliberately omitted. primaryUseCase — BOTH because upstream documents a Lite (headless/server) edition alongside the desktop edition.

## antiX (`antix`)

| field | value | source | quote / note |
|---|---|---|---|
| `id` | antix | [antixlinux.com](https://antixlinux.com/) | official site antixlinux.com; 'antiX Magic in an environment suitable for old and new computers' |
| `name` | antiX | [antixlinux.com](https://antixlinux.com/about/) | 'antiX is a fast, lightweight and easy to install systemd-free and elogind-free linux live CD distribution based on Debian Stable' |
| `description` | Lightweight Debian-based distribution that runs without systemd. | [antixlinux.com](https://antixlinux.com/about/) | 'fast, lightweight and easy to install systemd-free and elogind-free linux live CD distribution based on Debian Stable for Intel-AMD x86 compatible systems' |
| `imageUrl` | https://upload.wikimedia.org/wikipedia/commons/e/ec/AntiX_logo.png | [upload.wikimedia.org](https://upload.wikimedia.org/wikipedia/commons/e/ec/AntiX_logo.png) | commons.wikimedia.org/File:AntiX logo.png (138x111), only file in Category:AntiX logos; HTTP 200 image/png |
| `websiteUrl` | https://antixlinux.com/ | [antixlinux.com](https://antixlinux.com/) | HTTP 200 |
| `documentationUrl` | https://robin-antix.codeberg.page/antiX-FAQ/antiX26/ | [antixlinux.com](https://antixlinux.com/about/) | 'Useful documentation: antiX-26 FAQ' -> https://robin-antix.codeberg.page/antiX-FAQ/antiX26/ (HTTP 200); MX wiki/manual are additional first-party docs |
| `forumUrl` | https://www.antixforum.com/ | [www.antixforum.com](https://www.antixforum.com/) | 'antiX-forum - Forum for users of antiX Linux'; HTTP 403 to curl (Cloudflare challenge) but content served to the extractor |
| `downloadUrl` | https://antixlinux.com/download/ | [antixlinux.com](https://antixlinux.com/download/) | 'antiX-26 - Released 21 March 2026 ... antiX-26 includes 5 init systems'; ISO links to sourceforge.net/projects/antix-linux/files/Final/antiX-26/; HTTP 200 |
| `distroSeaUrl` | https://distrosea.com/select/antix/ | [distrosea.com](https://distrosea.com/select/antix/) | HTTP 200 (calibrated against a bogus slug returning 404) |
| `testDriveUrl` | null | — | no browser demo published by the project |
| `installerExperience` | GUI | [antixlinux.com](https://antixlinux.com/antix-26-released/) | 'Freja for default wallpaper ... AK-47 for further impressive work on the installer's extended features'; FAQ: 'at the live boot menu, type 3, login as root and type cli-installer' (CLI installer documented as the exception) -> GUI by default |
| `maintenanceStyle` | LOW_FRICTION | [robin-antix.codeberg.page](https://robin-antix.codeberg.page/antiX-FAQ/antiX26/) | 'antiX is set up using Debian Stable repositories by default ... antiX recommends using apt update followed by apt dist-upgrade', with Control Centre -> antiX Updater -> LOW_FRICTION (analogous to the mx_linux entry) |
| `proprietarySupport` | OPTIONAL | [robin-antix.codeberg.page](https://robin-antix.codeberg.page/antiX-FAQ/antiX26/) | OPTIONAL: 'You may need to install libdvdcss2 and maybe some codecs by enabling the deb-multimedia repository'; Package Installer has a 'Non-free' category. Counter-evidence in the same FAQ: 'The following packages are installed from the trixie-backports repo ... broadcom-sta-dkms, firmware-linux-nonfree' (broadcom-sta-dkms is a non-free driver) -> see uncertainty note |
| `suitableForOldHardware` | true | [antixlinux.com](https://antixlinux.com/about/) | 'It should run on most computers, ranging from 256MB old systems with pre-configured swap to the latest powerful boxes. 512MB RAM is the recommended minimum' |
| `gamingSupport` | NONE | [antixlinux.com](https://antixlinux.com/antix-26-released/) | shipped stack is xmms, celluloid/mpv/Xine, LibreOffice, Firefox ESR - no gaming layer; 32/64-bit packaging -> NONE (inferred) |
| `privacyPosture` | DEFAULT | [antixlinux.com](https://antixlinux.com/about/) | 'systemd-free and elogind-free' but no privacy hardening claims (no Tor/privacy tooling) -> DEFAULT |
| `docsEcosystem` | OK | [robin-antix.codeberg.page](https://robin-antix.codeberg.page/antiX-FAQ/antiX26/) | official FAQ + MX wiki/manual, community wiki; no single docs portal -> OK (inferred) |
| `supportedDesktops` | ["OTHER"] | [antixlinux.com](https://antixlinux.com/antix-26-released/) | 'We continue using window managers ... IceWM (default), fluxbox, jwm and the tiling window manager - herbstluftwm' -> OTHER |
| `supportedArchitectures` | ["x86_64", "x86"] | [antixlinux.com](https://antixlinux.com/antix-26-released/) | 'There are 2 flavours ... for 64bit and 32bit arch' -> x86_64 + x86 |
| `releaseModel` | FIXED | [robin-antix.codeberg.page](https://robin-antix.codeberg.page/antiX-FAQ/antiX26/) | 'antiX is based on Debian ... keep to the Debian Stable/Trixie repositories' with numbered point releases (antiX-26) -> FIXED; FAQ notes a rolling option only if the user enables testing/sid |
| `initSystem` | RUNIT | [antixlinux.com](https://antixlinux.com/antix-26-released/) | 'antiX-26 ... includes 5 init systems. (runit, sysVinit, dinit, s6-rc and s6-66). Default init=runit.' -> RUNIT |
| `packageManager` | APT | [antixlinux.com](https://antixlinux.com/about/) | 'based on Debian Stable' + FAQ uses apt/synaptic -> APT |
| `primaryUseCase` | DESKTOP | [antixlinux.com](https://antixlinux.com/about/) | 'The goal of antiX is to provide a light, but fully functional and flexible free operating system' for desktop old/new computers -> DESKTOP |
| `laptopFriendly` | true | [antixlinux.com](https://antixlinux.com/about/) | targets old laptops/desktops ('So don't throw away that old computer yet!'), runs live from USB -> true |
| `immutable` | false | [robin-antix.codeberg.page](https://robin-antix.codeberg.page/antiX-FAQ/antiX26/) | standard read-write install with remaster/snapshot tools -> false |
| `lastVerified` | 2026-09-28 | — | researched 2026-09-28 |
| `verificationMethod` | MANUAL | — | upstream pages read on 2026-09-28 |
| `secureBootOutOfBox` | false | [robin-antix.codeberg.page](https://robin-antix.codeberg.page/antiX-FAQ/antiX26/) | sysvinit/runit distro with no signed shim path documented -> false |
| `nvidiaExperience` | OK | [antixlinux.com](https://antixlinux.com/antix-26-released/) | 'ddm-mx - install nvidia drivers' shipped tool; FAQ has a 'How to Setup nvidia graphics drivers?' section -> OK |

**Unverified / inferred / judgement calls**

- proprietarySupport — DISPUTED. OPTIONAL chosen because antiX's own FAQ routes all non-free acquisition through first-party opt-in tooling (Package Installer > Non-free, deb-multimedia for codecs, Repo Manager). Counter-evidence: the same FAQ says broadcom-sta-dkms (a non-free driver) and firmware-linux-nonfree are 'installed from the trixie-backports repo', which would make the entry FULL under the definition's first clause. Not resolved from upstream sources. maintenanceStyle — LOW_FRICTION chosen by analogy with the sibling mx_linux entry; antiX is an update-by-terminal distro (apt update && apt dist-upgrade) with a GUI updater, so HANDS_ON is arguable. gamingSupport — NONE inferred (no gaming stack shipped, old-hardware focus); antiX can install Steam from Debian, so LIMITED is arguable. documentationUrl — antiX has no single docs portal; the official antiX-26 FAQ was used. docsEcosystem OK likewise inferred. nvidiaExperience — OK because antiX ships ddm-mx ('install nvidia drivers'); no upstream statement of how well it works.

## Devuan (`devuan`)

| field | value | source | quote / note |
|---|---|---|---|
| `id` | devuan | [en.wikipedia.org](https://en.wikipedia.org/wiki/Devuan) | 'Devuan' article; official site www.devuan.org |
| `name` | Devuan | [www.devuan.org](https://www.devuan.org/) | 'Welcome to Devuan ... Devuan GNU+Linux is a fork of Debian without systemd' |
| `description` | Debian fork that uses sysvinit instead of systemd by default. | [en.wikipedia.org](https://en.wikipedia.org/wiki/Devuan) | 'Devuan is an open source, Debian-based Linux distribution that aims to maintain compatibility with other init systems and avoid lock-in by systemd.' |
| `imageUrl` | https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Devuan-logo.svg/500px-Devuan-logo.svg.png | [upload.wikimedia.org](https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Devuan-logo.svg/500px-Devuan-logo.svg.png) | commons.wikimedia.org/File:Devuan-logo.svg thumb (500px PNG) -> HTTP 200 image/png |
| `websiteUrl` | https://www.devuan.org/ | [www.devuan.org](https://www.devuan.org/) | HTTP 200 |
| `documentationUrl` | https://www.devuan.org/os/install | [www.devuan.org](https://www.devuan.org/os/install) | www.devuan.org/os/documentation/ returns HTTP 404 upstream, so the install/documentation index was used: 'Please read the relevant documentation (/os/install) in full'; HTTP 200 |
| `forumUrl` | https://dev1galaxy.org/ | [dev1galaxy.org](https://dev1galaxy.org/) | Devuan community forum (linked from /os/community); HTTP 200 |
| `downloadUrl` | https://www.devuan.org/get-devuan | [www.devuan.org](https://www.devuan.org/get-devuan) | 'Devuan has http, https, ftp and rsync iso mirrors available as well as torrent and magnet link options.'; HTTP 200 |
| `distroSeaUrl` | https://distrosea.com/select/devuan/ | [distrosea.com](https://distrosea.com/select/devuan/) | HTTP 200 (calibrated against a bogus slug returning 404) |
| `testDriveUrl` | null | — | no browser demo published |
| `installerExperience` | GUI | [files.devuan.org](https://files.devuan.org/devuan_daedalus/desktop-live/README_desktop-live.txt) | 'This Devuan live-iso comes with Refracta Installer' / 'refractainstaller-yad # Starts the graphical installer.'; the desktop-live install guide is titled 'Live Install Guide ... uses the graphical desktop-live installer' -> GUI |
| `maintenanceStyle` | HANDS_ON | [en.wikipedia.org](https://en.wikipedia.org/wiki/Devuan) | Debian-stable point releases ('Latest release \| 6.1'), user-managed apt/troubleshooting and no systemd-based automation -> HANDS_ON (consistent with the debian entry) |
| `proprietarySupport` | OPTIONAL | [www.devuan.org](https://www.devuan.org/get-devuan) | 'Firmware is installed but can easily be removed ... The "expert install" allows user to opt out of firmware installation' (firmware excluded from this field); non-free drivers need the Debian non-free components enabled as on Debian -> OPTIONAL (inferred) |
| `suitableForOldHardware` | true | [en.wikipedia.org](https://en.wikipedia.org/wiki/Devuan) | 'Supported platforms \| i386, amd64, ARM, ppc64el' - 32-bit i386 media keeps very old x86 hardware viable -> true (inferred from i386 media, not an explicit low-RAM claim) |
| `gamingSupport` | LIMITED | [en.wikipedia.org](https://en.wikipedia.org/wiki/Devuan) | Debian-derived, no gaming layer shipped by the project -> LIMITED |
| `privacyPosture` | DEFAULT | [en.wikipedia.org](https://en.wikipedia.org/wiki/Devuan) | no privacy-hardening claims upstream -> DEFAULT |
| `docsEcosystem` | OK | [www.devuan.org](https://www.devuan.org/os/install) | first-party install guides + releases pages, otherwise pointing at Debian docs -> OK (inferred) |
| `supportedDesktops` | ["XFCE"] | [en.wikipedia.org](https://en.wikipedia.org/wiki/Devuan) | 'Default user interface \| Xfce' -> XFCE |
| `supportedArchitectures` | ["x86_64", "x86", "arm64"] | [en.wikipedia.org](https://en.wikipedia.org/wiki/Devuan) | 'Supported platforms \| i386, amd64, ARM, ppc64el'; get-devuan lists 'Installation Media for amd64, arm64, armel, armhf, and ppc64el' -> x86_64 + x86 + arm64 |
| `releaseModel` | FIXED | [www.devuan.org](https://www.devuan.org/os/releases) | 'Excalibur 6 is the current stable release' with numbered point releases -> FIXED |
| `initSystem` | OTHER | [www.devuan.org](https://www.devuan.org/os/init-freedom) | 'Devuan uses the sysvinit init system by default.' (openrc and runit are alternates) -> OTHER (sysvinit has no enum value) |
| `packageManager` | APT | [en.wikipedia.org](https://en.wikipedia.org/wiki/Devuan) | 'Package manager \| APT (dpkg)' -> APT |
| `primaryUseCase` | BOTH | [www.devuan.org](https://www.devuan.org/get-devuan) | 'netinstall: Preferred by more experienced users to create servers, minimal systems but also includes choice of several Desktop Environments' -> BOTH |
| `laptopFriendly` | true | [en.wikipedia.org](https://en.wikipedia.org/wiki/Devuan) | Debian-derived with full desktop ISOs; no laptop-specific claim upstream -> true (inferred) |
| `immutable` | false | [en.wikipedia.org](https://en.wikipedia.org/wiki/Devuan) | standard read-write Debian-style install -> false |
| `lastVerified` | 2026-09-28 | — | researched 2026-09-28 |
| `verificationMethod` | MANUAL | — | upstream pages read on 2026-09-28 |
| `secureBootOutOfBox` | false | [www.devuan.org](https://www.devuan.org/get-devuan) | signed by developer keys for ISOs but no shim/signed-kernel Secure Boot path documented -> false |
| `nvidiaExperience` | OK | [en.wikipedia.org](https://en.wikipedia.org/wiki/Devuan) | Debian's non-free nvidia driver path applies; nothing documented by Devuan -> OK (inferred) |

**Unverified / inferred / judgement calls**

- initSystem — OTHER encodes sysvinit, which has no enum value; OPENRC and RUNIT are only alternate inits here. installerExperience — GUI because the desktop-live ISO ships the graphical refractainstaller-yad; the netinstall/server ISOs use the text Debian installer, so MANUAL is defensible for those media. documentationUrl — www.devuan.org/os/documentation/ returns 404 upstream; /os/install was used instead. proprietarySupport — OPTIONAL inferred by analogy with Debian (firmware ships by default and is excluded from the field; non-free drivers need enabling); no Devuan page states the default component set. laptopFriendly — true inferred from Debian lineage (no upstream laptop statement). suitableForOldHardware — true inferred from the i386/i686 install media; the field wording asks about 'older x86_64 machines' specifically. nvidiaExperience — OK inferred from the Debian non-free nvidia path; not stated upstream. docsEcosystem — OK inferred; Devuan inherits Debian docs but its own site is thin.

## URL check table (final URL / status observed 2026-09-28)

| url | status |
|---|---|
| omarchy.org — `https://omarchy.org/` | 200 |
| omarchy manual — `https://omarchy.org/manual/` | 200 |
| omarchy updates ch. — `https://omarchy.org/manual/updates/` | 200 |
| omarchy getting started — `https://omarchy.org/manual/getting-started` | 200 -> /manual/getting-started/ |
| omarchy iso repo — `https://github.com/basecamp/omarchy` | 200 -> github.com/omacom/omarchy |
| omarchy iso builder — `https://github.com/omacom/omarchy-iso` | 200 |
| omarchy legacy manual — `https://learn.omacom.io/2/the-omarchy-manual/50/getting-started` | 200 |
| omarchy discord — `https://omarchy.org/discord` | 200 |
| omarchy download anchor — `https://omarchy.org/#download` | 200 |
| omarchy logo — `https://upload.wikimedia.org/wikipedia/commons/c/c3/Omarchy_logo.png` | 200 image/png |
| distrosea omarchy — `https://distrosea.com/select/omarchy/` | 404 (null) |
| steamos site — `https://store.steampowered.com/steamos` | 200 |
| steamos download — `https://store.steampowered.com/steamos/download/?ver=steamdeck` | 200 |
| steamos support faq — `https://help.steampowered.com/en/faqs/view/65B4-2AA3-5F37-4227` | 200 |
| steamos forum — `https://steamcommunity.com/app/1675200/discussions/` | 200 |
| steamworks docs — `https://partner.steamgames.com/doc/steamdeck` | 200 -> /doc/steamhardware/steamdeck |
| steamos logo — `https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/SteamOS_wordmark.svg/500px-SteamOS_wordmark.svg.png` | 200 image/png |
| distrosea steamos — `https://distrosea.com/select/steamos/ (+ /steam-os/)` | 404 (null) |
| rhel site — `https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux` | 200 |
| rhel docs — `https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/` | 403 to curl -> 200 in browser ('Red Hat Enterprise Linux | 10 | Red Hat Documentation') |
| rhel secureboot doc — `https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/10/html/managing_monitoring_and_updating_the_kernel/signing-a-kernel-and-modules-for-secure-boot` | 200 |
| rhel forum — `https://access.redhat.com/discussions` | 200 |
| rhel download — `https://developers.redhat.com/products/rhel/download` | 403 to curl -> 200 in browser ('Download Red Hat Enterprise Linux (RHEL)') |
| rhel logo — `https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Red_Hat_Enterprise_Linux_logo.svg/500px-Red_Hat_Enterprise_Linux_logo.svg.png` | 200 image/png |
| distrosea rhel — `https://distrosea.com/select/rhel/ (+ /redhat/, /red-hat-enterprise-linux/)` | 404 (null) |
| raspios software — `https://www.raspberrypi.com/software/` | 403 challenge to curl/headless; 200 + content via extractor |
| raspios docs — `https://www.raspberrypi.com/documentation/computers/os.html` | 403 challenge to curl/headless; 200 + content via extractor |
| raspios downloads — `https://www.raspberrypi.com/software/operating-systems/` | 200 |
| raspios forum — `https://forums.raspberrypi.com/` | 403 challenge to curl/headless; 200 + content via extractor |
| raspios logo (Commons) — `https://upload.wikimedia.org/wikipedia/commons/c/c8/Raspberrry_pi_logo.png` | 200 image/png |
| raspios logo (official alt) — `https://assets.raspberrypi.com/static/logo-663a71244b0e42ebedb0ddd72abcae73.png` | 200 image/png (declared in page JSON-LD) |
| distrosea raspios — `https://distrosea.com/select/raspios/ (+ /raspberry-pi-os/)` | 404 (null) |
| antix home — `https://antixlinux.com/` | 200 |
| antix about — `https://antixlinux.com/about/` | 200 |
| antix 26 release — `https://antixlinux.com/antix-26-released/` | 200 |
| antix download — `https://antixlinux.com/download/` | 200 |
| antix faq — `https://robin-antix.codeberg.page/antiX-FAQ/antiX26/` | 200 |
| antix forum — `https://www.antixforum.com/` | 403 challenge to curl/headless; 200 + content via extractor |
| antix logo — `https://upload.wikimedia.org/wikipedia/commons/e/ec/AntiX_logo.png` | 200 image/png |
| distrosea antix — `https://distrosea.com/select/antix/` | 200 |
| devuan home — `https://www.devuan.org/` | 200 |
| devuan init freedom — `https://www.devuan.org/os/init-freedom` | 200 |
| devuan install/docs — `https://www.devuan.org/os/install` | 200 |
| devuan releases — `https://www.devuan.org/os/releases` | 200 |
| devuan get — `https://www.devuan.org/get-devuan` | 200 |
| devuan live readme — `https://files.devuan.org/devuan_daedalus/desktop-live/README_desktop-live.txt` | 200 |
| devuan live install guide — `https://www.devuan.org/os/documentation/install-guides/daedalus/live-gui` | 200 |
| devuan linux docs path — `https://www.devuan.org/os/documentation/` | 404 (not used) |
| devuan forum — `https://dev1galaxy.org/` | 200 |
| devuan logo — `https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Devuan-logo.svg/500px-Devuan-logo.svg.png` | 200 image/png |
| distrosea devuan — `https://distrosea.com/select/devuan/` | 200 |
| distrosea bogus (calibration) — `https://distrosea.com/select/zzz-nope-xyz/` | 404 |
| distrosea ubuntu (calibration) — `https://distrosea.com/select/ubuntu/` | 200 |

### Notes on blocked URLs

- Final sweep: all 32 distinct URLs present in the JSON output were requested with `curl -sL` on 2026-09-28. Result: 24 x HTTP 200, 7 x HTTP 403 (bot walls, see below) and 1 transient HTTP 429; the two Wikimedia thumb URLs that briefly returned 429 (rate limiting on a burst of requests) were re-requested after a pause and both returned 200 image/png.

- `raspberrypi.com` and `www.antixforum.com` sit behind a Cloudflare bot challenge: curl and a headless browser both get the challenge page, while the content extractor receives the real page (HTTP 200 with body). The URLs are live; only non-browser clients are challenged.
- `docs.redhat.com`, `access.redhat.com/documentation/...` and `developers.redhat.com` return 403 to curl but load normally in a real browser (verified by navigation: page titles are the real ones).

