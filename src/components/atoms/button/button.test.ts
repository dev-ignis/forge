import { fixture, expect, html } from '@open-wc/testing';
import './button';
import type { ForgeButton } from './button';

describe('ForgeButton', () => {
  describe('Basic Rendering', () => {
    it('should render with default slot content', async () => {
      const el = await fixture<ForgeButton>(html`
        <forge-button>Click me</forge-button>
      `);
      
      expect(el).to.exist;
      expect(el.textContent).to.include('Click me');
    });

    it('should have default properties', async () => {
      const el = await fixture<ForgeButton>(html`
        <forge-button></forge-button>
      `);
      
      expect(el.variant).to.equal('primary');
      expect(el.size).to.equal('md');
      expect(el.disabled).to.be.false;
      expect(el.loading).to.be.false;
    });

    it('should accept variant property', async () => {
      const el = await fixture<ForgeButton>(html`
        <forge-button variant="secondary">Secondary</forge-button>
      `);
      
      expect(el.variant).to.equal('secondary');
    });

    it('should accept size property', async () => {
      const el = await fixture<ForgeButton>(html`
        <forge-button size="lg">Large Button</forge-button>
      `);
      
      expect(el.size).to.equal('lg');
    });
  });

  describe('Disabled State', () => {
    it('should handle disabled attribute', async () => {
      const el = await fixture<ForgeButton>(html`
        <forge-button disabled>Disabled</forge-button>
      `);
      
      expect(el.disabled).to.be.true;
      expect(el.hasAttribute('disabled')).to.be.true;
    });

    it('should not emit events when disabled', async () => {
      const el = await fixture<ForgeButton>(html`
        <forge-button disabled>Disabled</forge-button>
      `);
      
      let eventFired = false;
      el.addEventListener('click', () => {
        eventFired = true;
      });
      
      // Click the actual button element inside shadow DOM
      const button = el.shadowRoot?.querySelector('button');
      button?.click();
      
      expect(eventFired).to.be.false;
    });
  });

  describe('Loading State', () => {
    it('should handle loading property', async () => {
      const el = await fixture<ForgeButton>(html`
        <forge-button loading>Loading</forge-button>
      `);
      
      expect(el.loading).to.be.true;
      
      // Check if spinner is rendered
      const spinner = el.shadowRoot?.querySelector('.spinner');
      expect(spinner).to.exist;
    });

    it('should be disabled when loading', async () => {
      const el = await fixture<ForgeButton>(html`
        <forge-button loading>Loading</forge-button>
      `);
      
      let eventFired = false;
      el.addEventListener('click', () => {
        eventFired = true;
      });
      
      // Click the actual button element inside shadow DOM
      const button = el.shadowRoot?.querySelector('button');
      button?.click();
      
      expect(eventFired).to.be.false;
    });
  });

  describe('Events', () => {
    it('should emit click event on click', async () => {
      const el = await fixture<ForgeButton>(html`
        <forge-button>Click me</forge-button>
      `);
      
      let eventDetail = null;
      el.addEventListener('click', (e: Event) => {
        // Check if it's the custom event with detail
        if ('detail' in e && (e as CustomEvent).detail) {
          eventDetail = (e as CustomEvent).detail;
        }
      });
      
      // Click the actual button element inside shadow DOM to trigger handleClick
      const button = el.shadowRoot?.querySelector('button');
      button?.click();
      
      expect(eventDetail).to.deep.equal({
        variant: 'primary',
        size: 'md'
      });
    });
  });

  describe('Styling', () => {
    it('should apply correct CSS classes for variants', async () => {
      const el = await fixture<ForgeButton>(html`
        <forge-button variant="danger">Danger</forge-button>
      `);
      
      const button = el.shadowRoot?.querySelector('.button');
      expect(button?.classList.contains('button--danger')).to.be.true;
    });

    it('should apply correct CSS classes for sizes', async () => {
      const el = await fixture<ForgeButton>(html`
        <forge-button size="sm">Small</forge-button>
      `);
      
      const button = el.shadowRoot?.querySelector('.button');
      expect(button?.classList.contains('button--sm')).to.be.true;
    });

    it('should have disabled attribute when disabled', async () => {
      const el = await fixture<ForgeButton>(html`
        <forge-button disabled>Disabled</forge-button>
      `);
      
      const button = el.shadowRoot?.querySelector('button');
      expect(button?.hasAttribute('disabled')).to.be.true;
      expect(button?.getAttribute('aria-disabled')).to.equal('true');
    });
  });
});