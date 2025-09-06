# NPM Publishing Guide

## Overview

This guide covers everything about publishing @nexcraft/forge to NPM, including setup, automation, troubleshooting, and best practices.

## Package Configuration

### 📦 Package Details

```json
{
  "name": "@nexcraft/forge",
  "version": "0.5.0",
  "description": "A production-ready, framework-agnostic UI component library",
  "main": "./dist/nexcraft-forge.es.js",
  "module": "./dist/nexcraft-forge.es.js",
  "types": "./dist/index.d.ts",
  "files": [
    "dist",
    "custom-elements.json",
    "README.md",
    "LICENSE",
    "CHANGELOG.md"
  ]
}
```

**Key Configuration Points:**
- **Scoped Package**: `@nexcraft/forge` for better organization
- **ESM First**: Modern ES modules with UMD fallback
- **TypeScript Support**: Full type definitions included
- **Custom Elements**: JSON manifest for tooling integration
- **Tree Shaking**: `"sideEffects": false` for optimal bundling

### 🎯 Export Strategy

```json
{
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
  }
}
```

**Benefits:**
- Modern import/require support
- Individual component imports
- Tool integration via custom-elements.json
- TypeScript-first development experience

## NPM Tags and Channels

### 🏷️ Tag Strategy

| Tag | Purpose | Stability | Installation |
|-----|---------|-----------|--------------|
| `latest` | Production releases | 🟢 Stable | `npm install @nexcraft/forge` |
| `beta` | Feature preview | 🟡 Testing | `npm install @nexcraft/forge@beta` |
| `alpha` | Experimental | 🔴 Unstable | `npm install @nexcraft/forge@alpha` |
| `rc` | Release candidate | 🟢 Pre-production | `npm install @nexcraft/forge@rc` |
| `canary` | Nightly builds | 🔴 Bleeding edge | `npm install @nexcraft/forge@canary` |

### 📊 Release Channels

**Stable Channel (`latest`):**
```bash
# Automatic via main branch
git push origin main  # Triggers stable release

# Manual release
gh workflow run release.yml --ref main -f release_type=patch
```

**Beta Channel (`beta`):**
```bash
# Manual beta release
gh workflow run beta-release.yml -f beta_type=beta -f version_bump=prerelease
```

**Alpha Channel (`alpha`):**
```bash
# Early experimental features
gh workflow run beta-release.yml -f beta_type=alpha -f version_bump=preminor
```

## Authentication & Setup

### 🔐 NPM Token Setup

