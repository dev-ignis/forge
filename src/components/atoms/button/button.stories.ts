import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './button';
import type { ForgeButton } from './button';

const meta: Meta<ForgeButton> = {
  title: 'Atoms/Button',
  component: 'forge-button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger', 'ghost', 'link'],
      description: 'Visual variant of the button',
      defaultValue: 'primary',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the button',
      defaultValue: 'md',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the button is disabled',
      defaultValue: false,
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Whether the button is in a loading state',
      defaultValue: false,
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Whether the button should take full width',
      defaultValue: false,
    },
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
      description: 'Button type attribute',
      defaultValue: 'button',
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
    ariaDescription: {
      control: { type: 'text' },
      description: 'Enhanced description for screen readers and AI',
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
      description: 'Show performance metrics overlay',
      defaultValue: false,
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
The ForgeButton component is a versatile, accessible button component that follows the design system tokens.

## Features
- Multiple visual variants (primary, secondary, danger, ghost, link)
- Three size options (sm, md, lg)
- Loading and disabled states
- Full keyboard navigation support
- ARIA compliant
- Token-based theming
- **AI-Ready**: Semantic roles and context for AI assistants
- **Performance Monitoring**: Self-monitoring with budget enforcement
- **Developer Mode**: Built-in metrics and debugging

## Usage

### Basic Usage
\`\`\`html
<forge-button variant="primary" size="md">Click me</forge-button>
\`\`\`

### AI-Ready Usage
\`\`\`html
<forge-button 
  semantic-role="submit-action"
  ai-context="form-submission"
  aria-description="Submit the payment form">
  Submit Payment
</forge-button>
\`\`\`

### Performance Monitoring
\`\`\`html
<forge-button 
  max-render-ms="8"
  warn-on-violation
  performance-mode="fast">
  Fast Button
</forge-button>
\`\`\`

### Developer Mode
\`\`\`html
<forge-button 
  dev-mode
  show-metrics>
  Debug Button
</forge-button>
\`\`\`

## Theming

The button component uses CSS Custom Properties for theming:
- \`--forge-color-*\` for colors
- \`--forge-spacing-*\` for padding
- \`--forge-font-*\` for typography
- \`--forge-border-*\` for borders
- \`--forge-shadow-*\` for shadows
- \`--forge-transition-*\` for animations
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<ForgeButton>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
  },
  render: (args) => html`
    <forge-button
      variant="${args.variant}"
      size="${args.size}"
      ?disabled="${args.disabled}"
      ?loading="${args.loading}"
      ?full-width="${args.fullWidth}"
      type="${args.type}"
    >
      Primary Button
    </forge-button>
  `,
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'md',
  },
  render: (args) => html`
    <forge-button variant="${args.variant}" size="${args.size}">
      Secondary Button
    </forge-button>
  `,
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    size: 'md',
  },
  render: (args) => html`
    <forge-button variant="${args.variant}" size="${args.size}">
      Delete
    </forge-button>
  `,
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'md',
  },
  render: (args) => html`
    <forge-button variant="${args.variant}" size="${args.size}">
      Ghost Button
    </forge-button>
  `,
};

export const Link: Story = {
  args: {
    variant: 'link',
    size: 'md',
  },
  render: (args) => html`
    <forge-button variant="${args.variant}" size="${args.size}">
      Link Button
    </forge-button>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center;">
      <forge-button size="sm">Small</forge-button>
      <forge-button size="md">Medium</forge-button>
      <forge-button size="lg">Large</forge-button>
    </div>
  `,
};

export const Loading: Story = {
  args: {
    loading: true,
    variant: 'primary',
  },
  render: (args) => html`
    <forge-button variant="${args.variant}" ?loading="${args.loading}">
      Loading...
    </forge-button>
  `,
};

export const Disabled: Story = {
  args: {
    disabled: true,
    variant: 'primary',
  },
  render: (args) => html`
    <forge-button variant="${args.variant}" ?disabled="${args.disabled}">
      Disabled
    </forge-button>
  `,
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    variant: 'primary',
  },
  render: (args) => html`
    <div style="width: 400px;">
      <forge-button variant="${args.variant}" ?full-width="${args.fullWidth}">
        Full Width Button
      </forge-button>
    </div>
  `,
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div style="display: flex; gap: 16px;">
        <forge-button variant="primary">Primary</forge-button>
        <forge-button variant="secondary">Secondary</forge-button>
        <forge-button variant="danger">Danger</forge-button>
        <forge-button variant="ghost">Ghost</forge-button>
        <forge-button variant="link">Link</forge-button>
      </div>
      <div style="display: flex; gap: 16px;">
        <forge-button variant="primary" disabled>Primary Disabled</forge-button>
        <forge-button variant="secondary" disabled>Secondary Disabled</forge-button>
        <forge-button variant="danger" disabled>Danger Disabled</forge-button>
        <forge-button variant="ghost" disabled>Ghost Disabled</forge-button>
        <forge-button variant="link" disabled>Link Disabled</forge-button>
      </div>
      <div style="display: flex; gap: 16px;">
        <forge-button variant="primary" loading>Loading</forge-button>
        <forge-button variant="secondary" loading>Loading</forge-button>
        <forge-button variant="danger" loading>Loading</forge-button>
        <forge-button variant="ghost" loading>Loading</forge-button>
        <forge-button variant="link" loading>Loading</forge-button>
      </div>
    </div>
  `,
};

