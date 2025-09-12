# ForgeIcon

Versatile icon component with unified SSR/client architecture for displaying scalable vector icons from multiple icon libraries.

## Unified SSR Architecture

The ForgeIcon component uses our revolutionary **unified wrapper approach** - a single component that works everywhere without any developer configuration:

- **SSR Environment** (Next.js): Renders semantic HTML with inline SVG or icon fonts
- **Client Environment** (Vite): Renders as web component with dynamic icon loading  
- **Progressive Enhancement**: Seamlessly upgrades from HTML icon to web component
- **Graceful Degradation**: Falls back to enhanced HTML or Unicode fallback if web components fail

**Single component that works everywhere - no separate SSR/client versions needed.**

## Key Features

- **Multiple Icon Libraries**: Support for Lucide, Heroicons, Feather, and custom SVGs
- **Dynamic Loading**: Lazy loading of icon resources for optimal performance
- **Size Variants**: Predefined sizes from extra-small to extra-large
- **Color Customization**: CSS custom property and theme integration
- **Accessibility**: Proper ARIA attributes and screen reader support
- **Semantic Fallbacks**: Unicode character fallbacks for SSR environments
- **High Performance**: Optimized rendering and caching
- **Unified SSR**: Works seamlessly in both SSR and client environments
- **AI-Ready**: Complete AI metadata for intelligent interactions

## Basic Usage

### Import (Works in any React environment)

```tsx
import { ForgeIcon } from '@nexcraft/forge/integrations/react';

// Same import works in:
// ✅ Next.js App Router (SSR)
// ✅ Next.js Pages Router (SSR) 
// ✅ Vite (Client-only)
// ✅ CRA (Client-only)
// ✅ Any React SSR framework
```

### Basic Icons

```tsx
// Default icon (Lucide library)
<ForgeIcon name="home" />

// Specific library icon
<ForgeIcon name="user" library="heroicons" />

// Icon with size
<ForgeIcon name="star" size="lg" />

// Icon with custom color
<ForgeIcon name="heart" color="red" />

// Icon with aria label
<ForgeIcon name="settings" aria-label="Open settings" />
```

### Icon Sizes

```tsx
// Size variants
<ForgeIcon name="check" size="xs" />   {/* 12px */}
<ForgeIcon name="check" size="sm" />   {/* 16px */}
<ForgeIcon name="check" size="md" />   {/* 20px - default */}
<ForgeIcon name="check" size="lg" />   {/* 24px */}
<ForgeIcon name="check" size="xl" />   {/* 28px */}
<ForgeIcon name="check" size="2xl" />  {/* 32px */}

// Custom size
<ForgeIcon name="check" size="40px" />
<ForgeIcon name="check" style={{ width: '2.5rem', height: '2.5rem' }} />
```

## Advanced Usage

### Icons in Buttons

```tsx
// Button with start icon
<ForgeButton>
  <ForgeIcon slot="start" name="plus" />
  Add Item
</ForgeButton>

// Icon-only button
<ForgeButton variant="ghost" aria-label="Edit item">
  <ForgeIcon name="edit" />
</ForgeButton>

// Button with loading state
<ForgeButton loading>
  <ForgeIcon slot="start" name="loader" className="animate-spin" />
  Processing...
</ForgeButton>
```

### Status and State Icons

```tsx
function StatusIcon({ status }) {
  const getStatusIcon = () => {
    switch (status) {
      case 'success':
        return <ForgeIcon name="check-circle" color="green" />;
      case 'error':
        return <ForgeIcon name="x-circle" color="red" />;
      case 'warning':
        return <ForgeIcon name="alert-triangle" color="orange" />;
      case 'loading':
        return <ForgeIcon name="loader" className="animate-spin" />;
      default:
        return <ForgeIcon name="info" />;
    }
  };
  
  return getStatusIcon();
}
```

### Custom SVG Icons

```tsx
// Custom SVG icon
<ForgeIcon 
  name="custom-logo" 
  library="custom"
  svg={`
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 9 5.16.74 9-3.45 9-9V7l-10-5z"/>
    </svg>
  `}
/>

// Icon from URL
<ForgeIcon 
  name="external-icon"
  src="/icons/custom-icon.svg"
  fallback="📎"
/>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `name` | `string` | `undefined` | Icon name from the specified library |
| `library` | `'lucide' \| 'heroicons' \| 'feather' \| 'custom'` | `'lucide'` | Icon library to use |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| string` | `'md'` | Icon size |
| `color` | `string` | `'currentColor'` | Icon color (CSS color value) |
| `strokeWidth` | `number` | `2` | Stroke width for outline icons |
| `fill` | `string` | `'none'` | Fill color for filled icons |
| `src` | `string` | `undefined` | URL to external SVG icon |
| `svg` | `string` | `undefined` | Inline SVG markup |
| `fallback` | `string` | `undefined` | Fallback text/emoji for SSR |
| `loading` | `'lazy' \| 'eager'` | `'lazy'` | Icon loading strategy |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `icon-load` | `{ name: string, library: string }` | Fired when icon is loaded |
| `icon-error` | `{ name: string, error: Error }` | Fired when icon loading fails |
| `click` | `MouseEvent` | Fired when icon is clicked |

## Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `reload()` | - | `void` | Reload the icon from source |
| `preload()` | - | `Promise<void>` | Preload icon for faster rendering |

## SSR Fallback Behavior

In SSR environments, ForgeIcon renders semantic fallbacks that provide meaningful content even without JavaScript:

### Server-Side Rendering
```html
<!-- Icon with Unicode fallback rendered during SSR -->
<span class="forge-icon forge-icon--md" role="img" aria-label="Home">
  🏠
</span>

<!-- Icon with text fallback -->
<span class="forge-icon forge-icon--md" role="img" aria-label="Settings">
  ⚙️
</span>

<!-- Icon with CSS background fallback -->
<span 
  class="forge-icon forge-icon--user forge-icon--md" 
  style="background-image: url(data:image/svg+xml;base64,...)"
  role="img" 
  aria-label="User profile"
>
</span>
```

### Client-Side Hydration
```html
<!-- After hydration to web component -->
<forge-icon name="home" fallback="🏠"></forge-icon>
<forge-icon name="settings" fallback="⚙️"></forge-icon>
<forge-icon name="user"></forge-icon>
```

## Accessibility

### ARIA Support

- **Role Management**: Uses `role="img"` for decorative icons, `role="button"` for interactive icons
- **Labels**: Automatic `aria-label` generation from icon names
- **Hidden State**: `aria-hidden="true"` for purely decorative icons
- **Screen Reader**: Descriptive text fallbacks for complex icons

### Screen Reader Support

```tsx
// Decorative icon (hidden from screen readers)
<ForgeIcon name="star" aria-hidden />

// Meaningful icon with label
<ForgeIcon 
  name="warning" 
  aria-label="Warning: Action required"
  role="img"
/>

// Interactive icon
<button onClick={handleEdit}>
  <ForgeIcon name="edit" aria-label="Edit item" />
</button>
```

## Framework Integration

### Next.js App Router (SSR)

```tsx
// app/components/Navigation.tsx - Automatic SSR
import { ForgeIcon } from '@nexcraft/forge/integrations/react';

export default function Navigation() {
  return (
    <nav>
      <ForgeButton variant="ghost">
        <ForgeIcon name="home" fallback="🏠" />
        Home
      </ForgeButton>
      <ForgeButton variant="ghost">
        <ForgeIcon name="user" fallback="👤" />
        Profile
      </ForgeButton>
      <ForgeButton variant="ghost">
        <ForgeIcon name="settings" fallback="⚙️" />
        Settings
      </ForgeButton>
    </nav>
  );
}
```

### Vite/CRA (Client-only)

```tsx
// Same component, automatically renders as web component
import { ForgeIcon } from '@nexcraft/forge/integrations/react';

function ActionToolbar() {
  return (
    <div className="toolbar">
      <ForgeButton variant="ghost" size="sm">
        <ForgeIcon name="copy" size="sm" />
      </ForgeButton>
      <ForgeButton variant="ghost" size="sm">
        <ForgeIcon name="edit" size="sm" />
      </ForgeButton>
      <ForgeButton variant="ghost" size="sm">
        <ForgeIcon name="trash" size="sm" />
      </ForgeButton>
    </div>
  );
}
```

## Examples

### Icon Library Showcase

