# 🚀 Immediate Priorities (Next 2-4 weeks)

**Status**: Critical fixes and optimizations needed for production readiness
**Timeline**: 2-4 weeks
**Goal**: Address technical debt and improve code quality

## 🚨 **URGENT: CI/CD Pipeline Failures**

### 0. Critical Pipeline Infrastructure Issues

**Priority**: CRITICAL | **Effort**: Low | **Impact**: CRITICAL

**BLOCKING ALL RELEASES & DEPLOYMENTS** - Must be fixed immediately

**Issues Breaking Production**:

- [x] ✅ **Vue Integration Build Failure**: `Cannot find module '../types/framework-integration'`
  - **File**: `src/integrations/vue.ts:28` → **FIXED**
  - **Impact**: All TypeScript compilation fails → **RESOLVED**
  - **Fix**: Create missing `src/types/framework-integration.ts` file → **COMPLETED**
  - **Status**: Develop CI workflow now passes ✅ (commit: f4d9b9a)

- [x] ✅ **Next.js Example Deploy Failure**: React peer dependency conflict
  - **Error**: `@nexcraft/forge-rhf@0.3.0` peer `react@"^18.0.0"` vs Next.js `react@19.1.0` → **FIXED**
  - **Impact**: Deploy workflow always fails, docs site down → **RESOLVED**
  - **Fix**: Add `--legacy-peer-deps` to `.github/workflows/deploy.yml:141` → **COMPLETED**

- [ ] 🔥 **Release Workflow Artifact Failure**: SHA mismatch between CI and Release
  - **Error**: `Unable to download artifact: build-37524c95de6214826927ae94f65e9cba1739cfed-20.x`
  - **Impact**: No releases possible to npm
  - **Fix**: Improve workflow artifact handling

- [ ] 🔥 **Beta Release npm ci Failure**: Version bump breaks package-lock.json
  - **Error**: `npm ci` fails after version change `0.7.1 → 0.7.2-beta.0`
  - **Impact**: Cannot publish beta versions
  - **Fix**: Remove package-lock.json and `npm install --legacy-peer-deps` after version bump

### 📊 **Progress Status: 2/5 Critical Issues RESOLVED** ✅

**Files Successfully Fixed**:

- [x] ✅ `src/types/framework-integration.ts` (CREATED - ForgeCustomEvent interface)
- [x] ✅ `src/integrations/vue.ts` (FIXED - import path resolved)
- [x] ✅ `.github/workflows/deploy.yml` (FIXED - added --legacy-peer-deps)

**New Critical Issue Discovered**:

- [ ] 🔥 **Package Lock Out of Sync**: Missing new Figma packages from lock file
  - **Error**: `Missing: @nexcraft/forge-mcp-figma@0.1.0 from lock file`
  - **Error**: `Missing: @nexcraft/forge-tokens@0.1.0 from lock file`
  - **Impact**: All CI jobs failing at npm ci step
  - **Fix**: Update package-lock.json to include new workspace packages

**Files Still Requiring Changes**:

- [ ] `package-lock.json` (UPDATE - regenerate to include new workspace packages) **🔥 URGENT**
- [ ] `.github/workflows/beta-release.yml` (FIX - npm ci logic after version bump)
- [ ] `packages/forge-rhf/package.json` (UPDATE - React peer dep to include ^19.0.0)
- [ ] Workflow artifact handling (FIX - SHA mismatch resolution)

**Current Status**: Develop CI workflow FAILING due to package lock mismatch 🔴
**Immediate Priority**: Fix package-lock.json sync issue

## 🚀 **CI/CD Pipeline Optimization Strategy**

**Priority**: HIGH | **Effort**: Low | **Impact**: CRITICAL

### **PR-Only vs Push Strategy**

- **Move to PR-Only**: Lint, TypeCheck, Tests
  - Run comprehensive checks only on `pull_request` to develop
  - Eliminate redundant runs when PR merges to develop
  - 80% reduction in CI minutes

- **Keep Lightweight Push**: Build & AI Validate only
  - Single "smoke test" job on push to develop
  - Skip coverage uploads and heavy artifacts
  - Safety net for direct pushes

### **Noise/Cost Reducers**

- [ ] **Add Path Filters**
  ```yaml
  paths-ignore: ['docs/**', 'plans/**', '*.md', '.github/workflows/deploy.yml']
  ```
  - Skip entire workflow for docs-only changes
  - Major cost savings for documentation updates

- [ ] **Conditional Artifact Uploads**
  - Upload coverage only for pull_request
  - Skip artifact uploads for push events

- [ ] **Collapse Jobs for Push**
  - Keep 3 parallel jobs (lint/typecheck/test) for PRs
  - Single smoke job for push events

### **Expected Impact**

- **80% reduction** in CI minutes for develop branch
- **50% fewer** notification emails
- **Same quality gates** where they matter (PRs)
- **Faster release preparation** (develop stays clean)

---

## 🛡️ Security Measures

