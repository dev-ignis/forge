# ForgeBadge

Small, versatile status indicator component with unified SSR/client architecture for displaying counts, labels, and status information.

## Unified SSR Architecture

The ForgeBadge component uses our revolutionary **unified wrapper approach** - a single component that works everywhere without any developer configuration:

- **SSR Environment** (Next.js): Renders semantic HTML with critical styling
- **Client Environment** (Vite): Renders as web component with full interactivity  
- **Progressive Enhancement**: Seamlessly upgrades from HTML to web component
- **Graceful Degradation**: Falls back to enhanced HTML if web components fail

**Single component that works everywhere - no separate SSR/client versions needed.**

## Key Features

- **Multiple Variants**: Primary, secondary, success, warning, error, and neutral styles
- **Size Options**: Small, medium, and large sizes
- **Count Support**: Automatic number formatting and overflow handling
- **Dot Indicator**: Simple dot badge for status indication
- **Positioning**: Absolute positioning support for overlays
- **Icon Integration**: Works seamlessly with icons
- **Accessibility**: ARIA labels and screen reader support
- **Unified SSR**: Works seamlessly in both SSR and client environments
- **AI-Ready**: Complete AI metadata for intelligent interactions

## Basic Usage

### Import (Works in any React environment)

```tsx
import { ForgeBadge } from '@nexcraft/forge/integrations/react';

// Same import works in:
// ✅ Next.js App Router (SSR)
// ✅ Next.js Pages Router (SSR) 
// ✅ Vite (Client-only)
// ✅ CRA (Client-only)
// ✅ Any React SSR framework
```

### Basic Badges

```tsx
// Simple text badge
<ForgeBadge variant="primary">New</ForgeBadge>

// Count badge
<ForgeBadge variant="error" count={5} />

// Dot badge
<ForgeBadge variant="success" dot />

// Badge with custom content
<ForgeBadge variant="warning">
  <ForgeIcon name="star" size="xs" />
  Pro
</ForgeBadge>
```

### Badge as Overlay

```tsx
// Badge overlaying an element
<div className="relative">
  <ForgeButton variant="ghost">
    <ForgeIcon name="bell" />
  </ForgeButton>
  <ForgeBadge 
    variant="error" 
    count={3} 
    position="top-right"
    className="absolute"
  />
</div>
```

## Advanced Usage

### Count Badges with Overflow

```tsx
// Badge with count overflow
<ForgeBadge 
  variant="primary" 
  count={1337} 
  max={99}
  showZero={false}
/>
// Displays: "99+"

// Badge with zero handling
<ForgeBadge 
  variant="neutral" 
  count={0} 
  showZero
  emptyText="None"
/>
```

### Notification Badges

```tsx
function NotificationBell({ unreadCount }) {
  return (
    <div className="relative inline-block">
      <ForgeButton variant="ghost" size="lg">
        <ForgeIcon name="bell" />
      </ForgeButton>
      {unreadCount > 0 && (
        <ForgeBadge
          variant="error"
          count={unreadCount}
          max={99}
          position="top-right"
          className="absolute -top-1 -right-1"
          aria-label={`${unreadCount} unread notifications`}
        />
      )}
    </div>
  );
}
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error' \| 'neutral'` | `'primary'` | Badge color variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Badge size |
| `count` | `number` | `undefined` | Numeric count to display |
| `max` | `number` | `99` | Maximum count before showing "+" |
| `showZero` | `boolean` | `false` | Whether to show badge when count is 0 |
| `emptyText` | `string` | `undefined` | Text to show instead of zero |
| `dot` | `boolean` | `false` | Show as simple dot indicator |
| `position` | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'` | `undefined` | Position for overlay badges |
| `pulse` | `boolean` | `false` | Add pulsing animation |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `click` | `MouseEvent` | Fired when badge is clicked |
| `badge-update` | `{ count: number, displayText: string }` | Fired when count changes |

## Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `updateCount(count)` | `number` | `void` | Update the badge count |
| `increment(amount?)` | `number = 1` | `void` | Increment count by amount |
| `decrement(amount?)` | `number = 1` | `void` | Decrement count by amount |
| `reset()` | - | `void` | Reset count to zero |

## SSR Fallback Behavior

In SSR environments, ForgeBadge renders semantic HTML that provides full functionality even without JavaScript:

### Server-Side Rendering
```html
<!-- Count badge rendered during SSR -->
<span class="forge-badge forge-badge--error forge-badge--md" role="status" aria-label="5 items">
  <span class="forge-badge__content">5</span>
</span>

<!-- Dot badge rendered during SSR -->
<span class="forge-badge forge-badge--success forge-badge--dot" role="status" aria-label="Active status">
  <span class="forge-badge__dot" aria-hidden="true"></span>
</span>
```

### Client-Side Hydration
```html
<!-- After hydration to web component -->
<forge-badge variant="error" count="5"></forge-badge>
<forge-badge variant="success" dot></forge-badge>
```

## Accessibility

### ARIA Support

- **Role Management**: Uses `role="status"` for count badges
- **Labels**: Automatic `aria-label` generation for counts
- **Screen Reader**: Descriptive text for badge purpose
- **Live Regions**: Announces count changes to screen readers

### Screen Reader Support

```tsx
<ForgeBadge 
  variant="error" 
  count={5}
  aria-label="5 unread messages"
  aria-live="polite"
/>
```

## Framework Integration

### Next.js App Router (SSR)

