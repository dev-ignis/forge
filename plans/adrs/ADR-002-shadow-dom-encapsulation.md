# ADR-002: Shadow DOM for Style Encapsulation

## Status
**Accepted**

## Context
Web Components offer two rendering modes: Light DOM and Shadow DOM. The choice between them has significant implications for:
- Style encapsulation and isolation
- CSS framework compatibility
- Component theming capabilities
- Global style inheritance
- Developer experience when customizing components

Many component libraries have chosen to forgo Shadow DOM to allow easier style overrides, but this compromises one of the core benefits of Web Components: true style encapsulation. Without Shadow DOM, components are vulnerable to:
- Unintended style leakage from global stylesheets
- CSS naming conflicts
- Brittle styling that breaks when global styles change
- Difficulty maintaining consistent component appearance

## Decision
We will use **Shadow DOM by default** for all components in the library, with a multi-layered styling API to enable customization while maintaining encapsulation.

### Implementation Strategy:
1. All components will call `this.attachShadow({ mode: 'open' })` in their constructor
2. CSS Custom Properties will be the primary theming mechanism
3. The `::part()` pseudo-element will expose specific elements for targeted styling
4. Slots will enable composition-based customization

## Consequences

### Positive Consequences
- **True Style Isolation**: Component styles cannot leak out, application styles cannot leak in
- **Predictable Styling**: Components look and behave consistently regardless of consuming application styles
- **Reduced Debugging**: No mysterious style conflicts or cascade issues
- **Performance**: Browser can optimize rendering with isolated style scopes
- **Maintainability**: Component styles can be modified without fear of breaking consuming applications
- **Security**: Provides a degree of DOM isolation that prevents accidental manipulation

### Negative Consequences
- **CSS Framework Incompatibility**: Some CSS frameworks (e.g., Tailwind) require additional configuration
- **Learning Curve**: Developers unfamiliar with Shadow DOM need education on customization patterns
- **Form Participation**: Form elements in Shadow DOM require additional work for native form participation
- **Third-party Integration**: Some third-party libraries may not work correctly with Shadow DOM
- **Global Font Loading**: Fonts must be explicitly imported or inherited through CSS Custom Properties

## Alternatives Considered

### 1. Light DOM Only
- **Pros**: Easier integration with existing CSS, familiar to developers
- **Cons**: No style isolation, naming conflicts, fragile styles

### 2. Optional Shadow DOM (configurable per component)
- **Pros**: Flexibility for different use cases
- **Cons**: Increased complexity, inconsistent behavior, harder to maintain

### 3. Scoped CSS without Shadow DOM
- **Pros**: Some isolation without Shadow DOM limitations
- **Cons**: Not true encapsulation, requires build-time processing, still vulnerable to global styles

### 4. CSS-in-JS Solutions
- **Pros**: Dynamic styling, no Shadow DOM needed
- **Cons**: Runtime overhead, framework-specific, larger bundle size

## Styling Architecture

### 1. CSS Custom Properties for Theming
```css
:root {
  --color-primary: #2196f3;
  --spacing-unit: 8px;
  --border-radius: 4px;
}

/* Inside component */
.button {
  background: var(--button-bg, var(--color-primary));
  padding: var(--spacing-unit);
  border-radius: var(--border-radius);
}
```

### 2. ::part() for Targeted Customization
```html
<!-- Component template -->
<button part="button">
  <span part="label"><slot></slot></span>
</button>
```

```css
/* Consumer stylesheet */
my-button::part(button) {
  font-weight: bold;
}

my-button::part(label) {
  text-transform: uppercase;
}
```

### 3. Slots for Composition
```html
<my-card>
  <h2 slot="header">Custom Header</h2>
  <div>Body content with custom styling</div>
  <div slot="footer">Custom Footer</div>
</my-card>
```

## Migration Strategy
For teams with existing Light DOM components:
1. Provide migration guide with Shadow DOM customization patterns
2. Document CSS Custom Property API for each component
3. Identify and expose necessary parts for styling
4. Create examples showing common customization scenarios

## Implementation Notes
- Use `adoptedStyleSheets` when available for performance
- Provide constructable stylesheets for shared styles
- Document all CSS Custom Properties in component API
- Expose logical parts that map to component structure
- Consider `:host-context()` for contextual styling where appropriate

## References
- [Shadow DOM v1 Specification](https://www.w3.org/TR/shadow-dom/)
- [CSS Shadow Parts Specification](https://www.w3.org/TR/css-shadow-parts-1/)
- Component architecture plan: `/plans/component-architecture.md`
- Main strategy document: `/plans/main.md`