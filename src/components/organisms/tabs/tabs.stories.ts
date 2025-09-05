import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './tabs.ts';
import type { TabItem } from './tabs.ts';

const meta: Meta = {
  title: 'Organisms/Tabs',
  component: 'forge-tabs',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A tabbed interface component with keyboard navigation, closeable tabs, and drag-to-reorder functionality.',
      },
    },
  },
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Layout orientation for tabs',
    },
    reorderable: {
      control: 'boolean',
      description: 'Allow tabs to be reordered by dragging',
    },
    lazyLoad: {
      control: 'boolean',
      description: 'Enable lazy loading of tab panels',
    },
    rememberActive: {
      control: 'boolean',
      description: 'Remember the active tab in localStorage',
    },
  },
};

export default meta;
type Story = StoryObj;

// Sample tab data
const basicTabs: TabItem[] = [
  {
    id: 'overview',
    label: 'Overview',
    panel: `
      <div style="padding: 20px;">
        <h3>Project Overview</h3>
        <p>This tab contains general information about the project, including goals, timeline, and key stakeholders.</p>
        <ul>
          <li>Project duration: 6 months</li>
          <li>Team size: 8 developers</li>
          <li>Technology: Web Components</li>
          <li>Target: Q2 2024 launch</li>
        </ul>
      </div>
    `
  },
  {
    id: 'details',
    label: 'Details',
    panel: `
      <div style="padding: 20px;">
        <h3>Technical Details</h3>
        <p>Detailed technical specifications and implementation notes.</p>
        <pre style="background: #f5f5f5; padding: 15px; border-radius: 4px; font-family: monospace;">
npm install @nexcraft/forge
import '@nexcraft/forge';

&lt;forge-button variant="primary"&gt;
  Click me
&lt;/forge-button&gt;</pre>
      </div>
    `
  },
  {
    id: 'settings',
    label: 'Settings', 
    panel: `
      <div style="padding: 20px;">
        <h3>Configuration Settings</h3>
        <p>Manage project settings and preferences.</p>
        <div style="margin: 10px 0;">
          <label>Project Name: <input type="text" value="@nexcraft/forge" style="margin-left: 10px;"></label>
        </div>
        <div style="margin: 10px 0;">
          <label>Environment: 
            <select style="margin-left: 10px;">
              <option value="development">Development</option>
              <option value="staging">Staging</option>
              <option value="production">Production</option>
            </select>
          </label>
        </div>
      </div>
    `
  }
];

export const Default: Story = {
  render: () => html`
    <forge-tabs
      .tabs="${basicTabs}"
      active-tab="overview"
    ></forge-tabs>
  `,
};

export const WithIcons: Story = {
  render: () => html`
    <forge-tabs
      .tabs="${[
        {
          id: 'home',
          label: 'Home',
          icon: 'home',
          panel: `
            <div style="padding: 20px;">
              <h3>Welcome Home</h3>
              <p>This tab has an icon and demonstrates icon integration.</p>
            </div>
          `
        },
        {
          id: 'analytics',
          label: 'Analytics',
          icon: 'analytics',
          badge: '5',
          panel: `
            <div style="padding: 20px;">
              <h3>Analytics Dashboard</h3>
              <p>View your performance metrics and insights here.</p>
              <p>Badge shows 5 new reports.</p>
            </div>
          `
        },
        {
          id: 'settings',
          label: 'Settings',
          icon: 'settings',
          panel: `
            <div style="padding: 20px;">
              <h3>System Settings</h3>
              <p>Configure your application preferences.</p>
            </div>
          `
        }
      ]}"
      active-tab="home"
    ></forge-tabs>
  `,
};

