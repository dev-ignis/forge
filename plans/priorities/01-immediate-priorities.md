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

### 0. Next.js SSR/Hydration Support (CRITICAL CLIENT BLOCKER)

**Priority**: CRITICAL | **Effort**: Medium | **Impact**: CRITICAL

**Current Situation**:
- Multiple clients reporting components don't hydrate in Next.js 15 App Router
- Web components require `HTMLElement` which doesn't exist during SSR
- React wrappers render fallback HTML but components never upgrade
- Fallback HTML has no CSS - completely unstyled forms
- No clear documentation for Next.js 15 + React 19 setup

**Client Impact**:
- ❌ Forms render as unstyled native HTML inputs
- ❌ `customElements.get('forge-input')` returns `undefined`
- ❌ `data-ssr-fallback="true"` stays in DOM (components never hydrate)
- ❌ Dynamic imports create race conditions with React hydration

**Immediate Actions**:

#### Phase 1: Quick Fixes (Week 1) - HIGH PRIORITY
- [ ] **Create fallback CSS file** (`packages/forge-react/dist/fallbacks.css`)
  - Style `.forge-input`, `.forge-button`, `.forge-card`, etc.
  - Match visual appearance of web components
  - Import: `import '@nexcraft/forge-react/fallbacks.css'`
  - **Impact**: Fixes unstyled forms immediately

- [ ] **Fix `createUnifiedWrapper` timing**
  - Add `customElements.whenDefined()` detection
  - Re-render when web component registers
  - Handle SSR → Client hydration properly
  - **Impact**: Components upgrade after web components load

- [ ] **Document Next.js 15 setup** (`docs/integrations/nextjs-15-app-router.md`)
  - Script loading strategies (`beforeInteractive`, `public/` folder)
  - `ClientOnly` wrapper pattern
  - Troubleshooting guide
  - **Impact**: Unblocks all Next.js users

#### Phase 2: Framework Integration (Week 2-3) - MEDIUM PRIORITY
- [ ] **Create `@nexcraft/forge-nextjs` package**
  - `<ForgeScript />` component with correct loading strategy
  - `<ClientOnly>` wrapper component
  - Pre-built bundle for `public/` folder
  - Setup CLI: `npx @nexcraft/forge setup nextjs`
  - **Impact**: Zero-config Next.js support

- [ ] **Add static bundle export**
  - Add to `package.json`: `"./static": "./dist/forge.static.js"`
  - Optimized UMD bundle for Next.js `public/` folder
  - CORS-friendly CDN bundle
  - **Impact**: Multiple loading strategies supported

#### Phase 3: Long-term Improvements (Week 4+) - LOW PRIORITY
- [ ] **Create framework-specific guides**
  - Next.js App Router (Pages Router separate)
  - Remix
  - SvelteKit
  - Nuxt 3
  - **Impact**: Better onboarding for all SSR frameworks

**Files to Create/Update**:
- `packages/forge-react/src/fallbacks.css` (NEW - critical)
- `packages/forge-react/src/utils/createUnifiedWrapper.tsx` (UPDATE - fix timing)
- `docs/integrations/nextjs-15-app-router.md` (NEW - urgent)
- `packages/forge-nextjs/` (NEW - medium priority)
- `package.json` (UPDATE - add static bundle export)

**Success Criteria**:
- [ ] Fallback components have CSS and look styled
- [ ] Web components hydrate reliably in Next.js 15
- [ ] Clear documentation for all SSR frameworks
- [ ] `@nexcraft/forge-nextjs` package published
- [ ] Zero client support tickets about SSR/hydration

