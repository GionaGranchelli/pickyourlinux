# Human-Centered Question Catalog - Pick Your Linux

This catalog defines the only user-facing questions allowed in the product.
Questions are designed for Windows/macOS users who are new to Linux.

Key goals
- Use plain, friendly language.
- Ask about goals and comfort, not skill labels.
- Map every answer deterministically to existing intent fields.

---

## System-Only Signals (Not User-Facing)

These are required by the engine but should be detected automatically when possible.

### S1 - CPU Architecture (Auto-detected)
Intent Fields
- architecture

Source
- Detect automatically from the system when possible.

Allowed Values (Patches)
| Signal | Patch |
|---|---|
| x86_64 | set architecture = x86_64 |
| arm64 | set architecture = arm64 |

Notes
- If detection is unavailable, use the architecture clarification question below.

---

## Phase Selection (Entry Point)

### Q0 - Linux Familiarity
Question ID: q_linux_familiarity
Intent Fields
- experience

Question
> How familiar are you with Linux?

Allowed Answers
| User Answer | Applied Patches |
|---|---|
| I'm new to Linux | set experience = BEGINNER + set installation = GUI + set maintenance = NO_TERMINAL |
| I'm somewhat familiar | set experience = INTERMEDIATE |
| I'm advanced | set experience = ADVANCED |

Notes
- This question is always first.
- It gates later phases.

---

## Beginner Phase (Always Asked)

### Q1 - Primary Purpose
Question ID: q_purpose
Intent Fields
- tags

Question
> What do you mainly want to use this computer for?

Allowed Answers
| User Answer | Applied Patches |
|---|---|
| Everyday stuff (web, email, documents) | add_tag Work |
| Gaming | add_tag Gaming |
| Privacy-focused use | add_tag Privacy |
| Running a home server | add_tag Server |

---

### Q2 - Works Right Away
Question ID: q_works_right_away
Intent Fields
- proprietary

Question
> How important is it that most things work right away?

Allowed Answers
| User Answer | Applied Patches |
|---|---|
| Very important — I want minimal setup | set proprietary = REQUIRED |
| I'm okay doing a bit of setup | set proprietary = OPTIONAL |
| I want only free/open software | set proprietary = AVOID |

---

### Q3 - Install Preference
Question ID: q_installation
Intent Fields
- installation

Question
> How would you like to install Linux?

Allowed Answers
| User Answer | Applied Patches |
|---|---|
| I want a simple installer | set installation = GUI |
| I'm okay with a more hands-on setup | set installation = CLI_OK |

---

### Q4 - Troubleshooting Style
Question ID: q_troubleshooting_style
Intent Fields
- maintenance

Question
> If something doesn't work, what feels most comfortable?

Allowed Answers
| User Answer | Applied Patches |
|---|---|
| I want buttons and menus, not commands | set maintenance = NO_TERMINAL |
| I can follow a step-by-step guide | set maintenance = TERMINAL_OK |

---

### Q5 - Older / Slower Computer
Question ID: q_old_hardware
Intent Fields
- tags (OldHardware)
- minRam

Question
> Is this computer older or not very powerful?

Allowed Answers
| User Answer | Applied Patches |
|---|---|
| Yes, it's pretty old | add_tag OldHardware + set minRam = 4 |
| No, it's fairly modern | set minRam = 8 |

---

### Q6 - RAM Hint
Question ID: q_ram_hint
Intent Fields
- minRam

Question
> Roughly, how much memory (RAM) does your computer have?

Allowed Answers
| User Answer | Applied Patches |
|---|---|
| 4 GB or less | set minRam = 4 |
| 8 GB | set minRam = 8 |
| 16 GB or more | set minRam = 16 |
| I'm not sure | none |

---

### Q7 - Privacy Importance
Question ID: q_privacy_importance
Intent Fields
- tags (Privacy)

Question
> How important is privacy to you?

Allowed Answers
| User Answer | Applied Patches |
|---|---|
| Very important | add_tag Privacy |
| I care, but convenience matters too | none |

---

