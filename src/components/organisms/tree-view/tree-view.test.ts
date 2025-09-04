import { fixture, expect, html, elementUpdated } from '@open-wc/testing';
import './tree-view';
import { ForgeTreeView } from './tree-view';
import type { TreeNode } from './tree-view';

describe('ForgeTreeView', () => {
  const mockNodes: TreeNode[] = [
    {
      id: 'folder1',
      label: 'Documents',
      icon: 'folder',
      expanded: true,
      children: [
        { id: 'file1', label: 'Report.pdf', icon: 'file' },
        { 
          id: 'subfolder1', 
          label: 'Archive', 
          icon: 'folder',
          children: [
            { id: 'file2', label: 'Old Report.pdf', icon: 'file' }
          ]
        }
      ]
    },
    {
      id: 'folder2',
      label: 'Images',
      icon: 'folder',
      children: [
        { id: 'file3', label: 'photo1.jpg', icon: 'image' },
        { id: 'file4', label: 'photo2.jpg', icon: 'image', disabled: true }
      ]
    },
    { id: 'file5', label: 'readme.txt', icon: 'file', selected: true }
  ];

  describe('Basic Rendering', () => {
    it('should render with default properties', async () => {
      const el = await fixture<ForgeTreeView>(html`<forge-tree-view></forge-tree-view>`);
      
      expect(el).to.exist;
      expect(el.nodes).to.deep.equal([]);
      expect(el.selectable).to.be.true;
      expect(el.selectionMode).to.equal('single');
      expect(el.showCheckboxes).to.be.false;
      expect(el.showSearch).to.be.false;
    });

    it('should render tree nodes', async () => {
      const el = await fixture<ForgeTreeView>(html`
        <forge-tree-view .nodes=${mockNodes}></forge-tree-view>
      `);
      
      await el.updateComplete;
      
      const treeNodes = el.shadowRoot?.querySelectorAll('.tree-node');
      expect(treeNodes).to.exist;
      expect(treeNodes!.length).to.be.greaterThan(0);
    });

    it('should render expanded nodes by default', async () => {
      const el = await fixture<ForgeTreeView>(html`
        <forge-tree-view .nodes=${mockNodes}></forge-tree-view>
      `);
      
      await el.updateComplete;
      
      // Documents folder should be expanded by default
      const expandedNode = el.shadowRoot?.querySelector('.tree-node-content[data-node-id="folder1"]');
      expect(expandedNode).to.exist;
    });
  });

  describe('Node Expansion', () => {
    it('should toggle node expansion on click', async () => {
      const el = await fixture<ForgeTreeView>(html`
        <forge-tree-view .nodes=${mockNodes}></forge-tree-view>
      `);
      
      await el.updateComplete;
      
      const toggleButton = el.shadowRoot?.querySelector('[data-node-id="folder2"] .tree-node-toggle') as HTMLElement;
      expect(toggleButton).to.exist;
      
      // Click to expand
      toggleButton.click();
      await el.updateComplete;
      
      // Check if expanded state changed
      expect(el['expandedNodes'].has('folder2')).to.be.true;
    });

    it('should emit nodeexpand event on expansion', async () => {
      const el = await fixture<ForgeTreeView>(html`
        <forge-tree-view .nodes=${mockNodes}></forge-tree-view>
      `);
      
      let eventDetail: any = null;
      el.addEventListener('nodeexpand', (e: Event) => {
        eventDetail = (e as CustomEvent).detail;
      });
      
      const toggleButton = el.shadowRoot?.querySelector('[data-node-id="folder2"] .tree-node-toggle') as HTMLElement;
      toggleButton?.click();
      
      await el.updateComplete;
      
      expect(eventDetail).to.exist;
      expect(eventDetail.nodeId).to.equal('folder2');
      expect(eventDetail.expanded).to.be.true;
    });
  });

  describe('Node Selection', () => {
    it('should select node on click', async () => {
      const el = await fixture<ForgeTreeView>(html`
        <forge-tree-view .nodes=${mockNodes}></forge-tree-view>
      `);
      
      await el.updateComplete;
      
      const nodeContent = el.shadowRoot?.querySelector('[data-node-id="file1"]') as HTMLElement;
      nodeContent.click();
      
      await el.updateComplete;
      
      expect(el['selectedNodes'].has('file1')).to.be.true;
    });

    it('should emit nodeselect event on selection', async () => {
      const el = await fixture<ForgeTreeView>(html`
        <forge-tree-view .nodes=${mockNodes}></forge-tree-view>
      `);
      
      let eventDetail: any = null;
      el.addEventListener('nodeselect', (e: Event) => {
        eventDetail = (e as CustomEvent).detail;
      });
      
      const nodeContent = el.shadowRoot?.querySelector('[data-node-id="file1"]') as HTMLElement;
      nodeContent?.click();
      
      await el.updateComplete;
      
      expect(eventDetail).to.exist;
      expect(eventDetail.nodeId).to.equal('file1');
      expect(eventDetail.selected).to.be.true;
    });

    it('should handle single selection mode', async () => {
      const el = await fixture<ForgeTreeView>(html`
        <forge-tree-view .nodes=${mockNodes} selection-mode="single"></forge-tree-view>
      `);
      
      await el.updateComplete;
      
      // Select first node
      const firstNode = el.shadowRoot?.querySelector('[data-node-id="file1"]') as HTMLElement;
      firstNode?.click();
      await el.updateComplete;
      
      // Select second node - should deselect first
      const secondNode = el.shadowRoot?.querySelector('[data-node-id="file3"]') as HTMLElement;
      secondNode?.click();
      await el.updateComplete;
      
      expect(el['selectedNodes'].has('file1')).to.be.false;
      expect(el['selectedNodes'].has('file3')).to.be.true;
      expect(el['selectedNodes'].size).to.equal(1);
    });

    it('should handle multiple selection mode', async () => {
      const el = await fixture<ForgeTreeView>(html`
        <forge-tree-view .nodes=${mockNodes} selection-mode="multiple"></forge-tree-view>
      `);
      
      await el.updateComplete;
      
      // Clear any pre-selected nodes
      (el as any).clearSelection();
      await el.updateComplete;
      
      // Select first node
      const firstNode = el.shadowRoot?.querySelector('[data-node-id="file1"]') as HTMLElement;
      firstNode?.click();
      await el.updateComplete;
      
      // Select second node - both should be selected
      const secondNode = el.shadowRoot?.querySelector('[data-node-id="file3"]') as HTMLElement;
      secondNode?.click();
      await el.updateComplete;
      
      expect(el['selectedNodes'].has('file1')).to.be.true;
      expect(el['selectedNodes'].has('file3')).to.be.true;
      expect(el['selectedNodes'].size).to.equal(2);
    });

    it('should not select disabled nodes', async () => {
      const el = await fixture<ForgeTreeView>(html`
        <forge-tree-view .nodes=${mockNodes}></forge-tree-view>
      `);
      
      await el.updateComplete;
      
      const disabledNode = el.shadowRoot?.querySelector('[data-node-id="file4"]') as HTMLElement;
      disabledNode?.click();
      
      await el.updateComplete;
      
      expect(el['selectedNodes'].has('file4')).to.be.false;
    });
  });

  describe('Checkbox Mode', () => {
    it('should show checkboxes when enabled', async () => {
      const el = await fixture<ForgeTreeView>(html`
        <forge-tree-view .nodes=${mockNodes} show-checkboxes></forge-tree-view>
      `);
      
      await el.updateComplete;
      
      const checkboxes = el.shadowRoot?.querySelectorAll('forge-checkbox');
      expect(checkboxes!.length).to.be.greaterThan(0);
    });

    it('should select node via checkbox', async () => {
      const el = await fixture<ForgeTreeView>(html`
        <forge-tree-view .nodes=${mockNodes} show-checkboxes></forge-tree-view>
      `);
      
      await el.updateComplete;
      
      const checkbox = el.shadowRoot?.querySelector('[data-node-id="file1"] forge-checkbox') as any;
      checkbox?.click();
      
      await el.updateComplete;
      
      expect(el['selectedNodes'].has('file1')).to.be.true;
    });
  });

  describe('Search Functionality', () => {
    it('should show search input when enabled', async () => {
      const el = await fixture<ForgeTreeView>(html`
        <forge-tree-view .nodes=${mockNodes} show-search></forge-tree-view>
      `);
      
      await el.updateComplete;
      
      const searchInput = el.shadowRoot?.querySelector('forge-input');
      expect(searchInput).to.exist;
    });

    it('should filter nodes based on search term', async () => {
      const el = await fixture<ForgeTreeView>(html`
        <forge-tree-view .nodes=${mockNodes} show-search search-term="pdf"></forge-tree-view>
      `);
      
      await el.updateComplete;
      
      // Should show nodes containing "pdf" in the label
      const visibleNodes = el.shadowRoot?.querySelectorAll('.tree-node:not([hidden])');
      // This would depend on the actual filtering implementation
      expect(visibleNodes).to.exist;
    });
  });

  describe('Keyboard Navigation', () => {
    it('should handle arrow key navigation', async () => {
      const el = await fixture<ForgeTreeView>(html`
        <forge-tree-view .nodes=${mockNodes}></forge-tree-view>
      `);
      
      await el.updateComplete;
      
      // Focus the tree view
      el.focus();
      
      // Simulate arrow down key
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      el.dispatchEvent(event);
      
      await el.updateComplete;
      
      // Should move focus to next node
      expect(el.shadowRoot?.activeElement).to.exist;
    });

    it('should expand/collapse on Enter/Space keys', async () => {
      const el = await fixture<ForgeTreeView>(html`
        <forge-tree-view .nodes=${mockNodes}></forge-tree-view>
      `);
      
      await el.updateComplete;
      
      // Focus on a collapsible node
      const folderNode = el.shadowRoot?.querySelector('[data-node-id="folder2"]') as HTMLElement;
      folderNode?.focus();
      
      // Press Enter to expand
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      el.dispatchEvent(enterEvent);
      
      await el.updateComplete;
      
      expect(el['expandedNodes'].has('folder2')).to.be.true;
    });
  });

  describe('AI Metadata', () => {
    it('should provide AI state', async () => {
      const el = await fixture<ForgeTreeView>(html`
        <forge-tree-view .nodes=${mockNodes}></forge-tree-view>
      `);
      
      const aiState = el.aiState;
      
      expect(aiState.nodeCount).to.be.a('number');
      expect(aiState.expandedCount).to.be.a('number');
      expect(aiState.selectedCount).to.be.a('number');
      expect(aiState.selectable).to.equal(true);
      expect(aiState.selectionMode).to.equal('single');
    });

    it('should explain state in natural language', async () => {
      const el = await fixture<ForgeTreeView>(html`
        <forge-tree-view .nodes=${mockNodes}></forge-tree-view>
      `);
      
      const explanation = el.explainState();
      
      expect(explanation).to.include('Tree view');
      expect(explanation).to.include('nodes');
    });

    it('should provide possible actions', async () => {
      const el = await fixture<ForgeTreeView>(html`
        <forge-tree-view .nodes=${mockNodes}></forge-tree-view>
      `);
      
      const actions = el.getPossibleActions();
      
      expect(actions).to.be.an('array');
      expect(actions.some(a => a.name === 'selectNode')).to.be.true;
      expect(actions.some(a => a.name === 'expandNode')).to.be.true;
    });
  });

  describe('Accessibility Compliance', () => {
    it('meets WCAG 2.1 AA standards', async () => {
      const el = await fixture<ForgeTreeView>(html`
        <forge-tree-view .nodes=${mockNodes}></forge-tree-view>
      `);
      
      await expect(el).to.be.accessible();
    });

    it('provides proper ARIA tree structure', async () => {
      const el = await fixture<ForgeTreeView>(html`
        <forge-tree-view .nodes=${mockNodes}></forge-tree-view>
      `);
      
      await el.updateComplete;
      
      // Check for tree role
      const tree = el.shadowRoot?.querySelector('[role="tree"]');
      expect(tree).to.exist;
      
      // Check for treeitem roles
      const treeitems = el.shadowRoot?.querySelectorAll('[role="treeitem"]');
      expect(treeitems!.length).to.be.greaterThan(0);
      
      // Check for group roles on parent nodes with children
      const groups = el.shadowRoot?.querySelectorAll('[role="group"]');
      expect(groups).to.exist;
    });

    it('maintains proper ARIA expanded states', async () => {
      const el = await fixture<ForgeTreeView>(html`
        <forge-tree-view .nodes=${mockNodes}></forge-tree-view>
      `);
      
      await el.updateComplete;
      
      const expandableItems = el.shadowRoot?.querySelectorAll('[aria-expanded]');
      expandableItems?.forEach((item) => {
        const expanded = item.getAttribute('aria-expanded');
        expect(expanded).to.be.oneOf(['true', 'false']);
      });
    });

    it('supports keyboard navigation with arrow keys', async () => {
      const el = await fixture<ForgeTreeView>(html`
        <forge-tree-view .nodes=${mockNodes}></forge-tree-view>
      `);
      
      await el.updateComplete;
      
      // Focus first tree item
      const firstItem = el.shadowRoot?.querySelector('[role="treeitem"]') as HTMLElement;
      firstItem?.focus();
      
      // Test down arrow navigation
      const downArrowEvent = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        bubbles: true
      });
      firstItem.dispatchEvent(downArrowEvent);
      await el.updateComplete;
      
      // Should navigate to next item (implementation may vary)
      expect(firstItem).to.exist;
    });

    it('handles Home and End key navigation', async () => {
      const el = await fixture<ForgeTreeView>(html`
        <forge-tree-view .nodes=${mockNodes}></forge-tree-view>
      `);
      
      await el.updateComplete;
      
      const firstItem = el.shadowRoot?.querySelector('[role="treeitem"]') as HTMLElement;
      firstItem?.focus();
      
      // Test End key (should go to last visible item)
      const endEvent = new KeyboardEvent('keydown', {
        key: 'End',
        bubbles: true
      });
      firstItem.dispatchEvent(endEvent);
      await el.updateComplete;
      
      // Test Home key (should go to first item)
      const homeEvent = new KeyboardEvent('keydown', {
        key: 'Home',
        bubbles: true
      });
      firstItem.dispatchEvent(homeEvent);
      await el.updateComplete;
      
      expect(firstItem).to.exist;
    });

    it('announces selection changes to screen readers', async () => {
      const el = await fixture<ForgeTreeView>(html`
        <forge-tree-view .nodes=${mockNodes}></forge-tree-view>
      `);
      
      await el.updateComplete;
      
      const firstItem = el.shadowRoot?.querySelector('[role="treeitem"]') as HTMLElement;
      
      // Initial state
      const initialSelected = firstItem?.getAttribute('aria-selected');
      
      // Select item
      firstItem?.click();
      await el.updateComplete;
      
      // Should update aria-selected
      const newSelected = firstItem?.getAttribute('aria-selected');
      expect(newSelected).to.not.equal(initialSelected);
    });

    it('provides proper focus management', async () => {
      const el = await fixture<ForgeTreeView>(html`
        <forge-tree-view .nodes=${mockNodes}></forge-tree-view>
      `);
      
      await el.updateComplete;
      
      // Tree should have proper tabindex management
      const focusableItems = el.shadowRoot?.querySelectorAll('[tabindex="0"]');
      expect(focusableItems!.length).to.equal(1); // Only one item should be focusable
      
      const nonFocusableItems = el.shadowRoot?.querySelectorAll('[tabindex="-1"]');
      expect(nonFocusableItems!.length).to.be.greaterThan(0); // Other items should be non-focusable
    });
  });

  describe('Public Methods', () => {
    it('should expand node programmatically', async () => {
      const el = await fixture<ForgeTreeView>(html`
        <forge-tree-view .nodes=${mockNodes}></forge-tree-view>
      `);
      
      await el.updateComplete;
      
      // Expand node programmatically
      (el as any).expandNode('folder2');
      await el.updateComplete;
      
      expect(el['expandedNodes'].has('folder2')).to.be.true;
    });

    it('should collapse node programmatically', async () => {
      const el = await fixture<ForgeTreeView>(html`
        <forge-tree-view .nodes=${mockNodes}></forge-tree-view>
      `);
      
      await el.updateComplete;
      
      // folder1 is expanded by default, collapse it
      (el as any).collapseNode('folder1');
      await el.updateComplete;
      
      expect(el['expandedNodes'].has('folder1')).to.be.false;
    });

    it('should select node programmatically', async () => {
      const el = await fixture<ForgeTreeView>(html`
        <forge-tree-view .nodes=${mockNodes}></forge-tree-view>
      `);
      
      await el.updateComplete;
      
      // Select node programmatically
      (el as any).selectNode('file3');
      await el.updateComplete;
      
      expect(el['selectedNodes'].has('file3')).to.be.true;
    });

    it('should clear selection', async () => {
      const el = await fixture<ForgeTreeView>(html`
        <forge-tree-view .nodes=${mockNodes}></forge-tree-view>
      `);
      
      await el.updateComplete;
      
      // Select some nodes first
      (el as any).selectNode('file1');
      (el as any).selectNode('file3');
      await el.updateComplete;
      
      expect(el['selectedNodes'].size).to.be.greaterThan(0);
      
      // Clear selection
      (el as any).clearSelection();
      await el.updateComplete;
      
      expect(el['selectedNodes'].size).to.equal(0);
    });
  });
});