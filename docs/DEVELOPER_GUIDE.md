# Developer Guide

This guide provides comprehensive information for developers who want to contribute to Forge UI or build custom components following our patterns and conventions.

## Table of Contents

1. [Development Environment Setup](#development-environment-setup)
2. [Project Architecture](#project-architecture)
3. [Component Development](#component-development)
4. [AI-Ready Architecture](#ai-ready-architecture)
5. [Performance Monitoring](#performance-monitoring)
6. [Debugging and Error Handling](#debugging-and-error-handling)
7. [Testing Guidelines](#testing-guidelines)
8. [Documentation Standards](#documentation-standards)
9. [Accessibility Requirements](#accessibility-requirements)

## Development Environment Setup

### Prerequisites

- **Node.js**: 18.x or higher
- **npm**: 9.x or higher (or yarn/pnpm equivalent)
- **Git**: Latest version
- **Modern Browser**: Chrome 90+, Firefox 88+, Safari 14+

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/org/forge-ui.git
cd forge-ui

# Install dependencies
npm install

# Start development server
npm run dev

# Open Storybook for component development
npm run storybook
```

### Development Scripts

```bash
# Development
npm run dev                    # Start Vite development server
npm run storybook             # Start Storybook
npm run storybook:build       # Build Storybook for production

# Testing
npm run test                  # Run unit tests
npm run test:watch            # Run tests in watch mode
npm run test:coverage         # Generate coverage report
npm run test:e2e              # Run end-to-end tests
npm run test:a11y             # Run accessibility tests

# Building
npm run build                 # Build production library
npm run build:types           # Generate TypeScript declarations
npm run build:manifest        # Generate custom elements manifest

# Code Quality
npm run lint                  # Lint TypeScript files
npm run lint:fix              # Fix linting issues
npm run format                # Format code with Prettier
npm run type-check            # Run TypeScript checks

# Analysis
npm run analyze               # Analyze bundle size
npm run lighthouse            # Run Lighthouse performance audit
```

## Project Architecture

### Directory Structure

```
src/
├── components/
│   ├── atoms/                # Basic building blocks
│   │   ├── button/
│   │   │   ├── button.ts     # Component implementation
│   │   │   ├── button.test.ts # Unit tests
│   │   │   ├── button.stories.ts # Storybook stories
│   │   │   └── index.ts      # Export file
│   │   └── ...
│   ├── molecules/            # Composed components
│   ├── organisms/            # Complex components
│   └── templates/            # Layout components
├── core/
│   ├── BaseElement.ts        # Shared component base class
│   ├── mixins/               # Reusable component behaviors
│   │   ├── FormMixin.ts      # Form-related functionality
│   │   ├── FocusMixin.ts     # Focus management
│   │   └── ValidationMixin.ts # Input validation
│   └── utils/                # Utility functions
│       ├── dom.ts            # DOM manipulation helpers
│       ├── events.ts         # Event handling utilities
│       └── accessibility.ts  # A11y helper functions
├── tokens/                   # Design tokens
│   ├── colors.css            # Color palette
│   ├── spacing.css           # Spacing system
│   ├── typography.css        # Typography scales
│   └── index.css             # Combined tokens
├── types/                    # TypeScript type definitions
│   ├── components.ts         # Component interfaces
│   └── global.ts             # Global type declarations
└── index.ts                  # Main entry point
```

### Architecture Patterns

#### Atomic Design System

Components are organized by complexity:

- **Atoms**: Basic elements (Button, Input, Icon)
- **Molecules**: Simple combinations (FormField, SearchBar)
- **Organisms**: Complex compositions (Header, DataTable)
- **Templates**: Layout structures (PageLayout, DashboardGrid)

#### Composition Over Inheritance

```typescript
// ❌ Avoid deep inheritance chains
class ComplexButton extends Button extends BaseElement { }

// ✅ Prefer composition with mixins
class ComplexButton extends FormMixin(FocusMixin(BaseElement)) {
  // Component-specific logic
}
```

## Component Development

### Creating a New Component

Use our component generator for consistency:

```bash
npm run generate:component MyComponent atoms
```

This creates:

- Component implementation file
- Test file with basic test cases
- Storybook stories
- Export file
- Updates main index file

### Component Structure

```typescript
// src/components/atoms/my-component/my-component.ts
import { html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { BaseElement } from '../../../core/BaseElement';

/**
 * @element forge-my-component
 * @slot default - The main content
 * @slot icon - Icon content (optional)
 * @fires forge-my-component-change - Fired when component value changes
 * @fires forge-my-component-focus - Fired when component receives focus
 * @fires forge-my-component-blur - Fired when component loses focus
 */
@customElement('forge-my-component')
export class ForgeMyComponent extends BaseElement {
  static styles = css`
    :host {
      display: block;
      /* Component-specific CSS variables */
      --my-component-bg: var(--forge-color-surface);
      --my-component-color: var(--forge-color-text);
    }

    .my-component {
      background: var(--my-component-bg);
      color: var(--my-component-color);
      padding: var(--forge-spacing-md);
      border-radius: var(--forge-border-radius-md);
    }

    /* Variants */
    :host([variant='primary']) {
      --my-component-bg: var(--forge-color-primary-500);
      --my-component-color: white;
    }

    /* States */
    :host([disabled]) {
      opacity: 0.5;
      pointer-events: none;
    }

    /* Responsive styles */
    @media (max-width: 768px) {
      .my-component {
        padding: var(--forge-spacing-sm);
      }
    }
  `;

  // Public properties (reflected to attributes)
  @property({ type: String, reflect: true })
  variant: 'default' | 'primary' | 'secondary' = 'default';

  @property({ type: String })
  size: 'sm' | 'md' | 'lg' = 'md';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String })
  value = '';

  // Internal state (not reflected)
  @state()
  private _focused = false;

  @state()
  private _loading = false;

  render() {
    const classes = {
      'my-component': true,
      [`my-component--${this.variant}`]: true,
      [`my-component--${this.size}`]: true,
      'my-component--focused': this._focused,
      'my-component--loading': this._loading,
    };

    return html`
      <div
        class=${classMap(classes)}
        part="container"
        role="widget"
        aria-disabled=${this.disabled}
        @focus=${this._handleFocus}
        @blur=${this._handleBlur}
      >
        <slot name="icon"></slot>
        <div class="content" part="content">
          <slot></slot>
        </div>
      </div>
    `;
  }

  // Event handlers
  private _handleFocus() {
    if (!this.disabled) {
      this._focused = true;
      this.emit('forge-my-component-focus');
    }
  }

  private _handleBlur() {
    this._focused = false;
    this.emit('forge-my-component-blur');
  }

  // Lifecycle methods
  protected firstUpdated(changedProperties: PropertyValues) {
    super.firstUpdated(changedProperties);

    // Setup initial state
    this.tabIndex = this.disabled ? -1 : 0;
  }

  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    // React to property changes
    if (changedProperties.has('disabled')) {
      this.tabIndex = this.disabled ? -1 : 0;

      if (this.disabled && this._focused) {
        this.blur();
      }
    }
  }

  // Public API methods
  public focus(options?: FocusOptions) {
    if (!this.disabled) {
      super.focus(options);
    }
  }

  public blur() {
    super.blur();
  }
}

// TypeScript declarations
declare global {
  interface HTMLElementTagNameMap {
    'forge-my-component': ForgeMyComponent;
  }
}
```

### Best Practices

#### Property Design

```typescript
// ✅ Use clear, descriptive names
@property({ type: Boolean }) disabled = false;
@property({ type: String }) variant: 'primary' | 'secondary' = 'primary';

// ❌ Avoid unclear or negative naming
@property({ type: Boolean }) notDisabled = true;
@property({ type: String }) kind = 'main';
```

#### Event Naming

```typescript
// ✅ Use consistent prefixed naming
this.emit('forge-button-click', { value: this.value });
this.emit('forge-input-change', { value: this.inputValue });

// ❌ Avoid generic or unprefixed names
this.emit('click', data);
this.emit('change', data);
```

#### Accessibility

```typescript
render() {
  return html`
    <button
      class="button"
      ?disabled=${this.disabled}
      aria-label=${this.ariaLabel || nothing}
      aria-pressed=${this.pressed ? 'true' : 'false'}
      role="button"
      tabindex=${this.disabled ? -1 : 0}
    >
      <slot></slot>
    </button>
  `;
}
```

## AI-Ready Architecture

All Forge components implement ADR-014 for AI-ready architecture, providing semantic metadata and helper methods for AI tools and assistants.

### AI Metadata Interface

Every component extends BaseElement which includes AI metadata:

```typescript
export interface AIMetadata {
  purpose: string; // Component's primary purpose
  context?: string; // Usage context
  dataType?: string; // Type of data handled
  criticality?: 'low' | 'medium' | 'high' | 'critical';
  semanticRole?: string; // ARIA-like semantic role
}
```

### Implementing AI Features

Components must override AI helper methods:

```typescript
@customElement('forge-my-component')
export class ForgeMyComponent extends BaseElement {
  constructor() {
    super();
    // Set AI metadata in constructor
    this.aiMetadata = {
      purpose: 'Interactive control for user input',
      dataType: 'string',
      criticality: 'medium',
      semanticRole: 'input',
    };
  }

  // Override AI helper methods
  override getAIDescription(): string {
    return `${this.label} input field, currently ${this.value ? 'filled' : 'empty'}`;
  }

  override getPossibleActions(): Action[] {
    return [
      {
        name: 'setValue',
        description: 'Set the input value',
        available: !this.disabled,
      },
      {
        name: 'clear',
        description: 'Clear the input',
        available: !this.disabled && !!this.value,
      },
      {
        name: 'focus',
        description: 'Focus the input',
        available: true,
      },
    ];
  }

  override explainState(): StateExplanation {
    return {
      currentState: this.disabled ? 'disabled' : this.value ? 'filled' : 'empty',
      possibleStates: ['empty', 'filled', 'disabled', 'error'],
      stateDescription: this.getStateDescription(),
    };
  }
}
```

### AI Attributes

Components expose AI metadata through data attributes:

```html
<forge-button
  data-semantic-role="action-trigger"
  data-ai-context="form-submission"
  aria-description="Submit button for user registration form"
>
  Register
</forge-button>
```

### Testing AI Features

Include tests for AI functionality:

```typescript
describe('AI Features', () => {
  it('should provide accurate AI description', () => {
    element.label = 'Email';
    element.value = 'user@example.com';
    expect(element.getAIDescription()).to.include('Email');
    expect(element.getAIDescription()).to.include('filled');
  });

  it('should list available actions', () => {
    const actions = element.getPossibleActions();
    expect(actions).to.have.length.greaterThan(0);
    expect(actions[0]).to.have.property('name');
    expect(actions[0]).to.have.property('available');
  });

  it('should explain current state', () => {
    const explanation = element.explainState();
    expect(explanation.currentState).to.be.oneOf(['empty', 'filled', 'disabled']);
    expect(explanation.possibleStates).to.be.an('array');
  });
});
```

## Performance Monitoring

All components include built-in performance monitoring to ensure optimal user experience.

### Performance Budget System

Components track their render time and warn when exceeding budgets:

```typescript
export class ForgeMyComponent extends BaseElement {
  protected render() {
    const startTime = performance.now();

    const content = html` <!-- Component template --> `;

    // Check performance after render
    this.checkPerformance(startTime);

    return content;
  }
}
```

### Performance Attributes

Users can configure performance monitoring:

```html
<forge-button
  dev-mode                    <!-- Enable development features -->
  show-metrics                <!-- Display performance overlay -->
  max-render-ms="16"          <!-- Set performance budget (default 16ms) -->
  warn-on-violation           <!-- Console warnings for violations -->
  performance-mode="auto"     <!-- auto | fast | normal -->
>
  Performance Monitored Button
</forge-button>
```

### Performance Degradation

Components automatically degrade under poor performance:

```typescript
protected applyPerformanceDegradation(): void {
  // Disable animations
  this.style.setProperty('--transition-duration', '0ms');

  // Reduce visual effects
  this.shadowRoot?.querySelectorAll('.animated').forEach(el => {
    el.classList.add('no-animation');
  });

  // Simplify rendering
  this.performanceMode = 'fast';
}
```

### Performance Metrics Display

When `show-metrics` is enabled:

```typescript
private renderMetrics() {
  return html`
    <div class="performance-overlay">
      Component: ${this.tagName.toLowerCase()}<br>
      Render: ${this.renderTime.toFixed(2)}ms<br>
      Budget: ${this.maxRenderMs}ms<br>
      Count: ${this.renderCount}<br>
      Status: ${this.renderTime > this.maxRenderMs ? '⚠️ SLOW' : '✅ OK'}
    </div>
  `;
}
```

### Performance Testing

Test performance characteristics:

```typescript
describe('Performance', () => {
  it('should render within budget', async () => {
    element.maxRenderMs = 16;
    await element.updateComplete;
    expect(element.renderTime).to.be.lessThan(16);
  });

  it('should apply degradation when slow', () => {
    element.renderTime = 100;
    element.maxRenderMs = 16;
    element['checkPerformance'](0);

    expect(element.performanceMode).to.equal('fast');
  });

  it('should track render count', async () => {
    const initialCount = element.renderCount;
    element.value = 'new value';
    await element.updateComplete;

    expect(element.renderCount).to.equal(initialCount + 1);
  });
});
```

## Debugging and Error Handling

Forge provides comprehensive debugging utilities and error handling mechanisms to help developers build and troubleshoot components efficiently.

### Quick Start

```typescript
import { enableGlobalDebug, debugComponent } from '@nexcraft/forge/utils';

// Enable debug mode for all components
enableGlobalDebug();

// Or debug a specific component
const button = document.querySelector('forge-button');
debugComponent(button);
```

In the browser console:

```javascript
// Access global debug utilities
window.__FORGE_DEBUG__.enableGlobalDebug();
window.__FORGE_DEBUG__.debugComponent(document.querySelector('forge-button'));
```

### Debug Utilities

Forge includes powerful debugging tools:

- **Component Inspection**: `debugComponent(element)` - View state, properties, and performance
- **Property Watching**: `watchComponent(element, props)` - Monitor changes in real-time
- **Performance Profiling**: `profileComponent(element)` - Measure render performance
- **AI Capabilities**: `getAICapabilities(element)` - Explore AI actions and state
- **Performance Reports**: `generatePerformanceReport()` - Overview of all components

### Error Handling

Use contextual error utilities for better developer experience:

```typescript
import {
  throwValidationError,
  throwRequiredPropertyError,
  assertOneOf,
  warnDeprecated,
} from '@nexcraft/forge/utils';

// Validate properties
assertOneOf(variant, ['primary', 'secondary', 'ghost'], 'ForgeButton', 'variant');

// Warn about deprecations
warnDeprecated('ForgeButton', 'color', 'variant', '1.0.0');
```

All errors include:

- Component name context
- Clear error messages
- Expected vs. received values
- Actionable suggestions
- Documentation links (when applicable)

### Detailed Guide

For comprehensive documentation on all debugging features and error handling utilities, see:

- [Debugging and Error Handling Guide](./guides/debugging-and-error-handling.md)

## Testing Guidelines

### Test Structure

Each component should have comprehensive test coverage:

```typescript
// my-component.test.ts
import { fixture, expect, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import sinon from 'sinon';
import './my-component';
import type { ForgeMyComponent } from './my-component';

describe('ForgeMyComponent', () => {
  describe('Rendering', () => {
    it('renders with default properties', async () => {
      const el = await fixture<ForgeMyComponent>(html`
        <forge-my-component>Content</forge-my-component>
      `);

      expect(el.variant).to.equal('default');
      expect(el.size).to.equal('md');
      expect(el.disabled).to.be.false;
    });

    it('renders slot content', async () => {
      const el = await fixture<ForgeMyComponent>(html`
        <forge-my-component>Test Content</forge-my-component>
      `);

      expect(el).to.have.text('Test Content');
    });
  });

  describe('Properties', () => {
    it('reflects properties to attributes', async () => {
      const el = await fixture<ForgeMyComponent>(html`
        <forge-my-component variant="primary" disabled></forge-my-component>
      `);

      expect(el).to.have.attribute('variant', 'primary');
      expect(el).to.have.attribute('disabled');
    });

    it('updates properties programmatically', async () => {
      const el = await fixture<ForgeMyComponent>(html` <forge-my-component></forge-my-component> `);

      el.variant = 'secondary';
      el.disabled = true;
      await el.updateComplete;

      expect(el.variant).to.equal('secondary');
      expect(el.disabled).to.be.true;
    });
  });

  describe('Events', () => {
    it('emits events on interaction', async () => {
      const el = await fixture<ForgeMyComponent>(html` <forge-my-component></forge-my-component> `);

      const eventSpy = sinon.spy();
      el.addEventListener('forge-my-component-focus', eventSpy);

      el.focus();
      await el.updateComplete;

      expect(eventSpy).to.have.been.calledOnce;
    });
  });

  describe('Accessibility', () => {
    it('is accessible', async () => {
      const el = await fixture<ForgeMyComponent>(html`
        <forge-my-component>Accessible content</forge-my-component>
      `);

      await expect(el).to.be.accessible();
    });

    it('supports keyboard navigation', async () => {
      const el = await fixture<ForgeMyComponent>(html`
        <forge-my-component>Keyboard test</forge-my-component>
      `);

      el.focus();
      await sendKeys({ press: 'Tab' });

      // Test keyboard interactions
    });
  });

  describe('States', () => {
    it('handles disabled state correctly', async () => {
      const el = await fixture<ForgeMyComponent>(html`
        <forge-my-component disabled>Disabled</forge-my-component>
      `);

      expect(el.tabIndex).to.equal(-1);

      const eventSpy = sinon.spy();
      el.addEventListener('forge-my-component-focus', eventSpy);

      el.focus();
      expect(eventSpy).to.not.have.been.called;
    });
  });
});
```

### Testing Requirements

- **Unit Tests**: 90%+ code coverage
- **Accessibility Tests**: Every component must pass a11y audits
- **Visual Tests**: Storybook stories for all states/variants
- **Integration Tests**: Complex component interactions
- **Performance Tests**: Bundle size and render performance

## Documentation Standards

### Component Documentation

Each component requires:

1. **JSDoc Comments**: Comprehensive API documentation
2. **Storybook Stories**: Interactive examples
3. **README**: Component-specific usage guide
4. **TypeScript Declarations**: Full type information

### Storybook Stories

```typescript
// my-component.stories.ts
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './my-component';

const meta: Meta = {
  title: 'Atoms/MyComponent',
  component: 'forge-my-component',
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary'],
      description: 'Visual style variant',
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
      description: 'Component size',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable component interaction',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'A flexible component for displaying content with various styles and states.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'md',
    disabled: false,
  },
  render: (args) => html`
    <forge-my-component variant=${args.variant} size=${args.size} ?disabled=${args.disabled}>
      Default Content
    </forge-my-component>
  `,
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem;">
      <forge-my-component variant="default">Default</forge-my-component>
      <forge-my-component variant="primary">Primary</forge-my-component>
      <forge-my-component variant="secondary">Secondary</forge-my-component>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'All available component variants',
      },
    },
  },
};
```

## Performance Optimization

### Bundle Size Guidelines

- **Individual Component**: < 5KB average, < 10KB maximum
- **Use Tree Shaking**: Export components individually
- **Minimize Dependencies**: Prefer platform APIs over libraries
- **Optimize Styles**: Use efficient CSS patterns

### Runtime Performance

```typescript
// ✅ Efficient rendering patterns
render() {
  // Cache complex calculations
  const computedClasses = this._computeClasses();

  return html`
    <div class=${computedClasses}>
      ${this.items.map(item => this._renderItem(item))}
    </div>
  `;
}

// ✅ Use willUpdate for expensive operations
protected willUpdate(changedProperties: PropertyValues) {
  if (changedProperties.has('items')) {
    this._processItems();
  }
}

// ❌ Avoid expensive operations in render
render() {
  return html`
    <div>
      ${this.items.filter(item => item.visible).map(item => html`...`)}
    </div>
  `;
}
```

## Accessibility Requirements

All components must meet WCAG 2.1 AA standards:

### Keyboard Navigation

```typescript
protected _handleKeyDown(e: KeyboardEvent) {
  switch (e.key) {
    case 'Enter':
    case ' ':
      e.preventDefault();
      this._activate();
      break;
    case 'Escape':
      this._close();
      break;
    case 'ArrowDown':
      this._focusNext();
      break;
    // ... other keys
  }
}
```

### Screen Reader Support

```typescript
render() {
  return html`
    <div
      role="button"
      aria-label=${this.ariaLabel || this.textContent}
      aria-pressed=${this.pressed}
      aria-disabled=${this.disabled}
      aria-describedby=${this.ariaDescribedBy || nothing}
    >
      <slot></slot>
    </div>
  `;
}
```

### Color and Contrast

- Minimum 4.5:1 contrast ratio for normal text
- Minimum 3:1 contrast ratio for large text
- Focus indicators must be visible and have sufficient contrast

## Release Process

### Semantic Versioning

- **Major** (x.0.0): Breaking changes
- **Minor** (0.x.0): New features, backward compatible
- **Patch** (0.0.x): Bug fixes, backward compatible

### Release Checklist

1. Update CHANGELOG.md
2. Run full test suite
3. Update documentation
4. Build and test in example applications
5. Create release PR
6. Tag release after merge
7. Publish to npm
8. Update documentation site

## Getting Help

- **Internal Discussion**: Use GitHub Discussions
- **Bug Reports**: Create detailed GitHub Issues
- **Feature Requests**: RFC process via GitHub Issues
- **Code Review**: All changes require review from 2+ maintainers

Remember: Quality over speed. Every component should be production-ready, well-tested, and thoroughly documented.
