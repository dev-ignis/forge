import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './form-field.ts';

const meta: Meta = {
  title: 'Molecules/FormField',
  component: 'forge-form-field',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A comprehensive form field component with label, validation, help text, and multiple variants including floating labels.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Field label text',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'floating', 'inline'],
      description: 'Visual style variant',
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'Input type',
    },
    validationState: {
      control: { type: 'select' },
      options: ['default', 'error', 'warning', 'success'],
      description: 'Validation state',
    },
    placeholder: {
      control: 'text',
      description: 'Input placeholder text',
    },
    value: {
      control: 'text',
      description: 'Field value',
    },
    required: {
      control: 'boolean',
      description: 'Mark field as required',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the field',
    },
    readonly: {
      control: 'boolean',
      description: 'Make field read-only',
    },
    showOptional: {
      control: 'boolean',
      description: 'Show (optional) indicator for non-required fields',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'Enter your email',
  },
  render: (args) => html`
    <forge-form-field
      label="${args.label}"
      type="${args.type}"
      placeholder="${args.placeholder}"
      ?required="${args.required}"
      ?disabled="${args.disabled}"
      ?readonly="${args.readonly}"
      @input="${(e: CustomEvent) => console.log('Input:', e.detail)}"
      @change="${(e: CustomEvent) => console.log('Change:', e.detail)}"
    ></forge-form-field>
  `,
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 30px; width: 300px;">
      <div>
        <h4 style="margin-bottom: 10px;">Default Variant</h4>
        <forge-form-field
          variant="default"
          label="Full Name"
          placeholder="Enter your full name"
          type="text"
        ></forge-form-field>
      </div>
      
      <div>
        <h4 style="margin-bottom: 10px;">Floating Label</h4>
        <forge-form-field
          variant="floating"
          label="Email Address"
          type="email"
        ></forge-form-field>
      </div>
      
      <div>
        <h4 style="margin-bottom: 10px;">Inline Variant</h4>
        <forge-form-field
          variant="inline"
          label="Phone"
          placeholder="(555) 123-4567"
          type="tel"
        ></forge-form-field>
      </div>
    </div>
  `,
};

export const ValidationStates: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px; width: 350px;">
      <forge-form-field
        label="Default State"
        placeholder="No validation state"
        help-text="This field shows the default appearance"
      ></forge-form-field>
      
      <forge-form-field
        label="Success State"
        validation-state="success"
        success-message="Email format is valid"
        value="user@example.com"
        type="email"
      ></forge-form-field>
      
      <forge-form-field
        label="Warning State"
        validation-state="warning"
        warning-message="This email domain is not commonly used"
        value="user@rare-domain.xyz"
        type="email"
      ></forge-form-field>
      
      <forge-form-field
        label="Error State"
        validation-state="error"
        error-message="Please enter a valid email address"
        value="invalid-email"
        type="email"
      ></forge-form-field>
    </div>
  `,
};

export const RequiredFields: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px; width: 300px;">
      <forge-form-field
        label="Required Field"
        placeholder="This field is required"
        required
        help-text="Please provide this information"
      ></forge-form-field>
      
      <forge-form-field
        label="Optional Field"
        placeholder="This field is optional"
        show-optional
        help-text="You may leave this blank if desired"
      ></forge-form-field>
      
      <forge-form-field
        label="Required with Error"
        placeholder="Required field"
        required
        validation-state="error"
        error-message="This field is required"
      ></forge-form-field>
    </div>
  `,
};

export const InputTypes: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
      <forge-form-field
        label="Text Input"
        type="text"
        placeholder="Enter text"
      ></forge-form-field>
      
      <forge-form-field
        label="Email Input"
        type="email"
        placeholder="user@example.com"
      ></forge-form-field>
      
      <forge-form-field
        label="Password Input"
        type="password"
        placeholder="Enter password"
      ></forge-form-field>
      
      <forge-form-field
        label="Number Input"
        type="number"
        placeholder="123"
        min="0"
        max="999"
      ></forge-form-field>
      
      <forge-form-field
        label="Phone Input"
        type="tel"
        placeholder="(555) 123-4567"
      ></forge-form-field>
      
      <forge-form-field
        label="URL Input"
        type="url"
        placeholder="https://example.com"
      ></forge-form-field>
    </div>
  `,
};

