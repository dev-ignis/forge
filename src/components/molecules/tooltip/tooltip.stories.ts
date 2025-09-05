import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './tooltip.ts';

const meta: Meta = {
  title: 'Molecules/Tooltip',
  component: 'forge-tooltip',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A smart positioning tooltip component with multiple triggers and auto-repositioning.',
      },
    },
  },
  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right', 'auto'],
      description: 'Tooltip position relative to trigger',
    },
    trigger: {
      control: { type: 'select' },
      options: ['hover', 'click', 'focus', 'manual'],
      description: 'How the tooltip is triggered',
    },
    content: {
      control: 'text',
      description: 'Tooltip text content',
    },
    delay: {
      control: { type: 'number', min: 0, max: 2000 },
      description: 'Delay before showing tooltip (ms)',
    },
    arrow: {
      control: 'boolean',
      description: 'Show tooltip arrow pointer',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    content: 'This is a helpful tooltip',
    position: 'top',
  },
  render: (args) => html`
    <forge-tooltip 
      content="${args.content}" 
      position="${args.position}"
    >
      <forge-button>Hover me</forge-button>
    </forge-tooltip>
  `,
};

export const Positions: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; padding: 40px;">
      <forge-tooltip content="Tooltip on top" position="top">
        <forge-button>Top</forge-button>
      </forge-tooltip>
      
      <forge-tooltip content="Tooltip on bottom" position="bottom">
        <forge-button>Bottom</forge-button>
      </forge-tooltip>
      
      <forge-tooltip content="Tooltip on left" position="left">
        <forge-button>Left</forge-button>
      </forge-tooltip>
      
      <forge-tooltip content="Tooltip on right" position="right">
        <forge-button>Right</forge-button>
      </forge-tooltip>
    </div>
  `,
};

export const ClickTrigger: Story = {
  render: () => html`
    <forge-tooltip 
      content="Click triggered tooltip - click again to hide" 
      trigger="click"
      position="top"
    >
      <forge-button>Click me</forge-button>
    </forge-tooltip>
  `,
};

export const WithDelay: Story = {
  render: () => html`
    <div style="display: flex; gap: 20px;">
      <forge-tooltip content="No delay tooltip" delay="0">
        <forge-button>No delay</forge-button>
      </forge-tooltip>
      
      <forge-tooltip content="500ms delay tooltip" delay="500">
        <forge-button>500ms delay</forge-button>
      </forge-tooltip>
      
      <forge-tooltip content="1000ms delay tooltip" delay="1000">
        <forge-button>1s delay</forge-button>
      </forge-tooltip>
    </div>
  `,
};

export const WithArrow: Story = {
  render: () => html`
    <div style="display: flex; gap: 20px;">
      <forge-tooltip content="Tooltip without arrow" arrow="false">
        <forge-button>No arrow</forge-button>
      </forge-tooltip>
      
      <forge-tooltip content="Tooltip with arrow" arrow="true">
        <forge-button>With arrow</forge-button>
      </forge-tooltip>
    </div>
  `,
};

export const HTMLContent: Story = {
  render: () => html`
    <forge-tooltip position="top">
      <div slot="content">
        <strong>Rich HTML Content</strong>
        <p style="margin: 8px 0; color: #666;">
          Tooltips can contain <em>formatted text</em>, 
          <a href="#" style="color: #007acc;">links</a>, and other HTML elements.
        </p>
        <div style="text-align: center;">
          <small>✨ Pretty cool, right?</small>
        </div>
      </div>
      <forge-button>Rich content tooltip</forge-button>
    </forge-tooltip>
  `,
};

export const AutoPosition: Story = {
  render: () => html`
    <div style="height: 300px; display: flex; align-items: center; justify-content: center;">
      <forge-tooltip 
        content="Smart positioning! I'll automatically position myself to stay visible." 
        position="auto"
      >
        <forge-button>Auto-positioning tooltip</forge-button>
      </forge-tooltip>
    </div>
  `,
};

export const OnDifferentElements: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px; align-items: center;">
      <forge-tooltip content="Tooltip on button">
        <forge-button variant="primary">Button with tooltip</forge-button>
      </forge-tooltip>
      
      <forge-tooltip content="Tooltip on badge">
        <forge-badge variant="warning">Badge with tooltip</forge-badge>
      </forge-tooltip>
      
      <forge-tooltip content="Tooltip on text">
        <span style="text-decoration: underline; cursor: help;">
          Underlined text with tooltip
        </span>
      </forge-tooltip>
      
      <forge-tooltip content="Tooltip on icon">
        <forge-icon name="help" style="cursor: help;"></forge-icon>
      </forge-tooltip>
    </div>
  `,
};

export const LongContent: Story = {
  render: () => html`
    <forge-tooltip position="top">
      <div slot="content" style="max-width: 300px;">
        <h4 style="margin-top: 0;">Detailed Explanation</h4>
        <p>This tooltip contains a lot of content to demonstrate how tooltips handle longer text. 
        The tooltip will automatically size itself appropriately and may wrap content to fit 
        within reasonable dimensions.</p>
        <ul style="margin: 8px 0; padding-left: 20px;">
          <li>Automatic sizing</li>
          <li>Content wrapping</li>
          <li>Smart positioning</li>
        </ul>
        <p style="margin-bottom: 0;"><small>Perfect for detailed help text!</small></p>
      </div>
      <forge-button>Long content tooltip</forge-button>
    </forge-tooltip>
  `,
};

export const InteractiveDemo: Story = {
  render: () => html`
    <div style="padding: 50px; text-align: center;">
      <h3>Interactive Tooltip Demo</h3>
      <p>Try hovering over different elements:</p>
      
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 30px;">
        <forge-tooltip content="🎯 Primary action button">
          <forge-button variant="primary">Primary</forge-button>
        </forge-tooltip>
        
        <forge-tooltip content="⚠️ Warning: This action requires confirmation" position="bottom">
          <forge-button variant="warning">Warning</forge-button>
        </forge-tooltip>
        
        <forge-tooltip content="💔 Destructive action - use with caution" position="left">
          <forge-button variant="danger">Danger</forge-button>
        </forge-tooltip>
        
        <forge-tooltip content="✅ Task completed successfully" trigger="click">
          <forge-badge variant="success">Success</forge-badge>
        </forge-tooltip>
        
        <forge-tooltip content="📊 View detailed analytics" delay="300">
          <forge-badge variant="info">Info</forge-badge>
        </forge-tooltip>
        
        <forge-tooltip content="🔧 Click to access settings" trigger="click" position="right">
          <forge-icon name="settings"></forge-icon>
        </forge-tooltip>
      </div>
    </div>
  `,
};