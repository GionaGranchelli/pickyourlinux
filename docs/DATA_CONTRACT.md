# Data Contract

This document explains what the schemas *mean*.

---

## UserIntent Fields

| Field | Meaning |
|------|--------|
| installation | GUI vs CLI tolerance during install |
| maintenance | Terminal usage after install |
| proprietary | Acceptance of closed-source software |
| architecture | CPU architecture |
| minRam | Minimum RAM in GB |
| tags | Use-case flags (enum only) |

---

## Condition Operators

| Operator | Semantics |
|--------|-----------|
| eq | strict equality |
| neq | strict inequality |
| in | scalar ∈ set |
| contains | array contains scalar |
| and / or | boolean logic |

---

## Patch Operations

| Patch | Effect |
|-----|--------|
| set | Replace field value |
| add_tag | Add enum tag (idempotent) |
| remove_tag | Remove enum tag |

---

## Guarantees

- No invalid state can be produced
- All logic is diffable and serializable
- All decisions are explainable