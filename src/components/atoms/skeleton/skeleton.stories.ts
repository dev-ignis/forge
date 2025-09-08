import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './skeleton';

const meta: Meta = {
  title: 'Components/Atoms/Skeleton',
  component: 'forge-skeleton',
  parameters: {
    docs: {
      description: {
        component: 'Skeleton loading component for showing loading placeholders. Essential for modern perceived performance and user experience. Provides shimmer animations, multiple shapes, and customizable dimensions.'
      }
    }
  },
  argTypes: {
    width: {
      control: { type: 'text' },
      description: 'Custom width (CSS value)'
    },
    height: {
      control: { type: 'text' },
      description: 'Custom height (CSS value)'
    },
    shape: {
      control: { type: 'select' },
      options: ['rounded', 'square', 'circle'],
      description: 'Shape variant of the skeleton'
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size preset for the skeleton'
    },
    noAnimation: {
      control: { type: 'boolean' },
      description: 'Whether to disable the shimmer animation'
    },
    ariaLabel: {
      control: { type: 'text' },
      description: 'Accessible label for screen readers'
    }
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    width: '',
    height: '',
    shape: 'rounded',
    size: 'md',
    noAnimation: false,
    ariaLabel: 'Loading content'
  },
  render: (args) => html`
    <forge-skeleton
      width=${args.width || undefined}
      height=${args.height || undefined}
      shape=${args.shape}
      size=${args.size}
      ?no-animation=${args.noAnimation}
      aria-label=${args.ariaLabel}
    ></forge-skeleton>
  `
};

export const Shapes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px; max-width: 600px;">
      <div>
        <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">Rounded (Default)</h3>
        <forge-skeleton width="200px" height="24px" shape="rounded"></forge-skeleton>
      </div>
      
      <div>
        <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">Square</h3>
        <forge-skeleton width="200px" height="24px" shape="square"></forge-skeleton>
      </div>
      
      <div>
        <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">Circle</h3>
        <forge-skeleton width="48px" height="48px" shape="circle"></forge-skeleton>
      </div>
    </div>
  `
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 600px;">
      <div style="display: flex; align-items: center; gap: 12px;">
        <span style="width: 40px; font-size: 14px; color: var(--forge-color-text-secondary, #6b7280);">XS:</span>
        <forge-skeleton size="xs" width="120px"></forge-skeleton>
      </div>
      
      <div style="display: flex; align-items: center; gap: 12px;">
        <span style="width: 40px; font-size: 14px; color: var(--forge-color-text-secondary, #6b7280);">SM:</span>
        <forge-skeleton size="sm" width="120px"></forge-skeleton>
      </div>
      
      <div style="display: flex; align-items: center; gap: 12px;">
        <span style="width: 40px; font-size: 14px; color: var(--forge-color-text-secondary, #6b7280);">MD:</span>
        <forge-skeleton size="md" width="120px"></forge-skeleton>
      </div>
      
      <div style="display: flex; align-items: center; gap: 12px;">
        <span style="width: 40px; font-size: 14px; color: var(--forge-color-text-secondary, #6b7280);">LG:</span>
        <forge-skeleton size="lg" width="120px"></forge-skeleton>
      </div>
      
      <div style="display: flex; align-items: center; gap: 12px;">
        <span style="width: 40px; font-size: 14px; color: var(--forge-color-text-secondary, #6b7280);">XL:</span>
        <forge-skeleton size="xl" width="120px"></forge-skeleton>
      </div>
    </div>
  `
};

