# Phase 13: Monorepo Platform & Publishing

## Objective
Evolve the repository into a stable monorepo that can build, test, version, and publish multiple packages independently (e.g., `@nexcraft/forge`, `@nexcraft/forge-rhf`) with minimal friction and strong Next.js/Turbopack compatibility.

## Scope
- Adopt npm workspaces for package management.
- Standardize ESM builds and `exports` fields across packages.
- Introduce Changesets for independent versioning and automated npm publishing.
- Add CI workflows for build/test and release.
- Author developer ergonomics (scripts, docs) for local dev and releases.

## Progress Checklist
- [ ] Root set to `private: true` with `workspaces` configured
- [ ] `packages/` directory created and wired into workspaces
- [ ] Packages import each other by name (no relative cross-imports)
- [ ] All packages ESM-only with explicit `exports` and `types`
- [ ] Shared TypeScript/ESLint/Vitest config validated across workspaces
- [ ] CI builds and type-checks all workspaces
- [ ] Next.js guidance documented (`transpilePackages`)
- [ ] Developer scripts added (build/test/type-check across workspaces)
- [ ] Changesets initialized (or link to Phase 14 for release setup)
- [ ] Monorepo docs finalized and linked from README

## Rationale (Why Monorepo)
- Shared tooling (TS, ESLint, Storybook, Vitest) reduces drift and maintenance.
- Local iteration across packages is fast and reliable.
- Clear ownership and visibility when multiple packages evolve together.

## Target Repository Layout
```
.
├─ package.json                # workspaces root (private)
├─ packages/
│  ├─ forge/                   # @nexcraft/forge (existing codebase or kept at root via workspace entry ".")
│  └─ forge-rhf/               # @nexcraft/forge-rhf (new package)
└─ shared configs (tsconfig, eslint, vitest, storybook)
```

Note: For a minimal migration, keep the existing package at root (`"."` in workspaces) and place new packages under `packages/*`. We can later move `@nexcraft/forge` into `packages/forge/` if desired.

## Work Plan (Step‑By‑Step)
1) Enable npm Workspaces
- Root `package.json` changes:
  - `"private": true`
  - `"workspaces": [".", "packages/*"]`
- Ensure each package has its own `package.json`, `build`, `type-check`, and `files/exports`.

2) Package Isolation & Imports
- Import across workspaces by package name (no relative cross-imports).
- Example: `@nexcraft/forge-rhf` imports `@nexcraft/forge/integrations/react`.
- Keep packages ESM-only and define explicit `exports` maps.

3) Standardized Build Outputs
- ESM only (`type: module`).
- Emit `.d.ts` and map via `exports` (`types` path included).
- Avoid mixing `main/module`; prefer `exports` as canonical.

4) Versioning & Releases (Changesets)
- Initialize Changesets:
  - `npm i -D @changesets/cli && npx changeset init`
- Flow:
  - Dev runs `npx changeset` → selects changed packages + bump type.
  - A “Version Packages” PR updates versions and changelogs.
  - On merge to `main`, CI runs `npx changeset publish` (publishes only changed packages).
- Configure `publishConfig.access: public` in each scoped package.

5) CI Workflows
- CI: Build & Test (on PR/Push)
  - `npm ci`
  - `npm run type-check --workspaces`
  - `npm run lint --workspaces` (optional)
  - `npm run test --workspaces` (optional or coverage in nightly)
  - `npm run build --workspaces`
- Release (on push to main)
  - Use NPM_TOKEN secret.
  - Build all workspaces.
  - `npx changeset publish`.

6) Node/Next.js Compatibility
- Node 18+ baseline.
- Next.js/Turbopack consumers: document `transpilePackages: ['@nexcraft/forge', '@nexcraft/forge-rhf']`.
- Keep packages pure ESM for smoother interop.

7) Optional Build Orchestration
- Turborepo or Nx can speed up builds/tests via caching and parallelization. Not required initially.

8) Developer Ergonomics
- Root scripts shortcuts (examples):
  - `build`: `npm run build --workspaces`
  - `type-check`: `npm run type-check --workspaces`
  - `test`: `npm run test --workspaces`
 - `release`: `npx changeset` (author changeset)
