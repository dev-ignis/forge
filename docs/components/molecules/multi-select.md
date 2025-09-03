# ForgeMultiSelect

Advanced multi-selection dropdown with search, bulk operations, and grouped options.

## Overview

The ForgeMultiSelect component provides a powerful interface for selecting multiple options from a list. It features search/filter capabilities, bulk selection operations, grouped options, and tag-based display of selections.

## Key Features

- **Multi-Selection**: Select multiple options with checkbox interface
- **Advanced Search**: Real-time filtering with result highlighting
- **Bulk Operations**: Select all, none, or invert selections
- **Grouped Options**: Organize options into logical groups
- **Tag Display**: Visual representation of selected items
- **Keyboard Navigation**: Full arrow key and keyboard support
- **Accessibility**: Complete ARIA compliance and screen reader support
- **AI-Ready**: Comprehensive AI metadata for intelligent interactions

## Basic Usage

```html
<forge-multi-select
  placeholder="Select options..."
  .options="${[
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' }
  ]}"
  .value="${selectedValues}"
  @forge-change="${handleChange}"
>
</forge-multi-select>
```

## Advanced Usage

```html
<forge-multi-select
  placeholder="Select team members..."
  search-placeholder="Search members..."
  .showSearch="${true}"
  .showActions="${true}"
  .maxSelections="${5}"
  .groupBy="${true}"
  no-results-text="No members found"
  .options="${teamMembers}"
  .value="${selectedMembers}"
  @forge-change="${handleMemberChange}"
>
</forge-multi-select>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `options` | `MultiSelectOption[]` | `[]` | Array of selectable options |
| `value` | `string[]` | `[]` | Array of selected option values |
| `placeholder` | `string` | `'Select options...'` | Placeholder text when no selection |
| `search-placeholder` | `string` | `'Search...'` | Placeholder for search input |
| `disabled` | `boolean` | `false` | Whether component is disabled |
| `show-search` | `boolean` | `true` | Show search/filter input |
| `show-actions` | `boolean` | `true` | Show bulk action buttons |
| `max-selections` | `number` | `Infinity` | Maximum number of selections allowed |
| `group-by` | `boolean` | `false` | Enable option grouping |
| `no-results-text` | `string` | `'No results found'` | Text shown when no options match search |

## Types

### MultiSelectOption
```typescript
interface MultiSelectOption {
  value: string;
  label: string;
  group?: string;
  disabled?: boolean;
}
```

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `forge-change` | `{ value: string[] }` | Fired when selection changes |

## Option Configuration

### Basic Options
Simple value-label pairs:

```typescript
const basicOptions: MultiSelectOption[] = [
  { value: 'opt1', label: 'Option 1' },
  { value: 'opt2', label: 'Option 2' },
  { value: 'opt3', label: 'Option 3' }
];
```

### Grouped Options
Options organized by groups:

```typescript
const groupedOptions: MultiSelectOption[] = [
  { value: 'dev1', label: 'John Doe', group: 'Developers' },
  { value: 'dev2', label: 'Jane Smith', group: 'Developers' },
  { value: 'des1', label: 'Bob Wilson', group: 'Designers' },
  { value: 'des2', label: 'Alice Brown', group: 'Designers' }
];
```

### Disabled Options
Options that cannot be selected:

```typescript
const optionsWithDisabled: MultiSelectOption[] = [
  { value: 'available', label: 'Available Option' },
  { value: 'disabled', label: 'Disabled Option', disabled: true },
  { value: 'another', label: 'Another Available Option' }
];
```

## Search and Filtering

The search feature provides real-time filtering with highlighting:

```typescript
// Search is performed on option labels
private filterOptions(): void {
  if (!this.searchQuery) {
    this.filteredOptions = this.options;
    return;
  }

  const query = this.searchQuery.toLowerCase();
  this.filteredOptions = this.options.filter(option =>
    option.label.toLowerCase().includes(query)
  );
}
```

### Search Highlighting
Matching text is highlighted in search results:

```typescript
private highlightMatch(text: string): any {
  if (!this.searchQuery) return text;
  
  const regex = new RegExp(`(${this.searchQuery})`, 'gi');
  const parts = text.split(regex);
  
  return html`${parts.map((part, i) => 
    regex.test(part) ? html`<mark>${part}</mark>` : part
  )}`;
}
```

## Bulk Actions

Three bulk operation buttons for efficient selection management:

### Select All
Selects all visible (filtered) options:

```typescript
private selectAll(): void {
  const enabledOptions = this.filteredOptions.filter(o => !o.disabled);
  const newValues = enabledOptions.slice(0, this.maxSelections).map(o => o.value);
  this.value = newValues;
}
```

### Select None
Clears all selections:

```typescript
private selectNone(): void {
  this.value = [];
}
```

### Invert Selection
Inverts current selection state:

```typescript
private invertSelection(): void {
  const enabledOptions = this.filteredOptions.filter(o => !o.disabled);
  const newValue = enabledOptions
    .filter(o => !this.value.includes(o.value))
    .slice(0, this.maxSelections)
    .map(o => o.value);
  this.value = newValue;
}
```

## Tag Display

Selected items are displayed as removable tags:

### Standard Display
Shows all selected items as tags:

```html
<div class="multi-select__tags">
  <span class="multi-select__tag">
    Option 1
    <button class="multi-select__tag-remove" aria-label="Remove Option 1">×</button>
  </span>
  <!-- More tags... -->
