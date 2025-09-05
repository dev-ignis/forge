import { vi } from 'vitest';
import { fixture, expect, html, waitUntil } from '@open-wc/testing';
import { createSpy, spyOn } from '../../../test/test-helpers';
import './alert';
import { ForgeAlert } from './alert';

describe('ForgeAlert', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Basic Rendering', () => {
    it('should render with default properties', async () => {
      const el = await fixture<ForgeAlert>(html`<forge-alert></forge-alert>`);
      
      expect(el).to.exist;
      expect(el.severity).to.equal('info');
      expect(el.variant).to.equal('standard');
      expect(el.closable).to.be.false;
    });

    it('should render title and message', async () => {
      const el = await fixture<ForgeAlert>(html`
        <forge-alert title="Test Title" message="Test message"></forge-alert>
      `);
      
      await el.updateComplete;
      
      const title = el.shadowRoot?.querySelector('.alert-title');
      const message = el.shadowRoot?.querySelector('.alert-message');
      
      expect(title?.textContent).to.equal('Test Title');
      expect(message?.textContent).to.equal('Test message');
    });

    it('should render slot content', async () => {
      const el = await fixture<ForgeAlert>(html`
        <forge-alert>Custom content</forge-alert>
      `);
      
      const slot = el.shadowRoot?.querySelector('slot:not([name])');
      expect(slot).to.exist;
    });
  });

  describe('Severity Variants', () => {
    const severities: Array<'info' | 'success' | 'warning' | 'error'> = ['info', 'success', 'warning', 'error'];
    
    severities.forEach(severity => {
      it(`should apply ${severity} severity`, async () => {
        const el = await fixture<ForgeAlert>(html`
          <forge-alert severity="${severity}"></forge-alert>
        `);
        
        expect(el.severity).to.equal(severity);
        expect(el.hasAttribute('severity')).to.be.true;
      });
    });
  });

  describe('Visual Variants', () => {
    const variants: Array<'standard' | 'filled' | 'outlined'> = ['standard', 'filled', 'outlined'];
    
    variants.forEach(variant => {
      it(`should apply ${variant} variant`, async () => {
        const el = await fixture<ForgeAlert>(html`
          <forge-alert variant="${variant}"></forge-alert>
        `);
        
        expect(el.variant).to.equal(variant);
        expect(el.hasAttribute('variant')).to.be.true;
      });
    });
  });

  describe('Close Functionality', () => {
    it('should show close button when closable', async () => {
      const el = await fixture<ForgeAlert>(html`
        <forge-alert closable></forge-alert>
      `);
      
      await el.updateComplete;
      
      const closeButton = el.shadowRoot?.querySelector('.close-button');
      expect(closeButton).to.exist;
    });

    it('should dispatch close event', async () => {
      const el = await fixture<ForgeAlert>(html`
        <forge-alert closable></forge-alert>
      `);
      
      const closeSpy = createSpy();
      el.addEventListener('close', closeSpy);
      
      const closeButton = el.shadowRoot?.querySelector('.close-button') as HTMLElement;
      closeButton?.click();
      
      await el.updateComplete;
      
      expect(closeSpy.callCount).to.equal(1);
    });

  });

  describe('Auto Dismiss', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });
    
    afterEach(() => {
      vi.useRealTimers();
    });
    
    it('should clear timer on disconnect', async () => {
      const el = await fixture<ForgeAlert>(html`
        <forge-alert auto-dismiss="1000"></forge-alert>
      `);
      
      const clearTimeoutSpy = spyOn(window, 'clearTimeout');
      
      el.remove();
      
      expect(clearTimeoutSpy).to.have.property('called', true);
    });
  });

  describe('Icons', () => {
    it('should show default icon based on severity', async () => {
      const el = await fixture<ForgeAlert>(html`
        <forge-alert severity="success"></forge-alert>
      `);
      
      await el.updateComplete;
      
      const icon = el.shadowRoot?.querySelector('forge-icon');
      expect(icon?.getAttribute('name')).to.equal('check');
    });

    it('should use custom icon when provided', async () => {
      const el = await fixture<ForgeAlert>(html`
        <forge-alert icon="custom-icon"></forge-alert>
      `);
      
      await el.updateComplete;
      
      const icon = el.shadowRoot?.querySelector('forge-icon');
      expect(icon?.getAttribute('name')).to.equal('custom-icon');
    });
  });

  describe('Accessibility', () => {
    it('should have alert role', async () => {
      const el = await fixture<ForgeAlert>(html`<forge-alert></forge-alert>`);
      
      expect(el.getAttribute('role')).to.equal('alert');
    });

    it('should set aria-live based on severity', async () => {
      const infoAlert = await fixture<ForgeAlert>(html`
        <forge-alert severity="info"></forge-alert>
      `);
      expect(infoAlert.getAttribute('aria-live')).to.equal('polite');
      
      const errorAlert = await fixture<ForgeAlert>(html`
        <forge-alert severity="error"></forge-alert>
      `);
      expect(errorAlert.getAttribute('aria-live')).to.equal('assertive');
    });

    it('should set aria-label from title and message', async () => {
      const el = await fixture<ForgeAlert>(html`
        <forge-alert title="Warning" message="Please review"></forge-alert>
      `);
      
      expect(el.getAttribute('aria-label')).to.equal('Warning. Please review');
    });

    it('should set aria-description when provided', async () => {
      const el = await fixture<ForgeAlert>(html`
        <forge-alert aria-description="Important notification"></forge-alert>
      `);
      
      expect(el.getAttribute('aria-description')).to.equal('Important notification');
    });
  });

  describe('AI-Ready Features', () => {
    it('should set semantic role', async () => {
      const el = await fixture<ForgeAlert>(html`
        <forge-alert semantic-role="error-notification"></forge-alert>
      `);
      
      expect(el.semanticRole).to.equal('error-notification');
      expect(el.getAttribute('data-semantic-role')).to.equal('error-notification');
    });

    it('should set AI context', async () => {
      const el = await fixture<ForgeAlert>(html`
        <forge-alert ai-context="form-validation"></forge-alert>
      `);
      
      expect(el.aiContext).to.equal('form-validation');
      expect(el.getAttribute('data-ai-context')).to.equal('form-validation');
    });
  });

  describe('Performance Monitoring', () => {
    it('should track render performance', async () => {
      const el = await fixture<ForgeAlert>(html`
        <forge-alert max-render-ms="10"></forge-alert>
      `);
      
      expect(el.maxRenderMs).to.equal(10);
    });

    it('should warn on performance violation', async () => {
      const consoleWarn = spyOn(console, 'warn');
      
      const el = await fixture<ForgeAlert>(html`
        <forge-alert max-render-ms="0.001" warn-on-violation></forge-alert>
      `);
      
      await el.updateComplete;
      
      expect(consoleWarn).to.have.property('called', true);
    });

    it('should apply performance degradation in auto mode', async () => {
      const el = await fixture<ForgeAlert>(html`
        <forge-alert 
          animateIn 
          max-render-ms="0.001" 
          performance-mode="auto">
        </forge-alert>
      `);
      
      await el.updateComplete;
      
      expect(el.animateIn).to.be.false;
    });
  });

  describe('Developer Mode', () => {
    it('should log metrics in dev mode', async () => {
      const consoleLog = spyOn(console, 'log');
      
      const el = await fixture<ForgeAlert>(html`
        <forge-alert dev-mode></forge-alert>
      `);
      
      await el.updateComplete;
      
      expect(consoleLog).to.have.property('called', true);
    });

    it('should show metrics overlay', async () => {
      const el = await fixture<ForgeAlert>(html`
        <forge-alert show-metrics></forge-alert>
      `);
      
      await el.updateComplete;
      
      const overlay = el.shadowRoot?.querySelector('.performance-overlay');
      expect(overlay).to.exist;
    });
  });

  describe('Animation', () => {
    it('should apply animate attribute', async () => {
      const el = await fixture<ForgeAlert>(html`
        <forge-alert animate-in></forge-alert>
      `);
      
      expect(el.hasAttribute('animate')).to.be.true;
    });

    it('should apply closing attribute during close', async () => {
      const el = await fixture<ForgeAlert>(html`
        <forge-alert closable></forge-alert>
      `);
      
      const closeButton = el.shadowRoot?.querySelector('.close-button') as HTMLElement;
      closeButton?.click();
      
      await el.updateComplete;
      
      expect(el.hasAttribute('closing')).to.be.true;
    });
  });

  describe('Action Slot', () => {
    it('should render action slot content', async () => {
      const el = await fixture<ForgeAlert>(html`
        <forge-alert>
          <button slot="actions">Action</button>
        </forge-alert>
      `);
      
      const actionSlot = el.shadowRoot?.querySelector('slot[name="actions"]');
      expect(actionSlot).to.exist;
    });
  });
});