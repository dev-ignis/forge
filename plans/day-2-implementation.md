# Day 2 Implementation Plan

**Status:** ✅ COMPLETED (August 29, 2025)

## Overview
This document outlines the immediate next steps for Day 2 of the Ignis Design System implementation, focusing on testing infrastructure, tooling, and build pipeline setup.

## Completion Summary
- **8/9 tasks completed** (89% completion rate)
- **Bonus achievements:** Publishing infrastructure, TypeScript configuration
- **Coverage achieved:** 90.62% test coverage
- **Time spent:** ~4 hours

## Current Status Check
- ✅ Core button component implemented
- ✅ Basic theming system in place
- ✅ Demo page created
- ✅ Testing infrastructure completed (90.62% coverage)
- ✅ Build pipeline verified and working
- ✅ Developer tooling setup complete
- ✅ Publishing infrastructure added (bonus!)
- ✅ TypeScript support fully configured

## Implementation Steps

### 1. Test the Current Implementation ✅ COMPLETED
**Priority: Immediate**

```bash
# Test that everything works
npm run dev
# Open browser to http://localhost:5173/demo/index.html
# Verify button renders with all variants
```

**Verification checklist:**
- [x] Dev server starts without errors
- [x] Demo page loads successfully
- [x] Button component renders
- [x] All button variants display correctly
- [x] Theme switching works
- [x] Verify Button uses CSS Custom Properties (no hardcoded colors)
- [x] Check token fallback values are working

### 2. Document Token API ✅ COMPLETED
**Priority: High**

**Status:** Complete documentation created at `docs/theming/token-reference.md`

Create comprehensive token documentation for theming API:

```bash
# Create token documentation
touch docs/theming/token-reference.md
```

**Document the following tokens:**
- Color tokens (`--forge-color-*`)
- Spacing tokens (`--forge-spacing-*`)
- Typography tokens (`--forge-font-*`)
- Border tokens (`--forge-border-*`)
- Shadow tokens (`--forge-shadow-*`)
- Transition tokens (`--forge-transition-*`)

**Include for each token:**
- Token name
- Default value
- Usage examples
- Component dependencies

### 3. Set Up Testing Infrastructure ✅ COMPLETED
**Priority: Critical**

**Status:** Testing fully operational with 18 passing tests and 90.62% coverage

Since package.json already has test scripts configured, we need to:

```bash
# Install missing test dependencies
npm install -D @web/test-runner-playwright sinon @types/sinon

# Create Web Test Runner config
touch web-test-runner.config.js
```

**Configuration file content:**
```javascript
// web-test-runner.config.js
import { playwrightLauncher } from '@web/test-runner-playwright';

export default {
  nodeResolve: true,
  files: 'src/**/*.test.ts',
  coverage: true,
  coverageConfig: {
    threshold: {
      statements: 90,
      branches: 90,
      functions: 90,
      lines: 90
    }
  },
  browsers: [
    playwrightLauncher({ product: 'chromium' }),
    playwrightLauncher({ product: 'firefox' }),
    playwrightLauncher({ product: 'webkit' })
  ]
};
```

**Then implement button tests from quick-start-guide.md:**
- Basic rendering tests
- Variant tests
- Event handling tests
- Accessibility tests

### 4. Create Component Generator Script ✅ COMPLETED
**Priority: High**

**Status:** Generator created at `scripts/generate-component.js` with `npm run generate:component`

Package.json references scripts/generate-component.js - let's create it:

```bash
mkdir -p scripts
# Create the generator script
touch scripts/generate-component.js
```

**Generator features to implement:**
- Interactive CLI prompts
- Template file generation with token usage
- Automatic file structure creation
- Test file scaffolding
- Story file generation
- Auto-registration in index.ts
- **Token-first templates** - all styles use `var(--forge-*)` exclusively
- **Theming compliance** - no hardcoded colors, spacing, or typography
- **Component-specific tokens** - option to define new tokens if needed

**Template requirements:**
- Must use CSS Custom Properties for ALL visual properties
- Include sensible fallback values
- Document token dependencies in component comments

**Reference:** See development-workflow.md for complete generator implementation

### 5. Initialize Storybook ⏸️ DEFERRED
**Priority: Medium**

**Status:** Deferred to Day 3 - can be initialized when needed

```bash
# Install Storybook for Web Components
npx storybook@latest init --type web_components_vite

# Create first story for Button component
```

**Storybook setup tasks:**
- [ ] Install Storybook dependencies
- [ ] Configure for Web Components
- [ ] Create Button.stories.ts
- [ ] Set up theme switching addon
- [ ] Configure documentation pages
- [ ] Add accessibility addon

### 6. Fix Build Pipeline ✅ COMPLETED
**Priority: High**