export const FloatingLabels: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 30px; width: 350px;">
      <forge-form-field
        variant="floating"
        label="Empty Field"
        type="text"
      ></forge-form-field>
      
      <forge-form-field
        variant="floating"
        label="Pre-filled Field"
        type="text"
        value="This field has content"
      ></forge-form-field>
      
      <forge-form-field
        variant="floating"
        label="Email Address"
        type="email"
        required
      ></forge-form-field>
      
      <forge-form-field
        variant="floating"
        label="With Validation"
        type="email"
        validation-state="success"
        success-message="Valid email format"
        value="user@example.com"
      ></forge-form-field>
    </div>
  `,
};

export const InlineLayout: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 15px; width: 500px;">
      <forge-form-field
        variant="inline"
        label="First Name"
        placeholder="John"
        type="text"
      ></forge-form-field>
      
      <forge-form-field
        variant="inline"
        label="Last Name"
        placeholder="Doe"
        type="text"
        required
      ></forge-form-field>
      
      <forge-form-field
        variant="inline"
        label="Email"
        placeholder="john@example.com"
        type="email"
        validation-state="success"
        success-message="Valid"
      ></forge-form-field>
      
      <forge-form-field
        variant="inline"
        label="Age"
        placeholder="25"
        type="number"
        min="18"
        max="120"
        help-text="Must be 18 or older"
      ></forge-form-field>
    </div>
  `,
};

export const WithConstraints: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px; width: 350px;">
      <forge-form-field
        label="Username"
        type="text"
        placeholder="Enter username"
        min-length="3"
        max-length="20"
        pattern="^[a-zA-Z0-9_]+$"
        help-text="3-20 characters, letters, numbers, and underscores only"
      ></forge-form-field>
      
      <forge-form-field
        label="Age"
        type="number"
        placeholder="Enter your age"
        min="13"
        max="120"
        help-text="Must be between 13 and 120"
        required
      ></forge-form-field>
      
      <forge-form-field
        label="Bio"
        type="text"
        placeholder="Tell us about yourself"
        max-length="500"
        help-text="Maximum 500 characters"
      ></forge-form-field>
    </div>
  `,
};

export const DisabledAndReadonly: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px; width: 300px;">
      <forge-form-field
        label="Normal Field"
        placeholder="You can type here"
        type="text"
      ></forge-form-field>
      
      <forge-form-field
        label="Disabled Field"
        placeholder="This field is disabled"
        type="text"
        disabled
        help-text="Cannot be edited"
      ></forge-form-field>
      
      <forge-form-field
        label="Read-only Field"
        value="This value cannot be changed"
        type="text"
        readonly
        help-text="Read-only content"
      ></forge-form-field>
      
      <forge-form-field
        label="Disabled with Value"
        value="Disabled field with content"
        type="text"
        disabled
      ></forge-form-field>
    </div>
  `,
};

export const FormExample: Story = {
  render: () => html`
    <form style="max-width: 400px;" @submit="${(e: Event) => {
      e.preventDefault();
      console.log('Form submitted');
    }}">
      <h3 style="margin-top: 0;">User Registration Form</h3>
      
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <forge-form-field
          label="Full Name"
          name="fullName"
          type="text"
          placeholder="Enter your full name"
          required
          min-length="2"
          help-text="As it appears on official documents"
        ></forge-form-field>
        
        <forge-form-field
          label="Email Address"
          name="email"
          type="email"
          placeholder="user@example.com"
          required
          help-text="We'll use this to contact you"
        ></forge-form-field>
        
        <forge-form-field
          label="Password"
          name="password"
          type="password"
          placeholder="Create a password"
          required
          min-length="8"
          help-text="At least 8 characters"
        ></forge-form-field>
        
        <forge-form-field
          label="Phone Number"
          name="phone"
          type="tel"
          placeholder="(555) 123-4567"
          show-optional
          help-text="For account verification"
        ></forge-form-field>
        
        <forge-form-field
          variant="inline"
          label="Age"
          name="age"
          type="number"
          placeholder="25"
          min="13"
          required
          help-text="Must be 13 or older"
        ></forge-form-field>
        
        <button 
          type="submit" 
          style="padding: 12px 24px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 16px; margin-top: 10px;"
        >
          Create Account
        </button>
      </div>
    </form>
  `,
};

