# Coverage review: Arch-family & desktop/gaming distros missing from whichdistro.com

Scope: distros NOT in `~/Development/pickyourlinux/src/data/distros.json` (54 entries, confirmed `len==54` on 2026-09-27).
All web figures read **2026-09-27/28 (UTC)** unless stated. Everything unverified is labelled `unverified` — no guesses.

Primary popularity sources:
- DistroWatch Page Hit Ranking (12-month window unless noted): https://distrowatch.com/dwres.php?resource=popularity (fetched 2026-09-27, HTTP 200, 628 KB)
- GitHub star counts via shields.io JSON: `https://img.shields.io/github/stars/<owner>/<repo>.json` (read 2026-09-27)

Note on DistroWatch naming: DW's entry **"Chimera" = Chimera Linux** (independent, dinit/apk, Spain) — **NOT ChimeraOS**. ChimeraOS has no DW Page-Hit entry. This is a common mis-read.

---

## Candidate rows

| Distro | Upstream repo/site | Latest release + date | Base | Default desktop | Installer | Init | Pkg mgr | Release model | Immutable | Secure Boot OOTB | Proprietary posture | Maintained? | Popularity evidence |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **Omarchy** | https://omarchy.org ; https://github.com/omacom/omarchy (basecamp/omarchy redirects) | **4.0.4 — 2026-09-16** (DW table); 4.0.0 "Quattro" 2026-08-14; 4.0.1 2026-08-25; 4.0.2 2026-08-31 | Arch | Hyprland (Wayland), Quickshell shell | Text-mode / archinstall + `omarchy-install` (Python orchestrator for ISO, bash script for online) | systemd | pacman (+yay) | Rolling | No | **No** — official manual-install guide says "remember to turn off Secure Boot in the BIOS" (https://learn.omacom.io/2/the-omarchy-manual/96/manual-insta) | Yes — ships NVIDIA proprietary driver (DW pkglist: NVIDIA 615.71.09), Spotify/Zoom/Typora | Yes — DW Last Update 2026-09-16 | **DW rank 14 / 589 HPD** (12m rank 19 / 516; 1-week rank **4** / 1111). **GitHub 43k stars.** DW rating 9.0 (77 reviews). A user review claims "Quattro downloaded over 300,000× last month" — **unverified, community claim only** |
| **SteamOS** | https://store.steampowered.com/steamos/ ; github.com/ValveSoftware/SteamOS | **3.8.28 stable — 2026-09-25** (gamingonlinux); DW lists 3.8.14 (2026-07-07); 3.8 stable channel 2026-06-18 | Arch | KDE Plasma (desktop mode) + Steam Game Mode/gamescope | Recovery image restore + guided OOBE ("Text mode" per DW) | systemd | pacman (read-only rootfs) | **Fixed** (DW) — point releases on a rolling base | **Yes** (read-only A/B rootfs) | **No by default** — Deck firmware ships in *setup mode*; Valve ships no signed shim/kernel, Secure Boot cannot be enabled from the Deck UI. Community tool DeckSecureBoot needed (https://github.com/downthecrop/DeckSecureBoot ; grokipedia.com/page/Secure_Boot_on_Steam_Deck) | Yes — ships non-free firmware; Steam client | Yes — Valve, active (3.8.28, 2026-09-25) | **DW rank 56 / 212 HPD** (12m rank 99 / 149; 3m rank 41 / 257). Millions of Steam Deck units shipped (Valve, widely reported) — no single citable DW number for installs |
| **ChimeraOS** | https://chimeraos.org ; github.com/ChimeraOS/chimeraos | **49-1 stable — 2025-07-27** (last stable); v50 in dev (manifest `VERSION=50`); 50 unstable pre-release 2026-05-14 | Arch | Steam Big Picture / OpenGamepadUI (gamescope); controller-first | Guided installer from USB ("keyboard required to start installer") | systemd | frzr (image-based; pacman disabled by default) | Rolling (image) | **Yes** (frzr btrfs image deployments) | **No** — chimeraos.org/download: "secure boot must be disabled" | Yes — ships NVIDIA driver (GTX 16xx+ supported), Arch non-free | Yes, but slow: last **stable** 2025-07-27 (>12 months before 2026-09); latest code push 2026-08-02 (tech-insider.org) | **Not in DW Page-Hit Ranking.** GitHub **2k stars** (ChimeraOS/chimeraos), 286 (ChimeraOS/chimera). Small maintainer team ("eight contributors" per gaming press) |
| **RebornOS** | https://rebornos.org ; github.com/RebornOS | **2026.01.22 — released 2026-01-31** | Arch | Xfce live (installer offers many DEs/WMs) | **Calamares (GUI) + archinstall** | systemd | pacman | Rolling | No | No/unverified — no signed shim documented | Arch repos incl. non-free firmware; flatpak/snap | Yes (Jan 2026), but reviews report recurring installer/GRUB bugs | **DW rank 258 / 65 HPD** (12m rank 135 / 103). GitHub org RebornOS very low (RebornISO **6 stars**). DW rating 8.1 (48 reviews) |
| **Archcraft** | https://archcraft.io ; github.com/archcraft-os/archcraft (dev: adi1090x) | **2026.08.01 — 2026-08-01** (DW news 12908); claimed in DW table 2026.05.12 (DW table lags) | Arch | Openbox (default), bspwm, i3, Sway (new in 26.08) | **Calamares (GUI) + ABIF CLI** | systemd | pacman (+yay) | Rolling | No | unverified (no signed shim documented) | Yes — ships NVIDIA proprietary, codecs, AUR helper | Yes — single maintainer (Aditya Shakya), steady releases | **DW rank 83 / 172 HPD** (DW page: 82 / 194 HPD; 4-week rank 44 / 325). **GitHub 3.4k stars.** DW rating 8.6 (61 reviews) |
| **XeroLinux** | https://xerolinux.xyz (vanity: distrowatch.com/xero) | **2026.03 — 2026-03-13** (DW); project calls v6, quarterly | Arch | KDE Plasma 6 (Wayland) | **Calamares (GUI) paid ISO**; free T.U.I. script on Arch ISO | systemd | pacman (+AUR via Toolkit) | Rolling | No | unverified | Yes — Toolkit installs drivers/gaming stacks (non-free) | Yes, but **single maintainer** (DarkXero); **commercial**: ISO €39 one-time (was €15), TUI free | **DW rank 350 / 43 HPD** (DW page: popularity 342 / 46 HPD). **No GitHub repo** with stars (own infra). DW rating 8.8 (14 reviews). DistroWatch notes it was "discontinued in 2024, revived as a commercial distribution" |
| **BlackArch** | https://blackarch.org ; github.com/BlackArch/blackarch | ISOs marketed as 2026.06.01 (gbhackers); **DW's last tracked release 2023.04.01 (2023-04-01)** | Arch | Fluxbox (+ dwm/openbox/awesome/i3/spectrwm); Xfce on Slim | `blackarch-install` (CLI) or Slim GUI installer | systemd | pacman | Rolling repo / fixed ISOs | No | unverified/no | Yes — Arch + blackarch repo of ~2,800 pentest tools (mixed licences) | **DW status: "Dormant"** (https://distrowatch.com/table.php?distribution=blackarch). Repo actively pushed (last commit 2026-07-06 per dev.co) but ISO releases irregular | **DW: "Not ranked"**. GitHub **3.5k stars** |
| **ArcoLinux** | https://arcolinux.info ; successor: https://kiroproject.be | **25.04.01 — 2025-04-13** (last) | Arch | KDE Plasma, Xfce, Openbox, i3 | Calamares (GUI) | systemd | pacman | Rolling | No | unverified | Yes (Arch) | **NO — DW status: "Discontinued", "Not ranked"** (https://distrowatch.com/table.php?distribution=arco). Creator Erik Dubois moved to **Kiro** | DW: **Discontinued / Not ranked**. arcolinux/arcolinux-iso only **89 GH stars** |
| **Kiro** (successor to ArcoLinux) | https://kiroproject.be ; github.com/kirodubes | **v26.07.01 — 2026-07-01** (monthly: next 2026-09-01) | Arch | Xfce + Ohmychadwm (default); Plasma ISO available | **Calamares (GUI)** + ATT on-demand desktops | systemd | pacman | Rolling | No | unverified | likely (ships linux-cachyos/zen, drivers) | Yes — new, monthly cadence, DW-listed ("Kiro" in DW distro nav) | **New — no DW Page-Hit rank yet.** By one dev (Erik Dubois) + Claude AI |
| **HoloISO** | https://holoiso.com (marketing); github.com/holoiso-staging/releases | **1.3 — 2024-06-03**; last beta snapshot 2024-10-21 | Arch | KDE Plasma (Steam Deck UI) | GUI installer ("Install HoloISO on this device") | systemd | pacman | Rolling | v1/v2 **No**; "HoloISO Immutable" (staging) yes | No | Yes (Valve-derived images, non-free firmware) | **NO — effectively DEAD.** Original repo `holoiso-eol/holoiso`: "completely EOL and no longer supported" (github.com/holoiso-eol/holoiso). GamingOnLinux declared it dead 2024-01-29 | GitHub 5.2k stars on the **dead** repo (holoiso-eol), ~1k on staging. holoiso.com claims "50K+ Active Users" — **unverified marketing claim, contradicts EOL status** |
| **Crystal Linux** | crystal-linux.tech (project) | unverified (was pre-1.0, "Onix" installer) | Arch (originally; community says pivoted/built-from-scratch) | GNOME | GUI installer | systemd | pacman (unverified) | Rolling | No | unverified | unverified | **Effectively dormant/pivoted** — r/DistroHopping "What happened to Crystal Linux?" (Jul 2025) reports it stalled/pivoted | No DW rank found; project GitHub stars not retrieved (unverified) |
| **Drauger OS** *(gaming, not Arch)* | https://draugeros.org ; github.com/drauger-os-development | **7.8 "Urgal" — 2026-06-28** | Ubuntu 26.04 LTS | KDE Plasma 6 | Edamame installer (GUI) | systemd | apt | Fixed (LTS base + tuned kernel) | No | likely yes (Ubuntu signed shim) but custom kernel breaks it — **unverified** | Yes — preinstalled AMD/NVIDIA drivers, NTSYNC kernel | Yes (7.8, Jun 2026) | **DW rank 188 / 78 HPD**. DW rating 6.0 (3 reviews) |
| **Batocera.linux** *(retro-gaming, not Arch)* | https://batocera.org | v41 (per DW reviews 2026) | Independent (Buildroot) | EmulationStation (no desktop) | Image flash (no installer) | BusyBox/systemd (unverified which) | none (image) | Rolling images | No (review explicitly: "NOT immutable") | unverified | Yes | Yes — active | **DW rank 243 / 63 HPD**. DW rating (8 reviews) |

