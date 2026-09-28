# Tier-2 distro entries — evidence table

Entries: `vanilla_os`, `guix`, `archcraft`, `tinycore`. JSON: `new-distros-tier2.json`.
`lastVerified: 2026-09-28` for all four. Values not confirmed by the cited page are listed under **Unverified** per distro (kept at the most defensible option rather than hunted further).

Fetch budget used: 8 pages via the extract backend (2 failed: `vanillaos.org` first pass 500, `tinycorelinux.net/faq.html` backend error), plus raw `curl` HTML on already-fetched hosts, one HTTP-status sweep, and the Wikimedia Commons API (one endpoint, reused).

## Source keys

### Vanilla OS
| Key | URL | Quote / evidence |
|---|---|---|
| V1 | https://vanillaos.org/ | "This is all thanks to our tool called ABRoot, which guarantees **immutability and atomicity** on your system"; "Vib is a tool to create **OCI images** for Vanilla OS"; "Apx ... generate work environments based on any Linux distribution"; "support for the industry's most popular **game launchers** and peripherals"; hero image alt text "**Vanilla OS 3 Reunion**" |
| V2 | https://distrosea.com/select/vanillaos/ | "Vanilla OS is an **immutable Linux OS based on Debian** targetting developers, designers and students. Earlier versions of Vanilla OS was based on Ubuntu." (offers only 2.0 to try online) |
| V3 | https://docs.vanillaos.org/ | Collections: Docs, Handbook, Vib, apx (official technical docs) |
| V4 | https://commons.wikimedia.org/wiki/File:Vanilla-os-logo-black.png | Retrieved via Commons API `action=query&prop=imageinfo`; thumb URL returns 200 |

### Guix System
| Key | URL | Quote / evidence |
|---|---|---|
| G1 | https://guix.gnu.org/ | "GNU Guix ... designed to give users **more control**"; "A complete GNU operating system harnessing all the capabilities of the Guix software. Spawned by Guix itself."; "**All of It, Free Software**"; "Use Guile Scheme APIs ... to define packages and whole-system configurations" |
| G2 | https://commons.wikimedia.org/wiki/File:GNU_Guix_logo.svg | Commons API imageinfo hit; 1280px PNG thumb returns 200 |
| G3 | Commons API file-namespace search "Guix" | Screenshots `File:...GNU Guix installer.jpg` / "wizard installer" confirm a guided text installer exists |

### Archcraft
| Key | URL | Quote / evidence |
|---|---|---|
| A1 | https://archcraft.io/ | "Archcraft is a **minimal Linux distribution built on Arch Linux**. It uses **lightweight window managers** and applications, making it super fast."; "runs smoothly on **under 800 MB of memory**"; "seamless **AUR** access"; community links: Reddit, Discord, Telegram, Matrix |
| A2 | https://archcraft.io/download.html | "Latest Release : `archcraft-2026.08.01-x86_64.iso` Live Session Login ... liveuser"; "Archcraft is available only for 64-bit systems. There are no 32-bit, ARM, or WSL editions — and likely never will be. **Archcraft ARM is Here : Now available for ARMv7 (32-bit) and ARMv8 (aarch64, 64-bit)**"; GPG key `7DC81F73` |
| A3 | https://commons.wikimedia.org/wiki/File:Archcraft-logo.svg | Commons API hit; 1280px PNG thumb 200 |
| A4 | Commons API: `File:Archcraft-calamares.png`, `File:Archcraft-installer.png` | Archcraft Calamares installer screenshots exist → GUI installer |

### Tiny Core Linux
| Key | URL | Quote / evidence |
|---|---|---|
| T1 | http://tinycorelinux.net/ | "TinyCore becomes simply an example of what the Core Project can produce, an **16MB FLTK/FLWM desktop**"; "It is **not a complete desktop** nor is all hardware completely supported"; "The **latest version: 17.1**" (Core v17.0 → kernel 6.18.2); "be it for a desktop, a netbook, an appliance, or **server**"; "While Tiny Core always resides in **ram**" |
| T2 | Commons API file-namespace searches "Tiny Core Linux" / "tinycore logo" | Only screenshots (`File:Tiny Core Linux Desktop.png`), **no logo file** → `imageUrl: null` |

## Field-by-field

