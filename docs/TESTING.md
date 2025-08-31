# Testing Documentation

## Overview

The Forge UI Component Library maintains comprehensive test coverage (93.77%) across all components using modern testing frameworks and best practices.

## Test Coverage Summary

| Component | Coverage | Test Files | Assertions |
|-----------|----------|------------|------------|
| Alert | 98.20% | alert.test.ts | 340+ |
| Badge | 96.37% | badge.test.ts | 381+ |
| Button | 94.17% | button.test.ts | 261+ |
| Checkbox | 97.87% | checkbox.test.ts | 393+ |
| Icon | 94.09% | icon.test.ts | 288+ |
| Input | 88.29% | input.test.ts | 322+ |
| Switch | 96.93% | switch.test.ts | 498+ |
| RadioGroup | Tests ✅ | radio-group.test.ts | Comprehensive |
| Select | Tests ✅ | select.test.ts | Comprehensive |
| **Overall** | **93.77%** | **All Tests** | **3,192+** |

## Testing Stack

### Frameworks and Tools

- **Vitest** (v3.2.4) - Unit testing framework with browser support
- **Web Test Runner** - Component integration testing
- **Playwright** (v1.55.0) - End-to-end testing capability
- **@open-wc/testing** - Web Components testing utilities
- **@vitest/coverage-v8** - Code coverage reporting

### Configuration Files

```bash
web-test-runner.config.mjs  # Browser testing configuration
vite.config.ts              # Vitest configuration
playwright.config.ts        # E2E test configuration
```

## Running Tests

### All Tests
```bash
npm test                    # Run all tests with coverage
npm run test:watch         # Run tests in watch mode
npm run test:coverage      # Generate coverage report
```

### Specific Test Suites
```bash
npm test button            # Test specific component
npm test -- --grep "AI"   # Run tests matching pattern
npm test -- --bail        # Stop on first failure
```

### Coverage Reports
```bash
npm run test:coverage      # Generate coverage report
open coverage/index.html   # View HTML coverage report
```

## Test Structure

### Component Test Organization

Each component test file follows this structure:

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fixture, html, expect as litExpect } from '@open-wc/testing';
import './component-name';
import type { ComponentName } from './component-name';

