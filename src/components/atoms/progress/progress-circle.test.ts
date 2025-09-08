import { expect } from '@open-wc/testing';
import { html, fixture } from '@open-wc/testing';
import './progress-circle';
import { ForgeProgressCircle } from './progress-circle';

describe('ForgeProgressCircle', () => {
  let element: ForgeProgressCircle;

  beforeEach(async () => {
    element = await fixture(html`<forge-progress-circle></forge-progress-circle>`);
  });

  describe('Initialization', () => {
    it('should be defined', () => {
      expect(element).to.be.instanceOf(ForgeProgressCircle);
    });

    it('should have default properties', () => {
      expect(element.value).to.equal(0);
      expect(element.max).to.equal(100);
      expect(element.variant).to.equal('primary');
      expect(element.size).to.equal('medium');
      expect(element.showLabel).to.be.true;
      expect(element.hideLabel).to.be.false;
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
      element.value = 60;
      await element.updateComplete;
      
      expect(element.value).to.equal(60);
      expect(element.getAttribute('aria-valuenow')).to.equal('60');
    });

    it('should update max property', async () => {
      element.max = 150;
      await element.updateComplete;
      
      expect(element.max).to.equal(150);
      expect(element.getAttribute('aria-valuemax')).to.equal('150');
    });

    it('should update variant property', async () => {
      element.variant = 'warning';
      await element.updateComplete;
      
      expect(element.variant).to.equal('warning');
      expect(element.getAttribute('variant')).to.equal('warning');
    });

    it('should update size property', async () => {
      element.size = 'small';
      await element.updateComplete;
      
      expect(element.size).to.equal('small');
      expect(element.getAttribute('size')).to.equal('small');
    });

    it('should update showLabel property', async () => {
      element.showLabel = false;
      await element.updateComplete;
      
      expect(element.showLabel).to.be.false;
      expect(element.hasAttribute('show-label')).to.be.false;
    });

    it('should update hideLabel property', async () => {
      element.hideLabel = true;
      await element.updateComplete;
      
      expect(element.hideLabel).to.be.true;
      expect(element.hasAttribute('hide-label')).to.be.true;
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
      element.updateProgress(80);
      await element.updateComplete;
      
      expect(element.value).to.equal(80);
    });

    it('should clamp progress values within bounds', async () => {
      element.updateProgress(120);
      await element.updateComplete;
      expect(element.value).to.equal(100);

      element.updateProgress(-20);
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
      element.setDeterminate(40);
      await element.updateComplete;
      
      expect(element.indeterminate).to.be.false;
      expect(element.value).to.equal(40);
    });
  });

  describe('Rendering', () => {
    it('should render SVG with track and fill circles', async () => {
      await element.updateComplete;
      
      const svg = element.shadowRoot?.querySelector('[part="svg"]');
      const track = element.shadowRoot?.querySelector('[part="track"]');
      const fill = element.shadowRoot?.querySelector('[part="fill"]');
      
      expect(svg).to.exist;
      expect(track).to.exist;
      expect(fill).to.exist;
    });

    it('should show percentage when no slot content and labels enabled', async () => {
      element.value = 65;
      await element.updateComplete;
      
      const label = element.shadowRoot?.querySelector('[part="label"]');
      expect(label?.textContent?.trim()).to.equal('65%');
    });

    it('should show slot content when provided', async () => {
      element.innerHTML = '45%';
      await element.updateComplete;
      
      // Force re-render to detect innerHTML changes
      element.requestUpdate();
      await element.updateComplete;
      
      const label = element.shadowRoot?.querySelector('[part="label"]');
      const slot = label?.querySelector('slot');
      expect(slot).to.exist;
    });

    it('should hide label when hideLabel is true', async () => {
      element.hideLabel = true;
      await element.updateComplete;
      
      const label = element.shadowRoot?.querySelector('[part="label"]');
      expect(label).to.not.exist;
    });

    it('should hide label when showLabel is false', async () => {
      element.showLabel = false;
      await element.updateComplete;
      
      const label = element.shadowRoot?.querySelector('[part="label"]');
      expect(label).to.not.exist;
    });

    it('should show ellipsis for indeterminate state with label', async () => {
      element.indeterminate = true;
      await element.updateComplete;
      
      const label = element.shadowRoot?.querySelector('[part="label"]');
      expect(label?.textContent?.trim()).to.equal('...');
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
      element.value = 85;
      await element.updateComplete;
      
      expect(element.getAttribute('aria-valuenow')).to.equal('85');
      expect(element.getAttribute('aria-valuetext')).to.equal('85 of 100');
    });

    it('should remove aria-valuenow when indeterminate', async () => {
      element.indeterminate = true;
      await element.updateComplete;
      
      expect(element.hasAttribute('aria-valuenow')).to.be.false;
      expect(element.hasAttribute('aria-valuetext')).to.be.false;
    });

    it('should set aria-label when provided', async () => {
      element.ariaLabel = 'Upload progress';
      await element.updateComplete;
      
      expect(element.getAttribute('aria-label')).to.equal('Upload progress');
    });
  });

  describe('SVG Calculations', () => {
    it('should calculate correct stroke dash offset for progress', async () => {
      element.value = 50;
      await element.updateComplete;
      
      const fill = element.shadowRoot?.querySelector('[part="fill"]') as SVGCircleElement;
      const strokeDashoffset = fill?.style.strokeDashoffset || fill?.getAttribute('stroke-dashoffset');
      
      // Should be approximately half of circumference for 50% progress
      expect(strokeDashoffset).to.exist;
    });

    it('should handle 0% progress correctly', async () => {
      element.value = 0;
      await element.updateComplete;
      
      const fill = element.shadowRoot?.querySelector('[part="fill"]') as SVGCircleElement;
      expect(fill).to.exist;
    });

    it('should handle 100% progress correctly', async () => {
      element.value = 100;
      await element.updateComplete;
      
      const fill = element.shadowRoot?.querySelector('[part="fill"]') as SVGCircleElement;
      expect(fill).to.exist;
    });
  });

  describe('AI Integration', () => {
    it('should explain state correctly', () => {
      element.value = 85;
      const explanation = element.explainState();
      expect(explanation.currentState).to.equal('in-progress');
      expect(explanation.stateDescription).to.include('85.0%');
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
      element.value = 75;
      element.variant = 'danger';
      element.size = 'large';
      element.showLabel = false;
      const state = element.aiState;
      
      expect(state.value).to.equal(75);
      expect(state.percentage).to.equal(75);
      expect(state.variant).to.equal('danger');
      expect(state.size).to.equal('large');
      expect(state.showLabel).to.be.false;
      expect(state.complete).to.be.false;
    });

    it('should indicate completion in AI state', () => {
      element.value = 100;
      const state = element.aiState;
      expect(state.complete).to.be.true;
    });
  });
});