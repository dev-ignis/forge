import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './date-picker.ts';

const meta: Meta = {
  title: 'Molecules/DatePicker',
  component: 'forge-date-picker',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A comprehensive date picker component with calendar interface, range selection, validation, and localization support.',
      },
    },
  },
  argTypes: {
    value: {
      control: 'date',
      description: 'Selected date value',
    },
    placeholder: {
      control: 'text',
      description: 'Input placeholder text',
    },
    format: {
      control: { type: 'select' },
      options: ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'],
      description: 'Date format display',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the date picker',
    },
    required: {
      control: 'boolean',
      description: 'Make the field required',
    },
    readonly: {
      control: 'boolean',
      description: 'Make the input read-only',
    },
    rangeMode: {
      control: 'boolean',
      description: 'Enable date range selection',
    },
    clearButton: {
      control: 'boolean',
      description: 'Show clear button',
    },
    weekStartMonday: {
      control: 'boolean',
      description: 'Start week on Monday instead of Sunday',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    placeholder: 'Select date',
  },
  render: (args) => html`
    <forge-date-picker
      placeholder="${args.placeholder}"
      ?disabled="${args.disabled}"
      ?required="${args.required}"
      ?readonly="${args.readonly}"
      @forge-change="${(e: CustomEvent) => console.log('Date changed:', e.detail)}"
    ></forge-date-picker>
  `,
};

export const WithInitialValue: Story = {
  render: () => {
    const initialDate = new Date('2024-06-15');
    return html`
      <forge-date-picker
        .value="${initialDate}"
        placeholder="Pre-selected date"
      ></forge-date-picker>
    `;
  },
};

