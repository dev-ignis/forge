# 📈 Short-term Roadmap (1-3 months)

**Status**: Feature enhancements and ecosystem improvements
**Timeline**: 1-3 months
**Goal**: Expand capabilities and improve developer experience

## 🎨 **Design System Integration**

### 1. Enhanced Design Token Bridge
**Priority**: HIGH | **Effort**: Medium | **Impact**: High

**New Features**:
- [x] **Forge Tokens CLI** (`@nexcraft/forge-tokens`)
  - Zero-config: use `FIGMA_TOKEN` + `FIGMA_FILE_KEY`
  - `figma:pull` writes `tokens.json` (+ optional `themes/`)
  - `--apply` generates CSS vars/docs; `--pr` opens PR when diffs exist
  - Optional `forge.figmaconfig.json` for modes, filters, paths
- [x] **Forge MCP for Figma** (`@nexcraft/forge-mcp-figma`)
  - MCP tools: `figma.pull_tokens`, `figma.apply_tokens`, `figma.open_pr`
  - Uses same env; runs from IDE MCP client; no plugin/UI required
  - Returns diff summaries; integrates with existing CI notifications
- [ ] **Additional Design System Support**
  - Ant Design token conversion
  - Chakra UI token bridge
  - Material Design 3 full support
  - Custom design system templates
- [ ] **Advanced Token Features**
  - Token validation and conflict resolution
  - Semantic token mapping
  - Theme variant generation
  - Dark/light mode token sets

**Expected Outcome**: Seamless design system integration across all major platforms

### 2. Advanced Theming System
**Priority**: HIGH | **Effort**: Medium | **Impact**: High

**Features**:
- [ ] **Dynamic Theme Switching**
  - Runtime theme changes
  - Smooth transitions between themes
  - Theme persistence
- [ ] **CSS-in-JS Integration**
  - Styled-components support
  - Emotion integration
  - Theme provider components
- [ ] **Custom Theme Builder**
  - Visual theme editor
  - Theme export/import
  - Theme sharing platform

**Expected Outcome**: Comprehensive theming solution for all use cases

## ⚡ **Performance Enhancements**

### 3. Advanced Performance Monitoring
**Priority**: HIGH | **Effort**: Medium | **Impact**: High

**New Features**:
- [ ] **Real-time Performance Dashboard**
  - Web-based performance monitoring UI
  - Historical performance data
  - Performance trend analysis
  - Alert system for performance regressions
- [ ] **Advanced Metrics Collection**
  - Memory usage tracking
  - Network performance monitoring
  - User interaction metrics
  - Core Web Vitals integration
- [ ] **Performance Optimization Suggestions**
  - Automated performance recommendations
  - Bundle analysis integration
  - Lazy loading suggestions
  - Code splitting recommendations

**Expected Outcome**: Industry-leading performance monitoring and optimization

### 4. Virtual Scrolling Enhancements
**Priority**: MEDIUM | **Effort**: High | **Impact**: Medium

**Improvements**:
- [ ] **Advanced Virtual Scrolling**
  - Dynamic row heights
  - Horizontal virtual scrolling
  - Nested virtual scrolling
  - Performance optimizations for large datasets
- [ ] **Smart Rendering**
  - Predictive rendering
  - Adaptive rendering based on device performance
  - Progressive enhancement

**Expected Outcome**: Better performance for large data sets

## 🤖 **AI-Native Features**

### 5. Advanced AI Integration
**Priority**: HIGH | **Effort**: High | **Impact**: High

**New Features**:
- [ ] 🚧 **AI Code Generation** (IN PROGRESS)
  - Component composition suggestions
  - Automatic accessibility improvements
  - Performance optimization recommendations
  - Design pattern suggestions
- [ ] 🚧 **Smart Component Suggestions** (IN PROGRESS)
  - Context-aware component recommendations
  - Usage pattern analysis
  - Anti-pattern detection
  - Best practice enforcement
