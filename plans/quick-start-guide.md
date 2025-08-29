# Quick Start Guide - Day 1 Implementation

## Immediate Action Items (In Order)

### Step 1: Initialize Project (30 minutes)
```bash
# Create project structure
mkdir -p src/core src/components/atoms/button src/tokens
mkdir -p tests/unit tests/e2e docs scripts

# Initialize npm project
npm init -y

# Install core dependencies
npm install lit@^3.0.0 typescript@^5.0.0
npm install -D vite@^5.0.0 @web/test-runner @open-wc/testing
npm install -D eslint prettier @typescript-eslint/eslint-plugin
```

### Step 2: Create Critical Configuration Files (30 minutes)

#### `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "moduleResolution": "node",
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

#### `vite.config.ts`
```typescript
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ForgeUI',
      formats: ['es', 'umd'],
      fileName: (format) => `forge-ui.${format}.js`
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {}
      }
    }
  },
  server: {
    open: '/demo/index.html'
  }
});
```

### Step 3: Implement BaseElement (1 hour)

#### `src/core/BaseElement.ts`
```typescript
import { LitElement, PropertyValues } from 'lit';

export abstract class BaseElement extends LitElement {
  // Event emission helper
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

  // Accessibility helpers
  protected announceToScreenReader(message: string): void {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  }

  // Lifecycle hooks
  protected firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);
    this.setAttribute('data-ready', 'true');
  }

  // Focus management helpers
  protected trapFocus(container: HTMLElement = this): void {
    const focusableElements = container.querySelectorAll(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0] as HTMLElement;
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

    container.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey && document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable?.focus();
      } else if (!e.shiftKey && document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable?.focus();
      }
    });
  }
}
```

### Step 4: Create Design Tokens (30 minutes)

#### `src/tokens/base.css`
```css
:root {
  /* Colors - Primary Palette */
  --forge-color-primary-50: #e3f2fd;
  --forge-color-primary-100: #bbdefb;
  --forge-color-primary-200: #90caf9;
  --forge-color-primary-300: #64b5f6;
  --forge-color-primary-400: #42a5f5;
  --forge-color-primary-500: #2196f3;
  --forge-color-primary-600: #1e88e5;
  --forge-color-primary-700: #1976d2;
  --forge-color-primary-800: #1565c0;
  --forge-color-primary-900: #0d47a1;

  /* Colors - Semantic */
  --forge-color-error: #f44336;
  --forge-color-warning: #ff9800;
  --forge-color-success: #4caf50;
  --forge-color-info: #2196f3;

  /* Spacing (4px base unit) */
  --forge-spacing-xs: 4px;
  --forge-spacing-sm: 8px;
  --forge-spacing-md: 16px;
  --forge-spacing-lg: 24px;
  --forge-spacing-xl: 32px;
  --forge-spacing-2xl: 48px;

  /* Typography */
  --forge-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --forge-font-size-xs: 0.75rem;
  --forge-font-size-sm: 0.875rem;
  --forge-font-size-base: 1rem;
  --forge-font-size-lg: 1.125rem;
  --forge-font-size-xl: 1.25rem;
  --forge-font-size-2xl: 1.5rem;

  /* Borders */
  --forge-border-radius-sm: 4px;
  --forge-border-radius-md: 8px;
  --forge-border-radius-lg: 12px;
  --forge-border-radius-full: 9999px;

  /* Shadows */
  --forge-shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --forge-shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --forge-shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --forge-shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);

  /* Transitions */
  --forge-transition-fast: 150ms ease-in-out;
  --forge-transition-base: 250ms ease-in-out;
  --forge-transition-slow: 350ms ease-in-out;

  /* Z-index */
  --forge-z-dropdown: 1000;
  --forge-z-modal: 1050;
  --forge-z-popover: 1100;
  --forge-z-tooltip: 1150;
}
```

### Step 5: Implement First Component - Button (1 hour)

