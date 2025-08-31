import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './select';
import type { ForgeSelect, SelectOption } from './select';

const meta: Meta<ForgeSelect> = {
  title: 'Atoms/Select',
  component: 'forge-select',
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Currently selected value'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no value selected'
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the select control'
    },
    variant: {
      control: 'radio',
      options: ['default', 'filled', 'outlined'],
      description: 'Visual variant of the select'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the select'
    },
    required: {
      control: 'boolean',
      description: 'Mark field as required'
    },
    searchable: {
      control: 'boolean',
      description: 'Enable search functionality'
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state'
    },
    open: {
      control: 'boolean',
      description: 'Control dropdown open state'
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
      description: 'Select label'
    },
    description: {
      control: 'text',
      description: 'Select description'
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
# ForgeSelect Component

A fully accessible dropdown select component with search, grouping, and keyboard navigation support.

## Features
- **Single Selection**: Select one option from a dropdown list
- **Search/Filter**: Optional search functionality to filter options
- **Option Groups**: Support for grouped options
- **Keyboard Navigation**: Full arrow key support with Escape to close
- **Size Variants**: Small, medium, and large sizes
- **Visual Variants**: Default, filled, and outlined styles
- **Validation**: Built-in required field validation
- **Loading State**: Show loading spinner while fetching options
- **Accessibility**: WCAG 2.1 AA compliant with proper ARIA attributes
- **AI-Ready**: ADR-014 compliant with semantic metadata
- **Performance Monitoring**: Built-in performance tracking

## Usage

\`\`\`javascript
const select = document.querySelector('forge-select');
select.options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3', disabled: true }
];

select.addEventListener('forge-change', (e) => {
  console.log('Selected:', e.detail.value);
});
\`\`\`

## Keyboard Support
- **Enter/Space**: Open dropdown or select focused option
- **Escape**: Close dropdown
- **Arrow Down**: Navigate to next option
- **Arrow Up**: Navigate to previous option
- **Home**: Jump to first option
- **End**: Jump to last option

## Theming
The component uses CSS custom properties for theming:
- \`--forge-color-primary\`: Primary color for selected state
- \`--forge-color-border\`: Border color
- \`--forge-color-bg-hover\`: Hover background color
- \`--forge-color-error\`: Error state color
        `
      }
    }
  }
};

export default meta;
type Story = StoryObj<ForgeSelect>;

const simpleOptions: SelectOption[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' }
];

const countryOptions: SelectOption[] = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'mx', label: 'Mexico' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'it', label: 'Italy' },
  { value: 'es', label: 'Spain' },
  { value: 'jp', label: 'Japan' },
  { value: 'cn', label: 'China' },
  { value: 'au', label: 'Australia' },
  { value: 'br', label: 'Brazil' }
];

const groupedOptions: SelectOption[] = [
  { value: 'small', label: 'Small', group: 'Sizes' },
  { value: 'medium', label: 'Medium', group: 'Sizes' },
  { value: 'large', label: 'Large', group: 'Sizes' },
  { value: 'xl', label: 'Extra Large', group: 'Sizes' },
  { value: 'red', label: 'Red', group: 'Colors' },
  { value: 'blue', label: 'Blue', group: 'Colors' },
  { value: 'green', label: 'Green', group: 'Colors' },
  { value: 'yellow', label: 'Yellow', group: 'Colors' },
  { value: 'purple', label: 'Purple', group: 'Colors' }
];

const mixedOptions: SelectOption[] = [
  { value: 'active', label: 'Active' },
  { value: 'pending', label: 'Pending' },
  { value: 'inactive', label: 'Inactive', disabled: true },
  { value: 'archived', label: 'Archived' },
  { value: 'deleted', label: 'Deleted', disabled: true }
];

export const Default: Story = {
  args: {
    label: 'Select Option',
    placeholder: 'Choose an option',
    options: simpleOptions,
    value: ''
  },
  render: (args) => html`
    <forge-select
      .label="${args.label}"
      .description="${args.description}"
      .placeholder="${args.placeholder}"
      .options="${args.options}"
      .value="${args.value}"
      .disabled="${args.disabled}"
      .required="${args.required}"
      .searchable="${args.searchable}"
      .loading="${args.loading}"
      .open="${args.open}"
      .error="${args.error}"
      .errorMessage="${args.errorMessage}"
      .size="${args.size}"
      .variant="${args.variant}"
      .devMode="${args.devMode}"
      .showMetrics="${args.showMetrics}"
    ></forge-select>
  `
};

export const WithSearch: Story = {
  args: {
    label: 'Select Country',
    placeholder: 'Search for a country...',
    options: countryOptions,
    searchable: true
  }
};

export const GroupedOptions: Story = {
  args: {
    label: 'Select Size or Color',
    description: 'Options are grouped by category',
    options: groupedOptions,
    placeholder: 'Choose from groups'
  }
};

export const Required: Story = {
  args: {
    label: 'Required Selection',
    options: simpleOptions,
    required: true,
    placeholder: 'This field is required'
  }
};

export const ErrorState: Story = {
  args: {
    label: 'Select with Error',
    options: simpleOptions,
    error: true,
    errorMessage: 'Please make a selection',
    required: true
  }
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Select',
    options: simpleOptions,
    value: 'option2',
    disabled: true
  }
};

