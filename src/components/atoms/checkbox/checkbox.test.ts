import { vi } from 'vitest';
import { fixture, expect, html } from '@open-wc/testing';
import { createSpy, spyOn } from '../../../test/test-helpers';
import './checkbox';
import { ForgeCheckbox } from './checkbox';

describe('ForgeCheckbox', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Basic Rendering', () => {
    it('should render with default properties', async () => {
      const el = await fixture<ForgeCheckbox>(html`<forge-checkbox></forge-checkbox>`);
      
      expect(el).to.exist;
      expect(el.checked).to.be.false;
      expect(el.indeterminate).to.be.false;
      expect(el.disabled).to.be.false;
      expect(el.size).to.equal('md');
    });

    it('should render with label', async () => {
      const el = await fixture<ForgeCheckbox>(html`
        <forge-checkbox label="Accept terms"></forge-checkbox>
      `);
      
      await el.updateComplete;
      
      const label = el.shadowRoot?.querySelector('.checkbox-label');
      expect(label?.textContent?.trim()).to.equal('Accept terms');
    });

    it('should render with description', async () => {
      const el = await fixture<ForgeCheckbox>(html`
        <forge-checkbox description="Additional information"></forge-checkbox>
      `);
      
      await el.updateComplete;
      
      const description = el.shadowRoot?.querySelector('.checkbox-description');
      expect(description?.textContent?.trim()).to.equal('Additional information');
    });
  });

  describe('States', () => {
    it('should handle checked state', async () => {
      const el = await fixture<ForgeCheckbox>(html`
        <forge-checkbox checked></forge-checkbox>
      `);
      
      expect(el.checked).to.be.true;
      expect(el.getAttribute('checked')).to.equal('');
      expect(el.getAttribute('aria-checked')).to.equal('true');
    });

    it('should handle indeterminate state', async () => {
      const el = await fixture<ForgeCheckbox>(html`
        <forge-checkbox indeterminate></forge-checkbox>
      `);
      
      expect(el.indeterminate).to.be.true;
      expect(el.getAttribute('aria-checked')).to.equal('mixed');
    });

    it('should handle disabled state', async () => {
      const el = await fixture<ForgeCheckbox>(html`
        <forge-checkbox disabled></forge-checkbox>
      `);
      
      expect(el.disabled).to.be.true;
      expect(el.getAttribute('aria-disabled')).to.equal('true');
    });

    it('should handle error state', async () => {
      const el = await fixture<ForgeCheckbox>(html`
        <forge-checkbox error></forge-checkbox>
      `);
      
      expect(el.error).to.be.true;
      expect(el.hasAttribute('error')).to.be.true;
    });
  });

  describe('User Interaction', () => {
    it('should toggle on click', async () => {
      const el = await fixture<ForgeCheckbox>(html`
        <forge-checkbox></forge-checkbox>
      `);
      
      const wrapper = el.shadowRoot?.querySelector('.checkbox-wrapper') as HTMLElement;
      wrapper?.click();
      
      await el.updateComplete;
      
      expect(el.checked).to.be.true;
    });

    it('should emit change event', async () => {
      const el = await fixture<ForgeCheckbox>(html`
        <forge-checkbox></forge-checkbox>
      `);
      
      const changeSpy = createSpy();
      el.addEventListener('change', changeSpy);
      
      const input = el.shadowRoot?.querySelector('.checkbox-input') as HTMLInputElement;
      input.checked = true;
      input.dispatchEvent(new Event('change'));
      
      await el.updateComplete;
      
      expect(changeSpy.callCount).to.equal(1);
    });

    it('should emit forge-change event with detail', async () => {
      const el = await fixture<ForgeCheckbox>(html`
        <forge-checkbox value="terms"></forge-checkbox>
      `);
      
      let eventDetail: any = null;
      el.addEventListener('forge-change', (e: Event) => {
        eventDetail = (e as CustomEvent).detail;
      });
      
      el.toggle();
      await el.updateComplete;
      
      expect(eventDetail).to.deep.equal({
        checked: true,
        value: 'terms'
      });
    });

    it('should not change when disabled', async () => {
      const el = await fixture<ForgeCheckbox>(html`
        <forge-checkbox disabled></forge-checkbox>
      `);
      
      const wrapper = el.shadowRoot?.querySelector('.checkbox-wrapper') as HTMLElement;
      wrapper?.click();
      
      await el.updateComplete;
      
      expect(el.checked).to.be.false;
    });

    it('should toggle on space key', async () => {
      const el = await fixture<ForgeCheckbox>(html`
        <forge-checkbox></forge-checkbox>
      `);
      
      const input = el.shadowRoot!.querySelector('input') as HTMLInputElement;
      const event = new KeyboardEvent('keydown', { key: ' ', bubbles: true });
      input.dispatchEvent(event);
      
      await el.updateComplete;
      
      expect(el.checked).to.be.true;
    });

    it('should toggle on enter key', async () => {
      const el = await fixture<ForgeCheckbox>(html`
        <forge-checkbox></forge-checkbox>
      `);
      
      const input = el.shadowRoot!.querySelector('input') as HTMLInputElement;
      const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
      input.dispatchEvent(event);
      
      await el.updateComplete;
      
      expect(el.checked).to.be.true;
    });
  });

  describe('Methods', () => {
    it('should toggle state with toggle method', async () => {
      const el = await fixture<ForgeCheckbox>(html`
        <forge-checkbox></forge-checkbox>
      `);
      
      el.toggle();
      await el.updateComplete;
      expect(el.checked).to.be.true;
      
      el.toggle();
      await el.updateComplete;
      expect(el.checked).to.be.false;
    });

    it('should reset state with reset method', async () => {
      const el = await fixture<ForgeCheckbox>(html`
        <forge-checkbox checked error></forge-checkbox>
      `);
      
      el.reset();
      await el.updateComplete;
      
      expect(el.checked).to.be.false;
      expect(el.indeterminate).to.be.false;
      expect(el.error).to.be.false;
    });

    it('should clear indeterminate when toggled', async () => {
      const el = await fixture<ForgeCheckbox>(html`
        <forge-checkbox indeterminate></forge-checkbox>
      `);
      
      el.toggle();
      await el.updateComplete;
      
      expect(el.indeterminate).to.be.false;
      expect(el.checked).to.be.true;
    });
  });

  describe('Sizes', () => {
    const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];
    
    sizes.forEach(size => {
      it(`should apply ${size} size`, async () => {
        const el = await fixture<ForgeCheckbox>(html`
          <forge-checkbox size="${size}"></forge-checkbox>
        `);
        
        expect(el.size).to.equal(size);
        expect(el.hasAttribute('size')).to.be.true;
      });
    });
  });

  describe('Variants', () => {
    const variants: Array<'default' | 'filled' | 'outlined'> = ['default', 'filled', 'outlined'];
    
    variants.forEach(variant => {
      it(`should apply ${variant} variant`, async () => {
        const el = await fixture<ForgeCheckbox>(html`
          <forge-checkbox variant="${variant}"></forge-checkbox>
        `);
        
        expect(el.variant).to.equal(variant);
        expect(el.hasAttribute('variant')).to.be.true;
      });
    });
  });

  describe('Label Position', () => {
    it('should position label at end by default', async () => {
      const el = await fixture<ForgeCheckbox>(html`
        <forge-checkbox label="Label"></forge-checkbox>
      `);
      
      expect(el.labelPosition).to.equal('end');
    });

    it('should position label at start when specified', async () => {
      const el = await fixture<ForgeCheckbox>(html`
        <forge-checkbox label="Label" label-position="start"></forge-checkbox>
      `);
      
      expect(el.labelPosition).to.equal('start');
      expect(el.hasAttribute('label-position')).to.be.true;
    });
  });

  describe('Form Integration', () => {
    it('should have name and value attributes', async () => {
      const el = await fixture<ForgeCheckbox>(html`
        <forge-checkbox name="agreement" value="yes"></forge-checkbox>
      `);
      
      const input = el.shadowRoot?.querySelector('.checkbox-input') as HTMLInputElement;
      expect(input.name).to.equal('agreement');
      expect(input.value).to.equal('yes');
    });

    it('should show required indicator', async () => {
      const el = await fixture<ForgeCheckbox>(html`
        <forge-checkbox label="Required field" required></forge-checkbox>
      `);
      
      await el.updateComplete;
      
      const indicator = el.shadowRoot?.querySelector('.required-indicator');
      expect(indicator).to.exist;
      expect(indicator?.textContent).to.equal('*');
    });
  });

  describe('Accessibility', () => {
    it('should have checkbox role', async () => {
      const el = await fixture<ForgeCheckbox>(html`<forge-checkbox></forge-checkbox>`);
      
      expect(el.getAttribute('role')).to.equal('checkbox');
    });

    it('should update aria-checked attribute', async () => {
      const el = await fixture<ForgeCheckbox>(html`<forge-checkbox></forge-checkbox>`);
      
      expect(el.getAttribute('aria-checked')).to.equal('false');
      
      el.checked = true;
      await el.updateComplete;
      expect(el.getAttribute('aria-checked')).to.equal('true');
      
      el.indeterminate = true;
      await el.updateComplete;
      expect(el.getAttribute('aria-checked')).to.equal('mixed');
    });

    it('should set aria-label from label', async () => {
      const el = await fixture<ForgeCheckbox>(html`
        <forge-checkbox label="Accept terms"></forge-checkbox>
      `);
      
      expect(el.getAttribute('aria-label')).to.equal('Accept terms');
    });

    it('should set aria-description when provided', async () => {
      const el = await fixture<ForgeCheckbox>(html`
        <forge-checkbox aria-description="Terms and conditions checkbox"></forge-checkbox>
      `);
      
      expect(el.getAttribute('aria-description')).to.equal('Terms and conditions checkbox');
    });
  });

  describe('AI-Ready Features', () => {
    it('should set semantic role', async () => {
      const el = await fixture<ForgeCheckbox>(html`
        <forge-checkbox semantic-role="terms-acceptance"></forge-checkbox>
      `);
      
      expect(el.semanticRole).to.equal('terms-acceptance');
      expect(el.getAttribute('data-semantic-role')).to.equal('terms-acceptance');
    });

    it('should set AI context', async () => {
      const el = await fixture<ForgeCheckbox>(html`
        <forge-checkbox ai-context="signup-form"></forge-checkbox>
      `);
      
      expect(el.aiContext).to.equal('signup-form');
      expect(el.getAttribute('data-ai-context')).to.equal('signup-form');
    });
  });

  describe('Performance Monitoring', () => {
    it('should track render performance', async () => {
      const el = await fixture<ForgeCheckbox>(html`
        <forge-checkbox max-render-ms="10"></forge-checkbox>
      `);
      
      expect(el.maxRenderMs).to.equal(10);
    });

    it('should warn on performance violation', async () => {
      const consoleWarn = spyOn(console, 'warn');
      
      const el = await fixture<ForgeCheckbox>(html`
        <forge-checkbox max-render-ms="0.001" warn-on-violation></forge-checkbox>
      `);
      
      el.toggle();
      await el.updateComplete;
      
      expect(consoleWarn).to.have.property('called', true);
    });
  });

  describe('Developer Mode', () => {
    it('should log metrics in dev mode', async () => {
      const consoleLog = spyOn(console, 'log');
      
      const el = await fixture<ForgeCheckbox>(html`
        <forge-checkbox dev-mode></forge-checkbox>
      `);
      
      el.toggle();
      await el.updateComplete;
      
      expect(consoleLog).to.have.property('called', true);
    });

    it('should show metrics overlay', async () => {
      const el = await fixture<ForgeCheckbox>(html`
        <forge-checkbox show-metrics></forge-checkbox>
      `);
      
      await el.updateComplete;
      
      const overlay = el.shadowRoot?.querySelector('.performance-overlay');
      expect(overlay).to.exist;
    });
  });
});