import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';
import { BaseElement } from '../../../core/BaseElement';
import type { AIComponentState, AIAction, AIStateExplanation } from '../../../core/ai-metadata.types';
import '../../atoms/button/button';
import '../../atoms/badge/badge';
import '../../atoms/icon/icon';

export interface TabItem {
  id: string;
  label: string;
  icon?: string;
  badge?: string | number;
  disabled?: boolean;
  closeable?: boolean;
  panel?: string | TemplateStringsArray;
}

/**
 * @element forge-tabs
 * @description Advanced tabs component with lazy loading, keyboard navigation, and drag-to-reorder
 * @fires tabchange - When active tab changes
 * @fires tabclose - When a tab is closed
 * @fires tabreorder - When tabs are reordered
 */
@customElement('forge-tabs')
export class ForgeTabs extends BaseElement {
  static override styles = css`
    
      :host {
        display: block;
        width: 100%;
      }

      .tabs-container {
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      .tabs-container.vertical {
        flex-direction: row;
      }

      .tabs-header {
        display: flex;
        align-items: center;
        border-bottom: 2px solid var(--forge-border-color, #e0e0e0);
        background: var(--forge-surface-color, #ffffff);
        position: relative;
        overflow-x: auto;
        overflow-y: hidden;
        scrollbar-width: thin;
      }

      .tabs-container.vertical .tabs-header {
        flex-direction: column;
        border-bottom: none;
        border-right: 2px solid var(--forge-border-color, #e0e0e0);
        overflow-x: hidden;
        overflow-y: auto;
        min-width: 200px;
      }

      .tabs-list {
        display: flex;
        align-items: center;
        gap: var(--forge-spacing-xs, 4px);
        padding: 0 var(--forge-spacing-sm, 8px);
      }

      .tabs-container.vertical .tabs-list {
        flex-direction: column;
        align-items: stretch;
        width: 100%;
      }

      .tab-item {
        display: flex;
        align-items: center;
        gap: var(--forge-spacing-xs, 4px);
        padding: var(--forge-spacing-sm, 8px) var(--forge-spacing-md, 16px);
        background: transparent;
        border: none;
        cursor: pointer;
        color: var(--forge-text-secondary, #666666);
        font-size: var(--forge-font-size-base, 14px);
        font-weight: var(--forge-font-weight-medium, 500);
        transition: all 0.2s ease;
        position: relative;
        white-space: nowrap;
        user-select: none;
      }

      .tab-item:hover:not(.disabled) {
        background: var(--forge-hover-bg, rgba(0, 0, 0, 0.04));
        color: var(--forge-text-primary, #333333);
      }

      .tab-item.active {
        color: var(--forge-primary-color, #1976d2);
      }

      .tab-item.active::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        right: 0;
        height: 2px;
        background: var(--forge-primary-color, #1976d2);
      }

      .tabs-container.vertical .tab-item.active::after {
        bottom: auto;
        left: auto;
        right: -2px;
        top: 0;
        width: 2px;
        height: 100%;
      }

      .tab-item.disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }

      .tab-item.dragging {
        opacity: 0.5;
      }

      .tab-icon {
        font-size: var(--forge-font-size-lg, 18px);
      }

      .tab-close {
        margin-left: var(--forge-spacing-xs, 4px);
        padding: 2px;
        border-radius: var(--forge-border-radius-sm, 4px);
        cursor: pointer;
        transition: background 0.2s ease;
      }

      .tab-close:hover {
        background: var(--forge-hover-bg, rgba(0, 0, 0, 0.08));
      }

      .tabs-overflow {
        margin-left: auto;
        padding: var(--forge-spacing-sm, 8px);
      }

      .tabs-panels {
        flex: 1;
        overflow: auto;
        padding: var(--forge-spacing-md, 16px);
      }

      .tab-panel {
        display: none;
        animation: fadeIn 0.3s ease;
      }

      .tab-panel.active {
        display: block;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(4px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* Mobile styles */
      @media (max-width: 768px) {
        .tabs-header {
          overflow-x: auto;
        }

        .tab-item {
          padding: var(--forge-spacing-xs, 4px) var(--forge-spacing-sm, 8px);
          font-size: var(--forge-font-size-sm, 12px);
        }
      }

      /* Drag ghost */
      .drag-ghost {
        position: fixed;
        pointer-events: none;
        opacity: 0.8;
        z-index: 1000;
      }

      /* Drop indicator */
      .drop-indicator {
        position: absolute;
        width: 2px;
        height: 100%;
        background: var(--forge-primary-color, #1976d2);
        pointer-events: none;
        transition: left 0.2s ease;
      }
    `;

