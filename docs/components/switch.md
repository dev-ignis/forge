# ForgeSwitch Component

A modern toggle switch component with smooth animations, loading states, and customizable labels for binary on/off choices.

## Installation

```javascript
import '@nexcraft/forge/switch';
```

## Basic Usage

```html
<forge-switch>Enable notifications</forge-switch>
```

## Live Examples

### Basic States

```html
<!-- Off (default) -->
<forge-switch>Default switch</forge-switch>

<!-- On -->
<forge-switch checked>Checked switch</forge-switch>

<!-- Disabled -->
<forge-switch disabled>Disabled switch</forge-switch>

<!-- Disabled and checked -->
<forge-switch disabled checked>Disabled checked</forge-switch>

<!-- Loading -->
<forge-switch loading>Loading switch</forge-switch>
```

### Sizes

```html
<!-- Small -->
<forge-switch size="sm">Small switch</forge-switch>

<!-- Medium (default) -->
<forge-switch size="md">Medium switch</forge-switch>

<!-- Large -->
<forge-switch size="lg">Large switch</forge-switch>
```

### With Custom Labels

```html
<!-- Default labels (On/Off) -->
<forge-switch show-labels>Show default labels</forge-switch>

<!-- Custom labels -->
<forge-switch 
  show-labels
  on-label="Yes"
  off-label="No"
>
  Custom labels
</forge-switch>

<!-- Icon labels -->
<forge-switch>
  <forge-icon slot="on-icon" name="check"></forge-icon>
  <forge-icon slot="off-icon" name="close"></forge-icon>
  Icon labels
</forge-switch>
```

### Label Positions

```html
<!-- Right (default) -->
<forge-switch label-position="right">Label on right</forge-switch>

<!-- Left -->
<forge-switch label-position="left">Label on left</forge-switch>

<!-- Top -->
<forge-switch label-position="top">Label on top</forge-switch>

<!-- Bottom -->
<forge-switch label-position="bottom">Label on bottom</forge-switch>
```

### Colors

```html
<!-- Primary (default) -->
<forge-switch checked>Primary color</forge-switch>

<!-- Success -->
<forge-switch checked color="success">Success color</forge-switch>

<!-- Warning -->
<forge-switch checked color="warning">Warning color</forge-switch>

<!-- Danger -->
<forge-switch checked color="danger">Danger color</forge-switch>
```

## API Reference

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `checked` | `boolean` | `false` | Switch state |
| `disabled` | `boolean` | `false` | Disabled state |
| `loading` | `boolean` | `false` | Loading state |
| `required` | `boolean` | `false` | Required field |
| `value` | `string` | `'on'` | Form value when checked |
| `name` | `string` | `''` | Form field name |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Switch size |
| `color` | `'primary' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | Switch color |
| `labelPosition` | `'left' \| 'right' \| 'top' \| 'bottom'` | `'right'` | Label position |
| `showLabels` | `boolean` | `false` | Show on/off labels |
| `onLabel` | `string` | `'On'` | Custom on label |
| `offLabel` | `string` | `'Off'` | Custom off label |
| `animateIn` | `boolean` | `true` | Enable animations |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `change` | `{ checked: boolean }` | Standard change event |
| `forge-change` | `{ checked: boolean, value: string }` | Custom change event |
| `forge-focus` | `void` | Fired on focus |
| `forge-blur` | `void` | Fired on blur |
| `forge-loading-start` | `void` | Loading started |
| `forge-loading-end` | `void` | Loading ended |

### Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `toggle()` | `(): void` | Toggle switch state |
| `focus()` | `(): void` | Focus the switch |
| `blur()` | `(): void` | Remove focus |
| `validate()` | `(): boolean` | Validate required state |

### Slots

| Slot | Description |
|------|-------------|
| (default) | Switch label content |
| `on-icon` | Icon for on state |
| `off-icon` | Icon for off state |
| `helper` | Helper text content |

## Styling

### CSS Custom Properties

```css
/* Size tokens */
--forge-switch-width-sm: 36px;
--forge-switch-width-md: 44px;
--forge-switch-width-lg: 52px;
--forge-switch-height-sm: 20px;
--forge-switch-height-md: 24px;
--forge-switch-height-lg: 28px;
--forge-switch-thumb-size-sm: 16px;
--forge-switch-thumb-size-md: 20px;
--forge-switch-thumb-size-lg: 24px;

