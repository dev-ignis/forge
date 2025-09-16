import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { BaseElement } from '../../../core/BaseElement';
import '../icon/icon';

export type AlertSeverity = 'info' | 'success' | 'warning' | 'error';
export type AlertVariant = 'filled' | 'outlined' | 'standard';

/**
 * @slot - Default slot for alert content
 * @slot actions - Action buttons or controls
 */
@customElement('forge-alert')
export class ForgeAlert extends BaseElement {
  static override styles = css`
    :host {
      display: block;
      position: relative;
      border-radius: var(--forge-border-radius-md, 8px);
      padding: 12px 16px;
      font-family: var(--forge-font-family, system-ui, -apple-system, sans-serif);
      font-size: var(--forge-font-size-md, 14px);
      line-height: 1.5;
      transition: all 0.3s ease;
    }

    :host([hidden]) {
      display: none !important;
    }

    .alert-container {
      display: flex;
      align-items: flex-start;
      gap: 12px;
    }

    .alert-icon {
      flex-shrink: 0;
      margin-top: 2px;
    }

    .alert-content {
      flex: 1;
      min-width: 0;
    }

    .alert-title {
      font-weight: 600;
      margin-bottom: 4px;
    }

    .alert-message {
      color: inherit;
      opacity: 0.9;
    }

    .alert-actions {
      margin-left: auto;
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }

    .close-button {
      background: none;
      border: none;
      padding: 4px;
      cursor: pointer;
      border-radius: 4px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s;
      color: inherit;
      opacity: 0.7;
    }

    .close-button:hover {
      opacity: 1;
      background-color: rgba(0, 0, 0, 0.08);
    }

    .close-button:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 2px;
    }

    /* Severity styles - Standard variant */
    :host([severity="info"][variant="standard"]) {
      background-color: #e3f2fd;
      color: #0d47a1;
      border: 1px solid #90caf9;
    }

    :host([severity="success"][variant="standard"]) {
      background-color: #e8f5e9;
      color: #1b5e20;
      border: 1px solid #81c784;
    }

    :host([severity="warning"][variant="standard"]) {
      background-color: #fff3e0;
      color: #e65100;
      border: 1px solid #ffb74d;
    }

    :host([severity="error"][variant="standard"]) {
      background-color: #ffebee;
      color: #b71c1c;
      border: 1px solid #ef5350;
    }

    /* Severity styles - Filled variant */
    :host([severity="info"][variant="filled"]) {
      background-color: #2196f3;
      color: white;
    }

    :host([severity="success"][variant="filled"]) {
      background-color: #4caf50;
      color: white;
    }

    :host([severity="warning"][variant="filled"]) {
      background-color: #ff9800;
      color: white;
    }

    :host([severity="error"][variant="filled"]) {
      background-color: #f44336;
      color: white;
    }

    :host([variant="filled"]) .close-button:hover {
      background-color: rgba(255, 255, 255, 0.15);
    }

    /* Severity styles - Outlined variant */
    :host([severity="info"][variant="outlined"]) {
      background-color: transparent;
      color: #2196f3;
      border: 2px solid #2196f3;
    }

    :host([severity="success"][variant="outlined"]) {
      background-color: transparent;
      color: #4caf50;
      border: 2px solid #4caf50;
    }

    :host([severity="warning"][variant="outlined"]) {
      background-color: transparent;
      color: #ff9800;
      border: 2px solid #ff9800;
    }

    :host([severity="error"][variant="outlined"]) {
      background-color: transparent;
      color: #f44336;
      border: 2px solid #f44336;
    }

    /* Transitions */
    @keyframes slideIn {
      from {
        transform: translateX(-100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes fadeOut {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }

    :host([animate]) {
      animation: slideIn 0.3s ease-out;
    }

    :host([closing]) {
      animation: fadeOut 0.3s ease-out;
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

  @property({ type: String }) severity: AlertSeverity = 'info';
  @property({ type: String }) variant: AlertVariant = 'standard';
  @property({ type: String }) title = '';
  @property({ type: String }) message = '';
  @property({ type: Boolean }) closable = false;
  @property({ type: Boolean, attribute: 'animate-in' }) animateIn = false;
  @property({ type: Number, attribute: 'auto-dismiss' }) autoDismiss = 0;
  @property({ type: String }) icon?: string;
  
  @property({ type: String, attribute: 'semantic-role' }) semanticRole?: string;
  @property({ type: String, attribute: 'ai-context' }) aiContext?: string;
  @property({ type: String, attribute: 'aria-description' }) ariaDescription: string | null = null;
  
  @property({ type: Number, attribute: 'max-render-ms' }) maxRenderMs = 16;
  @property({ type: Boolean, attribute: 'warn-on-violation' }) warnOnViolation = false;
  @property({ type: String, attribute: 'performance-mode' }) performanceMode: 'auto' | 'fast' | 'balanced' | 'quality' = 'auto';
  
  @property({ type: Boolean, attribute: 'dev-mode' }) devMode = false;
  @property({ type: Boolean, attribute: 'show-metrics' }) showMetrics = false;

  @state() private closing = false;
  @state() protected renderTime = 0;
  @state() protected renderCount = 0;

  private dismissTimer?: number;

  private readonly iconMap: Record<AlertSeverity, string> = {
    info: 'info',
    success: 'check',
    warning: 'alert-circle',
    error: 'close'
  };

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'alert');
    this.setAttribute('aria-live', this.severity === 'error' ? 'assertive' : 'polite');
    
    if (this.animateIn) {
      this.setAttribute('animate', '');
    }

    if (this.autoDismiss > 0) {
      this.startAutoDismiss();
    }

    this.updateAria();
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.dismissTimer) {
      clearTimeout(this.dismissTimer);
    }
  }

  override updated(changedProperties: Map<string, unknown>): void {
    super.updated(changedProperties);
    
    if (changedProperties.has('severity')) {
      this.setAttribute('aria-live', this.severity === 'error' ? 'assertive' : 'polite');
    }

    if (changedProperties.has('autoDismiss') && this.autoDismiss > 0) {
      this.startAutoDismiss();
    }

    if (changedProperties.has('semanticRole') || 
        changedProperties.has('aiContext') ||
        changedProperties.has('title') ||
        changedProperties.has('message')) {
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

    const label = [this.title, this.message].filter(Boolean).join('. ');
    if (label) {
      this.setAttribute('aria-label', label);
    }
  }

  private startAutoDismiss(): void {
    if (this.dismissTimer) {
      clearTimeout(this.dismissTimer);
    }

    this.dismissTimer = window.setTimeout(() => {
      this.close();
    }, this.autoDismiss);
  }

  private async close(): Promise<void> {
    const startTime = performance.now();
    
    this.closing = true;
    this.setAttribute('closing', '');
    
    const event = new CustomEvent('close', {
      detail: { severity: this.severity },
      bubbles: true,
      composed: true,
      cancelable: true
    });

    if (!this.dispatchEvent(event)) {
      this.closing = false;
      this.removeAttribute('closing');
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 300));
    
    this.remove();
    this.trackRenderPerformance(startTime);
  }

  private handleClose(): void {
    this.close();
  }

  private getIcon(): string {
    return this.icon || this.iconMap[this.severity];
  }

  private trackRenderPerformance(startTime: number): void {
    const endTime = performance.now();
    this.renderTime = endTime - startTime;
    this.renderCount++;

    if (this.renderTime > this.maxRenderMs) {
      const message = `Alert render exceeded budget: ${this.renderTime.toFixed(2)}ms > ${this.maxRenderMs}ms`;
      
      if (this.warnOnViolation) {
        console.warn(message, {
          component: 'forge-alert',
          severity: this.severity,
          renderTime: this.renderTime,
          maxRenderMs: this.maxRenderMs,
          renderCount: this.renderCount
        });
      }

      if (this.performanceMode === 'auto') {
        this.applyPerformanceDegradation();
      }
    }

    if (this.devMode) {
      console.log('Alert render metrics:', {
        component: 'forge-alert',
        severity: this.severity,
        renderTime: this.renderTime,
        renderCount: this.renderCount
      });
    }
  }

  protected applyPerformanceDegradation(): void {
    this.animateIn = false;
  }

  override render() {
    const startTime = performance.now();
    
    const content = html`
      <div class="alert-container">
        <forge-icon 
          class="alert-icon"
          name="${this.getIcon()}"
          size="sm"
          aria-hidden="true">
        </forge-icon>
        
        <div class="alert-content">
          ${this.title ? html`<div class="alert-title">${this.title}</div>` : ''}
          ${this.message ? html`<div class="alert-message">${this.message}</div>` : ''}
          <slot></slot>
        </div>
        
        <div class="alert-actions">
          <slot name="actions"></slot>
          ${this.closable ? html`
            <button
              class="close-button"
              @click="${this.handleClose}"
              aria-label="Close alert"
              type="button">
              <forge-icon name="close" size="sm"></forge-icon>
            </button>
          ` : ''}
        </div>
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
        Alert: ${this.severity}<br>
        Render: ${this.renderTime.toFixed(2)}ms<br>
        Count: ${this.renderCount}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-alert': ForgeAlert;
  }
}