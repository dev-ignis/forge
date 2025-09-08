import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './progress-circle';

const meta: Meta = {
  title: 'Components/Atoms/Progress Circle',
  component: 'forge-progress-circle',
  parameters: {
    docs: {
      description: {
        component: 'A circular progress component for showing progress in a compact, circular format. Perfect for upload progress, loading indicators, and completion status.'
      }
    }
  },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'The current progress value (0-100)'
    },
    max: {
      control: { type: 'number', min: 1, max: 200, step: 1 },
      description: 'The maximum progress value'
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'danger'],
      description: 'Visual variant of the progress circle'
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size of the progress circle'
    },
    showLabel: {
      control: { type: 'boolean' },
      description: 'Whether to show the label in the center'
    },
    hideLabel: {
      control: { type: 'boolean' },
      description: 'Whether to hide the label (overrides show-label)'
    },
    indeterminate: {
      control: { type: 'boolean' },
      description: 'Whether the progress is in indeterminate state (loading without known duration)'
    },
    ariaLabel: {
      control: { type: 'text' },
      description: 'Accessible label for the progress circle'
    }
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    value: 65,
    max: 100,
    variant: 'primary',
    size: 'medium',
    showLabel: true,
    hideLabel: false,
    indeterminate: false,
    ariaLabel: ''
  },
  render: (args) => html`
    <forge-progress-circle
      value=${args.value}
      max=${args.max}
      variant=${args.variant}
      size=${args.size}
      ?show-label=${args.showLabel}
      ?hide-label=${args.hideLabel}
      ?indeterminate=${args.indeterminate}
      aria-label=${args.ariaLabel || undefined}
    ></forge-progress-circle>
  `
};

export const WithCustomLabel: Story = {
  args: {
    value: 80,
    max: 100,
    variant: 'success',
    size: 'medium',
    showLabel: true,
    hideLabel: false,
    indeterminate: false
  },
  render: (args) => html`
    <forge-progress-circle
      value=${args.value}
      max=${args.max}
      variant=${args.variant}
      size=${args.size}
      ?show-label=${args.showLabel}
      ?hide-label=${args.hideLabel}
      ?indeterminate=${args.indeterminate}
    >
      80/100
    </forge-progress-circle>
  `
};

export const NoLabel: Story = {
  args: {
    value: 45,
    max: 100,
    variant: 'primary',
    size: 'medium',
    hideLabel: true,
    indeterminate: false
  },
  render: (args) => html`
    <forge-progress-circle
      value=${args.value}
      max=${args.max}
      variant=${args.variant}
      size=${args.size}
      ?hide-label=${args.hideLabel}
      ?indeterminate=${args.indeterminate}
    ></forge-progress-circle>
  `
};

export const Indeterminate: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    indeterminate: true
  },
  render: (args) => html`
    <forge-progress-circle
      variant=${args.variant}
      size=${args.size}
      ?indeterminate=${args.indeterminate}
    ></forge-progress-circle>
  `
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: center;">
      <div style="text-align: center;">
        <h4>Primary</h4>
        <forge-progress-circle value="50" variant="primary"></forge-progress-circle>
      </div>
      
      <div style="text-align: center;">
        <h4>Secondary</h4>
        <forge-progress-circle value="60" variant="secondary"></forge-progress-circle>
      </div>
      
      <div style="text-align: center;">
        <h4>Success</h4>
        <forge-progress-circle value="80" variant="success"></forge-progress-circle>
      </div>
      
      <div style="text-align: center;">
        <h4>Warning</h4>
        <forge-progress-circle value="40" variant="warning"></forge-progress-circle>
      </div>
      
      <div style="text-align: center;">
        <h4>Danger</h4>
        <forge-progress-circle value="25" variant="danger"></forge-progress-circle>
      </div>
    </div>
  `
};

export const AllSizes: Story = {
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: center;">
      <div style="text-align: center;">
        <h4>Small</h4>
        <forge-progress-circle value="75" size="small"></forge-progress-circle>
      </div>
      
      <div style="text-align: center;">
        <h4>Medium</h4>
        <forge-progress-circle value="75" size="medium"></forge-progress-circle>
      </div>
      
      <div style="text-align: center;">
        <h4>Large</h4>
        <forge-progress-circle value="75" size="large"></forge-progress-circle>
      </div>
    </div>
  `
};

export const UploadProgressExample: Story = {
  render: () => {
    const updateProgress = () => {
      const progressCircle = document.querySelector('#upload-progress-circle') as any;
      if (progressCircle) {
        let currentValue = progressCircle.value || 0;
        currentValue += 12;
        if (currentValue > 100) currentValue = 0;
        progressCircle.updateProgress(currentValue);
        
        if (currentValue === 100) {
          progressCircle.variant = 'success';
          progressCircle.innerHTML = '✓';
        } else if (currentValue === 0) {
          progressCircle.variant = 'primary';
          progressCircle.innerHTML = '';
        } else {
          progressCircle.variant = 'primary';
          progressCircle.innerHTML = '';
        }
      }
    };

    return html`
      <div style="text-align: center; max-width: 300px;">
        <h4>File Upload Progress</h4>
        <forge-progress-circle 
          id="upload-progress-circle"
          value="0" 
          variant="primary"
          size="large"
          aria-label="File upload progress"
        ></forge-progress-circle>
        
        <p style="margin-top: 16px; color: var(--forge-color-text-secondary, #6b7280);">
          Click to simulate upload progress
        </p>
        
        <button 
          @click=${updateProgress}
          style="margin-top: 8px; padding: 8px 16px; background: var(--forge-color-primary-500, #3b82f6); color: white; border: none; border-radius: 4px; cursor: pointer;"
        >
          Start Upload
        </button>
      </div>
    `;
  }
};

