# Task 082: Reframe Entry Point (Knowledge-based)

## Status
- [x] Rename `q_experience_depth` to `q_linux_familiarity`
- [x] Reframe options based on familiarity (Beginner, Familiar, Expert)
- [x] Add descriptions to familiarity options to clarify expectations
- [x] Update English and Italian localizations
- [x] Validate flow logic

## Context
Reframing the entry point from "depth of flow" to "user knowledge" provides a better mental model for the user. It allows the engine to act more like a consultant and prepares the ground for "Proxy Questions" where beginners get vibe-based questions and experts get technical ones.

## Results
- Users now select their path based on their existing Linux knowledge.
- The `experience` intent field remains compatible with existing engine logic.
- Session resets are handled gracefully by renaming the initial question ID.
