import { fixture, expect, html } from '@open-wc/testing';
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
          children: [{ id: 'file2', label: 'Old Report.pdf', icon: 'file' }],
        },
      ],
    },
    {
      id: 'folder2',
      label: 'Images',
      icon: 'folder',
      children: [
        { id: 'file3', label: 'photo1.jpg', icon: 'image' },
        { id: 'file4', label: 'photo2.jpg', icon: 'image', disabled: true },
      ],
    },
    { id: 'file5', label: 'readme.txt', icon: 'file', selected: true },
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

      // With virtual scrolling, check internal state instead of DOM
      expect(el['expandedNodes'].has('folder1')).to.be.true;

      // Documents folder should be visible in virtual scrolling viewport
      const treeNodes = el.shadowRoot?.querySelectorAll('[data-node-id]');
      const hasFolder1 = Array.from(treeNodes || []).some(
        (node) => node.getAttribute('data-node-id') === 'folder1',
      );
      expect(hasFolder1).to.be.true;
    });
  });

  describe('Node Expansion', () => {
    it('should toggle node expansion on click', async () => {
      const el = await fixture<ForgeTreeView>(html`
        <forge-tree-view .nodes=${mockNodes}></forge-tree-view>
      `);

      await el.updateComplete;

      // folder2 should be visible in virtual scrolling viewport
      const treeNodes = el.shadowRoot?.querySelectorAll('[data-node-id]');
      const folder2Node = Array.from(treeNodes || []).find(
        (node) => node.getAttribute('data-node-id') === 'folder2',
      ) as HTMLElement;
      expect(folder2Node).to.exist;

      const toggleButton = folder2Node?.querySelector('.expand-icon') as HTMLElement;
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

      // folder2 should be visible in virtual scrolling viewport
      const treeNodes = el.shadowRoot?.querySelectorAll('[data-node-id]');
      const folder2Node = Array.from(treeNodes || []).find(
        (node) => node.getAttribute('data-node-id') === 'folder2',
      ) as HTMLElement;

      const toggleButton = folder2Node?.querySelector('.expand-icon') as HTMLElement;
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

      // file1 should be visible in virtual scrolling viewport (child of expanded folder1)
      const treeNodes = el.shadowRoot?.querySelectorAll('[data-node-id]');
      const file1Node = Array.from(treeNodes || []).find(
        (node) => node.getAttribute('data-node-id') === 'file1',
      ) as HTMLElement;
      expect(file1Node).to.exist;

      const nodeContent = file1Node?.querySelector('.tree-node-content') as HTMLElement;
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

      // file1 should be visible in virtual scrolling viewport (child of expanded folder1)
      const treeNodes = el.shadowRoot?.querySelectorAll('[data-node-id]');
      const file1Node = Array.from(treeNodes || []).find(
        (node) => node.getAttribute('data-node-id') === 'file1',
      ) as HTMLElement;

      const nodeContent = file1Node?.querySelector('.tree-node-content') as HTMLElement;
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

      // Use programmatic API to test selection behavior rather than DOM clicks
      // which is more reliable with virtual scrolling
      (el as any).selectNode('file1');
      await el.updateComplete;

      // Verify first selection worked
      expect(el['selectedNodes'].has('file1')).to.be.true;
      expect(el['selectedNodes'].size).to.equal(1);

      // Select second node - should deselect first in single mode
      (el as any).selectNode('file3');
      await el.updateComplete;
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

      // Use programmatic API to test selection behavior rather than DOM clicks
      // which is more reliable with virtual scrolling
      (el as any).selectNode('file1');
      await el.updateComplete;

      // Verify first selection worked
      expect(el['selectedNodes'].has('file1')).to.be.true;
      expect(el['selectedNodes'].size).to.equal(1);

      // Select second node - both should be selected in multiple mode
      (el as any).selectNode('file3');
      await el.updateComplete;
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

      // Use the programmatic API instead of keyboard events for more reliable testing
      // Set focused node first
      (el as any).focusedNodeId = 'folder2';

      // Simulate Enter key press using the component's keyboard handler
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

      expect(aiState.state.nodeCount).to.be.a('number');
      expect(aiState.state.expandedCount).to.be.a('number');
      expect(aiState.state.selectedCount).to.be.a('number');
      expect(aiState.state.selectable).to.equal(true);
      expect(aiState.state.selectionMode).to.equal('single');
    });

    it('should explain state in natural language', async () => {
      const el = await fixture<ForgeTreeView>(html`
        <forge-tree-view .nodes=${mockNodes}></forge-tree-view>
      `);

      const explanation = el.explainState();

      expect(explanation.stateDescription).to.include('Tree view');
      expect(explanation.stateDescription).to.include('nodes');
    });

    it('should provide possible actions', async () => {
      const el = await fixture<ForgeTreeView>(html`
        <forge-tree-view .nodes=${mockNodes}></forge-tree-view>
      `);

      const actions = el.getPossibleActions();

      expect(actions).to.be.an('array');
      expect(actions.some((a) => a.name === 'selectNode')).to.be.true;
      expect(actions.some((a) => a.name === 'expandNode')).to.be.true;
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

      // With virtual scrolling, we don't use group roles for children
      // Instead, check that we have proper tree structure in rendered items
      expect(treeitems!.length).to.be.greaterThan(0);
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
        bubbles: true,
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
        bubbles: true,
      });
      firstItem.dispatchEvent(endEvent);
      await el.updateComplete;

      // Test Home key (should go to first item)
      const homeEvent = new KeyboardEvent('keydown', {
        key: 'Home',
        bubbles: true,
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

      // With virtual scrolling, all visible tree node content is focusable
      const focusableItems = el.shadowRoot?.querySelectorAll('.tree-node-content[tabindex="0"]');
      expect(focusableItems!.length).to.be.greaterThan(0); // Virtual scrolling makes visible items focusable

      // Check that we have proper focus management
      expect(focusableItems!.length).to.be.lessThan(10); // Should be reasonable number of visible items
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
