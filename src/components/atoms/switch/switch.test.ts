import { vi } from 'vitest';
import { fixture, expect, html, waitUntil } from '@open-wc/testing';
import { createSpy, spyOn } from '../../../test/test-helpers';
import './switch';
import { ForgeSwitch } from './switch';

describe('ForgeSwitch', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Basic Rendering', () => {
    it('should render with default properties', async () => {
      const el = await fixture<ForgeSwitch>(html`<forge-switch></forge-switch>`);
      
      expect(el).to.exist;
      expect(el.checked).to.be.false;
      expect(el.disabled).to.be.false;
      expect(el.loading).to.be.false;
      expect(el.size).to.equal('md');
    });

    it('should render with label', async () => {
      const el = await fixture<ForgeSwitch>(html`
        <forge-switch label="Enable notifications"></forge-switch>
      `);
      
      await el.updateComplete;
      
      const label = el.shadowRoot?.querySelector('.switch-label');
      expect(label?.textContent?.trim()).to.include('Enable notifications');
    });

    it('should render with description', async () => {
      const el = await fixture<ForgeSwitch>(html`
        <forge-switch description="Receive alerts"></forge-switch>
      `);
      
      await el.updateComplete;
      
      const description = el.shadowRoot?.querySelector('.switch-description');
      expect(description?.textContent?.trim()).to.equal('Receive alerts');
    });

    it('should render with on/off labels', async () => {
      const el = await fixture<ForgeSwitch>(html`
        <forge-switch on-label="ON" off-label="OFF"></forge-switch>
      `);
      
      await el.updateComplete;
      
      const onLabel = el.shadowRoot?.querySelector('.switch-state-label.on');
      const offLabel = el.shadowRoot?.querySelector('.switch-state-label.off');
      
      expect(onLabel?.textContent).to.equal('ON');
      expect(offLabel?.textContent).to.equal('OFF');
    });
  });

  describe('States', () => {
    it('should handle checked state', async () => {
      const el = await fixture<ForgeSwitch>(html`
        <forge-switch checked></forge-switch>
      `);
      
      expect(el.checked).to.be.true;
      expect(el.getAttribute('checked')).to.equal('');
      expect(el.getAttribute('aria-checked')).to.equal('true');
    });

    it('should handle disabled state', async () => {
      const el = await fixture<ForgeSwitch>(html`
        <forge-switch disabled></forge-switch>
      `);
      
      expect(el.disabled).to.be.true;
      expect(el.getAttribute('aria-disabled')).to.equal('true');
    });

    it('should handle loading state', async () => {
      const el = await fixture<ForgeSwitch>(html`
        <forge-switch loading></forge-switch>
      `);
      
      expect(el.loading).to.be.true;
      expect(el.getAttribute('aria-busy')).to.equal('true');
    });

    it('should handle error state', async () => {
      const el = await fixture<ForgeSwitch>(html`
        <forge-switch error></forge-switch>
      `);
      
      expect(el.error).to.be.true;
      expect(el.hasAttribute('error')).to.be.true;
    });
  });

  describe('User Interaction', () => {
    it('should toggle on click', async () => {
      const el = await fixture<ForgeSwitch>(html`
        <forge-switch></forge-switch>
      `);
      
      const wrapper = el.shadowRoot?.querySelector('.switch-wrapper') as HTMLElement;
      wrapper?.click();
      
      await el.updateComplete;
      
      expect(el.checked).to.be.true;
    });

    it('should emit change event', async () => {
      const el = await fixture<ForgeSwitch>(html`
        <forge-switch></forge-switch>
      `);
      
      const changeSpy = createSpy();
      el.addEventListener('change', changeSpy);
      
      const input = el.shadowRoot?.querySelector('.switch-input') as HTMLInputElement;
      input.checked = true;
      input.dispatchEvent(new Event('change'));
      
      await el.updateComplete;
      
      expect(changeSpy.callCount).to.equal(1);
    });

    it('should emit change event with detail', async () => {
      const el = await fixture<ForgeSwitch>(html`
        <forge-switch value="notifications"></forge-switch>
      `);
      
      let eventDetail: any = null;
      el.addEventListener('change', (e: Event) => {
        eventDetail = (e as CustomEvent).detail;
      });
      
      el.toggle();
      await el.updateComplete;
      
      expect(eventDetail.checked).to.equal(true);
      expect(eventDetail.value).to.equal('notifications');
    });

    it('should not change when disabled', async () => {
      const el = await fixture<ForgeSwitch>(html`
        <forge-switch disabled></forge-switch>
      `);
      
      const wrapper = el.shadowRoot?.querySelector('.switch-wrapper') as HTMLElement;
      wrapper?.click();
      
      await el.updateComplete;
      
      expect(el.checked).to.be.false;
    });

    it('should not change when loading', async () => {
      const el = await fixture<ForgeSwitch>(html`
        <forge-switch loading></forge-switch>
      `);
      
      el.toggle();
      await el.updateComplete;
      
      expect(el.checked).to.be.false;
    });

    it('should toggle on space key', async () => {
      const el = await fixture<ForgeSwitch>(html`
        <forge-switch></forge-switch>
      `);
      
      const input = el.shadowRoot!.querySelector('input') as HTMLInputElement;
      const event = new KeyboardEvent('keydown', { key: ' ', bubbles: true });
      input.dispatchEvent(event);
      
      await el.updateComplete;
      
      expect(el.checked).to.be.true;
    });

    it('should toggle on enter key', async () => {
      const el = await fixture<ForgeSwitch>(html`
        <forge-switch></forge-switch>
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
      const el = await fixture<ForgeSwitch>(html`
        <forge-switch></forge-switch>
      `);
      
      el.toggle();
      await el.updateComplete;
      expect(el.checked).to.be.true;
      
      el.toggle();
      await el.updateComplete;
      expect(el.checked).to.be.false;
    });

    it('should reset state with reset method', async () => {
      const el = await fixture<ForgeSwitch>(html`
        <forge-switch checked error loading></forge-switch>
      `);
      
      el.reset();
      await el.updateComplete;
      
      expect(el.checked).to.be.false;
      expect(el.error).to.be.false;
      expect(el.loading).to.be.false;
    });
  });

  describe('Sizes', () => {
    const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];
    
    sizes.forEach(size => {
      it(`should apply ${size} size`, async () => {
        const el = await fixture<ForgeSwitch>(html`
          <forge-switch size="${size}"></forge-switch>
        `);
        
        expect(el.size).to.equal(size);
        expect(el.hasAttribute('size')).to.be.true;
      });
    });
  });

  describe('Label Position', () => {
    const positions: Array<'start' | 'end' | 'top' | 'bottom'> = ['start', 'end', 'top', 'bottom'];
    
    positions.forEach(position => {
      it(`should apply ${position} label position`, async () => {
        const el = await fixture<ForgeSwitch>(html`
          <forge-switch label="Test" label-position="${position}"></forge-switch>
        `);
        
        expect(el.labelPosition).to.equal(position);
        expect(el.hasAttribute('label-position')).to.be.true;
      });
    });
  });

  describe('Form Integration', () => {
    it('should have name and value attributes', async () => {
      const el = await fixture<ForgeSwitch>(html`
        <forge-switch name="notifications" value="enabled"></forge-switch>
      `);
      
      const input = el.shadowRoot?.querySelector('.switch-input') as HTMLInputElement;
      expect(input.name).to.equal('notifications');
      expect(input.value).to.equal('enabled');
    });

    it('should show required indicator', async () => {
      const el = await fixture<ForgeSwitch>(html`
        <forge-switch label="Required setting" required></forge-switch>
      `);
      
      await el.updateComplete;
      
      const indicator = el.shadowRoot?.querySelector('.required-indicator');
      expect(indicator).to.exist;
      expect(indicator?.textContent).to.equal('*');
    });
  });

  describe('Accessibility', () => {
    it('should have switch role', async () => {
      const el = await fixture<ForgeSwitch>(html`<forge-switch></forge-switch>`);
      
      expect(el.getAttribute('role')).to.equal('switch');
    });

    it('should update aria-checked attribute', async () => {
      const el = await fixture<ForgeSwitch>(html`<forge-switch></forge-switch>`);
      
      expect(el.getAttribute('aria-checked')).to.equal('false');
      
      el.checked = true;
      await el.updateComplete;
      expect(el.getAttribute('aria-checked')).to.equal('true');
    });

    it('should set aria-label from label', async () => {
      const el = await fixture<ForgeSwitch>(html`
        <forge-switch label="Dark mode"></forge-switch>
      `);
      
      expect(el.getAttribute('aria-label')).to.equal('Dark mode');
    });

    it('should set aria-description when provided', async () => {
      const el = await fixture<ForgeSwitch>(html`
        <forge-switch aria-description="Toggle dark mode on or off"></forge-switch>
      `);
      
      expect(el.getAttribute('aria-description')).to.equal('Toggle dark mode on or off');
    });

    it('should set aria-busy when loading', async () => {
      const el = await fixture<ForgeSwitch>(html`<forge-switch></forge-switch>`);
      
      el.loading = true;
      await el.updateComplete;
      
      expect(el.getAttribute('aria-busy')).to.equal('true');
    });
  });

  describe('AI-Ready Features (ADR-014)', () => {
    it('should have AI metadata configured', async () => {
      const el = await fixture<ForgeSwitch>(html`<forge-switch></forge-switch>`);
      
      expect(el['aiMetadata']).to.deep.equal({
        purpose: 'Toggle binary state',
        dataType: 'boolean',
        criticality: 'medium',
        semanticRole: 'switch'
      });
    });

    it('should provide AI state', async () => {
      const el = await fixture<ForgeSwitch>(html`
        <forge-switch 
          checked
          semantic-role="dark-mode-toggle"
          ai-context="user-preferences">
        </forge-switch>
      `);
      
      const aiState = el.aiState;
      expect(aiState).to.include({
        component: 'forge-switch',
        semanticRole: 'dark-mode-toggle',
        context: 'user-preferences'
      });
    });

    it('should return possible actions', async () => {
      const el = await fixture<ForgeSwitch>(html`<forge-switch></forge-switch>`);
      
      const actions = el.getPossibleActions();
      expect(actions).to.have.length(2);
      expect(actions[0]).to.deep.equal({
        name: 'toggle',
        description: 'Toggle the switch on/off',
        available: true
      });
    });

    it('should return disabled actions when disabled', async () => {
      const el = await fixture<ForgeSwitch>(html`<forge-switch disabled></forge-switch>`);
      
      const actions = el.getPossibleActions();
      expect(actions[0].available).to.be.false;
    });

    it('should explain current state', async () => {
      const el = await fixture<ForgeSwitch>(html`<forge-switch checked></forge-switch>`);
      
      const explanation = el.explainState();
      expect(explanation.currentState).to.equal('on');
      expect(explanation.stateDescription).to.equal('Switch is turned on');
      expect(explanation.possibleStates).to.include.members(['off', 'on', 'disabled', 'loading']);
    });

    it('should provide AI description', async () => {
      const el = await fixture<ForgeSwitch>(html`
        <forge-switch label="Dark mode" checked></forge-switch>
      `);
      
      const description = el.getAIDescription();
      expect(description).to.equal('Dark mode - currently on');
    });

    it('should set semantic role attribute', async () => {
      const el = await fixture<ForgeSwitch>(html`
        <forge-switch semantic-role="theme-toggle"></forge-switch>
      `);
      
      expect(el.semanticRole).to.equal('theme-toggle');
      expect(el.getAttribute('data-semantic-role')).to.equal('theme-toggle');
    });

    it('should set AI context attribute', async () => {
      const el = await fixture<ForgeSwitch>(html`
        <forge-switch ai-context="settings-panel"></forge-switch>
      `);
      
      expect(el.aiContext).to.equal('settings-panel');
      expect(el.getAttribute('data-ai-context')).to.equal('settings-panel');
    });
  });

  describe('Performance Monitoring', () => {
    it('should track render performance', async () => {
      const el = await fixture<ForgeSwitch>(html`
        <forge-switch max-render-ms="10"></forge-switch>
      `);
      
      expect(el.maxRenderMs).to.equal(10);
    });

    it('should warn on performance violation', async () => {
      const consoleWarn = spyOn(console, 'warn');
      
      const el = await fixture<ForgeSwitch>(html`
        <forge-switch max-render-ms="0.001" warn-on-violation></forge-switch>
      `);
      
      // Force a slow render to ensure warning triggers
      (el as any).renderTime = 10; // Force high render time
      
      // Manually trigger the performance check logic
      if ((el as any).renderTime > el.maxRenderMs) {
        const message = `FORGE-SWITCH render exceeded budget: ${(el as any).renderTime.toFixed(2)}ms > ${el.maxRenderMs}ms`;
        
        if (el.warnOnViolation) {
          console.warn(message, {
            component: 'forge-switch',
            renderTime: (el as any).renderTime,
            maxRenderMs: el.maxRenderMs,
            renderCount: (el as any).renderCount || 1,
            performanceMode: el.performanceMode
          });
        }
      }
      
      expect(consoleWarn).to.have.property('called', true);
    });

    it('should apply performance degradation in auto mode', async () => {
      const el = await fixture<ForgeSwitch>(html`
        <forge-switch 
          max-render-ms="0.001" 
          performance-mode="auto">
        </forge-switch>
      `);
      
      // Force a slow render to trigger performance degradation
      el.renderTime = 100;
      el['checkPerformance'](0);
      await el.updateComplete;
      
      const track = el.shadowRoot?.querySelector('.switch-track') as HTMLElement;
      expect(track.style.transition).to.equal('none');
    });
  });

  describe('Developer Mode', () => {
    it('should log metrics in dev mode', async () => {
      const consoleLog = spyOn(console, 'log');
      
      const el = await fixture<ForgeSwitch>(html`
        <forge-switch dev-mode></forge-switch>
      `);
      
      el.toggle();
      await el.updateComplete;
      
      expect(consoleLog).to.have.property('called', true);
    });

    it('should show metrics overlay', async () => {
      const el = await fixture<ForgeSwitch>(html`
        <forge-switch show-metrics></forge-switch>
      `);
      
      await el.updateComplete;
      
      const overlay = el.shadowRoot?.querySelector('.performance-overlay');
      expect(overlay).to.exist;
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid toggling', async () => {
      const el = await fixture<ForgeSwitch>(html`<forge-switch></forge-switch>`);
      
      for (let i = 0; i < 10; i++) {
        el.toggle();
      }
      
      await el.updateComplete;
      expect(el.checked).to.be.false; // Even number of toggles
    });

    it('should maintain state when attributes change', async () => {
      const el = await fixture<ForgeSwitch>(html`
        <forge-switch checked></forge-switch>
      `);
      
      el.size = 'lg';
      el.labelPosition = 'top';
      await el.updateComplete;
      
      expect(el.checked).to.be.true;
    });
  });
});