# Publishing & Deployment Strategy

## Overview

This document outlines the comprehensive publishing and deployment strategy for @nexcraft/forge, featuring multiple release channels, automated workflows, and robust quality assurance.

## Current Implementation Status

### ✅ Fully Implemented
- **CONSOLIDATED:** Main Branch CI & Release pipeline (`.github/workflows/main-branch.yml`)
- **NEW:** Develop Branch CI pipeline (`.github/workflows/develop-ci.yml`)
- **LEGACY:** Beta Release workflow (`.github/workflows/beta-release.yml`) - for manual beta releases
- NPM publishing to @nexcraft/forge (stable releases)
- NPM workspace support for @nexcraft/forge-rhf package
- Automated Changesets-based versioning and publishing
- Comprehensive changelog generation with Changesets
- GitHub Releases with automated notes
- GitHub Pages deployment for examples
- Git branch synchronization (main ↔ develop)

### 🚧 Enhancements Made
- Fixed duplicate CI workflow issues
- Added GitHub Actions proper permissions
- Implemented meaningful changelog generation
- Added pre-release quality gates

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

### 1. Main Branch CI & Release (`main-branch.yml`)

**Triggers:**
- Pushes to `main` (full CI + release pipeline)
- PRs to `main` (CI only, no release)

**Features:**
- Matrix testing (Node 20.x, 22.x)
- ESLint and TypeScript checking
- Test coverage reporting with artifacts
- Build verification for both packages
- Storybook build
- Changesets-based automatic releases
- Branch synchronization with develop
- Example app updates after publishing

**Quality Gates:**
- Zero TypeScript errors
- Zero ESLint errors
- All tests must pass
- Successful builds for all packages

### 2. Develop Branch CI (`develop-ci.yml`)

**Triggers:**
- Pushes to `develop`
- PRs targeting `develop`

**Features:**
- Matrix testing (Node 20.x, 22.x)
- Lightweight CI (lint, type-check, test, build)
- Fast feedback without release overhead
- No publishing or deployment steps

**Process:**
1. Run linting and type checking
2. Execute test suite
3. Verify build processes
4. Provide fast feedback for development

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