# ForgeFormField

Comprehensive form field component with label, validation, and multiple layout variants.

## Overview

The ForgeFormField component provides a complete form field solution combining label, input, and validation message display. It supports multiple layout variants including floating labels, inline layouts, and comprehensive validation states.

## Key Features

- **Label Integration**: Automatic label-input association
- **Multiple Variants**: Default, floating, and inline layouts
- **Validation States**: Error, warning, and success states with messages
- **Required/Optional**: Visual indicators for field requirements
- **Help Text**: Contextual assistance for users
- **Accessibility**: Full ARIA compliance and screen reader support
- **AI-Ready**: Comprehensive AI metadata for intelligent form interactions

## Basic Usage

```html
<forge-form-field
  label="Email Address"
  name="email"
  type="email"
  placeholder="Enter your email"
  required
  @input="${handleEmailInput}"
>
</forge-form-field>
```

## Advanced Usage

```html
<forge-form-field
  label="Password"
  name="password"
  type="password"
  variant="floating"
  validation-state="error"
  error-message="Password must be at least 8 characters"
  help-text="Use a mix of letters, numbers, and symbols"
  required
  min-length="8"
  max-length="128"
  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]"
  @input="${handlePasswordInput}"
  @focus="${handlePasswordFocus}"
  @blur="${handlePasswordBlur}"
>
</forge-form-field>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `label` | `string` | `''` | Field label text |
| `name` | `string` | `''` | Input name attribute |
| `value` | `string` | `''` | Input value |
| `placeholder` | `string` | `''` | Input placeholder text |
| `type` | `string` | `'text'` | Input type (text, email, password, etc.) |
| `variant` | `FormFieldVariant` | `'default'` | Layout variant |
| `validation-state` | `FormFieldValidationState` | `'default'` | Current validation state |
| `error-message` | `string` | `''` | Error message text |
| `warning-message` | `string` | `''` | Warning message text |
| `success-message` | `string` | `''` | Success message text |
| `help-text` | `string` | `''` | Help text for guidance |
| `required` | `boolean` | `false` | Whether field is required |
| `show-optional` | `boolean` | `false` | Show "(optional)" for non-required fields |
| `disabled` | `boolean` | `false` | Whether field is disabled |
| `readonly` | `boolean` | `false` | Whether field is read-only |
| `pattern` | `string` | `undefined` | Validation pattern |
| `min-length` | `number` | `undefined` | Minimum input length |
| `max-length` | `number` | `undefined` | Maximum input length |
| `min` | `string` | `undefined` | Minimum value (for number/date inputs) |
| `max` | `string` | `undefined` | Maximum value (for number/date inputs) |

## Types

### FormFieldVariant
```typescript
type FormFieldVariant = 'default' | 'floating' | 'inline';
```

### FormFieldValidationState
```typescript
type FormFieldValidationState = 'default' | 'error' | 'warning' | 'success';
```

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `input` | `{ value: string, name: string }` | Fired on input value change |
| `focus` | `{ name: string }` | Fired when field gains focus |
| `blur` | `{ name: string, value: string }` | Fired when field loses focus |
| `change` | `{ value: string, name: string }` | Fired on input change event |

## Methods

| Method | Description | Returns |
|--------|-------------|---------|
| `focus()` | Focus the input field | `void` |
| `blur()` | Blur the input field | `void` |
| `validate()` | Validate the field | `boolean` |
| `reportValidity()` | Report validation state | `boolean` |

## Layout Variants

### Default Variant
Standard stacked layout with label above input:

```html
<forge-form-field
  variant="default"
  label="Full Name"
  placeholder="Enter your full name"
  required
>
</forge-form-field>
```

### Floating Variant
Label floats above input when focused or filled:

```html
<forge-form-field
  variant="floating"
  label="Email Address"
  type="email"
  required
>
</forge-form-field>
```

The floating label provides space-efficient design and smooth animations.

### Inline Variant
Label and input on the same horizontal line:

```html
<forge-form-field
  variant="inline"
  label="Phone Number"
  type="tel"
  placeholder="(555) 123-4567"
>
</forge-form-field>
```

## Validation States

### Error State
Shows error styling and message:

```html
<forge-form-field
  label="Username"
  validation-state="error"
  error-message="Username is already taken"
  value="john_doe"
>
</forge-form-field>
```

### Warning State
Shows warning styling and message:

```html
<forge-form-field
  label="Password"
  type="password"
  validation-state="warning"
  warning-message="Password strength: Medium"
