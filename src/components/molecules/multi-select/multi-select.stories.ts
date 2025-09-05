import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './multi-select.ts';
import type { MultiSelectOption } from './multi-select.ts';

const meta: Meta = {
  title: 'Molecules/MultiSelect',
  component: 'forge-multi-select',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A comprehensive multi-select component with search, keyboard navigation, grouping, and accessibility features.',
      },
    },
  },
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no items selected',
    },
    searchPlaceholder: {
      control: 'text',
      description: 'Search input placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the multi-select',
    },
    showSearch: {
      control: 'boolean',
      description: 'Show search functionality',
    },
    showActions: {
      control: 'boolean',
      description: 'Show action buttons (All, None, Invert)',
    },
    maxSelections: {
      control: 'number',
      description: 'Maximum number of selections allowed',
    },
    groupBy: {
      control: 'boolean',
      description: 'Group options by category',
    },
  },
};

export default meta;
type Story = StoryObj;

// Sample options
const basicOptions: MultiSelectOption[] = [
  { value: 'js', label: 'JavaScript' },
  { value: 'ts', label: 'TypeScript' },
  { value: 'py', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'cs', label: 'C#' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
];

const groupedOptions: MultiSelectOption[] = [
  { value: 'js', label: 'JavaScript', group: 'Frontend' },
  { value: 'ts', label: 'TypeScript', group: 'Frontend' },
  { value: 'react', label: 'React', group: 'Frontend' },
  { value: 'vue', label: 'Vue.js', group: 'Frontend' },
  { value: 'angular', label: 'Angular', group: 'Frontend' },
  
  { value: 'node', label: 'Node.js', group: 'Backend' },
  { value: 'py', label: 'Python', group: 'Backend' },
  { value: 'java', label: 'Java', group: 'Backend' },
  { value: 'php', label: 'PHP', group: 'Backend' },
  { value: 'go', label: 'Go', group: 'Backend' },
  
  { value: 'mysql', label: 'MySQL', group: 'Database' },
  { value: 'postgres', label: 'PostgreSQL', group: 'Database' },
  { value: 'mongo', label: 'MongoDB', group: 'Database' },
  { value: 'redis', label: 'Redis', group: 'Database' },
];

export const Default: Story = {
  args: {
    placeholder: 'Select programming languages...',
  },
  render: (args) => html`
    <forge-multi-select
      .options="${basicOptions}"
      placeholder="${args.placeholder}"
      ?disabled="${args.disabled}"
      ?show-search="${args.showSearch}"
      ?show-actions="${args.showActions}"
      @change="${(e: CustomEvent) => console.log('Selection changed:', e.detail)}"
    ></forge-multi-select>
  `,
};

export const WithInitialSelection: Story = {
  render: () => html`
    <forge-multi-select
      .options="${basicOptions}"
      .value="${['js', 'ts', 'py']}"
      placeholder="Select languages..."
      @change="${(e: CustomEvent) => console.log('Selection changed:', e.detail)}"
    ></forge-multi-select>
  `,
};

export const WithSearch: Story = {
  render: () => html`
    <forge-multi-select
      .options="${basicOptions}"
      placeholder="Search and select languages..."
      show-search
      search-placeholder="Type to search languages..."
      @change="${(e: CustomEvent) => console.log('Selection changed:', e.detail)}"
    ></forge-multi-select>
  `,
};

export const GroupedOptions: Story = {
  render: () => html`
    <forge-multi-select
      .options="${groupedOptions}"
      placeholder="Select technologies..."
      group-by
      show-search
      @change="${(e: CustomEvent) => console.log('Selection changed:', e.detail)}"
    ></forge-multi-select>
  `,
};

export const WithMaxSelections: Story = {
  render: () => html`
    <forge-multi-select
      .options="${basicOptions}"
      placeholder="Select up to 3 languages..."
      max-selections="3"
      @change="${(e: CustomEvent) => {
        console.log('Selection changed:', e.detail);
        if (e.detail.value.length >= 3) {
          console.log('Maximum selections reached!');
        }
      }}"
    ></forge-multi-select>
  `,
};

export const WithDisabledOptions: Story = {
  render: () => {
    const optionsWithDisabled: MultiSelectOption[] = [
      { value: 'js', label: 'JavaScript' },
      { value: 'ts', label: 'TypeScript' },
      { value: 'py', label: 'Python', disabled: true },
      { value: 'java', label: 'Java' },
      { value: 'cpp', label: 'C++', disabled: true },
      { value: 'cs', label: 'C#' },
      { value: 'go', label: 'Go' },
      { value: 'rust', label: 'Rust', disabled: true },
    ];

    return html`
      <forge-multi-select
        .options="${optionsWithDisabled}"
        placeholder="Some options are disabled..."
        @change="${(e: CustomEvent) => console.log('Selection changed:', e.detail)}"
      ></forge-multi-select>
    `;
  },
};

export const WithoutActions: Story = {
  render: () => html`
    <forge-multi-select
      .options="${basicOptions}"
      placeholder="No action buttons..."
      show-search="${false}"
      show-actions="${false}"
      @change="${(e: CustomEvent) => console.log('Selection changed:', e.detail)}"
    ></forge-multi-select>
  `,
};

export const LargeDataset: Story = {
  render: () => {
    const countries: MultiSelectOption[] = [
      { value: 'us', label: 'United States', group: 'North America' },
      { value: 'ca', label: 'Canada', group: 'North America' },
      { value: 'mx', label: 'Mexico', group: 'North America' },
      
      { value: 'uk', label: 'United Kingdom', group: 'Europe' },
      { value: 'de', label: 'Germany', group: 'Europe' },
      { value: 'fr', label: 'France', group: 'Europe' },
      { value: 'it', label: 'Italy', group: 'Europe' },
      { value: 'es', label: 'Spain', group: 'Europe' },
      { value: 'nl', label: 'Netherlands', group: 'Europe' },
      { value: 'se', label: 'Sweden', group: 'Europe' },
      { value: 'no', label: 'Norway', group: 'Europe' },
      { value: 'dk', label: 'Denmark', group: 'Europe' },
      
      { value: 'jp', label: 'Japan', group: 'Asia' },
      { value: 'cn', label: 'China', group: 'Asia' },
      { value: 'kr', label: 'South Korea', group: 'Asia' },
      { value: 'in', label: 'India', group: 'Asia' },
      { value: 'sg', label: 'Singapore', group: 'Asia' },
      { value: 'th', label: 'Thailand', group: 'Asia' },
      { value: 'my', label: 'Malaysia', group: 'Asia' },
      { value: 'id', label: 'Indonesia', group: 'Asia' },
      
      { value: 'au', label: 'Australia', group: 'Oceania' },
      { value: 'nz', label: 'New Zealand', group: 'Oceania' },
      
      { value: 'br', label: 'Brazil', group: 'South America' },
      { value: 'ar', label: 'Argentina', group: 'South America' },
      { value: 'cl', label: 'Chile', group: 'South America' },
      { value: 'co', label: 'Colombia', group: 'South America' },
      
      { value: 'za', label: 'South Africa', group: 'Africa' },
      { value: 'eg', label: 'Egypt', group: 'Africa' },
      { value: 'ng', label: 'Nigeria', group: 'Africa' },
      { value: 'ke', label: 'Kenya', group: 'Africa' },
    ];

    return html`
      <forge-multi-select
        .options="${countries}"
        placeholder="Select countries..."
        group-by
        show-search
        search-placeholder="Search countries..."
        @change="${(e: CustomEvent) => console.log('Countries selected:', e.detail.value)}"
      ></forge-multi-select>
    `;
  },
};

export const DisabledState: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <div>
        <label style="display: block; margin-bottom: 8px; font-weight: 600;">Enabled Multi-Select</label>
        <forge-multi-select
          .options="${basicOptions.slice(0, 5)}"
          placeholder="You can interact with this"
        ></forge-multi-select>
      </div>
      
      <div>
        <label style="display: block; margin-bottom: 8px; font-weight: 600;">Disabled Multi-Select</label>
        <forge-multi-select
          .options="${basicOptions.slice(0, 5)}"
          .value="${['js', 'ts']}"
          placeholder="This is disabled"
          disabled
        ></forge-multi-select>
      </div>
    </div>
  `,
};

export const CustomStyling: Story = {
  render: () => html`
    <style>
      .custom-multi-select {
        --forge-primary-color: #10b981;
        --forge-border-color: #d1fae5;
        --forge-tag-bg: #ecfdf5;
        --forge-hover-bg: #f0fdf4;
      }
    </style>
    <forge-multi-select
      class="custom-multi-select"
      .options="${basicOptions}"
      .value="${['js', 'py']}"
      placeholder="Custom green theme..."
    ></forge-multi-select>
  `,
};

export const FormIntegration: Story = {
  render: () => html`
    <form @submit="${(e: Event) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      console.log('Form submitted with multi-select data');
    }}">
      <div style="display: flex; flex-direction: column; gap: 20px; width: 400px;">
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">
            Programming Skills *
          </label>
          <forge-multi-select
            .options="${basicOptions}"
            placeholder="Select your skills..."
            @change="${(e: CustomEvent) => {
              const input = document.getElementById('skills-input') as HTMLInputElement;
              if (input) {
                input.value = JSON.stringify(e.detail.value);
              }
            }}"
          ></forge-multi-select>
          <input type="hidden" id="skills-input" name="skills" required />
        </div>
        
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">
            Preferred Technologies
          </label>
          <forge-multi-select
            .options="${groupedOptions}"
            placeholder="Optional selections..."
            group-by
            max-selections="5"
            @change="${(e: CustomEvent) => {
              const input = document.getElementById('tech-input') as HTMLInputElement;
              if (input) {
                input.value = JSON.stringify(e.detail.value);
              }
            }}"
          ></forge-multi-select>
          <input type="hidden" id="tech-input" name="technologies" />
        </div>
        
        <button type="submit" style="padding: 12px 24px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">
          Submit Form
        </button>
      </div>
    </form>
  `,
};

export const InteractiveDemo: Story = {
  render: () => html`
    <div style="max-width: 600px;">
      <h3>Interactive Multi-Select Demo</h3>
      <p>Try different features of the multi-select component:</p>
      
      <div style="display: flex; flex-direction: column; gap: 25px; margin: 20px 0;">
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">🔍 With Search</label>
          <forge-multi-select
            .options="${basicOptions}"
            placeholder="Type to search languages..."
            show-search
            @change="${(e: CustomEvent) => {
              const target = e.target as any;
              const info = target.nextElementSibling;
              if (info) {
                const count = e.detail.value.length;
                info.textContent = count > 0 ? `Selected ${count} language${count !== 1 ? 's' : ''}` : 'No languages selected';
              }
            }}"
          ></forge-multi-select>
          <p style="margin-top: 4px; font-size: 12px; color: #666;">No languages selected</p>
        </div>
        
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">📚 Grouped Options</label>
          <forge-multi-select
            .options="${groupedOptions}"
            placeholder="Select by category..."
            group-by
            show-search
            @change="${(e: CustomEvent) => {
              const target = e.target as any;
              const info = target.nextElementSibling;
              if (info) {
                const selected = e.detail.value;
                if (selected.length > 0) {
                  const labels = groupedOptions
                    .filter(opt => selected.includes(opt.value))
                    .map(opt => opt.label);
                  info.textContent = `Selected: ${labels.join(', ')}`;
                } else {
                  info.textContent = 'No technologies selected';
                }
              }
            }}"
          ></forge-multi-select>
          <p style="margin-top: 4px; font-size: 12px; color: #666;">No technologies selected</p>
        </div>
        
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">🚦 Limited Selection (Max 3)</label>
          <forge-multi-select
            .options="${basicOptions}"
            placeholder="Choose up to 3..."
            max-selections="3"
            @change="${(e: CustomEvent) => {
              const target = e.target as any;
              const info = target.nextElementSibling;
              if (info) {
                const count = e.detail.value.length;
                const remaining = Math.max(0, 3 - count);
                if (count === 0) {
                  info.textContent = 'Select up to 3 languages';
                } else if (count === 3) {
                  info.textContent = 'Maximum selections reached';
                  info.style.color = '#dc2626';
                } else {
                  info.textContent = `${count} selected, ${remaining} remaining`;
                  info.style.color = '#6b7280';
                }
              }
            }}"
          ></forge-multi-select>
          <p style="margin-top: 4px; font-size: 12px; color: #666;">Select up to 3 languages</p>
        </div>
      </div>
      
      <div style="margin-top: 30px; padding: 15px; background: #f8f9fa; border-radius: 6px;">
        <h4 style="margin-top: 0;">Features demonstrated:</h4>
        <ul style="margin-bottom: 0; font-size: 14px;">
          <li><kbd>↑</kbd>/<kbd>↓</kbd> - Navigate options</li>
          <li><kbd>Enter</kbd>/<kbd>Space</kbd> - Select option</li>
          <li><kbd>Escape</kbd> - Close dropdown</li>
          <li>Search to filter options</li>
          <li>Click tag × to remove selection</li>
          <li>All/None/Invert action buttons</li>
          <li>Grouped display with categories</li>
          <li>Selection limits and validation</li>
        </ul>
      </div>
    </div>
  `,
};

export const AccessibilityShowcase: Story = {
  render: () => html`
    <div style="max-width: 500px;">
      <h3>Accessibility Features</h3>
      <p>This multi-select component includes comprehensive accessibility support:</p>
      
      <forge-multi-select
        .options="${basicOptions}"
        placeholder="Try keyboard navigation..."
        show-search
        @change="${(e: CustomEvent) => console.log('Accessible selection:', e.detail)}"
      ></forge-multi-select>
      
      <div style="margin-top: 20px; padding: 15px; background: #f0f9ff; border: 1px solid #bfdbfe; border-radius: 6px;">
        <h4 style="margin-top: 0; color: #1e40af;">Accessibility Features:</h4>
        <ul style="margin-bottom: 0; font-size: 14px; color: #1e40af;">
          <li><strong>ARIA Roles:</strong> combobox, listbox, option</li>
          <li><strong>Keyboard Navigation:</strong> Full arrow key support</li>
          <li><strong>Screen Reader:</strong> Live announcements for changes</li>
          <li><strong>Focus Management:</strong> Proper focus indicators</li>
          <li><strong>High Contrast:</strong> Visible in high contrast mode</li>
          <li><strong>Semantic HTML:</strong> Proper form integration</li>
        </ul>
      </div>
    </div>
  `,
};

export const AIIntegration: Story = {
  render: () => html`
    <forge-multi-select
      .options="${basicOptions}"
      placeholder="AI-ready multi-select..."
      semantic-role="multi-select"
      ai-context="skill-selection"
      performance-mode="balanced"
      @change="${(e: CustomEvent) => {
        console.log('AI-aware multi-selection:', {
          values: e.detail.value,
          count: e.detail.value.length,
          context: 'skill-selection',
          userIntent: 'preference-specification'
        });
      }}"
    ></forge-multi-select>
  `,
};