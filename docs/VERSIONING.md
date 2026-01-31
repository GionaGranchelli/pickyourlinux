# Versioning

This project tracks three independent versions:

- **Release version**: human-facing app release tag (e.g., `v0.1.0`).
- **Schema version**: changes to Zod schemas and legal state definitions.
- **Dataset version**: changes to `distros.json` entries.

Current values are stored in `src/data/version.ts`.

## Release Tagging
When the checklist in `docs/PRE_RELEASE_REVIEW.md` is complete, create the tag:

```
git tag v0.1.0
```
