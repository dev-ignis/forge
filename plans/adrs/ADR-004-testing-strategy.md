# ADR-004: Comprehensive Testing Strategy

## Status
**Accepted**

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

1. **Unit/Integration Tests (70%)**: Web Test Runner with real browsers
2. **Visual Regression Tests (15%)**: Storybook + Chromatic
3. **End-to-End Tests (10%)**: Playwright for cross-framework testing
4. **Accessibility Tests (5%)**: Automated and manual testing

### Tool Selection:
- **Web Test Runner**: Browser-based testing with native Web Component support
- **Chromatic**: Visual regression testing with automatic change detection
- **Playwright**: Cross-browser, cross-framework E2E testing
- **@open-wc/testing**: Web Component-specific testing utilities
- **axe-core**: Accessibility violation detection

## Consequences

### Positive Consequences
- **Real Browser Testing**: Tests run in actual browsers, not simulated environments
- **Framework Validation**: E2E tests verify framework integration actually works
- **Visual Consistency**: Automated detection of unintended visual changes
- **Accessibility Assurance**: Automated checks catch common a11y violations
- **Performance Tracking**: Benchmarks prevent performance regressions
- **Developer Confidence**: Comprehensive testing enables fearless refactoring
- **Quality Gates**: Automated CI/CD prevents broken code from being released

### Negative Consequences
- **Complex Setup**: Multiple testing tools require configuration and maintenance
- **Slower CI/CD**: Running tests in real browsers takes longer than JSDOM
- **Cost**: Visual testing services (Chromatic) have associated costs
- **Learning Curve**: Developers must learn multiple testing frameworks
- **Test Maintenance**: Large test suites require ongoing maintenance

## Testing Architecture

### 1. Unit Testing with Web Test Runner
```javascript
// web-test-runner.config.js
export default {
  files: 'src/**/*.test.ts',
  nodeResolve: true,
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
    chromeLauncher({ launchOptions: { headless: true } }),
    firefoxLauncher(),
    safariLauncher()
  ]
};
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

### 1. Jest with JSDOM
- **Pros**: Fast, familiar, good ecosystem
- **Cons**: Poor Shadow DOM support, not real browser environment

### 2. Karma
- **Pros**: Real browser testing, mature tool
- **Cons**: Slower than Web Test Runner, more complex configuration

### 3. Cypress Component Testing
- **Pros**: Good DX, visual testing
- **Cons**: Limited browser support, heavier tool

### 4. Manual Testing Only
- **Pros**: Real user perspective
- **Cons**: Doesn't scale, misses regressions, time-consuming

## Testing Requirements

### Coverage Thresholds
- Statements: 90%
- Branches: 90%
- Functions: 90%
- Lines: 90%

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

## References
- [Web Test Runner Documentation](https://modern-web.dev/docs/test-runner/overview/)
- [Chromatic Visual Testing](https://www.chromatic.com/)
- [Playwright Documentation](https://playwright.dev/)
- Testing strategy plan: `/plans/testing-strategy.md`
- Related: ADR-001 (Web Components), ADR-005 (Build Tooling)