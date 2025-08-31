# ForgeInput Component

A comprehensive form input component with validation, multiple types, and AI-ready architecture. Features auto-complete, input masking, and extensive accessibility support.

## Installation

```javascript
import '@nexcraft/forge/input';
```

## Basic Usage

```html
<forge-input 
  label="Email Address"
  type="email"
  placeholder="Enter your email"
  required
></forge-input>
```

## Live Examples

### Input Types

```html
<!-- Text (default) -->
<forge-input label="Name" type="text"></forge-input>

<!-- Email -->
<forge-input label="Email" type="email"></forge-input>

<!-- Password -->
<forge-input label="Password" type="password"></forge-input>

<!-- Number -->
<forge-input label="Age" type="number" min="0" max="120"></forge-input>

<!-- Tel -->
<forge-input label="Phone" type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"></forge-input>

<!-- URL -->
<forge-input label="Website" type="url"></forge-input>

<!-- Search -->
<forge-input label="Search" type="search" clearable></forge-input>
```

### Validation States

```html
<!-- Required field -->
<forge-input 
  label="Username"
  required
  helper-text="Choose a unique username"
></forge-input>

<!-- With error -->
<forge-input 
  label="Email"
  type="email"
  error
  error-text="Please enter a valid email"
></forge-input>

<!-- Success state -->
<forge-input 
  label="Username"
  value="johndoe"
  success
  success-text="Username is available"
></forge-input>

<!-- With pattern validation -->
<forge-input
  label="Product Code"
  pattern="[A-Z]{3}-[0-9]{4}"
  placeholder="ABC-1234"
  error-text="Format: ABC-1234"
></forge-input>
```

### Advanced Features

```html
<!-- With prefix and suffix -->
<forge-input label="Price" type="number">
  <span slot="prefix">$</span>
  <span slot="suffix">.00</span>
</forge-input>

<!-- Clearable input -->
<forge-input 
  label="Search"
  type="search"
  clearable
  value="Search term"
></forge-input>

<!-- With character counter -->
<forge-input 
  label="Bio"
  maxlength="160"
  show-counter
  helper-text="Brief description"
></forge-input>

<!-- Disabled state -->
<forge-input 
  label="System ID"
  value="SYS-001"
  disabled
></forge-input>

<!-- Loading state -->
<forge-input 
  label="Checking availability..."
  loading
></forge-input>
```

## API Reference

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `type` | `'text' \| 'email' \| 'password' \| 'number' \| 'tel' \| 'url' \| 'search'` | `'text'` | Input type |
| `value` | `string` | `''` | Current input value |
| `label` | `string` | `''` | Field label |
| `placeholder` | `string` | `''` | Placeholder text |
| `name` | `string` | `''` | Form field name |
| `required` | `boolean` | `false` | Required field |
| `disabled` | `boolean` | `false` | Disable input |
| `readonly` | `boolean` | `false` | Read-only mode |
| `error` | `boolean` | `false` | Error state |
| `success` | `boolean` | `false` | Success state |
| `loading` | `boolean` | `false` | Loading state |
| `clearable` | `boolean` | `false` | Show clear button |
| `helperText` | `string` | `''` | Helper text below input |
| `errorText` | `string` | `''` | Error message |
| `successText` | `string` | `''` | Success message |
| `pattern` | `string` | `''` | Validation pattern |
| `minlength` | `number` | `undefined` | Minimum length |
| `maxlength` | `number` | `undefined` | Maximum length |
| `min` | `string \| number` | `undefined` | Minimum value (number/date) |
| `max` | `string \| number` | `undefined` | Maximum value (number/date) |
| `step` | `string \| number` | `undefined` | Step increment (number) |
| `showCounter` | `boolean` | `false` | Show character counter |
| `autocomplete` | `string` | `'off'` | Autocomplete hint |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `input` | `{ value: string }` | Fired on input |
| `change` | `{ value: string }` | Fired on change |
| `forge-input` | `{ value: string }` | Custom input event |
| `forge-change` | `{ value: string }` | Custom change event |
| `forge-clear` | `void` | Fired when cleared |
| `forge-focus` | `void` | Fired on focus |
| `forge-blur` | `void` | Fired on blur |
| `forge-validation` | `{ valid: boolean, errors: string[] }` | Validation state change |

### Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `focus()` | `(): void` | Focus the input |
| `blur()` | `(): void` | Remove focus |
| `select()` | `(): void` | Select all text |
| `clear()` | `(): void` | Clear the value |
| `validate()` | `(): boolean` | Run validation |
| `setCustomValidity()` | `(message: string): void` | Set custom validation message |
| `reportValidity()` | `(): boolean` | Report validation state |

### Slots

| Slot | Description |
|------|-------------|
| `prefix` | Content before the input |
| `suffix` | Content after the input |
| `helper` | Helper text content |

## Styling

### CSS Custom Properties

