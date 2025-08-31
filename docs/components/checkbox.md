# ForgeCheckbox Component

A flexible checkbox component with support for indeterminate state, custom labels, and comprehensive accessibility features.

## Installation

```javascript
import '@nexcraft/forge/checkbox';
```

## Basic Usage

```html
<forge-checkbox>Accept terms and conditions</forge-checkbox>
```

## Live Examples

### Basic States

```html
<!-- Unchecked (default) -->
<forge-checkbox>Default checkbox</forge-checkbox>

<!-- Checked -->
<forge-checkbox checked>Checked checkbox</forge-checkbox>

<!-- Indeterminate -->
<forge-checkbox indeterminate>Indeterminate checkbox</forge-checkbox>

<!-- Disabled -->
<forge-checkbox disabled>Disabled checkbox</forge-checkbox>

<!-- Disabled and checked -->
<forge-checkbox disabled checked>Disabled checked</forge-checkbox>
```

### Label Positions

```html
<!-- Right (default) -->
<forge-checkbox label-position="right">Label on right</forge-checkbox>

<!-- Left -->
<forge-checkbox label-position="left">Label on left</forge-checkbox>

<!-- Top -->
<forge-checkbox label-position="top">Label on top</forge-checkbox>

<!-- Bottom -->
<forge-checkbox label-position="bottom">Label on bottom</forge-checkbox>
```

### Sizes

```html
<!-- Small -->
<forge-checkbox size="sm">Small checkbox</forge-checkbox>

<!-- Medium (default) -->
<forge-checkbox size="md">Medium checkbox</forge-checkbox>

<!-- Large -->
<forge-checkbox size="lg">Large checkbox</forge-checkbox>
```

### With Helper Text

```html
<forge-checkbox helper-text="This will enable email notifications">
  Subscribe to newsletter
</forge-checkbox>

<!-- With error -->
<forge-checkbox 
  error
  error-text="You must accept the terms"
  required
>
  I agree to the terms of service
</forge-checkbox>
```

## API Reference

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `checked` | `boolean` | `false` | Checked state |
| `indeterminate` | `boolean` | `false` | Indeterminate state |
| `disabled` | `boolean` | `false` | Disabled state |
| `required` | `boolean` | `false` | Required field |
| `error` | `boolean` | `false` | Error state |
| `value` | `string` | `'on'` | Form value when checked |
| `name` | `string` | `''` | Form field name |
| `labelPosition` | `'left' \| 'right' \| 'top' \| 'bottom'` | `'right'` | Label position |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Checkbox size |
| `helperText` | `string` | `''` | Helper text |
| `errorText` | `string` | `''` | Error message |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `change` | `{ checked: boolean }` | Standard change event |
| `forge-change` | `{ checked: boolean, indeterminate: boolean }` | Custom change event |
| `forge-focus` | `void` | Fired on focus |
| `forge-blur` | `void` | Fired on blur |

### Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `toggle()` | `(): void` | Toggle checked state |
| `focus()` | `(): void` | Focus the checkbox |
| `blur()` | `(): void` | Remove focus |
| `validate()` | `(): boolean` | Validate required state |

### Slots

| Slot | Description |
|------|-------------|
| (default) | Checkbox label content |
| `helper` | Helper text content |

## Styling

### CSS Custom Properties

```css
/* Size tokens */
--forge-checkbox-size-sm: 16px;
--forge-checkbox-size-md: 20px;
--forge-checkbox-size-lg: 24px;
--forge-checkbox-size: var(--forge-checkbox-size-md);

/* Color tokens */
--forge-checkbox-bg: white;
--forge-checkbox-border: var(--forge-color-border, #d1d5db);
--forge-checkbox-checked-bg: var(--forge-color-primary, #3b82f6);
--forge-checkbox-checked-border: var(--forge-color-primary, #3b82f6);
--forge-checkbox-check-color: white;
--forge-checkbox-focus-ring: var(--forge-color-primary-light, #93bbfc);
--forge-checkbox-error-border: var(--forge-color-danger, #ef4444);

/* Spacing tokens */
--forge-checkbox-gap: 8px;
--forge-checkbox-radius: 4px;
--forge-checkbox-label-font-size: 14px;
--forge-checkbox-helper-font-size: 12px;

/* Animation */
--forge-checkbox-transition: all 0.2s ease;
```

### Custom Styling Examples

