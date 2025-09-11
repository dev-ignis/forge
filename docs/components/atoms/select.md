# ForgeSelect

Flexible dropdown selection component with unified SSR/client architecture for single-value choices and form integration.

## Unified SSR Architecture

The ForgeSelect component uses our revolutionary **unified wrapper approach** - a single component that works everywhere without any developer configuration:

- **SSR Environment** (Next.js): Renders semantic HTML `<select>` with native options and critical styling
- **Client Environment** (Vite): Renders as web component with enhanced UI and search functionality  
- **Progressive Enhancement**: Seamlessly upgrades from HTML select to web component
- **Graceful Degradation**: Falls back to enhanced HTML select if web components fail

**Single component that works everywhere - no separate SSR/client versions needed.**

## Key Features

- **Native Form Integration**: Full HTML form submission and validation support
- **Search and Filter**: Built-in search functionality for large option sets
- **Custom Styling**: Enhanced visual design while maintaining accessibility
- **Icon Support**: Icons in options and trigger button
- **Placeholder Support**: Customizable placeholder text
- **Validation States**: Error, success, and warning visual states
- **Size Variants**: Small, medium, and large sizes
- **Accessibility**: Complete WCAG 2.1 AA compliance with keyboard navigation
- **Unified SSR**: Works seamlessly in both SSR and client environments
- **AI-Ready**: Complete AI metadata for intelligent interactions

## Basic Usage

### Import (Works in any React environment)

```tsx
import { ForgeSelect } from '@nexcraft/forge/integrations/react';

// Same import works in:
// ✅ Next.js App Router (SSR)
// ✅ Next.js Pages Router (SSR) 
// ✅ Vite (Client-only)
// ✅ CRA (Client-only)
// ✅ Any React SSR framework
```

### Basic Select

```tsx
// Simple select
<ForgeSelect 
  name="country"
  placeholder="Select country"
  onChange={handleCountryChange}
>
  <option value="us">United States</option>
  <option value="ca">Canada</option>
  <option value="uk">United Kingdom</option>
  <option value="de">Germany</option>
  <option value="fr">France</option>
</ForgeSelect>

// Select with default value
<ForgeSelect 
  name="language"
  value={selectedLanguage}
  onChange={handleLanguageChange}
>
  <option value="">Select language</option>
  <option value="en">English</option>
  <option value="es">Spanish</option>
  <option value="fr">French</option>
  <option value="de">German</option>
</ForgeSelect>

// Required select with validation
<ForgeSelect 
  name="category"
  required
  error={hasError}
  errorMessage="Please select a category"
>
  <option value="">Choose category</option>
  <option value="electronics">Electronics</option>
  <option value="clothing">Clothing</option>
  <option value="books">Books</option>
  <option value="home">Home & Garden</option>
</ForgeSelect>
```

### Select with Search

```tsx
// Searchable select for large datasets
<ForgeSelect 
  name="city"
  placeholder="Search for a city"
  searchable
  searchPlaceholder="Type to search cities..."
  onChange={handleCityChange}
>
  <option value="new-york">New York</option>
  <option value="los-angeles">Los Angeles</option>
  <option value="chicago">Chicago</option>
  <option value="houston">Houston</option>
  <option value="phoenix">Phoenix</option>
  <option value="philadelphia">Philadelphia</option>
  <option value="san-antonio">San Antonio</option>
  <option value="san-diego">San Diego</option>
  <option value="dallas">Dallas</option>
  <option value="san-jose">San Jose</option>
</ForgeSelect>
```

## Advanced Usage

### Select with Icons and Descriptions

```tsx
function PaymentMethodSelect() {
  const [paymentMethod, setPaymentMethod] = useState('');
  
  return (
    <ForgeSelect
      name="paymentMethod"
      value={paymentMethod}
      onChange={setPaymentMethod}
      placeholder="Select payment method"
      size="lg"
    >
      <option value="card" data-icon="credit-card">
        Credit Card
      </option>
      <option value="paypal" data-icon="paypal">
        PayPal
      </option>
      <option value="apple-pay" data-icon="apple">
        Apple Pay
      </option>
      <option value="google-pay" data-icon="google">
        Google Pay
      </option>
      <option value="bank" data-icon="bank">
        Bank Transfer
      </option>
    </ForgeSelect>
  );
}
```

