# Phase 14: Release Automation & Versioning

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

## Current GitHub Workflows Analysis

### Existing Workflow Inventory
Current `.github/workflows/` contains 5 workflow files with significant overlap and complexity:

1. **ci.yml** - Comprehensive CI pipeline
   - Triggers: Push to main/develop, PRs to main 
   - Jobs: test (Node 20.x/22.x matrix), build-docs
   - Quality gates: lint, type-check, test, test:coverage, build, build-storybook
   - **Status**: ✅ Keep - Core CI functionality, well-structured

2. **beta-release.yml** - Manual beta releases
   - Triggers: Manual workflow_dispatch only
   - Features: Custom version input, beta/alpha/rc variants, changelog generation
   - Quality gates: lint, type-check, test, build
   - **Status**: ⚠️ Consolidate - Redundant quality checks, manual process

3. **release.yml** - Complex automated production releases  
   - Triggers: After CI completion on main, manual workflow_dispatch
   - Features: Conventional commits parsing, automatic version bumping, NPM publish
   - Quality gates: None (depends on CI workflow_run)
   - Jobs: check-ci, release, publish-docs (Storybook to GitHub Pages)
   - **Status**: 🔄 Replace - Overly complex, unreliable workflow_run dependencies

4. **changesets-release.yml** - Changesets stub (manual only)
   - Triggers: Manual workflow_dispatch only
   - Features: Basic changeset publish, workspace-aware builds
   - **Status**: 🚀 Expand - Foundation for automated Changesets workflow

5. **sync-branches.yml** - Branch synchronization
   - Triggers: Push to main, manual workflow_dispatch  
   - Features: Auto-sync develop with main, version alignment
   - Quality gates: lint, type-check, build
   - **Status**: ⚠️ Review - May be incompatible with Changesets workflow

### Redundancy and Complexity Issues

**Quality Check Duplication:**
- CI runs full test suite on develop/main branches
- Beta release re-runs lint/type-check/test/build (redundant if CI passed)
- Sync branches re-runs lint/type-check/build (redundant if main CI passed)
- Total: 3x redundant quality checks for release processes

**Manual Process Pain Points:**
- Beta releases require manual workflow_dispatch + version selection
- Production releases depend on fragile workflow_run triggers
- Version bumping scattered across multiple workflows
- AI manifest regeneration conflicts (build artifacts overwrite manual content)
- Complex git operations prone to merge conflicts

**Workflow Dependencies:**
- release.yml depends on ci.yml completion (workflow_run)
- sync-branches.yml assumes release.yml has updated main
- Fragile dependency chain prone to failures

### Consolidation Strategy

**Phase 1: Immediate Simplification**
- ✅ Keep `ci.yml` - Core CI pipeline (no changes needed)
- 🔄 Replace `release.yml` with enhanced `changesets-release.yml`
- ⚠️ Archive `beta-release.yml` - Changesets handles prerelease tags
- ⚠️ Archive `sync-branches.yml` - Incompatible with Changesets PR-based flow

**Phase 2: Changesets Integration**
- Enhance `changesets-release.yml` with:
  - Automatic trigger on main after CI passes
  - Version Packages PR automation via Changesets bot
  - Only publish when Version Packages PR is merged
  - Eliminate redundant quality checks (trust CI)
  - Integrate AI manifest and documentation builds

**Phase 3: Workflow Cleanup**
- Move archived workflows to `.github/workflows/archived/`
- Update documentation to reflect new process
- Configure NPM_TOKEN and Changesets bot permissions

### Enhanced Changesets Workflow Design

```yaml
# .github/workflows/changesets-release.yml (enhanced)
name: Release
on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  version-or-publish:
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      # ... setup steps ...
      
      # Create Version PR if changesets exist
      - name: Create Release Pull Request or Publish
        id: changesets
        uses: changesets/action@v1
        with:
          publish: npm run release
          commit: "chore: update versions"
          title: "chore: update versions"
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
      
      # Only run additional steps if packages were published
      - name: Build and publish documentation
        if: steps.changesets.outputs.published == 'true'
        run: |
          npm run build-storybook
          # Deploy to GitHub Pages
          
      # Update AI manifest after successful publish
      - name: Update AI manifest
        if: steps.changesets.outputs.published == 'true'
        run: npm run build:ai
```

### Migration Benefits

**Eliminated Complexity:**
- Single automated workflow instead of 3 manual/complex ones
- No more workflow_run dependencies or timing issues
- No more redundant quality checks (trust CI)
- No more manual version bumping or changelog editing

**Improved Reliability:**
- Changesets PR-based flow is reviewable and reliable
- Only publish packages that actually changed
- Atomic version bumps with proper changelogs
- AI manifest regeneration only after successful publish

**Developer Experience:**
- `npx changeset` to declare changes (reviewable)
- Automatic Version Packages PR creation
- Merge PR = automatic publish
- Beta releases via `npx changeset pre enter beta`

### Removal Plan

**Files to Archive:**
- `.github/workflows/beta-release.yml` → `.github/workflows/archived/beta-release.yml`
- `.github/workflows/release.yml` → `.github/workflows/archived/release.yml`  
- `.github/workflows/sync-branches.yml` → `.github/workflows/archived/sync-branches.yml`

**Files to Enhance:**
- `.github/workflows/changesets-release.yml` - Expand with full automation
- `.github/workflows/ci.yml` - No changes needed

**Documentation Updates:**
- plans/process/semantic-release-migration.md - Add Changesets migration notes
- README.md - Update release process documentation
- CONTRIBUTING.md - Update contribution workflow

## References
- Phase 14: Monorepo Platform & Publishing
- plans/process/semantic-release-migration.md
- plans/adrs/ADR-010-versioning-release.md
- Current workflows analysis (above)
