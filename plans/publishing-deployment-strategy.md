# Publishing & Deployment Strategy

## Overview
This document outlines the complete publishing and deployment strategy for the Forge UI Component Library, leveraging GitHub Actions for CI/CD, NPM for package distribution, and automated documentation deployment.

## Goals & Objectives

### Primary Goals
- Automate the entire release pipeline from code to production
- Ensure quality gates at every stage of deployment
- Provide preview environments for pull requests
- Maintain comprehensive documentation deployment
- Enable both manual and automated releases

### Key Principles
- **Zero Manual Steps**: Fully automated pipeline from commit to release
- **Quality First**: No releases without passing tests and coverage thresholds
- **Documentation Parity**: Docs always match the latest release
- **Semantic Versioning**: Automated version bumping based on commit messages
- **Rollback Capability**: Easy rollback to previous versions if needed

## Architecture Overview

```mermaid
graph LR
    A[Developer Push] --> B[GitHub Actions]
    B --> C{Branch?}
    C -->|main| D[Full CI Pipeline]
    C -->|PR| E[PR Pipeline]
    D --> F[Build & Test]
    F --> G[Coverage Check]
    G --> H[Type Check]
    H --> I[Lint]
    I --> J[Release]
    J --> K[NPM Publish]
    J --> L[Deploy Docs]
    E --> M[Preview Deploy]
```

## GitHub Actions Workflows

### 1. Continuous Integration (`.github/workflows/ci.yml`)

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18.x, 20.x]
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
      
      - name: Cache Playwright browsers
        uses: actions/cache@v4
        id: playwright-cache
        with:
          path: ~/.cache/ms-playwright
          key: ${{ runner.os }}-playwright-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-playwright-
      
      - name: Install dependencies
        run: npm ci
      
      - name: Install Playwright browsers
        if: steps.playwright-cache.outputs.cache-hit != 'true'
        run: npx playwright install chromium
      
      - name: Run linter
        run: npm run lint
      
      - name: Type check
        run: npm run type-check
      
      - name: Run tests with coverage
        run: npm run test:coverage
      
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          token: ${{ secrets.CODECOV_TOKEN }}
          fail_ci_if_error: true
          verbose: true
      
      - name: Check coverage thresholds
        run: |
          coverage=$(cat coverage/coverage-summary.json | jq '.total.lines.pct')
          if (( $(echo "$coverage < 90" | bc -l) )); then
            echo "Coverage is below 90% threshold"
            exit 1
          fi
      
      - name: Build library
        run: npm run build
      
      - name: Build Storybook
        run: npm run build-storybook
      
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/
      
      - name: Upload Storybook artifacts
        uses: actions/upload-artifact@v3
        with:
          name: storybook-static
          path: storybook-static/

  visual-regression:
    runs-on: ubuntu-latest
    needs: test
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Download Storybook artifacts
        uses: actions/download-artifact@v3
        with:
          name: storybook-static
          path: storybook-static/
      
      - name: Run Chromatic
        uses: chromaui/action@v1
        with:
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
          storybookBuildDir: storybook-static
          exitOnceUploaded: true
          autoAcceptChanges: main
```

### 2. Pull Request Preview (`.github/workflows/pr-preview.yml`)

```yaml
name: PR Preview Deployment

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  deploy-preview:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20.x'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build Storybook
        run: npm run build-storybook
      
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v2.0
        with:
          publish-dir: './storybook-static'
          production-branch: main
          github-token: ${{ secrets.GITHUB_TOKEN }}
          deploy-message: "PR Preview #${{ github.event.number }}"
          enable-pull-request-comment: true
          enable-commit-comment: false
          overwrites-pull-request-comment: true
          alias: preview-pr-${{ github.event.number }}
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
      
      - name: Comment PR with preview link
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `📚 **Storybook Preview**: https://preview-pr-${{ github.event.number }}--forge-ui.netlify.app`
            })
```

### 3. Release & Publish (`.github/workflows/release.yml`)

```yaml
name: Release

on:
  push:
    branches: [main]
  workflow_dispatch:
    inputs:
      release_type:
        description: 'Release type'
        required: true
        default: 'patch'
        type: choice
        options:
          - patch
          - minor
          - major
          - prerelease

permissions:
  contents: write
  packages: write
  id-token: write

