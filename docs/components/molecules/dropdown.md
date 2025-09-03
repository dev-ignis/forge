# ForgeDropdown

Advanced dropdown menu component with nested menus, keyboard navigation, and flexible item types.

## Overview

The ForgeDropdown component provides a rich dropdown menu experience with support for nested menus, grouped items, checkboxes, radio buttons, and comprehensive keyboard navigation. It includes smart positioning and accessibility features.

## Key Features

- **Nested Menus**: Support for multi-level dropdown hierarchies
- **Multiple Item Types**: Default, checkbox, radio, and divider items
- **Keyboard Navigation**: Full arrow key, Enter, and Escape support
- **Smart Positioning**: Auto-positioning to prevent viewport overflow
- **Flexible Triggers**: Customizable trigger content and styling
- **Group Support**: Organized menu items with group headers
- **Accessibility**: Complete ARIA support and screen reader compatibility
- **AI-Ready**: Comprehensive AI metadata for intelligent interactions

## Basic Usage

```html
<forge-dropdown
  label="Options"
  .items="${[
    { id: '1', label: 'Option 1', value: 'opt1' },
    { id: '2', label: 'Option 2', value: 'opt2' },
    { id: '3', label: 'Option 3', value: 'opt3', disabled: true }
  ]}"
>
</forge-dropdown>
```

## Advanced Usage

```html
<forge-dropdown
  label="Advanced Menu"
  variant="primary"
  size="large"
  position="auto"
  .closeOnSelect="${false}"
  .multiSelect="${true}"
  .items="${complexMenuItems}"
  @forge-select="${handleSelection}"
>
</forge-dropdown>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `items` | `DropdownItem[]` | `[]` | Array of menu items to display |
| `label` | `string` | `'Options'` | Text displayed on the trigger button |
| `position` | `DropdownPosition` | `'bottom-start'` | Preferred menu position |
| `variant` | `DropdownVariant` | `'default'` | Visual style of trigger |
| `size` | `DropdownSize` | `'medium'` | Size of the trigger button |
| `disabled` | `boolean` | `false` | Whether dropdown is disabled |
| `close-on-select` | `boolean` | `true` | Whether to close menu after selection |
| `multi-select` | `boolean` | `false` | Allow multiple item selection |
| `icon` | `string` | `'▼'` | Icon shown on trigger button |
| `placeholder` | `string` | `''` | Placeholder text when no selection |

## Types

### DropdownItem
```typescript
interface DropdownItem {
  id: string;
  label: string;
  value?: any;
  icon?: string;
  badge?: string | number;
  disabled?: boolean;
  divider?: boolean;
  group?: string;
  checked?: boolean;
  type?: 'default' | 'checkbox' | 'radio';
  items?: DropdownItem[]; // For nested menus
}
```

### DropdownPosition
```typescript
type DropdownPosition = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' | 'left' | 'right' | 'auto';
```

### DropdownVariant
```typescript
type DropdownVariant = 'default' | 'primary' | 'secondary' | 'minimal';
```

### DropdownSize
```typescript
type DropdownSize = 'small' | 'medium' | 'large';
```

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `forge-dropdown` | `{ open: boolean }` | Fired when dropdown opens/closes |
| `forge-select` | `{ item: DropdownItem, index: number, selected: string[] }` | Fired when item is selected |

## Methods

| Method | Description |
|--------|-------------|
| `open()` | Programmatically open the dropdown |
| `close()` | Programmatically close the dropdown |
| `toggle()` | Toggle dropdown open/closed state |

## Item Types

### Default Items
Standard clickable menu items:

```typescript
{
  id: 'item1',
  label: 'Standard Item',
  value: 'value1',
  icon: '📄'
}
```

### Checkbox Items
Allow multiple selections:

```typescript
{
  id: 'check1',
  label: 'Checkbox Item',
  type: 'checkbox',
  checked: true
}
```

### Radio Items
Single selection within a group:

```typescript
{
  id: 'radio1',
  label: 'Radio Option',
  type: 'radio',
  checked: false
}
```

### Divider Items
Visual separators:

```typescript
{
  id: 'div1',
  divider: true
}
```

### Grouped Items
Items with group headers:

```typescript
{
  id: 'grouped1',
  label: 'Group Item',
  group: 'Group Name'
}
```

## Nested Menus

Support for multi-level menu hierarchies:

```typescript
{
  id: 'parent',
  label: 'Parent Menu',
  items: [
    {
      id: 'child1',
      label: 'Child Item 1',
      value: 'child1'
    },
    {
      id: 'child2',
      label: 'Child Item 2',
      items: [
        {
          id: 'grandchild',
          label: 'Grandchild Item'
        }
      ]
    }
  ]
}
```

## Keyboard Navigation

- **Arrow Keys**: Navigate through menu items
- **Enter/Space**: Select focused item or open dropdown
- **Escape**: Close dropdown menu
- **Home/End**: Jump to first/last menu item
- **Tab**: Navigate between focusable elements

## Smart Positioning

Auto-positioning prevents viewport overflow:

```typescript
private calculateAutoPosition(): void {
  const spaceBelow = viewportHeight - triggerRect.bottom;
  const spaceAbove = triggerRect.top;
  const spaceRight = viewportWidth - triggerRect.left;
  const spaceLeft = triggerRect.right;

  // Choose best position based on available space
  if (spaceBelow >= menuHeight) {
    position = spaceRight >= menuWidth ? 'bottom-start' : 'bottom-end';
  } else if (spaceAbove >= menuHeight) {
    position = spaceRight >= menuWidth ? 'top-start' : 'top-end';
  }
  // ... additional positioning logic
}
```

## Accessibility Features

- **ARIA Compliance**: Full `role="combobox"` and `role="menu"` support
- **Screen Readers**: Proper announcements for state changes
- **Keyboard Only**: Complete keyboard navigation support
- **Focus Management**: Appropriate focus trapping and restoration

## AI Metadata

Comprehensive AI metadata for intelligent interactions:

```typescript
{
  purpose: 'Interactive dropdown menu with selectable options',
  criticality: 'medium',
  semanticRole: 'menu',
  interactions: [
    {
      type: 'click',
      description: 'Toggle dropdown menu',
      outcome: 'Opens/closes dropdown'
    },
    {
      type: 'keyboard',
      description: 'Navigate menu with keyboard',
      shortcuts: ['ArrowUp', 'ArrowDown', 'Enter', 'Escape', 'Space']
    }
  ]
}
```

## Performance Monitoring

- Built-in render time tracking
- Performance budget enforcement
- Automatic degradation strategies for complex menus

## Styling

### CSS Custom Properties

```css
:host {
  --forge-dropdown-trigger-bg: white;
  --forge-dropdown-trigger-hover-bg: #f9fafb;
  --forge-dropdown-menu-bg: white;
  --forge-dropdown-item-hover-bg: #f3f4f6;
  --forge-dropdown-item-selected-bg: #eff6ff;
  --forge-border-color: #e5e7eb;
  --forge-primary-color: #3b82f6;
}
```

### Trigger Variants

- **Default**: Standard bordered button appearance
- **Primary**: Filled with primary color
- **Secondary**: Outlined with primary color
- **Minimal**: Borderless, transparent background

## Examples

### Multi-Select Dropdown
```html
<forge-dropdown
  label="Select Multiple"
  .multiSelect="${true}"
  .closeOnSelect="${false}"
  .items="${[
    { id: '1', label: 'Option 1', type: 'checkbox' },
    { id: '2', label: 'Option 2', type: 'checkbox' },
    { id: '3', label: 'Option 3', type: 'checkbox' }
  ]}"
