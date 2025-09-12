# Avatar Component

The `forge-avatar` component provides user identity display with image support, fallback text/initials, and status indicators. Perfect for user profiles, navigation bars, and any interface requiring user representation.

## Basic Usage

```html
<!-- Simple avatar with image -->
<forge-avatar 
  src="https://example.com/user.jpg" 
  alt="John Doe">
</forge-avatar>

<!-- Avatar with fallback initials -->
<forge-avatar fallback="JD"></forge-avatar>

<!-- Avatar with status indicator -->
<forge-avatar 
  src="user.jpg"
  alt="Jane Smith"
  status="online">
</forge-avatar>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `src` | `string` | `undefined` | Image source URL |
| `alt` | `string` | `undefined` | Alt text for the image |
| `fallback` | `string` | `undefined` | Fallback text/initials when no image |
| `size` | `AvatarSize` | `'md'` | Size variant: `xs`, `sm`, `md`, `lg`, `xl` |
| `status` | `AvatarStatus` | `'none'` | Status indicator: `online`, `offline`, `busy`, `away`, `none` |
| `status-position` | `StatusPosition` | `'top-right'` | Status position: `top-right`, `top-left`, `bottom-right`, `bottom-left` |
| `shape` | `AvatarShape` | `'circle'` | Shape variant: `circle`, `square`, `rounded` |
| `clickable` | `boolean` | `false` | Makes avatar interactive |
| `loading` | `boolean` | `false` | Shows loading state |
| `disabled` | `boolean` | `false` | Disables interactions |

## Size Variants

The avatar component supports 5 size variants:

```html
<!-- Extra small: 24px -->
<forge-avatar fallback="XS" size="xs"></forge-avatar>

<!-- Small: 32px -->
<forge-avatar fallback="SM" size="sm"></forge-avatar>

<!-- Medium: 40px (default) -->
<forge-avatar fallback="MD" size="md"></forge-avatar>

<!-- Large: 48px -->
<forge-avatar fallback="LG" size="lg"></forge-avatar>

<!-- Extra large: 64px -->
<forge-avatar fallback="XL" size="xl"></forge-avatar>
```

## Status Indicators

Show user presence with status indicators:

```html
<!-- Online status -->
<forge-avatar 
  fallback="ON" 
  status="online"
  size="md">
</forge-avatar>

<!-- Busy status -->
<forge-avatar 
  fallback="BY" 
  status="busy"
  status-position="bottom-right">
</forge-avatar>

<!-- Away status -->
<forge-avatar 
  fallback="AW" 
  status="away"
  status-position="top-left">
</forge-avatar>

<!-- Offline status -->
<forge-avatar 
  fallback="OF" 
  status="offline">
</forge-avatar>
```

## Shape Variants

Control the avatar shape:

```html
<!-- Circle (default) -->
<forge-avatar fallback="CI" shape="circle"></forge-avatar>

<!-- Square -->
<forge-avatar fallback="SQ" shape="square"></forge-avatar>

<!-- Rounded corners -->
<forge-avatar fallback="RO" shape="rounded"></forge-avatar>
```

## Interactive Avatar

Make avatars clickable for user interactions:

```html
<forge-avatar 
  src="user.jpg"
  alt="John Doe"
  size="lg"
  clickable
  @forge-avatar-click=${handleAvatarClick}>
</forge-avatar>

<script>
function handleAvatarClick(event) {
  console.log('Avatar clicked:', event.detail);
  // Navigate to user profile
}
</script>
```

## Loading States

Show loading state while images are being fetched:

```html
<forge-avatar 
  src="slow-loading-image.jpg"
  fallback="JD"
  loading
  size="lg">
</forge-avatar>
```

## Accessibility

The avatar component follows WCAG 2.1 AA guidelines:

- Uses `role="img"` for proper semantics
- Provides descriptive `aria-label` attributes
- Supports keyboard navigation when clickable
- Screen reader friendly status announcements

```html
<!-- Accessible avatar example -->
<forge-avatar 
  src="user.jpg"
  alt="John Doe, Software Engineer"
  status="online"
  clickable
  aria-label="John Doe's profile picture, currently online">
