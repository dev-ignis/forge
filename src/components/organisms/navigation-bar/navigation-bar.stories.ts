import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './navigation-bar.ts';

const meta: Meta = {
  title: 'Organisms/NavigationBar',
  component: 'forge-navigation-bar',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A responsive navigation bar component with logo, menu items, user actions, and mobile drawer support.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'transparent', 'minimal'],
      description: 'Navigation bar visual style',
    },
    position: {
      control: { type: 'select' },
      options: ['static', 'sticky', 'fixed'],
      description: 'Navigation bar positioning',
    },
    showLogo: {
      control: 'boolean',
      description: 'Show logo/brand in navigation',
    },
    showSearch: {
      control: 'boolean',
      description: 'Show search functionality',
    },
    showThemeToggle: {
      control: 'boolean',
      description: 'Show theme toggle button',
    },
    showUserMenu: {
      control: 'boolean',
      description: 'Show user menu dropdown',
    },
  },
};

export default meta;
type Story = StoryObj;

// Sample navigation data
const navigationItems = [
  { label: 'Dashboard', href: '/dashboard', active: true },
  { label: 'Components', href: '/components' },
  { label: 'Documentation', href: '/docs' },
  { label: 'Examples', href: '/examples' },
  { label: 'Support', href: '/support' },
];

const userMenuItems = [
  { label: 'Profile', icon: 'user', href: '/profile' },
  { label: 'Settings', icon: 'settings', href: '/settings' },
  { label: 'Help', icon: 'help', href: '/help' },
  { type: 'divider' },
  { label: 'Sign Out', icon: 'logout', href: '/logout' },
];

export const Default: Story = {
  render: () => html`
    <forge-navigation-bar
      .navigationItems="${navigationItems}"
      .userMenuItems="${userMenuItems}"
      show-logo
      show-search
      show-theme-toggle
      show-user-menu
    >
      <div slot="logo">
        <img src="/logo.svg" alt="Forge" width="32" height="32" style="margin-right: 8px;">
        <span style="font-weight: 600; font-size: 18px;">Forge</span>
      </div>
      <div slot="user-info">
        <img src="/avatar.jpg" alt="User" width="32" height="32" style="border-radius: 50%; margin-right: 8px;">
        <span>John Doe</span>
      </div>
    </forge-navigation-bar>
    <div style="padding: 20px; height: 500px;">
      <h1>Page Content</h1>
      <p>Navigation bar content appears above this content.</p>
    </div>
  `,
};

export const Minimal: Story = {
  args: {
    variant: 'minimal',
  },
  render: (args) => html`
    <forge-navigation-bar
      variant="${args.variant}"
      .navigationItems="${navigationItems.slice(0, 3)}"
      show-logo
    >
      <div slot="logo">
        <span style="font-weight: 600; font-size: 18px;">Minimal</span>
      </div>
    </forge-navigation-bar>
    <div style="padding: 20px; height: 400px;">
      <h1>Minimal Navigation</h1>
      <p>Clean and simple navigation with only essential items.</p>
    </div>
  `,
};

export const Transparent: Story = {
  args: {
    variant: 'transparent',
  },
  render: (args) => html`
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 500px;">
      <forge-navigation-bar
        variant="${args.variant}"
        .navigationItems="${navigationItems}"
        show-logo
        show-theme-toggle
      >
        <div slot="logo">
          <span style="font-weight: 600; font-size: 18px; color: white;">Transparent</span>
        </div>
      </forge-navigation-bar>
      <div style="padding: 40px 20px; color: white;">
        <h1>Hero Section</h1>
        <p>Transparent navigation overlays beautifully on hero sections and full-screen backgrounds.</p>
      </div>
    </div>
  `,
};

export const WithSearch: Story = {
  render: () => html`
    <forge-navigation-bar
      .navigationItems="${navigationItems}"
      show-logo
      show-search
      show-user-menu
      @search="${(e: CustomEvent) => console.log('Search:', e.detail)}"
    >
      <div slot="logo">
        <span style="font-weight: 600; font-size: 18px;">🔍 Search Demo</span>
      </div>
      <div slot="user-info">
        <span>Search User</span>
      </div>
    </forge-navigation-bar>
    <div style="padding: 20px;">
      <h1>Search-Enabled Navigation</h1>
      <p>Use the search bar in the navigation to find content. Search events are logged to the console.</p>
    </div>
  `,
};

export const MobileResponsive: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => html`
    <forge-navigation-bar
      .navigationItems="${navigationItems}"
      .userMenuItems="${userMenuItems}"
      show-logo
      show-search
      show-theme-toggle
      show-user-menu
      mobile-breakpoint="768"
    >
      <div slot="logo">
        <span style="font-weight: 600; font-size: 18px;">📱 Mobile</span>
      </div>
      <div slot="user-info">
        <span>Mobile User</span>
      </div>
    </forge-navigation-bar>
    <div style="padding: 20px;">
      <h1>Mobile Navigation</h1>
      <p>Resize the viewport or use mobile device simulation to see the responsive behavior.</p>
      <p>On mobile, navigation items collapse into a hamburger menu.</p>
    </div>
  `,
};