- [x] ✅ **AI-Powered Documentation** (FOUNDATION COMPLETE)
  - Comprehensive AI methods guide created
  - AI manifest with metadata for all 30 components
  - AI styling and pattern guides
  - Enhanced framework integration docs

**Expected Outcome**: Revolutionary AI-assisted development experience

### 6. Component Intelligence
**Priority**: MEDIUM | **Effort**: Medium | **Impact**: Medium

**Features**:
- [ ] **Smart Form Validation**
  - AI-powered validation rules
  - Context-aware error messages
  - Automatic form optimization
- [ ] **Adaptive UI Components**
  - User behavior learning
  - Personalized component behavior
  - Accessibility adaptation
  - Performance adaptation

**Expected Outcome**: Intelligent, adaptive components

## 🛠️ **Developer Experience**

### 7. Enhanced Development Tools
**Priority**: HIGH | **Effort**: Medium | **Impact**: High

**New Tools**:
- [ ] **Forge DevTools Browser Extension**
  - Component inspection
  - Performance monitoring
  - Theme debugging
  - AI metadata visualization
- [ ] **VS Code Extension**
  - Component autocomplete
  - AI-powered suggestions
  - Performance warnings
  - Theme preview
- [ ] **CLI Tools**
  - Component generator
  - Theme generator
  - Performance analyzer
  - Bundle analyzer

**Expected Outcome**: Best-in-class developer experience

## 🧱 **CI & Release Pipeline Optimization**

**Priority**: HIGH | **Effort**: Medium | **Impact**: High

**Goals**
- Reduce redundant builds/jobs; accelerate feedback without sacrificing safety
- Guarantee AI artifacts are populated and consumable in npm
- Simplify multi-package publishing via Changesets

**Work Items**
- [ ] Artifact reuse across workflows
  - Upload dist/, storybook-static/, ai-manifest.json in CI; download in release/deploy
  - Fallback build only if artifacts are missing
