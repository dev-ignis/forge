# ForgeBadge Component

A versatile badge component for displaying counts, status indicators, and labels with multiple variants and positioning options.

## Installation

```javascript
import '@nexcraft/forge/badge';
```

## Basic Usage

```html
<forge-badge count="5">
  <forge-icon name="bell"></forge-icon>
</forge-badge>
```

## Live Examples

### Badge Types

```html
<!-- Count badge -->
<forge-badge count="99">
  <forge-icon name="bell"></forge-icon>
</forge-badge>

<!-- Dot badge -->
<forge-badge dot>
  <forge-icon name="bell"></forge-icon>
</forge-badge>

<!-- Text badge -->
<forge-badge text="NEW">
  <forge-button>Features</forge-button>
</forge-badge>

<!-- Status badge -->
<forge-badge status="online">
  <forge-icon name="user"></forge-icon>
</forge-badge>
```

### Variants

```html
<!-- Primary (default) -->
<forge-badge variant="primary" count="5">
  <forge-icon name="mail"></forge-icon>
</forge-badge>

<!-- Success -->
<forge-badge variant="success" count="12">
  <forge-icon name="check"></forge-icon>
</forge-badge>

<!-- Warning -->
<forge-badge variant="warning" count="3">
  <forge-icon name="warning"></forge-icon>
</forge-badge>

<!-- Danger -->
<forge-badge variant="danger" count="!">
  <forge-icon name="error"></forge-icon>
</forge-badge>

<!-- Info -->
<forge-badge variant="info" text="i">
  <forge-icon name="help"></forge-icon>
</forge-badge>
```

### Positions

```html
<!-- Top-right (default) -->
<forge-badge count="5" position="top-right">
  <forge-icon name="bell"></forge-icon>
</forge-badge>

<!-- Top-left -->
<forge-badge count="3" position="top-left">
  <forge-icon name="bell"></forge-icon>
</forge-badge>

<!-- Bottom-right -->
<forge-badge count="7" position="bottom-right">
  <forge-icon name="bell"></forge-icon>
</forge-badge>

<!-- Bottom-left -->
<forge-badge count="2" position="bottom-left">
  <forge-icon name="bell"></forge-icon>
</forge-badge>

<!-- Center -->
<forge-badge count="10" position="center">
  <forge-icon name="bell"></forge-icon>
</forge-badge>
```

### Standalone Badges

```html
<!-- Without child content -->
<forge-badge count="42" standalone></forge-badge>
<forge-badge text="NEW" variant="success" standalone></forge-badge>
<forge-badge text="BETA" variant="warning" standalone></forge-badge>
<forge-badge text="PRO" variant="primary" standalone></forge-badge>
```

## API Reference

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `count` | `number \| string` | `0` | Badge count or text |
| `dot` | `boolean` | `false` | Show as dot only |
| `text` | `string` | `''` | Custom badge text |
| `status` | `'online' \| 'offline' \| 'busy' \| 'away'` | `''` | Status indicator |
| `variant` | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'primary'` | Visual variant |
| `position` | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left' \| 'center'` | `'top-right'` | Badge position |
| `max` | `number` | `99` | Maximum count display |
| `showZero` | `boolean` | `false` | Show badge when count is 0 |
| `standalone` | `boolean` | `false` | Render without child |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Badge size |
| `pulse` | `boolean` | `false` | Add pulse animation |
| `dismissible` | `boolean` | `false` | Allow dismissing badge |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `forge-dismiss` | `void` | Fired when badge is dismissed |
| `forge-click` | `{ count: number \| string }` | Fired when badge is clicked |

### Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `increment()` | `(value?: number): void` | Increment count |
| `decrement()` | `(value?: number): void` | Decrement count |
| `reset()` | `(): void` | Reset count to 0 |
| `dismiss()` | `(): void` | Dismiss the badge |

### Slots

| Slot | Description |
|------|-------------|
| (default) | Content to badge |

## Styling

### CSS Custom Properties

