import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './aspect-ratio';

const meta: Meta = {
  title: 'Components/Atoms/AspectRatio',
  component: 'forge-aspect-ratio',
  parameters: {
    docs: {
      description: {
        component: 'Aspect ratio component that maintains consistent proportions for content. Essential for responsive design and media containers. Supports common presets and custom ratios.'
      }
    }
  },
  argTypes: {
    ratio: {
      control: { type: 'select' },
      options: ['1:1', '16:9', '4:3', '3:2', '21:9', '2:1', '3:4', '9:16'],
      description: 'Aspect ratio preset (width:height)'
    },
    value: {
      control: { type: 'number', min: 0.1, max: 10, step: 0.1 },
      description: 'Custom aspect ratio value (overrides ratio string)'
    },
    maxWidth: {
      control: { type: 'text' },
      description: 'Maximum width constraint (CSS value)'
    },
    maxHeight: {
      control: { type: 'text' },
      description: 'Maximum height constraint (CSS value)'
    },
    center: {
      control: { type: 'boolean' },
      description: 'Whether to center content within the container'
    },
    objectFit: {
      control: { type: 'select' },
      options: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      description: 'Object fit behavior for media content'
    }
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    ratio: '16:9',
    value: 0,
    maxWidth: '',
    maxHeight: '',
    center: true,
    objectFit: 'cover'
  },
  render: (args) => html`
    <forge-aspect-ratio
      ratio=${args.ratio}
      value=${args.value || undefined}
      max-width=${args.maxWidth || undefined}
      max-height=${args.maxHeight || undefined}
      ?center=${args.center}
      object-fit=${args.objectFit}
      style="max-width: 400px; border: 2px dashed #ccc;"
    >
      <div style="
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 600;
        font-size: 18px;
        border-radius: 8px;
      ">
        ${args.ratio} Content
      </div>
    </forge-aspect-ratio>
  `
};

export const CommonRatios: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px;">
      ${['1:1', '16:9', '4:3', '3:2', '21:9', '2:1'].map(ratio => html`
        <div>
          <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: var(--forge-color-text, #1f2937);">${ratio}</h4>
          <forge-aspect-ratio ratio=${ratio} style="border: 1px solid var(--forge-color-border, #e5e7eb); border-radius: 8px; overflow: hidden;">
            <div style="
              width: 100%;
              height: 100%;
              background: linear-gradient(45deg, #f3f4f6 25%, transparent 25%), 
                         linear-gradient(-45deg, #f3f4f6 25%, transparent 25%), 
                         linear-gradient(45deg, transparent 75%, #f3f4f6 75%), 
                         linear-gradient(-45deg, transparent 75%, #f3f4f6 75%);
              background-size: 20px 20px;
              background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: 600;
              color: var(--forge-color-text, #1f2937);
            ">
              ${ratio}
            </div>
          </forge-aspect-ratio>
        </div>
      `)}
    </div>
  `
};

export const MediaContent: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 32px; max-width: 800px;">
      <div>
        <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600;">Video Content (16:9)</h3>
        <forge-aspect-ratio ratio="16:9" style="border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">
          <div style="
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: white;
            gap: 12px;
          ">
            <div style="
              width: 60px;
              height: 60px;
              border: 3px solid white;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 24px;
            ">▶</div>
            <span style="font-size: 16px; font-weight: 500;">Video Player</span>
            <span style="font-size: 14px; opacity: 0.8;">1920 × 1080</span>
          </div>
        </forge-aspect-ratio>
      </div>
      
      <div>
        <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600;">Photo Gallery (4:3)</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
          ${Array.from({ length: 4 }, (_, i) => html`
            <forge-aspect-ratio ratio="4:3" style="border-radius: 8px; overflow: hidden;">
              <div style="
                width: 100%;
                height: 100%;
                background: linear-gradient(${45 + i * 90}deg, 
                  ${['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'][i]} 0%, 
                  ${['#feca57', '#ff9ff3', '#54a0ff', '#dda0dd'][i]} 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: 600;
                font-size: 16px;
              ">
                Photo ${i + 1}
              </div>
            </forge-aspect-ratio>
          `)}
        </div>
      </div>
      
      <div>
        <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600;">Profile Cards (1:1)</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 16px;">
          ${Array.from({ length: 3 }, (_, i) => html`
            <forge-aspect-ratio ratio="1:1" style="border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgb(0 0 0 / 0.1);">
              <div style="
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, 
                  ${['#667eea', '#f093fb', '#4facfe'][i]} 0%, 
                  ${['#764ba2', '#f093fb', '#00f2fe'][i]} 100%);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                color: white;
                text-align: center;
                padding: 16px;
                gap: 8px;
              ">
                <div style="
                  width: 48px;
                  height: 48px;
                  background: rgba(255, 255, 255, 0.2);
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 20px;
                ">${['👨‍💻', '👩‍🎨', '👨‍🔬'][i]}</div>
                <span style="font-weight: 600; font-size: 14px;">User ${i + 1}</span>
                <span style="font-size: 12px; opacity: 0.9;">Designer</span>
              </div>
            </forge-aspect-ratio>
          `)}
        </div>
      </div>
    </div>
  `
};