```tsx
// app/components/UserAvatar.tsx - Automatic SSR
import { ForgeBadge } from '@nexcraft/forge/integrations/react';

export default function UserAvatar({ user, onlineStatus }) {
  return (
    <div className="relative">
      <img src={user.avatar} alt={user.name} className="rounded-full" />
      <ForgeBadge 
        variant={onlineStatus ? "success" : "neutral"} 
        dot 
        position="bottom-right"
        aria-label={`${user.name} is ${onlineStatus ? 'online' : 'offline'}`}
      />
    </div>
  );
}
```

### Vite/CRA (Client-only)

```tsx
// Same component, automatically renders as web component
import { ForgeBadge } from '@nexcraft/forge/integrations/react';

function ShoppingCart({ itemCount }) {
  return (
    <div className="relative">
      <ForgeButton variant="ghost">
        <ForgeIcon name="shopping-cart" />
      </ForgeButton>
      {itemCount > 0 && (
        <ForgeBadge 
          variant="primary" 
          count={itemCount}
          position="top-right"
        />
      )}
    </div>
  );
}
```

## Examples

### E-commerce Product Badge

```tsx
function ProductCard({ product }) {
  const getBadgeInfo = () => {
    if (product.isNew) return { variant: 'primary', text: 'New' };
    if (product.onSale) return { variant: 'error', text: 'Sale' };
    if (product.lowStock) return { variant: 'warning', text: 'Low Stock' };
    return null;
  };
  
  const badgeInfo = getBadgeInfo();
  
  return (
    <div className="product-card relative">
      <img src={product.image} alt={product.name} />
      {badgeInfo && (
        <ForgeBadge 
          variant={badgeInfo.variant}
          className="absolute top-2 right-2"
        >
          {badgeInfo.text}
        </ForgeBadge>
      )}
      <h3>{product.name}</h3>
      <p>${product.price}</p>
    </div>
  );
}
```

### Status Indicators

```tsx
function UserList({ users }) {
  return (
    <div className="user-list">
      {users.map(user => (
        <div key={user.id} className="user-item flex items-center gap-3">
          <div className="relative">
            <img 
              src={user.avatar} 
              alt={user.name}
              className="w-10 h-10 rounded-full"
            />
            <ForgeBadge
              variant={user.isOnline ? "success" : "neutral"}
              dot
              position="bottom-right"
              pulse={user.isOnline}
              aria-label={`${user.name} is ${user.isOnline ? 'online' : 'offline'}`}
            />
          </div>
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
```

### Dynamic Counter

```tsx
function LikeButton({ initialCount = 0, isLiked = false }) {
  const [count, setCount] = useState(initialCount);
  const [liked, setLiked] = useState(isLiked);
  
  const handleLike = () => {
    setLiked(!liked);
    setCount(prev => liked ? prev - 1 : prev + 1);
  };
  
  return (
    <ForgeButton 
      variant={liked ? "primary" : "ghost"} 
      onClick={handleLike}
      className="relative"
    >
      <ForgeIcon name="heart" />
      Like
      {count > 0 && (
        <ForgeBadge 
          variant="primary" 
          count={count}
          size="sm"
          className="ml-2"
        />
      )}
    </ForgeButton>
  );
}
```

## CSS Custom Properties

```css
forge-badge {
  /* Base styles */
  --badge-font-size: var(--forge-font-size-xs);
  --badge-font-weight: var(--forge-font-weight-medium);
  --badge-border-radius: var(--forge-radius-full);
  --badge-min-width: 20px;
  --badge-height: 20px;
  --badge-padding: 0 6px;
  
  /* Size variants */
  --badge-sm-height: 16px;
  --badge-sm-font-size: 10px;
  --badge-sm-padding: 0 4px;
  --badge-sm-min-width: 16px;
  
  --badge-lg-height: 24px;
  --badge-lg-font-size: 12px;
  --badge-lg-padding: 0 8px;
  --badge-lg-min-width: 24px;
  
  /* Color variants */
  --badge-primary-bg: var(--forge-color-primary-500);
  --badge-primary-text: white;
  
  --badge-secondary-bg: var(--forge-color-secondary-500);
  --badge-secondary-text: white;
  
  --badge-success-bg: var(--forge-color-success-500);
  --badge-success-text: white;
  
  --badge-warning-bg: var(--forge-color-warning-500);
  --badge-warning-text: var(--forge-color-warning-900);
  
  --badge-error-bg: var(--forge-color-error-500);
  --badge-error-text: white;
  
  --badge-neutral-bg: var(--forge-color-neutral-500);
  --badge-neutral-text: white;
  
  /* Dot badge */
  --badge-dot-size: 8px;
  --badge-dot-sm-size: 6px;
  --badge-dot-lg-size: 10px;
  
  /* Animation */
  --badge-pulse-duration: 2s;
  --badge-transition: all 0.2s ease;
}
```

## AI Integration

### State Explanation

```typescript
const badge = document.querySelector('forge-badge');
console.log(badge.explainState());
// "Badge showing count of 5 with error variant, positioned at top-right"
```

### Possible Actions

```typescript
const actions = badge.getPossibleActions();
// [
//   { name: 'increment', available: true, description: 'Increase count by 1' },
//   { name: 'decrement', available: true, description: 'Decrease count by 1' },
//   { name: 'reset', available: true, description: 'Reset count to zero' }
// ]
```

## Performance

- **Lightweight**: <2KB gzipped including styles
- **SSR Optimized**: Minimal hydration overhead
- **Memory Efficient**: Automatic cleanup and optimization
- **CSS-only animations**: Hardware accelerated animations

## Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **SSR Fallback**: Works in any browser with HTML/CSS support
- **Progressive Enhancement**: Graceful degradation without JavaScript

## Related Components

- **[ForgeIcon](./icon.md)** - Icons for badge content
- **[ForgeButton](./button.md)** - Often used together with badges
- **[ForgeAvatar](./avatar.md)** - Status badges on avatars