### Q8 - GPU (Simple)
Question ID: q_gpu_simple
Intent Fields
- gpu

Question
> Do you have an NVIDIA graphics card?

Allowed Answers
| User Answer | Applied Patches |
|---|---|
| Yes, NVIDIA | set gpu = NVIDIA |
| Not sure | set gpu = UNKNOWN |
| No | set gpu = INTEL_AMD |

---

### Q8b - Software Use Case
Question ID: q_software_use_case
Intent Fields
- tags

Question
> Do you use any specialized software?

Allowed Answers
| User Answer | Applied Patches |
|---|---|
| Office suite (Word, Excel, PowerPoint) | add_tag Office |
| Creative apps (Photoshop, Premiere, CAD) | add_tag Creative |
| Development tools (IDEs, Docker) | add_tag Development |
| Just basic browsing and email | add_tag Basic |

---

### Q9 - Secure Boot (Simple)
Question ID: q_secure_boot_simple
Intent Fields
- secureBootNeeded

Question
> Does your computer need Secure Boot turned on?

Allowed Answers
| User Answer | Applied Patches |
|---|---|
| Yes, it should stay on | set secureBootNeeded = true |
| No, it can be off | set secureBootNeeded = false |
| Not sure | set secureBootNeeded = null |

---

### Q9b - Beginner UI Style
Question ID: q_beginner_ui_style
Intent Fields
- desktopPreference

Condition (showIf)
- experience = BEGINNER

Question
> What desktop style feels most familiar to you?

Allowed Answers
| User Answer | Applied Patches |
|---|---|
| Windows-like layout | set desktopPreference = KDE |
| macOS-like layout | set desktopPreference = GNOME |
| Classic/traditional layout | set desktopPreference = XFCE |
| No preference | set desktopPreference = NO_PREFERENCE |

---

## Phase Exit (After Beginner)

### Q10 - See Results or Refine
Question ID: q_phase_exit
Intent Fields
- experience

Condition (showIf)
- experience in [INTERMEDIATE, ADVANCED]

Question
> Want to see results now or refine further?

Allowed Answers
| User Answer | Applied Patches |
|---|---|
| Refine further | none |
| See results now | set experience = BEGINNER |

---

## Intermediate Phase (Shown for INTERMEDIATE + ADVANCED)

### Q11 - Architecture Clarifier (Fallback)
Question ID: q_architecture_clarifier
Intent Fields
- architecture

Condition (showIf)
- experience in [INTERMEDIATE, ADVANCED]

Question
> Are you using a typical PC/laptop, or an ARM-based device?

Allowed Answers
| User Answer | Applied Patches |
|---|---|
| Typical PC / laptop | set architecture = x86_64 |
| ARM-based device (some newer devices use this) | set architecture = arm64 |
| Not sure | none |

---

### Q12 - ARM Expectation
Question ID: q_arm_expectation
Intent Fields
- installation
- maintenance

Condition (showIf)
- experience in [INTERMEDIATE, ADVANCED]
- architecture = arm64

Question
> On ARM devices, Linux options can be more limited. What do you prefer?

Allowed Answers
| User Answer | Applied Patches |
|---|---|
| Keep it simple and stable | set installation = GUI + set maintenance = NO_TERMINAL |
| I can handle a more hands-on setup | set installation = CLI_OK + set maintenance = TERMINAL_OK |

---

### Q13 - Desktop Preference
Question ID: q_desktop_preference
Intent Fields
- desktopPreference

Condition (showIf)
- experience in [INTERMEDIATE, ADVANCED]

Question
> Do you have a desktop look you prefer?

Allowed Answers
| User Answer | Applied Patches |
|---|---|
| No preference | set desktopPreference = NO_PREFERENCE |
| GNOME (clean and simple) | set desktopPreference = GNOME |
| KDE Plasma (very customizable) | set desktopPreference = KDE |
| XFCE (lightweight) | set desktopPreference = XFCE |
| Cinnamon (familiar) | set desktopPreference = CINNAMON |
| MATE (classic) | set desktopPreference = MATE |
| LXQt (very light) | set desktopPreference = LXQT |

