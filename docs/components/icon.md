# ForgeIcon Component

A lightweight, lazy-loading icon component with a built-in registry system. Supports custom icons, multiple sizes, and automatic optimization.

## Installation

```javascript
import '@nexcraft/forge/icon';
```

## Basic Usage

```html
<forge-icon name="home"></forge-icon>
```

## Icon Registry

### Built-in Icons

The component includes 25+ commonly used icons:

```html
<!-- Navigation -->
<forge-icon name="home"></forge-icon>
<forge-icon name="menu"></forge-icon>
<forge-icon name="close"></forge-icon>
<forge-icon name="arrow-left"></forge-icon>
<forge-icon name="arrow-right"></forge-icon>
<forge-icon name="arrow-up"></forge-icon>
<forge-icon name="arrow-down"></forge-icon>
<forge-icon name="chevron-left"></forge-icon>
<forge-icon name="chevron-right"></forge-icon>

<!-- Actions -->
<forge-icon name="search"></forge-icon>
<forge-icon name="filter"></forge-icon>
<forge-icon name="edit"></forge-icon>
<forge-icon name="delete"></forge-icon>
<forge-icon name="add"></forge-icon>
<forge-icon name="remove"></forge-icon>
<forge-icon name="save"></forge-icon>
<forge-icon name="download"></forge-icon>
<forge-icon name="upload"></forge-icon>
<forge-icon name="share"></forge-icon>

<!-- Status -->
<forge-icon name="check"></forge-icon>
<forge-icon name="error"></forge-icon>
<forge-icon name="warning"></forge-icon>
<forge-icon name="info"></forge-icon>
<forge-icon name="help"></forge-icon>
<forge-icon name="star"></forge-icon>

<!-- Media -->
<forge-icon name="play"></forge-icon>
<forge-icon name="pause"></forge-icon>
<forge-icon name="stop"></forge-icon>

<!-- UI -->
<forge-icon name="settings"></forge-icon>
<forge-icon name="user"></forge-icon>
<forge-icon name="calendar"></forge-icon>
<forge-icon name="clock"></forge-icon>
<forge-icon name="bell"></forge-icon>
<forge-icon name="heart"></forge-icon>
<forge-icon name="eye"></forge-icon>
<forge-icon name="eye-off"></forge-icon>
```

### Registering Custom Icons

```javascript
import { ForgeIcon } from '@nexcraft/forge/icon';

// Register a single icon
ForgeIcon.registerIcon('custom-icon', `
  <svg viewBox="0 0 24 24">
    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12..."/>
  </svg>
`);

// Register multiple icons
ForgeIcon.registerIcons({
  'brand-logo': '<svg>...</svg>',
  'custom-arrow': '<svg>...</svg>',
  'special-icon': '<svg>...</svg>'
});

// Register from URL (lazy loaded)
ForgeIcon.registerIconUrl('remote-icon', 'https://example.com/icon.svg');
```

## Live Examples

### Sizes

```html
<!-- Extra Small (16px) -->
<forge-icon name="home" size="xs"></forge-icon>

<!-- Small (20px) -->
<forge-icon name="home" size="sm"></forge-icon>

<!-- Medium (24px - default) -->
<forge-icon name="home" size="md"></forge-icon>

<!-- Large (32px) -->
<forge-icon name="home" size="lg"></forge-icon>

<!-- Extra Large (48px) -->
<forge-icon name="home" size="xl"></forge-icon>

<!-- Custom size -->
<forge-icon name="home" style="--forge-icon-size: 64px;"></forge-icon>
```

### Colors

```html
<!-- Inherit from parent -->
<div style="color: blue;">
  <forge-icon name="star"></forge-icon>
</div>

<!-- Custom color -->
<forge-icon name="heart" style="color: red;"></forge-icon>

<!-- Using CSS variables -->
<forge-icon 
  name="check" 
  style="color: var(--forge-color-success);"
></forge-icon>
```

