# ForgeSwitch

Modern toggle switch component with unified SSR/client architecture for binary settings, preferences, and on/off controls.

## Unified SSR Architecture

The ForgeSwitch component uses our revolutionary **unified wrapper approach** - a single component that works everywhere without any developer configuration:

- **SSR Environment** (Next.js): Renders semantic HTML checkbox with switch-like styling
- **Client Environment** (Vite): Renders as web component with smooth animations  
- **Progressive Enhancement**: Seamlessly upgrades from HTML checkbox to web component
- **Graceful Degradation**: Falls back to enhanced HTML checkbox if web components fail

**Single component that works everywhere - no separate SSR/client versions needed.**

## Key Features

- **Smooth Animations**: Fluid toggle animations with spring physics
- **Size Variants**: Small, medium, and large sizes
- **Label Integration**: Built-in label support with flexible positioning
- **Icon Support**: Custom icons for on/off states
- **Native Form Integration**: Full HTML form submission and validation
- **Validation States**: Error, success, and warning visual states
- **Accessibility**: Complete WCAG 2.1 AA compliance
- **Loading State**: Built-in loading indicator during async operations
- **Unified SSR**: Works seamlessly in both SSR and client environments
- **AI-Ready**: Complete AI metadata for intelligent interactions

## Basic Usage

### Import (Works in any React environment)

```tsx
import { ForgeSwitch } from '@nexcraft/forge/integrations/react';

// Same import works in:
// ✅ Next.js App Router (SSR)
// ✅ Next.js Pages Router (SSR) 
// ✅ Vite (Client-only)
// ✅ CRA (Client-only)
// ✅ Any React SSR framework
```

### Basic Switches

```tsx
// Simple switch
<ForgeSwitch 
  name="notifications"
  checked={notificationsEnabled}
  onChange={handleNotificationToggle}
>
  Enable notifications
</ForgeSwitch>

// Switch with description
<ForgeSwitch 
  name="darkMode"
  checked={isDarkMode}
  onChange={setIsDarkMode}
  description="Use dark theme for better viewing in low light"
>
  Dark mode
</ForgeSwitch>

// Disabled switch
<ForgeSwitch 
  name="premium"
  checked={false}
  disabled
  description="Upgrade to premium to enable this feature"
>
  Premium features
</ForgeSwitch>

// Switch with loading state
<ForgeSwitch 
  name="autoSave"
  checked={autoSaveEnabled}
  loading={isTogglingAutoSave}
  onChange={handleAutoSaveToggle}
>
  Auto-save documents
</ForgeSwitch>
```

### Switch Sizes

```tsx
// Size variants
<ForgeSwitch size="sm" name="compact">Small switch</ForgeSwitch>
<ForgeSwitch size="md" name="default">Medium switch (default)</ForgeSwitch>
<ForgeSwitch size="lg" name="large">Large switch</ForgeSwitch>
```

## Advanced Usage

### Settings Panel

