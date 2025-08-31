import { html, css, PropertyValues } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { BaseElement, type Action, type StateExplanation } from '../../../core/BaseElement';

export type SelectSize = 'sm' | 'md' | 'lg';
export type SelectVariant = 'default' | 'filled' | 'outlined';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  group?: string;
}

@customElement('forge-select')
export class ForgeSelect extends BaseElement {
  static override styles = css`
    :host {
      display: inline-block;
      position: relative;
      font-family: var(--forge-font-family, system-ui, -apple-system, sans-serif);
      font-size: var(--forge-font-size-md, 14px);
      line-height: 1.5;
      width: 100%;
      max-width: 320px;
    }

    :host([disabled]) {
      cursor: not-allowed;
      opacity: 0.5;
    }

    :host([hidden]) {
      display: none !important;
    }

    .select-wrapper {
      position: relative;
      width: 100%;
    }

    .select-label {
      display: block;
      font-weight: 500;
      margin-bottom: var(--forge-spacing-xs, 4px);
      color: var(--forge-color-text, #1f2937);
    }

    .select-description {
      display: block;
      font-size: var(--forge-font-size-sm, 12px);
      color: var(--forge-color-text-secondary, #6b7280);
      margin-bottom: var(--forge-spacing-xs, 4px);
    }

    .select-trigger {
      position: relative;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 12px;
      border: 1px solid var(--forge-color-border, #d1d5db);
      border-radius: var(--forge-radius-md, 6px);
      background-color: var(--forge-color-bg, #ffffff);
      cursor: pointer;
      transition: all 0.2s ease;
      outline: none;
      font-family: inherit;
      font-size: inherit;
      color: var(--forge-color-text, #1f2937);
    }

    /* Size variants */
    :host([size="sm"]) .select-trigger {
      height: 32px;
      font-size: var(--forge-font-size-sm, 12px);
      padding: 0 10px;
    }

    :host([size="md"]) .select-trigger {
      height: 40px;
    }

    :host([size="lg"]) .select-trigger {
      height: 48px;
      font-size: var(--forge-font-size-lg, 16px);
      padding: 0 14px;
    }

    /* Variant styles */
    :host([variant="filled"]) .select-trigger {
      background-color: var(--forge-color-bg-secondary, #f3f4f6);
      border-color: transparent;
    }

    :host([variant="outlined"]) .select-trigger {
      border-width: 2px;
    }

    .select-trigger:hover:not([disabled]) {
      border-color: var(--forge-color-primary, #3b82f6);
    }

    .select-trigger:focus-visible {
      outline: 2px solid var(--forge-color-primary, #3b82f6);
      outline-offset: 2px;
    }

    :host([open]) .select-trigger {
      border-color: var(--forge-color-primary, #3b82f6);
    }

    :host([disabled]) .select-trigger {
      cursor: not-allowed;
      background-color: var(--forge-color-bg-disabled, #f9fafb);
      color: var(--forge-color-text-disabled, #9ca3af);
    }

    :host([error]) .select-trigger {
      border-color: var(--forge-color-error, #ef4444);
    }

    .select-value {
      flex: 1;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .select-placeholder {
      color: var(--forge-color-text-placeholder, #9ca3af);
    }

    .select-icon {
      display: flex;
      align-items: center;
      margin-left: 8px;
      transition: transform 0.2s ease;
      color: var(--forge-color-text-secondary, #6b7280);
    }

    :host([open]) .select-icon {
      transform: rotate(180deg);
    }

    .select-dropdown {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      right: 0;
      max-height: 280px;
      overflow-y: auto;
      background-color: var(--forge-color-bg, #ffffff);
      border: 1px solid var(--forge-color-border, #d1d5db);
      border-radius: var(--forge-radius-md, 6px);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      z-index: 1000;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-4px);
      transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s ease;
    }

    :host([open]) .select-dropdown {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .select-search {
      position: sticky;
      top: 0;
      padding: 8px;
      background-color: var(--forge-color-bg, #ffffff);
      border-bottom: 1px solid var(--forge-color-border, #e5e7eb);
      z-index: 1;
    }

    .select-search-input {
      width: 100%;
      padding: 6px 10px;
      border: 1px solid var(--forge-color-border, #d1d5db);
      border-radius: var(--forge-radius-sm, 4px);
      font-family: inherit;
      font-size: var(--forge-font-size-sm, 12px);
      outline: none;
    }

    .select-search-input:focus {
      border-color: var(--forge-color-primary, #3b82f6);
    }

    .select-options {
      padding: 4px;
    }

    .select-option {
      padding: 8px 12px;
      cursor: pointer;
      border-radius: var(--forge-radius-sm, 4px);
      transition: background-color 0.15s ease;
      display: flex;
      align-items: center;
      color: var(--forge-color-text, #1f2937);
    }

    .select-option:hover:not([disabled]) {
      background-color: var(--forge-color-bg-hover, #f3f4f6);
    }

    .select-option[selected] {
      background-color: var(--forge-color-primary-light, #dbeafe);
      color: var(--forge-color-primary, #3b82f6);
      font-weight: 500;
    }

    .select-option[disabled] {
      cursor: not-allowed;
      opacity: 0.5;
      color: var(--forge-color-text-disabled, #9ca3af);
    }

    .select-option[focused] {
      background-color: var(--forge-color-bg-hover, #f3f4f6);
      outline: 2px solid var(--forge-color-primary, #3b82f6);
      outline-offset: -2px;
    }

    .select-group {
      margin-top: 8px;
    }

    .select-group:first-child {
      margin-top: 0;
    }

    .select-group-label {
      padding: 4px 12px;
      font-size: var(--forge-font-size-xs, 11px);
      font-weight: 600;
      text-transform: uppercase;
      color: var(--forge-color-text-secondary, #6b7280);
      letter-spacing: 0.05em;
    }

    .select-no-results {
      padding: 16px;
      text-align: center;
      color: var(--forge-color-text-secondary, #6b7280);
      font-size: var(--forge-font-size-sm, 12px);
    }

    /* Required indicator */
    .required-indicator {
      color: var(--forge-color-error, #ef4444);
      margin-left: 4px;
    }

    /* Error message */
    .error-message {
      color: var(--forge-color-error, #ef4444);
      font-size: var(--forge-font-size-sm, 12px);
      margin-top: var(--forge-spacing-xs, 4px);
    }

    /* Loading state */
    :host([loading]) .select-trigger {
      pointer-events: none;
    }

    .loading-spinner {
      display: inline-block;
      width: 14px;
      height: 14px;
      border: 2px solid var(--forge-color-border, #d1d5db);
      border-top-color: var(--forge-color-primary, #3b82f6);
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    /* Performance overlay */
    .performance-overlay {
      position: fixed;
      top: 4px;
      left: 4px;
      background: rgba(0, 0, 0, 0.8);
      color: #00ff00;
      padding: 4px 8px;
      font-family: monospace;
      font-size: 10px;
      border-radius: 4px;
      z-index: 10000;
      pointer-events: none;
    }

    .performance-overlay.warning {
      color: #ffff00;
    }

    .performance-overlay.error {
      color: #ff0000;
    }
  `;

