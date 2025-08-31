import { html, css, PropertyValues } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';
import { BaseElement } from '../../../core/BaseElement';

export type InputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';
export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'default' | 'filled' | 'outlined';
export type ValidationState = 'default' | 'error' | 'warning' | 'success';

@customElement('forge-input')
export class ForgeInput extends BaseElement {
  static styles = css`
    :host {
      display: block;
      --input-height-sm: 32px;
      --input-height-md: 40px;
      --input-height-lg: 48px;
      --input-padding-sm: 8px;
      --input-padding-md: 12px;
      --input-padding-lg: 16px;
      --input-font-size-sm: var(--forge-font-size-sm);
      --input-font-size-md: var(--forge-font-size-base);
      --input-font-size-lg: var(--forge-font-size-lg);
    }

    .input-wrapper {
      position: relative;
      width: 100%;
    }

    .input-container {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
      border-radius: var(--forge-border-radius-md);
      transition: all var(--forge-transition-fast);
    }

    .input {
      flex: 1;
      border: none;
      background: transparent;
      font-family: var(--forge-font-family);
      font-size: var(--input-font-size-md);
      height: var(--input-height-md);
      padding: 0 var(--input-padding-md);
      outline: none;
      width: 100%;
      color: var(--forge-color-text, #000);
    }

    /* Variants */
    .input-container--default {
      border: 1px solid var(--forge-color-border, #d1d5db);
      background: var(--forge-color-surface, #fff);
    }

    .input-container--default:hover:not(.input-container--disabled) {
      border-color: var(--forge-color-primary-400);
    }

    .input-container--default:focus-within:not(.input-container--disabled) {
      border-color: var(--forge-color-primary-500);
      box-shadow: 0 0 0 3px var(--forge-color-primary-100);
    }

    .input-container--filled {
      background: var(--forge-color-gray-100, #f3f4f6);
      border: 1px solid transparent;
    }

    .input-container--filled:hover:not(.input-container--disabled) {
      background: var(--forge-color-gray-200, #e5e7eb);
    }

    .input-container--filled:focus-within:not(.input-container--disabled) {
      background: var(--forge-color-surface, #fff);
      border-color: var(--forge-color-primary-500);
      box-shadow: 0 0 0 3px var(--forge-color-primary-100);
    }

    .input-container--outlined {
      border: 2px solid var(--forge-color-border, #d1d5db);
      background: transparent;
    }

    .input-container--outlined:focus-within:not(.input-container--disabled) {
      border-color: var(--forge-color-primary-500);
    }

    /* Sizes */
    .input-container--sm .input {
      height: var(--input-height-sm);
      padding: 0 var(--input-padding-sm);
      font-size: var(--input-font-size-sm);
    }

    .input-container--lg .input {
      height: var(--input-height-lg);
      padding: 0 var(--input-padding-lg);
      font-size: var(--input-font-size-lg);
    }

    /* Validation States */
    .input-container--error {
      border-color: var(--forge-color-error);
    }

    .input-container--error:focus-within {
      box-shadow: 0 0 0 3px var(--forge-color-error-100);
    }

    .input-container--warning {
      border-color: var(--forge-color-warning);
    }

    .input-container--warning:focus-within {
      box-shadow: 0 0 0 3px var(--forge-color-warning-100);
    }

    .input-container--success {
      border-color: var(--forge-color-success);
    }

    .input-container--success:focus-within {
      box-shadow: 0 0 0 3px var(--forge-color-success-100);
    }

    /* Disabled State */
    .input-container--disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .input-container--disabled .input {
      cursor: not-allowed;
    }

    /* Slots */
    .prefix, .suffix {
      display: flex;
      align-items: center;
      padding: 0 var(--input-padding-md);
      color: var(--forge-color-text-secondary, #6b7280);
    }

    .prefix {
      border-right: 1px solid var(--forge-color-border, #d1d5db);
      margin-right: var(--forge-spacing-sm);
    }

    .suffix {
      border-left: 1px solid var(--forge-color-border, #d1d5db);
      margin-left: var(--forge-spacing-sm);
    }

    /* Helper Text */
    .helper-text {
      margin-top: var(--forge-spacing-xs);
      font-size: var(--forge-font-size-sm);
      color: var(--forge-color-text-secondary, #6b7280);
    }

    .helper-text--error {
      color: var(--forge-color-error);
    }

    .helper-text--warning {
      color: var(--forge-color-warning);
    }

    .helper-text--success {
      color: var(--forge-color-success);
    }

    /* Label */
    .label {
      display: block;
      margin-bottom: var(--forge-spacing-xs);
      font-size: var(--forge-font-size-sm);
      font-weight: 500;
      color: var(--forge-color-text, #000);
    }

    .label--required::after {
      content: ' *';
      color: var(--forge-color-error);
    }

    /* Clear button */
    .clear-button {
      background: none;
      border: none;
      padding: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--forge-color-text-secondary);
      transition: color var(--forge-transition-fast);
    }

    .clear-button:hover {
      color: var(--forge-color-text);
    }

    /* Dev mode metrics */
    .metrics-overlay {
      position: absolute;
      top: -20px;
      right: 0;
      font-size: 10px;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 2px 4px;
      border-radius: 2px;
      z-index: 1000;
      pointer-events: none;
    }

    .metrics-overlay .violation {
      color: #ff6b6b;
    }
  `;

