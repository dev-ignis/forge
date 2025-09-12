import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import './avatar';

const meta: Meta = {
  title: 'Components/Atoms/Avatar',
  component: 'forge-avatar',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile avatar component for displaying user identity with image support, fallback text/initials, and status indicators.'
      }
    }
  },
  argTypes: {
    src: {
      control: 'text',
      description: 'Image source URL'
    },
    alt: {
      control: 'text',
      description: 'Alt text for the image'
    },
    fallback: {
      control: 'text',
      description: 'Fallback text/initials when no image'
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size variant'
    },
    status: {
      control: 'select',
      options: ['none', 'online', 'offline', 'busy', 'away'],
      description: 'Status indicator'
    },
    statusPosition: {
      control: 'select',
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
      description: 'Status indicator position'
    },
    shape: {
      control: 'select',
      options: ['circle', 'square', 'rounded'],
      description: 'Avatar shape'
    },
    clickable: {
      control: 'boolean',
      description: 'Makes avatar interactive'
    },
    loading: {
      control: 'boolean',
      description: 'Shows loading state'
    },
    disabled: {
      control: 'boolean',
      description: 'Disables interactions'
    }
  },
  args: {
    size: 'md',
    status: 'none',
    statusPosition: 'top-right',
    shape: 'circle',
    clickable: false,
    loading: false,
    disabled: false
  }
};

export default meta;

type Story = StoryObj;

const Template = (args: any) => html`
  <forge-avatar
    src=${ifDefined(args.src)}
    alt=${ifDefined(args.alt)}
    fallback=${ifDefined(args.fallback)}
    size=${args.size}
    status=${args.status}
    status-position=${args.statusPosition}
    shape=${args.shape}
    ?clickable=${args.clickable}
    ?loading=${args.loading}
    ?disabled=${args.disabled}
    @forge-avatar-click=${(e: CustomEvent) => console.log('Avatar clicked:', e.detail)}
  ></forge-avatar>
`;

export const Default: Story = {
  render: Template,
  args: {
    fallback: 'JD'
  }
};

export const WithImage: Story = {
  render: Template,
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: 'John Doe',
    fallback: 'JD'
  }
};

export const WithStatus: Story = {
  render: Template,
  args: {
    fallback: 'JD',
    status: 'online'
  }
};

export const Clickable: Story = {
  render: Template,
  args: {
    src: 'https://images.unsplash.com/photo-1494790108755-2616b612b1eb?w=150&h=150&fit=crop&crop=face',
    alt: 'Jane Smith',
    fallback: 'JS',
    clickable: true
  }
};

export const Loading: Story = {
  render: Template,
  args: {
    fallback: 'LD',
    loading: true
  }
};

// Size Variants
export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 1rem;">
      <div style="text-align: center;">
        <forge-avatar fallback="XS" size="xs"></forge-avatar>
        <p style="margin: 0.5rem 0 0 0; font-size: 0.75rem;">xs (24px)</p>
      </div>
      <div style="text-align: center;">
        <forge-avatar fallback="SM" size="sm"></forge-avatar>
        <p style="margin: 0.5rem 0 0 0; font-size: 0.75rem;">sm (32px)</p>
      </div>
      <div style="text-align: center;">
        <forge-avatar fallback="MD" size="md"></forge-avatar>
        <p style="margin: 0.5rem 0 0 0; font-size: 0.75rem;">md (40px)</p>
      </div>
      <div style="text-align: center;">
        <forge-avatar fallback="LG" size="lg"></forge-avatar>
        <p style="margin: 0.5rem 0 0 0; font-size: 0.75rem;">lg (48px)</p>
      </div>
      <div style="text-align: center;">
        <forge-avatar fallback="XL" size="xl"></forge-avatar>
        <p style="margin: 0.5rem 0 0 0; font-size: 0.75rem;">xl (64px)</p>
      </div>
    </div>
  `
};

// Status Indicators
export const StatusIndicators: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 1rem;">
      <div style="text-align: center;">
        <forge-avatar fallback="ON" status="online" size="lg"></forge-avatar>
        <p style="margin: 0.5rem 0 0 0; font-size: 0.75rem;">Online</p>
      </div>
      <div style="text-align: center;">
        <forge-avatar fallback="OF" status="offline" size="lg"></forge-avatar>
        <p style="margin: 0.5rem 0 0 0; font-size: 0.75rem;">Offline</p>
      </div>
      <div style="text-align: center;">
        <forge-avatar fallback="BY" status="busy" size="lg"></forge-avatar>
        <p style="margin: 0.5rem 0 0 0; font-size: 0.75rem;">Busy</p>
      </div>
      <div style="text-align: center;">
        <forge-avatar fallback="AW" status="away" size="lg"></forge-avatar>
        <p style="margin: 0.5rem 0 0 0; font-size: 0.75rem;">Away</p>
      </div>
    </div>
  `
};

