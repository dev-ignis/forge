import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './dropdown.ts';
import type { DropdownItem } from './dropdown.ts';

const meta: Meta = {
  title: 'Molecules/Dropdown',
  component: 'forge-dropdown',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible dropdown component with customizable options, multi-select, keyboard navigation, and nested menus.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Button label text',
    },
    position: {
      control: { type: 'select' },
      options: ['bottom-start', 'bottom-end', 'top-start', 'top-end', 'left', 'right', 'auto'],
      description: 'Dropdown menu position',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary', 'minimal'],
      description: 'Visual style variant',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Component size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the dropdown',
    },
    closeOnSelect: {
      control: 'boolean',
      description: 'Close dropdown when item is selected',
    },
    multiSelect: {
      control: 'boolean',
      description: 'Allow multiple item selection',
    },
  },
};

export default meta;
type Story = StoryObj;

// Sample dropdown items
const basicItems: DropdownItem[] = [
  { id: '1', label: 'Dashboard', icon: '🏠' },
  { id: '2', label: 'Analytics', icon: '📊', badge: '5' },
  { id: '3', label: 'Settings', icon: '⚙️' },
  { id: 'divider1', label: '', divider: true },
  { id: '4', label: 'Help Center', icon: '❓' },
  { id: '5', label: 'Sign Out', icon: '🚪' },
];

const groupedItems: DropdownItem[] = [
  { id: 'create', label: 'New Document', icon: '📄', group: 'Create' },
  { id: 'folder', label: 'New Folder', icon: '📁', group: 'Create' },
  { id: 'template', label: 'From Template', icon: '📋', group: 'Create' },
  { id: 'copy', label: 'Copy', icon: '📋', group: 'Edit' },
  { id: 'paste', label: 'Paste', icon: '📌', group: 'Edit' },
  { id: 'delete', label: 'Delete', icon: '🗑️', group: 'Edit' },
  { id: 'share', label: 'Share', icon: '🔗', group: 'Share' },
  { id: 'export', label: 'Export', icon: '📤', group: 'Share' },
];