---

## (a) Ranking by evidence of real user base

Ranked by hardest available proxies: DistroWatch Page-Hit rank/HPD (12-month) + GitHub stars + published figures.

| # | Distro | DW 12m rank (HPD) | DW 4-week rank | GitHub stars | Other |
|---|---|---|---|---|---|
| 1 | **Omarchy** | 19 (516) | **6** (984) | **43k** | DW 1-week rank 4 (1111); fastest riser |
| 2 | **SteamOS** | 99 (149) | 64 (190) | n/a | Default OS of Steam Deck/Machine/Frame (Valve hardware at scale) |
| 3 | **Archcraft** | 83 (172) | 44 (325) | 3.4k | DW rating 8.6/61 |
| 4 | **BlackArch** | Not ranked (DW: Dormant) | — | 3.5k | Huge tool repo, but DW marks dormant |
| 5 | **Drauger OS** | 188 (78) | 333 (30) | (low) | DW rating 6.0/3 |
| 6 | **Batocera** | 243 (63) | 257 (45) | (low) | retro niche |
| 7 | **RebornOS** | 255 (60) / DW page 135 (103) | 279 (40) | 6 | DW rating 8.1/48 |
| 8 | **XeroLinux** | 350 (43) | 308 (34) | n/a | DW rating 8.8/14 |
| 9 | **ChimeraOS** | Not listed | — | 2k (+286) | console-gaming niche |
| 10 | **HoloISO** | Not listed | — | 5.2k (dead repo) | EOL project; 50K claim unverified |
| 11 | **ArcoLinux** | Not ranked (Discontinued) | — | 89 | superseded by Kiro |
| 12 | **Kiro** | new, unranked | — | n/a | 1 dev + AI |
| 13 | **Crystal Linux** | not found | — | unverified | dormant |

