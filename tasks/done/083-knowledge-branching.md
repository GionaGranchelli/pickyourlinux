# Task 083: Knowledge Branching (Proxy Questions)

## Status
- [x] Implement "Safe Defaults" for Beginners in `q_linux_familiarity` (GUI installer, no terminal maintenance).
- [x] Add `q_beginner_ui_style` (vibe-based DE question) for beginners.
- [x] Update `q_desktop_preference` to show only for non-beginners.
- [x] Update `q_release_model` to show only for non-beginners.
- [x] Update English and Italian localizations for new vibe-based questions.
- [x] Validate flow logic.

## Context
Reframing the journey based on knowledge allows us to use different language for different users. Beginners are asked about "vibe" and "familiarity" while experts get technical terminology. This reduces friction for newcomers without losing precision for power users.

## Results
- Beginners get a streamlined, jargon-free path.
- Power users retain full control over technical attributes.
- Both paths converge on the same underlying `UserIntent` schema.
