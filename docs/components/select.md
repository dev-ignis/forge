# ForgeSelect Component

A powerful dropdown select component with search, multi-select, grouping, and async loading capabilities.

## Installation

```javascript
import '@nexcraft/forge/select';
```

## Basic Usage

```html
<forge-select label="Choose an option">
  <forge-option value="1">Option 1</forge-option>
  <forge-option value="2">Option 2</forge-option>
  <forge-option value="3">Option 3</forge-option>
</forge-select>
```

## Live Examples

### Basic Select

```html
<!-- Single select -->
<forge-select 
  label="Select Country"
  placeholder="Choose a country"
  value="us"
>
  <forge-option value="us">United States</forge-option>
  <forge-option value="ca">Canada</forge-option>
  <forge-option value="mx">Mexico</forge-option>
  <forge-option value="uk">United Kingdom</forge-option>
</forge-select>

<!-- With selected value -->
<forge-select 
  label="Select Size"
  value="medium"
>
  <forge-option value="small">Small</forge-option>
  <forge-option value="medium">Medium</forge-option>
  <forge-option value="large">Large</forge-option>
</forge-select>
```

### Multi-Select

```html
<forge-select 
  label="Select Skills"
  multiple
  placeholder="Choose multiple skills"
>
  <forge-option value="javascript">JavaScript</forge-option>
  <forge-option value="typescript">TypeScript</forge-option>
  <forge-option value="react">React</forge-option>
  <forge-option value="vue">Vue</forge-option>
  <forge-option value="angular">Angular</forge-option>
</forge-select>
```

### With Search

```html
<forge-select 
  label="Search Countries"
  searchable
  placeholder="Type to search..."
>
  <forge-option value="af">Afghanistan</forge-option>
  <forge-option value="al">Albania</forge-option>
  <forge-option value="dz">Algeria</forge-option>
  <!-- Many more options... -->
</forge-select>
```

### Option Groups

```html
<forge-select label="Select Technology">
  <forge-optgroup label="Frontend">
    <forge-option value="react">React</forge-option>
    <forge-option value="vue">Vue</forge-option>
    <forge-option value="angular">Angular</forge-option>
  </forge-optgroup>
  
  <forge-optgroup label="Backend">
    <forge-option value="node">Node.js</forge-option>
    <forge-option value="python">Python</forge-option>
    <forge-option value="java">Java</forge-option>
  </forge-optgroup>
  
  <forge-optgroup label="Database">
    <forge-option value="postgres">PostgreSQL</forge-option>
    <forge-option value="mysql">MySQL</forge-option>
    <forge-option value="mongodb">MongoDB</forge-option>
  </forge-optgroup>
</forge-select>
```

### With Icons

```html
<forge-select label="Select Status">
  <forge-option value="online">
    <forge-icon slot="icon" name="circle" color="green"></forge-icon>
    Online
  </forge-option>
  <forge-option value="away">
    <forge-icon slot="icon" name="circle" color="yellow"></forge-icon>
    Away
  </forge-option>
  <forge-option value="busy">
    <forge-icon slot="icon" name="circle" color="red"></forge-icon>
    Busy
  </forge-option>
  <forge-option value="offline">
    <forge-icon slot="icon" name="circle" color="gray"></forge-icon>
    Offline
  </forge-option>
</forge-select>
```

## API Reference

### ForgeSelect Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | `string \| string[]` | `''` | Selected value(s) |
| `label` | `string` | `''` | Field label |
| `placeholder` | `string` | `'Select...'` | Placeholder text |
| `name` | `string` | `''` | Form field name |
| `multiple` | `boolean` | `false` | Enable multi-select |
| `searchable` | `boolean` | `false` | Enable search |
| `clearable` | `boolean` | `false` | Show clear button |
| `disabled` | `boolean` | `false` | Disabled state |
| `required` | `boolean` | `false` | Required field |
| `error` | `boolean` | `false` | Error state |
| `loading` | `boolean` | `false` | Loading state |
| `maxHeight` | `string` | `'300px'` | Max dropdown height |
| `maxSelections` | `number` | `Infinity` | Max selections (multi) |
| `minSelections` | `number` | `0` | Min selections (multi) |
| `closeOnSelect` | `boolean` | `true` | Close on selection |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Select size |

