import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './icon';
import { ForgeIcon } from './icon';
import '../button/button';

const meta: Meta<ForgeIcon> = {
  title: 'Atoms/Icon',
  component: 'forge-icon',
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: { type: 'select' },
      options: [
        'chevron-down', 'chevron-up', 'chevron-left', 'chevron-right',
        'check', 'close', 'menu', 'search', 'user', 'home',
        'settings', 'alert-circle', 'info', 'warning', 'star',
        'heart', 'trash', 'edit', 'copy', 'download', 'upload',
        'plus', 'minus', 'arrow-left', 'arrow-right', 'arrow-up', 'arrow-down'
      ],
      description: 'Icon name from registry',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Icon size',
      defaultValue: 'md',
    },
    spin: {
      control: { type: 'boolean' },
      description: 'Apply spin animation',
      defaultValue: false,
    },
    pulse: {
      control: { type: 'boolean' },
      description: 'Apply pulse animation',
      defaultValue: false,
    },
    label: {
      control: { type: 'text' },
      description: 'Accessibility label',
    },
    src: {
      control: { type: 'text' },
      description: 'External SVG URL',
    },
    semanticRole: {
      control: { type: 'text' },
      description: 'Semantic role for AI understanding',
    },
    aiContext: {
      control: { type: 'text' },
      description: 'Context for AI assistants',
    },
    maxRenderMs: {
      control: { type: 'number' },
      description: 'Maximum render time in milliseconds',
      defaultValue: 16,
    },
    warnOnViolation: {
      control: { type: 'boolean' },
      description: 'Warn on performance violations',
      defaultValue: false,
    },
    performanceMode: {
      control: { type: 'select' },
      options: ['auto', 'fast', 'normal'],
      description: 'Performance mode setting',
      defaultValue: 'auto',
    },
    devMode: {
      control: { type: 'boolean' },
      description: 'Enable development mode',
      defaultValue: false,
    },
    showMetrics: {
      control: { type: 'boolean' },
      description: 'Show performance metrics',
      defaultValue: false,
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
The ForgeIcon component is a flexible, performant icon system with built-in icon registry, lazy loading, and AI-ready metadata.

## Features
- SVG-based with optimal rendering
- Built-in icon registry with 25+ common icons
- Lazy loading for external icons
- Five size variants (xs, sm, md, lg, xl)
- Spin and pulse animations
- Color inheritance from parent
- **AI-Ready**: Semantic roles and context for AI assistants
- **Performance Monitoring**: Self-monitoring with auto-degradation
- **Developer Mode**: Built-in metrics and debugging

## Usage

### Basic Usage
\`\`\`html
<forge-icon name="home"></forge-icon>
<forge-icon name="user" size="lg"></forge-icon>
<forge-icon name="settings" spin></forge-icon>
\`\`\`

### With Custom SVG
\`\`\`html
<forge-icon src="/assets/custom-icon.svg"></forge-icon>
\`\`\`

### AI-Ready Icon
\`\`\`html
<forge-icon 
  name="menu"
  semantic-role="navigation-toggle"
  ai-context="main-header"
  label="Open navigation menu">
</forge-icon>
\`\`\`

### Register Custom Icons
\`\`\`javascript
import { ForgeIcon } from '@nexcraft/forge';

// Register single icon
ForgeIcon.registerIcon('custom', '<path d="..."/>');

// Register multiple icons
ForgeIcon.registerIcons({
  icon1: '<path d="..."/>',
  icon2: { svg: '<path d="..."/>', viewBox: '0 0 100 100' }
});

// Load icon set from URL
await ForgeIcon.loadIconSet('/assets/icons.json');
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<ForgeIcon>;

export const Default: Story = {
  render: (args) => html`
    <forge-icon
      name="${args.name || 'home'}"
      size="${args.size}"
      ?spin="${args.spin}"
      ?pulse="${args.pulse}"
      label="${args.label || ''}"
      src="${args.src || ''}"
    ></forge-icon>
  `,
};

export const AllSizes: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 16px;">
      <forge-icon name="star" size="xs"></forge-icon>
      <forge-icon name="star" size="sm"></forge-icon>
      <forge-icon name="star" size="md"></forge-icon>
      <forge-icon name="star" size="lg"></forge-icon>
      <forge-icon name="star" size="xl"></forge-icon>
    </div>
  `,
};