#### `src/components/atoms/button/button.ts`
```typescript
import { html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { BaseElement } from '../../../core/BaseElement';

@customElement('forge-button')
export class ForgeButton extends BaseElement {
  static styles = css`
    :host {
      display: inline-block;
      --button-height-sm: 32px;
      --button-height-md: 40px;
      --button-height-lg: 48px;
      --button-padding-sm: 0 12px;
      --button-padding-md: 0 16px;
      --button-padding-lg: 0 20px;
    }

    .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--forge-spacing-sm);
      font-family: var(--forge-font-family);
      font-size: var(--forge-font-size-base);
      font-weight: 500;
      border: none;
      border-radius: var(--forge-border-radius-md);
      cursor: pointer;
      transition: all var(--forge-transition-fast);
      width: 100%;
      height: var(--button-height-md);
      padding: var(--button-padding-md);
      position: relative;
      overflow: hidden;
    }

    /* Variants */
    .button--primary {
      background-color: var(--forge-color-primary-500);
      color: white;
    }

    .button--primary:hover:not(:disabled) {
      background-color: var(--forge-color-primary-600);
    }

    .button--secondary {
      background-color: transparent;
      color: var(--forge-color-primary-500);
      border: 1px solid var(--forge-color-primary-500);
    }

    .button--secondary:hover:not(:disabled) {
      background-color: var(--forge-color-primary-50);
    }

    .button--danger {
      background-color: var(--forge-color-error);
      color: white;
    }

    .button--danger:hover:not(:disabled) {
      filter: brightness(0.9);
    }

    /* Sizes */
    .button--sm {
      height: var(--button-height-sm);
      padding: var(--button-padding-sm);
      font-size: var(--forge-font-size-sm);
    }

    .button--lg {
      height: var(--button-height-lg);
      padding: var(--button-padding-lg);
      font-size: var(--forge-font-size-lg);
    }

    /* States */
    .button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .button--loading {
      color: transparent;
    }

    .spinner {
      position: absolute;
      width: 16px;
      height: 16px;
      border: 2px solid currentColor;
      border-right-color: transparent;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* Focus styles */
    .button:focus-visible {
      outline: 2px solid var(--forge-color-primary-500);
      outline-offset: 2px;
    }

    /* Ripple effect */
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
    }

    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;

  @property({ type: String }) variant: 'primary' | 'secondary' | 'danger' = 'primary';
  @property({ type: String }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) loading = false;
  @property({ type: String }) type: 'button' | 'submit' | 'reset' = 'button';

  @state() private ripples: Array<{ x: number; y: number; id: number }> = [];

  render() {
    const classes = {
      'button': true,
      [`button--${this.variant}`]: true,
      [`button--${this.size}`]: true,
      'button--loading': this.loading
    };

    return html`
      <button
        class=${classMap(classes)}
        ?disabled=${this.disabled || this.loading}
        type=${this.type}
        @click=${this.handleClick}
        part="button"
        aria-busy=${this.loading ? 'true' : 'false'}
        aria-disabled=${this.disabled ? 'true' : 'false'}
      >
        ${this.loading ? html`<span class="spinner"></span>` : ''}
        <slot></slot>
        ${this.ripples.map(ripple => html`
          <span 
            class="ripple" 
            style="left: ${ripple.x}px; top: ${ripple.y}px;"
            @animationend=${() => this.removeRipple(ripple.id)}
          ></span>
        `)}
      </button>
    `;
  }

  private handleClick(e: MouseEvent) {
    if (!this.disabled && !this.loading) {
      // Add ripple effect
      const rect = this.getBoundingClientRect();
      const ripple = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        id: Date.now()
      };
      this.ripples = [...this.ripples, ripple];

      // Emit click event
      this.emit('forge-click', { 
        variant: this.variant,
        size: this.size 
      });
    }
  }

  private removeRipple(id: number) {
    this.ripples = this.ripples.filter(r => r.id !== id);
  }

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    
    if (changedProperties.has('loading')) {
      if (this.loading) {
        this.announceToScreenReader('Loading, please wait');
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-button': ForgeButton;
  }
}
```

### Step 6: Create Test for Button (30 minutes)

#### `src/components/atoms/button/button.test.ts`
```typescript
import { fixture, expect, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import sinon from 'sinon';
import './button';
import type { ForgeButton } from './button';

describe('ForgeButton', () => {
  it('renders with default properties', async () => {
    const el = await fixture<ForgeButton>(html`
      <forge-button>Click me</forge-button>
    `);

    expect(el.variant).to.equal('primary');
    expect(el.size).to.equal('md');
    expect(el.disabled).to.be.false;
    expect(el.loading).to.be.false;
  });

  it('renders slot content', async () => {
    const el = await fixture<ForgeButton>(html`
      <forge-button>Button Text</forge-button>
    `);

    expect(el).to.have.text('Button Text');
  });

  it('emits forge-click event on click', async () => {
    const el = await fixture<ForgeButton>(html`
      <forge-button>Click</forge-button>
    `);
    const clickSpy = sinon.spy();
    el.addEventListener('forge-click', clickSpy);

    el.click();

    expect(clickSpy).to.have.been.calledOnce;
    expect(clickSpy.args[0][0].detail).to.deep.equal({
      variant: 'primary',
      size: 'md'
    });
  });

  it('does not emit click when disabled', async () => {
    const el = await fixture<ForgeButton>(html`
      <forge-button disabled>Disabled</forge-button>
    `);
    const clickSpy = sinon.spy();
    el.addEventListener('forge-click', clickSpy);

    el.click();

    expect(clickSpy).to.not.have.been.called;
  });

  it('supports keyboard activation', async () => {
    const el = await fixture<ForgeButton>(html`
      <forge-button>Press</forge-button>
    `);
    const clickSpy = sinon.spy();
    el.addEventListener('forge-click', clickSpy);

    el.focus();
    await sendKeys({ press: 'Enter' });

    expect(clickSpy).to.have.been.calledOnce;
  });

  it('applies correct variant styles', async () => {
    const el = await fixture<ForgeButton>(html`
      <forge-button variant="danger">Danger</forge-button>
    `);

    const button = el.shadowRoot!.querySelector('.button');
    expect(button).to.have.class('button--danger');
  });

  it('shows loading spinner when loading', async () => {
    const el = await fixture<ForgeButton>(html`
      <forge-button loading>Loading</forge-button>
    `);

    const spinner = el.shadowRoot!.querySelector('.spinner');
    expect(spinner).to.exist;
    expect(el.shadowRoot!.querySelector('.button')).to.have.class('button--loading');
  });
});
```

### Step 7: Create Index Files (15 minutes)

#### `src/index.ts`
```typescript
// Core
export { BaseElement } from './core/BaseElement';

// Atoms
export { ForgeButton } from './components/atoms/button/button';
```

#### `src/components/atoms/button/index.ts`
```typescript
export { ForgeButton } from './button';
```

### Step 8: Create Demo Page (15 minutes)

#### `demo/index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Forge UI Components Demo</title>
  <link rel="stylesheet" href="../src/tokens/base.css">
  <script type="module" src="../src/index.ts"></script>
  <style>
    body {
      font-family: var(--forge-font-family);
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    .demo-section {
      margin-bottom: 3rem;
    }
    .demo-section h2 {
      margin-bottom: 1rem;
      color: var(--forge-color-primary-700);
    }
    .demo-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 1rem;
    }
  </style>
</head>
<body>
  <h1>Forge UI Components</h1>

  <div class="demo-section">
    <h2>Button Component</h2>
    
    <h3>Variants</h3>
    <div class="demo-grid">
      <forge-button variant="primary">Primary Button</forge-button>
      <forge-button variant="secondary">Secondary Button</forge-button>
      <forge-button variant="danger">Danger Button</forge-button>
    </div>

    <h3>Sizes</h3>
    <div class="demo-grid">
      <forge-button size="sm">Small</forge-button>
      <forge-button size="md">Medium</forge-button>
      <forge-button size="lg">Large</forge-button>
    </div>

    <h3>States</h3>
    <div class="demo-grid">
      <forge-button>Normal</forge-button>
      <forge-button disabled>Disabled</forge-button>
      <forge-button loading>Loading</forge-button>
    </div>
  </div>

  <script>
    // Example event handling
    document.addEventListener('forge-click', (e) => {
      console.log('Button clicked:', e.detail);
    });
  </script>
</body>
</html>
```

## Next Steps After Day 1

### Day 2: Critical Infrastructure & Token API
1. Document Token API as stable contract
2. Set up Web Test Runner configuration  
3. Create component generator with token-first templates
4. Initialize Storybook: `npx storybook@latest init`
5. Verify Button uses tokens exclusively (no hardcoded values)
6. Plan Alert component (Phase 1 priority)

### Day 4-5: Build Pipeline
1. Configure multiple entry points in Vite
2. Set up GitHub Actions CI/CD
3. Configure bundle size analysis
4. Set up Chromatic for visual testing

### Week 2: Complete Phase 0
1. Implement remaining atomic components (Input, Icon)
2. Create component generator script
3. Set up framework integration test apps
4. Document component patterns

## Success Checklist for Day 1
- [ ] Project initialized with npm/TypeScript/Lit
- [ ] BaseElement class implemented and tested
- [ ] Design tokens created
- [ ] Button component fully functional
- [ ] Tests passing for Button
- [ ] Demo page showing all Button variants
- [ ] Development server running: `npm run dev`

## Common Issues & Solutions

### Issue: TypeScript decorator errors
**Solution**: Ensure `experimentalDecorators: true` and `useDefineForClassFields: false` in tsconfig.json

### Issue: Vite not serving demo page
**Solution**: Add `server: { open: '/demo/index.html' }` to vite.config.ts

### Issue: Tests not finding components
**Solution**: Ensure proper module resolution in web-test-runner.config.js

### Issue: CSS Custom Properties not working
**Solution**: Import base.css in demo page or component styles

## Bundle Size Targets (Clarified)

- **Core library** (BaseElement + utilities): < 10KB
- **Individual component**: < 5KB average, < 10KB max
- **Full component suite** (all atoms): < 50KB
- **With framework wrappers**: +5KB per framework

## Measurement: 
```bash
npm run build && ls -lh dist/
```