export const CustomRatios: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px; max-width: 600px;">
      <div>
        <h4 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">Custom Numeric Value (2.5:1)</h4>
        <forge-aspect-ratio value="2.5" style="border: 1px solid var(--forge-color-border, #e5e7eb); border-radius: 8px;">
          <div style="
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            color: #333;
          ">
            Custom 2.5:1 Ratio
          </div>
        </forge-aspect-ratio>
      </div>
      
      <div>
        <h4 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">Ultra-wide Banner (21:9)</h4>
        <forge-aspect-ratio ratio="21:9" style="border-radius: 8px; overflow: hidden;">
          <div style="
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 600;
            font-size: 18px;
          ">
            Ultra-wide Content
          </div>
        </forge-aspect-ratio>
      </div>
      
      <div>
        <h4 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">Portrait Mobile (9:16)</h4>
        <forge-aspect-ratio ratio="9:16" style="max-width: 200px; border-radius: 12px; overflow: hidden; margin: 0 auto;">
          <div style="
            width: 100%;
            height: 100%;
            background: linear-gradient(180deg, #ff6b6b 0%, #4ecdc4 100%);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 600;
            text-align: center;
            padding: 16px;
            gap: 12px;
          ">
            <div style="font-size: 32px;">📱</div>
            <span>Mobile Portrait</span>
            <span style="font-size: 14px; opacity: 0.9;">9:16 Aspect</span>
          </div>
        </forge-aspect-ratio>
      </div>
    </div>
  `
};

export const WithConstraints: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 32px;">
      <div>
        <h4 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600;">Maximum Width Constraint</h4>
        <forge-aspect-ratio 
          ratio="16:9" 
          max-width="400px"
          style="border: 2px dashed #3b82f6; border-radius: 8px;"
        >
          <div style="
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 600;
            text-align: center;
            gap: 8px;
          ">
            <span>Max Width: 400px</span>
            <span style="font-size: 14px; opacity: 0.9;">Responsive within constraint</span>
          </div>
        </forge-aspect-ratio>
      </div>
      
      <div>
        <h4 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600;">Maximum Height Constraint</h4>
        <forge-aspect-ratio 
          ratio="4:3" 
          max-height="200px"
          style="border: 2px dashed #10b981; border-radius: 8px;"
        >
          <div style="
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 600;
            text-align: center;
            gap: 8px;
          ">
            <span>Max Height: 200px</span>
            <span style="font-size: 14px; opacity: 0.9;">Width adjusts automatically</span>
          </div>
        </forge-aspect-ratio>
      </div>
      
      <div>
        <h4 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600;">Both Width and Height Constraints</h4>
        <forge-aspect-ratio 
          ratio="1:1" 
          max-width="300px"
          max-height="300px"
          style="border: 2px dashed #f59e0b; border-radius: 8px;"
        >
          <div style="
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 600;
            text-align: center;
            gap: 8px;
          ">
            <span>Max: 300×300px</span>
            <span style="font-size: 14px; opacity: 0.9;">Square constraint</span>
          </div>
        </forge-aspect-ratio>
      </div>
    </div>
  `
};