export const Loading: Story = {
  args: {
    label: 'Loading Options',
    placeholder: 'Loading...',
    loading: true
  }
};

export const SmallSize: Story = {
  args: {
    label: 'Small Select',
    options: simpleOptions,
    size: 'sm'
  }
};

export const LargeSize: Story = {
  args: {
    label: 'Large Select',
    options: simpleOptions,
    size: 'lg'
  }
};

export const FilledVariant: Story = {
  args: {
    label: 'Filled Style',
    options: simpleOptions,
    variant: 'filled'
  }
};

export const OutlinedVariant: Story = {
  args: {
    label: 'Outlined Style',
    options: simpleOptions,
    variant: 'outlined'
  }
};

export const MixedStates: Story = {
  args: {
    label: 'Options with mixed states',
    description: 'Some options are disabled',
    options: mixedOptions,
    placeholder: 'Select status'
  }
};

export const Interactive: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;">
      <forge-select
        id="interactive-select"
        label="Interactive Example"
        description="Try different interactions with this select"
        placeholder="Choose an option..."
        .options="${groupedOptions}"
        searchable
        required
      ></forge-select>
      
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <button @click="${() => {
          const select = document.getElementById('interactive-select') as ForgeSelect;
          select.selectOption('medium');
        }}">Select Medium</button>
        
        <button @click="${() => {
          const select = document.getElementById('interactive-select') as ForgeSelect;
          select.openDropdown();
        }}">Open Dropdown</button>
        
        <button @click="${() => {
          const select = document.getElementById('interactive-select') as ForgeSelect;
          select.validate();
        }}">Validate</button>
        
        <button @click="${() => {
          const select = document.getElementById('interactive-select') as ForgeSelect;
          select.reset();
        }}">Reset</button>
        
        <button @click="${() => {
          const select = document.getElementById('interactive-select') as ForgeSelect;
          select.disabled = !select.disabled;
        }}">Toggle Disabled</button>
        
        <button @click="${() => {
          const select = document.getElementById('interactive-select') as ForgeSelect;
          select.searchable = !select.searchable;
        }}">Toggle Search</button>
      </div>
      
      <div id="select-output" style="padding: 12px; background: #f3f4f6; border-radius: 4px; font-family: monospace; font-size: 12px;">
        Selected: none
      </div>
    </div>
    
    <script>
      const select = document.getElementById('interactive-select');
      const output = document.getElementById('select-output');
      
      select?.addEventListener('forge-change', (e) => {
        const detail = e.detail;
        output.innerHTML = \`Selected: \${detail.value || 'none'}<br>Label: \${detail.option?.label || 'N/A'}\`;
      });
      
      select?.addEventListener('forge-open', () => {
        console.log('Dropdown opened');
      });
      
      select?.addEventListener('forge-close', () => {
        console.log('Dropdown closed');
      });
    </script>
  `
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 32px; max-width: 800px;">
      <div>
        <h3 style="margin-bottom: 16px;">Sizes</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
          <forge-select
            label="Small Size"
            size="sm"
            .options="${simpleOptions}"
            placeholder="Small select"
          ></forge-select>
          
          <forge-select
            label="Medium Size (Default)"
            size="md"
            .options="${simpleOptions}"
            placeholder="Medium select"
          ></forge-select>
          
          <forge-select
            label="Large Size"
            size="lg"
            .options="${simpleOptions}"
            placeholder="Large select"
          ></forge-select>
        </div>
      </div>
      
      <div>
        <h3 style="margin-bottom: 16px;">Variants</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
          <forge-select
            label="Default Variant"
            variant="default"
            .options="${simpleOptions}"
            placeholder="Default style"
          ></forge-select>
          
          <forge-select
            label="Filled Variant"
            variant="filled"
            .options="${simpleOptions}"
            placeholder="Filled style"
          ></forge-select>
          
          <forge-select
            label="Outlined Variant"
            variant="outlined"
            .options="${simpleOptions}"
            placeholder="Outlined style"
          ></forge-select>
        </div>
      </div>
      
      <div>
        <h3 style="margin-bottom: 16px;">States</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
          <forge-select
            label="Normal State"
            .options="${simpleOptions}"
            placeholder="Normal select"
          ></forge-select>
          
          <forge-select
            label="Disabled State"
            .options="${simpleOptions}"
            disabled
            value="option2"
            placeholder="Disabled select"
          ></forge-select>
          
          <forge-select
            label="Loading State"
            loading
            placeholder="Loading options..."
          ></forge-select>
          
          <forge-select
            label="Error State"
            .options="${simpleOptions}"
            error
            errorMessage="Selection is required"
            required
            placeholder="Error select"
          ></forge-select>
        </div>
      </div>
      
      <div>
        <h3 style="margin-bottom: 16px;">Features</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
          <forge-select
            label="With Search"
            .options="${countryOptions}"
            searchable
            placeholder="Search countries..."
          ></forge-select>
          
          <forge-select
            label="With Groups"
            .options="${groupedOptions}"
            placeholder="Grouped options"
          ></forge-select>
          
          <forge-select
            label="Required Field"
            .options="${simpleOptions}"
            required
            placeholder="Required selection"
          ></forge-select>
        </div>
      </div>
    </div>
  `
};

export const WithPerformanceMetrics: Story = {
  args: {
    label: 'Performance Demo',
    options: countryOptions,
    searchable: true,
    devMode: true,
    showMetrics: true
  }
};