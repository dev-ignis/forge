import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { BaseElement } from '../../../core/BaseElement';
import '../icon/icon';

export type CheckboxSize = 'sm' | 'md' | 'lg';
export type CheckboxVariant = 'default' | 'filled' | 'outlined';
export type CheckboxLabelPosition = 'start' | 'end';

@customElement('forge-checkbox')
export class ForgeCheckbox extends BaseElement {
  static override styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      position: relative;
      cursor: pointer;
      user-select: none;
      font-family: var(--forge-font-family, system-ui, -apple-system, sans-serif);
      font-size: var(--forge-font-size-md, 14px);
      line-height: 1.5;
      gap: 8px;
    }

    :host([disabled]) {
      cursor: not-allowed;
      opacity: 0.5;
    }

    :host([hidden]) {
      display: none !important;
    }

    .checkbox-wrapper {
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .checkbox-input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }

    .checkbox-control {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--size);
      height: var(--size);
      border-radius: var(--forge-border-radius-sm, 4px);
      border: 2px solid var(--forge-color-border, #d1d5db);
      background-color: var(--forge-color-background, #ffffff);
      transition: all 0.2s ease;
      flex-shrink: 0;
    }

    /* Size variants */
    :host([size="sm"]) .checkbox-control {
      --size: 16px;
    }

    :host([size="md"]) .checkbox-control {
      --size: 20px;
    }

    :host([size="lg"]) .checkbox-control {
      --size: 24px;
    }

    /* Hover state */
    :host(:not([disabled]):hover) .checkbox-control {
      border-color: var(--forge-color-primary, #3b82f6);
      box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
    }

    /* Focus state */
    .checkbox-input:focus-visible ~ .checkbox-control {
      outline: 2px solid var(--forge-color-primary, #3b82f6);
      outline-offset: 2px;
    }

    /* Checked state */
    :host([checked]) .checkbox-control {
      background-color: var(--forge-color-primary, #3b82f6);
      border-color: var(--forge-color-primary, #3b82f6);
    }

    :host([checked]) .checkbox-icon {
      color: white;
      opacity: 1;
      transform: scale(1);
    }

    /* Indeterminate state */
    :host([indeterminate]) .checkbox-control {
      background-color: var(--forge-color-primary, #3b82f6);
      border-color: var(--forge-color-primary, #3b82f6);
    }

    :host([indeterminate]) .checkbox-icon {
      color: white;
      opacity: 1;
    }

    /* Variant: Filled */
    :host([variant="filled"]) .checkbox-control {
      background-color: var(--forge-color-surface-variant, #f3f4f6);
      border-color: transparent;
    }

    :host([variant="filled"][checked]) .checkbox-control,
    :host([variant="filled"][indeterminate]) .checkbox-control {
      background-color: var(--forge-color-primary, #3b82f6);
    }

    /* Variant: Outlined */
    :host([variant="outlined"]) .checkbox-control {
      border-width: 2px;
      background-color: transparent;
    }

    :host([variant="outlined"][checked]) .checkbox-control,
    :host([variant="outlined"][indeterminate]) .checkbox-control {
      background-color: var(--forge-color-primary, #3b82f6);
      border-color: var(--forge-color-primary, #3b82f6);
    }

    /* Error state */
    :host([error]) .checkbox-control {
      border-color: var(--forge-color-error, #ef4444);
    }

    :host([error]:hover) .checkbox-control {
      box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
    }

    .checkbox-icon {
      position: absolute;
      opacity: 0;
      transform: scale(0.8);
      transition: all 0.2s ease;
      pointer-events: none;
    }

    .checkbox-label {
      color: var(--forge-color-text, #1f2937);
      cursor: pointer;
    }

    :host([disabled]) .checkbox-label {
      cursor: not-allowed;
      color: var(--forge-color-text-disabled, #9ca3af);
    }

    :host([label-position="start"]) .checkbox-wrapper {
      flex-direction: row-reverse;
    }

    .checkbox-description {
      display: block;
      font-size: var(--forge-font-size-sm, 12px);
      color: var(--forge-color-text-secondary, #6b7280);
      margin-top: 2px;
    }

    /* Required indicator */
    .required-indicator {
      color: var(--forge-color-error, #ef4444);
      margin-left: 4px;
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

  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: Boolean, reflect: true }) indeterminate = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean }) required = false;
  @property({ type: Boolean, reflect: true }) error = false;
  @property({ type: String }) name?: string;
  @property({ type: String }) value = 'on';
  @property({ type: String }) label = '';
  @property({ type: String }) description = '';
  @property({ type: String, reflect: true }) size: CheckboxSize = 'md';
  @property({ type: String, reflect: true }) variant: CheckboxVariant = 'default';
  @property({ type: String, attribute: 'label-position', reflect: true }) labelPosition: CheckboxLabelPosition = 'end';
  
  // AI-Ready attributes (UVP)
  @property({ type: String, attribute: 'semantic-role' }) semanticRole?: string;
  @property({ type: String, attribute: 'ai-context' }) aiContext?: string;
  @property({ type: String, attribute: 'aria-description' }) ariaDescription: string | null = null;
  
  // Performance monitoring (UVP)
  @property({ type: Number, attribute: 'max-render-ms' }) maxRenderMs = 16;
  @property({ type: Boolean, attribute: 'warn-on-violation' }) warnOnViolation = false;
  @property({ type: String, attribute: 'performance-mode' }) performanceMode: 'auto' | 'fast' | 'balanced' | 'quality' = 'auto';
  
  // Developer experience (UVP)
  @property({ type: Boolean, attribute: 'dev-mode' }) devMode = false;
  @property({ type: Boolean, attribute: 'show-metrics' }) showMetrics = false;

  @query('.checkbox-input') private input!: HTMLInputElement;
  
  @state() protected renderTime = 0;
  @state() protected renderCount = 0;

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'checkbox');
    this.setAttribute('aria-checked', this.getAriaChecked());
    if (this.disabled) {
      this.setAttribute('aria-disabled', 'true');
    }
    this.updateAria();
  }

  override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    
    if (changedProperties.has('checked') || changedProperties.has('indeterminate')) {
      this.setAttribute('aria-checked', this.getAriaChecked());
      if (this.indeterminate) {
        this.checked = false;
      }
    }

    if (changedProperties.has('disabled')) {
      if (this.disabled) {
        this.setAttribute('aria-disabled', 'true');
      } else {
        this.removeAttribute('aria-disabled');
      }
    }

    if (changedProperties.has('semanticRole') || 
        changedProperties.has('aiContext') ||
        changedProperties.has('label')) {
      this.updateAria();
    }
  }

  private getAriaChecked(): string {
    if (this.indeterminate) return 'mixed';
    return this.checked ? 'true' : 'false';
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

  private handleChange(e: Event): void {
    const startTime = performance.now();
    const input = e.target as HTMLInputElement;
    
    if (this.disabled) {
      e.preventDefault();
      return;
    }

    const previousChecked = this.checked;
    const previousIndeterminate = this.indeterminate;
    
    this.checked = input.checked;
    this.indeterminate = false;

    const detail = {
      checked: this.checked,
      value: this.value,
      previousChecked,
      previousIndeterminate
    };

    this.emit('change', detail);
    this.emit('forge-change', detail);
    
    this.trackRenderPerformance(startTime);
  }

  private handleClick(e: Event): void {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    // Let the input handle the actual change
    if (e.target === this.input) {
      return;
    }

    // Clicking on the label or wrapper should toggle the checkbox
    this.input?.click();
  }

  private handleKeyDown(e: KeyboardEvent): void {
    if (this.disabled) return;

    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      this.toggle();
    }
  }

  public toggle(): void {
    if (this.disabled) return;
    
    this.checked = !this.checked;
    this.indeterminate = false;
    
    const detail = {
      checked: this.checked,
      value: this.value
    };
    
    this.emit('change', detail);
    this.emit('forge-change', detail);
  }

  public reset(): void {
    this.checked = false;
    this.indeterminate = false;
    this.error = false;
  }

  private trackRenderPerformance(startTime: number): void {
    const endTime = performance.now();
    this.renderTime = endTime - startTime;
    this.renderCount++;

    if (this.renderTime > this.maxRenderMs) {
      const message = `Checkbox render exceeded budget: ${this.renderTime.toFixed(2)}ms > ${this.maxRenderMs}ms`;
      
      if (this.warnOnViolation) {
        console.warn(message, {
          component: 'forge-checkbox',
          checked: this.checked,
          renderTime: this.renderTime,
          maxRenderMs: this.maxRenderMs,
          renderCount: this.renderCount
        });
      }

      if (this.performanceMode === 'auto') {
        // No animations to degrade for checkbox
      }
    }

    if (this.devMode) {
      console.log('Checkbox render metrics:', {
        component: 'forge-checkbox',
        checked: this.checked,
        renderTime: this.renderTime,
        renderCount: this.renderCount
      });
    }
  }

  override render() {
    const startTime = performance.now();
    
    const iconName = this.indeterminate ? 'minus' : 'check';
    
    const content = html`
      <div class="checkbox-wrapper" @click="${this.handleClick}">
        <input
          type="checkbox"
          class="checkbox-input"
          .checked="${this.checked}"
          .indeterminate="${this.indeterminate}"
          .disabled="${this.disabled}"
          .required="${this.required}"
          .value="${this.value}"
          name="${ifDefined(this.name)}"
          @change="${this.handleChange}"
          @keydown="${this.handleKeyDown}"
          aria-describedby="${this.description ? 'description' : ''}"
        />
        <span class="checkbox-control" part="control">
          <forge-icon 
            class="checkbox-icon"
            name="${iconName}"
            size="sm"
            aria-hidden="true">
          </forge-icon>
        </span>
        ${this.label || this.description ? html`
          <div class="checkbox-label-wrapper">
            ${this.label ? html`
              <label class="checkbox-label" part="label">
                ${this.label}
                ${this.required ? html`<span class="required-indicator">*</span>` : ''}
              </label>
            ` : ''}
            ${this.description ? html`
              <span id="description" class="checkbox-description" part="description">
                ${this.description}
              </span>
            ` : ''}
          </div>
        ` : ''}
      </div>
    `;

    this.trackRenderPerformance(startTime);

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
        Checkbox: ${this.checked ? 'checked' : 'unchecked'}<br>
        Render: ${this.renderTime.toFixed(2)}ms<br>
        Count: ${this.renderCount}
      </div>
    `;
  }

  override getPossibleActions() {
    return [
      {
        name: 'toggle',
        description: 'Toggle checked state',
        available: !this.disabled && !this.indeterminate
      },
      {
        name: 'check',
        description: 'Set to checked',
        available: !this.disabled && !this.checked
      },
      {
        name: 'uncheck',
        description: 'Set to unchecked',
        available: !this.disabled && this.checked
      },
      {
        name: 'setIndeterminate',
        description: 'Set to indeterminate state',
        available: !this.disabled && !this.indeterminate
      },
      {
        name: 'reset',
        description: 'Reset to default state',
        available: this.checked || this.indeterminate || this.error
      },
      {
        name: 'focus',
        description: 'Focus the checkbox',
        available: !this.disabled
      },
      {
        name: 'validate',
        description: 'Validate required state',
        available: this.required
      }
    ];
  }

  override explainState() {
    const states = ['unchecked', 'checked', 'indeterminate'];
    if (this.error) states.push('error');
    if (this.disabled) states.push('disabled');
    
    let currentState = 'unchecked';
    if (this.indeterminate) currentState = 'indeterminate';
    else if (this.checked) currentState = 'checked';
    if (this.disabled) currentState = 'disabled';
    else if (this.error) currentState = 'error';

    let description = `Checkbox with ${this.variant} variant`;
    if (this.checked) description += ', currently checked';
    else if (this.indeterminate) description += ', in indeterminate state';
    else description += ', currently unchecked';
    
    if (this.disabled) description += ', disabled';
    if (this.required) description += ', required field';
    if (this.error) description += ', has validation error';
    if (this.label) description += `, labeled: ${this.label}`;

    return {
      currentState,
      possibleStates: states,
      stateDescription: description
    };
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-checkbox': ForgeCheckbox;
  }
}