/* Color tokens */
--forge-switch-off-bg: var(--forge-color-gray-300, #d1d5db);
--forge-switch-on-bg: var(--forge-color-primary, #3b82f6);
--forge-switch-thumb-bg: white;
--forge-switch-disabled-bg: var(--forge-color-gray-200, #e5e7eb);
--forge-switch-focus-ring: var(--forge-color-primary-light, #93bbfc);

/* Color variants */
--forge-switch-success-bg: var(--forge-color-success, #10b981);
--forge-switch-warning-bg: var(--forge-color-warning, #f59e0b);
--forge-switch-danger-bg: var(--forge-color-danger, #ef4444);

/* Spacing tokens */
--forge-switch-gap: 8px;
--forge-switch-padding: 2px;
--forge-switch-label-font-size: 14px;

/* Animation */
--forge-switch-transition: all 0.3s ease;
```

### Custom Styling Examples

```css
/* Custom colors */
forge-switch[checked] {
  --forge-switch-on-bg: #8b5cf6;
}

/* iOS style switch */
forge-switch.ios {
  --forge-switch-width-md: 51px;
  --forge-switch-height-md: 31px;
  --forge-switch-thumb-size-md: 27px;
  --forge-switch-padding: 2px;
}

/* Material style switch */
forge-switch.material {
  --forge-switch-width-md: 36px;
  --forge-switch-height-md: 14px;
  --forge-switch-thumb-size-md: 20px;
  --forge-switch-off-bg: rgba(0, 0, 0, 0.38);
}

/* Outlined style */
forge-switch.outlined {
  --forge-switch-off-bg: transparent;
  --forge-switch-thumb-bg: var(--forge-color-gray-400);
  border: 2px solid var(--forge-color-gray-400);
}
```

## Form Integration

### With Native Forms

```html
<form id="settingsForm">
  <forge-switch name="darkMode" value="enabled">
    Dark mode
  </forge-switch>
  
  <forge-switch name="notifications" checked>
    Push notifications
  </forge-switch>
  
  <forge-switch name="analytics">
    Analytics tracking
  </forge-switch>
  
  <forge-button type="submit">Save Settings</forge-button>
</form>

<script>
document.getElementById('settingsForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const settings = Object.fromEntries(formData);
  console.log('Settings:', settings);
});
</script>
```

### Async Operations

```html
<forge-switch id="autoSave">
  Auto-save documents
</forge-switch>

<script>
const autoSaveSwitch = document.getElementById('autoSave');

autoSaveSwitch.addEventListener('forge-change', async (e) => {
  autoSaveSwitch.loading = true;
  
  try {
    await updateSetting('autoSave', e.detail.checked);
    showToast('Setting updated successfully');
  } catch (error) {
    // Revert on error
    autoSaveSwitch.checked = !e.detail.checked;
    showToast('Failed to update setting', 'error');
  } finally {
    autoSaveSwitch.loading = false;
  }
});
</script>
```

## Settings Panel

```html
<div class="settings-panel">
  <h3>Privacy Settings</h3>
  
  <div class="setting-item">
    <forge-switch name="publicProfile" label-position="left">
      <strong>Public Profile</strong>
      <div slot="helper">Make your profile visible to everyone</div>
    </forge-switch>
  </div>
  
  <div class="setting-item">
    <forge-switch name="showEmail" label-position="left">
      <strong>Show Email</strong>
      <div slot="helper">Display email on your profile</div>
    </forge-switch>
  </div>
  
  <div class="setting-item">
    <forge-switch name="allowMessages" checked label-position="left">
      <strong>Allow Messages</strong>
      <div slot="helper">Let other users send you messages</div>
    </forge-switch>
  </div>
</div>

<style>
.setting-item {
  padding: 16px 0;
  border-bottom: 1px solid var(--forge-color-border);
}
</style>
```

## Feature Toggles

```html
<div class="feature-flags">
  <h3>Experimental Features</h3>
  
  <forge-switch 
    id="betaFeatures"
    color="warning"
    show-labels
    on-label="Beta"
    off-label="Stable"
  >
    Enable beta features
  </forge-switch>
  
  <forge-switch 
    id="devMode"
    color="danger"
    disabled
  >
    Developer mode (requires admin)
  </forge-switch>
  
  <forge-switch 
    id="debugMode"
    color="primary"
  >
    Debug logging
  </forge-switch>
</div>
```

## AI-Ready Features

### AI Metadata

```javascript
switchEl.aiMetadata = {
  purpose: 'Toggle notification settings',
  dataType: 'boolean',
  criticality: 'medium',
  semanticRole: 'preference-toggle',
  context: 'user-settings'
};
```

### AI Helper Methods

```javascript
// Get natural language description
switchEl.getAIDescription();
// Returns: "Switch for notifications, currently enabled"

// Get state information
switchEl.getStateInfo();
// Returns: {
//   checked: true,
//   enabled: true,
//   label: 'Enable notifications',
//   semanticMeaning: 'User wants to receive notifications'
// }

// Get toggle recommendation
switchEl.getRecommendation();
// Returns: {
//   suggestedState: true,
//   reason: 'Most users prefer notifications enabled'
// }

// Get related settings
switchEl.getRelatedSettings();
// Returns: ['notification-frequency', 'notification-types', 'quiet-hours']
```

## Performance Monitoring

```html
<forge-switch
  dev-mode
  show-metrics
  max-render-ms="4"
  performance-mode="fast"
>
  Performance monitored switch
</forge-switch>
```

## Accessibility

### WCAG 2.1 AA Compliance

- ✅ Keyboard navigation (Space to toggle)
- ✅ Focus indicators
- ✅ ARIA switch role
- ✅ Screen reader announcements
- ✅ Label association
- ✅ State announcements
- ✅ High contrast support
- ✅ Reduced motion support

### ARIA Attributes

```html
<!-- Rendered output -->
<forge-switch
  role="switch"
  tabindex="0"
  aria-checked="false"
  aria-label="Enable notifications"
  aria-describedby="helper-text"
>
</forge-switch>

<!-- Loading state -->
<forge-switch
  role="switch"
  aria-busy="true"
  aria-label="Updating setting..."
>
</forge-switch>
```

### Keyboard Support

| Key | Action |
|-----|--------|
| `Space` | Toggle switch state |
| `Enter` | Toggle switch state |
| `Tab` | Focus next element |
| `Shift+Tab` | Focus previous element |

## Use Cases

### Theme Switcher

```html
<div class="theme-switcher">
  <forge-switch id="themeToggle">
    <forge-icon slot="off-icon" name="sun"></forge-icon>
    <forge-icon slot="on-icon" name="moon"></forge-icon>
    <span>Dark theme</span>
  </forge-switch>
</div>

<script>
const themeToggle = document.getElementById('themeToggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

// Set initial state
themeToggle.checked = prefersDark.matches;
document.body.classList.toggle('dark', prefersDark.matches);

// Handle changes
themeToggle.addEventListener('forge-change', (e) => {
  document.body.classList.toggle('dark', e.detail.checked);
  localStorage.setItem('theme', e.detail.checked ? 'dark' : 'light');
});
</script>
```

### Permission Controls

```html
<div class="permissions">
  <h4>App Permissions</h4>
  
  <forge-switch name="camera" id="cameraPermission">
    Camera access
  </forge-switch>
  
  <forge-switch name="microphone" id="micPermission">
    Microphone access
  </forge-switch>
  
  <forge-switch name="location" id="locationPermission">
    Location services
  </forge-switch>
</div>

<script>
// Request permissions when toggled on
document.getElementById('cameraPermission').addEventListener('forge-change', async (e) => {
  if (e.detail.checked) {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
    } catch (error) {
      e.target.checked = false;
      alert('Camera permission denied');
    }
  }
});
</script>
```

### Data Sync Settings

```html
<div class="sync-settings">
  <forge-switch 
    id="autoSync"
    loading={syncing}
  >
    Auto-sync data
  </forge-switch>
  
  <forge-switch 
    id="wifiOnly"
    disabled={!autoSyncEnabled}
  >
    Sync on Wi-Fi only
  </forge-switch>
  
  <forge-switch 
    id="syncPhotos"
    disabled={!autoSyncEnabled}
  >
    Include photos
  </forge-switch>
</div>
```

## Switch Groups

```javascript
class SwitchGroup {
  constructor(container) {
    this.container = container;
    this.switches = container.querySelectorAll('forge-switch');
    this.init();
  }
  
  init() {
    this.switches.forEach(switchEl => {
      switchEl.addEventListener('forge-change', (e) => {
        this.handleChange(switchEl, e.detail.checked);
      });
    });
  }
  
  handleChange(changedSwitch, checked) {
    // Emit group change event
    this.container.dispatchEvent(new CustomEvent('group-change', {
      detail: {
        name: changedSwitch.name,
        checked,
        allStates: this.getAllStates()
      }
    }));
  }
  
  getAllStates() {
    const states = {};
    this.switches.forEach(switchEl => {
      states[switchEl.name] = switchEl.checked;
    });
    return states;
  }
  
  setStates(states) {
    Object.entries(states).forEach(([name, checked]) => {
      const switchEl = this.container.querySelector(`[name="${name}"]`);
      if (switchEl) switchEl.checked = checked;
    });
  }
  
  enableAll() {
    this.switches.forEach(s => s.checked = true);
  }
  
  disableAll() {
    this.switches.forEach(s => s.checked = false);
  }
}

// Usage
const group = new SwitchGroup(document.getElementById('settings'));
group.container.addEventListener('group-change', (e) => {
  console.log('Settings updated:', e.detail.allStates);
});
```

## Framework Integration

### React

```jsx
import '@nexcraft/forge/switch';

function Settings() {
  const [settings, setSettings] = React.useState({
    darkMode: false,
    notifications: true,
    analytics: false
  });
  
  const handleChange = (key) => (e) => {
    setSettings({
      ...settings,
      [key]: e.detail.checked
    });
  };
  
  return (
    <div>
      <forge-switch
        checked={settings.darkMode}
        onForgeChange={handleChange('darkMode')}
      >
        Dark mode
      </forge-switch>
      
      <forge-switch
        checked={settings.notifications}
        onForgeChange={handleChange('notifications')}
      >
        Notifications
      </forge-switch>
      
      <forge-switch
        checked={settings.analytics}
        onForgeChange={handleChange('analytics')}
      >
        Analytics
      </forge-switch>
    </div>
  );
}
```

### Vue

```vue
<template>
  <div class="settings">
    <forge-switch
      v-model="darkMode"
      @forge-change="toggleTheme"
    >
      Dark mode
    </forge-switch>
    
    <forge-switch
      v-model="autoSave"
      :loading="saving"
      @forge-change="updateAutoSave"
    >
      Auto-save
    </forge-switch>
  </div>
</template>

<script>
import '@nexcraft/forge/switch';

export default {
  data() {
    return {
      darkMode: false,
      autoSave: true,
      saving: false
    };
  },
  methods: {
    toggleTheme() {
      document.body.classList.toggle('dark', this.darkMode);
    },
    async updateAutoSave() {
      this.saving = true;
      await this.saveSetting('autoSave', this.autoSave);
      this.saving = false;
    }
  }
};
</script>
```

### Angular

```typescript
import '@nexcraft/forge/switch';

@Component({
  template: `
    <div class="preferences">
      <forge-switch
        [(ngModel)]="preferences.emailNotifications"
        (forgeChange)="updatePreference('emailNotifications', $event)"
      >
        Email notifications
      </forge-switch>
      
      <forge-switch
        [(ngModel)]="preferences.pushNotifications"
        (forgeChange)="updatePreference('pushNotifications', $event)"
      >
        Push notifications
      </forge-switch>
    </div>
  `
})
export class PreferencesComponent {
  preferences = {
    emailNotifications: true,
    pushNotifications: false
  };
  
  updatePreference(key: string, event: CustomEvent) {
    console.log(`${key} changed to:`, event.detail.checked);
    // Save preference
  }
}
```

## Testing

### Unit Test Example

```typescript
import { fixture, html } from '@open-wc/testing';
import { expect } from '@esm-bundle/chai';
import '@nexcraft/forge/switch';

describe('forge-switch', () => {
  it('should toggle state', async () => {
    const el = await fixture(html`
      <forge-switch>Test</forge-switch>
    `);
    
    expect(el.checked).to.be.false;
    
    el.click();
    await el.updateComplete;
    
    expect(el.checked).to.be.true;
  });
  
  it('should emit change event', async () => {
    const el = await fixture(html`
      <forge-switch>Test</forge-switch>
    `);
    
    let eventDetail;
    el.addEventListener('forge-change', (e) => {
      eventDetail = e.detail;
    });
    
    el.toggle();
    
    expect(eventDetail.checked).to.be.true;
  });
  
  it('should handle loading state', async () => {
    const el = await fixture(html`
      <forge-switch loading>Test</forge-switch>
    `);
    
    expect(el.loading).to.be.true;
    expect(el.hasAttribute('aria-busy')).to.be.true;
  });
});
```

## Migration Guide

### From Material UI Switch

```jsx
// Before (Material UI)
<Switch
  checked={checked}
  onChange={handleChange}
  disabled={disabled}
  color="primary"
/>

// After (Forge)
<forge-switch
  checked={checked}
  onForgeChange={handleChange}
  disabled={disabled}
  color="primary"
>
  Label text
</forge-switch>
```

### From Ant Design Switch

```jsx
// Before (Ant Design)
<Switch
  checked={checked}
  onChange={onChange}
  loading={loading}
  checkedChildren="On"
  unCheckedChildren="Off"
/>

// After (Forge)
<forge-switch
  checked={checked}
  onForgeChange={onChange}
  loading={loading}
  show-labels
  on-label="On"
  off-label="Off"
>
  Label text
</forge-switch>
```

## Browser Support

- Chrome 67+ ✅
- Firefox 63+ ✅
- Safari 10.1+ ✅
- Edge 79+ ✅

## Related Components

- [ForgeCheckbox](./checkbox.md) - Checkbox component
- [ForgeRadioGroup](./radio-group.md) - Radio button group
- [ForgeToggle](./toggle.md) - Toggle button

## Changelog

### Version 1.0.0
- Initial release
- 3 size variants
- 4 color options
- Loading state
- Custom labels
- Icon support
- 4 label positions
- Full accessibility
- AI-ready architecture
- Performance monitoring

## API Playground

Try the component live in our [Storybook](https://forge-ui.dev/storybook/?path=/story/atoms-switch)