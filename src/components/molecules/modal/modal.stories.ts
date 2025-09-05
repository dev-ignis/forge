import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './modal.ts';

const meta: Meta = {
  title: 'Molecules/Modal',
  component: 'forge-modal',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A versatile modal dialog component with focus management, accessibility, and customizable sizes and behaviors.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large', 'full'],
      description: 'Modal size preset',
    },
    title: {
      control: 'text',
      description: 'Modal title text',
    },
    showClose: {
      control: 'boolean',
      description: 'Show close button',
    },
    closeOnBackdrop: {
      control: 'boolean',
      description: 'Close when clicking backdrop',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Close when pressing Escape',
    },
    scrollBehavior: {
      control: { type: 'select' },
      options: ['body', 'entire'],
      description: 'How modal handles scrolling',
    },
    preventBodyScroll: {
      control: 'boolean',
      description: 'Prevent body scroll when modal is open',
    },
    animation: {
      control: { type: 'select' },
      options: ['none', 'fade', 'slide'],
      description: 'Modal animation type',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    title: 'Modal Title',
    size: 'medium',
  },
  render: (args) => html`
    <div>
      <forge-button @click="${() => {
        const modal = document.querySelector('forge-modal');
        modal?.show();
      }}">
        Open Modal
      </forge-button>
      
      <forge-modal
        title="${args.title}"
        size="${args.size}"
        ?show-close="${args.showClose}"
        ?close-on-backdrop="${args.closeOnBackdrop}"
        ?close-on-escape="${args.closeOnEscape}"
        @modalclose="${() => console.log('Modal closed')}"
        @modalopen="${() => console.log('Modal opened')}"
      >
        <p>This is the modal content. You can put any content here, including forms, text, images, or other components.</p>
        <p>The modal handles focus management automatically and provides keyboard navigation support.</p>
        
        <div slot="footer">
          <forge-button variant="secondary" @click="${() => {
            const modal = document.querySelector('forge-modal');
            modal?.close();
          }}">
            Cancel
          </forge-button>
          <forge-button variant="primary" @click="${() => {
            console.log('Action confirmed');
            const modal = document.querySelector('forge-modal');
            modal?.close();
          }}">
            Confirm
          </forge-button>
        </div>
      </forge-modal>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
      <forge-button @click="${() => document.getElementById('small-modal')?.show()}">
        Small Modal
      </forge-button>
      <forge-button @click="${() => document.getElementById('medium-modal')?.show()}">
        Medium Modal
      </forge-button>
      <forge-button @click="${() => document.getElementById('large-modal')?.show()}">
        Large Modal
      </forge-button>
      <forge-button @click="${() => document.getElementById('full-modal')?.show()}">
        Full Screen Modal
      </forge-button>
    </div>

    <forge-modal id="small-modal" size="small" title="Small Modal">
      <p>This is a small modal, perfect for simple confirmations or brief messages.</p>
      <div slot="footer">
        <forge-button @click="${() => document.getElementById('small-modal')?.close()}">
          Close
        </forge-button>
      </div>
    </forge-modal>

    <forge-modal id="medium-modal" size="medium" title="Medium Modal">
      <p>This is a medium modal, good for forms and moderate amounts of content.</p>
      <p>It provides a balanced size that works well for most use cases.</p>
      <div slot="footer">
        <forge-button @click="${() => document.getElementById('medium-modal')?.close()}">
          Close
        </forge-button>
      </div>
    </forge-modal>

    <forge-modal id="large-modal" size="large" title="Large Modal">
      <p>This is a large modal, suitable for complex forms or detailed content.</p>
      <p>It provides more space for extensive information or multiple sections.</p>
      <div>
        <h4>Section 1</h4>
        <p>Content for the first section goes here.</p>
        <h4>Section 2</h4>
        <p>Content for the second section goes here.</p>
      </div>
      <div slot="footer">
        <forge-button @click="${() => document.getElementById('large-modal')?.close()}">
          Close
        </forge-button>
      </div>
    </forge-modal>

    <forge-modal id="full-modal" size="full" title="Full Screen Modal">
      <p>This is a full screen modal that takes up the entire viewport.</p>
      <p>Perfect for immersive experiences or complex workflows.</p>
      <div style="margin: 20px 0;">
        <h3>Full Content Area</h3>
        <p>You have the entire screen to work with, making it ideal for:</p>
        <ul>
          <li>Complex forms with multiple steps</li>
          <li>Rich media content</li>
          <li>Detailed data tables</li>
          <li>Image galleries or editors</li>
        </ul>
      </div>
      <div slot="footer">
        <forge-button @click="${() => document.getElementById('full-modal')?.close()}">
          Close
        </forge-button>
      </div>
    </forge-modal>
  `,
};