### Rotation & Animation

```html
<!-- Static rotation -->
<forge-icon name="arrow-right" rotate="90"></forge-icon>
<forge-icon name="arrow-right" rotate="180"></forge-icon>
<forge-icon name="arrow-right" rotate="270"></forge-icon>

<!-- Spin animation -->
<forge-icon name="settings" spin></forge-icon>

<!-- Pulse animation -->
<forge-icon name="heart" pulse></forge-icon>

<!-- Custom animation -->
<forge-icon 
  name="bell" 
  class="shake"
  style="animation: shake 0.5s infinite;"
></forge-icon>
```

## API Reference

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `name` | `string` | `''` | Icon name from registry |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Icon size |
| `rotate` | `number` | `0` | Rotation angle (degrees) |
| `spin` | `boolean` | `false` | Apply spin animation |
| `pulse` | `boolean` | `false` | Apply pulse animation |
| `lazy` | `boolean` | `true` | Lazy load icon content |

### Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `registerIcon()` | `(name: string, svg: string): void` | Register a custom icon |
| `registerIcons()` | `(icons: Record<string, string>): void` | Register multiple icons |
| `registerIconUrl()` | `(name: string, url: string): void` | Register icon from URL |
| `getIcon()` | `(name: string): string \| undefined` | Get icon SVG content |
| `hasIcon()` | `(name: string): boolean` | Check if icon exists |
| `clearRegistry()` | `(): void` | Clear all registered icons |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `forge-icon-loaded` | `{ name: string, svg: string }` | Icon loaded successfully |
| `forge-icon-error` | `{ name: string, error: Error }` | Icon failed to load |

## Styling

### CSS Custom Properties

```css
/* Size tokens */
--forge-icon-size-xs: 16px;
--forge-icon-size-sm: 20px;
--forge-icon-size-md: 24px;
--forge-icon-size-lg: 32px;
--forge-icon-size-xl: 48px;
--forge-icon-size: var(--forge-icon-size-md);

/* Animation tokens */
--forge-icon-spin-duration: 2s;
--forge-icon-pulse-duration: 1.5s;

/* Color (inherits from parent) */
color: currentColor;
```

### Custom Styling Examples

```css
/* Custom icon sizes */
forge-icon.huge {
  --forge-icon-size: 96px;
}

/* Icon with background */
forge-icon.circled {
  padding: 8px;
  background: var(--forge-color-primary);
  color: white;
  border-radius: 50%;
}

/* Hover effects */
forge-icon.interactive {
  transition: transform 0.2s, color 0.2s;
  cursor: pointer;
}

forge-icon.interactive:hover {
  transform: scale(1.2);
  color: var(--forge-color-primary);
}

/* Custom animations */
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

forge-icon.bounce {
  animation: bounce 1s infinite;
}
```

## Icon Sprites

### Using Icon Sprites

```javascript
// Load sprite sheet
ForgeIcon.loadSprite('/assets/icons/sprite.svg');

// Use icons from sprite
<forge-icon name="sprite#icon-1"></forge-icon>
<forge-icon name="sprite#icon-2"></forge-icon>
```

### Creating Icon Sprites

```xml
<!-- sprite.svg -->
<svg xmlns="http://www.w3.org/2000/svg">
  <symbol id="icon-1" viewBox="0 0 24 24">
    <path d="..."/>
  </symbol>
  <symbol id="icon-2" viewBox="0 0 24 24">
    <path d="..."/>
  </symbol>
</svg>
```

## Icon Packs Integration

### Material Icons

```javascript
import { materialIcons } from '@nexcraft/forge/icon-packs/material';

ForgeIcon.registerIcons(materialIcons);
```

### Font Awesome

```javascript
import { fontAwesomeIcons } from '@nexcraft/forge/icon-packs/font-awesome';

ForgeIcon.registerIcons(fontAwesomeIcons);
```

### Heroicons