export const CommonIcons: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 16px; padding: 20px;">
      ${['chevron-down', 'chevron-up', 'chevron-left', 'chevron-right',
        'check', 'close', 'menu', 'search', 'user', 'home',
        'settings', 'alert-circle', 'info', 'warning', 'star',
        'heart', 'trash', 'edit', 'copy', 'download', 'upload',
        'plus', 'minus', 'arrow-left', 'arrow-right', 'arrow-up', 'arrow-down'].map(name => html`
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <forge-icon name="${name}" size="lg"></forge-icon>
          <span style="font-size: 12px; color: #666;">${name}</span>
        </div>
      `)}
    </div>
  `,
};

export const Animations: Story = {
  render: () => html`
    <div style="display: flex; gap: 32px; align-items: center;">
      <div style="text-align: center;">
        <forge-icon name="settings" size="lg" spin></forge-icon>
        <div style="margin-top: 8px; font-size: 14px;">Spin</div>
      </div>
      <div style="text-align: center;">
        <forge-icon name="heart" size="lg" pulse></forge-icon>
        <div style="margin-top: 8px; font-size: 14px;">Pulse</div>
      </div>
    </div>
  `,
};

export const Colors: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px;">
      <forge-icon name="star" size="lg" style="color: #3b82f6;"></forge-icon>
      <forge-icon name="star" size="lg" style="color: #ef4444;"></forge-icon>
      <forge-icon name="star" size="lg" style="color: #10b981;"></forge-icon>
      <forge-icon name="star" size="lg" style="color: #f59e0b;"></forge-icon>
      <forge-icon name="star" size="lg" style="color: #8b5cf6;"></forge-icon>
    </div>
  `,
};

export const WithLabels: Story = {
  render: () => html`
    <div style="display: flex; gap: 24px;">
      <forge-icon name="home" label="Home page"></forge-icon>
      <forge-icon name="user" label="User profile"></forge-icon>
      <forge-icon name="settings" label="Settings menu"></forge-icon>
    </div>
  `,
};