### ForgeOption Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | `string` | `''` | Option value |
| `disabled` | `boolean` | `false` | Disabled state |
| `selected` | `boolean` | `false` | Selected state |
| `label` | `string` | `''` | Display label |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `change` | `{ value: string \| string[] }` | Standard change event |
| `forge-change` | `{ value: string \| string[], options: Option[] }` | Custom change event |
| `forge-open` | `void` | Dropdown opened |
| `forge-close` | `void` | Dropdown closed |
| `forge-search` | `{ query: string }` | Search input changed |
| `forge-clear` | `void` | Selection cleared |
| `forge-focus` | `void` | Select focused |
| `forge-blur` | `void` | Select blurred |

### Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `open()` | `(): void` | Open dropdown |
| `close()` | `(): void` | Close dropdown |
| `focus()` | `(): void` | Focus select |
| `blur()` | `(): void` | Remove focus |
| `clear()` | `(): void` | Clear selection |
| `validate()` | `(): boolean` | Validate selection |
| `selectAll()` | `(): void` | Select all options (multi) |
| `deselectAll()` | `(): void` | Deselect all options (multi) |

### Slots

| Slot | Description |
|------|-------------|
| (default) | Options and optgroups |
| `placeholder` | Custom placeholder |
| `empty` | Empty state message |
| `loading` | Loading state content |
| `prefix` | Content before value |
| `suffix` | Content after value |

## Styling

### CSS Custom Properties

```css
/* Size tokens */
--forge-select-height-sm: 32px;
--forge-select-height-md: 40px;
--forge-select-height-lg: 48px;
--forge-select-padding: 0 12px;
--forge-select-font-size: 14px;

/* Color tokens */
--forge-select-bg: white;
--forge-select-border: var(--forge-color-border, #d1d5db);
--forge-select-focus-border: var(--forge-color-primary, #3b82f6);
--forge-select-error-border: var(--forge-color-danger, #ef4444);
--forge-select-text: var(--forge-color-text, #1f2937);
--forge-select-placeholder: var(--forge-color-text-secondary, #6b7280);

/* Dropdown tokens */
--forge-select-dropdown-bg: white;
--forge-select-dropdown-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
--forge-select-dropdown-radius: 6px;
--forge-select-dropdown-max-height: 300px;

/* Option tokens */
--forge-select-option-hover-bg: var(--forge-color-gray-100, #f3f4f6);
--forge-select-option-selected-bg: var(--forge-color-primary-light, #dbeafe);
--forge-select-option-disabled-opacity: 0.5;
--forge-select-option-padding: 8px 12px;

/* Other tokens */
--forge-select-radius: var(--forge-radius-md, 6px);
--forge-select-transition: all 0.2s ease;
```

### Custom Styling Examples

```css
/* Custom colors */
forge-select {
  --forge-select-focus-border: #10b981;
  --forge-select-option-selected-bg: #d1fae5;
}

/* Rounded select */
forge-select.rounded {
  --forge-select-radius: 9999px;
  --forge-select-padding: 0 20px;
}

/* Flat style */
forge-select.flat {
  --forge-select-border: transparent;
  --forge-select-bg: var(--forge-color-gray-100);
}

/* Custom dropdown */
forge-select.custom-dropdown {
  --forge-select-dropdown-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  --forge-select-dropdown-radius: 12px;
}
```

## Async Data Loading

```javascript
const select = document.querySelector('forge-select');

// Load options asynchronously
async function loadOptions() {
  select.loading = true;
  
  try {
    const response = await fetch('/api/options');
    const data = await response.json();
    
    // Clear existing options
    select.innerHTML = '';
    
    // Add new options
    data.forEach(item => {
      const option = document.createElement('forge-option');
      option.value = item.id;
      option.textContent = item.name;
      select.appendChild(option);
    });
  } finally {
    select.loading = false;
  }
}

// Load on init
loadOptions();

// Reload on search
select.addEventListener('forge-search', async (e) => {
  await loadOptions(e.detail.query);
});
```

## Custom Filtering