>
</forge-dropdown>
```

### Grouped Menu
```html
<forge-dropdown
  label="Grouped Options"
  .items="${[
    { id: '1', label: 'File Action', group: 'File', icon: '📄' },
    { id: '2', label: 'Edit Action', group: 'Edit', icon: '✏️' },
    { id: '3', label: 'View Action', group: 'View', icon: '👁️' }
  ]}"
>
</forge-dropdown>
```

### Nested Menu
```html
<forge-dropdown
  label="Nested Menu"
  .items="${[
    { id: '1', label: 'Simple Item' },
    {
      id: '2',
      label: 'Submenu',
      items: [
        { id: '2a', label: 'Sub Item 1' },
        { id: '2b', label: 'Sub Item 2' }
      ]
    }
  ]}"
>
</forge-dropdown>
```

## Testing

Comprehensive test coverage includes:

- Menu positioning and viewport awareness
- Keyboard navigation patterns
- Multi-select functionality
- Nested menu interactions
- Accessibility compliance
- Performance monitoring

```typescript
// Example test
it('should support keyboard navigation', async () => {
  const dropdown = await fixture<ForgeDropdown>(html`
    <forge-dropdown .items="${testItems}"></forge-dropdown>
  `);
  
  dropdown.open();
  
  // Test arrow key navigation
  await sendKeys({ press: 'ArrowDown' });
  expect(dropdown.focusedIndex).to.equal(0);
});
```

## Best Practices

1. **Item Organization**: Use groups for large menus
2. **Keyboard Support**: Always test keyboard navigation
3. **Mobile Considerations**: Ensure touch-friendly interactions
4. **Performance**: Limit deeply nested menus for better performance
5. **Accessibility**: Provide meaningful labels and ARIA attributes

## Browser Support

- Modern browsers with Web Components support
- Graceful keyboard fallbacks
- Touch-optimized interactions for mobile devices

## Related Components

- [ForgeSelect](../atoms/select.md) - For simpler selection scenarios
- [ForgeMultiSelect](./multi-select.md) - For advanced multi-selection
- [ForgeTooltip](./tooltip.md) - For contextual help
- [ForgeModal](./modal.md) - For complex content displays