// Shape Variants
export const Shapes: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 1rem;">
      <div style="text-align: center;">
        <forge-avatar fallback="CI" shape="circle" size="lg"></forge-avatar>
        <p style="margin: 0.5rem 0 0 0; font-size: 0.75rem;">Circle</p>
      </div>
      <div style="text-align: center;">
        <forge-avatar fallback="SQ" shape="square" size="lg"></forge-avatar>
        <p style="margin: 0.5rem 0 0 0; font-size: 0.75rem;">Square</p>
      </div>
      <div style="text-align: center;">
        <forge-avatar fallback="RO" shape="rounded" size="lg"></forge-avatar>
        <p style="margin: 0.5rem 0 0 0; font-size: 0.75rem;">Rounded</p>
      </div>
    </div>
  `
};

// Status Positions
export const StatusPositions: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 1rem;">
      <div style="text-align: center;">
        <forge-avatar fallback="TR" status="online" status-position="top-right" size="lg"></forge-avatar>
        <p style="margin: 0.5rem 0 0 0; font-size: 0.75rem;">Top Right</p>
      </div>
      <div style="text-align: center;">
        <forge-avatar fallback="TL" status="busy" status-position="top-left" size="lg"></forge-avatar>
        <p style="margin: 0.5rem 0 0 0; font-size: 0.75rem;">Top Left</p>
      </div>
      <div style="text-align: center;">
        <forge-avatar fallback="BR" status="away" status-position="bottom-right" size="lg"></forge-avatar>
        <p style="margin: 0.5rem 0 0 0; font-size: 0.75rem;">Bottom Right</p>
      </div>
      <div style="text-align: center;">
        <forge-avatar fallback="BL" status="offline" status-position="bottom-left" size="lg"></forge-avatar>
        <p style="margin: 0.5rem 0 0 0; font-size: 0.75rem;">Bottom Left</p>
      </div>
    </div>
  `
};

// Real World Examples
export const UserNavigation: Story = {
  render: () => html`
    <nav style="
      display: flex; 
      align-items: center; 
      justify-content: space-between; 
      padding: 1rem; 
      background: #f8fafc; 
      border-radius: 8px;
      font-family: system-ui;
    ">
      <div style="display: flex; align-items: center; gap: 1rem;">
        <h3 style="margin: 0; color: #1f2937;">Dashboard</h3>
      </div>
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <forge-avatar 
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          alt="John Doe"
          fallback="JD"
          size="sm"
          status="online"
          clickable
          @forge-avatar-click=${() => alert('Profile clicked!')}
        ></forge-avatar>
        <span style="color: #374151; font-weight: 500;">John Doe</span>
      </div>
    </nav>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Avatar used in a navigation bar with user information and online status.'
      }
    }
  }
};

export const UserList: Story = {
  render: () => html`
    <div style="max-width: 300px; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
      ${[
        { name: 'John Doe', role: 'Software Engineer', status: 'online', initials: 'JD', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
        { name: 'Jane Smith', role: 'Product Manager', status: 'busy', initials: 'JS', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1eb?w=150&h=150&fit=crop&crop=face' },
        { name: 'Bob Wilson', role: 'Designer', status: 'away', initials: 'BW', avatar: '' },
        { name: 'Alice Johnson', role: 'Developer', status: 'offline', initials: 'AJ', avatar: '' }
      ].map((user, index) => html`
        <div style="
          display: flex; 
          align-items: center; 
          gap: 1rem; 
          padding: 1rem;
          ${index > 0 ? 'border-top: 1px solid #f3f4f6;' : ''}
          font-family: system-ui;
        ">
          <forge-avatar 
            src=${user.avatar || undefined}
            fallback=${user.initials}
            alt=${user.name}
            size="md"
            status=${user.status}
          ></forge-avatar>
          <div style="flex: 1;">
            <h4 style="margin: 0 0 0.25rem 0; color: #111827; font-size: 0.875rem;">${user.name}</h4>
            <p style="margin: 0; color: #6b7280; font-size: 0.75rem;">${user.role}</p>
          </div>
        </div>
      `)}
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Avatars used in a user list showing team members with their status indicators.'
      }
    }
  }
};

