import { fixture, expect, html } from '@open-wc/testing';
import './tabs';
import { ForgeTabs } from './tabs';
import type { TabItem } from './tabs';

describe('ForgeTabs', () => {
  const mockTabs: TabItem[] = [
    { id: 'tab1', label: 'Tab 1', panel: 'Content 1' },
    { id: 'tab2', label: 'Tab 2', panel: 'Content 2', icon: 'star' },
    { id: 'tab3', label: 'Tab 3', panel: 'Content 3', disabled: true },
    { id: 'tab4', label: 'Tab 4', panel: 'Content 4', closeable: true, badge: '5' }
  ];

  describe('Basic Rendering', () => {
    it('should render with default properties', async () => {
      const el = await fixture<ForgeTabs>(html`<forge-tabs></forge-tabs>`);
      
      expect(el).to.exist;
      expect(el.tabs).to.deep.equal([]);
      expect(el.orientation).to.equal('horizontal');
      expect(el.reorderable).to.be.false;
    });

    it('should render tabs', async () => {
      const el = await fixture<ForgeTabs>(html`
        <forge-tabs .tabs=${mockTabs}></forge-tabs>
      `);
      
      await el.updateComplete;
      
      const tabButtons = el.shadowRoot?.querySelectorAll('.tab-item');
      expect(tabButtons).to.have.length(4);
    });

    it('should set first enabled tab as active by default', async () => {
      const el = await fixture<ForgeTabs>(html`
        <forge-tabs .tabs=${mockTabs}></forge-tabs>
      `);
      
      await el.updateComplete;
      
      expect(el.activeTab).to.equal('tab1');
    });
  });

  describe('Tab Selection', () => {
    it('should switch tabs on click', async () => {
      const el = await fixture<ForgeTabs>(html`
        <forge-tabs .tabs=${mockTabs}></forge-tabs>
      `);
      
      await el.updateComplete;
      
      const tabButtons = el.shadowRoot?.querySelectorAll('.tab-item');
      const secondTab = tabButtons?.[1] as HTMLElement;
      
      let eventFired = false;
      el.addEventListener('tabchange', (e: Event) => {
        eventFired = true;
        const detail = (e as CustomEvent).detail;
        expect(detail.oldTab).to.equal('tab1');
        expect(detail.newTab).to.equal('tab2');
      });
      
      secondTab.click();
      await el.updateComplete;
      
      expect(el.activeTab).to.equal('tab2');
      expect(eventFired).to.be.true;
    });

    it('should not select disabled tab', async () => {
      const el = await fixture<ForgeTabs>(html`
        <forge-tabs .tabs=${mockTabs}></forge-tabs>
      `);
      
      await el.updateComplete;
      
      const tabButtons = el.shadowRoot?.querySelectorAll('.tab-item');
      const disabledTab = tabButtons?.[2] as HTMLElement;
      
      disabledTab.click();
      await el.updateComplete;
      
      expect(el.activeTab).to.equal('tab1'); // Should remain on first tab
    });
  });

  describe('Keyboard Navigation', () => {
    it('should navigate with arrow keys', async () => {
      const el = await fixture<ForgeTabs>(html`
        <forge-tabs .tabs=${mockTabs}></forge-tabs>
      `);
      
      await el.updateComplete;
      
      // Simulate arrow right
      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      el.dispatchEvent(event);
      
      await el.updateComplete;
      
      expect(el.activeTab).to.equal('tab2');
    });

    it('should skip disabled tabs in keyboard navigation', async () => {
      const el = await fixture<ForgeTabs>(html`
        <forge-tabs .tabs=${mockTabs} active-tab="tab2"></forge-tabs>
      `);
      
      await el.updateComplete;
      
      // Simulate arrow right (should skip disabled tab3)
      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      el.dispatchEvent(event);
      
      await el.updateComplete;
      
      expect(el.activeTab).to.equal('tab4');
    });
  });

  describe('Closeable Tabs', () => {
    it('should close tab when close icon clicked', async () => {
      const el = await fixture<ForgeTabs>(html`
        <forge-tabs .tabs=${mockTabs}></forge-tabs>
      `);
      
      await el.updateComplete;
      
      const closeIcon = el.shadowRoot?.querySelector('.tab-item:last-child .tab-close');
      
      let eventFired = false;
      el.addEventListener('tabclose', (e: Event) => {
        eventFired = true;
        expect((e as CustomEvent).detail.tabId).to.equal('tab4');
      });
      
      (closeIcon as HTMLElement)?.click();
      await el.updateComplete;
      
      expect(eventFired).to.be.true;
      expect(el.tabs).to.have.length(3);
    });
  });

  describe('Vertical Orientation', () => {
    it('should render vertically', async () => {
      const el = await fixture<ForgeTabs>(html`
        <forge-tabs .tabs=${mockTabs} orientation="vertical"></forge-tabs>
      `);
      
      await el.updateComplete;
      
      const container = el.shadowRoot?.querySelector('.tabs-container');
      expect(container?.classList.contains('vertical')).to.be.true;
    });
  });

  describe('AI Metadata', () => {
    it('should provide AI state', async () => {
      const el = await fixture<ForgeTabs>(html`
        <forge-tabs .tabs=${mockTabs} active-tab="tab2"></forge-tabs>
      `);
      
      const aiState = el.aiState;
      
      expect(aiState.activeTab).to.equal('tab2');
      expect(aiState.tabCount).to.equal(4);
      expect(aiState.orientation).to.equal('horizontal');
      expect(aiState.hasCloseable).to.be.true;
      expect(aiState.hasDisabled).to.be.true;
    });

    it('should explain state in natural language', async () => {
      const el = await fixture<ForgeTabs>(html`
        <forge-tabs .tabs=${mockTabs} active-tab="tab1" reorderable></forge-tabs>
      `);
      
      const explanation = el.explainState();
      
      expect(explanation).to.include('Tabs component');
      expect(explanation).to.include('showing "Tab 1" tab');
      expect(explanation).to.include('4 total tabs');
      expect(explanation).to.include('horizontal');
      expect(explanation).to.include('drag to reorder enabled');
    });

    it('should provide possible actions', async () => {
      const el = await fixture<ForgeTabs>(html`
        <forge-tabs .tabs=${mockTabs} active-tab="tab1"></forge-tabs>
      `);
      
      const actions = el.getPossibleActions();
      
      // Should have actions to select other non-disabled tabs
      const selectActions = actions.filter(a => a.name === 'selectTab');
      expect(selectActions).to.have.length(2); // tab2 and tab4 (tab3 is disabled)
      
      // Should have close action for closeable tab
      const closeActions = actions.filter(a => a.name === 'closeTab');
      expect(closeActions).to.have.length(1);
    });
  });

  describe('Performance', () => {
    it('should lazy load panels', async () => {
      const el = await fixture<ForgeTabs>(html`
        <forge-tabs .tabs=${mockTabs} lazy-load></forge-tabs>
      `);
      
      await el.updateComplete;
      
      // Only active panel should be loaded initially
      expect(el['loadedPanels'].size).to.equal(1);
      expect(el['loadedPanels'].has('tab1')).to.be.true;
      
      // Select another tab
      const tabButtons = el.shadowRoot?.querySelectorAll('.tab-item');
      (tabButtons?.[1] as HTMLElement).click();
      
      await el.updateComplete;
      
      // Now two panels should be loaded
      expect(el['loadedPanels'].size).to.equal(2);
      expect(el['loadedPanels'].has('tab2')).to.be.true;
    });
  });
});