```javascript
class FilterableSelect {
  constructor(element) {
    this.element = element;
    this.options = Array.from(element.querySelectorAll('forge-option'));
    this.setupFiltering();
  }
  
  setupFiltering() {
    this.element.addEventListener('forge-search', (e) => {
      this.filterOptions(e.detail.query);
    });
  }
  
  filterOptions(query) {
    const lowerQuery = query.toLowerCase();
    
    this.options.forEach(option => {
      const text = option.textContent.toLowerCase();
      const value = option.value.toLowerCase();
      
      const matches = text.includes(lowerQuery) || 
                     value.includes(lowerQuery);
      
      option.style.display = matches ? '' : 'none';
    });
    
    // Update empty state
    const visibleOptions = this.options.filter(
      opt => opt.style.display !== 'none'
    );
    
    if (visibleOptions.length === 0) {
      this.showEmptyState();
    } else {
      this.hideEmptyState();
    }
  }
  
  showEmptyState() {
    // Add empty state message
  }
  
  hideEmptyState() {
    // Remove empty state message
  }
}
```

## Tags Display (Multi-Select)

```html
<forge-select 
  multiple
  show-tags
  max-tags-display="3"
>
  <forge-option value="tag1">Tag 1</forge-option>
  <forge-option value="tag2">Tag 2</forge-option>
  <forge-option value="tag3">Tag 3</forge-option>
  <forge-option value="tag4">Tag 4</forge-option>
  <forge-option value="tag5">Tag 5</forge-option>
</forge-select>

<style>
forge-select .tag {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  background: var(--forge-color-primary-light);
  border-radius: 4px;
  font-size: 12px;
  margin-right: 4px;
}

forge-select .tag-remove {
  margin-left: 4px;
  cursor: pointer;
}
</style>
```

## AI-Ready Features

### AI Metadata

```javascript
select.aiMetadata = {
  purpose: 'Select user role',
  dataType: 'enumeration',
  criticality: 'high',
  semanticRole: 'role-selector',
  context: 'user-management'
};
```

### AI Helper Methods

```javascript
// Get natural language description
select.getAIDescription();
// Returns: "Dropdown select for user role, 5 options available, Admin selected"

// Get available options
select.getAvailableOptions();
// Returns: [
//   { value: 'admin', label: 'Administrator', available: true },
//   { value: 'editor', label: 'Editor', available: true },
//   { value: 'viewer', label: 'Viewer', available: true }
// ]

// Get recommendation
select.getRecommendation();
// Returns: {
//   value: 'editor',
//   reason: 'Most common role for new users'
// }

// Get selection context
select.getSelectionContext();
// Returns: {
//   selected: ['admin'],
//   semanticMeaning: 'User has full system access',
//   implications: ['can-delete', 'can-modify-settings']
// }
```

## Performance Monitoring

```html
<forge-select
  dev-mode
  show-metrics
  max-render-ms="16"
  performance-mode="fast"
>
  <!-- Options -->
</forge-select>
```

## Virtualization (Large Lists)

```javascript
// For large option lists (1000+ items)
const select = document.querySelector('forge-select');
select.virtual = true;
select.itemHeight = 40; // Height of each option
select.visibleItems = 10; // Number of visible items
```

## Accessibility

### WCAG 2.1 AA Compliance

- ✅ Keyboard navigation (Arrow keys, Enter, Escape)
- ✅ Screen reader announcements
- ✅ ARIA combobox pattern
- ✅ Label association
- ✅ Focus management
- ✅ Live region updates
- ✅ High contrast support
- ✅ Required field indicators

### ARIA Attributes

```html
<!-- Rendered output -->
<forge-select
  role="combobox"
  aria-expanded="false"
  aria-haspopup="listbox"
  aria-label="Select Country"
  aria-required="true"
  aria-invalid="false"
  aria-describedby="helper-text"
>
  <div role="listbox" aria-multiselectable="false">
    <forge-option
      role="option"
      aria-selected="false"
    >
      Option 1
    </forge-option>
  </div>
</forge-select>
```

### Keyboard Support

| Key | Action |
|-----|--------|
| `↓` | Open dropdown / Next option |
| `↑` | Previous option |
| `Enter` | Select option |
| `Space` | Open dropdown |
| `Escape` | Close dropdown |
| `Home` | First option |
| `End` | Last option |
| `Tab` | Next element |
| `Shift+Tab` | Previous element |
| Type letters | Jump to option |

## Use Cases

### Country Selector

```html
<forge-select 
  label="Country"
  searchable
  clearable
  required
>
  <forge-option value="us">
    <img slot="icon" src="/flags/us.svg" width="20">
    United States
  </forge-option>
  <forge-option value="ca">
    <img slot="icon" src="/flags/ca.svg" width="20">
    Canada
  </forge-option>
  <!-- More countries... -->
</forge-select>
```

