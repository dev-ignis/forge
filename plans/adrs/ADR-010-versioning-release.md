# ADR-010: Versioning and Release Strategy

## Status
**Accepted**

## Context
A component library requires a robust versioning and release strategy to:
- Communicate changes clearly to consumers
- Enable safe dependency management
- Support multiple versions in production
- Facilitate gradual migrations
- Maintain backward compatibility

Key challenges for versioning include:
- Breaking changes impact multiple consuming applications
- Different frameworks may need different release cycles
- Components have interdependencies
- Documentation must align with versions
- Beta/preview features need clear communication

Poor versioning practices lead to:
- Unexpected breaking changes
- Difficult upgrades
- Version conflicts
- Lost developer trust
- Maintenance nightmares

## Decision
We will follow **Semantic Versioning 2.0.0** strictly, with automated release processes and clear communication channels.

### Versioning Strategy:
1. **Semantic Versioning**: MAJOR.MINOR.PATCH format
2. **Automated Releases**: Conventional commits trigger releases
3. **Preview Releases**: Beta/RC for testing new features
4. **Change Communication**: Automated changelogs and migration guides
5. **Version Support**: Latest major + previous major for 6 months

## Consequences

### Positive Consequences
- **Predictable Releases**: Developers know what to expect
- **Safe Updates**: Clear distinction between safe and breaking changes
- **Automated Process**: Reduces human error
- **Clear Communication**: Changes documented automatically
- **Gradual Migration**: Support overlap allows gradual updates
- **Trust Building**: Reliable versioning builds developer confidence

### Negative Consequences
- **Strict Rules**: Must carefully consider API changes
- **Version Proliferation**: Many versions to track
- **Documentation Overhead**: Multiple versions need documentation
- **Support Burden**: Supporting old versions requires effort
- **Complex CI/CD**: Automated releases need robust pipeline

## Semantic Versioning Rules

### Version Format: MAJOR.MINOR.PATCH

```
1.0.0 - Initial stable release
1.0.1 - Patch: Bug fix
1.1.0 - Minor: New feature (backward compatible)
2.0.0 - Major: Breaking change
```

### Version Increments

#### PATCH Version (1.0.X)
- Bug fixes
- Performance improvements
- Documentation updates
- Internal refactoring (no API change)

```typescript
// Before 1.0.0
class Button {
  render() {
    return html`<button>${this.label}</button>`; // Bug: doesn't show slot
  }
}

// After 1.0.1 (PATCH)
class Button {
  render() {
    return html`<button><slot></slot></button>`; // Fixed
  }
}
```

#### MINOR Version (1.X.0)
- New features
- New components
- New properties (with defaults)
- Deprecation notices (not removal)

```typescript
// Before 1.0.0
class Button {
  @property() variant: 'primary' | 'secondary' = 'primary';
}

// After 1.1.0 (MINOR)
class Button {
  @property() variant: 'primary' | 'secondary' | 'danger' = 'primary'; // New option
  @property() size: 'sm' | 'md' | 'lg' = 'md'; // New property
}
```

#### MAJOR Version (X.0.0)
- Breaking changes
- Removed features
- Changed defaults
- Required migration

```typescript
// Before 2.0.0
class Button {
  @property() type: string; // Deprecated in 1.x
  @property() variant: string;
}

// After 2.0.0 (MAJOR)
class Button {
  // 'type' removed - BREAKING
  @property() variant: 'primary' | 'secondary'; // Type narrowed - BREAKING
}
```

## Release Channels

### Stable Releases
```bash
@forge/ui@1.2.3
```
- Production ready
- Full support
- No breaking changes in minor/patch

### Beta Releases
```bash
@forge/ui@2.0.0-beta.1
```
- Feature complete
- May have bugs
- API may change

### Release Candidates
```bash
@forge/ui@2.0.0-rc.1
```
- Production ready candidate
- Final testing phase
- API frozen

### Nightly Releases
```bash
@forge/ui@nightly-20240115
```
- Latest development
- Unstable
- For testing only

## Alternatives Considered

### 1. Calendar Versioning (CalVer)
- **Pros**: Clear timeline, simple to understand
- **Cons**: Doesn't communicate change impact

### 2. Marketing Versions
- **Pros**: Flexible, marketing friendly
- **Cons**: Unclear change impact, unpredictable

### 3. Git Flow Versioning
- **Pros**: Aligns with branches
- **Cons**: Complex, doesn't communicate changes

### 4. No Versioning (Continuous)
- **Pros**: Simple, always latest
- **Cons**: Breaking changes problematic, no stability

## Automated Release Process

### Conventional Commits
```bash
# Triggers PATCH release
fix(button): correct focus styles

# Triggers MINOR release  
feat(modal): add size property

# Triggers MAJOR release
feat(button)!: remove deprecated type property

BREAKING CHANGE: The 'type' property has been removed.
Use 'variant' instead.
```

### Release Configuration
```json
// .releaserc.json
{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/github",
    ["@semantic-release/git", {
      "assets": ["CHANGELOG.md", "package.json"],
      "message": "chore(release): ${nextRelease.version}"
    }]
  ]
}
```

### CI/CD Pipeline
```yaml
# .github/workflows/release.yml
name: Release
on:
  push:
    branches: [main]

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - run: npm run test
      - run: npx semantic-release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## Version Support Policy

### Support Timeline
```
Version 1.0.0 - Released January 2024
Version 2.0.0 - Released July 2024
  - Version 1.x supported until January 2025 (6 months)
Version 3.0.0 - Released January 2025
  - Version 2.x supported until July 2025 (6 months)
  - Version 1.x support ends
```

### Support Levels
- **Active**: Bug fixes, security updates, new features
- **Maintenance**: Critical bugs and security only
- **End of Life**: No updates, migration recommended

## Migration Strategy

### Migration Guides
```markdown
# Migrating from v1 to v2

## Breaking Changes

### Button Component
The `type` property has been removed. Use `variant` instead:

Before:
\`\`\`html
<my-button type="primary">Click</my-button>
\`\`\`

After:
\`\`\`html
<my-button variant="primary">Click</my-button>
\`\`\`

## Automated Migration
Run the codemod:
\`\`\`bash
npx @forge/codemods v1-to-v2
\`\`\`
```

### Deprecation Process
1. Mark as deprecated in minor release
2. Console warning in development
3. Document migration path
4. Remove in next major version

```typescript
class Button {
  @property()
  @deprecated('Use variant instead. Will be removed in v2.0.0')
  get type() { return this.variant; }
  set type(value) { 
    console.warn('Button.type is deprecated. Use variant instead.');
    this.variant = value;
  }
}
```

## Communication Channels

### Release Notes
- Generated automatically from commits
- Published on GitHub Releases
- Included in npm package

### Changelog
- CHANGELOG.md in repository
- Detailed change descriptions
- Migration instructions

### Announcements
- Blog post for major releases
- Discord/Slack notifications
- Email to registered users

## Success Metrics
- Zero unexpected breaking changes
- 95% successful automated releases
- <24 hour critical patch release
- 90% adoption of latest major within 6 months
- <5% version-related issues

## References
- [Semantic Versioning 2.0.0](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Release](https://semantic-release.gitbook.io/)
- Development workflow plan: `/plans/development-workflow.md`
- Related: ADR-009 (Documentation), ADR-011 (Package Distribution)