```css
/* Size tokens */
--forge-badge-size-sm: 16px;
--forge-badge-size-md: 20px;
--forge-badge-size-lg: 24px;
--forge-badge-dot-size: 8px;
--forge-badge-min-width: 20px;
--forge-badge-padding: 0 6px;
--forge-badge-font-size: 12px;

/* Color tokens */
--forge-badge-primary-bg: var(--forge-color-primary, #3b82f6);
--forge-badge-success-bg: var(--forge-color-success, #10b981);
--forge-badge-warning-bg: var(--forge-color-warning, #f59e0b);
--forge-badge-danger-bg: var(--forge-color-danger, #ef4444);
--forge-badge-info-bg: var(--forge-color-info, #06b6d4);
--forge-badge-text-color: white;

/* Status colors */
--forge-badge-status-online: #10b981;
--forge-badge-status-offline: #6b7280;
--forge-badge-status-busy: #ef4444;
--forge-badge-status-away: #f59e0b;

/* Other tokens */
--forge-badge-radius: 10px;
--forge-badge-offset: 0;
--forge-badge-z-index: 1;
```

### Custom Styling Examples

```css
/* Custom colors */
forge-badge[variant="primary"] {
  --forge-badge-primary-bg: #8b5cf6;
}

/* Square badges */
forge-badge.square {
  --forge-badge-radius: 4px;
}

/* Large badge with custom font */
forge-badge.custom-large {
  --forge-badge-size-md: 28px;
  --forge-badge-font-size: 14px;
  --forge-badge-min-width: 28px;
}

/* Offset positioning */
forge-badge.offset {
  --forge-badge-offset: -4px;
}

/* Gradient background */
forge-badge.gradient {
  --forge-badge-primary-bg: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

## Count Overflow

```html
<!-- Max count display -->
<forge-badge count="150" max="99">
  <forge-icon name="notifications"></forge-icon>
</forge-badge>
<!-- Displays: 99+ -->

<!-- Custom max -->
<forge-badge count="1234" max="999">
  <forge-icon name="mail"></forge-icon>
</forge-badge>
<!-- Displays: 999+ -->

<!-- No max limit -->
<forge-badge count="1234" :max="Infinity">
  <forge-icon name="mail"></forge-icon>
</forge-badge>
<!-- Displays: 1234 -->
```

## Status Indicators

```html
<div class="user-list">
  <div class="user">
    <forge-badge status="online">
      <img src="avatar1.jpg" alt="User 1">
    </forge-badge>
    <span>John Doe</span>
  </div>
  
  <div class="user">
    <forge-badge status="busy">
      <img src="avatar2.jpg" alt="User 2">
    </forge-badge>
    <span>Jane Smith</span>
  </div>
  
  <div class="user">
    <forge-badge status="offline">
      <img src="avatar3.jpg" alt="User 3">
    </forge-badge>
    <span>Bob Johnson</span>
  </div>
</div>
```

## Dynamic Badges

```javascript
// Update badge count dynamically
const badge = document.querySelector('forge-badge');

// Increment
badge.increment(); // +1
badge.increment(5); // +5

// Decrement
badge.decrement(); // -1
badge.decrement(3); // -3

// Set directly
badge.count = 42;

// Reset
badge.reset();

// Animate changes
badge.animateCountChange = true;
badge.count = 10; // Will animate from current to 10
```

## Notification Center

```html
<nav class="app-nav">
  <forge-badge count="3" variant="danger">
    <forge-button variant="ghost">
      <forge-icon name="bell"></forge-icon>
    </forge-button>
  </forge-badge>
  
  <forge-badge count="12" variant="primary">
    <forge-button variant="ghost">
      <forge-icon name="mail"></forge-icon>
    </forge-button>
  </forge-badge>
  
  <forge-badge dot variant="success">
    <forge-button variant="ghost">
      <forge-icon name="chat"></forge-icon>
    </forge-button>
  </forge-badge>
</nav>
```

## AI-Ready Features

### AI Metadata

```javascript
badge.aiMetadata = {
  purpose: 'Display notification count',
  dataType: 'numeric-indicator',
  criticality: 'medium',
  semanticRole: 'notification-badge',
  context: 'header-navigation'
};
```

### AI Helper Methods

```javascript
// Get natural language description
badge.getAIDescription();
// Returns: "Badge showing 5 unread notifications, positioned top-right"

// Get importance level
badge.getImportance();
// Returns: 'high' (based on count and variant)

// Get suggested actions
badge.getSuggestedActions();
// Returns: ['view-notifications', 'mark-as-read', 'dismiss']

// Get contextual meaning
badge.getContextualMeaning();
// Returns: "5 new items require attention"
```

## Performance Monitoring

```html
<forge-badge
  count="10"
  dev-mode
  show-metrics
  max-render-ms="4"
>
  <forge-icon name="bell"></forge-icon>