```tsx
function SettingsPanel() {
  const [settings, setSettings] = useState({
    notifications: true,
    autoSave: false,
    darkMode: false,
    analytics: true,
    marketing: false
  });
  
  const handleSettingChange = async (name, checked) => {
    // Optimistic update
    setSettings(prev => ({ ...prev, [name]: checked }));
    
    try {
      await saveUserSetting(name, checked);
    } catch (error) {
      // Revert on error
      setSettings(prev => ({ ...prev, [name]: !checked }));
      console.error('Failed to save setting:', error);
    }
  };
  
  return (
    <div className="settings-panel">
      <h3>User Preferences</h3>
      
      <ForgeSwitch
        name="notifications"
        checked={settings.notifications}
        onChange={(checked) => handleSettingChange('notifications', checked)}
        description="Receive email notifications for important updates"
      >
        Email notifications
      </ForgeSwitch>
      
      <ForgeSwitch
        name="autoSave"
        checked={settings.autoSave}
        onChange={(checked) => handleSettingChange('autoSave', checked)}
        description="Automatically save your work every 30 seconds"
      >
        Auto-save
      </ForgeSwitch>
      
      <ForgeSwitch
        name="darkMode"
        checked={settings.darkMode}
        onChange={(checked) => handleSettingChange('darkMode', checked)}
        description="Use dark theme for better viewing in low light"
      >
        Dark mode
      </ForgeSwitch>
      
      <hr />
      
      <h4>Privacy Settings</h4>
      
      <ForgeSwitch
        name="analytics"
        checked={settings.analytics}
        onChange={(checked) => handleSettingChange('analytics', checked)}
        description="Help us improve by sharing anonymous usage data"
      >
        Analytics & usage data
      </ForgeSwitch>
      
      <ForgeSwitch
        name="marketing"
        checked={settings.marketing}
        onChange={(checked) => handleSettingChange('marketing', checked)}
        description="Receive promotional emails and product updates"
      >
        Marketing communications
      </ForgeSwitch>
    </div>
  );
}
```

### Feature Toggles with Async Validation

```tsx
function FeatureToggles() {
  const [features, setFeatures] = useState({
    experimentalUI: false,
    betaFeatures: false,
    advancedMode: false
  });
  
  const [loading, setLoading] = useState({});
  const [errors, setErrors] = useState({});
  
  const handleFeatureToggle = async (featureName, checked) => {
    setLoading(prev => ({ ...prev, [featureName]: true }));
    setErrors(prev => ({ ...prev, [featureName]: null }));
    
    try {
      // Validate feature access
      await validateFeatureAccess(featureName, checked);
      
      // Update feature state
      await updateFeatureFlag(featureName, checked);
      
      setFeatures(prev => ({ ...prev, [featureName]: checked }));
    } catch (error) {
      setErrors(prev => ({ ...prev, [featureName]: error.message }));
    } finally {
      setLoading(prev => ({ ...prev, [featureName]: false }));
    }
  };
  
  return (
    <div className="feature-toggles">
      <h3>Experimental Features</h3>
      <p>Enable beta features and experimental functionality.</p>
      
      <ForgeSwitch
        name="experimentalUI"
        checked={features.experimentalUI}
        loading={loading.experimentalUI}
        error={!!errors.experimentalUI}
        errorMessage={errors.experimentalUI}
        onChange={(checked) => handleFeatureToggle('experimentalUI', checked)}
        description="Try our new experimental user interface"
      >
        Experimental UI
      </ForgeSwitch>
      
      <ForgeSwitch
        name="betaFeatures"
        checked={features.betaFeatures}
        loading={loading.betaFeatures}
        error={!!errors.betaFeatures}
        errorMessage={errors.betaFeatures}
        onChange={(checked) => handleFeatureToggle('betaFeatures', checked)}
        description="Access beta features before they're released"
      >
        Beta features
      </ForgeSwitch>
      
      <ForgeSwitch
        name="advancedMode"
        checked={features.advancedMode}
        loading={loading.advancedMode}
        error={!!errors.advancedMode}
        errorMessage={errors.advancedMode}
        onChange={(checked) => handleFeatureToggle('advancedMode', checked)}
        description="Show advanced options and developer tools"
      >
        Advanced mode
      </ForgeSwitch>
    </div>
  );
}
```

### Permission Controls

