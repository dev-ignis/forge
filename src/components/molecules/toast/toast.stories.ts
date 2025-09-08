import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './toast';
import './toast-container';
import { showToast, toast } from './toast-container';

const meta: Meta = {
  title: 'Components/Molecules/Toast',
  component: 'forge-toast',
  parameters: {
    docs: {
      description: {
        component: 'Toast notification components for displaying temporary messages to users. Supports auto-dismiss, action buttons, and various notification types with a global container system for queue management.'
      }
    }
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'The toast title'
    },
    message: {
      control: { type: 'text' },
      description: 'The toast message'
    },
    variant: {
      control: { type: 'select' },
      options: ['info', 'success', 'warning', 'error'],
      description: 'Visual variant of the toast'
    },
    duration: {
      control: { type: 'number', min: 0, max: 10000, step: 500 },
      description: 'Auto-dismiss duration in milliseconds (0 disables)'
    },
    dismissible: {
      control: { type: 'boolean' },
      description: 'Whether the toast can be manually dismissed'
    },
    persistent: {
      control: { type: 'boolean' },
      description: 'Whether the toast is persistent (prevents auto-dismiss)'
    },
    showProgress: {
      control: { type: 'boolean' },
      description: 'Whether to show a progress bar for timed toasts'
    }
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    title: 'Notification',
    message: 'This is a default toast notification.',
    variant: 'info',
    duration: 5000,
    dismissible: true,
    persistent: false,
    showProgress: false
  },
  render: (args) => html`
    <forge-toast
      title=${args.title}
      message=${args.message}
      variant=${args.variant}
      duration=${args.duration}
      ?dismissible=${args.dismissible}
      ?persistent=${args.persistent}
      ?show-progress=${args.showProgress}
    ></forge-toast>
  `
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
      <forge-toast
        title="Info Notification"
        message="This is an informational message."
        variant="info"
        persistent
      ></forge-toast>
      
      <forge-toast
        title="Success!"
        message="Your action completed successfully."
        variant="success"
        persistent
      ></forge-toast>
      
      <forge-toast
        title="Warning"
        message="Please review your input before continuing."
        variant="warning"
        persistent
      ></forge-toast>
      
      <forge-toast
        title="Error"
        message="An error occurred while processing your request."
        variant="error"
        persistent
      ></forge-toast>
    </div>
  `
};

export const WithProgress: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
      <forge-toast
        title="Upload in Progress"
        message="Your file is being uploaded..."
        variant="info"
        duration="8000"
        show-progress
      ></forge-toast>
      
      <forge-toast
        title="Processing Data"
        message="Please wait while we process your data."
        variant="warning"
        duration="6000"
        show-progress
      ></forge-toast>
    </div>
  `
};

