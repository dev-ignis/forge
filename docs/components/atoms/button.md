# ForgeButton

Versatile, accessible button component with unified SSR/client architecture for all interactive actions and form submissions.

## Unified SSR Architecture

The ForgeButton component uses our revolutionary **unified wrapper approach** - a single component that works everywhere without any developer configuration:

- **SSR Environment** (Next.js): Renders semantic HTML `<button>` with critical styling
- **Client Environment** (Vite): Renders as web component with full interactivity  
- **Progressive Enhancement**: Seamlessly upgrades from HTML button to web component
- **Graceful Degradation**: Falls back to enhanced HTML button if web components fail

**Single component that works everywhere - no separate SSR/client versions needed.**

## Key Features

- **Multiple Variants**: Primary, secondary, danger, ghost, and link styles
- **Size Options**: Small, medium, and large sizes
- **Loading State**: Built-in spinner and disabled state management
- **Icon Support**: Start and end icon slots with proper spacing
- **Form Integration**: Full form submission and validation support
- **Accessibility**: Complete WCAG 2.1 AA compliance
- **Ripple Effect**: Material-inspired interaction feedback
- **Unified SSR**: Works seamlessly in both SSR and client environments
- **AI-Ready**: Complete AI metadata for intelligent interactions

## Basic Usage

### Import (Works in any React environment)

```tsx
import { ForgeButton } from '@nexcraft/forge/integrations/react';

// Same import works in:
// ✅ Next.js App Router (SSR)
// ✅ Next.js Pages Router (SSR) 
// ✅ Vite (Client-only)
// ✅ CRA (Client-only)
// ✅ Any React SSR framework
```

### Basic Buttons

```tsx
// Primary button (default)
<ForgeButton onClick={handleSubmit}>
  Submit Form
</ForgeButton>

// Secondary button
<ForgeButton variant="secondary" onClick={handleCancel}>
  Cancel
</ForgeButton>

// Danger button
<ForgeButton variant="danger" onClick={handleDelete}>
  Delete Account
</ForgeButton>

// Ghost button
<ForgeButton variant="ghost" onClick={handleEdit}>
  Edit
</ForgeButton>

// Link button
<ForgeButton variant="link" onClick={handleLearnMore}>
  Learn More
</ForgeButton>
```

### Buttons with Icons

```tsx
// Button with start icon
<ForgeButton>
  <ForgeIcon slot="start" name="plus" />
  Add Item
</ForgeButton>

// Button with end icon
<ForgeButton variant="secondary">
  Next Step
  <ForgeIcon slot="end" name="arrow-right" />
</ForgeButton>

// Icon-only button
<ForgeButton variant="ghost" aria-label="Settings">
  <ForgeIcon name="settings" />
</ForgeButton>
```

## Advanced Usage

### Loading State

```tsx
function SubmitButton() {
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await submitForm();
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <ForgeButton 
      loading={loading} 
      disabled={loading}
      onClick={handleSubmit}
    >
      {loading ? 'Submitting...' : 'Submit Form'}
    </ForgeButton>
  );
}
```

### Form Integration

```tsx
<form onSubmit={handleSubmit}>
  <ForgeInput name="email" type="email" required />
  <ForgeInput name="password" type="password" required />
  
  <div className="form-actions">
    <ForgeButton type="submit" variant="primary">
      Sign In
    </ForgeButton>
    <ForgeButton type="reset" variant="ghost">
      Reset
    </ForgeButton>
  </div>
</form>
```

### Full Width Button

```tsx
<ForgeButton 
  variant="primary" 
  size="lg" 
  fullWidth
  onClick={handleContinue}
>
  Continue to Payment
</ForgeButton>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'danger' \| 'ghost' \| 'link'` | `'primary'` | Button visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type |
| `disabled` | `boolean` | `false` | Disable button interactions |
| `loading` | `boolean` | `false` | Show loading spinner |
| `fullWidth` | `boolean` | `false` | Expand to full container width |
| `rippleDisabled` | `boolean` | `false` | Disable ripple effect |
| `autoFocus` | `boolean` | `false` | Auto-focus on mount |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `click` | `MouseEvent` | Standard click event |
| `forge-click` | `{ timestamp: number, variant: string }` | Enhanced click event with metadata |
| `loading-start` | `void` | Fired when loading state begins |
| `loading-end` | `void` | Fired when loading state ends |

## Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `click()` | - | `void` | Programmatically trigger click |
| `focus(options?)` | `FocusOptions` | `void` | Focus the button |
| `blur()` | - | `void` | Remove focus from button |
| `showRipple()` | - | `void` | Trigger ripple effect |

## SSR Fallback Behavior

In SSR environments, ForgeButton renders a semantic HTML button that provides full functionality even without JavaScript:

### Server-Side Rendering
```html
<!-- Primary button rendered during SSR -->
<button 
  class="forge-button forge-button--primary forge-button--md" 
  type="button"
>
  <span class="forge-button__content">Submit Form</span>
</button>

<!-- Button with icons rendered during SSR -->
<button 
  class="forge-button forge-button--secondary" 
  type="button"
>
  <span class="forge-button__icon forge-button__icon--start" aria-hidden="true">+</span>
  <span class="forge-button__content">Add Item</span>
</button>
```

### Client-Side Hydration
```html
<!-- After hydration to web component -->
<forge-button variant="primary">Submit Form</forge-button>
<forge-button variant="secondary">
  <forge-icon slot="start" name="plus"></forge-icon>
  Add Item
</forge-button>
```

## Accessibility

### WCAG 2.1 AA Compliance

- **Keyboard Navigation**: Full Tab, Enter, Space support
- **Focus Management**: Visible focus indicators
- **Screen Reader Support**: Proper ARIA attributes and announcements
- **Color Contrast**: 4.5:1 minimum contrast ratios
- **Loading States**: Accessible loading announcements
- **Disabled States**: Proper disabled state management

### ARIA Support

```tsx
<ForgeButton 
  aria-label="Close dialog"
  aria-describedby="close-help"
  variant="ghost"
>
  <ForgeIcon name="x" />
</ForgeButton>
<div id="close-help" className="sr-only">
  Closes the dialog and discards changes
</div>
```

### Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Focus button |
| `Shift + Tab` | Focus previous element |
| `Enter` | Activate button |
| `Space` | Activate button |
| `Escape` | Remove focus (when appropriate) |

## Framework Integration

### Next.js App Router (SSR)

```tsx
// app/components/SignupForm.tsx - Automatic SSR
import { ForgeButton } from '@nexcraft/forge/integrations/react';

export default function SignupForm() {
  return (
    <form>
      {/* Form fields */}
      <ForgeButton type="submit" variant="primary" size="lg" fullWidth>
        Create Account
      </ForgeButton>
    </form>
  );
}
```

### Vite/CRA (Client-only)

```tsx
// Same component, automatically renders as web component
import { ForgeButton } from '@nexcraft/forge/integrations/react';

function ActionBar() {
  return (
    <div className="action-bar">
      <ForgeButton variant="ghost" onClick={handleEdit}>
        <ForgeIcon slot="start" name="edit" />
        Edit
      </ForgeButton>
      <ForgeButton variant="danger" onClick={handleDelete}>
        <ForgeIcon slot="start" name="trash" />
        Delete
      </ForgeButton>
    </div>
  );
}
```

## Examples

### Call-to-Action

```tsx
function HeroSection() {
  return (
    <section className="hero">
      <h1>Build Better Apps</h1>
      <p>Start building with our unified component system</p>
      <div className="hero-actions">
        <ForgeButton variant="primary" size="lg">
          Get Started Free
        </ForgeButton>
        <ForgeButton variant="ghost" size="lg">
          <ForgeIcon slot="start" name="play" />
          Watch Demo
        </ForgeButton>
      </div>
    </section>
  );
}
```

### Dialog Actions

```tsx
function ConfirmDialog({ onConfirm, onCancel }) {
  return (
    <ForgeModal>
      <h2>Confirm Deletion</h2>
      <p>This action cannot be undone.</p>
      
      <div className="modal-actions">
        <ForgeButton variant="ghost" onClick={onCancel}>
          Cancel
        </ForgeButton>
        <ForgeButton variant="danger" onClick={onConfirm}>
          Delete
        </ForgeButton>
      </div>
    </ForgeModal>
  );
}
```

