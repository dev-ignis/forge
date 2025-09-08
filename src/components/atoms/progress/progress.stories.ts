import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './progress';

const meta: Meta = {
  title: 'Components/Atoms/Progress',
  component: 'forge-progress',
  parameters: {
    docs: {
      description: {
        component: 'A linear progress component for showing file upload progress, loading states, or task completion. Supports determinate and indeterminate states with customizable colors and sizes.'
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
      description: 'Visual variant of the progress bar'
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size of the progress bar'
    },
    indeterminate: {
      control: { type: 'boolean' },
      description: 'Whether the progress is in indeterminate state (loading without known duration)'
    },
    ariaLabel: {
      control: { type: 'text' },
      description: 'Accessible label for the progress bar'
    }
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    value: 50,
    max: 100,
    variant: 'primary',
    size: 'medium',
    indeterminate: false,
    ariaLabel: ''
  },
  render: (args) => html`
    <forge-progress
      value=${args.value}
      max=${args.max}
      variant=${args.variant}
      size=${args.size}
      ?indeterminate=${args.indeterminate}
      aria-label=${args.ariaLabel || undefined}
    ></forge-progress>
  `
};

export const WithLabel: Story = {
  args: {
    value: 75,
    max: 100,
    variant: 'primary',
    size: 'medium',
    indeterminate: false,
    ariaLabel: ''
  },
  render: (args) => html`
    <forge-progress
      value=${args.value}
      max=${args.max}
      variant=${args.variant}
      size=${args.size}
      ?indeterminate=${args.indeterminate}
      aria-label=${args.ariaLabel || undefined}
    >
      Uploading file... ${args.value}%
    </forge-progress>
  `
};

export const Indeterminate: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    indeterminate: true
  },
  render: (args) => html`
    <forge-progress
      variant=${args.variant}
      size=${args.size}
      ?indeterminate=${args.indeterminate}
    >
      Processing...
    </forge-progress>
  `
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div>
        <h4>Primary (50%)</h4>
        <forge-progress value="50" variant="primary">Primary Progress</forge-progress>
      </div>
      
      <div>
        <h4>Secondary (60%)</h4>
        <forge-progress value="60" variant="secondary">Secondary Progress</forge-progress>
      </div>
      
      <div>
        <h4>Success (80%)</h4>
        <forge-progress value="80" variant="success">Success Progress</forge-progress>
      </div>
      
      <div>
        <h4>Warning (40%)</h4>
        <forge-progress value="40" variant="warning">Warning Progress</forge-progress>
      </div>
      
      <div>
        <h4>Danger (25%)</h4>
        <forge-progress value="25" variant="danger">Danger Progress</forge-progress>
      </div>
    </div>
  `
};

export const AllSizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div>
        <h4>Small</h4>
        <forge-progress value="65" size="small">Small Progress</forge-progress>
      </div>
      
      <div>
        <h4>Medium (Default)</h4>
        <forge-progress value="65" size="medium">Medium Progress</forge-progress>
      </div>
      
      <div>
        <h4>Large</h4>
        <forge-progress value="65" size="large">Large Progress</forge-progress>
      </div>
    </div>
  `
};

export const FileUploadExample: Story = {
  render: () => {
    const updateProgress = () => {
      const progressBar = document.querySelector('#upload-progress') as any;
      if (progressBar) {
        let currentValue = progressBar.value || 0;
        currentValue += 10;
        if (currentValue > 100) currentValue = 0;
        progressBar.updateProgress(currentValue);
        
        const label = document.querySelector('#upload-label');
        if (label) {
          if (currentValue === 100) {
            label.textContent = 'Upload complete!';
          } else if (currentValue === 0) {
            label.textContent = 'Ready to upload...';
          } else {
            label.textContent = `Uploading video.mp4... ${currentValue}%`;
          }
        }
      }
    };

    return html`
      <div style="max-width: 400px;">
        <h4>File Upload Progress</h4>
        <forge-progress 
          id="upload-progress"
          value="0" 
          variant="primary"
          size="medium"
          aria-label="File upload progress"
        >
          <span id="upload-label">Ready to upload...</span>
        </forge-progress>
        
        <button 
          @click=${updateProgress}
          style="margin-top: 16px; padding: 8px 16px; background: var(--forge-color-primary-500, #3b82f6); color: white; border: none; border-radius: 4px; cursor: pointer;"
        >
          Simulate Upload Progress
        </button>
      </div>
    `;
  }
};

export const TaskCompletionExample: Story = {
  render: () => html`
    <div style="max-width: 500px; display: flex; flex-direction: column; gap: 16px;">
      <h4>Task Completion Dashboard</h4>
      
      <div>
        <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 8px;">
          <span>Install Dependencies</span>
          <span style="font-size: 12px; color: var(--forge-color-success-600, #059669);">Complete</span>
        </div>
        <forge-progress value="100" variant="success" size="small"></forge-progress>
      </div>
      
      <div>
        <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 8px;">
          <span>Run Tests</span>
          <span style="font-size: 12px; color: var(--forge-color-primary-600, #2563eb);">85% Complete</span>
        </div>
        <forge-progress value="85" variant="primary" size="small"></forge-progress>
      </div>
      
      <div>
        <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 8px;">
          <span>Build Application</span>
          <span style="font-size: 12px; color: var(--forge-color-warning-600, #d97706);">45% Complete</span>
        </div>
        <forge-progress value="45" variant="warning" size="small"></forge-progress>
      </div>
      
      <div>
        <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 8px;">
          <span>Deploy to Production</span>
          <span style="font-size: 12px; color: var(--forge-color-gray-500, #6b7280);">Waiting</span>
        </div>
        <forge-progress value="0" variant="secondary" size="small"></forge-progress>
      </div>
    </div>
  `
};

export const IndeterminateStates: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div>
        <h4>Loading States</h4>
        <forge-progress indeterminate variant="primary">Processing...</forge-progress>
      </div>
      
      <div style="margin-top: 16px;">
        <h4>Different Variants</h4>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <forge-progress indeterminate variant="primary">Analyzing data...</forge-progress>
          <forge-progress indeterminate variant="success">Saving changes...</forge-progress>
          <forge-progress indeterminate variant="warning">Optimizing performance...</forge-progress>
          <forge-progress indeterminate variant="danger">Retrying connection...</forge-progress>
        </div>
      </div>
    </div>
  `
};