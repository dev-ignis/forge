# ForgeAlert

Flexible alert component for displaying important messages, notifications, and status updates with unified SSR/client architecture.

## Unified SSR Architecture

The ForgeAlert component uses our revolutionary **unified wrapper approach** - a single component that works everywhere without any developer configuration:

- **SSR Environment** (Next.js): Renders semantic HTML with critical styling
- **Client Environment** (Vite): Renders as web component with full interactivity  
- **Progressive Enhancement**: Seamlessly upgrades from HTML to web component
- **Graceful Degradation**: Falls back to enhanced HTML if web components fail

**Single component that works everywhere - no separate SSR/client versions needed.**

## Key Features

- **Multiple Variants**: Success, error, warning, info, and neutral styles
- **Dismissible**: Optional close button with smooth animation
- **Icon Support**: Automatic variant icons or custom icons
- **Content Flexibility**: Support for title, description, and action buttons
- **Auto-dismiss**: Optional timed dismissal functionality
- **Accessibility**: Full ARIA support and keyboard navigation
- **Unified SSR**: Works seamlessly in both SSR and client environments
- **AI-Ready**: Complete AI metadata for intelligent interactions

## Basic Usage

### Import (Works in any React environment)

```tsx
import { ForgeAlert } from '@nexcraft/forge/integrations/react';

// Same import works in:
// ✅ Next.js App Router (SSR)
// ✅ Next.js Pages Router (SSR) 
// ✅ Vite (Client-only)
// ✅ CRA (Client-only)
// ✅ Any React SSR framework
```

### Simple Alerts

```tsx
// Success alert
<ForgeAlert variant="success" title="Success!">
  Your changes have been saved successfully.
</ForgeAlert>

// Error alert with dismiss
<ForgeAlert variant="error" title="Error" dismissible>
  Something went wrong. Please try again.
</ForgeAlert>

// Warning with custom icon
<ForgeAlert variant="warning" title="Warning" icon="triangle-exclamation">
  This action cannot be undone.
</ForgeAlert>

// Info alert with action
<ForgeAlert variant="info" title="New Update Available">
  A new version is available. 
  <ForgeButton slot="action" size="sm" variant="ghost">
    Update Now
  </ForgeButton>
</ForgeAlert>
```

## Advanced Usage

### Auto-dismiss with Progress

```tsx
<ForgeAlert 
  variant="success" 
  title="File Uploaded" 
  dismissible
  duration={5000}
  showProgress
>
  Your file has been uploaded successfully.
</ForgeAlert>
```

### Alert with Multiple Actions

```tsx
<ForgeAlert variant="warning" title="Unsaved Changes">
  You have unsaved changes that will be lost.
  <div slot="actions">
    <ForgeButton size="sm" variant="ghost">Discard</ForgeButton>
    <ForgeButton size="sm" variant="primary">Save</ForgeButton>
  </div>
</ForgeAlert>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'success' \| 'error' \| 'warning' \| 'info' \| 'neutral'` | `'info'` | Alert variant determining color and default icon |
| `title` | `string` | `undefined` | Optional alert title |
| `message` | `string` | `undefined` | Alert message content |
| `icon` | `string \| boolean` | `true` | Icon name or false to hide icon |
| `dismissible` | `boolean` | `false` | Whether alert can be dismissed |
| `duration` | `number` | `0` | Auto-dismiss duration in milliseconds (0 = no auto-dismiss) |
| `showProgress` | `boolean` | `false` | Show progress bar for auto-dismiss |
| `persistent` | `boolean` | `false` | Prevents auto-dismiss when true |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `dismiss` | `{ reason: 'user' \| 'auto' \| 'programmatic' }` | Fired when alert is dismissed |
| `action-click` | `{ actionId: string }` | Fired when action button is clicked |

## Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `dismiss()` | - | `void` | Programmatically dismiss the alert |
| `pause()` | - | `void` | Pause auto-dismiss timer |
| `resume()` | - | `void` | Resume auto-dismiss timer |

## SSR Fallback Behavior

In SSR environments, ForgeAlert renders semantic HTML that provides full functionality even without JavaScript:

### Server-Side Rendering
```html
<!-- Rendered during SSR -->
<div class="forge-alert forge-alert--success" role="alert">
  <div class="forge-alert__icon" aria-hidden="true">✓</div>
  <div class="forge-alert__content">
    <div class="forge-alert__title">Success!</div>
    <div class="forge-alert__message">Operation completed successfully</div>
  </div>
  <button class="forge-alert__dismiss" aria-label="Dismiss alert">×</button>
</div>
```

### Client-Side Hydration
```html
<!-- After hydration to web component -->
<forge-alert variant="success" title="Success!" dismissible>
  Operation completed successfully
</forge-alert>
```

## Accessibility

### ARIA Support

- **Role Management**: Uses `role="alert"` for urgent messages, `role="status"` for non-urgent
- **Live Regions**: Automatically announces content changes to screen readers
- **Focus Management**: Proper focus handling for dismiss buttons
- **Keyboard Navigation**: Full keyboard support for interactive elements

### Screen Reader Support