</div>
```

### Compact Display
For many selections, shows truncated list with count:

```html
<div class="multi-select__tags">
  <span class="multi-select__tag">Option 1</span>
  <span class="multi-select__tag">Option 2</span>
  <span class="multi-select__count">+3 more</span>
</div>
```

## Keyboard Navigation

Comprehensive keyboard support:

- **Enter/Space**: Open dropdown or toggle focused option
- **Escape**: Close dropdown
- **Arrow Up/Down**: Navigate through options
- **Home/End**: Jump to first/last option
- **Tab**: Navigate between elements

```typescript
private handleKeydown = (e: KeyboardEvent): void => {
  switch (e.key) {
    case 'Escape':
      this.closeDropdown();
      break;
    case 'Enter':
      if (!this.isOpen) {
        this.toggleDropdown();
      }
      break;
    case 'ArrowDown':
    case 'ArrowUp':
      if (!this.isOpen) {
        this.toggleDropdown();
      }
      break;
  }
};
```

## Accessibility Features

- **ARIA Compliance**: `role="combobox"` and `aria-expanded` attributes
- **Screen Reader Support**: Announcements for selection changes
- **Keyboard Only**: Complete keyboard navigation
- **Focus Management**: Proper focus indication and management
- **Labeling**: Meaningful labels and descriptions

## AI Metadata

Comprehensive AI metadata for intelligent interactions:

```typescript
{
  purpose: 'Select multiple options from a list',
  dataType: 'multiselection',
  criticality: 'medium',
  semanticRole: 'multi-select',
  interactions: [
    {
      type: 'click',
      description: 'Toggle dropdown',
      outcome: 'Opens or closes the options list'
    },
    {
      type: 'input',
      description: 'Search options',
      outcome: 'Filters the available options'
    },
    {
      type: 'select',
      description: 'Toggle option selection',
      outcome: 'Adds or removes option from selection'
    }
  ],
  validation: [
    {
      type: 'maxLength',
      value: this.maxSelections,
      message: `Maximum ${this.maxSelections} selections allowed`
    }
  ]
}
```

## Performance Features

- Automatic render time tracking
- Efficient list virtualization for large option sets
- Optimized search filtering
- Debounced search input

## Styling

### CSS Custom Properties

```css
:host {
  --forge-border-color: #d1d5db;
  --forge-border-hover-color: #9ca3af;
  --forge-primary-color: #3b82f6;
  --forge-primary-alpha: rgba(59, 130, 246, 0.1);
  --forge-bg-color: #ffffff;
  --forge-text-muted: #6b7280;
  --forge-tag-bg: #e5e7eb;
  --forge-hover-bg: #f3f4f6;
  --forge-highlight: #fef3c7;
}
```

### Component Structure

```css
.multi-select {
  position: relative;
}

