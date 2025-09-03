import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fixture, html, waitUntil } from '@open-wc/testing';
import './tooltip';
import type { ForgeTooltip } from './tooltip';

describe('ForgeTooltip', () => {
  let element: ForgeTooltip;

  beforeEach(async () => {
    element = await fixture<ForgeTooltip>(html`
      <forge-tooltip content="Test tooltip">
        <button>Hover me</button>
      </forge-tooltip>
    `);
  });

  describe('Rendering', () => {
    it('should render with default properties', () => {
      expect(element).toBeDefined();
      expect(element.content).toBe('Test tooltip');
      expect(element.position).toBe('top');
      expect(element.trigger).toBe('hover');
      expect(element.variant).toBe('default');
    });

    it('should render slotted content', () => {
      const button = element.querySelector('button');
      expect(button).toBeDefined();
      expect(button?.textContent).toBe('Hover me');
    });

    it('should render tooltip content', () => {
      const shadowRoot = element.shadowRoot!;
      const content = shadowRoot.querySelector('.tooltip__content');
      expect(content).toBeDefined();
      expect(content?.textContent?.trim()).toContain('Test tooltip');
    });

    it('should render arrow by default', () => {
      const shadowRoot = element.shadowRoot!;
      const arrow = shadowRoot.querySelector('.tooltip__arrow');
      expect(arrow).toBeDefined();
    });

    it('should not render arrow when showArrow is false', async () => {
      element.showArrow = false;
      await element.updateComplete;
      
      const shadowRoot = element.shadowRoot!;
      const arrow = shadowRoot.querySelector('.tooltip__arrow');
      expect(arrow).toBeNull();
    });
  });

  describe('Visibility', () => {
    it('should be hidden by default', () => {
      const shadowRoot = element.shadowRoot!;
      const content = shadowRoot.querySelector('.tooltip__content');
      expect(content?.classList.contains('tooltip__content--visible')).toBe(false);
    });

    it('should show tooltip on hover', async () => {
      const shadowRoot = element.shadowRoot!;
      const trigger = shadowRoot.querySelector('.tooltip__trigger') as HTMLElement;
      
      trigger.dispatchEvent(new MouseEvent('mouseenter'));
      await element.updateComplete;
      
      const content = shadowRoot.querySelector('.tooltip__content');
      expect(content?.classList.contains('tooltip__content--visible')).toBe(true);
    });

    it('should hide tooltip on mouse leave', async () => {
      const shadowRoot = element.shadowRoot!;
      const trigger = shadowRoot.querySelector('.tooltip__trigger') as HTMLElement;
      
      trigger.dispatchEvent(new MouseEvent('mouseenter'));
      await element.updateComplete;
      
      trigger.dispatchEvent(new MouseEvent('mouseleave'));
      await element.updateComplete;
      
      const content = shadowRoot.querySelector('.tooltip__content');
      expect(content?.classList.contains('tooltip__content--visible')).toBe(false);
    });

    it('should show tooltip on focus when trigger is focus', async () => {
      element.trigger = 'focus';
      await element.updateComplete;
      
      const shadowRoot = element.shadowRoot!;
      const trigger = shadowRoot.querySelector('.tooltip__trigger') as HTMLElement;
      
      trigger.dispatchEvent(new FocusEvent('focus'));
      await element.updateComplete;
      
      const content = shadowRoot.querySelector('.tooltip__content');
      expect(content?.classList.contains('tooltip__content--visible')).toBe(true);
    });

    it('should toggle tooltip on click when trigger is click', async () => {
      element.trigger = 'click';
      await element.updateComplete;
      
      const shadowRoot = element.shadowRoot!;
      const trigger = shadowRoot.querySelector('.tooltip__trigger') as HTMLElement;
      
      trigger.dispatchEvent(new MouseEvent('click'));
      await element.updateComplete;
      
      let content = shadowRoot.querySelector('.tooltip__content');
      expect(content?.classList.contains('tooltip__content--visible')).toBe(true);
      
      trigger.dispatchEvent(new MouseEvent('click'));
      await element.updateComplete;
      
      content = shadowRoot.querySelector('.tooltip__content');
      expect(content?.classList.contains('tooltip__content--visible')).toBe(false);
    });
  });

  describe('Delay', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    it('should respect show delay', async () => {
      element.showDelay = 500;
      await element.updateComplete;
      
      const shadowRoot = element.shadowRoot!;
      const trigger = shadowRoot.querySelector('.tooltip__trigger') as HTMLElement;
      
      trigger.dispatchEvent(new MouseEvent('mouseenter'));
      await element.updateComplete;
      
      let content = shadowRoot.querySelector('.tooltip__content');
      expect(content?.classList.contains('tooltip__content--visible')).toBe(false);
      
      vi.advanceTimersByTime(500);
      await element.updateComplete;
      
      content = shadowRoot.querySelector('.tooltip__content');
      expect(content?.classList.contains('tooltip__content--visible')).toBe(true);
    });

    it('should respect hide delay', async () => {
      element.hideDelay = 300;
      await element.updateComplete;
      
      const shadowRoot = element.shadowRoot!;
      const trigger = shadowRoot.querySelector('.tooltip__trigger') as HTMLElement;
      
      trigger.dispatchEvent(new MouseEvent('mouseenter'));
      await element.updateComplete;
      
      trigger.dispatchEvent(new MouseEvent('mouseleave'));
      await element.updateComplete;
      
      let content = shadowRoot.querySelector('.tooltip__content');
      expect(content?.classList.contains('tooltip__content--visible')).toBe(true);
      
      vi.advanceTimersByTime(300);
      await element.updateComplete;
      
      content = shadowRoot.querySelector('.tooltip__content');
      expect(content?.classList.contains('tooltip__content--visible')).toBe(false);
    });
  });

  describe('Position', () => {
    it('should apply correct position class', async () => {
      const positions = ['top', 'right', 'bottom', 'left'] as const;
      
      for (const position of positions) {
        element.position = position;
        await element.updateComplete;
        // Wait for the second update after requestUpdate
        await element.updateComplete;
        
        const shadowRoot = element.shadowRoot!;
        const content = shadowRoot.querySelector('.tooltip__content');
        expect(content?.classList.contains(`tooltip__content--${position}`)).toBe(true);
      }
    });
  });

  describe('Variants', () => {
    it('should apply correct variant class', async () => {
      const variants = ['default', 'dark', 'light', 'error', 'warning', 'success'] as const;
      
      for (const variant of variants) {
        element.variant = variant;
        await element.updateComplete;
        
        const shadowRoot = element.shadowRoot!;
        const content = shadowRoot.querySelector('.tooltip__content');
        expect(content?.classList.contains(`tooltip__content--${variant}`)).toBe(true);
      }
    });
  });

  describe('Disabled state', () => {
    it('should not show tooltip when disabled', async () => {
      element.disabled = true;
      await element.updateComplete;
      
      const shadowRoot = element.shadowRoot!;
      const trigger = shadowRoot.querySelector('.tooltip__trigger') as HTMLElement;
      
      trigger.dispatchEvent(new MouseEvent('mouseenter'));
      await element.updateComplete;
      
      const content = shadowRoot.querySelector('.tooltip__content');
      expect(content?.classList.contains('tooltip__content--visible')).toBe(false);
    });

    it('should hide tooltip when disabled while visible', async () => {
      const shadowRoot = element.shadowRoot!;
      const trigger = shadowRoot.querySelector('.tooltip__trigger') as HTMLElement;
      
      trigger.dispatchEvent(new MouseEvent('mouseenter'));
      await element.updateComplete;
      
      element.disabled = true;
      await element.updateComplete;
      // Wait for the second update after requestUpdate
      await element.updateComplete;
      
      const content = shadowRoot.querySelector('.tooltip__content');
      expect(content?.classList.contains('tooltip__content--visible')).toBe(false);
    });
  });

  describe('Keyboard interaction', () => {
    it('should hide tooltip on Escape key', async () => {
      const shadowRoot = element.shadowRoot!;
      const trigger = shadowRoot.querySelector('.tooltip__trigger') as HTMLElement;
      
      trigger.dispatchEvent(new MouseEvent('mouseenter'));
      await element.updateComplete;
      
      trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      await element.updateComplete;
      
      const content = shadowRoot.querySelector('.tooltip__content');
      expect(content?.classList.contains('tooltip__content--visible')).toBe(false);
    });
  });

  describe('Public methods', () => {
    it('should show tooltip using showTooltip method', async () => {
      element.showTooltip();
      await element.updateComplete;
      
      const shadowRoot = element.shadowRoot!;
      const content = shadowRoot.querySelector('.tooltip__content');
      expect(content?.classList.contains('tooltip__content--visible')).toBe(true);
    });

    it('should hide tooltip using hideTooltip method', async () => {
      element.showTooltip();
      await element.updateComplete;
      
      element.hideTooltip();
      await element.updateComplete;
      
      const shadowRoot = element.shadowRoot!;
      const content = shadowRoot.querySelector('.tooltip__content');
      expect(content?.classList.contains('tooltip__content--visible')).toBe(false);
    });
  });

  describe('HTML content', () => {
    it('should render HTML content when htmlContent is true', async () => {
      element.htmlContent = true;
      element.content = '<strong>Bold text</strong>';
      await element.updateComplete;
      
      const shadowRoot = element.shadowRoot!;
      const htmlContainer = shadowRoot.querySelector('.tooltip__html');
      expect(htmlContainer).toBeDefined();
      expect(htmlContainer?.innerHTML).toBe('<strong>Bold text</strong>');
    });
  });

  describe('AI Metadata', () => {
    it('should have proper AI state', () => {
      const state = element.explainState();
      expect(state.currentState).toBe('hidden');
      expect(state.possibleStates).toContain('visible');
      expect(state.possibleStates).toContain('disabled');
    });

    it('should have proper AI actions', () => {
      const actions = element.getPossibleActions();
      expect(actions).toHaveLength(3);
      expect(actions.map(a => a.name)).toContain('show');
      expect(actions.map(a => a.name)).toContain('hide');
      expect(actions.map(a => a.name)).toContain('toggle');
    });
  });

});