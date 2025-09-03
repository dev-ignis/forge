# ForgeMultiSelect Component

Advanced multi-selection dropdown component with search, filtering, bulk actions, and group support.

## Overview

The `forge-multi-select` component provides a feature-rich dropdown for selecting multiple options from a list. It includes search functionality, bulk selection actions, group organization, and tag-based display of selected items.

## Features

- 🔍 **Advanced Search** - Real-time filtering with text highlighting
- ✅ **Bulk Actions** - Select All, None, and Invert operations
- 🏷️ **Tag Display** - Selected items shown as removable tags
- 👥 **Group Support** - Organize options into logical groups
- 🎯 **Max Selections** - Limit the number of selections
- ♿ **Accessible** - WCAG 2.1 AA compliant with keyboard navigation
- 🤖 **AI-Ready** - Full AI metadata and state tracking
- ⚡ **Performance** - Optimized rendering with performance monitoring

## Installation

```bash
npm install @nexcraft/forge
```

## Usage

### Basic Example

```html
<forge-multi-select
  placeholder="Select options..."
  .options=${[
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' }
  ]}
></forge-multi-select>
```

### With Search and Bulk Actions

```html
<forge-multi-select
  show-search
  show-actions
  search-placeholder="Type to filter..."
  .options=${options}
  @forge-change=${handleChange}
></forge-multi-select>
```

### Grouped Options

```html
<forge-multi-select
  group-by
  .options=${[
    { value: 'apple', label: 'Apple', group: 'Fruits' },
    { value: 'carrot', label: 'Carrot', group: 'Vegetables' },
    { value: 'banana', label: 'Banana', group: 'Fruits' }
  ]}
></forge-multi-select>
```

### With Max Selections

```html
<forge-multi-select
  max-selections="3"
  .options=${options}
  .value=${['option1', 'option2']}
></forge-multi-select>
```

## API Reference

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `options` | `MultiSelectOption[]` | `[]` | Array of options to display |
| `value` | `string[]` | `[]` | Currently selected option values |
| `placeholder` | `string` | `'Select options...'` | Placeholder text when no selections |
| `searchPlaceholder` | `string` | `'Search...'` | Search input placeholder |
| `disabled` | `boolean` | `false` | Disables the component |
| `showSearch` | `boolean` | `true` | Shows search input in dropdown |
| `showActions` | `boolean` | `true` | Shows bulk action buttons |
| `maxSelections` | `number` | `Infinity` | Maximum number of selections allowed |
| `groupBy` | `boolean` | `false` | Groups options by their group property |
| `noResultsText` | `string` | `'No results found'` | Text shown when search yields no results |

### Option Interface

```typescript
interface MultiSelectOption {
  value: string;      // Unique identifier
  label: string;      // Display text
  group?: string;     // Optional group name
  disabled?: boolean; // Option disabled state
}
```

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `forge-change` | `{ value: string[] }` | Fired when selection changes |
| `ai-state-change` | `{ key, value, fullState }` | AI state tracking event |

### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `getPossibleActions()` | `AIAction[]` | Returns available AI actions |
| `explainState()` | `AIStateExplanation` | Returns human-readable state |
| `aiState` | `AIComponentState` | Getter for complete AI state |

## Styling

### CSS Custom Properties

```css
forge-multi-select {
  /* Colors */
  --forge-border-color: #d1d5db;
  --forge-border-hover-color: #9ca3af;
  --forge-primary-color: #3b82f6;
  --forge-primary-alpha: rgba(59, 130, 246, 0.1);
  --forge-bg-color: #ffffff;
  --forge-dropdown-bg: #ffffff;
  --forge-text-muted: #6b7280;
  --forge-tag-bg: #e5e7eb;
  --forge-tag-remove-hover: rgba(0, 0, 0, 0.1);
  --forge-hover-bg: #f3f4f6;
  --forge-highlight: #fef3c7;
}
```

### Custom Styling Example

```css
forge-multi-select {
  --forge-primary-color: #10b981;
  --forge-tag-bg: #d1fae5;
  width: 100%;
  max-width: 500px;
}

forge-multi-select::part(trigger) {
  border-radius: 12px;
}

forge-multi-select::part(dropdown) {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}
```

## Keyboard Navigation

| Key | Action |
|-----|--------|
| `Tab` | Focus component |
| `Enter` | Open dropdown when focused |
| `Escape` | Close dropdown |
| `ArrowDown` | Open dropdown or navigate options |
| `ArrowUp` | Open dropdown or navigate options |
| `Space` | Toggle option selection |

## AI Integration

### AI Metadata

```javascript
const multiSelect = document.querySelector('forge-multi-select');

// Get AI state
const aiState = multiSelect.aiState;
console.log(aiState.metadata); // { purpose: 'Select multiple options...', dataType: 'multiselection', ... }

// Get possible actions
const actions = multiSelect.getPossibleActions();
// Returns: toggle, selectOption, selectAll, clearSelection, search

// Get state explanation
const explanation = multiSelect.explainState();
// Returns: { currentState: 'selecting', stateDescription: '2 of 10 options selected', ... }
```

### AI-Ready Features

- **State Tracking**: Real-time tracking of selections and UI state
- **Action Predictions**: Contextual actions based on current state
- **Semantic Metadata**: Rich metadata for AI understanding
- **Performance Metrics**: Integrated performance monitoring

## Framework Integration

### React

