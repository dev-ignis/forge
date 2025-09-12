# ForgeCheckbox

Flexible checkbox component with unified SSR/client architecture for binary selections, multi-select forms, and option toggles.

## Unified SSR Architecture

The ForgeCheckbox component uses our revolutionary **unified wrapper approach** - a single component that works everywhere without any developer configuration:

- **SSR Environment** (Next.js): Renders semantic HTML `<input type="checkbox">` with critical styling
- **Client Environment** (Vite): Renders as web component with full interactivity  
- **Progressive Enhancement**: Seamlessly upgrades from HTML checkbox to web component
- **Graceful Degradation**: Falls back to enhanced HTML checkbox if web components fail

**Single component that works everywhere - no separate SSR/client versions needed.**

## Key Features

- **Native Form Integration**: Full HTML form submission support
- **Indeterminate State**: Three-state checkbox (checked/unchecked/indeterminate)
- **Size Options**: Small, medium, and large sizes
- **Custom Styling**: Flexible appearance with CSS custom properties
- **Label Integration**: Built-in label support with proper accessibility
- **Validation States**: Error, success, and warning visual states
- **Accessibility**: Complete WCAG 2.1 AA compliance
- **Unified SSR**: Works seamlessly in both SSR and client environments
- **AI-Ready**: Complete AI metadata for intelligent interactions

## Basic Usage

### Import (Works in any React environment)

```tsx
import { ForgeCheckbox } from '@nexcraft/forge/integrations/react';

// Same import works in:
// ✅ Next.js App Router (SSR)
// ✅ Next.js Pages Router (SSR) 
// ✅ Vite (Client-only)
// ✅ CRA (Client-only)
// ✅ Any React SSR framework
```

### Basic Checkboxes

```tsx
// Simple checkbox
<ForgeCheckbox 
  name="terms" 
  value="accepted"
  onChange={handleChange}
>
  I agree to the terms and conditions
</ForgeCheckbox>

// Pre-checked checkbox
<ForgeCheckbox 
  name="newsletter" 
  checked
  onChange={handleNewsletterChange}
>
  Subscribe to newsletter
</ForgeCheckbox>

// Disabled checkbox
<ForgeCheckbox 
  name="readonly" 
  checked 
  disabled
>
  Read-only option
</ForgeCheckbox>
```

### Checkbox with Different States

```tsx
// Indeterminate state (useful for "select all")
<ForgeCheckbox 
  name="selectAll"
  indeterminate
  onChange={handleSelectAll}
>
  Select All Items
</ForgeCheckbox>

// Error state
<ForgeCheckbox 
  name="required" 
  required
  error
  errorMessage="This field is required"
>
  Required selection
</ForgeCheckbox>

// Success state
<ForgeCheckbox 
  name="verified" 
  checked 
  success
>
  Email verified
</ForgeCheckbox>
```

## Advanced Usage

### Form Integration

```tsx
function SettingsForm() {
  const [settings, setSettings] = useState({
    notifications: true,
    marketing: false,
    updates: false
  });
  
  const handleSettingChange = (name, checked) => {
    setSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  return (
    <form>
      <fieldset>
        <legend>Email Preferences</legend>
        
        <ForgeCheckbox
          name="notifications"
          checked={settings.notifications}
          onChange={(e) => handleSettingChange('notifications', e.target.checked)}
        >
          Receive notifications
        </ForgeCheckbox>
        
        <ForgeCheckbox
          name="marketing"
          checked={settings.marketing}
          onChange={(e) => handleSettingChange('marketing', e.target.checked)}
        >
          Marketing emails
        </ForgeCheckbox>
        
        <ForgeCheckbox
          name="updates"
          checked={settings.updates}
          onChange={(e) => handleSettingChange('updates', e.target.checked)}
        >
          Product updates
        </ForgeCheckbox>
      </fieldset>
      
      <ForgeButton type="submit">Save Settings</ForgeButton>
    </form>
  );
}
```

### Multi-Select with Select All

