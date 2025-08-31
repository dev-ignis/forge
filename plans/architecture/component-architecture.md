# Component Architecture Plan

## Design Principles

### 1. Atomic Design System
Components organized in hierarchical complexity:
- **Atoms**: Button, Input, Icon, Badge
- **Molecules**: FormField, SearchBar, Card
- **Organisms**: Header, DataTable, Modal
- **Templates**: PageLayout, DashboardGrid
- **Pages**: Full application views (examples only)

### 2. Single Responsibility
Each component does ONE thing well. Complex behavior achieved through composition.

## Component API Standards

### Property Naming Conventions
```typescript
interface ComponentProps {
  // Boolean props - always positive, descriptive
  isDisabled?: boolean;
  isLoading?: boolean;
  isOpen?: boolean;
  
  // Variants - use 'variant' or 'size' consistently
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  
  // Data props - component-centric naming
  value?: string;
  items?: Array<any>;
  user?: UserData;  // Not 'author' even if used in Comment
  
  // Event handlers - always 'on' prefix
  onClick?: (event: CustomEvent) => void;
  onChange?: (event: CustomEvent) => void;
  onClose?: (event: CustomEvent) => void;
}
```

### Event Patterns
```typescript
// Dispatching events
class MyComponent extends LitElement {
  private handleClick() {
    this.dispatchEvent(new CustomEvent('click', {
      detail: { value: this.value },
      bubbles: true,
      composed: true  // Cross shadow DOM boundaries
    }));
  }
}
```

## Base Component Architecture

### BaseElement Class (Complete Implementation)
```typescript
// src/core/BaseElement.ts
import { LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

// AI Metadata interface for AI-ready components (ADR-014)
interface AIMetadata {
  purpose: string;
  context?: string;
  dataType?: string;
  criticality?: 'low' | 'medium' | 'high' | 'critical';
  semanticRole?: string;
}

export abstract class BaseElement extends LitElement {
  // Common properties
  @property({ type: String, reflect: true }) id?: string;
  @property({ type: String, attribute: 'data-testid' }) testId?: string;
  
  // AI-ready metadata (ADR-014)
  @property({ type: Object })
  aiMetadata: AIMetadata = {
    purpose: 'ui-component'
  };
  
  // Theming support (ADR-003)
  protected getToken(tokenName: string, fallback?: string): string {
    const value = getComputedStyle(this).getPropertyValue(`--forge-${tokenName}`).trim();
    return value || fallback || '';
  }
  
  protected observeTheme(callback: () => void): void {
    // Watch for theme changes via CSS custom properties
    const observer = new MutationObserver(() => callback());
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme']
    });
  }
  
  // Event emission helper with typed events
  protected emit<T = any>(eventName: string, detail?: T, options?: EventInit): boolean {
    const event = new CustomEvent(eventName, {
      detail,
      bubbles: true,
      composed: true,
      cancelable: true,
      ...options
    });
    return this.dispatchEvent(event);
  }
  
  // Lifecycle hooks
  protected firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);
    this.setAttribute('data-ready', 'true');
    this.emit('forge-ready', { component: this.tagName.toLowerCase() });
  }
  
  // Accessibility helpers
  private _announcer: HTMLDivElement | null = null;
  
  protected announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    if (!this._announcer) {
      this._announcer = document.createElement('div');
      this._announcer.setAttribute('aria-live', priority);
      this._announcer.setAttribute('aria-atomic', 'true');
      this._announcer.style.cssText = `
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
      `;
      document.body.appendChild(this._announcer);
    }
    
    this._announcer.textContent = message;
    setTimeout(() => {
      if (this._announcer) {
        this._announcer.textContent = '';
      }
    }, 1000);
  }
  
  // Focus management
  protected trapFocus(container: HTMLElement = this): () => void {
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ].join(', ');
    
    const focusableElements = container.querySelectorAll(focusableSelectors);
    const firstFocusable = focusableElements[0] as HTMLElement;
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey && document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable?.focus();
      } else if (!e.shiftKey && document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable?.focus();
      }
    };
    
    container.addEventListener('keydown', handleKeyDown);
    
    // Return cleanup function
    return () => container.removeEventListener('keydown', handleKeyDown);
  }
  
  // Utility to restore focus after modal/dialog closes
  private _previousFocus: HTMLElement | null = null;
  
  protected saveFocus(): void {
    this._previousFocus = document.activeElement as HTMLElement;
  }
  
  protected restoreFocus(): void {
    if (this._previousFocus && this._previousFocus.focus) {
      this._previousFocus.focus();
      this._previousFocus = null;
    }
  }
  
  // AI-ready helper methods (ADR-014)
  get aiState(): Record<string, any> {
    return {
      isVisible: this.offsetParent !== null,
      isEnabled: !this.hasAttribute('disabled'),
      hasFocus: this === document.activeElement,
      metadata: this.aiMetadata
    };
  }
  
  getAIDescription(): string {
    const purpose = this.aiMetadata.purpose || 'ui-component';
    const context = this.aiMetadata.context ? ` in ${this.aiMetadata.context}` : '';
    return `${purpose}${context}`;
  }
  
  explainState(): string {
    const states = [];
    if (!this.offsetParent) states.push('hidden');
    if (this.hasAttribute('disabled')) states.push('disabled');
    if (this === document.activeElement) states.push('focused');
    return states.length ? `Component is ${states.join(', ')}` : 'Component is ready';
  }
  
  // Animation helpers
  protected async animateElement(
    element: Element,
    keyframes: Keyframe[],
    options: KeyframeAnimationOptions = {}
  ): Promise<void> {
    const animation = element.animate(keyframes, {
      duration: 250,
      easing: 'ease-in-out',
      ...options
    });
    return animation.finished;
  }
  
  // Cleanup on disconnect
  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._announcer && this._announcer.parentNode) {
      this._announcer.parentNode.removeChild(this._announcer);
      this._announcer = null;
    }
  }
}
```