**Status:** Build pipeline fully operational, generates ESM/UMD bundles and TypeScript declarations

The build:types script needs to work properly:

```bash
# Test the build
npm run build

# If it fails, we may need to adjust tsconfig.json
```

**Build verification checklist:**
- [ ] TypeScript compilation successful
- [ ] Type definitions generated
- [ ] ESM bundle created
- [ ] UMD bundle created (if configured)
- [ ] CSS bundle generated
- [ ] Source maps generated

## Recommended Priority Order

### 🚀 Quick Wins (Do First)
1. **Test current implementation** ✅
   - Verify everything built so far works
   - Identify any immediate issues

2. **Fix any build issues** 🔧
   - Ensure build pipeline works
   - Fix TypeScript configuration if needed

### 🧪 Critical Infrastructure (Do Second)
3. **Set up Web Test Runner** 🧪
   - Install dependencies
   - Configure test runner
   - Write first tests

4. **Create component generator** ⚙️
   - Build scaffolding tool
   - Test with a new component

### 📚 Enhancement (Do Third)
5. **Initialize Storybook** 📚
   - Set up component documentation
   - Create interactive playground

6. **Implement Input component** 🆕
   - Use generator to scaffold
   - Follow established patterns
   - Ensure token-first implementation

7. **Plan Alert component** 🚨
   - Design variants (success, error, warning, info)
   - Plan dismissible behavior
   - Define animation tokens

## Quick Start Commands

```bash
# Option A: Set up testing (Web Test Runner + Button tests)
npm install -D @web/test-runner-playwright sinon @types/sinon
npm run test

# Option B: Create component generator script
mkdir -p scripts
node scripts/generate-component.js

# Option C: Initialize Storybook
npx storybook@latest init --type web_components_vite
npm run storybook

# Option D: Build the next component (Input)
npm run generate:component input
```

## Success Criteria

### Day 2 Completion Checklist
- [x] Development server runs without errors
- [x] Build pipeline produces all outputs
- [x] Token API documented with all CSS Custom Properties
- [x] Button component verified using tokens exclusively
- [x] At least one test suite passes (18 tests passing!)
- [x] Component generator creates token-compliant components
- [ ] Storybook displays Button component with theming (deferred to Day 3)
- [x] Documentation is up to date
- [ ] Alert component design planned (next session)

## Troubleshooting Guide

### Common Issues and Solutions

**Issue: Build fails with TypeScript errors**
- Solution: Check tsconfig.json paths configuration
- Verify all imports use correct paths

**Issue: Tests won't run**
- Solution: Ensure web-test-runner.config.js exists
- Check that test files match the glob pattern

**Issue: Storybook won't start**
- Solution: Clear node_modules and reinstall
- Check for port conflicts (default 6006)

**Issue: Component generator fails**
- Solution: Verify scripts directory exists
- Check Node.js version compatibility

## Next Steps After Day 2

Once Day 2 objectives are complete, proceed to:
1. Implement Alert component (Phase 1 priority)
2. Complete remaining foundational components (Select, Radio Group)
3. Implement remaining atomic components (Badge, Switch)
4. Build molecular components (Form, Modal, etc.)
5. Create organism components (Header, Footer, etc.)
6. Develop Tailwind plugin (Week 7)
7. Set up CI/CD pipeline
8. Prepare for initial release

## Time Estimates

**Total estimated time for Day 2:** 3.5-4.5 hours

- Token API documentation: 15 minutes
- Testing setup: 30 minutes
- Component generator with token support: 30 minutes
- Storybook setup: 45 minutes
- Build pipeline fixes: 15 minutes
- First component tests: 30 minutes
- Alert component planning: 15 minutes
- Documentation updates: 15 minutes
- Buffer for issues: 30 minutes

## Notes

- **Token-first development is critical** - all components must use CSS Custom Properties ✅
- Prioritize testing infrastructure as it will catch issues early ✅
- Component generator must enforce token usage from the start ✅
- Storybook provides immediate value for component documentation and theming demos ⏸️
- Keep build pipeline simple initially, optimize later ✅
- Document all tokens as they become part of our public API ✅
- Alert component is now a Phase 1 priority (top 10 foundational) 📋
- Document decisions and learnings as you go ✅

## Additional Achievements (Beyond Plan)

### Publishing Infrastructure ✅
- Configured package.json for NPM publishing (@ignis/forge)
- Created GitHub Actions workflows (CI/CD)
- Added LICENSE, CHANGELOG.md, .npmignore
- Created comprehensive publishing strategy documentation

### TypeScript Configuration ✅
- Ensured full TypeScript support for consumers
- Added proper type exports and declarations
- Configured module resolution for ESM and CommonJS
- Tested TypeScript consumption scenarios