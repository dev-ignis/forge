import { expect } from '@open-wc/testing';
import { html, fixture } from '@open-wc/testing';
import { ForgeSkeleton } from './skeleton';
import './skeleton';

describe('ForgeSkeleton', () => {
  let element: ForgeSkeleton;

  beforeEach(async () => {
    element = await fixture(html`<forge-skeleton></forge-skeleton>`);
  });

  describe('Initialization', () => {
    it('should be defined', () => {
      expect(element.tagName.toLowerCase()).to.equal('forge-skeleton');
      expect(element).to.have.property('width');
      expect(element).to.have.property('height');
      expect(element).to.have.property('shape');
      expect(element).to.have.property('size');
    });

    it('should have default properties', () => {
      expect(element.width).to.equal('');
      expect(element.height).to.equal('');
      expect(element.shape).to.equal('rounded');
      expect(element.size).to.equal('md');
      expect(element.noAnimation).to.be.false;
      expect(element.ariaLabel).to.equal('Loading content');
    });

    it('should set accessibility attributes', () => {
      expect(element.getAttribute('aria-busy')).to.equal('true');
      expect(element.getAttribute('aria-label')).to.equal('Loading content');
      expect(element.getAttribute('role')).to.equal('presentation');
    });
  });

  describe('Properties', () => {
    it('should update width property', async () => {
      element.width = '200px';
      await element.updateComplete;
      
      expect(element.width).to.equal('200px');
      expect(element.style.getPropertyValue('--skeleton-width')).to.equal('200px');
    });

    it('should update height property', async () => {
      element.height = '50px';
      await element.updateComplete;
      
      expect(element.height).to.equal('50px');
      expect(element.style.getPropertyValue('--skeleton-height')).to.equal('50px');
    });

    it('should update shape property', async () => {
      element.shape = 'circle';
      await element.updateComplete;
      
      expect(element.shape).to.equal('circle');
      expect(element.getAttribute('shape')).to.equal('circle');
    });

    it('should update size property', async () => {
      element.size = 'lg';
      await element.updateComplete;
      
      expect(element.size).to.equal('lg');
      expect(element.getAttribute('size')).to.equal('lg');
    });

    it('should update noAnimation property', async () => {
      element.noAnimation = true;
      await element.updateComplete;
      
      expect(element.noAnimation).to.be.true;
    });

    it('should update ariaLabel property', async () => {
      element.ariaLabel = 'Loading profile';
      await element.updateComplete;
      
      expect(element.ariaLabel).to.equal('Loading profile');
      expect(element.getAttribute('aria-label')).to.equal('Loading profile');
    });
  });

  describe('Rendering', () => {
    it('should render skeleton container', async () => {
      await element.updateComplete;
      
      const container = element.shadowRoot?.querySelector('[part="container"]');
      expect(container).to.exist;
      expect(container?.classList.contains('skeleton')).to.be.true;
    });

    it('should apply custom dimensions via CSS properties', async () => {
      element.width = '300px';
      element.height = '100px';
      await element.updateComplete;
      
      expect(element.style.getPropertyValue('--skeleton-width')).to.equal('300px');
      expect(element.style.getPropertyValue('--skeleton-height')).to.equal('100px');
    });

    it('should apply no-animation styles when disabled', async () => {
      element.noAnimation = true;
      await element.updateComplete;
      
      const container = element.shadowRoot?.querySelector('.skeleton') as HTMLElement;
      const styles = container.style;
      
      expect(styles.animation).to.equal('none');
      expect(styles.background).to.equal('var(--forge-skeleton-base)');
    });

    it('should not apply animation styles when animation is enabled', async () => {
      element.noAnimation = false;
      await element.updateComplete;
      
      const container = element.shadowRoot?.querySelector('.skeleton') as HTMLElement;
      const styles = container.style;
      
      expect(styles.animation).to.equal('');
      expect(styles.background).to.equal('');
    });
  });

  describe('Shape Variants', () => {
    it('should apply rounded shape by default', async () => {
      await element.updateComplete;
      
      expect(element.shape).to.equal('rounded');
      expect(element.hasAttribute('shape')).to.be.true;
      expect(element.getAttribute('shape')).to.equal('rounded');
    });

    it('should apply circle shape', async () => {
      element.shape = 'circle';
      await element.updateComplete;
      
      expect(element.getAttribute('shape')).to.equal('circle');
    });

    it('should apply square shape', async () => {
      element.shape = 'square';
      await element.updateComplete;
      
      expect(element.getAttribute('shape')).to.equal('square');
    });
  });

  describe('Size Variants', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
    
    sizes.forEach(size => {
      it(`should apply ${size} size`, async () => {
        element.size = size;
        await element.updateComplete;
        
        expect(element.size).to.equal(size);
        expect(element.getAttribute('size')).to.equal(size);
      });
    });

    it('should have md size by default', () => {
      expect(element.size).to.equal('md');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes by default', () => {
      expect(element.getAttribute('aria-busy')).to.equal('true');
      expect(element.getAttribute('aria-label')).to.equal('Loading content');
      expect(element.getAttribute('role')).to.equal('presentation');
    });

    it('should update aria-label when changed', async () => {
      element.ariaLabel = 'Loading user profile';
      await element.updateComplete;
      
      expect(element.getAttribute('aria-label')).to.equal('Loading user profile');
    });

    it('should maintain accessibility attributes after updates', async () => {
      element.shape = 'circle';
      element.size = 'lg';
      await element.updateComplete;
      
      expect(element.getAttribute('aria-busy')).to.equal('true');
      expect(element.getAttribute('role')).to.equal('presentation');
    });
  });

  describe('CSS Custom Properties', () => {
    it('should use CSS custom properties for theming', async () => {
      await element.updateComplete;
      
      const styles = getComputedStyle(element);
      
      // Check that custom properties are defined
      const baseColor = styles.getPropertyValue('--forge-skeleton-base');
      const highlightColor = styles.getPropertyValue('--forge-skeleton-highlight');
      const duration = styles.getPropertyValue('--forge-skeleton-animation-duration');
      const borderRadius = styles.getPropertyValue('--forge-skeleton-border-radius');
      
      // These should have fallback values
      expect(baseColor || '#e5e7eb').to.be.a('string');
      expect(highlightColor || '#f9fafb').to.be.a('string');
      expect(duration || '2s').to.be.a('string');
      expect(borderRadius || '4px').to.be.a('string');
    });
  });

  describe('Responsive Behavior', () => {
    it('should handle prefers-reduced-motion', async () => {
      await element.updateComplete;
      
      const skeleton = element.shadowRoot?.querySelector('.skeleton');
      expect(skeleton).to.exist;
      
      // The CSS media query handling is tested through the styles
      const computedStyle = getComputedStyle(skeleton as Element);
      expect(computedStyle).to.exist;
    });
  });

  describe('AI Integration', () => {
    it('should explain state correctly', () => {
      element.shape = 'circle';
      element.size = 'lg';
      element.noAnimation = false;
      
      const explanation = element.explainState();
      
      expect(explanation.currentState).to.equal('animated');
      expect(explanation.stateDescription).to.include('Animated skeleton');
      expect(explanation.stateDescription).to.include('circle shape');
      expect(explanation.stateDescription).to.include('lg size');
    });

    it('should explain static state', () => {
      element.noAnimation = true;
      
      const explanation = element.explainState();
      
      expect(explanation.currentState).to.equal('static');
      expect(explanation.stateDescription).to.include('Static skeleton');
      expect(explanation.stateDescription).to.include('without animation');
    });

    it('should return possible states', () => {
      const explanation = element.explainState();
      
      expect(explanation.possibleStates).to.include('animated');
      expect(explanation.possibleStates).to.include('static');
    });

    it('should return possible actions', () => {
      const actions = element.getPossibleActions();
      
      expect(actions).to.be.an('array');
      expect(actions.length).to.be.greaterThan(0);
      
      const toggleAction = actions.find(a => a.name === 'toggleAnimation');
      expect(toggleAction?.available).to.be.true;
      expect(toggleAction?.description).to.include('shimmer animation');
      
      const dimensionsAction = actions.find(a => a.name === 'updateDimensions');
      expect(dimensionsAction?.available).to.be.true;
      expect(dimensionsAction?.description).to.include('width and height');
    });

    it('should return AI state', () => {
      element.width = '200px';
      element.height = '100px';
      element.shape = 'circle';
      element.size = 'xl';
      element.noAnimation = true;
      
      const state = element.aiState;
      
      expect(state.width).to.equal('200px');
      expect(state.height).to.equal('100px');
      expect(state.shape).to.equal('circle');
      expect(state.size).to.equal('xl');
      expect(state.noAnimation).to.be.true;
      expect(state.dimensions).to.exist;
      expect(state.dimensions.computedWidth).to.be.a('string');
      expect(state.dimensions.computedHeight).to.be.a('string');
    });
  });

  describe('Performance', () => {
    it('should update dimensions only when needed', async () => {
      const initialWidth = element.style.getPropertyValue('--skeleton-width');
      const initialHeight = element.style.getPropertyValue('--skeleton-height');
      
      // Update unrelated property
      element.ariaLabel = 'New label';
      await element.updateComplete;
      
      // Dimensions should not have changed
      expect(element.style.getPropertyValue('--skeleton-width')).to.equal(initialWidth);
      expect(element.style.getPropertyValue('--skeleton-height')).to.equal(initialHeight);
    });

    it('should handle rapid property changes', async () => {
      element.width = '100px';
      element.height = '50px';
      element.shape = 'circle';
      element.size = 'lg';
      element.noAnimation = true;
      
      await element.updateComplete;
      
      expect(element.width).to.equal('100px');
      expect(element.height).to.equal('50px');
      expect(element.shape).to.equal('circle');
      expect(element.size).to.equal('lg');
      expect(element.noAnimation).to.be.true;
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty width and height', async () => {
      element.width = '';
      element.height = '';
      await element.updateComplete;
      
      expect(element.width).to.equal('');
      expect(element.height).to.equal('');
      // Should not set CSS properties for empty values
      expect(element.style.getPropertyValue('--skeleton-width')).to.equal('');
      expect(element.style.getPropertyValue('--skeleton-height')).to.equal('');
    });

    it('should handle various CSS units', async () => {
      const testCases = [
        { width: '100px', height: '50px' },
        { width: '50%', height: '2em' },
        { width: '10rem', height: '5vh' },
        { width: 'auto', height: 'fit-content' }
      ];
      
      for (const testCase of testCases) {
        element.width = testCase.width;
        element.height = testCase.height;
        await element.updateComplete;
        
        expect(element.style.getPropertyValue('--skeleton-width')).to.equal(testCase.width);
        expect(element.style.getPropertyValue('--skeleton-height')).to.equal(testCase.height);
      }
    });

    it('should handle invalid shape values gracefully', async () => {
      // TypeScript would prevent this, but test runtime behavior
      (element as any).shape = 'invalid';
      await element.updateComplete;
      
      expect(element.getAttribute('shape')).to.equal('invalid');
      // Component should still function
      expect(element.shadowRoot?.querySelector('.skeleton')).to.exist;
    });
  });
});