describe('ComponentName', () => {
  let element: ComponentName;

  beforeEach(async () => {
    element = await fixture<ComponentName>(html`
      <forge-component></forge-component>
    `);
  });

  describe('Initialization', () => {
    // Default state tests
  });

  describe('Properties', () => {
    // Property behavior tests
  });

  describe('Methods', () => {
    // Public API tests
  });

  describe('Events', () => {
    // Event emission tests
  });

  describe('Accessibility', () => {
    // ARIA and keyboard tests
  });

  describe('AI Features', () => {
    // AI metadata and helper tests
  });

  describe('Performance', () => {
    // Performance monitoring tests
  });
});
```

## Test Categories

### 1. Unit Tests

Test individual component functionality:

```typescript
describe('Button Component', () => {
  it('should render with default properties', () => {
    expect(element.variant).to.equal('primary');
    expect(element.size).to.equal('md');
    expect(element.disabled).to.be.false;
  });

  it('should handle click events', async () => {
    const clickHandler = vi.fn();
    element.addEventListener('click', clickHandler);
    
    element.click();
    expect(clickHandler).to.have.been.calledOnce;
  });
});
```

### 2. Integration Tests

Test component interactions:

```typescript
describe('Form Integration', () => {
  it('should work with form submission', async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <forge-input name="email" required></forge-input>
        <forge-button type="submit">Submit</forge-button>
      </form>
    `);

    const submitHandler = vi.fn(e => e.preventDefault());
    form.addEventListener('submit', submitHandler);

    const button = form.querySelector('forge-button');
    button?.click();

    expect(submitHandler).to.have.been.called;
  });
});
```

### 3. Accessibility Tests

Ensure WCAG 2.1 AA compliance:

```typescript
describe('Accessibility', () => {
  it('should have proper ARIA attributes', () => {
    element.disabled = true;
    expect(element.getAttribute('aria-disabled')).to.equal('true');
  });

  it('should be keyboard navigable', async () => {
    const focusHandler = vi.fn();
    element.addEventListener('focus', focusHandler);

    element.focus();
    expect(document.activeElement).to.equal(element);
    expect(focusHandler).to.have.been.called;
  });

  it('should handle keyboard events', async () => {
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    element.dispatchEvent(event);
    
    // Verify expected behavior
  });
});
```

### 4. AI Feature Tests

Test AI-ready architecture:

```typescript
describe('AI Features', () => {
  it('should provide AI metadata', () => {
    expect(element.aiMetadata).to.deep.equal({
      purpose: 'Interactive button for user actions',
      dataType: 'action',
      criticality: 'medium',
      semanticRole: 'button'
    });
  });

  it('should describe itself to AI', () => {
    element.variant = 'danger';
    element.label = 'Delete';
    
    const description = element.getAIDescription();
    expect(description).to.include('danger');
    expect(description).to.include('Delete');
  });

  it('should list possible actions', () => {
    const actions = element.getPossibleActions();
    
    expect(actions).to.be.an('array');
    expect(actions[0]).to.have.property('name');
    expect(actions[0]).to.have.property('available');
  });
});
```

### 5. Performance Tests

Verify performance characteristics:

```typescript
describe('Performance', () => {
  it('should render within budget', async () => {
    element.maxRenderMs = 16;
    element.value = 'new value';
    await element.updateComplete;
    
    expect(element.renderTime).to.be.lessThan(16);
  });

  it('should track render count', async () => {
    const initialCount = element.renderCount;
    
    element.value = 'test';
    await element.updateComplete;
    
    expect(element.renderCount).to.equal(initialCount + 1);
  });

  it('should apply degradation when slow', () => {
    element.renderTime = 100;
    element.maxRenderMs = 16;
    element.warnOnViolation = true;
    
    const consoleSpy = vi.spyOn(console, 'warn');
    element['checkPerformance'](0);
    
    expect(consoleSpy).to.have.been.called;
    expect(element.performanceMode).to.equal('fast');
  });
});
```

### 6. Visual Regression Tests

Test visual appearance (planned with Chromatic):

```typescript
describe('Visual Tests', () => {
  it('should match visual snapshot', async () => {
    const element = await fixture(html`
      <forge-button variant="primary" size="lg">
        Large Button
      </forge-button>
    `);

    await expect(element).to.matchSnapshot();
  });
});
```

## Test Utilities

### Custom Test Helpers

```typescript
// test-utils.ts
export async function createComponent<T>(
  tag: string,
  props: Record<string, any> = {}
): Promise<T> {
  const element = document.createElement(tag) as T;
  Object.assign(element, props);
  document.body.appendChild(element);
  await (element as any).updateComplete;
  return element;
}

export function triggerEvent(
  element: Element,
  eventName: string,
  detail = {}
): void {
  const event = new CustomEvent(eventName, {
    detail,
    bubbles: true,
    composed: true
  });
  element.dispatchEvent(event);
}

export async function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

### Mock Data

```typescript
// test-data.ts
export const mockOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3', disabled: true }
];

export const mockFormData = {
  name: 'John Doe',
  email: 'john@example.com',
  password: 'secure123'
};
```

## Coverage Requirements

### Minimum Coverage Targets

- **Statements**: 90%
- **Branches**: 85%
- **Functions**: 90%
- **Lines**: 90%

### Excluding from Coverage

```typescript
/* c8 ignore start */
// Code excluded from coverage
private debugMethod() {
  console.log('Debug info');
}
/* c8 ignore stop */
```

## Continuous Integration

### GitHub Actions Workflow

```yaml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm test
      - uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
```

## Best Practices

### 1. Test Isolation
- Each test should be independent
- Clean up after tests (event listeners, timers)
- Use `beforeEach` for consistent setup

### 2. Async Testing
```typescript
it('should handle async operations', async () => {
  const promise = element.loadData();
  await expect(promise).resolves.toBeDefined();
});
```

### 3. Event Testing
```typescript
it('should emit custom events', async () => {
  const eventPromise = new Promise(resolve => {
    element.addEventListener('forge-change', resolve, { once: true });
  });

  element.value = 'new';
  const event = await eventPromise;
  
  expect(event.detail).to.deep.equal({ value: 'new' });
});
```

### 4. Error Handling
```typescript
it('should handle errors gracefully', () => {
  expect(() => element.setValue(null)).not.to.throw();
  expect(element.error).to.be.true;
  expect(element.errorMessage).to.include('Invalid');
});
```

### 5. Snapshot Testing
```typescript
it('should match DOM snapshot', async () => {
  element.variant = 'primary';
  element.size = 'lg';
  await element.updateComplete;
  
  expect(element.shadowRoot).to.matchSnapshot();
});
```

## Debugging Tests

### Debug Mode
```bash
npm test -- --inspect-brk     # Debug with Chrome DevTools
npm test -- --reporter=verbose # Verbose output
```

### Browser Testing
```bash
npm run test:browser           # Run tests in real browser
npm run test:browser:debug     # Open browser for debugging
```

### Coverage Gaps
```bash
npm run test:coverage -- --reporter=text
# Shows uncovered lines in terminal
```

## Common Test Patterns

### Testing Slots
```typescript
it('should render slotted content', async () => {
  const element = await fixture(html`
    <forge-button>
      <span slot="icon">👍</span>
      Click Me
    </forge-button>
  `);

  const slot = element.shadowRoot?.querySelector('slot[name="icon"]');
  const nodes = slot?.assignedNodes();
  
  expect(nodes).to.have.length(1);
  expect(nodes[0].textContent).to.equal('👍');
});
```

### Testing Computed Properties
```typescript
it('should compute derived state', () => {
  element.value = 150;
  element.maxValue = 100;
  
  expect(element.displayValue).to.equal('100+');
  expect(element.isOverMax).to.be.true;
});
```

### Testing Lifecycle
```typescript
it('should cleanup on disconnect', () => {
  const cleanupSpy = vi.spyOn(element, 'cleanup');
  
  element.remove();
  
  expect(cleanupSpy).to.have.been.called;
  expect(element.listeners.size).to.equal(0);
});
```

## Troubleshooting

### Common Issues

1. **Async timing issues**
   ```typescript
   // Wait for update complete
   await element.updateComplete;
   ```

2. **Shadow DOM queries**
   ```typescript
   // Use shadowRoot for internal elements
   const button = element.shadowRoot?.querySelector('button');
   ```

3. **Event bubbling**
   ```typescript
   // Ensure composed events for Shadow DOM
   new CustomEvent('event', { composed: true, bubbles: true });
   ```

4. **Memory leaks**
   ```typescript
   afterEach(() => {
     // Clean up elements
     document.body.innerHTML = '';
   });
   ```

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Web Test Runner Guide](https://modern-web.dev/docs/test-runner/overview/)
- [Open WC Testing](https://open-wc.org/docs/testing/testing-package/)
- [Playwright Documentation](https://playwright.dev/)
- [Coverage Reports](./coverage/lcov-report/index.html)