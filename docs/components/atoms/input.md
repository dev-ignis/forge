# ForgeInput

Flexible input component with unified SSR/client architecture for text entry, form validation, and user data collection.

## Unified SSR Architecture

The ForgeInput component uses our revolutionary **unified wrapper approach** - a single component that works everywhere without any developer configuration:

- **SSR Environment** (Next.js): Renders semantic HTML `<input>` with critical styling and validation
- **Client Environment** (Vite): Renders as web component with enhanced interactivity  
- **Progressive Enhancement**: Seamlessly upgrades from HTML input to web component
- **Graceful Degradation**: Falls back to enhanced HTML input if web components fail

**Single component that works everywhere - no separate SSR/client versions needed.**

## Key Features

- **Multiple Types**: Text, email, password, number, search, tel, url, and more
- **Validation States**: Built-in error, success, and warning states
- **Icon Support**: Start and end icons with proper spacing
- **Size Variants**: Small, medium, and large sizes
- **Native Form Integration**: Full HTML form submission and validation
- **Accessibility**: Complete WCAG 2.1 AA compliance
- **Auto-complete Support**: Native browser autocomplete integration
- **Masking Support**: Input masking for formatted data entry
- **Unified SSR**: Works seamlessly in both SSR and client environments
- **AI-Ready**: Complete AI metadata for intelligent interactions

## Basic Usage

### Import (Works in any React environment)

```tsx
import { ForgeInput } from '@nexcraft/forge/integrations/react';

// Same import works in:
// ✅ Next.js App Router (SSR)
// ✅ Next.js Pages Router (SSR) 
// ✅ Vite (Client-only)
// ✅ CRA (Client-only)
// ✅ Any React SSR framework
```

### Basic Inputs

```tsx
// Text input
<ForgeInput 
  name="username"
  placeholder="Enter username"
  onChange={handleUsernameChange}
/>

// Email input with validation
<ForgeInput 
  type="email"
  name="email"
  placeholder="your@email.com"
  required
  onChange={handleEmailChange}
/>

// Password input
<ForgeInput 
  type="password"
  name="password"
  placeholder="Enter password"
  minLength={8}
  required
/>

// Number input
<ForgeInput 
  type="number"
  name="age"
  placeholder="Age"
  min={0}
  max={120}
  step={1}
/>
```

### Inputs with Icons

```tsx
// Search input with icon
<ForgeInput 
  type="search"
  placeholder="Search..."
  startIcon="search"
  onChange={handleSearch}
/>

// Email input with validation icon
<ForgeInput 
  type="email"
  name="email"
  placeholder="Email address"
  startIcon="mail"
  endIcon={isValid ? "check" : undefined}
  success={isValid}
/>

// Password input with toggle visibility
<ForgeInput 
  type={showPassword ? "text" : "password"}
  name="password"
  placeholder="Password"
  startIcon="lock"
  endIcon={showPassword ? "eye-off" : "eye"}
  onEndIconClick={() => setShowPassword(!showPassword)}
/>
```

## Advanced Usage

### Form Validation

```tsx
function SignupForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  
  const validateField = (name, value) => {
    switch (name) {
      case 'username':
        return value.length < 3 ? 'Username must be at least 3 characters' : '';
      case 'email':
        return !/\S+@\S+\.\S+/.test(value) ? 'Invalid email format' : '';
      case 'password':
        return value.length < 8 ? 'Password must be at least 8 characters' : '';
      case 'confirmPassword':
        return value !== formData.password ? 'Passwords do not match' : '';
      default:
        return '';
    }
  };
  
  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };
  
  const handleBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  };
  
  return (
    <form>
      <ForgeInput
        name="username"
        placeholder="Username"
        value={formData.username}
        error={!!errors.username}
        errorMessage={errors.username}
        success={touched.username && !errors.username}
        onChange={(e) => handleChange('username', e.target.value)}
        onBlur={() => handleBlur('username')}
        startIcon="user"
      />
      
      <ForgeInput
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        error={!!errors.email}
        errorMessage={errors.email}
        success={touched.email && !errors.email}
        onChange={(e) => handleChange('email', e.target.value)}
        onBlur={() => handleBlur('email')}
        startIcon="mail"
      />
      
      <ForgeInput
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        error={!!errors.password}
        errorMessage={errors.password}
        success={touched.password && !errors.password}
        onChange={(e) => handleChange('password', e.target.value)}
        onBlur={() => handleBlur('password')}
        startIcon="lock"
      />
      
      <ForgeButton type="submit" disabled={Object.keys(errors).some(key => errors[key])}>
        Sign Up
      </ForgeButton>
    </form>
  );
}
```

### Masked Inputs

