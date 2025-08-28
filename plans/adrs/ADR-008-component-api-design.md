# ADR-008: Component API Design Standards

## Status
**Accepted**

## Context
A consistent, intuitive API design is crucial for developer adoption and satisfaction. The API is the contract between the component library and its consumers, affecting:
- Learning curve and adoption rate
- Code maintainability and readability
- Framework integration complexity
- Documentation requirements
- Breaking change frequency

Web Components present unique API design challenges:
- Attributes vs properties distinction
- Event naming in different frameworks
- Boolean attribute handling
- Complex data type passing
- Slot-based content projection

Without clear standards, the library risks:
- Inconsistent naming conventions across components
- Confusing property/attribute mapping
- Poor developer experience
- Difficult framework integration
- Frequent breaking changes

## Decision
We will establish and enforce **strict API design standards** based on web platform conventions and modern best practices.

### Core Principles:
1. **Consistency**: Same patterns across all components
2. **Predictability**: Developers can guess API based on patterns
3. **Simplicity**: Minimize API surface area
4. **Composability**: Components work well together
5. **Web Standards**: Follow HTML element conventions where applicable

## Consequences

### Positive Consequences
- **Intuitive APIs**: Developers can predict behavior
- **Reduced Documentation**: Consistent patterns reduce learning curve
- **Framework Compatibility**: Standard patterns work across frameworks
- **Maintainability**: Clear guidelines for contributors
- **Stability**: Well-designed APIs rarely need breaking changes
- **Type Safety**: Consistent patterns enable better TypeScript support

### Negative Consequences
- **Design Constraints**: Standards may limit flexibility
- **Migration Effort**: Existing components may need updates
- **Review Overhead**: API reviews required for new components
- **Documentation Burden**: Standards must be thoroughly documented

## Property Naming Standards

### Boolean Properties
```typescript
// CORRECT: Positive, descriptive names
interface ButtonProps {
  disabled?: boolean;     // NOT enabled
  loading?: boolean;      // NOT isLoading (for HTML alignment)
  checked?: boolean;      // NOT selected
  open?: boolean;         // NOT closed
  readonly?: boolean;     // NOT editable
}

// Prefix with 'is' only for non-standard states
interface ComponentProps {
  isActive?: boolean;     // Custom state
  isHovered?: boolean;    // Internal state
}
```

### Variant Properties
```typescript
// CORRECT: Consistent naming
interface ComponentProps {
  variant?: 'primary' | 'secondary' | 'danger';  // NOT type, kind, theme
  size?: 'sm' | 'md' | 'lg';                    // NOT scale, dimension
  position?: 'top' | 'bottom' | 'left' | 'right'; // NOT placement, align
}
```

### Data Properties
```typescript
// CORRECT: Component-centric naming
interface AvatarProps {
  user?: User;       // NOT author, person, profile
  src?: string;      // Standard HTML attribute
  alt?: string;      // Standard HTML attribute
}

interface SelectProps {
  options?: Option[];     // NOT items, choices, data
  value?: string;        // NOT selected, current
  multiple?: boolean;    // Standard HTML attribute
}
```

## Event Naming Standards

### Event Names
```typescript
// CORRECT: Present tense, no prefix
class MyComponent extends LitElement {
  private emitChange() {
    this.dispatchEvent(new CustomEvent('change'));      // NOT 'on-change', 'changed'
    this.dispatchEvent(new CustomEvent('input'));       // NOT 'on-input', 'value-change'
    this.dispatchEvent(new CustomEvent('close'));       // NOT 'on-close', 'closed'
    this.dispatchEvent(new CustomEvent('select'));      // NOT 'on-select', 'selected'
  }
}

// Event handler props in frameworks
interface Props {
  onChange?: (event: CustomEvent) => void;  // Framework adds 'on' prefix
  onClose?: (event: CustomEvent) => void;
  onSelect?: (event: CustomEvent) => void;
}
```

### Event Detail Structure
```typescript
// CORRECT: Flat, simple structures
interface ChangeDetail {
  value: string;           // Primary value
  previousValue?: string;  // Context if needed
}

// AVOID: Nested structures
interface BadDetail {
  data: {
    current: {
      value: string;
    }
  }
}
```

