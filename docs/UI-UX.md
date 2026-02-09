# UI–UX STANDARDS & DESIGN SYSTEM
## Pick Your Linux

This document defines **non-negotiable standards** for UI, UX, and the digital journey.
Its goal is to ensure the product is:
- **Useful** (helps users decide)
- **Lean** (no unnecessary UI logic or clutter)
- **Beautiful** (calm, trustworthy, modern)
- **Implementable** (simple to build, easy to maintain)

This is not a visual moodboard.  
This is a **product behavior contract**.

---

## 1. Core Design Principles (Non-Negotiable)

### 1.1 Deterministic UX
- The UI **never guesses**
- The UI **never ranks**
- The UI **never editorializes**
- Every visible outcome must be explainable by data + rules

If the engine cannot explain it, the UI must not show it.

---

### 1.2 User Agency Over Automation
The user must always feel:
- “I chose this”
- “I can change this”
- “I understand why this happened”

No dark patterns.
No forced funnels.
No hidden assumptions.

---

### 1.3 Progressive Disclosure
- Start **simple**
- Add **depth only when asked**
- Never overload beginners with expert concepts

Depth is **opt-in**, never mandatory.

---

### 1.4 Calm Over Clever
We optimize for:
- clarity
- trust
- legibility

We explicitly avoid:
- gimmicks
- “hacker” theatrics
- influencer-style copy

---

## 2. Digital Journey Structure

The entire product journey must fit into **3 screens**:

### 2.1 Screen 1 — Welcome & Promise
Purpose: reduce anxiety, set expectations.

Must communicate clearly:
- No “best distro”
- No opinions
- Transparent logic
- You can stop anytime

Elements:
- One headline
- One short paragraph
- One primary CTA: **Start**
- One secondary reassurance line

No scrolling required.

---

### 2.2 Screen 2 — Decision Wizard
Purpose: collect constraints with minimal friction.

Rules:
- One question per screen
- 3–5 options max
- Always include “Not sure” where applicable
- Visible progress indicator
- Visible phase label (Beginner / Refine / Expert)

Mandatory affordances:
- Undo / Back
- Review answers (drawer or sidebar)
- Early exit after Beginner phase

The wizard **never**:
- explains Linux history
- compares distros
- makes recommendations

It only collects intent.

---

### 2.3 Screen 3 — Results & Explainability
Purpose: present a **shortlist**, not a verdict.

Default view:
- 3–5 compatible distros
- Alphabetical or stable order
- No “#1”, no scores

Each distro card must contain:
- Name
- Neutral one-line description
- “Why it fits you” (bullet list)
- “Potential friction” (bullet list)

Expandable sections:
- Show all compatible distros
- Why others were excluded
- Full reasoning breakdown

---

## 3. Question Design Standards

### 3.1 Language Rules
- Written for **Windows users**
- No jargon in Beginner phase
- Explain concepts in human terms

Bad:
> “Do you prefer a rolling release?”

Good:
> “Do you want frequent updates, or fewer changes over time?”

---

### 3.2 Question Semantics
Each question must:
- Map to a **real schema field**
- Change **exactly one dimension of intent**
- Be reversible

No hypothetical questions.
No curiosity-only questions.

---

### 3.3 Phase Rules

#### Beginner Phase
- 8–12 questions max
- No advanced terminology
- Focus on comfort, expectations, hardware reality

#### Intermediate Phase
- Refinement questions
- Desktop environment
- Release model
- Secure Boot / GPU

#### Advanced Phase
- Explicit opt-in
- Init system
- Package manager
- Strict constraints

Advanced questions must always include:
- “No preference”
- “I don’t care”

---

## 4. Result Presentation Standards

### 4.1 Compatibility, Not Recommendation
The UI must never say:
- “Best”
- “Recommended”
- “Top”

Instead:
- “Compatible with your choices”
- “Fits the constraints you selected”

---

### 4.2 Shortlist First
- Show a **small, usable set**
- Allow expansion, never force it

Rationale:
Decision fatigue kills trust.

---

### 4.3 Explainability Is a First-Class Feature
Explainability is not a tooltip.
It is a **core surface**.

Users must be able to answer:
- Why is this shown?
- Why was X not shown?

Without reading documentation.

---

## 5. Visual Design System (Lean & Implementable)

### 5.1 Layout
- Centered column
- Max width: readable (not full screen)
- Card-based composition
- Generous whitespace

---

### 5.2 Color
- Neutral base (light or dark)
- One accent color for actions
- Color is never semantic for logic (no red = bad distro)

---

### 5.3 Typography
- System or near-system fonts
- High contrast
- No decorative fonts

Clarity > personality.

---

### 5.4 Motion
- Subtle transitions only
- Motion communicates state change, not flair
- Never block interaction

---

## 6. Interaction & Control Standards

### 6.1 Reversibility
Every action must be undoable:
- Change answers
- Restart flow
- Re-run with tweaks

Fearless exploration is the goal.

---

### 6.2 Predictability
- Same answers → same results
- No randomness
- No A/B logic

Trust is built through consistency.

---

### 6.3 Accessibility
- Keyboard navigable
- Screen-reader friendly
- No reliance on color alone

This is mandatory, not optional.

---

## 7. What the UI Must Never Do

- Never compute logic
- Never infer intent
- Never hide tradeoffs
- Never override engine output
- Never present opinions as facts

If the UI needs “if/else” about Linux → **engine problem**, not UI problem.

---

## 8. Success Criteria (UX Acceptance)

The UI is considered successful if:
- A non-technical user completes Beginner phase in < 3 minutes
- The user can explain *why* a distro appeared
- The user can explain *why* another didn’t
- The user never feels “judged” or “talked down to”

---

## 9. Design Philosophy Summary

This product is not:
- a quiz
- a ranking
- a personality test

It is:
> **A transparent decision system that respects the user’s constraints and intelligence.**

The UI’s job is to **get out of the way** and let that shine.

---