```css
/* Custom colors */
forge-checkbox {
  --forge-checkbox-checked-bg: #10b981;
  --forge-checkbox-checked-border: #10b981;
}

/* Rounded checkbox */
forge-checkbox.rounded {
  --forge-checkbox-radius: 50%;
}

/* Large with custom spacing */
forge-checkbox.custom {
  --forge-checkbox-size: 28px;
  --forge-checkbox-gap: 12px;
  --forge-checkbox-label-font-size: 16px;
}

/* Error state styling */
forge-checkbox[error] {
  --forge-checkbox-border: var(--forge-color-danger);
  --forge-checkbox-label-color: var(--forge-color-danger);
}
```

## Indeterminate State

The indeterminate state is useful for parent checkboxes that control groups of child checkboxes:

```html
<div class="checkbox-group">
  <forge-checkbox 
    id="selectAll"
    indeterminate
  >
    Select All
  </forge-checkbox>
  
  <div class="checkbox-children">
    <forge-checkbox class="child">Option 1</forge-checkbox>
    <forge-checkbox class="child" checked>Option 2</forge-checkbox>
    <forge-checkbox class="child">Option 3</forge-checkbox>
  </div>
</div>

<script>
const parent = document.getElementById('selectAll');
const children = document.querySelectorAll('.child');

function updateParent() {
  const checkedCount = Array.from(children)
    .filter(c => c.checked).length;
  
  if (checkedCount === 0) {
    parent.checked = false;
    parent.indeterminate = false;
  } else if (checkedCount === children.length) {
    parent.checked = true;
    parent.indeterminate = false;
  } else {
    parent.indeterminate = true;
  }
}

parent.addEventListener('forge-change', (e) => {
  children.forEach(child => {
    child.checked = e.detail.checked;
  });
});

children.forEach(child => {
  child.addEventListener('forge-change', updateParent);
});

updateParent();
</script>
```

## Form Integration

### With Native Forms

```html
<form id="preferencesForm">
  <forge-checkbox name="newsletter" value="yes">
    Subscribe to newsletter
  </forge-checkbox>
  
  <forge-checkbox name="notifications" value="enabled">
    Enable notifications
  </forge-checkbox>
  
  <forge-checkbox name="analytics" value="true" checked>
    Share usage analytics
  </forge-checkbox>
  
  <forge-button type="submit">Save Preferences</forge-button>
</form>

<script>
document.getElementById('preferencesForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  console.log(Object.fromEntries(formData));
});
</script>
```

### Validation

```javascript
const checkbox = document.querySelector('forge-checkbox[required]');

// Custom validation
checkbox.addEventListener('forge-change', (e) => {
  if (!e.detail.checked && checkbox.required) {
    checkbox.error = true;
    checkbox.errorText = 'This field is required';
  } else {
    checkbox.error = false;
    checkbox.errorText = '';
  }
});

// Validate on form submit
if (!checkbox.validate()) {
  // Handle validation error
}
```

## AI-Ready Features

### AI Metadata

```javascript
checkbox.aiMetadata = {
  purpose: 'User consent for data processing',
  dataType: 'boolean',
  criticality: 'high',
  semanticRole: 'consent-checkbox',
  context: 'privacy-settings'
};
```

### AI Helper Methods

```javascript
// Get natural language description
checkbox.getAIDescription();
// Returns: "Checkbox for newsletter subscription, currently unchecked, optional"

// Get state information
checkbox.getStateInfo();
// Returns: {
//   checked: false,
//   indeterminate: false,
//   required: false,
//   valid: true
// }

// Get semantic meaning
checkbox.getSemanticMeaning();
// Returns: "User consent for email communications"

// Get related options
checkbox.getRelatedOptions();
// Returns: ['email-frequency', 'notification-types']
```

## Performance Monitoring

```html
<forge-checkbox
  dev-mode
  show-metrics
  max-render-ms="4"
  performance-mode="fast"
>
  Performance monitored checkbox
</forge-checkbox>
```

## Accessibility

### WCAG 2.1 AA Compliance

- ✅ Keyboard navigation (Space to toggle)
- ✅ Focus indicators
- ✅ ARIA states (checked, mixed)
- ✅ Label association
- ✅ Screen reader announcements
- ✅ Required field indicators
- ✅ Error state announcements
- ✅ High contrast support

### ARIA Attributes

