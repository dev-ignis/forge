# Phase 15: Release Automation & Versioning

## Objective
Adopt a robust, monorepo-friendly release system that versions and publishes only changed packages automatically with high-quality changelogs.

## Decision
- Primary: Changesets for multi-package versioning and publishing (recommended for our monorepo).
- Alternative: semantic-release per package via matrix jobs (kept as a supported option).

## Background: Changesets
- What it is: versioning + publishing for monorepos and single packages using small files in `.changeset/` that declare which packages change and the bump type (patch/minor/major).
- Why we like it: explicit, reviewable, and optimized for workspaces; publishes only changed packages with clean changelogs.
- Typical flow:
  - `npx changeset` → author a changeset (select packages + bump + summary)
  - Bot opens a “Version Packages” PR with version bumps + changelogs
  - Merge PR → run `npx changeset publish` to publish changed packages
- Docs:
  - Official: https://changesets.dev
  - GitHub: https://github.com/changesets/changesets
  - Intro: https://github.com/changesets/changesets/blob/main/docs/intro-to-using-changesets.md

## Scope
- Initialize Changesets at repo root (independent versions).
- Add GitHub Action to build all workspaces and run `changeset publish` on main.
- Deprecate the custom manual bump flow in `.github/workflows/release.yml`.
- If choosing semantic-release instead, configure per-package `.releaserc.js` and a matrix workflow.

## Progress Checklist
- [ ] Install and initialize Changesets in the repo
- [ ] Add root scripts for `release` and `version` (Changesets)
- [x] Create Release GitHub Action using `changeset publish`
- [ ] Configure `NPM_TOKEN` in GitHub secrets
- [ ] Build all workspaces in CI before publish
- [ ] Remove/archive legacy `.github/workflows/release.yml`
- [ ] Validate version PR flow (changeset → version PR → merge)
- [ ] Dry-run publish from CI (optional)
- [ ] First real publish of changed packages succeeds
- [ ] Docs updated to reflect new release process
- [ ] (Optional) Semantic-release per-package config and matrix workflow

## Work Plan
1) Changesets Setup
- `npm i -D @changesets/cli && npx changeset init`
- Add root scripts: `release` (author changeset), `version` (run by bot/CI).

2) CI: Release Workflow (Changesets)
- Build all workspaces, then `npx changeset publish` with `NPM_TOKEN`.
- Keep a preview/dry-run path for verification.

3) Clean Up Legacy Release
- Remove or archive `.github/workflows/release.yml` (manual bump flow).
- Update docs to reflect the new process.

4) Optional: semantic-release Path
- Per-package `.releaserc.js` with package-scoped tags and changelogs.
- Matrix GitHub Action to run semantic-release in each package directory.

## Deliverables
- Changesets config and generated `.changeset/` entries.
- Release GitHub Action for Changesets.
- Documentation updates in plans/process and ADR-010 cross-references.

## Acceptance Criteria
- Merging a PR with changesets triggers a version PR; merging that PR publishes changed packages only.
- NPM and GitHub releases reflect correct versions and changelogs.
- No manual version bumps or ad-hoc changelog edits required.

## Risks & Mitigations
- Mixed strategies confusion → Clearly document Changesets as the default; semantic-release as optional.
- CI secrecy/configuration → Store `NPM_TOKEN` in GitHub secrets; least-privilege access.
- Monorepo drift → Build and type-check all workspaces in CI.

## References
- Phase 14: Monorepo Platform & Publishing
- plans/process/semantic-release-migration.md
- plans/adrs/ADR-010-versioning-release.md
