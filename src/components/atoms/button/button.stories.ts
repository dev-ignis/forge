import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './button';
import type { ForgeButton } from './button';

const meta: Meta<ForgeButton> = {
  title: 'Atoms/Button',
  component: 'forge-button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger', 'ghost', 'link'],
      description: 'Visual variant of the button',
      defaultValue: 'primary',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the button',
      defaultValue: 'md',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the button is disabled',
      defaultValue: false,
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Whether the button is in a loading state',
      defaultValue: false,
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Whether the button should take full width',
      defaultValue: false,
    },
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
      description: 'Button type attribute',
      defaultValue: 'button',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
The ForgeButton component is a versatile, accessible button component that follows the design system tokens.

## Features
- Multiple visual variants (primary, secondary, danger, ghost, link)
- Three size options (sm, md, lg)
- Loading and disabled states
- Full keyboard navigation support
- ARIA compliant
- Token-based theming

## Usage

\`\`\`html
<forge-button variant="primary" size="md">Click me</forge-button>
\`\`\`

## Theming

The button component uses CSS Custom Properties for theming:
- \`--forge-color-*\` for colors
- \`--forge-spacing-*\` for padding
- \`--forge-font-*\` for typography
- \`--forge-border-*\` for borders
- \`--forge-shadow-*\` for shadows
- \`--forge-transition-*\` for animations
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<ForgeButton>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
  },
  render: (args) => html`
    <forge-button
      variant="${args.variant}"
      size="${args.size}"
      ?disabled="${args.disabled}"
      ?loading="${args.loading}"
      ?full-width="${args.fullWidth}"
      type="${args.type}"
    >
      Primary Button
    </forge-button>
  `,
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'md',
  },
  render: (args) => html`
    <forge-button variant="${args.variant}" size="${args.size}">
      Secondary Button
    </forge-button>
  `,
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    size: 'md',
  },
  render: (args) => html`
    <forge-button variant="${args.variant}" size="${args.size}">
      Delete
    </forge-button>
  `,
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'md',
  },
  render: (args) => html`
    <forge-button variant="${args.variant}" size="${args.size}">
      Ghost Button
    </forge-button>
  `,
};

export const Link: Story = {
  args: {
    variant: 'link',
    size: 'md',
  },
  render: (args) => html`
    <forge-button variant="${args.variant}" size="${args.size}">
      Link Button
    </forge-button>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center;">
      <forge-button size="sm">Small</forge-button>
      <forge-button size="md">Medium</forge-button>
      <forge-button size="lg">Large</forge-button>
    </div>
  `,
};

export const Loading: Story = {
  args: {
    loading: true,
    variant: 'primary',
  },
  render: (args) => html`
    <forge-button variant="${args.variant}" ?loading="${args.loading}">
      Loading...
    </forge-button>
  `,
};

export const Disabled: Story = {
  args: {
    disabled: true,
    variant: 'primary',
  },
  render: (args) => html`
    <forge-button variant="${args.variant}" ?disabled="${args.disabled}">
      Disabled
    </forge-button>
  `,
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    variant: 'primary',
  },
  render: (args) => html`
    <div style="width: 400px;">
      <forge-button variant="${args.variant}" ?full-width="${args.fullWidth}">
        Full Width Button
      </forge-button>
    </div>
  `,
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div style="display: flex; gap: 16px;">
        <forge-button variant="primary">Primary</forge-button>
        <forge-button variant="secondary">Secondary</forge-button>
        <forge-button variant="danger">Danger</forge-button>
        <forge-button variant="ghost">Ghost</forge-button>
        <forge-button variant="link">Link</forge-button>
      </div>
      <div style="display: flex; gap: 16px;">
        <forge-button variant="primary" disabled>Primary Disabled</forge-button>
        <forge-button variant="secondary" disabled>Secondary Disabled</forge-button>
        <forge-button variant="danger" disabled>Danger Disabled</forge-button>
        <forge-button variant="ghost" disabled>Ghost Disabled</forge-button>
        <forge-button variant="link" disabled>Link Disabled</forge-button>
      </div>
      <div style="display: flex; gap: 16px;">
        <forge-button variant="primary" loading>Loading</forge-button>
        <forge-button variant="secondary" loading>Loading</forge-button>
        <forge-button variant="danger" loading>Loading</forge-button>
        <forge-button variant="ghost" loading>Loading</forge-button>
        <forge-button variant="link" loading>Loading</forge-button>
      </div>
    </div>
  `,
};