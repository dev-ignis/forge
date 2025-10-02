import { html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { BaseElement } from '../../../core/BaseElement';

/**
 * A toast notification component for displaying temporary messages to users.
 * Supports auto-dismiss, action buttons, and various notification types.
 *
 * @element forge-toast
 *
 * @slot - Default content for the toast message
 * @slot icon - Icon slot for custom toast icons
 * @slot action - Action button slot
 *
 * @csspart container - The toast container element
 * @csspart header - The toast header area
 * @csspart icon - The toast icon area
 * @csspart content - The toast content area
 * @csspart title - The toast title element
 * @csspart message - The toast message element
 * @csspart actions - The action buttons area
 * @csspart dismiss - The dismiss button
 *
 * @cssprop --forge-toast-width - Width of the toast
 * @cssprop --forge-toast-shadow - Shadow of the toast
 * @cssprop --forge-toast-radius - Border radius of the toast
 * @cssprop --forge-toast-slide-distance - Animation slide distance
 */
@customElement('forge-toast')
export class ForgeToast extends BaseElement {
  // Initialize AI metadata
  protected aiMetadata = {
    purpose: 'User notification and feedback display',
    context: 'notification',
    dataType: 'text' as const,
    criticality: 'medium' as const,
    semanticRole: 'alert',
  };

  static styles = css`
    :host {
      display: block;
      --forge-toast-width: 380px;
      --forge-toast-shadow: var(--shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1));
      --forge-toast-radius: var(--radius-md, 6px);
      --forge-toast-slide-distance: var(--space-8, 32px);
      --forge-toast-animation-duration: 300ms;
    }

    .toast-container {
      width: var(--forge-toast-width);
      background: var(--forge-color-background, #ffffff);
      border: 1px solid var(--forge-color-border, #e5e7eb);
      border-radius: var(--forge-toast-radius);
      box-shadow: var(--forge-toast-shadow);
      padding: var(--forge-spacing-md, 16px);
      position: relative;
      overflow: hidden;
    }

    .toast-header {
      display: flex;
      align-items: flex-start;
      gap: var(--forge-spacing-sm, 12px);
      margin-bottom: var(--forge-spacing-xs, 8px);
    }

    .toast-icon {
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      margin-top: 2px;
    }

    .toast-content {
      flex: 1;
      min-width: 0;
    }

    .toast-title {
      font-size: var(--forge-font-size-sm, 14px);
      font-weight: 600;
      color: var(--forge-color-text-primary, #111827);
      margin: 0 0 var(--forge-spacing-xs, 4px) 0;
      line-height: 1.4;
    }

    .toast-message {
      font-size: var(--forge-font-size-sm, 14px);
      color: var(--forge-color-text-secondary, #6b7280);
      margin: 0;
      line-height: 1.4;
    }

    .toast-actions {
      display: flex;
      gap: var(--forge-spacing-xs, 8px);
      margin-top: var(--forge-spacing-sm, 12px);
      align-items: center;
    }

    .dismiss-button {
      position: absolute;
      top: var(--forge-spacing-xs, 8px);
      right: var(--forge-spacing-xs, 8px);
      background: none;
      border: none;
      padding: var(--forge-spacing-xs, 4px);
      cursor: pointer;
      border-radius: var(--forge-border-radius-sm, 4px);
      color: var(--forge-color-text-tertiary, #9ca3af);
      transition: all var(--forge-transition-fast, 150ms);
    }

    .dismiss-button:hover {
      background: var(--forge-color-gray-100, #f3f4f6);
      color: var(--forge-color-text-secondary, #6b7280);
    }

    .dismiss-button:focus {
      outline: 2px solid var(--forge-color-focus, #3b82f6);
      outline-offset: 2px;
    }

    /* Variant styles */
    :host([variant='success']) .toast-container {
      border-left: 4px solid var(--forge-color-success-500, #10b981);
    }

    :host([variant='success']) .toast-icon {
      color: var(--forge-color-success-500, #10b981);
    }

    :host([variant='warning']) .toast-container {
      border-left: 4px solid var(--forge-color-warning-500, #f59e0b);
    }

    :host([variant='warning']) .toast-icon {
      color: var(--forge-color-warning-500, #f59e0b);
    }

    :host([variant='error']) .toast-container {
      border-left: 4px solid var(--forge-color-danger-500, #ef4444);
    }

    :host([variant='error']) .toast-icon {
      color: var(--forge-color-danger-500, #ef4444);
    }

    :host([variant='info']) .toast-container {
      border-left: 4px solid var(--forge-color-primary-500, #3b82f6);
    }

    :host([variant='info']) .toast-icon {
      color: var(--forge-color-primary-500, #3b82f6);
    }

    /* Animation states */
    :host([data-entering]) {
      animation: slide-in var(--forge-toast-animation-duration) ease-out;
    }

    :host([data-exiting]) {
      animation: slide-out var(--forge-toast-animation-duration) ease-in;
    }

    @keyframes slide-in {
      from {
        transform: translateX(var(--forge-toast-slide-distance));
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes slide-out {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(var(--forge-toast-slide-distance));
        opacity: 0;
      }
    }

    /* Progress bar for timed toasts */
    .progress-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 2px;
      background: var(--forge-color-primary-500, #3b82f6);
      transition: width linear;
      border-radius: 0 0 var(--forge-toast-radius) var(--forge-toast-radius);
    }

    :host([variant='success']) .progress-bar {
      background: var(--forge-color-success-500, #10b981);
    }

    :host([variant='warning']) .progress-bar {
      background: var(--forge-color-warning-500, #f59e0b);
    }

    :host([variant='error']) .progress-bar {
      background: var(--forge-color-danger-500, #ef4444);
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      :host([data-entering]),
      :host([data-exiting]) {
        animation: none;
      }

      .progress-bar {
        transition: none;
      }
    }

    /* Hide title when not provided */
    .toast-title:empty {
      display: none;
      margin: 0;
    }

    /* Adjust spacing when no title */
    .toast-title:empty + .toast-message {
      margin-top: 0;
    }
  `;

  /**
   * The toast title
   */
  @property()
  title: string = '';

  /**
   * The toast message
   */
  @property()
  message: string = '';

  /**
   * Visual variant of the toast
   */
  @property({ reflect: true })
  variant: 'info' | 'success' | 'warning' | 'error' = 'info';

  /**
   * Auto-dismiss duration in milliseconds (0 disables auto-dismiss)
   */
  @property({ type: Number })
  duration: number = 5000;

  /**
   * Whether the toast can be manually dismissed
   */
  @property({ type: Boolean })
  dismissible: boolean = true;

  /**
   * Whether to show a progress bar for timed toasts
   */
  @property({ type: Boolean, attribute: 'show-progress' })
  showProgress: boolean = false;

  /**
   * Whether the toast is persistent (prevents auto-dismiss)
   */
  @property({ type: Boolean })
  persistent: boolean = false;

  /**
   * Unique identifier for the toast
   */
  @property()
  toastId: string = '';

  @state()
  private isVisible: boolean = true;

  @state()
  private progressWidth: number = 100;

  private dismissTimer?: number;
  private progressTimer?: number;
  private animationEndHandler?: (event: AnimationEvent) => void;

  protected firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);

    // Set up accessibility attributes
    this.setAttribute('role', this.variant === 'error' ? 'alert' : 'status');
    this.setAttribute('aria-live', this.variant === 'error' ? 'assertive' : 'polite');

    // Start auto-dismiss if enabled
    if (this.shouldAutoDismiss()) {
      this.startAutoDismiss();
    }

    // Trigger enter animation
    this.setAttribute('data-entering', '');

    // Remove entering state after animation
    setTimeout(() => {
      this.removeAttribute('data-entering');
    }, 300);
  }

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (changedProperties.has('variant')) {
      this.setAttribute('role', this.variant === 'error' ? 'alert' : 'status');
      this.setAttribute('aria-live', this.variant === 'error' ? 'assertive' : 'polite');
    }

    if (changedProperties.has('duration') || changedProperties.has('persistent')) {
      if (this.shouldAutoDismiss()) {
        this.startAutoDismiss();
      } else {
        this.clearAutoDismiss();
      }
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.clearAutoDismiss();
    if (this.animationEndHandler) {
      this.removeEventListener('animationend', this.animationEndHandler);
    }
  }

  private shouldAutoDismiss(): boolean {
    return !this.persistent && this.duration > 0;
  }

  private startAutoDismiss(): void {
    this.clearAutoDismiss();

    if (this.showProgress) {
      this.startProgressAnimation();
    }

    this.dismissTimer = window.setTimeout(() => {
      this.dismiss();
    }, this.duration);
  }

  private clearAutoDismiss(): void {
    if (this.dismissTimer) {
      clearTimeout(this.dismissTimer);
      this.dismissTimer = undefined;
    }
    if (this.progressTimer) {
      clearInterval(this.progressTimer);
      this.progressTimer = undefined;
    }
  }

  private startProgressAnimation(): void {
    this.progressWidth = 100;
    const startTime = Date.now();
    const duration = this.duration;

    this.progressTimer = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, (duration - elapsed) / duration);
      this.progressWidth = remaining * 100;

      if (remaining === 0) {
        this.clearAutoDismiss();
      }
    }, 16); // ~60fps
  }

  /**
   * Emits dismiss events (ADR-008 compliant + deprecated alias)
   * @private
   */
  private emitDismiss(): void {
    // NEW: ADR-008 compliant event (present tense, no prefix)
    this.dispatchEvent(
      new CustomEvent('dismiss', {
        detail: { toastId: this.toastId },
        bubbles: true,
        composed: true,
      }),
    );

    // DEPRECATED: Keep for backward compatibility (will be removed in v1.0.0)
    this.dispatchEvent(
      new CustomEvent('toast-dismissed', {
        detail: { toastId: this.toastId },
        bubbles: true,
        composed: true,
      }),
    );
  }

  /**
   * Dismisses the toast with animation
   */
  dismiss(): void {
    if (!this.isVisible) return;

    this.isVisible = false;
    this.clearAutoDismiss();

    // Add exit animation
    this.setAttribute('data-exiting', '');

    // Set up animation end handler
    this.animationEndHandler = (event: AnimationEvent) => {
      if (event.animationName === 'slide-out') {
        this.emitDismiss();
        this.remove();
      }
    };

    this.addEventListener('animationend', this.animationEndHandler, { once: true });

    // Fallback removal in case animation doesn't fire
    setTimeout(() => {
      if (this.parentNode) {
        this.emitDismiss();
        this.remove();
      }
    }, 300);
  }

  /**
   * Pauses auto-dismiss timer (useful for hover interactions)
   */
  pause(): void {
    this.clearAutoDismiss();
  }

  /**
   * Resumes auto-dismiss timer
   */
  resume(): void {
    if (this.shouldAutoDismiss()) {
      this.startAutoDismiss();
    }
  }

  private handleDismissClick(): void {
    this.dismiss();
  }

  private handleMouseEnter(): void {
    this.pause();
  }

  private handleMouseLeave(): void {
    this.resume();
  }

  private getDefaultIcon(): string {
    const icons = {
      info: '🔵',
      success: '✅',
      warning: '⚠️',
      error: '❌',
    };
    return icons[this.variant] || icons.info;
  }

  protected render() {
    const containerClasses = {
      'toast-container': true,
    };

    const progressStyle = this.showProgress ? `width: ${this.progressWidth}%` : 'display: none';

    return html`
      <div
        class=${classMap(containerClasses)}
        part="container"
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
      >
        <div class="toast-header" part="header">
          <div class="toast-icon" part="icon">
            <slot name="icon">${this.getDefaultIcon()}</slot>
          </div>

          <div class="toast-content" part="content">
            ${this.title ? html` <h4 class="toast-title" part="title">${this.title}</h4> ` : ''}

            <div class="toast-message" part="message">${this.message || html`<slot></slot>`}</div>
          </div>

          ${this.dismissible
            ? html`
                <button
                  class="dismiss-button"
                  part="dismiss"
                  @click=${this.handleDismissClick}
                  aria-label="Dismiss notification"
                >
                  ✕
                </button>
              `
            : ''}
        </div>

        <div class="toast-actions" part="actions">
          <slot name="action"></slot>
        </div>

        <div class="progress-bar" style=${progressStyle}></div>
      </div>
    `;
  }

  // AI Integration Methods
  override explainState() {
    const states = [];
    if (!this.isVisible) states.push('dismissed');
    else if (this.persistent) states.push('persistent');
    else if (this.duration > 0) states.push('timed');
    else states.push('manual');

    const currentState = states.join('-') || 'visible';

    return {
      currentState,
      possibleStates: ['visible', 'timed', 'persistent', 'dismissed'],
      stateDescription: this.getStateDescription(currentState),
    };
  }

  private getStateDescription(state: string): string {
    const descriptions: Record<string, string> = {
      visible: `${this.variant} toast notification visible and active`,
      timed: `${this.variant} toast with ${this.duration}ms auto-dismiss timer`,
      persistent: `${this.variant} toast that persists until manually dismissed`,
      dismissed: `${this.variant} toast has been dismissed and will be removed`,
    };

    return (
      descriptions[state] ||
      `Toast in ${state} state. Type: ${this.variant}, Title: ${this.title || 'none'}`
    );
  }

  override getPossibleActions() {
    const actions = [];

    if (this.isVisible && this.dismissible) {
      actions.push({
        name: 'dismiss',
        description: 'Dismiss the toast notification',
        available: true,
      });
    }

    if (this.shouldAutoDismiss()) {
      actions.push({
        name: 'pause',
        description: 'Pause auto-dismiss timer',
        available: true,
      });
      actions.push({
        name: 'resume',
        description: 'Resume auto-dismiss timer',
        available: true,
      });
    }

    return actions;
  }

  override get aiState() {
    return {
      ...super.aiState,
      title: this.title,
      message: this.message,
      variant: this.variant,
      duration: this.duration,
      dismissible: this.dismissible,
      persistent: this.persistent,
      visible: this.isVisible,
      showProgress: this.showProgress,
      toastId: this.toastId,
      timeRemaining: this.dismissTimer ? this.duration : 0,
    };
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-toast': ForgeToast;
  }
}
