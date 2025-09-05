import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './checkbox';
import type { ForgeCheckbox } from './checkbox';
import '../button/button';

const meta: Meta<ForgeCheckbox> = {
  title: 'Atoms/Checkbox',
  component: 'forge-checkbox',
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: { type: 'boolean' },
      description: 'Checked state',
      defaultValue: false,
    },
    indeterminate: {
      control: { type: 'boolean' },
      description: 'Indeterminate state',
      defaultValue: false,
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled state',
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
      description: 'Checkbox label',
    },
    description: {
      control: { type: 'text' },
      description: 'Helper text below label',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Checkbox size',
      defaultValue: 'md',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'filled', 'outlined'],
      description: 'Visual variant',
      defaultValue: 'default',
    },
    labelPosition: {
      control: { type: 'select' },
      options: ['start', 'end'],
      description: 'Label position relative to checkbox',
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
The ForgeCheckbox component is a customizable checkbox with support for indeterminate state, validation, and multiple visual variants.

## Features
- Three states: unchecked, checked, indeterminate
- Three visual variants (default, filled, outlined)
- Three sizes (sm, md, lg)
- Label positioning (start/end)
- Helper text support
- Error state for validation
- Required field indicator
- Keyboard navigation (Space/Enter)
- **AI-Ready**: Semantic roles and context for AI assistants
- **Performance Monitoring**: Self-monitoring with budget enforcement
- **Developer Mode**: Built-in metrics and debugging
- **Accessibility**: ARIA attributes, keyboard support

## Usage

### Basic Usage
\`\`\`html
<forge-checkbox label="I agree to the terms"></forge-checkbox>
\`\`\`

### With Description
\`\`\`html
<forge-checkbox 
  label="Subscribe to newsletter"
  description="Get weekly updates about new features">
</forge-checkbox>
\`\`\`

### Indeterminate State
\`\`\`html
<forge-checkbox 
  label="Select all"
  indeterminate>
</forge-checkbox>
\`\`\`

### Form Integration
\`\`\`html
<form>
  <forge-checkbox 
    name="terms"
    value="accepted"
    required
    label="Accept terms and conditions">
  </forge-checkbox>
</form>
\`\`\`

### AI-Ready Checkbox
\`\`\`html
<forge-checkbox 
  label="Marketing consent"
  semantic-role="marketing-opt-in"
  ai-context="user-preferences">
</forge-checkbox>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<ForgeCheckbox>;

export const Default: Story = {
  render: (args) => html`
    <forge-checkbox
      ?checked="${args.checked}"
      ?indeterminate="${args.indeterminate}"
      ?disabled="${args.disabled}"
      ?required="${args.required}"
      ?error="${args.error}"
      label="${args.label || 'Checkbox label'}"
      description="${args.description || ''}"
      size="${args.size}"
      variant="${args.variant}"
      label-position="${args.labelPosition}"
      name="${args.name || ''}"
      value="${args.value}"
    ></forge-checkbox>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <forge-checkbox label="Unchecked"></forge-checkbox>
      <forge-checkbox label="Checked" checked></forge-checkbox>
      <forge-checkbox label="Indeterminate" indeterminate></forge-checkbox>
      <forge-checkbox label="Disabled" disabled></forge-checkbox>
      <forge-checkbox label="Disabled Checked" disabled checked></forge-checkbox>
      <forge-checkbox label="Error state" error></forge-checkbox>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <forge-checkbox size="sm" label="Small checkbox"></forge-checkbox>
      <forge-checkbox size="md" label="Medium checkbox (default)"></forge-checkbox>
      <forge-checkbox size="lg" label="Large checkbox"></forge-checkbox>
    </div>
  `,
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <div>
        <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600;">Default Variant</h3>
        <div style="display: flex; gap: 16px;">
          <forge-checkbox variant="default" label="Unchecked"></forge-checkbox>
          <forge-checkbox variant="default" label="Checked" checked></forge-checkbox>
          <forge-checkbox variant="default" label="Indeterminate" indeterminate></forge-checkbox>
        </div>
      </div>
      
      <div>
        <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600;">Filled Variant</h3>
        <div style="display: flex; gap: 16px;">
          <forge-checkbox variant="filled" label="Unchecked"></forge-checkbox>
          <forge-checkbox variant="filled" label="Checked" checked></forge-checkbox>
          <forge-checkbox variant="filled" label="Indeterminate" indeterminate></forge-checkbox>
        </div>
      </div>
      
      <div>
        <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600;">Outlined Variant</h3>
        <div style="display: flex; gap: 16px;">
          <forge-checkbox variant="outlined" label="Unchecked"></forge-checkbox>
          <forge-checkbox variant="outlined" label="Checked" checked></forge-checkbox>
          <forge-checkbox variant="outlined" label="Indeterminate" indeterminate></forge-checkbox>
        </div>
      </div>
    </div>
  `,
};