.multi-select__trigger {
  /* Trigger button styles */
}

.multi-select__dropdown {
  /* Dropdown container styles */
}

.multi-select__tags {
  /* Tag container styles */
}
```

## Examples

### Team Member Selection
```html
<forge-multi-select
  placeholder="Select team members..."
  .maxSelections="${10}"
  .options="${[
    { value: 'john', label: 'John Doe', group: 'Engineering' },
    { value: 'jane', label: 'Jane Smith', group: 'Engineering' },
    { value: 'bob', label: 'Bob Wilson', group: 'Design' },
    { value: 'alice', label: 'Alice Brown', group: 'Design' }
  ]}"
  .groupBy="${true}"
  @forge-change="${handleTeamSelection}"
>
</forge-multi-select>
```

### Skills Selection
```html
<forge-multi-select
  placeholder="Select your skills..."
  search-placeholder="Search skills..."
  .options="${skillOptions}"
  .value="${userSkills}"
  .maxSelections="${15}"
  @forge-change="${updateUserSkills}"
>
</forge-multi-select>
```

### Category Filter
```html
<forge-multi-select
  placeholder="Filter by categories..."
  .showActions="${true}"
  .options="${categoryOptions}"
  .value="${activeFilters}"
  @forge-change="${applyFilters}"
>
</forge-multi-select>
```

## Integration with Forms

### Form Field Integration
```html
<forge-form-field label="Select Categories" required>
  <forge-multi-select
    name="categories"
    .options="${categories}"
    .value="${formData.categories}"
    @forge-change="${updateFormData}"
  >
  </forge-multi-select>
</forge-form-field>
```

### Validation
```typescript
// Custom validation
private validateSelection(): boolean {
  if (this.required && this.value.length === 0) {
    this.validationState = 'error';
    this.errorMessage = 'At least one option must be selected';
    return false;
  }
  
  if (this.value.length > this.maxSelections) {
    this.validationState = 'error';
    this.errorMessage = `Maximum ${this.maxSelections} selections allowed`;
    return false;
  }
  
  return true;
}
```

## Testing

Comprehensive test coverage includes:

- Multi-selection functionality
- Search and filtering
- Bulk operations
- Keyboard navigation
- Accessibility compliance
- Performance monitoring

```typescript
// Example test
it('should filter options based on search query', async () => {
  const multiSelect = await fixture<ForgeMultiSelect>(html`
    <forge-multi-select .options="${testOptions}"></forge-multi-select>
  `);
  
  multiSelect.toggleDropdown();
  
  const searchInput = multiSelect.shadowRoot?.querySelector('forge-input');
  searchInput?.dispatchEvent(new CustomEvent('forge-input', {
    detail: { value: 'test' }
  }));
  
  expect(multiSelect.filteredOptions.length).to.be.lessThan(testOptions.length);
});
```

## Best Practices

1. **Option Limits**: Set reasonable `maxSelections` for UX
2. **Grouping**: Use groups for large option sets
3. **Search**: Enable search for more than 10 options
4. **Validation**: Provide clear validation feedback
5. **Performance**: Consider virtualization for 100+ options

## Browser Support

- Modern browsers with Web Components support
- Graceful keyboard fallbacks
- Touch-optimized for mobile devices

## Related Components

- [ForgeSelect](../atoms/select.md) - For single selection
- [ForgeDropdown](./dropdown.md) - For action menus
- [ForgeFormField](./form-field.md) - For form integration
- [ForgeCheckbox](../atoms/checkbox.md) - For individual selections