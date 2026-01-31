# Distro Data Rules (Audit)

These rules exist to keep the dataset consistent and defensible.
They are audited as warnings, not hard failures.

---

## R1 — Rolling Releases vs Maintenance Style

Rule
- If `releaseModel = ROLLING`, `maintenanceStyle` should usually be `HANDS_ON`.

Why
- Rolling releases typically require more frequent updates and hands-on maintenance.

Allowed Exceptions
- Distros explicitly designed to reduce maintenance burden can be exceptions (e.g., Manjaro).

---

## R2 — Secure Boot Out of Box

Rule
- `secureBootOutOfBox = true` should be rare and defensible.

Why
- Secure Boot support is not universal and typically requires explicit signing workflows.

Audit Action
- Flag each distro with `secureBootOutOfBox = true` for review.

---

## R3 — NVIDIA Experience vs Proprietary Support

Rule
- `nvidiaExperience` cannot be `GOOD` if `proprietarySupport = NONE`.

Why
- Good NVIDIA support generally depends on proprietary drivers.

Audit Action
- Flag any entries that violate this rule.
