import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './badge';
import type { ForgeBadge } from './badge';
import '../button/button';
import '../icon/icon';

const meta: Meta<ForgeBadge> = {
  title: 'Atoms/Badge',
  component: 'forge-badge',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'success', 'warning', 'error', 'info'],
      description: 'Badge color variant',
      defaultValue: 'default',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Badge size',
      defaultValue: 'md',
    },
    position: {
      control: { type: 'select' },
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left', 'inline'],
      description: 'Badge position relative to content',
      defaultValue: 'inline',
    },
    count: {
      control: { type: 'number' },
      description: 'Numeric count to display',
      defaultValue: 0,
    },
    maxCount: {
      control: { type: 'number' },
      description: 'Maximum count before showing +',
      defaultValue: 99,
    },
    content: {
      control: { type: 'text' },
      description: 'Text content to display',
    },
    dot: {
      control: { type: 'boolean' },
      description: 'Show as dot only',
      defaultValue: false,
    },
    outlined: {
      control: { type: 'boolean' },
      description: 'Outlined style',
      defaultValue: false,
    },
    pulse: {
      control: { type: 'boolean' },
      description: 'Pulse animation',
      defaultValue: false,
    },
    invisible: {
      control: { type: 'boolean' },
      description: 'Hide badge',
      defaultValue: false,
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
The ForgeBadge component displays status indicators, counts, or labels that can be positioned relative to other content.

## Features
- Six color variants (default, primary, success, warning, error, info)
- Three sizes (sm, md, lg)
- Multiple positioning options
- Count display with max limit
- Dot mode for simple status
- Outlined style option
- Pulse animation
- Visibility control
- **AI-Ready**: Semantic roles and context for AI assistants
- **Performance Monitoring**: Self-monitoring with auto-degradation
- **Developer Mode**: Built-in metrics and debugging
- **Accessibility**: ARIA attributes for status announcements

## Usage

### Basic Usage
\`\`\`html
<forge-badge content="NEW"></forge-badge>
<forge-badge count="5"></forge-badge>
<forge-badge dot variant="success"></forge-badge>
\`\`\`

### With Positioned Content
\`\`\`html
<forge-badge position="top-right" count="3">
  <forge-icon name="bell" size="lg"></forge-icon>
</forge-badge>
\`\`\`

### Count with Max Limit
\`\`\`html
<forge-badge count="150" max-count="99"></forge-badge>
<!-- Displays: 99+ -->
\`\`\`

### AI-Ready Badge
\`\`\`html
<forge-badge 
  count="5"
  variant="error"
  semantic-role="unread-notifications"
  ai-context="header-nav">
</forge-badge>
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<ForgeBadge>;

export const Default: Story = {
  render: (args) => html`
    <forge-badge
      variant="${args.variant}"
      size="${args.size}"
      position="${args.position}"
      count="${args.count}"
      max-count="${args.maxCount}"
      content="${args.content || ''}"
      ?dot="${args.dot}"
      ?outlined="${args.outlined}"
      ?pulse="${args.pulse}"
      ?invisible="${args.invisible}"
    >
      ${args.position !== 'inline' ? html`
        <div style="width: 40px; height: 40px; background: #f3f4f6; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
          <forge-icon name="bell"></forge-icon>
        </div>
      ` : ''}
    </forge-badge>
  `,
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center;">
      <forge-badge variant="default" content="Default"></forge-badge>
      <forge-badge variant="primary" content="Primary"></forge-badge>
      <forge-badge variant="success" content="Success"></forge-badge>
      <forge-badge variant="warning" content="Warning"></forge-badge>
      <forge-badge variant="error" content="Error"></forge-badge>
      <forge-badge variant="info" content="Info"></forge-badge>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center;">
      <forge-badge size="sm" content="Small" variant="primary"></forge-badge>
      <forge-badge size="md" content="Medium" variant="primary"></forge-badge>
      <forge-badge size="lg" content="Large" variant="primary"></forge-badge>
    </div>
  `,
};

export const CountDisplay: Story = {
  render: () => html`
    <div style="display: flex; gap: 20px; align-items: center;">
      <forge-badge count="5" variant="primary"></forge-badge>
      <forge-badge count="25" variant="success"></forge-badge>
      <forge-badge count="99" variant="warning"></forge-badge>
      <forge-badge count="150" max-count="99" variant="error"></forge-badge>
      <forge-badge count="1000" max-count="999" variant="info"></forge-badge>
    </div>
  `,
};