```html
<!-- Rendered output -->
<forge-checkbox
  role="checkbox"
  tabindex="0"
  aria-checked="false"
  aria-required="false"
  aria-invalid="false"
  aria-describedby="helper-text"
>
  Checkbox label
</forge-checkbox>

<!-- Indeterminate state -->
<forge-checkbox
  aria-checked="mixed"
  indeterminate
>
  Partially selected
</forge-checkbox>
```

### Keyboard Support

| Key | Action |
|-----|--------|
| `Space` | Toggle checked state |
| `Tab` | Focus next element |
| `Shift+Tab` | Focus previous element |

## Use Cases

### Settings Panel

```html
<div class="settings-panel">
  <h3>Notification Settings</h3>
  
  <forge-checkbox name="email" checked>
    Email notifications
  </forge-checkbox>
  
  <forge-checkbox name="push">
    Push notifications
  </forge-checkbox>
  
  <forge-checkbox name="sms">
    SMS alerts
  </forge-checkbox>
  
  <forge-checkbox name="marketing" helper-text="Receive promotional offers">
    Marketing communications
  </forge-checkbox>
</div>
```

### Task List

```html
<div class="task-list">
  <forge-checkbox class="task" data-id="1">
    Complete project documentation
  </forge-checkbox>
  
  <forge-checkbox class="task" data-id="2" checked>
    Review pull requests
  </forge-checkbox>
  
  <forge-checkbox class="task" data-id="3">
    Update dependencies
  </forge-checkbox>
</div>

<script>
document.querySelectorAll('.task').forEach(task => {
  task.addEventListener('forge-change', async (e) => {
    await updateTaskStatus(
      task.dataset.id, 
      e.detail.checked
    );
  });
});
</script>
```

### Terms and Conditions

```html
<div class="terms-section">
  <forge-checkbox 
    id="terms"
    required
    error-text="You must accept the terms to continue"
  >
    I have read and agree to the 
    <a href="/terms">Terms of Service</a> and 
    <a href="/privacy">Privacy Policy</a>
  </forge-checkbox>
  
  <forge-checkbox id="newsletter">
    Send me updates about new features (optional)
  </forge-checkbox>
  
  <forge-button 
    id="continueBtn"
    variant="primary"
    disabled
  >
    Continue
  </forge-button>
</div>

<script>
const termsCheckbox = document.getElementById('terms');
const continueBtn = document.getElementById('continueBtn');

termsCheckbox.addEventListener('forge-change', (e) => {
  continueBtn.disabled = !e.detail.checked;
  if (!e.detail.checked) {
    termsCheckbox.error = true;
  } else {
    termsCheckbox.error = false;
  }
});
</script>
```

### Filter Options

```html
<div class="filter-panel">
  <h4>Filter by Category</h4>
  
  <forge-checkbox value="electronics" checked>
    Electronics
  </forge-checkbox>
  
  <forge-checkbox value="clothing">
    Clothing
  </forge-checkbox>
  
  <forge-checkbox value="books">
    Books
  </forge-checkbox>
  
  <forge-checkbox value="home">
    Home & Garden
  </forge-checkbox>
</div>
```

## Checkbox Groups

```javascript
class CheckboxGroup {
  constructor(container) {
    this.container = container;
    this.checkboxes = container.querySelectorAll('forge-checkbox');
    this.init();
  }
  
  init() {
    this.checkboxes.forEach(checkbox => {
      checkbox.addEventListener('forge-change', () => {
        this.handleChange();
      });
    });
  }
  
  handleChange() {
    const values = this.getValues();
    this.container.dispatchEvent(new CustomEvent('group-change', {
      detail: { values }
    }));
  }
  
  getValues() {
    return Array.from(this.checkboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value || cb.textContent);
  }
  
  setValues(values) {
    this.checkboxes.forEach(checkbox => {
      checkbox.checked = values.includes(checkbox.value);
    });
  }
  
  clear() {
    this.checkboxes.forEach(cb => cb.checked = false);
  }
  
  selectAll() {
    this.checkboxes.forEach(cb => cb.checked = true);
  }
}

// Usage
const group = new CheckboxGroup(document.getElementById('options'));
group.container.addEventListener('group-change', (e) => {
  console.log('Selected:', e.detail.values);
});
```

## Framework Integration

### React

