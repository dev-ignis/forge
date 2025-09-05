import { html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { BaseElement } from '../../../core/BaseElement';
import type { AIMetadata, AIAction, AIStateExplanation } from '../../../core/ai-metadata.types';

export type TooltipPosition = 'top' | 'right' | 'bottom' | 'left' | 'auto';
export type TooltipTrigger = 'hover' | 'click' | 'focus' | 'manual';
export type TooltipVariant = 'default' | 'dark' | 'light' | 'error' | 'warning' | 'success';

@customElement('forge-tooltip')
export class ForgeTooltip extends BaseElement {
  static override styles = css`
    ${BaseElement.styles}
    
    :host {
      position: relative;
      display: inline-block;
    }

    .tooltip {
      position: relative;
      display: inline-block;
    }

    .tooltip__trigger {
      display: inline-block;
      cursor: help;
    }

    .tooltip__content {
      position: absolute;
      z-index: 1000;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 14px;
      line-height: 1.4;
      white-space: nowrap;
      pointer-events: none;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.2s, visibility 0.2s, transform 0.2s;
      max-width: 250px;
      word-wrap: break-word;
      white-space: normal;
    }

    .tooltip__content--max-width {
      max-width: var(--tooltip-max-width, 250px);
    }

    .tooltip__content--visible {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
    }

    /* Variants */
    .tooltip__content--default {
      background: rgba(0, 0, 0, 0.9);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .tooltip__content--dark {
      background: #1f2937;
      color: white;
      border: 1px solid #374151;
    }

    .tooltip__content--light {
      background: white;
      color: #1f2937;
      border: 1px solid #e5e7eb;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    .tooltip__content--error {
      background: #dc2626;
      color: white;
      border: 1px solid #b91c1c;
    }

    .tooltip__content--warning {
      background: #f59e0b;
      color: white;
      border: 1px solid #d97706;
    }

    .tooltip__content--success {
      background: #10b981;
      color: white;
      border: 1px solid #059669;
    }

    /* Positions */
    .tooltip__content--top {
      bottom: calc(100% + 8px);
      left: 50%;
      transform: translateX(-50%);
    }

    .tooltip__content--top.tooltip__content--visible {
      transform: translateX(-50%) translateY(-2px);
    }

    .tooltip__content--right {
      left: calc(100% + 8px);
      top: 50%;
      transform: translateY(-50%);
    }

    .tooltip__content--right.tooltip__content--visible {
      transform: translateY(-50%) translateX(2px);
    }

    .tooltip__content--bottom {
      top: calc(100% + 8px);
      left: 50%;
      transform: translateX(-50%);
    }

    .tooltip__content--bottom.tooltip__content--visible {
      transform: translateX(-50%) translateY(2px);
    }

    .tooltip__content--left {
      right: calc(100% + 8px);
      top: 50%;
      transform: translateY(-50%);
    }

    .tooltip__content--left.tooltip__content--visible {
      transform: translateY(-50%) translateX(-2px);
    }

    /* Arrow */
    .tooltip__arrow {
      position: absolute;
      width: 8px;
      height: 8px;
      background: inherit;
      border: inherit;
      transform: rotate(45deg);
    }

    .tooltip__content--top .tooltip__arrow {
      bottom: -4px;
      left: 50%;
      transform: translateX(-50%) rotate(45deg);
      border-top: none;
      border-left: none;
    }

    .tooltip__content--right .tooltip__arrow {
      left: -4px;
      top: 50%;
      transform: translateY(-50%) rotate(45deg);
      border-right: none;
      border-top: none;
    }

    .tooltip__content--bottom .tooltip__arrow {
      top: -4px;
      left: 50%;
      transform: translateX(-50%) rotate(45deg);
      border-bottom: none;
      border-right: none;
    }

    .tooltip__content--left .tooltip__arrow {
      right: -4px;
      top: 50%;
      transform: translateY(-50%) rotate(45deg);
      border-left: none;
      border-bottom: none;
    }

    /* Touch device adjustments */
    @media (hover: none) {
      .tooltip__trigger {
        cursor: default;
      }

      .tooltip__content--visible {
        pointer-events: none;
      }
    }

    /* Focus styles */
    .tooltip__trigger:focus-visible {
      outline: 2px solid var(--forge-focus-color, #3b82f6);
      outline-offset: 2px;
      border-radius: 4px;
    }

    /* HTML content support */
    .tooltip__html {
      display: block;
    }

    ::slotted(*) {
      display: inline-block;
    }
  `;

  @property({ type: String }) content = '';
  @property({ type: String }) position: TooltipPosition = 'top';
  @property({ type: String }) trigger: TooltipTrigger = 'hover';
  @property({ type: String }) variant: TooltipVariant = 'default';
  @property({ type: Number, attribute: 'show-delay' }) showDelay = 0;
  @property({ type: Number, attribute: 'hide-delay' }) hideDelay = 0;
  @property({ type: Boolean, attribute: 'show-arrow' }) showArrow = true;
  @property({ type: String, attribute: 'max-width' }) maxWidth = '250px';
  @property({ type: Boolean, attribute: 'html-content' }) htmlContent = false;
  @property({ type: Boolean }) disabled = false;

  @state() private isVisible = false;
  @state() private actualPosition: TooltipPosition = 'top';
  @state() private showTimeout?: number;
  @state() private hideTimeout?: number;

  protected aiMetadata: AIMetadata = {
    purpose: 'Contextual information display on hover/focus',
    criticality: 'low',
    semanticRole: 'tooltip',
    interactions: [
      {
        type: 'hover',
        description: 'Show tooltip on hover',
        outcome: 'Displays contextual information'
      },
      {
        type: 'focus',
        description: 'Show tooltip on focus',
        outcome: 'Displays contextual information for keyboard users'
      },
      {
        type: 'click',
        description: 'Toggle tooltip on click',
        outcome: 'Shows/hides tooltip content'
      }
    ]
  };

  constructor() {
    super();
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.setupEventListeners();
    this.setAttribute('aria-describedby', 'tooltip-content');
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListeners();
    this.clearTimeouts();
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);
    // Set initial actualPosition first
    this.actualPosition = this.position;
    this.updatePosition();
  }

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (changedProperties.has('disabled')) {
      if (this.disabled && this.isVisible) {
        this.isVisible = false;
        // Force re-render after visibility change
        this.requestUpdate();
      }
    }

    if (changedProperties.has('position')) {
      this.actualPosition = this.position;
      this.updatePosition();
      // Force re-render to apply new position classes
      this.requestUpdate();
    }

    if (changedProperties.has('isVisible')) {
      this.updateComponentState('visible', this.isVisible);
      // Use setTimeout to ensure the event is dispatched after the update cycle
      setTimeout(() => {
        this.dispatchEvent(new CustomEvent('tooltipvisibilitychange', {
          detail: { visible: this.isVisible },
          bubbles: true,
          composed: true
        }));
      }, 0);
      
      if (this.isVisible) {
        this.updatePosition();
      }
    }

    if (changedProperties.has('trigger')) {
      this.removeEventListeners();
      this.setupEventListeners();
    }
  }

  private setupEventListeners(): void {
    const triggerElement = this.shadowRoot?.querySelector('.tooltip__trigger');
    if (!triggerElement) return;

    switch (this.trigger) {
      case 'hover':
        triggerElement.addEventListener('mouseenter', this.handleMouseEnter);
        triggerElement.addEventListener('mouseleave', this.handleMouseLeave);
        break;
      case 'click':
        triggerElement.addEventListener('click', this.handleClick);
        document.addEventListener('click', this.handleDocumentClick.bind(this));
        break;
      case 'focus':
        triggerElement.addEventListener('focus', this.handleFocus);
        triggerElement.addEventListener('blur', this.handleBlur);
        break;
    }

    triggerElement.addEventListener('keydown', this.handleKeydown as EventListener);
  }

  private removeEventListeners(): void {
    const triggerElement = this.shadowRoot?.querySelector('.tooltip__trigger');
    if (!triggerElement) return;

    triggerElement.removeEventListener('mouseenter', this.handleMouseEnter);
    triggerElement.removeEventListener('mouseleave', this.handleMouseLeave);
    triggerElement.removeEventListener('click', this.handleClick);
    triggerElement.removeEventListener('focus', this.handleFocus);
    triggerElement.removeEventListener('blur', this.handleBlur);
    triggerElement.removeEventListener('keydown', this.handleKeydown as EventListener);
    document.removeEventListener('click', this.handleDocumentClick.bind(this));
  }

  private handleMouseEnter(): void {
    if (this.disabled || this.trigger !== 'hover') return;
    this.show();
  }

  private handleMouseLeave(): void {
    if (this.trigger !== 'hover') return;
    this.hide();
  }

  private handleFocus(): void {
    if (this.disabled || this.trigger !== 'focus') return;
    this.show();
  }

  private handleBlur(): void {
    if (this.trigger !== 'focus') return;
    this.hide();
  }

  private handleClick(e: Event): void {
    if (this.disabled || this.trigger !== 'click') return;
    e.stopPropagation();
    this.toggle();
  }

  private handleDocumentClick(e: Event): void {
    if (!this.isVisible || this.trigger !== 'click') return;
    
    const path = e.composedPath();
    if (!path.includes(this)) {
      this.hide();
    }
  }

  private handleKeydown(e: KeyboardEvent): void {
    if (this.disabled) return;

    if (e.key === 'Escape' && this.isVisible) {
      this.hide();
    }
  }

  private clearTimeouts(): void {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
      this.showTimeout = undefined;
    }
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = undefined;
    }
  }

  private show(): void {
    this.clearTimeouts();
    
    if (this.showDelay > 0) {
      this.showTimeout = window.setTimeout(() => {
        this.isVisible = true;
      }, this.showDelay);
    } else {
      this.isVisible = true;
    }
  }

  private hide(): void {
    this.clearTimeouts();
    
    if (this.hideDelay > 0) {
      this.hideTimeout = window.setTimeout(() => {
        this.isVisible = false;
      }, this.hideDelay);
    } else {
      this.isVisible = false;
    }
  }

  private toggle(): void {
    if (this.isVisible) {
      this.hide();
    } else {
      this.show();
    }
  }

  public showTooltip(): void {
    this.show();
  }

  public hideTooltip(): void {
    this.hide();
  }

  private updatePosition(): void {
    if (this.position === 'auto') {
      this.calculateAutoPosition();
    } else {
      this.actualPosition = this.position;
    }
  }

  private calculateAutoPosition(): void {
    const triggerElement = this.shadowRoot?.querySelector('.tooltip__trigger');
    const contentElement = this.shadowRoot?.querySelector('.tooltip__content');
    
    if (!triggerElement || !contentElement) return;

    const triggerRect = triggerElement.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const positions: Array<'top' | 'right' | 'bottom' | 'left'> = ['top', 'right', 'bottom', 'left'];
    const spaceNeeded = 150; // Approximate tooltip size

    const availableSpace: Record<'top' | 'right' | 'bottom' | 'left', number> = {
      top: triggerRect.top,
      right: viewportWidth - triggerRect.right,
      bottom: viewportHeight - triggerRect.bottom,
      left: triggerRect.left
    };

    let bestPosition: 'top' | 'right' | 'bottom' | 'left' = 'top';
    let maxSpace = 0;

    for (const pos of positions) {
      if (availableSpace[pos] > maxSpace && availableSpace[pos] > spaceNeeded) {
        maxSpace = availableSpace[pos];
        bestPosition = pos;
      }
    }

    this.actualPosition = bestPosition;
  }

  protected render() {
    const startTime = performance.now();

    const contentClasses = {
      'tooltip__content': true,
      [`tooltip__content--${this.variant}`]: true,
      [`tooltip__content--${this.actualPosition}`]: true,
      'tooltip__content--visible': this.isVisible,
      'tooltip__content--max-width': true
    };

    const content = html`
      <div class="tooltip">
        <div 
          class="tooltip__trigger"
          tabindex="0"
          aria-describedby="tooltip-content"
        >
          <slot></slot>
        </div>
        <div 
          id="tooltip-content"
          class=${classMap(contentClasses)}
          style="--tooltip-max-width: ${this.maxWidth}"
          role="tooltip"
          aria-hidden=${!this.isVisible}
        >
          ${this.showArrow ? html`<div class="tooltip__arrow"></div>` : ''}
          ${this.htmlContent 
            ? html`<div class="tooltip__html" .innerHTML=${this.content}></div>`
            : this.content
          }
        </div>
      </div>
    `;

    this.checkPerformance(startTime);
    return content;
  }

  getPossibleActions(): AIAction[] {
    return [
      {
        name: 'show',
        description: 'Show the tooltip',
        available: !this.disabled && !this.isVisible,
        result: 'Displays tooltip content'
      },
      {
        name: 'hide',
        description: 'Hide the tooltip',
        available: !this.disabled && this.isVisible,
        result: 'Hides tooltip content'
      },
      {
        name: 'toggle',
        description: 'Toggle tooltip visibility',
        available: !this.disabled,
        result: 'Toggles tooltip display state'
      }
    ];
  }

  explainState(): AIStateExplanation {
    const states = ['hidden', 'visible', 'disabled'];
    let currentState = 'hidden';
    
    if (this.disabled) currentState = 'disabled';
    else if (this.isVisible) currentState = 'visible';

    return {
      currentState,
      possibleStates: states,
      stateDescription: `Tooltip is ${currentState}. Triggered by ${this.trigger}. Position: ${this.actualPosition}.`,
      transitions: [
        {
          from: 'hidden',
          to: 'visible',
          trigger: `${this.trigger} event`
        },
        {
          from: 'visible',
          to: 'hidden',
          trigger: `Mouse leave, blur, or click outside`
        }
      ],
      visualIndicators: [
        this.isVisible ? 'Tooltip content displayed' : 'Tooltip hidden',
        `${this.variant} theme applied`,
        this.showArrow ? 'Arrow pointing to trigger' : 'No arrow'
      ]
    };
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-tooltip': ForgeTooltip;
  }
}