### Dynamic Options with API Data

```tsx
function CountrySelect() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState('');
  
  useEffect(() => {
    fetchCountries()
      .then(data => {
        setCountries(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to load countries:', error);
        setLoading(false);
      });
  }, []);
  
  if (loading) {
    return (
      <ForgeSelect disabled placeholder="Loading countries...">
        <option value="">Loading...</option>
      </ForgeSelect>
    );
  }
  
  return (
    <ForgeSelect
      name="country"
      value={selectedCountry}
      onChange={setSelectedCountry}
      placeholder="Select your country"
      searchable
      searchPlaceholder="Search countries..."
    >
      <option value="">Select country</option>
      {countries.map(country => (
        <option key={country.code} value={country.code}>
          {country.name}
        </option>
      ))}
    </ForgeSelect>
  );
}
```

### Form Integration with Validation

```tsx
function ProfileForm() {
  const [profile, setProfile] = useState({
    title: '',
    department: '',
    location: '',
    timezone: ''
  });
  
  const [errors, setErrors] = useState({});
  
  const handleSelectChange = (name, value) => {
    setProfile(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user makes selection
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validate = () => {
    const newErrors = {};
    if (!profile.title) newErrors.title = 'Title is required';
    if (!profile.department) newErrors.department = 'Department is required';
    if (!profile.location) newErrors.location = 'Location is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Profile:', profile);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <ForgeSelect
        name="title"
        value={profile.title}
        onChange={(value) => handleSelectChange('title', value)}
        placeholder="Select title"
        required
        error={!!errors.title}
        errorMessage={errors.title}
      >
        <option value="">Choose title</option>
        <option value="mr">Mr.</option>
        <option value="ms">Ms.</option>
        <option value="mrs">Mrs.</option>
        <option value="dr">Dr.</option>
        <option value="prof">Prof.</option>
      </ForgeSelect>
      
      <ForgeSelect
        name="department"
        value={profile.department}
        onChange={(value) => handleSelectChange('department', value)}
        placeholder="Select department"
        required
        error={!!errors.department}
        errorMessage={errors.department}
        searchable
      >
        <option value="">Choose department</option>
        <option value="engineering">Engineering</option>
        <option value="marketing">Marketing</option>
        <option value="sales">Sales</option>
        <option value="support">Customer Support</option>
        <option value="hr">Human Resources</option>
        <option value="finance">Finance</option>
        <option value="operations">Operations</option>
      </ForgeSelect>
      
      <ForgeSelect
        name="timezone"
        value={profile.timezone}
        onChange={(value) => handleSelectChange('timezone', value)}
        placeholder="Select timezone"
        searchable
        searchPlaceholder="Search timezones..."
      >
        <option value="">Choose timezone</option>
        <option value="EST">Eastern Time (EST)</option>
        <option value="CST">Central Time (CST)</option>
        <option value="MST">Mountain Time (MST)</option>
        <option value="PST">Pacific Time (PST)</option>
        <option value="GMT">Greenwich Mean Time (GMT)</option>
        <option value="CET">Central European Time (CET)</option>
      </ForgeSelect>
      
      <ForgeButton type="submit">Save Profile</ForgeButton>
    </form>
  );
}
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `name` | `string` | `undefined` | Form field name |
| `value` | `string` | `undefined` | Selected value |
| `placeholder` | `string` | `undefined` | Placeholder text |
| `disabled` | `boolean` | `false` | Disable select interactions |
| `required` | `boolean` | `false` | Mark as required field |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Select size |
| `error` | `boolean` | `false` | Show error state |
| `success` | `boolean` | `false` | Show success state |
| `warning` | `boolean` | `false` | Show warning state |
| `errorMessage` | `string` | `undefined` | Error message text |
| `helpText` | `string` | `undefined` | Help text description |
| `searchable` | `boolean` | `false` | Enable search functionality |
| `searchPlaceholder` | `string` | `'Search...'` | Search input placeholder |
| `clearable` | `boolean` | `false` | Show clear button |
| `loading` | `boolean` | `false` | Show loading state |
| `multiple` | `boolean` | `false` | Enable multiple selection |
| `maxHeight` | `string` | `'300px'` | Maximum dropdown height |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `change` | `{ value: string, name: string, option: HTMLOptionElement }` | Fired when selection changes |
| `search` | `{ query: string }` | Fired when user types in search |
| `open` | `void` | Fired when dropdown opens |
| `close` | `void` | Fired when dropdown closes |
| `focus` | `FocusEvent` | Fired when select receives focus |
| `blur` | `FocusEvent` | Fired when select loses focus |

## Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `open()` | - | `void` | Open the dropdown |
| `close()` | - | `void` | Close the dropdown |
| `focus()` | - | `void` | Focus the select |
| `clear()` | - | `void` | Clear the selection |
| `selectOption(value)` | `string` | `void` | Programmatically select option |

## SSR Fallback Behavior

In SSR environments, ForgeSelect renders a semantic HTML select that provides full functionality even without JavaScript:

### Server-Side Rendering
```html
<!-- Basic select rendered during SSR -->
<div class="forge-select forge-select--md">
  <select name="country" class="forge-select__native" required>
    <option value="" disabled selected>Select country</option>
    <option value="us">United States</option>
    <option value="ca">Canada</option>
    <option value="uk">United Kingdom</option>
    <option value="de">Germany</option>
    <option value="fr">France</option>
  </select>
  <div class="forge-select__icon" aria-hidden="true">
    <svg><!-- Chevron down icon --></svg>
  </div>
