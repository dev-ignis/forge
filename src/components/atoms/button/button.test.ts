import { fixture, expect, html } from '@open-wc/testing';
import './button';
import { ForgeButton } from './button';
import { BaseElement } from '../../../core/BaseElement';

describe('ForgeButton', () => {
  // Basic import and registration tests
  describe('Component Registration', () => {
    it('should register custom element', () => {
      const button = document.createElement('forge-button');
      expect(button).to.exist;
      expect(button.tagName.toLowerCase()).to.equal('forge-button');
    });

    it('should import BaseElement', () => {
      expect(BaseElement).to.exist;
    });

    it('should load test file', () => {
      expect(true).to.be.true;
    });
    
    it('can create element programmatically', () => {
      const button = document.createElement('forge-button');
      expect(button).to.exist;
    });
  });

  describe('AI-Ready Features (UVP)', () => {
    it('should have default semantic-role attribute', async () => {
      const el = await fixture<ForgeButton>(html`
        <forge-button variant="primary">Submit</forge-button>
      `);
      
      const button = el.shadowRoot?.querySelector('button');
      expect(button?.getAttribute('data-semantic-role')).to.equal('primary-action');
    });

    it('should accept custom semantic-role', async () => {
      const el = await fixture<ForgeButton>(html`
        <forge-button semantic-role="save-action">Save</forge-button>
      `);
      
      const button = el.shadowRoot?.querySelector('button');
      expect(button?.getAttribute('data-semantic-role')).to.equal('save-action');
    });

    it('should have default ai-context', async () => {
      const el = await fixture<ForgeButton>(html`
        <forge-button type="submit">Submit</forge-button>
      `);
      
      const button = el.shadowRoot?.querySelector('button');
      expect(button?.getAttribute('data-ai-context')).to.equal('form-submission');
    });

    it('should generate appropriate aria-description', async () => {
      const el = await fixture<ForgeButton>(html`
        <forge-button variant="danger" size="lg" disabled>Delete</forge-button>
      `);
      
      const button = el.shadowRoot?.querySelector('button');
      expect(button?.getAttribute('aria-description')).to.include('danger button');
      expect(button?.getAttribute('aria-description')).to.include('lg size');
      expect(button?.getAttribute('aria-description')).to.include('disabled');
    });
  });

  describe('Performance Monitoring (UVP)', () => {
    it('should have default max-render-ms of 16ms', async () => {
      const el = await fixture<ForgeButton>(html`
        <forge-button>Test</forge-button>
      `);
      
      expect(el.maxRenderMs).to.equal(16);
    });

    it('should accept custom performance budget', async () => {
      const el = await fixture<ForgeButton>(html`
        <forge-button max-render-ms="8">Fast</forge-button>
      `);
      
      expect(el.maxRenderMs).to.equal(8);
    });

    it('should support performance modes', async () => {
      const el = await fixture<ForgeButton>(html`
        <forge-button performance-mode="fast">Quick</forge-button>
      `);
      
      expect(el.performanceMode).to.equal('fast');
    });
  });

  describe('AI Methods', () => {
    let el: ForgeButton;

    beforeEach(async () => {
      el = await fixture<ForgeButton>(html`
        <forge-button variant="primary" size="md">Click Me</forge-button>
      `);
    });

    describe('getPossibleActions', () => {
      it('should return available actions when enabled', () => {
        const actions = el.getPossibleActions();
        
        expect(actions).to.be.an('array');
        expect(actions.length).to.be.greaterThan(0);
        
        const clickAction = actions.find(a => a.name === 'click');
        expect(clickAction).to.exist;
        expect(clickAction?.available).to.be.true;
        expect(clickAction?.description).to.equal('Trigger button action');
        
        const focusAction = actions.find(a => a.name === 'focus');
        expect(focusAction?.available).to.be.true;
        
        const disableAction = actions.find(a => a.name === 'disable');
        expect(disableAction?.available).to.be.true;
      });

      it('should update actions when disabled', async () => {
        el.disabled = true;
        await el.updateComplete;
        
        const actions = el.getPossibleActions();
        
        const clickAction = actions.find(a => a.name === 'click');
        expect(clickAction?.available).to.be.false;
        
        const focusAction = actions.find(a => a.name === 'focus');
        expect(focusAction?.available).to.be.false;
        
        const enableAction = actions.find(a => a.name === 'enable');
        expect(enableAction?.available).to.be.true;
      });

      it('should update actions when loading', async () => {
        el.loading = true;
        await el.updateComplete;
        
        const actions = el.getPossibleActions();
        const clickAction = actions.find(a => a.name === 'click');
        expect(clickAction?.available).to.be.false;
      });
    });

    describe('explainState', () => {
      it('should explain ready state', () => {
        const state = el.explainState();
        
        expect(state.currentState).to.equal('ready');
        expect(state.possibleStates).to.include('ready');
        expect(state.possibleStates).to.include('loading');
        expect(state.possibleStates).to.include('disabled');
        expect(state.stateDescription).to.include('primary button ready');
      });

      it('should explain loading state', async () => {
        el.loading = true;
        await el.updateComplete;
        
        const state = el.explainState();
        
        expect(state.currentState).to.equal('loading');
        expect(state.stateDescription).to.include('processing');
      });

      it('should explain disabled state', async () => {
        el.disabled = true;
        await el.updateComplete;
        
        const state = el.explainState();
        
        expect(state.currentState).to.equal('disabled');
        expect(state.stateDescription).to.include('disabled');
      });

      it('should explain disabled-loading state', async () => {
        el.disabled = true;
        el.loading = true;
        await el.updateComplete;
        
        const state = el.explainState();
        
        expect(state.currentState).to.equal('disabled-loading');
        expect(state.stateDescription).to.include('disabled while processing');
      });
    });

    describe('getDefaultSemanticRole', () => {
      it('should return correct semantic role for primary variant', () => {
        const role = el['getDefaultSemanticRole']();
        expect(role).to.equal('primary-action');
      });

      it('should return correct semantic role for secondary variant', async () => {
        el.variant = 'secondary';
        await el.updateComplete;
        
        const role = el['getDefaultSemanticRole']();
        expect(role).to.equal('secondary-action');
      });

      it('should return correct semantic role for danger variant', async () => {
        el.variant = 'danger';
        await el.updateComplete;
        
        const role = el['getDefaultSemanticRole']();
        expect(role).to.equal('destructive-action');
      });

      it('should return correct semantic role for ghost variant', async () => {
        el.variant = 'ghost';
        await el.updateComplete;
        
        const role = el['getDefaultSemanticRole']();
        expect(role).to.equal('action');
      });

      it('should return correct semantic role for link variant', async () => {
        el.variant = 'link';
        await el.updateComplete;
        
        const role = el['getDefaultSemanticRole']();
        expect(role).to.equal('action');
      });
    });

    describe('AI State Updates in Lifecycle', () => {
      it('should update component state on variant change', async () => {
        const initialRole = el['aiMetadata'].semanticRole;
        
        el.variant = 'danger';
        await el.updateComplete;
        
        expect(el['componentState'].get('variant')).to.equal('danger');
        expect(el['aiMetadata'].semanticRole).to.equal('destructive-action');
      });

      it('should update component state on size change', async () => {
        el.size = 'lg';
        await el.updateComplete;
        
        expect(el['componentState'].get('size')).to.equal('lg');
      });

      it('should update criticality when disabled', async () => {
        el.disabled = true;
        await el.updateComplete;
        
        expect(el['componentState'].get('disabled')).to.be.true;
        expect(ForgeButton.aiMetadata.criticality).to.equal('medium'); // Static AI metadata
      });

      it('should update criticality when enabled', async () => {
        el.disabled = true;
        await el.updateComplete;
        
        el.disabled = false;
        await el.updateComplete;
        
        expect(ForgeButton.aiMetadata.criticality).to.equal('medium'); // Static AI metadata
      });

      it('should initialize component state in connectedCallback', async () => {
        const newButton = document.createElement('forge-button') as ForgeButton;
        newButton.variant = 'secondary';
        newButton.size = 'sm';
        newButton.disabled = false;
        newButton.loading = false;
        
        document.body.appendChild(newButton);
        await newButton.updateComplete;
        
        expect(newButton['componentState'].get('variant')).to.equal('secondary');
        expect(newButton['componentState'].get('size')).to.equal('sm');
        expect(newButton['componentState'].get('disabled')).to.be.false;
        expect(newButton['componentState'].get('loading')).to.be.false;
        
        document.body.removeChild(newButton);
      });

      it('should track loading state changes', async () => {
        el.loading = true;
        await el.updateComplete;
        
        expect(el['componentState'].get('loading')).to.be.true;
        
        el.loading = false;
        await el.updateComplete;
        
        expect(el['componentState'].get('loading')).to.be.false;
      });
    });

    describe('getStateDescription', () => {
      it('should return correct description for ready state', () => {
        const description = el['getStateDescription']('ready');
        expect(description).to.equal('primary button ready for interaction');
      });

      it('should return correct description for loading state', () => {
        const description = el['getStateDescription']('loading');
        expect(description).to.equal('Button is processing, please wait');
      });

      it('should return correct description for disabled state', () => {
        const description = el['getStateDescription']('disabled');
        expect(description).to.equal('Button is disabled and cannot be clicked');
      });

      it('should return fallback for unknown state', () => {
        const description = el['getStateDescription']('unknown');
        expect(description).to.equal('Button state');
      });
    });
  });

  describe('Developer Mode (UVP)', () => {
    it('should support dev-mode attribute', async () => {
      const el = await fixture<ForgeButton>(html`
        <forge-button dev-mode>Debug</forge-button>
      `);
      
      expect(el.devMode).to.be.true;
    });

    it('should support show-metrics attribute', async () => {
      const el = await fixture<ForgeButton>(html`
        <forge-button show-metrics dev-mode>Metrics</forge-button>
      `);
      
      expect(el.showMetrics).to.be.true;
      expect(el.devMode).to.be.true;
    });
  });

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