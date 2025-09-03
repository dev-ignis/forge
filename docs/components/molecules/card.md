# ForgeCard

Flexible card container component with media support, interactive states, and customizable elevation.

## Overview

The ForgeCard component provides a versatile container for structured content with optional media, headers, footers, and actions. It supports interactive variants, elevation levels, and responsive layouts while maintaining accessibility and performance standards.

## Key Features

- **Flexible Layout**: Header, body, footer, and media slots
- **Interactive Variants**: Clickable and selectable states
- **Media Support**: Images, videos with aspect ratio control
- **Elevation System**: 6 levels of shadow depth (0-5)
- **Loading States**: Built-in skeleton loading animation
- **Responsive Design**: Mobile-optimized layouts
- **Accessibility**: Full keyboard and screen reader support
- **AI-Ready**: Complete AI metadata for intelligent interactions

## Basic Usage

```html
<forge-card title="Card Title" subtitle="Optional subtitle">
  <p>Card content goes here</p>
</forge-card>
```

## Advanced Usage

```html
<forge-card
  variant="elevated"
  size="large"
  elevation="3"
  clickable
  title="Interactive Card"
  subtitle="Click to interact"
  media-aspect="16-9"
  @forge-click="${handleCardClick}"
>
  <img slot="media" src="image.jpg" alt="Card image" />
  <p>Rich content with media and interactions</p>
  <forge-button slot="actions" variant="primary">Action</forge-button>
  <forge-button slot="actions" variant="secondary">Cancel</forge-button>
</forge-card>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `CardVariant` | `'default'` | Visual style (default, outlined, elevated, filled) |
| `size` | `CardSize` | `'medium'` | Card size (small, medium, large) |
| `elevation` | `number` | `-1` | Shadow depth (0-5, -1 uses variant default) |
| `clickable` | `boolean` | `false` | Whether card is interactive |
| `selected` | `boolean` | `false` | Selection state for clickable cards |
| `disabled` | `boolean` | `false` | Disabled state |
| `loading` | `boolean` | `false` | Show loading skeleton |
| `title` | `string` | `''` | Card title text |
| `subtitle` | `string` | `''` | Card subtitle text |
| `media-aspect` | `string` | `'16-9'` | Media aspect ratio (16-9, 4-3, 1-1) |
| `no-header-border` | `boolean` | `false` | Remove header border |
| `no-footer-border` | `boolean` | `false` | Remove footer border |
| `aria-label` | `string` | `null` | Accessibility label |

## Types

### CardVariant
```typescript
type CardVariant = 'default' | 'outlined' | 'elevated' | 'filled';
```

### CardSize
```typescript
type CardSize = 'small' | 'medium' | 'large';
```

## Slots

| Slot | Description |
|------|-------------|
| `default` | Main card content |
| `media` | Media content (images, videos) |
| `header` | Custom header content |
| `footer` | Custom footer content |
| `actions` | Action buttons in footer |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `forge-click` | `{ originalEvent: Event, selected: boolean }` | Fired when clickable card is clicked |
| `forge-select` | `{ selected: boolean }` | Fired when selection state changes |

## Variants

### Default
Standard card with subtle border:

```html
<forge-card variant="default">
  <p>Default card content</p>
</forge-card>
```

### Outlined
Card with prominent border:

```html
<forge-card variant="outlined">
  <p>Outlined card content</p>
</forge-card>
```

### Elevated
Card with shadow elevation:

```html
<forge-card variant="elevated">
  <p>Elevated card with shadow</p>
</forge-card>
```

### Filled
Card with filled background:

```html
<forge-card variant="filled">
  <p>Filled background card</p>
</forge-card>
```

## Elevation System

Six levels of elevation for depth hierarchy:

- **Level 0**: No shadow (flat)
- **Level 1**: Subtle shadow for slight elevation
- **Level 2**: Moderate shadow for standard elevation
- **Level 3**: Prominent shadow for emphasis
- **Level 4**: Strong shadow for high importance
- **Level 5**: Maximum shadow for floating elements

```html
<forge-card elevation="0">Flat card</forge-card>
<forge-card elevation="2">Standard elevation</forge-card>
<forge-card elevation="5">Maximum elevation</forge-card>
```

## Interactive States

### Clickable Cards
Cards that respond to user interactions:

```html
<forge-card 
  clickable 
  @forge-click="${handleClick}"
  title="Clickable Card"
>
  <p>Click anywhere on this card</p>
</forge-card>
```

### Selectable Cards
Cards with selection state management:

```html
<forge-card 
  clickable 
  .selected="${isSelected}"
  @forge-select="${handleSelection}"
  title="Selectable Card"
>
  <p>This card can be selected</p>
</forge-card>
```

## Media Support

Cards support various media types with aspect ratio control:

```html
<forge-card media-aspect="16-9">
  <img slot="media" src="hero-image.jpg" alt="Hero" />
  <h3>Card with Media</h3>
  <p>Media content with controlled aspect ratio</p>
