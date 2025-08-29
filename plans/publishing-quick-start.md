# Publishing & Deployment Quick Start Guide

## Immediate Setup Steps

This guide will help you get your CI/CD pipeline running quickly. Follow these steps in order.

## Prerequisites

- [ ] GitHub repository created
- [ ] NPM account created
- [ ] Node.js 18+ installed locally

## Step 1: Prepare Your Package (5 minutes)

### Update package.json

```json
{
  "name": "@ignis/forge",
  "version": "0.0.1",
  "description": "Modern Web Components UI library with advanced theming",
  "author": "Your Name",
  "license": "MIT",
  "homepage": "https://github.com/yourusername/ignis#readme",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/yourusername/ignis.git",
    "directory": "apps/forge"
  },
  "bugs": {
    "url": "https://github.com/yourusername/ignis/issues"
  },
  "keywords": [
    "web-components",
    "ui-library",
    "design-system",
    "custom-elements",
    "shadow-dom",
    "theming"
  ],
  "files": [
    "dist",
    "custom-elements.json",
    "README.md",
    "LICENSE",
    "CHANGELOG.md"
  ],
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org/"
  }
}
```

## Step 2: Create NPM Token (5 minutes)

1. Login to [npmjs.com](https://www.npmjs.com/)
2. Go to Account Settings → Access Tokens
3. Click "Generate New Token"
4. Choose "Automation" type
5. Copy the token (starts with `npm_`)

## Step 3: Set Up GitHub Secrets (5 minutes)

### Using GitHub Web Interface:

1. Go to your repository on GitHub
2. Navigate to Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Add the following secrets:

**NPM_TOKEN**
```
Name: NPM_TOKEN
Value: npm_xxxxxxxxxxxxxxxxxxxxx
```

### Using GitHub CLI:

```bash
# Install GitHub CLI if needed
# brew install gh (macOS)
# Or download from: https://cli.github.com/

# Authenticate
gh auth login

# Set NPM token
gh secret set NPM_TOKEN
# Paste your token when prompted
```

## Step 4: Push GitHub Actions Workflows (2 minutes)

The workflows are already created in `.github/workflows/`. Just push them:

```bash
# Add workflows to git
git add .github/

# Commit
git commit -m "ci: add GitHub Actions workflows for CI/CD"

# Push to GitHub
git push origin main
```

## Step 5: Verify CI Pipeline (5 minutes)

1. Go to your GitHub repository
2. Click on the "Actions" tab
3. You should see the CI workflow running
4. Click on it to see the progress

### Expected Results:
- ✅ Code checkout
- ✅ Node.js setup
- ✅ Dependencies installed
- ✅ Build successful
- ⚠️ Tests may fail (expected if not set up yet)
- ⚠️ Linting may fail (expected initially)

## Step 6: First Test Release (10 minutes)

### Prepare for Release:

```bash
# Ensure you're on main branch
git checkout main
git pull origin main

# Run build locally to verify
npm run build

# Check what will be published
npm pack --dry-run
```

### Trigger Manual Release:

1. Go to GitHub Actions tab
2. Select "Release" workflow
3. Click "Run workflow"
4. Choose release type: "patch"
5. Click "Run workflow" button

### Monitor Release:

The workflow will:
1. Run tests (may skip if not ready)
2. Build the library
3. Bump version (0.0.1 → 0.0.2)
4. Create git tag
5. Create GitHub release
6. Publish to NPM (dry-run mode initially)

## Step 7: Documentation Deployment (15 minutes)

### Option A: Netlify (Recommended for Quick Start)

1. Go to [netlify.com](https://www.netlify.com/)
2. Sign up/Login with GitHub
3. Click "Add new site" → "Import an existing project"
4. Choose your GitHub repository
5. Configure build settings:
   ```
   Build command: npm run build-storybook
   Publish directory: storybook-static
   ```
6. Click "Deploy site"
7. Copy your site ID from Site Settings
8. Add to GitHub secrets:
   ```bash
   gh secret set NETLIFY_SITE_ID --body "your-site-id"
   ```

### Option B: GitHub Pages (Simplest)

1. Enable GitHub Pages in repository settings
2. Update workflow to deploy to GitHub Pages:

```yaml
# Add to .github/workflows/docs.yml
name: Deploy Docs

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run build-storybook
      
      - uses: actions/upload-pages-artifact@v2
        with:
          path: storybook-static
      
      - uses: actions/deploy-pages@v2
```

## Step 8: Enable Automated Releases (5 minutes)

Once you're comfortable with manual releases, enable automated releases:

1. Install commitizen for conventional commits:
   ```bash
   npm install -D commitizen @commitlint/cli @commitlint/config-conventional
   ```

2. Add to package.json:
   ```json
   {
     "scripts": {
       "commit": "cz"
     },
     "config": {
       "commitizen": {
         "path": "cz-conventional-changelog"
       }
     }
   }
   ```

3. Create `.commitlintrc.json`:
   ```json
   {
     "extends": ["@commitlint/config-conventional"]
   }
   ```

4. Update release workflow to run on push to main

## Verification Checklist

### Week 1 Goals
- [ ] GitHub Actions CI running on every push
- [ ] Build artifacts generated successfully
- [ ] NPM token configured and tested
- [ ] First manual release completed
- [ ] Documentation site deployed

### Week 2 Goals
- [ ] Automated versioning based on commits
- [ ] Test coverage reporting
- [ ] PR preview deployments
- [ ] Changelog generation

### Week 3 Goals
- [ ] Visual regression testing
- [ ] Bundle size monitoring
- [ ] Security scanning
- [ ] Nightly builds

## Common Issues & Solutions

### Issue: NPM publish fails with 403
```bash
# Verify token works
npm whoami --registry https://registry.npmjs.org/
# Should show your username

# Check package name is available
npm view @ignis/forge
# Should show 404 if available
```

### Issue: GitHub Actions fails with permission error
```yaml
# Add to workflow file
permissions:
  contents: write
  packages: write
```

### Issue: Build artifacts too large
```json
# Add .npmignore file
src/
tests/
*.test.ts
*.stories.ts
.github/
docs/
```

## Quick Commands Reference

```bash
# Local testing
npm run build         # Build library
npm run test         # Run tests
npm pack --dry-run   # Check what will be published

# Git operations
git tag -l           # List all tags
git describe --tags  # Get latest tag

# NPM operations
npm view @ignis/forge versions  # See published versions
npm info @ignis/forge           # Package info

# GitHub CLI
gh workflow list     # List all workflows
gh workflow run release.yml -f release_type=patch  # Trigger release
gh run list          # List recent workflow runs
gh release list      # List releases
```

## Next Steps

1. **Today**: Get CI pipeline running
2. **Tomorrow**: Complete first manual release
3. **This Week**: Deploy documentation site
4. **Next Week**: Enable automated releases

## Support Resources

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [NPM Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Netlify Docs](https://docs.netlify.com/)
- [Semantic Versioning](https://semver.org/)

## Emergency Rollback

If something goes wrong:

```bash
# Revert last commit
git revert HEAD
git push origin main

# Unpublish broken NPM version
npm unpublish @ignis/forge@broken-version

# Delete GitHub release
gh release delete vX.X.X --yes

# Delete git tag
git tag -d vX.X.X
git push origin :refs/tags/vX.X.X
```