jobs:
  release:
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
          token: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20.x'
          registry-url: 'https://registry.npmjs.org'
          cache: 'npm'
      
      - name: Configure Git
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm run test:coverage
      
      - name: Build library
        run: npm run build
      
      - name: Generate Custom Elements Manifest
        run: npm run analyze
      
      - name: Determine version bump
        id: version
        run: |
          if [ "${{ github.event_name }}" == "workflow_dispatch" ]; then
            echo "bump_type=${{ github.event.inputs.release_type }}" >> $GITHUB_OUTPUT
          else
            # Analyze commits for conventional commits
            if git log -1 --pretty=%B | grep -q "^BREAKING CHANGE:\|^[a-z]*!:"; then
              echo "bump_type=major" >> $GITHUB_OUTPUT
            elif git log -1 --pretty=%B | grep -q "^feat:"; then
              echo "bump_type=minor" >> $GITHUB_OUTPUT
            else
              echo "bump_type=patch" >> $GITHUB_OUTPUT
            fi
          fi
      
      - name: Bump version
        id: bump
        run: |
          npm version ${{ steps.version.outputs.bump_type }} --no-git-tag-version
          VERSION=$(node -p "require('./package.json').version")
          echo "new_version=$VERSION" >> $GITHUB_OUTPUT
      
      - name: Generate changelog
        run: npx conventional-changelog-cli -p angular -i CHANGELOG.md -s
      
      - name: Commit version bump
        run: |
          git add package.json package-lock.json CHANGELOG.md
          git commit -m "chore(release): v${{ steps.bump.outputs.new_version }}"
          git tag -a v${{ steps.bump.outputs.new_version }} -m "Release v${{ steps.bump.outputs.new_version }}"
      
      - name: Push changes
        run: |
          git push origin main
          git push origin v${{ steps.bump.outputs.new_version }}
      
      - name: Publish to NPM
        run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
      
      - name: Create GitHub Release
        uses: softprops/action-gh-release@v1
        with:
          tag_name: v${{ steps.bump.outputs.new_version }}
          name: Release v${{ steps.bump.outputs.new_version }}
          body_path: CHANGELOG.md
          draft: false
          prerelease: ${{ steps.version.outputs.bump_type == 'prerelease' }}
          files: |
            dist/**/*
            custom-elements.json
      
      - name: Deploy Storybook to production
        run: |
          npm run build-storybook
          npx netlify deploy --prod --dir=storybook-static
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

### 4. Nightly Build (`.github/workflows/nightly.yml`)

```yaml
name: Nightly Build

on:
  schedule:
    - cron: '0 2 * * *'  # Run at 2 AM UTC daily
  workflow_dispatch:

jobs:
  nightly:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
        with:
          ref: develop
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20.x'
          registry-url: 'https://registry.npmjs.org'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run full test suite
        run: npm run test:all
      
      - name: Build library
        run: npm run build
      
      - name: Publish nightly version
        run: |
          TIMESTAMP=$(date +%Y%m%d%H%M%S)
          npm version prerelease --preid=nightly.$TIMESTAMP --no-git-tag-version
          npm publish --tag nightly --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## NPM Publishing Strategy

### Package Configuration

```json
{
  "name": "@ignis/forge",
  "version": "0.1.0",
  "description": "Modern Web Components UI library",
  "main": "./dist/index.js",
  "module": "./dist/index.js",
  "types": "./dist/types/index.d.ts",
  "files": [
    "dist",
    "custom-elements.json",
    "README.md",
    "LICENSE"
  ],
  "exports": {
    ".": {
      "types": "./dist/types/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.umd.js"
    },
    "./themes/*": {
      "import": "./dist/themes/*.css"
    },
    "./custom-elements.json": "./custom-elements.json"
  },
  "sideEffects": [
    "**/*.css",
    "**/register.js"
  ],
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org/"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/ignis.git",
    "directory": "apps/forge"
  }
}
```

### Release Tags

- **latest**: Stable production releases
- **next**: Pre-release versions for testing
- **nightly**: Automated nightly builds from develop branch
- **canary**: Experimental features

### Version Strategy

Following semantic versioning with conventional commits:

- **BREAKING CHANGE** → Major version (1.0.0)
- **feat:** → Minor version (0.1.0)
- **fix:** → Patch version (0.0.1)
- **chore:**, **docs:** → No version bump

## Documentation Deployment

### Storybook Hosting Options

#### Option 1: Netlify (Recommended)
- **Pros**: Free tier, automatic HTTPS, preview deployments
- **Setup**: Connect GitHub repo, auto-deploy on push
- **URL**: https://forge-ui.netlify.app

#### Option 2: GitHub Pages
- **Pros**: Free, integrated with GitHub
- **Cons**: No preview deployments
- **URL**: https://yourusername.github.io/ignis

#### Option 3: Vercel
- **Pros**: Fast, preview deployments, analytics
- **Setup**: Import GitHub repo
- **URL**: https://forge-ui.vercel.app

### Documentation Sites

1. **Main Documentation**: https://forge-ui.com
   - Storybook with all components
   - API documentation
   - Usage examples
   - Theming playground

2. **API Docs**: https://api.forge-ui.com
   - Auto-generated from TypeScript
   - Custom Elements Manifest viewer

3. **Preview Environments**: https://preview-pr-{number}.forge-ui.com
   - Automatic PR previews
   - Visual regression testing

## Caching Strategy

### Browser Caching for Tests

To optimize CI performance and reduce installation time, we cache Playwright browsers:

```yaml
- name: Cache Playwright browsers
  uses: actions/cache@v4
  id: playwright-cache
  with:
    path: ~/.cache/ms-playwright
    key: ${{ runner.os }}-playwright-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-playwright-