- [ ] **Automated Vulnerability Scanning**
  - GitHub Security Advisories integration
  - npm audit automation in CI/CD
  - Dependency security monitoring
  - Regular security dependency updates

---

## 📋 **Community Standards (Health: 100%)**

**Priority**: MEDIUM | **Effort**: Low | **Impact**: Medium | **Status**: ✅ COMPLETED

### Completed Files ✅

- [x] ✅ **Code of Conduct** - `CODE_OF_CONDUCT.md` (Contributor Covenant 2.1)
- [x] ✅ **Bug Report Template** - `.github/ISSUE_TEMPLATE/bug_report.yml`
- [x] ✅ **Feature Request Template** - `.github/ISSUE_TEMPLATE/feature_request.yml`
- [x] ✅ **Pull Request Template** - `.github/PULL_REQUEST_TEMPLATE.md`

### Already Present ✅

- [x] ✅ README.md
- [x] ✅ LICENSE (MIT)
- [x] ✅ Contributing guidelines (docs/CONTRIBUTING.md)
- [x] ✅ Documentation folder

**Outcome**: Community health score improved to 100% 🎉

### 📝 **CI Noise Issues (Non-Blocking)**

- [x] ✅ **Vue Integration Type Issues**: Fixed all 7 TypeScript errors (commit: c556314)
  - **Status**: Build compiles cleanly, no fallback needed ✅

- [x] ✅ **Angular Integration Type Issues**: FULLY RESOLVED via Phase 15 implementation
  - **Solution**: Created separate `@nexcraft/forge-angular` package
  - **Status**: Main package builds cleanly without Angular errors ✅
  - **Impact**: Zero CI noise from Angular compilation ✅
  - **Implementation**: Phase 15.1 & 15.2 completed - Angular integration extracted to dedicated package
  - **Published**: `@nexcraft/forge-angular@0.1.0` available on npm ✅
  - **Documentation**: Updated README.md with framework packages section ✅

---

## 🔧 **Critical Fixes**

### 1. TypeScript Type Safety Improvements

**Priority**: HIGH | **Effort**: Medium | **Impact**: High

**Issues to Fix**:

- [ ] Replace 44 `any` types in core AI metadata files
- [ ] Fix React integration `any` types (17 instances)
- [ ] Improve Token Bridge type definitions (25 instances)
- [ ] Add proper interfaces for design system compatibility

**Files to Update**:

- `src/core/ai-metadata.types.ts`
- `src/core/ai-metadata-exporter.ts`
- `src/core/ai-metadata-validator.ts`
- `src/integrations/react.ts`
- `src/utils/token-bridge.ts`
- `src/utils/performance-dashboard.ts`

**Expected Outcome**: Zero TypeScript warnings, improved type safety

### 2. Lit Performance Optimization

**Priority**: HIGH | **Effort**: Medium | **Impact**: Medium

**Issues to Fix**:

- [ ] Fix "scheduled update after completion" warnings
- [ ] Optimize component update cycles
- [ ] Implement proper change detection
- [ ] Reduce unnecessary re-renders

**Components Affected**:

- `forge-icon`, `forge-dropdown`, `forge-tree-view`
- `forge-multi-select`, `forge-checkbox`, `forge-badge`
- `forge-tooltip`, `forge-modal`, `forge-select`

**Expected Outcome**: Clean console output, improved performance

### 3. Test Performance Violation Cleanup

**Priority**: MEDIUM | **Effort**: Low | **Impact**: Low

**Issues to Fix**:

- [ ] Remove artificial 0.001ms performance budgets in tests
- [ ] Use realistic performance thresholds
- [ ] Clean up test console warnings
- [ ] Improve test performance monitoring

**Expected Outcome**: Clean test output, realistic performance testing

## 🎯 **Quality Improvements**

### 4. AI Manifest Enhancement

**Priority**: MEDIUM | **Effort**: Low | **Impact**: High

**Improvements**:

- [x] ✅ Add more comprehensive examples to AI manifest (SSR fallback examples added)
- [x] ✅ Add accessibility examples (comprehensive a11y metadata for all 30 components)
- [x] ✅ Include performance optimization hints (performance metadata in manifest)
- [ ] 🚧 Include framework-specific usage patterns (in progress - AI tools integration)

**Expected Outcome**: Better AI tool integration, improved developer experience

### 4.1 Strong AI Artifact Gating (CI)

**Priority**: HIGH | **Effort**: Low | **Impact**: High

**Actions**:

- [ ] Fail CI if `ai-manifest.json` has `components.length < 25`
- [ ] Fail CI if `custom-elements.json` is missing from build/package
- [ ] Add “pack verify” step to resolve exports from the packed tarball:
  - `@nexcraft/forge/ai-manifest.json`, `@nexcraft/forge/ai-index.json`, `@nexcraft/forge/ai-tools/*`, `@nexcraft/forge/custom-elements.json`

**Expected Outcome**: No empty AI artifacts can be published; artifacts are reliably consumable by AI tools

### 5. Documentation Updates

**Priority**: MEDIUM | **Effort**: Medium | **Impact**: Medium