```tsx
function PermissionControls({ permissions, onPermissionChange }) {
  const permissionConfig = {
    camera: {
      icon: 'camera',
      title: 'Camera Access',
      description: 'Allow app to access your camera for photos and video calls'
    },
    microphone: {
      icon: 'mic',
      title: 'Microphone Access',
      description: 'Allow app to access your microphone for voice calls'
    },
    location: {
      icon: 'map-pin',
      title: 'Location Access',
      description: 'Allow app to access your location for location-based features'
    },
    notifications: {
      icon: 'bell',
      title: 'Push Notifications',
      description: 'Receive important notifications even when app is closed'
    }
  };
  
  return (
    <div className="permission-controls">
      <h3>App Permissions</h3>
      <p>Control what information this app can access.</p>
      
      {Object.entries(permissionConfig).map(([key, config]) => (
        <ForgeSwitch
          key={key}
          name={key}
          checked={permissions[key] || false}
          onChange={(checked) => onPermissionChange(key, checked)}
          size="lg"
          description={config.description}
        >
          <div className="permission-label">
            <ForgeIcon name={config.icon} />
            <span>{config.title}</span>
          </div>
        </ForgeSwitch>
      ))}
    </div>
  );
}
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `name` | `string` | `undefined` | Form field name |
| `checked` | `boolean` | `false` | Whether switch is on/off |
| `disabled` | `boolean` | `false` | Disable switch interactions |
| `loading` | `boolean` | `false` | Show loading state |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Switch size |
| `error` | `boolean` | `false` | Show error state |
| `success` | `boolean` | `false` | Show success state |
| `warning` | `boolean` | `false` | Show warning state |
| `errorMessage` | `string` | `undefined` | Error message text |
| `description` | `string` | `undefined` | Description text below label |
| `labelPosition` | `'left' \| 'right'` | `'right'` | Position of label relative to switch |
| `onIcon` | `string` | `undefined` | Icon to show when switch is on |
| `offIcon` | `string` | `undefined` | Icon to show when switch is off |
| `required` | `boolean` | `false` | Mark as required field |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `change` | `{ checked: boolean, name: string }` | Fired when switch state changes |
| `toggle` | `{ checked: boolean }` | Fired when switch is toggled |
| `focus` | `FocusEvent` | Fired when switch receives focus |
| `blur` | `FocusEvent` | Fired when switch loses focus |

## Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `toggle()` | - | `void` | Toggle switch state |
| `turnOn()` | - | `void` | Turn switch on |
| `turnOff()` | - | `void` | Turn switch off |
| `focus()` | - | `void` | Focus the switch |

## SSR Fallback Behavior

In SSR environments, ForgeSwitch renders a semantic HTML checkbox with switch-like styling that provides full functionality even without JavaScript:

### Server-Side Rendering
```html
<!-- Switch rendered during SSR -->
<label class="forge-switch forge-switch--md">
  <input 
    type="checkbox" 
    name="notifications" 
    class="forge-switch__input"
    checked
  />
  <span class="forge-switch__track" aria-hidden="true">
    <span class="forge-switch__thumb"></span>
  </span>
  <span class="forge-switch__label">Enable notifications</span>
</label>

<!-- Switch with description -->
<div class="forge-switch-container">
  <label class="forge-switch forge-switch--lg">
    <input 
      type="checkbox" 
      name="darkMode" 
      class="forge-switch__input"
    />
    <span class="forge-switch__track" aria-hidden="true">
      <span class="forge-switch__thumb"></span>
    </span>
    <span class="forge-switch__content">
      <span class="forge-switch__label">Dark mode</span>
      <span class="forge-switch__description">
        Use dark theme for better viewing in low light
      </span>
    </span>
  </label>
</div>

<!-- Switch with error state -->
<div class="forge-switch-container forge-switch-container--error">
  <label class="forge-switch forge-switch--error">
    <input 
      type="checkbox" 
      name="terms" 
      class="forge-switch__input"
      required
      aria-describedby="terms-error"
    />
    <span class="forge-switch__track" aria-hidden="true">
      <span class="forge-switch__thumb"></span>
    </span>
    <span class="forge-switch__label">I agree to terms</span>
  </label>
  <div id="terms-error" class="forge-switch__error" role="alert">
    You must agree to continue
  </div>
</div>
```

### Client-Side Hydration
```html
<!-- After hydration to web component -->
<forge-switch name="notifications" checked>
  Enable notifications