- [ ] Strong AI artifact gating (ADR-017)
  - validate-ai-manifest fails if components.length < expected (e.g., ≥25) or custom-elements.json is missing
  - Verify package exports resolve: ai-manifest.json, ai-index.json, ai-tools/*
- [ ] Coverage surfaced in PRs (Codecov/Coveralls or summary comment)
- [ ] Permissions hardening per job (CI: contents: read; release: write only)
- [ ] Pin critical actions by SHA (supply-chain)
- [ ] Beta release guardrails (restrict branches or release from temp branch)
- [ ] Deploy reuses CI artifacts; builds only as fallback
- [ ] Changesets configuration alignment
  - Set `baseBranch: "main"` to match release branch
  - Prefer `npx changeset publish` over bespoke publish scripts
  - Consider version policy (linked vs independent) and document
  - (Optional) Add richer changelogs via `@changesets/get-github-info`
  - (Optional) Evaluate Changesets pre mode for pre-releases

**Acceptance Criteria**
- CI+release ≤ 4 jobs for main pushes; ≥ 60% fewer duplicate builds
- npm tarball contains non-empty ai-manifest.json (components ≥ expected) and custom-elements.json
- PRs show coverage; failed AI validation blocks publish
- Changesets baseBranch matches release branch; publish uses Changesets and only publishes changed packages in correct order

### 8. CI Labeling Strategy (Future Enhancement)
**Priority**: LOW | **Effort**: Low | **Impact**: Medium

**Potential CI Labeling Benefits**:

- [ ] **Skip CI Labels**
  ```yaml
  # Skip expensive jobs for certain changes
  if: "!contains(github.event.pull_request.labels.*.name, 'skip-ci')"
  ```
  - `skip-ci` - Skip all CI for urgent hotfixes
  - `docs-only` - Skip tests/build for pure documentation
  - `wip` - Skip expensive jobs for work-in-progress

- [ ] **Conditional Testing Labels**
  ```yaml
  # Run different test suites based on labels
  if: "contains(github.event.pull_request.labels.*.name, 'full-test')"
  ```
  - `full-test` - Run extended test suite including performance tests
  - `security-test` - Run security-focused validation
  - `breaking-change` - Run additional compatibility checks

- [ ] **Release Labels**
  - `beta-ready` - Auto-trigger beta publish after merge
  - `release-candidate` - Trigger release preparation workflow
  - `hotfix` - Fast-track through CI with minimal checks

**Current Assessment**:
- Current CI is already optimized (path filters, PR vs Push strategy, ~90s total)
- Small team with clear workflow patterns
- Labels would be nice-to-have, not essential for current scale
- Consider implementing when CI times exceed 5+ minutes or with multiple contributors

**Expected Outcome**: Enhanced workflow flexibility for larger teams and complex scenarios

### 9. Advanced Testing Framework
**Priority**: MEDIUM | **Effort**: Medium | **Impact**: Medium

**Features**:
- [ ] **Visual Regression Testing**
  - Automated screenshot comparison
  - Cross-browser testing
  - Responsive design testing
- [ ] **Accessibility Testing**
  - Automated a11y audits
  - Screen reader testing
  - Keyboard navigation testing
- [ ] **Performance Testing**
  - Automated performance benchmarks
  - Load testing
  - Memory leak detection

**Expected Outcome**: Comprehensive testing coverage

---

### 🔬 **Known Issues & Technical Debt**

#### ADR-008 Event Naming Compliance Issues
**Status**: ⚠️ BLOCKED | **Priority**: MEDIUM | **Impact**: Medium

**Problem Summary**:
ADR-008 requires using native event names (e.g., `click` instead of custom prefixed names like `forge-avatar-click`). However, web components using shadow DOM with custom events face a fundamental challenge:

**Shadow DOM Event Propagation Limitation**:
- Native click events are "composed" and ALWAYS cross shadow boundaries, even with `stopPropagation()`
- Calling `stopPropagation()` inside shadow DOM only stops propagation within that tree
- Composed events cannot be prevented from reaching the host element
- This is per W3C spec: events must call `stopPropagation()` on the host itself, not within shadow DOM

**Affected Components** (3 failing tests):
- `avatar.ts` - 2 tests failing:
  - `should not emit click event when disabled` - Native click reaches host even when disabled
  - `should handle keyboard events when clickable` - Keyboard-triggered clicks don't dispatch custom events
- `toast.ts` - 1 test failing:
  - Toast dismiss event handling with ADR-008 naming

**Original Working Pattern**:
```typescript
// Dispatched CUSTOM event with unique name
this.dispatchEvent(new CustomEvent('forge-avatar-click', {
  bubbles: true,
  composed: true
}));
// When disabled: early return, NO event dispatched
if (this.disabled) return;
```

**Attempted Solutions** (all failed):
1. ✗ `stopPropagation()` in shadow DOM handler - doesn't prevent composed event crossing
2. ✗ `stopImmediatePropagation()` in shadow DOM - same issue
3. ✗ Capture phase listener in shadow DOM - event already crossing boundary
4. ✗ Host-level capture listener with `isTrusted` check - still reaches test listeners
5. ✗ Manual `addEventListener` instead of Lit's `@click` - no difference
6. ✗ CSS `pointer-events: none` - only affects user clicks, not programmatic `.click()`

**Root Cause**:
When using native event names per ADR-008, we lose the ability to control event emission via early returns. The browser-generated native click event ALWAYS bubbles to the host for composed events, regardless of component state (disabled, etc.).

**Potential Solutions** (requires further investigation):
1. **Revisit ADR-008** - Allow custom event names for components that need state-based emission control
2. **Native Button Pattern** - Use native `<button disabled>` elements which have browser-level click prevention
3. **Event Filtering at Consumer Level** - Document that consumers must check component state
4. **Separate Event Names** - Use `click` for native bubbling, add separate `action` event for component actions

**Files Pending Revert**:
- `src/components/atoms/avatar/avatar.ts`
- `src/components/molecules/toast/toast.ts`
- `src/components/molecules/toast/toast.test.ts`
- `src/components/organisms/accordion/accordion.test.ts`

**Recommendation**:
Defer ADR-008 compliance for interactive shadow DOM components until a viable pattern is established. Revert to custom event names (`forge-*-click`) which provide full emission control.

**Status Update**:
Files have been reverted. Test failures are pre-existing from original component implementation (commit 8e4b32c). These tests were written expecting ADR-008 behavior but the original implementation used the working pattern with custom event names. Tests need to be updated to match the actual component behavior.

---

## 🌐 **Framework Integrations**

### 10. Enhanced Framework Support
**Priority**: MEDIUM | **Effort**: Medium | **Impact**: Medium

**Improvements**:
- [ ] **Next.js Integration**
  - App Router support
  - Server Components compatibility
  - SSR optimization
- [ ] **Nuxt.js Integration**
  - Nuxt 3 support
  - Server-side rendering
  - Static site generation
- [ ] **Svelte Integration**
  - Svelte 5 support
  - Reactive component integration
  - Performance optimizations
- [ ] **Solid.js Integration**
  - SolidJS compatibility
  - Reactive primitives integration

**Expected Outcome**: Universal framework compatibility

### 11. Advanced Form Integration
**Priority**: MEDIUM | **Effort**: Medium | **Impact**: Medium

**Features**:
- [ ] **React Hook Form v8 Support**
  - Latest RHF features
  - Performance optimizations
  - Advanced validation
- [ ] **Formik Integration**
  - Formik 3 support
  - Advanced form state management
- [ ] **Zod Integration**
  - Schema validation
  - Type-safe forms
  - Runtime validation

**Expected Outcome**: Comprehensive form solution

## 📚 **Documentation & Community**

### 12. Comprehensive Documentation
**Priority**: HIGH | **Effort**: Medium | **Impact**: High

**Documentation**:
- [ ] **Interactive Playground**
  - Live component examples
  - Code sandbox integration
  - Real-time editing
- [ ] **Video Tutorials**
  - Getting started series
  - Advanced features walkthrough
  - Best practices guide
- [x] ✅ **Community Resources** (ENHANCED)
  - AI-native development patterns guide
  - Comprehensive styling guide for AI tools
  - Complete import guide with framework examples
  - Production-ready UI patterns (login, dashboard, forms)
  - Enhanced documentation structure and shipping

**Expected Outcome**: Excellent onboarding and learning experience

### 13. Community Building
**Priority**: MEDIUM | **Effort**: Low | **Impact**: Medium

**Initiatives**:
- [ ] **Discord Community**
  - Developer support
  - Feature discussions
  - Community showcase
- [ ] **GitHub Discussions**
  - Feature requests
  - Bug reports
  - Community Q&A
- [ ] **Regular Updates**
  - Monthly newsletters
  - Feature announcements
  - Community highlights

**Expected Outcome**: Active, engaged community

## 📊 **Success Metrics**

- [ ] **Design system integrations**: 5+ supported platforms
- [ ] **Performance improvements**: 20% faster rendering
- [ ] **AI features**: 10+ AI-powered capabilities
- [ ] **Developer tools**: 3+ new development tools
- [ ] **Framework support**: 8+ framework integrations
- [ ] **Community growth**: 1000+ GitHub stars, 100+ Discord members

## 🎯 **Definition of Done**

- [ ] All planned features implemented and tested
- [ ] Documentation updated and comprehensive
- [ ] Community engagement metrics met
- [ ] Performance benchmarks improved
- [ ] Ready for long-term strategic initiatives

---

**Next Phase**: Move to [03-long-term-vision.md](./03-long-term-vision.md) strategic vision