export const Default: Story = {
  args: {
    label: 'Options',
  },
  render: (args) => html`
    <forge-dropdown
      label="${args.label}"
      .items="${basicItems}"
      @forge-select="${(e: CustomEvent) => console.log('Selected:', e.detail)}"
    ></forge-dropdown>
  `,
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; gap: 20px; flex-wrap: wrap;">
      <forge-dropdown
        variant="default"
        label="Default"
        .items="${basicItems.slice(0, 3)}"
      ></forge-dropdown>
      
      <forge-dropdown
        variant="primary"
        label="Primary"
        .items="${basicItems.slice(0, 3)}"
      ></forge-dropdown>
      
      <forge-dropdown
        variant="secondary"
        label="Secondary"
        .items="${basicItems.slice(0, 3)}"
      ></forge-dropdown>
      
      <forge-dropdown
        variant="minimal"
        label="Minimal"
        .items="${basicItems.slice(0, 3)}"
      ></forge-dropdown>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 20px; align-items: center; flex-wrap: wrap;">
      <forge-dropdown
        size="small"
        label="Small"
        .items="${basicItems.slice(0, 3)}"
      ></forge-dropdown>
      
      <forge-dropdown
        size="medium"
        label="Medium"
        .items="${basicItems.slice(0, 3)}"
      ></forge-dropdown>
      
      <forge-dropdown
        size="large"
        label="Large"
        .items="${basicItems.slice(0, 3)}"
      ></forge-dropdown>
    </div>
  `,
};

export const WithIcons: Story = {
  render: () => html`
    <forge-dropdown
      label="Actions"
      .items="${[
        { id: 'edit', label: 'Edit Document', icon: '✏️' },
        { id: 'share', label: 'Share', icon: '🔗', badge: '3' },
        { id: 'download', label: 'Download', icon: '⬇️' },
        { id: 'print', label: 'Print', icon: '🖨️' },
        { id: 'divider', label: '', divider: true },
        { id: 'archive', label: 'Archive', icon: '📦' },
        { id: 'delete', label: 'Delete', icon: '🗑️' },
      ]}"
      @forge-select="${(e: CustomEvent) => console.log('Action selected:', e.detail)}"
    ></forge-dropdown>
  `,
};

export const GroupedItems: Story = {
  render: () => html`
    <forge-dropdown
      label="File Menu"
      .items="${groupedItems}"
      @forge-select="${(e: CustomEvent) => console.log('Menu item selected:', e.detail)}"
    ></forge-dropdown>
  `,
};

export const MultiSelect: Story = {
  render: () => html`
    <forge-dropdown
      label="Select Features"
      multi-select
      close-on-select="false"
      .items="${[
        { id: 'notifications', label: 'Email Notifications', type: 'checkbox' },
        { id: 'newsletter', label: 'Newsletter', type: 'checkbox' },
        { id: 'updates', label: 'Product Updates', type: 'checkbox' },
        { id: 'marketing', label: 'Marketing Emails', type: 'checkbox' },
        { id: 'security', label: 'Security Alerts', type: 'checkbox' },
      ]}"
      @forge-select="${(e: CustomEvent) => {
        console.log('Multi-selection changed:', e.detail);
        console.log('Currently selected:', e.detail.selected);
      }}"
    ></forge-dropdown>
  `,
};

export const RadioSelection: Story = {
  render: () => html`
    <forge-dropdown
      label="Choose Theme"
      .items="${[
        { id: 'light', label: 'Light Mode', type: 'radio', icon: '☀️' },
        { id: 'dark', label: 'Dark Mode', type: 'radio', icon: '🌙' },
        { id: 'auto', label: 'Auto (System)', type: 'radio', icon: '🔄' },
      ]}"
      @forge-select="${(e: CustomEvent) => console.log('Theme selected:', e.detail)}"
    ></forge-dropdown>
  `,
};

export const WithDisabledItems: Story = {
  render: () => html`
    <forge-dropdown
      label="User Actions"
      .items="${[
        { id: 'profile', label: 'View Profile', icon: '👤' },
        { id: 'settings', label: 'Account Settings', icon: '⚙️' },
        { id: 'billing', label: 'Billing', icon: '💳', disabled: true },
        { id: 'admin', label: 'Admin Panel', icon: '🔐', disabled: true },
        { id: 'divider', label: '', divider: true },
        { id: 'help', label: 'Help & Support', icon: '❓' },
        { id: 'logout', label: 'Sign Out', icon: '🚪' },
      ]}"
      @forge-select="${(e: CustomEvent) => console.log('User action:', e.detail)}"
    ></forge-dropdown>
  `,
};

export const NestedMenus: Story = {
  render: () => html`
    <forge-dropdown
      label="Navigation"
      .items="${[
        { id: 'home', label: 'Home', icon: '🏠' },
        { 
          id: 'products', 
          label: 'Products', 
          icon: '📦',
          items: [
            { id: 'web-apps', label: 'Web Applications' },
            { id: 'mobile-apps', label: 'Mobile Applications' },
            { id: 'desktop-apps', label: 'Desktop Applications' },
          ]
        },
        { 
          id: 'services', 
          label: 'Services', 
          icon: '🔧',
          items: [
            { id: 'consulting', label: 'Consulting' },
            { id: 'development', label: 'Development' },
            { id: 'support', label: 'Support' },
          ]
        },
        { id: 'about', label: 'About Us', icon: 'ℹ️' },
        { id: 'contact', label: 'Contact', icon: '📞' },
      ]}"
      @forge-select="${(e: CustomEvent) => console.log('Navigation:', e.detail)}"
    ></forge-dropdown>
  `,
};

export const Positions: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 100px; padding: 50px; min-height: 400px;">
      <forge-dropdown
        position="top-start"
        label="Top Start"
        .items="${basicItems.slice(0, 3)}"
      ></forge-dropdown>
      
      <forge-dropdown
        position="top-end"
        label="Top End"
        .items="${basicItems.slice(0, 3)}"
      ></forge-dropdown>
      
      <forge-dropdown
        position="right"
        label="Right"
        .items="${basicItems.slice(0, 3)}"
      ></forge-dropdown>
      
      <forge-dropdown
        position="bottom-start"
        label="Bottom Start"
        .items="${basicItems.slice(0, 3)}"
      ></forge-dropdown>
      
      <forge-dropdown
        position="auto"
        label="Auto Position"
        .items="${basicItems.slice(0, 3)}"
      ></forge-dropdown>
      
      <forge-dropdown
        position="left"
        label="Left"
        .items="${basicItems.slice(0, 3)}"
      ></forge-dropdown>
    </div>
  `,
};

export const DisabledState: Story = {
  render: () => html`
    <div style="display: flex; gap: 20px;">
      <forge-dropdown
        label="Enabled Dropdown"
        .items="${basicItems.slice(0, 3)}"
      ></forge-dropdown>
      
      <forge-dropdown
        label="Disabled Dropdown"
        disabled
        .items="${basicItems.slice(0, 3)}"
      ></forge-dropdown>
    </div>
  `,
};

