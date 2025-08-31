import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { BaseElement } from '../../../core/BaseElement';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
export type BadgeSize = 'sm' | 'md' | 'lg';
export type BadgePosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'inline';

@customElement('forge-badge')
export class ForgeBadge extends BaseElement {
  static override styles = css`
    :host {
      display: inline-block;
      position: relative;
      font-family: var(--forge-font-family, system-ui, -apple-system, sans-serif);
    }

    :host([hidden]) {
      display: none !important;
    }

    :host([position="inline"]) {
      display: inline-flex;
    }

    .badge-container {
      position: relative;
      display: inline-block;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      border-radius: var(--forge-border-radius-full, 9999px);
      white-space: nowrap;
      transition: all 0.2s ease;
      line-height: 1;
    }

    /* Position variants */
    :host(:not([position="inline"])) .badge {
      position: absolute;
      z-index: 1;
    }

    :host([position="top-right"]) .badge {
      top: 0;
      right: 0;
      transform: translate(50%, -50%);
    }

    :host([position="top-left"]) .badge {
      top: 0;
      left: 0;
      transform: translate(-50%, -50%);
    }

    :host([position="bottom-right"]) .badge {
      bottom: 0;
      right: 0;
      transform: translate(50%, 50%);
    }

    :host([position="bottom-left"]) .badge {
      bottom: 0;
      left: 0;
      transform: translate(-50%, 50%);
    }

    /* Size variants */
    :host([size="sm"]) .badge {
      font-size: 10px;
      min-width: 16px;
      height: 16px;
      padding: 0 4px;
    }

    :host([size="md"]) .badge {
      font-size: 12px;
      min-width: 20px;
      height: 20px;
      padding: 0 6px;
    }

    :host([size="lg"]) .badge {
      font-size: 14px;
      min-width: 24px;
      height: 24px;
      padding: 0 8px;
    }

    /* Dot mode (no content) */
    :host([dot]) .badge {
      padding: 0;
      min-width: auto;
    }

    :host([dot][size="sm"]) .badge {
      width: 8px;
      height: 8px;
    }

    :host([dot][size="md"]) .badge {
      width: 10px;
      height: 10px;
    }

    :host([dot][size="lg"]) .badge {
      width: 12px;
      height: 12px;
    }

    /* Color variants */
    :host([variant="default"]) .badge {
      background-color: var(--forge-color-neutral, #6b7280);
      color: white;
    }

    :host([variant="primary"]) .badge {
      background-color: var(--forge-color-primary, #3b82f6);
      color: white;
    }

    :host([variant="success"]) .badge {
      background-color: var(--forge-color-success, #10b981);
      color: white;
    }

    :host([variant="warning"]) .badge {
      background-color: var(--forge-color-warning, #f59e0b);
      color: white;
    }

    :host([variant="error"]) .badge {
      background-color: var(--forge-color-error, #ef4444);
      color: white;
    }

    :host([variant="info"]) .badge {
      background-color: var(--forge-color-info, #3b82f6);
      color: white;
    }

    /* Outlined style */
    :host([outlined]) .badge {
      background-color: transparent;
      border: 2px solid;
    }

    :host([outlined][variant="default"]) .badge {
      border-color: var(--forge-color-neutral, #6b7280);
      color: var(--forge-color-neutral, #6b7280);
    }

    :host([outlined][variant="primary"]) .badge {
      border-color: var(--forge-color-primary, #3b82f6);
      color: var(--forge-color-primary, #3b82f6);
    }

    :host([outlined][variant="success"]) .badge {
      border-color: var(--forge-color-success, #10b981);
      color: var(--forge-color-success, #10b981);
    }

    :host([outlined][variant="warning"]) .badge {
      border-color: var(--forge-color-warning, #f59e0b);
      color: var(--forge-color-warning, #f59e0b);
    }

    :host([outlined][variant="error"]) .badge {
      border-color: var(--forge-color-error, #ef4444);
      color: var(--forge-color-error, #ef4444);
    }

    :host([outlined][variant="info"]) .badge {
      border-color: var(--forge-color-info, #3b82f6);
      color: var(--forge-color-info, #3b82f6);
    }

    /* Pulse animation */
    @keyframes pulse {
      0% {
        box-shadow: 0 0 0 0 currentColor;
      }
      70% {
        box-shadow: 0 0 0 6px transparent;
      }
      100% {
        box-shadow: 0 0 0 0 transparent;
      }
    }

    :host([pulse]) .badge {
      animation: pulse 2s infinite;
    }

    /* Invisible state (for accessibility) */
    :host([invisible]) .badge {
      visibility: hidden;
    }

    ::slotted(*) {
      display: block;
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

  @property({ type: String, reflect: true }) variant: BadgeVariant = 'default';
  @property({ type: String, reflect: true }) size: BadgeSize = 'md';
  @property({ type: String, reflect: true }) position: BadgePosition = 'inline';
  @property({ type: Number }) count = 0;
  @property({ type: Number, attribute: 'max-count' }) maxCount = 99;
  @property({ type: Boolean, reflect: true }) dot = false;
  @property({ type: Boolean, reflect: true }) outlined = false;
  @property({ type: Boolean, reflect: true }) pulse = false;
  @property({ type: Boolean, reflect: true }) invisible = false;
  @property({ type: String }) content = '';
  
  // AI-Ready attributes (UVP)
  @property({ type: String, attribute: 'semantic-role' }) semanticRole?: string;
  @property({ type: String, attribute: 'ai-context' }) aiContext?: string;
  @property({ type: String, attribute: 'aria-description' }) ariaDescription: string | null = null;
  
  // Performance monitoring (UVP)
  @property({ type: Number, attribute: 'max-render-ms' }) maxRenderMs = 16;
  @property({ type: Boolean, attribute: 'warn-on-violation' }) warnOnViolation = false;
  @property({ type: String, attribute: 'performance-mode' }) performanceMode: 'auto' | 'fast' | 'normal' = 'auto';
  
  // Developer experience (UVP)
  @property({ type: Boolean, attribute: 'dev-mode' }) devMode = false;
  @property({ type: Boolean, attribute: 'show-metrics' }) showMetrics = false;

  @state() protected renderTime = 0;
  @state() protected renderCount = 0;
  @state() private previousCount = 0;

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'status');
    this.setAttribute('aria-live', 'polite');
    this.updateAria();
  }

  override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    
    if (changedProperties.has('count')) {
      this.previousCount = changedProperties.get('count') ?? 0;
      this.updateAriaLabel();
      this.animateCountChange();
    }

    if (changedProperties.has('invisible')) {
      this.setAttribute('aria-hidden', this.invisible ? 'true' : 'false');
    }

    if (changedProperties.has('semanticRole') || 
        changedProperties.has('aiContext') ||
        changedProperties.has('content')) {
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

    this.updateAriaLabel();
  }

  private updateAriaLabel(): void {
    let label = '';
    
    if (this.dot) {
      label = 'Status indicator';
    } else if (this.count > 0) {
      const displayCount = this.getDisplayCount();
      label = `${displayCount} ${this.variant} notifications`;
    } else if (this.content) {
      label = `${this.content} badge`;
    }
    
    if (label) {
      this.setAttribute('aria-label', label);
    }
  }

  private getDisplayCount(): string {
    if (this.count > this.maxCount) {
      return `${this.maxCount}+`;
    }
    return this.count.toString();
  }

  private animateCountChange(): void {
    if (this.count !== this.previousCount && !this.dot) {
      // Add a subtle scale animation when count changes
      const badge = this.shadowRoot?.querySelector('.badge') as HTMLElement;
      if (badge) {
        badge.style.transform = 'scale(1.2)';
        setTimeout(() => {
          badge.style.transform = '';
        }, 200);
      }
    }
  }

  public show(): void {
    this.invisible = false;
  }

  public hide(): void {
    this.invisible = true;
  }

  public increment(): void {
    this.count++;
  }

  public decrement(): void {
    if (this.count > 0) {
      this.count--;
    }
  }

  public reset(): void {
    this.count = 0;
    this.invisible = false;
  }

  private trackRenderPerformance(startTime: number): void {
    const endTime = performance.now();
    this.renderTime = endTime - startTime;
    this.renderCount++;

    if (this.renderTime > this.maxRenderMs) {
      const message = `Badge render exceeded budget: ${this.renderTime.toFixed(2)}ms > ${this.maxRenderMs}ms`;
      
      if (this.warnOnViolation) {
        console.warn(message, {
          component: 'forge-badge',
          variant: this.variant,
          renderTime: this.renderTime,
          maxRenderMs: this.maxRenderMs,
          renderCount: this.renderCount
        });
      }

      if (this.performanceMode === 'auto') {
        this.pulse = false; // Disable animation if performance is poor
      }
    }

    if (this.devMode) {
      console.log('Badge render metrics:', {
        component: 'forge-badge',
        variant: this.variant,
        count: this.count,
        renderTime: this.renderTime,
        renderCount: this.renderCount
      });
    }
  }

  override render() {
    const startTime = performance.now();
    
    const badgeContent = this.dot ? '' : (this.content || (this.count > 0 ? this.getDisplayCount() : ''));
    
    const content = html`
      <div class="badge-container">
        <slot></slot>
        ${!this.invisible || this.dot || badgeContent ? html`
          <span class="badge" part="badge">
            ${badgeContent}
          </span>
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
        Badge: ${this.variant}<br>
        Count: ${this.count}<br>
        Render: ${this.renderTime.toFixed(2)}ms<br>
        Count: ${this.renderCount}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-badge': ForgeBadge;
  }
}