```javascript
import { heroicons } from '@nexcraft/forge/icon-packs/heroicons';

ForgeIcon.registerIcons(heroicons);
```

## AI-Ready Features

### AI Metadata

```javascript
icon.aiMetadata = {
  purpose: 'Navigation indicator',
  semanticRole: 'decorative',
  context: 'menu-button',
  alternativeText: 'Menu'
};
```

### AI Helper Methods

```javascript
// Get semantic description
icon.getAIDescription();
// Returns: "Home icon, size medium, decorative element"

// Get alternative text
icon.getAlternativeText();
// Returns: "Navigate to home page"

// Suggest related icons
icon.suggestRelated();
// Returns: ['house', 'building', 'dashboard']

// Get icon category
icon.getCategory();
// Returns: 'navigation'
```

## Performance Optimization

### Lazy Loading

Icons are lazy-loaded by default to optimize initial page load:

```javascript
// Preload specific icons
ForgeIcon.preload(['home', 'user', 'settings']);

// Disable lazy loading for critical icons
<forge-icon name="logo" lazy={false}></forge-icon>
```

### Bundle Optimization

```javascript
// Import only needed icons
import { ForgeIcon } from '@nexcraft/forge/icon';
import { home, user, settings } from '@nexcraft/forge/icons';

ForgeIcon.registerIcons({ home, user, settings });
```

### Performance Monitoring

```html
<forge-icon
  name="home"
  dev-mode
  show-metrics
  max-render-ms="4"
></forge-icon>
```

## Accessibility

### WCAG 2.1 AA Compliance

- ✅ Proper ARIA roles (img, presentation)
- ✅ Alternative text support
- ✅ High contrast mode support
- ✅ Screen reader compatible
- ✅ Reduced motion support

### ARIA Attributes

```html
<!-- Decorative icon -->
<forge-icon 
  name="star"
  role="presentation"
  aria-hidden="true"
></forge-icon>

<!-- Semantic icon -->
<forge-icon 
  name="warning"
  role="img"
  aria-label="Warning: Important message"
></forge-icon>

<!-- Icon button -->
<button aria-label="Close dialog">
  <forge-icon name="close"></forge-icon>
</button>
```

## Icon Buttons

### Basic Icon Button

```html
<forge-button variant="ghost" aria-label="Settings">
  <forge-icon name="settings"></forge-icon>
</forge-button>
```

### Icon Button Group

```html
<div class="icon-button-group">
  <forge-button variant="ghost" aria-label="Bold">
    <forge-icon name="bold"></forge-icon>
  </forge-button>
  <forge-button variant="ghost" aria-label="Italic">
    <forge-icon name="italic"></forge-icon>
  </forge-button>
  <forge-button variant="ghost" aria-label="Underline">
    <forge-icon name="underline"></forge-icon>
  </forge-button>
</div>
```

## Use Cases

### Navigation Menu

```html
<nav>
  <a href="/">
    <forge-icon name="home"></forge-icon>
    <span>Home</span>
  </a>
  <a href="/products">
    <forge-icon name="box"></forge-icon>
    <span>Products</span>
  </a>
  <a href="/settings">
    <forge-icon name="settings"></forge-icon>
    <span>Settings</span>
  </a>
</nav>
```

### Status Indicators

```html
<div class="status">
  <forge-icon 
    name="check" 
    style="color: var(--forge-color-success);"
  ></forge-icon>
  <span>Operation successful</span>
</div>

<div class="status">
  <forge-icon 
    name="error" 
    style="color: var(--forge-color-danger);"
  ></forge-icon>
  <span>An error occurred</span>
</div>
```

### Loading States

```html
<div class="loading">
  <forge-icon name="spinner" spin></forge-icon>
  <span>Loading data...</span>
</div>
```

### Social Media Links

