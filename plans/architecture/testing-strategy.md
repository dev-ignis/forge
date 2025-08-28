# Testing Strategy Plan

## Testing Philosophy

### Core Principles
1. **User-Centric Testing**: Focus on user behavior, not implementation details
2. **Framework Agnosticism**: Every component must work across all target frameworks
3. **Accessibility First**: All components must pass WCAG 2.1 AA standards
4. **Performance Matters**: Components must meet performance benchmarks
5. **Visual Consistency**: Prevent unintended visual regressions

## Testing Pyramid

```
         /\          E2E Tests (10%)
        /  \         - Cross-framework integration
       /    \        - Critical user journeys
      /      \       
     /--------\      Integration Tests (20%)
    /          \     - Component interactions
   /            \    - Complex behaviors
  /              \   
 /----------------\  Unit Tests (70%)
/                  \ - Component logic
                     - Props/events
                     - Accessibility
```

## Unit Testing

### Tool: Web Test Runner
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
    safariLauncher() // macOS only
  ]
};
```

### Testing Patterns

#### Basic Component Test
```typescript
// button.test.ts
import { fixture, expect, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import './button';

describe('Button Component', () => {
  it('renders with default props', async () => {
    const el = await fixture(html`<my-button>Click me</my-button>`);
    expect(el).to.have.text('Click me');
    expect(el).to.have.attribute('variant', 'primary');
  });

  it('emits click event', async () => {
    const el = await fixture(html`<my-button>Click</my-button>`);
    const clickSpy = sinon.spy();
    el.addEventListener('click', clickSpy);
    
    el.click();
    
    expect(clickSpy).to.have.been.calledOnce;
    expect(clickSpy.args[0][0].detail).to.exist;
  });

  it('supports keyboard activation', async () => {
    const el = await fixture(html`<my-button>Press</my-button>`);
    const clickSpy = sinon.spy();
    el.addEventListener('click', clickSpy);
    
    el.focus();
    await sendKeys({ press: 'Enter' });
    
    expect(clickSpy).to.have.been.calledOnce;
  });

  it('respects disabled state', async () => {
    const el = await fixture(html`<my-button disabled>Disabled</my-button>`);
    const clickSpy = sinon.spy();
    el.addEventListener('click', clickSpy);
    
    el.click();
    
    expect(clickSpy).to.not.have.been.called;
    expect(el).to.have.attribute('aria-disabled', 'true');
  });
});
```

#### Accessibility Testing
```typescript
import { isAccessible } from '@open-wc/testing';

describe('Button Accessibility', () => {
  it('is accessible', async () => {
    const el = await fixture(html`<my-button>Accessible</my-button>`);
    await expect(el).to.be.accessible();
  });

  it('has proper ARIA attributes', async () => {
    const el = await fixture(html`
      <my-button loading>Loading</my-button>
    `);
    expect(el).to.have.attribute('aria-busy', 'true');
    expect(el).to.have.attribute('role', 'button');
  });
});
```

## Visual Regression Testing

### Tool: Storybook + Chromatic

#### Story Setup
```typescript
// button.stories.ts
export default {
  title: 'Atoms/Button',
  component: 'my-button',
  parameters: {
    chromatic: { 
      viewports: [320, 768, 1200],
      pauseAnimationAtEnd: true
    }
  }
};

// Visual test for all states
export const AllStates = {
  render: () => html`
    <div class="grid">
      <my-button>Default</my-button>
      <my-button variant="secondary">Secondary</my-button>
      <my-button variant="danger">Danger</my-button>
      <my-button disabled>Disabled</my-button>
      <my-button loading>Loading</my-button>
      <my-button size="sm">Small</my-button>
      <my-button size="lg">Large</my-button>
    </div>
  `
};
```

#### Chromatic Configuration
```javascript
// .chromatic.json
{
  "projectToken": "chpt_xxxxx",
  "onlyChanged": true,
  "externals": ["public/**"],
  "diffThreshold": 0.1,
  "delay": 300,
  "storybookBuildDir": "storybook-static"
}
```

## Integration Testing

### Component Interaction Tests
```typescript
// form-integration.test.ts
describe('Form Integration', () => {
  it('validates form fields on submit', async () => {
    const form = await fixture(html`
      <my-form>
        <my-input name="email" type="email" required></my-input>
        <my-button type="submit">Submit</my-button>
      </my-form>
    `);
    
    const submitSpy = sinon.spy();
    form.addEventListener('submit', submitSpy);
    
    const button = form.querySelector('my-button');
    button.click();
    
    // Should show validation error
    const input = form.querySelector('my-input');
    expect(input).to.have.attribute('error', 'Required field');
    expect(submitSpy).to.not.have.been.called;
  });
});
```

## End-to-End Testing

### Tool: Playwright

#### Cross-Framework Test Structure
```
tests/
├── e2e/
│   ├── fixtures/
│   │   ├── react-app/
│   │   ├── vue-app/
│   │   └── angular-app/
│   └── specs/
│       ├── button.spec.ts
│       ├── form.spec.ts
│       └── modal.spec.ts
```

#### Framework Integration Test
```typescript
// button.spec.ts
import { test, expect } from '@playwright/test';

const frameworks = ['react', 'vue', 'angular', 'vanilla'];

frameworks.forEach(framework => {
  test.describe(`Button - ${framework}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`http://localhost:3000/${framework}/button`);
    });

    test('renders correctly', async ({ page }) => {
      const button = page.locator('my-button');
      await expect(button).toBeVisible();
      await expect(button).toHaveText('Click me');
    });

    test('handles click events', async ({ page }) => {
      await page.locator('my-button').click();
      
      // Framework-specific event handling verification
      if (framework === 'react') {
        await expect(page.locator('#react-click-count')).toHaveText('1');
      } else if (framework === 'vue') {
        await expect(page.locator('#vue-click-count')).toHaveText('1');
      }
    });

    test('two-way data binding works', async ({ page }) => {
      if (framework === 'vanilla') return; // Skip for vanilla
      
      const input = page.locator('my-input');
      await input.fill('Test value');
      
      // Verify framework model updated
      const display = page.locator(`#${framework}-value-display`);
      await expect(display).toHaveText('Test value');
    });
  });
});
```

#### React Test App
```tsx
// fixtures/react-app/App.tsx
import { useState } from 'react';
import 'my-component-library';