export const CloseableTabs: Story = {
  render: () => html`
    <forge-tabs 
      .tabs="${[
        {
          id: 'doc1',
          label: 'Document 1.txt',
          closeable: true,
          panel: `
            <div style="padding: 20px;">
              <h3>Document 1</h3>
              <p>This is the first document. You can close this tab using the × button.</p>
            </div>
          `
        },
        {
          id: 'doc2',
          label: 'Document 2.txt',
          closeable: true,
          panel: `
            <div style="padding: 20px;">
              <h3>Document 2</h3>
              <p>Second document content goes here.</p>
            </div>
          `
        },
        {
          id: 'doc3',
          label: 'Document 3.txt',
          closeable: true,
          panel: `
            <div style="padding: 20px;">
              <h3>Document 3</h3>
              <p>Third document with closeable functionality.</p>
            </div>
          `
        },
        {
          id: 'unsaved',
          label: 'Untitled*',
          closeable: true,
          panel: `
            <div style="padding: 20px;">
              <h3>Unsaved Document</h3>
              <p>This document has unsaved changes (indicated by the * in the title).</p>
            </div>
          `
        }
      ]}"
      active-tab="doc1"
      @tabclose="${(e: CustomEvent) => console.log('Tab closed:', e.detail)}"
    ></forge-tabs>
  `,
};

export const ReorderableTabs: Story = {
  render: () => html`
    <forge-tabs 
      .tabs="${[
        {
          id: 'tab-a',
          label: 'Tab A',
          panel: `
            <div style="padding: 20px;">
              <h3>Tab A Content</h3>
              <p>Drag the tab headers to reorder them. This tab is initially first.</p>
            </div>
          `
        },
        {
          id: 'tab-b',
          label: 'Tab B',
          panel: `
            <div style="padding: 20px;">
              <h3>Tab B Content</h3>
              <p>This is the second tab. Try dragging it to different positions.</p>
            </div>
          `
        },
        {
          id: 'tab-c',
          label: 'Tab C',
          panel: `
            <div style="padding: 20px;">
              <h3>Tab C Content</h3>
              <p>Third tab that can be moved around using drag and drop.</p>
            </div>
          `
        },
        {
          id: 'tab-d',
          label: 'Tab D',
          panel: `
            <div style="padding: 20px;">
              <h3>Tab D Content</h3>
              <p>Fourth tab demonstrating the reordering functionality.</p>
            </div>
          `
        }
      ]}"
      active-tab="tab-a"
      reorderable
      @tabreorder="${(e: CustomEvent) => console.log('Tabs reordered:', e.detail)}"
    ></forge-tabs>
  `,
};

export const VerticalTabs: Story = {
  render: () => html`
    <div style="height: 400px; width: 600px;">
      <forge-tabs 
        .tabs="${[
          {
            id: 'navigation',
            label: 'Navigation',
            panel: `
              <div style="padding: 20px;">
                <h3>Navigation Settings</h3>
                <p>Configure navigation behavior and menu items.</p>
                <div style="margin: 10px 0;">
                  <label><input type="checkbox" checked> Show breadcrumbs</label>
                </div>
                <div style="margin: 10px 0;">
                  <label><input type="checkbox"> Collapse sidebar on mobile</label>
                </div>
              </div>
            `
          },
          {
            id: 'appearance',
            label: 'Appearance',
            panel: `
              <div style="padding: 20px;">
                <h3>Visual Appearance</h3>
                <p>Customize the look and feel of your application.</p>
                <div style="margin: 10px 0;">
                  <label>Theme: 
                    <select style="margin-left: 10px;">
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="auto">Auto</option>
                    </select>
                  </label>
                </div>
              </div>
            `
          },
          {
            id: 'performance',
            label: 'Performance',
            panel: `
              <div style="padding: 20px;">
                <h3>Performance Options</h3>
                <p>Optimize application performance settings.</p>
                <div style="margin: 10px 0;">
                  <label><input type="checkbox" checked> Enable lazy loading</label>
                </div>
                <div style="margin: 10px 0;">
                  <label><input type="checkbox" checked> Use virtual scrolling</label>
                </div>
              </div>
            `
          }
        ]}"
        active-tab="navigation"
        orientation="vertical"
      ></forge-tabs>
    </div>
  `,
};

