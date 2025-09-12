# ForgeRadioGroup

Flexible radio button group component with unified SSR/client architecture for single-selection forms and exclusive choices.

## Unified SSR Architecture

The ForgeRadioGroup component uses our revolutionary **unified wrapper approach** - a single component that works everywhere without any developer configuration:

- **SSR Environment** (Next.js): Renders semantic HTML `<fieldset>` with native `<input type="radio">` elements
- **Client Environment** (Vite): Renders as web component with enhanced interactivity  
- **Progressive Enhancement**: Seamlessly upgrades from HTML radio group to web component
- **Graceful Degradation**: Falls back to enhanced HTML radio buttons if web components fail

**Single component that works everywhere - no separate SSR/client versions needed.**

## Key Features

- **Native Form Integration**: Full HTML form submission and validation support
- **Flexible Options**: Support for text, custom content, and descriptions
- **Orientation Control**: Horizontal and vertical layout options
- **Size Variants**: Small, medium, and large sizes
- **Validation States**: Error, success, and warning visual states
- **Accessibility**: Complete WCAG 2.1 AA compliance with ARIA support
- **Keyboard Navigation**: Full arrow key navigation between options
- **Custom Styling**: Flexible appearance with CSS custom properties
- **Unified SSR**: Works seamlessly in both SSR and client environments
- **AI-Ready**: Complete AI metadata for intelligent interactions

## Basic Usage

### Import (Works in any React environment)

```tsx
import { ForgeRadioGroup, ForgeRadioOption } from '@nexcraft/forge/integrations/react';

// Same import works in:
// ✅ Next.js App Router (SSR)
// ✅ Next.js Pages Router (SSR) 
// ✅ Vite (Client-only)
// ✅ CRA (Client-only)
// ✅ Any React SSR framework
```

### Basic Radio Groups

```tsx
// Simple radio group
<ForgeRadioGroup 
  name="plan" 
  value={selectedPlan}
  onChange={handlePlanChange}
  legend="Choose your plan"
>
  <ForgeRadioOption value="free">Free Plan</ForgeRadioOption>
  <ForgeRadioOption value="pro">Pro Plan</ForgeRadioOption>
  <ForgeRadioOption value="enterprise">Enterprise Plan</ForgeRadioOption>
</ForgeRadioGroup>

// Horizontal layout
<ForgeRadioGroup 
  name="size" 
  orientation="horizontal"
  legend="Size"
>
  <ForgeRadioOption value="sm">Small</ForgeRadioOption>
  <ForgeRadioOption value="md">Medium</ForgeRadioOption>
  <ForgeRadioOption value="lg">Large</ForgeRadioOption>
</ForgeRadioGroup>

// With descriptions
<ForgeRadioGroup 
  name="shipping" 
  legend="Shipping method"
>
  <ForgeRadioOption value="standard">
    <div>
      <strong>Standard Shipping</strong>
      <p>5-7 business days • Free</p>
    </div>
  </ForgeRadioOption>
  <ForgeRadioOption value="express">
    <div>
      <strong>Express Shipping</strong>
      <p>2-3 business days • $9.99</p>
    </div>
  </ForgeRadioOption>
  <ForgeRadioOption value="overnight">
    <div>
      <strong>Overnight Shipping</strong>
      <p>Next business day • $24.99</p>
    </div>
  </ForgeRadioOption>
</ForgeRadioGroup>
```

### Radio Groups with Validation

```tsx
// Required radio group with error
<ForgeRadioGroup 
  name="terms" 
  required
  error={hasError}
  errorMessage="Please select an option"
  legend="Agreement"
>
  <ForgeRadioOption value="accept">I accept the terms and conditions</ForgeRadioOption>
  <ForgeRadioOption value="decline">I decline the terms and conditions</ForgeRadioOption>
</ForgeRadioGroup>

// Success state
<ForgeRadioGroup 
  name="preference" 
  success
  legend="Notification preference"
>
  <ForgeRadioOption value="email">Email notifications</ForgeRadioOption>
  <ForgeRadioOption value="sms">SMS notifications</ForgeRadioOption>
  <ForgeRadioOption value="none">No notifications</ForgeRadioOption>
</ForgeRadioGroup>
```