```tsx
// Phone number input with masking
<ForgeInput
  type="tel"
  name="phone"
  placeholder="Phone number"
  mask="(000) 000-0000"
  startIcon="phone"
  onChange={handlePhoneChange}
/>

// Credit card input
<ForgeInput
  type="text"
  name="creditCard"
  placeholder="Credit card number"
  mask="0000 0000 0000 0000"
  startIcon="credit-card"
  onChange={handleCardChange}
/>

// Date input with masking
<ForgeInput
  type="text"
  name="birthdate"
  placeholder="MM/DD/YYYY"
  mask="00/00/0000"
  startIcon="calendar"
  onChange={handleDateChange}
/>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `type` | `'text' \| 'email' \| 'password' \| 'number' \| 'search' \| 'tel' \| 'url' \| 'date' \| 'time' \| 'datetime-local'` | `'text'` | Input type |
| `name` | `string` | `undefined` | Form field name |
| `value` | `string \| number` | `undefined` | Input value |
| `placeholder` | `string` | `undefined` | Placeholder text |
| `disabled` | `boolean` | `false` | Disable input interactions |
| `readonly` | `boolean` | `false` | Make input read-only |
| `required` | `boolean` | `false` | Mark as required field |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Input size |
| `error` | `boolean` | `false` | Show error state |
| `success` | `boolean` | `false` | Show success state |
| `warning` | `boolean` | `false` | Show warning state |
| `errorMessage` | `string` | `undefined` | Error message text |
| `helpText` | `string` | `undefined` | Help text description |
| `startIcon` | `string` | `undefined` | Icon name for start position |
| `endIcon` | `string` | `undefined` | Icon name for end position |
| `mask` | `string` | `undefined` | Input mask pattern |
| `autoFocus` | `boolean` | `false` | Auto-focus on mount |
| `autoComplete` | `string` | `undefined` | Browser autocomplete hint |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `change` | `{ value: string \| number, name: string }` | Fired when input value changes |
| `input` | `{ value: string \| number, name: string }` | Fired on every input |
| `focus` | `FocusEvent` | Fired when input receives focus |
| `blur` | `FocusEvent` | Fired when input loses focus |
| `keypress` | `KeyboardEvent` | Fired on key press |
| `start-icon-click` | `MouseEvent` | Fired when start icon is clicked |
| `end-icon-click` | `MouseEvent` | Fired when end icon is clicked |

## Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `focus(options?)` | `FocusOptions` | `void` | Focus the input |
| `blur()` | - | `void` | Remove focus from input |
| `select()` | - | `void` | Select all text in input |
| `setCustomValidity(message)` | `string` | `void` | Set custom validation message |
| `reportValidity()` | - | `boolean` | Trigger validation UI |

## SSR Fallback Behavior

In SSR environments, ForgeInput renders a semantic HTML input that provides full functionality even without JavaScript:

### Server-Side Rendering
```html
<!-- Text input rendered during SSR -->
<div class="forge-input forge-input--md">
  <div class="forge-input__container">
    <span class="forge-input__start-icon" aria-hidden="true">👤</span>
    <input 
      type="text"
      name="username"
      placeholder="Enter username"
      class="forge-input__field"
      required
    />
  </div>
</div>

<!-- Input with error state -->
<div class="forge-input forge-input--error">
  <div class="forge-input__container">
    <input 
      type="email"
      name="email"
      class="forge-input__field"
      aria-describedby="email-error"
      aria-invalid="true"
    />
  </div>
  <div id="email-error" class="forge-input__error">
    Please enter a valid email address
  </div>
</div>
```

### Client-Side Hydration
```html
<!-- After hydration to web component -->
<forge-input 
  name="username" 
  placeholder="Enter username" 
  start-icon="user" 
  required>
</forge-input>

<forge-input 
  type="email" 
  name="email" 
  error 
  error-message="Please enter a valid email address">
</forge-input>
```

## Accessibility

### WCAG 2.1 AA Compliance

- **Keyboard Navigation**: Full Tab, Arrow key support
- **Focus Management**: Visible focus indicators
- **Screen Reader Support**: Proper labels and descriptions
- **Form Integration**: Native form submission and validation
- **Error Handling**: Accessible error message association
- **Required Fields**: Proper required field indication

### ARIA Support

```tsx
<ForgeInput
  type="email"
  name="email"
  placeholder="Email address"
  required
  error={hasError}
  errorMessage="Please enter a valid email address"
  aria-describedby="email-help email-error"
  aria-invalid={hasError}
/>

<div id="email-help" className="help-text">
  We'll use this to send you important updates