  @property({ type: Array }) tabs: TabItem[] = [];
  @property({ type: String, attribute: 'active-tab' }) activeTab?: string;
  @property({ type: String }) orientation: 'horizontal' | 'vertical' = 'horizontal';
  @property({ type: Boolean }) reorderable = false;
  @property({ type: Boolean, attribute: 'remember-active' }) rememberActive = false;
  @property({ type: Boolean, attribute: 'lazy-load' }) lazyLoad = true;
  @property({ type: String, attribute: 'storage-key' }) storageKey = 'forge-tabs-active';
  
  @state() private draggedTab: TabItem | null = null;
  @state() private dragOverIndex = -1;
  @state() private loadedPanels = new Set<string>();

  constructor() {
    super();
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
  }

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this.handleKeyDown);
    
    // Remember last active tab
    if (this.rememberActive && this.storageKey) {
      const savedTab = localStorage.getItem(this.storageKey);
      if (savedTab && this.tabs.find(t => t.id === savedTab)) {
        this.activeTab = savedTab;
      }
    }
    
    // Set initial active tab if not set
    if (!this.activeTab && this.tabs.length > 0) {
      const firstEnabled = this.tabs.find(t => !t.disabled);
      if (firstEnabled) {
        this.activeTab = firstEnabled.id;
      }
    }

    // Load initial panel
    if (this.activeTab) {
      this.loadedPanels.add(this.activeTab);
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this.handleKeyDown);
  }

  private handleKeyDown(e: KeyboardEvent) {
    const activeIndex = this.tabs.findIndex(t => t.id === this.activeTab);
    if (activeIndex === -1) return;

    let newIndex = activeIndex;

    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        if (this.orientation === 'horizontal' && e.key === 'ArrowUp') return;
        if (this.orientation === 'vertical' && e.key === 'ArrowLeft') return;
        e.preventDefault();
        newIndex = this.findPreviousEnabledTab(activeIndex);
        break;
        
      case 'ArrowRight':
      case 'ArrowDown':
        if (this.orientation === 'horizontal' && e.key === 'ArrowDown') return;
        if (this.orientation === 'vertical' && e.key === 'ArrowRight') return;
        e.preventDefault();
        newIndex = this.findNextEnabledTab(activeIndex);
        break;
        
      case 'Home':
        e.preventDefault();
        newIndex = this.tabs.findIndex(t => !t.disabled);
        break;
        
      case 'End':
        e.preventDefault();
        for (let i = this.tabs.length - 1; i >= 0; i--) {
          if (!this.tabs[i].disabled) {
            newIndex = i;
            break;
          }
        }
        break;
        
      default:
        return;
    }

    if (newIndex !== activeIndex && newIndex !== -1) {
      this.selectTab(this.tabs[newIndex]);
    }
  }

  private findPreviousEnabledTab(currentIndex: number): number {
    for (let i = currentIndex - 1; i >= 0; i--) {
      if (!this.tabs[i].disabled) return i;
    }
    // Wrap to end
    for (let i = this.tabs.length - 1; i > currentIndex; i--) {
      if (!this.tabs[i].disabled) return i;
    }
    return currentIndex;
  }

  private findNextEnabledTab(currentIndex: number): number {
    for (let i = currentIndex + 1; i < this.tabs.length; i++) {
      if (!this.tabs[i].disabled) return i;
    }
    // Wrap to beginning
    for (let i = 0; i < currentIndex; i++) {
      if (!this.tabs[i].disabled) return i;
    }
    return currentIndex;
  }

  private selectTab(tab: TabItem) {
    if (tab.disabled || tab.id === this.activeTab) return;
    
    const oldTab = this.activeTab;
    this.activeTab = tab.id;
    
    // Load panel if lazy loading
    if (this.lazyLoad && !this.loadedPanels.has(tab.id)) {
      this.loadedPanels.add(tab.id);
    }
    
    // Save to localStorage
    if (this.rememberActive && this.storageKey) {
      localStorage.setItem(this.storageKey, tab.id);
    }
    
    this.dispatchEvent(new CustomEvent('tabchange', {
      detail: { oldTab, newTab: tab.id },
      bubbles: true,
      composed: true
    }));
  }

  private handleTabClick(e: Event, tab: TabItem) {
    const target = e.target as HTMLElement;
    
    // Check if click was on close icon or its parent
    if (target.classList.contains('tab-close') || 
        target.closest('.tab-close') || 
        target.hasAttribute('data-action') && target.getAttribute('data-action') === 'close') {
      this.closeTab(e, tab);
    } else {
      this.selectTab(tab);
    }
  }

  private closeTab(e: Event, tab: TabItem) {
    e.stopPropagation();
    
    const index = this.tabs.findIndex(t => t.id === tab.id);
    if (index === -1) return;
    
    // If closing active tab, select another
    if (tab.id === this.activeTab) {
      const nextTab = this.tabs[index + 1] || this.tabs[index - 1];
      if (nextTab && !nextTab.disabled) {
        this.selectTab(nextTab);
      }
    }
    
    // Remove tab
    this.tabs = this.tabs.filter(t => t.id !== tab.id);
    this.loadedPanels.delete(tab.id);
    
    this.dispatchEvent(new CustomEvent('tabclose', {
      detail: { tabId: tab.id },
      bubbles: true,
      composed: true
    }));
  }

  // Drag and drop handlers
  private handleDragStart(e: DragEvent, tab: TabItem) {
    if (!this.reorderable || tab.disabled) return;
    
    this.draggedTab = tab;
    e.dataTransfer!.effectAllowed = 'move';
    e.dataTransfer!.setData('text/html', '');
  }

  private handleDragOver(e: DragEvent, index: number) {
    e.preventDefault();
    if (!this.draggedTab) return;
    
    e.dataTransfer!.dropEffect = 'move';
    this.dragOverIndex = index;
  }

  private handleDrop(e: DragEvent, index: number) {
    e.preventDefault();
    if (!this.draggedTab) return;
    
    const draggedIndex = this.tabs.findIndex(t => t.id === this.draggedTab!.id);
    if (draggedIndex === index) return;
    
    // Reorder tabs
    const newTabs = [...this.tabs];
    newTabs.splice(draggedIndex, 1);
    newTabs.splice(index, 0, this.draggedTab);
    this.tabs = newTabs;
    
    this.dispatchEvent(new CustomEvent('tabreorder', {
      detail: { from: draggedIndex, to: index },
      bubbles: true,
      composed: true
    }));
  }

  private handleDragEnd() {
    this.draggedTab = null;
    this.dragOverIndex = -1;
  }

  // AI Metadata
  override get aiState(): AIComponentState {
    return {
      ...super.aiState,
      activeTab: this.activeTab,
      tabCount: this.tabs.length,
      orientation: this.orientation,
      reorderable: this.reorderable,
      hasCloseable: this.tabs.some(t => t.closeable),
      hasDisabled: this.tabs.some(t => t.disabled)
    };
  }

  override explainState(): AIStateExplanation {
    const parts = ['Tabs component'];
    
    if (this.activeTab) {
      const activeTabData = this.tabs.find(t => t.id === this.activeTab);
      parts.push('showing "' + (activeTabData?.label || 'unknown') + '" tab');
    }
    
    parts.push(this.tabs.length + ' total tabs');
    parts.push(this.orientation);
    
    if (this.reorderable) parts.push('drag to reorder enabled');
    
    return {
      currentState: this.activeTab ? 'active' : 'empty',
      possibleStates: ['empty', 'active'],
      stateDescription: parts.join(', ')
    };
  }

  override getPossibleActions(): AIAction[] {
    const actions: AIAction[] = [];
    
    this.tabs.forEach((tab, index) => {
      if (!tab.disabled && tab.id !== this.activeTab) {
        actions.push({
          name: 'selectTab',
          description: 'Switch to ' + tab.label + ' tab',
          available: true,
          params: [tab.id]
        });
      }
      
      if (tab.closeable) {
        actions.push({
          name: 'closeTab',
          description: 'Close ' + tab.label + ' tab',
          available: true,
          params: [tab.id]
        });
      }
    });
    
    if (this.reorderable) {
      actions.push({
        name: 'reorderTabs',
        description: 'Drag tabs to reorder',
        available: true
      });
    }
    
    return actions;
  }

  override render() {
    const containerClass = this.orientation === 'vertical' ? 'tabs-container vertical' : 'tabs-container';

    return html`
      <div class="${containerClass}">
        <div class="tabs-header">
          <div class="tabs-list" role="tablist" aria-orientation=${this.orientation}>
            ${repeat(
              this.tabs,
              tab => tab.id,
              (tab, index) => this.renderTab(tab, index)
            )}
          </div>
        </div>
        
        <div class="tabs-panels">
          ${this.tabs.map(tab => this.renderPanel(tab))}
        </div>
      </div>
    `;
  }

  private renderTab(tab: TabItem, index: number) {
    const classes = {
      'tab-item': true,
      'active': tab.id === this.activeTab,
      'disabled': tab.disabled || false,
      'dragging': this.draggedTab?.id === tab.id
    };

    return html`
      <button
        id="${tab.id}"
        class=${classMap(classes)}
        role="tab"
        aria-selected=${tab.id === this.activeTab}
        aria-controls="panel-${tab.id}"
        aria-disabled=${tab.disabled || false}
        tabindex=${tab.id === this.activeTab ? '0' : '-1'}
        ?disabled=${tab.disabled}
        @click=${(e: Event) => this.handleTabClick(e, tab)}
        draggable=${this.reorderable && !tab.disabled}
        @dragstart=${(e: DragEvent) => this.handleDragStart(e, tab)}
        @dragover=${(e: DragEvent) => this.handleDragOver(e, index)}
        @drop=${(e: DragEvent) => this.handleDrop(e, index)}
        @dragend=${this.handleDragEnd}
      >
        ${tab.icon ? html`
          <forge-icon 
            class="tab-icon" 
            name=${tab.icon}
            size="sm"
          ></forge-icon>
        ` : ''}
        
        <span>${tab.label}</span>
        
        ${tab.badge ? html`
          <forge-badge 
            size="sm" 
            variant="primary"
          >
            ${tab.badge}
          </forge-badge>
        ` : ''}
        
        ${tab.closeable ? html`
          <forge-icon
            class="tab-close"
            name="close"
            size="xs"
            aria-label="Close tab"
            data-action="close"
          ></forge-icon>
        ` : ''}
      </button>
    `;
  }

  private renderPanel(tab: TabItem) {
    const isActive = tab.id === this.activeTab;
    const shouldRender = !this.lazyLoad || this.loadedPanels.has(tab.id);
    
    const classes = {
      'tab-panel': true,
      'active': isActive
    };

    return html`
      <div
        class=${classMap(classes)}
        id="panel-${tab.id}"
        role="tabpanel"
        aria-labelledby=${tab.id}
        hidden=${!isActive}
      >
        ${shouldRender ? (tab.panel || html`<slot name=${tab.id}></slot>`) : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-tabs': ForgeTabs;
  }
}