## Advanced Usage

### Complex Options with Custom Content

```tsx
function PricingRadioGroup() {
  const [selectedPlan, setSelectedPlan] = useState('');
  
  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: '$9/month',
      features: ['Up to 5 projects', 'Basic support', '1GB storage']
    },
    {
      id: 'professional',
      name: 'Professional',
      price: '$29/month',
      features: ['Unlimited projects', 'Priority support', '10GB storage', 'Advanced analytics'],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Contact us',
      features: ['Everything in Pro', 'Custom integrations', 'Dedicated account manager']
    }
  ];
  
  return (
    <ForgeRadioGroup
      name="plan"
      value={selectedPlan}
      onChange={(value) => setSelectedPlan(value)}
      legend="Choose your plan"
      size="lg"
    >
      {plans.map(plan => (
        <ForgeRadioOption key={plan.id} value={plan.id}>
          <div className="plan-option">
            <div className="plan-header">
              <h3>{plan.name}</h3>
              <span className="plan-price">{plan.price}</span>
              {plan.popular && <ForgeBadge variant="primary">Popular</ForgeBadge>}
            </div>
            <ul className="plan-features">
              {plan.features.map((feature, index) => (
                <li key={index}>
                  <ForgeIcon name="check" size="sm" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </ForgeRadioOption>
      ))}
    </ForgeRadioGroup>
  );
}
```

### Form Integration with Validation

```tsx
function UserPreferencesForm() {
  const [preferences, setPreferences] = useState({
    theme: '',
    notifications: '',
    language: ''
  });
  
  const [errors, setErrors] = useState({});
  
  const handleChange = (name, value) => {
    setPreferences(prev => ({ ...prev, [name]: value }));
    // Clear error when user makes selection
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    if (!preferences.theme) newErrors.theme = 'Please select a theme';
    if (!preferences.notifications) newErrors.notifications = 'Please select notification preference';
    if (!preferences.language) newErrors.language = 'Please select a language';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Preferences:', preferences);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <ForgeRadioGroup
        name="theme"
        value={preferences.theme}
        onChange={(value) => handleChange('theme', value)}
        legend="Theme preference"
        error={!!errors.theme}
        errorMessage={errors.theme}
        required
      >
        <ForgeRadioOption value="light">
          <ForgeIcon slot="start" name="sun" />
          Light theme
        </ForgeRadioOption>
        <ForgeRadioOption value="dark">
          <ForgeIcon slot="start" name="moon" />
          Dark theme
        </ForgeRadioOption>
        <ForgeRadioOption value="auto">
          <ForgeIcon slot="start" name="monitor" />
          Auto (system preference)
        </ForgeRadioOption>
      </ForgeRadioGroup>
      
      <ForgeRadioGroup
        name="notifications"
        value={preferences.notifications}
        onChange={(value) => handleChange('notifications', value)}
        legend="Notification preferences"
        error={!!errors.notifications}
        errorMessage={errors.notifications}
        orientation="horizontal"
        required
      >
        <ForgeRadioOption value="all">All notifications</ForgeRadioOption>
        <ForgeRadioOption value="important">Important only</ForgeRadioOption>
        <ForgeRadioOption value="none">None</ForgeRadioOption>
      </ForgeRadioGroup>
      
      <ForgeButton type="submit">Save Preferences</ForgeButton>
    </form>
  );
}
```

## Properties

### ForgeRadioGroup Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `name` | `string` | `undefined` | Form field name for all radio options |
| `value` | `string` | `undefined` | Currently selected value |
| `legend` | `string` | `undefined` | Fieldset legend text |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Layout orientation |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Radio button size |
| `disabled` | `boolean` | `false` | Disable entire group |
| `required` | `boolean` | `false` | Mark as required field |
| `error` | `boolean` | `false` | Show error state |
| `success` | `boolean` | `false` | Show success state |
| `warning` | `boolean` | `false` | Show warning state |
| `errorMessage` | `string` | `undefined` | Error message text |
| `helpText` | `string` | `undefined` | Help text description |