### User Role Assignment

```html
<forge-select 
  label="Assign Roles"
  multiple
  max-selections="3"
>
  <forge-option value="admin">
    Administrator
    <span slot="description">Full system access</span>
  </forge-option>
  <forge-option value="editor">
    Editor
    <span slot="description">Can edit content</span>
  </forge-option>
  <forge-option value="moderator">
    Moderator
    <span slot="description">Can moderate comments</span>
  </forge-option>
  <forge-option value="viewer">
    Viewer
    <span slot="description">Read-only access</span>
  </forge-option>
</forge-select>
```

### Time Zone Picker

```html
<forge-select 
  label="Time Zone"
  searchable
  value="America/New_York"
>
  <forge-optgroup label="Americas">
    <forge-option value="America/New_York">
      (GMT-05:00) Eastern Time
    </forge-option>
    <forge-option value="America/Chicago">
      (GMT-06:00) Central Time
    </forge-option>
    <forge-option value="America/Denver">
      (GMT-07:00) Mountain Time
    </forge-option>
    <forge-option value="America/Los_Angeles">
      (GMT-08:00) Pacific Time
    </forge-option>
  </forge-optgroup>
  
  <forge-optgroup label="Europe">
    <forge-option value="Europe/London">
      (GMT+00:00) London
    </forge-option>
    <forge-option value="Europe/Paris">
      (GMT+01:00) Paris
    </forge-option>
  </forge-optgroup>
</forge-select>
```

### Product Filters

```html
<forge-select 
  label="Filter by Brand"
  multiple
  show-tags
  clearable
>
  <forge-option value="apple">Apple</forge-option>
  <forge-option value="samsung">Samsung</forge-option>
  <forge-option value="google">Google</forge-option>
  <forge-option value="microsoft">Microsoft</forge-option>
  <forge-option value="sony">Sony</forge-option>
</forge-select>
```

## Cascading Selects

```javascript
class CascadingSelects {
  constructor(parentSelect, childSelect, dataMap) {
    this.parent = parentSelect;
    this.child = childSelect;
    this.dataMap = dataMap;
    
    this.init();
  }
  
  init() {
    this.parent.addEventListener('forge-change', (e) => {
      this.updateChild(e.detail.value);
    });
    
    // Initialize child based on current parent value
    if (this.parent.value) {
      this.updateChild(this.parent.value);
    }
  }
  
  updateChild(parentValue) {
    // Clear child options
    this.child.innerHTML = '';
    this.child.value = '';
    
    // Get child options based on parent
    const childOptions = this.dataMap[parentValue] || [];
    
    // Add new options
    childOptions.forEach(option => {
      const optElement = document.createElement('forge-option');
      optElement.value = option.value;
      optElement.textContent = option.label;
      this.child.appendChild(optElement);
    });
    
    // Enable/disable child based on options
    this.child.disabled = childOptions.length === 0;
  }
}

// Usage
const cascade = new CascadingSelects(
  document.getElementById('country'),
  document.getElementById('state'),
  {
    'us': [
      { value: 'ca', label: 'California' },
      { value: 'ny', label: 'New York' },
      { value: 'tx', label: 'Texas' }
    ],
    'ca': [
      { value: 'on', label: 'Ontario' },
      { value: 'qc', label: 'Quebec' },
      { value: 'bc', label: 'British Columbia' }
    ]
  }
);
```

## Framework Integration

### React

```jsx
import '@nexcraft/forge/select';

function UserForm() {
  const [role, setRole] = React.useState('');
  const [skills, setSkills] = React.useState([]);
  
  return (
    <div>
      <forge-select
        label="Role"
        value={role}
        onForgeChange={(e) => setRole(e.detail.value)}
        required
      >
        <forge-option value="developer">Developer</forge-option>
        <forge-option value="designer">Designer</forge-option>
        <forge-option value="manager">Manager</forge-option>
      </forge-select>
      
      <forge-select
        label="Skills"
        multiple
        value={skills}
        onForgeChange={(e) => setSkills(e.detail.value)}
      >
        <forge-option value="javascript">JavaScript</forge-option>
        <forge-option value="python">Python</forge-option>
        <forge-option value="java">Java</forge-option>
      </forge-select>
    </div>
  );
}
```