export const DateFormats: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px; width: 300px;">
      <div>
        <label style="display: block; margin-bottom: 8px; font-weight: 600;">US Format (MM/DD/YYYY)</label>
        <forge-date-picker
          format="MM/DD/YYYY"
          placeholder="12/31/2024"
        ></forge-date-picker>
      </div>
      
      <div>
        <label style="display: block; margin-bottom: 8px; font-weight: 600;">European Format (DD/MM/YYYY)</label>
        <forge-date-picker
          format="DD/MM/YYYY"
          placeholder="31/12/2024"
        ></forge-date-picker>
      </div>
      
      <div>
        <label style="display: block; margin-bottom: 8px; font-weight: 600;">ISO Format (YYYY-MM-DD)</label>
        <forge-date-picker
          format="YYYY-MM-DD"
          placeholder="2024-12-31"
        ></forge-date-picker>
      </div>
    </div>
  `,
};

export const RangeSelection: Story = {
  render: () => html`
    <div style="width: 350px;">
      <label style="display: block; margin-bottom: 8px; font-weight: 600;">Select Date Range</label>
      <forge-date-picker
        range-mode
        placeholder="Select start and end dates"
        @forge-change="${(e: CustomEvent) => {
          console.log('Range changed:', e.detail);
          if (e.detail.range) {
            console.log('Start:', e.detail.range.start);
            console.log('End:', e.detail.range.end);
          }
        }}"
      ></forge-date-picker>
      <p style="margin-top: 8px; font-size: 14px; color: #666;">
        Click to select start date, then click again to select end date.
      </p>
    </div>
  `,
};

export const WithValidation: Story = {
  render: () => {
    const minDate = new Date();
    minDate.setDate(minDate.getDate() - 30); // 30 days ago
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30); // 30 days from now
    
    return html`
      <div style="width: 300px;">
        <label style="display: block; margin-bottom: 8px; font-weight: 600;">Date with Min/Max Validation</label>
        <forge-date-picker
          .min="${minDate}"
          .max="${maxDate}"
          placeholder="Select date within range"
          required
        ></forge-date-picker>
        <p style="margin-top: 8px; font-size: 12px; color: #666;">
          Valid range: ${minDate.toLocaleDateString()} to ${maxDate.toLocaleDateString()}
        </p>
      </div>
    `;
  },
};

export const DisabledDates: Story = {
  render: () => {
    const today = new Date();
    const disabledDates = [
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10),
    ];
    
    return html`
      <div style="width: 300px;">
        <label style="display: block; margin-bottom: 8px; font-weight: 600;">Calendar with Disabled Dates</label>
        <forge-date-picker
          .disabledDates="${disabledDates}"
          placeholder="Some dates are disabled"
        ></forge-date-picker>
        <p style="margin-top: 8px; font-size: 12px; color: #666;">
          Tomorrow, +5 days, and +10 days are disabled.
        </p>
      </div>
    `;
  },
};

export const WeekStartMonday: Story = {
  render: () => html`
    <div style="display: flex; gap: 30px;">
      <div style="width: 300px;">
        <label style="display: block; margin-bottom: 8px; font-weight: 600;">Week Starts Sunday (Default)</label>
        <forge-date-picker
          placeholder="Sunday first"
        ></forge-date-picker>
      </div>
      
      <div style="width: 300px;">
        <label style="display: block; margin-bottom: 8px; font-weight: 600;">Week Starts Monday</label>
        <forge-date-picker
          week-start-monday
          placeholder="Monday first"
        ></forge-date-picker>
      </div>
    </div>
  `,
};

export const WithoutClearButton: Story = {
  render: () => html`
    <div style="width: 300px;">
      <label style="display: block; margin-bottom: 8px; font-weight: 600;">No Clear Button</label>
      <forge-date-picker
        .clearButton="${false}"
        placeholder="Cannot be cleared"
      ></forge-date-picker>
    </div>
  `,
};

export const ReadOnlyAndDisabled: Story = {
  render: () => {
    const presetDate = new Date('2024-07-04');
    
    return html`
      <div style="display: flex; flex-direction: column; gap: 20px; width: 300px;">
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">Read-Only Date Picker</label>
          <forge-date-picker
            .value="${presetDate}"
            readonly
            placeholder="Read-only date"
          ></forge-date-picker>
        </div>
        
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">Disabled Date Picker</label>
          <forge-date-picker
            .value="${presetDate}"
            disabled
            placeholder="Disabled date"
          ></forge-date-picker>
        </div>
      </div>
    `;
  },
};

export const InteractiveDemo: Story = {
  render: () => html`
    <div style="max-width: 600px;">
      <h3>Interactive Date Picker Demo</h3>
      <p>Try different interactions with the date picker:</p>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px;">
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">📅 Standard Date Picker</label>
          <forge-date-picker
            placeholder="Click to open calendar"
            @forge-change="${(e: CustomEvent) => {
              const target = e.target as any;
              const info = target.nextElementSibling;
              if (info) {
                info.textContent = e.detail.value 
                  ? `Selected: ${e.detail.value.toLocaleDateString()}`
                  : 'No date selected';
              }
            }}"
          ></forge-date-picker>
          <p style="margin-top: 4px; font-size: 12px; color: #666;">No date selected</p>
        </div>
        
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">📊 Range Picker</label>
          <forge-date-picker
            range-mode
            placeholder="Select date range"
            @forge-change="${(e: CustomEvent) => {
              const target = e.target as any;
              const info = target.nextElementSibling;
              if (info) {
                if (e.detail.range && e.detail.range.start && e.detail.range.end) {
                  const start = e.detail.range.start.toLocaleDateString();
                  const end = e.detail.range.end.toLocaleDateString();
                  info.textContent = `Range: ${start} - ${end}`;
                } else {
                  info.textContent = 'No range selected';
                }
              }
            }}"
          ></forge-date-picker>
          <p style="margin-top: 4px; font-size: 12px; color: #666;">No range selected</p>
        </div>
      </div>
      
      <div style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 6px;">
        <h4 style="margin-top: 0;">Features to try:</h4>
        <ul style="margin-bottom: 0; font-size: 14px;">
          <li>Click the input field or calendar icon to open</li>
          <li>Navigate months using arrow buttons</li>
          <li>Use month/year dropdowns for quick navigation</li>
          <li>Click "Today" button to jump to current date</li>
          <li>Use clear button (×) to reset selection</li>
          <li>For range mode: click start date, then end date</li>
        </ul>
      </div>
    </div>
  `,
};

export const FormIntegration: Story = {
  render: () => html`
    <form style="max-width: 400px;" @submit="${(e: Event) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      console.log('Form submitted:', Object.fromEntries(formData.entries()));
    }}">
      <h3>Date Picker in Form</h3>
      
      <div style="margin-bottom: 20px;">
        <label style="display: block; margin-bottom: 8px; font-weight: 600;">
          Event Date *
        </label>
        <forge-date-picker
          name="eventDate"
          placeholder="Select event date"
          required
        ></forge-date-picker>
      </div>
      
      <div style="margin-bottom: 20px;">
        <label style="display: block; margin-bottom: 8px; font-weight: 600;">
          Registration Period
        </label>
        <forge-date-picker
          name="registrationPeriod"
          range-mode
          placeholder="Select registration period"
        ></forge-date-picker>
      </div>
      
      <div style="margin-bottom: 20px;">
        <label style="display: block; margin-bottom: 8px; font-weight: 600;">
          Birth Date
        </label>
        <forge-date-picker
          name="birthDate"
          placeholder="MM/DD/YYYY"
          format="MM/DD/YYYY"
        ></forge-date-picker>
      </div>
      
      <button type="submit" style="padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">
        Submit Form
      </button>
    </form>
  `,
};

export const CustomLocalization: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
      <div>
        <label style="display: block; margin-bottom: 8px; font-weight: 600;">English (US)</label>
        <forge-date-picker
          locale="en-US"
          format="MM/DD/YYYY"
          placeholder="MM/DD/YYYY"
        ></forge-date-picker>
      </div>
      
      <div>
        <label style="display: block; margin-bottom: 8px; font-weight: 600;">German (DE)</label>
        <forge-date-picker
          locale="de-DE"
          format="DD/MM/YYYY"
          placeholder="TT/MM/JJJJ"
          week-start-monday
        ></forge-date-picker>
      </div>
      
      <div>
        <label style="display: block; margin-bottom: 8px; font-weight: 600;">Japanese (JP)</label>
        <forge-date-picker
          locale="ja-JP"
          format="YYYY-MM-DD"
          placeholder="YYYY-MM-DD"
        ></forge-date-picker>
      </div>
    </div>
  `,
};

export const AIIntegration: Story = {
  render: () => html`
    <forge-date-picker
      placeholder="AI-ready date picker"
      semantic-role="date-picker"
      ai-context="event-scheduling"
      performance-mode="balanced"
      @forge-change="${(e: CustomEvent) => {
        console.log('AI-aware date selection:', {
          value: e.detail.value,
          context: 'event-scheduling',
          userIntent: 'date-selection'
        });
      }}"
      style="width: 300px;"
    ></forge-date-picker>
  `,
};