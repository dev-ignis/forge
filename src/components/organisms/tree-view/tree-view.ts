import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { BaseElement } from '../../../core/BaseElement';
import type { AIState, AIAction } from '../../../core/ai-metadata.types';
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
  static override styles = [
    BaseElement.styles,
    css`
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
    `
  ];

  @property({ type: Array }) nodes: TreeNode[] = [];
  @property({ type: Boolean }) selectable = true;
  @property({ type: String, attribute: 'selection-mode' }) selectionMode: 'single' | 'multiple' = 'single';
  @property({ type: Boolean, attribute: 'show-checkboxes' }) showCheckboxes = false;
  @property({ type: Boolean, attribute: 'show-search' }) showSearch = false;
  @property({ type: String, attribute: 'search-term' }) searchTerm = '';

  @state() private expandedNodes = new Set<string>();
  @state() private selectedNodes = new Set<string>();

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
        this.selectFocusedNode();
        break;
    }
  }

  private focusNextNode() {
    // Implementation for keyboard navigation
  }

  private focusPreviousNode() {
    // Implementation for keyboard navigation
  }

  private expandFocusedNode() {
    // Implementation for keyboard navigation
  }

  private collapseFocusedNode() {
    // Implementation for keyboard navigation
  }

  private selectFocusedNode() {
    // Implementation for keyboard navigation
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
      detail: { node: node.id, expanded: this.expandedNodes.has(node.id) },
      bubbles: true,
      composed: true
    }));
  }

  private selectNode(node: TreeNode) {
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
      detail: { node: node.id, selected: Array.from(this.selectedNodes) },
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
  override get aiState(): AIState {
    return {
      ...super.aiState,
      nodeCount: this.countNodes(this.nodes),
      expandedCount: this.expandedNodes.size,
      selectedCount: this.selectedNodes.size,
      selectionMode: this.selectionMode,
      searchTerm: this.searchTerm
    };
  }

  private countNodes(nodes: TreeNode[]): number {
    return nodes.reduce((count, node) => {
      return count + 1 + (node.children ? this.countNodes(node.children) : 0);
    }, 0);
  }

  override explainState(): string {
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
    
    return parts.join(', ');
  }

  override getPossibleActions(): AIAction[] {
    const actions: AIAction[] = [];
    
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
        params: ['searchTerm']
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
      <div class=${classMap(nodeClasses)} role="treeitem" aria-level=${level + 1}>
        <div 
          class=${classMap(contentClasses)}
          tabindex="0"
          @click=${() => this.selectNode(node)}
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
              @change=${() => this.selectNode(node)}
              @click=${(e: Event) => e.stopPropagation()}
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