</div>

<!-- Select with error state -->
<div class="forge-select forge-select--error">
  <select 
    name="category" 
    class="forge-select__native" 
    required
    aria-describedby="category-error"
    aria-invalid="true"
  >
    <option value="">Choose category</option>
    <option value="electronics">Electronics</option>
    <option value="clothing">Clothing</option>
  </select>
  <div class="forge-select__icon" aria-hidden="true">
    <svg><!-- Chevron down icon --></svg>
  </div>
  <div id="category-error" class="forge-select__error">
    Please select a category
  </div>
</div>
```

### Client-Side Hydration
```html
<!-- After hydration to web component -->
<forge-select name="country" placeholder="Select country" required>
  <option value="us">United States</option>
  <option value="ca">Canada</option>
  <option value="uk">United Kingdom</option>
</forge-select>

<forge-select 
  name="category" 
  error 
  error-message="Please select a category"
  required>
  <option value="">Choose category</option>
  <option value="electronics">Electronics</option>
  <option value="clothing">Clothing</option>
</forge-select>
```

## Accessibility

### WCAG 2.1 AA Compliance

- **Keyboard Navigation**: Full Tab, Arrow key, Enter, Escape support
- **Focus Management**: Proper focus indicators and focus trapping in dropdown
- **Screen Reader Support**: Native select semantics with ARIA enhancements
- **Form Integration**: Native form submission and validation
- **Error Handling**: Accessible error message association
- **Search Functionality**: Accessible search with live results announcement

### ARIA Support

```tsx
<ForgeSelect
  name="priority"
  placeholder="Select priority level"
  required
  aria-describedby="priority-help priority-error"
  error={hasError}
  errorMessage="Priority level is required"
>
  <option value="low">Low priority</option>
  <option value="medium">Medium priority</option>
  <option value="high">High priority</option>
  <option value="urgent">Urgent priority</option>
</ForgeSelect>

<div id="priority-help" className="help-text">
  Choose the appropriate priority level for this task
</div>
```

### Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Focus select or move to next element |
| `Shift + Tab` | Focus previous element |
| `Space` / `Enter` | Open/close dropdown |
| `Arrow Up/Down` | Navigate options |
| `Home` | Go to first option |
| `End` | Go to last option |
| `Escape` | Close dropdown |
| `A-Z` | Jump to option starting with letter |

## Framework Integration

### Next.js App Router (SSR)

```tsx
// app/components/LocationSelector.tsx - Automatic SSR
import { ForgeSelect } from '@nexcraft/forge/integrations/react';

