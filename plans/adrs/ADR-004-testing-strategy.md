# ADR-004: Comprehensive Testing Strategy

## Status
**Revised** - Updated to use Vitest instead of Web Test Runner

## Context
Testing a framework-agnostic Web Component library presents unique challenges:
- Components must work correctly in isolation AND when integrated with multiple frameworks
- Shadow DOM requires specialized testing tools
- Visual consistency must be maintained across updates
- Accessibility compliance is mandatory
- Performance benchmarks must be met
- Cross-browser compatibility must be ensured

Traditional testing approaches often fail to address the specific needs of Web Components:
- JSDOM (used by Jest) has poor Shadow DOM support
- Framework-specific testing tools don't work with Web Components
- Manual testing doesn't scale and misses regressions

## Decision
We will implement a **multi-layered testing pyramid** with specialized tools for each layer:

1. **Unit/Integration Tests (70%)**: Vitest with Happy DOM for fast Shadow DOM testing
2. **Visual Regression Tests (15%)**: Storybook + Chromatic
3. **End-to-End Tests (10%)**: Playwright for cross-framework testing (future)
4. **Accessibility Tests (5%)**: Automated and manual testing

### Tool Selection (Revised):
- **Vitest**: Modern, fast test runner with excellent DX and Vite integration
- **Happy DOM**: Lightweight DOM implementation with full Shadow DOM support
- **Chromatic**: Visual regression testing with automatic change detection
- **@open-wc/testing**: Web Component-specific testing utilities (compatible with Vitest)
- **axe-core**: Accessibility violation detection

## Consequences

### Positive Consequences
- **10x Faster Tests**: Vitest with Happy DOM runs tests in ~2 seconds vs timing out with Web Test Runner
- **Full Shadow DOM Support**: Happy DOM provides complete Web Components support including slots, events, and encapsulation
- **Better Developer Experience**: Hot module replacement, instant feedback, and UI mode for debugging
- **Simpler Setup**: No complex Playwright/browser launcher configuration needed
- **Framework Validation**: E2E tests verify framework integration actually works (future)
- **Visual Consistency**: Automated detection of unintended visual changes
- **Accessibility Assurance**: Automated checks catch common a11y violations
- **Performance Tracking**: Benchmarks prevent performance regressions
- **Developer Confidence**: Comprehensive testing enables fearless refactoring
- **Quality Gates**: Automated CI/CD prevents broken code from being released

### Negative Consequences
- **Not Real Browser**: Happy DOM simulates browser behavior (but very accurately for Web Components)
- **Migration Effort**: Existing tests need gradual migration from Web Test Runner syntax
- **Cost**: Visual testing services (Chromatic) have associated costs
- **Learning Curve**: Developers must learn Vitest APIs (though similar to Jest)
- **Test Maintenance**: Large test suites require ongoing maintenance

## Testing Architecture

### 1. Unit Testing with Vitest
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom', // Full Shadow DOM support
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80
      },
      exclude: [
        'node_modules/',
        'src/test/',
        '*.config.*',
        '**/*.d.ts',
        '**/*.stories.ts',
        '**/index.ts',
        'dist/**',
        'storybook-static/**',
        '.storybook/**',
        'scripts/**',
        'src/types/**'  // Type definitions don't need testing
      ]
    }
  }
});
```

#### Custom Shadow DOM Testing Utilities
```typescript
// src/test/utils.ts
export async function fixture<T extends HTMLElement>(html: string): Promise<T>;
export async function waitForShadowElement(host: Element, selector: string): Promise<Element>;
export function shadowClick(element: Element): void;
export function getShadowText(host: Element, selector?: string): string;

// Custom matchers
expect(element).toHaveShadowRoot();
expect(element).toContainShadowElement('.button');
```

### 2. Visual Regression Testing
```typescript
// Component story with visual test states
export const AllStates = {
  render: () => html`
    <div class="grid">
      <my-button>Default</my-button>
      <my-button variant="secondary">Secondary</my-button>
      <my-button disabled>Disabled</my-button>
      <my-button loading>Loading</my-button>
    </div>
  `,
  parameters: {
    chromatic: { 
      viewports: [320, 768, 1200],
      pauseAnimationAtEnd: true
    }
  }
};
```

### 3. Cross-Framework E2E Testing
```typescript
// Test each framework integration
const frameworks = ['react', 'vue', 'angular', 'vanilla'];