export const WithDescription: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <forge-checkbox 
        label="Enable notifications"
        description="Receive email updates about your account">
      </forge-checkbox>
      
      <forge-checkbox 
        label="Auto-save"
        description="Automatically save your work every 5 minutes"
        checked>
      </forge-checkbox>
      
      <forge-checkbox 
        label="Developer mode"
        description="Enable advanced features and debugging tools">
      </forge-checkbox>
    </div>
  `,
};

export const LabelPosition: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <forge-checkbox 
        label="Label on the right (default)"
        label-position="end">
      </forge-checkbox>
      
      <forge-checkbox 
        label="Label on the left"
        label-position="start">
      </forge-checkbox>
      
      <forge-checkbox 
        label="With description on the left"
        description="Additional information"
        label-position="start">
      </forge-checkbox>
    </div>
  `,
};

export const Required: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <forge-checkbox 
        label="I accept the terms and conditions"
        required>
      </forge-checkbox>
      
      <forge-checkbox 
        label="I agree to receive marketing emails"
        description="You can unsubscribe at any time"
        required>
      </forge-checkbox>
    </div>
  `,
};

export const CheckboxGroup: Story = {
  name: 'Checkbox Group',
  render: () => html`
    <fieldset style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px;">
      <legend style="padding: 0 8px; font-weight: 600;">Select your interests</legend>
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <forge-checkbox 
          name="interests"
          value="technology"
          label="Technology"
          semantic-role="interest-selection"
          ai-context="user-preferences">
        </forge-checkbox>
        <forge-checkbox 
          name="interests"
          value="design"
          label="Design"
          semantic-role="interest-selection"
          ai-context="user-preferences">
        </forge-checkbox>
        <forge-checkbox 
          name="interests"
          value="business"
          label="Business"
          semantic-role="interest-selection"
          ai-context="user-preferences">
        </forge-checkbox>
        <forge-checkbox 
          name="interests"
          value="marketing"
          label="Marketing"
          semantic-role="interest-selection"
          ai-context="user-preferences">
        </forge-checkbox>
      </div>
    </fieldset>
  `,
};

export const IndeterminateExample: Story = {
  name: 'Indeterminate State (Select All)',
  render: () => {
    const handleSelectAll = (e: Event) => {
      const selectAll = e.target as ForgeCheckbox;
      const checkboxes = document.querySelectorAll('.child-checkbox') as NodeListOf<ForgeCheckbox>;
      
      if (selectAll.indeterminate) {
        selectAll.indeterminate = false;
        selectAll.checked = true;
      }
      
      checkboxes.forEach(cb => {
        cb.checked = selectAll.checked;
      });
    };
    
    const handleChildChange = () => {
      const selectAll = document.querySelector('.select-all') as ForgeCheckbox;
      const checkboxes = document.querySelectorAll('.child-checkbox') as NodeListOf<ForgeCheckbox>;
      const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
      
      if (checkedCount === 0) {
        selectAll.checked = false;
        selectAll.indeterminate = false;
      } else if (checkedCount === checkboxes.length) {
        selectAll.checked = true;
        selectAll.indeterminate = false;
      } else {
        selectAll.checked = false;
        selectAll.indeterminate = true;
      }
    };
    
    return html`
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <forge-checkbox 
          class="select-all"
          label="Select all"
          @change="${handleSelectAll}">
        </forge-checkbox>
        <div style="margin-left: 24px; display: flex; flex-direction: column; gap: 8px;">
          <forge-checkbox 
            class="child-checkbox"
            label="Option 1"
            @change="${handleChildChange}">
          </forge-checkbox>
          <forge-checkbox 
            class="child-checkbox"
            label="Option 2"
            @change="${handleChildChange}">
          </forge-checkbox>
          <forge-checkbox 
            class="child-checkbox"
            label="Option 3"
            @change="${handleChildChange}">
          </forge-checkbox>
        </div>
      </div>
    `;
  },
};

export const FormExample: Story = {
  name: 'Form Integration',
  render: () => html`
    <form @submit="${(e: Event) => { e.preventDefault(); alert('Form submitted!'); }}" 
          style="display: flex; flex-direction: column; gap: 20px; max-width: 400px;">
      <h3 style="margin: 0;">User Preferences</h3>
      
      <forge-checkbox 
        name="newsletter"
        value="yes"
        label="Subscribe to newsletter"
        description="Get updates about new features and products">
      </forge-checkbox>
      
      <forge-checkbox 
        name="marketing"
        value="yes"
        label="Marketing communications"
        description="Receive promotional offers and discounts">
      </forge-checkbox>
      
      <forge-checkbox 
        name="analytics"
        value="yes"
        label="Help improve our services"
        description="Share anonymous usage data"
        checked>
      </forge-checkbox>
      
      <forge-checkbox 
        name="terms"
        value="accepted"
        label="I accept the terms and conditions"
        required
        error>
      </forge-checkbox>
      
      <forge-button type="submit" variant="primary">
        Save Preferences
      </forge-button>
    </form>
  `,
};

export const AIReadyCheckbox: Story = {
  name: 'AI-Ready Checkbox',
  render: () => html`
    <forge-checkbox 
      label="Enable AI assistance"
      description="Allow AI to help with form completion and suggestions"
      semantic-role="ai-consent"
      ai-context="user-settings"
      aria-description="Checkbox to enable or disable AI-powered features"
      checked>
    </forge-checkbox>
    <div style="margin-top: 20px; padding: 16px; background: #f3f4f6; border-radius: 8px; font-size: 14px;">
      <strong>AI Metadata:</strong><br>
      Semantic Role: ai-consent<br>
      AI Context: user-settings<br>
      ARIA Description: Checkbox to enable or disable AI-powered features
    </div>
  `,
};

export const PerformanceMonitoring: Story = {
  name: 'Performance Monitoring',
  render: () => html`
    <forge-checkbox 
      label="Performance monitored checkbox"
      description="This checkbox tracks render performance"
      max-render-ms="8"
      warn-on-violation
      performance-mode="auto"
      dev-mode
      show-metrics>
    </forge-checkbox>
    <div style="margin-top: 20px; padding: 16px; background: #fef3c7; border-radius: 8px; font-size: 14px;">
      <strong>Performance Settings:</strong><br>
      Max Render: 8ms<br>
      Warnings: Enabled<br>
      Mode: Auto<br>
      <em>Check console for performance logs</em>
    </div>
  `,
};

export const InteractiveDemo: Story = {
  name: 'Interactive Demo',
  render: () => {
    const handleChange = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      const output = document.querySelector('#output');
      if (output) {
        output.textContent = JSON.stringify(detail, null, 2);
      }
    };
    
    return html`
      <div style="display: flex; gap: 40px;">
        <div style="flex: 1;">
          <h3 style="margin-top: 0;">Try the checkboxes</h3>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <forge-checkbox 
              label="Option A"
              value="a"
              @change="${handleChange}">
            </forge-checkbox>
            <forge-checkbox 
              label="Option B"
              value="b"
              @change="${handleChange}">
            </forge-checkbox>
            <forge-checkbox 
              label="Option C"
              value="c"
              @change="${handleChange}">
            </forge-checkbox>
          </div>
        </div>
        <div style="flex: 1;">
          <h3 style="margin-top: 0;">Event Output</h3>
          <pre id="output" style="background: #f3f4f6; padding: 12px; border-radius: 4px; min-height: 100px;">
// Click a checkbox to see event data
          </pre>
        </div>
      </div>
    `;
  },
};