function App() {
  const [clicks, setClicks] = useState(0);
  const [value, setValue] = useState('');

  return (
    <div>
      <my-button onClick={() => setClicks(clicks + 1)}>
        Click me
      </my-button>
      <div id="react-click-count">{clicks}</div>
      
      <my-input 
        value={value}
        onInput={(e) => setValue(e.detail.value)}
      />
      <div id="react-value-display">{value}</div>
    </div>
  );
}
```

#### Vue Test App
```vue
<!-- fixtures/vue-app/App.vue -->
<template>
  <div>
    <my-button @click="clicks++">Click me</my-button>
    <div id="vue-click-count">{{ clicks }}</div>
    
    <my-input v-model="value" />
    <div id="vue-value-display">{{ value }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import 'my-component-library';

const clicks = ref(0);
const value = ref('');
</script>
```

## Performance Testing

### Performance Thresholds (Hardware Baseline)
**Baseline Hardware**: Intel i5-8250U or equivalent, 8GB RAM, Chrome 120+
- **Single Component Render**: <1ms
- **1000 Components Render**: <100ms  
- **10,000 Components Memory**: <50MB
- **Initial Mount Time**: <5ms per component
- **Re-render Time**: <2ms per component
- **Event Handler Response**: <16ms (60fps)

### Benchmarking Setup
```typescript
// performance.test.ts
import { measurePerformance } from './utils/performance';

describe('Performance Benchmarks', () => {
  it('renders 1000 buttons in under 100ms', async () => {
    const result = await measurePerformance(async () => {
      const container = document.createElement('div');
      for (let i = 0; i < 1000; i++) {
        const button = document.createElement('my-button');
        button.textContent = `Button ${i}`;
        container.appendChild(button);
      }
      document.body.appendChild(container);
    });
    
    expect(result.duration).to.be.lessThan(100);
  });

  it('handles rapid state changes efficiently', async () => {
    const button = document.createElement('my-button');
    document.body.appendChild(button);
    
    const result = await measurePerformance(async () => {
      for (let i = 0; i < 100; i++) {
        button.variant = i % 2 ? 'primary' : 'secondary';
        button.disabled = i % 3 === 0;
        await button.updateComplete;
      }
    });
    
    expect(result.duration).to.be.lessThan(50);
  });
});
```

### Bundle Size Testing
```javascript
// bundle-size.test.js
import { getBundleSize } from 'bundlesize';

describe('Bundle Size Limits', () => {
  it('BaseElement + utilities under 10KB', async () => {
    const size = await getBundleSize('dist/core.js');
    expect(size).to.be.lessThan(10 * 1024);
  });

  it('individual components average 3-5KB, max 10KB', async () => {
    const components = ['button', 'input', 'modal', 'select', 'checkbox'];
    let totalSize = 0;
    
    for (const comp of components) {
      const size = await getBundleSize(`dist/components/${comp}.js`);
      expect(size).to.be.lessThan(10 * 1024); // Max 10KB
      totalSize += size;
    }
    
    const avgSize = totalSize / components.length;
    expect(avgSize).to.be.within(3 * 1024, 5 * 1024); // 3-5KB average
  });

  it('full atomic suite under 50KB', async () => {
    const size = await getBundleSize('dist/atoms.js');
    expect(size).to.be.lessThan(50 * 1024);
  });

  it('complete library under 150KB', async () => {
    const size = await getBundleSize('dist/forge-ui.js');
    expect(size).to.be.lessThan(150 * 1024);
  });
});
```

## Accessibility Testing

### Automated Testing
```typescript
// a11y.test.ts
import { axe } from '@axe-core/playwright';

test.describe('Accessibility Compliance', () => {
  test('Button meets WCAG 2.1 AA', async ({ page }) => {
    await page.goto('/components/button');
    const results = await axe(page);
    expect(results.violations).toEqual([]);
  });

  test('Modal focus management', async ({ page }) => {
    await page.goto('/components/modal');
    
    // Open modal
    await page.click('#open-modal');
    
    // Check focus moved to modal
    const focusedElement = await page.evaluate(() => 
      document.activeElement?.tagName
    );
    expect(focusedElement).toBe('MY-MODAL');
    
    // Tab through elements
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Should trap focus
    await page.keyboard.press('Tab');
    const trapped = await page.evaluate(() => 
      document.activeElement?.closest('my-modal') !== null
    );
    expect(trapped).toBe(true);
  });
});
```

### Manual Testing Checklist
```markdown
## Keyboard Navigation
- [ ] All interactive elements reachable via Tab
- [ ] Tab order follows visual flow
- [ ] Focus indicators visible
- [ ] Escape key closes modals/dropdowns
- [ ] Arrow keys work in menus/lists
- [ ] Enter/Space activate buttons

## Screen Reader
- [ ] All content announced properly
- [ ] ARIA labels meaningful
- [ ] State changes announced
- [ ] Error messages associated with inputs
- [ ] Live regions work correctly

## Visual
- [ ] 4.5:1 contrast ratio (normal text)
- [ ] 3:1 contrast ratio (large text)
- [ ] Focus indicators have sufficient contrast
- [ ] No reliance on color alone
- [ ] Animations respect prefers-reduced-motion
```

## CI/CD Testing Pipeline

### GitHub Actions Workflow
```yaml
name: Test Suite

on: [push, pull_request]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run test:unit
      - uses: codecov/codecov-action@v3

  visual-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm run build-storybook
      - uses: chromaui/action@v1
        with:
          projectToken: ${{ secrets.CHROMATIC_TOKEN }}

  e2e-tests:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        framework: [react, vue, angular, vanilla]
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm run build
      - run: npm run test:e2e:${{ matrix.framework }}

  a11y-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm run test:a11y
      - uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: a11y-report
          path: a11y-report.html

  performance-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm run test:performance
      - run: npm run analyze:bundle
```

## Testing Documentation

### Test Writing Guidelines
1. **Descriptive test names**: Use full sentences
2. **Arrange-Act-Assert**: Clear test structure
3. **One assertion per test**: When possible
4. **Test behavior, not implementation**: Focus on outcomes
5. **Clean up**: Always clean up DOM/listeners

### Coverage Requirements (Enforced in CI/CD)
- **Statements**: 90% minimum (100% target)
- **Branches**: 90% minimum (100% target)  
- **Functions**: 90% minimum (100% target)
- **Lines**: 90% minimum (100% target)
- **E2E Framework Coverage**: All 4 frameworks (React, Vue, Angular, Vanilla)
- **Visual Regression**: 100% of component states
- **Accessibility**: 100% WCAG 2.1 AA compliance

### Testing Checklist for New Components
- [ ] Unit tests for all props
- [ ] Unit tests for all events
- [ ] Unit tests for all public methods
- [ ] Accessibility tests
- [ ] Visual regression tests (all states)
- [ ] Integration tests (if applicable)
- [ ] E2E tests (all frameworks)
- [ ] Performance benchmarks
- [ ] Bundle size check