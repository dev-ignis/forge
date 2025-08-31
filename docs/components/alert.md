# ForgeAlert Component

A versatile notification component for displaying important messages with various severity levels, animations, and dismissible options.

## Installation

```javascript
import '@nexcraft/forge/alert';
```

## Basic Usage

```html
<forge-alert severity="info">
  This is an informational message
</forge-alert>
```

## Live Examples

### Severity Levels

```html
<!-- Info (default) -->
<forge-alert severity="info">
  <strong>Info:</strong> New features have been added to your dashboard
</forge-alert>

<!-- Success -->
<forge-alert severity="success">
  <strong>Success!</strong> Your changes have been saved successfully
</forge-alert>

<!-- Warning -->
<forge-alert severity="warning">
  <strong>Warning:</strong> Your session will expire in 5 minutes
</forge-alert>

<!-- Error -->
<forge-alert severity="error">
  <strong>Error:</strong> Failed to process your request. Please try again
</forge-alert>
```

### With Icons

```html
<!-- Default icon based on severity -->
<forge-alert severity="success" show-icon>
  Operation completed successfully
</forge-alert>

<!-- Custom icon -->
<forge-alert severity="info">
  <forge-icon slot="icon" name="bell"></forge-icon>
  You have 3 new notifications
</forge-alert>
```

### Dismissible Alerts

```html
<!-- Dismissible with close button -->
<forge-alert severity="warning" dismissible>
  This alert can be dismissed by clicking the close button
</forge-alert>

<!-- Auto-dismiss after 5 seconds -->
<forge-alert severity="success" auto-dismiss="5000">
  This message will disappear in 5 seconds
</forge-alert>

<!-- Both dismissible and auto-dismiss -->
<forge-alert severity="info" dismissible auto-dismiss="10000">
  This alert will auto-dismiss in 10 seconds or can be closed manually
</forge-alert>
```

### Alert with Actions

```html
<forge-alert severity="warning">
  <div slot="content">
    Your account requires verification
  </div>
  <div slot="actions">
    <forge-button variant="ghost" size="sm">Dismiss</forge-button>
    <forge-button variant="primary" size="sm">Verify Now</forge-button>
  </div>
</forge-alert>
```

### Compact Mode

```html
<!-- Compact alert with less padding -->
<forge-alert severity="info" compact>
  Compact notification with minimal spacing
</forge-alert>
```

## API Reference

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `severity` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Alert severity level |
| `dismissible` | `boolean` | `false` | Show close button |
| `showIcon` | `boolean` | `false` | Show severity icon |
| `compact` | `boolean` | `false` | Use compact spacing |
| `autoDismiss` | `number` | `0` | Auto-dismiss timeout (ms) |
| `animate` | `boolean` | `true` | Enable animations |
| `variant` | `'filled' \| 'outlined' \| 'soft'` | `'soft'` | Visual variant |
| `title` | `string` | `''` | Alert title |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `forge-dismiss` | `void` | Fired when alert is dismissed |
| `forge-show` | `void` | Fired when alert becomes visible |
| `forge-hide` | `void` | Fired when alert is hidden |
| `forge-action` | `{ action: string }` | Fired when action button clicked |

### Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `show()` | `(): void` | Show the alert |
| `hide()` | `(): void` | Hide the alert |
| `dismiss()` | `(): void` | Dismiss the alert |
| `resetTimer()` | `(): void` | Reset auto-dismiss timer |

### Slots

| Slot | Description |
|------|-------------|
| (default) | Alert message content |
| `icon` | Custom icon |
| `title` | Alert title |
| `content` | Main content area |
| `actions` | Action buttons |

## Styling

### CSS Custom Properties