```css
/* Color tokens */
--forge-input-bg: var(--forge-color-surface, white);
--forge-input-border: var(--forge-color-border, #e5e7eb);
--forge-input-focus-border: var(--forge-color-primary, #3b82f6);
--forge-input-error-border: var(--forge-color-danger, #ef4444);
--forge-input-success-border: var(--forge-color-success, #10b981);
--forge-input-text: var(--forge-color-text, #1f2937);
--forge-input-placeholder: var(--forge-color-text-secondary, #6b7280);
--forge-input-label: var(--forge-color-text, #1f2937);

/* Size tokens */
--forge-input-height: 40px;
--forge-input-padding: 0 12px;
--forge-input-font-size: 14px;
--forge-input-label-size: 14px;
--forge-input-helper-size: 12px;
--forge-input-radius: var(--forge-radius-md, 6px);

/* Spacing tokens */
--forge-input-label-gap: 4px;
--forge-input-helper-gap: 4px;

/* Transition */
--forge-input-transition: all 0.2s ease;
```

### Custom Styling Examples

```css
/* Floating label style */
forge-input {
  --forge-input-label-size: 12px;
  position: relative;
}

forge-input[has-value] {
  --forge-input-label-transform: translateY(-20px);
}

/* Custom error styling */
forge-input[error] {
  --forge-input-border: 2px solid var(--forge-color-danger);
  --forge-input-bg: #fef2f2;
}

/* Rounded input */
forge-input.rounded {
  --forge-input-radius: 9999px;
  --forge-input-padding: 0 20px;
}
```

## Form Integration

### With Native Forms

```html
<form id="userForm">
  <forge-input 
    name="firstName"
    label="First Name"
    required
  ></forge-input>
  
  <forge-input 
    name="email"
    type="email"
    label="Email"
    required
  ></forge-input>
  
  <forge-button type="submit">Submit</forge-button>
</form>

<script>
document.getElementById('userForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  console.log(Object.fromEntries(formData));
});
</script>
```

### Custom Validation

```javascript
const input = document.querySelector('forge-input');

// Add custom validation
input.addEventListener('forge-input', (e) => {
  const value = e.detail.value;
  
  if (value.length < 3) {
    input.error = true;
    input.errorText = 'Must be at least 3 characters';
  } else {
    input.error = false;
    input.errorText = '';
  }
});

// Validate on demand
if (!input.validate()) {
  console.log('Validation failed');
}
```

## AI-Ready Features

### AI Metadata

```javascript
input.aiMetadata = {
  purpose: 'Collect user email for registration',
  dataType: 'email',
  criticality: 'high',
  semanticRole: 'contact-info',
  validation: 'email-format'
};
```

### AI Helper Methods

```javascript
// Get natural language description
input.getAIDescription();
// Returns: "Email input field, required, currently empty"

// Get validation state
input.getValidationState();
// Returns: {
//   valid: false,
//   errors: ['Field is required'],
//   constraints: { required: true, type: 'email' }
// }

// Suggest corrections
input.suggestCorrections('john@gmail');
// Returns: ['john@gmail.com', 'john@gmail.co.uk']

// Auto-format input
input.enableAutoFormat('phone');
// Automatically formats phone numbers as user types
```

## Performance Monitoring

### Enable Performance Metrics

```html
<forge-input
  dev-mode
  show-metrics
  max-render-ms="8"
  performance-mode="fast"
>
</forge-input>
```

### Performance Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `dev-mode` | `boolean` | `false` | Enable development features |
| `show-metrics` | `boolean` | `false` | Display performance overlay |
| `max-render-ms` | `number` | `16` | Performance budget |
| `performance-mode` | `'auto' \| 'fast' \| 'normal'` | `'auto'` | Optimization mode |

## Accessibility

### WCAG 2.1 AA Compliance

- ✅ Proper labeling with `<label>` association
- ✅ Keyboard navigation (Tab, Shift+Tab)
- ✅ Screen reader announcements
- ✅ Error/success state announcements
- ✅ Required field indicators
- ✅ Helper text association
- ✅ Focus indicators
- ✅ Color contrast compliance

### ARIA Attributes

```html
<!-- Rendered output -->
<forge-input
  role="textbox"
  aria-label="Email Address"
  aria-required="true"
  aria-invalid="false"
  aria-describedby="helper-text error-text"
>
</forge-input>
```

### Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Focus next field |
| `Shift+Tab` | Focus previous field |
| `Enter` | Submit form (when in form) |
| `Escape` | Clear input (if clearable) |
| `Backspace` | Delete character |
| `Ctrl/Cmd+A` | Select all |

## Input Masking

### Phone Number Mask

```html
<forge-input
  label="Phone"
  type="tel"
  mask="(999) 999-9999"
  placeholder="(555) 123-4567"
></forge-input>
```

### Credit Card Mask

```html
<forge-input
  label="Card Number"
  mask="9999 9999 9999 9999"
  placeholder="1234 5678 9012 3456"
></forge-input>
```

### Custom Mask

```javascript
input.mask = {
  pattern: 'AA-999-AAA',
  definitions: {
    '9': /[0-9]/,
    'A': /[A-Za-z]/
  }
};
```

## Autocomplete Integration

### Basic Autocomplete

```html
<forge-input
  label="Country"
  autocomplete="country"
  list="countries"
></forge-input>

<datalist id="countries">
  <option value="United States">
  <option value="Canada">
  <option value="Mexico">
</datalist>
```