**Related Client Issues**:
- Gaming Highlight Reel (http://localhost:9001/register) - unstyled forms
- Multiple reports of "components stay as fallbacks"
- Confusion about import strategies (CDN vs npm vs dynamic)

---

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

### 10. AI Methods Optimization & Reframing

**Priority**: MEDIUM | **Effort**: Low-Medium | **Impact**: High

**Current Situation**:

- AI methods (`getPossibleActions`, `explainState`, `aiState`) add ~100 lines per component
- Total overhead: ~2,700 lines across 27 components (~81-135KB minified)
- Methods are shipped to all users but rarely called in production
- Marketing emphasizes "AI-native" but no AI tools currently consume these methods
- Claims are technically accurate but positioning may be premature

**Strategy**: Combine reframing (Option 1) + optional tree-shaking (Option 2)

**Phase 1: Reframe Marketing (Week 1) - Low Effort**

- [ ] Update README.md to emphasize "Runtime Introspection" over "AI-native"
- [ ] Reposition as developer debugging/testing tools first, AI capability second
- [ ] Update docs/ai/metadata-reference.md to add "Developer Introspection" section
- [ ] Keep AI integration as documented capability, not primary selling point
- [ ] Add practical debugging examples to documentation

**Phase 2: Measure & Analyze (Week 2) - Low Effort**

- [ ] Measure actual bundle impact of AI methods (use bundle analyzer)
- [ ] Document size of getPossibleActions/explainState/aiState per component
- [ ] Identify which methods are most/least valuable
- [ ] Calculate potential savings from tree-shaking

**Phase 3: Make Tree-Shakeable (Week 3-4) - Medium Effort**

- [ ] Design optional import pattern:

  ```typescript
  // Default: Lean components (no AI methods)
  import { ForgeButton } from '@nexcraft/forge';

  // Opt-in: Full introspection API
  import '@nexcraft/forge/introspection';
  // OR per-component: import '@nexcraft/forge/button/introspection'
  ```

- [ ] Move AI methods to separate module that extends BaseElement prototypes
- [ ] Update vite.config.ts for proper tree-shaking
- [ ] Add new package.json exports for introspection modules
- [ ] Ensure zero breaking changes for existing users
- [ ] Update TypeScript definitions for conditional types

**Phase 4: Prove Value with Tooling (Week 4+) - Medium Effort**

- [ ] Build ONE concrete developer tool that uses these methods:
  - **Option A**: Forge DevTools Chrome Extension (inspect component state visually)
  - **Option B**: Enhanced console wrapper (`window.forge.inspect(element)`)
  - **Option C**: Test helper library (`@nexcraft/forge-testing`)
- [ ] Create video/GIF demonstrating practical debugging workflow
- [ ] Add tool demo to README as proof of introspection value
- [ ] Gather user feedback on introspection API usefulness

**Expected Outcomes**:

- **Bundle size**: 5-10% reduction for users who don't opt-in to introspection
- **Marketing clarity**: More honest positioning as "introspection-enabled, AI-ready"
- **Validation**: Real tool proves methods earn their bytes
- **Flexibility**: Developers choose lean (default) or feature-rich (opt-in)
- **Future-proof**: Infrastructure ready when AI tools start consuming metadata

**Files to Update**:

- `README.md` - Reframe "AI-native" messaging (Phase 1)
- `docs/ai/metadata-reference.md` - Add developer introspection guide (Phase 1)
- `src/core/BaseElement.ts` - Prepare for conditional method loading (Phase 3)
- `src/core/ai-introspection.ts` - New module with AI methods (Phase 3)
- `vite.config.ts` - Configure tree-shaking for introspection (Phase 3)
- `package.json` - Add exports for introspection modules (Phase 3)
- `examples/` - Add introspection usage examples (Phase 4)

**Success Criteria**:

- [ ] Bundle size measured and documented
- [ ] README messaging reframed to emphasize developer tools
- [ ] Tree-shaking implementation complete with zero breaking changes
- [ ] At least one working tool demonstrates introspection value
- [ ] Documentation updated with opt-in patterns
- [ ] User feedback collected and positive

**Related Items**:

- Supports #6 (Bundle Size Optimization)
- Supports #5 (Documentation Updates)
- Supports #1 (TypeScript Type Safety - smaller API surface)

### 11. Source Directory Cleanup ✅

**Priority**: MEDIUM | **Effort**: Low | **Impact**: Low | **Status**: ✅ **COMPLETED**

**Issues to Fix**:

- [x] ✅ Remove build artifacts from `src/` directory
  - Cleaned up 120 build artifacts (`.js`, `.d.ts`, `.js.map`, `.d.ts.map` files)
  - Verified all build output goes to `dist/` only
  - `.gitignore` already has patterns to prevent future commits (lines 79-83)
- [x] ✅ Verify CI/CD workflows use `dist/` for artifacts
  - All workflows correctly reference `dist/` for build artifacts
  - No references to `src/` build artifacts in any workflows
- [x] ✅ Update documentation if needed
  - Documentation already references `dist/` correctly
  - No updates needed

**Files Cleaned**:

- Removed 120 compiled files from `src/`:
  - `src/index.js`, `src/index.d.ts`, `src/index.js.map`, `src/index.d.ts.map`
  - `src/core/BaseElement.js`, `src/core/BaseElement.d.ts`, etc.
  - `src/core/ai-metadata.types.js`, `src/core/ai-metadata.types.d.ts`, etc.
  - All compiled files in `src/components/`, `src/types/`, `src/utils/`

**Outcome**: ✅ Clean source tree with only `.ts` files - build artifacts were never tracked by git (already ignored)

### 12. Design Token System Enhancement

**Priority**: ~~MEDIUM~~ | **Effort**: ~~Medium~~ | **Impact**: ~~Medium~~ | **Status**: ✅ **OBSOLETE**

**Reason for Obsolescence**:

This approach (hardcoded token files) is **architecturally inferior** to the existing solution. Forge already has a superior token system:

**What Already Exists** ✅:

- **`@nexcraft/forge-tokens`** - Standalone CLI package for token extraction from any design system
- **Token Bridge System** (`src/utils/token-bridge.ts`) - Runtime token resolution with multi-source support
- **Comprehensive Documentation** (`docs/theming/token-bridge.md`) - Full theming guide
- **Competitive Advantage** - Users bring their own design system instead of being locked into Forge tokens

**Why Hardcoded Tokens Would Be Wrong**:

- ❌ Prescriptive approach limits users to Forge's design opinions
- ❌ Conflicts with "framework-agnostic" and "any design system" value propositions
- ❌ Creates maintenance burden for tokens that users may not want
- ❌ Token Bridge is more flexible and powerful

**Alternative (If Needed)**:

Move to short-term roadmap as low priority:

- Token Bridge adapters for popular design systems (Material, Tailwind, Chakra, Bootstrap)
- Token Inspector DevTool for debugging token resolution
- Improved token validation and type safety

**Related Items**:

- ~~Supports #6 (Bundle Size Optimization - tree-shakeable tokens)~~ → Token Bridge already optimized
- ~~Supports #5 (Documentation Updates - theming guide)~~ → Documentation already exists

### 13. Utilities Directory Reorganization

**Priority**: LOW | **Effort**: Low | **Impact**: Low

**Current State**:

```
utils/
├── debounce.ts
├── performance-dashboard.ts
├── token-bridge.ts
└── virtual-scroller.ts
```

**Proposed Structure**:

```
utils/
├── performance/
│   ├── dashboard.ts
│   └── virtual-scroller.ts
├── timing/
│   ├── debounce.ts
│   └── throttle.ts (if exists)
├── theming/
│   └── token-bridge.ts
├── dom/
│   └── [future DOM utilities]
└── index.ts (barrel export)
```

**Actions**:

- [ ] Create subdirectory structure in `utils/`
- [ ] Move files to appropriate categories
- [ ] Update import paths across codebase
- [ ] Create barrel exports (`index.ts` per category)
- [ ] Update main `utils/index.ts` for re-exports
- [ ] Verify all tests still pass
- [ ] Update documentation

**Files to Update**:

- Move `src/utils/debounce.ts` → `src/utils/timing/debounce.ts`
- Move `src/utils/performance-dashboard.ts` → `src/utils/performance/dashboard.ts`
- Move `src/utils/virtual-scroller.ts` → `src/utils/performance/virtual-scroller.ts`
- Move `src/utils/token-bridge.ts` → `src/utils/theming/token-bridge.ts`
- Create `src/utils/performance/index.ts`
- Create `src/utils/timing/index.ts`
- Create `src/utils/theming/index.ts`
- Update `src/utils/index.ts`

**Expected Outcome**: Better organized utilities with clear categories, easier to discover and maintain

**Related Items**:

- Supports #5 (Documentation Updates - clearer utility organization)
- Supports #1 (TypeScript Type Safety - clearer module boundaries)

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

**Priority**: HIGH | **Effort**: Low | **Impact**: High | **Status**: ✅ **MOSTLY COMPLETED** (4/6 done)

**Actions**:

- [x] ✅ Align Changesets base branch with release branch
  - Set `.changeset/config.json` `baseBranch: "main"` (current CI releases from main) → **COMPLETED**
- [x] ✅ Use native Changesets in CI
  - In `release.yml`, set `version: npx changeset version` and `publish: npx changeset publish` → **COMPLETED**
  - Replace bespoke multi-package `npm publish` script to let Changesets publish only changed packages in order → **COMPLETED**
- [x] ✅ Remove auto-changeset generation from release
  - Delete the `Auto-generate Changesets from Commits` step in `release.yml` (changesets must be authored in PRs) → **COMPLETED**
- [x] ~~🟡 Simplify branch sync~~ **OBSOLETE**
  - ~~Drop or manualize the `sync-develop` job; rely on Changesets "Version Packages" PR flow~~
  - **Decision**: Remove `sync-develop` job entirely - creates git noise (2 commits/release), duplicates Changesets workflow, requires manual intervention on conflicts anyway
- [x] ✅ Add PR check for missing changesets
  - Fail PRs that modify `packages/**` without a `.changeset/*.md` entry → **COMPLETED**
  - **Implementation**: Added `changeset-check` job to `.github/workflows/ci.yml`
  - **Behavior**: Fails CI if package files modified without changeset, provides helpful error message
- [x] ✅ Confirm version policy for framework packages
  - Keep independent versioning or expand `linked` list intentionally; document policy → **COMPLETED**
  - **Policy**: Framework packages linked: `@nexcraft/forge-react`, `@nexcraft/forge-vue`, `@nexcraft/forge-angular`

**Expected Outcome**: Predictable multi-package releases with minimal maintenance overhead → **ACHIEVED** ✅

**Verification**: Successfully published 7 packages to npm (forge@0.8.0, forge-react@0.3.0, forge-rhf@0.4.0, etc.)

**Completion**: ✅ **FULLY COMPLETED** (5/5 actionable items done, 1 marked OBSOLETE)

### 8. Event Naming Audit (ADR‑008)

**Priority**: MEDIUM | **Effort**: Low | **Impact**: Medium | **Status**: ✅ **COMPLETED**

**Actions**:

- [x] ✅ Audit high-traffic components for standard event names (present tense, no `on-*`)
  - **Final Compliance**: 100% (18/18 events fully compliant)
  - **Issues Fixed**:
    - toast `toast-dismissed` → `dismiss` (with deprecated alias)
    - avatar `forge-avatar-click` → `click`
    - modal `modalclose`/`modalopen` → `close`/`open`
- [x] ✅ Keep deprecated aliases where needed and document deprecation
  - **toast**: Emits both `dismiss` (new) and `toast-dismissed` (deprecated)
  - **Deprecation**: `toast-dismissed` will be removed in v1.0.0

**Expected Outcome**: Consistent event APIs per ADR‑008; improved DX in frameworks → **ACHIEVED** ✅

**Fixes Implemented**:

- `src/components/molecules/toast/toast.ts` - Added `dismiss` event with deprecated `toast-dismissed` alias
- `src/components/molecules/toast/toast-container.ts` - Updated to listen for `dismiss`
- `src/components/molecules/toast/toast.test.ts` - Updated tests for new event
- `src/components/atoms/avatar/avatar.ts` - Changed to standard `click` event
- `src/components/atoms/avatar/avatar.test.ts` - Updated tests for `click`
- `src/components/atoms/avatar/avatar.stories.ts` - Updated Storybook examples
- `src/components/molecules/modal/modal.ts` - Removed vendor-prefixed `modalclose`/`modalopen`, kept only `close`/`open`
- `src/components/molecules/modal/modal.test.ts` - Updated all tests to use `close`/`open` events
- `src/components/molecules/modal/modal.stories.ts` - Updated all Storybook examples to use standard events

## 📊 **Success Metrics**

### 🚨 **CRITICAL: CI/CD Pipeline Reliability**

- [x] ✅ **Develop CI workflow passes without failures** (FIXED: develop branch ✅)
- [ ] 🟡 **Release workflow successfully publishes to npm** (currently: BLOCKED 🔴)
- [ ] 🟡 **Deploy workflow successfully updates docs site** (infrastructure fixed, needs testing 🟡)
- [ ] 🔴 **Beta release workflow functional** (currently: FAILING 🔴)
- [ ] 🔴 **No artifact download failures** (currently: SHA MISMATCHES 🔴)

### 📈 **Code Quality & Performance**

- [ ] **Next.js SSR support working** (CRITICAL - blocking clients)
- [ ] **Fallback CSS created and shipped** (URGENT)
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
