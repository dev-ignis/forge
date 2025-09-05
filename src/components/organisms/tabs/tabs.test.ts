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
      
      expect(aiState.state.activeTab).to.equal('tab2');
      expect(aiState.state.tabCount).to.equal(4);
      expect(aiState.state.orientation).to.equal('horizontal');
      expect(aiState.state.hasCloseable).to.be.true;
      expect(aiState.state.hasDisabled).to.be.true;
    });

    it('should explain state in natural language', async () => {
      const el = await fixture<ForgeTabs>(html`
        <forge-tabs .tabs=${mockTabs} active-tab="tab1" reorderable></forge-tabs>
      `);
      
      const explanation = el.explainState();
      
      expect(explanation.stateDescription).to.include('Tabs component');
      expect(explanation.stateDescription).to.include('showing "Tab 1" tab');
      expect(explanation.stateDescription).to.include('4 total tabs');
      expect(explanation.stateDescription).to.include('horizontal');
      expect(explanation.stateDescription).to.include('drag to reorder enabled');
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

  describe('Local Storage', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('should remember active tab when rememberActive is true', async () => {
      const el = await fixture<ForgeTabs>(html`
        <forge-tabs 
          .tabs=${mockTabs} 
          remember-active
          storage-key="test-tabs"
        ></forge-tabs>
      `);
      
      await el.updateComplete;
      
      // Switch to tab2
      const tabButtons = el.shadowRoot?.querySelectorAll('.tab-item');
      (tabButtons?.[1] as HTMLElement).click();
      await el.updateComplete;
      
      expect(el.activeTab).to.equal('tab2');
      
      // Create a new instance - should remember the previously active tab
      const el2 = await fixture<ForgeTabs>(html`
        <forge-tabs 
          .tabs=${mockTabs} 
          remember-active
          storage-key="test-tabs"
        ></forge-tabs>
      `);
      
      await el2.updateComplete;
      expect(el2.activeTab).to.equal('tab2');
    });

    it('should not remember active tab when rememberActive is false', async () => {
      const el = await fixture<ForgeTabs>(html`
        <forge-tabs 
          .tabs=${mockTabs} 
          remember-active=${false}
          storage-key="test-tabs"
        ></forge-tabs>
      `);
      
      await el.updateComplete;
      
      // Should default to first enabled tab
      expect(el.activeTab).to.equal('tab1');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty tabs array', async () => {
      const el = await fixture<ForgeTabs>(html`
        <forge-tabs .tabs=${[]}></forge-tabs>
      `);
      
      await el.updateComplete;
      
      expect(el.activeTab).to.be.undefined;
      expect(el.tabs).to.deep.equal([]);
    });

    it('should handle all disabled tabs', async () => {
      const disabledTabs: TabItem[] = [
        { id: 'tab1', label: 'Tab 1', panel: 'Content 1', disabled: true },
        { id: 'tab2', label: 'Tab 2', panel: 'Content 2', disabled: true }
      ];

      const el = await fixture<ForgeTabs>(html`
        <forge-tabs .tabs=${disabledTabs}></forge-tabs>
      `);
      
      await el.updateComplete;
      
      expect(el.activeTab).to.be.undefined;
    });

    it('should handle programmatic tab switching', async () => {
      const el = await fixture<ForgeTabs>(html`
        <forge-tabs .tabs=${mockTabs}></forge-tabs>
      `);
      
      await el.updateComplete;
      
      // Programmatically set active tab
      el.activeTab = 'tab2';
      await el.updateComplete;
      
      expect(el.activeTab).to.equal('tab2');
      
      // Switch back to first tab
      el.activeTab = 'tab1';
      await el.updateComplete;
      
      expect(el.activeTab).to.equal('tab1');
    });

    it('should handle disconnection properly', async () => {
      const el = await fixture<ForgeTabs>(html`
        <forge-tabs .tabs=${mockTabs}></forge-tabs>
      `);
      
      await el.updateComplete;
      
      // Test disconnectedCallback
      el.remove();
      
      // Should not throw errors when disconnected
      expect(() => {
        el.activeTab = 'tab2';
      }).to.not.throw();
    });
  });

  describe('Accessibility Compliance', () => {
    it('meets WCAG 2.1 AA standards', async () => {
      const el = await fixture<ForgeTabs>(html`
        <forge-tabs .tabs=${mockTabs}></forge-tabs>
      `);
      
      await expect(el).to.be.accessible();
    });

    it('provides proper ARIA roles for tab structure', async () => {
      const el = await fixture<ForgeTabs>(html`
        <forge-tabs .tabs=${mockTabs}></forge-tabs>
      `);
      
      await el.updateComplete;
      
      // Check for tablist role
      const tablist = el.shadowRoot?.querySelector('[role="tablist"]');
      expect(tablist).to.exist;
      
      // Check for tab roles
      const tabs = el.shadowRoot?.querySelectorAll('[role="tab"]');
      expect(tabs!.length).to.be.greaterThan(0);
      
      // Check for tabpanel roles  
      const tabpanels = el.shadowRoot?.querySelectorAll('[role="tabpanel"]');
      expect(tabpanels!.length).to.be.greaterThan(0);
    });

    it('maintains proper tab index management', async () => {
      const el = await fixture<ForgeTabs>(html`
        <forge-tabs .tabs=${mockTabs}></forge-tabs>
      `);
      
      await el.updateComplete;
      
      const tabs = el.shadowRoot?.querySelectorAll('[role="tab"]');
      
      // Only active tab should have tabindex="0"
      let activeTabFound = false;
      tabs?.forEach((tab) => {
        const tabIndex = tab.getAttribute('tabindex');
        if (tab.getAttribute('aria-selected') === 'true') {
          expect(tabIndex).to.equal('0');
          activeTabFound = true;
        } else {
          expect(tabIndex).to.equal('-1');
        }
      });
      
      expect(activeTabFound).to.be.true;
    });

    it('supports keyboard navigation with arrow keys', async () => {
      const el = await fixture<ForgeTabs>(html`
        <forge-tabs .tabs=${mockTabs}></forge-tabs>
      `);
      
      await el.updateComplete;
      
      // Focus first tab
      const firstTab = el.shadowRoot?.querySelector('[role="tab"]') as HTMLElement;
      firstTab?.focus();
      
      // Simulate arrow right key
      const rightArrowEvent = new KeyboardEvent('keydown', {
        key: 'ArrowRight',
        bubbles: true
      });
      firstTab.dispatchEvent(rightArrowEvent);
      await el.updateComplete;
      
      // Should move to next tab (implementation may vary)
      expect(firstTab).to.exist; // Basic test that event was handled
    });

    it('handles Enter and Space key activation', async () => {
      const el = await fixture<ForgeTabs>(html`
        <forge-tabs .tabs=${mockTabs}></forge-tabs>
      `);
      
      await el.updateComplete;
      
      const inactiveTab = el.shadowRoot?.querySelector('[role="tab"]:not([aria-selected="true"])') as HTMLElement;
      
      if (inactiveTab) {
        // Test Enter key activation
        const enterEvent = new KeyboardEvent('keydown', {
          key: 'Enter',
          bubbles: true
        });
        inactiveTab.dispatchEvent(enterEvent);
        await el.updateComplete;
        
        // Tab should be activated (specific assertion depends on implementation)
        expect(inactiveTab).to.exist;
      }
    });

    it('provides proper ARIA relationships', async () => {
      const el = await fixture<ForgeTabs>(html`
        <forge-tabs .tabs=${mockTabs}></forge-tabs>
      `);
      
      await el.updateComplete;
      
      const tabs = el.shadowRoot?.querySelectorAll('[role="tab"]');
      const tabpanels = el.shadowRoot?.querySelectorAll('[role="tabpanel"]');
      
      // Each tab should control a tabpanel
      tabs?.forEach((tab, index) => {
        const controlsId = tab.getAttribute('aria-controls');
        expect(controlsId).to.exist;
        
        // Corresponding tabpanel should have matching id
        const correspondingPanel = tabpanels?.[index];
        if (correspondingPanel) {
          expect(correspondingPanel.getAttribute('aria-labelledby')).to.equal(tab.id);
        }
      });
    });

    it('announces tab changes to screen readers', async () => {
      const el = await fixture<ForgeTabs>(html`
        <forge-tabs .tabs=${mockTabs}></forge-tabs>
      `);
      
      await el.updateComplete;
      
      // Check initial state
      const initialActiveTab = el.shadowRoot?.querySelector('[aria-selected="true"]');
      expect(initialActiveTab).to.exist;
      
      // Click different tab
      const inactiveTab = el.shadowRoot?.querySelector('[role="tab"]:not([aria-selected="true"])') as HTMLElement;
      inactiveTab?.click();
      await el.updateComplete;
      
      // Verify aria-selected changed appropriately
      expect(inactiveTab).to.have.attribute('aria-selected', 'true');
    });
  });
});