# ForgeToast

Flexible notification system with individual toast components and global container management for user feedback and alerts.

## Overview

The ForgeToast system provides a comprehensive notification solution with individual toast components and a global container system. It supports multiple variants, auto-dismiss functionality, progress indicators, and queue management while maintaining accessibility and performance standards.

## Key Features

- **Multiple Variants**: Info, success, warning, and error types
- **Auto-Dismiss**: Configurable timeout with progress indicators
- **Queue Management**: Global container with positioning options
- **Interactive Elements**: Dismissible with custom actions
- **Progress Visualization**: Optional progress bars for timed toasts
- **Accessibility**: Full ARIA support and keyboard navigation
- **Global Helpers**: Utility functions for easy toast creation
- **AI-Ready**: Complete AI metadata for state explanation

## Basic Usage

### Individual Toast Component

```html
<forge-toast variant="success" title="Success!" message="Operation completed successfully">
</forge-toast>
```

### Global Toast System

```html
<!-- Add container to your app -->
<forge-toast-container position="top-right"></forge-toast-container>

<script>
  import { showToast } from '@nexcraft/forge/utils';
  
  // Show a simple toast
  showToast({
    message: "Hello World!",
    variant: "info"
  });
  
  // Show toast with title and custom duration
  showToast({
    title: "Success!",
    message: "Your changes have been saved.",
    variant: "success",
    duration: 3000
  });
</script>
```

## Advanced Usage

### Custom Toast with Progress

```html
<forge-toast
  variant="warning"
  title="Processing..."
  message="Please wait while we process your request"
  duration="10000"
  persistent="false"
  show-progress="true"
  dismissible="true"
  toast-id="process-toast"
  @toast-dismissed="${handleToastDismissed}"
>
</forge-toast>
```

### Global Container Configuration

```html
<forge-toast-container
  position="bottom-center"
  max-toasts="5"
  spacing="8px"
  auto-remove-delay="500"
>
</forge-toast-container>
```

## Properties

### ForgeToast Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `title` | `string` | `''` | Optional toast title |
| `message` | `string` | `''` | Main toast message content |
| `variant` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Toast type and styling |
| `duration` | `number` | `5000` | Auto-dismiss duration in milliseconds (0 = no auto-dismiss) |
| `persistent` | `boolean` | `false` | Prevents auto-dismiss when true |
| `dismissible` | `boolean` | `true` | Shows dismiss button when true |
| `showProgress` | `boolean` | `false` | Shows progress bar for timed toasts |
| `toastId` | `string` | `undefined` | Unique identifier for the toast |

### ForgeToastContainer Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `position` | `'top-left' \| 'top-center' \| 'top-right' \| 'bottom-left' \| 'bottom-center' \| 'bottom-right'` | `'top-right'` | Container position |
| `maxToasts` | `number` | `5` | Maximum number of visible toasts |
| `spacing` | `string` | `'12px'` | Space between toasts |
| `autoRemoveDelay` | `number` | `300` | Delay before removing dismissed toasts |

## Events

### ForgeToast Events

| Event | Detail | Description |
|-------|--------|-------------|
| `toast-dismissed` | `{ toastId: string }` | Fired when toast is dismissed |

## Methods

### ForgeToast Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `dismiss()` | - | `void` | Manually dismiss the toast |
| `pause()` | - | `void` | Pause auto-dismiss timer |
| `resume()` | - | `void` | Resume auto-dismiss timer |

### ForgeToastContainer Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `addToast(options)` | `ToastOptions` | `string` | Add new toast and return ID |
| `removeToast(id)` | `string` | `void` | Remove specific toast by ID |
| `clearAll()` | - | `void` | Clear all toasts |

## Global Utility Functions

```typescript
// Show toast with various options
showToast({
  title?: string;
  message: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
  persistent?: boolean;
  dismissible?: boolean;
  showProgress?: boolean;
}): string

// Convenience methods
showToast.success(message: string, options?: Partial<ToastOptions>): string
showToast.error(message: string, options?: Partial<ToastOptions>): string
showToast.warning(message: string, options?: Partial<ToastOptions>): string
showToast.info(message: string, options?: Partial<ToastOptions>): string

// Container management
getToastContainer(): ForgeToastContainer | null
clearAllToasts(): void
```

## CSS Custom Properties

### ForgeToast Styling