- Local publish testing:
  - `npm pack --workspace @nexcraft/forge-rhf`
  - `npm publish --workspace @nexcraft/forge-rhf --dry-run`

9) Security & Access
- Never commit tokens. Use `NPM_TOKEN` as a GitHub secret.
- Ensure `publishConfig.registry` points to npmjs unless overridden.

## Deliverables
- Workspace-enabled root `package.json`.
- `packages/forge-rhf` scaffolded and built.
- Changesets initialized with basic config.
- Release GitHub Action committed (uses Changesets publish).
- Updated docs for consumer apps (Next.js transpile guidance).

## Acceptance Criteria
- `npm run build --workspaces` succeeds locally and in CI.
- `npx changeset` produces a version PR that bumps only changed packages.
- On merge, `npx changeset publish` publishes changed packages to npm.
- Consumer Next.js app can import both packages with `transpilePackages` configured.

## Risks & Mitigations
- Version sprawl: Use Changesets and PR review discipline; keep adapters thin.
- Turbopack quirks: Keep ESM-only and explicit `exports`; document `transpilePackages`.
- Cross-package type drift: CI type-check all workspaces; pin peer ranges thoughtfully.

## Current State Analysis

### Existing Structure
The repository currently has:
- Single package structure with main package at root
- RHF adapters in `src/integrations/react/rhf/` (temporary location from Phase 12)
- Complex manual release workflows (5 GitHub Actions files)
- AI manifest and build artifacts causing conflicts during releases
- Manual version bumping and changelog maintenance becoming unwieldy

### Migration Prerequisites
Before starting Phase 13, ensure:
- [ ] Current build (`npm run build`) passes successfully
- [ ] All tests pass (`npm test`)
- [ ] AI manifest implementation is stable (`npm run build:ai`)
- [ ] Current package.json exports are working correctly

## Enhanced Work Plan (Detailed Implementation)

### Step 1: Workspace Foundation Setup

**1.1 Root Package.json Configuration**
```json
{
  "name": "@nexcraft/forge-monorepo",
  "private": true,
  "workspaces": [
    ".",
    "packages/*"
  ],
  "scripts": {
    "build": "npm run build --workspaces",
    "test": "npm run test --workspaces", 
    "type-check": "npm run type-check --workspaces",
    "lint": "npm run lint --workspaces",
    "clean": "npm run clean --workspaces",
    "release": "npx changeset",
    "version-packages": "npx changeset version",
    "publish-packages": "npx changeset publish"
  }
}
```

**1.2 Update Current Package Configuration**
- Ensure current package.json has proper `name: "@nexcraft/forge"`
- Verify `publishConfig.access: "public"` exists
- Maintain existing `exports` and `files` configuration

### Step 2: RHF Adapters Package Extraction

**2.1 Create Package Structure**
```
packages/
└── forge-rhf/
    ├── package.json
    ├── src/
    │   ├── index.ts
    │   └── adapters/
    │       ├── ForgeInputAdapter.tsx
    │       ├── ForgeCheckboxAdapter.tsx
    │       └── createUnifiedWrapper.tsx
    ├── dist/
    ├── tsconfig.json
    └── vite.config.ts
```

**2.2 RHF Package Configuration**
```json
{
  "name": "@nexcraft/forge-rhf",
  "version": "0.1.0",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    }
  },
  "files": ["dist"],
  "scripts": {
    "build": "vite build && tsc --emitDeclarationOnly",
    "type-check": "tsc --noEmit",
    "clean": "rm -rf dist"
  },
  "peerDependencies": {
    "@nexcraft/forge": "workspace:*",
    "react": "^18.0.0",
    "react-hook-form": "^7.45.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "react": "^18.2.0",
    "react-hook-form": "^7.45.0",
    "typescript": "^5.0.0",
    "vite": "^4.4.0"
  },
  "publishConfig": {
    "access": "public"
  }
}
```

