import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './input';
import type { ForgeInput } from './input';

const meta: Meta<ForgeInput> = {
  title: 'Atoms/Input',
  component: 'forge-input',
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'Input type',
      defaultValue: 'text',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'filled', 'outlined'],
      description: 'Visual variant',
      defaultValue: 'default',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the input',
      defaultValue: 'md',
    },
    validationState: {
      control: { type: 'select' },
      options: ['default', 'error', 'warning', 'success'],
      description: 'Validation state',
      defaultValue: 'default',
    },
    value: {
      control: { type: 'text' },
      description: 'Input value',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text',
    },
    label: {
      control: { type: 'text' },
      description: 'Label text',
    },
    helperText: {
      control: { type: 'text' },
      description: 'Helper text below input',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled state',
      defaultValue: false,
    },
    readonly: {
      control: { type: 'boolean' },
      description: 'Readonly state',
      defaultValue: false,
    },
    required: {
      control: { type: 'boolean' },
      description: 'Required field',
      defaultValue: false,
    },
    clearable: {
      control: { type: 'boolean' },
      description: 'Show clear button',
      defaultValue: false,
    },
    // AI-Ready attributes
    semanticRole: {
      control: { type: 'text' },
      description: 'Semantic role for AI understanding',
    },
    aiContext: {
      control: { type: 'text' },
      description: 'Context for AI assistants',
    },
    // Performance monitoring
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
    // Developer mode
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
The ForgeInput component is a versatile, accessible input field with built-in validation, AI-ready metadata, and performance monitoring.

## Features
- Multiple input types (text, email, password, number, etc.)
- Three visual variants (default, filled, outlined)
- Validation states with visual feedback
- Prefix and suffix slots for icons/addons
- Clear button functionality
- Helper text and labels
- **AI-Ready**: Semantic roles and context for AI assistants
- **Performance Monitoring**: Self-monitoring with budget enforcement
- **Developer Mode**: Built-in metrics and debugging

## Usage

### Basic Usage
\`\`\`html
<forge-input 
  label="Username" 
  placeholder="Enter username"
  helper-text="Must be at least 3 characters">
</forge-input>
\`\`\`

### With Validation
\`\`\`html
<forge-input 
  type="email"
  label="Email Address"
  required
  validation-state="error"
  helper-text="Please enter a valid email">
</forge-input>
\`\`\`

### AI-Ready Input
\`\`\`html
<forge-input 
  semantic-role="login-username"
  ai-context="authentication-form"
  label="Username">
</forge-input>
\`\`\`

### With Prefix/Suffix Slots
\`\`\`html
<forge-input label="Price">
  <span slot="prefix">$</span>
  <span slot="suffix">.00</span>
</forge-input>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<ForgeInput>;

export const Default: Story = {
  render: (args) => html`
    <forge-input
      type="${args.type}"
      variant="${args.variant}"
      size="${args.size}"
      validation-state="${args.validationState}"
      value="${args.value || ''}"
      placeholder="${args.placeholder || 'Enter text...'}"
      label="${args.label || ''}"
      helper-text="${args.helperText || ''}"
      ?disabled="${args.disabled}"
      ?readonly="${args.readonly}"
      ?required="${args.required}"
      ?clearable="${args.clearable}"
    ></forge-input>
  `,
};

export const WithLabel: Story = {
  render: () => html`
    <forge-input 
      label="Email Address" 
      type="email"
      placeholder="john@example.com"
      helper-text="We'll never share your email">
    </forge-input>
  `,
};

export const Required: Story = {
  render: () => html`
    <forge-input 
      label="Username" 
      required
      placeholder="Choose a username"
      helper-text="Required field">
    </forge-input>
  `,
};

export const ValidationStates: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px; max-width: 400px;">
      <forge-input 
        label="Default State" 
        value="Normal input"
        validation-state="default">
      </forge-input>
      
      <forge-input 
        label="Error State" 
        value="Invalid input"
        validation-state="error"
        helper-text="This field has an error">
      </forge-input>
      
      <forge-input 
        label="Warning State" 
        value="Check this"
        validation-state="warning"
        helper-text="Please review this field">
      </forge-input>
      
      <forge-input 
        label="Success State" 
        value="Valid input"
        validation-state="success"
        helper-text="Field validated successfully">
      </forge-input>
    </div>
  `,
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px; max-width: 400px;">
      <forge-input 
        label="Default Variant" 
        variant="default"
        placeholder="Default input style">
      </forge-input>
      
      <forge-input 
        label="Filled Variant" 
        variant="filled"
        placeholder="Filled input style">
      </forge-input>
      
      <forge-input 
        label="Outlined Variant" 
        variant="outlined"
        placeholder="Outlined input style">
      </forge-input>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px; max-width: 400px;">
      <forge-input 
        label="Small" 
        size="sm"
        placeholder="Small input">
      </forge-input>
      
      <forge-input 
        label="Medium" 
        size="md"
        placeholder="Medium input">
      </forge-input>
      
      <forge-input 
        label="Large" 
        size="lg"
        placeholder="Large input">
      </forge-input>
    </div>
  `,
};

export const InputTypes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px; max-width: 400px;">
      <forge-input 
        label="Text" 
        type="text"
        placeholder="Enter text">
      </forge-input>
      
      <forge-input 
        label="Email" 
        type="email"
        placeholder="email@example.com">
      </forge-input>
      
      <forge-input 
        label="Password" 
        type="password"
        placeholder="Enter password">
      </forge-input>
      
      <forge-input 
        label="Number" 
        type="number"
        placeholder="Enter number"
        min="0"
        max="100"
        step="5">
      </forge-input>
      
      <forge-input 
        label="Phone" 
        type="tel"
        placeholder="+1 (555) 123-4567">
      </forge-input>
      
      <forge-input 
        label="URL" 
        type="url"
        placeholder="https://example.com">
      </forge-input>
      
      <forge-input 
        label="Search" 
        type="search"
        placeholder="Search...">
      </forge-input>
    </div>
  `,
};