```css
/* Color tokens for each severity */
--forge-alert-info-bg: #eff6ff;
--forge-alert-info-border: #3b82f6;
--forge-alert-info-text: #1e40af;
--forge-alert-info-icon: #3b82f6;

--forge-alert-success-bg: #f0fdf4;
--forge-alert-success-border: #10b981;
--forge-alert-success-text: #065f46;
--forge-alert-success-icon: #10b981;

--forge-alert-warning-bg: #fffbeb;
--forge-alert-warning-border: #f59e0b;
--forge-alert-warning-text: #78350f;
--forge-alert-warning-icon: #f59e0b;

--forge-alert-error-bg: #fef2f2;
--forge-alert-error-border: #ef4444;
--forge-alert-error-text: #7f1d1d;
--forge-alert-error-icon: #ef4444;

/* Layout tokens */
--forge-alert-padding: 16px;
--forge-alert-padding-compact: 8px 12px;
--forge-alert-radius: var(--forge-radius-md, 6px);
--forge-alert-border-width: 1px;
--forge-alert-icon-size: 20px;
--forge-alert-gap: 12px;

/* Animation tokens */
--forge-alert-animation-duration: 0.3s;
--forge-alert-animation-easing: ease-in-out;
```

### Custom Styling Examples

```css
/* Custom severity colors */
forge-alert[severity="info"] {
  --forge-alert-info-bg: #e0f2fe;
  --forge-alert-info-border: #0284c7;
}

/* Rounded alerts */
forge-alert.rounded {
  --forge-alert-radius: 16px;
}

/* Floating alert style */
forge-alert.floating {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  --forge-alert-radius: 12px;
}

/* Dark theme */
.dark forge-alert[severity="error"] {
  --forge-alert-error-bg: #450a0a;
  --forge-alert-error-text: #fca5a5;
  --forge-alert-error-border: #991b1b;
}
```

## Alert Variants

### Filled Variant

```html
<forge-alert severity="success" variant="filled">
  <strong>Filled alert</strong> with solid background
</forge-alert>
```

### Outlined Variant

```html
<forge-alert severity="warning" variant="outlined">
  <strong>Outlined alert</strong> with border only
</forge-alert>
```

### Soft Variant (Default)

```html
<forge-alert severity="info" variant="soft">
  <strong>Soft alert</strong> with subtle background
</forge-alert>
```

## Alert Positioning

### Toast Notifications

```javascript
// Create toast container
const toastContainer = document.createElement('div');
toastContainer.className = 'toast-container';
document.body.appendChild(toastContainer);

// Show toast
function showToast(message, severity = 'info') {
  const alert = document.createElement('forge-alert');
  alert.severity = severity;
  alert.dismissible = true;
  alert.autoDismiss = 5000;
  alert.animate = true;
  alert.textContent = message;
  
  toastContainer.appendChild(alert);
  
  alert.addEventListener('forge-dismiss', () => {
    alert.remove();
  });
}

// Usage
showToast('File uploaded successfully', 'success');
```

### CSS for Toast Container

```css
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
}

.toast-container forge-alert {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
```

## Alert Stacking

```html
<div class="alert-stack">
  <forge-alert severity="error" dismissible>
    Critical system error detected
  </forge-alert>
  <forge-alert severity="warning" dismissible>
    High memory usage warning
  </forge-alert>
  <forge-alert severity="info" dismissible>
    System update available
  </forge-alert>
</div>

<style>
.alert-stack {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
```

## AI-Ready Features

### AI Metadata

```javascript
alert.aiMetadata = {
  purpose: 'Display system notification',
  criticality: 'high',
  semanticRole: 'alert',
  context: 'form-validation',
  priority: 1
};
```

### AI Helper Methods

```javascript
// Get alert context
alert.getAIDescription();
// Returns: "Error alert: Form validation failed, dismissible, high priority"

// Get suggested actions
alert.getSuggestedActions();
// Returns: ['dismiss', 'view-details', 'retry']

// Get accessibility info
alert.getAccessibilityInfo();
// Returns: {
//   role: 'alert',
//   ariaLive: 'assertive',
//   announcement: 'Error: Form validation failed'
// }

// Categorize alert
alert.getCategory();
// Returns: 'validation-error'
```

## Performance Monitoring

```html
<forge-alert
  severity="info"
  dev-mode
  show-metrics
  max-render-ms="8"
>
  Performance monitored alert
</forge-alert>
```

