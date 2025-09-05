import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { BaseElement } from '../../../core/BaseElement';
import type { AIComponentState, AIAction, AIStateExplanation } from '../../../core/ai-metadata.types';
import '../../atoms/icon/icon';
import '../../atoms/checkbox/checkbox';
import '../../atoms/input/input';

export interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
  icon?: string;
  expanded?: boolean;
  selected?: boolean;
  disabled?: boolean;
  data?: any;
}

/**
 * @element forge-tree-view
 * @description Hierarchical tree view component with expand/collapse and selection
 * @fires nodeexpand - When a node is expanded or collapsed
 * @fires nodeselect - When a node is selected
 */
@customElement('forge-tree-view')
export class ForgeTreeView extends BaseElement {
  static override styles = css`
      :host {
        display: block;
        width: 100%;
      }

      .tree-view {
        background: var(--forge-surface-color, #ffffff);
        border: 1px solid var(--forge-border-color, #e0e0e0);
        border-radius: var(--forge-border-radius-md, 8px);
        padding: var(--forge-spacing-md, 16px);
        overflow: auto;
      }

      .tree-node {
        user-select: none;
      }

      .tree-node-content {
        display: flex;
        align-items: center;
        gap: var(--forge-spacing-xs, 4px);
        padding: var(--forge-spacing-xs, 4px) var(--forge-spacing-sm, 8px);
        border-radius: var(--forge-border-radius-sm, 4px);
        cursor: pointer;
        transition: background 0.2s ease;
      }

      .tree-node-content:hover {
        background: var(--forge-hover-bg, rgba(0, 0, 0, 0.04));
      }

      .tree-node-content.selected {
        background: var(--forge-primary-bg-light, rgba(25, 118, 210, 0.08));
        color: var(--forge-primary-color, #1976d2);
      }

      .tree-node-content.disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .tree-node-toggle {
        width: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .tree-node-toggle.expandable {
        cursor: pointer;
      }

      .tree-node-toggle forge-icon {
        transition: transform 0.2s ease;
      }

      .tree-node.expanded > .tree-node-content .tree-node-toggle forge-icon {
        transform: rotate(90deg);
      }

      .tree-node-label {
        flex: 1;
        display: flex;
        align-items: center;
        gap: var(--forge-spacing-sm, 8px);
      }

      .tree-node-children {
        padding-left: var(--forge-spacing-lg, 24px);
        display: none;
      }

      .tree-node.expanded > .tree-node-children {
        display: block;
      }

      .search-box {
        margin-bottom: var(--forge-spacing-md, 16px);
      }

      .no-results {
        text-align: center;
        padding: var(--forge-spacing-lg, 24px);
        color: var(--forge-text-secondary, #666666);
      }

      /* Keyboard focus */
      .tree-node-content:focus {
        outline: 2px solid var(--forge-primary-color, #1976d2);
        outline-offset: 2px;
      }
  `;

  @property({ type: Array }) nodes: TreeNode[] = [];
  @property({ type: Boolean }) selectable = true;
  @property({ type: String, attribute: 'selection-mode' }) selectionMode: 'single' | 'multiple' = 'single';
  @property({ type: Boolean, attribute: 'show-checkboxes' }) showCheckboxes = false;
  @property({ type: Boolean, attribute: 'show-search' }) showSearch = false;
  @property({ type: String, attribute: 'search-term' }) searchTerm = '';

  @state() private expandedNodes = new Set<string>();
  @state() private selectedNodes = new Set<string>();
  @state() private focusedNodeId: string | null = null;

  constructor() {
    super();
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this.handleKeyDown);
    