</forge-card>
```

### Aspect Ratios
- `16-9`: Widescreen format (default)
- `4-3`: Standard format
- `1-1`: Square format

## Layout Slots

### Header Slot
Custom header content or use built-in title/subtitle:

```html
<forge-card>
  <div slot="header" class="custom-header">
    <h2>Custom Header</h2>
    <badge>New</badge>
  </div>
  <p>Card content</p>
</forge-card>
```

### Footer Slot
Custom footer content:

```html
<forge-card>
  <p>Card content</p>
  <div slot="footer">
    <small>Last updated: Today</small>
  </div>
</forge-card>
```

### Actions Slot
Action buttons in footer:

```html
<forge-card>
  <p>Card content</p>
  <forge-button slot="actions" variant="primary">Save</forge-button>
  <forge-button slot="actions" variant="secondary">Cancel</forge-button>
</forge-card>
```

## Loading States

Built-in skeleton loading animation:

```html
<forge-card 
  loading 
  title="Loading Card"
  subtitle="Please wait..."
>
  <p>This content is loading...</p>
</forge-card>
```

The loading state shows a subtle animation overlay while content loads.

## Accessibility Features

- **Semantic HTML**: Uses `<article>` element for card structure
- **ARIA Support**: Proper roles and labels
- **Keyboard Navigation**: Enter and Space key support for clickable cards
- **Focus Management**: Visible focus indicators
- **Screen Readers**: Meaningful announcements for state changes

## AI Metadata

Comprehensive AI metadata for intelligent interactions:

```typescript
{
  purpose: 'Container for structured content with optional media',
  criticality: 'low',
  semanticRole: 'article',
  interactions: [
    {
      type: 'click',
      description: 'Card click interaction',
      outcome: 'Triggers card action if clickable'
    },
    {
      type: 'hover',
      description: 'Hover effect',
      outcome: 'Visual feedback on interactive cards'
    },
    {
      type: 'keyboard',
      description: 'Keyboard navigation',
      shortcuts: ['Enter', 'Space']
    }
  ]
}
```

## Performance Features

- Automatic render time tracking
- Performance budget enforcement
- Graceful degradation for animations
- Optimized re-rendering

## Styling

### CSS Custom Properties

```css
:host {
  --forge-card-bg: #ffffff;
  --forge-card-radius: 8px;
  --forge-card-filled-bg: #f3f4f6;
  --forge-border-color: #e5e7eb;
  --forge-border-light: #f3f4f6;
  --forge-primary-color: #3b82f6;
  --forge-primary-alpha: rgba(59, 130, 246, 0.1);
}
```

### Size Variables

```css
.card--small { --card-padding: 12px; }
.card--medium { --card-padding: 16px; }
.card--large { --card-padding: 24px; }
```

## Responsive Behavior

Cards automatically adapt to smaller screens:

- Large cards use medium padding on mobile
- Elevation effects are preserved
- Touch interactions are optimized
- Content reflows appropriately

## Examples

### Product Card
```html
<forge-card 
  clickable
  variant="elevated"
  elevation="2"
  media-aspect="1-1"
>
  <img slot="media" src="product.jpg" alt="Product" />
  <h3>Product Name</h3>
  <p>Product description and details</p>
  <div slot="footer">
    <strong>$29.99</strong>
  </div>
  <forge-button slot="actions" variant="primary">Add to Cart</forge-button>
</forge-card>
```

### Article Card
```html
<forge-card 
  title="Article Title"
  subtitle="Published on March 15, 2024"
  clickable
>
  <p>Article excerpt that gives readers a preview of the content...</p>
  <div slot="footer">
    <span>5 min read</span>
    <span>Technology</span>
  </div>
</forge-card>
```

### Status Card
```html
<forge-card 
  variant="outlined"
  .selected="${isActive}"
  clickable
>
  <div slot="header">
    <h3>System Status</h3>
    <forge-badge variant="success">Online</forge-badge>
  </div>
  <p>All systems operational</p>
</forge-card>
```

## Testing

Comprehensive test coverage includes:

- All variants and sizes
- Interactive behaviors
- Accessibility compliance
- Media slot functionality
- Loading states
- Performance monitoring

```typescript
// Example test
it('should handle click interactions when clickable', async () => {
  const card = await fixture<ForgeCard>(html`
    <forge-card clickable title="Test Card">
      Content
    </forge-card>
  `);
  
  const clickSpy = sinon.spy();
  card.addEventListener('forge-click', clickSpy);
  
  card.click();
  expect(clickSpy).to.have.been.calledOnce;
});
```

## Best Practices

1. **Content Hierarchy**: Use title, subtitle, and body appropriately
2. **Media Optimization**: Optimize images for card dimensions
3. **Interactive Feedback**: Provide clear hover and focus states
4. **Accessibility**: Always include meaningful alt text and labels
5. **Performance**: Use loading states for async content

## Browser Support

- Modern browsers with Web Components support
- Graceful degradation for older browsers
- Optimized for touch devices and mobile

## Related Components

- [ForgeButton](../atoms/button.md) - For card actions
- [ForgeBadge](../atoms/badge.md) - For status indicators
- [ForgeModal](./modal.md) - For expanded card content
- [ForgeTooltip](./tooltip.md) - For additional context