```tsx
function MultiSelectList({ items, onSelectionChange }) {
  const [selectedItems, setSelectedItems] = useState(new Set());
  
  const allSelected = selectedItems.size === items.length;
  const someSelected = selectedItems.size > 0 && selectedItems.size < items.length;
  
  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedItems(new Set(items.map(item => item.id)));
    } else {
      setSelectedItems(new Set());
    }
  };
  
  const handleItemSelect = (itemId, checked) => {
    const newSelection = new Set(selectedItems);
    if (checked) {
      newSelection.add(itemId);
    } else {
      newSelection.delete(itemId);
    }
    setSelectedItems(newSelection);
    onSelectionChange(Array.from(newSelection));
  };
  
  return (
    <div className="multi-select-list">
      <ForgeCheckbox
        indeterminate={someSelected}
        checked={allSelected}
        onChange={(e) => handleSelectAll(e.target.checked)}
        className="select-all-checkbox"
      >
        Select All ({selectedItems.size} of {items.length})
      </ForgeCheckbox>
      
      <hr />
      
      {items.map(item => (
        <ForgeCheckbox
          key={item.id}
          checked={selectedItems.has(item.id)}
          onChange={(e) => handleItemSelect(item.id, e.target.checked)}
        >
          {item.name}
        </ForgeCheckbox>
      ))}
    </div>
  );
}
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `name` | `string` | `undefined` | Form field name |
| `value` | `string` | `undefined` | Form field value |
| `checked` | `boolean` | `false` | Whether checkbox is checked |
| `indeterminate` | `boolean` | `false` | Show indeterminate state |
| `disabled` | `boolean` | `false` | Disable checkbox interactions |
| `required` | `boolean` | `false` | Mark as required field |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Checkbox size |
| `error` | `boolean` | `false` | Show error state |
| `success` | `boolean` | `false` | Show success state |
| `warning` | `boolean` | `false` | Show warning state |
| `errorMessage` | `string` | `undefined` | Error message text |
| `helpText` | `string` | `undefined` | Help text description |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `change` | `{ checked: boolean, value: string }` | Fired when checkbox state changes |
| `focus` | `FocusEvent` | Fired when checkbox receives focus |
| `blur` | `FocusEvent` | Fired when checkbox loses focus |

## Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `toggle()` | - | `void` | Toggle checkbox state |
| `check()` | - | `void` | Set checkbox to checked |
| `uncheck()` | - | `void` | Set checkbox to unchecked |
| `setIndeterminate()` | - | `void` | Set to indeterminate state |
| `focus(options?)` | `FocusOptions` | `void` | Focus the checkbox |

## SSR Fallback Behavior

In SSR environments, ForgeCheckbox renders a semantic HTML checkbox that provides full functionality even without JavaScript:

### Server-Side Rendering
```html
<!-- Checkbox rendered during SSR -->
<label class="forge-checkbox">
  <input 
    type="checkbox" 
    name="newsletter" 
    value="yes"
    class="forge-checkbox__input"
  />
  <span class="forge-checkbox__checkmark" aria-hidden="true"></span>
  <span class="forge-checkbox__label">Subscribe to newsletter</span>
</label>

<!-- Required checkbox with error state -->
<label class="forge-checkbox forge-checkbox--error">
  <input 
    type="checkbox" 
    name="terms" 
    required
    class="forge-checkbox__input"
    aria-describedby="terms-error"
  />
  <span class="forge-checkbox__checkmark" aria-hidden="true"></span>
  <span class="forge-checkbox__label">I agree to terms</span>
  <span id="terms-error" class="forge-checkbox__error">This field is required</span>
</label>
```

### Client-Side Hydration
```html
<!-- After hydration to web component -->
<forge-checkbox name="newsletter" value="yes">
  Subscribe to newsletter
</forge-checkbox>

<forge-checkbox name="terms" required error error-message="This field is required">
  I agree to terms