  // Input properties
  @property({ type: String }) type: InputType = 'text';
  @property({ type: String }) value = '';
  @property({ type: String }) placeholder = '';
  @property({ type: String }) name = '';
  @property({ type: String }) label = '';
  @property({ type: String, attribute: 'helper-text' }) helperText = '';
  @property({ type: String }) variant: InputVariant = 'default';
  @property({ type: String }) size: InputSize = 'md';
  @property({ type: String, attribute: 'validation-state' }) validationState: ValidationState = 'default';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) readonly = false;
  @property({ type: Boolean }) required = false;
  @property({ type: Boolean }) clearable = false;
  @property({ type: String }) pattern?: string;
  @property({ type: Number }) minLength?: number;
  @property({ type: Number }) maxLength?: number;
  @property({ type: Number }) min?: number;
  @property({ type: Number }) max?: number;
  @property({ type: Number }) step?: number;
  @property({ type: String }) autocomplete?: string;
  @property({ type: String }) inputmode?: string;

  // Note: AI-Ready, Performance, and Developer properties are inherited from BaseElement

  // State
  @state() private hasFocus = false;
  @state() private renderMetrics = { time: 0, violations: 0 };

  // Query
  @query('.input') private inputElement!: HTMLInputElement;

  render() {
    const renderStart = performance.now();

    const containerClasses = {
      'input-container': true,
      [`input-container--${this.variant}`]: true,
      [`input-container--${this.size}`]: true,
      [`input-container--${this.validationState}`]: true,
      'input-container--disabled': this.disabled,
      'input-container--focused': this.hasFocus
    };

    const helperTextClasses = {
      'helper-text': true,
      [`helper-text--${this.validationState}`]: this.validationState !== 'default'
    };

    const labelClasses = {
      'label': true,
      'label--required': this.required
    };

    const inputContent = html`
      <div class="input-wrapper">
        ${this.label ? html`
          <label class=${classMap(labelClasses)} for="input">
            ${this.label}
          </label>
        ` : ''}
        
        <div class=${classMap(containerClasses)}>
          <slot name="prefix" class="prefix"></slot>
          
          <input
            class="input"
            id="input"
            type=${this.type}
            .value=${live(this.value)}
            placeholder=${this.placeholder}
            ?disabled=${this.disabled}
            ?readonly=${this.readonly}
            ?required=${this.required}
            pattern=${ifDefined(this.pattern)}
            minlength=${ifDefined(this.minLength)}
            maxlength=${ifDefined(this.maxLength)}
            min=${ifDefined(this.min)}
            max=${ifDefined(this.max)}
            step=${ifDefined(this.step)}
            autocomplete=${ifDefined(this.autocomplete)}
            inputmode=${ifDefined(this.inputmode)}
            name=${this.name}
            aria-label=${this.label || this.placeholder}
            aria-invalid=${this.validationState === 'error' ? 'true' : 'false'}
            aria-describedby=${this.helperText ? 'helper-text' : undefined}
            aria-description=${this.ariaDescription || this.getDefaultAriaDescription()}
            data-semantic-role=${this.semanticRole || this.getDefaultSemanticRole()}
            data-ai-context=${this.aiContext || this.getDefaultAiContext()}
            @input=${this.handleInput}
            @change=${this.handleChange}
            @focus=${this.handleFocus}
            @blur=${this.handleBlur}
            @keydown=${this.handleKeydown}
          />
          
          ${this.clearable && this.value ? html`
            <button
              class="clear-button"
              @click=${this.handleClear}
              aria-label="Clear input"
              tabindex="-1"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </button>
          ` : ''}
          
          <slot name="suffix" class="suffix"></slot>
        </div>
        
        ${this.helperText ? html`
          <div class=${classMap(helperTextClasses)} id="helper-text">
            ${this.helperText}
          </div>
        ` : ''}
      </div>
    `;

    const renderEnd = performance.now();
    this.checkPerformance(renderEnd - renderStart);

    // Developer mode metrics display
    if (this.devMode && this.showMetrics) {
      return html`
        <div style="position: relative;">
          ${inputContent}
          <div class="metrics-overlay">
            ${this.renderMetrics.time.toFixed(2)}ms
            ${this.renderMetrics.violations > 0 ? html`
              <span class="violation"> ⚠️ ${this.renderMetrics.violations}</span>
            ` : ''}
          </div>
        </div>
      `;
    }

    return inputContent;
  }

  private handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    this.emit('input', { value: this.value });
    
    // Validate on input if needed
    if (this.pattern || this.required || this.minLength || this.maxLength) {
      this.validateInput();
    }
  }

  private handleChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    this.emit('change', { value: this.value });
  }

  private handleFocus() {
    this.hasFocus = true;
    this.emit('focus');
  }

  private handleBlur() {
    this.hasFocus = false;
    this.emit('blur');
    this.validateInput();
  }

  private handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this.emit('enter', { value: this.value });
    }
    
    if (e.key === 'Escape' && this.clearable) {
      this.handleClear();
    }
  }

  private handleClear() {
    this.value = '';
    this.inputElement.value = '';
    this.emit('clear');
    this.emit('input', { value: '' });
    this.inputElement.focus();
  }

  private validateInput() {
    if (!this.inputElement) return;

    const validity = this.inputElement.validity;
    
    if (!validity.valid) {
      if (this.validationState !== 'error') {
        this.validationState = 'error';
        this.emit('validation-change', { state: 'error', validity });
      }
    } else if (this.validationState === 'error') {
      this.validationState = 'default';
      this.emit('validation-change', { state: 'default', validity });
    }
  }

  // UVP Methods
  private getDefaultSemanticRole(): string {
    switch(this.type) {
      case 'email': return 'email-input';
      case 'password': return 'password-input';
      case 'search': return 'search-input';
      case 'number': return 'numeric-input';
      case 'tel': return 'phone-input';
      case 'url': return 'url-input';
      default: return 'text-input';
    }
  }

  private getDefaultAiContext(): string {
    if (this.required) return 'required-field';
    if (this.type === 'password') return 'sensitive-data';
    if (this.type === 'email') return 'contact-information';
    if (this.type === 'search') return 'search-query';
    return 'user-input';
  }

  private getDefaultAriaDescription(): string {
    const parts = [];
    if (this.label) parts.push(this.label);
    if (this.type !== 'text') parts.push(`${this.type} input`);
    if (this.required) parts.push('required');
    if (this.disabled) parts.push('disabled');
    if (this.readonly) parts.push('readonly');
    if (this.validationState !== 'default') parts.push(this.validationState);
    return parts.join(', ') || 'Text input field';
  }

  protected checkPerformance(renderTime: number): void {
    this.renderMetrics.time = renderTime;
    
    if (renderTime > this.maxRenderMs) {
      this.renderMetrics.violations++;
      
      if (this.warnOnViolation) {
        console.warn(`ForgeInput render exceeded budget: ${renderTime.toFixed(2)}ms > ${this.maxRenderMs}ms`, {
          type: this.type,
          variant: this.variant,
          performanceMode: this.performanceMode
        });
      }
      
      // Auto-degrade performance if in auto mode
      if (this.performanceMode === 'auto' && this.renderMetrics.violations > 3) {
        this.performanceMode = 'fast';
        console.info('ForgeInput: Switching to fast performance mode due to violations');
      }
    }
  }

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    
    // Log component state for AI debugging if in dev mode
    if (this.devMode) {
      console.debug('ForgeInput state:', {
        type: this.type,
        value: this.value,
        variant: this.variant,
        validationState: this.validationState,
        disabled: this.disabled,
        semanticRole: this.semanticRole,
        aiContext: this.aiContext,
        renderTime: this.renderMetrics.time
      });
    }
  }

  // Public methods
  focus() {
    this.inputElement?.focus();
  }

  blur() {
    this.inputElement?.blur();
  }

  select() {
    this.inputElement?.select();
  }

  setSelectionRange(start: number, end: number, direction?: 'forward' | 'backward' | 'none') {
    this.inputElement?.setSelectionRange(start, end, direction);
  }

  checkValidity(): boolean {
    return this.inputElement?.checkValidity() ?? true;
  }

  reportValidity(): boolean {
    return this.inputElement?.reportValidity() ?? true;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-input': ForgeInput;
  }
}