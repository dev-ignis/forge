import { fixture, expect, html } from '@open-wc/testing';
import sinon from 'sinon';
import './badge';
import { ForgeBadge } from './badge';

describe('ForgeBadge', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('Basic Rendering', () => {
    it('should render with default properties', async () => {
      const el = await fixture<ForgeBadge>(html`<forge-badge></forge-badge>`);
      
      expect(el).to.exist;
      expect(el.variant).to.equal('default');
      expect(el.size).to.equal('md');
      expect(el.position).to.equal('inline');
    });

    it('should render with content', async () => {
      const el = await fixture<ForgeBadge>(html`
        <forge-badge content="NEW"></forge-badge>
      `);
      
      await el.updateComplete;
      
      const badge = el.shadowRoot?.querySelector('.badge');
      expect(badge?.textContent?.trim()).to.equal('NEW');
    });

    it('should render with count', async () => {
      const el = await fixture<ForgeBadge>(html`
        <forge-badge count="5"></forge-badge>
      `);
      
      await el.updateComplete;
      
      const badge = el.shadowRoot?.querySelector('.badge');
      expect(badge?.textContent?.trim()).to.equal('5');
    });

    it('should render slotted content', async () => {
      const el = await fixture<ForgeBadge>(html`
        <forge-badge>
          <button>Notifications</button>
        </forge-badge>
      `);
      
      const slot = el.shadowRoot?.querySelector('slot');
      expect(slot).to.exist;
    });
  });

  describe('Count Display', () => {
    it('should display count when greater than 0', async () => {
      const el = await fixture<ForgeBadge>(html`
        <forge-badge count="10"></forge-badge>
      `);
      
      const badge = el.shadowRoot?.querySelector('.badge');
      expect(badge?.textContent?.trim()).to.equal('10');
    });

    it('should display max count with plus when exceeded', async () => {
      const el = await fixture<ForgeBadge>(html`
        <forge-badge count="150" max-count="99"></forge-badge>
      `);
      
      const badge = el.shadowRoot?.querySelector('.badge');
      expect(badge?.textContent?.trim()).to.equal('99+');
    });

    it('should not display badge when count is 0 and no content', async () => {
      const el = await fixture<ForgeBadge>(html`
        <forge-badge count="0"></forge-badge>
      `);
      
      const badge = el.shadowRoot?.querySelector('.badge');
      expect(badge?.textContent?.trim()).to.equal('');
    });
  });

  describe('Dot Mode', () => {
    it('should render as dot when dot prop is true', async () => {
      const el = await fixture<ForgeBadge>(html`
        <forge-badge dot></forge-badge>
      `);
      
      expect(el.dot).to.be.true;
      expect(el.hasAttribute('dot')).to.be.true;
      
      const badge = el.shadowRoot?.querySelector('.badge');
      expect(badge?.textContent?.trim()).to.equal('');
    });

    it('should ignore content in dot mode', async () => {
      const el = await fixture<ForgeBadge>(html`
        <forge-badge dot content="NEW"></forge-badge>
      `);
      
      const badge = el.shadowRoot?.querySelector('.badge');
      expect(badge?.textContent?.trim()).to.equal('');
    });
  });

  describe('Variants', () => {
    const variants: Array<'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'> = 
      ['default', 'primary', 'success', 'warning', 'error', 'info'];
    
    variants.forEach(variant => {
      it(`should apply ${variant} variant`, async () => {
        const el = await fixture<ForgeBadge>(html`
          <forge-badge variant="${variant}"></forge-badge>
        `);
        
        expect(el.variant).to.equal(variant);
        expect(el.hasAttribute('variant')).to.be.true;
      });
    });
  });

  describe('Sizes', () => {
    const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];
    
    sizes.forEach(size => {
      it(`should apply ${size} size`, async () => {
        const el = await fixture<ForgeBadge>(html`
          <forge-badge size="${size}"></forge-badge>
        `);
        
        expect(el.size).to.equal(size);
        expect(el.hasAttribute('size')).to.be.true;
      });
    });
  });

  describe('Positions', () => {
    const positions: Array<'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'inline'> = 
      ['top-right', 'top-left', 'bottom-right', 'bottom-left', 'inline'];
    
    positions.forEach(position => {
      it(`should apply ${position} position`, async () => {
        const el = await fixture<ForgeBadge>(html`
          <forge-badge position="${position}"></forge-badge>
        `);
        
        expect(el.position).to.equal(position);
        expect(el.hasAttribute('position')).to.be.true;
      });
    });
  });

  describe('Styling Options', () => {
    it('should apply outlined style', async () => {
      const el = await fixture<ForgeBadge>(html`
        <forge-badge outlined></forge-badge>
      `);
      
      expect(el.outlined).to.be.true;
      expect(el.hasAttribute('outlined')).to.be.true;
    });

    it('should apply pulse animation', async () => {
      const el = await fixture<ForgeBadge>(html`
        <forge-badge pulse></forge-badge>
      `);
      
      expect(el.pulse).to.be.true;
      expect(el.hasAttribute('pulse')).to.be.true;
    });

    it('should handle invisible state', async () => {
      const el = await fixture<ForgeBadge>(html`
        <forge-badge invisible></forge-badge>
      `);
      
      expect(el.invisible).to.be.true;
      expect(el.getAttribute('aria-hidden')).to.equal('true');
    });
  });

  describe('Methods', () => {
    it('should increment count', async () => {
      const el = await fixture<ForgeBadge>(html`
        <forge-badge count="5"></forge-badge>
      `);
      
      el.increment();
      await el.updateComplete;
      
      expect(el.count).to.equal(6);
    });

    it('should decrement count', async () => {
      const el = await fixture<ForgeBadge>(html`
        <forge-badge count="5"></forge-badge>
      `);
      
      el.decrement();
      await el.updateComplete;
      
      expect(el.count).to.equal(4);
    });

    it('should not decrement below 0', async () => {
      const el = await fixture<ForgeBadge>(html`
        <forge-badge count="0"></forge-badge>
      `);
      
      el.decrement();
      await el.updateComplete;
      
      expect(el.count).to.equal(0);
    });

    it('should reset count and visibility', async () => {
      const el = await fixture<ForgeBadge>(html`
        <forge-badge count="10" invisible></forge-badge>
      `);
      
      el.reset();
      await el.updateComplete;
      
      expect(el.count).to.equal(0);
      expect(el.invisible).to.be.false;
    });

    it('should show badge', async () => {
      const el = await fixture<ForgeBadge>(html`
        <forge-badge invisible></forge-badge>
      `);
      
      el.show();
      await el.updateComplete;
      
      expect(el.invisible).to.be.false;
    });

    it('should hide badge', async () => {
      const el = await fixture<ForgeBadge>(html`
        <forge-badge></forge-badge>
      `);
      
      el.hide();
      await el.updateComplete;
      
      expect(el.invisible).to.be.true;
    });
  });

  describe('Accessibility', () => {
    it('should have status role', async () => {
      const el = await fixture<ForgeBadge>(html`<forge-badge></forge-badge>`);
      
      expect(el.getAttribute('role')).to.equal('status');
    });

    it('should have polite aria-live', async () => {
      const el = await fixture<ForgeBadge>(html`<forge-badge></forge-badge>`);
      
      expect(el.getAttribute('aria-live')).to.equal('polite');
    });

    it('should set aria-label for count', async () => {
      const el = await fixture<ForgeBadge>(html`
        <forge-badge count="5" variant="error"></forge-badge>
      `);
      
      expect(el.getAttribute('aria-label')).to.include('5');
      expect(el.getAttribute('aria-label')).to.include('error');
    });

    it('should set aria-label for dot mode', async () => {
      const el = await fixture<ForgeBadge>(html`
        <forge-badge dot></forge-badge>
      `);
      
      expect(el.getAttribute('aria-label')).to.equal('Status indicator');
    });

    it('should set aria-hidden when invisible', async () => {
      const el = await fixture<ForgeBadge>(html`
        <forge-badge invisible></forge-badge>
      `);
      
      expect(el.getAttribute('aria-hidden')).to.equal('true');
    });

    it('should set aria-description when provided', async () => {
      const el = await fixture<ForgeBadge>(html`
        <forge-badge aria-description="Notification badge"></forge-badge>
      `);
      
      expect(el.getAttribute('aria-description')).to.equal('Notification badge');
    });
  });

  describe('AI-Ready Features', () => {
    it('should set semantic role', async () => {
      const el = await fixture<ForgeBadge>(html`
        <forge-badge semantic-role="notification-count"></forge-badge>
      `);
      
      expect(el.semanticRole).to.equal('notification-count');
      expect(el.getAttribute('data-semantic-role')).to.equal('notification-count');
    });

    it('should set AI context', async () => {
      const el = await fixture<ForgeBadge>(html`
        <forge-badge ai-context="header-nav"></forge-badge>
      `);
      
      expect(el.aiContext).to.equal('header-nav');
      expect(el.getAttribute('data-ai-context')).to.equal('header-nav');
    });
  });

  describe('Performance Monitoring', () => {
    it('should track render performance', async () => {
      const el = await fixture<ForgeBadge>(html`
        <forge-badge max-render-ms="10"></forge-badge>
      `);
      
      expect(el.maxRenderMs).to.equal(10);
    });

    it('should warn on performance violation', async () => {
      const consoleWarn = sinon.stub(console, 'warn');
      
      const el = await fixture<ForgeBadge>(html`
        <forge-badge max-render-ms="0.001" warn-on-violation></forge-badge>
      `);
      
      el.increment();
      await el.updateComplete;
      
      expect(consoleWarn).to.have.been.called;
    });

    it('should disable pulse in auto mode when performance is poor', async () => {
      const el = await fixture<ForgeBadge>(html`
        <forge-badge 
          pulse 
          max-render-ms="0.001" 
          performance-mode="auto">
        </forge-badge>
      `);
      
      el.increment();
      await el.updateComplete;
      
      expect(el.pulse).to.be.false;
    });
  });

  describe('Developer Mode', () => {
    it('should log metrics in dev mode', async () => {
      const consoleLog = sinon.stub(console, 'log');
      
      const el = await fixture<ForgeBadge>(html`
        <forge-badge dev-mode></forge-badge>
      `);
      
      el.increment();
      await el.updateComplete;
      
      expect(consoleLog).to.have.been.called;
    });

    it('should show metrics overlay', async () => {
      const el = await fixture<ForgeBadge>(html`
        <forge-badge show-metrics></forge-badge>
      `);
      
      await el.updateComplete;
      
      const overlay = el.shadowRoot?.querySelector('.performance-overlay');
      expect(overlay).to.exist;
    });
  });
});