export const CustomHeader: Story = {
  render: () => html`
    <forge-button @click="${() => document.getElementById('custom-header-modal')?.show()}">
      Open Custom Header Modal
    </forge-button>

    <forge-modal id="custom-header-modal" size="medium">
      <div slot="header" style="display: flex; align-items: center; gap: 12px; width: 100%;">
        <div style="width: 32px; height: 32px; background: #3b82f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
          i
        </div>
        <div>
          <h2 style="margin: 0; font-size: 1.25rem; font-weight: 600;">Custom Header</h2>
          <p style="margin: 0; font-size: 0.875rem; color: #6b7280;">With additional information</p>
        </div>
      </div>
      
      <p>This modal demonstrates how to use a custom header with additional elements like icons and descriptions.</p>
      <p>The header slot gives you complete control over the header content and layout.</p>
      
      <div slot="footer">
        <forge-button @click="${() => document.getElementById('custom-header-modal')?.close()}">
          Close
        </forge-button>
      </div>
    </forge-modal>
  `,
};

export const ScrollingContent: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px;">
      <forge-button @click="${() => document.getElementById('scroll-body-modal')?.show()}">
        Body Scroll
      </forge-button>
      <forge-button @click="${() => document.getElementById('scroll-entire-modal')?.show()}">
        Entire Scroll
      </forge-button>
    </div>

    <forge-modal id="scroll-body-modal" size="medium" title="Body Scroll Modal" scroll-behavior="body">
      <div style="height: 800px;">
        <h3>Long Content</h3>
        <p>This modal has scroll-behavior="body", so only the body content scrolls while the header and footer remain fixed.</p>
        
        ${Array.from({ length: 20 }, (_, i) => html`
          <div style="margin: 16px 0; padding: 16px; background: #f3f4f6; border-radius: 8px;">
            <h4>Content Block ${i + 1}</h4>
            <p>This is some sample content to demonstrate scrolling behavior. The header and footer stay in place while this content area scrolls.</p>
          </div>
        `)}
      </div>
      
      <div slot="footer">
        <forge-button @click="${() => document.getElementById('scroll-body-modal')?.close()}">
          Close
        </forge-button>
      </div>
    </forge-modal>

    <forge-modal id="scroll-entire-modal" size="medium" title="Entire Scroll Modal" scroll-behavior="entire">
      <div style="height: 800px;">
        <h3>Long Content</h3>
        <p>This modal has scroll-behavior="entire", so the entire modal content scrolls together.</p>
        
        ${Array.from({ length: 20 }, (_, i) => html`
          <div style="margin: 16px 0; padding: 16px; background: #f3f4f6; border-radius: 8px;">
            <h4>Content Block ${i + 1}</h4>
            <p>This demonstrates how the entire modal scrolls when content is longer than the viewport.</p>
          </div>
        `)}
      </div>
      
      <div slot="footer">
        <forge-button @click="${() => document.getElementById('scroll-entire-modal')?.close()}">
          Close
        </forge-button>
      </div>
    </forge-modal>
  `,
};

export const FormModal: Story = {
  render: () => html`
    <forge-button @click="${() => document.getElementById('form-modal')?.show()}">
      Open Form Modal
    </forge-button>

    <forge-modal id="form-modal" size="medium" title="User Information Form">
      <form @submit="${(e: Event) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        console.log('Form data:', Object.fromEntries(formData.entries()));
        document.getElementById('form-modal')?.close();
      }}">
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <forge-form-field
            label="Full Name"
            name="fullName"
            type="text"
            placeholder="Enter your full name"
            required
          ></forge-form-field>
          
          <forge-form-field
            label="Email"
            name="email"
            type="email"
            placeholder="user@example.com"
            required
          ></forge-form-field>
          
          <forge-form-field
            label="Phone"
            name="phone"
            type="tel"
            placeholder="(555) 123-4567"
          ></forge-form-field>
          
          <forge-form-field
            label="Message"
            name="message"
            type="text"
            placeholder="Enter your message"
            help-text="Optional message or comments"
          ></forge-form-field>
        </div>

        <div slot="footer">
          <forge-button 
            type="button" 
            variant="secondary" 
            @click="${() => document.getElementById('form-modal')?.close()}"
          >
            Cancel
          </forge-button>
          <forge-button type="submit" variant="primary">
            Submit
          </forge-button>
        </div>
      </form>
    </forge-modal>
  `,
};

export const ConfirmationModal: Story = {
  render: () => html`
    <forge-button 
      variant="danger" 
      @click="${() => document.getElementById('confirm-modal')?.show()}"
    >
      Delete Item
    </forge-button>

    <forge-modal id="confirm-modal" size="small" title="Confirm Deletion">
      <div style="text-align: center; padding: 20px 0;">
        <div style="width: 48px; height: 48px; margin: 0 auto 16px; background: #fee2e2; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
          <svg width="24" height="24" fill="none" stroke="#dc2626" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
          </svg>
        </div>
        <h3 style="margin: 0 0 8px 0; color: #dc2626;">Delete this item?</h3>
        <p style="margin: 0; color: #6b7280;">This action cannot be undone. The item will be permanently deleted.</p>
      </div>

      <div slot="footer" style="display: flex; gap: 12px; justify-content: center;">
        <forge-button 
          variant="secondary" 
          @click="${() => document.getElementById('confirm-modal')?.close()}"
        >
          Cancel
        </forge-button>
        <forge-button 
          variant="danger" 
          @click="${() => {
            console.log('Item deleted');
            document.getElementById('confirm-modal')?.close();
          }}"
        >
          Delete
        </forge-button>
      </div>
    </forge-modal>
  `,
};

export const AnimationVariants: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
      <forge-button @click="${() => document.getElementById('fade-modal')?.show()}">
        Fade Animation
      </forge-button>
      <forge-button @click="${() => document.getElementById('slide-modal')?.show()}">
        Slide Animation
      </forge-button>
      <forge-button @click="${() => document.getElementById('no-animation-modal')?.show()}">
        No Animation
      </forge-button>
    </div>

    <forge-modal id="fade-modal" size="medium" title="Fade Animation" animation="fade">
      <p>This modal uses the fade animation for a smooth appearance.</p>
      <div slot="footer">
        <forge-button @click="${() => document.getElementById('fade-modal')?.close()}">
          Close
        </forge-button>
      </div>
    </forge-modal>

    <forge-modal id="slide-modal" size="medium" title="Slide Animation" animation="slide">
      <p>This modal uses the slide animation, appearing from below.</p>
      <div slot="footer">
        <forge-button @click="${() => document.getElementById('slide-modal')?.close()}">
          Close
        </forge-button>
      </div>
    </forge-modal>

    <forge-modal id="no-animation-modal" size="medium" title="No Animation" animation="none">
      <p>This modal appears instantly without any animation.</p>
      <div slot="footer">
        <forge-button @click="${() => document.getElementById('no-animation-modal')?.close()}">
          Close
        </forge-button>
      </div>
    </forge-modal>
  `,
};

