# ForgeButton Component

A versatile, accessible button component with multiple variants, sizes, and states. Features AI-ready architecture, performance monitoring, and comprehensive accessibility support.

## Installation

```javascript
import '@nexcraft/forge/button';
```

## Basic Usage

```html
<forge-button variant="primary">Click Me</forge-button>
```

## Live Examples

### Variants

```html
<!-- Primary (default) -->
<forge-button variant="primary">Primary Button</forge-button>

<!-- Secondary -->
<forge-button variant="secondary">Secondary Button</forge-button>

<!-- Danger -->
<forge-button variant="danger">Delete Item</forge-button>

<!-- Ghost -->
<forge-button variant="ghost">Ghost Button</forge-button>

<!-- Link -->
<forge-button variant="link">Link Button</forge-button>
```

### Sizes

```html
<!-- Small -->
<forge-button size="sm">Small Button</forge-button>

<!-- Medium (default) -->
<forge-button size="md">Medium Button</forge-button>

<!-- Large -->
<forge-button size="lg">Large Button</forge-button>
```

### States

```html
<!-- Loading state -->
<forge-button loading>
  Processing...
</forge-button>

<!-- Disabled state -->
<forge-button disabled>
  Disabled Button
</forge-button>

<!-- Full width -->
<forge-button full-width>
  Full Width Button
</forge-button>
```

### With Icons

```html
<!-- Icon with text -->
<forge-button>
  <forge-icon slot="start" name="plus"></forge-icon>
  Add Item
</forge-button>

<!-- Icon only -->
<forge-button variant="ghost" aria-label="Settings">
  <forge-icon name="settings"></forge-icon>
</forge-button>

<!-- Icon on right -->
<forge-button>
  Next
  <forge-icon slot="end" name="arrow-right"></forge-icon>
</forge-button>
```

## API Reference

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'danger' \| 'ghost' \| 'link'` | `'primary'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `disabled` | `boolean` | `false` | Disable button interactions |
| `loading` | `boolean` | `false` | Show loading spinner and disable interactions |
| `fullWidth` | `boolean` | `false` | Expand button to full container width |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type attribute |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `click` | `MouseEvent` | Standard click event |
| `forge-click` | `{ timestamp: number }` | Custom click event with metadata |
| `forge-loading-start` | `void` | Fired when loading starts |
| `forge-loading-end` | `void` | Fired when loading ends |

### Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `click()` | `(): void` | Programmatically trigger click |
| `focus()` | `(options?: FocusOptions): void` | Focus the button |
| `blur()` | `(): void` | Remove focus from button |

### Slots

| Slot | Description |
|------|-------------|
| (default) | Button content |
| `start` | Content before the label (typically an icon) |
| `end` | Content after the label (typically an icon) |

## Styling

### CSS Custom Properties

```css
/* Color tokens */
--forge-button-primary-bg: var(--forge-color-primary, #3b82f6);
--forge-button-primary-hover: var(--forge-color-primary-dark, #2563eb);
--forge-button-primary-active: var(--forge-color-primary-darker, #1d4ed8);
--forge-button-primary-text: white;

--forge-button-secondary-bg: var(--forge-color-secondary, #64748b);
--forge-button-secondary-hover: var(--forge-color-secondary-dark, #475569);
--forge-button-secondary-text: white;

--forge-button-danger-bg: var(--forge-color-danger, #ef4444);
--forge-button-danger-hover: var(--forge-color-danger-dark, #dc2626);
--forge-button-danger-text: white;

/* Size tokens */
--forge-button-height-sm: 32px;
--forge-button-height-md: 40px;
--forge-button-height-lg: 48px;

--forge-button-padding-sm: 0 12px;
--forge-button-padding-md: 0 16px;
--forge-button-padding-lg: 0 20px;

--forge-button-font-size-sm: 13px;
--forge-button-font-size-md: 14px;
--forge-button-font-size-lg: 16px;

/* Other tokens */
--forge-button-radius: var(--forge-radius-md, 6px);
--forge-button-transition: all 0.2s ease;
--forge-button-ripple-color: rgba(255, 255, 255, 0.3);
```