</forge-avatar>
```

## Styling

### CSS Custom Properties

Customize the avatar appearance using CSS custom properties:

```css
forge-avatar {
  --forge-avatar-size: 3rem;
  --forge-avatar-bg: #3b82f6;
  --forge-avatar-color: white;
  --forge-avatar-border-radius: 50%;
  --forge-avatar-border-width: 2px;
  --forge-avatar-border-color: #e5e7eb;
  --forge-avatar-status-size: 0.875rem;
  --forge-avatar-status-border: 2px solid white;
}
```

### CSS Parts

Style specific parts of the avatar:

```css
forge-avatar::part(avatar) {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

forge-avatar::part(image) {
  filter: grayscale(50%);
}

forge-avatar::part(fallback) {
  font-weight: bold;
}

forge-avatar::part(status) {
  box-shadow: 0 0 0 3px white;
}
```

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `forge-avatar-click` | `{ src, fallback, status }` | Fired when clickable avatar is clicked |

```javascript
document.querySelector('forge-avatar').addEventListener('forge-avatar-click', (event) => {
  console.log('Avatar clicked:', {
    imageSrc: event.detail.src,
    fallbackText: event.detail.fallback,
    userStatus: event.detail.status
  });
});
```

## AI Integration

The avatar component includes built-in AI metadata for intelligent applications:

```javascript
const avatar = document.querySelector('forge-avatar');

// Get component state explanation
console.log(avatar.explainState());
// "Avatar component showing image from "user.jpg" with online status indicator and is clickable. Size: md, Shape: circle."

// Get possible AI actions
console.log(avatar.getPossibleActions());
// [{ name: 'click', description: 'Click avatar to trigger user profile action', available: true }]

// Access AI state data
console.log(avatar.aiState);
// { hasImage: true, fallbackText: null, size: 'md', status: 'online', clickable: true, ... }
```

## Common Patterns

### User Navigation Bar
```html
<nav>
  <div class="nav-user">
    <forge-avatar 
      src="${user.avatar}"
      fallback="${user.initials}"
      alt="${user.name}"
      size="sm"
      status="${user.status}"
      clickable
      @forge-avatar-click=${openUserMenu}>
    </forge-avatar>
    <span>${user.name}</span>
  </div>
</nav>
```

### User List
```html
<div class="user-list">
  ${users.map(user => html`
    <div class="user-item">
      <forge-avatar 
        src="${user.avatar}"
        fallback="${user.initials}"
        size="md"
        status="${user.isOnline ? 'online' : 'offline'}">
      </forge-avatar>
      <div class="user-info">
        <h4>${user.name}</h4>
        <p>${user.role}</p>
      </div>
    </div>
  `)}
</div>
```

### Comment Thread
```html
<div class="comment">
  <forge-avatar 
    src="${comment.author.avatar}"
    fallback="${comment.author.initials}"
    size="sm"
    shape="rounded">
  </forge-avatar>
  <div class="comment-content">
    <strong>${comment.author.name}</strong>
    <p>${comment.text}</p>
  </div>
</div>
```

## Best Practices

1. **Always provide fallback text** for better user experience
2. **Use appropriate sizes** for the context (smaller for lists, larger for profiles)
3. **Include descriptive alt text** for accessibility
4. **Consider loading states** for slow network conditions
5. **Use status indicators sparingly** to avoid visual clutter
6. **Test with screen readers** to ensure accessibility

## Performance

- **Bundle Size**: ~2KB gzipped
- **Render Time**: <1ms average
- **Memory Usage**: Minimal DOM footprint
- **Loading**: Efficient image error handling and fallback rendering

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## Related Components

- [`forge-button`](../button.md) - For interactive elements
- [`forge-badge`](../badge.md) - For notification indicators
- [`forge-icon`](../icon.md) - For icon-based avatars
- [`forge-navigation-bar`](../../organisms/navigation-bar.md) - Contains user avatars