</forge-switch>

<forge-switch 
  name="darkMode" 
  size="lg"
  description="Use dark theme for better viewing in low light">
  Dark mode
</forge-switch>

<forge-switch 
  name="terms" 
  error 
  error-message="You must agree to continue"
  required>
  I agree to terms
</forge-switch>
```

## Accessibility

### WCAG 2.1 AA Compliance

- **Keyboard Navigation**: Full Tab and Space key support
- **Focus Management**: Visible focus indicators
- **Screen Reader Support**: Proper switch role and state announcements
- **Form Integration**: Native checkbox behavior for form submissions
- **Error Handling**: Accessible error message association
- **State Communication**: Clear on/off state indication

### ARIA Support

```tsx
<ForgeSwitch
  name="autoSave"
  checked={autoSaveEnabled}
  onChange={handleAutoSaveToggle}
  description="Automatically save changes every 30 seconds"
  aria-describedby="autosave-help"
>
  Auto-save
</ForgeSwitch>

<div id="autosave-help" className="sr-only">
  When enabled, your changes will be saved automatically every 30 seconds
</div>
```

### Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Focus switch |
| `Shift + Tab` | Focus previous element |
| `Space` | Toggle switch state |
| `Enter` | Toggle switch state |

## Framework Integration

### Next.js App Router (SSR)

```tsx
// app/components/UserSettings.tsx - Automatic SSR
import { ForgeSwitch } from '@nexcraft/forge/integrations/react';

export default function UserSettings({ initialSettings }) {
  return (
    <form>
      <ForgeSwitch
        name="emailNotifications"
        defaultChecked={initialSettings.emailNotifications}
        description="Receive important updates via email"
      >
        Email notifications
      </ForgeSwitch>
      
      <ForgeSwitch
        name="twoFactorAuth"
        defaultChecked={initialSettings.twoFactorAuth}
        description="Add an extra layer of security to your account"
      >
        Two-factor authentication
      </ForgeSwitch>
      
      <ForgeButton type="submit">Save Settings</ForgeButton>
    </form>
  );
}
```

### Vite/CRA (Client-only)

```tsx
// Same component, automatically renders as web component
import { ForgeSwitch } from '@nexcraft/forge/integrations/react';