---

### Q14 - Release Model
Question ID: q_release_model
Intent Fields
- releaseModel

Condition (showIf)
- experience in [INTERMEDIATE, ADVANCED]

Question
> How do you feel about updates?

Allowed Answers
| User Answer | Applied Patches |
|---|---|
| No preference | set releaseModel = NO_PREFERENCE |
| Stable, less frequent updates | set releaseModel = FIXED |
| Latest features, frequent updates | set releaseModel = ROLLING |

---

### Q15 - Work vs Gaming Focus
Question ID: q_work_gaming_focus
Intent Fields
- tags

Condition (showIf)
- experience in [INTERMEDIATE, ADVANCED]
- tags contains Work OR Gaming

Question
> If you do both work and gaming, which matters more right now?

Allowed Answers
| User Answer | Applied Patches |
|---|---|
| Mostly work or everyday use | add_tag Work + remove_tag Gaming |
| Mostly gaming | add_tag Gaming + remove_tag Work |
| Both about equally | add_tag Work + add_tag Gaming |
| No preference | none |

---

### Q16 - Secure Boot Clarifier
Question ID: q_secure_boot_clarifier
Intent Fields
- secureBootNeeded

Condition (showIf)
- experience in [INTERMEDIATE, ADVANCED]
- secureBootNeeded = null

Question
> If Secure Boot comes up, what would you prefer?

Allowed Answers
| User Answer | Applied Patches |
|---|---|
| It must stay on | set secureBootNeeded = true |
| I can turn it off if needed | set secureBootNeeded = false |
| Still not sure | set secureBootNeeded = null |

---

### Q17 - NVIDIA Setup Tolerance
Question ID: q_nvidia_tolerance
Intent Fields
- nvidiaTolerance

Condition (showIf)
- experience in [INTERMEDIATE, ADVANCED]
- gpu = NVIDIA

Question
> If you have NVIDIA, how much setup work are you willing to do?

Allowed Answers
| User Answer | Applied Patches |
|---|---|
| No preference | set nvidiaTolerance = NO_PREFERENCE |
| I want it to work with minimal setup | set nvidiaTolerance = WANT_EASY |
| I'm okay with extra steps | set nvidiaTolerance = OK_HANDS_ON |
| I prefer to avoid closed-source NVIDIA software | set nvidiaTolerance = AVOID_PROPRIETARY |

---

### Q18 - Everyday Apps
Question ID: q_everyday_apps
Intent Fields
- proprietary

Condition (showIf)
- experience in [INTERMEDIATE, ADVANCED]
- tags contains Work

Question
> Which feels closer to your expectation for everyday apps?

Allowed Answers
| User Answer | Applied Patches |
|---|---|
| I want common apps and media to work without hassle | set proprietary = REQUIRED |
| I'm okay using alternatives and doing small setup | set proprietary = OPTIONAL |

---

### Q19 - Privacy Tradeoff
Question ID: q_privacy_tradeoff
Intent Fields
- proprietary

Condition (showIf)
- experience in [INTERMEDIATE, ADVANCED]
- tags contains Privacy

Question
> When privacy conflicts with convenience, what do you prefer?

Allowed Answers
| User Answer | Applied Patches |
|---|---|
| Privacy first, even if some things are harder | set proprietary = AVOID |
| Balance is fine — I still want things to work smoothly | set proprietary = OPTIONAL |

---

### Q20 - Gaming (Compatibility Gate)
Question ID: q_gaming
Intent Fields
- tags (Gaming)

Condition (showIf)
- experience in [INTERMEDIATE, ADVANCED]
- architecture = x86_64

Question
> Do you plan to play games on this machine?

Allowed Answers
| User Answer | Applied Patches |
|---|---|
| Yes | add_tag Gaming |
| No | remove_tag Gaming |

---

### Q21 - Gaming Expectation
Question ID: q_gaming_expectation
Intent Fields
- proprietary

Condition (showIf)
- experience in [INTERMEDIATE, ADVANCED]
- tags contains Gaming

Question
> What best describes what you expect from gaming on Linux?