## Styling Architecture

### Token System
```css
/* tokens/base.css */
:root {
  /* Colors */
  --color-primary-50: #e3f2fd;
  --color-primary-500: #2196f3;
  --color-primary-900: #0d47a1;
  
  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  
  /* Typography */
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  
  /* Borders */
  --border-radius-sm: 4px;
  --border-radius-md: 8px;
  
  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.12);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.16);
}
```

### Component Styling Pattern
```typescript
class Button extends BaseElement {
  static styles = css`
    :host {
      display: inline-block;
      /* Component-specific tokens with fallbacks */
      --button-bg: var(--color-primary-500);
      --button-color: white;
    }
    
    .button {
      background: var(--button-bg);
      color: var(--button-color);
      padding: var(--spacing-sm) var(--spacing-md);
      border-radius: var(--border-radius-md);
      
      /* Expose parts for customization */
      &[part="button"] {
        /* Styles */
      }
    }
    
    /* Variants */
    :host([variant="secondary"]) .button {
      --button-bg: var(--color-secondary-500);
    }
    
    /* States */
    :host([disabled]) .button {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;
}
```

## Composition Patterns

### Slot-based Composition
```typescript
// Complex component with multiple slots
class Card extends BaseElement {
  render() {
    return html`
      <article class="card" part="container">
        <header class="card-header" part="header">
          <slot name="header"></slot>
        </header>
        <div class="card-body" part="body">
          <slot></slot>
        </div>
        <footer class="card-footer" part="footer">
          <slot name="footer"></slot>
        </footer>
      </article>
    `;
  }
}
```

### Component Composition
```html
<!-- Using composed components -->
<my-card>
  <h2 slot="header">Card Title</h2>
  <my-button variant="primary">Action</my-button>
  <span slot="footer">Footer content</span>
</my-card>
```

## State Management Patterns

### Local State
```typescript
class Toggle extends BaseElement {
  @property({ type: Boolean, reflect: true })
  checked = false;
  
  @state()
  private _focused = false;
  
  private handleToggle() {
    this.checked = !this.checked;
    this.emit('change', { checked: this.checked });
  }
}
```

### Controlled vs Uncontrolled
```typescript
class Input extends BaseElement {
  @property() value = '';  // Controlled when set externally
  @state() private _internalValue = '';  // Uncontrolled state
  
  get effectiveValue() {
    return this.value !== undefined ? this.value : this._internalValue;
  }
  
  private handleInput(e: Event) {
    const newValue = (e.target as HTMLInputElement).value;
    if (this.value === undefined) {
      // Uncontrolled mode
      this._internalValue = newValue;
    }
    this.emit('input', { value: newValue });
  }
}
```

## Accessibility Patterns

### ARIA Implementation
```typescript
class Modal extends BaseElement {
  @property({ type: Boolean, reflect: true })
  open = false;
  
  @property() label = '';
  
  render() {
    return html`
      <div
        class="modal"
        role="dialog"
        aria-modal="true"
        aria-label=${this.label}
        aria-hidden=${!this.open}
      >
        <slot></slot>
      </div>
    `;
  }
  
  // Focus management
  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('open')) {
      if (this.open) {
        this.trapFocus();
      } else {
        this.restoreFocus();
      }
    }
  }
}
```

## Component Categories

### Form Components
- Input, Textarea, Select, Checkbox, Radio
- FormField (label + input + error)
- Form (validation coordinator)

### Navigation Components
- Button, Link, Breadcrumb
- Menu, Tabs, Pagination
- Navigation, Sidebar

### Data Display
- Table, DataGrid
- Card, List, Tree
- Badge, Tag, Chip

### Feedback Components
- Alert, Toast, Notification
- Progress, Spinner, Skeleton
- Tooltip, Popover

### Layout Components
- Container, Grid, Flex
- Divider, Spacer
- Accordion, Collapsible

## Performance Patterns

### Lazy Loading
```typescript
// Lazy load heavy components
const loadRichTextEditor = () => import('./components/RichTextEditor');
```

### Virtual Scrolling
```typescript
// For large lists
class VirtualList extends BaseElement {
  // Implementation with intersection observer
}
```

## Framework Integration Helpers

### React Wrapper Pattern
```typescript
// react/wrapper.tsx
export function wrapWebComponent<T extends HTMLElement>(
  tagName: string
) {
  return React.forwardRef((props, ref) => {
    // Implementation
  });
}
```

### Vue Integration
```typescript
// vue/plugin.ts
export function registerComponents(app: App) {
  // Register all components as Vue components
}
```