import { expect } from '@open-wc/testing';
import { html, fixture } from '@open-wc/testing';
import { ForgeAspectRatio } from './aspect-ratio';
import './aspect-ratio';

describe('ForgeAspectRatio', () => {
  let element: ForgeAspectRatio;

  beforeEach(async () => {
    element = await fixture(html`<forge-aspect-ratio></forge-aspect-ratio>`);
  });

  describe('Initialization', () => {
    it('should be defined', () => {
      expect(element.tagName.toLowerCase()).to.equal('forge-aspect-ratio');
      expect(element).to.have.property('ratio');
      expect(element).to.have.property('value');
      expect(element).to.have.property('maxWidth');
      expect(element).to.have.property('maxHeight');
    });

    it('should have default properties', () => {
      expect(element.ratio).to.equal('16:9');
      expect(element.value).to.equal(0);
      expect(element.maxWidth).to.equal('');
      expect(element.maxHeight).to.equal('');
      expect(element.center).to.be.true;
      expect(element.objectFit).to.equal('cover');
    });

    it('should set accessibility attributes', () => {
      expect(element.getAttribute('role')).to.equal('presentation');
    });

    it('should set default aspect ratio CSS properties', () => {
      expect(element.style.getPropertyValue('--forge-aspect-ratio')).to.exist;
      expect(element.style.getPropertyValue('--forge-aspect-ratio-padding')).to.equal('56.25%');
    });
  });

  describe('Properties', () => {
    it('should update ratio property', async () => {
      element.ratio = '4:3';
      await element.updateComplete;
      
      expect(element.ratio).to.equal('4:3');
      expect(element.getAttribute('ratio')).to.equal('4:3');
      expect(element.style.getPropertyValue('--forge-aspect-ratio-padding')).to.equal('75%');
    });

    it('should update value property', async () => {
      element.value = 2;
      await element.updateComplete;
      
      expect(element.value).to.equal(2);
      expect(element.style.getPropertyValue('--forge-aspect-ratio-padding')).to.equal('50%');
    });

    it('should update maxWidth property', async () => {
      element.maxWidth = '500px';
      await element.updateComplete;
      
      expect(element.maxWidth).to.equal('500px');
      expect(element.style.maxWidth).to.equal('500px');
    });

    it('should update maxHeight property', async () => {
      element.maxHeight = '300px';
      await element.updateComplete;
      
      expect(element.maxHeight).to.equal('300px');
      expect(element.style.maxHeight).to.equal('300px');
    });

    it('should update center property', async () => {
      element.center = false;
      await element.updateComplete;
      
      expect(element.center).to.be.false;
    });

    it('should update objectFit property', async () => {
      element.objectFit = 'contain';
      await element.updateComplete;
      
      expect(element.objectFit).to.equal('contain');
    });
  });

  describe('Rendering', () => {
    it('should render aspect ratio container', async () => {
      await element.updateComplete;
      
      const container = element.shadowRoot?.querySelector('[part="container"]');
      expect(container).to.exist;
      expect(container?.classList.contains('aspect-ratio-container')).to.be.true;
    });

    it('should render content wrapper', async () => {
      await element.updateComplete;
      
      const content = element.shadowRoot?.querySelector('[part="content"]');
      expect(content).to.exist;
      expect(content?.classList.contains('aspect-ratio-content')).to.be.true;
    });

    it('should render slot for content', async () => {
      await element.updateComplete;
      
      const slot = element.shadowRoot?.querySelector('slot');
      expect(slot).to.exist;
    });
  });

  describe('Aspect Ratio Calculations', () => {
    it('should calculate 16:9 aspect ratio correctly', () => {
      element.ratio = '16:9';
      const aspectRatio = element.getAspectRatio();
      expect(aspectRatio).to.be.closeTo(1.778, 0.001);
    });

    it('should calculate 4:3 aspect ratio correctly', () => {
      element.ratio = '4:3';
      const aspectRatio = element.getAspectRatio();
      expect(aspectRatio).to.be.closeTo(1.333, 0.001);
    });

    it('should calculate 1:1 aspect ratio correctly', () => {
      element.ratio = '1:1';
      const aspectRatio = element.getAspectRatio();
      expect(aspectRatio).to.equal(1);
    });

    it('should use custom value over ratio string', () => {
      element.ratio = '16:9';
      element.value = 2.5;
      const aspectRatio = element.getAspectRatio();
      expect(aspectRatio).to.equal(2.5);
    });

    it('should calculate padding-bottom correctly', () => {
      element.ratio = '4:3';
      const padding = element.getPaddingBottom();
      expect(padding).to.equal('75%');
    });
  });

  describe('Preset Ratios', () => {
    const testCases = [
      { ratio: '1:1', expectedPadding: '100%' },
      { ratio: '16:9', expectedPadding: '56.25%' },
      { ratio: '4:3', expectedPadding: '75%' },
      { ratio: '3:2', expectedPadding: '66.67%' },
      { ratio: '21:9', expectedPadding: '42.86%' },
      { ratio: '2:1', expectedPadding: '50%' },
      { ratio: '3:4', expectedPadding: '133.33%' },
      { ratio: '9:16', expectedPadding: '177.78%' }
    ];

    testCases.forEach(({ ratio, expectedPadding }) => {
      it(`should handle ${ratio} preset correctly`, async () => {
        element.ratio = ratio;
        await element.updateComplete;
        
        expect(element.ratio).to.equal(ratio);
        expect(element.getAttribute('ratio')).to.equal(ratio);
        
        const calculatedPadding = element.getPaddingBottom();
        const expectedValue = parseFloat(expectedPadding);
        const actualValue = parseFloat(calculatedPadding);
        expect(actualValue).to.be.closeTo(expectedValue, 0.01);
      });
    });
  });

  describe('Invalid Ratios', () => {
    it('should handle invalid ratio strings', () => {
      const consoleSpy = console.warn;
      console.warn = () => {}; // Suppress warning for test
      
      element.ratio = 'invalid';
      const aspectRatio = element.getAspectRatio();
      
      // Should fallback to 16:9
      expect(aspectRatio).to.be.closeTo(1.778, 0.001);
      
      console.warn = consoleSpy;
    });

    it('should handle ratio with zero values', () => {
      const consoleSpy = console.warn;
      console.warn = () => {}; // Suppress warning for test
      
      element.ratio = '0:9';
      const aspectRatio = element.getAspectRatio();
      
      // Should fallback to 16:9
      expect(aspectRatio).to.be.closeTo(1.778, 0.001);
      
      console.warn = consoleSpy;
    });

    it('should handle ratio with negative values', () => {
      const consoleSpy = console.warn;
      console.warn = () => {}; // Suppress warning for test
      
      element.ratio = '-4:3';
      const aspectRatio = element.getAspectRatio();
      
      // Should fallback to 16:9
      expect(aspectRatio).to.be.closeTo(1.778, 0.001);
      
      console.warn = consoleSpy;
    });
  });

  describe('Methods', () => {
    it('should set ratio from width and height', async () => {
      element.setRatio(4, 3);
      await element.updateComplete;
      
      expect(element.ratio).to.equal('4:3');
      expect(element.getAspectRatio()).to.be.closeTo(1.333, 0.001);
    });

    it('should ignore invalid setRatio parameters', () => {
      const originalRatio = element.ratio;
      
      element.setRatio(0, 3);
      expect(element.ratio).to.equal(originalRatio);
      
      element.setRatio(4, 0);
      expect(element.ratio).to.equal(originalRatio);
      
      element.setRatio(-4, 3);
      expect(element.ratio).to.equal(originalRatio);
    });
  });

  describe('Constraints', () => {
    it('should apply max-width constraint', async () => {
      element.maxWidth = '400px';
      await element.updateComplete;
      
      expect(element.style.maxWidth).to.equal('400px');
    });

    it('should apply max-height constraint', async () => {
      element.maxHeight = '200px';
      await element.updateComplete;
      
      expect(element.style.maxHeight).to.equal('200px');
    });

    it('should remove constraints when cleared', async () => {
      element.maxWidth = '400px';
      element.maxHeight = '200px';
      await element.updateComplete;
      
      element.maxWidth = '';
      element.maxHeight = '';
      await element.updateComplete;
      
      expect(element.style.maxWidth).to.equal('');
      expect(element.style.maxHeight).to.equal('');
    });
  });

  describe('CSS Custom Properties', () => {
    it('should set aspect ratio CSS properties correctly', async () => {
      element.ratio = '4:3';
      await element.updateComplete;
      
      expect(element.style.getPropertyValue('--forge-aspect-ratio-padding')).to.equal('75%');
    });

    it('should update CSS properties when ratio changes', async () => {
      element.ratio = '16:9';
      await element.updateComplete;
      expect(element.style.getPropertyValue('--forge-aspect-ratio-padding')).to.equal('56.25%');
      
      element.ratio = '1:1';
      await element.updateComplete;
      expect(element.style.getPropertyValue('--forge-aspect-ratio-padding')).to.equal('100%');
    });

    it('should use custom value for CSS properties', async () => {
      element.value = 2; // 2:1 aspect ratio
      await element.updateComplete;
      
      expect(element.style.getPropertyValue('--forge-aspect-ratio-padding')).to.equal('50%');
    });
  });

  describe('Accessibility', () => {
    it('should have proper role attribute', () => {
      expect(element.getAttribute('role')).to.equal('presentation');
    });

    it('should maintain accessibility after property changes', async () => {
      element.ratio = '4:3';
      element.maxWidth = '500px';
      await element.updateComplete;
      
      expect(element.getAttribute('role')).to.equal('presentation');
    });
  });

  describe('AI Integration', () => {
    it('should explain preset state correctly', () => {
      element.ratio = '4:3';
      element.value = 0;
      
      const explanation = element.explainState();
      
      expect(explanation.currentState).to.equal('preset');
      expect(explanation.stateDescription).to.include('Preset aspect ratio');
      expect(explanation.stateDescription).to.include('4:3');
      expect(explanation.stateDescription).to.include('1.33');
    });

    it('should explain custom state correctly', () => {
      element.value = 2.5;
      
      const explanation = element.explainState();
      
      expect(explanation.currentState).to.equal('custom');
      expect(explanation.stateDescription).to.include('Custom aspect ratio');
      expect(explanation.stateDescription).to.include('2.50');
    });

    it('should return possible states', () => {
      const explanation = element.explainState();
      
      expect(explanation.possibleStates).to.include('preset');
      expect(explanation.possibleStates).to.include('custom');
    });

    it('should return possible actions', () => {
      const actions = element.getPossibleActions();
      
      expect(actions).to.be.an('array');
      expect(actions.length).to.be.greaterThan(0);
      
      const setRatioAction = actions.find(a => a.name === 'setRatio');
      expect(setRatioAction?.available).to.be.true;
      expect(setRatioAction?.description).to.include('width and height');
      
      const constraintsAction = actions.find(a => a.name === 'updateConstraints');
      expect(constraintsAction?.available).to.be.true;
      
      const getAction = actions.find(a => a.name === 'getAspectRatio');
      expect(getAction?.available).to.be.true;
    });

    it('should return AI state', () => {
      element.ratio = '4:3';
      element.value = 0;
      element.maxWidth = '500px';
      element.maxHeight = '300px';
      element.center = false;
      element.objectFit = 'contain';
      
      const state = element.aiState;
      
      expect(state.ratio).to.equal('4:3');
      expect(state.value).to.equal(0);
      expect(state.calculatedAspectRatio).to.be.closeTo(1.333, 0.001);
      expect(state.calculatedPadding).to.equal('75%');
      expect(state.dimensions).to.exist;
      expect(state.dimensions.width).to.equal(4);
      expect(state.dimensions.height).to.equal(3);
      expect(state.maxWidth).to.equal('500px');
      expect(state.maxHeight).to.equal('300px');
      expect(state.center).to.be.false;
      expect(state.objectFit).to.equal('contain');
      expect(state.supportsNativeAspectRatio).to.be.a('boolean');
    });
  });

  describe('Edge Cases', () => {
    it('should handle decimal ratios', () => {
      element.ratio = '1.5:1';
      const aspectRatio = element.getAspectRatio();
      expect(aspectRatio).to.equal(1.5);
    });

    it('should handle large numbers in ratios', () => {
      element.ratio = '1920:1080';
      const aspectRatio = element.getAspectRatio();
      expect(aspectRatio).to.be.closeTo(1.778, 0.001);
    });

    it('should handle ratios with spaces', () => {
      element.ratio = ' 16 : 9 ';
      const aspectRatio = element.getAspectRatio();
      expect(aspectRatio).to.be.closeTo(1.778, 0.001);
    });

    it('should handle empty ratio string', () => {
      const consoleSpy = console.warn;
      console.warn = () => {}; // Suppress warning for test
      
      element.ratio = '';
      const aspectRatio = element.getAspectRatio();
      
      // Should fallback to 16:9
      expect(aspectRatio).to.be.closeTo(1.778, 0.001);
      
      console.warn = consoleSpy;
    });

    it('should handle very small aspect ratios', () => {
      element.value = 0.1; // Very tall/narrow
      const aspectRatio = element.getAspectRatio();
      expect(aspectRatio).to.equal(0.1);
    });

    it('should handle very large aspect ratios', () => {
      element.value = 10; // Very wide
      const aspectRatio = element.getAspectRatio();
      expect(aspectRatio).to.equal(10);
    });
  });

  describe('Performance', () => {
    it('should only update CSS properties when ratio changes', async () => {
      const initialPadding = element.style.getPropertyValue('--forge-aspect-ratio-padding');
      
      // Change unrelated property
      element.center = false;
      await element.updateComplete;
      
      // Padding should remain the same
      expect(element.style.getPropertyValue('--forge-aspect-ratio-padding')).to.equal(initialPadding);
    });

    it('should handle rapid property changes efficiently', async () => {
      element.ratio = '4:3';
      element.value = 2;
      element.maxWidth = '500px';
      element.maxHeight = '300px';
      element.objectFit = 'contain';
      
      await element.updateComplete;
      
      expect(element.ratio).to.equal('4:3');
      expect(element.value).to.equal(2);
      expect(element.maxWidth).to.equal('500px');
      expect(element.maxHeight).to.equal('300px');
      expect(element.objectFit).to.equal('contain');
    });
  });
});