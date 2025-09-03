# ForgeTooltip

Smart tooltip component with intelligent positioning, multiple triggers, and accessibility features.

## Overview

The ForgeTooltip component provides contextual information displays that appear on user interactions. It features smart positioning that automatically adjusts based on viewport constraints, multiple trigger options, and comprehensive accessibility support.

## Key Features

- **Smart Positioning**: Automatic positioning with 'auto' mode that prevents viewport overflow
- **Multiple Triggers**: Hover, click, focus, and manual control
- **Configurable Delays**: Separate show/hide delays for fine-tuned UX
- **Touch Device Support**: Optimized behavior for touch interfaces
- **HTML Content**: Support for rich content in tooltips
- **Accessibility**: Full keyboard navigation and screen reader support
- **AI-Ready**: Complete AI metadata for intelligent interactions

## Basic Usage

```html
<forge-tooltip content="This is a helpful tooltip">
  <button>Hover me</button>
</forge-tooltip>
```

## Advanced Usage

```html
<forge-tooltip
  content="Advanced tooltip with custom settings"
  position="auto"
  trigger="click"
  variant="dark"
  show-delay="300"
  hide-delay="100"
  max-width="300px"
  show-arrow="true"
  html-content="false"
>
  <span>Click for tooltip</span>
</forge-tooltip>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `content` | `string` | `''` | Text content to display in tooltip |
| `position` | `TooltipPosition` | `'top'` | Preferred position (top, right, bottom, left, auto) |
| `trigger` | `TooltipTrigger` | `'hover'` | How tooltip is triggered (hover, click, focus, manual) |
| `variant` | `TooltipVariant` | `'default'` | Visual style (default, dark, light, error, warning, success) |
| `show-delay` | `number` | `0` | Delay in ms before showing tooltip |
| `hide-delay` | `number` | `0` | Delay in ms before hiding tooltip |
| `show-arrow` | `boolean` | `true` | Whether to show the arrow pointer |
| `max-width` | `string` | `'250px'` | Maximum width of tooltip |
| `html-content` | `boolean` | `false` | Whether content contains HTML |
| `disabled` | `boolean` | `false` | Whether tooltip is disabled |

## Types

### TooltipPosition
```typescript
type TooltipPosition = 'top' | 'right' | 'bottom' | 'left' | 'auto';
```

### TooltipTrigger
```typescript
type TooltipTrigger = 'hover' | 'click' | 'focus' | 'manual';
```

### TooltipVariant
```typescript
type TooltipVariant = 'default' | 'dark' | 'light' | 'error' | 'warning' | 'success';
```

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `forge-tooltip` | `{ visible: boolean }` | Fired when tooltip visibility changes |

## Methods

| Method | Description |
|--------|-------------|
| `showTooltip()` | Programmatically show the tooltip |
| `hideTooltip()` | Programmatically hide the tooltip |

## Smart Positioning

The tooltip automatically calculates the best position when `position="auto"`:

1. Measures available space in all directions
2. Chooses position with most space (minimum 150px needed)
3. Falls back to 'top' if no suitable position found

```typescript
private calculateAutoPosition(): void {
  const availableSpace = {
    top: triggerRect.top,
    right: viewportWidth - triggerRect.right,
    bottom: viewportHeight - triggerRect.bottom,
    left: triggerRect.left
  };
  // Selects best position with adequate space
}
```

## Accessibility Features

- **ARIA Support**: Proper `aria-describedby` relationship
- **Keyboard Navigation**: ESC key to close, focus support
- **Touch Optimization**: Adjusted behavior for touch devices
- **Screen Readers**: Semantic HTML and ARIA labels

## AI Metadata

The component provides comprehensive AI metadata:

```typescript
{
  purpose: 'Contextual information display on hover/focus',
  criticality: 'low',
  semanticRole: 'tooltip',
  interactions: [
    {
      type: 'hover',
      description: 'Show tooltip on hover',
      outcome: 'Displays contextual information'
    },
    // ... additional interactions
  ]
}
```

## Performance Monitoring

- Automatic render time tracking
- Performance budget enforcement via `max-render-ms` attribute
- Graceful degradation with `performance-mode`

## Styling

### CSS Custom Properties

```css
:host {
  --tooltip-bg: rgba(0, 0, 0, 0.9);
  --tooltip-color: white;
  --tooltip-border: 1px solid rgba(255, 255, 255, 0.1);
  --tooltip-radius: 6px;
  --tooltip-max-width: 250px;
  --tooltip-arrow-size: 8px;
}
```

### Variants

- **Default**: Dark background with light text
- **Dark**: Solid dark theme
- **Light**: Light background with dark text and shadow
- **Error**: Red theme for error messages
- **Warning**: Orange theme for warnings
- **Success**: Green theme for success messages

## Examples

### Error Tooltip
```html
<forge-tooltip
  content="This field is required"
  variant="error"
  trigger="focus"
  position="right"
>
  <input type="text" required />
</forge-tooltip>
```

### Rich Content Tooltip
```html
<forge-tooltip
  content="&lt;strong&gt;Bold text&lt;/strong&gt; with &lt;em&gt;emphasis&lt;/em&gt;"
  html-content="true"
  max-width="300px"
>
  <button>Rich content</button>
</forge-tooltip>
```

### Manual Control
```html
<forge-tooltip id="manual-tooltip" trigger="manual" content="Manually controlled">
  <button onclick="document.getElementById('manual-tooltip').showTooltip()">
    Show Tooltip
  </button>
</forge-tooltip>
```

## Testing

The component includes comprehensive tests covering:

- Position calculation and viewport awareness
- All trigger types and interactions
- Accessibility features
- Performance monitoring
- AI metadata completeness

```typescript
// Example test
it('should auto-position to prevent viewport overflow', async () => {
  const tooltip = await fixture<ForgeTooltip>(html`
    <forge-tooltip position="auto" content="Test">
      <button>Trigger</button>
    </forge-tooltip>
  `);
  
  // Test position calculation logic
  expect(tooltip.actualPosition).to.not.equal('top');
});
```

## Best Practices

1. **Keep Content Concise**: Tooltips should be brief and informative
2. **Use Appropriate Triggers**: Hover for help text, click for complex content
3. **Consider Mobile**: Use click triggers for touch-friendly experiences
4. **Test Positioning**: Verify tooltips work near viewport edges
5. **Accessibility First**: Always provide meaningful content for screen readers

## Browser Support

- Modern browsers with Web Components support
- Graceful fallbacks for older browsers
- Touch device optimizations for mobile

## Related Components

- [ForgeAlert](../atoms/alert.md) - For persistent messaging
- [ForgeModal](./modal.md) - For complex information display
- [ForgeDropdown](./dropdown.md) - For actionable content