```

**Benefits:**
- Saves ~2-3 minutes per CI run
- Reduces bandwidth usage
- Prevents rate limiting from browser downloads
- Cache automatically invalidates when dependencies change

**Cache Locations:**
- **Playwright browsers**: `~/.cache/ms-playwright`
- **NPM packages**: Handled by `actions/setup-node` with `cache: 'npm'`
- **Build artifacts**: Stored as GitHub Actions artifacts

### Cache Invalidation

Caches are automatically invalidated when:
- `package-lock.json` changes (new dependencies)
- Cache expires after 7 days of no use
- Manual cache clear via GitHub UI

### Additional Caching

```yaml
# For heavy dependencies
- name: Cache node_modules
  uses: actions/cache@v4
  with:
    path: node_modules
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-node-

# For build outputs
- name: Cache build
  uses: actions/cache@v4
  with:
    path: |
      dist
      .vite
    key: ${{ runner.os }}-build-${{ github.sha }}
    restore-keys: |
      ${{ runner.os }}-build-
```

## Environment Variables & Secrets

### Required GitHub Secrets

```bash
# NPM Publishing
NPM_TOKEN=npm_xxxxxxxxxxxxx

# Documentation Deployment
NETLIFY_AUTH_TOKEN=xxxxxxxxxxxxx
NETLIFY_SITE_ID=xxxxxxxxxxxxx

# Visual Testing
CHROMATIC_PROJECT_TOKEN=xxxxxxxxxxxxx

# Code Coverage
CODECOV_TOKEN=xxxxxxxxxxxxx

# GitHub App (for automated PRs)
APP_ID=xxxxxxxxxxxxx
APP_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----..."
```

### Setting Up Secrets

```bash
# Using GitHub CLI
gh secret set NPM_TOKEN --body "$NPM_TOKEN"
gh secret set NETLIFY_AUTH_TOKEN --body "$NETLIFY_AUTH_TOKEN"
gh secret set CHROMATIC_PROJECT_TOKEN --body "$CHROMATIC_TOKEN"
```

## Quality Gates

### Pre-release Checklist

All of these must pass before release:

- [ ] 90% test coverage (per ADR-004)
- [ ] No TypeScript errors
- [ ] No linting errors
- [ ] All tests passing
- [ ] Visual regression tests approved
- [ ] Custom Elements Manifest generated
- [ ] Bundle size under threshold
- [ ] Accessibility audit passing
- [ ] Documentation updated

### Automated Checks

```yaml
# .github/release-checks.yml
checks:
  - coverage: ">= 90%"
  - bundle_size: "< 50kb"
  - lighthouse_performance: ">= 95"
  - lighthouse_accessibility: "= 100"
  - typescript_errors: "= 0"
  - eslint_errors: "= 0"
```

## Rollback Strategy

### Immediate Rollback

```bash
# Unpublish broken version
npm unpublish @ignis/forge@1.2.3