```jsx
import '@nexcraft/forge/checkbox';

function Preferences() {
  const [preferences, setPreferences] = React.useState({
    newsletter: false,
    notifications: true,
    analytics: false
  });
  
  const handleChange = (key) => (e) => {
    setPreferences({
      ...preferences,
      [key]: e.detail.checked
    });
  };
  
  return (
    <div>
      <forge-checkbox
        checked={preferences.newsletter}
        onForgeChange={handleChange('newsletter')}
      >
        Newsletter subscription
      </forge-checkbox>
      
      <forge-checkbox
        checked={preferences.notifications}
        onForgeChange={handleChange('notifications')}
      >
        Push notifications
      </forge-checkbox>
    </div>
  );
}
```

### Vue

```vue
<template>
  <div>
    <forge-checkbox
      v-model="agreedToTerms"
      required
      @forge-change="validateTerms"
    >
      I agree to the terms
    </forge-checkbox>
    
    <forge-checkbox
      v-model="subscribeNewsletter"
    >
      Subscribe to newsletter
    </forge-checkbox>
  </div>
</template>

<script>
import '@nexcraft/forge/checkbox';

export default {
  data() {
    return {
      agreedToTerms: false,
      subscribeNewsletter: false
    };
  },
  methods: {
    validateTerms(e) {
      if (!e.detail.checked) {
        // Show error
      }
    }
  }
};
</script>
```

### Angular

```typescript
import '@nexcraft/forge/checkbox';

@Component({
  template: `
    <forge-checkbox
      [(ngModel)]="settings.emailNotifications"
      (forgeChange)="updateSettings()"
    >
      Email notifications
    </forge-checkbox>
    
    <forge-checkbox
      [(ngModel)]="settings.darkMode"
      (forgeChange)="toggleTheme()"
    >
      Dark mode
    </forge-checkbox>
  `
})
export class SettingsComponent {
  settings = {
    emailNotifications: true,
    darkMode: false
  };
  
  updateSettings() {
    // Save settings
  }
  
  toggleTheme() {
    document.body.classList.toggle('dark', this.settings.darkMode);
  }
}
```

## Testing

### Unit Test Example

```typescript
import { fixture, html } from '@open-wc/testing';
import { expect } from '@esm-bundle/chai';
import '@nexcraft/forge/checkbox';

describe('forge-checkbox', () => {
  it('should toggle checked state', async () => {
    const el = await fixture(html`
      <forge-checkbox>Test</forge-checkbox>
    `);
    
    expect(el.checked).to.be.false;
    
    el.click();
    await el.updateComplete;
    
    expect(el.checked).to.be.true;
  });
  
  it('should handle indeterminate state', async () => {
    const el = await fixture(html`
      <forge-checkbox indeterminate>Test</forge-checkbox>
    `);
    
    expect(el.indeterminate).to.be.true;
    expect(el.getAttribute('aria-checked')).to.equal('mixed');
  });
  
  it('should emit change event', async () => {
    const el = await fixture(html`
      <forge-checkbox>Test</forge-checkbox>
    `);
    
    let eventDetail;
    el.addEventListener('forge-change', (e) => {
      eventDetail = e.detail;
    });
    
    el.click();
    
    expect(eventDetail.checked).to.be.true;
  });
});
```

## Migration Guide

### From Material UI Checkbox

```jsx
// Before (Material UI)
<Checkbox
  checked={checked}
  onChange={handleChange}
  indeterminate={indeterminate}
  disabled={disabled}
/>

// After (Forge)
<forge-checkbox
  checked={checked}
  onForgeChange={handleChange}
  indeterminate={indeterminate}
  disabled={disabled}
>
  Label text
</forge-checkbox>
```

### From Ant Design Checkbox

```jsx
// Before (Ant Design)
<Checkbox
  checked={checked}
  onChange={onChange}
  disabled={disabled}
>
  Checkbox label
</Checkbox>

// After (Forge)
<forge-checkbox
  checked={checked}
  onForgeChange={onChange}
  disabled={disabled}
>
  Checkbox label
</forge-checkbox>
```

## Browser Support

- Chrome 67+ ✅
- Firefox 63+ ✅
- Safari 10.1+ ✅
- Edge 79+ ✅

## Related Components

- [ForgeSwitch](./switch.md) - Toggle switch component
- [ForgeRadioGroup](./radio-group.md) - Radio button group
- [ForgeToggle](./toggle.md) - Toggle button

## Changelog

### Version 1.0.0
- Initial release
- Indeterminate state support
- 4 label positions
- 3 size variants
- Helper text support
- Full accessibility
- AI-ready architecture
- Performance monitoring

## API Playground

Try the component live in our [Storybook](https://forge-ui.dev/storybook/?path=/story/atoms-checkbox)