export const DotMode: Story = {
  render: () => html`
    <div style="display: flex; gap: 20px; align-items: center;">
      <div style="display: flex; align-items: center; gap: 8px;">
        <span>Offline</span>
        <forge-badge dot variant="default" size="sm"></forge-badge>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <span>Online</span>
        <forge-badge dot variant="success" size="sm"></forge-badge>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <span>Away</span>
        <forge-badge dot variant="warning" size="sm"></forge-badge>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <span>Busy</span>
        <forge-badge dot variant="error" size="sm"></forge-badge>
      </div>
    </div>
  `,
};

export const Positioned: Story = {
  render: () => html`
    <div style="display: flex; gap: 40px;">
      <forge-badge position="top-right" count="3" variant="error">
        <forge-button variant="ghost" size="lg">
          <forge-icon name="bell" size="lg"></forge-icon>
        </forge-button>
      </forge-badge>
      
      <forge-badge position="top-left" dot variant="success">
        <forge-button variant="ghost" size="lg">
          <forge-icon name="user" size="lg"></forge-icon>
        </forge-button>
      </forge-badge>
      
      <forge-badge position="bottom-right" content="NEW" variant="primary" size="sm">
        <forge-button variant="ghost" size="lg">
          <forge-icon name="star" size="lg"></forge-icon>
        </forge-button>
      </forge-badge>
      
      <forge-badge position="bottom-left" count="99+" variant="warning">
        <forge-button variant="ghost" size="lg">
          <forge-icon name="heart" size="lg"></forge-icon>
        </forge-button>
      </forge-badge>
    </div>
  `,
};

export const Outlined: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center;">
      <forge-badge outlined variant="default" content="Default"></forge-badge>
      <forge-badge outlined variant="primary" content="Primary"></forge-badge>
      <forge-badge outlined variant="success" content="Success"></forge-badge>
      <forge-badge outlined variant="warning" content="Warning"></forge-badge>
      <forge-badge outlined variant="error" content="Error"></forge-badge>
      <forge-badge outlined variant="info" content="Info"></forge-badge>
    </div>
  `,
};

export const WithPulse: Story = {
  render: () => html`
    <div style="display: flex; gap: 40px; align-items: center;">
      <forge-badge pulse dot variant="success" size="lg"></forge-badge>
      <forge-badge pulse count="1" variant="error"></forge-badge>
      <forge-badge pulse content="LIVE" variant="primary"></forge-badge>
    </div>
  `,
};

export const NavigationExample: Story = {
  name: 'Navigation Bar Example',
  render: () => html`
    <nav style="display: flex; gap: 32px; padding: 16px; background: #f9fafb; border-radius: 8px;">
      <forge-badge position="top-right" count="0">
        <forge-button variant="ghost">
          <forge-icon name="home"></forge-icon>
        </forge-button>
      </forge-badge>
      
      <forge-badge position="top-right" count="3" variant="primary">
        <forge-button variant="ghost">
          <forge-icon name="bell"></forge-icon>
        </forge-button>
      </forge-badge>
      
      <forge-badge position="top-right" count="12" variant="error">
        <forge-button variant="ghost">
          <forge-icon name="alert-circle"></forge-icon>
        </forge-button>
      </forge-badge>
      
      <forge-badge position="top-right" dot variant="success">
        <forge-button variant="ghost">
          <forge-icon name="user"></forge-icon>
        </forge-button>
      </forge-badge>
    </nav>
  `,
};

export const StatusLabels: Story = {
  name: 'Status Labels',
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div style="display: flex; gap: 12px; align-items: center;">
        <span>Development</span>
        <forge-badge content="v2.0.0-beta" variant="info"></forge-badge>
      </div>
      
      <div style="display: flex; gap: 12px; align-items: center;">
        <span>Production</span>
        <forge-badge content="STABLE" variant="success"></forge-badge>
      </div>
      
      <div style="display: flex; gap: 12px; align-items: center;">
        <span>Legacy System</span>
        <forge-badge content="DEPRECATED" variant="warning"></forge-badge>
      </div>
      
      <div style="display: flex; gap: 12px; align-items: center;">
        <span>Test Environment</span>
        <forge-badge content="OFFLINE" variant="error"></forge-badge>
      </div>
    </div>
  `,
};