export const InteractiveDemo: Story = {
  render: () => html`
    <div style="max-width: 600px;">
      <h3>Interactive Dropdown Demo</h3>
      <p>Try different interactions with the dropdowns below:</p>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 20px 0;">
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">🎯 Single Select</label>
          <forge-dropdown
            label="Choose Option"
            .items="${[
              { id: 'option1', label: 'Option 1', icon: '1️⃣' },
              { id: 'option2', label: 'Option 2', icon: '2️⃣' },
              { id: 'option3', label: 'Option 3', icon: '3️⃣' },
            ]}"
            @forge-select="${(e: CustomEvent) => {
              const target = e.target as any;
              const info = target.nextElementSibling;
              if (info) {
                info.textContent = \`Selected: \${e.detail.item.label}\`;
              }
            }}"
          ></forge-dropdown>
          <p style="margin-top: 4px; font-size: 12px; color: #666;">No selection</p>
        </div>
        
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">☑️ Multi Select</label>
          <forge-dropdown
            label="Select Multiple"
            multi-select
            close-on-select="false"
            .items="${[
              { id: 'feature1', label: 'Feature A', type: 'checkbox' },
              { id: 'feature2', label: 'Feature B', type: 'checkbox' },
              { id: 'feature3', label: 'Feature C', type: 'checkbox' },
            ]}"
            @forge-select="${(e: CustomEvent) => {
              const target = e.target as any;
              const info = target.nextElementSibling;
              if (info) {
                info.textContent = \`Selected: \${e.detail.selected.length} items\`;
              }
            }}"
          ></forge-dropdown>
          <p style="margin-top: 4px; font-size: 12px; color: #666;">0 selected</p>
        </div>
        
        <div>
          <label style="display: block; margin-bottom: 8px; font-weight: 600;">🔘 Radio Select</label>
          <forge-dropdown
            label="Pick One"
            .items="${[
              { id: 'size-s', label: 'Small', type: 'radio' },
              { id: 'size-m', label: 'Medium', type: 'radio' },
              { id: 'size-l', label: 'Large', type: 'radio' },
            ]}"
            @forge-select="${(e: CustomEvent) => {
              const target = e.target as any;
              const info = target.nextElementSibling;
              if (info) {
                info.textContent = \`Selected: \${e.detail.item.label}\`;
              }
            }}"
          ></forge-dropdown>
          <p style="margin-top: 4px; font-size: 12px; color: #666;">No selection</p>
        </div>
      </div>
      
      <div style="margin-top: 30px; padding: 15px; background: #f8f9fa; border-radius: 6px;">
        <h4 style="margin-top: 0;">Keyboard Navigation:</h4>
        <ul style="margin-bottom: 0; font-size: 14px;">
          <li><kbd>Enter</kbd> or <kbd>Space</kbd> - Open/select item</li>
          <li><kbd>Escape</kbd> - Close dropdown</li>
          <li><kbd>↑</kbd>/<kbd>↓</kbd> - Navigate items</li>
          <li><kbd>Home</kbd>/<kbd>End</kbd> - First/last item</li>
        </ul>
      </div>
    </div>
  `,
};

export const LongList: Story = {
  render: () => {
    const longList: DropdownItem[] = Array.from({ length: 50 }, (_, i) => ({
      id: `item-${i + 1}`,
      label: `Item ${i + 1}`,
      icon: i % 10 === 0 ? '⭐' : undefined,
      badge: i % 15 === 0 ? 'New' : undefined,
    }));

    return html`
      <forge-dropdown
        label="Long List (50 items)"
        .items="${longList}"
        @forge-select="${(e: CustomEvent) => console.log('Selected from long list:', e.detail)}"
      ></forge-dropdown>
    `;
  },
};

export const AIIntegration: Story = {
  render: () => html`
    <forge-dropdown
      label="AI-Ready Dropdown"
      semantic-role="menu"
      ai-context="user-actions"
      performance-mode="balanced"
      .items="${[
        { id: 'ai-assist', label: 'AI Assistant', icon: '🤖' },
        { id: 'generate', label: 'Generate Content', icon: '✨' },
        { id: 'analyze', label: 'Analyze Data', icon: '📊' },
        { id: 'optimize', label: 'Optimize Performance', icon: '⚡' },
      ]}"
      @forge-select="${(e: CustomEvent) => {
        console.log('AI-aware selection:', {
          item: e.detail.item,
          context: 'user-actions',
          userIntent: 'action-selection'
        });
      }}"
    ></forge-dropdown>
  `,
};