### Vue

```vue
<template>
  <div>
    <forge-select
      v-model="selectedCountry"
      label="Country"
      searchable
      @forge-change="onCountryChange"
    >
      <forge-option 
        v-for="country in countries"
        :key="country.code"
        :value="country.code"
      >
        {{ country.name }}
      </forge-option>
    </forge-select>
  </div>
</template>

<script>
import '@nexcraft/forge/select';

export default {
  data() {
    return {
      selectedCountry: '',
      countries: [
        { code: 'us', name: 'United States' },
        { code: 'ca', name: 'Canada' },
        { code: 'mx', name: 'Mexico' }
      ]
    };
  },
  methods: {
    onCountryChange(e) {
      console.log('Country changed:', e.detail.value);
    }
  }
};
</script>
```

### Angular

```typescript
import '@nexcraft/forge/select';

@Component({
  template: `
    <forge-select
      [(ngModel)]="selectedDepartment"
      label="Department"
      (forgeChange)="onDepartmentChange($event)"
    >
      <forge-option 
        *ngFor="let dept of departments"
        [value]="dept.id"
      >
        {{ dept.name }}
      </forge-option>
    </forge-select>
  `
})
export class DepartmentSelector {
  selectedDepartment = '';
  departments = [
    { id: 'eng', name: 'Engineering' },
    { id: 'sales', name: 'Sales' },
    { id: 'hr', name: 'Human Resources' }
  ];
  
  onDepartmentChange(event: CustomEvent) {
    console.log('Department:', event.detail.value);
  }
}
```

## Testing

### Unit Test Example

```typescript
import { fixture, html } from '@open-wc/testing';
import { expect } from '@esm-bundle/chai';
import '@nexcraft/forge/select';

describe('forge-select', () => {
  it('should select option', async () => {
    const el = await fixture(html`
      <forge-select>
        <forge-option value="1">Option 1</forge-option>
        <forge-option value="2">Option 2</forge-option>
      </forge-select>
    `);
    
    el.open();
    const option2 = el.querySelector('[value="2"]');
    option2.click();
    
    expect(el.value).to.equal('2');
  });
  
  it('should handle multi-select', async () => {
    const el = await fixture(html`
      <forge-select multiple>
        <forge-option value="1">Option 1</forge-option>
        <forge-option value="2">Option 2</forge-option>
      </forge-select>
    `);
    
    el.open();
    el.querySelector('[value="1"]').click();
    el.querySelector('[value="2"]').click();
    
    expect(el.value).to.deep.equal(['1', '2']);
  });
});
```

## Migration Guide

### From Material UI Select

```jsx
// Before (Material UI)
<Select value={value} onChange={handleChange}>
  <MenuItem value={10}>Ten</MenuItem>
  <MenuItem value={20}>Twenty</MenuItem>
</Select>

// After (Forge)
<forge-select value={value} onForgeChange={handleChange}>
  <forge-option value="10">Ten</forge-option>
  <forge-option value="20">Twenty</forge-option>
</forge-select>
```

### From Ant Design Select

```jsx
// Before (Ant Design)
<Select
  value={value}
  onChange={onChange}
  showSearch
  allowClear
>
  <Option value="1">Option 1</Option>
  <Option value="2">Option 2</Option>
</Select>

// After (Forge)
<forge-select
  value={value}
  onForgeChange={onChange}
  searchable
  clearable
>
  <forge-option value="1">Option 1</forge-option>
  <forge-option value="2">Option 2</forge-option>
</forge-select>
```

## Browser Support

- Chrome 67+ ✅
- Firefox 63+ ✅
- Safari 10.1+ ✅
- Edge 79+ ✅

## Related Components

- [ForgeRadioGroup](./radio-group.md) - Single selection from options
- [ForgeCheckbox](./checkbox.md) - Multiple selections
- [ForgeAutocomplete](./autocomplete.md) - Type-ahead selection

## Changelog

### Version 1.0.0
- Initial release
- Single and multi-select
- Search functionality
- Option groups
- Async loading
- Virtual scrolling ready
- Full accessibility
- AI-ready architecture
- Performance monitoring

## API Playground

Try the component live in our [Storybook](https://forge-ui.dev/storybook/?path=/story/atoms-select)