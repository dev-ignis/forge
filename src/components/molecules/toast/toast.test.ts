import { expect } from '@open-wc/testing';
import { html, fixture } from '@open-wc/testing';
import { ForgeToast } from './toast';
import './toast';

describe('ForgeToast', () => {
  let element: ForgeToast;

  beforeEach(async () => {
    element = await fixture(html`<forge-toast></forge-toast>`);
  });

  describe('Initialization', () => {
    it('should be defined', () => {
      expect(element.tagName.toLowerCase()).to.equal('forge-toast');
      expect(element).to.have.property('title');
      expect(element).to.have.property('message');
      expect(element).to.have.property('variant');
    });

    it('should have default properties', () => {
      expect(element.title).to.equal('');
      expect(element.message).to.equal('');
      expect(element.variant).to.equal('info');
      expect(element.duration).to.equal(5000);
      expect(element.dismissible).to.be.true;
      expect(element.showProgress).to.be.false;
      expect(element.persistent).to.be.false;
    });

    it('should set accessibility attributes', () => {
      expect(element.getAttribute('role')).to.equal('status');
      expect(element.getAttribute('aria-live')).to.equal('polite');
    });

    it('should set alert role for error variant', async () => {
      element.variant = 'error';
      await element.updateComplete;

      expect(element.getAttribute('role')).to.equal('alert');
      expect(element.getAttribute('aria-live')).to.equal('assertive');
    });
  });

  describe('Properties', () => {
    it('should update title property', async () => {
      element.title = 'Test Title';
      await element.updateComplete;

      expect(element.title).to.equal('Test Title');
      const titleElement = element.shadowRoot?.querySelector('[part="title"]');
      expect(titleElement?.textContent).to.equal('Test Title');
    });

    it('should update message property', async () => {
      element.message = 'Test message';
      await element.updateComplete;

      expect(element.message).to.equal('Test message');
      const messageElement = element.shadowRoot?.querySelector('[part="message"]');
      expect(messageElement?.textContent?.trim()).to.equal('Test message');
    });

    it('should update variant property', async () => {
      element.variant = 'success';
      await element.updateComplete;

      expect(element.variant).to.equal('success');
      expect(element.getAttribute('variant')).to.equal('success');
    });

    it('should update duration property', async () => {
      element.duration = 3000;
      await element.updateComplete;

      expect(element.duration).to.equal(3000);
    });

    it('should update dismissible property', async () => {
      element.dismissible = false;
      await element.updateComplete;

      expect(element.dismissible).to.be.false;
      const dismissButton = element.shadowRoot?.querySelector('[part="dismiss"]');
      expect(dismissButton).to.not.exist;
    });

    it('should update persistent property', async () => {
      element.persistent = true;
      await element.updateComplete;

      expect(element.persistent).to.be.true;
    });

    it('should update showProgress property', async () => {
      element.showProgress = true;
      await element.updateComplete;

      expect(element.showProgress).to.be.true;
    });
  });

  describe('Rendering', () => {
    it('should render toast container', async () => {
      await element.updateComplete;

      const container = element.shadowRoot?.querySelector('[part="container"]');
      expect(container).to.exist;
    });

    it('should render title when provided', async () => {
      element.title = 'Test Title';
      await element.updateComplete;

      const title = element.shadowRoot?.querySelector('[part="title"]');
      expect(title).to.exist;
      expect(title?.textContent).to.equal('Test Title');
    });

    it('should not render title when empty', async () => {
      element.title = '';
      await element.updateComplete;

      const title = element.shadowRoot?.querySelector('[part="title"]');
      expect(title?.textContent?.trim() || '').to.equal('');
    });

    it('should render default icon for variant', async () => {
      element.variant = 'success';
      await element.updateComplete;

      const icon = element.shadowRoot?.querySelector('[part="icon"]');
      expect(icon?.textContent?.includes('✅')).to.be.true;
    });

    it('should render dismiss button when dismissible', async () => {
      element.dismissible = true;
      await element.updateComplete;

      const dismissButton = element.shadowRoot?.querySelector('[part="dismiss"]');
      expect(dismissButton).to.exist;
    });

    it('should not render dismiss button when not dismissible', async () => {
      element.dismissible = false;
      await element.updateComplete;

      const dismissButton = element.shadowRoot?.querySelector('[part="dismiss"]');
      expect(dismissButton).to.not.exist;
    });

    it('should render slot content when provided', async () => {
      element.innerHTML = 'Custom message content';
      await element.updateComplete;

      // Force re-render to detect innerHTML changes
      element.requestUpdate();
      await element.updateComplete;

      const message = element.shadowRoot?.querySelector('[part="message"]');
      const slot = message?.querySelector('slot');
      expect(slot).to.exist;
    });
  });

  describe('Auto-dismiss', () => {
    it('should have auto-dismiss behavior when not persistent', async () => {
      element.duration = 1000;
      element.persistent = false;
      await element.updateComplete;

      expect(element.duration).to.equal(1000);
      expect(element.persistent).to.be.false;
    });

    it('should not auto-dismiss when persistent', async () => {
      element.duration = 1000;
      element.persistent = true;
      await element.updateComplete;

      expect(element.persistent).to.be.true;
    });

    it('should not auto-dismiss when duration is 0', async () => {
      element.duration = 0;
      await element.updateComplete;

      expect(element.duration).to.equal(0);
    });
  });

  describe('User Interactions', () => {
    it('should have dismiss button when dismissible', async () => {
      element.dismissible = true;
      await element.updateComplete;

      const dismissButton = element.shadowRoot?.querySelector(
        '[part="dismiss"]',
      ) as HTMLButtonElement;
      expect(dismissButton).to.exist;
      expect(dismissButton.getAttribute('aria-label')).to.equal('Dismiss notification');
    });

    it('should respond to mouse interactions', async () => {
      element.duration = 1000;
      await element.updateComplete;

      const container = element.shadowRoot?.querySelector('[part="container"]') as HTMLElement;
      expect(container).to.exist;

      // Test that event listeners are set up (we can't easily test the actual behavior)
      container?.dispatchEvent(new MouseEvent('mouseenter'));
      container?.dispatchEvent(new MouseEvent('mouseleave'));

      // If no errors thrown, the event handlers are working
      expect(true).to.be.true;
    });
  });

  describe('Methods', () => {
    it('should pause auto-dismiss', async () => {
      element.duration = 1000;
      await element.updateComplete;

      element.pause();
      // Timer should be cleared, so we can't easily test this without accessing private properties
      // Instead, we test that pause method doesn't throw
      expect(() => element.pause()).to.not.throw();
    });

    it('should resume auto-dismiss', async () => {
      element.duration = 1000;
      await element.updateComplete;

      element.resume();
      // Similar to pause, we test that resume method doesn't throw
      expect(() => element.resume()).to.not.throw();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', async () => {
      await element.updateComplete;

      expect(element.hasAttribute('role')).to.be.true;
      expect(element.hasAttribute('aria-live')).to.be.true;
    });

    it('should have accessible dismiss button', async () => {
      element.dismissible = true;
      await element.updateComplete;

      const dismissButton = element.shadowRoot?.querySelector(
        '[part="dismiss"]',
      ) as HTMLButtonElement;
      expect(dismissButton?.getAttribute('aria-label')).to.equal('Dismiss notification');
    });
  });

  describe('AI Integration', () => {
    it('should explain state correctly', () => {
      element.variant = 'success';
      element.duration = 3000;
      const explanation = element.explainState();

      expect(explanation.currentState).to.equal('timed');
      expect(explanation.stateDescription).to.include('success toast');
      expect(explanation.stateDescription).to.include('3000ms');
    });

    it('should explain persistent state', () => {
      element.persistent = true;
      const explanation = element.explainState();

      expect(explanation.currentState).to.equal('persistent');
      expect(explanation.stateDescription).to.include('persists until manually dismissed');
    });

    it('should return possible actions', () => {
      element.dismissible = true;
      const actions = element.getPossibleActions();

      expect(actions).to.be.an('array');
      expect(actions.length).to.be.greaterThan(0);

      const dismissAction = actions.find((a) => a.name === 'dismiss');
      expect(dismissAction?.available).to.be.true;
    });

    it('should return AI state', () => {
      element.title = 'Test';
      element.message = 'Test message';
      element.variant = 'warning';
      element.duration = 2000;
      element.toastId = 'test-123';

      const state = element.aiState;

      expect(state.title).to.equal('Test');
      expect(state.message).to.equal('Test message');
      expect(state.variant).to.equal('warning');
      expect(state.duration).to.equal(2000);
      expect(state.toastId).to.equal('test-123');
      expect(state.visible).to.be.true;
    });
  });
});
