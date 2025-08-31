# Testing Framework Documentation

## Overview

The Forge UI Component Library uses **Vitest** with **Happy DOM** for comprehensive testing of Web Components. This testing setup provides full Shadow DOM support, fast execution, and excellent developer experience with hot reload and interactive debugging capabilities.

**Current Test Status:** 286 tests passing (90.5% pass rate) with execution time of ~3 seconds.

## Testing Stack

### Current Configuration

**vitest.config.ts** - Main configuration:
```typescript
export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{js,ts}'],
    isolate: true,
    pool: 'forks',
    poolOptions: {
      forks: { singleFork: true } // Important for Web Components
    },
    coverage: {
      provider: 'v8',
      thresholds: { branches: 75, functions: 75, lines: 75, statements: 75 }
    }
  }
});
```

### Test Commands

```bash
# Core Testing Commands
npm test                    # Run all tests once
npm run test:watch          # Watch mode with auto-rerun  
npm run test:ui             # Interactive UI for debugging
npm run test:coverage       # Run with coverage report

# Development Commands
npm test button             # Test specific component
npm test -- --grep "AI"    # Run tests matching pattern
npm test -- --bail         # Stop on first failure
```

## Shadow DOM Testing Capabilities

### Custom Matchers

We've implemented custom Vitest matchers specifically for Shadow DOM testing:

```typescript
// Available in all tests via setup.ts
expect(element).toHaveShadowRoot()
expect(element).toContainShadowElement('.button')
```

### Test Utilities

**Location:** `/src/test/utils.ts`

Key utilities for Shadow DOM testing:

```typescript
// Component creation and lifecycle
fixture<T>(html: string): Promise<T>           // Create test components
cleanup()                                      // Clean up test fixtures

// Shadow DOM interaction  
waitForShadowElement(host, selector, timeout)  // Wait for shadow elements
shadowClick(element)                           // Click through Shadow DOM
getShadowText(host, selector?)                 // Get text from shadow
queryShadowDeep(host, ...selectors)           // Query nested shadow roots
```

### Vitest-Chai Compatibility

**Location:** `/src/test/test-helpers.ts` and `/src/test/vitest-chai-fix.ts`

To maintain compatibility with existing `@open-wc/testing` code, we provide:

```typescript
// Mock function helpers with Chai compatibility
createSpy()                    // Creates vi.fn() with Chai properties
spyOn(object, method)         // Wraps vi.spyOn with Chai compatibility

// Keyboard event helpers
createKeyboardEvent(key, type)   // Create composed keyboard events
sendKeys({ press: 'Enter' })     // Send keys through Shadow DOM
```

### Test Setup

**Location:** `/src/test/setup.ts`

Automatic setup includes:
- Happy DOM environment activation
- Custom element registration deduplication
- Shadow DOM custom matchers
- Vitest-Chai compatibility layer

## Test Structure and Organization

### Standard Component Test Structure

```typescript
import { fixture, expect, html } from '@open-wc/testing';
import { vi } from 'vitest';
import { createSpy, spyOn } from '../../../test/test-helpers';
import './component-name';
import type { ComponentName } from './component-name';

describe('ComponentName', () => {
  afterEach(() => {
    vi.restoreAllMocks(); // Clean up mocks between tests
  });

  describe('Basic Rendering', () => {
    it('should render with default properties', async () => {
      const el = await fixture<ComponentName>(html`
        <forge-component></forge-component>
      `);
      
      expect(el).to.exist;
      expect(el.someProperty).to.equal('default-value');
    });
  });

  describe('Shadow DOM Interaction', () => {
    it('should interact with shadow elements', async () => {
      const el = await fixture<ComponentName>(html`
        <forge-component></forge-component>
      `);
      
      await el.updateComplete;
      
      // Using custom matcher
      expect(el).toHaveShadowRoot();
      expect(el).toContainShadowElement('.internal-button');
      
      // Using utility functions
      const button = el.shadowRoot?.querySelector('.internal-button');
      shadowClick(button);
      
      const text = getShadowText(el, '.status');
      expect(text).to.equal('clicked');
    });
  });

  describe('Events and Interaction', () => {
    it('should handle keyboard events', async () => {
      const el = await fixture<ComponentName>(html`
        <forge-component></forge-component>
      `);
      
      const handler = createSpy();
      el.addEventListener('forge-change', handler);
      
      await sendKeys({ press: 'Enter' });
      expect(handler).to.have.been.calledOnce;
    });
  });
});
```

