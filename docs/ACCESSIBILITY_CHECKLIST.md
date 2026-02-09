# Accessibility Checklist (Wizard Journey)

Last verified: 2026-01-31

Use this checklist before release. Mark each item after manual verification.

---

## Keyboard Navigation

- [x] Tab order progresses logically through the welcome screen (Start → How it works).
- [x] Wizard options are reachable via keyboard and show a visible focus ring.
- [x] Wizard navigation buttons (Back / Review / Restart) are keyboard accessible.
- [x] Results screen buttons (Review answers / Why these results / Start over) are keyboard accessible.

## Focus Visibility

- [x] All buttons show a visible focus ring.
- [x] Links show a visible focus ring.
- [x] Focus is not trapped outside a modal when a drawer is open.

## Drawer Accessibility

- [x] Review Answers drawer opens with focus on the panel.
- [x] Explainability drawer opens with focus on the panel.
- [x] ESC closes each drawer.
- [x] Clicking outside closes each drawer.

## Semantics

- [x] Interactive controls are real `<button>` or `<a>` elements.
- [x] Modal drawers use `role="dialog"` and `aria-modal="true"`.

---

## Manual Test Flow (Quick)

1. Open `/` and tab to **Start**, press Enter.
2. In `/wizard`, tab through options, select one with Enter/Space.
3. Open **Review answers**, confirm focus moves to the drawer, press Esc to close.
4. Complete flow and open `/results`.
5. Use **Why these results?** and press Esc to close.
6. Use **Start over** to return to the welcome screen.
