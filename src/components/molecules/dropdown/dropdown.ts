import { html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';
import { BaseElement } from '../../../core/BaseElement';
import type { AIMetadata, AIAction, AIStateExplanation } from '../../../core/ai-metadata.types';
import '../../atoms/button/button';

export interface DropdownItem {
  id: string;
  label: string;
  value?: any;
  icon?: string;
  badge?: string | number;
  disabled?: boolean;
  divider?: boolean;
  group?: string;
  checked?: boolean;
  type?: 'default' | 'checkbox' | 'radio';
  items?: DropdownItem[]; // For nested menus
}

export type DropdownPosition = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' | 'left' | 'right' | 'auto';
export type DropdownVariant = 'default' | 'primary' | 'secondary' | 'minimal';
export type DropdownSize = 'small' | 'medium' | 'large';

@customElement('forge-dropdown')
export class ForgeDropdown extends BaseElement {
  static override styles = css`
    ${BaseElement.styles}
    
    :host {
      position: relative;
      display: inline-block;
    }

    .dropdown {
      position: relative;
      display: inline-block;
    }

    .dropdown__trigger {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      background: var(--forge-dropdown-trigger-bg, white);
      border: 1px solid var(--forge-border-color, #e5e7eb);
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.2s;
      user-select: none;
    }

    .dropdown__trigger:hover {
      background: var(--forge-dropdown-trigger-hover-bg, #f9fafb);
      border-color: var(--forge-border-hover-color, #d1d5db);
    }

    .dropdown__trigger:focus-visible {
      outline: 2px solid var(--forge-focus-color, #3b82f6);
      outline-offset: 2px;
    }

    .dropdown__trigger--active {
      background: var(--forge-dropdown-trigger-active-bg, #f3f4f6);
      border-color: var(--forge-primary-color, #3b82f6);
    }

    .dropdown__trigger--disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    /* Trigger variants */
    .dropdown__trigger--primary {
      background: var(--forge-primary-color, #3b82f6);
      color: white;
      border-color: var(--forge-primary-color, #3b82f6);
    }

    .dropdown__trigger--primary:hover {
      background: var(--forge-primary-hover, #2563eb);
      border-color: var(--forge-primary-hover, #2563eb);
    }

    .dropdown__trigger--secondary {
      background: transparent;
      border-color: var(--forge-primary-color, #3b82f6);
      color: var(--forge-primary-color, #3b82f6);
    }

    .dropdown__trigger--minimal {
      background: transparent;
      border: none;
      padding: 4px 8px;
    }

    .dropdown__trigger--minimal:hover {
      background: var(--forge-dropdown-trigger-hover-bg, #f9fafb);
    }

    /* Trigger sizes */
    .dropdown__trigger--small {
      padding: 6px 10px;
      font-size: 12px;
    }

    .dropdown__trigger--large {
      padding: 10px 16px;
      font-size: 16px;
    }

    .dropdown__trigger-icon {
      width: 16px;
      height: 16px;
      transition: transform 0.2s;
    }

    .dropdown__trigger--active .dropdown__trigger-icon {
      transform: rotate(180deg);
    }

    /* Menu */
    .dropdown__menu {
      position: absolute;
      z-index: 1000;
      min-width: 200px;
      max-width: 320px;
      max-height: 400px;
      overflow-y: auto;
      background: var(--forge-dropdown-menu-bg, white);
      border: 1px solid var(--forge-border-color, #e5e7eb);
      border-radius: 8px;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      opacity: 0;
      visibility: hidden;
      transform: translateY(-8px);
      transition: opacity 0.2s, visibility 0.2s, transform 0.2s;
      padding: 4px;
    }

    .dropdown__menu--visible {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    /* Menu positions */
    .dropdown__menu--bottom-start {
      top: calc(100% + 4px);
      left: 0;
    }

    .dropdown__menu--bottom-end {
      top: calc(100% + 4px);
      right: 0;
    }

    .dropdown__menu--top-start {
      bottom: calc(100% + 4px);
      left: 0;
    }

    .dropdown__menu--top-end {
      bottom: calc(100% + 4px);
      right: 0;
    }

    .dropdown__menu--left {
      right: calc(100% + 4px);
      top: 0;
    }

    .dropdown__menu--right {
      left: calc(100% + 4px);
      top: 0;
    }

    /* Menu items */
    .dropdown__item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: background 0.15s;
      position: relative;
      user-select: none;
    }

    .dropdown__item:hover {
      background: var(--forge-dropdown-item-hover-bg, #f3f4f6);
    }

    .dropdown__item:focus-visible {
      outline: 2px solid var(--forge-focus-color, #3b82f6);
      outline-offset: -2px;
    }

    .dropdown__item--disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    .dropdown__item--selected {
      background: var(--forge-dropdown-item-selected-bg, #eff6ff);
      color: var(--forge-primary-color, #3b82f6);
    }

    .dropdown__item-icon {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
    }

    .dropdown__item-label {
      flex: 1;
    }

    .dropdown__item-badge {
      padding: 2px 6px;
      background: var(--forge-badge-bg, #f3f4f6);
      color: var(--forge-badge-color, #6b7280);
      border-radius: 4px;
      font-size: 11px;
      font-weight: 500;
    }

    .dropdown__item-checkbox,
    .dropdown__item-radio {
      width: 16px;
      height: 16px;
      margin-right: 4px;
    }

    .dropdown__item-arrow {
      width: 12px;
      height: 12px;
      margin-left: auto;
      opacity: 0.6;
    }

    /* Divider */
    .dropdown__divider {
      height: 1px;
      background: var(--forge-border-color, #e5e7eb);
      margin: 4px 0;
    }

    /* Group */
    .dropdown__group {
      padding: 4px 12px;
      font-size: 12px;
      font-weight: 600;
      color: var(--forge-text-secondary, #6b7280);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* Nested menu */
    .dropdown__item--has-children {
      position: relative;
    }

    .dropdown__item--has-children .dropdown__submenu {
      position: absolute;
      left: calc(100% + 4px);
      top: 0;
      opacity: 0;
      visibility: hidden;
      transform: translateX(-8px);
      transition: opacity 0.2s, visibility 0.2s, transform 0.2s;
    }

    .dropdown__item--has-children:hover .dropdown__submenu,
    .dropdown__item--has-children:focus-within .dropdown__submenu {
      opacity: 1;
      visibility: visible;
      transform: translateX(0);
    }

    /* Scrollbar styling */
    .dropdown__menu::-webkit-scrollbar {
      width: 8px;
    }

    .dropdown__menu::-webkit-scrollbar-track {
      background: var(--forge-scrollbar-track, #f3f4f6);
      border-radius: 4px;
    }

    .dropdown__menu::-webkit-scrollbar-thumb {
      background: var(--forge-scrollbar-thumb, #d1d5db);
      border-radius: 4px;
    }

    .dropdown__menu::-webkit-scrollbar-thumb:hover {
      background: var(--forge-scrollbar-thumb-hover, #9ca3af);
    }
  `;

  @property({ type: Array }) items: DropdownItem[] = [];
  @property({ type: String }) label = 'Options';
  @property({ type: String }) position: DropdownPosition = 'bottom-start';
  @property({ type: String }) variant: DropdownVariant = 'default';
  @property({ type: String }) size: DropdownSize = 'medium';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean, attribute: 'close-on-select' }) closeOnSelect = true;
  @property({ type: Boolean, attribute: 'multi-select' }) multiSelect = false;
  @property({ type: String }) icon = '▼';
  @property({ type: String, attribute: 'placeholder' }) placeholder = '';

  @state() private isOpen = false;
  @state() private selectedItems: Set<string> = new Set();
  @state() private focusedIndex = -1;
  @state() private actualPosition: DropdownPosition = 'bottom-start';
  @state() private groups: Map<string, DropdownItem[]> = new Map();

  protected aiMetadata: AIMetadata = {
    purpose: 'Interactive dropdown menu with selectable options',
    criticality: 'medium',
    semanticRole: 'menu',
    interactions: [
      {
        type: 'click',
        description: 'Toggle dropdown menu',
        outcome: 'Opens/closes dropdown'
      },
      {
        type: 'keyboard',
        description: 'Navigate menu with keyboard',
        shortcuts: ['ArrowUp', 'ArrowDown', 'Enter', 'Escape', 'Space']
      },
      {
        type: 'select',
        description: 'Select menu item',
        outcome: 'Triggers selection event'
      }
    ]
  };

  constructor() {
    super();
    this.handleTriggerClick = this.handleTriggerClick.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'combobox');
    this.setAttribute('aria-haspopup', 'menu');
    this.setAttribute('aria-expanded', 'false');
    document.addEventListener('click', this.handleDocumentClick);
    this.addEventListener('keydown', this.handleKeydown);
    this.processGroups();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.handleDocumentClick);
    this.removeEventListener('keydown', this.handleKeydown);
  }

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (changedProperties.has('isOpen')) {
      this.setAttribute('aria-expanded', String(this.isOpen));
      this.updateComponentState('open', this.isOpen);
      this.emit('dropdownvisibilitychange', { open: this.isOpen });

      if (this.isOpen) {
        this.updatePosition();
        this.focusedIndex = -1;
      }
    }

    if (changedProperties.has('items')) {
      this.processGroups();
    }

    if (changedProperties.has('disabled')) {
      this.updateComponentState('disabled', this.disabled);
      if (this.disabled && this.isOpen) {
        this.close();
      }
    }
  }

  private processGroups(): void {
    this.groups.clear();
    this.items.forEach(item => {
      if (item.group) {
        if (!this.groups.has(item.group)) {
          this.groups.set(item.group, []);
        }
        this.groups.get(item.group)!.push(item);
      }
    });
  }

  private handleTriggerClick(e: Event): void {
    if (this.disabled) return;
    e.stopPropagation();
    this.toggle();
  }

  private handleDocumentClick(e: Event): void {
    if (!this.isOpen) return;
    
    const path = e.composedPath();
    if (!path.includes(this)) {
      this.close();
    }
  }

  private handleKeydown(e: KeyboardEvent): void {
    if (this.disabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        if (!this.isOpen) {
          e.preventDefault();
          this.open();
        } else if (this.focusedIndex >= 0) {
          e.preventDefault();
          this.selectItemAtIndex(this.focusedIndex);
        }
        break;
      case 'Escape':
        if (this.isOpen) {
          e.preventDefault();
          this.close();
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!this.isOpen) {
          this.open();
        } else {
          this.focusNextItem();
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (this.isOpen) {
          this.focusPreviousItem();
        }
        break;
      case 'Home':
        if (this.isOpen) {
          e.preventDefault();
          this.focusFirstItem();
        }
        break;
      case 'End':
        if (this.isOpen) {
          e.preventDefault();
          this.focusLastItem();
        }
        break;
    }
  }

  private focusNextItem(): void {
    const enabledItems = this.items.filter(item => !item.disabled && !item.divider);
    if (enabledItems.length === 0) return;

    this.focusedIndex = (this.focusedIndex + 1) % this.items.length;
    while (this.items[this.focusedIndex]?.disabled || this.items[this.focusedIndex]?.divider) {
      this.focusedIndex = (this.focusedIndex + 1) % this.items.length;
    }
    this.scrollToFocused();
  }

  private focusPreviousItem(): void {
    const enabledItems = this.items.filter(item => !item.disabled && !item.divider);
    if (enabledItems.length === 0) return;

    this.focusedIndex = this.focusedIndex <= 0 ? this.items.length - 1 : this.focusedIndex - 1;
    while (this.items[this.focusedIndex]?.disabled || this.items[this.focusedIndex]?.divider) {
      this.focusedIndex = this.focusedIndex <= 0 ? this.items.length - 1 : this.focusedIndex - 1;
    }
    this.scrollToFocused();
  }

  private focusFirstItem(): void {
    this.focusedIndex = 0;
    while (this.items[this.focusedIndex]?.disabled || this.items[this.focusedIndex]?.divider) {
      this.focusedIndex++;
      if (this.focusedIndex >= this.items.length) {
        this.focusedIndex = -1;
        return;
      }
    }
    this.scrollToFocused();
  }

  private focusLastItem(): void {
    this.focusedIndex = this.items.length - 1;
    while (this.items[this.focusedIndex]?.disabled || this.items[this.focusedIndex]?.divider) {
      this.focusedIndex--;
      if (this.focusedIndex < 0) {
        this.focusedIndex = -1;
        return;
      }
    }
    this.scrollToFocused();
  }

  private scrollToFocused(): void {
    requestAnimationFrame(() => {
      const menu = this.shadowRoot?.querySelector('.dropdown__menu');
      const items = this.shadowRoot?.querySelectorAll('.dropdown__item');
      if (menu && items && items[this.focusedIndex]) {
        items[this.focusedIndex].scrollIntoView({
          block: 'nearest',
          behavior: 'smooth'
        });
      }
    });
  }

  private handleItemClick(item: DropdownItem, index: number, e: Event): void {
    e.stopPropagation();
    if (item.disabled || item.divider) return;

    this.selectItemAtIndex(index);
  }

  private selectItemAtIndex(index: number): void {
    const item = this.items[index];
    if (!item || item.disabled || item.divider) return;

    if (item.type === 'checkbox' || this.multiSelect) {
      if (this.selectedItems.has(item.id)) {
        this.selectedItems.delete(item.id);
      } else {
        this.selectedItems.add(item.id);
      }
      this.requestUpdate();
    } else if (item.type === 'radio') {
      this.selectedItems.clear();
      this.selectedItems.add(item.id);
      this.requestUpdate();
    }

    this.emit('forge-select', { 
      item,
      index,
      selected: Array.from(this.selectedItems)
    });

    if (this.closeOnSelect && !this.multiSelect && item.type !== 'checkbox') {
      this.close();
    }
  }

  private updatePosition(): void {
    if (this.position === 'auto') {
      this.calculateAutoPosition();
    } else {
      this.actualPosition = this.position;
    }
  }

  private calculateAutoPosition(): void {
    const trigger = this.shadowRoot?.querySelector('.dropdown__trigger');
    const menu = this.shadowRoot?.querySelector('.dropdown__menu');
    
    if (!trigger || !menu) return;

    const triggerRect = trigger.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const menuWidth = 250; // Approximate
    const menuHeight = 300; // Approximate

    const spaceBelow = viewportHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;
    const spaceRight = viewportWidth - triggerRect.left;
    const spaceLeft = triggerRect.right;

    let position: DropdownPosition = 'bottom-start';

    if (spaceBelow >= menuHeight) {
      position = spaceRight >= menuWidth ? 'bottom-start' : 'bottom-end';
    } else if (spaceAbove >= menuHeight) {
      position = spaceRight >= menuWidth ? 'top-start' : 'top-end';
    } else if (spaceRight >= menuWidth) {
      position = 'right';
    } else if (spaceLeft >= menuWidth) {
      position = 'left';
    }

    this.actualPosition = position;
  }

  public open(): void {
    if (!this.disabled) {
      this.isOpen = true;
    }
  }

  public close(): void {
    this.isOpen = false;
  }

  public toggle(): void {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  private renderItem(item: DropdownItem, index: number): any {
    if (item.divider) {
      return html`<div class="dropdown__divider"></div>`;
    }

    const isSelected = this.selectedItems.has(item.id);
    const isFocused = index === this.focusedIndex;

    const classes = {
      'dropdown__item': true,
      'dropdown__item--disabled': item.disabled || false,
      'dropdown__item--selected': isSelected,
      'dropdown__item--has-children': !!(item.items && item.items.length > 0)
    };

    return html`
      <div
        class=${classMap(classes)}
        role="menuitem"
        tabindex=${item.disabled ? '-1' : '0'}
        aria-disabled=${item.disabled || false}
        aria-selected=${isSelected}
        aria-current=${isFocused}
        @click=${(e: Event) => this.handleItemClick(item, index, e)}
      >
        ${item.type === 'checkbox' ? html`
          <input 
            type="checkbox" 
            class="dropdown__item-checkbox"
            .checked=${isSelected}
            ?disabled=${item.disabled}
          />
        ` : item.type === 'radio' ? html`
          <input 
            type="radio" 
            class="dropdown__item-radio"
            .checked=${isSelected}
            ?disabled=${item.disabled}
          />
        ` : ''}
        ${item.icon ? html`<span class="dropdown__item-icon">${item.icon}</span>` : ''}
        <span class="dropdown__item-label">${item.label}</span>
        ${item.badge !== undefined ? html`
          <span class="dropdown__item-badge">${item.badge}</span>
        ` : ''}
        ${item.items && item.items.length > 0 ? html`
          <span class="dropdown__item-arrow">›</span>
          <div class="dropdown__submenu dropdown__menu">
            ${repeat(item.items, subItem => subItem.id, (subItem, subIndex) => 
              this.renderItem(subItem, subIndex)
            )}
          </div>
        ` : ''}
      </div>
    `;
  }

  protected render() {
    const startTime = performance.now();

    const triggerClasses = {
      'dropdown__trigger': true,
      [`dropdown__trigger--${this.variant}`]: true,
      [`dropdown__trigger--${this.size}`]: true,
      'dropdown__trigger--active': this.isOpen,
      'dropdown__trigger--disabled': this.disabled
    };

    const menuClasses = {
      'dropdown__menu': true,
      [`dropdown__menu--${this.actualPosition}`]: true,
      'dropdown__menu--visible': this.isOpen
    };

    const displayLabel = this.selectedItems.size > 0 && !this.multiSelect
      ? this.items.find(item => this.selectedItems.has(item.id))?.label || this.label
      : this.selectedItems.size > 0 && this.multiSelect
      ? `${this.selectedItems.size} selected`
      : this.label;

    const content = html`
      <div class="dropdown">
        <forge-button
          class=${classMap(triggerClasses)}
          @click=${this.handleTriggerClick}
          aria-label=${this.label}
          aria-expanded=${this.isOpen}
          aria-haspopup="menu"
          ?disabled=${this.disabled}
          variant="default"
        >
          <span>${displayLabel}</span>
          <span class="dropdown__trigger-icon">${this.icon}</span>
        </forge-button>
        <div 
          class=${classMap(menuClasses)}
          role="menu"
          aria-hidden=${!this.isOpen}
        >
          ${this.groups.size > 0 ? 
            Array.from(this.groups.entries()).map(([group, groupItems]) => html`
              <div class="dropdown__group">${group}</div>
              ${repeat(groupItems, item => item.id, (item, index) => 
                this.renderItem(item, this.items.indexOf(item))
              )}
            `) :
            repeat(this.items, item => item.id, (item, index) => 
              this.renderItem(item, index)
            )
          }
        </div>
      </div>
    `;

    this.checkPerformance(startTime);
    return content;
  }

  getPossibleActions(): AIAction[] {
    return [
      {
        name: 'open',
        description: 'Open dropdown menu',
        available: !this.disabled && !this.isOpen,
        result: 'Shows dropdown options'
      },
      {
        name: 'close',
        description: 'Close dropdown menu',
        available: !this.disabled && this.isOpen,
        result: 'Hides dropdown options'
      },
      {
        name: 'select',
        description: 'Select an item',
        available: !this.disabled && this.items.length > 0,
        parameters: [
          {
            name: 'itemId',
            type: 'text' as const,
            required: true,
            description: 'ID of item to select'
          }
        ],
        result: 'Selects specified item'
      },
      {
        name: 'clear',
        description: 'Clear selection',
        available: !this.disabled && this.selectedItems.size > 0,
        result: 'Clears all selected items'
      }
    ];
  }

  explainState(): AIStateExplanation {
    const states = ['closed', 'open', 'disabled'];
    let currentState = 'closed';
    
    if (this.disabled) currentState = 'disabled';
    else if (this.isOpen) currentState = 'open';

    return {
      currentState,
      possibleStates: states,
      stateDescription: `Dropdown is ${currentState}. ${this.selectedItems.size} item(s) selected. ${this.items.length} total items.`,
      transitions: [
        {
          from: 'closed',
          to: 'open',
          trigger: 'Click trigger or Enter/Space key'
        },
        {
          from: 'open',
          to: 'closed',
          trigger: 'Select item, Escape key, or click outside'
        }
      ],
      visualIndicators: [
        this.isOpen ? 'Menu visible with options' : 'Menu hidden',
        `${this.variant} trigger style`,
        this.selectedItems.size > 0 ? 'Items selected' : 'No selection'
      ]
    };
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-dropdown': ForgeDropdown;
  }
}