export const WithClearButton: Story = {
  render: () => html`
    <forge-input 
      label="Clearable Input" 
      clearable
      value="Click X to clear"
      helper-text="This input can be cleared">
    </forge-input>
  `,
};

export const DisabledAndReadonly: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px; max-width: 400px;">
      <forge-input 
        label="Disabled Input" 
        disabled
        value="Cannot edit this">
      </forge-input>
      
      <forge-input 
        label="Readonly Input" 
        readonly
        value="Read only value">
      </forge-input>
    </div>
  `,
};

export const WithPrefixAndSuffix: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px; max-width: 400px;">
      <forge-input label="Price">
        <span slot="prefix">$</span>
        <span slot="suffix">.00</span>
      </forge-input>
      
      <forge-input label="Website">
        <span slot="prefix">https://</span>
        <span slot="suffix">.com</span>
      </forge-input>
      
      <forge-input label="Username">
        <span slot="prefix">@</span>
      </forge-input>
    </div>
  `,
};

// AI-Ready Feature Stories
export const AIReadyInput: Story = {
  name: 'AI-Ready Input',
  render: () => html`
    <forge-input 
      label="Email Address"
      type="email"
      semantic-role="primary-email"
      ai-context="user-registration"
      aria-description="Primary email for account registration"
      required
      helper-text="This will be your login email">
    </forge-input>
    <div style="margin-top: 20px; padding: 16px; background: #f3f4f6; border-radius: 8px; font-size: 14px;">
      <strong>AI Metadata:</strong><br>
      Semantic Role: primary-email<br>
      AI Context: user-registration<br>
      ARIA Description: Primary email for account registration
    </div>
  `,
};

export const PerformanceMonitoring: Story = {
  name: 'Performance Monitoring',
  render: () => html`
    <forge-input 
      label="Monitored Input"
      max-render-ms="8"
      warn-on-violation
      performance-mode="auto"
      dev-mode
      show-metrics
      helper-text="Performance metrics shown above">
    </forge-input>
    <div style="margin-top: 20px; padding: 16px; background: #fef3c7; border-radius: 8px; font-size: 14px;">
      <strong>Performance Settings:</strong><br>
      Max Render: 8ms<br>
      Warnings: Enabled<br>
      Mode: Auto-degradation<br>
      <em>Check console for performance logs</em>
    </div>
  `,
};

export const FormExample: Story = {
  name: 'Form Example',
  render: () => html`
    <form @submit="${(e: Event) => { e.preventDefault(); alert('Form submitted!'); }}" 
          style="display: flex; flex-direction: column; gap: 20px; max-width: 400px;">
      <forge-input 
        label="Full Name"
        name="fullName"
        required
        semantic-role="full-name"
        ai-context="contact-form">
      </forge-input>
      
      <forge-input 
        label="Email"
        type="email"
        name="email"
        required
        semantic-role="contact-email"
        ai-context="contact-form">
      </forge-input>
      
      <forge-input 
        label="Phone"
        type="tel"
        name="phone"
        semantic-role="contact-phone"
        ai-context="contact-form">
      </forge-input>
      
      <forge-input 
        label="Message"
        name="message"
        helper-text="Optional message"
        semantic-role="message-content"
        ai-context="contact-form">
      </forge-input>
      
      <forge-button type="submit" variant="primary">
        Submit Form
      </forge-button>
    </form>
  `,
};