export const CommentThread: Story = {
  render: () => html`
    <div style="max-width: 500px; font-family: system-ui;">
      ${[
        { name: 'Sarah Connor', comment: 'This looks great! The new design is much more intuitive.', time: '2 hours ago', initials: 'SC', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1eb?w=150&h=150&fit=crop&crop=face' },
        { name: 'John Doe', comment: 'I agree, but I think we should adjust the spacing on mobile devices.', time: '1 hour ago', initials: 'JD', avatar: '' },
        { name: 'Mike Wilson', comment: 'Good point! I\'ll make those adjustments in the next iteration.', time: '30 minutes ago', initials: 'MW', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' }
      ].map((comment, index) => html`
        <div style="
          display: flex; 
          gap: 1rem; 
          padding: 1rem 0;
          ${index > 0 ? 'border-top: 1px solid #f3f4f6;' : ''}
        ">
          <forge-avatar 
            src=${comment.avatar || undefined}
            fallback=${comment.initials}
            alt=${comment.name}
            size="sm"
            shape="rounded"
          ></forge-avatar>
          <div style="flex: 1;">
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
              <strong style="color: #111827; font-size: 0.875rem;">${comment.name}</strong>
              <span style="color: #6b7280; font-size: 0.75rem;">${comment.time}</span>
            </div>
            <p style="margin: 0; color: #374151; font-size: 0.875rem; line-height: 1.4;">${comment.comment}</p>
          </div>
        </div>
      `)}
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Avatars used in a comment thread showing user interactions with rounded shape variant.'
      }
    }
  }
};

// Accessibility Demo
export const AccessibilityDemo: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
      <p style="font-family: system-ui; color: #374151; margin: 0;">
        <strong>Accessibility Features:</strong>
      </p>
      <ul style="font-family: system-ui; color: #6b7280; font-size: 0.875rem; margin: 0; padding-left: 1rem;">
        <li>Proper ARIA labels and roles</li>
        <li>Keyboard navigation support</li>
        <li>Screen reader announcements</li>
        <li>High contrast status indicators</li>
      </ul>
      
      <div style="display: flex; gap: 1rem; align-items: center;">
        <forge-avatar 
          src="https://images.unsplash.com/photo-1494790108755-2616b612b1eb?w=150&h=150&fit=crop&crop=face"
          alt="Jane Smith, Senior Developer, currently online"
          fallback="JS"
          status="online"
          clickable
          size="lg"
          @forge-avatar-click=${() => alert('Focus on keyboard navigation with Tab, activate with Enter/Space')}
        ></forge-avatar>
        
        <div style="font-family: system-ui;">
          <p style="margin: 0 0 0.25rem 0; color: #111827; font-weight: 500;">Jane Smith</p>
          <p style="margin: 0; color: #6b7280; font-size: 0.875rem;">Try keyboard navigation (Tab + Enter)</p>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Demonstration of accessibility features including ARIA attributes, keyboard navigation, and screen reader support.'
      }
    }
  }
};