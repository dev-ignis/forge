# ADR-012: Accessibility Standards and Implementation

## Status
**Accepted**

## Context
Accessibility is not optional - it's a fundamental requirement for professional UI components. Poor accessibility:
- Excludes users with disabilities
- Violates legal requirements (ADA, Section 508, EU Directive 2016/2102)
- Reduces overall usability
- Damages brand reputation
- Limits market reach

Web Components present unique accessibility challenges:
- Shadow DOM can interfere with assistive technologies
- Custom elements lack semantic meaning by default
- Focus management requires explicit handling
- ARIA attributes must be manually implemented
- Form participation needs special consideration

Without proper accessibility implementation:
- Screen readers cannot interpret components
- Keyboard navigation fails
- Color contrast may be insufficient
- Focus indicators may be missing
- Error messages may not be announced

## Decision
We will implement **WCAG 2.1 Level AA compliance as the minimum standard**, with Level AAA where feasible, following ARIA Authoring Practices Guide patterns.

### Accessibility Strategy:
1. **Semantic HTML**: Use native elements where possible
2. **ARIA Implementation**: Proper roles, states, and properties
3. **Keyboard Navigation**: Full keyboard operability
4. **Focus Management**: Logical focus order and visible indicators
5. **Screen Reader Support**: Tested with NVDA, JAWS, and VoiceOver
6. **Automated Testing**: Integrated accessibility testing in CI/CD

## Consequences

### Positive Consequences
- **Inclusive Design**: Components usable by everyone
- **Legal Compliance**: Meets regulatory requirements
- **Better UX**: Accessibility improvements benefit all users
- **Market Reach**: Accessible to government and enterprise
- **Quality Signal**: Demonstrates professional standards
- **SEO Benefits**: Semantic HTML improves search rankings

### Negative Consequences
- **Development Time**: Additional implementation effort
- **Testing Complexity**: Requires specialized testing
- **Learning Curve**: Developers need accessibility knowledge
- **Design Constraints**: Some designs may need modification
- **Performance Impact**: Additional ARIA attributes and focus management

## WCAG 2.1 Level AA Requirements