## Attribute vs Property Guidelines

### Attributes (HTML serializable)
```typescript
// Use attributes for simple, string-serializable values
@property({ type: String, reflect: true })
variant = 'primary';

@property({ type: Boolean, reflect: true })
disabled = false;

@property({ type: Number, reflect: true })
tabindex = 0;
```

### Properties (Complex data)
```typescript
// Use properties for complex data
@property({ type: Array, attribute: false })
options: Option[] = [];

@property({ type: Object, attribute: false })
user: User | null = null;

// Rich data that can't be serialized
@property({ attribute: false })
renderItem?: (item: any) => TemplateResult;
```

## Slot Naming Standards

```html
<!-- CORRECT: Descriptive, lowercase slot names -->
<my-card>
  <span slot="header">Title</span>
  <p>Default content</p>
  <span slot="footer">Footer</span>
</my-card>

<!-- Component template -->
<article>
  <header><slot name="header"></slot></header>
  <main><slot></slot></main> <!-- Default slot -->
  <footer><slot name="footer"></slot></footer>
</article>
```

## Alternatives Considered

### 1. HTML-First API
- **Pros**: Familiar to web developers, works without JS
- **Cons**: Limited to string attributes, complex data passing issues

### 2. React-Style Props
- **Pros**: Familiar to React developers
- **Cons**: Not idiomatic for Web Components, conflicts with HTML

### 3. Angular-Style Decorators
- **Pros**: Powerful, explicit bindings
- **Cons**: Framework-specific, requires transpilation

### 4. No Standards
- **Pros**: Maximum flexibility
- **Cons**: Inconsistent APIs, poor DX, maintenance nightmare

## API Design Patterns

### Controlled/Uncontrolled Pattern
```typescript
class Input extends LitElement {
  // Support both patterns
  @property() value?: string;  // Controlled if provided
  
  @state()
  private _value = '';  // Internal state for uncontrolled
  
  get currentValue() {
    return this.value ?? this._value;
  }
}
```

### Compound Components
```typescript
// Related components share consistent APIs
<my-tabs>
  <my-tab-list>
    <my-tab>Tab 1</my-tab>
    <my-tab>Tab 2</my-tab>
  </my-tab-list>
  <my-tab-panel>Panel 1</my-tab-panel>
  <my-tab-panel>Panel 2</my-tab-panel>
</my-tabs>
```

### Progressive Enhancement
```typescript
// Components work without JavaScript
<my-details open>
  <span slot="summary">Click to expand</span>
  <p>Content revealed when open</p>
</my-details>
```

## Validation and Enforcement

### API Linting Rules
```javascript
// .eslintrc.js custom rules
{
  rules: {
    'forge/boolean-prop-naming': 'error',
    'forge/event-naming': 'error',
    'forge/consistent-variants': 'error'
  }
}
```

### API Review Checklist
- [ ] Property names follow conventions
- [ ] Events use present tense
- [ ] Boolean props are positive
- [ ] Variants are consistent across library
- [ ] Slots are lowercase and descriptive
- [ ] Complex data uses properties, not attributes
- [ ] API is minimal and focused

## Migration Guidelines

For existing components not meeting standards:
1. Document current API as deprecated
2. Add new standard-compliant properties/events
3. Maintain backward compatibility for one major version
4. Provide codemods for automatic migration
5. Remove deprecated APIs in next major version

## Documentation Requirements

Each component must document:
1. **Properties**: Type, default value, description
2. **Attributes**: Reflected properties
3. **Events**: Name, detail structure, when fired
4. **Slots**: Name, purpose, default content
5. **CSS Custom Properties**: Theming variables
6. **Parts**: Exposed Shadow DOM parts

## References
- [HTML Living Standard](https://html.spec.whatwg.org/)
- [Web Components Best Practices](https://www.webcomponents.org/community/best-practices)
- Component architecture plan: `/plans/component-architecture.md`
- Related: ADR-001 (Web Components), ADR-007 (Framework Integration)