Note: DW Page-Hit rank measures *website traffic*, not installs — a weak but consistent proxy. Omarchy and SteamOS are the only two here with a genuinely large, verifiable audience signal (DW top-20/top-100 + 43k stars / Valve hardware).

---

## (b) Recommendation tiers (picker aimed at ordinary users)

**Tier 1 — strongly recommended to add**
- **Omarchy** — DW top-20 and rising (4-week rank 6), 43k GitHub stars, actively released (4.0.4, 2026-09-16), Arch+Hyprland with a real installer. Caveat for "ordinary users": it's a tiling-WM dev-oriented desktop and **Secure Boot must be disabled**; no non-expert support net. Add with honest friction flags.
- **SteamOS** — the single most consequential gaming distro; official Valve OS for Steam Deck/Machine/Frame, DW rank 56. Must be added for gaming use-cases, with a hard caveat that it is officially supported only on Valve hardware (Enhanced: ROG Ally/Legion Go; unsupported elsewhere) and Secure Boot is not enabled out of the box.

**Tier 2 — worth adding**
- **Archcraft** — DW 83/172 HPD, 3.4k stars, steady monthly-ish releases, Calamares GUI, low-RAM (Openbox/bspwm). Good "lightweight Arch" pick for tinkerers.
- **ChimeraOS** — the reference console-style couch-gaming image (frzr immutable, controller-first). Caveat: stable branch is >12 months old (49-1, 2025-07-27); Secure Boot must be disabled; AMD-centric. Add only if the picker has a "console/retro" path.
- **Drauger OS** — genuinely user-facing gaming distro (Ubuntu 26.04 LTS base, KDE, Edamame GUI installer, DW 188). Easier on-ramp than the Arch gaming options. Rating sample tiny (n=3) so note low confidence.