```tsx
function IconShowcase() {
  const iconSizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
  const commonIcons = [
    'home', 'user', 'settings', 'search', 'bell', 'heart',
    'star', 'check', 'x', 'plus', 'minus', 'edit'
  ];
  
  return (
    <div className="icon-showcase">
      <h3>Icon Sizes</h3>
      <div className="size-demo">
        {iconSizes.map(size => (
          <div key={size} className="size-example">
            <ForgeIcon name="star" size={size} />
            <span>{size}</span>
          </div>
        ))}
      </div>
      
      <h3>Common Icons</h3>
      <div className="icons-grid">
        {commonIcons.map(iconName => (
          <div key={iconName} className="icon-example">
            <ForgeIcon name={iconName} size="lg" />
            <span>{iconName}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Status Indicators

```tsx
function FileList({ files }) {
  const getFileIcon = (file) => {
    const ext = file.name.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf':
        return <ForgeIcon name="file-text" color="#e74c3c" />;
      case 'jpg':
      case 'png':
      case 'gif':
        return <ForgeIcon name="image" color="#f39c12" />;
      case 'mp4':
      case 'mov':
        return <ForgeIcon name="video" color="#9b59b6" />;
      case 'mp3':
      case 'wav':
        return <ForgeIcon name="music" color="#1abc9c" />;
      default:
        return <ForgeIcon name="file" color="#95a5a6" />;
    }
  };
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'uploading':
        return <ForgeIcon name="loader" className="animate-spin" size="sm" />;
      case 'complete':
        return <ForgeIcon name="check-circle" color="green" size="sm" />;
      case 'error':
        return <ForgeIcon name="x-circle" color="red" size="sm" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="file-list">
      {files.map(file => (
        <div key={file.id} className="file-item">
          <div className="file-icon">
            {getFileIcon(file)}
          </div>
          <div className="file-info">
            <span className="file-name">{file.name}</span>
            <span className="file-size">{file.size}</span>
          </div>
          <div className="file-status">
            {getStatusIcon(file.status)}
          </div>
        </div>
      ))}
    </div>
  );
}
```

### Interactive Icon Buttons

```tsx
function SocialShare({ url, title }) {
  const shareOptions = [
    { name: 'twitter', icon: 'twitter', color: '#1da1f2', label: 'Share on Twitter' },
    { name: 'facebook', icon: 'facebook', color: '#1877f2', label: 'Share on Facebook' },
    { name: 'linkedin', icon: 'linkedin', color: '#0a66c2', label: 'Share on LinkedIn' },
    { name: 'copy', icon: 'copy', color: '#6b7280', label: 'Copy link' }
  ];
  
  const handleShare = async (platform) => {
    if (platform === 'copy') {
      await navigator.clipboard.writeText(url);
      return;
    }
    // Handle other platforms...
  };
  
  return (
    <div className="social-share">
      <h4>Share this page</h4>
      <div className="share-buttons">
        {shareOptions.map(option => (
          <ForgeButton
            key={option.name}
            variant="ghost"
            size="lg"
            onClick={() => handleShare(option.name)}
            aria-label={option.label}
          >
            <ForgeIcon 
              name={option.icon} 
              color={option.color}
              size="lg"
            />
          </ForgeButton>
        ))}
      </div>
    </div>
  );
}
```

## CSS Custom Properties

```css
forge-icon {
  /* Base sizing */
  --icon-size-xs: 12px;
  --icon-size-sm: 16px;
  --icon-size-md: 20px;
  --icon-size-lg: 24px;
  --icon-size-xl: 28px;
  --icon-size-2xl: 32px;
  
  /* Colors */
  --icon-color: currentColor;
  --icon-stroke-width: 2;
  --icon-fill: none;
  
  /* Animation */
  --icon-transition: all 0.2s ease;
  --icon-hover-scale: 1.1;
  
  /* Loading states */
  --icon-loading-opacity: 0.6;
  --icon-spin-duration: 1s;
  
  /* Error fallback */
  --icon-fallback-bg: var(--forge-color-neutral-100);
  --icon-fallback-color: var(--forge-color-neutral-600);
  --icon-fallback-border: 1px solid var(--forge-color-neutral-200);
}

/* Animation utilities */
.animate-spin {
  animation: forge-icon-spin var(--icon-spin-duration) linear infinite;
}

.animate-pulse {
  animation: forge-icon-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-bounce {
  animation: forge-icon-bounce 1s infinite;
}

@keyframes forge-icon-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes forge-icon-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes forge-icon-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-25%); }
}
```

## AI Integration

### State Explanation

```typescript
const icon = document.querySelector('forge-icon');
console.log(icon.explainState());
// "Icon displaying 'home' from Lucide library, medium size, using current text color"
```

### Possible Actions

```typescript
const actions = icon.getPossibleActions();
// [
//   { name: 'reload', available: true, description: 'Reload icon from source' },
//   { name: 'preload', available: true, description: 'Preload icon for faster rendering' }
// ]
```

## Performance

- **Lightweight**: <2KB gzipped including core functionality
- **Lazy Loading**: Icons loaded only when needed
- **Caching**: Intelligent caching of loaded icons
- **SVG Optimization**: Automatic SVG optimization and minification
- **Bundle Size**: Tree-shaking support for unused icons

## Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **SSR Fallback**: Unicode and CSS fallbacks work in any browser
- **Progressive Enhancement**: Graceful degradation to text/emoji fallbacks

## Icon Libraries

### Lucide Icons (Default)
- **Count**: 1000+ icons
- **Style**: Outline, consistent design
- **License**: ISC License
- **Website**: [lucide.dev](https://lucide.dev)

### Heroicons
- **Count**: 500+ icons  
- **Style**: Outline and solid variants
- **License**: MIT License
- **Website**: [heroicons.com](https://heroicons.com)

### Feather Icons
- **Count**: 280+ icons
- **Style**: Minimalist outline
- **License**: MIT License  
- **Website**: [feathericons.com](https://feathericons.com)

## Related Components

- **[ForgeButton](./button.md)** - Buttons enhanced with icons
- **[ForgeInput](./input.md)** - Input fields with icon support
- **[ForgeBadge](./badge.md)** - Badges with icon content