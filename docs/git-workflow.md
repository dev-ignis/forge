# Git Workflow Strategy

## Overview

This project uses a **GitHub Flow** strategy with automated branch synchronization to maintain consistency between `main` and `develop` branches.

## Branch Strategy

### Main Branch (`main`)
- **Purpose**: Production-ready code
- **Protection**: Protected, requires PR reviews
- **Releases**: Automated via GitHub Actions on push
- **Version**: Always matches the latest released version

### Develop Branch (`develop`) 
- **Purpose**: Integration branch for new features
- **Source**: Syncs automatically with `main`
- **Version**: Automatically updated to match `main`

## Workflow

### For New Features
1. Create feature branch from `develop`
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature-name
   ```

2. Develop and commit your changes
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

3. Push and create PR to `develop`
   ```bash
   git push origin feature/your-feature-name
   ```

4. After PR approval, merge to `develop`

5. When ready for release, create PR from `develop` to `main`

### Automated Synchronization

The `.github/workflows/sync-branches.yml` workflow:
- Triggers on every push to `main`
- Updates `develop` branch version to match `main`
- Merges `main` changes into `develop`
- Handles conflicts gracefully

## Version Management

- **Main branch**: Version controlled by release process
- **Develop branch**: Version automatically synced with main
- **Feature branches**: Inherit version from develop

## Conflict Resolution

If automatic sync fails due to conflicts:
1. Manual merge required
2. GitHub Actions will fail with clear error message
3. Developer must resolve conflicts manually:
   ```bash
   git checkout develop
   git pull origin develop
   git merge main
   # Resolve conflicts
   git commit
   git push origin develop
   ```

## Benefits

- ✅ Simple, predictable workflow
- ✅ Automatic version synchronization
- ✅ Reduced merge conflicts
- ✅ Clear separation of development and production
- ✅ Automated releases on main
- ✅ Continuous integration friendly