**Tier 3 — skip (with reason)**
- **BlackArch** — DW status **Dormant**, "Not ranked"; last tracked ISO 2023.04.01. It is a pentest tool repo, not an ordinary-user desktop. Skip (or list as "security tool overlay", not a desktop option).
- **XeroLinux** — single maintainer, **commercial (€39 ISO)**, DW rank 350, no public repo for the ISO. Skip for a free picker; conflicts with an "ordinary user" free-download expectation.
- **RebornOS** — DW 258/65 HPD, only 6 GH stars, DW reviews report recurring installer/GRUB failures across releases. Low payoff vs EndeavourOS/Manjaro/CachyOS already present. Skip (or watch).
- **ArcoLinux** — DW **Discontinued**, "Not ranked". Skip and consider its successor Kiro instead.
- **Kiro** — new (Jul 2026), single-dev + AI, unranked. Watch, don't add yet.
- **Crystal Linux** — dormant/pivoted; unverified. Skip.
- **HoloISO** — **dead** (holoiso-eol/holoiso says "completely EOL"; GamingOnLinux declared it dead 2024-01-29). Skip; if a SteamOS-alike is wanted, use SteamOS itself or Bazzite.
- **Batocera** — not a desktop OS (no installer, image flash, emulation front-end). Out of scope for a distro picker aimed at general use; optional retro-only listing.

---

## (c) Existing dataset entries that look unmaintained / long-dead (re-evaluate)

Checked against DW release histories (read 2026-09-27):