export const InButtons: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
      <forge-button variant="primary">
        <forge-icon name="download" size="sm" style="margin-right: 8px;"></forge-icon>
        Download
      </forge-button>
      
      <forge-button variant="secondary">
        <forge-icon name="upload" size="sm" style="margin-right: 8px;"></forge-icon>
        Upload
      </forge-button>
      
      <forge-button variant="danger">
        <forge-icon name="trash" size="sm" style="margin-right: 8px;"></forge-icon>
        Delete
      </forge-button>
      
      <forge-button variant="ghost" size="sm">
        <forge-icon name="menu"></forge-icon>
      </forge-button>
    </div>
  `,
};

export const LoadingStates: Story = {
  render: () => html`
    <div style="display: flex; gap: 24px; align-items: center;">
      <div style="text-align: center;">
        <forge-icon src="/loading-test.svg"></forge-icon>
        <div style="margin-top: 8px; font-size: 14px;">Loading</div>
      </div>
      <div style="text-align: center;">
        <forge-icon name="non-existent"></forge-icon>
        <div style="margin-top: 8px; font-size: 14px;">Error</div>
      </div>
    </div>
  `,
};

export const AIReadyIcon: Story = {
  name: 'AI-Ready Icon',
  render: () => html`
    <forge-icon 
      name="menu"
      size="lg"
      semantic-role="navigation-toggle"
      ai-context="main-header"
      aria-description="Toggle button for main navigation menu"
      label="Open navigation">
    </forge-icon>
    <div style="margin-top: 20px; padding: 16px; background: #f3f4f6; border-radius: 8px; font-size: 14px;">
      <strong>AI Metadata:</strong><br>
      Semantic Role: navigation-toggle<br>
      AI Context: main-header<br>
      ARIA Description: Toggle button for main navigation menu<br>
      Label: Open navigation
    </div>
  `,
};

export const PerformanceMonitoring: Story = {
  name: 'Performance Monitoring',
  render: () => html`
    <forge-icon 
      name="settings"
      size="lg"
      spin
      max-render-ms="8"
      warn-on-violation
      performance-mode="auto"
      dev-mode
      show-metrics>
    </forge-icon>
    <div style="margin-top: 20px; padding: 16px; background: #fef3c7; border-radius: 8px; font-size: 14px;">
      <strong>Performance Settings:</strong><br>
      Max Render: 8ms<br>
      Warnings: Enabled<br>
      Mode: Auto-degradation (animations disabled if slow)<br>
      <em>Check console for performance logs</em>
    </div>
  `,
};

export const IconGrid: Story = {
  name: 'Icon Grid Example',
  render: () => html`
    <div style="background: #f9fafb; padding: 24px; border-radius: 8px;">
      <h3 style="margin-top: 0; margin-bottom: 16px; font-size: 16px; font-weight: 600;">Navigation Icons</h3>
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px;">
        <button style="display: flex; flex-direction: column; align-items: center; padding: 16px; background: white; border: 1px solid #e5e7eb; border-radius: 8px; cursor: pointer;">
          <forge-icon name="home" size="lg" semantic-role="nav-home"></forge-icon>
          <span style="margin-top: 8px; font-size: 12px;">Home</span>
        </button>
        <button style="display: flex; flex-direction: column; align-items: center; padding: 16px; background: white; border: 1px solid #e5e7eb; border-radius: 8px; cursor: pointer;">
          <forge-icon name="search" size="lg" semantic-role="nav-search"></forge-icon>
          <span style="margin-top: 8px; font-size: 12px;">Search</span>
        </button>
        <button style="display: flex; flex-direction: column; align-items: center; padding: 16px; background: white; border: 1px solid #e5e7eb; border-radius: 8px; cursor: pointer;">
          <forge-icon name="user" size="lg" semantic-role="nav-profile"></forge-icon>
          <span style="margin-top: 8px; font-size: 12px;">Profile</span>
        </button>
        <button style="display: flex; flex-direction: column; align-items: center; padding: 16px; background: white; border: 1px solid #e5e7eb; border-radius: 8px; cursor: pointer;">
          <forge-icon name="settings" size="lg" semantic-role="nav-settings"></forge-icon>
          <span style="margin-top: 8px; font-size: 12px;">Settings</span>
        </button>
      </div>
      
      <h3 style="margin-bottom: 16px; font-size: 16px; font-weight: 600;">Action Icons</h3>
      <div style="display: flex; gap: 8px;">
        <button style="display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">
          <forge-icon name="plus" size="sm"></forge-icon>
          Add New
        </button>
        <button style="display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; background: white; border: 1px solid #e5e7eb; border-radius: 6px; cursor: pointer;">
          <forge-icon name="edit" size="sm"></forge-icon>
          Edit
        </button>
        <button style="display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; background: white; border: 1px solid #ef4444; color: #ef4444; border-radius: 6px; cursor: pointer;">
          <forge-icon name="trash" size="sm"></forge-icon>
          Delete
        </button>
      </div>
    </div>
  `,
};

export const CustomIconRegistration: Story = {
  name: 'Custom Icon Registration',
  render: () => {
    // Register a custom icon for this story
    ForgeIcon.registerIcon('custom-logo', `
      <g>
        <rect x="2" y="2" width="20" height="20" rx="4" fill="none" stroke="currentColor" stroke-width="2"/>
        <circle cx="12" cy="12" r="4" fill="currentColor"/>
      </g>
    `);
    
    return html`
      <div style="display: flex; gap: 24px; align-items: center;">
        <forge-icon name="custom-logo" size="xl"></forge-icon>
        <div>
          <div style="font-weight: 600;">Custom Registered Icon</div>
          <div style="font-size: 14px; color: #666; margin-top: 4px;">
            Registered using ForgeIcon.registerIcon()
          </div>
        </div>
      </div>
    `;
  },
};