import { html, css, PropertyValues } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { BaseElement, type Action, type StateExplanation } from '../../../core/BaseElement';

export type SwitchSize = 'sm' | 'md' | 'lg';
export type SwitchLabelPosition = 'start' | 'end' | 'top' | 'bottom';

@customElement('forge-switch')
export class ForgeSwitch extends BaseElement {
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
        gap: 12px;
      }

      :host([disabled]) {
        cursor: not-allowed;
        opacity: 0.5;
      }

      :host([hidden]) {
        display: none !important;
      }

      :host([label-position="top"]),
      :host([label-position="bottom"]) {
        flex-direction: column;
        align-items: flex-start;
      }

      .switch-wrapper {
        display: inline-flex;
        align-items: center;
        gap: 12px;
      }

      .switch-input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
      }

      .switch-track {
        position: relative;
        display: inline-block;
        border-radius: 9999px;
        background-color: var(--forge-color-neutral-400, #9ca3af);
        transition: all 0.3s ease;
        cursor: pointer;
      }

      /* Size variants */
      :host([size="sm"]) .switch-track {
        width: 36px;
        height: 20px;
      }

      :host([size="md"]) .switch-track {
        width: 44px;
        height: 24px;
      }

      :host([size="lg"]) .switch-track {
        width: 52px;
        height: 28px;
      }

      .switch-thumb {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background-color: white;
        border-radius: 50%;
        transition: all 0.3s ease;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      }

      /* Thumb size variants */
      :host([size="sm"]) .switch-thumb {
        width: 16px;
        height: 16px;
        left: 2px;
      }

      :host([size="md"]) .switch-thumb {
        width: 20px;
        height: 20px;
        left: 2px;
      }

      :host([size="lg"]) .switch-thumb {
        width: 24px;
        height: 24px;
        left: 2px;
      }

      /* Checked state */
      :host([checked]) .switch-track {
        background-color: var(--forge-color-primary, #3b82f6);
      }

      :host([checked][size="sm"]) .switch-thumb {
        left: calc(100% - 18px);
      }

      :host([checked][size="md"]) .switch-thumb {
        left: calc(100% - 22px);
      }

      :host([checked][size="lg"]) .switch-thumb {
        left: calc(100% - 26px);
      }

      /* Loading state */
      :host([loading]) .switch-thumb {
        opacity: 0.6;
      }

      :host([loading]) .switch-thumb::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 60%;
        height: 60%;
        border: 2px solid var(--forge-color-primary, #3b82f6);
        border-top-color: transparent;
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
      }

      @keyframes spin {
        to {
          transform: translate(-50%, -50%) rotate(360deg);
        }
      }

      /* Hover state */
      :host(:not([disabled]):hover) .switch-track {
        box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
      }

      /* Focus state */
      .switch-input:focus-visible ~ .switch-track {
        outline: 2px solid var(--forge-color-primary, #3b82f6);
        outline-offset: 2px;
      }

      /* Error state */
      :host([error]) .switch-track {
        background-color: var(--forge-color-error, #ef4444);
      }

      :host([error]:not([checked])) .switch-track {
        background-color: var(--forge-color-error-light, #fca5a5);
      }

      /* Label positioning */
      :host([label-position="start"]) .switch-wrapper {
        flex-direction: row-reverse;
      }

      :host([label-position="top"]) .switch-wrapper {
        flex-direction: column;
      }

      :host([label-position="bottom"]) .switch-wrapper {
        flex-direction: column-reverse;
      }

      .switch-label {
        color: var(--forge-color-text, #1f2937);
        cursor: pointer;
      }

      :host([disabled]) .switch-label {
        cursor: not-allowed;
        color: var(--forge-color-text-disabled, #9ca3af);
      }

      .switch-description {
        display: block;
        font-size: var(--forge-font-size-sm, 12px);
        color: var(--forge-color-text-secondary, #6b7280);
        margin-top: 2px;
      }

      .switch-state-label {
        position: absolute;
        font-size: 10px;
        font-weight: 600;
        color: white;
        pointer-events: none;
        top: 50%;
        transform: translateY(-50%);
      }

      :host([size="sm"]) .switch-state-label {
        display: none;
      }

      .switch-state-label.on {
        left: 6px;
        opacity: 0;
      }

      .switch-state-label.off {
        right: 6px;
        opacity: 1;
      }

      :host([checked]) .switch-state-label.on {
        opacity: 1;
      }

      :host([checked]) .switch-state-label.off {
        opacity: 0;
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
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) loading = false;
  @property({ type: Boolean }) required = false;
  @property({ type: Boolean, reflect: true }) error = false;
  @property({ type: String }) name?: string;
  @property({ type: String }) value = 'on';
  @property({ type: String }) label = '';
  @property({ type: String }) description = '';
  @property({ type: String, attribute: 'on-label' }) onLabel = '';
  @property({ type: String, attribute: 'off-label' }) offLabel = '';
  @property({ type: String, reflect: true }) size: SwitchSize = 'md';
  @property({ type: String, attribute: 'label-position', reflect: true }) labelPosition: SwitchLabelPosition = 'end';

  @query('.switch-input') private input!: HTMLInputElement;

  constructor() {
    super();
    // Set AI metadata for ADR-014 compliance
    this.aiMetadata = {
      purpose: 'Toggle binary state',
      dataType: 'boolean',
      criticality: 'medium',
      semanticRole: 'switch'
    };
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'switch');
    this.setAttribute('aria-checked', String(this.checked));
    if (this.disabled) {
      this.setAttribute('aria-disabled', 'true');
    }
    this.updateAria();
  }

  override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    
    if (changedProperties.has('checked')) {
      this.setAttribute('aria-checked', String(this.checked));
    }

    if (changedProperties.has('disabled')) {
      if (this.disabled) {
        this.setAttribute('aria-disabled', 'true');
      } else {
        this.removeAttribute('aria-disabled');
      }
    }

    if (changedProperties.has('loading')) {
      this.setAttribute('aria-busy', String(this.loading));
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

  private handleChange(e: Event): void {
    const startTime = performance.now();
    
    if (this.disabled || this.loading) {
      e.preventDefault();
      return;
    }

    const input = e.target as HTMLInputElement;
    const previousChecked = this.checked;
    
    this.checked = input.checked;

    const detail = {
      checked: this.checked,
      value: this.value,
      previousChecked
    };

    this.emit('change', detail);
    this.emit('forge-change', detail);
    
    this.checkPerformance(startTime);
  }

  private handleClick(e: Event): void {
    if (this.disabled || this.loading) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    // Let the input handle the actual change
    if (e.target === this.input) {
      return;
    }

    // Clicking on the label or wrapper should toggle
    this.input?.click();
  }

  private handleKeyDown(e: KeyboardEvent): void {
    if (this.disabled || this.loading) return;

    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      this.toggle();
    }
  }

  public toggle(): void {
    if (this.disabled || this.loading) return;
    
    this.checked = !this.checked;
    
    const detail = {
      checked: this.checked,
      value: this.value
    };
    
    this.emit('change', detail);
    this.emit('forge-change', detail);
  }

  public reset(): void {
    this.checked = false;
    this.error = false;
    this.loading = false;
  }

  // ADR-014 AI helper method overrides
  override getPossibleActions(): Action[] {
    return [
      {
        name: 'toggle',
        description: 'Toggle the switch on/off',
        available: !this.disabled && !this.loading
      },
      {
        name: 'reset',
        description: 'Reset switch to off state',
        available: true
      }
    ];
  }

  override explainState(): StateExplanation {
    const state = this.loading ? 'loading' : 
                  this.disabled ? 'disabled' : 
                  this.checked ? 'on' : 'off';
    
    return {
      currentState: state,
      possibleStates: ['off', 'on', 'disabled', 'loading'],
      stateDescription: this.loading ? 'Switch is processing change' :
                        this.disabled ? 'Switch is disabled and cannot be changed' :
                        this.checked ? 'Switch is turned on' : 'Switch is turned off'
    };
  }

  override getAIDescription(): string {
    const state = this.checked ? 'on' : 'off';
    const label = this.label || 'Toggle switch';
    return `${label} - currently ${state}${this.disabled ? ' (disabled)' : ''}${this.loading ? ' (loading)' : ''}`;
  }

  protected override applyPerformanceDegradation(): void {
    // Disable animations when performance is poor
    const track = this.shadowRoot?.querySelector('.switch-track') as HTMLElement;
    const thumb = this.shadowRoot?.querySelector('.switch-thumb') as HTMLElement;
    if (track) track.style.transition = 'none';
    if (thumb) thumb.style.transition = 'none';
  }

  override render() {
    const startTime = performance.now();
    
    const content = html`
      <div class="switch-wrapper" @click="${this.handleClick}">
        <input
          type="checkbox"
          class="switch-input"
          .checked="${this.checked}"
          .disabled="${this.disabled || this.loading}"
          .required="${this.required}"
          .value="${this.value}"
          name="${ifDefined(this.name)}"
          @change="${this.handleChange}"
          @keydown="${this.handleKeyDown}"
          aria-describedby="${this.description ? 'description' : ''}"
        />
        <div class="switch-track" part="track">
          ${this.onLabel || this.offLabel ? html`
            <span class="switch-state-label on">${this.onLabel}</span>
            <span class="switch-state-label off">${this.offLabel}</span>
          ` : ''}
          <div class="switch-thumb" part="thumb"></div>
        </div>
        ${this.label || this.description ? html`
          <div class="switch-label-wrapper">
            ${this.label ? html`
              <label class="switch-label" part="label">
                ${this.label}
                ${this.required ? html`<span class="required-indicator">*</span>` : ''}
              </label>
            ` : ''}
            ${this.description ? html`
              <span id="description" class="switch-description" part="description">
                ${this.description}
              </span>
            ` : ''}
          </div>
        ` : ''}
      </div>
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
        Switch: ${this.checked ? 'on' : 'off'}<br>
        Render: ${this.renderTime.toFixed(2)}ms<br>
        Count: ${this.renderCount}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-switch': ForgeSwitch;
  }
}