Allowed Answers
| User Answer | Applied Patches |
|---|---|
| I want it to be as smooth as possible | set proprietary = REQUIRED |
| I can tweak settings if needed | set proprietary = OPTIONAL |

---

### Q22 - Anti-Cheat Warning
Question ID: q_anticheat_warning
Intent Fields
- none (disqualifier only)

Condition (showIf)
- experience in [INTERMEDIATE, ADVANCED]
- tags contains Gaming

Question
> Do you mainly play games that require strict anti-cheat that may not work on Linux?

Allowed Answers
| User Answer | Applied Patches |
|---|---|
| Yes | disqualifier (no patches) |
| No / Not sure | none |

---

### Q23 - Server Comfort
Question ID: q_server_comfort
Intent Fields
- installation
- maintenance

Condition (showIf)
- experience in [INTERMEDIATE, ADVANCED]
- tags contains Server

Question
> For a home server, what setup style do you prefer?

Allowed Answers
| User Answer | Applied Patches |
|---|---|
| I want simple setup and straightforward maintenance | set installation = GUI + set maintenance = NO_TERMINAL |
| I'm okay managing it in a more hands-on way | set installation = CLI_OK + set maintenance = TERMINAL_OK |

---

## Advanced Phase (Shown for ADVANCED Only)

### Q24 - Release Model (Advanced Re-assert)
Question ID: q_release_model_advanced
Intent Fields
- releaseModel

Condition (showIf)
- experience = ADVANCED

Question
> At a technical level, do you prefer rolling or fixed releases?

Allowed Answers
| User Answer | Applied Patches |
|---|---|
| No preference | set releaseModel = NO_PREFERENCE |
| Fixed releases (predictable, less frequent updates) | set releaseModel = FIXED |
| Rolling release (continuous updates) | set releaseModel = ROLLING |

---

### Q25 - Desktop Preference (Advanced Re-assert)
Question ID: q_desktop_preference_advanced
Intent Fields
- desktopPreference

Condition (showIf)
- experience = ADVANCED

Question
> If you care about the desktop environment, pick one.

Allowed Answers
| User Answer | Applied Patches |
|---|---|
| No preference | set desktopPreference = NO_PREFERENCE |
| GNOME | set desktopPreference = GNOME |
| KDE Plasma | set desktopPreference = KDE |
| XFCE | set desktopPreference = XFCE |
| Cinnamon | set desktopPreference = CINNAMON |
| MATE | set desktopPreference = MATE |
| LXQt | set desktopPreference = LXQT |

---

### Q26 - GPU Confirm (Advanced)
Question ID: q_gpu_confirm_advanced
Intent Fields
- gpu

Condition (showIf)
- experience = ADVANCED

Question
> Which GPU vendor best matches your system?

Allowed Answers
| User Answer | Applied Patches |
|---|---|
| Not sure / no preference | set gpu = UNKNOWN |
| NVIDIA | set gpu = NVIDIA |
| Intel or AMD | set gpu = INTEL_AMD |

---

### Q27 - Secure Boot (Advanced)
Question ID: q_secure_boot_advanced
Intent Fields
- secureBootNeeded

Condition (showIf)
- experience = ADVANCED

Question
> Secure Boot: do you require out-of-the-box support?

Allowed Answers
| User Answer | Applied Patches |
|---|---|
| No preference / not sure | set secureBootNeeded = null |
| Yes, it must stay on | set secureBootNeeded = true |
| No, I can disable it if needed | set secureBootNeeded = false |

---

### Q28 - NVIDIA Tolerance (Advanced)
Question ID: q_nvidia_tolerance_advanced
Intent Fields
- nvidiaTolerance

Condition (showIf)
- experience = ADVANCED
- gpu = NVIDIA

Question
> For NVIDIA, which setup tradeoff do you accept?

Allowed Answers
| User Answer | Applied Patches |
|---|---|
| No preference | set nvidiaTolerance = NO_PREFERENCE |
| Minimal setup | set nvidiaTolerance = WANT_EASY |
| Hands-on setup is fine | set nvidiaTolerance = OK_HANDS_ON |
| Avoid closed-source NVIDIA software | set nvidiaTolerance = AVOID_PROPRIETARY |

