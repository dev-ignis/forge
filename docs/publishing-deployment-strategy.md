# Publishing & Deployment Strategy

## Overview

This document outlines the comprehensive publishing and deployment strategy for @nexcraft/forge, featuring multiple release channels, automated workflows, and robust quality assurance.

## Current Implementation Status

### ✅ Fully Implemented (Phase 15 Complete - September 2024)
- **CURRENT:** Main Branch CI pipeline (`.github/workflows/ci.yml`) - comprehensive validation
- **CURRENT:** Develop Branch CI pipeline (`.github/workflows/develop.yml`) - PR validation + beta publishing
- **CURRENT:** Release automation (`.github/workflows/release.yml`) - Changesets-based releases
- **CURRENT:** GitHub Pages deployment (`.github/workflows/deploy.yml`) - examples + docs
- NPM publishing to **@nexcraft/forge** (main package - web components)
- **NEW:** NPM workspace support for **6 framework packages:**
  - `@nexcraft/forge-react` - React integration
  - `@nexcraft/forge-angular` - Angular integration
  - `@nexcraft/forge-vue` - Vue integration
  - `@nexcraft/forge-rhf` - React Hook Form integration
  - `@nexcraft/forge-tokens` - Figma design tokens CLI
  - `@nexcraft/forge-mcp-figma` - MCP server for Figma integration
- **ENHANCED:** AI-native documentation with metadata for 30+ components
- **NEW:** Branch-specific workflow strategy (eliminates redundancy)
- **NEW:** Security audit workflows (nightly + PR-based)

### 🚧 Recent Major Improvements (September 2024)
- **Fixed workflow redundancy issues** - separate main/develop workflows
- **Resolved TypeScript compilation errors** across all framework packages
- **Fixed coverage threshold issues** (87.42% achieved vs 70% requirement)
- **Implemented CI optimization strategy** - 80% cost reduction via PR-only vs Push strategy
- **Enhanced beta publishing workflow** - supports all 6 workspace packages
- **Added comprehensive security auditing** - Dependabot + nightly scans

### 📋 Advanced Features Available
- Multi-channel releases (stable, beta, alpha, rc)
- Manual and automatic release triggers
- Branch-based development workflow
- Comprehensive documentation publishing

## NPM Publishing

### Package Configuration

The package is published as **@nexcraft/forge** on NPM.

```json
{
  "name": "@nexcraft/forge",
  "version": "0.0.2",
  "type": "module",
  "main": "./dist/nexcraft-forge.es.js",
  "module": "./dist/nexcraft-forge.es.js",
  "types": "./dist/index.d.ts",
  "files": [
    "dist",
    "custom-elements.json",
    "README.md",
    "LICENSE",
    "CHANGELOG.md"
  ],
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/nexcraft-forge.es.js",
      "require": "./dist/nexcraft-forge.umd.js"
    },
    "./dist/*": {
      "types": "./dist/*.d.ts",
      "import": "./dist/*",
      "require": "./dist/*"
    },
    "./custom-elements.json": "./custom-elements.json"
  },
  "sideEffects": false,
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org/"
  }
}
```

### Version Strategy

Following semantic versioning with conventional commits:

- **BREAKING CHANGE** or **!:** → Major version (1.0.0)
- **feat:** → Minor version (0.1.0)
- **fix:** → Patch version (0.0.1)
- **chore:**, **docs:** → No version bump

## GitHub Actions Workflows

### Current Workflow Architecture (September 2024)

**Branch-Specific Strategy** - eliminates redundancy and provides clear separation:

### 1. Main Branch CI (`ci.yml`)

**Triggers:**
- Pushes to `main` (comprehensive validation)
- PRs to `main` (full quality gates)

**Features:**
- Matrix testing (Node 20.x, 22.x)
- Comprehensive validation pipeline
- ESLint and TypeScript checking with workspace package builds
- Test coverage reporting (87.42% achieved)
- Build verification for main + workspace packages
- Storybook build and artifact generation
- AI manifest validation

**Quality Gates:**
- Zero TypeScript errors across all packages
- Zero ESLint errors
- All tests must pass (70% coverage minimum)
- Successful builds for all 7 packages
- Valid AI manifest with 30+ components

### 2. Develop Branch CI (`develop.yml`)

**Triggers:**
- Pushes to `develop` (smoke test only)
- PRs targeting `develop` (comprehensive validation)
- Manual workflow dispatch for beta publishing

**Features:**
- **PR Mode**: Full validation (lint, typecheck, test, build)
- **Push Mode**: Lightweight smoke test (build + AI validation)
- **Manual Mode**: Beta publishing with workspace package coordination
- Fast feedback optimized for development

**Beta Publishing Process:**
1. Smoke test validation
2. Version increment (0.7.1 → 0.7.2-beta.0)
3. Update all 6 workspace package versions
4. Fresh dependency install (`npm ci --legacy-peer-deps`)
5. Rebuild with correct version relationships
6. Publish main package + all workspace packages to npm

**Current Status**: 🚧 Beta publishing workflow under active development

### 3. Release Automation (`release.yml`)

**Triggers:**
- Successful CI completion on main branch (workflow_run)

**Features:**
- Changesets-based automatic releases
- GitHub Release creation with notes
- Branch synchronization (main → develop)
- Example app updates after publishing

### 4. GitHub Pages Deployment (`deploy.yml`)