</forge-badge>
```

## Accessibility

### WCAG 2.1 AA Compliance

- ✅ Screen reader announcements
- ✅ ARIA labels for counts
- ✅ Semantic HTML structure
- ✅ Keyboard interaction (when dismissible)
- ✅ High contrast support
- ✅ Focus indicators
- ✅ Live region updates

### ARIA Attributes

```html
<!-- Rendered output -->
<forge-badge
  role="status"
  aria-label="5 notifications"
  aria-live="polite"
  aria-atomic="true"
>
  <span class="badge-content">5</span>
</forge-badge>

<!-- Status badge -->
<forge-badge
  status="online"
  role="status"
  aria-label="User is online"
>
</forge-badge>
```

## Use Cases

### Shopping Cart

```html
<div class="header-actions">
  <forge-badge 
    id="cartBadge"
    count="0"
    show-zero="false"
  >
    <forge-button variant="ghost">
      <forge-icon name="shopping-cart"></forge-icon>
    </forge-button>
  </forge-badge>
</div>

<script>
// Update cart count
function updateCart(items) {
  const badge = document.getElementById('cartBadge');
  badge.count = items.length;
  
  if (items.length > 0) {
    badge.pulse = true;
    setTimeout(() => badge.pulse = false, 2000);
  }
}
</script>
```

### Tab Navigation

```html
<div class="tabs">
  <button class="tab">
    <forge-badge text="NEW" variant="success" position="top-right">
      <span>Features</span>
    </forge-badge>
  </button>
  
  <button class="tab">
    <forge-badge count="7" variant="danger" position="top-right">
      <span>Issues</span>
    </forge-badge>
  </button>
  
  <button class="tab">
    <forge-badge count="23" position="top-right">
      <span>Comments</span>
    </forge-badge>
  </button>
</div>
```

### Menu Items

```html
<ul class="menu">
  <li>
    <forge-badge count="5" position="center">
      <a href="/inbox">Inbox</a>
    </forge-badge>
  </li>
  <li>
    <forge-badge text="BETA" variant="warning" position="center">
      <a href="/analytics">Analytics</a>
    </forge-badge>
  </li>
  <li>
    <forge-badge dot variant="danger" position="center">
      <a href="/settings">Settings</a>
    </forge-badge>
  </li>
</ul>
```

### File Status

```html
<div class="file-list">
  <div class="file">
    <forge-badge text="Modified" variant="warning" standalone></forge-badge>
    <span>document.pdf</span>
  </div>
  
  <div class="file">
    <forge-badge text="New" variant="success" standalone></forge-badge>
    <span>image.png</span>
  </div>
  
  <div class="file">
    <forge-badge text="Locked" variant="danger" standalone></forge-badge>
    <span>secure.zip</span>
  </div>
</div>
```

## Badge Groups

```html
<div class="badge-group">
  <forge-badge text="v2.0.1" variant="info" standalone></forge-badge>
  <forge-badge text="MIT" variant="success" standalone></forge-badge>
  <forge-badge count="1.2k" variant="primary" standalone>
    <forge-icon name="star" slot="prefix"></forge-icon>
  </forge-badge>
  <forge-badge count="234" standalone>
    <forge-icon name="fork" slot="prefix"></forge-icon>
  </forge-badge>
</div>

<style>
.badge-group {
  display: flex;
  gap: 8px;
  align-items: center;
}
</style>
```

## Real-time Updates

```javascript
class BadgeManager {
  constructor() {
    this.badges = new Map();
    this.connect();
  }
  
  register(id, element) {
    this.badges.set(id, element);
  }
  
  connect() {
    // WebSocket or SSE connection
    this.eventSource = new EventSource('/notifications');
    
    this.eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.update(data.badgeId, data.count);
    };
  }
  
  update(id, count) {
    const badge = this.badges.get(id);
    if (badge) {
      const oldCount = badge.count;
      badge.count = count;
      
      // Pulse on increase
      if (count > oldCount) {
        badge.pulse = true;
        setTimeout(() => badge.pulse = false, 2000);
      }
    }
  }
  
  clear(id) {
    const badge = this.badges.get(id);
    if (badge) {
      badge.reset();
    }
  }
}

// Usage
const manager = new BadgeManager();
manager.register('notifications', document.getElementById('notifBadge'));
manager.register('messages', document.getElementById('msgBadge'));
```

## Framework Integration

### React

```jsx
import '@nexcraft/forge/badge';