### Custom Styling Examples

```css
/* Custom primary button colors */
forge-button[variant="primary"] {
  --forge-button-primary-bg: #10b981;
  --forge-button-primary-hover: #059669;
}

/* Rounded buttons */
forge-button {
  --forge-button-radius: 9999px;
}

/* Custom size */
forge-button.custom-size {
  --forge-button-height-md: 44px;
  --forge-button-font-size-md: 15px;
}
```

## Advanced Features

### Ripple Effect

The button includes a ripple effect on click for better user feedback:

```javascript
// Disable ripple effect
button.rippleDisabled = true;

// Custom ripple color
button.style.setProperty('--forge-button-ripple-color', 'rgba(0, 123, 255, 0.3)');
```

### Loading State Management

```javascript
const button = document.querySelector('forge-button');

// Start loading
button.loading = true;

// Async operation
try {
  await saveData();
} finally {
  // Always clear loading state
  button.loading = false;
}
```

### Form Integration

```html
<form @submit="${handleSubmit}">
  <forge-input name="email" required></forge-input>
  
  <!-- Submit button -->
  <forge-button type="submit" variant="primary">
    Submit Form
  </forge-button>
  
  <!-- Reset button -->
  <forge-button type="reset" variant="ghost">
    Reset
  </forge-button>
</form>
```

## AI-Ready Features

### AI Metadata

```javascript
button.aiMetadata = {
  purpose: 'Submit form data to server',
  criticality: 'high',
  semanticRole: 'action-trigger',
  context: 'user-registration-form'
};
```

### AI Helper Methods

```javascript
// Get natural language description
button.getAIDescription();
// Returns: "Primary submit button for user registration, currently enabled"

// Get possible actions
button.getPossibleActions();
// Returns: [
//   { name: 'click', description: 'Submit the form', available: true },
//   { name: 'disable', description: 'Disable the button', available: true }
// ]

// Explain current state
button.explainState();
// Returns: {
//   currentState: 'enabled',
//   possibleStates: ['enabled', 'disabled', 'loading'],
//   stateDescription: 'Button is ready for user interaction'
// }
```

## Performance Monitoring

### Enable Performance Metrics

```html
<forge-button
  dev-mode
  show-metrics
  max-render-ms="16"
  warn-on-violation
>
  Performance Monitored
</forge-button>
```

### Performance Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `dev-mode` | `boolean` | `false` | Enable development features |
| `show-metrics` | `boolean` | `false` | Display performance overlay |
| `max-render-ms` | `number` | `16` | Performance budget in milliseconds |
| `warn-on-violation` | `boolean` | `false` | Log warnings when budget exceeded |
| `performance-mode` | `'auto' \| 'fast' \| 'normal'` | `'auto'` | Performance optimization mode |

## Accessibility

### WCAG 2.1 AA Compliance

- ✅ Full keyboard navigation (Tab, Enter, Space)
- ✅ Screen reader announcements
- ✅ Focus indicators (customizable)
- ✅ Disabled state management
- ✅ Loading state announcements
- ✅ Color contrast ratios (4.5:1 minimum)

### ARIA Attributes

The component automatically manages ARIA attributes:

```html
<!-- Rendered output -->
<forge-button
  role="button"
  tabindex="0"
  aria-disabled="false"
  aria-busy="false"
  aria-pressed="false"
>
  Button Text
</forge-button>

<!-- Loading state -->
<forge-button
  aria-busy="true"
  aria-label="Processing, please wait"
>
  <span aria-hidden="true">Loading...</span>
</forge-button>
```

### Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Focus button |
| `Enter` | Activate button |
| `Space` | Activate button |
| `Escape` | Blur button (remove focus) |

## Use Cases

