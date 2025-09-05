import { html, css, PropertyValues, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { BaseElement } from '../../../core/BaseElement';
import type { AIMetadata, AIAction, AIStateExplanation } from '../../../core/ai-metadata.types';
import '../../atoms/input/input';
import '../../atoms/checkbox/checkbox';
import '../../atoms/icon/icon';

export interface MultiSelectOption {
  value: string;
  label: string;
  group?: string;
  disabled?: boolean;
}

@customElement('forge-multi-select')
export class ForgeMultiSelect extends BaseElement {
  static override styles = css`
    ${BaseElement.styles}
    
      :host {
        display: inline-block;
        position: relative;
        width: 100%;
        max-width: 400px;
      }

      .multi-select {
        position: relative;
      }

      .multi-select__trigger {
        display: flex;
        align-items: center;
        gap: 8px;
        width: 100%;
        min-height: 40px;
        padding: 8px 32px 8px 12px;
        border: 1px solid var(--forge-border-color, #d1d5db);
        border-radius: 6px;
        background: var(--forge-bg-color, #ffffff);
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .multi-select__trigger:hover {
        border-color: var(--forge-border-hover-color, #9ca3af);
      }

      .multi-select__trigger:focus {
        outline: none;
        border-color: var(--forge-primary-color, #3b82f6);
        box-shadow: 0 0 0 3px var(--forge-primary-alpha, rgba(59, 130, 246, 0.1));
      }

      .multi-select__trigger[aria-expanded="true"] {
        border-color: var(--forge-primary-color, #3b82f6);
      }

      .multi-select__trigger[disabled] {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .multi-select__placeholder {
        color: var(--forge-text-muted, #6b7280);
      }

      .multi-select__tags {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
      }

      .multi-select__tag {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 2px 8px;
        background: var(--forge-tag-bg, #e5e7eb);
        border-radius: 4px;
        font-size: 14px;
      }

      .multi-select__tag-remove {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 16px;
        height: 16px;
        padding: 0;
        border: none;
        background: transparent;
        cursor: pointer;
        border-radius: 2px;
      }

      .multi-select__tag-remove:hover {
        background: var(--forge-tag-remove-hover, rgba(0, 0, 0, 0.1));
      }

      .multi-select__icon {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none;
        transition: transform 0.2s ease;
      }

      .multi-select__trigger[aria-expanded="true"] .multi-select__icon {
        transform: translateY(-50%) rotate(180deg);
      }

      .multi-select__dropdown {
        position: absolute;
        top: calc(100% + 4px);
        left: 0;
        right: 0;
        z-index: 1000;
        max-height: 300px;
        overflow: hidden;
        background: var(--forge-dropdown-bg, #ffffff);
        border: 1px solid var(--forge-border-color, #d1d5db);
        border-radius: 6px;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
        opacity: 0;
        visibility: hidden;
        transform: translateY(-10px);
        transition: all 0.2s ease;
      }

      .multi-select__dropdown[data-open="true"] {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }

      .multi-select__search {
        padding: 8px;
        border-bottom: 1px solid var(--forge-border-color, #e5e7eb);
      }

      .multi-select__search forge-input {
        width: 100%;
      }

      .multi-select__actions {
        display: flex;
        gap: 8px;
        padding: 8px;
        border-bottom: 1px solid var(--forge-border-color, #e5e7eb);
      }

      .multi-select__action {
        flex: 1;
        padding: 4px 8px;
        border: 1px solid var(--forge-border-color, #d1d5db);
        border-radius: 4px;
        background: transparent;
        font-size: 12px;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .multi-select__action:hover {
        background: var(--forge-hover-bg, #f3f4f6);
      }

      .multi-select__options {
        max-height: 200px;
        overflow-y: auto;
      }

      .multi-select__group {
        padding: 8px 12px 4px;
        font-size: 12px;
        font-weight: 600;
        color: var(--forge-text-muted, #6b7280);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .multi-select__option {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        cursor: pointer;
        transition: background 0.2s ease;
      }

      .multi-select__option:hover {
        background: var(--forge-hover-bg, #f3f4f6);
      }

      .multi-select__option[aria-disabled="true"] {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .multi-select__option-label {
        flex: 1;
      }

      .multi-select__option mark {
        background: var(--forge-highlight, #fef3c7);
        font-weight: 600;
      }

      .multi-select__count {
        margin-left: 4px;
        color: var(--forge-text-muted, #6b7280);
      }

      .multi-select__no-results {
        padding: 16px;
        text-align: center;
        color: var(--forge-text-muted, #6b7280);
      }
    `;

  @property({ type: Array, attribute: false }) options: MultiSelectOption[] = [];
  @property({ type: Array, attribute: false }) value: string[] = [];
  @property({ type: String }) placeholder = 'Select options...';
  @property({ type: String, attribute: 'search-placeholder' }) searchPlaceholder = 'Search...';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean, attribute: 'show-search' }) showSearch = true;
  @property({ type: Boolean, attribute: 'show-actions' }) showActions = true;
  @property({ type: Number, attribute: 'max-selections' }) maxSelections = Infinity;
  @property({ type: Boolean, attribute: 'group-by' }) groupBy = false;
  @property({ type: String, attribute: 'no-results-text' }) noResultsText = 'No results found';

  @state() isOpen = false;  // Make public for testing
  @state() private searchQuery = '';
  @state() private filteredOptions: MultiSelectOption[] = [];

  protected aiMetadata: AIMetadata = {
    purpose: 'Select multiple options from a list',
    dataType: 'multiselection',
    criticality: 'medium',
    semanticRole: 'multi-select',
    interactions: [
      {
        type: 'click',
        description: 'Toggle dropdown',
        outcome: 'Opens or closes the options list'
      },
      {
        type: 'input',
        description: 'Search options',
        outcome: 'Filters the available options'
      },
      {
        type: 'select',
        description: 'Toggle option selection',
        outcome: 'Adds or removes option from selection'
      },
      {
        type: 'keyboard',
        description: 'Navigate options',
        shortcuts: ['ArrowUp', 'ArrowDown', 'Enter', 'Escape']
      }
    ],
    validation: [
      {
        type: 'maxLength',
        value: this.maxSelections,
        message: `Maximum ${this.maxSelections} selections allowed`
      }
    ]
  };

  constructor() {
    super();
    this.filteredOptions = this.options;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this.handleKeydown);
    document.addEventListener('click', this.handleDocumentClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this.handleKeydown);
    document.removeEventListener('click', this.handleDocumentClick);
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);
    this.filteredOptions = this.options;
  }

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    
    if (changedProperties.has('options') || changedProperties.has('searchQuery')) {
      this.filterOptions();
    }

    if (changedProperties.has('value')) {
      this.updateComponentState('selectedCount', this.value.length);
      this.updateComponentState('hasSelection', this.value.length > 0);
      this.emit('forge-change', { value: this.value });
    }
  }

  private filterOptions(): void {
    if (!this.searchQuery) {
      this.filteredOptions = this.options;
      return;
    }

    const query = this.searchQuery.toLowerCase();
    this.filteredOptions = this.options.filter(option =>
      option.label.toLowerCase().includes(query)
    );
  }

  private toggleDropdown = (): void => {
    if (this.disabled) return;
    this.isOpen = !this.isOpen;
    this.updateComponentState('isOpen', this.isOpen);
  }

  private closeDropdown(): void {
    this.isOpen = false;
    this.searchQuery = '';
    this.filterOptions();
    this.updateComponentState('isOpen', false);
  }

  private handleDocumentClick = (e: MouseEvent): void => {
    if (!this.contains(e.target as Node)) {
      this.closeDropdown();
    }
  };

  private handleKeydown = (e: KeyboardEvent): void => {
    if (this.disabled) return;

    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        this.closeDropdown();
        break;
      case 'Enter':
        e.preventDefault();
        if (!this.isOpen) {
          this.toggleDropdown();
        }
        break;
      case 'ArrowDown':
      case 'ArrowUp':
        e.preventDefault();
        if (!this.isOpen) {
          this.toggleDropdown();
        }
        break;
    }
  };

  private handleSearch(e: CustomEvent): void {
    this.searchQuery = e.detail.value;
  }

  private toggleOption(option: MultiSelectOption): void {
    if (option.disabled) return;

    const oldValue = [...this.value];
    const newValue = [...this.value];
    const index = newValue.indexOf(option.value);

    if (index > -1) {
      newValue.splice(index, 1);
    } else if (newValue.length < this.maxSelections) {
      newValue.push(option.value);
    }

    this.value = newValue;
    this.dispatchEvent(new CustomEvent('change', {
      detail: { value: newValue, previousValue: oldValue },
      bubbles: true,
      composed: true
    }));
  }

  private removeTag(optionValue: string, e: Event): void {
    e.stopPropagation();
    const oldValue = [...this.value];
    const newValue = this.value.filter(v => v !== optionValue);
    this.value = newValue;
    this.dispatchEvent(new CustomEvent('change', {
      detail: { value: newValue, previousValue: oldValue },
      bubbles: true,
      composed: true
    }));
  }

  private selectAll(): void {
    const oldValue = [...this.value];
    const enabledOptions = this.filteredOptions.filter(o => !o.disabled);
    const newValues = enabledOptions.slice(0, this.maxSelections).map(o => o.value);
    this.value = newValues;
    this.dispatchEvent(new CustomEvent('change', {
      detail: { value: newValues, previousValue: oldValue },
      bubbles: true,
      composed: true
    }));
  }

  private selectNone(): void {
    const oldValue = [...this.value];
    this.value = [];
    this.dispatchEvent(new CustomEvent('change', {
      detail: { value: [], previousValue: oldValue },
      bubbles: true,
      composed: true
    }));
  }

  private invertSelection(): void {
    const oldValue = [...this.value];
    const enabledOptions = this.filteredOptions.filter(o => !o.disabled);
    const newValue = enabledOptions
      .filter(o => !this.value.includes(o.value))
      .slice(0, this.maxSelections)
      .map(o => o.value);
    this.value = newValue;
    this.dispatchEvent(new CustomEvent('change', {
      detail: { value: newValue, previousValue: oldValue },
      bubbles: true,
      composed: true
    }));
  }

  private highlightMatch(text: string): any {
    if (!this.searchQuery) return text;
    
    const regex = new RegExp(`(${this.searchQuery})`, 'gi');
    const parts = text.split(regex);
    
    return html`${parts.map((part, i) => 
      regex.test(part) ? html`<mark>${part}</mark>` : part
    )}`;
  }

  private renderTags() {
    const selectedOptions = this.options.filter(o => this.value.includes(o.value));
    
    if (selectedOptions.length === 0) {
      return html`<span class="multi-select__placeholder">${this.placeholder}</span>`;
    }

    if (selectedOptions.length > 3) {
      return html`
        <div class="multi-select__tags">
          ${selectedOptions.slice(0, 2).map(option => html`
            <span class="multi-select__tag">
              ${option.label}
              <button
                class="multi-select__tag-remove"
                @click=${(e: Event) => this.removeTag(option.value, e)}
                aria-label="Remove ${option.label}"
              >
                ×
              </button>
            </span>
          `)}
          <span class="multi-select__count">+${selectedOptions.length - 2} more</span>
        </div>
      `;
    }

    return html`
      <div class="multi-select__tags">
        ${selectedOptions.map(option => html`
          <span class="multi-select__tag">
            ${option.label}
            <button
              class="multi-select__tag-remove"
              @click=${(e: Event) => this.removeTag(option.value, e)}
              aria-label="Remove ${option.label}"
            >
              ×
            </button>
          </span>
        `)}
      </div>
    `;
  }

  private renderOptionsList() {
    if (this.filteredOptions.length === 0) {
      return html`
        <div class="multi-select__no-results">
          ${this.noResultsText}
        </div>
      `;
    }

    if (this.groupBy) {
      const groups = new Map<string, MultiSelectOption[]>();
      const ungrouped: MultiSelectOption[] = [];

      this.filteredOptions.forEach(option => {
        if (option.group) {
          if (!groups.has(option.group)) {
            groups.set(option.group, []);
          }
          groups.get(option.group)!.push(option);
        } else {
          ungrouped.push(option);
        }
      });

      return html`
        ${ungrouped.length > 0 ? ungrouped.map(option => this.renderOption(option)) : ''}
        ${Array.from(groups.entries()).map(([group, options]) => html`
          <div class="multi-select__group">${group}</div>
          ${options.map(option => this.renderOption(option))}
        `)}
      `;
    }

    return this.filteredOptions.map(option => this.renderOption(option));
  }

  private renderOption(option: MultiSelectOption) {
    const isSelected = this.value.includes(option.value);
    
    return html`
      <div
        class="multi-select__option"
        @click=${() => this.toggleOption(option)}
        aria-disabled=${option.disabled}
        role="option"
        aria-selected=${isSelected}
      >
        <forge-checkbox
          .checked=${isSelected}
          .disabled=${option.disabled}
          @click=${(e: Event) => e.stopPropagation()}
        ></forge-checkbox>
        <span class="multi-select__option-label">
          ${this.highlightMatch(option.label)}
        </span>
      </div>
    `;
  }

  protected render() {
    const startTime = performance.now();

    const content = html`
      <div class="multi-select">
        <div
          class="multi-select__trigger"
          @click=${this.toggleDropdown}
          tabindex="0"
          role="combobox"
          aria-expanded=${this.isOpen}
          aria-haspopup="listbox"
          ?disabled=${this.disabled}
        >
          ${this.renderTags()}
          <forge-icon
            class="multi-select__icon"
            name="chevron-down"
            size="small"
          ></forge-icon>
        </div>

        <div
          class="multi-select__dropdown"
          data-open=${this.isOpen}
          role="listbox"
          aria-multiselectable="true"
        >
          ${this.showSearch ? html`
            <div class="multi-select__search">
              <forge-input
                type="search"
                placeholder=${this.searchPlaceholder}
                @input=${this.handleSearch}
                size="small"
              ></forge-input>
            </div>
          ` : ''}

          ${this.showActions ? html`
            <div class="multi-select__actions">
              <button class="multi-select__action" @click=${this.selectAll}>
                All
              </button>
              <button class="multi-select__action" @click=${this.selectNone}>
                None
              </button>
              <button class="multi-select__action" @click=${this.invertSelection}>
                Invert
              </button>
            </div>
          ` : ''}

          <div class="multi-select__options">
            ${this.renderOptionsList()}
          </div>
        </div>
      </div>
    `;

    this.checkPerformance(startTime);
    return content;
  }

  getPossibleActions(): AIAction[] {
    return [
      {
        name: 'toggle',
        description: 'Toggle dropdown open/closed',
        available: !this.disabled,
        result: 'Dropdown visibility changes'
      },
      {
        name: 'selectOption',
        description: 'Select or deselect an option',
        available: !this.disabled && this.isOpen,
        parameters: [
          {
            name: 'value',
            type: 'text',
            required: true,
            description: 'Option value to toggle'
          }
        ],
        result: 'Option selection state changes'
      },
      {
        name: 'selectAll',
        description: 'Select all available options',
        available: !this.disabled && this.showActions,
        result: 'All options selected'
      },
      {
        name: 'clearSelection',
        description: 'Clear all selections',
        available: !this.disabled && this.value.length > 0,
        result: 'All selections cleared'
      },
      {
        name: 'search',
        description: 'Search/filter options',
        available: !this.disabled && this.showSearch,
        parameters: [
          {
            name: 'query',
            type: 'text',
            required: true,
            description: 'Search query'
          }
        ],
        result: 'Options filtered by search query'
      }
    ];
  }

  explainState(): AIStateExplanation {
    const states = ['closed', 'open', 'searching', 'selecting'];
    let currentState = 'closed';
    
    if (this.isOpen) {
      currentState = this.searchQuery ? 'searching' : 'open';
    } else if (this.value.length > 0) {
      currentState = 'selecting';
    }

    return {
      currentState,
      possibleStates: states,
      stateDescription: `Multi-select is ${currentState}. ${this.value.length} of ${this.options.length} options selected.`,
      transitions: [
        {
          from: 'closed',
          to: 'open',
          trigger: 'Click trigger or press Enter'
        },
        {
          from: 'open',
          to: 'searching',
          trigger: 'Type in search field'
        },
        {
          from: 'open',
          to: 'closed',
          trigger: 'Click outside or press Escape'
        }
      ],
      visualIndicators: [
        this.isOpen ? 'Dropdown visible' : 'Dropdown hidden',
        `${this.value.length} items selected`,
        this.searchQuery ? 'Search active' : 'No search'
      ]
    };
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-multi-select': ForgeMultiSelect;
  }
}