### ForgeRadioOption Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | `string` | `undefined` | Option value |
| `disabled` | `boolean` | `false` | Disable this option |
| `description` | `string` | `undefined` | Optional description text |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `change` | `{ value: string, name: string }` | Fired when selection changes |
| `focus` | `{ value: string }` | Fired when option receives focus |
| `blur` | `{ value: string }` | Fired when option loses focus |

## Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `selectOption(value)` | `string` | `void` | Programmatically select option |
| `focus()` | - | `void` | Focus the radio group |
| `validate()` | - | `boolean` | Trigger validation |

## SSR Fallback Behavior

In SSR environments, ForgeRadioGroup renders a semantic HTML fieldset with native radio inputs that provides full functionality even without JavaScript:

### Server-Side Rendering
```html
<!-- Radio group rendered during SSR -->
<fieldset class="forge-radio-group forge-radio-group--vertical">
  <legend class="forge-radio-group__legend">Choose your plan</legend>
  
  <div class="forge-radio-group__options">
    <label class="forge-radio-option">
      <input 
        type="radio" 
        name="plan" 
        value="free"
        class="forge-radio-option__input"
      />
      <span class="forge-radio-option__radio" aria-hidden="true"></span>
      <span class="forge-radio-option__label">Free Plan</span>
    </label>
    
    <label class="forge-radio-option">
      <input 
        type="radio" 
        name="plan" 
        value="pro"
        class="forge-radio-option__input"
        checked
      />
      <span class="forge-radio-option__radio" aria-hidden="true"></span>
      <span class="forge-radio-option__label">Pro Plan</span>
    </label>
  </div>
</fieldset>

<!-- Error state -->
<fieldset class="forge-radio-group forge-radio-group--error">
  <legend class="forge-radio-group__legend">Agreement</legend>
  <div class="forge-radio-group__options">
    <!-- Radio options -->
  </div>
  <div class="forge-radio-group__error" role="alert">
    Please select an option
  </div>
</fieldset>
```

### Client-Side Hydration
```html
<!-- After hydration to web component -->
<forge-radio-group name="plan" value="pro" legend="Choose your plan">
  <forge-radio-option value="free">Free Plan</forge-radio-option>
  <forge-radio-option value="pro">Pro Plan</forge-radio-option>
</forge-radio-group>

<forge-radio-group 
  name="agreement" 
  error 
  error-message="Please select an option"
  legend="Agreement">
  <!-- Options -->
</forge-radio-group>
```

## Accessibility

### WCAG 2.1 AA Compliance

- **Keyboard Navigation**: Full arrow key navigation between options
- **Focus Management**: Visible focus indicators and proper focus flow
- **Screen Reader Support**: Fieldset/legend structure with proper labels
- **Form Integration**: Native form submission and validation
- **Error Handling**: Accessible error message association
- **Required Fields**: Proper required field indication

### ARIA Support

```tsx
<ForgeRadioGroup
  name="subscription"
  legend="Subscription type"
  required
  error={hasError}
  errorMessage="Please select a subscription type"
  aria-describedby="subscription-help"
>
  <ForgeRadioOption 
    value="monthly"
    aria-describedby="monthly-desc"
  >
    Monthly subscription
  </ForgeRadioOption>
  <ForgeRadioOption 
    value="yearly"
    aria-describedby="yearly-desc"
  >
    Yearly subscription (save 20%)
  </ForgeRadioOption>
</ForgeRadioGroup>

<div id="subscription-help" className="help-text">
  Choose how often you want to be billed
</div>
<div id="monthly-desc" className="sr-only">
  Billed monthly, cancel anytime
</div>
<div id="yearly-desc" className="sr-only">
  Billed annually, 20% discount applied
</div>
```

### Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Focus radio group or move to next form element |
| `Shift + Tab` | Focus previous form element |
| `Arrow Up/Left` | Select previous option |
| `Arrow Down/Right` | Select next option |
| `Space` | Select focused option |
| `Enter` | Submit form (if in form) |

## Framework Integration

### Next.js App Router (SSR)

```tsx
// app/components/SettingsForm.tsx - Automatic SSR
import { ForgeRadioGroup, ForgeRadioOption } from '@nexcraft/forge/integrations/react';

export default function SettingsForm() {
  return (
    <form>
      <ForgeRadioGroup 
        name="theme" 
        legend="Theme preference"
        defaultValue="auto"
      >
        <ForgeRadioOption value="light">Light</ForgeRadioOption>
        <ForgeRadioOption value="dark">Dark</ForgeRadioOption>
        <ForgeRadioOption value="auto">Auto</ForgeRadioOption>
      </ForgeRadioGroup>
      
      <ForgeRadioGroup 
        name="notifications" 
        legend="Notifications"
        orientation="horizontal"
      >
        <ForgeRadioOption value="email">Email</ForgeRadioOption>
        <ForgeRadioOption value="push">Push</ForgeRadioOption>
        <ForgeRadioOption value="none">None</ForgeRadioOption>
      </ForgeRadioGroup>
      
      <ForgeButton type="submit">Save Settings</ForgeButton>
    </form>
  );
}
```

### Vite/CRA (Client-only)

```tsx
// Same component, automatically renders as web component
import { ForgeRadioGroup, ForgeRadioOption } from '@nexcraft/forge/integrations/react';

function SurveyQuestion({ question, options, onAnswer }) {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  
  const handleAnswerChange = (value) => {
    setSelectedAnswer(value);
    onAnswer(question.id, value);
  };
  
  return (
    <div className="survey-question">
      <ForgeRadioGroup
        name={`question-${question.id}`}
        value={selectedAnswer}
        onChange={handleAnswerChange}
        legend={question.text}
        required={question.required}
      >
        {options.map(option => (
          <ForgeRadioOption key={option.id} value={option.value}>
            {option.label}
          </ForgeRadioOption>
        ))}
      </ForgeRadioGroup>
    </div>
  );
}
```

## Examples

### Payment Method Selection

```tsx
function PaymentMethodSelection() {
  const [paymentMethod, setPaymentMethod] = useState('');
  
  return (
    <ForgeRadioGroup
      name="paymentMethod"
      value={paymentMethod}
      onChange={setPaymentMethod}
      legend="Payment method"
      size="lg"
      required
    >
      <ForgeRadioOption value="card">
        <div className="payment-option">
          <ForgeIcon name="credit-card" size="lg" />
          <div>
            <strong>Credit or Debit Card</strong>
            <p>Visa, Mastercard, American Express</p>
          </div>
        </div>
      </ForgeRadioOption>
      
      <ForgeRadioOption value="paypal">
        <div className="payment-option">
          <ForgeIcon name="paypal" size="lg" />
          <div>
            <strong>PayPal</strong>
            <p>Pay with your PayPal account</p>
          </div>
        </div>
      </ForgeRadioOption>
      
      <ForgeRadioOption value="apple-pay">
        <div className="payment-option">
          <ForgeIcon name="apple" size="lg" />
          <div>
            <strong>Apple Pay</strong>
            <p>Touch ID or Face ID required</p>
          </div>
        </div>
      </ForgeRadioOption>
      
      <ForgeRadioOption value="google-pay">
        <div className="payment-option">
          <ForgeIcon name="google" size="lg" />
          <div>
            <strong>Google Pay</strong>
            <p>Pay with Google Pay</p>
          </div>
        </div>
      </ForgeRadioOption>
    </ForgeRadioGroup>
  );
}
```

### Quiz Component