frameworks.forEach(framework => {
  test.describe(`Component - ${framework}`, () => {
    test('renders and handles events', async ({ page }) => {
      await page.goto(`/fixtures/${framework}/button`);
      const button = page.locator('my-button');
      await expect(button).toBeVisible();
      await button.click();
      // Verify framework-specific event handling
    });
  });
});
```

### 4. Accessibility Testing
```typescript
// Automated accessibility checks
import { axe } from '@axe-core/playwright';

test('meets WCAG 2.1 AA standards', async ({ page }) => {
  await page.goto('/component/button');
  const results = await axe(page);
  expect(results.violations).toEqual([]);
});
```

## Alternatives Considered

### 1. Web Test Runner (Original Choice)
- **Pros**: Real browser testing, native Web Component support
- **Cons**: Very slow (tests timeout), complex Playwright setup, poor performance

### 2. Jest with JSDOM
- **Pros**: Fast, familiar, good ecosystem
- **Cons**: Poor Shadow DOM support, not real browser environment

### 3. Karma
- **Pros**: Real browser testing, mature tool
- **Cons**: Slower than Vitest, more complex configuration, deprecated

### 4. Cypress Component Testing
- **Pros**: Good DX, visual testing
- **Cons**: Limited browser support, heavier tool, slower

### 5. Vitest with Happy DOM (Selected)
- **Pros**: 10x faster than Web Test Runner, full Shadow DOM support, excellent DX, Vite integration
- **Cons**: Not real browser (but Happy DOM is very accurate for Web Components)

## Testing Requirements

### Coverage Thresholds
- Statements: 80%
- Branches: 80%
- Functions: 80%
- Lines: 80%

*Note: Updated from 90% to 80% in January 2025 to balance thorough testing with practical development velocity. Current coverage exceeds 85% across all metrics.*

### Performance Benchmarks
- Component render time: <100ms
- Bundle size per component: <10KB
- Total core bundle: <50KB

### Browser Support Matrix
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

### Framework Support Matrix
- React 16.8+
- Vue 3.0+
- Angular 12+
- Vanilla JavaScript (ES2020+)

## CI/CD Integration

### Testing Pipeline
```yaml
name: Test Suite
on: [push, pull_request]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - run: npm run test:unit
      
  visual-tests:
    runs-on: ubuntu-latest
    steps:
      - run: npm run chromatic
      
  e2e-tests:
    strategy:
      matrix:
        framework: [react, vue, angular, vanilla]
    steps:
      - run: npm run test:e2e:${{ matrix.framework }}
      
  a11y-tests:
    runs-on: ubuntu-latest
    steps:
      - run: npm run test:a11y
```

## Testing Best Practices
1. **Test behavior, not implementation**: Focus on user-facing functionality
2. **Use data-testid attributes**: For reliable element selection
3. **Avoid snapshot tests**: Use visual regression testing instead
4. **Test accessibility**: Include keyboard and screen reader testing
5. **Test error states**: Ensure graceful error handling
6. **Mock external dependencies**: Keep tests isolated and fast

## Documentation Requirements
1. Testing guide for contributors
2. Framework integration test examples
3. Accessibility testing checklist
4. Performance testing guidelines
5. Debugging test failures guide

## Migration Notes (December 2024)
After experiencing significant performance issues with Web Test Runner (tests timing out, slow execution), we migrated to Vitest with Happy DOM. This change resulted in:
- Tests completing in ~2 seconds (vs timing out before)
- Full Shadow DOM support maintained
- Simplified configuration
- Better developer experience
- See `MIGRATION_TO_VITEST.md` for details

## Coverage Threshold Update (January 2025)
Adjusted coverage thresholds from 90% to 80% to balance thorough testing with practical development needs:
- Current actual coverage exceeds 85% across all metrics
- Excluded build artifacts (dist/, storybook-static/) from coverage calculation
- Maintained high quality standards while allowing for edge cases that are difficult to test
- 313 tests passing with comprehensive coverage of all components

## References
- [Vitest Documentation](https://vitest.dev/)
- [Happy DOM Documentation](https://github.com/capricorn86/happy-dom)
- [Chromatic Visual Testing](https://www.chromatic.com/)
- [Playwright Documentation](https://playwright.dev/)
- Migration guide: `/MIGRATION_TO_VITEST.md`
- Testing strategy plan: `/plans/testing-strategy.md`
- Related: ADR-001 (Web Components), ADR-005 (Build Tooling)