## Test Categories

### 1. Component Registration and Basic Rendering
- Custom element registration
- Default property values
- Shadow DOM creation
- Template rendering

### 2. Property and Attribute Testing  
- Property getters/setters
- Attribute reflection
- Type validation
- Default values

### 3. Shadow DOM Interaction
- Internal element queries
- Event handling through shadow boundaries
- Slot content distribution
- Style encapsulation

### 4. Event Testing
- Custom event emission
- Event bubbling through Shadow DOM
- Keyboard event handling
- Form integration

### 5. Accessibility Testing
- ARIA attributes
- Keyboard navigation
- Focus management  
- Screen reader support

### 6. AI Features Testing
- Semantic role attributes
- AI context metadata
- Auto-generated descriptions
- Action discovery

### 7. Performance Testing  
- Render timing
- Performance budgets
- Degradation handling
- Resource monitoring

## Writing Tests

### Using Mock Functions
```typescript
import { createSpy } from '../../../test/test-helpers';
const mockFn = createSpy();
```

### Spying on Methods
```typescript
import { spyOn } from '../../../test/test-helpers';
const consoleSpy = spyOn(console, 'warn');
```

### Keyboard Events
```typescript
await sendKeys({ press: 'Enter', target: element });
```

## Coverage and Quality Metrics

### Current Coverage
- **Overall:** 90.5% pass rate (286/316 tests)
- **Execution time:** ~3 seconds
- **Components covered:** 9 atomic components

### Coverage Thresholds
```typescript
coverage: {
  thresholds: {
    branches: 75,
    functions: 75, 
    lines: 75,
    statements: 75
  }
}
```

### Test Exclusions
Coverage excludes:
- `node_modules/`
- `src/test/` (test utilities)
- `*.config.*` (configuration files)
- `**/*.d.ts` (type definitions)
- `**/*.stories.ts` (Storybook stories)
- `**/index.ts` (barrel exports)

## Known Issues and Solutions

### Common Test Issues

#### 1. Console Method Spying
- **Issue:** Console method spying doesn't work with Chai expectations
- **Solution:** Use the enhanced `spyOn` helper from test utilities

#### 2. Event Timing  
- **Issue:** Auto-dismiss timer tests and event dispatch timing
- **Solution:** Use `vi.useFakeTimers()` and `vi.advanceTimersByTime()`

#### 3. Icon Registry
- **Issue:** Icon loading from registry and error handling
- **Solution:** Mock icon registry in test setup

#### 4. Shadow DOM Interaction
- **Issue:** Keyboard event handling and click propagation in Shadow DOM
- **Solution:** Use Shadow DOM event simulation utilities

### Performance Optimizations

The single fork configuration in Vitest ensures:
- Consistent custom element registration
- Proper Shadow DOM cleanup between tests
- No cross-test contamination
- Reliable event handling

```typescript
poolOptions: {
  forks: {
    singleFork: true // Critical for Web Components
  }
}
```

## Advanced Testing Patterns

### Testing Custom Elements Registration
```typescript
describe('Component Registration', () => {
  it('should prevent duplicate registration', () => {
    // Our setup.ts handles this automatically
    expect(() => {
      customElements.define('forge-button', ForgeButton);
      customElements.define('forge-button', ForgeButton); // Should not throw
    }).not.to.throw();
  });
});
```

