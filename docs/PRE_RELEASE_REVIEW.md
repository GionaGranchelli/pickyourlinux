# Pre-Release Review Checklist

Use this checklist before tagging a release.

## Build & Validation
- [ ] `npm run typecheck`
- [ ] `npm run validate:flow`
- [ ] `npm run validate:questions`
- [ ] `npm run validate:distros`
- [ ] `npx vitest run`
- [ ] `npm run generate`

## UX Review
- [ ] Wizard completes without errors
- [ ] Results render with explainability panel
- [ ] Share link restores a completed session
- [ ] Manifesto, How it works, and Data sources pages load

## Data & Schema
- [ ] `src/data/version.ts` updated if schema or dataset changed
- [ ] `docs/DISTRO_COVERAGE_AUDIT.md` reviewed

## Release
- [ ] Tag created (e.g., `v0.1.0`)
