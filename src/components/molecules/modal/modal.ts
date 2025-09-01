import { html, css, PropertyValues } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { BaseElement } from '../../../core/BaseElement';
import type { AIMetadata, AIAction, AIStateExplanation } from '../../../core/ai-metadata.types';

export type ModalSize = 'small' | 'medium' | 'large' | 'full';
export type ModalScrollBehavior = 'body' | 'entire';

@customElement('forge-modal')
export class ForgeModal extends BaseElement {
  static override styles = css`
    ${BaseElement.styles}
    
    :host {
      display: contents;
    }

    .modal-container {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: var(--forge-modal-z-index, 1000);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease, visibility 0.3s ease;
    }

    .modal-container--open {
      opacity: 1;
      visibility: visible;
    }

    .modal-backdrop {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: var(--forge-modal-backdrop, rgba(0, 0, 0, 0.5));
      backdrop-filter: var(--forge-modal-backdrop-blur, blur(4px));
      transition: opacity 0.3s ease;
    }

    .modal {
      position: relative;
      background: var(--forge-modal-bg, #ffffff);
      border-radius: var(--forge-modal-radius, 12px);
      box-shadow: 
        0 20px 25px -5px rgba(0, 0, 0, 0.1),
        0 10px 10px -5px rgba(0, 0, 0, 0.04);
      max-height: calc(100vh - 32px);
      display: flex;
      flex-direction: column;
      transform: scale(0.95);
      transition: transform 0.3s ease;
    }

    .modal-container--open .modal {
      transform: scale(1);
    }

    /* Size variants */
    .modal--small {
      width: 100%;
      max-width: 400px;
    }

    .modal--medium {
      width: 100%;
      max-width: 600px;
    }

    .modal--large {
      width: 100%;
      max-width: 900px;
    }

    .modal--full {
      width: calc(100vw - 32px);
      height: calc(100vh - 32px);
      max-width: none;
    }

    /* Header */
    .modal__header {
      padding: 20px 24px;
      border-bottom: 1px solid var(--forge-border-light, #e5e7eb);
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-shrink: 0;
    }

    .modal__title {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--forge-text-primary, #111827);
    }

    .modal__close {
      background: none;
      border: none;
      padding: 8px;
      cursor: pointer;
      color: var(--forge-text-secondary, #6b7280);
      border-radius: 6px;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .modal__close:hover {
      background: var(--forge-hover-bg, #f3f4f6);
      color: var(--forge-text-primary, #111827);
    }

    .modal__close:focus-visible {
      outline: 2px solid var(--forge-focus-color, #3b82f6);
      outline-offset: 2px;
    }

    /* Body */
    .modal__body {
      padding: 24px;
      overflow-y: auto;
      flex: 1;
    }

    .modal--scroll-entire .modal__body {
      overflow-y: visible;
    }

    .modal--scroll-entire .modal {
      overflow-y: auto;
    }

    /* Footer */
    .modal__footer {
      padding: 16px 24px;
      border-top: 1px solid var(--forge-border-light, #e5e7eb);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 12px;
      flex-shrink: 0;
    }

    /* No header/footer borders */
    .modal--no-header-border .modal__header {
      border-bottom: none;
    }

    .modal--no-footer-border .modal__footer {
      border-top: none;
    }

    /* Focus trap indicator */
    .focus-trap-indicator {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    /* Stacking context for multiple modals */
    :host([stacked]) .modal-container {
      z-index: calc(var(--forge-modal-z-index, 1000) + var(--stack-level, 1));
    }

    /* Animation variants */
    @keyframes modal-slide-up {
      from {
        transform: translateY(20px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    @keyframes modal-fade-in {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    .modal--animation-slide .modal {
      animation: modal-slide-up 0.3s ease forwards;
    }

    .modal--animation-fade .modal {
      animation: modal-fade-in 0.3s ease forwards;
    }

    /* Mobile responsiveness */
    @media (max-width: 640px) {
      .modal-container {
        padding: 0;
      }

      .modal--small,
      .modal--medium,
      .modal--large {
        width: 100%;
        height: 100%;
        max-width: none;
        max-height: none;
        border-radius: 0;
      }
    }
  `;

  @property({ type: Boolean }) open = false;
  @property({ type: String }) size: ModalSize = 'medium';
  @property({ type: String }) title = '';
  @property({ type: Boolean, attribute: 'show-close', reflect: true }) showClose = true;
  @property({ type: Boolean, attribute: 'close-on-backdrop', reflect: true }) closeOnBackdrop = true;
  @property({ type: Boolean, attribute: 'close-on-escape' }) closeOnEscape = true;
  @property({ type: Boolean, attribute: 'no-header-border' }) noHeaderBorder = false;
  @property({ type: Boolean, attribute: 'no-footer-border' }) noFooterBorder = false;
  @property({ type: String, attribute: 'scroll-behavior' }) scrollBehavior: ModalScrollBehavior = 'body';
  @property({ type: Boolean, attribute: 'prevent-body-scroll' }) preventBodyScroll = true;
  @property({ type: String }) animation: 'none' | 'fade' | 'slide' = 'fade';
  @property({ type: Number, attribute: 'stack-level' }) stackLevel = 0;
  @property({ type: String, attribute: 'aria-label' }) override ariaLabel: string | null = null;