### Async Action with Loading

```tsx
function SaveButton({ onSave, isDirty }) {
  const [loading, setLoading] = useState(false);
  
  const handleSave = async () => {
    setLoading(true);
    try {
      await onSave();
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <ForgeButton
      variant="primary"
      loading={loading}
      disabled={!isDirty || loading}
      onClick={handleSave}
    >
      {loading ? 'Saving...' : 'Save Changes'}
    </ForgeButton>
  );
}
```

### Social Login Buttons

```tsx
function SocialLogin() {
  return (
    <div className="social-login">
      <ForgeButton variant="secondary" fullWidth>
        <ForgeIcon slot="start" name="google" />
        Continue with Google
      </ForgeButton>
      <ForgeButton variant="secondary" fullWidth>
        <ForgeIcon slot="start" name="github" />
        Continue with GitHub
      </ForgeButton>
      <ForgeButton variant="secondary" fullWidth>
        <ForgeIcon slot="start" name="apple" />
        Continue with Apple
      </ForgeButton>
    </div>
  );
}
```

## CSS Custom Properties

```css
forge-button {
  /* Base styles */
  --button-border-radius: 6px;
  --button-font-weight: 500;
  --button-transition: all 0.2s ease;
  --button-focus-ring: 0 0 0 3px rgba(59, 130, 246, 0.1);
  
  /* Size variants */
  --button-sm-height: 32px;
  --button-sm-padding: 0 12px;
  --button-sm-font-size: 13px;
  
  --button-md-height: 40px;
  --button-md-padding: 0 16px;
  --button-md-font-size: 14px;
  
  --button-lg-height: 48px;
  --button-lg-padding: 0 20px;
  --button-lg-font-size: 16px;
  
  /* Primary variant */
  --button-primary-bg: var(--forge-color-primary-500);
  --button-primary-hover: var(--forge-color-primary-600);
  --button-primary-active: var(--forge-color-primary-700);
  --button-primary-text: white;
  
  /* Secondary variant */
  --button-secondary-bg: var(--forge-color-secondary-500);
  --button-secondary-hover: var(--forge-color-secondary-600);
  --button-secondary-text: white;
  
  /* Danger variant */
  --button-danger-bg: var(--forge-color-error-500);
  --button-danger-hover: var(--forge-color-error-600);
  --button-danger-text: white;
  
  /* Ghost variant */
  --button-ghost-bg: transparent;
  --button-ghost-hover: var(--forge-color-neutral-100);
  --button-ghost-text: var(--forge-color-neutral-700);
  
  /* Link variant */
  --button-link-bg: transparent;
  --button-link-hover: transparent;
  --button-link-text: var(--forge-color-primary-500);
  --button-link-hover-text: var(--forge-color-primary-600);
  
  /* Loading state */
  --button-loading-opacity: 0.7;
  --button-spinner-size: 16px;
  
  /* Ripple effect */
  --button-ripple-color: rgba(255, 255, 255, 0.3);
  --button-ripple-duration: 600ms;
}
```

## AI Integration

### State Explanation

```typescript
const button = document.querySelector('forge-button');
console.log(button.explainState());
// "Primary button ready for interaction, not loading, enabled for user clicks"
```

### Possible Actions

```typescript
const actions = button.getPossibleActions();
// [
//   { name: 'click', available: true, description: 'Trigger button action' },
//   { name: 'focus', available: true, description: 'Focus the button' },
//   { name: 'disable', available: true, description: 'Disable button interactions' }
// ]
```

## Performance

- **Lightweight**: <4KB gzipped including styles
- **SSR Optimized**: Minimal hydration overhead with semantic HTML fallback
- **Hardware Accelerated**: CSS animations use transform and opacity
- **Memory Efficient**: Automatic cleanup of event listeners and animations

## Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **SSR Fallback**: Works in any browser with HTML/CSS support
- **Progressive Enhancement**: Full functionality without JavaScript in SSR

## Related Components

- **[ForgeIcon](./icon.md)** - Icons for button enhancement
- **[ForgeInput](./input.md)** - Form inputs used with buttons
- **[ForgeModal](../molecules/modal.md)** - Dialogs containing action buttons