```tsx
<ForgeAlert 
  variant="error" 
  title="Form Error"
  aria-describedby="error-details"
>
  Please correct the highlighted fields.
  <div id="error-details" className="sr-only">
    3 fields contain validation errors
  </div>
</ForgeAlert>
```

## Framework Integration

### Next.js App Router (SSR)

```tsx
// app/page.tsx - Automatic SSR
import { ForgeAlert } from '@nexcraft/forge/integrations/react';

export default function Page() {
  return (
    <ForgeAlert variant="info" title="Welcome">
      This renders as semantic HTML during SSR, then upgrades to web component
    </ForgeAlert>
  );
}
```

### Vite/CRA (Client-only)

```tsx
// Same component, automatically renders as web component
import { ForgeAlert } from '@nexcraft/forge/integrations/react';

function App() {
  return (
    <ForgeAlert variant="success" title="Client App">
      This renders directly as a web component in client-only apps
    </ForgeAlert>
  );
}
```

## Examples

### Notification System

```tsx
function NotificationExample() {
  const [alerts, setAlerts] = useState([]);
  
  const addAlert = (type, message) => {
    const newAlert = {
      id: Date.now(),
      variant: type,
      title: type.charAt(0).toUpperCase() + type.slice(1),
      message,
      dismissible: true,
      duration: 5000
    };
    setAlerts(prev => [...prev, newAlert]);
  };
  
  const removeAlert = (id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };
  
  return (
    <div className="alert-container">
      {alerts.map(alert => (
        <ForgeAlert
          key={alert.id}
          variant={alert.variant}
          title={alert.title}
          dismissible={alert.dismissible}
          duration={alert.duration}
          onDismiss={() => removeAlert(alert.id)}
        >
          {alert.message}
        </ForgeAlert>
      ))}
      
      <div className="demo-buttons">
        <ForgeButton onClick={() => addAlert('success', 'Operation successful!')}>
          Success
        </ForgeButton>
        <ForgeButton onClick={() => addAlert('error', 'Something went wrong!')}>
          Error
        </ForgeButton>
        <ForgeButton onClick={() => addAlert('warning', 'Please be careful!')}>
          Warning
        </ForgeButton>
      </div>
    </div>
  );
}
```

### Form Validation Alerts

```tsx
function FormWithValidation() {
  const [errors, setErrors] = useState([]);
  
  const validateForm = (data) => {
    const newErrors = [];
    if (!data.email) newErrors.push('Email is required');
    if (!data.password) newErrors.push('Password is required');
    setErrors(newErrors);
  };
  
  return (
    <form>
      {errors.length > 0 && (
        <ForgeAlert variant="error" title="Validation Errors" dismissible>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </ForgeAlert>
      )}
      
      {/* Form fields */}
    </form>
  );
}
```

## CSS Custom Properties

```css
forge-alert {
  /* Layout */
  --alert-padding: 16px;
  --alert-border-radius: 8px;
  --alert-border-width: 1px;
  --alert-gap: 12px;
  
  /* Success variant */
  --alert-success-bg: var(--forge-color-success-50);
  --alert-success-border: var(--forge-color-success-200);
  --alert-success-text: var(--forge-color-success-800);
  --alert-success-icon: var(--forge-color-success-600);
  
  /* Error variant */
  --alert-error-bg: var(--forge-color-error-50);
  --alert-error-border: var(--forge-color-error-200);
  --alert-error-text: var(--forge-color-error-800);
  --alert-error-icon: var(--forge-color-error-600);
  
  /* Warning variant */
  --alert-warning-bg: var(--forge-color-warning-50);
  --alert-warning-border: var(--forge-color-warning-200);
  --alert-warning-text: var(--forge-color-warning-800);
  --alert-warning-icon: var(--forge-color-warning-600);
  
  /* Info variant */
  --alert-info-bg: var(--forge-color-info-50);
  --alert-info-border: var(--forge-color-info-200);
  --alert-info-text: var(--forge-color-info-800);
  --alert-info-icon: var(--forge-color-info-600);
  
  /* Animation */
  --alert-transition-duration: 200ms;
  --alert-transition-timing: ease-out;
  --alert-dismiss-animation: 300ms ease-in;
}
```

## AI Integration

### State Explanation

```typescript
const alert = document.querySelector('forge-alert');
console.log(alert.explainState());
// "Alert showing success message, dismissible by user, will auto-dismiss in 3.2 seconds"
```

### Possible Actions

```typescript
const actions = alert.getPossibleActions();
// [
//   { name: 'dismiss', available: true, description: 'Close the alert' },
//   { name: 'pause', available: true, description: 'Pause auto-dismiss timer' }
// ]
```

## Performance

- **Lightweight**: <5KB gzipped including styles
- **SSR Optimized**: Minimal hydration overhead 
- **Memory Efficient**: Automatic cleanup of dismissed alerts
- **Progressive Enhancement**: No JavaScript required for basic functionality

## Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **SSR Fallback**: Works in any browser with HTML/CSS support
- **Progressive Enhancement**: Graceful degradation without JavaScript

## Related Components

- **[ForgeToast](../molecules/toast.md)** - Temporary notifications with queue management
- **[ForgeModal](../molecules/modal.md)** - Modal dialogs for important messages
- **[ForgeBadge](./badge.md)** - Small status indicators