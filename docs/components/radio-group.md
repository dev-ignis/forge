# ForgeRadioGroup Component

A comprehensive radio button group component with keyboard navigation, custom layouts, and full accessibility support for single-choice selection.

## Installation

```javascript
import '@nexcraft/forge/radio-group';
```

## Basic Usage

```html
<forge-radio-group name="choice" value="option1">
  <forge-radio value="option1">Option 1</forge-radio>
  <forge-radio value="option2">Option 2</forge-radio>
  <forge-radio value="option3">Option 3</forge-radio>
</forge-radio-group>
```

## Live Examples

### Basic Radio Group

```html
<forge-radio-group name="size">
  <forge-radio value="small">Small</forge-radio>
  <forge-radio value="medium" checked>Medium</forge-radio>
  <forge-radio value="large">Large</forge-radio>
</forge-radio-group>
```

### Orientations

```html
<!-- Vertical (default) -->
<forge-radio-group orientation="vertical">
  <forge-radio value="1">Option 1</forge-radio>
  <forge-radio value="2">Option 2</forge-radio>
  <forge-radio value="3">Option 3</forge-radio>
</forge-radio-group>

<!-- Horizontal -->
<forge-radio-group orientation="horizontal">
  <forge-radio value="1">Option 1</forge-radio>
  <forge-radio value="2">Option 2</forge-radio>
  <forge-radio value="3">Option 3</forge-radio>
</forge-radio-group>

<!-- Grid -->
<forge-radio-group orientation="grid" columns="2">
  <forge-radio value="1">Option 1</forge-radio>
  <forge-radio value="2">Option 2</forge-radio>
  <forge-radio value="3">Option 3</forge-radio>
  <forge-radio value="4">Option 4</forge-radio>
</forge-radio-group>
```

### With Descriptions

```html
<forge-radio-group name="plan">
  <forge-radio value="basic">
    <div slot="label">Basic Plan</div>
    <div slot="description">$9/month - Perfect for individuals</div>
  </forge-radio>
  
  <forge-radio value="pro">
    <div slot="label">Pro Plan</div>
    <div slot="description">$29/month - Great for small teams</div>
  </forge-radio>
  
  <forge-radio value="enterprise">
    <div slot="label">Enterprise Plan</div>
    <div slot="description">Custom pricing - For large organizations</div>
  </forge-radio>
</forge-radio-group>
```

### Disabled Options

```html
<forge-radio-group name="shipping">
  <forge-radio value="standard">Standard (5-7 days)</forge-radio>
  <forge-radio value="express">Express (2-3 days)</forge-radio>
  <forge-radio value="overnight" disabled>Overnight (not available)</forge-radio>
</forge-radio-group>
```

## API Reference

### ForgeRadioGroup Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | `string` | `''` | Selected value |
| `name` | `string` | `''` | Form field name |
| `orientation` | `'vertical' \| 'horizontal' \| 'grid'` | `'vertical'` | Layout orientation |
| `columns` | `number` | `2` | Grid columns (when grid) |
| `disabled` | `boolean` | `false` | Disable all radios |
| `required` | `boolean` | `false` | Required field |
| `error` | `boolean` | `false` | Error state |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Radio size |

### ForgeRadio Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | `string` | `''` | Radio value |
| `checked` | `boolean` | `false` | Checked state |
| `disabled` | `boolean` | `false` | Disabled state |
| `labelPosition` | `'left' \| 'right'` | `'right'` | Label position |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `change` | `{ value: string }` | Standard change event |
| `forge-change` | `{ value: string, previousValue: string }` | Custom change event |
| `forge-focus` | `{ value: string }` | Radio focused |
| `forge-blur` | `{ value: string }` | Radio blurred |

### Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `focus()` | `(): void` | Focus first radio |
| `validate()` | `(): boolean` | Validate required |
| `reset()` | `(): void` | Clear selection |
| `selectNext()` | `(): void` | Select next option |
| `selectPrevious()` | `(): void` | Select previous option |

### Slots