**Step 1: Create NPM Token**
1. Go to [npmjs.com](https://npmjs.com) → Account Settings
2. Click "Access Tokens" → "Generate New Token"
3. Select "Automation" type (recommended for CI/CD)
4. Copy the token (starts with `npm_`)

**Step 2: Add to GitHub Secrets**
```bash
# Using GitHub CLI
gh secret set NPM_TOKEN --body "npm_xxxxxxxxxxxxxxxxxxxxxx"

# Or via GitHub UI:
# Settings → Secrets → Actions → New repository secret
# Name: NPM_TOKEN
# Value: npm_xxxxxxxxxxxxxxxxxxxxxx
```

**Step 3: Verify Setup**
```bash
# Test token locally (optional)
npm login --registry https://registry.npmjs.org
npm whoami  # Should show your username
```

### 🏢 Organization Setup

**@nexcraft Organization:**
- NPM Organization: `nexcraft`
- Package scope: `@nexcraft/forge`
- Members have publish access
- Public packages by default

## Publishing Workflows

### 🚀 Stable Release Publishing

**Automatic Process (Recommended):**
1. Merge feature PR to `develop`
2. Create PR from `develop` to `main`
3. Merge to `main` → triggers release automatically
4. Package published with semantic version

**Manual Process:**
```bash
# Go to GitHub Actions → "Release & Publish"
# Select release type and run workflow
```

**What Happens:**
1. **Quality Checks**: Lint, type-check, tests, build
2. **Version Bump**: Based on conventional commits or manual input
3. **Build**: Production optimized bundle
4. **Publish**: To NPM with `latest` tag
5. **Release**: GitHub release with changelog
6. **Deploy**: Documentation update

### 🧪 Beta Release Publishing

**Manual Beta Process:**
```bash
# GitHub Actions → "Beta Release"
# Configure:
# - Beta Type: beta
# - Version Bump: prerelease
# - Custom Version: (optional)
```

**Example Versions:**
```bash
0.5.0         → 0.5.1-beta.0    (prepatch)
0.5.0-beta.0  → 0.5.0-beta.1    (prerelease)  
0.5.0         → 0.6.0-beta.0    (preminor)
```

### 📈 Version Management

**Semantic Versioning Rules:**
- `fix:` commits → Patch version (0.0.x)
- `feat:` commits → Minor version (0.x.0) 
- Breaking changes → Major version (x.0.0)
- No changes → No release

**Pre-release Versioning:**
- `0.5.1-beta.0` → First beta for patch 0.5.1
- `0.5.1-beta.1` → Second beta iteration
- `0.5.1-alpha.0` → Alpha version
- `0.5.1-rc.0` → Release candidate

## Package Contents

### 📁 Published Files

```
@nexcraft/forge/
├── dist/
│   ├── nexcraft-forge.es.js     # ES modules build
│   ├── nexcraft-forge.umd.js    # UMD build
│   ├── index.d.ts               # TypeScript definitions
│   └── styles.css               # Optional: CSS bundle
├── custom-elements.json         # Web Components manifest
├── README.md                    # Package documentation
├── LICENSE                      # MIT license
└── CHANGELOG.md                 # Release history
```

### 📊 Bundle Analysis

**Current Bundle Sizes:**
- Core library: ~31KB minified
- Individual components: 2-8KB each
- TypeScript definitions: ~50KB
- Total package: ~150KB

**Optimization Strategies:**
- Tree-shaking enabled
- Code splitting for components
- Minimal dependencies (only Lit)
- Efficient TypeScript compilation

## Installation & Usage

### 📦 Installation Methods

**NPM:**
```bash
# Latest stable
npm install @nexcraft/forge

# Specific version
npm install @nexcraft/forge@0.5.0

# Beta version
npm install @nexcraft/forge@beta
```

**Yarn:**
```bash
# Latest stable  
yarn add @nexcraft/forge

# Beta version
yarn add @nexcraft/forge@beta
```

**PNPM:**
```bash
# Latest stable
pnpm add @nexcraft/forge

# Beta version
pnpm add @nexcraft/forge@beta
```

### 🌐 CDN Usage

**jsDelivr CDN:**
```html
<!-- Latest version -->
<script type="module" src="https://cdn.jsdelivr.net/npm/@nexcraft/forge"></script>

<!-- Specific version -->
<script type="module" src="https://cdn.jsdelivr.net/npm/@nexcraft/forge@0.5.0"></script>

<!-- Beta version -->
<script type="module" src="https://cdn.jsdelivr.net/npm/@nexcraft/forge@beta"></script>
```

**UNPKG CDN:**
```html
<!-- Latest version -->
<script type="module" src="https://unpkg.com/@nexcraft/forge"></script>

<!-- Specific version -->
<script type="module" src="https://unpkg.com/@nexcraft/forge@0.5.0"></script>
```

### 📖 Usage Examples

**ES Modules:**
```javascript
// Full import
import '@nexcraft/forge';

// Individual components
import '@nexcraft/forge/dist/components/button.js';

// TypeScript support
import type { ForgeButton } from '@nexcraft/forge';
```

**CommonJS (Node.js):**
```javascript
// Full import
require('@nexcraft/forge');

// Individual components  
require('@nexcraft/forge/dist/components/button.js');
```

**HTML Usage:**
```html
<!DOCTYPE html>
<html>
<head>
  <script type="module" src="https://cdn.jsdelivr.net/npm/@nexcraft/forge"></script>
</head>
<body>
  <forge-button variant="primary">Click Me</forge-button>
  <forge-modal title="Example">Modal content</forge-modal>
</body>
</html>
```

## Monitoring & Analytics

### 📊 NPM Statistics

**Download Tracking:**
- [npm-stat.com](https://npm-stat.com/charts.html?package=@nexcraft/forge)
- [npmtrends.com](https://npmtrends.com/@nexcraft/forge)
- NPM package page analytics

**Bundle Analysis:**
- [Bundlephobia](https://bundlephobia.com/package/@nexcraft/forge)
- [Package Phobia](https://packagephobia.com/result?p=@nexcraft/forge)

### 🎯 Key Metrics

**Health Indicators:**
- Weekly download count
- Version adoption rates  
- Bundle size trends
- Dependency freshness
- Security vulnerability count

**Quality Metrics:**
- TypeScript compatibility score
- Tree-shaking effectiveness
- Browser compatibility range
- Performance benchmarks

## Troubleshooting

### 🚨 Common Publishing Issues

**403 Forbidden Error:**
```bash
# Check authentication
npm whoami
# Should return your username, not an error

# Verify token permissions  
npm token list

# Check package ownership
npm owner ls @nexcraft/forge
```

**Version Already Exists:**
```bash
# Check existing versions
npm view @nexcraft/forge versions --json

# Use different version bump
npm version patch  # or minor/major
```

**Build Failures:**
```bash
# Verify local build works
npm run build
npm run type-check
npm run lint

# Check for missing dependencies
npm install
```

**Package Size Too Large:**
```bash
# Analyze bundle
npm run bundle-analyze

# Check what's included
npm pack --dry-run
```

### 🔧 Recovery Procedures

**Unpublish Package (24hr window):**
```bash
# Only for versions < 24 hours old
npm unpublish @nexcraft/forge@0.5.0

# Better: deprecate instead
npm deprecate @nexcraft/forge@0.5.0 "Critical bug, use 0.4.9"
```

**Fix Broken Release:**
```bash
# 1. Publish hotfix
npm version patch
npm publish

# 2. Update latest tag
npm dist-tag add @nexcraft/forge@0.5.1 latest

# 3. Deprecate broken version
npm deprecate @nexcraft/forge@0.5.0 "Use 0.5.1 instead"
```

**Reset Beta Channel:**
```bash
# Point beta to stable if needed
npm dist-tag add @nexcraft/forge@0.5.0 beta

# Remove tag entirely
npm dist-tag rm @nexcraft/forge beta
```

## Security & Best Practices

### 🔒 Security Considerations

**Token Security:**
- Use automation tokens for CI/CD
- Rotate tokens regularly (every 6 months)
- Never commit tokens to git
- Use GitHub Secrets for storage

**Package Integrity:**
- Enable two-factor authentication on NPM
- Use `npm audit` for vulnerability scanning
- Monitor dependencies with Dependabot
- Sign releases with GPG (optional)

### ✅ Publishing Best Practices

**Before Publishing:**
- [ ] All tests pass locally
- [ ] Bundle size is reasonable
- [ ] Documentation is updated
- [ ] Breaking changes are documented
- [ ] Changelog is meaningful

**Version Management:**
- Follow semantic versioning strictly
- Use conventional commits
- Tag releases consistently
- Maintain backwards compatibility when possible

**Documentation:**
- Keep README up to date
- Include migration guides for breaking changes
- Provide usage examples
- Document new features thoroughly

## Advanced Features

### 🎯 Provenance Publishing

Enable build provenance for enhanced security:
```yaml
# In GitHub Actions workflow
- name: Publish with provenance
  run: npm publish --provenance
  env:
    NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### 📊 Telemetry & Analytics

Optional package usage analytics:
```javascript
// Component usage tracking (opt-in)
export class ForgeButton extends BaseElement {
  connectedCallback() {
    super.connectedCallback();
    
    // Anonymous usage analytics
    if (this.analyticsEnabled) {
      this.trackUsage('button-component');
    }
  }
}
```

### 🔄 Automated Dependency Updates

Keep dependencies fresh:
```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    reviewers:
      - "dev-team"
```

---

**Questions?** Check our [troubleshooting guide](../troubleshooting.md) or [open an issue](https://github.com/dev-ignis/forge/issues)! 📦