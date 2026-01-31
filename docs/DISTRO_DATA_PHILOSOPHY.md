# Distro Data Philosophy

Pick Your Linux treats distributions as **constraint-bearing entities**, not recommendations.
This aligns with the Manifesto: no rankings, no opinions, no "best".

---

## Core Principles

- **Facts only.** Distro attributes must be observable and verifiable.
- **No opinions.** Never label a distro as "best", "beginner", or "recommended".
- **Explicit trade-offs.** If a distro requires more setup, that must be captured as a constraint.
- **Deterministic data.** The same input always produces the same output.

---

## What Data Represents

Each distro entry describes:
- How it is installed (installer experience).
- How much ongoing effort it expects (maintenance style).
- Whether proprietary software is supported.
- Whether it can run on older hardware.
- Its practical support for gaming.
- Its privacy posture.

These are **capabilities and constraints**, not value judgments.

---

## What Data Must Never Do

- Rank distros.
- Suggest a "best" option.
- Hide trade-offs.
- Encode taste, popularity, or community bias.

---

## How This Is Used

The engine compares user intent to distro constraints.
It only includes or excludes based on explicit, schema-defined rules.
Every exclusion must be explainable.

---

## Contribution Rule

If a data point cannot be defended with a clear factual basis, it does not belong in the dataset.
When in doubt, choose the more conservative attribute.