export const InteractiveDemo: Story = {
  render: () => html`
    <div style="max-width: 500px;">
      <h3>Interactive Form Field Demo</h3>
      <p>Try typing in the fields below to see real-time validation:</p>
      
      <div style="display: flex; flex-direction: column; gap: 25px; margin-top: 20px;">
        <forge-form-field
          label="Email Validation"
          type="email"
          placeholder="Enter email address"
          required
          @input="${(e: CustomEvent) => {
            const field = e.target as any;
            const value = e.detail.value;
            
            if (!value) {
              field.validationState = 'default';
              field.errorMessage = '';
              field.successMessage = '';
            } else if (value.includes('@') && value.includes('.')) {
              field.validationState = 'success';
              field.successMessage = 'Valid email format';
              field.errorMessage = '';
            } else {
              field.validationState = 'error';
              field.errorMessage = 'Please enter a valid email address';
              field.successMessage = '';
            }
          }}"
        ></forge-form-field>
        
        <forge-form-field
          label="Password Strength"
          type="password"
          placeholder="Create password"
          required
          @input="${(e: CustomEvent) => {
            const field = e.target as any;
            const value = e.detail.value;
            
            if (!value) {
              field.validationState = 'default';
              field.helpText = 'Enter a password';
            } else if (value.length < 6) {
              field.validationState = 'error';
              field.errorMessage = 'Password too short (minimum 6 characters)';
              field.helpText = '';
            } else if (value.length < 8) {
              field.validationState = 'warning';
              field.warningMessage = 'Password could be stronger';
              field.errorMessage = '';
              field.helpText = '';
            } else {
              field.validationState = 'success';
              field.successMessage = 'Strong password';
              field.warningMessage = '';
              field.errorMessage = '';
              field.helpText = '';
            }
          }}"
        ></forge-form-field>
        
        <forge-form-field
          variant="floating"
          label="Character Counter"
          type="text"
          max-length="50"
          @input="${(e: CustomEvent) => {
            const field = e.target as any;
            const value = e.detail.value;
            const remaining = 50 - (value?.length || 0);
            
            if (remaining <= 0) {
              field.validationState = 'error';
              field.errorMessage = 'Maximum length reached';
              field.helpText = '';
            } else if (remaining <= 10) {
              field.validationState = 'warning';
              field.warningMessage = \`\${remaining} characters remaining\`;
              field.errorMessage = '';
              field.helpText = '';
            } else {
              field.validationState = 'default';
              field.helpText = \`\${remaining} characters remaining\`;
              field.warningMessage = '';
              field.errorMessage = '';
            }
          }}"
        ></forge-form-field>
      </div>
      
      <div style="margin-top: 30px; padding: 15px; background: #f8f9fa; border-radius: 6px;">
        <h4 style="margin-top: 0;">Features demonstrated:</h4>
        <ul style="margin-bottom: 0; font-size: 14px;">
          <li>Real-time validation feedback</li>
          <li>Dynamic validation state changes</li>
          <li>Character counting and limits</li>
          <li>Password strength indicators</li>
          <li>Multiple validation states</li>
        </ul>
      </div>
    </div>
  `,
};

export const AIIntegration: Story = {
  render: () => html`
    <forge-form-field
      label="AI-Ready Form Field"
      type="text"
      placeholder="Enter data..."
      semantic-role="form-input"
      ai-context="user-profile"
      performance-mode="balanced"
      @input="${(e: CustomEvent) => {
        console.log('AI-aware input:', {
          value: e.detail.value,
          context: 'user-profile',
          userIntent: 'data-entry'
        });
      }}"
      style="width: 300px;"
    ></forge-form-field>
  `,
};