```jsx
import { useEffect, useRef } from 'react';
import '@nexcraft/forge/multi-select';

function MultiSelectExample() {
  const ref = useRef(null);
  const [selected, setSelected] = useState([]);
  
  const options = [
    { value: 'opt1', label: 'Option 1' },
    { value: 'opt2', label: 'Option 2' }
  ];
  
  useEffect(() => {
    const handleChange = (e) => {
      setSelected(e.detail.value);
    };
    
    ref.current?.addEventListener('forge-change', handleChange);
    return () => ref.current?.removeEventListener('forge-change', handleChange);
  }, []);
  
  return (
    <forge-multi-select
      ref={ref}
      options={options}
      value={selected}
    />
  );
}
```

### Vue

```vue
<template>
  <forge-multi-select
    :options="options"
    :value="selected"
    @forge-change="handleChange"
  />
</template>

<script setup>
import { ref } from 'vue';
import '@nexcraft/forge/multi-select';

const selected = ref([]);
const options = [
  { value: 'opt1', label: 'Option 1' },
  { value: 'opt2', label: 'Option 2' }
];

const handleChange = (event) => {
  selected.value = event.detail.value;
};
</script>
```

### Angular

```typescript
import { Component, ViewChild, ElementRef } from '@angular/core';
import '@nexcraft/forge/multi-select';

@Component({
  selector: 'app-multi-select',
  template: `
    <forge-multi-select
      #multiSelect
      [options]="options"
      [value]="selected"
      (forge-change)="handleChange($event)"
    ></forge-multi-select>
  `
})
export class MultiSelectComponent {
  @ViewChild('multiSelect') multiSelect!: ElementRef;
  
  selected: string[] = [];
  options = [
    { value: 'opt1', label: 'Option 1' },
    { value: 'opt2', label: 'Option 2' }
  ];
  
  handleChange(event: CustomEvent) {
    this.selected = event.detail.value;
  }
}
```

## Examples

### Advanced Search with Groups

```javascript
const multiSelect = document.querySelector('forge-multi-select');

multiSelect.options = [
  { value: 'js', label: 'JavaScript', group: 'Languages' },
  { value: 'ts', label: 'TypeScript', group: 'Languages' },
  { value: 'react', label: 'React', group: 'Frameworks' },
  { value: 'vue', label: 'Vue', group: 'Frameworks' },
  { value: 'angular', label: 'Angular', group: 'Frameworks' }
];

multiSelect.groupBy = true;
multiSelect.showSearch = true;
multiSelect.searchPlaceholder = 'Search technologies...';

multiSelect.addEventListener('forge-change', (e) => {
  console.log('Selected:', e.detail.value);
});
```

### Limited Selections with Disabled Options

```javascript
const multiSelect = document.querySelector('forge-multi-select');

multiSelect.options = [
  { value: 'free1', label: 'Free Feature 1' },
  { value: 'free2', label: 'Free Feature 2' },
  { value: 'premium1', label: 'Premium Feature 1', disabled: true },
  { value: 'premium2', label: 'Premium Feature 2', disabled: true }
];

multiSelect.maxSelections = 2;
multiSelect.placeholder = 'Select up to 2 features...';
```

### Dynamic Options Loading

```javascript
async function loadOptions(searchQuery) {
  const response = await fetch(`/api/options?q=${searchQuery}`);
  const data = await response.json();
  
  const multiSelect = document.querySelector('forge-multi-select');
  multiSelect.options = data.map(item => ({
    value: item.id,
    label: item.name,
    group: item.category
  }));
}

// Listen for search input
const multiSelect = document.querySelector('forge-multi-select');
let debounceTimer;

multiSelect.addEventListener('input', (e) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    loadOptions(e.target.value);
  }, 300);
});
```

## Accessibility

The Multi-Select component follows WCAG 2.1 AA guidelines:

- **Role Management**: Proper ARIA roles (`combobox`, `listbox`, `option`)
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: Descriptive announcements for all actions
- **Focus Management**: Clear focus indicators and trap
- **States**: `aria-expanded`, `aria-selected`, `aria-disabled`
- **Labels**: Accessible labels for all interactive elements

## Performance

### Metrics
- **Render Time**: <2ms initial render
- **Search Performance**: Instant filtering up to 1000 items
- **Memory**: Efficient memory usage with cleanup
- **Bundle Size**: ~12KB (minified + gzipped)

### Optimization Tips

1. **Virtual Scrolling**: For lists >100 items, consider pagination
2. **Debounce Search**: Add debouncing for API-based search
3. **Lazy Loading**: Load options on demand for large datasets
4. **Group Caching**: Cache grouped options to avoid re-computation

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Related Components

- [ForgeSelect](./select.md) - Single selection dropdown
- [ForgeCheckbox](./checkbox.md) - Individual checkbox component
- [ForgeFormField](./form-field.md) - Form field wrapper with validation

## Migration Guide

### From Native Select Multiple

```html
<!-- Before -->
<select multiple>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</select>

<!-- After -->
<forge-multi-select
  .options=${[
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' }
  ]}
></forge-multi-select>
```

### From Material UI Multi-Select

```jsx
// Before (Material UI)
<Select multiple value={selected} onChange={handleChange}>
  <MenuItem value={1}>Option 1</MenuItem>
  <MenuItem value={2}>Option 2</MenuItem>
</Select>

// After (Forge)
<forge-multi-select
  options={options}
  value={selected}
  onForgeChange={handleChange}
/>
```

## Changelog

### v1.2.1
- Initial release with search, groups, and bulk actions
- Full AI metadata integration
- Performance monitoring
- 23 comprehensive tests