export const AIReadyBadge: Story = {
  name: 'AI-Ready Badge',
  render: () => html`
    <forge-badge 
      position="top-right"
      count="5"
      variant="error"
      semantic-role="unread-notifications"
      ai-context="inbox-navigation"
      aria-description="5 unread notification messages">
      <forge-button variant="ghost" size="lg">
        <forge-icon name="bell" size="lg"></forge-icon>
      </forge-button>
    </forge-badge>
    <div style="margin-top: 60px; padding: 16px; background: #f3f4f6; border-radius: 8px; font-size: 14px;">
      <strong>AI Metadata:</strong><br>
      Semantic Role: unread-notifications<br>
      AI Context: inbox-navigation<br>
      ARIA Description: 5 unread notification messages
    </div>
  `,
};

export const PerformanceMonitoring: Story = {
  name: 'Performance Monitoring',
  render: () => html`
    <forge-badge 
      count="42"
      variant="primary"
      pulse
      max-render-ms="8"
      warn-on-violation
      performance-mode="auto"
      dev-mode
      show-metrics>
    </forge-badge>
    <div style="margin-top: 20px; padding: 16px; background: #fef3c7; border-radius: 8px; font-size: 14px;">
      <strong>Performance Settings:</strong><br>
      Max Render: 8ms<br>
      Warnings: Enabled<br>
      Mode: Auto-degradation (pulse disabled if slow)<br>
      <em>Check console for performance logs</em>
    </div>
  `,
};

export const InteractiveCounter: Story = {
  name: 'Interactive Counter',
  render: () => {
    const handleIncrement = (e: Event) => {
      const badge = (e.target as HTMLElement)?.parentElement?.querySelector('forge-badge') as ForgeBadge;
      badge?.increment();
    };
    
    const handleDecrement = (e: Event) => {
      const badge = (e.target as HTMLElement)?.parentElement?.querySelector('forge-badge') as ForgeBadge;
      badge?.decrement();
    };
    
    const handleReset = (e: Event) => {
      const badge = (e.target as HTMLElement)?.parentElement?.querySelector('forge-badge') as ForgeBadge;
      badge?.reset();
    };
    
    const handleToggle = (e: Event) => {
      const badge = (e.target as HTMLElement)?.parentElement?.querySelector('forge-badge') as ForgeBadge;
      if (badge?.invisible) {
        badge.show();
      } else {
        badge?.hide();
      }
    };
    
    return html`
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div style="display: flex; align-items: center; gap: 16px;">
          <forge-badge position="top-right" count="0" variant="primary">
            <forge-button variant="ghost" size="lg">
              <forge-icon name="bell" size="lg"></forge-icon>
            </forge-button>
          </forge-badge>
          
          <div style="display: flex; gap: 8px;">
            <forge-button size="sm" @click="${handleIncrement}">+1</forge-button>
            <forge-button size="sm" @click="${handleDecrement}">-1</forge-button>
            <forge-button size="sm" variant="secondary" @click="${handleReset}">Reset</forge-button>
            <forge-button size="sm" variant="ghost" @click="${handleToggle}">Toggle</forge-button>
          </div>
        </div>
        
        <div style="font-size: 14px; color: #6b7280;">
          Use the buttons to control the badge count and visibility
        </div>
      </div>
    `;
  },
};

export const TabsWithBadges: Story = {
  name: 'Tabs with Badges',
  render: () => html`
    <div style="display: flex; border-bottom: 2px solid #e5e7eb;">
      <button style="padding: 12px 20px; background: none; border: none; cursor: pointer; display: flex; align-items: center; gap: 8px; border-bottom: 2px solid #3b82f6; margin-bottom: -2px;">
        Messages
        <forge-badge count="3" variant="primary" size="sm"></forge-badge>
      </button>
      <button style="padding: 12px 20px; background: none; border: none; cursor: pointer; display: flex; align-items: center; gap: 8px;">
        Notifications
        <forge-badge count="12" variant="error" size="sm"></forge-badge>
      </button>
      <button style="padding: 12px 20px; background: none; border: none; cursor: pointer; display: flex; align-items: center; gap: 8px;">
        Updates
        <forge-badge content="NEW" variant="success" size="sm"></forge-badge>
      </button>
      <button style="padding: 12px 20px; background: none; border: none; cursor: pointer; display: flex; align-items: center; gap: 8px;">
        Settings
      </button>
    </div>
  `,
};