  @property({ type: String }) value = '';
  @property({ type: String }) name?: string;
  @property({ type: String }) label = '';
  @property({ type: String }) description = '';
  @property({ type: String }) placeholder = 'Select an option';
  @property({ type: Array }) options: SelectOption[] = [];
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean }) required = false;
  @property({ type: Boolean, reflect: true }) error = false;
  @property({ type: String, attribute: 'error-message' }) errorMessage = '';
  @property({ type: Boolean }) searchable = false;
  @property({ type: Boolean, reflect: true }) loading = false;
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String, reflect: true }) size: SelectSize = 'md';
  @property({ type: String, reflect: true }) variant: SelectVariant = 'default';

  @state() private searchQuery = '';
  @state() private focusedIndex = -1;
  @state() private filteredOptions: SelectOption[] = [];

  @query('.select-trigger') private trigger!: HTMLButtonElement;
  @query('.select-dropdown') private dropdown!: HTMLElement;
  @query('.select-search-input') private searchInput?: HTMLInputElement;

  constructor() {
    super();
    // Set AI metadata for ADR-014 compliance
    this.aiMetadata = {
      purpose: 'Select single option from dropdown list',
      dataType: 'string',
      criticality: 'medium',
      semanticRole: 'combobox'
    }
    
    // Initialize filteredOptions with empty array
    this.filteredOptions = [];
    
    // Bind event handler for document click
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'combobox');
    this.setAttribute('aria-haspopup', 'listbox');
    this.setAttribute('aria-expanded', String(this.open));
    if (this.disabled) {
      this.setAttribute('aria-disabled', 'true');
    }
    if (this.required) {
      this.setAttribute('aria-required', 'true');
    }
    this.updateAria();
    this.filteredOptions = this.options || [];
    document.addEventListener('click', this.handleDocumentClick);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('click', this.handleDocumentClick);
  }

  override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    
    if (changedProperties.has('open')) {
      this.setAttribute('aria-expanded', String(this.open));
      if (this.open && this.searchable) {
        setTimeout(() => this.searchInput?.focus(), 50);
      }
    }

    if (changedProperties.has('disabled')) {
      if (this.disabled) {
        this.setAttribute('aria-disabled', 'true');
      } else {
        this.removeAttribute('aria-disabled');
      }
    }

    if (changedProperties.has('options')) {
      this.filteredOptions = this.options;
      this.searchQuery = '';
    }

    if (changedProperties.has('error') || changedProperties.has('errorMessage')) {
      if (this.error) {
        this.setAttribute('aria-invalid', 'true');
        if (this.errorMessage) {
          this.setAttribute('aria-errormessage', 'error-message');
        }
      } else {
        this.removeAttribute('aria-invalid');
        this.removeAttribute('aria-errormessage');
      }
    }

    if (changedProperties.has('label')) {
      this.updateAria();
    }
  }

  private updateAria(): void {
    if (this.ariaDescription) {
      this.setAttribute('aria-description', this.ariaDescription);
    }

    if (this.semanticRole) {
      this.setAttribute('data-semantic-role', this.semanticRole);
    }

    if (this.aiContext) {
      this.setAttribute('data-ai-context', this.aiContext);
    }

    if (this.label) {
      this.setAttribute('aria-label', this.label);
    }
  }

  private handleDocumentClick(e: Event): void {
    if (!this.contains(e.target as Node)) {
      this.close();
    }
  }

  private handleTriggerClick = (): void => {
    if (this.disabled || this.loading) return;
    
    if (this.open) {
      this.close();
    } else {
      this.openDropdown();
    }
  }

  private handleKeyDown = (e: KeyboardEvent): void => {
    if (this.disabled || this.loading) return;

    // Ensure filteredOptions is initialized
    if (!this.filteredOptions || this.filteredOptions.length === 0) {
      this.filteredOptions = this.options || [];
    }

    const enabledOptions = this.filteredOptions.filter(opt => !opt.disabled);
    if (enabledOptions.length === 0) return;

    let handled = false;

    switch (e.key) {
      case 'Enter':
      case ' ':
        if (!this.open) {
          this.openDropdown();
        } else if (this.focusedIndex >= 0) {
          const option = enabledOptions[this.focusedIndex];
          if (option) {
            this.selectOption(option.value);
          }
        }
        handled = true;
        break;
      
      case 'Escape':
        if (this.open) {
          this.close();
          this.trigger?.focus();
        }
        handled = true;
        break;
      
      case 'ArrowDown':
        if (!this.open) {
          this.openDropdown();
        } else {
          this.focusedIndex = Math.min(this.focusedIndex + 1, enabledOptions.length - 1);
          if (this.focusedIndex === -1) this.focusedIndex = 0;
          this.scrollToFocused();
        }
        handled = true;
        break;
      
      case 'ArrowUp':
        if (this.open) {
          this.focusedIndex = Math.max(this.focusedIndex - 1, 0);
          this.scrollToFocused();
        }
        handled = true;
        break;
      
      case 'Home':
        if (this.open) {
          this.focusedIndex = 0;
          this.scrollToFocused();
        }
        handled = true;
        break;
      
      case 'End':
        if (this.open) {
          this.focusedIndex = enabledOptions.length - 1;
          this.scrollToFocused();
        }
        handled = true;
        break;
    }

    if (handled) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  private handleSearch = (e: Event): void => {
    const input = e.target as HTMLInputElement;
    this.searchQuery = input.value.toLowerCase();
    
    if (this.searchQuery && this.options) {
      this.filteredOptions = this.options.filter(option =>
        option.label.toLowerCase().includes(this.searchQuery) ||
        option.value.toLowerCase().includes(this.searchQuery)
      );
    } else {
      this.filteredOptions = this.options || [];
    }
    
    this.focusedIndex = -1;
  }

  private scrollToFocused(): void {
    requestAnimationFrame(() => {
      const options = this.shadowRoot?.querySelectorAll('.select-option');
      if (options && options[this.focusedIndex]) {
        options[this.focusedIndex].scrollIntoView({
          block: 'nearest',
          behavior: 'smooth'
        });
      }
    });
  }

  public openDropdown(): void {
    if (this.disabled || this.loading) return;
    
    this.open = true;
    // Ensure filteredOptions is synchronized with options
    if (!this.filteredOptions || this.filteredOptions.length === 0) {
      this.filteredOptions = this.options || [];
    }
    
    if (this.options && this.options.length > 0) {
      this.focusedIndex = this.options.findIndex(opt => opt.value === this.value);
      if (this.focusedIndex === -1) this.focusedIndex = 0;
    } else {
      this.focusedIndex = -1;
    }
    
    this.emit('forge-open');
  }

  public close(): void {
    this.open = false;
    this.searchQuery = '';
    this.filteredOptions = this.options || [];
    this.focusedIndex = -1;
    
    this.emit('forge-close');
  }

  public selectOption(value: string): void {
    const option = this.options.find(opt => opt.value === value);
    if (!option || option.disabled) return;
    
    const previousValue = this.value;
    this.value = value;
    this.close();
    
    const detail = {
      value: this.value,
      previousValue,
      option
    }
    
    this.emit('change', detail);
    this.emit('forge-change', detail);
  }

  public reset(): void {
    this.value = '';
    this.error = false;
    this.errorMessage = '';
    this.searchQuery = '';
    this.filteredOptions = this.options || [];
  }

  public validate(): boolean {
    if (this.required && !this.value) {
      this.error = true;
      this.errorMessage = 'Please select an option';
      return false;
    }
    this.error = false;
    this.errorMessage = '';
    return true;
  }

  // ADR-014 AI helper method overrides
  override getPossibleActions(): Action[] {
    return [
      {
        name: 'openDropdown',
        description: 'Open the dropdown menu',
        available: !this.disabled && !this.loading && !this.open
      },
      {
        name: 'close',
        description: 'Close the dropdown menu',
        available: this.open
      },
      {
        name: 'selectOption',
        description: 'Select a specific option',
        available: !this.disabled && !this.loading
      },
      {
        name: 'reset',
        description: 'Clear the selection',
        available: true
      },
      {
        name: 'validate',
        description: 'Validate the current selection',
        available: true
      }
    ];
  }

  override explainState(): StateExplanation {
    const selectedOption = this.options.find(opt => opt.value === this.value);
    const state = this.disabled ? 'disabled' : 
                  this.loading ? 'loading' :
                  this.open ? 'open' :
                  this.error ? 'error' :
                  this.value ? 'selected' : 'unselected';
    
    return {
      currentState: state,
      possibleStates: ['unselected', 'selected', 'open', 'disabled', 'loading', 'error'],
      stateDescription: this.disabled ? 'Select is disabled' :
                        this.loading ? 'Select is loading' :
                        this.open ? 'Dropdown is open' :
                        this.error ? `Select has error: ${this.errorMessage}` :
                        selectedOption ? `Selected: ${selectedOption.label}` : 'No option selected'
    }
  }

  override getAIDescription(): string {
    const selectedOption = this.options.find(opt => opt.value === this.value);
    const label = this.label || 'Select dropdown';
    const selection = selectedOption ? selectedOption.label : 'none';
    return `${label} - ${this.options.length} options, selected: ${selection}${this.disabled ? ' (disabled)' : ''}${this.loading ? ' (loading)' : ''}${this.error ? ` (error: ${this.errorMessage})` : ''}`;
  }

  protected override applyPerformanceDegradation(): void {
    // Disable animations when performance is poor
    const dropdown = this.shadowRoot?.querySelector('.select-dropdown') as HTMLElement;
    if (dropdown) {
      dropdown.style.transition = 'none';
    }
  }

  override render() {
    const startTime = performance.now();
    
    const selectedOption = this.options.find(opt => opt.value === this.value);
    const groups = [...new Set(this.filteredOptions.map(opt => opt.group).filter(Boolean))];
    
    const content = html`
      <div class="select-wrapper">
        ${this.label ? html`
          <label class="select-label" part="label">
            ${this.label}
            ${this.required ? html`<span class="required-indicator">*</span>` : ''}
          </label>
        ` : ''}
        ${this.description ? html`
          <span class="select-description" part="description">
            ${this.description}
          </span>
        ` : ''}
        
        <button
          class="select-trigger"
          part="trigger"
          type="button"
          ?disabled="${this.disabled || this.loading}"
          @click="${this.handleTriggerClick}"
          @keydown="${this.handleKeyDown}"
          aria-labelledby="${this.label ? 'label' : ''}"
          aria-describedby="${this.description ? 'description' : ''}"
        >
          <span class="select-value">
            ${selectedOption ? 
              html`<span>${selectedOption.label}</span>` : 
              html`<span class="select-placeholder">${this.placeholder}</span>`
            }
          </span>
          <span class="select-icon" part="icon">
            ${this.loading ? html`
              <span class="loading-spinner"></span>
            ` : html`
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            `}
          </span>
        </button>
        
        <div 
          class="select-dropdown" 
          part="dropdown"
          role="listbox"
          aria-label="${this.label || 'Options'}"
        >
          ${this.searchable ? html`
            <div class="select-search" part="search">
              <input
                type="text"
                class="select-search-input"
                part="search-input"
                placeholder="Search..."
                .value="${this.searchQuery}"
                @input="${this.handleSearch}"
                @keydown="${(e: KeyboardEvent) => e.stopPropagation()}"
              />
            </div>
          ` : ''}
          
          <div class="select-options" part="options">
            ${this.filteredOptions.length === 0 ? html`
              <div class="select-no-results" part="no-results">
                No options found
              </div>
            ` : groups.length > 0 ? 
              groups.map(group => html`
                <div class="select-group" part="group">
                  ${group ? html`
                    <div class="select-group-label" part="group-label">${group}</div>
                  ` : ''}
                  ${this.renderSelectOptions(this.filteredOptions.filter(opt => opt.group === group))}
                </div>
              `) : 
              this.renderSelectOptions(this.filteredOptions)
            }
          </div>
        </div>
        
        ${this.error && this.errorMessage ? html`
          <span id="error-message" class="error-message" part="error" role="alert">
            ${this.errorMessage}
          </span>
        ` : ''}
      </div>
    `;

    this.checkPerformance(startTime);

    return html`
      ${this.showMetrics ? this.renderMetrics() : ''}
      ${content}
    `;
  }

  private renderSelectOptions = (options: SelectOption[]) => {
    return options.map((option, index) => {
      const globalIndex = this.filteredOptions.indexOf(option);
      const isSelected = option.value === this.value;
      const isFocused = globalIndex === this.focusedIndex;
      
      return html`
        <div
          class="select-option"
          part="option"
          role="option"
          ?selected="${isSelected}"
          ?focused="${isFocused}"
          ?disabled="${option.disabled}"
          aria-selected="${isSelected}"
          @click="${() => !option.disabled && this.selectOption(option.value)}"
          @mouseenter="${() => !option.disabled && (this.focusedIndex = globalIndex)}"
        >
          ${option.label}
        </div>
      `;
    });
  }

  private renderMetrics() {
    const status = this.renderTime > this.maxRenderMs ? 'error' : 
                   this.renderTime > this.maxRenderMs * 0.75 ? 'warning' : '';
    
    return html`
      <div class="performance-overlay ${status}">
        Select: ${this.value || 'none'}<br>
        Options: ${this.options.length}<br>
        Filtered: ${this.filteredOptions.length}<br>
        Render: ${this.renderTime.toFixed(2)}ms<br>
        Count: ${this.renderCount}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-select': ForgeSelect;
  }
}