| Entry in dataset | Evidence | Verdict |
|---|---|---|
| **feren_os** | Last release **2025.03 (2025-04-10)**; prior release gap was **2020.11 → 2025.03 (≈4.5 years)**; nothing since Apr 2025 (DW: https://distrowatch.com/table.php?distribution=feren). ~17 months stale as of 2026-09. | **Re-evaluate / likely dormant.** Strongest candidate to remove. |
| **bodhi_linux** | Last release **7.0.0 — 2023-08-21**; no new major release since (>3 years). DW page updated 2026-08-06 but no new ISO release announcements (https://distrowatch.com/table.php?distribution=bodhi). | **Re-evaluate / possibly dormant.** |
| **pclinuxos** | Last *announced* ISO release **2023.07 (2023-07-30)**; however it is rolling and the DW page was updated **2026-09-21**, so updates continue (https://distrowatch.com/table.php?distribution=pclinuxos). | **Active but ISO-release announcements stalled** — verify before keeping the "download" link current. |
| **solus** | **Solus 4.9 — 2026-04-18** (DW 12794). Earlier "Solus is dying" reports are outdated (https://distrowatch.com/table.php?distribution=solus). | **Active — keep; do NOT remove** (revived). |
| **mageia** | **Mageia 10 — 2026-06-29** (https://distrowatch.com/table.php?distribution=mageia). | **Active — keep.** |
| **artix (duplicate `artix_linux` entry)** | Data bug, not coverage: dataset contains both `artix` and a duplicate `artix_linux`. Artix itself is active — official ISO **2026-08** (https://artixlinux.org/news.php, 2026-08-14). | **Fix the duplicate entry; keep the distro.** |

Not exhaustively re-checked (lower risk, no red flags seen in passing): ubuntu/linux_mint/pop_os/fedora/debian/arch/manjaro/opensuse_*/elementary/zorin/mx/endeavouros/garuda/void/alpine/nixos/tails/qubes/trisquel/slackware/*buntu/kde_neon/lite/peppermint/nobara/pureos/rocky/almalinux/centos_stream/studio/lmde/mageia/deepin/kali/gentoo/bazzite/cachyos/pikaos/fedora_*/opensuse_microos/whonix/parrot/fedora_silverblue/fedora_kinoite.

---

## Sources (all read 2026-09-27/28 UTC)

- DistroWatch Page Hit Ranking — https://distrowatch.com/dwres.php?resource=popularity (HTTP 200, 628 KB; 4 tables: 12m/6m/3m/4-week)
- DistroWatch profiles: /table.php?distribution=omarchy | steamos | chimera (Chimera **Linux**) | rebornos | blackarch | arco | archcraft | xero | batocera | drauger | solus | bodhi | pclinuxos | mageia | feren | ultramarine
- DistroWatch release news: Archcraft 2026.08.01 (id 12908); Omarchy 4.0.0 (id 12921); Drauger OS 7.8 (id 12882); Solus 4.9 (id 12794); Mageia 10; Feren 2025.03 (id 12403)
- Omarchy: https://omarchy.org ; https://learn.omacom.io/2/the-omarchy-manual/96/manual-insta ; https://github.com/omacom/omarchy ; https://img.shields.io/github/stars/basecamp/omarchy.json (43k)
- SteamOS: https://www.gamingonlinux.com/2026/09/steamos-3-8-28-stable-released... (2026-09-25); https://www.techpowerup.com/347577 (3.8 preview 2026-03-20); https://grokipedia.com/page/Secure_Boot_on_Steam_Deck ; https://github.com/downthecrop/DeckSecureBoot
- ChimeraOS: https://chimeraos.org/download/ ("secure boot must be disabled"); https://github.com/ChimeraOS/chimeraos/releases ; .../wiki/Release-Notes (49-1 2025-07-27); .../blob/master/manifest (VERSION=50); https://img.shields.io/github/stars/ChimeraOS/chimeraos.json (2k)
- RebornOS: https://rebornos.org ; https://sourceforge.net/projects/rebornos/files/ (2026.01.22); https://img.shields.io/github/stars/RebornOS/RebornISO.json (6)
- Archcraft: https://distrowatch.com/12908 ; https://tux.fan/2026/08/02/archcraft-26-08-sway-launch ; https://img.shields.io/github/stars/archcraft-os/archcraft.json (3.4k)
- BlackArch: https://blackarch.org/downloads.html ; https://github.com/BlackArch/blackarch ; https://img.shields.io/github/stars/BlackArch/blackarch.json (3.5k)
- ArcoLinux/Kiro: https://distrowatch.com/table.php?distribution=arco (Discontinued); https://kiroproject.be (v26.07.01) ; https://img.shields.io/github/stars/arcolinux/arcolinux-iso.json (89)
- HoloISO: https://github.com/holoiso-eol/holoiso ("completely EOL"); https://github.com/holoiso-staging/releases (1.3, 2024-06-03); https://holoiso.com ("50K+ Active Users", unverified)
- Drauger OS: https://distrowatch.com/12882 (7.8, 2026-06-28)
- Crystal Linux: https://www.reddit.com/r/DistroHopping/comments/1mhgvh5/what_happened_to_crystal_linux/ (Jul 2025)
- Artix (dataset duplicate check): https://artixlinux.org/news.php (ISO 2026-08)

### Explicitly unverified items
- Omarchy "300,000 downloads/month" (community review claim); Omarchy GitHub forks/issues counts (secondary blog only).
- HoloISO "50K+ active users" (vendor marketing vs EOL status).
- Secure-Boot status for RebornOS, Archcraft, XeroLinux, BlackArch, Kiro, Crystal, Drauger OS, Batocera — no signed-shim/secure-boot documentation found; treated as unverified/no.
- Crystal Linux current status and GitHub star count.
- Batocera init system and licence exactness.
- "Solus 4.9 was released 2026-04-18" per DW id 12794 — the DW release history table lists it; I did not open the release announcement itself.
