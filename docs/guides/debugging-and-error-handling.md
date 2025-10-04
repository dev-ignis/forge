# Debugging and Error Handling Guide

This guide covers the comprehensive debugging utilities and error handling system in Forge, designed to help developers build, test, and troubleshoot components efficiently.

## Table of Contents

1. [Debugging Utilities](#debugging-utilities)
2. [Error Handling](#error-handling)
3. [Best Practices](#best-practices)
4. [Examples](#examples)

---

## Debugging Utilities

Forge provides a comprehensive set of debugging tools accessible via `@nexcraft/forge/utils` or globally in the browser console via `window.__FORGE_DEBUG__`.

### Global Debug Mode

Enable debug mode for all components to get detailed logging:

```ts
import { enableGlobalDebug, disableGlobalDebug } from '@nexcraft/forge/utils';

// Enable debug mode
enableGlobalDebug();

// Your components will now log debug information
const button = document.querySelector('forge-button');

// Disable when done
disableGlobalDebug();
```

In the browser console:

```js
window.__FORGE_DEBUG__.enableGlobalDebug();
```

### Component Inspection

Debug individual components to see their full state:

```ts
import { debugComponent } from '@nexcraft/forge/utils';

const button = document.querySelector('forge-button');
debugComponent(button);

// Output:
// 🔍 Debug: <forge-button>
//   📋 Properties: { variant: 'primary', size: 'md', ... }
//   🏷️  Attributes: { variant: 'primary', ... }
//   🔄 State: { isPressed: false, ... }
//   ⚡ Performance: { renderTime: 2.5ms, renderCount: 3 }
//   🤖 AI State: { ... }
```

### Watch Property Changes

Monitor specific properties for changes:

```ts
import { watchComponent } from '@nexcraft/forge/utils';

const input = document.querySelector('forge-input');

// Watch specific properties
const unwatch = watchComponent(input, ['value', 'disabled'], (property, oldValue, newValue) => {
  console.log(`${property} changed from ${oldValue} to ${newValue}`);
});

// Stop watching when done
unwatch();
```

### Performance Profiling

Measure render performance over multiple renders:

```ts
import { profileComponent } from '@nexcraft/forge/utils';

const dataTable = document.querySelector('forge-data-table');

// Profile 20 renders
const metrics = await profileComponent(dataTable, 20);

// Results:
// {
//   average: 5.2,   // ms
//   min: 4.1,       // ms
//   max: 8.3,       // ms
//   total: 104.0    // ms
// }
```

### AI Capabilities

Explore AI-ready methods on components:

```ts
import { getAICapabilities } from '@nexcraft/forge/utils';

const modal = document.querySelector('forge-modal');
const capabilities = getAICapabilities(modal);

// Output:
// 🤖 AI Capabilities: <forge-modal>
//   Available Actions: [
//     { name: 'open', description: '...', available: true },
//     { name: 'close', description: '...', available: true }
//   ]
//   Current State: { open: false, ... }
//   State Explanation: { ... }
```

### Performance Reports

Generate a performance overview of all components:

```ts
import { generatePerformanceReport } from '@nexcraft/forge/utils';

generatePerformanceReport();

// Output:
// ⚡ Performance Report
//   Total components: 45
//   Components with metrics: 38
//   Slowest component: forge-data-grid (12.5ms)
```

### Get All Forge Components

Find all Forge components on the page:

```ts
import { getAllForgeComponents } from '@nexcraft/forge/utils';

const components = getAllForgeComponents();
console.log(`Found ${components.length} Forge components`);
```

### Debug All Components

Get a quick overview of all components:

```ts
import { debugAllComponents } from '@nexcraft/forge/utils';

debugAllComponents();

// Output: Table showing all components with their stats
```

---

## Error Handling

Forge provides a comprehensive error handling system with contextual messages and helpful suggestions.

### ForgeError Class

All Forge-specific errors extend the `ForgeError` class:

```ts
import { ForgeError } from '@nexcraft/forge/utils';

try {
  // Some operation
} catch (error) {
  if (error instanceof ForgeError) {
    console.log(error.component); // Component name
    console.log(error.context); // Additional context
  }
}
```

### Validation Errors

Validate property values with helpful error messages:

```ts
import { throwValidationError, assertOneOf } from '@nexcraft/forge/utils';

// Manual validation
if (!['primary', 'secondary', 'ghost'].includes(variant)) {
  throwValidationError('ForgeButton', 'variant', variant, ['primary', 'secondary', 'ghost']);
}

// Assertion helper
assertOneOf(variant, ['primary', 'secondary', 'ghost'], 'ForgeButton', 'variant');
```

### Required Properties

Ensure required properties are provided:

```ts
import { throwRequiredPropertyError, assertDefined } from '@nexcraft/forge/utils';

// Manual check
if (!this.data) {
  throwRequiredPropertyError('ForgeDataTable', 'data');
}

// Assertion helper
assertDefined(this.data, 'ForgeDataTable', 'data');
```

### Network Errors

Enhanced error messages for fetch operations:

```ts
import { throwFetchError } from '@nexcraft/forge/utils';

const response = await fetch(url);
if (!response.ok) {
  throwFetchError('ForgeIcon', url, response.status, response.statusText);
}

// Error output:
// [ForgeIcon] Failed to fetch resource
//   Received: 404 Not Found
//   Expected: 200 OK
//   💡 Suggestion: Check that the URL is correct and the resource exists
//   📖 Docs: https://example.com/icon.svg
```

### Invalid SVG Errors

Specialized error for SVG validation:

```ts
import { throwInvalidSVGError } from '@nexcraft/forge/utils';

if (!svg) {
  throwInvalidSVGError('ForgeIcon', 'No <svg> element found');
}

// Error output:
// [ForgeIcon] Invalid SVG content
//   Received: No <svg> element found
//   Expected: Valid SVG markup
//   💡 Suggestion: Ensure the file contains valid SVG XML with an <svg> root element
```

### Warnings

Provide helpful warnings without breaking execution:

```ts
import { warnDeprecated, warnPerformance, warnAccessibility } from '@nexcraft/forge/utils';

// Deprecation warning
warnDeprecated('ForgeButton', 'color', 'variant', '1.0.0');
// Output: [ForgeButton] "color" is deprecated and will be removed in v1.0.0
//         💡 Use "variant" instead

// Performance warning
warnPerformance(
  'ForgeDataGrid',
  'Large dataset without virtualization',
  'Enable virtual scrolling for datasets over 100 rows',
);

// Accessibility warning
warnAccessibility('ForgeButton', 'Icon-only button without label', 'Add aria-label attribute');
```

### Type Assertions

Validate types with helpful messages:

```ts
import { assertType } from '@nexcraft/forge/utils';

assertType(value, 'string', 'ForgeInput', 'value');
assertType(options, 'array', 'ForgeSelect', 'options');
```

### Generic Assertions

Assert any condition with custom error messages:

```ts
import { assert } from '@nexcraft/forge/utils';

assert(width > 0 && height > 0, 'ForgeIcon', 'Icon dimensions must be positive', {
  received: `${width}x${height}`,
  expected: 'positive numbers',
  suggestion: 'Check the size property',
});
```

### Error Logging

Log errors with full context:

```ts
import { logError } from '@nexcraft/forge/utils';

try {
  // Something that might fail
} catch (error) {
  logError(error, 'ForgeModal');
  // Logs with grouped output and full context
}
```

### Friendly Error Messages

Convert technical errors to user-friendly messages:

```ts
import { getFriendlyErrorMessage } from '@nexcraft/forge/utils';

try {
  JSON.parse(badJson);
} catch (error) {
  const friendly = getFriendlyErrorMessage(error);
  console.log(friendly);
  // Output: "❌ Invalid JSON: The response was not valid JSON."
}
```

---

## Best Practices

### 1. Enable Debug Mode During Development

```ts
// In your app initialization
if (import.meta.env.DEV) {
  import('@nexcraft/forge/utils').then(({ enableGlobalDebug }) => {
    enableGlobalDebug();
  });
}
```

### 2. Use Specific Error Types

```ts
// ❌ Don't use generic errors
throw new Error('Invalid variant');

// ✅ Use specific error utilities
throwValidationError('ForgeButton', 'variant', value, validVariants);
```

### 3. Provide Context and Suggestions

```ts
// ❌ Minimal information
throw new Error('Invalid size');

// ✅ Rich context
throw createComponentError('ForgeIcon', 'Invalid icon size', {
  received: size,
  expected: ['xs', 'sm', 'md', 'lg', 'xl'],
  suggestion: 'Use one of the predefined size values',
  docs: 'https://forge.dev/components/icon#sizes',
});
```

### 4. Profile Performance Issues

```ts
// If a component feels slow, profile it
const metrics = await profileComponent(element, 50);
if (metrics.average > 16) {
  console.warn(`Component is rendering slowly: ${metrics.average}ms`);
}
```

### 5. Watch Critical Properties

```ts
// Monitor critical state changes during debugging
const unwatch = watchComponent(form, ['valid', 'dirty', 'submitted'], (prop, old, val) =>
  console.log(`Form ${prop}: ${old} → ${val}`),
);
```

---

## Examples

### Example 1: Debugging a Form

```ts
import { debugComponent, watchComponent } from '@nexcraft/forge/utils';

// Initial state inspection
const form = document.querySelector('forge-form-field');
debugComponent(form);

// Watch for validation changes
const unwatch = watchComponent(form, ['valid', 'error'], (property, oldValue, newValue) => {
  console.log(`Validation changed: ${property} = ${newValue}`);
});

// Later: stop watching
unwatch();
```

### Example 2: Error Handling in Custom Component

```ts
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { assertOneOf, throwRequiredPropertyError, warnDeprecated } from '@nexcraft/forge/utils';

@customElement('my-component')
export class MyComponent extends LitElement {
  @property() variant: 'primary' | 'secondary' = 'primary';
  @property() data?: unknown[];

  updated(changed: PropertyValues) {
    if (changed.has('variant')) {
      assertOneOf(this.variant, ['primary', 'secondary'], 'MyComponent', 'variant');
    }
  }

  render() {
    if (!this.data) {
      throwRequiredPropertyError('MyComponent', 'data');
    }

    // Render component...
  }
}
```

### Example 3: Performance Debugging

```ts
import { generatePerformanceReport, profileComponent } from '@nexcraft/forge/utils';

// Overview of all components
generatePerformanceReport();

// Deep dive on slow component
const table = document.querySelector('forge-data-table');
const metrics = await profileComponent(table, 100);

console.log(`Average render: ${metrics.average.toFixed(2)}ms`);
console.log(`95th percentile: ${metrics.max.toFixed(2)}ms`);

if (metrics.average > 16) {
  console.warn('Component exceeds 16ms budget - consider optimization');
}
```

### Example 4: Browser Console Debugging

Open your browser console and use the global debug utilities:

```js
// Enable debug mode
window.__FORGE_DEBUG__.enableGlobalDebug();

// Inspect a component
const btn = document.querySelector('forge-button');
window.__FORGE_DEBUG__.debugComponent(btn);

// Check AI capabilities
window.__FORGE_DEBUG__.getAICapabilities(btn);

// Performance report
window.__FORGE_DEBUG__.generatePerformanceReport();

// Get all components
const all = window.__FORGE_DEBUG__.getAllForgeComponents();
console.log(`Found ${all.length} components`);
```

---

## API Reference

### Debug Functions

| Function                                          | Description                             |
| ------------------------------------------------- | --------------------------------------- |
| `enableGlobalDebug()`                             | Enable debug logging for all components |
| `disableGlobalDebug()`                            | Disable global debug logging            |
| `isGlobalDebugEnabled()`                          | Check if debug mode is enabled          |
| `debugComponent(element, options?)`               | Inspect a component's state             |
| `watchComponent(element, properties?, callback?)` | Monitor property changes                |
| `profileComponent(element, iterations?)`          | Measure render performance              |
| `getAICapabilities(element)`                      | Get AI actions and state                |
| `getAllForgeComponents()`                         | Get all Forge components on page        |
| `debugAllComponents(options?)`                    | Debug all components at once            |
| `generatePerformanceReport()`                     | Generate performance overview           |
| `getDebugInfo(element, options?)`                 | Get debug data without logging          |

### Error Functions

| Function                                                        | Description                   |
| --------------------------------------------------------------- | ----------------------------- |
| `createComponentError(component, message, context?)`            | Create a ForgeError           |
| `throwValidationError(component, property, received, expected)` | Throw validation error        |
| `throwRequiredPropertyError(component, property)`               | Throw required property error |
| `throwFetchError(component, url, status, statusText)`           | Throw network error           |
| `throwInvalidSVGError(component, reason?)`                      | Throw SVG validation error    |
| `throwCompatibilityError(component, feature)`                   | Throw compatibility error     |
| `warnDeprecated(component, deprecated, replacement?, version?)` | Log deprecation warning       |
| `warnPerformance(component, issue, suggestion)`                 | Log performance warning       |
| `warnAccessibility(component, issue, suggestion)`               | Log a11y warning              |
| `assert(condition, component, message, context?)`               | Assert a condition            |
| `assertOneOf(value, allowed, component, property)`              | Assert value is in list       |
| `assertType(value, expectedType, component, property)`          | Assert value type             |
| `assertDefined(value, component, property)`                     | Assert not null/undefined     |
| `getFriendlyErrorMessage(error)`                                | Get user-friendly message     |
| `logError(error, component?)`                                   | Log error with context        |

---

## Related Documentation

- [Performance Monitoring](../performance-monitoring.md)
- [Testing Guidelines](../TESTING.md)
- [Developer Guide](../DEVELOPER_GUIDE.md)
- [AI-Native Development](./ai-native-development.md)