| Slot | Description |
|------|-------------|
| (default) | Radio options |
| `label` | Group label |
| `helper` | Helper text |
| `error` | Error message |

## Styling

### CSS Custom Properties

```css
/* Size tokens */
--forge-radio-size-sm: 16px;
--forge-radio-size-md: 20px;
--forge-radio-size-lg: 24px;
--forge-radio-dot-size-sm: 8px;
--forge-radio-dot-size-md: 10px;
--forge-radio-dot-size-lg: 12px;

/* Color tokens */
--forge-radio-border: var(--forge-color-border, #d1d5db);
--forge-radio-checked-border: var(--forge-color-primary, #3b82f6);
--forge-radio-checked-bg: var(--forge-color-primary, #3b82f6);
--forge-radio-bg: white;
--forge-radio-dot-color: white;
--forge-radio-focus-ring: var(--forge-color-primary-light, #93bbfc);
--forge-radio-error-border: var(--forge-color-danger, #ef4444);

/* Spacing tokens */
--forge-radio-gap: 8px;
--forge-radio-group-gap: 12px;
--forge-radio-label-font-size: 14px;
--forge-radio-description-font-size: 12px;

/* Layout tokens */
--forge-radio-group-columns: 2;
--forge-radio-group-column-gap: 16px;
--forge-radio-group-row-gap: 12px;
```

### Custom Styling Examples

```css
/* Custom colors */
forge-radio-group {
  --forge-radio-checked-bg: #10b981;
  --forge-radio-checked-border: #10b981;
}

/* Card style radios */
forge-radio-group.card-style forge-radio {
  padding: 16px;
  border: 2px solid var(--forge-color-border);
  border-radius: 8px;
  transition: all 0.2s;
}

forge-radio-group.card-style forge-radio[checked] {
  border-color: var(--forge-color-primary);
  background: var(--forge-color-primary-light);
}

/* Button style radios */
forge-radio-group.button-style {
  display: flex;
  gap: 0;
}

forge-radio-group.button-style forge-radio {
  padding: 8px 16px;
  border: 1px solid var(--forge-color-border);
  margin: -1px;
}

forge-radio-group.button-style forge-radio:first-child {
  border-radius: 4px 0 0 4px;
}

forge-radio-group.button-style forge-radio:last-child {
  border-radius: 0 4px 4px 0;
}
```

## Form Integration

### With Native Forms

```html
<form id="orderForm">
  <forge-radio-group name="size" required>
    <div slot="label">Select Size</div>
    <forge-radio value="s">Small</forge-radio>
    <forge-radio value="m">Medium</forge-radio>
    <forge-radio value="l">Large</forge-radio>
    <forge-radio value="xl">Extra Large</forge-radio>
    <div slot="error">Please select a size</div>
  </forge-radio-group>
  
  <forge-radio-group name="color" required>
    <div slot="label">Select Color</div>
    <forge-radio value="red">Red</forge-radio>
    <forge-radio value="blue">Blue</forge-radio>
    <forge-radio value="green">Green</forge-radio>
  </forge-radio-group>
  
  <forge-button type="submit">Place Order</forge-button>
</form>

<script>
document.getElementById('orderForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  console.log('Order:', Object.fromEntries(formData));
});
</script>
```

### Validation

```javascript
const radioGroup = document.querySelector('forge-radio-group[required]');

// Custom validation
radioGroup.addEventListener('forge-change', (e) => {
  if (!e.detail.value && radioGroup.required) {
    radioGroup.error = true;
  } else {
    radioGroup.error = false;
  }
});

// Validate on submit
if (!radioGroup.validate()) {
  // Show error message
}
```

## Complex Layouts

### Payment Methods