### Call-to-Action

```html
<forge-button variant="primary" size="lg" @click="${signUp}">
  Start Free Trial
</forge-button>
```

### Confirmation Dialog

```html
<div class="dialog-actions">
  <forge-button variant="ghost" @click="${cancel}">
    Cancel
  </forge-button>
  <forge-button variant="danger" @click="${confirm}">
    Delete Account
  </forge-button>
</div>
```

### Social Login

```html
<forge-button variant="secondary" full-width>
  <forge-icon slot="start" name="google"></forge-icon>
  Continue with Google
</forge-button>
```

### Pagination

```html
<div class="pagination">
  <forge-button variant="ghost" size="sm" disabled>
    <forge-icon name="chevron-left"></forge-icon>
    Previous
  </forge-button>
  <forge-button variant="ghost" size="sm">
    Next
    <forge-icon name="chevron-right"></forge-icon>
  </forge-button>
</div>
```

## Framework Integration

### React

```jsx
import '@nexcraft/forge/button';

function MyComponent() {
  const handleClick = () => console.log('Clicked');
  
  return (
    <forge-button 
      variant="primary"
      onClick={handleClick}
    >
      React Button
    </forge-button>
  );
}
```

### Vue

```vue
<template>
  <forge-button 
    variant="primary"
    @click="handleClick"
  >
    Vue Button
  </forge-button>
</template>

<script>
import '@nexcraft/forge/button';

export default {
  methods: {
    handleClick() {
      console.log('Clicked');
    }
  }
}
</script>
```

### Angular

```typescript
import '@nexcraft/forge/button';

@Component({
  template: `
    <forge-button 
      variant="primary"
      (click)="handleClick()"
    >
      Angular Button
    </forge-button>
  `
})
export class MyComponent {
  handleClick() {
    console.log('Clicked');
  }
}
```

## Testing

### Unit Test Example

```typescript
import { fixture, html } from '@open-wc/testing';
import { expect } from '@esm-bundle/chai';
import '@nexcraft/forge/button';

describe('forge-button', () => {
  it('should render with text', async () => {
    const el = await fixture(html`
      <forge-button>Test Button</forge-button>
    `);
    
    expect(el.textContent).to.include('Test Button');
  });
  
  it('should handle click events', async () => {
    const el = await fixture(html`
      <forge-button></forge-button>
    `);
    
    let clicked = false;
    el.addEventListener('click', () => clicked = true);
    
    el.click();
    expect(clicked).to.be.true;
  });
});
```

## Migration Guide

### From Material UI

```jsx
// Before (Material UI)
<Button variant="contained" color="primary" size="large">
  Click Me
</Button>

// After (Forge)
<forge-button variant="primary" size="lg">
  Click Me
</forge-button>
```

### From Ant Design

```jsx
// Before (Ant Design)
<Button type="primary" size="large" loading={loading}>
  Submit
</Button>

// After (Forge)
<forge-button variant="primary" size="lg" loading={loading}>
  Submit
</forge-button>
```

### From Bootstrap

```html
<!-- Before (Bootstrap) -->
<button class="btn btn-primary btn-lg">
  Large Button
</button>

<!-- After (Forge) -->
<forge-button variant="primary" size="lg">
  Large Button
</forge-button>
```

## Browser Support

- Chrome 67+ ✅
- Firefox 63+ ✅
- Safari 10.1+ ✅
- Edge 79+ ✅

## Related Components

- [ForgeIconButton](./icon-button.md) - Icon-only button variant
- [ForgeButtonGroup](./button-group.md) - Group multiple buttons
- [ForgeIcon](./icon.md) - Icon component for button enhancement

## Changelog

### Version 1.0.0
- Initial release with 5 variants
- Full accessibility support
- AI-ready architecture
- Performance monitoring
- Ripple effect animation

## API Playground

Try the component live in our [Storybook](https://forge-ui.dev/storybook/?path=/story/atoms-button)