</forge-checkbox>
```

## Accessibility

### WCAG 2.1 AA Compliance

- **Keyboard Navigation**: Full Tab, Space key support
- **Focus Management**: Visible focus indicators
- **Screen Reader Support**: Proper labels and state announcements
- **Form Integration**: Native form submission and validation
- **Error Handling**: Accessible error message association
- **Required Fields**: Proper required field indication

### ARIA Support

```tsx
<ForgeCheckbox
  name="consent"
  required
  aria-describedby="consent-help consent-error"
  error={hasError}
  errorMessage="Consent is required to proceed"
>
  I consent to data processing
</ForgeCheckbox>

<div id="consent-help" className="help-text">
  We need your consent to process your personal data
</div>
```

### Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Focus checkbox |
| `Shift + Tab` | Focus previous element |
| `Space` | Toggle checkbox state |
| `Enter` | Submit form (if in form) |

## Framework Integration

### Next.js App Router (SSR)

```tsx
// app/components/ConsentForm.tsx - Automatic SSR
import { ForgeCheckbox } from '@nexcraft/forge/integrations/react';

export default function ConsentForm() {
  return (
    <form>
      <ForgeCheckbox name="terms" required>
        I agree to the Terms of Service
      </ForgeCheckbox>
      
      <ForgeCheckbox name="privacy" required>
        I agree to the Privacy Policy
      </ForgeCheckbox>
      
      <ForgeCheckbox name="marketing">
        I want to receive marketing emails (optional)
      </ForgeCheckbox>
      
      <ForgeButton type="submit">Continue</ForgeButton>
    </form>
  );
}
```

### Vite/CRA (Client-only)

```tsx
// Same component, automatically renders as web component
import { ForgeCheckbox } from '@nexcraft/forge/integrations/react';