  @state() private hasFooter = false;
  @state() private focusedElementBeforeOpen: HTMLElement | null = null;

  @query('.modal') private modalElement!: HTMLElement;
  @query('.modal__body') private bodyElement!: HTMLElement;

  private focusableElements: HTMLElement[] = [];
  private firstFocusableElement: HTMLElement | null = null;
  private lastFocusableElement: HTMLElement | null = null;

  protected aiMetadata: AIMetadata = {
    purpose: 'Modal dialog for focused content or interactions',
    criticality: 'high',
    semanticRole: 'dialog',
    interactions: [
      {
        type: 'keyboard',
        description: 'ESC to close, Tab for focus navigation',
        shortcuts: ['Escape', 'Tab', 'Shift+Tab']
      },
      {
        type: 'click',
        description: 'Click backdrop to close',
        outcome: 'Closes modal if closeOnBackdrop is true'
      },
      {
        type: 'focus',
        description: 'Focus trap management',
        outcome: 'Keeps focus within modal while open'
      }
    ]
  };

  constructor() {
    super();
    this.handleEscape = this.handleEscape.bind(this);
    this.handleBackdropClick = this.handleBackdropClick.bind(this);
    this.handleFocusTrap = this.handleFocusTrap.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    
    // Parse string attributes to boolean
    const showCloseAttr = this.getAttribute('show-close');
    if (showCloseAttr === 'false') {
      this.showClose = false;
    }
    
    const closeOnBackdropAttr = this.getAttribute('close-on-backdrop');
    if (closeOnBackdropAttr === 'false') {
      this.closeOnBackdrop = false;
    }
    
    this.updateSlotStatus();
    
    if (this.open) {
      this.handleOpen();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.handleClose();
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);
    
    // Listen for slot changes
    const footerSlot = this.shadowRoot?.querySelector('slot[name="footer"]');
    footerSlot?.addEventListener('slotchange', () => this.updateSlotStatus());
  }

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    
    if (changedProperties.has('open')) {
      if (this.open) {
        this.handleOpen();
      } else {
        this.handleClose();
      }
      
      this.updateComponentState('open', this.open);
      this.emit('forge-modal-toggle', { open: this.open });
    }