**2.3 Migration Steps**
- [ ] Move `src/integrations/react/rhf/` → `packages/forge-rhf/src/`
- [ ] Update imports to use `@nexcraft/forge/integrations/react` 
- [ ] Create separate build configuration for RHF package
- [ ] Update main package to remove RHF exports from `src/integrations/react/index.ts`

### Step 3: Build System Coordination

**3.1 Shared Configuration**
- [ ] Create shared `tsconfig.base.json` at root
- [ ] Each package extends base config with package-specific paths
- [ ] Shared ESLint config for consistent code style
- [ ] Shared Vitest config for testing standards

**3.2 Build Dependencies**
- [ ] Main package builds first (dependency)
- [ ] RHF package builds after main package
- [ ] Consider using `npm-run-all` or similar for build orchestration

**3.3 Package Import Resolution**
```typescript
// In packages/forge-rhf/src/adapters/ForgeInputAdapter.tsx
import { ForgeInput } from '@nexcraft/forge/integrations/react'
import type { ForgeInputProps } from '@nexcraft/forge/integrations/react'
```

### Step 4: CI/CD Workflow Updates

**4.1 Update Existing ci.yml**
```yaml
# Update steps to use workspace commands
- name: Install dependencies
  run: npm ci

- name: Type check all packages
  run: npm run type-check --workspaces

- name: Lint all packages  
  run: npm run lint --workspaces

- name: Test all packages
  run: npm run test --workspaces

- name: Build all packages
  run: npm run build --workspaces
```

**4.2 Workflow Dependencies**
- [ ] Update artifact uploads to include both packages
- [ ] Ensure build order respects package dependencies
- [ ] Update Storybook build to work with workspace structure

### Step 5: Changesets Integration

**5.1 Initialize Changesets**
```bash
npm install -D @changesets/cli
npx changeset init
```

**5.2 Changesets Configuration**
```json
// .changeset/config.json
{
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "fixed": [],
  "linked": [],
  "access": "public",
  "baseBranch": "main",
  "updateInternalDependencies": "patch",
  "ignore": []
}
```

**5.3 Changelog Integration**
- [ ] Configure changelog generation per package
- [ ] Ensure changelogs reference cross-package changes appropriately
- [ ] Integrate with existing CHANGELOG.md approach

### Step 6: Testing and Validation

**6.1 Local Testing**
```bash
# Build all packages
npm run build

# Test workspace imports
cd packages/forge-rhf
npm run build
node -e "console.log(require('./dist/index.js'))"

# Test cross-package imports work
npm run type-check
```

**6.2 Publishing Dry Run**
```bash
# Test package publishing without actually publishing
npm run build --workspaces
npx changeset publish --dry-run
```

**6.3 Next.js Integration Testing**
- [ ] Create example app that imports both packages
- [ ] Verify `transpilePackages: ['@nexcraft/forge', '@nexcraft/forge-rhf']` works
- [ ] Test tree-shaking and bundle size impact

### Step 7: Documentation Updates

**7.1 Migration Documentation**
- [ ] Document new import paths for RHF adapters
- [ ] Update examples to show separate package usage
- [ ] Breaking change documentation for existing users

**7.2 Consumer App Guidance**
```javascript
// Next.js config example
module.exports = {
  transpilePackages: ['@nexcraft/forge', '@nexcraft/forge-rhf'],
  // ... other config
}
```

**7.3 Developer Workflow Documentation**
- [ ] Workspace commands reference
- [ ] Local development setup
- [ ] Release process with Changesets
- [ ] Cross-package development patterns

## Risk Assessment and Mitigations

### Technical Risks

**1. Build Complexity**
- Risk: Build failures due to dependency order
- Mitigation: Clear build dependency graph, proper peer dependency configuration

**2. Import Resolution**
- Risk: Circular dependencies or import resolution failures
- Mitigation: Strict package boundaries, explicit peer dependencies

**3. Version Drift**
- Risk: Packages getting out of sync with incompatible versions
- Mitigation: Changesets linked releases, CI validation of cross-package compatibility

### Process Risks

**1. Migration Disruption**
- Risk: Breaking changes for existing consumers
- Mitigation: Gradual migration, backward compatibility exports, clear migration guide