```css
forge-toast {
  /* Toast colors by variant */
  --toast-info-bg: var(--forge-color-info-50);
  --toast-info-border: var(--forge-color-info-200);
  --toast-info-text: var(--forge-color-info-800);
  
  --toast-success-bg: var(--forge-color-success-50);
  --toast-success-border: var(--forge-color-success-200);
  --toast-success-text: var(--forge-color-success-800);
  
  --toast-warning-bg: var(--forge-color-warning-50);
  --toast-warning-border: var(--forge-color-warning-200);
  --toast-warning-text: var(--forge-color-warning-800);
  
  --toast-error-bg: var(--forge-color-error-50);
  --toast-error-border: var(--forge-color-error-200);
  --toast-error-text: var(--forge-color-error-800);
  
  /* Layout */
  --toast-border-radius: 8px;
  --toast-padding: 16px;
  --toast-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  --toast-max-width: 400px;
  
  /* Animation */
  --toast-animation-duration: 300ms;
  --toast-animation-timing: ease-out;
}
```

## Accessibility

### ARIA Support

- **Role Management**: Automatically sets `role="status"` for info toasts, `role="alert"` for errors
- **Live Regions**: Uses `aria-live="polite"` or `aria-live="assertive"` based on variant
- **Focus Management**: Proper focus handling for dismiss buttons
- **Screen Reader**: Accessible labels and descriptions

### Keyboard Navigation

- **Escape**: Dismiss focusable toasts
- **Tab**: Navigate to dismiss button when available
- **Enter/Space**: Activate dismiss button

## Framework Integration

### React

```tsx
import { useEffect } from 'react';
import { showToast } from '@nexcraft/forge/utils';

function MyComponent() {
  const handleSuccess = () => {
    showToast.success('Operation completed!');
  };
  
  return (
    <>
      <forge-toast-container position="top-right" />
      <button onClick={handleSuccess}>Success</button>
    </>
  );
}
```

### Vue

```vue
<template>
  <div>
    <forge-toast-container position="top-right" />
    <button @click="showSuccess">Success</button>
  </div>
</template>

<script setup>
import { showToast } from '@nexcraft/forge/utils';

const showSuccess = () => {
  showToast.success('Operation completed!');
};
</script>
```

### Angular

```typescript
import { Component } from '@angular/core';
import { showToast } from '@nexcraft/forge/utils';

@Component({
  template: `
    <forge-toast-container position="top-right"></forge-toast-container>
    <button (click)="showSuccess()">Success</button>
  `
})
export class MyComponent {
  showSuccess() {
    showToast.success('Operation completed!');
  }
}
```

## Examples

### Basic Notification

```html
<script>
  // Simple notification
  showToast({
    message: "Settings saved successfully",
    variant: "success"
  });
</script>
```

### Form Validation Errors

```html
<script>
  function handleFormError(errors) {
    errors.forEach(error => {
      showToast.error(error.message, {
        duration: 8000,
        persistent: true
      });
    });
  }
</script>
```

### Progress Notification

```html
<script>
  const toastId = showToast({
    title: "Uploading...",
    message: "Please wait while we upload your files",
    variant: "info",
    duration: 10000,
    showProgress: true,
    persistent: false
  });
  
  // Update progress or dismiss when done
  setTimeout(() => {
    document.querySelector(`forge-toast[toast-id="${toastId}"]`)?.dismiss();
    showToast.success("Upload completed!");
  }, 8000);
</script>
```

## AI Integration

### State Explanation

```typescript
const toast = document.querySelector('forge-toast');
console.log(toast.explainState());
// "Toast is info variant, auto-dismissing in 3.2 seconds, user can dismiss manually"
```

### Possible Actions

```typescript
const actions = toast.getPossibleActions();
// [
//   { name: 'dismiss', available: true, description: 'Manually dismiss the toast' },
//   { name: 'pause', available: true, description: 'Pause auto-dismiss timer' }
// ]
```

## Performance

- **Lightweight**: <8KB total for both components
- **Efficient Animations**: GPU-accelerated transforms
- **Memory Management**: Automatic cleanup of dismissed toasts
- **Queue Optimization**: Smart batching and rendering

## Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Polyfills**: Automatic Custom Elements v1 polyfill when needed
- **Mobile**: Full iOS Safari and Chrome Android support

## Migration

### From Native Browser Notifications

```javascript
// Before: Browser notifications
if (Notification.permission === 'granted') {
  new Notification('Title', { body: 'Message' });
}

// After: ForgeToast
showToast({
  title: 'Title',
  message: 'Message',
  variant: 'info'
});
```

### From Other Toast Libraries

```javascript
// Before: react-toastify
toast.success('Message', { position: 'top-right' });

// After: ForgeToast
showToast.success('Message'); // Uses container position
```