## Accessibility

### WCAG 2.1 AA Compliance

- ✅ Proper ARIA role="alert"
- ✅ Live region announcements
- ✅ Keyboard dismissible (Escape key)
- ✅ Focus management
- ✅ Color contrast compliance
- ✅ Screen reader announcements
- ✅ Motion preferences respected

### ARIA Attributes

```html
<!-- Rendered output -->
<forge-alert
  role="alert"
  aria-live="polite"
  aria-atomic="true"
  aria-relevant="additions removals"
>
  Alert content
</forge-alert>

<!-- Error alert with assertive announcement -->
<forge-alert
  severity="error"
  role="alert"
  aria-live="assertive"
>
  Critical error message
</forge-alert>
```

### Keyboard Support

| Key | Action |
|-----|--------|
| `Escape` | Dismiss alert (if dismissible) |
| `Tab` | Navigate to actions/close button |
| `Enter/Space` | Activate focused action |

## Use Cases

### Form Validation

```html
<form id="userForm">
  <forge-alert 
    id="formAlert"
    severity="error"
    dismissible
    style="display: none;"
  >
    Please correct the errors below
  </forge-alert>
  
  <!-- Form fields -->
</form>

<script>
function validateForm() {
  const alert = document.getElementById('formAlert');
  const errors = getFormErrors();
  
  if (errors.length > 0) {
    alert.textContent = errors.join(', ');
    alert.style.display = 'block';
    alert.show();
  }
}
</script>
```

### System Status

```html
<div class="system-status">
  <forge-alert severity="success" show-icon>
    <strong>All Systems Operational</strong>
    <div>Last checked: 2 minutes ago</div>
  </forge-alert>
</div>
```

### Cookie Consent

```html
<forge-alert 
  severity="info"
  variant="filled"
  class="cookie-consent"
>
  <div slot="content">
    We use cookies to improve your experience
  </div>
  <div slot="actions">
    <forge-button variant="ghost" size="sm">Learn More</forge-button>
    <forge-button variant="primary" size="sm">Accept</forge-button>
  </div>
</forge-alert>
```

### Update Notification

```html
<forge-alert severity="info" show-icon dismissible>
  <forge-icon slot="icon" name="download"></forge-icon>
  <strong>Update Available</strong>
  <div>Version 2.0.1 is ready to install</div>
  <div slot="actions">
    <forge-button variant="link" size="sm">Install Now</forge-button>
  </div>
</forge-alert>
```

## Alert Manager

```javascript
class AlertManager {
  constructor(container) {
    this.container = container;
    this.alerts = new Map();
  }
  
  show(message, options = {}) {
    const alert = document.createElement('forge-alert');
    const id = Date.now().toString();
    
    Object.assign(alert, {
      severity: options.severity || 'info',
      dismissible: true,
      autoDismiss: options.duration || 5000,
      animate: true,
      ...options
    });
    
    alert.textContent = message;
    alert.dataset.alertId = id;
    
    alert.addEventListener('forge-dismiss', () => {
      this.remove(id);
    });
    
    this.container.appendChild(alert);
    this.alerts.set(id, alert);
    
    return id;
  }
  
  remove(id) {
    const alert = this.alerts.get(id);
    if (alert) {
      alert.dismiss();
      this.alerts.delete(id);
    }
  }
  
  clear() {
    this.alerts.forEach(alert => alert.dismiss());
    this.alerts.clear();
  }
}

// Usage
const alertManager = new AlertManager(document.getElementById('alerts'));
alertManager.show('Operation successful', { severity: 'success' });
```

## Framework Integration

### React

```jsx
import '@nexcraft/forge/alert';

function Notifications() {
  const [alerts, setAlerts] = React.useState([]);
  
  const addAlert = (message, severity) => {
    setAlerts([...alerts, { id: Date.now(), message, severity }]);
  };
  
  const removeAlert = (id) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };
  
  return (
    <div className="alerts">
      {alerts.map(alert => (
        <forge-alert
          key={alert.id}
          severity={alert.severity}
          dismissible
          onForgeDismiss={() => removeAlert(alert.id)}
        >
          {alert.message}
        </forge-alert>
      ))}
    </div>
  );
}
```