</div>
```

### Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Focus input |
| `Shift + Tab` | Focus previous element |
| `Enter` | Submit form (if in form) |
| `Escape` | Clear selection / blur |
| `Ctrl/Cmd + A` | Select all text |
| `Arrow Keys` | Move cursor |

## Framework Integration

### Next.js App Router (SSR)

```tsx
// app/components/ContactForm.tsx - Automatic SSR
import { ForgeInput } from '@nexcraft/forge/integrations/react';

export default function ContactForm() {
  return (
    <form>
      <ForgeInput
        name="name"
        placeholder="Your name"
        required
        startIcon="user"
        autoComplete="name"
      />
      
      <ForgeInput
        type="email"
        name="email"
        placeholder="Email address"
        required
        startIcon="mail"
        autoComplete="email"
      />
      
      <ForgeInput
        type="tel"
        name="phone"
        placeholder="Phone number"
        startIcon="phone"
        autoComplete="tel"
      />
      
      <ForgeButton type="submit">Send Message</ForgeButton>
    </form>
  );
}
```

### Vite/CRA (Client-only)

```tsx
// Same component, automatically renders as web component
import { ForgeInput } from '@nexcraft/forge/integrations/react';

function SearchBox() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  
  const handleSearch = async (value) => {
    setQuery(value);
    if (value.length > 2) {
      const searchResults = await searchAPI(value);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  };
  
  return (
    <div className="search-box">
      <ForgeInput
        type="search"
        placeholder="Search products..."
        value={query}
        startIcon="search"
        onChange={(e) => handleSearch(e.target.value)}
        size="lg"
      />
      
      {results.length > 0 && (
        <div className="search-results">
          {results.map(result => (
            <div key={result.id} className="search-result">
              {result.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

## Examples

### Login Form

```tsx
function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  
  return (
    <form onSubmit={handleLogin}>
      <ForgeInput
        type="email"
        name="email"
        placeholder="Email address"
        value={credentials.email}
        onChange={(e) => setCredentials(prev => ({ 
          ...prev, 
          email: e.target.value 
        }))}
        startIcon="mail"
        autoComplete="email"
        required
      />
      
      <ForgeInput
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) => setCredentials(prev => ({ 
          ...prev, 
          password: e.target.value 
        }))}
        startIcon="lock"
        endIcon={showPassword ? "eye-off" : "eye"}
        onEndIconClick={() => setShowPassword(!showPassword)}
        autoComplete="current-password"
        required
      />
      
      <ForgeButton type="submit" fullWidth>
        Sign In
      </ForgeButton>
    </form>
  );
}
```

### Payment Form

```tsx
function PaymentForm() {
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: ''
  });
  
  return (
    <form className="payment-form">
      <ForgeInput
        name="cardName"
        placeholder="Cardholder name"
        value={paymentData.name}
        onChange={(e) => setPaymentData(prev => ({ 
          ...prev, 
          name: e.target.value 
        }))}
        startIcon="user"
        autoComplete="cc-name"
        required
      />
      
      <ForgeInput
        type="text"
        name="cardNumber"
        placeholder="Card number"
        value={paymentData.cardNumber}
        mask="0000 0000 0000 0000"
        onChange={(e) => setPaymentData(prev => ({ 
          ...prev, 
          cardNumber: e.target.value 
        }))}
        startIcon="credit-card"
        autoComplete="cc-number"
        required
      />
      
      <div className="form-row">
        <ForgeInput
          type="text"
          name="expiryDate"
          placeholder="MM/YY"
          value={paymentData.expiryDate}
          mask="00/00"
          onChange={(e) => setPaymentData(prev => ({ 
            ...prev, 
            expiryDate: e.target.value 
          }))}
          startIcon="calendar"
          autoComplete="cc-exp"
          required
        />
        
        <ForgeInput
          type="text"
          name="cvv"
          placeholder="CVV"
          value={paymentData.cvv}
          mask="000"
          onChange={(e) => setPaymentData(prev => ({ 
            ...prev, 
            cvv: e.target.value 
          }))}
          startIcon="shield"
          autoComplete="cc-csc"
          required
        />
      </div>
      
      <ForgeButton type="submit" variant="primary" fullWidth>
        Complete Payment
      </ForgeButton>
    </form>
  );
}
```

### Address Form

```tsx
function AddressForm() {
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });
  
  return (
    <form className="address-form">
      <ForgeInput
        name="street"
        placeholder="Street address"
        value={address.street}
        onChange={(e) => setAddress(prev => ({ 
          ...prev, 
          street: e.target.value 
        }))}
        startIcon="map-pin"
        autoComplete="street-address"
        required
      />
      
      <div className="form-row">
        <ForgeInput
          name="city"
          placeholder="City"
          value={address.city}
          onChange={(e) => setAddress(prev => ({ 
            ...prev, 
            city: e.target.value 
          }))}
          autoComplete="address-level2"
          required
        />
        
        <ForgeInput
          name="state"
          placeholder="State"
          value={address.state}
          onChange={(e) => setAddress(prev => ({ 
            ...prev, 
            state: e.target.value 
          }))}
          autoComplete="address-level1"
          required
        />
      </div>
      
      <div className="form-row">
        <ForgeInput
          name="zipCode"
          placeholder="ZIP code"
          value={address.zipCode}
          onChange={(e) => setAddress(prev => ({ 
            ...prev, 
            zipCode: e.target.value 
          }))}
          autoComplete="postal-code"
          required
        />
        
        <ForgeSelect
          name="country"
          placeholder="Country"
          value={address.country}
          onChange={(value) => setAddress(prev => ({ 
            ...prev, 
            country: value 
          }))}
          autoComplete="country"
          required
        >
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="UK">United Kingdom</option>
        </ForgeSelect>
      </div>
      
      <ForgeButton type="submit">Save Address</ForgeButton>
    </form>
  );
}
```

## CSS Custom Properties

```css
forge-input {
  /* Base styles */
  --input-border-radius: 6px;
  --input-border-width: 1px;
  --input-transition: all 0.2s ease;
  --input-font-family: inherit;
  --input-font-weight: 400;
  
  /* Size variants */
  --input-sm-height: 32px;
  --input-sm-padding: 0 8px;
  --input-sm-font-size: 13px;
  
  --input-md-height: 40px;
  --input-md-padding: 0 12px;
  --input-md-font-size: 14px;
  
  --input-lg-height: 48px;
  --input-lg-padding: 0 16px;
  --input-lg-font-size: 16px;
  
  /* Colors */
  --input-bg: white;
  --input-border: var(--forge-color-neutral-300);
  --input-text: var(--forge-color-neutral-900);
  --input-placeholder: var(--forge-color-neutral-500);
  
  /* Focus state */
  --input-focus-border: var(--forge-color-primary-500);
  --input-focus-ring: 0 0 0 3px rgba(59, 130, 246, 0.1);
  --input-focus-bg: white;
  
  /* Hover state */
  --input-hover-border: var(--forge-color-neutral-400);
  
  /* Error state */
  --input-error-border: var(--forge-color-error-500);
  --input-error-bg: var(--forge-color-error-50);
  --input-error-text: var(--forge-color-error-700);
  
  /* Success state */
  --input-success-border: var(--forge-color-success-500);
  --input-success-bg: var(--forge-color-success-50);
  --input-success-text: var(--forge-color-success-700);
  
  /* Warning state */
  --input-warning-border: var(--forge-color-warning-500);
  --input-warning-bg: var(--forge-color-warning-50);
  --input-warning-text: var(--forge-color-warning-700);
  
  /* Disabled state */
  --input-disabled-bg: var(--forge-color-neutral-100);
  --input-disabled-border: var(--forge-color-neutral-200);
  --input-disabled-text: var(--forge-color-neutral-400);
  --input-disabled-cursor: not-allowed;
  
  /* Icons */
  --input-icon-color: var(--forge-color-neutral-400);
  --input-icon-size: 16px;
  --input-icon-spacing: 8px;
  
  /* Helper text */
  --input-help-font-size: 12px;
  --input-help-color: var(--forge-color-neutral-600);
  --input-error-message-color: var(--forge-color-error-600);
}
```

## AI Integration

### State Explanation

```typescript
const input = document.querySelector('forge-input');
console.log(input.explainState());
// "Text input with username, currently focused, no validation errors, ready for user input"
```

### Possible Actions

```typescript
const actions = input.getPossibleActions();
// [
//   { name: 'focus', available: true, description: 'Focus the input field' },
//   { name: 'select', available: true, description: 'Select all text in the input' },
//   { name: 'clear', available: true, description: 'Clear the input value' }
// ]
```

## Performance

- **Lightweight**: <4KB gzipped including styles and masking
- **SSR Optimized**: Native HTML input with minimal hydration overhead
- **Memory Efficient**: Automatic cleanup of event listeners and timers
- **Debounced Validation**: Configurable validation debouncing for performance

## Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **SSR Fallback**: Works in any browser with HTML form support
- **Progressive Enhancement**: Full functionality without JavaScript in SSR
- **Mobile Support**: Touch-friendly with native mobile keyboards

## Related Components

- **[ForgeButton](./button.md)** - Submit and action buttons for forms
- **[ForgeSelect](./select.md)** - Dropdown selection alternative to text input
- **[ForgeFormField](../molecules/form-field.md)** - Form field wrapper with labels and validation