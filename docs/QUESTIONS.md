# Question Catalog – Pick Your Linux

This document defines the **complete, finite set of allowed user questions**.

Agents MUST NOT invent new questions.
If a new question is needed, it must be added here first and approved.

Each question maps to:
- One or more UserIntent fields
- Explicit Patch operations
- Deterministic Conditions (no free interpretation)

---

## Q1 – CPU Architecture

**Intent Fields**
- architecture

**Question**
> What CPU architecture is your machine using?

**Allowed Answers**
| Option | Patches |
|------|---------|
| x86_64 | set architecture = x86_64 |
| arm64 | set architecture = arm64 |

**Notes**
- This question should appear early.
- Many other questions depend on architecture.

---

## Q2 – Installation Experience

**Intent Fields**
- installation

**Question**
> How do you want to install your system?

**Allowed Answers**
| Option | Patches |
|------|---------|
| Graphical installer only | set installation = GUI |
| CLI is fine | set installation = CLI_OK |

**Notes**
- This replaces vague “beginner/advanced” language.
- Maps directly to installer constraints.

---

## Q3 – Maintenance & Terminal Usage

**Intent Fields**
- maintenance

**Question**
> Are you comfortable using the terminal after installation?

**Allowed Answers**
| Option | Patches |
|------|---------|
| I want to avoid it | set maintenance = NO_TERMINAL |
| I’m okay using it | set maintenance = TERMINAL_OK |

**Notes**
- Critical for filtering Arch-like distros.
- Never phrase as “difficulty”.

---

## Q4 – Proprietary Software

**Intent Fields**
- proprietary

**Question**
> How do you feel about proprietary software (e.g. NVIDIA drivers, codecs)?

**Allowed Answers**
| Option | Patches |
|------|---------|
| I need it to work out of the box | set proprietary = REQUIRED |
| I prefer open source but I’m practical | set proprietary = OPTIONAL |
| I want only free software | set proprietary = AVOID |

---

## Q5 – Gaming Usage

**Intent Fields**
- tags (Gaming)

**Condition**
- Only valid if architecture = x86_64

**Question**
> Do you plan to play games on this machine?

**Allowed Answers**
| Option | Patches |
|------|---------|
| Yes | add_tag Gaming |
| No | none |

**Notes**
- Adds a tag, not a boolean.
- Used for soft filtering and explanations.

---

## Q6 – Privacy Priority

**Intent Fields**
- tags (Privacy)

**Question**
> Is privacy a top priority for you?

**Allowed Answers**
| Option | Patches |
|------|---------|
| Yes | add_tag Privacy |
| No | none |

---

## Q7 – Server vs Desktop

**Intent Fields**
- tags (Server / Work)

**Question**
> What is the primary purpose of this system?

**Allowed Answers**
| Option | Patches |
|------|---------|
| Personal desktop | add_tag Work |
| Server / self-hosting | add_tag Server |

---

## Q8 – Old / Low-End Hardware

**Intent Fields**
- tags (OldHardware)
- minRam

**Question**
> Is this an older or low-powered machine?

**Allowed Answers**
| Option | Patches |
|------|---------|
| Yes (≤ 4GB RAM) | add_tag OldHardware + set minRam = 4 |
| No | none |

---

## Disallowed Questions (Explicitly Forbidden)

The following concepts MUST NOT be used:
- “Beginner / Advanced user”
- “Best distro”
- “Most popular”
- “Recommended by community”
- “Easy / Hard”
- Any subjective ranking

These are replaced by explicit intent fields.

---

## Rules for Agents

- You MAY reference this catalog to build `questions.ts`.
- You MAY NOT invent new questions.
- To add a question:
    1. Update this file
    2. Update UserIntentSchema if needed
    3. Add an ADR explaining why

Violation = hard stop.