**Triggers:**
- Successful CI completion on main branch (workflow_run)

**Features:**
- Storybook deployment to GitHub Pages
- Next.js example app deployment
- Documentation site generation
- CDN distribution via GitHub Pages

### Key Improvements Made

1. **Workflow Consolidation:**
   - Consolidated 3 separate workflows into unified `main-branch.yml`
   - Reduced workflow overhead from 3→1 on main branch merges
   - Added separate lightweight CI for develop branch
   - Fixed GitHub Actions permissions for PR creation

2. **Monorepo Support:**
   - Added npm workspaces support for @nexcraft/forge-rhf
   - Implemented Changesets for coordinated releases
   - Fixed workspace build processes and dependencies

3. **Quality & Performance:**
   - Updated to Node.js 20.x and 22.x matrix testing
   - Fixed Husky pre-commit hooks (CRLF→LF line endings)
   - Improved build reliability and error handling
   - Added comprehensive artifact uploads for debugging

## CDN Distribution

The package is available via CDN for zero-config usage:

```html
<!-- Latest version -->
<script type="module" src="https://cdn.jsdelivr.net/npm/@nexcraft/forge"></script>

<!-- Specific version -->
<script type="module" src="https://cdn.jsdelivr.net/npm/@nexcraft/forge@0.0.2"></script>

<!-- Usage -->
<forge-button variant="primary">Click Me</forge-button>
```

## Environment Variables & Secrets

### Required GitHub Secrets

```bash
# NPM Publishing
NPM_TOKEN=npm_xxxxxxxxxxxxx

# GitHub (automatic)
GITHUB_TOKEN=<automatically provided>

# Optional: Documentation Deployment
NETLIFY_AUTH_TOKEN=xxxxxxxxxxxxx  # If using Netlify
NETLIFY_SITE_ID=xxxxxxxxxxxxx     # If using Netlify

# Optional: Visual Testing
CHROMATIC_PROJECT_TOKEN=xxxxx     # If using Chromatic
```

### Setting Up NPM Token

1. Go to npmjs.com → Account Settings → Access Tokens
2. Create new token (Automation type recommended)
3. Add to GitHub repository secrets:
   ```bash
   gh secret set NPM_TOKEN --body "npm_xxxxxxxxxxxxx"
   ```

## Quality Assurance

### Pre-release Checklist

All automated checks that must pass:

- [x] 90% test coverage minimum
- [x] No TypeScript errors
- [x] No ESLint errors
- [x] All tests passing
- [x] Build successful
- [x] Valid package.json
- [x] Bundle size under 150KB (31.16KB achieved)
- [ ] Visual regression tests (pending Chromatic setup)

### Monitoring

- **NPM Downloads**: Track via [npm stats](https://npm-stat.com/charts.html?package=@nexcraft/forge)
- **Bundle Size**: Monitor via [Bundlephobia](https://bundlephobia.com/package/@nexcraft/forge)
- **Security**: GitHub Dependabot enabled
- **Build Status**: GitHub Actions dashboard

## Rollback Strategy

### Quick Rollback Process

```bash
# 1. Deprecate broken version
npm deprecate @nexcraft/forge@0.0.3 "Critical bug - use 0.0.2"

# 2. Revert commits in git
git revert <commit-hash>
git push origin main

# 3. Tag previous version as latest
npm dist-tag add @nexcraft/forge@0.0.2 latest
```

### Hotfix Process

```bash
# 1. Create hotfix from last stable tag
git checkout -b hotfix/0.0.3 v0.0.2

# 2. Fix the issue
# ... make changes ...

# 3. Commit with fix type
git commit -m "fix: critical bug in button component"

# 4. Merge to main
git checkout main
git merge hotfix/0.0.3
git push origin main

# Release workflow will automatically publish
```

## Documentation Deployment

### Storybook Deployment (Planned)

Storybook build is included in CI but deployment is pending configuration. Options being considered:
- GitHub Pages (free, integrated)
- Netlify (preview deployments)
- Vercel (edge network)

## Success Metrics

### Current Metrics
- **Release Velocity**: On-demand releases via GitHub Actions
- **Build Success Rate**: ~95% (after fixing CI issues)
- **Test Coverage**: 90.62% ✅
- **Bundle Size (Core)**: 7.8KB ✅

### Target Metrics
- **NPM Downloads**: Growing organically
- **GitHub Stars**: Community-driven
- **Community Contributors**: Open for contributions
- **Mean Time to Release**: <10 minutes from merge (achieved)

## Troubleshooting

### Common Issues & Solutions

**NPM Publish Fails (403 Forbidden)**
```bash
# Check if package name is taken
npm view @nexcraft/forge

# Verify token permissions
npm whoami

# Ensure token is automation type
npm token list
```

**GitHub Actions Timeout**
```yaml
# Increase timeout in workflow
jobs:
  build:
    timeout-minutes: 30  # default is 360
```

**Cache Not Working**
```bash
# Clear cache via GitHub UI
# Settings → Actions → Caches → Delete
```

## Next Steps

- [ ] Configure Storybook deployment
- [ ] Add visual regression testing with Chromatic
- [ ] Set up preview deployments for PRs
- [ ] Enable nightly builds from develop branch

## References

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [NPM Publishing Best Practices](https://docs.npmjs.com/packages-and-modules)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)