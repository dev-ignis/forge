import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './accordion.ts';

const meta: Meta = {
  title: 'Organisms/Accordion',
  component: 'forge-accordion',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A collapsible content container component with multiple panels that can expand and collapse.',
      },
    },
  },
  argTypes: {
    allowMultiple: {
      control: 'boolean',
      description: 'Allow multiple panels to be open simultaneously',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'bordered', 'filled'],
      description: 'Visual style variant',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size of the accordion',
    },
  },
};

export default meta;
type Story = StoryObj;

// Sample accordion data
const samplePanels = [
  {
    title: 'Getting Started',
    content: 'Learn the basics of using Forge components in your application. This includes installation, setup, and basic usage patterns.',
  },
  {
    title: 'Advanced Features', 
    content: 'Discover advanced features like AI integration, performance monitoring, and custom theming. These features set Forge apart from other component libraries.',
  },
  {
    title: 'API Reference',
    content: 'Complete API documentation for all component properties, methods, and events. Includes TypeScript definitions and usage examples.',
  },
  {
    title: 'Troubleshooting',
    content: 'Common issues and their solutions. If you encounter problems, check this section first for quick fixes and debugging tips.',
  },
];

export const Default: Story = {
  render: () => html`
    <forge-accordion>
      ${samplePanels.map((panel, index) => html`
        <forge-accordion-panel 
          title="${panel.title}"
          ?expanded="${index === 0}"
        >
          <p>${panel.content}</p>
        </forge-accordion-panel>
      `)}
    </forge-accordion>
  `,
};

export const AllowMultiple: Story = {
  args: {
    allowMultiple: true,
  },
  render: (args) => html`
    <forge-accordion ?allow-multiple="${args.allowMultiple}">
      ${samplePanels.map((panel, index) => html`
        <forge-accordion-panel 
          title="${panel.title}"
          ?expanded="${index < 2}"
        >
          <p>${panel.content}</p>
        </forge-accordion-panel>
      `)}
    </forge-accordion>
  `,
};

export const Bordered: Story = {
  args: {
    variant: 'bordered',
  },
  render: (args) => html`
    <forge-accordion variant="${args.variant}">
      ${samplePanels.map((panel, index) => html`
        <forge-accordion-panel 
          title="${panel.title}"
          ?expanded="${index === 1}"
        >
          <p>${panel.content}</p>
          <p>This variant adds borders around each panel for better visual separation.</p>
        </forge-accordion-panel>
      `)}
    </forge-accordion>
  `,
};

export const WithIcons: Story = {
  render: () => html`
    <forge-accordion>
      <forge-accordion-panel title="📚 Documentation" expanded>
        <p>Comprehensive documentation with examples and best practices.</p>
        <ul>
          <li>Getting Started Guide</li>
          <li>Component API Reference</li>
          <li>Integration Examples</li>
        </ul>
      </forge-accordion-panel>
      <forge-accordion-panel title="🎨 Theming">
        <p>Customize the appearance to match your brand.</p>
        <ul>
          <li>CSS Custom Properties</li>
          <li>Design Token Bridge</li>
          <li>Dark Mode Support</li>
        </ul>
      </forge-accordion-panel>
      <forge-accordion-panel title="⚡ Performance">
        <p>Built-in performance monitoring and optimization.</p>
        <ul>
          <li>Real-time Metrics</li>
          <li>Automatic Degradation</li>
          <li>Performance Budget</li>
        </ul>
      </forge-accordion-panel>
    </forge-accordion>
  `,
};

export const LargeSize: Story = {
  args: {
    size: 'large',
  },
  render: (args) => html`
    <forge-accordion size="${args.size}">
      <forge-accordion-panel title="Large Accordion Panel" expanded>
        <h3>Enhanced Content Area</h3>
        <p>Large size provides more spacious content areas, perfect for detailed information or complex layouts.</p>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 16px 0;">
          <div>
            <h4>Left Column</h4>
            <p>Content can be organized in multiple columns when using the large size variant.</p>
          </div>
          <div>
            <h4>Right Column</h4>
            <p>This provides better use of available space for complex content.</p>
          </div>
        </div>
      </forge-accordion-panel>
      <forge-accordion-panel title="Another Large Panel">
        <p>This panel demonstrates how the large size affects spacing and typography throughout the component.</p>
      </forge-accordion-panel>
    </forge-accordion>
  `,
};

export const Interactive: Story = {
  render: () => html`
    <forge-accordion 
      @panel-expand="${(e: CustomEvent) => console.log('Panel expanded:', e.detail)}"
      @panel-collapse="${(e: CustomEvent) => console.log('Panel collapsed:', e.detail)}"
    >
      <forge-accordion-panel title="🎮 Interactive Panel" expanded>
        <p>This accordion logs events to the console. Open the browser console and expand/collapse panels to see the events.</p>
        <p>Events provide useful information about user interactions for analytics or custom behavior.</p>
      </forge-accordion-panel>
      <forge-accordion-panel title="📊 Event Details">
        <p>Each event includes details about the panel that was interacted with:</p>
        <ul>
          <li><code>panel</code> - Reference to the panel element</li>
          <li><code>title</code> - The panel's title</li>
          <li><code>index</code> - The panel's position in the accordion</li>
        </ul>
      </forge-accordion-panel>
    </forge-accordion>
  `,
};

export const AIIntegration: Story = {
  render: () => html`
    <forge-accordion 
      semantic-role="help-system"
      ai-context="component-documentation"
    >
      <forge-accordion-panel title="🤖 AI-Ready Component" expanded>
        <p>This accordion includes AI metadata attributes that help AI systems understand its purpose and content.</p>
        <p><strong>Semantic Role:</strong> help-system</p>
        <p><strong>AI Context:</strong> component-documentation</p>
        <p>AI agents can now understand this is a help system component focused on documentation.</p>
      </forge-accordion-panel>
      <forge-accordion-panel title="Performance Monitoring">
        <p>Real-time performance tracking is enabled by default.</p>
        <p>The component monitors render times and can automatically optimize performance if needed.</p>
      </forge-accordion-panel>
    </forge-accordion>
  `,
};