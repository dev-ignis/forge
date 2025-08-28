# ADR-003: CSS Custom Properties for Theming System

## Status
**Accepted**

## Context
A component library must provide a flexible theming system that allows consuming applications to customize the visual appearance while maintaining consistency. Traditional theming approaches include:
- Sass variables (build-time, not dynamic)
- CSS-in-JS (runtime overhead, framework-specific)
- Class-based theming (requires Light DOM, breaks encapsulation)
- Direct style overrides (fragile, breaks with updates)

With our decision to use Shadow DOM (ADR-002), we need a theming solution that:
- Penetrates Shadow DOM boundaries
- Supports runtime theme switching
- Maintains type safety where possible
- Works across all browsers
- Has minimal performance overhead

## Decision
We will use **CSS Custom Properties (CSS Variables)** as the primary theming mechanism, implementing a hierarchical token system with semantic naming conventions.

### Token Architecture:
```
Foundation Tokens → Semantic Tokens → Component Tokens
```

1. **Foundation Tokens**: Raw design values (colors, spacing, typography)
2. **Semantic Tokens**: Purpose-based aliases (primary, secondary, danger)
3. **Component Tokens**: Component-specific overrides with fallbacks

## Consequences

### Positive Consequences
- **Shadow DOM Compatibility**: CSS Custom Properties naturally cascade through Shadow DOM boundaries
- **Runtime Theming**: Themes can be switched without page reload
- **Browser Native**: No build step or JavaScript required for basic theming
- **Performance**: Efficient browser implementation, no runtime overhead
- **Developer Experience**: Intuitive API, easy to understand and debug
- **Progressive Enhancement**: Works with fallback values for older browsers
- **Framework Agnostic**: Standard CSS feature works everywhere

### Negative Consequences
- **Type Safety**: No compile-time type checking for CSS variables
- **Documentation**: Must maintain comprehensive token documentation
- **Naming Collisions**: Potential conflicts with application's CSS variables
- **Browser Support**: Requires IE11 polyfill if supporting legacy browsers
- **Validation**: No built-in validation for custom property values

## Token Structure

### Foundation Tokens
```css
:root {
  /* Colors */
  --color-blue-50: #e3f2fd;
  --color-blue-500: #2196f3;
  --color-blue-900: #0d47a1;
  
  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  
  /* Typography */
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-md: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  
  /* Borders */
  --border-radius-sm: 4px;
  --border-radius-md: 8px;
  --border-radius-lg: 16px;
  
  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.12);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.16);
  --shadow-lg: 0 10px 20px rgba(0,0,0,0.19);
}
```

### Semantic Tokens
```css
:root {
  /* Semantic Colors */
  --color-primary: var(--color-blue-500);
  --color-primary-hover: var(--color-blue-600);
  --color-secondary: var(--color-gray-500);
  --color-danger: var(--color-red-500);
  --color-success: var(--color-green-500);
  
  /* Semantic Spacing */
  --spacing-component-padding: var(--spacing-md);
  --spacing-component-margin: var(--spacing-sm);
  
  /* Semantic Typography */
  --font-size-body: var(--font-size-md);
  --font-size-heading: var(--font-size-lg);
}
```

### Component Tokens
```css
/* Inside component */
:host {
  /* Component-specific tokens with fallbacks */
  --button-background: var(--button-bg, var(--color-primary));
  --button-color: var(--button-text, white);
  --button-padding: var(--button-padding, var(--spacing-sm) var(--spacing-md));
  --button-border-radius: var(--button-radius, var(--border-radius-md));
}

.button {
  background: var(--button-background);
  color: var(--button-color);
  padding: var(--button-padding);
  border-radius: var(--button-border-radius);
}
```

## Alternatives Considered

### 1. Sass Variables
- **Pros**: Familiar to developers, good tooling support
- **Cons**: Build-time only, doesn't penetrate Shadow DOM, not dynamic

### 2. CSS-in-JS
- **Pros**: Type-safe, dynamic, powerful API
- **Cons**: Runtime overhead, framework-specific, complex setup

### 3. Class-based Theming
- **Pros**: Simple to understand, no new syntax
- **Cons**: Requires Light DOM, breaks encapsulation, naming conflicts

### 4. JavaScript-based Theming
- **Pros**: Full programmatic control, type safety
- **Cons**: Performance overhead, complex implementation, breaks CSS-only usage

## Implementation Guidelines

### Naming Convention
```
--[namespace]-[category]-[property]-[variant?]-[state?]

Examples:
--forge-color-primary
--forge-button-background-hover
--forge-spacing-component-sm
```

### Theme Switching
```javascript
// Runtime theme switching
document.documentElement.style.setProperty('--color-primary', '#ff5722');

// Or via CSS class
document.documentElement.classList.toggle('dark-theme');
```

### Dark Mode Support
```css
/* Default (light) theme */
:root {
  --color-background: white;
  --color-text: black;
}

/* Dark theme */
:root.dark-theme {
  --color-background: #121212;
  --color-text: white;
}

/* OR using media query */
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #121212;
    --color-text: white;
  }
}
```

## Documentation Requirements
1. Maintain comprehensive token documentation
2. Provide theme builder tool
3. Include migration guide from popular libraries
4. Create theme templates (light, dark, high-contrast)
5. Document component-specific tokens for each component

## Testing Considerations
- Visual regression tests for each theme
- Accessibility testing with different color schemes
- Performance testing with large token sets
- Cross-browser testing including fallback behavior

## References
- [CSS Custom Properties Specification](https://www.w3.org/TR/css-variables-1/)
- [Design Tokens W3C Community Group](https://www.w3.org/community/design-tokens/)
- Component architecture plan: `/plans/component-architecture.md`
- Related: ADR-002 (Shadow DOM Encapsulation)