>
</forge-form-field>
```

### Success State
Shows success styling and message:

```html
<forge-form-field
  label="Email"
  type="email"
  validation-state="success"
  success-message="Email address verified"
>
</forge-form-field>
```

## Required and Optional Indicators

### Required Fields
Show required indicator (*):

```html
<forge-form-field
  label="Required Field"
  required
>
</forge-form-field>
```

### Optional Fields
Show optional indicator when enabled:

```html
<forge-form-field
  label="Optional Field"
  show-optional
>
</forge-form-field>
```

## Help Text and Guidance

Provide contextual help for complex fields:

```html
<forge-form-field
  label="API Key"
  type="password"
  help-text="You can find your API key in the developer settings"
  placeholder="sk-..."
>
</forge-form-field>
```

Help text is hidden when error messages are shown to prevent visual clutter.

## Input Types and Validation

### Email Field
```html
<forge-form-field
  label="Email Address"
  name="email"
  type="email"
  required
  validation-state="error"
  error-message="Please enter a valid email address"
>
</forge-form-field>
```

### Password Field
```html
<forge-form-field
  label="Password"
  name="password"
  type="password"
  required
  min-length="8"
  max-length="128"
  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)"
  help-text="Must contain uppercase, lowercase, and numbers"
>
</forge-form-field>
```

### Number Field
```html
<forge-form-field
  label="Age"
  name="age"
  type="number"
  min="18"
  max="120"
  required
>
</forge-form-field>
```

## Accessibility Features

- **ARIA Labels**: Proper `aria-labelledby` and `aria-describedby`
- **Error Announcements**: `role="alert"` for error messages
- **Focus Management**: Logical focus order and visible indicators
- **Screen Reader**: Meaningful descriptions and state announcements
- **Keyboard Navigation**: Full keyboard support

### ARIA Implementation
```typescript
private getAriaDescribedBy(): string {
  const ids = [];
  if (this.errorMessage) ids.push(`error-${this.name}`);
  if (this.warningMessage) ids.push(`warning-${this.name}`);
  if (this.successMessage) ids.push(`success-${this.name}`);
  if (this.helpText && !this.errorMessage) ids.push(`help-${this.name}`);
  return ids.join(' ');
}
```

## AI Metadata

Comprehensive AI metadata for intelligent form interactions:

```typescript
{
  purpose: 'Form field container with label and validation',
  context: 'form',
  dataType: 'text', // Mapped from input type
  criticality: 'medium',
  semanticRole: 'group',
  interactions: [
    {
      type: 'input',
      description: 'Enter data into the field',
      outcome: 'Updates form data'
    },
    {
      type: 'focus',
      description: 'Focus the input field',
      outcome: 'Activates field for input'
    }
  ]
}
```

### Dynamic AI Data Type Mapping
```typescript
private mapTypeToAIDataType(type: string): AIDataType {
  const typeMap: Record<string, AIDataType> = {
    'text': 'text',
    'password': 'password',
    'email': 'email',
    'number': 'number',
    'tel': 'phone',
    'url': 'url',
    'search': 'text'
  };
  return typeMap[type] || 'text';
}
```

## Performance Features

- Render time tracking and optimization
- Efficient re-rendering strategies
- Performance budget enforcement
- Minimal DOM updates

## Styling

### CSS Custom Properties

```css
:host {
  --field-gap: var(--forge-spacing-sm);
  --label-color: var(--forge-color-text-primary);
  --label-font-size: var(--forge-font-size-sm);
  --label-font-weight: 500;
  --error-color: var(--forge-color-error);
  --warning-color: var(--forge-color-warning);
  --success-color: var(--forge-color-success);
  --help-text-color: var(--forge-color-text-secondary);
  --help-text-font-size: var(--forge-font-size-xs);
}
```

### Variant-Specific Styles

#### Default Variant
```css
.form-field--default {
  display: flex;
  flex-direction: column;
  gap: var(--field-gap);
}
```

#### Floating Variant
```css
.form-field--floating {
  position: relative;
  padding-top: 20px;
}

.form-field--floating .label-container {
  position: absolute;
  top: 50%;
  left: 12px;
  transition: all var(--forge-transition-fast);
}

.form-field--floating.is-filled .label-container,
.form-field--floating.is-focused .label-container {
  top: 10px;
  transform: translateY(-50%) scale(0.85);
}
```

#### Inline Variant
```css
.form-field--inline {
  flex-direction: row;
  align-items: center;
}

