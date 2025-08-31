import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './alert';
import type { ForgeAlert } from './alert';
import '../button/button';
import '../input/input';

const meta: Meta<ForgeAlert> = {
  title: 'Atoms/Alert',
  component: 'forge-alert',
  tags: ['autodocs'],
  argTypes: {
    severity: {
      control: { type: 'select' },
      options: ['info', 'success', 'warning', 'error'],
      description: 'Alert severity level',
      defaultValue: 'info',
    },
    variant: {
      control: { type: 'select' },
      options: ['standard', 'filled', 'outlined'],
      description: 'Visual variant',
      defaultValue: 'standard',
    },
    title: {
      control: { type: 'text' },
      description: 'Alert title',
    },
    message: {
      control: { type: 'text' },
      description: 'Alert message',
    },
    closable: {
      control: { type: 'boolean' },
      description: 'Show close button',
      defaultValue: false,
    },
    animateIn: {
      control: { type: 'boolean' },
      description: 'Animate on mount',
      defaultValue: false,
    },
    autoDismiss: {
      control: { type: 'number' },
      description: 'Auto dismiss after milliseconds (0 = disabled)',
      defaultValue: 0,
    },
    icon: {
      control: { type: 'text' },
      description: 'Custom icon name',
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
The ForgeAlert component provides contextual feedback messages for user actions with multiple severity levels, visual variants, and dismissal options.

## Features
- Four severity levels (info, success, warning, error)
- Three visual variants (standard, filled, outlined)
- Optional title and message
- Closable with close button
- Auto-dismiss after timeout
- Custom icons
- Action slot for buttons
- **AI-Ready**: Semantic roles and context for AI assistants
- **Performance Monitoring**: Self-monitoring with auto-degradation
- **Developer Mode**: Built-in metrics and debugging
- **Accessibility**: ARIA live regions, proper roles and labels

## Usage

### Basic Usage
\`\`\`html
<forge-alert severity="info" title="Information" message="This is an informational alert.">
</forge-alert>
\`\`\`

### With Close Button
\`\`\`html
<forge-alert 
  severity="warning" 
  title="Warning"
  message="Please review your input."
  closable>
</forge-alert>
\`\`\`

### Auto-Dismiss
\`\`\`html
<forge-alert 
  severity="success"
  message="Changes saved successfully!"
  auto-dismiss="5000">
</forge-alert>
\`\`\`

### With Actions
\`\`\`html
<forge-alert severity="error" title="Error">
  An error occurred while processing your request.
  <forge-button slot="actions" variant="text">Retry</forge-button>
  <forge-button slot="actions" variant="text">Details</forge-button>
</forge-alert>
\`\`\`

### AI-Ready Alert
\`\`\`html
<forge-alert 
  severity="error"
  title="Validation Error"
  message="Please fix the errors below"
  semantic-role="form-validation-error"
  ai-context="checkout-form">
</forge-alert>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<ForgeAlert>;

export const Default: Story = {
  render: (args) => html`
    <forge-alert
      severity="${args.severity}"
      variant="${args.variant}"
      title="${args.title || 'Alert Title'}"
      message="${args.message || 'This is an alert message.'}"
      ?closable="${args.closable}"
      ?animate-in="${args.animateIn}"
      auto-dismiss="${args.autoDismiss || 0}"
      icon="${args.icon || ''}"
    ></forge-alert>
  `,
};

export const AllSeverities: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <forge-alert severity="info" title="Info" message="This is an informational message."></forge-alert>
      <forge-alert severity="success" title="Success" message="Your action was completed successfully!"></forge-alert>
      <forge-alert severity="warning" title="Warning" message="Please review this important information."></forge-alert>
      <forge-alert severity="error" title="Error" message="An error occurred. Please try again."></forge-alert>
    </div>
  `,
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">Standard Variant</h3>
      <forge-alert severity="info" variant="standard" title="Standard Info" message="Standard variant with light background"></forge-alert>
      <forge-alert severity="success" variant="standard" title="Standard Success" message="Standard variant with light background"></forge-alert>
      
      <h3 style="margin: 16px 0 8px 0; font-size: 14px; font-weight: 600;">Filled Variant</h3>
      <forge-alert severity="warning" variant="filled" title="Filled Warning" message="Filled variant with solid background"></forge-alert>
      <forge-alert severity="error" variant="filled" title="Filled Error" message="Filled variant with solid background"></forge-alert>
      
      <h3 style="margin: 16px 0 8px 0; font-size: 14px; font-weight: 600;">Outlined Variant</h3>
      <forge-alert severity="info" variant="outlined" title="Outlined Info" message="Outlined variant with border only"></forge-alert>
      <forge-alert severity="success" variant="outlined" title="Outlined Success" message="Outlined variant with border only"></forge-alert>
    </div>
  `,
};

export const Closable: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <forge-alert 
        severity="info" 
        title="Closable Alert"
        message="Click the X button to close this alert."
        closable>
      </forge-alert>
      
      <forge-alert 
        severity="warning" 
        variant="filled"
        title="Closable Warning"
        message="This filled alert can also be closed."
        closable>
      </forge-alert>
    </div>
  `,
};

export const AutoDismiss: Story = {
  render: () => html`
    <forge-alert 
      severity="success"
      title="Auto-Dismiss Alert"
      message="This alert will automatically disappear in 5 seconds."
      auto-dismiss="5000"
      animate-in>
    </forge-alert>
  `,
};

export const WithActions: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <forge-alert severity="error" title="Error with Actions" closable>
        An error occurred while saving your changes.
        <forge-button slot="actions" variant="text" size="sm">Retry</forge-button>
        <forge-button slot="actions" variant="text" size="sm">View Details</forge-button>
      </forge-alert>
      
      <forge-alert severity="warning" variant="filled" title="Confirmation Required">
        Are you sure you want to delete this item?
        <forge-button slot="actions" variant="text" size="sm" style="color: white;">Cancel</forge-button>
        <forge-button slot="actions" variant="text" size="sm" style="color: white;">Delete</forge-button>
      </forge-alert>
    </div>
  `,
};

export const CustomIcons: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <forge-alert 
        severity="info" 
        icon="user"
        title="User Alert"
        message="Custom user icon for this alert.">
      </forge-alert>
      
      <forge-alert 
        severity="success" 
        icon="download"
        title="Download Complete"
        message="Your file has been downloaded successfully.">
      </forge-alert>
      
      <forge-alert 
        severity="warning" 
        icon="settings"
        title="Settings Updated"
        message="Your preferences have been updated.">
      </forge-alert>
    </div>
  `,
};

export const LongContent: Story = {
  render: () => html`
    <forge-alert severity="info" title="Terms and Conditions Update" closable>
      We've updated our terms and conditions. The changes include improved clarity on data usage, 
      enhanced privacy protections, and updated guidelines for acceptable use. These changes will 
      take effect on January 1, 2025. Please review the full document to understand how these 
      changes may affect you.
      <forge-button slot="actions" variant="text" size="sm">Review Changes</forge-button>
      <forge-button slot="actions" variant="text" size="sm">Accept</forge-button>
    </forge-alert>
  `,
};

export const NoTitle: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <forge-alert severity="info" message="Simple message without title"></forge-alert>
      <forge-alert severity="success" message="Operation completed successfully!"></forge-alert>
      <forge-alert severity="warning" message="Please review your input"></forge-alert>
      <forge-alert severity="error" message="An error occurred"></forge-alert>
    </div>
  `,
};

export const Animated: Story = {
  render: () => html`
    <forge-alert 
      severity="success"
      variant="filled"
      title="Animated Alert"
      message="This alert slides in with animation."
      animate
      closable>
    </forge-alert>
  `,
};

export const AIReadyAlert: Story = {
  name: 'AI-Ready Alert',
  render: () => html`
    <forge-alert 
      severity="error"
      title="Form Validation Error"
      message="Please correct the errors in your form before submitting."
      semantic-role="validation-error"
      ai-context="checkout-form"
      aria-description="Form validation error alert for checkout process"
      closable>
      <forge-button slot="actions" variant="text" size="sm">View Errors</forge-button>
    </forge-alert>
    <div style="margin-top: 20px; padding: 16px; background: #f3f4f6; border-radius: 8px; font-size: 14px;">
      <strong>AI Metadata:</strong><br>
      Semantic Role: validation-error<br>
      AI Context: checkout-form<br>
      ARIA Description: Form validation error alert for checkout process
    </div>
  `,
};

export const PerformanceMonitoring: Story = {
  name: 'Performance Monitoring',
  render: () => html`
    <forge-alert 
      severity="info"
      title="Performance Monitored Alert"
      message="This alert tracks render performance."
      max-render-ms="8"
      warn-on-violation
      performance-mode="auto"
      dev-mode
      show-metrics
      closable>
    </forge-alert>
    <div style="margin-top: 20px; padding: 16px; background: #fef3c7; border-radius: 8px; font-size: 14px;">
      <strong>Performance Settings:</strong><br>
      Max Render: 8ms<br>
      Warnings: Enabled<br>
      Mode: Auto-degradation<br>
      <em>Check console for performance logs</em>
    </div>
  `,
};

export const NotificationStack: Story = {
  name: 'Notification Stack',
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px; max-width: 500px;">
      <forge-alert 
        severity="success"
        message="File uploaded successfully"
        icon="upload"
        closable
        animate-in>
      </forge-alert>
      
      <forge-alert 
        severity="info"
        message="Processing your request..."
        icon="settings"
        animate-in>
      </forge-alert>
      
      <forge-alert 
        severity="warning"
        title="Low Storage"
        message="You have only 10% storage remaining"
        closable
        animate-in>
        <forge-button slot="actions" variant="text" size="sm">Upgrade</forge-button>
      </forge-alert>
      
      <forge-alert 
        severity="error"
        title="Connection Lost"
        message="Unable to connect to server"
        closable
        animate-in>
        <forge-button slot="actions" variant="text" size="sm">Retry</forge-button>
      </forge-alert>
    </div>
  `,
};

export const InlineForm: Story = {
  name: 'Inline Form Alert',
  render: () => html`
    <form style="max-width: 400px; padding: 20px; background: #f9fafb; border-radius: 8px;">
      <h3 style="margin-top: 0;">Contact Form</h3>
      
      <forge-alert 
        severity="error"
        message="Please fix the errors below before submitting"
        semantic-role="form-validation-summary"
        ai-context="contact-form">
      </forge-alert>
      
      <div style="margin-top: 16px;">
        <forge-input 
          label="Email"
          type="email"
          validation-state="error"
          helper-text="Please enter a valid email"
          required>
        </forge-input>
      </div>
      
      <div style="margin-top: 16px;">
        <forge-input 
          label="Message"
          required>
        </forge-input>
      </div>
      
      <div style="margin-top: 16px;">
        <forge-button variant="primary" style="width: 100%;">Submit</forge-button>
      </div>
    </form>
  `,
};