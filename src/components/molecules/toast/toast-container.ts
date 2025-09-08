import { html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { BaseElement } from '../../../core/BaseElement';
import './toast';
import type { ForgeToast } from './toast';

/**
 * A toast container component that manages positioning and queuing of toast notifications.
 * Provides global toast management with stacking and positioning controls.
 * 
 * @element forge-toast-container
 * 
 * @csspart container - The toast container element
 * @csspart stack - The toast stack area
 * 
 * @cssprop --forge-toast-container-z-index - Z-index for the toast container
 * @cssprop --forge-toast-stack-gap - Gap between stacked toasts
 */
@customElement('forge-toast-container')
export class ForgeToastContainer extends BaseElement {
  // Initialize AI metadata
  protected aiMetadata = {
    purpose: 'Toast notification queue management and positioning',
    context: 'notification-system',
    dataType: 'text' as const,
    criticality: 'medium' as const,
    semanticRole: 'region'
  };

  static styles = css`
    :host {
      position: fixed;
      pointer-events: none;
      z-index: var(--forge-toast-container-z-index, 9999);
      --forge-toast-stack-gap: var(--space-3, 12px);
    }

    .toast-container {
      display: flex;
      flex-direction: column;
      gap: var(--forge-toast-stack-gap);
      pointer-events: none;
    }

    .toast-container > * {
      pointer-events: auto;
    }

    /* Position variants */
    :host([position="top-left"]) {
      top: var(--forge-spacing-lg, 24px);
      left: var(--forge-spacing-lg, 24px);
    }

    :host([position="top-center"]) {
      top: var(--forge-spacing-lg, 24px);
      left: 50%;
      transform: translateX(-50%);
    }

    :host([position="top-right"]) {
      top: var(--forge-spacing-lg, 24px);
      right: var(--forge-spacing-lg, 24px);
    }

    :host([position="bottom-left"]) {
      bottom: var(--forge-spacing-lg, 24px);
      left: var(--forge-spacing-lg, 24px);
    }

    :host([position="bottom-center"]) {
      bottom: var(--forge-spacing-lg, 24px);
      left: 50%;
      transform: translateX(-50%);
    }

    :host([position="bottom-right"]) {
      bottom: var(--forge-spacing-lg, 24px);
      right: var(--forge-spacing-lg, 24px);
    }

    /* Stack ordering for bottom positions */
    :host([position^="bottom"]) .toast-container {
      flex-direction: column-reverse;
    }

    /* Responsive adjustments */
    @media (max-width: 640px) {
      :host {
        left: var(--forge-spacing-md, 16px) !important;
        right: var(--forge-spacing-md, 16px) !important;
        transform: none !important;
      }

      :host([position="top-center"]),
      :host([position="bottom-center"]) {
        left: var(--forge-spacing-md, 16px);
        right: var(--forge-spacing-md, 16px);
      }

      .toast-container {
        width: 100%;
      }
    }
  `;

  /**
   * Position of the toast container on screen
   */
  @property({ reflect: true })
  position: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right' = 'top-right';

  /**
   * Maximum number of toasts to show simultaneously
   */
  @property({ type: Number, attribute: 'max-toasts' })
  maxToasts: number = 5;

  /**
   * Whether to automatically stack newer toasts on top
   */
  @property({ type: Boolean, attribute: 'stack-newest' })
  stackNewest: boolean = true;

  @state()
  private toasts: ForgeToast[] = [];

  private toastQueue: Array<{
    id: string;
    title?: string;
    message: string;
    variant?: 'info' | 'success' | 'warning' | 'error';
    duration?: number;
    dismissible?: boolean;
    persistent?: boolean;
    showProgress?: boolean;
  }> = [];

  protected firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    
    // Set up accessibility attributes
    this.setAttribute('role', 'region');
    this.setAttribute('aria-label', 'Notifications');
    this.setAttribute('aria-live', 'polite');
    
    // Listen for toast dismissals
    this.addEventListener('toast-dismissed', this.handleToastDismissed.bind(this) as EventListener);
    
    // Make this container the global toast manager if none exists
    if (!document.querySelector('forge-toast-container[data-global="true"]')) {
      this.setAttribute('data-global', 'true');
      (window as any).forgeToastContainer = this;
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    // Clean up global reference
    if ((window as any).forgeToastContainer === this) {
      (window as any).forgeToastContainer = null;
    }
  }

  private handleToastDismissed(event: CustomEvent): void {
    const toastId = event.detail.toastId;
    this.removeToast(toastId);
    this.processQueue();
  }

  /**
   * Add a toast notification
   */
  addToast(options: {
    id?: string;
    title?: string;
    message: string;
    variant?: 'info' | 'success' | 'warning' | 'error';
    duration?: number;
    dismissible?: boolean;
    persistent?: boolean;
    showProgress?: boolean;
  }): string {
    const id = options.id || this.generateToastId();
    
    const toastData = {
      id,
      title: options.title,
      message: options.message,
      variant: options.variant || 'info',
      duration: options.duration ?? 5000,
      dismissible: options.dismissible ?? true,
      persistent: options.persistent ?? false,
      showProgress: options.showProgress ?? false
    };

    if (this.toasts.length >= this.maxToasts) {
      // Queue the toast for later
      this.toastQueue.push(toastData);
    } else {
      this.createToast(toastData);
    }

    return id;
  }

  /**
   * Remove a specific toast by ID
   */
  removeToast(id: string): boolean {
    const toast = this.toasts.find(t => t.toastId === id);
    if (toast) {
      toast.dismiss();
      return true;
    }
    
    // Remove from queue if it's there
    const queueIndex = this.toastQueue.findIndex(t => t.id === id);
    if (queueIndex >= 0) {
      this.toastQueue.splice(queueIndex, 1);
      return true;
    }
    
    return false;
  }

  /**
   * Remove all toasts
   */
  clearAll(): void {
    this.toasts.forEach(toast => toast.dismiss());
    this.toastQueue = [];
  }

  /**
   * Get all active toasts
   */
  getToasts(): ForgeToast[] {
    return [...this.toasts];
  }

  /**
   * Get toast count (active + queued)
   */
  getToastCount(): { active: number; queued: number; total: number } {
    return {
      active: this.toasts.length,
      queued: this.toastQueue.length,
      total: this.toasts.length + this.toastQueue.length
    };
  }

  private createToast(data: any): void {
    const toast = document.createElement('forge-toast');
    toast.toastId = data.id;
    toast.title = data.title || '';
    toast.message = data.message;
    toast.variant = data.variant;
    toast.duration = data.duration;
    toast.dismissible = data.dismissible;
    toast.persistent = data.persistent;
    toast.showProgress = data.showProgress;

    // Add to tracking array
    if (this.stackNewest) {
      this.toasts.unshift(toast);
    } else {
      this.toasts.push(toast);
    }

    // Add to DOM
    const container = this.shadowRoot?.querySelector('.toast-container');
    if (container) {
      if (this.stackNewest) {
        container.prepend(toast);
      } else {
        container.append(toast);
      }
    }

    this.requestUpdate();
  }

  private processQueue(): void {
    // Remove dismissed toasts from tracking
    this.toasts = this.toasts.filter(toast => toast.parentNode);

    // Process queue if we have space
    while (this.toasts.length < this.maxToasts && this.toastQueue.length > 0) {
      const nextToast = this.toastQueue.shift();
      if (nextToast) {
        this.createToast(nextToast);
      }
    }

    this.requestUpdate();
  }

  private generateToastId(): string {
    return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  protected render() {
    return html`
      <div class="toast-container" part="container" role="log" aria-live="polite">
        <div part="stack">
          <!-- Toasts are dynamically added here -->
        </div>
      </div>
    `;
  }

  // AI Integration Methods
  override explainState() {
    const states = [];
    const count = this.getToastCount();
    
    if (count.total === 0) states.push('empty');
    else if (count.queued > 0) states.push('queued');
    else if (count.active === this.maxToasts) states.push('full');
    else states.push('active');
    
    const currentState = states.join('-') || 'empty';
    
    return {
      currentState,
      possibleStates: ['empty', 'active', 'full', 'queued'],
      stateDescription: this.getStateDescription(currentState)
    };
  }

  private getStateDescription(state: string): string {
    const count = this.getToastCount();
    const descriptions: Record<string, string> = {
      'empty': 'Toast container has no active or queued notifications',
      'active': `Toast container showing ${count.active} of ${this.maxToasts} notifications`,
      'full': `Toast container at capacity with ${count.active} active notifications`,
      'queued': `Toast container full with ${count.active} active and ${count.queued} queued notifications`
    };
    
    return descriptions[state] || `Toast container in ${state} state. Position: ${this.position}`;
  }

  override getPossibleActions() {
    const count = this.getToastCount();
    
    return [
      {
        name: 'addToast',
        description: 'Add a new toast notification',
        available: true
      },
      {
        name: 'clearAll',
        description: 'Remove all toast notifications',
        available: count.total > 0
      },
      {
        name: 'removeToast',
        description: 'Remove a specific toast by ID',
        available: count.active > 0
      }
    ];
  }

  override get aiState() {
    const count = this.getToastCount();
    
    return {
      ...super.aiState,
      position: this.position,
      maxToasts: this.maxToasts,
      stackNewest: this.stackNewest,
      activeToasts: count.active,
      queuedToasts: count.queued,
      totalToasts: count.total,
      toastIds: this.toasts.map(t => t.toastId)
    };
  }
}

// Global toast helper functions
declare global {
  interface Window {
    forgeToastContainer?: ForgeToastContainer;
  }

  interface HTMLElementTagNameMap {
    'forge-toast-container': ForgeToastContainer;
  }
}

/**
 * Global helper function to show toast notifications
 * Automatically creates a container if none exists
 */
export function showToast(options: {
  title?: string;
  message: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
  dismissible?: boolean;
  persistent?: boolean;
  showProgress?: boolean;
}): string {
  let container = window.forgeToastContainer;
  
  if (!container) {
    container = document.createElement('forge-toast-container');
    container.setAttribute('data-global', 'true');
    document.body.appendChild(container);
    window.forgeToastContainer = container;
  }
  
  return container.addToast(options);
}

/**
 * Helper functions for common toast types
 */
export const toast = {
  info: (message: string, title?: string) => showToast({ message, title, variant: 'info' }),
  success: (message: string, title?: string) => showToast({ message, title, variant: 'success' }),
  warning: (message: string, title?: string) => showToast({ message, title, variant: 'warning' }),
  error: (message: string, title?: string) => showToast({ message, title, variant: 'error', persistent: true }),
  dismiss: (id: string) => window.forgeToastContainer?.removeToast(id),
  clear: () => window.forgeToastContainer?.clearAll()
};