function PreferencesPanel() {
  const [preferences, setPreferences] = useState({
    darkMode: false,
    notifications: true,
    autoSave: true
  });
  
  const handlePreferenceChange = (key, value) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };
  
  return (
    <div className="preferences-panel">
      <h3>Preferences</h3>
      
      <ForgeCheckbox
        checked={preferences.darkMode}
        onChange={(e) => handlePreferenceChange('darkMode', e.target.checked)}
      >
        Dark mode
      </ForgeCheckbox>
      
      <ForgeCheckbox
        checked={preferences.notifications}
        onChange={(e) => handlePreferenceChange('notifications', e.target.checked)}
      >
        Enable notifications
      </ForgeCheckbox>
      
      <ForgeCheckbox
        checked={preferences.autoSave}
        onChange={(e) => handlePreferenceChange('autoSave', e.target.checked)}
      >
        Auto-save changes
      </ForgeCheckbox>
    </div>
  );
}
```

## Examples

### Todo List with Select All

```tsx
function TodoList({ todos, onTodoChange, onSelectAll }) {
  const completedTodos = todos.filter(todo => todo.completed);
  const allCompleted = completedTodos.length === todos.length;
  const someCompleted = completedTodos.length > 0 && completedTodos.length < todos.length;
  
  return (
    <div className="todo-list">
      <ForgeCheckbox
        indeterminate={someCompleted}
        checked={allCompleted}
        onChange={(e) => onSelectAll(e.target.checked)}
        className="select-all"
      >
        {someCompleted 
          ? `${completedTodos.length} of ${todos.length} completed`
          : allCompleted 
            ? 'All completed'
            : 'Mark all complete'
        }
      </ForgeCheckbox>
      
      {todos.map(todo => (
        <ForgeCheckbox
          key={todo.id}
          checked={todo.completed}
          onChange={(e) => onTodoChange(todo.id, e.target.checked)}
        >
          {todo.text}
        </ForgeCheckbox>
      ))}
    </div>
  );
}
```

### Permission Settings

```tsx
function PermissionSettings({ permissions, onChange }) {
  const handlePermissionChange = (permission, granted) => {
    onChange(permission, granted);
  };
  
  return (
    <div className="permission-settings">
      <h3>App Permissions</h3>
      
      <ForgeCheckbox
        checked={permissions.camera}
        onChange={(e) => handlePermissionChange('camera', e.target.checked)}
        size="lg"
      >
        <div className="permission-item">
          <ForgeIcon name="camera" />
          <div>
            <strong>Camera Access</strong>
            <p>Allow app to access your camera for photos</p>
          </div>
        </div>
      </ForgeCheckbox>
      
      <ForgeCheckbox
        checked={permissions.location}
        onChange={(e) => handlePermissionChange('location', e.target.checked)}
        size="lg"
      >
        <div className="permission-item">
          <ForgeIcon name="map-pin" />
          <div>
            <strong>Location Access</strong>
            <p>Allow app to access your location</p>
          </div>
        </div>
      </ForgeCheckbox>
      
      <ForgeCheckbox
        checked={permissions.notifications}
        onChange={(e) => handlePermissionChange('notifications', e.target.checked)}
        size="lg"
      >
        <div className="permission-item">
          <ForgeIcon name="bell" />
          <div>
            <strong>Push Notifications</strong>
            <p>Receive notifications about important updates</p>
          </div>
        </div>
      </ForgeCheckbox>
    </div>
  );
}
```

## CSS Custom Properties

```css
forge-checkbox {
  /* Base styles */
  --checkbox-size: 20px;
  --checkbox-border-width: 2px;
  --checkbox-border-radius: 4px;
  --checkbox-transition: all 0.2s ease;
  --checkbox-focus-ring: 0 0 0 3px rgba(59, 130, 246, 0.1);
  
  /* Size variants */
  --checkbox-sm-size: 16px;
  --checkbox-md-size: 20px;
  --checkbox-lg-size: 24px;
  
  /* Colors */
  --checkbox-border-color: var(--forge-color-neutral-300);
  --checkbox-bg-color: white;
  --checkbox-checked-bg: var(--forge-color-primary-500);
  --checkbox-checked-border: var(--forge-color-primary-500);
  --checkbox-checkmark-color: white;
  
  /* Hover states */
  --checkbox-hover-border: var(--forge-color-neutral-400);
  --checkbox-hover-bg: var(--forge-color-neutral-50);
  
  /* Disabled state */
  --checkbox-disabled-opacity: 0.5;
  --checkbox-disabled-cursor: not-allowed;
  
  /* Error state */
  --checkbox-error-border: var(--forge-color-error-500);
  --checkbox-error-bg: var(--forge-color-error-50);
  --checkbox-error-text: var(--forge-color-error-700);
  
  /* Success state */
  --checkbox-success-border: var(--forge-color-success-500);
  --checkbox-success-bg: var(--forge-color-success-50);
  --checkbox-success-text: var(--forge-color-success-700);
  
  /* Label styling */
  --checkbox-label-font-size: 14px;
  --checkbox-label-color: var(--forge-color-neutral-700);
  --checkbox-label-spacing: 8px;
  
  /* Indeterminate state */
  --checkbox-indeterminate-bg: var(--forge-color-primary-500);
  --checkbox-indeterminate-mark-color: white;
}
```

## AI Integration

### State Explanation

```typescript
const checkbox = document.querySelector('forge-checkbox');
console.log(checkbox.explainState());
// "Checkbox is unchecked, enabled for user interaction, not required"
```

### Possible Actions

```typescript
const actions = checkbox.getPossibleActions();
// [
//   { name: 'toggle', available: true, description: 'Toggle checkbox state' },
//   { name: 'check', available: true, description: 'Mark checkbox as checked' },
//   { name: 'uncheck', available: true, description: 'Mark checkbox as unchecked' }
// ]
```

## Performance

- **Lightweight**: <3KB gzipped including styles
- **SSR Optimized**: Native HTML form integration with minimal hydration
- **Memory Efficient**: Automatic cleanup of event listeners
- **Accessible by Default**: No additional ARIA configuration needed

## Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **SSR Fallback**: Works in any browser with HTML form support
- **Progressive Enhancement**: Full functionality without JavaScript in SSR

## Related Components

- **[ForgeRadioGroup](./radio-group.md)** - Single-select alternative to checkboxes
- **[ForgeSwitch](./switch.md)** - Toggle switch alternative
- **[ForgeFormField](../molecules/form-field.md)** - Form field wrapper with labels and validation