```html
<forge-radio-group name="payment" class="payment-methods">
  <forge-radio value="card">
    <div class="payment-option">
      <forge-icon name="credit-card"></forge-icon>
      <div>
        <div class="title">Credit/Debit Card</div>
        <div class="description">Visa, Mastercard, Amex</div>
      </div>
    </div>
  </forge-radio>
  
  <forge-radio value="paypal">
    <div class="payment-option">
      <forge-icon name="paypal"></forge-icon>
      <div>
        <div class="title">PayPal</div>
        <div class="description">Pay with your PayPal account</div>
      </div>
    </div>
  </forge-radio>
  
  <forge-radio value="apple">
    <div class="payment-option">
      <forge-icon name="apple"></forge-icon>
      <div>
        <div class="title">Apple Pay</div>
        <div class="description">Quick and secure payment</div>
      </div>
    </div>
  </forge-radio>
</forge-radio-group>

<style>
.payment-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 2px solid transparent;
  border-radius: 8px;
  transition: all 0.2s;
}

forge-radio[checked] .payment-option {
  border-color: var(--forge-color-primary);
  background: var(--forge-color-primary-light);
}
</style>
```

### Subscription Plans

```html
<forge-radio-group name="subscription" orientation="horizontal">
  <forge-radio value="monthly">
    <div class="plan-card">
      <h4>Monthly</h4>
      <div class="price">$19/mo</div>
      <ul>
        <li>Cancel anytime</li>
        <li>All features</li>
      </ul>
    </div>
  </forge-radio>
  
  <forge-radio value="yearly">
    <div class="plan-card">
      <div class="badge">Save 20%</div>
      <h4>Yearly</h4>
      <div class="price">$180/yr</div>
      <ul>
        <li>Best value</li>
        <li>All features</li>
        <li>Priority support</li>
      </ul>
    </div>
  </forge-radio>
  
  <forge-radio value="lifetime">
    <div class="plan-card">
      <h4>Lifetime</h4>
      <div class="price">$499</div>
      <ul>
        <li>One-time payment</li>
        <li>All features forever</li>
        <li>Priority support</li>
      </ul>
    </div>
  </forge-radio>
</forge-radio-group>
```

## AI-Ready Features

### AI Metadata

```javascript
radioGroup.aiMetadata = {
  purpose: 'Select shipping method',
  dataType: 'single-choice',
  criticality: 'high',
  semanticRole: 'shipping-selector',
  context: 'checkout-form'
};
```

### AI Helper Methods

```javascript
// Get natural language description
radioGroup.getAIDescription();
// Returns: "Radio group for shipping method, 3 options, Express selected"

// Get available options
radioGroup.getOptions();
// Returns: [
//   { value: 'standard', label: 'Standard', available: true },
//   { value: 'express', label: 'Express', available: true },
//   { value: 'overnight', label: 'Overnight', available: false }
// ]

// Get recommendation
radioGroup.getRecommendation();
// Returns: {
//   value: 'express',
//   reason: 'Best balance of speed and cost'
// }

// Get selection context
radioGroup.getSelectionContext();
// Returns: {
//   selected: 'express',
//   semanticMeaning: 'User prefers faster delivery',
//   relatedFields: ['delivery-date', 'shipping-cost']
// }
```

## Performance Monitoring

```html
<forge-radio-group
  dev-mode
  show-metrics
  max-render-ms="8"
  performance-mode="fast"
>
  <forge-radio value="1">Option 1</forge-radio>
  <forge-radio value="2">Option 2</forge-radio>
</forge-radio-group>
```

## Accessibility

### WCAG 2.1 AA Compliance

- ✅ Keyboard navigation (Arrow keys)
- ✅ Focus management
- ✅ ARIA radiogroup role
- ✅ Screen reader announcements
- ✅ Label association
- ✅ Required field indicators
- ✅ Error state announcements
- ✅ High contrast support

### ARIA Attributes

```html
<!-- Rendered output -->
<forge-radio-group
  role="radiogroup"
  aria-label="Select size"
  aria-required="true"
  aria-invalid="false"
>
  <forge-radio
    role="radio"
    tabindex="0"
    aria-checked="true"
  >
    Option 1
  </forge-radio>
  <forge-radio
    role="radio"
    tabindex="-1"
    aria-checked="false"
  >
    Option 2
  </forge-radio>
</forge-radio-group>
```