### 1. Perceivable
```typescript
// Color contrast requirements
const styles = css`
  :host {
    /* 4.5:1 for normal text */
    --text-color: #212121;  /* on white: 19.5:1 */
    
    /* 3:1 for large text */
    --heading-color: #424242;  /* on white: 10.7:1 */
    
    /* 3:1 for UI components */
    --border-color: #757575;  /* on white: 4.6:1 */
  }
  
  /* Focus indicators with sufficient contrast */
  :focus-visible {
    outline: 2px solid var(--color-focus, #2196f3);
    outline-offset: 2px;
  }
`;
```

### 2. Operable
```typescript
// Keyboard navigation
class NavigableList extends LitElement {
  @state() private focusedIndex = 0;
  
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this.handleKeydown);
  }
  
  private handleKeydown(e: KeyboardEvent) {
    switch(e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this.focusedIndex = Math.min(
          this.focusedIndex + 1, 
          this.items.length - 1
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.focusedIndex = Math.max(this.focusedIndex - 1, 0);
        break;
      case 'Home':
        e.preventDefault();
        this.focusedIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        this.focusedIndex = this.items.length - 1;
        break;
    }
    this.focusItem(this.focusedIndex);
  }
}
```

### 3. Understandable
```typescript
// Clear error messages and instructions
class FormField extends LitElement {
  @property() error = '';
  @property() helpText = '';
  
  render() {
    return html`
      <div role="group">
        <label for="input" id="label">
          <slot name="label"></slot>
        </label>
        
        <input
          id="input"
          aria-labelledby="label"
          aria-describedby="${this.error ? 'error' : 'help'}"
          aria-invalid="${this.error ? 'true' : 'false'}"
        />
        
        ${this.error ? html`
          <div id="error" role="alert" aria-live="assertive">
            ${this.error}
          </div>
        ` : html`
          <div id="help">${this.helpText}</div>
        `}
      </div>
    `;
  }
}
```

### 4. Robust
```typescript
// Proper ARIA implementation
class Modal extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false;
  @property() label = '';
  
  render() {
    return html`
      <div
        role="dialog"
        aria-modal="true"
        aria-label="${this.label}"
        aria-hidden="${!this.open}"
      >
        <slot></slot>
      </div>
    `;
  }
}
```

## Component-Specific Patterns

### Button
```typescript
class AccessibleButton extends LitElement {
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) loading = false;
  
  render() {
    return html`
      <button
        part="button"
        ?disabled="${this.disabled}"
        aria-disabled="${this.disabled}"
        aria-busy="${this.loading}"
      >
        ${this.loading ? html`
          <span class="spinner" aria-label="Loading"></span>
        ` : ''}
        <slot></slot>
      </button>
    `;
  }
}
```

### Form Input
```typescript
class AccessibleInput extends LitElement {
  @property() label = '';
  @property() error = '';
  @property({ type: Boolean }) required = false;
  
  render() {
    const inputId = `input-${this.id}`;
    const errorId = `error-${this.id}`;
    
    return html`
      <div class="form-field">
        <label for="${inputId}">
          ${this.label}
          ${this.required ? html`
            <span aria-label="required">*</span>
          ` : ''}
        </label>
        
        <input
          id="${inputId}"
          aria-required="${this.required}"
          aria-invalid="${!!this.error}"
          aria-describedby="${this.error ? errorId : ''}"
        />
        
        ${this.error ? html`
          <div 
            id="${errorId}"
            class="error"
            role="alert"
            aria-live="polite"
          >
            ${this.error}
          </div>
        ` : ''}
      </div>
    `;
  }
}
```

### Navigation Menu
```typescript
class AccessibleMenu extends LitElement {
  render() {
    return html`
      <nav role="navigation" aria-label="Main navigation">
        <ul role="menubar">
          ${this.items.map((item, index) => html`
            <li role="none">
              <a
                role="menuitem"
                href="${item.href}"
                aria-current="${item.active ? 'page' : ''}"
                tabindex="${index === 0 ? '0' : '-1'}"
              >
                ${item.label}
              </a>
            </li>
          `)}
        </ul>
      </nav>
    `;
  }
}
```

## Alternatives Considered

### 1. WCAG 2.1 Level A Only
- **Pros**: Easier to implement, faster development
- **Cons**: Insufficient for many use cases, legal risk

### 2. WCAG 2.1 Level AAA
- **Pros**: Maximum accessibility
- **Cons**: Very difficult to achieve, may limit design

### 3. Custom Accessibility Standards
- **Pros**: Tailored to specific needs
- **Cons**: No recognized standard, harder to validate

### 4. Framework-Specific A11y
- **Pros**: Leverages framework tools
- **Cons**: Inconsistent across frameworks

## Testing Strategy

### Automated Testing
```javascript
// In component tests
import { isAccessible } from '@open-wc/testing';

it('meets accessibility standards', async () => {
  const el = await fixture(html`
    <my-button>Click me</my-button>
  `);
  await expect(el).to.be.accessible();
});
```

### CI/CD Integration
```yaml
# Accessibility testing in pipeline
- name: Run accessibility tests
  run: |
    npm run test:a11y
    npx playwright test --grep @a11y
```

### Manual Testing Checklist
- [ ] Keyboard navigation works completely
- [ ] Screen reader announces all content
- [ ] Focus indicators are visible
- [ ] Color contrast meets standards
- [ ] Touch targets are 44x44px minimum
- [ ] Animations respect prefers-reduced-motion
- [ ] Error messages are announced
- [ ] Form labels are associated

## Focus Management Utilities

### Focus Trap
```typescript
export class FocusTrap {
  private focusableElements: HTMLElement[] = [];
  
  constructor(private container: HTMLElement) {
    this.updateFocusableElements();
  }
  
  trap() {
    const firstElement = this.focusableElements[0];
    const lastElement = this.focusableElements[
      this.focusableElements.length - 1
    ];
    
    this.container.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    });
  }
}
```

### Focus Restoration
```typescript
export class FocusManager {
  private previousFocus: HTMLElement | null = null;
  
  saveFocus() {
    this.previousFocus = document.activeElement as HTMLElement;
  }
  
  restoreFocus() {
    if (this.previousFocus && this.previousFocus.focus) {
      this.previousFocus.focus();
    }
  }
}
```

## Screen Reader Announcements

### Live Regions
```typescript
class LiveAnnouncer extends LitElement {
  @state() private message = '';
  
  announce(text: string, priority: 'polite' | 'assertive' = 'polite') {
    this.message = text;
    setTimeout(() => this.message = '', 1000);
  }
  
  render() {
    return html`
      <div
        class="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        ${this.message}
      </div>
    `;
  }
}
```

## Documentation Requirements
1. Accessibility features for each component
2. Keyboard navigation patterns
3. Screen reader behavior
4. ARIA attribute usage
5. Known limitations
6. Testing procedures

## Success Metrics
- WCAG 2.1 Level AA compliance: 100%
- Automated accessibility test coverage: >90%
- Screen reader compatibility: NVDA, JAWS, VoiceOver
- Keyboard navigation: 100% operable
- Zero accessibility violations in production

## References
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Resources](https://webaim.org/)
- Component architecture: `/plans/component-architecture.md`
- Testing strategy: ADR-004