# Tag previous version as latest
npm dist-tag add @ignis/forge@1.2.2 latest

# Revert git commits
git revert HEAD
git push origin main
```

### Hotfix Process

```bash
# Create hotfix branch from last stable tag
git checkout -b hotfix/1.2.4 v1.2.2

# Fix issue
# ...

# Merge directly to main
git checkout main
git merge hotfix/1.2.4

# Trigger release workflow
gh workflow run release.yml -f release_type=patch
```

## Monitoring & Analytics

### Package Analytics

- **NPM Downloads**: Track via npm stats API
- **Bundle Phobia**: Monitor bundle size trends
- **Snyk**: Security vulnerability scanning
- **Dependabot**: Automated dependency updates

### Documentation Analytics

```javascript
// In Storybook preview.js
import { initAnalytics } from './analytics';

initAnalytics({
  trackingId: 'G-XXXXXXXXXX',
  events: {
    componentView: true,
    themeSwitch: true,
    codeExample: true
  }
});
```

## Implementation Timeline

### Phase 1: Basic CI (Week 1)
- [ ] Set up GitHub repository
- [ ] Create basic CI workflow
- [ ] Configure test runner
- [ ] Set up linting and type checking

### Phase 2: Publishing Pipeline (Week 2)
- [ ] Configure NPM publishing
- [ ] Set up semantic versioning
- [ ] Create release workflow
- [ ] Generate changelogs

### Phase 3: Documentation Deployment (Week 3)
- [ ] Deploy Storybook to Netlify
- [ ] Set up preview deployments
- [ ] Configure custom domain
- [ ] Add analytics

### Phase 4: Advanced Features (Week 4)
- [ ] Visual regression testing
- [ ] Nightly builds
- [ ] Performance monitoring
- [ ] Security scanning

## Cost Considerations

### Free Tier Services
- **GitHub Actions**: 2,000 minutes/month
- **Netlify**: 300 build minutes/month
- **Codecov**: Unlimited public repos
- **NPM**: Unlimited public packages

### Estimated Monthly Costs
- **Basic Setup**: $0 (all free tiers)
- **Enhanced Setup**: ~$20/month
  - Chromatic: $149/month (5,000 snapshots)
  - Additional build minutes: $10/month

## Security Considerations

### NPM Security

```json
{
  "scripts": {
    "prepublishOnly": "npm audit --audit-level=moderate",
    "postpublish": "npm run security-scan"
  }
}
```

### GitHub Security

- Enable Dependabot alerts
- Required PR reviews for main branch
- Branch protection rules
- Signed commits requirement

### Token Rotation

- Rotate NPM tokens quarterly
- Use GitHub App tokens (auto-expire)
- Audit secret access logs monthly

## Troubleshooting Guide

### Common Issues

**Issue**: NPM publish fails with 403
```bash
# Solution: Check NPM token permissions
npm whoami
npm token list
```

**Issue**: Netlify deploy fails
```bash
# Solution: Clear cache and retry
netlify deploy --clear-cache
```

**Issue**: GitHub Actions timeout
```yaml
# Solution: Increase timeout
jobs:
  build:
    timeout-minutes: 30
```

## Success Metrics

### KPIs to Track

1. **Release Velocity**
   - Target: 1 release per week
   - Measure: Time from commit to production

2. **Build Success Rate**
   - Target: > 95%
   - Measure: Successful builds / total builds

3. **Mean Time to Recovery (MTTR)**
   - Target: < 30 minutes
   - Measure: Time to rollback broken release

4. **Documentation Coverage**
   - Target: 100% of public APIs
   - Measure: Documented exports / total exports

## Next Steps

1. **Immediate Actions**
   - Create GitHub repository
   - Set up NPM organization
   - Configure GitHub secrets
   - Create initial workflows

2. **Week 1 Goals**
   - Basic CI pipeline running
   - Tests executing on PRs
   - Coverage reporting working

3. **Month 1 Goals**
   - Full automated release pipeline
   - Documentation auto-deployment
   - Preview environments for PRs
   - First official release (v0.1.0)

## References

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [NPM Publishing Best Practices](https://docs.npmjs.com/packages-and-modules)
- [Semantic Release](https://semantic-release.gitbook.io/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Netlify Deployment](https://docs.netlify.com/)