function AppPreferences() {
  const [preferences, setPreferences] = useState({
    soundEffects: true,
    animations: true,
    reduceMotion: false,
    highContrast: false
  });
  
  const handlePreferenceChange = (name, checked) => {
    setPreferences(prev => ({ ...prev, [name]: checked }));
    
    // Apply preferences immediately
    applyPreference(name, checked);
  };
  
  return (
    <div className="app-preferences">
      <h3>Accessibility</h3>
      
      <ForgeSwitch
        name="reduceMotion"
        checked={preferences.reduceMotion}
        onChange={(checked) => handlePreferenceChange('reduceMotion', checked)}
        description="Reduce animations and transitions"
      >
        Reduce motion
      </ForgeSwitch>
      
      <ForgeSwitch
        name="highContrast"
        checked={preferences.highContrast}
        onChange={(checked) => handlePreferenceChange('highContrast', checked)}
        description="Increase contrast for better visibility"
      >
        High contrast
      </ForgeSwitch>
      
      <h3>Interface</h3>
      
      <ForgeSwitch
        name="soundEffects"
        checked={preferences.soundEffects}
        onChange={(checked) => handlePreferenceChange('soundEffects', checked)}
        description="Play sounds for button clicks and notifications"
      >
        Sound effects
      </ForgeSwitch>
      
      <ForgeSwitch
        name="animations"
        checked={preferences.animations}
        onChange={(checked) => handlePreferenceChange('animations', checked)}
        description="Enable smooth animations and transitions"
      >
        Animations
      </ForgeSwitch>
    </div>
  );
}
```

## CSS Custom Properties

```css
forge-switch {
  /* Track dimensions */
  --switch-track-width: 44px;
  --switch-track-height: 24px;
  --switch-track-border-radius: 12px;
  --switch-track-border-width: 2px;
  
  /* Thumb dimensions */
  --switch-thumb-size: 18px;
  --switch-thumb-border-radius: 50%;
  --switch-thumb-transition: transform 0.2s ease;
  
  /* Size variants */
  --switch-sm-track-width: 32px;
  --switch-sm-track-height: 18px;
  --switch-sm-thumb-size: 14px;
  
  --switch-lg-track-width: 56px;
  --switch-lg-track-height: 30px;
  --switch-lg-thumb-size: 24px;
  
  /* Colors - Off state */
  --switch-track-bg: var(--forge-color-neutral-200);
  --switch-track-border: var(--forge-color-neutral-300);
  --switch-thumb-bg: white;
  --switch-thumb-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  /* Colors - On state */
  --switch-on-track-bg: var(--forge-color-primary-500);
  --switch-on-track-border: var(--forge-color-primary-500);
  --switch-on-thumb-bg: white;
  
  /* Hover states */
  --switch-hover-track-bg: var(--forge-color-neutral-300);
  --switch-on-hover-track-bg: var(--forge-color-primary-600);
  
  /* Focus state */
  --switch-focus-ring: 0 0 0 3px rgba(59, 130, 246, 0.1);
  
  /* Disabled state */
  --switch-disabled-opacity: 0.5;
  --switch-disabled-cursor: not-allowed;
  
  /* Error state */
  --switch-error-track-bg: var(--forge-color-error-100);
  --switch-error-track-border: var(--forge-color-error-500);
  --switch-error-on-track-bg: var(--forge-color-error-500);
  
  /* Success state */
  --switch-success-track-bg: var(--forge-color-success-100);
  --switch-success-on-track-bg: var(--forge-color-success-500);
  
  /* Loading state */
  --switch-loading-opacity: 0.7;
  --switch-spinner-size: 12px;
  --switch-spinner-color: var(--forge-color-primary-500);
  
  /* Label styling */
  --switch-label-font-size: 14px;
  --switch-label-font-weight: 500;
  --switch-label-color: var(--forge-color-neutral-900);
  --switch-label-spacing: 8px;
  
  /* Description styling */
  --switch-description-font-size: 12px;
  --switch-description-color: var(--forge-color-neutral-600);
  --switch-description-line-height: 1.4;
  --switch-description-margin: 2px 0 0 0;
  
  /* Animation */
  --switch-animation-duration: 200ms;
  --switch-animation-timing: cubic-bezier(0.4, 0.0, 0.2, 1);
}
```

## AI Integration

### State Explanation

```typescript
const switchElement = document.querySelector('forge-switch');
console.log(switchElement.explainState());
// "Switch is currently on, labeled 'Dark mode', user can toggle off"
```

### Possible Actions

```typescript
const actions = switchElement.getPossibleActions();
// [
//   { name: 'toggle', available: true, description: 'Toggle switch state' },
//   { name: 'turnOn', available: true, description: 'Turn switch on' },
//   { name: 'turnOff', available: true, description: 'Turn switch off' }
// ]
```

## Performance

- **Lightweight**: <3KB gzipped including animations
- **SSR Optimized**: Native HTML checkbox with progressive enhancement
- **Smooth Animations**: Hardware-accelerated transforms
- **Memory Efficient**: Automatic cleanup of event listeners

## Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **SSR Fallback**: Works in any browser with HTML checkbox support
- **Progressive Enhancement**: Full functionality without JavaScript in SSR
- **Touch Support**: Optimized for touch interactions on mobile devices

## Related Components

- **[ForgeCheckbox](./checkbox.md)** - Traditional checkbox alternative
- **[ForgeRadioGroup](./radio-group.md)** - Single selection alternative
- **[ForgeButton](./button.md)** - Action button alternative for toggles