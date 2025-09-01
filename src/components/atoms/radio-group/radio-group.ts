import { html, css, PropertyValues } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { BaseElement, type Action, type StateExplanation } from '../../../core/BaseElement';

export type RadioOrientation = 'horizontal' | 'vertical';
export type RadioLabelPosition = 'start' | 'end';
export type RadioSize = 'sm' | 'md' | 'lg';

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
}

@customElement('forge-radio-group')
export class ForgeRadioGroup extends BaseElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--forge-font-family, system-ui, -apple-system, sans-serif);
      font-size: var(--forge-font-size-md, 14px);
      line-height: 1.5;
    }

    :host([disabled]) {
      cursor: not-allowed;
      opacity: 0.5;
    }

    :host([hidden]) {
      display: none !important;
    }

    .radio-group {
      display: flex;
      gap: var(--forge-spacing-md, 16px);
    }

    :host([orientation="vertical"]) .radio-group {
      flex-direction: column;
    }

    :host([orientation="horizontal"]) .radio-group {
      flex-direction: row;
      flex-wrap: wrap;
    }

    .radio-group-label {
      display: block;
      font-weight: 500;
      margin-bottom: var(--forge-spacing-sm, 8px);
      color: var(--forge-color-text, #1f2937);
    }

    .radio-group-description {
      display: block;
      font-size: var(--forge-font-size-sm, 12px);
      color: var(--forge-color-text-secondary, #6b7280);
      margin-bottom: var(--forge-spacing-sm, 8px);
    }

    .radio-item {
      display: flex;
      align-items: flex-start;
      gap: var(--forge-spacing-xs, 8px);
      cursor: pointer;
      position: relative;
    }

    .radio-item[disabled] {
      cursor: not-allowed;
      opacity: 0.5;
    }

    :host([label-position="start"]) .radio-item {
      flex-direction: row-reverse;
    }

    .radio-input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }

    .radio-control {
      position: relative;
      display: inline-block;
      border-radius: 50%;
      border: 2px solid var(--forge-color-border, #d1d5db);
      background-color: var(--forge-color-bg, #ffffff);
      transition: all 0.2s ease;
      flex-shrink: 0;
      margin-top: 2px;
    }

    /* Size variants */
    :host([size="sm"]) .radio-control {
      width: 16px;
      height: 16px;
    }

    :host([size="md"]) .radio-control {
      width: 20px;
      height: 20px;
    }

    :host([size="lg"]) .radio-control {
      width: 24px;
      height: 24px;
    }

    .radio-control::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0);
      border-radius: 50%;
      background-color: var(--forge-color-primary, #3b82f6);
      transition: transform 0.2s ease;
    }

    /* Size variants for inner dot */
    :host([size="sm"]) .radio-control::after {
      width: 6px;
      height: 6px;
    }

    :host([size="md"]) .radio-control::after {
      width: 8px;
      height: 8px;
    }

    :host([size="lg"]) .radio-control::after {
      width: 10px;
      height: 10px;
    }

    /* Checked state */
    .radio-input:checked ~ .radio-control {
      border-color: var(--forge-color-primary, #3b82f6);
    }

    .radio-input:checked ~ .radio-control::after {
      transform: translate(-50%, -50%) scale(1);
    }

    /* Hover state */
    .radio-item:not([disabled]):hover .radio-control {
      border-color: var(--forge-color-primary, #3b82f6);
      box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
    }

    /* Focus state */
    .radio-input:focus-visible ~ .radio-control {
      outline: 2px solid var(--forge-color-primary, #3b82f6);
      outline-offset: 2px;
    }

    /* Error state */
    :host([error]) .radio-control {
      border-color: var(--forge-color-error, #ef4444);
    }

    :host([error]) .radio-input:checked ~ .radio-control::after {
      background-color: var(--forge-color-error, #ef4444);
    }

    .radio-label {
      cursor: pointer;
      color: var(--forge-color-text, #1f2937);
      user-select: none;
    }

    .radio-item[disabled] .radio-label {
      cursor: not-allowed;
      color: var(--forge-color-text-disabled, #9ca3af);
    }

    .radio-label-wrapper {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .radio-option-description {
      font-size: var(--forge-font-size-sm, 12px);
      color: var(--forge-color-text-secondary, #6b7280);
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
  @property({ type: Array }) options: RadioOption[] = [];
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean }) required = false;
  @property({ type: Boolean, reflect: true }) error = false;
  @property({ type: String, attribute: 'error-message' }) errorMessage = '';
  @property({ type: String, reflect: true }) orientation: RadioOrientation = 'vertical';
  @property({ type: String, attribute: 'label-position', reflect: true }) labelPosition: RadioLabelPosition = 'end';
  @property({ type: String, reflect: true }) size: RadioSize = 'md';

  @state() private focusedIndex = -1;

  @query('.radio-group') private radioGroup!: HTMLElement;

  constructor() {
    super();
    // Set AI metadata for ADR-014 compliance
    this.aiMetadata = {
      purpose: 'Select single option from multiple choices',
      dataType: 'text',
      criticality: 'medium',
      semanticRole: 'radiogroup'
    };
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'radiogroup');
    if (this.disabled) {
      this.setAttribute('aria-disabled', 'true');
    }
    if (this.required) {
      this.setAttribute('aria-required', 'true');
    }
    this.updateAria();
  }

  override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    
    if (changedProperties.has('disabled')) {
      if (this.disabled) {
        this.setAttribute('aria-disabled', 'true');
      } else {
        this.removeAttribute('aria-disabled');
      }
    }

    if (changedProperties.has('required')) {
      if (this.required) {
        this.setAttribute('aria-required', 'true');
      } else {
        this.removeAttribute('aria-required');
      }
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

  private handleChange(value: string): void {
    const startTime = performance.now();
    
    if (this.disabled) return;

    const previousValue = this.value;
    this.value = value;

    const detail = {
      value: this.value,
      previousValue,
      option: this.options.find(opt => opt.value === value)
    };

    this.emit('change', detail);
    this.emit('forge-change', detail);
    
    this.checkPerformance(startTime);
  }

  private handleKeyDown(e: KeyboardEvent): void {
    if (this.disabled) return;

    const enabledOptions = this.options.filter(opt => !opt.disabled);
    if (enabledOptions.length === 0) return;

    let currentIndex = enabledOptions.findIndex(opt => opt.value === this.value);
    if (currentIndex === -1) currentIndex = 0;

    let newIndex = currentIndex;
    let handled = false;

    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        newIndex = (currentIndex + 1) % enabledOptions.length;
        handled = true;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        newIndex = currentIndex === 0 ? enabledOptions.length - 1 : currentIndex - 1;
        handled = true;
        break;
      case 'Home':
        newIndex = 0;
        handled = true;
        break;
      case 'End':
        newIndex = enabledOptions.length - 1;
        handled = true;
        break;
      case ' ':
      case 'Enter':
        if (this.focusedIndex >= 0 && this.focusedIndex < enabledOptions.length) {
          this.handleChange(enabledOptions[this.focusedIndex].value);
        }
        handled = true;
        break;
    }

    if (handled) {
      e.preventDefault();
      if (e.key !== ' ' && e.key !== 'Enter') {
        this.handleChange(enabledOptions[newIndex].value);
        this.focusedIndex = newIndex;
        // Focus the actual radio input
        const inputs = this.shadowRoot?.querySelectorAll('.radio-input:not([disabled])');
        if (inputs && inputs[newIndex]) {
          (inputs[newIndex] as HTMLInputElement).focus();
        }
      }
    }
  }

  public reset(): void {
    this.value = '';
    this.error = false;
    this.errorMessage = '';
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

  public selectOption(value: string): void {
    const option = this.options.find(opt => opt.value === value);
    if (option && !option.disabled) {
      this.handleChange(value);
    }
  }

  // ADR-014 AI helper method overrides
  override getPossibleActions(): Action[] {
    return [
      {
        name: 'selectOption',
        description: 'Select a specific radio option',
        available: !this.disabled && this.options.some(opt => !opt.disabled)
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
                  this.error ? 'error' :
                  this.value ? 'selected' : 'unselected';
    
    return {
      currentState: state,
      possibleStates: ['unselected', 'selected', 'disabled', 'error'],
      stateDescription: this.disabled ? 'Radio group is disabled' :
                        this.error ? `Radio group has error: ${this.errorMessage}` :
                        selectedOption ? `Selected: ${selectedOption.label}` : 'No option selected'
    };
  }

  override getAIDescription(): string {
    const selectedOption = this.options.find(opt => opt.value === this.value);
    const label = this.label || 'Radio group';
    const selection = selectedOption ? selectedOption.label : 'none';
    return `${label} - ${this.options.length} options, selected: ${selection}${this.disabled ? ' (disabled)' : ''}${this.error ? ` (error: ${this.errorMessage})` : ''}`;
  }

  protected override applyPerformanceDegradation(): void {
    // Disable hover effects when performance is poor
    const radioItems = this.shadowRoot?.querySelectorAll('.radio-item') as NodeListOf<HTMLElement>;
    radioItems.forEach(item => {
      item.style.transition = 'none';
    });
  }

  override render() {
    const startTime = performance.now();
    
    const content = html`
      ${this.label ? html`
        <label class="radio-group-label" part="label">
          ${this.label}
          ${this.required ? html`<span class="required-indicator">*</span>` : ''}
        </label>
      ` : ''}
      ${this.description ? html`
        <span class="radio-group-description" part="description">
          ${this.description}
        </span>
      ` : ''}
      <div 
        class="radio-group" 
        part="group"
        @keydown="${this.handleKeyDown}"
      >
        ${this.options.map((option, index) => html`
          <label 
            class="radio-item" 
            part="radio-item"
            ?disabled="${option.disabled || this.disabled}"
          >
            <input
              type="radio"
              class="radio-input"
              name="${ifDefined(this.name || `radio-group-${this.groupId}`)}"
              value="${option.value}"
              .checked="${this.value === option.value}"
              ?disabled="${option.disabled || this.disabled}"
              @change="${() => this.handleChange(option.value)}"
              @focus="${() => this.focusedIndex = index}"
              aria-describedby="${option.description ? `option-desc-${index}` : ''}"
            />
            <span class="radio-control" part="control"></span>
            <div class="radio-label-wrapper">
              <span class="radio-label" part="option-label">
                ${option.label}
              </span>
              ${option.description ? html`
                <span 
                  id="option-desc-${index}" 
                  class="radio-option-description" 
                  part="option-description"
                >
                  ${option.description}
                </span>
              ` : ''}
            </div>
          </label>
        `)}
      </div>
      ${this.error && this.errorMessage ? html`
        <span id="error-message" class="error-message" part="error" role="alert">
          ${this.errorMessage}
        </span>
      ` : ''}
    `;

    this.checkPerformance(startTime);

    return html`
      ${this.showMetrics ? this.renderMetrics() : ''}
      ${content}
    `;
  }

  private renderMetrics() {
    const status = this.renderTime > this.maxRenderMs ? 'error' : 
                   this.renderTime > this.maxRenderMs * 0.75 ? 'warning' : '';
    
    return html`
      <div class="performance-overlay ${status}">
        Radio Group: ${this.value || 'none'}<br>
        Options: ${this.options.length}<br>
        Render: ${this.renderTime.toFixed(2)}ms<br>
        Count: ${this.renderCount}
      </div>
    `;
  }

  private groupId = Math.random().toString(36).substr(2, 9);
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-radio-group': ForgeRadioGroup;
  }
}