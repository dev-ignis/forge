import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './switch';
import type { ForgeSwitch } from './switch';
import '../button/button';

const meta: Meta<ForgeSwitch> = {
  title: 'Atoms/Switch',
  component: 'forge-switch',
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: { type: 'boolean' },
      description: 'Switch state',
      defaultValue: false,
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled state',
      defaultValue: false,
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Loading state',
      defaultValue: false,
    },
    required: {
      control: { type: 'boolean' },
      description: 'Required field',
      defaultValue: false,
    },
    error: {
      control: { type: 'boolean' },
      description: 'Error state',
      defaultValue: false,
    },
    label: {
      control: { type: 'text' },
      description: 'Switch label',
    },
    description: {
      control: { type: 'text' },
      description: 'Helper text below label',
    },
    onLabel: {
      control: { type: 'text' },
      description: 'Label shown when on',
    },
    offLabel: {
      control: { type: 'text' },
      description: 'Label shown when off',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Switch size',
      defaultValue: 'md',
    },
    labelPosition: {
      control: { type: 'select' },
      options: ['start', 'end', 'top', 'bottom'],
      description: 'Label position relative to switch',
      defaultValue: 'end',
    },
    name: {
      control: { type: 'text' },
      description: 'Form field name',
    },
    value: {
      control: { type: 'text' },
      description: 'Form field value when checked',
      defaultValue: 'on',
    },
    semanticRole: {
      control: { type: 'text' },
      description: 'Semantic role for AI understanding',
    },
    aiContext: {
      control: { type: 'text' },
      description: 'Context for AI assistants',
    },
    maxRenderMs: {
      control: { type: 'number' },
      description: 'Maximum render time in milliseconds',
      defaultValue: 16,
    },
    warnOnViolation: {
      control: { type: 'boolean' },
      description: 'Warn on performance violations',
      defaultValue: false,
    },
    performanceMode: {
      control: { type: 'select' },
      options: ['auto', 'fast', 'normal'],
      description: 'Performance mode setting',
      defaultValue: 'auto',
    },
    devMode: {
      control: { type: 'boolean' },
      description: 'Enable development mode',
      defaultValue: false,
    },
    showMetrics: {
      control: { type: 'boolean' },
      description: 'Show performance metrics',
      defaultValue: false,
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
The ForgeSwitch component is a toggle switch for binary choices with smooth animations and multiple states.

## Features
- On/off toggle functionality
- Three sizes (sm, md, lg)
- Loading state with animation
- Error state for validation
- Custom on/off labels
- Label positioning (start, end, top, bottom)
- Helper text support
- Required field indicator
- Keyboard navigation (Space/Enter)
- **AI-Ready**: Full ADR-014 compliance with AI metadata and helpers
- **Performance Monitoring**: Self-monitoring with auto-degradation
- **Developer Mode**: Built-in metrics and debugging
- **Accessibility**: ARIA attributes, keyboard support

## Usage

### Basic Usage
\`\`\`html
<forge-switch label="Enable notifications"></forge-switch>
\`\`\`

### With Description
\`\`\`html
<forge-switch 
  label="Auto-save"
  description="Automatically save your work every 5 minutes">
</forge-switch>
\`\`\`

### With On/Off Labels
\`\`\`html
<forge-switch 
  on-label="ON"
  off-label="OFF">
</forge-switch>
\`\`\`

### AI-Ready Switch
\`\`\`html
<forge-switch 
  label="Dark mode"
  semantic-role="theme-toggle"
  ai-context="user-preferences"
  aria-description="Toggle between light and dark theme">
</forge-switch>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<ForgeSwitch>;

export const Default: Story = {
  render: (args) => html`
    <forge-switch
      ?checked="${args.checked}"
      ?disabled="${args.disabled}"
      ?loading="${args.loading}"
      ?required="${args.required}"
      ?error="${args.error}"
      label="${args.label || 'Toggle switch'}"
      description="${args.description || ''}"
      on-label="${args.onLabel || ''}"
      off-label="${args.offLabel || ''}"
      size="${args.size}"
      label-position="${args.labelPosition}"
      name="${args.name || ''}"
      value="${args.value}"
    ></forge-switch>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <forge-switch label="Default"></forge-switch>
      <forge-switch label="Checked" checked></forge-switch>
      <forge-switch label="Disabled" disabled></forge-switch>
      <forge-switch label="Disabled Checked" disabled checked></forge-switch>
      <forge-switch label="Loading" loading></forge-switch>
      <forge-switch label="Error" error></forge-switch>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <forge-switch size="sm" label="Small switch"></forge-switch>
      <forge-switch size="md" label="Medium switch (default)"></forge-switch>
      <forge-switch size="lg" label="Large switch"></forge-switch>
    </div>
  `,
};

export const WithOnOffLabels: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <forge-switch size="md" on-label="I" off-label="O" label="Simple"></forge-switch>
      <forge-switch size="lg" on-label="ON" off-label="OFF" label="Standard" checked></forge-switch>
      <forge-switch size="lg" on-label="YES" off-label="NO" label="Decision"></forge-switch>
    </div>
  `,
};