```tsx
function QuizQuestion({ question, onAnswer, userAnswer }) {
  return (
    <div className="quiz-question">
      <h3>{question.question}</h3>
      
      <ForgeRadioGroup
        name={`question-${question.id}`}
        value={userAnswer || ''}
        onChange={(value) => onAnswer(question.id, value)}
        legend="Choose the correct answer"
        hideLegend
      >
        {question.options.map((option, index) => (
          <ForgeRadioOption 
            key={index} 
            value={option.id}
            disabled={question.answered}
          >
            <span className="option-letter">
              {String.fromCharCode(65 + index)}.
            </span>
            {option.text}
          </ForgeRadioOption>
        ))}
      </ForgeRadioGroup>
      
      {question.answered && (
        <div className="answer-feedback">
          {userAnswer === question.correctAnswer ? (
            <ForgeAlert variant="success">
              <ForgeIcon slot="start" name="check-circle" />
              Correct!
            </ForgeAlert>
          ) : (
            <ForgeAlert variant="error">
              <ForgeIcon slot="start" name="x-circle" />
              Incorrect. The correct answer is {question.correctAnswerText}.
            </ForgeAlert>
          )}
        </div>
      )}
    </div>
  );
}
```

## CSS Custom Properties

```css
forge-radio-group {
  /* Layout */
  --radio-group-gap: 12px;
  --radio-group-legend-margin: 0 0 12px 0;
  --radio-group-legend-font-weight: 500;
  --radio-group-legend-font-size: 14px;
  
  /* Orientation */
  --radio-group-horizontal-gap: 16px;
  
  /* Error styling */
  --radio-group-error-border: 1px solid var(--forge-color-error-500);
  --radio-group-error-bg: var(--forge-color-error-50);
  --radio-group-error-text: var(--forge-color-error-700);
}

forge-radio-option {
  /* Base styles */
  --radio-size: 20px;
  --radio-border-width: 2px;
  --radio-border-radius: 50%;
  --radio-transition: all 0.2s ease;
  --radio-focus-ring: 0 0 0 3px rgba(59, 130, 246, 0.1);
  
  /* Size variants */
  --radio-sm-size: 16px;
  --radio-md-size: 20px;
  --radio-lg-size: 24px;
  
  /* Colors */
  --radio-border-color: var(--forge-color-neutral-300);
  --radio-bg-color: white;
  --radio-checked-bg: var(--forge-color-primary-500);
  --radio-checked-border: var(--forge-color-primary-500);
  --radio-dot-color: white;
  
  /* Hover states */
  --radio-hover-border: var(--forge-color-neutral-400);
  --radio-hover-bg: var(--forge-color-neutral-50);
  
  /* Disabled state */
  --radio-disabled-opacity: 0.5;
  --radio-disabled-cursor: not-allowed;
  
  /* Label styling */
  --radio-label-font-size: 14px;
  --radio-label-color: var(--forge-color-neutral-700);
  --radio-label-spacing: 8px;
  --radio-label-line-height: 1.4;
}
```

## AI Integration

### State Explanation

```typescript
const radioGroup = document.querySelector('forge-radio-group');
console.log(radioGroup.explainState());
// "Radio group with 3 options, 'pro' is selected, required field, no validation errors"
```

### Possible Actions

```typescript
const actions = radioGroup.getPossibleActions();
// [
//   { name: 'selectOption', available: true, description: 'Select a different option' },
//   { name: 'validate', available: true, description: 'Validate current selection' }
// ]
```

## Performance

- **Lightweight**: <4KB gzipped including styles
- **SSR Optimized**: Native HTML fieldset with minimal hydration overhead  
- **Memory Efficient**: Automatic cleanup of event listeners
- **Accessible by Default**: No additional ARIA configuration needed

## Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **SSR Fallback**: Works in any browser with HTML form support
- **Progressive Enhancement**: Full functionality without JavaScript in SSR

## Related Components

- **[ForgeCheckbox](./checkbox.md)** - Multi-select alternative to radio buttons
- **[ForgeSelect](./select.md)** - Dropdown alternative for single selection
- **[ForgeFormField](../molecules/form-field.md)** - Form field wrapper with labels and validation