```html
<div class="social-links">
  <a href="#" aria-label="Facebook">
    <forge-icon name="facebook"></forge-icon>
  </a>
  <a href="#" aria-label="Twitter">
    <forge-icon name="twitter"></forge-icon>
  </a>
  <a href="#" aria-label="LinkedIn">
    <forge-icon name="linkedin"></forge-icon>
  </a>
</div>
```

## Framework Integration

### React

```jsx
import '@nexcraft/forge/icon';
import { ForgeIcon } from '@nexcraft/forge/icon';

// Register custom icons
ForgeIcon.registerIcons({
  'react-logo': '<svg>...</svg>'
});

function MyComponent() {
  return (
    <div>
      <forge-icon name="react-logo" size="lg" />
      <forge-icon name="home" onClick={handleClick} />
    </div>
  );
}
```

### Vue

```vue
<template>
  <div>
    <forge-icon :name="iconName" :size="iconSize" />
    <forge-icon name="heart" :spin="isLoading" />
  </div>
</template>

<script>
import '@nexcraft/forge/icon';

export default {
  data() {
    return {
      iconName: 'home',
      iconSize: 'md',
      isLoading: false
    };
  }
};
</script>
```

### Angular

```typescript
import '@nexcraft/forge/icon';
import { ForgeIcon } from '@nexcraft/forge/icon';

@Component({
  template: `
    <forge-icon [name]="iconName" [size]="iconSize"></forge-icon>
    <forge-icon name="refresh" [spin]="loading"></forge-icon>
  `
})
export class MyComponent {
  iconName = 'home';
  iconSize = 'md';
  loading = false;
  
  constructor() {
    // Register custom icons
    ForgeIcon.registerIcons({
      'angular-logo': '<svg>...</svg>'
    });
  }
}
```

## Testing

### Unit Test Example

```typescript
import { fixture, html } from '@open-wc/testing';
import { expect } from '@esm-bundle/chai';
import '@nexcraft/forge/icon';
import { ForgeIcon } from '@nexcraft/forge/icon';

describe('forge-icon', () => {
  beforeEach(() => {
    ForgeIcon.registerIcon('test-icon', '<svg><circle/></svg>');
  });
  
  it('should render registered icon', async () => {
    const el = await fixture(html`
      <forge-icon name="test-icon"></forge-icon>
    `);
    
    await el.updateComplete;
    const svg = el.shadowRoot?.querySelector('svg');
    expect(svg).to.exist;
  });
  
  it('should apply size class', async () => {
    const el = await fixture(html`
      <forge-icon name="home" size="lg"></forge-icon>
    `);
    
    expect(el.size).to.equal('lg');
    expect(el).to.have.attribute('size', 'lg');
  });
});
```

## Migration Guide

### From Font Awesome

```html
<!-- Before (Font Awesome) -->
<i class="fas fa-home fa-2x"></i>

<!-- After (Forge) -->
<forge-icon name="home" size="lg"></forge-icon>
```

### From Material Icons

```html
<!-- Before (Material Icons) -->
<i class="material-icons md-36">home</i>

<!-- After (Forge) -->
<forge-icon name="home" size="lg"></forge-icon>
```

### From SVG Inline

```html
<!-- Before (Inline SVG) -->
<svg width="24" height="24" viewBox="0 0 24 24">
  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
</svg>

<!-- After (Forge) -->
<forge-icon name="home"></forge-icon>
```

## Browser Support

- Chrome 67+ ✅
- Firefox 63+ ✅
- Safari 10.1+ ✅
- Edge 79+ ✅

## Related Components

- [ForgeIconButton](./icon-button.md) - Clickable icon button
- [ForgeButton](./button.md) - Button with icon support
- [ForgeBadge](./badge.md) - Badge with icon

## Changelog

### Version 1.0.0
- Initial release with 25+ built-in icons
- Icon registry system
- Lazy loading support
- 5 size variants
- Rotation and animation
- AI-ready architecture
- Performance monitoring

## API Playground

Try the component live in our [Storybook](https://forge-ui.dev/storybook/?path=/story/atoms-icon)