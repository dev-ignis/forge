import { expect } from '@open-wc/testing';
import { html, fixture } from '@open-wc/testing';
import './progress';
import { ForgeProgress } from './progress';

describe('ForgeProgress', () => {
  let element: ForgeProgress;

  beforeEach(async () => {
    element = await fixture(html`<forge-progress></forge-progress>`);
  });

  describe('Initialization', () => {
    it('should be defined', () => {
      expect(element).to.be.instanceOf(ForgeProgress);
    });

    it('should have default properties', () => {
      expect(element.value).to.equal(0);
      expect(element.max).to.equal(100);
      expect(element.variant).to.equal('primary');
      expect(element.size).to.equal('medium');
      expect(element.indeterminate).to.be.false;
    });

    it('should set accessibility attributes', () => {
      expect(element.getAttribute('role')).to.equal('progressbar');
      expect(element.getAttribute('aria-valuenow')).to.equal('0');
      expect(element.getAttribute('aria-valuemin')).to.equal('0');
      expect(element.getAttribute('aria-valuemax')).to.equal('100');
    });
  });

  describe('Properties', () => {
    it('should update value property', async () => {
      element.value = 50;
      await element.updateComplete;
      
      expect(element.value).to.equal(50);
      expect(element.getAttribute('aria-valuenow')).to.equal('50');
    });

    it('should update max property', async () => {
      element.max = 200;
      await element.updateComplete;
      
      expect(element.max).to.equal(200);
      expect(element.getAttribute('aria-valuemax')).to.equal('200');
    });

    it('should update variant property', async () => {
      element.variant = 'success';
      await element.updateComplete;
      
      expect(element.variant).to.equal('success');
      expect(element.getAttribute('variant')).to.equal('success');
    });

    it('should update size property', async () => {
      element.size = 'large';
      await element.updateComplete;
      
      expect(element.size).to.equal('large');
      expect(element.getAttribute('size')).to.equal('large');
    });

    it('should update indeterminate property', async () => {
      element.indeterminate = true;
      await element.updateComplete;
      
      expect(element.indeterminate).to.be.true;
      expect(element.hasAttribute('indeterminate')).to.be.true;
      expect(element.hasAttribute('aria-valuenow')).to.be.false;
    });
  });

  describe('Methods', () => {
    it('should update progress with updateProgress method', async () => {
      element.updateProgress(75);
      await element.updateComplete;
      
      expect(element.value).to.equal(75);
    });

    it('should clamp progress values within bounds', async () => {
      element.updateProgress(150);
      await element.updateComplete;
      expect(element.value).to.equal(100);

      element.updateProgress(-10);
      await element.updateComplete;
      expect(element.value).to.equal(0);
    });

    it('should set indeterminate state', async () => {
      element.setIndeterminate();
      await element.updateComplete;
      
      expect(element.indeterminate).to.be.true;
    });

    it('should set determinate state', async () => {
      element.indeterminate = true;
      element.setDeterminate(60);
      await element.updateComplete;
      
      expect(element.indeterminate).to.be.false;
      expect(element.value).to.equal(60);
    });
  });

  describe('Rendering', () => {
    it('should render progress track and fill', async () => {
      await element.updateComplete;
      
      const track = element.shadowRoot?.querySelector('[part="track"]');
      const fill = element.shadowRoot?.querySelector('[part="fill"]');
      
      expect(track).to.exist;
      expect(fill).to.exist;
    });

    it('should show percentage when no slot content', async () => {
      element.value = 45;
      await element.updateComplete;
      
      const label = element.shadowRoot?.querySelector('[part="label"]');
      expect(label?.textContent?.trim()).to.equal('45%');
    });

    it('should show slot content when provided', async () => {
      element.innerHTML = 'Uploading file...';
      await element.updateComplete;
      
      // Force re-render to detect innerHTML changes
      element.requestUpdate();
      await element.updateComplete;
      
      const label = element.shadowRoot?.querySelector('[part="label"]');
      const slot = label?.querySelector('slot');
      expect(slot).to.exist;
    });

    it('should apply indeterminate class when indeterminate', async () => {
      element.indeterminate = true;
      await element.updateComplete;
      
      const fill = element.shadowRoot?.querySelector('.progress-fill');
      expect(fill?.classList.contains('progress-fill--indeterminate')).to.be.true;
    });
  });

  describe('Accessibility', () => {
    it('should update aria attributes when value changes', async () => {
      element.value = 75;
      await element.updateComplete;
      
      expect(element.getAttribute('aria-valuenow')).to.equal('75');
      expect(element.getAttribute('aria-valuetext')).to.equal('75 of 100');
    });

    it('should remove aria-valuenow when indeterminate', async () => {
      element.indeterminate = true;
      await element.updateComplete;
      
      expect(element.hasAttribute('aria-valuenow')).to.be.false;
      expect(element.hasAttribute('aria-valuetext')).to.be.false;
    });

    it('should set aria-label when provided', async () => {
      element.ariaLabel = 'File upload progress';
      await element.updateComplete;
      
      expect(element.getAttribute('aria-label')).to.equal('File upload progress');
    });
  });

  describe('AI Integration', () => {
    it('should explain state correctly', () => {
      element.value = 75;
      const explanation = element.explainState();
      expect(explanation.currentState).to.equal('in-progress');
      expect(explanation.stateDescription).to.include('75.0%');
      expect(explanation.possibleStates).to.include('complete');
    });

    it('should explain indeterminate state', () => {
      element.indeterminate = true;
      const explanation = element.explainState();
      expect(explanation.currentState).to.equal('indeterminate');
      expect(explanation.stateDescription).to.include('loading state');
    });

    it('should return possible actions', () => {
      const actions = element.getPossibleActions();
      expect(actions).to.be.an('array');
      expect(actions.length).to.be.greaterThan(0);
      
      const updateAction = actions.find(a => a.name === 'updateProgress');
      expect(updateAction?.available).to.be.true;
    });

    it('should return AI state', () => {
      element.value = 50;
      element.variant = 'success';
      const state = element.aiState;
      
      expect(state.value).to.equal(50);
      expect(state.percentage).to.equal(50);
      expect(state.variant).to.equal('success');
      expect(state.complete).to.be.false;
    });

    it('should indicate completion in AI state', () => {
      element.value = 100;
      const state = element.aiState;
      expect(state.complete).to.be.true;
    });
  });
});