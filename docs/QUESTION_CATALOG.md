# Question Catalog – Pick Your Linux (Human-Centered)

This document defines the **only questions that may be shown to users**.

Questions are written for:
- Windows / macOS users
- Non-technical users
- First-time Linux explorers

Agents MUST NOT introduce technical language in user-facing questions.

---

## Q1 – What do you want to use this computer for?

**User Intent Fields**
- tags

**Question**
> What do you mainly want to use this computer for?

**Allowed Answers**

| User Answer | Applied Patches |
|-----------|----------------|
| Everyday stuff (web, email, documents) | add_tag Work |
| Gaming | add_tag Gaming |
| Privacy-focused use | add_tag Privacy |
| Running a home server | add_tag Server |

**Notes**
- Multiple answers allowed in the future.
- This sets *purpose*, not difficulty.

---

## Q2 – Do you want things to “just work”?

**User Intent Fields**
- proprietary

**Question**
> How important is it that everything works right away?

**Allowed Answers**

| User Answer | Applied Patches |
|-----------|----------------|
| I want everything to work immediately | set proprietary = REQUIRED |
| I’m okay installing a few extras | set proprietary = OPTIONAL |
| I want only free/open software | set proprietary = AVOID |

**Notes**
- Never mention drivers, codecs, or vendors.
- This replaces all “proprietary software” wording.

---

## Q3 – How comfortable are you fixing things yourself?

**User Intent Fields**
- maintenance

**Question**
> If something doesn’t work, what feels right to you?

**Allowed Answers**

| User Answer | Applied Patches |
|-----------|----------------|
| I want buttons and menus, not commands | set maintenance = NO_TERMINAL |
| I can follow a step-by-step guide | set maintenance = TERMINAL_OK |

**Notes**
- No mention of “terminal” in UI copy if possible.
- The mapping remains deterministic.

---

## Q4 – How do you want to install Linux?

**User Intent Fields**
- installation

**Question**
> How would you like to install Linux?

**Allowed Answers**

| User Answer | Applied Patches |
|-----------|----------------|
| I want a simple installer | set installation = GUI |
| I don’t mind a more hands-on setup | set installation = CLI_OK |

**Notes**
- Avoid “advanced” wording.
- Frame as preference, not skill.

---

## Q5 – Is this an older or slower computer?

**User Intent Fields**
- minRam
- tags (OldHardware)

**Question**
> Is this computer older or not very powerful?

**Allowed Answers**

| User Answer | Applied Patches |
|-----------|----------------|
| Yes, it’s pretty old | set minRam = 4 + add_tag OldHardware |
| No, it’s fairly modern | none |

---

## Q6 – Do you care a lot about privacy?

**User Intent Fields**
- tags (Privacy)

**Question**
> How important is privacy to you?

**Allowed Answers**

| User Answer | Applied Patches |
|-----------|----------------|
| Very important | add_tag Privacy |
| I care, but convenience matters too | none |

---

## Q7 – (Hidden) Hardware Compatibility