export const CustomDimensions: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <div>
        <h4 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600;">Text Lines</h4>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <forge-skeleton width="100%" height="16px"></forge-skeleton>
          <forge-skeleton width="85%" height="16px"></forge-skeleton>
          <forge-skeleton width="92%" height="16px"></forge-skeleton>
          <forge-skeleton width="78%" height="16px"></forge-skeleton>
        </div>
      </div>
      
      <div>
        <h4 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600;">Card Header</h4>
        <div style="display: flex; align-items: center; gap: 12px;">
          <forge-skeleton width="48px" height="48px" shape="circle"></forge-skeleton>
          <div style="flex: 1; display: flex; flex-direction: column; gap: 8px;">
            <forge-skeleton width="120px" height="14px"></forge-skeleton>
            <forge-skeleton width="80px" height="12px"></forge-skeleton>
          </div>
        </div>
      </div>
      
      <div>
        <h4 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600;">Image Placeholder</h4>
        <forge-skeleton width="300px" height="200px" shape="rounded"></forge-skeleton>
      </div>
      
      <div>
        <h4 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600;">Button Skeletons</h4>
        <div style="display: flex; gap: 12px;">
          <forge-skeleton width="80px" height="36px" shape="rounded"></forge-skeleton>
          <forge-skeleton width="100px" height="36px" shape="rounded"></forge-skeleton>
          <forge-skeleton width="64px" height="36px" shape="rounded"></forge-skeleton>
        </div>
      </div>
    </div>
  `
};

export const CompositeLayouts: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 32px; max-width: 400px;">
      <div>
        <h4 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600;">Article Card</h4>
        <div style="border: 1px solid var(--forge-color-border, #e5e7eb); border-radius: 8px; padding: 16px; background: var(--forge-color-background, #ffffff);">
          <forge-skeleton width="100%" height="160px" shape="rounded" style="margin-bottom: 16px;"></forge-skeleton>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <forge-skeleton width="90%" height="20px"></forge-skeleton>
            <forge-skeleton width="100%" height="16px"></forge-skeleton>
            <forge-skeleton width="75%" height="16px"></forge-skeleton>
            <forge-skeleton width="85%" height="16px"></forge-skeleton>
          </div>
          <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 16px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <forge-skeleton width="32px" height="32px" shape="circle"></forge-skeleton>
              <forge-skeleton width="80px" height="14px"></forge-skeleton>
            </div>
            <forge-skeleton width="60px" height="14px"></forge-skeleton>
          </div>
        </div>
      </div>
      
      <div>
        <h4 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600;">User Profile</h4>
        <div style="border: 1px solid var(--forge-color-border, #e5e7eb); border-radius: 8px; padding: 20px; background: var(--forge-color-background, #ffffff);">
          <div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
            <forge-skeleton width="96px" height="96px" shape="circle"></forge-skeleton>
            <div style="text-align: center; width: 100%;">
              <forge-skeleton width="140px" height="24px" style="margin: 0 auto 8px auto;"></forge-skeleton>
              <forge-skeleton width="100px" height="16px" style="margin: 0 auto;"></forge-skeleton>
            </div>
            <div style="display: flex; gap: 12px; margin-top: 8px;">
              <forge-skeleton width="80px" height="32px" shape="rounded"></forge-skeleton>
              <forge-skeleton width="90px" height="32px" shape="rounded"></forge-skeleton>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h4 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600;">Data Table</h4>
        <div style="border: 1px solid var(--forge-color-border, #e5e7eb); border-radius: 8px; overflow: hidden;">
          <div style="background: var(--forge-color-gray-50, #f9fafb); padding: 12px; border-bottom: 1px solid var(--forge-color-border, #e5e7eb);">
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 100px; gap: 16px;">
              <forge-skeleton width="60px" height="14px"></forge-skeleton>
              <forge-skeleton width="80px" height="14px"></forge-skeleton>
              <forge-skeleton width="70px" height="14px"></forge-skeleton>
              <forge-skeleton width="50px" height="14px"></forge-skeleton>
            </div>
          </div>
          <div style="background: var(--forge-color-background, #ffffff);">
            ${Array.from({ length: 4 }, () => html`
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 100px; gap: 16px; padding: 12px; border-bottom: 1px solid var(--forge-color-border, #e5e7eb);">
                <forge-skeleton width="90%" height="14px"></forge-skeleton>
                <forge-skeleton width="70%" height="14px"></forge-skeleton>
                <forge-skeleton width="80%" height="14px"></forge-skeleton>
                <forge-skeleton width="24px" height="24px" shape="circle"></forge-skeleton>
              </div>
            `)}
          </div>
        </div>
      </div>
    </div>
  `
};