---

### Q29 - Proprietary Strictness (Advanced)
Question ID: q_open_software_strictness
Intent Fields
- proprietary

Condition (showIf)
- experience = ADVANCED

Question
> How strict do you want to be about proprietary software?

Allowed Answers
| User Answer | Applied Patches |
|---|---|
| No preference / keep my earlier choice | none |
| Strict — only free/open software | set proprietary = AVOID |
| Practical — allow proprietary when needed | set proprietary = OPTIONAL |
| I need proprietary software to work | set proprietary = REQUIRED |

---

### Q30 - Hands-on Maintenance (Advanced)
Question ID: q_advanced_control
Intent Fields
- installation
- maintenance

Condition (showIf)
- experience = ADVANCED

Question
> Are you comfortable handling updates and fixes in the terminal when needed?

Allowed Answers
| User Answer | Applied Patches |
|---|---|
| No preference / keep my earlier choice | none |
| Yes, I'm fine with hands-on maintenance | set installation = CLI_OK + set maintenance = TERMINAL_OK |
| No, I prefer a smoother experience | set installation = GUI + set maintenance = NO_TERMINAL |

---

### Q31 - Init System Preference
Question ID: q_init_system_preference
Intent Fields
- initSystem

Condition (showIf)
- experience = ADVANCED

Question
> Preferred init system?

Allowed Answers
| User Answer | Applied Patches |
|---|---|
| No preference | set initSystem = NO_PREFERENCE |
| systemd | set initSystem = SYSTEMD |
| OpenRC | set initSystem = OPENRC |
| runit | set initSystem = RUNIT |

---

### Q32 - Package Manager Preference
Question ID: q_package_manager_preference
Intent Fields
- packageManager

Condition (showIf)
- experience = ADVANCED

Question
> Preferred package manager?

Allowed Answers
| User Answer | Applied Patches |
|---|---|
| No preference | set packageManager = NO_PREFERENCE |
| APT | set packageManager = APT |
| DNF | set packageManager = DNF |
| Pacman | set packageManager = PACMAN |
| Zypper | set packageManager = ZYPPER |
| APK | set packageManager = APK |
| Nix | set packageManager = NIX |
| XBPS | set packageManager = XBPS |
| Portage | set packageManager = PORTAGE |

---

### Q33 - Atomic / Immutable Preference
Question ID: q_atomic_preference
Intent Fields
- immutablePreference

Condition (showIf)
- experience = ADVANCED

Question
> Do you prefer immutable (atomic-style) systems?

Allowed Answers
| User Answer | Applied Patches |
|---|---|
| No preference | set immutablePreference = NO_PREFERENCE |
| Prefer immutable | set immutablePreference = PREFER_IMMUTABLE |
| Prefer traditional | set immutablePreference = PREFER_TRADITIONAL |

---

### Q34 - RAM Refinement (Advanced)
Question ID: q_ram_refinement_advanced
Intent Fields
- minRam

Condition (showIf)
- experience = ADVANCED

Question
> If you want to refine RAM requirements, choose a minimum.

Allowed Answers
| User Answer | Applied Patches |
|---|---|
| No preference | none |
| 4 GB | set minRam = 4 |
| 8 GB | set minRam = 8 |
| 16 GB | set minRam = 16 |

---

## Forbidden Language

### Disallowed Terms
- "best" / "recommended" / "most popular"
- subjective rankings or community popularity

### Allowed Exception
- The phase selector uses the label "Expert mode" to signal depth, not skill.

### Examples
| Bad | Acceptable |
|---|---|
| "Do you want the best distro?" | "What do you mainly want to use this computer for?" |
| "Are you a beginner or advanced user?" | "How deep do you want to go?" |

---

## Validation Checklist (Self-Check)
- A non-technical user can understand every beginner question.
- Every answer maps deterministically to existing intent fields.
- No new intent fields are introduced without updating schemas.
- The catalog alone is sufficient to build questions.ts.