export default function LocationSelector({ countries, states, cities }) {
  return (
    <div className="location-selector">
      <ForgeSelect name="country" placeholder="Select country" required>
        <option value="">Choose country</option>
        {countries.map(country => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </ForgeSelect>
      
      <ForgeSelect name="state" placeholder="Select state" required>
        <option value="">Choose state</option>
        {states.map(state => (
          <option key={state.code} value={state.code}>
            {state.name}
          </option>
        ))}
      </ForgeSelect>
      
      <ForgeSelect name="city" placeholder="Select city" searchable>
        <option value="">Choose city</option>
        {cities.map(city => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </ForgeSelect>
    </div>
  );
}
```

### Vite/CRA (Client-only)

```tsx
// Same component, automatically renders as web component
import { ForgeSelect } from '@nexcraft/forge/integrations/react';

function FilterControls({ onFilterChange }) {
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    brand: '',
    rating: ''
  });
  
  const handleFilterChange = (name, value) => {
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  return (
    <div className="filter-controls">
      <ForgeSelect
        name="category"
        value={filters.category}
        onChange={(value) => handleFilterChange('category', value)}
        placeholder="All categories"
        clearable
      >
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
        <option value="books">Books</option>
        <option value="home">Home & Garden</option>
      </ForgeSelect>
      
      <ForgeSelect
        name="priceRange"
        value={filters.priceRange}
        onChange={(value) => handleFilterChange('priceRange', value)}
        placeholder="Any price"
        clearable
      >
        <option value="0-25">$0 - $25</option>
        <option value="25-50">$25 - $50</option>
        <option value="50-100">$50 - $100</option>
        <option value="100+">$100+</option>
      </ForgeSelect>
      
      <ForgeSelect
        name="rating"
        value={filters.rating}
        onChange={(value) => handleFilterChange('rating', value)}
        placeholder="Any rating"
        clearable
      >
        <option value="4+">4+ Stars</option>
        <option value="3+">3+ Stars</option>
        <option value="2+">2+ Stars</option>
        <option value="1+">1+ Stars</option>
      </ForgeSelect>
    </div>
  );
}
```

## Examples

### Multi-Step Form Select Chain

```tsx
function AddressForm() {
  const [address, setAddress] = useState({
    country: '',
    state: '',
    city: ''
  });
  
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  
  useEffect(() => {
    if (address.country) {
      fetchStatesByCountry(address.country).then(setStates);
      setAddress(prev => ({ ...prev, state: '', city: '' }));
      setCities([]);
    }
  }, [address.country]);
  
  useEffect(() => {
    if (address.state) {
      fetchCitiesByState(address.state).then(setCities);
      setAddress(prev => ({ ...prev, city: '' }));
    }
  }, [address.state]);
  
  return (
    <form>
      <ForgeSelect
        name="country"
        value={address.country}
        onChange={(value) => setAddress(prev => ({ ...prev, country: value }))}
        placeholder="Select country"
        required
      >
        <option value="">Choose country</option>
        <option value="US">United States</option>
        <option value="CA">Canada</option>
        <option value="UK">United Kingdom</option>
      </ForgeSelect>
      
      <ForgeSelect
        name="state"
        value={address.state}
        onChange={(value) => setAddress(prev => ({ ...prev, state: value }))}
        placeholder="Select state"
        disabled={!address.country}
        required
      >
        <option value="">Choose state</option>
        {states.map(state => (
          <option key={state.code} value={state.code}>
            {state.name}
          </option>
        ))}
      </ForgeSelect>
      
      <ForgeSelect
        name="city"
        value={address.city}
        onChange={(value) => setAddress(prev => ({ ...prev, city: value }))}
        placeholder="Select city"
        disabled={!address.state}
        searchable
        searchPlaceholder="Search cities..."
      >
        <option value="">Choose city</option>
        {cities.map(city => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </ForgeSelect>
    </form>
  );
}
```

## CSS Custom Properties

```css
forge-select {
  /* Base styles */
  --select-border-radius: 6px;
  --select-border-width: 1px;
  --select-transition: all 0.2s ease;
  --select-font-family: inherit;
  --select-font-weight: 400;
  --select-min-height: 40px;
  
  /* Size variants */
  --select-sm-height: 32px;
  --select-sm-padding: 0 32px 0 8px;
  --select-sm-font-size: 13px;
  
  --select-md-height: 40px;
  --select-md-padding: 0 40px 0 12px;
  --select-md-font-size: 14px;
  
  --select-lg-height: 48px;
  --select-lg-padding: 0 48px 0 16px;
  --select-lg-font-size: 16px;
  
  /* Colors */
  --select-bg: white;
  --select-border: var(--forge-color-neutral-300);
  --select-text: var(--forge-color-neutral-900);
  --select-placeholder: var(--forge-color-neutral-500);
  
  /* Focus state */
  --select-focus-border: var(--forge-color-primary-500);
  --select-focus-ring: 0 0 0 3px rgba(59, 130, 246, 0.1);
  --select-focus-bg: white;
  
  /* Hover state */
  --select-hover-border: var(--forge-color-neutral-400);
  --select-hover-bg: var(--forge-color-neutral-50);
  
  /* Error state */
  --select-error-border: var(--forge-color-error-500);
  --select-error-bg: var(--forge-color-error-50);
  --select-error-text: var(--forge-color-error-700);
  
  /* Success state */
  --select-success-border: var(--forge-color-success-500);
  --select-success-bg: var(--forge-color-success-50);
  
  /* Disabled state */
  --select-disabled-bg: var(--forge-color-neutral-100);
  --select-disabled-border: var(--forge-color-neutral-200);
  --select-disabled-text: var(--forge-color-neutral-400);
  --select-disabled-cursor: not-allowed;
  
  /* Dropdown */
  --select-dropdown-bg: white;
  --select-dropdown-border: var(--forge-color-neutral-200);
  --select-dropdown-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  --select-dropdown-border-radius: 6px;
  --select-dropdown-max-height: 300px;
  
  /* Options */
  --select-option-padding: 8px 12px;
  --select-option-hover-bg: var(--forge-color-neutral-100);
  --select-option-selected-bg: var(--forge-color-primary-50);
  --select-option-selected-color: var(--forge-color-primary-700);
  
  /* Icon */
  --select-icon-color: var(--forge-color-neutral-400);
  --select-icon-size: 16px;
  --select-icon-rotation: 180deg; /* When open */
  
  /* Search */
  --select-search-border: var(--forge-color-neutral-200);
  --select-search-bg: white;
  --select-search-padding: 8px 12px;
  
  /* Animation */
  --select-animation-duration: 200ms;
  --select-animation-timing: ease-out;
}
```

## AI Integration

### State Explanation

```typescript
const select = document.querySelector('forge-select');
console.log(select.explainState());
// "Select dropdown with 5 options, 'canada' is selected, searchable, no validation errors"
```

### Possible Actions

```typescript
const actions = select.getPossibleActions();
// [
//   { name: 'open', available: true, description: 'Open the dropdown' },
//   { name: 'clear', available: true, description: 'Clear the selection' },
//   { name: 'search', available: true, description: 'Search through options' }
// ]
```

## Performance

- **Lightweight**: <6KB gzipped including search functionality
- **SSR Optimized**: Native HTML select with progressive enhancement
- **Virtual Scrolling**: Handles large option lists efficiently
- **Debounced Search**: Optimized search performance
- **Memory Efficient**: Automatic cleanup and event management

## Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **SSR Fallback**: Works in any browser with HTML form support
- **Progressive Enhancement**: Full functionality without JavaScript in SSR
- **Mobile Support**: Touch-friendly with native mobile select behavior

## Related Components

- **[ForgeMultiSelect](../molecules/multi-select.md)** - Multiple selection alternative
- **[ForgeInput](./input.md)** - Text input alternative
- **[ForgeRadioGroup](./radio-group.md)** - Radio button alternative for small option sets