### Dynamic Suggestions

```javascript
input.addEventListener('forge-input', async (e) => {
  const suggestions = await fetchSuggestions(e.detail.value);
  input.suggestions = suggestions;
});
```

## Framework Integration

### React

```jsx
import '@nexcraft/forge/input';

function MyForm() {
  const [email, setEmail] = React.useState('');
  
  return (
    <forge-input
      label="Email"
      type="email"
      value={email}
      onForgeChange={(e) => setEmail(e.detail.value)}
      required
    />
  );
}
```

### Vue

```vue
<template>
  <forge-input
    v-model="email"
    label="Email"
    type="email"
    :error="emailError"
    @forge-blur="validateEmail"
  />
</template>

<script>
import '@nexcraft/forge/input';

export default {
  data() {
    return {
      email: '',
      emailError: false
    };
  },
  methods: {
    validateEmail() {
      this.emailError = !this.email.includes('@');
    }
  }
};
</script>
```

### Angular

```typescript
import '@nexcraft/forge/input';

@Component({
  template: `
    <forge-input
      [(ngModel)]="email"
      label="Email"
      type="email"
      [required]="true"
      (forgeChange)="onEmailChange($event)"
    ></forge-input>
  `
})
export class MyComponent {
  email = '';
  
  onEmailChange(event: CustomEvent) {
    console.log('Email changed:', event.detail.value);
  }
}
```

## Testing

### Unit Test Example

```typescript
import { fixture, html } from '@open-wc/testing';
import { expect } from '@esm-bundle/chai';
import '@nexcraft/forge/input';

describe('forge-input', () => {
  it('should validate email format', async () => {
    const el = await fixture(html`
      <forge-input type="email" required></forge-input>
    `);
    
    el.value = 'invalid-email';
    expect(el.validate()).to.be.false;
    
    el.value = 'user@example.com';
    expect(el.validate()).to.be.true;
  });
  
  it('should emit change event', async () => {
    const el = await fixture(html`<forge-input></forge-input>`);
    
    let changeValue = '';
    el.addEventListener('forge-change', (e) => {
      changeValue = e.detail.value;
    });
    
    el.value = 'test';
    el.dispatchEvent(new Event('change'));
    
    expect(changeValue).to.equal('test');
  });
});
```

## Use Cases

### Login Form

```html
<form class="login-form">
  <forge-input
    name="username"
    label="Username or Email"
    autocomplete="username"
    required
  ></forge-input>
  
  <forge-input
    name="password"
    type="password"
    label="Password"
    autocomplete="current-password"
    required
  >
    <forge-icon-button slot="suffix" @click="${togglePassword}">
      <forge-icon name="eye"></forge-icon>
    </forge-icon-button>
  </forge-input>
  
  <forge-button type="submit" variant="primary" full-width>
    Sign In
  </forge-button>
</form>
```

### Search Bar

```html
<forge-input
  type="search"
  placeholder="Search products..."
  clearable
  @forge-input="${handleSearch}"
>
  <forge-icon slot="prefix" name="search"></forge-icon>
</forge-input>
```

### Credit Card Form

```html
<div class="payment-form">
  <forge-input
    label="Card Number"
    mask="9999 9999 9999 9999"
    autocomplete="cc-number"
    required
  ></forge-input>
  
  <div class="row">
    <forge-input
      label="Expiry"
      mask="99/99"
      placeholder="MM/YY"
      autocomplete="cc-exp"
      required
    ></forge-input>
    
    <forge-input
      label="CVC"
      mask="999"
      autocomplete="cc-csc"
      required
    ></forge-input>
  </div>
</div>
```

## Migration Guide

### From Material UI TextField

```jsx
// Before (Material UI)
<TextField
  label="Email"
  type="email"
  variant="outlined"
  error={hasError}
  helperText="Enter your email"
/>

// After (Forge)
<forge-input
  label="Email"
  type="email"
  error={hasError}
  helper-text="Enter your email"
/>
```

### From Ant Design Input

```jsx
// Before (Ant Design)
<Input
  placeholder="Enter text"
  prefix={<UserOutlined />}
  allowClear
/>

// After (Forge)
<forge-input
  placeholder="Enter text"
  clearable
>
  <forge-icon slot="prefix" name="user"></forge-icon>
</forge-input>
```

## Browser Support

- Chrome 67+ ✅
- Firefox 63+ ✅
- Safari 10.1+ ✅
- Edge 79+ ✅

## Related Components

- [ForgeTextarea](./textarea.md) - Multi-line text input
- [ForgeSelect](./select.md) - Dropdown selection
- [ForgeCheckbox](./checkbox.md) - Checkbox input
- [ForgeRadioGroup](./radio-group.md) - Radio button group

## Changelog

### Version 1.0.0
- Initial release with 7 input types
- Full validation support
- AI-ready architecture
- Performance monitoring
- Autocomplete and masking
- WCAG 2.1 AA compliance

## API Playground

Try the component live in our [Storybook](https://forge-ui.dev/storybook/?path=/story/atoms-input)