.form-field--inline .label-container {
  flex: 0 0 auto;
  min-width: 120px;
}
```

## Form Integration

### Complete Form Example
```html
<form @submit="${handleSubmit}">
  <forge-form-field
    label="First Name"
    name="firstName"
    required
    .value="${formData.firstName}"
    @input="${updateFormData}"
  ></forge-form-field>
  
  <forge-form-field
    label="Last Name"
    name="lastName"
    required
    .value="${formData.lastName}"
    @input="${updateFormData}"
  ></forge-form-field>
  
  <forge-form-field
    label="Email"
    name="email"
    type="email"
    required
    .value="${formData.email}"
    .validationState="${emailValidation.state}"
    .errorMessage="${emailValidation.message}"
    @input="${updateFormData}"
  ></forge-form-field>
  
  <forge-button type="submit" variant="primary">Submit</forge-button>
</form>
```

### Form Validation
```typescript
class FormController {
  private validateField(name: string, value: string): ValidationResult {
    switch (name) {
      case 'email':
        if (!value.includes('@')) {
          return { state: 'error', message: 'Please enter a valid email' };
        }
        return { state: 'success', message: 'Email looks good' };
      
      case 'password':
        if (value.length < 8) {
          return { state: 'error', message: 'Password must be at least 8 characters' };
        }
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          return { state: 'warning', message: 'Consider adding uppercase, lowercase, and numbers' };
        }
        return { state: 'success', message: 'Strong password' };
        
      default:
        return { state: 'default', message: '' };
    }
  }
}
```

## Examples

### Login Form
```html
<form class="login-form">
  <forge-form-field
    label="Username or Email"
    name="login"
    type="text"
    variant="floating"
    required
    @input="${handleLoginInput}"
  ></forge-form-field>
  
  <forge-form-field
    label="Password"
    name="password"
    type="password"
    variant="floating"
    required
    @input="${handlePasswordInput}"
  ></forge-form-field>
  
  <forge-button type="submit" variant="primary" size="large">
    Sign In
  </forge-button>
</form>
```

### Profile Settings
```html
<div class="profile-settings">
  <forge-form-field
    label="Display Name"
    name="displayName"
    variant="inline"
    max-length="50"
    help-text="This is how your name will appear to other users"
  ></forge-form-field>
  
  <forge-form-field
    label="Bio"
    name="bio"
    type="textarea"
    variant="default"
    max-length="500"
    help-text="Tell others about yourself"
    show-optional
  ></forge-form-field>
  
  <forge-form-field
    label="Website"
    name="website"
    type="url"
    variant="inline"
    placeholder="https://example.com"
    show-optional
  ></forge-form-field>
</div>
```

### Validation Showcase
```html
<div class="validation-demo">
  <forge-form-field
    label="Success Example"
    validation-state="success"
    success-message="✓ Validation passed"
    value="valid@example.com"
  ></forge-form-field>
  
  <forge-form-field
    label="Warning Example"
    validation-state="warning"
    warning-message="⚠ Consider using a stronger password"
    type="password"
    value="weak123"
  ></forge-form-field>
  
  <forge-form-field
    label="Error Example"
    validation-state="error"
    error-message="✗ This field is required"
    required
  ></forge-form-field>
</div>
```

## Testing

Comprehensive test coverage includes:

- All variant layouts
- Validation state management
- Input type handling
- Accessibility compliance
- Event handling
- Performance monitoring

```typescript
// Example test
it('should show floating label animation', async () => {
  const formField = await fixture<ForgeFormField>(html`
    <forge-form-field variant="floating" label="Test Label">
    </forge-form-field>
  `);
  
  const input = formField.shadowRoot?.querySelector('forge-input');
  
  // Focus input
  input?.focus();
  await formField.updateComplete;
  
  expect(formField.classList.contains('is-focused')).to.be.true;
  
  // Add value
  input?.setValue('test value');
  await formField.updateComplete;
  
  expect(formField.classList.contains('is-filled')).to.be.true;
});
```

## Best Practices

1. **Label Clarity**: Use clear, descriptive labels
2. **Validation Timing**: Validate on blur, not on every keystroke
3. **Help Text**: Provide guidance for complex fields
4. **Error Messages**: Be specific about what's wrong and how to fix it
5. **Accessibility**: Always test with screen readers

## Browser Support

- Modern browsers with Web Components support
- Graceful degradation for older browsers
- Full keyboard and screen reader support

## Related Components

- [ForgeInput](../atoms/input.md) - Underlying input component
- [ForgeButton](../atoms/button.md) - For form actions
- [ForgeSelect](../atoms/select.md) - For dropdown fields
- [ForgeCheckbox](../atoms/checkbox.md) - For boolean fields