export const ManyTabs: Story = {
  render: () => html`
    <div style="max-width: 600px;">
      <forge-tabs
        .tabs="${Array.from({ length: 12 }, (_, i) => ({
          id: `tab-${i + 1}`,
          label: `Tab ${i + 1}`,
          panel: `
            <div style="padding: 20px;">
              <h3>Content for Tab ${i + 1}</h3>
              <p>This demonstrates many tabs that may require scrolling.</p>
              <p>Tab number: ${i + 1}</p>
            </div>
          `
        }))}"
        active-tab="tab-1"
      ></forge-tabs>
    </div>
  `,
};

export const LazyLoading: Story = {
  render: () => html`
    <forge-tabs 
      .tabs="${[
        {
          id: 'loaded',
          label: 'Loaded',
          panel: `
            <div style="padding: 20px;">
              <h3>Already Loaded</h3>
              <p>This tab content is loaded immediately because it's active.</p>
            </div>
          `
        },
        {
          id: 'lazy',
          label: 'Lazy Content',
          panel: `
            <div style="padding: 20px;">
              <h3>Lazy Loaded Content</h3>
              <p>This content is only loaded when the tab is first activated.</p>
              <div style="margin: 15px 0;">
                <img src="https://picsum.photos/400/200?random=1" alt="Lazy loaded image" 
                     style="max-width: 100%; border-radius: 4px;">
              </div>
            </div>
          `
        },
        {
          id: 'heavy',
          label: 'Heavy Content',
          panel: `
            <div style="padding: 20px;">
              <h3>Resource Heavy Tab</h3>
              <p>This tab contains heavy content that benefits from lazy loading:</p>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; margin: 15px 0;">
                ${Array.from({ length: 6 }, (_, i) => html`
                  <img 
                    src="https://picsum.photos/150/100?random=${i + 10}" 
                    alt="Image ${i + 1}"
                    style="width: 100%; border-radius: 4px;"
                  >
                `)}
              </div>
            </div>
          `
        }
      ]}"
      active-tab="loaded"
      lazy-load
    ></forge-tabs>
  `,
};

export const WithDisabledTab: Story = {
  render: () => html`
    <forge-tabs
      .tabs="${[
        {
          id: 'active',
          label: 'Active Tab',
          panel: `
            <div style="padding: 20px;">
              <h3>Active Tab</h3>
              <p>This tab is active and clickable.</p>
            </div>
          `
        },
        {
          id: 'disabled',
          label: 'Disabled Tab',
          disabled: true,
          panel: `
            <div style="padding: 20px;">
              <h3>Disabled Content</h3>
              <p>This content shouldn't be accessible.</p>
            </div>
          `
        },
        {
          id: 'another',
          label: 'Another Tab',
          panel: `
            <div style="padding: 20px;">
              <h3>Another Tab</h3>
              <p>This tab is also clickable and active.</p>
            </div>
          `
        }
      ]}"
      active-tab="active"
    ></forge-tabs>
  `,
};

export const AIIntegration: Story = {
  render: () => html`
    <forge-tabs 
      .tabs="${[
        {
          id: 'ai-assistant',
          label: '🤖 AI Assistant',
          panel: `
            <div style="padding: 20px;">
              <h3>AI-Powered Tab Interface</h3>
              <p>This tab component includes AI metadata:</p>
              <ul>
                <li><strong>Semantic Role:</strong> content-navigation</li>
                <li><strong>AI Context:</strong> document-editor</li>
                <li><strong>Performance Mode:</strong> balanced</li>
              </ul>
              <p>AI agents can understand this is a content navigation system within a document editor context.</p>
            </div>
          `
        },
        {
          id: 'analytics',
          label: '📊 Analytics',
          panel: `
            <div style="padding: 20px;">
              <h3>Usage Analytics</h3>
              <p>Track how users interact with tab interfaces to improve UX.</p>
            </div>
          `
        }
      ]}"
      active-tab="ai-assistant"
      semantic-role="content-navigation"
      ai-context="document-editor"
      performance-mode="balanced"
      @tabchange="${(e: CustomEvent) => {
        console.log('AI-aware tab change:', {
          newTab: e.detail,
          context: 'document-editor',
          userIntent: 'content-switching'
        });
      }}"
    ></forge-tabs>
  `,
};