### Keyboard Support

| Key | Action |
|-----|--------|
| `↓` `→` | Select next option |
| `↑` `←` | Select previous option |
| `Space` | Select focused option |
| `Tab` | Focus next element |
| `Shift+Tab` | Focus previous element |
| `Home` | Select first option |
| `End` | Select last option |

## Use Cases

### Survey Questions

```html
<div class="survey">
  <forge-radio-group name="satisfaction" required>
    <div slot="label">How satisfied are you with our service?</div>
    <forge-radio value="very-satisfied">Very Satisfied</forge-radio>
    <forge-radio value="satisfied">Satisfied</forge-radio>
    <forge-radio value="neutral">Neutral</forge-radio>
    <forge-radio value="dissatisfied">Dissatisfied</forge-radio>
    <forge-radio value="very-dissatisfied">Very Dissatisfied</forge-radio>
  </forge-radio-group>
</div>
```

### Settings Panel

```html
<div class="settings">
  <forge-radio-group name="theme">
    <div slot="label">Theme Preference</div>
    <forge-radio value="light">Light</forge-radio>
    <forge-radio value="dark">Dark</forge-radio>
    <forge-radio value="auto">System Default</forge-radio>
  </forge-radio-group>
  
  <forge-radio-group name="language">
    <div slot="label">Language</div>
    <forge-radio value="en">English</forge-radio>
    <forge-radio value="es">Español</forge-radio>
    <forge-radio value="fr">Français</forge-radio>
    <forge-radio value="de">Deutsch</forge-radio>
  </forge-radio-group>
</div>
```

### Filter Options

```html
<div class="filters">
  <forge-radio-group name="sort" orientation="horizontal">
    <div slot="label">Sort By</div>
    <forge-radio value="relevance">Relevance</forge-radio>
    <forge-radio value="price-low">Price: Low to High</forge-radio>
    <forge-radio value="price-high">Price: High to Low</forge-radio>
    <forge-radio value="rating">Customer Rating</forge-radio>
  </forge-radio-group>
</div>
```

## Dynamic Options

```javascript
class DynamicRadioGroup {
  constructor(element, options) {
    this.element = element;
    this.setOptions(options);
  }
  
  setOptions(options) {
    this.element.innerHTML = '';
    
    options.forEach(option => {
      const radio = document.createElement('forge-radio');
      radio.value = option.value;
      radio.disabled = option.disabled || false;
      
      if (option.label) {
        const label = document.createElement('div');
        label.slot = 'label';
        label.textContent = option.label;
        radio.appendChild(label);
      }
      
      if (option.description) {
        const desc = document.createElement('div');
        desc.slot = 'description';
        desc.textContent = option.description;
        radio.appendChild(desc);
      }
      
      this.element.appendChild(radio);
    });
  }
  
  getValue() {
    return this.element.value;
  }
  
  setValue(value) {
    this.element.value = value;
  }
  
  disable() {
    this.element.disabled = true;
  }
  
  enable() {
    this.element.disabled = false;
  }
}

// Usage
const group = new DynamicRadioGroup(
  document.getElementById('dynamicGroup'),
  [
    { value: 'opt1', label: 'Option 1' },
    { value: 'opt2', label: 'Option 2', description: 'Recommended' },
    { value: 'opt3', label: 'Option 3', disabled: true }
  ]
);
```

## Framework Integration

### React

```jsx
import '@nexcraft/forge/radio-group';

function ShippingOptions() {
  const [shipping, setShipping] = React.useState('standard');
  
  return (
    <forge-radio-group
      name="shipping"
      value={shipping}
      onForgeChange={(e) => setShipping(e.detail.value)}
    >
      <forge-radio value="standard">
        Standard (5-7 days) - Free
      </forge-radio>
      <forge-radio value="express">
        Express (2-3 days) - $10
      </forge-radio>
      <forge-radio value="overnight">
        Overnight - $25
      </forge-radio>
    </forge-radio-group>
  );
}
```

