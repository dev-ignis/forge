import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './radio-group';
import type { ForgeRadioGroup, RadioOption } from './radio-group';

const meta: Meta<ForgeRadioGroup> = {
  title: 'Atoms/RadioGroup',
  component: 'forge-radio-group',
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'select',
      options: ['', 'small', 'medium', 'large', 'xl'],
      description: 'Currently selected value'
    },
    orientation: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
      description: 'Layout orientation of radio options'
    },
    labelPosition: {
      control: 'radio',
      options: ['start', 'end'],
      description: 'Position of labels relative to radio controls'
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Size of radio controls'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable all radio options'
    },
    required: {
      control: 'boolean',
      description: 'Mark field as required'
    },
    error: {
      control: 'boolean',
      description: 'Show error state'
    },
    errorMessage: {
      control: 'text',
      description: 'Error message to display'
    },
    label: {
      control: 'text',
      description: 'Group label'
    },
    description: {
      control: 'text',
      description: 'Group description'
    },
    devMode: {
      control: 'boolean',
      description: 'Enable developer mode',
      table: { category: 'Developer' }
    },
    showMetrics: {
      control: 'boolean',
      description: 'Show performance metrics',
      table: { category: 'Developer' }
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
# ForgeRadioGroup Component

A fully accessible radio group component that allows users to select a single option from multiple choices.

## Features
- **Single Selection**: Enforces one selection at a time
- **Keyboard Navigation**: Full arrow key support with Home/End keys
- **Flexible Layout**: Horizontal and vertical orientations
- **Label Positioning**: Start or end positioning for labels
- **Size Variants**: Small, medium, and large sizes
- **Validation**: Built-in required field validation
- **Accessibility**: WCAG 2.1 AA compliant with proper ARIA attributes
- **AI-Ready**: ADR-014 compliant with semantic metadata
- **Performance Monitoring**: Built-in performance tracking

## Usage

\`\`\`javascript
const radioGroup = document.querySelector('forge-radio-group');
radioGroup.options = [
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' }
];

radioGroup.addEventListener('forge-change', (e) => {
  console.log('Selected:', e.detail.value);
});
\`\`\`

## Keyboard Support
- **Arrow Down/Right**: Select next option
- **Arrow Up/Left**: Select previous option
- **Home**: Select first option
- **End**: Select last option
- **Space/Enter**: Select focused option

## Theming
The component uses CSS custom properties for theming:
- \`--forge-color-primary\`: Primary color for selected state
- \`--forge-color-border\`: Border color for unselected state
- \`--forge-color-error\`: Error state color
- \`--forge-spacing-*\`: Spacing between options
        `
      }
    }
  }
};

export default meta;
type Story = StoryObj<ForgeRadioGroup>;

const sizeOptions: RadioOption[] = [
  { value: 'small', label: 'Small', description: 'Compact size for limited space' },
  { value: 'medium', label: 'Medium', description: 'Default size for most uses' },
  { value: 'large', label: 'Large', description: 'Larger size for better visibility' },
  { value: 'xl', label: 'Extra Large', description: 'Maximum size for emphasis', disabled: true }
];

const simpleOptions: RadioOption[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' }
];

const planOptions: RadioOption[] = [
  { value: 'basic', label: 'Basic Plan', description: '$9.99/month - Essential features' },
  { value: 'pro', label: 'Pro Plan', description: '$19.99/month - Advanced features' },
  { value: 'enterprise', label: 'Enterprise', description: 'Custom pricing - Full access' }
];

export const Default: Story = {
  args: {
    label: 'Select Size',
    options: sizeOptions,
    value: 'medium'
  },
  render: (args) => html`
    <forge-radio-group
      .label="${args.label}"
      .description="${args.description}"
      .options="${args.options}"
      .value="${args.value}"
      .disabled="${args.disabled}"
      .required="${args.required}"
      .error="${args.error}"
      .errorMessage="${args.errorMessage}"
      .orientation="${args.orientation}"
      .labelPosition="${args.labelPosition}"
      .size="${args.size}"
      .devMode="${args.devMode}"
      .showMetrics="${args.showMetrics}"
    ></forge-radio-group>
  `
};

export const Horizontal: Story = {
  args: {
    label: 'Choose an option',
    options: simpleOptions,
    orientation: 'horizontal'
  }
};

export const WithDescriptions: Story = {
  args: {
    label: 'Select a plan',
    description: 'Choose the plan that best fits your needs',
    options: planOptions,
    value: 'pro'
  }
};

export const Required: Story = {
  args: {
    label: 'Required Selection',
    options: simpleOptions,
    required: true
  }
};

export const ErrorState: Story = {
  args: {
    label: 'Select an option',
    options: simpleOptions,
    error: true,
    errorMessage: 'Please make a selection',
    required: true
  }
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Radio Group',
    options: simpleOptions,
    value: 'option2',
    disabled: true
  }
};

