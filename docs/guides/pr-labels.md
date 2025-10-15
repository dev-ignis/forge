# PR Label Reference

This document defines the standard labels used for Pull Requests in the Forge repository.

## Type Labels

Labels that indicate the type of change:

| Label | Description | Color |
|-------|-------------|-------|
| `feature` | New features or enhancements | 🟢 Green |
| `fix` | Bug fixes | 🔴 Red |
| `docs` | Documentation changes | 📘 Blue |
| `refactor` | Code refactoring | 🟡 Yellow |
| `perf` | Performance improvements | 🟠 Orange |
| `test` | Test additions/improvements | 🟣 Purple |
| `chore` | Maintenance tasks | ⚫ Gray |
| `ci` | CI/CD changes | 🔵 Light Blue |

## Priority Labels

Labels that indicate urgency:

| Label | Description | Color |
|-------|-------------|-------|
| `priority: critical` | Needs immediate attention | 🔴 Red |
| `priority: high` | Important, should be addressed soon | 🟠 Orange |
| `priority: medium` | Normal priority | 🟡 Yellow |
| `priority: low` | Can wait | 🟢 Green |

## Status Labels

Labels that track PR progress:

| Label | Description | Color |
|-------|-------------|-------|
| `status: blocked` | Blocked by something | 🔴 Red |
| `status: in-review` | Under review | 🟡 Yellow |
| `status: needs-changes` | Requires changes | 🟠 Orange |
| `status: ready-to-merge` | Approved and ready | 🟢 Green |
| `status: wip` | Work in progress | ⚫ Gray |

## Scope Labels

Labels that indicate which part of the codebase is affected:

| Label | Description |
|-------|-------------|
| `scope: core` | Core library changes |
| `scope: react` | forge-react package |
| `scope: vue` | forge-vue package |
| `scope: angular` | forge-angular package |
| `scope: rhf` | forge-rhf package |
| `scope: tokens` | Design tokens |
| `scope: docs` | Documentation |
| `scope: demos` | Demo applications |
| `scope: storybook` | Storybook changes |

## Size Labels

Labels that indicate the size of the change:

| Label | Description | Lines Changed |
|-------|-------------|---------------|
| `size: xs` | Tiny change | <10 lines |
| `size: s` | Small change | 10-50 lines |
| `size: m` | Medium change | 50-200 lines |
| `size: l` | Large change | 200-500 lines |
| `size: xl` | Extra large change | >500 lines |

## Special Labels

| Label | Description | Color |
|-------|-------------|-------|
| `deps` | Dependency updates | 🔵 Blue |
| `security` | Security updates | 🔴 Red |

## Release Labels

Labels that indicate versioning impact (aligns with semver):

| Label | Description | Version Bump | Color |
|-------|-------------|--------------|-------|
| `release: major` | Breaking changes | x.0.0 | 🔴 Red |
| `release: minor` | New features | 0.x.0 | 🟡 Yellow |
| `release: patch` | Bug fixes | 0.0.x | 🟢 Green |

## Usage Guidelines

### When Opening a PR

1. **Type**: Add at least one type label (`feature`, `fix`, etc.)
2. **Scope**: Add relevant scope labels (can be multiple)
3. **Size**: GitHub may auto-add size labels, or add manually
4. **Status**: Start with `status: in-review` or `status: wip`

### During Review

- Add `status: needs-changes` if changes are requested
- Add `status: blocked` if waiting on external factors
- Remove `status: wip` when ready for full review

### Before Merge

- Ensure `status: ready-to-merge` is applied
- Verify correct `release:` label for version bumps
- Check that all scope labels are accurate

### Dependabot PRs

- Automatically labeled with `deps`
- Add `security` if it's a security update
- No changeset required (see CI workflow)

## Examples

**Feature PR for React integration:**
- `feature`
- `scope: react`
- `size: m`
- `release: minor`

**Bug fix in core:**
- `fix`
- `scope: core`
- `size: s`
- `release: patch`
- `priority: high`

**Documentation update:**
- `docs`
- `scope: docs`
- `size: xs`
- No release label needed

**Storybook AI Panel feature:**
- `feature`
- `scope: storybook`
- `size: l`
- `priority: high`
- `release: minor`