### Vue

```vue
<template>
  <forge-radio-group
    v-model="selectedPlan"
    name="plan"
    @forge-change="handlePlanChange"
  >
    <forge-radio value="basic">Basic Plan</forge-radio>
    <forge-radio value="pro">Pro Plan</forge-radio>
    <forge-radio value="enterprise">Enterprise Plan</forge-radio>
  </forge-radio-group>
</template>

<script>
import '@nexcraft/forge/radio-group';

export default {
  data() {
    return {
      selectedPlan: 'basic'
    };
  },
  methods: {
    handlePlanChange(e) {
      console.log('Plan changed to:', e.detail.value);
    }
  }
};
</script>
```

### Angular

```typescript
import '@nexcraft/forge/radio-group';

@Component({
  template: `
    <forge-radio-group
      [(ngModel)]="selectedOption"
      name="options"
      (forgeChange)="onOptionChange($event)"
    >
      <forge-radio value="option1">Option 1</forge-radio>
      <forge-radio value="option2">Option 2</forge-radio>
      <forge-radio value="option3">Option 3</forge-radio>
    </forge-radio-group>
  `
})
export class OptionsComponent {
  selectedOption = 'option1';
  
  onOptionChange(event: CustomEvent) {
    console.log('Selected:', event.detail.value);
  }
}
```

## Testing

### Unit Test Example

```typescript
import { fixture, html } from '@open-wc/testing';
import { expect } from '@esm-bundle/chai';
import '@nexcraft/forge/radio-group';

describe('forge-radio-group', () => {
  it('should select radio', async () => {
    const el = await fixture(html`
      <forge-radio-group>
        <forge-radio value="1">Option 1</forge-radio>
        <forge-radio value="2">Option 2</forge-radio>
      </forge-radio-group>
    `);
    
    const radio2 = el.querySelector('[value="2"]');
    radio2.click();
    
    expect(el.value).to.equal('2');
  });
  
  it('should navigate with keyboard', async () => {
    const el = await fixture(html`
      <forge-radio-group value="1">
        <forge-radio value="1">Option 1</forge-radio>
        <forge-radio value="2">Option 2</forge-radio>
      </forge-radio-group>
    `);
    
    el.focus();
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    
    expect(el.value).to.equal('2');
  });
});
```

## Migration Guide

### From Material UI RadioGroup

```jsx
// Before (Material UI)
<RadioGroup value={value} onChange={handleChange}>
  <FormControlLabel value="1" control={<Radio />} label="Option 1" />
  <FormControlLabel value="2" control={<Radio />} label="Option 2" />
</RadioGroup>

// After (Forge)
<forge-radio-group value={value} onForgeChange={handleChange}>
  <forge-radio value="1">Option 1</forge-radio>
  <forge-radio value="2">Option 2</forge-radio>
</forge-radio-group>
```

### From Ant Design Radio.Group

```jsx
// Before (Ant Design)
<Radio.Group value={value} onChange={onChange}>
  <Radio value={1}>Option 1</Radio>
  <Radio value={2}>Option 2</Radio>
</Radio.Group>

// After (Forge)
<forge-radio-group value={value} onForgeChange={onChange}>
  <forge-radio value="1">Option 1</forge-radio>
  <forge-radio value="2">Option 2</forge-radio>
</forge-radio-group>
```

## Browser Support

- Chrome 67+ ✅
- Firefox 63+ ✅
- Safari 10.1+ ✅
- Edge 79+ ✅

## Related Components

- [ForgeCheckbox](./checkbox.md) - Multi-select options
- [ForgeSelect](./select.md) - Dropdown selection
- [ForgeSwitch](./switch.md) - Binary toggle

## Changelog

### Version 1.0.0
- Initial release
- Keyboard navigation
- 3 layout orientations
- Grid layout support
- Custom styling options
- Full accessibility
- AI-ready architecture
- Performance monitoring

## API Playground

Try the component live in our [Storybook](https://forge-ui.dev/storybook/?path=/story/atoms-radio-group)