function Header() {
  const [notifications, setNotifications] = React.useState(5);
  const [messages, setMessages] = React.useState(0);
  
  return (
    <nav>
      <forge-badge 
        count={notifications}
        variant="danger"
        showZero={false}
      >
        <button onClick={() => setNotifications(0)}>
          <forge-icon name="bell"></forge-icon>
        </button>
      </forge-badge>
      
      <forge-badge 
        count={messages}
        showZero={false}
      >
        <button>
          <forge-icon name="mail"></forge-icon>
        </button>
      </forge-badge>
    </nav>
  );
}
```

### Vue

```vue
<template>
  <div class="notifications">
    <forge-badge 
      :count="unreadCount"
      variant="danger"
      :show-zero="false"
      @forge-click="openNotifications"
    >
      <forge-button variant="ghost">
        <forge-icon name="bell"></forge-icon>
      </forge-button>
    </forge-badge>
    
    <forge-badge
      v-if="hasNewFeatures"
      text="NEW"
      variant="success"
      dismissible
      @forge-dismiss="dismissNewFeatures"
    >
      <forge-button>Features</forge-button>
    </forge-badge>
  </div>
</template>

<script>
import '@nexcraft/forge/badge';

export default {
  data() {
    return {
      unreadCount: 3,
      hasNewFeatures: true
    };
  },
  methods: {
    openNotifications() {
      // Open notifications panel
    },
    dismissNewFeatures() {
      this.hasNewFeatures = false;
    }
  }
};
</script>
```

### Angular

```typescript
import '@nexcraft/forge/badge';

@Component({
  template: `
    <div class="app-header">
      <forge-badge 
        [count]="notificationCount"
        variant="danger"
        [showZero]="false"
      >
        <button (click)="openNotifications()">
          <forge-icon name="bell"></forge-icon>
        </button>
      </forge-badge>
      
      <forge-badge
        [status]="userStatus"
      >
        <img [src]="userAvatar" alt="User">
      </forge-badge>
    </div>
  `
})
export class HeaderComponent {
  notificationCount = 5;
  userStatus: 'online' | 'offline' | 'busy' = 'online';
  userAvatar = '/avatar.jpg';
  
  openNotifications() {
    // Handle notification click
  }
}
```

## Testing

### Unit Test Example

```typescript
import { fixture, html } from '@open-wc/testing';
import { expect } from '@esm-bundle/chai';
import '@nexcraft/forge/badge';

describe('forge-badge', () => {
  it('should display count', async () => {
    const el = await fixture(html`
      <forge-badge count="5">
        <span>Content</span>
      </forge-badge>
    `);
    
    expect(el.count).to.equal(5);
    const badge = el.shadowRoot?.querySelector('.badge');
    expect(badge?.textContent).to.include('5');
  });
  
  it('should handle max count', async () => {
    const el = await fixture(html`
      <forge-badge count="150" max="99">
        <span>Content</span>
      </forge-badge>
    `);
    
    const badge = el.shadowRoot?.querySelector('.badge');
    expect(badge?.textContent).to.include('99+');
  });
  
  it('should increment count', async () => {
    const el = await fixture(html`
      <forge-badge count="5">
        <span>Content</span>
      </forge-badge>
    `);
    
    el.increment();
    expect(el.count).to.equal(6);
    
    el.increment(4);
    expect(el.count).to.equal(10);
  });
});
```

## Migration Guide

### From Material UI Badge

```jsx
// Before (Material UI)
<Badge badgeContent={4} color="primary">
  <MailIcon />
</Badge>

// After (Forge)
<forge-badge count="4" variant="primary">
  <forge-icon name="mail"></forge-icon>
</forge-badge>
```

### From Ant Design Badge

```jsx
// Before (Ant Design)
<Badge count={5} dot={false}>
  <BellOutlined />
</Badge>

// After (Forge)
<forge-badge count="5">
  <forge-icon name="bell"></forge-icon>
</forge-badge>
```

## Browser Support

- Chrome 67+ ✅
- Firefox 63+ ✅
- Safari 10.1+ ✅
- Edge 79+ ✅

## Related Components

- [ForgeIcon](./icon.md) - Icon component
- [ForgeButton](./button.md) - Button component
- [ForgeAlert](./alert.md) - Alert notifications

## Changelog

### Version 1.0.0
- Initial release
- Count and dot modes
- 5 position options
- 5 color variants
- Status indicators
- Dismissible badges
- Max count overflow
- AI-ready architecture
- Performance monitoring

## API Playground

Try the component live in our [Storybook](https://forge-ui.dev/storybook/?path=/story/atoms-badge)