export const DashboardMetrics: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 24px; max-width: 600px;">
      <div style="text-align: center; padding: 16px; border: 1px solid var(--forge-color-border, #e5e7eb); border-radius: 8px;">
        <forge-progress-circle value="87" variant="success" size="medium">87%</forge-progress-circle>
        <h4 style="margin: 8px 0 4px 0; font-size: 14px; font-weight: 600;">Test Coverage</h4>
        <p style="margin: 0; font-size: 12px; color: var(--forge-color-text-secondary, #6b7280);">Good</p>
      </div>
      
      <div style="text-align: center; padding: 16px; border: 1px solid var(--forge-color-border, #e5e7eb); border-radius: 8px;">
        <forge-progress-circle value="92" variant="primary" size="medium">92%</forge-progress-circle>
        <h4 style="margin: 8px 0 4px 0; font-size: 14px; font-weight: 600;">Build Success</h4>
        <p style="margin: 0; font-size: 12px; color: var(--forge-color-text-secondary, #6b7280);">Excellent</p>
      </div>
      
      <div style="text-align: center; padding: 16px; border: 1px solid var(--forge-color-border, #e5e7eb); border-radius: 8px;">
        <forge-progress-circle value="68" variant="warning" size="medium">68%</forge-progress-circle>
        <h4 style="margin: 8px 0 4px 0; font-size: 14px; font-weight: 600;">Performance</h4>
        <p style="margin: 0; font-size: 12px; color: var(--forge-color-text-secondary, #6b7280);">Needs Work</p>
      </div>
      
      <div style="text-align: center; padding: 16px; border: 1px solid var(--forge-color-border, #e5e7eb); border-radius: 8px;">
        <forge-progress-circle value="34" variant="danger" size="medium">34%</forge-progress-circle>
        <h4 style="margin: 8px 0 4px 0; font-size: 14px; font-weight: 600;">Security</h4>
        <p style="margin: 0; font-size: 12px; color: var(--forge-color-text-secondary, #6b7280);">Critical</p>
      </div>
    </div>
  `
};

export const CompletionStates: Story = {
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: center;">
      <div style="text-align: center;">
        <forge-progress-circle value="0" variant="secondary" size="medium">0%</forge-progress-circle>
        <p style="margin-top: 8px; font-size: 12px;">Not Started</p>
      </div>
      
      <div style="text-align: center;">
        <forge-progress-circle value="25" variant="warning" size="medium">25%</forge-progress-circle>
        <p style="margin-top: 8px; font-size: 12px;">In Progress</p>
      </div>
      
      <div style="text-align: center;">
        <forge-progress-circle value="75" variant="primary" size="medium">75%</forge-progress-circle>
        <p style="margin-top: 8px; font-size: 12px;">Almost Done</p>
      </div>
      
      <div style="text-align: center;">
        <forge-progress-circle value="100" variant="success" size="medium">✓</forge-progress-circle>
        <p style="margin-top: 8px; font-size: 12px;">Complete</p>
      </div>
    </div>
  `
};

export const IndeterminateStates: Story = {
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: center;">
      <div style="text-align: center;">
        <forge-progress-circle indeterminate variant="primary" size="small"></forge-progress-circle>
        <p style="margin-top: 8px; font-size: 12px;">Loading Small</p>
      </div>
      
      <div style="text-align: center;">
        <forge-progress-circle indeterminate variant="primary" size="medium"></forge-progress-circle>
        <p style="margin-top: 8px; font-size: 12px;">Loading Medium</p>
      </div>
      
      <div style="text-align: center;">
        <forge-progress-circle indeterminate variant="primary" size="large"></forge-progress-circle>
        <p style="margin-top: 8px; font-size: 12px;">Loading Large</p>
      </div>
    </div>
  `
};

export const CustomContent: Story = {
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: center;">
      <div style="text-align: center;">
        <forge-progress-circle value="45" variant="primary" size="large">
          <div style="font-size: 12px; line-height: 1.2;">
            <div style="font-weight: 600;">45</div>
            <div style="font-size: 10px; color: var(--forge-color-text-secondary, #6b7280);">of 100</div>
          </div>
        </forge-progress-circle>
        <p style="margin-top: 8px; font-size: 12px;">Multi-line Label</p>
      </div>
      
      <div style="text-align: center;">
        <forge-progress-circle value="100" variant="success" size="large">
          <div style="font-size: 20px;">✓</div>
        </forge-progress-circle>
        <p style="margin-top: 8px; font-size: 12px;">Success Icon</p>
      </div>
      
      <div style="text-align: center;">
        <forge-progress-circle value="15" variant="danger" size="large">
          <div style="font-size: 20px;">⚠</div>
        </forge-progress-circle>
        <p style="margin-top: 8px; font-size: 12px;">Warning Icon</p>
      </div>
      
      <div style="text-align: center;">
        <forge-progress-circle value="80" variant="primary" size="large">
          <div style="font-size: 10px; text-align: center; line-height: 1.2;">
            <div>4 of 5</div>
            <div>tasks</div>
          </div>
        </forge-progress-circle>
        <p style="margin-top: 8px; font-size: 12px;">Task Counter</p>
      </div>
    </div>
  `
};