export const AnimationStates: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px; max-width: 600px;">
      <div>
        <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">Animated (Default)</h3>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <forge-skeleton width="100%" height="20px"></forge-skeleton>
          <forge-skeleton width="85%" height="20px"></forge-skeleton>
          <forge-skeleton width="92%" height="20px"></forge-skeleton>
        </div>
        <p style="margin: 8px 0 0 0; font-size: 14px; color: var(--forge-color-text-secondary, #6b7280);">
          Shimmer animation provides visual feedback for loading content.
        </p>
      </div>
      
      <div>
        <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">Static (No Animation)</h3>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <forge-skeleton width="100%" height="20px" no-animation></forge-skeleton>
          <forge-skeleton width="85%" height="20px" no-animation></forge-skeleton>
          <forge-skeleton width="92%" height="20px" no-animation></forge-skeleton>
        </div>
        <p style="margin: 8px 0 0 0; font-size: 14px; color: var(--forge-color-text-secondary, #6b7280);">
          Static skeletons respect prefers-reduced-motion preferences.
        </p>
      </div>
    </div>
  `
};

export const AccessibilityExample: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px; max-width: 600px;">
      <div>
        <h4 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">Accessibility Features</h4>
        <div style="background: var(--forge-color-blue-50, #eff6ff); padding: 16px; border-radius: 8px; margin-bottom: 20px;">
          <ul style="margin: 0; padding-left: 20px; color: var(--forge-color-blue-800, #1e40af); font-size: 14px; line-height: 1.6;">
            <li><strong>aria-busy="true":</strong> Indicates content is loading</li>
            <li><strong>aria-label:</strong> Describes what is being loaded</li>
            <li><strong>role="presentation":</strong> Hides decorative skeleton from screen readers</li>
            <li><strong>Reduced motion:</strong> Respects prefers-reduced-motion preference</li>
          </ul>
        </div>
      </div>

      <div>
        <h4 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600;">Loading User Profile</h4>
        <div style="display: flex; align-items: center; gap: 12px; padding: 16px; border: 1px solid var(--forge-color-border, #e5e7eb); border-radius: 8px;">
          <forge-skeleton 
            width="48px" 
            height="48px" 
            shape="circle" 
            aria-label="Loading user avatar"
          ></forge-skeleton>
          <div style="flex: 1;">
            <forge-skeleton 
              width="120px" 
              height="16px" 
              aria-label="Loading user name"
              style="margin-bottom: 8px;"
            ></forge-skeleton>
            <forge-skeleton 
              width="80px" 
              height="14px" 
              aria-label="Loading user status"
            ></forge-skeleton>
          </div>
        </div>
      </div>

      <div>
        <h4 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600;">Loading Article</h4>
        <div style="padding: 16px; border: 1px solid var(--forge-color-border, #e5e7eb); border-radius: 8px;">
          <forge-skeleton 
            width="100%" 
            height="200px" 
            shape="rounded" 
            aria-label="Loading article image"
            style="margin-bottom: 16px;"
          ></forge-skeleton>
          <forge-skeleton 
            width="80%" 
            height="24px" 
            aria-label="Loading article title"
            style="margin-bottom: 12px;"
          ></forge-skeleton>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <forge-skeleton 
              width="100%" 
              height="16px" 
              aria-label="Loading article content"
            ></forge-skeleton>
            <forge-skeleton 
              width="85%" 
              height="16px" 
              aria-label="Loading article content"
            ></forge-skeleton>
            <forge-skeleton 
              width="90%" 
              height="16px" 
              aria-label="Loading article content"
            ></forge-skeleton>
          </div>
        </div>
      </div>
    </div>
  `
};

export const InteractiveDemo: Story = {
  render: () => {
    let isLoading = true;
    
    const toggleLoading = () => {
      isLoading = !isLoading;
      const container = document.querySelector('#demo-container');
      if (container) {
        container.innerHTML = '';
        container.appendChild(renderContent());
      }
    };
    
    const renderContent = () => {
      const div = document.createElement('div');
      
      if (isLoading) {
        div.innerHTML = `
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
            <forge-skeleton width="48px" height="48px" shape="circle"></forge-skeleton>
            <div style="flex: 1;">
              <forge-skeleton width="120px" height="16px" style="margin-bottom: 8px;"></forge-skeleton>
              <forge-skeleton width="80px" height="14px"></forge-skeleton>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <forge-skeleton width="100%" height="16px"></forge-skeleton>
            <forge-skeleton width="85%" height="16px"></forge-skeleton>
            <forge-skeleton width="92%" height="16px"></forge-skeleton>
            <forge-skeleton width="78%" height="16px"></forge-skeleton>
          </div>
        `;
      } else {
        div.innerHTML = `
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
            <div style="width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"></div>
            <div>
              <h3 style="margin: 0; font-size: 16px; font-weight: 600;">John Doe</h3>
              <p style="margin: 0; font-size: 14px; color: var(--forge-color-text-secondary, #6b7280);">Software Engineer</p>
            </div>
          </div>
          <p style="margin: 0; line-height: 1.6; color: var(--forge-color-text, #1f2937);">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        `;
      }
      
      return div;
    };
    
    return html`
      <div>
        <div style="margin-bottom: 20px;">
          <forge-button @click=${toggleLoading} variant="primary">
            ${isLoading ? 'Show Content' : 'Show Loading'}
          </forge-button>
        </div>
        
        <div 
          id="demo-container" 
          style="border: 1px solid var(--forge-color-border, #e5e7eb); border-radius: 8px; padding: 16px; background: var(--forge-color-background, #ffffff);"
        >
          ${renderContent()}
        </div>
        
        <p style="margin-top: 16px; font-size: 14px; color: var(--forge-color-text-secondary, #6b7280);">
          Click the button above to toggle between loading skeletons and actual content.
        </p>
      </div>
    `;
  }
};