export const WithCustomContent: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
      <forge-toast variant="success" duration="10000">
        <span slot="icon">🎉</span>
        <strong>Congratulations!</strong> You've successfully completed the tutorial.
        <forge-button slot="action" size="small" variant="secondary">View Details</forge-button>
      </forge-toast>
      
      <forge-toast variant="warning" persistent>
        <span slot="icon">⚠️</span>
        Your session will expire in 5 minutes. Would you like to extend it?
        <div slot="action" style="display: flex; gap: 8px;">
          <forge-button size="small" variant="primary">Extend</forge-button>
          <forge-button size="small" variant="ghost">Logout</forge-button>
        </div>
      </forge-toast>
    </div>
  `
};

export const ToastContainer: Story = {
  render: () => {
    const showToastExample = (variant: 'info' | 'success' | 'warning' | 'error') => {
      const messages = {
        info: 'This is an informational message.',
        success: 'Operation completed successfully!',
        warning: 'Please check your input.',
        error: 'Something went wrong.'
      };
      
      const titles = {
        info: 'Information',
        success: 'Success',
        warning: 'Warning',
        error: 'Error'
      };

      showToast({
        title: titles[variant],
        message: messages[variant],
        variant,
        duration: variant === 'error' ? 0 : 5000,
        persistent: variant === 'error'
      });
    };

    return html`
      <div>
        <forge-toast-container position="top-right"></forge-toast-container>
        
        <div style="display: flex; gap: 12px; margin-bottom: 24px;">
          <forge-button @click=${() => showToastExample('info')}>
            Info Toast
          </forge-button>
          <forge-button @click=${() => showToastExample('success')}>
            Success Toast
          </forge-button>
          <forge-button @click=${() => showToastExample('warning')}>
            Warning Toast
          </forge-button>
          <forge-button @click=${() => showToastExample('error')}>
            Error Toast
          </forge-button>
        </div>
        
        <div style="display: flex; gap: 12px;">
          <forge-button @click=${() => toast.clear()} variant="ghost">
            Clear All
          </forge-button>
        </div>
        
        <p style="margin-top: 24px; color: var(--forge-color-text-secondary, #6b7280); font-size: 14px;">
          Click the buttons above to see toasts appear in the top-right corner. 
          Error toasts are persistent and require manual dismissal.
        </p>
      </div>
    `;
  }
};

export const ContainerPositions: Story = {
  render: () => {
    const positions = [
      'top-left', 'top-center', 'top-right',
      'bottom-left', 'bottom-center', 'bottom-right'
    ] as const;

    let currentPosition = 0;

    const showPositionDemo = () => {
      const position = positions[currentPosition];
      currentPosition = (currentPosition + 1) % positions.length;
      
      // Remove existing container
      const existing = document.querySelector('forge-toast-container[data-demo="true"]');
      if (existing) existing.remove();
      
      // Create new container at position
      const container = document.createElement('forge-toast-container');
      container.position = position;
      container.setAttribute('data-demo', 'true');
      document.body.appendChild(container);
      
      // Add toast to show the position
      container.addToast({
        title: `Position: ${position}`,
        message: `Toast shown at ${position} position`,
        variant: 'info',
        duration: 4000
      });
    };

    return html`
      <div>
        <forge-button @click=${showPositionDemo}>
          Demo Container Positions
        </forge-button>
        
        <p style="margin-top: 16px; color: var(--forge-color-text-secondary, #6b7280); font-size: 14px;">
          Click the button to cycle through different toast container positions: 
          ${positions.join(' → ')}<br>
          Each toast will appear in a different corner or edge of the screen.
        </p>
      </div>
    `;
  }
};

export const QueueManagement: Story = {
  render: () => {
    const addMultipleToasts = () => {
      const messages = [
        'First toast message',
        'Second toast message', 
        'Third toast message',
        'Fourth toast message',
        'Fifth toast message',
        'Sixth toast (queued)',
        'Seventh toast (queued)',
        'Eighth toast (queued)'
      ];
      
      messages.forEach((message, index) => {
        setTimeout(() => {
          showToast({
            title: `Toast ${index + 1}`,
            message,
            variant: index % 2 === 0 ? 'info' : 'success',
            duration: 3000 + (index * 500) // Staggered durations
          });
        }, index * 200); // Staggered creation
      });
    };

    const addPersistentToasts = () => {
      for (let i = 1; i <= 7; i++) {
        showToast({
          title: `Persistent Toast ${i}`,
          message: `This toast will not auto-dismiss`,
          variant: i <= 3 ? 'warning' : 'info',
          persistent: true
        });
      }
    };

    return html`
      <div>
        <forge-toast-container position="top-right" max-toasts="3"></forge-toast-container>
        
        <div style="display: flex; gap: 12px; margin-bottom: 24px;">
          <forge-button @click=${addMultipleToasts}>
            Add 8 Timed Toasts (Max 3)
          </forge-button>
          <forge-button @click=${addPersistentToasts}>
            Add 7 Persistent Toasts
          </forge-button>
          <forge-button @click=${() => toast.clear()} variant="ghost">
            Clear All
          </forge-button>
        </div>
        
        <div style="background: var(--forge-color-gray-50, #f9fafb); padding: 16px; border-radius: 8px;">
          <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">Queue Management Demo</h4>
          <p style="margin: 0; color: var(--forge-color-text-secondary, #6b7280); font-size: 14px; line-height: 1.4;">
            This container is limited to 3 simultaneous toasts. When you add more, they'll be queued and appear as others are dismissed.
            Try adding 8 timed toasts to see the queue in action, or add persistent toasts to see the queue build up.
          </p>
        </div>
      </div>
    `;
  }
};

export const InteractiveFeatures: Story = {
  render: () => {
    const showHoverToast = () => {
      showToast({
        title: 'Hover to Pause',
        message: 'Hover over this toast to pause the auto-dismiss timer. Move your mouse away to resume.',
        variant: 'info',
        duration: 8000,
        showProgress: true
      });
    };

    const showActionToast = () => {
      const container = document.querySelector('forge-toast-container') as any;
      if (container) {
        const toastElement = document.createElement('forge-toast');
        toastElement.title = 'Action Required';
        toastElement.message = 'Would you like to save your changes?';
        toastElement.variant = 'warning';
        toastElement.persistent = true;
        
        // Add action buttons
        const actionDiv = document.createElement('div');
        actionDiv.slot = 'action';
        actionDiv.style.cssText = 'display: flex; gap: 8px; margin-top: 8px;';
        
        const saveBtn = document.createElement('forge-button');
        saveBtn.textContent = 'Save';
        saveBtn.size = 'sm';
        saveBtn.variant = 'primary';
        saveBtn.addEventListener('click', () => {
          toastElement.dismiss();
          toast.success('Changes saved successfully!');
        });
        
        const discardBtn = document.createElement('forge-button');
        discardBtn.textContent = 'Discard';
        discardBtn.size = 'sm';
        discardBtn.variant = 'ghost';
        discardBtn.addEventListener('click', () => {
          toastElement.dismiss();
          toast.info('Changes discarded');
        });
        
        actionDiv.appendChild(saveBtn);
        actionDiv.appendChild(discardBtn);
        toastElement.appendChild(actionDiv);
        
        const containerEl = container.shadowRoot?.querySelector('.toast-container');
        if (containerEl) {
          containerEl.appendChild(toastElement);
        }
      }
    };

    return html`
      <div>
        <forge-toast-container position="top-right"></forge-toast-container>
        
        <div style="display: flex; gap: 12px; margin-bottom: 24px;">
          <forge-button @click=${showHoverToast}>
            Hover to Pause Toast
          </forge-button>
          <forge-button @click=${showActionToast}>
            Action Toast
          </forge-button>
        </div>
        
        <div style="background: var(--forge-color-blue-50, #eff6ff); padding: 16px; border-radius: 8px;">
          <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: var(--forge-color-blue-800, #1e40af);">
            Interactive Features
          </h4>
          <ul style="margin: 0; padding-left: 20px; color: var(--forge-color-blue-700, #1d4ed8); font-size: 14px; line-height: 1.4;">
            <li><strong>Hover to Pause:</strong> Demonstrates timer pause/resume on mouse hover</li>
            <li><strong>Action Buttons:</strong> Shows custom action buttons with toast dismissal</li>
            <li><strong>Progress Bar:</strong> Visual indicator of remaining time</li>
          </ul>
        </div>
      </div>
    `;
  }
};

export const HelperFunctions: Story = {
  render: () => html`
    <div>
      <forge-toast-container position="top-right"></forge-toast-container>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; margin-bottom: 24px;">
        <forge-button @click=${() => toast.info('Information message', 'Info')}>
          toast.info()
        </forge-button>
        <forge-button @click=${() => toast.success('Success message', 'Success')}>
          toast.success()
        </forge-button>
        <forge-button @click=${() => toast.warning('Warning message', 'Warning')}>
          toast.warning()
        </forge-button>
        <forge-button @click=${() => toast.error('Error message', 'Error')}>
          toast.error()
        </forge-button>
      </div>
      
      <div style="display: flex; gap: 12px;">
        <forge-button @click=${() => toast.clear()} variant="ghost">
          toast.clear()
        </forge-button>
      </div>
      
      <div style="background: var(--forge-color-gray-50, #f9fafb); padding: 16px; border-radius: 8px; margin-top: 24px;">
        <h4 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600;">Helper Functions</h4>
        <pre style="margin: 0; font-size: 12px; line-height: 1.4; color: var(--forge-color-text-secondary, #6b7280);"><code>// Quick helpers for common toast types
toast.info('Message', 'Optional Title');
toast.success('Message', 'Optional Title');  
toast.warning('Message', 'Optional Title');
toast.error('Message', 'Optional Title');     // Persistent by default

// Management
toast.clear();                                // Clear all toasts
toast.dismiss('toast-id');                   // Dismiss specific toast

// Advanced usage
showToast({
  title: 'Custom Toast',
  message: 'With full options',
  variant: 'info',
  duration: 5000,
  persistent: false,
  showProgress: true
});</code></pre>
      </div>
    </div>
  `
};