    if (changedProperties.has('stackLevel')) {
      this.style.setProperty('--stack-level', String(this.stackLevel));
    }
  }

  private updateSlotStatus(): void {
    const footerSlot = this.shadowRoot?.querySelector('slot[name="footer"]') as HTMLSlotElement;
    this.hasFooter = footerSlot ? footerSlot.assignedNodes().length > 0 : false;
  }

  private handleOpen(): void {
    // Store currently focused element
    this.focusedElementBeforeOpen = document.activeElement as HTMLElement;
    
    // Add event listeners
    if (this.closeOnEscape) {
      document.addEventListener('keydown', this.handleEscape);
    }
    
    // Prevent body scroll
    if (this.preventBodyScroll) {
      document.body.style.overflow = 'hidden';
    }
    
    // Setup focus trap after render
    requestAnimationFrame(() => {
      this.setupFocusTrap();
      this.focusFirstElement();
    });
  }

  private handleClose(): void {
    // Remove event listeners
    document.removeEventListener('keydown', this.handleEscape);
    
    // Restore body scroll
    if (this.preventBodyScroll) {
      document.body.style.overflow = '';
    }
    
    // Restore focus
    if (this.focusedElementBeforeOpen) {
      this.focusedElementBeforeOpen.focus();
      this.focusedElementBeforeOpen = null;
    }
  }

  private handleEscape(e: KeyboardEvent): void {
    if (e.key === 'Escape' && this.open) {
      e.preventDefault();
      this.close();
    }
  }

  private handleBackdropClick(e: Event): void {
    if (this.closeOnBackdrop && e.target === e.currentTarget) {
      this.close();
    }
  }

  private setupFocusTrap(): void {
    if (!this.modalElement) return;
    
    // Get all focusable elements
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ].join(', ');
    
    this.focusableElements = Array.from(
      this.modalElement.querySelectorAll(focusableSelectors)
    ) as HTMLElement[];
    
    // Add slotted focusable elements
    const slots = this.shadowRoot?.querySelectorAll('slot') || [];
    slots.forEach(slot => {
      const assignedElements = (slot as HTMLSlotElement).assignedElements();
      assignedElements.forEach(el => {
        const focusables = el.querySelectorAll(focusableSelectors);
        this.focusableElements.push(...Array.from(focusables) as HTMLElement[]);
      });
    });
    
    if (this.focusableElements.length > 0) {
      this.firstFocusableElement = this.focusableElements[0];
      this.lastFocusableElement = this.focusableElements[this.focusableElements.length - 1];
      
      // Add focus trap listeners
      this.modalElement.addEventListener('keydown', this.handleFocusTrap);
    }
  }

  private handleFocusTrap(e: KeyboardEvent): void {
    if (e.key !== 'Tab') return;
    
    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === this.firstFocusableElement) {
        e.preventDefault();
        this.lastFocusableElement?.focus();
      }
    } else {
      // Tab
      if (document.activeElement === this.lastFocusableElement) {
        e.preventDefault();
        this.firstFocusableElement?.focus();
      }
    }
  }

  private focusFirstElement(): void {
    // Try to focus the first focusable element, or the modal itself
    if (this.firstFocusableElement) {
      this.firstFocusableElement.focus();
    } else if (this.modalElement) {
      this.modalElement.setAttribute('tabindex', '-1');
      this.modalElement.focus();
    }
  }

  private handleCloseClick(): void {
    this.close();
  }

  public close(): void {
    const event = new CustomEvent('forge-modal-close', { 
      bubbles: true, 
      composed: true, 
      cancelable: true 
    });
    this.dispatchEvent(event);
    if (!event.defaultPrevented) {
      this.open = false;
    }
  }

  public show(): void {
    const event = new CustomEvent('forge-modal-open', { 
      bubbles: true, 
      composed: true, 
      cancelable: true 
    });
    this.dispatchEvent(event);
    if (!event.defaultPrevented) {
      this.open = true;
    }
  }

  protected render() {
    const startTime = performance.now();
    
    const classes = {
      'modal-container': true,
      'modal-container--open': this.open
    };

    const modalClasses = {
      'modal': true,
      [`modal--${this.size}`]: true,
      [`modal--scroll-${this.scrollBehavior}`]: true,
      'modal--no-header-border': this.noHeaderBorder,
      'modal--no-footer-border': this.noFooterBorder,
      [`modal--animation-${this.animation}`]: this.animation !== 'none'
    };

    const content = html`
      <div 
        class=${classMap(classes)}
        @click=${this.handleBackdropClick}
      >
        <div class="modal-backdrop"></div>
        <div 
          class=${classMap(modalClasses)}
          role="dialog"
          aria-modal="true"
          aria-label=${this.ariaLabel || this.title || 'Modal dialog'}
          aria-describedby="modal-body"
        >
          <div class="modal__header">
            ${this.title ? html`<h2 class="modal__title">${this.title}</h2>` : html`<slot name="header"></slot>`}
            ${this.showClose ? html`
              <button 
                class="modal__close"
                @click=${this.handleCloseClick}
                aria-label="Close modal"
                type="button"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.95 5.05L5.05 14.95M5.05 5.05L14.95 14.95" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            ` : ''}
          </div>
          
          <div class="modal__body" id="modal-body">
            <slot></slot>
          </div>
          
          <div class="modal__footer">
            <slot name="footer"></slot>
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
        name: 'open',
        description: 'Open the modal',
        available: !this.open,
        result: 'Shows the modal dialog'
      },
      {
        name: 'close',
        description: 'Close the modal',
        available: this.open,
        result: 'Hides the modal dialog'
      },
      {
        name: 'toggle',
        description: 'Toggle modal visibility',
        available: true,
        parameters: [
          {
            name: 'open',
            type: 'boolean',
            required: false,
            description: 'Specific state to set'
          }
        ],
        result: 'Changes modal visibility'
      }
    ];
  }

  explainState(): AIStateExplanation {
    const states = ['closed', 'open', 'opening', 'closing'];
    const currentState = this.open ? 'open' : 'closed';

    return {
      currentState,
      possibleStates: states,
      stateDescription: `Modal is ${currentState}. ${this.size} sized dialog with ${this.scrollBehavior} scroll behavior.`,
      transitions: [
        {
          from: 'closed',
          to: 'open',
          trigger: 'show() method or open property set to true'
        },
        {
          from: 'open',
          to: 'closed',
          trigger: 'ESC key, backdrop click, or close button'
        }
      ],
      visualIndicators: [
        this.open ? 'Visible with backdrop' : 'Hidden',
        'Focus trapped within modal when open',
        'Body scroll prevented when open'
      ]
    };
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-modal': ForgeModal;
  }
}