export const LabelPositions: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; max-width: 600px;">
      <forge-switch 
        label="Label at end (default)"
        label-position="end">
      </forge-switch>
      
      <forge-switch 
        label="Label at start"
        label-position="start">
      </forge-switch>
      
      <forge-switch 
        label="Label on top"
        description="With description"
        label-position="top">
      </forge-switch>
      
      <forge-switch 
        label="Label on bottom"
        description="With description"
        label-position="bottom">
      </forge-switch>
    </div>
  `,
};

export const WithDescription: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <forge-switch 
        label="Enable notifications"
        description="Receive push notifications for important updates">
      </forge-switch>
      
      <forge-switch 
        label="Auto-save"
        description="Automatically save your work every 5 minutes"
        checked>
      </forge-switch>
      
      <forge-switch 
        label="Developer mode"
        description="Enable advanced features and debugging tools">
      </forge-switch>
    </div>
  `,
};

export const Required: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <forge-switch 
        label="Accept terms and conditions"
        required>
      </forge-switch>
      
      <forge-switch 
        label="Agree to data processing"
        description="Required for service usage"
        required>
      </forge-switch>
    </div>
  `,
};

export const SettingsPanel: Story = {
  name: 'Settings Panel Example',
  render: () => html`
    <div style="max-width: 400px; padding: 24px; background: #f9fafb; border-radius: 8px;">
      <h3 style="margin-top: 0; margin-bottom: 24px;">Notification Settings</h3>
      
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <forge-switch 
          label="Email notifications"
          description="Receive updates via email"
          checked
          semantic-role="email-notifications-toggle"
          ai-context="notification-settings">
        </forge-switch>
        
        <forge-switch 
          label="Push notifications"
          description="Get instant alerts on your device"
          semantic-role="push-notifications-toggle"
          ai-context="notification-settings">
        </forge-switch>
        
        <forge-switch 
          label="SMS alerts"
          description="Receive text messages for critical updates"
          semantic-role="sms-notifications-toggle"
          ai-context="notification-settings">
        </forge-switch>
        
        <forge-switch 
          label="Marketing emails"
          description="Promotional offers and newsletters"
          semantic-role="marketing-consent-toggle"
          ai-context="notification-settings">
        </forge-switch>
      </div>
    </div>
  `,
};

export const LoadingState: Story = {
  name: 'Loading State Demo',
  render: () => {
    const handleToggle = async (e: Event) => {
      const switch_ = e.target as ForgeSwitch;
      switch_.loading = true;
      
      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      switch_.loading = false;
      switch_.checked = !switch_.checked;
    };
    
    return html`
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <forge-switch 
          label="Async operation (click to toggle)"
          description="Simulates a 2-second server request"
          @forge-change="${handleToggle}">
        </forge-switch>
        
        <forge-switch 
          label="Already loading"
          loading>
        </forge-switch>
      </div>
    `;
  },
};

export const FormIntegration: Story = {
  name: 'Form Integration',
  render: () => html`
    <form @submit="${(e: Event) => { e.preventDefault(); alert('Form submitted!'); }}" 
          style="display: flex; flex-direction: column; gap: 20px; max-width: 400px;">
      <h3 style="margin: 0;">Privacy Settings</h3>
      
      <forge-switch 
        name="analytics"
        value="enabled"
        label="Analytics"
        description="Help us improve by sharing usage data"
        checked>
      </forge-switch>
      
      <forge-switch 
        name="cookies"
        value="enabled"
        label="Cookies"
        description="Enable cookies for better experience"
        checked>
      </forge-switch>
      
      <forge-switch 
        name="personalization"
        value="enabled"
        label="Personalization"
        description="Customize content based on your preferences">
      </forge-switch>
      
      <forge-switch 
        name="terms"
        value="accepted"
        label="I accept the privacy policy"
        required
        error>
      </forge-switch>
      
      <forge-button type="submit" variant="primary">
        Save Settings
      </forge-button>
    </form>
  `,
};

export const AIReadySwitch: Story = {
  name: 'AI-Ready Switch (ADR-014)',
  render: () => html`
    <forge-switch 
      label="Dark mode"
      description="Switch between light and dark theme"
      semantic-role="theme-toggle"
      ai-context="user-preferences"
      aria-description="Toggle to switch between light and dark color themes"
      checked>
    </forge-switch>
    <div style="margin-top: 20px; padding: 16px; background: #f3f4f6; border-radius: 8px; font-size: 14px;">
      <strong>AI Metadata (ADR-014):</strong><br>
      Purpose: Toggle binary state<br>
      Data Type: boolean<br>
      Criticality: medium<br>
      Semantic Role: theme-toggle<br>
      AI Context: user-preferences<br>
      <br>
      <strong>Available Actions:</strong><br>
      - toggle: Toggle the switch on/off<br>
      - reset: Reset switch to off state<br>
      <br>
      <strong>Current State:</strong> on<br>
      <strong>State Description:</strong> Switch is turned on
    </div>
  `,
};

export const PerformanceMonitoring: Story = {
  name: 'Performance Monitoring',
  render: () => html`
    <forge-switch 
      label="Performance monitored switch"
      description="This switch tracks render performance"
      max-render-ms="8"
      warn-on-violation
      performance-mode="auto"
      dev-mode
      show-metrics>
    </forge-switch>
    <div style="margin-top: 20px; padding: 16px; background: #fef3c7; border-radius: 8px; font-size: 14px;">
      <strong>Performance Settings:</strong><br>
      Max Render: 8ms<br>
      Warnings: Enabled<br>
      Mode: Auto-degradation (animations disabled if slow)<br>
      <em>Check console for performance logs</em>
    </div>
  `,
};

export const InteractiveDemo: Story = {
  name: 'Interactive Demo',
  render: () => {
    const handleChange = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      const output = document.querySelector('#switch-output');
      const stateInfo = document.querySelector('#state-info');
      const switch_ = e.target as ForgeSwitch;
      
      if (output) {
        output.textContent = JSON.stringify(detail, null, 2);
      }
      
      if (stateInfo && switch_) {
        const state = switch_.explainState();
        stateInfo.textContent = `State: ${state.currentState}\nDescription: ${state.stateDescription}`;
      }
    };
    
    return html`
      <div style="display: flex; gap: 40px;">
        <div style="flex: 1;">
          <h3 style="margin-top: 0;">Try the switch</h3>
          <forge-switch 
            label="Interactive switch"
            description="Toggle to see events and state"
            on-label="ON"
            off-label="OFF"
            size="lg"
            @forge-change="${handleChange}">
          </forge-switch>
        </div>
        <div style="flex: 1;">
          <h3 style="margin-top: 0;">Event Output</h3>
          <pre id="switch-output" style="background: #f3f4f6; padding: 12px; border-radius: 4px; min-height: 80px;">
// Toggle switch to see event data
          </pre>
          <h3>State Info (ADR-014)</h3>
          <pre id="state-info" style="background: #f3f4f6; padding: 12px; border-radius: 4px; min-height: 60px;">
State: off
Description: Switch is turned off
          </pre>
        </div>
      </div>
    `;
  },
};