export const RealWorldExamples: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 40px;">
      <div>
        <h3 style="margin: 0 0 20px 0; font-size: 18px; font-weight: 600;">YouTube Video Embed</h3>
        <forge-aspect-ratio ratio="16:9" style="max-width: 600px; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">
          <div style="
            width: 100%;
            height: 100%;
            background: #000;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: white;
            position: relative;
          ">
            <div style="
              position: absolute;
              top: 12px;
              left: 12px;
              background: #ff0000;
              color: white;
              padding: 2px 6px;
              border-radius: 2px;
              font-size: 12px;
              font-weight: 600;
            ">LIVE</div>
            <div style="
              width: 80px;
              height: 80px;
              background: rgba(255, 255, 255, 0.1);
              border: 2px solid white;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 32px;
              cursor: pointer;
              transition: all 0.2s;
            " @click=${() => alert('Play video!')}>▶</div>
            <p style="margin: 12px 0 0 0; font-size: 14px; opacity: 0.8;">Click to play video</p>
          </div>
        </forge-aspect-ratio>
      </div>
      
      <div>
        <h3 style="margin: 0 0 20px 0; font-size: 18px; font-weight: 600;">Instagram Post Grid</h3>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; max-width: 300px; margin: 0 auto;">
          ${Array.from({ length: 9 }, (_, i) => html`
            <forge-aspect-ratio ratio="1:1">
              <div style="
                width: 100%;
                height: 100%;
                background: linear-gradient(${i * 40}deg, 
                  hsl(${i * 40}, 70%, 60%) 0%, 
                  hsl(${(i * 40) + 60}, 70%, 50%) 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: 600;
                font-size: 12px;
                cursor: pointer;
                transition: transform 0.2s;
              " @mouseenter=${(e: Event) => (e.target as HTMLElement).style.transform = 'scale(1.05)'}
                 @mouseleave=${(e: Event) => (e.target as HTMLElement).style.transform = 'scale(1)'}>
                Post ${i + 1}
              </div>
            </forge-aspect-ratio>
          `)}
        </div>
      </div>
      
      <div>
        <h3 style="margin: 0 0 20px 0; font-size: 18px; font-weight: 600;">Product Card</h3>
        <div style="max-width: 320px; border: 1px solid var(--forge-color-border, #e5e7eb); border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgb(0 0 0 / 0.05);">
          <forge-aspect-ratio ratio="4:3">
            <div style="
              width: 100%;
              height: 100%;
              background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 48px;
            ">📱</div>
          </forge-aspect-ratio>
          <div style="padding: 16px;">
            <h4 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">Product Name</h4>
            <p style="margin: 0 0 12px 0; font-size: 14px; color: var(--forge-color-text-secondary, #6b7280); line-height: 1.4;">
              This is a sample product description that shows how the aspect ratio component works with real content.
            </p>
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <span style="font-size: 18px; font-weight: 700; color: var(--forge-color-primary, #3b82f6);">$99.99</span>
              <forge-button size="sm" variant="primary">Add to Cart</forge-button>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 style="margin: 0 0 20px 0; font-size: 18px; font-weight: 600;">Hero Banner</h3>
        <forge-aspect-ratio ratio="21:9" style="border-radius: 12px; overflow: hidden;">
          <div style="
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(147, 51, 234, 0.9) 100%),
                       url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"grain\" width=\"100\" height=\"100\" patternUnits=\"userSpaceOnUse\"><circle cx=\"50\" cy=\"50\" r=\"1\" fill=\"%23ffffff\" opacity=\"0.1\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23grain)\"/></svg>');
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: white;
            text-align: center;
            padding: 40px 20px;
            gap: 16px;
          ">
            <h1 style="margin: 0; font-size: clamp(24px, 4vw, 48px); font-weight: 800; line-height: 1.2;">
              Welcome to Our Platform
            </h1>
            <p style="margin: 0; font-size: clamp(14px, 2vw, 18px); opacity: 0.9; max-width: 600px; line-height: 1.5;">
              Discover amazing features with perfect aspect ratios that look great on any device
            </p>
            <forge-button variant="secondary" size="lg" style="margin-top: 8px;">
              Get Started
            </forge-button>
          </div>
        </forge-aspect-ratio>
      </div>
    </div>
  `
};

export const InteractiveDemo: Story = {
  render: () => {
    const ratios = ['1:1', '16:9', '4:3', '3:2', '21:9', '2:1', '3:4', '9:16'];
    let currentRatioIndex = 0;
    
    const updateRatio = () => {
      currentRatioIndex = (currentRatioIndex + 1) % ratios.length;
      const container = document.querySelector('#interactive-aspect-ratio');
      const button = document.querySelector('#ratio-button');
      
      if (container && button) {
        container.setAttribute('ratio', ratios[currentRatioIndex]);
        button.textContent = `Current: ${ratios[currentRatioIndex]} (Click for next)`;
      }
    };
    
    return html`
      <div style="max-width: 500px;">
        <div style="margin-bottom: 20px;">
          <forge-button id="ratio-button" @click=${updateRatio} variant="primary">
            Current: ${ratios[0]} (Click for next)
          </forge-button>
        </div>
        
        <forge-aspect-ratio 
          id="interactive-aspect-ratio"
          ratio="1:1" 
          style="border: 2px solid var(--forge-color-primary, #3b82f6); border-radius: 8px; transition: all 0.3s ease;"
        >
          <div style="
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, #3b82f6, #8b5cf6);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 600;
            text-align: center;
            gap: 8px;
            transition: all 0.3s ease;
          ">
            <span style="font-size: 24px;">🎭</span>
            <span id="current-ratio-text">1:1</span>
            <span style="font-size: 14px; opacity: 0.8;">Interactive Demo</span>
          </div>
        </forge-aspect-ratio>
        
        <p style="margin-top: 16px; font-size: 14px; color: var(--forge-color-text-secondary, #6b7280); text-align: center;">
          Click the button above to cycle through different aspect ratios and see how the container adapts.
        </p>
      </div>
    `;
  }
};