### Vue

```vue
<template>
  <div class="alerts">
    <forge-alert
      v-for="alert in alerts"
      :key="alert.id"
      :severity="alert.severity"
      dismissible
      @forge-dismiss="removeAlert(alert.id)"
    >
      {{ alert.message }}
    </forge-alert>
  </div>
</template>

<script>
import '@nexcraft/forge/alert';

export default {
  data() {
    return {
      alerts: []
    };
  },
  methods: {
    addAlert(message, severity = 'info') {
      this.alerts.push({
        id: Date.now(),
        message,
        severity
      });
    },
    removeAlert(id) {
      this.alerts = this.alerts.filter(a => a.id !== id);
    }
  }
};
</script>
```

### Angular

```typescript
import '@nexcraft/forge/alert';

@Component({
  template: `
    <div class="alerts">
      <forge-alert
        *ngFor="let alert of alerts"
        [severity]="alert.severity"
        dismissible
        (forge-dismiss)="removeAlert(alert.id)"
      >
        {{ alert.message }}
      </forge-alert>
    </div>
  `
})
export class AlertComponent {
  alerts: Alert[] = [];
  
  addAlert(message: string, severity = 'info') {
    this.alerts.push({
      id: Date.now(),
      message,
      severity
    });
  }
  
  removeAlert(id: number) {
    this.alerts = this.alerts.filter(a => a.id !== id);
  }
}
```

## Testing

### Unit Test Example

```typescript
import { fixture, html } from '@open-wc/testing';
import { expect } from '@esm-bundle/chai';
import '@nexcraft/forge/alert';

describe('forge-alert', () => {
  it('should render with severity', async () => {
    const el = await fixture(html`
      <forge-alert severity="error">Error message</forge-alert>
    `);
    
    expect(el.severity).to.equal('error');
    expect(el.textContent).to.include('Error message');
  });
  
  it('should dismiss when close clicked', async () => {
    const el = await fixture(html`
      <forge-alert dismissible>Test</forge-alert>
    `);
    
    let dismissed = false;
    el.addEventListener('forge-dismiss', () => dismissed = true);
    
    const closeBtn = el.shadowRoot?.querySelector('.close-button');
    closeBtn?.click();
    
    expect(dismissed).to.be.true;
  });
  
  it('should auto-dismiss', async (done) => {
    const el = await fixture(html`
      <forge-alert auto-dismiss="100">Test</forge-alert>
    `);
    
    el.addEventListener('forge-dismiss', () => {
      done();
    });
  });
});
```

## Migration Guide

### From Material UI Alert

```jsx
// Before (Material UI)
<Alert severity="error" onClose={handleClose}>
  Error message
</Alert>

// After (Forge)
<forge-alert severity="error" dismissible onForgeDismiss={handleClose}>
  Error message
</forge-alert>
```

### From Ant Design Alert

```jsx
// Before (Ant Design)
<Alert
  message="Success"
  description="Operation completed"
  type="success"
  showIcon
  closable
/>

// After (Forge)
<forge-alert 
  severity="success"
  show-icon
  dismissible
  title="Success"
>
  Operation completed
</forge-alert>
```

## Browser Support

- Chrome 67+ ✅
- Firefox 63+ ✅
- Safari 10.1+ ✅
- Edge 79+ ✅

## Related Components

- [ForgeBadge](./badge.md) - Status indicators
- [ForgeToast](./toast.md) - Toast notifications
- [ForgeSnackbar](./snackbar.md) - Snackbar messages

## Changelog

### Version 1.0.0
- Initial release with 4 severity levels
- 3 visual variants
- Auto-dismiss functionality
- Dismissible option
- Full accessibility support
- AI-ready architecture
- Performance monitoring

## API Playground

Try the component live in our [Storybook](https://forge-ui.dev/storybook/?path=/story/atoms-alert)