### vanilla_os — Vanilla OS (Vanilla OS 3 "Reunion")
| Field | Value | Source | Evidence |
|---|---|---|---|
| description | Immutable Debian-based GNOME desktop, atomic images, container app environments | V1,V2 | V1 ABRoot/OCI/Apx quotes; V2 "based on Debian" |
| imageUrl | `.../commons/c/cd/Vanilla-os-logo-black.png` | V4 | API imageinfo, 200 |
| websiteUrl / downloadUrl / forumUrl | vanillaos.org, /download, /community | V1 | 200 sweep (community page is the project's own community hub) |
| documentationUrl | https://docs.vanillaos.org/ | V3 | 200, official docs collections |
| distroSeaUrl | distrosea.com/select/vanillaos/ | V2 | 200 |
| testDriveUrl | null | — | no first-party browser test drive seen |
| installerExperience | GUI | V1 (inferred) | **unverified** — DE-based live image; installer UI not confirmed on fetched pages |
| maintenanceStyle | LOW_FRICTION | V1 | ABRoot atomic updates, "smart updates" (V2) |
| proprietarySupport | OPTIONAL | V1,V2 | **unverified** — Debian base, site markets gaming/peripheral support; no non-free repo enabled by default confirmed |
| suitableForOldHardware | false | V2 | Debian+GNOME+immutable image, no lightweight/32-bit offer |
| gamingSupport | GOOD | V1 | "support for the industry's most popular game launchers and peripherals" |
| privacyPosture | DEFAULT | V1 | no privacy/anonymity claims on page |
| supportedDesktops | ["GNOME"] | V1,V2 | GNOME desktop shown throughout |
| supportedArchitectures | ["x86_64"] | V2 | **unverified** — no arm64 build seen |
| releaseModel | FIXED | V1 | named versioned releases ("Vanilla OS 3 Reunion") |
| initSystem | SYSTEMD | V2 | Debian base |
| packageManager | APT | V2 | "based on Debian"; Apx containers are secondary |
| secureBootOutOfBox | true | V1 (inferred) | **unverified** |
| nvidiaExperience | OK | V1,V2 | **unverified** — Debian non-free driver path documented, not first-class; UNKNOWN is invariant-banned |
| immutable | true | V1 | "ABRoot, which guarantees immutability and atomicity" |
| primaryUseCase / laptopFriendly | DESKTOP / true | V1 | daily-driver marketing, "Work ... efficient workspace" |
| verificationMethod / docsEcosystem | MANUAL / GOOD | V1,V3 | project site + official docs read |

### guix — Guix System
| Field | Value | Source | Evidence |
|---|---|---|---|
| description | Declarative GNU/Linux system built from Guix, configured in Guile Scheme | G1 | "whole-system configurations" |
| imageUrl | Commons `GNU_Guix_logo.svg` 1280px thumb | G2 | 200 |
| websiteUrl / downloadUrl | guix.gnu.org, /en/download/ | G1 | 200 |
| documentationUrl | https://guix.gnu.org/manual/ | G1 | 200 (linked from site) |
| forumUrl | lists.gnu.org/mailman/listinfo/help-guix | G1 | 200; site lists mailing lists/IRC, no forum |
| distroSeaUrl | **null** | — | `/select/guix/`, `/select/guix-system/`, `/select/guixsd/` all **404** |
| installerExperience | MANUAL | G3 | guided *text* wizard; dataset precedent (`nixos`, `alpine` = MANUAL despite guided TUI installers) — **unverified** |
| maintenanceStyle | HANDS_ON | G1 | Scheme system config + `guix pull` |
| proprietarySupport | NONE | G1 | "All of It, Free Software" — no first-party non-free path (nonguix is third-party) |
| suitableForOldHardware | true | G1 | **unverified** — i686 target + libre kernel |
| gamingSupport | LIMITED | G1 | **unverified** — Steam needs the third-party nonguix channel |
| privacyPosture | DEFAULT | G1 | free-software stance, not an anonymity distro |
| supportedDesktops | GNOME, XFCE, MATE, LXQT, TILING | G1 | **unverified** — G1 confirms desktop environments generally, not the exact list |
| supportedArchitectures | x86_64, i686, aarch64, armv7 | G1 | **unverified** |
| releaseModel | ROLLING | G1 | "reproduce over time" / continuous `guix pull`; no OS point releases |
| initSystem | OTHER | G1 | GNU Shepherd, not systemd |
| packageManager | OTHER | G1 | Guix (functional manager, distinct from Nix → not `NIX`) |
| secureBootOutOfBox | false | G1 | **unverified** — no signed-shim-out-of-box claim |
| nvidiaExperience | HARD | G1 | libre-only repo; NVIDIA needs third-party nonguix + non-free modules |
| immutable | false | G1 | declarative generations give atomic rollback, but rootfs is writable, not atomic/read-only by design |
| primaryUseCase / laptopFriendly | BOTH / false | G1 | server+workstation; **laptopFriendly unverified** — linux-libre excludes non-free Wi-Fi firmware |
| verificationMethod / docsEcosystem | INFERRED / GOOD | G1 | home page fetched; driver/arch details reasoned → INFERRED |

### archcraft — Archcraft
| Field | Value | Source | Evidence |
|---|---|---|---|
| description | Minimal Arch-based desktop preconfigured around lightweight WMs | A1 | "minimal Linux distribution built on Arch Linux ... lightweight window managers" |
| imageUrl | Commons `Archcraft-logo.svg` 1280px thumb | A3 | 200 |
| websiteUrl / downloadUrl / documentationUrl | archcraft.io, /download.html, wiki.archcraft.io | A1,A2 | all 200 (`archcraft.io/wiki.html` is 404 → wiki subdomain used) |
| forumUrl | reddit.com/r/archcraft | A1 | 200; project links Reddit as its community "Sub" (no official forum; `forum.archcraft.io` does not resolve) |
| distroSeaUrl | distrosea.com/select/archcraft/ | — | 200 |
| testDriveUrl | null | — | none seen |
| installerExperience | GUI | A4 | Calamares installer screenshots on Commons — **inferred, not stated on fetched pages** |
| maintenanceStyle | HANDS_ON | A1,A2 | rolling Arch + AUR |
| proprietarySupport | FULL | A1 | Arch repos (`core`/`extra`) enabled by default carry `nvidia` + codecs; consistent with existing `arch`/`manjaro`/`endeavouros` entries |
| suitableForOldHardware | false | A2 | 64-bit only ("There are no 32-bit ... editions"); matches `arch`/`endeavouros` = false |
| gamingSupport | LIMITED | A1 | AUR/Steam possible, no gaming tooling; matches upstream `arch` = LIMITED |
| privacyPosture | DEFAULT | A1 | no privacy claims |
| supportedDesktops | TILING, OTHER | A1 | WM-based: bspwm/i3/awesome-style tilers = TILING, Openbox-style stacking = OTHER |
| supportedArchitectures | x86_64, aarch64, armv7 | A2 | "Archcraft ARM is Here : Now available for ARMv7 (32-bit) and ARMv8 (aarch64, 64-bit)" |
| releaseModel / initSystem / packageManager | ROLLING / SYSTEMD / PACMAN | A1,A2 | Arch base; ISO dated `2026.08.01` |
| secureBootOutOfBox | false | A2 | verification steps are GPG/SHA256 only; no signed-shim claim |
| nvidiaExperience | HARD | A1 | no driver tooling of its own; manual `pacman` of NVIDIA like upstream Arch (`arch` entry = HARD) |
| immutable | false | A1 | writable root, pacman-based |
| primaryUseCase / laptopFriendly | DESKTOP / true | A1 | "runs smoothly on under 800 MB of memory" (lightweight WM) |
| verificationMethod / docsEcosystem | INFERRED / GOOD | A1,A3,A4 | site facts manual; installer inferred from Commons screenshots |

### tinycore — Tiny Core Linux
| Field | Value | Source | Evidence |
|---|---|---|---|
| description | Ultra-small modular Linux running from RAM, extended by loadable extensions | T1 | "16MB FLTK/FLWM desktop", "always resides in ram" |
| imageUrl | **null** | T2 | no Commons logo file; no logo image seen on the project page (`grep` of fetched HTML found no logo asset) |
| websiteUrl / documentationUrl / forumUrl / downloadUrl | tinycorelinux.net, wiki.tinycorelinux.net, forum.tinycorelinux.net, downloads.html | T1 | all 200 |
| distroSeaUrl | distrosea.com/select/tinycore/ | — | 200 |
| testDriveUrl | null | — | none seen |
| installerExperience | MANUAL | T1 | "It is not a complete desktop"; install is a manual frugal/pendrive setup — **unverified** |
| maintenanceStyle | HANDS_ON | T1 | user-managed extension set, "not all hardware completely supported" |
| proprietarySupport | OPTIONAL | T1 | **unverified** — core/extension philosophy is minimal-by-default; no first-party non-free repo confirmed |
| suitableForOldHardware | true | T1 | 16 MB desktop, 32-bit x86 builds, kernel 6.18 |
| gamingSupport | NONE | T1 | no GPU driver stack or game tooling offered |
| privacyPosture | DEFAULT | T1 | no privacy claims |
| supportedDesktops | ["OTHER"] | T1 | FLTK/FLWM (not an enum desktop); Xfce/KDE only as community extensions |
| supportedArchitectures | x86, x86_64 | T1 | core/x86 and core/x86_64 builds (ARM lives in the separate piCore project) |
| releaseModel | FIXED | T1 | "The latest version: 17.1", prior 16.x/15.0/14.0 … |
| initSystem | OTHER | T1 | custom `/init` + BusyBox, no systemd — **unverified** |
| packageManager | OTHER | T1 | `tce-load`/`.tcz` extension manager (not APT/DNF/PACMAN…) |
| secureBootOutOfBox | false | T1 | 32-bit kernels and no shim; UEFI boot needs the user's own setup |
| nvidiaExperience | HARD | T1 | **unverified** — no distro driver tooling; community NVIDIA extensions must match the running kernel |
| immutable | false | T1 | runs from RAM with read-only `core.gz`, but rootfs is not atomic/read-only by design (no A/B or image update) |
| primaryUseCase / laptopFriendly | BOTH / false | T1 | "desktop, a netbook, an appliance, or server"; laptops often unsupported ("not all hardware completely supported") |
| verificationMethod / docsEcosystem | MANUAL / THIN | T1 | project page read; docs = FAQ + wiki + forum only |

## Unverified values (set to most defensible, not hunted further)

- **vanilla_os**: installerExperience (GUI), proprietarySupport (OPTIONAL), supportedArchitectures (x86_64 only), secureBootOutOfBox (true), nvidiaExperience (OK)
- **guix**: installerExperience (MANUAL), suitableForOldHardware (true), gamingSupport (LIMITED), supportedDesktops, supportedArchitectures, secureBootOutOfBox (false), laptopFriendly (false)
- **archcraft**: installerExperience (GUI — Calamares inferred from Commons screenshots), suitableForOldHardware, nvidiaExperience, gamingSupport, supportedDesktops
- **tinycore**: installerExperience (MANUAL), proprietarySupport (OPTIONAL), initSystem (OTHER), nvidiaExperience (HARD), docsEcosystem (THIN)

## URL → HTTP status (single request each, `curl -L`)

| URL | Status |
|---|---|
| http://forum.tinycorelinux.net/ | 200 |
| http://tinycorelinux.net/ | 200 |
| http://tinycorelinux.net/downloads.html | 200 |
| http://wiki.tinycorelinux.net/ | 200 |
| https://archcraft.io/ | 200 |
| https://archcraft.io/download.html | 200 |
| https://distrosea.com/select/archcraft/ | 200 |
| https://distrosea.com/select/tinycore/ | 200 |
| https://distrosea.com/select/vanillaos/ | 200 |
| https://docs.vanillaos.org/ | 200 |
| https://guix.gnu.org/ | 200 |
| https://guix.gnu.org/en/download/ | 200 |
| https://guix.gnu.org/manual/ | 200 |
| https://lists.gnu.org/mailman/listinfo/help-guix | 200 |
| https://upload.wikimedia.org/wikipedia/commons/c/cd/Vanilla-os-logo-black.png | 200 |
| https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/GNU_Guix_logo.svg/1280px-GNU_Guix_logo.svg.png | 200 |
| https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Archcraft-logo.svg/1280px-Archcraft-logo.svg.png | 200 |
| https://vanillaos.org/ | 200 |
| https://vanillaos.org/community | 200 |
| https://vanillaos.org/download | 200 |
| https://wiki.archcraft.io/ | 200 |
| https://www.reddit.com/r/archcraft/ | 200 |

Rejected / not used: `https://distrosea.com/select/guix/` 404, `/select/guix-system/` 404, `/select/guixsd/` 404 (→ guix `distroSeaUrl: null`); `https://archcraft.io/download/` 404, `https://archcraft.io/wiki.html` 404, `https://forum.archcraft.io/` no DNS, `https://github.com/archcraft-os/archcraft/discussions` 404, `https://github.com/Vanilla-OS/vanilla-os/discussions` 404.

## Validation

`validate_tier2.py` mirrors `src/data/distro-types.ts`: 4 entries, required-key set exact, all enum values legal, `nvidiaExperience != UNKNOWN`, booleans typed, `supportedDesktops`/`supportedArchitectures` non-empty and enum-bounded, `lastVerified` matches `^\d{4}-\d{2}-\d{2}$`, all `*Url` either `null` or `http…`. Result: **VALID**.

> Note: `new-distros-tier2.json` was flagged as previously written by a sibling subagent; this run overwrote it with the 4 required entries.
