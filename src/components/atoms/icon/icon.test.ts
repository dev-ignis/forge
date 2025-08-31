import { fixture, expect, html } from '@open-wc/testing';
import sinon from 'sinon';
import '../button/button'; // Import button for integration test
import './icon';
import { ForgeIcon } from './icon';

describe('ForgeIcon', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('Basic Rendering', () => {
    it('should render with default properties', async () => {
      const el = await fixture<ForgeIcon>(html`<forge-icon></forge-icon>`);
      
      expect(el).to.exist;
      expect(el.size).to.equal('md');
      expect(el.spin).to.be.false;
      expect(el.pulse).to.be.false;
    });

    it('should render icon from registry', async () => {
      ForgeIcon.registerIcon('test-icon', '<path d="M0 0 L10 10"/>');
      const el = await fixture<ForgeIcon>(html`<forge-icon name="test-icon"></forge-icon>`);
      
      await el.updateComplete;
      
      const svg = el.shadowRoot?.querySelector('svg');
      expect(svg).to.exist;
      expect(svg?.innerHTML).to.include('M0 0 L10 10');
    });

    it('should apply size attribute', async () => {
      const el = await fixture<ForgeIcon>(html`<forge-icon size="lg"></forge-icon>`);
      
      expect(el.size).to.equal('lg');
      expect(el.hasAttribute('size')).to.be.true;
    });
  });

  describe('Icon Loading', () => {
    let fetchStub: sinon.SinonStub;

    beforeEach(() => {
      fetchStub = sinon.stub(window, 'fetch');
    });

    it('should load icon from URL', async () => {
      const svgContent = '<svg viewBox="0 0 24 24"><path d="M0 0 L24 24"/></svg>';
      fetchStub.resolves(new Response(svgContent, { status: 200 }));
      
      const el = await fixture<ForgeIcon>(html`<forge-icon src="/test.svg"></forge-icon>`);
      await el.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 10));
      
      const svg = el.shadowRoot?.querySelector('svg');
      expect(svg).to.exist;
      expect(svg?.innerHTML).to.include('M0 0 L24 24');
    });

    it('should handle loading error', async () => {
      fetchStub.rejects(new Error('Network error'));
      const consoleError = sinon.stub(console, 'error');
      
      const el = await fixture<ForgeIcon>(html`<forge-icon src="/error.svg"></forge-icon>`);
      await el.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 10));
      
      expect(consoleError).to.have.been.called;
    });

    it('should cache loaded icons', async () => {
      const svgContent = '<svg viewBox="0 0 24 24"><path d="M0 0 L24 24"/></svg>';
      fetchStub.resolves(new Response(svgContent, { status: 200 }));
      
      const el1 = await fixture<ForgeIcon>(html`<forge-icon name="cached" src="/cached.svg"></forge-icon>`);
      await el1.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 10));
      
      const el2 = await fixture<ForgeIcon>(html`<forge-icon name="cached"></forge-icon>`);
      await el2.updateComplete;
      
      expect(fetchStub).to.have.been.calledOnce;
    });
  });

  describe('Icon Registry', () => {
    it('should register single icon', () => {
      ForgeIcon.registerIcon('custom', '<circle cx="12" cy="12" r="10"/>');
      expect(ForgeIcon['iconRegistry'].has('custom')).to.be.true;
    });

    it('should register multiple icons', () => {
      ForgeIcon.registerIcons({
        icon1: '<path d="M0 0"/>',
        icon2: { svg: '<path d="M1 1"/>', viewBox: '0 0 100 100' }
      });
      
      expect(ForgeIcon['iconRegistry'].has('icon1')).to.be.true;
      expect(ForgeIcon['iconRegistry'].has('icon2')).to.be.true;
    });

    it('should load icon set from URL', async () => {
      const fetchStub = sinon.stub(window, 'fetch');
      fetchStub.resolves(new Response(JSON.stringify({
        icon1: '<path d="M0 0"/>',
        icon2: '<path d="M1 1"/>'
      }), { status: 200 }));
      
      await ForgeIcon.loadIconSet('/icons.json');
      
      expect(ForgeIcon['iconRegistry'].has('icon1')).to.be.true;
      expect(ForgeIcon['iconRegistry'].has('icon2')).to.be.true;
    });
  });

  describe('Animations', () => {
    it('should apply spin animation', async () => {
      const el = await fixture<ForgeIcon>(html`<forge-icon spin></forge-icon>`);
      
      expect(el.spin).to.be.true;
      expect(el.hasAttribute('spin')).to.be.true;
    });

    it('should apply pulse animation', async () => {
      const el = await fixture<ForgeIcon>(html`<forge-icon pulse></forge-icon>`);
      
      expect(el.pulse).to.be.true;
      expect(el.hasAttribute('pulse')).to.be.true;
    });
  });

  describe('Accessibility', () => {
    it('should set role to img when label is provided', async () => {
      const el = await fixture<ForgeIcon>(html`<forge-icon label="Home icon"></forge-icon>`);
      
      expect(el.getAttribute('role')).to.equal('img');
      expect(el.getAttribute('aria-label')).to.equal('Home icon');
    });

    it('should set role to presentation when no label', async () => {
      const el = await fixture<ForgeIcon>(html`<forge-icon></forge-icon>`);
      
      expect(el.getAttribute('role')).to.equal('presentation');
      expect(el.hasAttribute('aria-label')).to.be.false;
    });

    it('should set aria-description when provided', async () => {
      const el = await fixture<ForgeIcon>(html`
        <forge-icon aria-description="Navigation icon"></forge-icon>
      `);
      
      expect(el.getAttribute('aria-description')).to.equal('Navigation icon');
    });
  });

  describe('AI-Ready Features', () => {
    it('should set semantic role', async () => {
      const el = await fixture<ForgeIcon>(html`
        <forge-icon semantic-role="navigation-menu"></forge-icon>
      `);
      
      expect(el.semanticRole).to.equal('navigation-menu');
      expect(el.getAttribute('data-semantic-role')).to.equal('navigation-menu');
    });

    it('should set AI context', async () => {
      const el = await fixture<ForgeIcon>(html`
        <forge-icon ai-context="header-nav"></forge-icon>
      `);
      
      expect(el.aiContext).to.equal('header-nav');
      expect(el.getAttribute('data-ai-context')).to.equal('header-nav');
    });
  });

  describe('Performance Monitoring', () => {
    it('should track render performance', async () => {
      const el = await fixture<ForgeIcon>(html`
        <forge-icon max-render-ms="10"></forge-icon>
      `);
      
      expect(el.maxRenderMs).to.equal(10);
    });

    it('should warn on performance violation', async () => {
      const consoleWarn = sinon.stub(console, 'warn');
      
      const el = await fixture<ForgeIcon>(html`
        <forge-icon max-render-ms="0.001" warn-on-violation></forge-icon>
      `);
      
      await el.updateComplete;
      
      expect(consoleWarn).to.have.been.called;
    });

    it('should apply performance degradation in auto mode', async () => {
      const el = await fixture<ForgeIcon>(html`
        <forge-icon 
          spin 
          pulse 
          max-render-ms="0.001" 
          performance-mode="auto">
        </forge-icon>
      `);
      
      await el.updateComplete;
      
      expect(el.spin).to.be.false;
      expect(el.pulse).to.be.false;
    });
  });

  describe('Developer Mode', () => {
    it('should log metrics in dev mode', async () => {
      const consoleLog = sinon.stub(console, 'log');
      
      const el = await fixture<ForgeIcon>(html`
        <forge-icon dev-mode></forge-icon>
      `);
      
      await el.updateComplete;
      
      expect(consoleLog).to.have.been.called;
    });

    it('should show metrics overlay', async () => {
      const el = await fixture<ForgeIcon>(html`
        <forge-icon show-metrics></forge-icon>
      `);
      
      await el.updateComplete;
      
      const overlay = el.shadowRoot?.querySelector('.performance-overlay');
      expect(overlay).to.exist;
    });
  });

  describe('Common Icons', () => {
    it('should have common icons pre-registered', async () => {
      const el = await fixture<ForgeIcon>(html`<forge-icon name="check"></forge-icon>`);
      
      await el.updateComplete;
      
      const svg = el.shadowRoot?.querySelector('svg');
      expect(svg).to.exist;
      expect(svg?.innerHTML).to.include('M20 6L9 17l-5-5');
    });

    it('should render multiple common icons', async () => {
      const icons = ['chevron-down', 'close', 'menu', 'search', 'user'];
      
      for (const name of icons) {
        const el = await fixture<ForgeIcon>(html`<forge-icon name="${name}"></forge-icon>`);
        await el.updateComplete;
        
        const svg = el.shadowRoot?.querySelector('svg');
        expect(svg).to.exist;
      }
    });
  });

  describe('Error Handling', () => {
    it('should show error icon for missing icon', async () => {
      const consoleWarn = sinon.stub(console, 'warn');
      
      const el = await fixture<ForgeIcon>(html`<forge-icon name="non-existent"></forge-icon>`);
      await el.updateComplete;
      
      const svg = el.shadowRoot?.querySelector('svg');
      expect(svg).to.exist;
      expect(svg?.innerHTML).to.include('line');
      expect(consoleWarn).to.have.been.called;
    });

    it('should show loading state', async () => {
      const fetchStub = sinon.stub(window, 'fetch');
      fetchStub.returns(new Promise(() => {}));
      
      const el = await fixture<ForgeIcon>(html`<forge-icon src="/loading.svg"></forge-icon>`);
      await el.updateComplete;
      
      const svg = el.shadowRoot?.querySelector('svg');
      expect(svg).to.exist;
      expect(svg?.innerHTML).to.include('animateTransform');
    });
  });
});