**2. Release Complexity**
- Risk: More complex release process with multiple packages
- Mitigation: Automated Changesets workflow, clear documentation

**3. Developer Experience**
- Risk: Increased complexity for local development
- Mitigation: Workspace scripts, shared tooling, good documentation

## Success Metrics

**Technical Metrics:**
- [ ] All workspace commands execute successfully
- [ ] Build time doesn't significantly increase
- [ ] Bundle sizes remain optimal for consumers
- [ ] Cross-package type checking works correctly

**Process Metrics:**
- [ ] Changesets workflow reduces manual release overhead
- [ ] CI build time remains reasonable (<10 minutes)
- [ ] Developer onboarding time doesn't increase significantly

**Quality Metrics:**
- [ ] No regression in test coverage
- [ ] Storybook continues to work correctly
- [ ] AI manifest generation works for both packages

## Architecture Decision Records (ADR) Impact Assessment

The monorepo migration will affect several existing ADRs that need review and potential updates:

### ADRs Requiring Review for Monorepo Context

**High Impact (Likely need updates):**
- [ ] **ADR-010-versioning-release.md** - Update for Changesets multi-package versioning
- [ ] **ADR-011-package-distribution.md** - Update for workspace publishing strategy
- [ ] **ADR-005-build-tooling.md** - Update for workspace build coordination
- [ ] **ADR-007-framework-integration.md** - Update for cross-package integration patterns

**Medium Impact (May need updates):**
- [ ] **ADR-004-testing-strategy.md** - Update for workspace testing approach
- [ ] **ADR-009-documentation-strategy.md** - Update for multi-package documentation
- [ ] **ADR-017-ai-native-development-strategy.md** - Update for AI manifest per package
- [ ] **ADR-018-unified-ssr-architecture.md** - Update for cross-package SSR considerations

**Low Impact (Review recommended):**
- [ ] **ADR-001-web-components-abstraction.md** - Validate abstractions work across packages
- [ ] **ADR-008-component-api-design.md** - Ensure API consistency across packages
- [ ] **ADR-013-typescript-interfaces.md** - Update for cross-package type sharing

**Package-Specific Considerations:**
- [ ] Document which ADRs apply to `@nexcraft/forge` vs `@nexcraft/forge-rhf`
- [ ] Create package-specific ADR sections where architectural decisions differ
- [ ] Ensure cross-package compatibility requirements are documented

### ADR Update Strategy

**During Phase 13:**
- [ ] Review ADR-010, ADR-011, ADR-005, ADR-007 for immediate conflicts
- [ ] Update critical ADRs that would block monorepo implementation
- [ ] Document temporary deviations with plan to update ADRs post-migration

**Post Phase 13:**
- [ ] Comprehensive ADR review and updates based on actual monorepo implementation
- [ ] Document lessons learned and architectural decisions made during migration
- [ ] Update ADR templates to include monorepo considerations for future decisions

**New ADRs Needed:**
- [ ] **ADR-019-monorepo-package-boundaries** - Define clear boundaries and responsibilities
- [ ] **ADR-020-cross-package-dependency-management** - Workspace dependency strategy
- [ ] **ADR-021-monorepo-testing-coordination** - Testing across package boundaries

## Phase 13 → Phase 14 Handoff

Once Phase 13 is complete, Phase 14 should:
- [ ] Enhance the basic Changesets workflow created in Phase 14
- [ ] Consolidate the 5 existing GitHub workflows into 2 workspace-aware workflows
- [ ] Implement automated Version Packages PR creation
- [ ] Add documentation site publishing integration
- [ ] Configure NPM_TOKEN and other release automation secrets
- [ ] Complete ADR updates for release automation decisions

The monorepo foundation from Phase 13 will make Phase 14 release automation much more powerful and reliable.

## References
- Phase 12 (Adapters Split): plans/phases/phase-12-react-hook-form-adapters-split.md
- Phase 14 (Release Automation): plans/phases/phase-14-release-automation-and-versioning.md
- Changesets: https://github.com/changesets/changesets
- npm workspaces: https://docs.npmjs.com/cli/v7/using-npm/workspaces