export const ModalSettings: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
      <forge-button @click="${() => document.getElementById('no-backdrop-close-modal')?.show()}">
        No Backdrop Close
      </forge-button>
      <forge-button @click="${() => document.getElementById('no-escape-close-modal')?.show()}">
        No Escape Close
      </forge-button>
      <forge-button @click="${() => document.getElementById('no-close-button-modal')?.show()}">
        No Close Button
      </forge-button>
    </div>

    <forge-modal 
      id="no-backdrop-close-modal" 
      size="medium" 
      title="No Backdrop Close" 
      close-on-backdrop="false"
    >
      <p>This modal won't close when you click the backdrop. You must use the close button or Escape key.</p>
      <div slot="footer">
        <forge-button @click="${() => document.getElementById('no-backdrop-close-modal')?.close()}">
          Close
        </forge-button>
      </div>
    </forge-modal>

    <forge-modal 
      id="no-escape-close-modal" 
      size="medium" 
      title="No Escape Close" 
      close-on-escape="false"
    >
      <p>This modal won't close when you press the Escape key. You must use the close button or click the backdrop.</p>
      <div slot="footer">
        <forge-button @click="${() => document.getElementById('no-escape-close-modal')?.close()}">
          Close
        </forge-button>
      </div>
    </forge-modal>

    <forge-modal 
      id="no-close-button-modal" 
      size="medium" 
      title="No Close Button" 
      show-close="false"
    >
      <p>This modal doesn't have a close button in the header. You can still close it by clicking the backdrop or pressing Escape.</p>
      <div slot="footer">
        <forge-button @click="${() => document.getElementById('no-close-button-modal')?.close()}">
          Close
        </forge-button>
      </div>
    </forge-modal>
  `,
};

export const InteractiveDemo: Story = {
  render: () => html`
    <div style="max-width: 600px;">
      <h3>Interactive Modal Demo</h3>
      <p>Explore different modal features and behaviors:</p>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin: 20px 0;">
        <forge-button @click="${() => document.getElementById('info-modal')?.show()}">
          📋 Info Modal
        </forge-button>
        <forge-button @click="${() => document.getElementById('warning-modal')?.show()}">
          ⚠️ Warning Modal
        </forge-button>
        <forge-button @click="${() => document.getElementById('success-modal')?.show()}">
          ✅ Success Modal
        </forge-button>
        <forge-button @click="${() => document.getElementById('error-modal')?.show()}">
          ❌ Error Modal
        </forge-button>
      </div>
      
      <div style="margin-top: 30px; padding: 15px; background: #f8f9fa; border-radius: 6px;">
        <h4 style="margin-top: 0;">Modal Features:</h4>
        <ul style="margin-bottom: 0; font-size: 14px;">
          <li><kbd>Escape</kbd> - Close modal (if enabled)</li>
          <li><kbd>Tab</kbd> - Navigate between focusable elements</li>
          <li>Click backdrop to close (if enabled)</li>
          <li>Focus management and keyboard trap</li>
          <li>Body scroll prevention</li>
          <li>Customizable sizes and animations</li>
        </ul>
      </div>
    </div>

    <forge-modal id="info-modal" size="medium" title="Information">
      <div style="display: flex; align-items: flex-start; gap: 12px;">
        <div style="width: 24px; height: 24px; background: #dbeafe; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;">
          <svg width="16" height="16" fill="#3b82f6" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
          </svg>
        </div>
        <div>
          <h4 style="margin: 0 0 8px 0;">System Information</h4>
          <p style="margin: 0; color: #6b7280;">This is an informational modal that provides helpful details or instructions to the user.</p>
        </div>
      </div>
      <div slot="footer">
        <forge-button @click="${() => document.getElementById('info-modal')?.close()}">
          Got it
        </forge-button>
      </div>
    </forge-modal>

    <forge-modal id="warning-modal" size="medium" title="Warning">
      <div style="display: flex; align-items: flex-start; gap: 12px;">
        <div style="width: 24px; height: 24px; background: #fef3c7; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;">
          <svg width="16" height="16" fill="#f59e0b" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
          </svg>
        </div>
        <div>
          <h4 style="margin: 0 0 8px 0;">Proceed with Caution</h4>
          <p style="margin: 0; color: #6b7280;">This action may have unintended consequences. Please review before proceeding.</p>
        </div>
      </div>
      <div slot="footer">
        <forge-button variant="secondary" @click="${() => document.getElementById('warning-modal')?.close()}">
          Cancel
        </forge-button>
        <forge-button variant="warning" @click="${() => document.getElementById('warning-modal')?.close()}">
          Proceed
        </forge-button>
      </div>
    </forge-modal>

    <forge-modal id="success-modal" size="medium" title="Success">
      <div style="display: flex; align-items: flex-start; gap: 12px;">
        <div style="width: 24px; height: 24px; background: #d1fae5; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;">
          <svg width="16" height="16" fill="#10b981" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
          </svg>
        </div>
        <div>
          <h4 style="margin: 0 0 8px 0;">Operation Successful</h4>
          <p style="margin: 0; color: #6b7280;">Your request has been processed successfully and all changes have been saved.</p>
        </div>
      </div>
      <div slot="footer">
        <forge-button variant="primary" @click="${() => document.getElementById('success-modal')?.close()}">
          Continue
        </forge-button>
      </div>
    </forge-modal>

    <forge-modal id="error-modal" size="medium" title="Error">
      <div style="display: flex; align-items: flex-start; gap: 12px;">
        <div style="width: 24px; height: 24px; background: #fee2e2; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;">
          <svg width="16" height="16" fill="#ef4444" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
          </svg>
        </div>
        <div>
          <h4 style="margin: 0 0 8px 0;">An Error Occurred</h4>
          <p style="margin: 0; color: #6b7280;">Unable to complete the requested operation. Please check your input and try again.</p>
        </div>
      </div>
      <div slot="footer">
        <forge-button variant="secondary" @click="${() => document.getElementById('error-modal')?.close()}">
          Dismiss
        </forge-button>
        <forge-button variant="primary" @click="${() => document.getElementById('error-modal')?.close()}">
          Retry
        </forge-button>
      </div>
    </forge-modal>
  `,
};

export const AIIntegration: Story = {
  render: () => html`
    <forge-button @click="${() => document.getElementById('ai-modal')?.show()}">
      Open AI-Ready Modal
    </forge-button>

    <forge-modal 
      id="ai-modal" 
      size="medium" 
      title="AI-Integrated Modal"
      semantic-role="dialog"
      ai-context="user-interaction"
      performance-mode="balanced"
      @modalopen="${() => {
        console.log('AI-aware modal opened:', {
          context: 'user-interaction',
          userIntent: 'content-interaction'
        });
      }}"
      @modalclose="${() => {
        console.log('AI-aware modal closed:', {
          context: 'user-interaction',
          completionReason: 'user-dismissed'
        });
      }}"
    >
      <p>This modal includes AI metadata for intelligent user interaction tracking:</p>
      <ul>
        <li><strong>Semantic Role:</strong> dialog</li>
        <li><strong>AI Context:</strong> user-interaction</li>
        <li><strong>Performance Mode:</strong> balanced</li>
      </ul>
      <p>AI agents can understand this as a focused user interaction context.</p>
      
      <div slot="footer">
        <forge-button @click="${() => document.getElementById('ai-modal')?.close()}">
          Close
        </forge-button>
      </div>
    </forge-modal>
  `,
};