export const WithSubmenus: Story = {
  render: () => {
    const itemsWithSubmenus = [
      { label: 'Dashboard', href: '/dashboard', active: true },
      {
        label: 'Components',
        children: [
          { label: 'Atoms', href: '/components/atoms' },
          { label: 'Molecules', href: '/components/molecules' },
          { label: 'Organisms', href: '/components/organisms' },
        ],
      },
      {
        label: 'Resources',
        children: [
          { label: 'Documentation', href: '/docs' },
          { label: 'Examples', href: '/examples' },
          { label: 'Tutorials', href: '/tutorials' },
          { type: 'divider' },
          { label: 'GitHub', href: 'https://github.com', external: true },
        ],
      },
      { label: 'Support', href: '/support' },
    ];

    return html`
      <forge-navigation-bar
        .navigationItems="${itemsWithSubmenus}"
        show-logo
        show-user-menu
        @navigation-click="${(e: CustomEvent) => console.log('Navigation click:', e.detail)}"
      >
        <div slot="logo">
          <span style="font-weight: 600; font-size: 18px;">🌲 Submenus</span>
        </div>
        <div slot="user-info">
          <span>Admin User</span>
        </div>
      </forge-navigation-bar>
      <div style="padding: 20px;">
        <h1>Navigation with Submenus</h1>
        <p>Hover over "Components" and "Resources" to see dropdown submenus.</p>
      </div>
    `;
  },
};

export const StickyPosition: Story = {
  args: {
    position: 'sticky',
  },
  render: (args) => html`
    <forge-navigation-bar
      position="${args.position}"
      .navigationItems="${navigationItems}"
      show-logo
      show-search
    >
      <div slot="logo">
        <span style="font-weight: 600; font-size: 18px;">📌 Sticky Nav</span>
      </div>
    </forge-navigation-bar>
    <div style="padding: 20px;">
      <h1>Sticky Navigation Demo</h1>
      <p>Scroll down to see the sticky navigation behavior.</p>
      ${Array.from({ length: 20 }, (_, i) => html`
        <div style="margin: 20px 0; padding: 20px; background: #f5f5f5; border-radius: 8px;">
          <h3>Content Section ${i + 1}</h3>
          <p>This is sample content to demonstrate scrolling behavior with sticky navigation.</p>
        </div>
      `)}
    </div>
  `,
};

export const CustomActions: Story = {
  render: () => html`
    <forge-navigation-bar
      .navigationItems="${navigationItems}"
      show-logo
    >
      <div slot="logo">
        <span style="font-weight: 600; font-size: 18px;">⚡ Custom Actions</span>
      </div>
      <div slot="actions">
        <forge-button variant="outline" size="small" @click="${() => console.log('Notifications')}">
          🔔 Notifications
          <forge-badge variant="danger" size="small">3</forge-badge>
        </forge-button>
        <forge-button variant="primary" size="small" @click="${() => console.log('Create')}">
          ➕ Create
        </forge-button>
      </div>
    </forge-navigation-bar>
    <div style="padding: 20px;">
      <h1>Custom Actions</h1>
      <p>Navigation bar with custom action buttons in the actions slot.</p>
    </div>
  `,
};

export const ThemeToggleDemo: Story = {
  render: () => html`
    <forge-navigation-bar
      .navigationItems="${navigationItems}"
      show-logo
      show-theme-toggle
      @theme-change="${(e: CustomEvent) => {
        console.log('Theme changed to:', e.detail.theme);
        document.body.setAttribute('data-theme', e.detail.theme);
      }}"
    >
      <div slot="logo">
        <span style="font-weight: 600; font-size: 18px;">🌓 Theme Toggle</span>
      </div>
    </forge-navigation-bar>
    <div style="padding: 20px;">
      <h1>Theme Toggle Demo</h1>
      <p>Click the theme toggle button to switch between light and dark modes.</p>
      <p>Theme changes are logged to the console and applied to the document body.</p>
    </div>
  `,
};

export const AIIntegration: Story = {
  render: () => html`
    <forge-navigation-bar
      .navigationItems="${navigationItems}"
      show-logo
      show-search
      show-user-menu
      semantic-role="main-navigation"
      ai-context="application-header"
      performance-mode="balanced"
      @navigation-click="${(e: CustomEvent) => {
        console.log('AI-aware navigation:', {
          item: e.detail,
          context: 'main-navigation',
          userIntent: 'page-navigation'
        });
      }}"
    >
      <div slot="logo">
        <span style="font-weight: 600; font-size: 18px;">🤖 AI-Ready Nav</span>
      </div>
      <div slot="user-info">
        <span>AI User</span>
      </div>
    </forge-navigation-bar>
    <div style="padding: 20px;">
      <h1>AI-Ready Navigation</h1>
      <p>This navigation includes AI metadata for intelligent interactions:</p>
      <ul>
        <li><strong>Semantic Role:</strong> main-navigation</li>
        <li><strong>AI Context:</strong> application-header</li>
        <li><strong>Performance Mode:</strong> balanced</li>
      </ul>
      <p>Navigation interactions provide rich context for AI agents.</p>
    </div>
  `,
};