export const LabelStart: Story = {
  args: {
    label: 'Label Position Start',
    options: simpleOptions,
    labelPosition: 'start'
  }
};

export const SmallSize: Story = {
  args: {
    label: 'Small Radio Controls',
    options: simpleOptions,
    size: 'sm'
  }
};

export const LargeSize: Story = {
  args: {
    label: 'Large Radio Controls',
    options: simpleOptions,
    size: 'lg'
  }
};

export const MixedStates: Story = {
  args: {
    label: 'Options with mixed states',
    options: [
      { value: 'available1', label: 'Available Option 1' },
      { value: 'available2', label: 'Available Option 2' },
      { value: 'disabled', label: 'Disabled Option', disabled: true },
      { value: 'available3', label: 'Available Option 3' }
    ]
  }
};

export const Interactive: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px; max-width: 600px;">
      <forge-radio-group
        id="interactive-radio"
        label="Interactive Example"
        description="Try different interactions with this radio group"
        .options="${planOptions}"
        required
      ></forge-radio-group>
      
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <button @click="${() => {
          const radio = document.getElementById('interactive-radio') as ForgeRadioGroup;
          radio.selectOption('basic');
        }}">Select Basic</button>
        
        <button @click="${() => {
          const radio = document.getElementById('interactive-radio') as ForgeRadioGroup;
          radio.selectOption('pro');
        }}">Select Pro</button>
        
        <button @click="${() => {
          const radio = document.getElementById('interactive-radio') as ForgeRadioGroup;
          radio.validate();
        }}">Validate</button>
        
        <button @click="${() => {
          const radio = document.getElementById('interactive-radio') as ForgeRadioGroup;
          radio.reset();
        }}">Reset</button>
        
        <button @click="${() => {
          const radio = document.getElementById('interactive-radio') as ForgeRadioGroup;
          radio.disabled = !radio.disabled;
        }}">Toggle Disabled</button>
      </div>
      
      <div id="radio-output" style="padding: 12px; background: #f3f4f6; border-radius: 4px; font-family: monospace; font-size: 12px;">
        Selected: none
      </div>
    </div>
    
    <script>
      const radio = document.getElementById('interactive-radio');
      const output = document.getElementById('radio-output');
      
      radio?.addEventListener('forge-change', (e) => {
        const detail = e.detail;
        output.innerHTML = \`Selected: \${detail.value || 'none'}<br>Label: \${detail.option?.label || 'N/A'}\`;
      });
    </script>
  `
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 32px; max-width: 800px;">
      <div>
        <h3 style="margin-bottom: 16px;">Sizes</h3>
        <div style="display: grid; gap: 16px;">
          <forge-radio-group
            label="Small Size"
            size="sm"
            .options="${simpleOptions}"
            value="option1"
          ></forge-radio-group>
          
          <forge-radio-group
            label="Medium Size (Default)"
            size="md"
            .options="${simpleOptions}"
            value="option2"
          ></forge-radio-group>
          
          <forge-radio-group
            label="Large Size"
            size="lg"
            .options="${simpleOptions}"
            value="option3"
          ></forge-radio-group>
        </div>
      </div>
      
      <div>
        <h3 style="margin-bottom: 16px;">Orientations</h3>
        <div style="display: grid; gap: 16px;">
          <forge-radio-group
            label="Vertical (Default)"
            orientation="vertical"
            .options="${simpleOptions}"
          ></forge-radio-group>
          
          <forge-radio-group
            label="Horizontal"
            orientation="horizontal"
            .options="${simpleOptions}"
          ></forge-radio-group>
        </div>
      </div>
      
      <div>
        <h3 style="margin-bottom: 16px;">Label Positions</h3>
        <div style="display: grid; gap: 16px;">
          <forge-radio-group
            label="Label End (Default)"
            labelPosition="end"
            .options="${simpleOptions}"
          ></forge-radio-group>
          
          <forge-radio-group
            label="Label Start"
            labelPosition="start"
            .options="${simpleOptions}"
          ></forge-radio-group>
        </div>
      </div>
      
      <div>
        <h3 style="margin-bottom: 16px;">States</h3>
        <div style="display: grid; gap: 16px;">
          <forge-radio-group
            label="Normal State"
            .options="${simpleOptions}"
          ></forge-radio-group>
          
          <forge-radio-group
            label="Disabled State"
            .options="${simpleOptions}"
            disabled
            value="option2"
          ></forge-radio-group>
          
          <forge-radio-group
            label="Error State"
            .options="${simpleOptions}"
            error
            errorMessage="Selection is required"
            required
          ></forge-radio-group>
        </div>
      </div>
    </div>
  `
};

export const WithPerformanceMetrics: Story = {
  args: {
    label: 'Performance Demo',
    options: sizeOptions,
    devMode: true,
    showMetrics: true
  }
};