// AI-Ready Features Stories
export const AIReadyButton: Story = {
  name: 'AI-Ready Button',
  args: {
    variant: 'primary',
    semanticRole: 'submit-payment',
    aiContext: 'checkout-flow',
    ariaDescription: 'Submit payment form with validated credit card information',
  },
  render: (args) => html`
    <forge-button 
      variant="${args.variant}"
      semantic-role="${args.semanticRole}"
      ai-context="${args.aiContext}"
      aria-description="${args.ariaDescription}">
      Submit Payment
    </forge-button>
    <div style="margin-top: 20px; padding: 16px; background: #f3f4f6; border-radius: 8px; font-size: 14px;">
      <strong>AI Metadata:</strong><br>
      Semantic Role: ${args.semanticRole}<br>
      AI Context: ${args.aiContext}<br>
      ARIA Description: ${args.ariaDescription}
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates AI-ready features with semantic metadata for AI assistants and screen readers.',
      },
    },
  },
};

export const PerformanceMonitoring: Story = {
  name: 'Performance Monitoring',
  args: {
    variant: 'primary',
    maxRenderMs: 8,
    warnOnViolation: true,
    performanceMode: 'auto',
    devMode: true,
    showMetrics: true,
  },
  render: (args) => html`
    <forge-button 
      variant="${args.variant}"
      max-render-ms="${args.maxRenderMs}"
      ?warn-on-violation="${args.warnOnViolation}"
      performance-mode="${args.performanceMode}"
      ?dev-mode="${args.devMode}"
      ?show-metrics="${args.showMetrics}">
      Performance Monitored
    </forge-button>
    <div style="margin-top: 20px; padding: 16px; background: #fef3c7; border-radius: 8px; font-size: 14px;">
      <strong>Performance Settings:</strong><br>
      Max Render: ${args.maxRenderMs}ms<br>
      Warn on Violation: ${args.warnOnViolation}<br>
      Performance Mode: ${args.performanceMode}<br>
      <em>Check console for performance warnings if render exceeds budget</em>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Shows performance monitoring with budget enforcement and developer metrics.',
      },
    },
  },
};

export const DeveloperMode: Story = {
  name: 'Developer Mode',
  args: {
    variant: 'primary',
    devMode: true,
    showMetrics: true,
  },
  render: (args) => html`
    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
      <forge-button 
        variant="primary"
        ?dev-mode="${args.devMode}"
        ?show-metrics="${args.showMetrics}">
        With Metrics
      </forge-button>
      <forge-button 
        variant="secondary"
        size="lg"
        ?dev-mode="${args.devMode}"
        ?show-metrics="${args.showMetrics}">
        Large Button
      </forge-button>
      <forge-button 
        variant="danger"
        loading
        ?dev-mode="${args.devMode}"
        ?show-metrics="${args.showMetrics}">
        Loading
      </forge-button>
    </div>
    <div style="margin-top: 20px; padding: 16px; background: #ede9fe; border-radius: 8px; font-size: 14px;">
      <strong>Developer Mode Active:</strong><br>
      • Performance metrics overlay visible<br>
      • Console debugging enabled<br>
      • Component state logged<br>
      <em>Open DevTools console to see detailed component state</em>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Developer mode with performance metrics overlay and debugging features.',
      },
    },
  },
};

export const FormIntegration: Story = {
  name: 'Form Integration',
  render: () => html`
    <form @submit="${(e: Event) => { e.preventDefault(); alert('Form submitted!'); }}" style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
      <input type="text" placeholder="Enter your name" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
      <input type="email" placeholder="Enter your email" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
      <div style="display: flex; gap: 8px;">
        <forge-button 
          type="submit" 
          variant="primary"
          semantic-role="form-submit"
          ai-context="contact-form">
          Submit
        </forge-button>
        <forge-button 
          type="reset" 
          variant="secondary"
          semantic-role="form-reset"
          ai-context="contact-form">
          Reset
        </forge-button>
      </div>
    </form>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates form integration with submit and reset button types, including AI metadata.',
      },
    },
  },
};