**Updates Needed**:

- [x] ✅ Clean up duplicate documentation (merged ai-native-development.md files)
- [x] ✅ Fix documentation shipping issues (added docs/patterns/ to package.json)
- [ ] Update README with latest features
- [ ] Add troubleshooting guide
- [ ] Improve getting started examples
- [ ] Add migration guide from other libraries

**Expected Outcome**: Better onboarding experience

## 🚀 **Quick Wins**

### 6. Bundle Size Optimization

**Priority**: MEDIUM | **Effort**: Low | **Impact**: Medium

**Optimizations**:

- [ ] Analyze bundle composition
- [ ] Optimize tree-shaking for individual imports
- [ ] Reduce duplicate dependencies
- [ ] Implement dynamic imports where beneficial

**Expected Outcome**: Smaller bundle sizes, better performance

### 7. Build Process Improvements

**Priority**: MEDIUM | **Effort**: Low | **Impact**: Medium

**Improvements**:

- [x] ✅ Optimize build scripts (workflow composite actions implemented)
- [x] ✅ Streamline CI/CD pipeline (parallel jobs with caching)
- [x] ✅ **Fix Vue integration build failure** - OBSOLETE: Vue extracted to `@nexcraft/forge-vue` package (Phase 15)
- [ ] Improve error messages
- [ ] Add build performance metrics

**Expected Outcome**: Faster builds, better developer experience, pure web components architecture

### 9. Release Configuration (Changesets)

**Priority**: HIGH | **Effort**: Low | **Impact**: High

**Actions**:

- [ ] Align Changesets base branch with release branch
  - Set `.changeset/config.json` `baseBranch: "main"` (current CI releases from main)
- [ ] Use native Changesets in CI
  - In `release.yml`, set `version: npx changeset version` and `publish: npx changeset publish`
  - Replace bespoke multi-package `npm publish` script to let Changesets publish only changed packages in order
- [ ] Remove auto-changeset generation from release
  - Delete the `Auto-generate Changesets from Commits` step in `release.yml` (changesets must be authored in PRs)
- [ ] Simplify branch sync
  - Drop or manualize the `sync-develop` job; rely on Changesets “Version Packages” PR flow
- [ ] Add PR check for missing changesets
  - Fail PRs that modify `packages/**` without a `.changeset/*.md` entry
- [ ] Confirm version policy for framework packages
  - Keep independent versioning or expand `linked` list intentionally; document policy

**Expected Outcome**: Predictable multi-package releases with minimal maintenance overhead

### 8. Event Naming Audit (ADR‑008)

**Priority**: MEDIUM | **Effort**: Low | **Impact**: Medium

**Actions**:

- [ ] Audit high-traffic components for standard event names (present tense, no `on-*`)
- [ ] Keep deprecated aliases where needed and document deprecation

**Expected Outcome**: Consistent event APIs per ADR‑008; improved DX in frameworks

## 📊 **Success Metrics**

### 🚨 **CRITICAL: CI/CD Pipeline Reliability**

- [x] ✅ **Develop CI workflow passes without failures** (FIXED: develop branch ✅)
- [ ] 🟡 **Release workflow successfully publishes to npm** (currently: BLOCKED 🔴)
- [ ] 🟡 **Deploy workflow successfully updates docs site** (infrastructure fixed, needs testing 🟡)
- [ ] 🔴 **Beta release workflow functional** (currently: FAILING 🔴)
- [ ] 🔴 **No artifact download failures** (currently: SHA MISMATCHES 🔴)

### 📈 **Code Quality & Performance**

- [ ] **Zero TypeScript warnings**
- [ ] **Zero Lit performance warnings**
- [ ] **Clean test output**
- [ ] **Improved bundle sizes** (target: 5-10% reduction)
- [ ] **Faster build times** (target: 10-15% improvement)
- [ ] **Maintain >70% test coverage** (current: 76.51% ✅)

## 🎯 **Definition of Done**

### 🚨 **CRITICAL PIPELINE REQUIREMENTS (Must be completed FIRST)**

- [ ] 🟡 **2/4 critical CI/CD pipeline failures fixed** (50% PROGRESS ✅)
- [x] ✅ **Develop CI workflow passes reliably** (COMPLETED ✅)
- [ ] **Release workflow successfully publishes packages** (NEXT TARGET 🎯)
- [ ] 🟡 **Deploy workflow successfully updates GitHub Pages** (infrastructure ready, needs testing)
- [ ] **Beta release workflow functional for testing** (NEXT TARGET 🎯)
- [x] ✅ **No TypeScript compilation errors blocking builds** (RESOLVED ✅)

### 📈 **Additional Quality Gates**

- [ ] All critical fixes implemented and tested
- [ ] CI/CD pipeline passes without warnings
- [ ] Documentation updated and reviewed
- [ ] Performance benchmarks improved
- [ ] Ready for production deployment

---

**Next Phase**: Move to [02-short-term-roadmap.md](./02-short-term-roadmap.md) priorities