### Testing Slot Distribution
```typescript
describe('Slot Content', () => {
  it('should distribute slotted content correctly', async () => {
    const el = await fixture(html`
      <forge-button>
        <span slot="icon">🚀</span>
        Launch
      </forge-button>
    `);

    const iconSlot = el.shadowRoot?.querySelector('slot[name="icon"]');
    const assignedNodes = iconSlot?.assignedNodes();
    
    expect(assignedNodes).to.have.length(1);
    expect(assignedNodes[0].textContent).to.equal('🚀');
  });
});
```

### Testing Deep Shadow DOM
```typescript
describe('Nested Shadow DOM', () => {
  it('should query through multiple shadow levels', async () => {
    const el = await fixture(html`<forge-complex-component></forge-complex-component>`);
    
    // Query through nested shadow roots
    const deepElement = queryShadowDeep(
      el, 
      '.first-level', 
      'forge-nested-component',
      '.deep-element'
    );
    
    expect(deepElement).to.exist;
  });
});
```

### Testing Performance Degradation
```typescript
describe('Performance', () => {
  it('should apply degradation when slow', async () => {
    const el = await fixture(html`<forge-component></forge-component>`);
    
    // Mock slow rendering
    const consoleSpy = spyOn(console, 'warn');
    el.maxRenderMs = 16;
    
    // Simulate slow render
    Object.defineProperty(el, 'renderTime', { value: 100 });
    el['checkPerformance']();
    
    expect(consoleSpy).to.have.been.called;
    expect(el.performanceMode).to.equal('fast');
  });
});
```

## Developer Experience Features

### Interactive Testing UI
```bash
npm run test:ui
```
- Visual test runner interface
- Real-time test execution
- Interactive debugging
- File watching with instant feedback

### Hot Reload Testing
```bash
npm run test:watch
```
- Automatic test re-execution on file changes
- Smart test selection based on changed files
- Fast feedback loop for development

### Coverage Analysis
```bash
npm run test:coverage
```
- Generates HTML coverage reports
- Line-by-line coverage visualization
- Identifies untested code paths
- Tracks coverage trends

## Debugging Tests

### Using Vitest UI for Debugging
```bash
npm run test:ui
```
1. Open the interactive interface
2. Click on failing tests to see details
3. Use the console panel for debugging
4. View test execution timeline

### Console Debugging
```typescript
it('should debug component state', async () => {
  const el = await fixture(html`<forge-component></forge-component>`);
  
  // Debug current state
  console.log('Element state:', {
    properties: { ...el },
    shadowHTML: el.shadowRoot?.innerHTML,
    attributes: [...el.attributes]
  });
  
  // Proceed with test assertions
});
```

### Memory Leak Detection
```typescript
afterEach(() => {
  // Clean up DOM
  document.body.innerHTML = '';
  
  // Restore all mocks
  vi.restoreAllMocks();
  
  // Clear timers
  vi.clearAllTimers();
});
```

## Best Practices

### 1. Test Isolation
- Use `afterEach` for cleanup
- Avoid shared state between tests
- Mock external dependencies

### 2. Shadow DOM Testing
- Always wait for `updateComplete` on Lit elements
- Use custom matchers for Shadow DOM queries
- Test both light and shadow DOM content

### 3. Event Testing
- Create composed events for Shadow DOM
- Test both synthetic and real user events
- Verify event payload and timing

### 4. Async Testing
- Always await async operations
- Use proper timeout handling
- Test loading and error states

### 5. Performance Testing
- Set realistic performance budgets
- Test degradation scenarios
- Monitor render timing

## Resources

### Documentation
- [Vitest Documentation](https://vitest.dev/)
- [Happy DOM Documentation](https://github.com/capricorn86/happy-dom)
- [Open WC Testing](https://open-wc.org/docs/testing/testing-package/)
- [Web Components Testing Guide](https://web.dev/testing-web-components/)

### Internal Resources
- Test utilities: `/src/test/`
- Component tests: `/src/components/atoms/*/**.test.ts`
- Configuration: `vitest.config.ts`
- Coverage reports: `/coverage/index.html`