    // Expand nodes that are marked as expanded
    this.nodes.forEach(node => this.collectExpandedNodes(node));
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this.handleKeyDown);
  }

  private collectExpandedNodes(node: TreeNode) {
    if (node.expanded) {
      this.expandedNodes.add(node.id);
    }
    if (node.selected) {
      this.selectedNodes.add(node.id);
    }
    node.children?.forEach(child => this.collectExpandedNodes(child));
  }

  private handleKeyDown(e: KeyboardEvent) {
    // Implement keyboard navigation
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this.focusNextNode();
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.focusPreviousNode();
        break;
      case 'ArrowRight':
        e.preventDefault();
        this.expandFocusedNode();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        this.collapseFocusedNode();
        break;
      case ' ':
      case 'Enter':
        e.preventDefault();
        this.handleEnterOrSpace();
        break;
    }
  }

  private focusNextNode() {
    const visibleNodes = this.getVisibleNodeElements();
    const currentIndex = this.getCurrentFocusIndex(visibleNodes);
    const nextIndex = currentIndex < visibleNodes.length - 1 ? currentIndex + 1 : 0;
    this.focusNodeAtIndex(visibleNodes, nextIndex);
  }

  private focusPreviousNode() {
    const visibleNodes = this.getVisibleNodeElements();
    const currentIndex = this.getCurrentFocusIndex(visibleNodes);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : visibleNodes.length - 1;
    this.focusNodeAtIndex(visibleNodes, prevIndex);
  }

  private expandFocusedNode() {
    if (!this.focusedNodeId) return;
    const node = this.findNodeById(this.focusedNodeId);
    if (node && node.children && node.children.length > 0) {
      this.expandedNodes.add(node.id);
      this.requestUpdate();
      this.dispatchEvent(new CustomEvent('nodeexpand', {
        detail: { nodeId: node.id, expanded: true },
        bubbles: true,
        composed: true
      }));
    }
  }

  private collapseFocusedNode() {
    if (!this.focusedNodeId) return;
    const node = this.findNodeById(this.focusedNodeId);
    if (node && this.expandedNodes.has(node.id)) {
      this.expandedNodes.delete(node.id);
      this.requestUpdate();
      this.dispatchEvent(new CustomEvent('nodeexpand', {
        detail: { nodeId: node.id, expanded: false },
        bubbles: true,
        composed: true
      }));
    }
  }

  private handleEnterOrSpace() {
    if (!this.focusedNodeId) return;
    const node = this.findNodeById(this.focusedNodeId);
    if (node) {
      // For folder nodes, toggle expansion first, then select
      if (node.children && node.children.length > 0) {
        this.toggleExpanded(node);
      }
      // Always select the node as well
      this.selectNodeInternal(node);
    }
  }

  private selectFocusedNode() {
    if (!this.focusedNodeId) return;
    const node = this.findNodeById(this.focusedNodeId);
    if (node) {
      this.selectNodeInternal(node);
    }
  }

  private getVisibleNodeElements(): HTMLElement[] {
    return Array.from(this.shadowRoot?.querySelectorAll('.tree-node-content') || []) as HTMLElement[];
  }

  private getCurrentFocusIndex(visibleNodes: HTMLElement[]): number {
    const activeElement = this.shadowRoot?.activeElement;
    return activeElement ? visibleNodes.indexOf(activeElement as HTMLElement) : 0;
  }

  private focusNodeAtIndex(visibleNodes: HTMLElement[], index: number) {
    if (index >= 0 && index < visibleNodes.length) {
      const nodeElement = visibleNodes[index];
      nodeElement.focus();
      // Extract node ID from the DOM structure to track focused node
      const nodeContainer = nodeElement.closest('.tree-node');
      const nodeId = this.getNodeIdFromElement(nodeContainer as HTMLElement);
      this.focusedNodeId = nodeId;
    }
  }

  private getNodeIdFromElement(nodeElement: HTMLElement): string | null {
    // Get the node ID by finding its position in the tree structure
    const allNodes = this.shadowRoot?.querySelectorAll('.tree-node');
    if (!allNodes) return null;
    
    const nodeIndex = Array.from(allNodes).indexOf(nodeElement);
    const flatNodes = this.getFlatNodeList();
    return nodeIndex >= 0 && nodeIndex < flatNodes.length ? flatNodes[nodeIndex].id : null;
  }

  private getFlatNodeList(): TreeNode[] {
    const flatList: TreeNode[] = [];
    const addNodes = (nodes: TreeNode[]) => {
      nodes.forEach(node => {
        flatList.push(node);
        if (node.children && this.expandedNodes.has(node.id)) {
          addNodes(node.children);
        }
      });
    };
    addNodes(this.filterNodes(this.nodes, this.searchTerm));
    return flatList;
  }

  private isFirstVisibleNode(node: TreeNode): boolean {
    // Helper to check if this is the first visible node in the tree
    const firstVisibleNode = this.getFirstVisibleNode(this.nodes);
    return firstVisibleNode?.id === node.id;
  }

  private getFirstVisibleNode(nodes: TreeNode[]): TreeNode | null {
    for (const node of nodes) {
      // Return the first node
      if (!node.disabled) {
        return node;
      }
      // Check children if node is expanded
      if (node.children && this.expandedNodes.has(node.id)) {
        const childResult = this.getFirstVisibleNode(node.children);
        if (childResult) return childResult;
      }
    }
    return null;
  }

  private findNodeById(id: string): TreeNode | null {
    const findInNodes = (nodes: TreeNode[]): TreeNode | null => {
      for (const node of nodes) {
        if (node.id === id) return node;
        if (node.children) {
          const found = findInNodes(node.children);
          if (found) return found;
        }
      }
      return null;
    };
    return findInNodes(this.nodes);
  }

  private toggleExpanded(node: TreeNode) {
    if (!node.children || node.children.length === 0) return;
    
    if (this.expandedNodes.has(node.id)) {
      this.expandedNodes.delete(node.id);
    } else {
      this.expandedNodes.add(node.id);
    }
    
    this.requestUpdate();
    
    this.dispatchEvent(new CustomEvent('nodeexpand', {
      detail: { nodeId: node.id, expanded: this.expandedNodes.has(node.id) },
      bubbles: true,
      composed: true
    }));
  }

  private selectNodeInternal(node: TreeNode) {
    if (!this.selectable || node.disabled) return;
    
    if (this.selectionMode === 'single') {
      this.selectedNodes.clear();
      this.selectedNodes.add(node.id);
    } else {
      if (this.selectedNodes.has(node.id)) {
        this.selectedNodes.delete(node.id);
      } else {
        this.selectedNodes.add(node.id);
      }
    }
    
    this.requestUpdate();
    
    this.dispatchEvent(new CustomEvent('nodeselect', {
      detail: { nodeId: node.id, selected: this.selectedNodes.has(node.id) },
      bubbles: true,
      composed: true
    }));
  }

  private expandAll() {
    const addAllNodes = (node: TreeNode) => {
      if (node.children && node.children.length > 0) {
        this.expandedNodes.add(node.id);
        node.children.forEach(child => addAllNodes(child));
      }
    };
    
    this.nodes.forEach(node => addAllNodes(node));
    this.requestUpdate();
  }

  private collapseAll() {
    this.expandedNodes.clear();
    this.requestUpdate();
  }

  // Public API methods for programmatic control
  public expandNode(nodeId: string) {
    const node = this.findNodeById(nodeId);
    if (node && node.children && node.children.length > 0) {
      this.expandedNodes.add(nodeId);
      this.requestUpdate();
      this.dispatchEvent(new CustomEvent('nodeexpand', {
        detail: { nodeId: nodeId, expanded: true },
        bubbles: true,
        composed: true
      }));
    }
  }

  public collapseNode(nodeId: string) {
    if (this.expandedNodes.has(nodeId)) {
      this.expandedNodes.delete(nodeId);
      this.requestUpdate();
      this.dispatchEvent(new CustomEvent('nodeexpand', {
        detail: { nodeId: nodeId, expanded: false },
        bubbles: true,
        composed: true
      }));
    }
  }

  public selectNodeById(nodeId: string) {
    const node = this.findNodeById(nodeId);
    if (node && this.selectable) {
      this.selectNodeInternal(node);
    }
  }

  // Alias for selectNodeById for convenience - public API
  public selectNode(nodeId: string) {
    this.selectNodeById(nodeId);
  }

  public clearSelection() {
    this.selectedNodes.clear();
    this.requestUpdate();
  }

  private filterNodes(nodes: TreeNode[], searchTerm: string): TreeNode[] {
    if (!searchTerm) return nodes;
    
    return nodes.filter(node => {
      const matchesSearch = node.label.toLowerCase().includes(searchTerm.toLowerCase());
      const hasMatchingChildren = node.children ? 
        this.filterNodes(node.children, searchTerm).length > 0 : false;
      
      if (hasMatchingChildren) {
        this.expandedNodes.add(node.id);
      }
      
      return matchesSearch || hasMatchingChildren;
    });
  }

  // AI Metadata
  override get aiState(): AIComponentState {
    return {
      ...super.aiState,
      state: {
        ...super.aiState.state,
        nodeCount: this.countNodes(this.nodes),
        expandedCount: this.expandedNodes.size,
        selectedCount: this.selectedNodes.size,
        selectable: this.selectable,
        selectionMode: this.selectionMode,
        searchTerm: this.searchTerm
      }
    };
  }

  private countNodes(nodes: TreeNode[]): number {
    return nodes.reduce((count, node) => {
      return count + 1 + (node.children ? this.countNodes(node.children) : 0);
    }, 0);
  }

  override explainState(): AIStateExplanation {
    const parts = ['Tree view'];
    const totalNodes = this.countNodes(this.nodes);
    
    parts.push(`${totalNodes} total nodes`);
    parts.push(`${this.expandedNodes.size} expanded`);
    
    if (this.selectedNodes.size > 0) {
      parts.push(`${this.selectedNodes.size} selected`);
    }
    
    if (this.searchTerm) {
      parts.push(`searching for "${this.searchTerm}"`);
    }
    
    return {
      currentState: this.selectedNodes.size > 0 ? 'has-selection' : 'empty-selection',
      possibleStates: ['empty-selection', 'has-selection'],
      stateDescription: parts.join(', ')
    };
  }

  override getPossibleActions(): AIAction[] {
    const actions: AIAction[] = [];
    
    // Add selectNode action for selectable trees
    if (this.selectable) {
      actions.push({
        name: 'selectNode',
        description: 'Select a tree node',
        available: true,
        parameters: [{
          name: 'nodeId',
          type: 'text',
          required: true,
          description: 'ID of the node to interact with'
        }]
      });
    }
    
    // Add expand/collapse actions for nodes
    actions.push({
      name: 'expandNode',
      description: 'Expand a tree node',
      available: true,
      parameters: [{
        name: 'nodeId',
        type: 'text',
        required: true,
        description: 'ID of the node to expand or collapse'
      }]
    });
    
    actions.push({
      name: 'collapseNode',
      description: 'Collapse a tree node',
      available: this.expandedNodes.size > 0,
      parameters: [{
        name: 'nodeId',
        type: 'text',
        required: true,
        description: 'ID of the node to expand or collapse'
      }]
    });
    
    actions.push({
      name: 'expandAll',
      description: 'Expand all nodes',
      available: true
    });
    
    actions.push({
      name: 'collapseAll',
      description: 'Collapse all nodes',
      available: this.expandedNodes.size > 0
    });
    
    if (this.showSearch) {
      actions.push({
        name: 'search',
        description: 'Search nodes',
        available: true,
        parameters: [{
          name: 'searchTerm',
          type: 'text',
          required: true,
          description: 'Term to search for in the tree'
        }]
      });
    }
    
    return actions;
  }

  override render() {
    const filteredNodes = this.filterNodes(this.nodes, this.searchTerm);
    
    return html`
      <div class="tree-view">
        ${this.showSearch ? html`
          <forge-input
            class="search-box"
            type="search"
            placeholder="Search..."
            .value=${this.searchTerm}
            @input=${(e: Event) => {
              this.searchTerm = (e.target as HTMLInputElement).value;
              this.requestUpdate();
            }}
          ></forge-input>
        ` : ''}
        
        ${filteredNodes.length > 0 ? html`
          <div class="tree-nodes" role="tree">
            ${filteredNodes.map(node => this.renderNode(node, 0))}
          </div>
        ` : html`
          <div class="no-results">
            ${this.searchTerm ? 'No matching nodes found' : 'No nodes to display'}
          </div>
        `}
      </div>
    `;
  }

  private renderNode(node: TreeNode, level: number): any {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = this.expandedNodes.has(node.id);
    const isSelected = this.selectedNodes.has(node.id);
    
    const nodeClasses = {
      'tree-node': true,
      'expanded': isExpanded,
      'has-children': hasChildren || false
    };
    
    const contentClasses = {
      'tree-node-content': true,
      'selected': isSelected,
      'disabled': node.disabled || false
    };

    return html`
      <div class=${classMap(nodeClasses)}>
        <div 
          class=${classMap(contentClasses)}
          tabindex=${this.focusedNodeId === node.id || (this.focusedNodeId === null && this.isFirstVisibleNode(node)) ? "0" : "-1"}
          role="treeitem"
          aria-level=${level + 1}
          aria-selected=${isSelected}
          aria-expanded=${hasChildren ? isExpanded : 'false'}
          data-node-id=${node.id}
          @click=${() => this.selectNodeInternal(node)}
          @focus=${() => { this.focusedNodeId = node.id; }}
        >
          <span 
            class="tree-node-toggle ${hasChildren ? 'expandable' : ''}"
            @click=${(e: Event) => {
              e.stopPropagation();
              this.toggleExpanded(node);
            }}
          >
            ${hasChildren ? html`
              <forge-icon name="chevron-right" size="xs"></forge-icon>
            ` : ''}
          </span>
          
          ${this.showCheckboxes ? html`
            <forge-checkbox
              .checked=${isSelected}
              ?disabled=${node.disabled}
              @change=${(e: CustomEvent) => {
                e.stopPropagation();
                this.selectNodeInternal(node);
              }}
            ></forge-checkbox>
          ` : ''}
          
          <span class="tree-node-label">
            ${node.icon ? html`
              <forge-icon name=${node.icon} size="sm"></forge-icon>
            ` : ''}
            ${node.label}
          </span>
        </div>
        
        ${hasChildren ? html`
          <div class="tree-node-children" role="group">
            ${node.children!.map((child: TreeNode) => this.renderNode(child, level + 1))}
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-tree-view': ForgeTreeView;
  }
}