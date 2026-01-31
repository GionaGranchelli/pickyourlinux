# Human-Centered Question Catalog - Pick Your Linux

This catalog defines the only user-facing questions allowed in the product.
Questions are designed for Windows/macOS users who are new to Linux.

Key goals
- Use plain, friendly language.
- Ask about goals and comfort, not skill level.
- Map every answer deterministically to existing intent fields.

---

## System-Only Signals (Not User-Facing)

These are required by the engine but must not be shown to users.

### S1 - CPU Architecture (Auto-detected)
Intent Fields
- architecture

Source
- Detect automatically from the system.

Allowed Values (Patches)
| Signal | Patch |
|---|---|
| x86_64 | set architecture = x86_64 |
| arm64 | set architecture = arm64 |

Notes
- Used to gate compatibility-only questions.
- If detection fails, the system should not proceed rather than ask a technical question.

---

## User-Facing Questions (Ascending Complexity)

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

Notes
- Single-select for now (multi-select later).
- Sets intent via tags only.

---

### Q2 - Privacy Importance
Question ID: q_privacy
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

### Q3 - Older / Slower Computer
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
| No, it's fairly modern | none |

---

### Q4 - "Just Works" Expectation
Question ID: q_proprietary
Intent Fields
- proprietary

Question
> How important is it that everything works right away?

Allowed Answers
| User Answer | Applied Patches |
|---|---|
| I want everything to work immediately | set proprietary = REQUIRED |
| I'm okay installing a few extras | set proprietary = OPTIONAL |
| I want only free/open software | set proprietary = AVOID |

---

### Q5 - Comfort Fixing Issues
Question ID: q_maintenance
Intent Fields
- maintenance

Question
> If something doesn't work, what feels right to you?

Allowed Answers
| User Answer | Applied Patches |
|---|---|
| I want buttons and menus, not commands | set maintenance = NO_TERMINAL |
| I can follow a step-by-step guide | set maintenance = TERMINAL_OK |

---

### Q6 - Install Preference
Question ID: q_installation
Intent Fields
- installation

Question
> How would you like to install Linux?

Allowed Answers
| User Answer | Applied Patches |
|---|---|
| I want a simple installer | set installation = GUI |
| I don't mind a more hands-on setup | set installation = CLI_OK |

---

### Q7 - Gaming (Compatibility Gate)
Question ID: q_gaming
Intent Fields
- tags (Gaming)

Condition (showIf)
- Only show if architecture = x86_64

Question
> Do you plan to play games on this machine?

Allowed Answers
| User Answer | Applied Patches |
|---|---|
| Yes | add_tag Gaming |
| No | none |

---

## Forbidden Language

### Disallowed Terms
- CLI, terminal, drivers, codecs, architecture (user-facing)
- beginner, advanced, expert
- best, recommended, popular

### Disallowed Concepts
- Skill labels
- Subjective rankings
- Community popularity

### Examples
| Bad | Acceptable |
|---|---|
| "Are you a beginner or advanced user?" | "If something doesn't work, what feels right to you?" |
| "Do you want the best distro?" | "What do you mainly want to use this computer for?" |
| "Do you want proprietary drivers?" | "How important is it that everything works right away?" |

---

## Validation Checklist (Self-Check)
- A non-technical user can understand every question.
- Every answer maps deterministically to existing intent fields.
- No new intent fields are introduced.
- The catalog alone is sufficient to build questions.ts.
