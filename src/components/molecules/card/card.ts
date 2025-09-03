import { html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { BaseElement } from '../../../core/BaseElement';
import type { AIMetadata, AIAction, AIStateExplanation } from '../../../core/ai-metadata.types';

export type CardVariant = 'default' | 'outlined' | 'elevated' | 'filled';
export type CardSize = 'small' | 'medium' | 'large';

@customElement('forge-card')
export class ForgeCard extends BaseElement {
  static override styles = css`
    ${BaseElement.styles}
    
    :host {
      display: block;
      width: 100%;
    }

    .card {
      position: relative;
      display: flex;
      flex-direction: column;
      background: var(--forge-card-bg, #ffffff);
      border-radius: var(--forge-card-radius, 8px);
      overflow: hidden;
      transition: all 0.3s ease;
    }

    /* Variants */
    .card--default {
      border: 1px solid var(--forge-border-color, #e5e7eb);
    }

    .card--outlined {
      border: 2px solid var(--forge-border-color, #e5e7eb);
    }

    .card--elevated {
      border: none;
      box-shadow: 
        0 1px 3px 0 rgba(0, 0, 0, 0.1),
        0 1px 2px 0 rgba(0, 0, 0, 0.06);
    }

    .card--elevated:hover {
      box-shadow: 
        0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }

    .card--filled {
      border: none;
      background: var(--forge-card-filled-bg, #f3f4f6);
    }

    /* Interactive states */
    .card--clickable {
      cursor: pointer;
    }

    .card--clickable:hover {
      transform: translateY(-2px);
    }

    .card--clickable:active {
      transform: translateY(0);
    }

    .card--selected {
      border-color: var(--forge-primary-color, #3b82f6);
      box-shadow: 0 0 0 3px var(--forge-primary-alpha, rgba(59, 130, 246, 0.1));
    }

    .card--disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    /* Elevation levels */
    .card--elevation-0 {
      box-shadow: none;
    }

    .card--elevation-1 {
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    }

    .card--elevation-2 {
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    .card--elevation-3 {
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }

    .card--elevation-4 {
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }

    .card--elevation-5 {
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }

    /* Size variations */
    .card--small {
      --card-padding: 12px;
    }

    .card--medium {
      --card-padding: 16px;
    }

    .card--large {
      --card-padding: 24px;
    }

    /* Card sections */
    .card__media {
      position: relative;
      width: 100%;
      overflow: hidden;
      background: var(--forge-card-media-bg, #f3f4f6);
    }

    .card__media ::slotted(img),
    .card__media ::slotted(video) {
      width: 100%;
      height: auto;
      display: block;
    }

    .card__media--16-9 {
      aspect-ratio: 16 / 9;
    }

    .card__media--4-3 {
      aspect-ratio: 4 / 3;
    }

    .card__media--1-1 {
      aspect-ratio: 1 / 1;
    }

    .card__header {
      padding: var(--card-padding, 16px);
      border-bottom: 1px solid var(--forge-border-light, #f3f4f6);
    }

    .card__header--no-border {
      border-bottom: none;
    }

    .card__title {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--forge-text-primary, #111827);
    }

    .card__subtitle {
      margin: 4px 0 0;
      font-size: 0.875rem;
      color: var(--forge-text-secondary, #6b7280);
    }

    .card__body {
      flex: 1;
      padding: var(--card-padding, 16px);
    }

    .card__footer {
      padding: var(--card-padding, 16px);
      border-top: 1px solid var(--forge-border-light, #f3f4f6);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .card__footer--no-border {
      border-top: none;
    }

    .card__actions {
      display: flex;
      gap: 8px;
      margin-left: auto;
    }

    /* Loading skeleton */
    .card--loading .card__body {
      position: relative;
      min-height: 100px;
    }

    .card--loading .card__body::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(255, 255, 255, 0.3) 50%,
        transparent 100%
      );
      animation: skeleton-loading 1.5s ease-in-out infinite;
    }

    @keyframes skeleton-loading {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }

    /* Responsive */
    @media (max-width: 640px) {
      .card--large {
        --card-padding: 16px;
      }
    }

    /* Focus styles */
    .card--clickable:focus-visible {
      outline: 2px solid var(--forge-focus-color, #3b82f6);
      outline-offset: 2px;
    }

    /* Slots */
    ::slotted([slot="header"]) {
      display: block;
    }

    ::slotted([slot="footer"]) {
      display: block;
    }

    ::slotted([slot="actions"]) {
      display: flex;
      gap: 8px;
    }
  `;

  @property({ type: String }) variant: CardVariant = 'default';
  @property({ type: String }) size: CardSize = 'medium';
  @property({ type: Number }) elevation = -1; // -1 means use variant default
  @property({ type: Boolean }) clickable = false;
  @property({ type: Boolean }) selected = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) loading = false;
  @property({ type: String }) title = '';
  @property({ type: String }) subtitle = '';
  @property({ type: String, attribute: 'media-aspect' }) mediaAspect = '16-9';
  @property({ type: Boolean, attribute: 'no-header-border' }) noHeaderBorder = false;
  @property({ type: Boolean, attribute: 'no-footer-border' }) noFooterBorder = false;
  @property({ type: String, attribute: 'aria-label' }) override ariaLabel: string | null = null;

  @state() private hasMedia = false;
  @state() private hasHeader = false;
  @state() private hasFooter = false;
  @state() private hasActions = false;

  protected aiMetadata: AIMetadata = {
    purpose: 'Container for structured content with optional media',
    criticality: 'low',
    semanticRole: 'article',
    interactions: [
      {
        type: 'click',
        description: 'Card click interaction',
        outcome: 'Triggers card action if clickable'
      },
      {
        type: 'hover',
        description: 'Hover effect',
        outcome: 'Visual feedback on interactive cards'
      },
      {
        type: 'keyboard',
        description: 'Keyboard navigation',
        shortcuts: ['Enter', 'Space']
      }
    ]
  };

  constructor() {
    super();
    this.addEventListener('click', this.handleClick);
    this.addEventListener('keydown', this.handleKeydown);
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateSlotStatus();
    
    if (this.clickable) {
      this.setAttribute('role', 'button');
      this.setAttribute('tabindex', '0');
    }
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);
    
    // Listen for slot changes
    this.shadowRoot?.querySelectorAll('slot').forEach(slot => {
      slot.addEventListener('slotchange', () => this.updateSlotStatus());
    });
  }

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    
    if (changedProperties.has('clickable')) {
      if (this.clickable) {
        this.setAttribute('role', 'button');
        this.setAttribute('tabindex', '0');
      } else {
        this.removeAttribute('role');
        this.removeAttribute('tabindex');
      }
    }

    if (changedProperties.has('selected')) {
      this.updateComponentState('selected', this.selected);
      this.emit('forge-select', { selected: this.selected });
    }

    if (changedProperties.has('disabled')) {
      this.updateComponentState('disabled', this.disabled);
      this.setAttribute('aria-disabled', String(this.disabled));
    }
  }

  private updateSlotStatus(): void {
    const slots = this.shadowRoot?.querySelectorAll('slot') || [];
    
    slots.forEach(slot => {
      const name = slot.getAttribute('name');
      const hasContent = (slot as HTMLSlotElement).assignedNodes().length > 0;
      
      switch (name) {
        case 'media':
          this.hasMedia = hasContent;
          break;
        case 'header':
          this.hasHeader = hasContent;
          break;
        case 'footer':
          this.hasFooter = hasContent;
          break;
        case 'actions':
          this.hasActions = hasContent;
          break;
      }
    });
  }

  private handleClick(e: Event): void {
    if (this.disabled || !this.clickable) return;
    
    this.emit('forge-click', { 
      originalEvent: e,
      selected: this.selected 
    });
  }

  private handleKeydown(e: KeyboardEvent): void {
    if (this.disabled || !this.clickable) return;
    
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.handleClick(e);
    }
  }

  private getElevationClass(): string {
    if (this.elevation >= 0 && this.elevation <= 5) {
      return `card--elevation-${this.elevation}`;
    }
    
    // Default elevations based on variant
    if (this.variant === 'elevated') {
      return 'card--elevation-2';
    }
    
    return '';
  }

  protected render() {
    const startTime = performance.now();
    
    const classes = {
      'card': true,
      [`card--${this.variant}`]: true,
      [`card--${this.size}`]: true,
      'card--clickable': this.clickable,
      'card--selected': this.selected,
      'card--disabled': this.disabled,
      'card--loading': this.loading,
      [this.getElevationClass()]: this.elevation >= 0 || this.variant === 'elevated'
    };

    const content = html`
      <article 
        class=${classMap(classes)}
        aria-label=${this.ariaLabel || this.title || 'Card'}
        aria-selected=${this.selected}
        aria-disabled=${this.disabled}
        aria-busy=${this.loading}
      >
        <slot name="media" class="card__media card__media--${this.mediaAspect}"></slot>
        
        <slot name="header"></slot>
        ${this.title || this.subtitle ? html`
          <header class="card__header ${this.noHeaderBorder ? 'card__header--no-border' : ''}">
            ${this.title ? html`<h3 class="card__title">${this.title}</h3>` : ''}
            ${this.subtitle ? html`<p class="card__subtitle">${this.subtitle}</p>` : ''}
          </header>
        ` : ''}
        
        <div class="card__body">
          <slot></slot>
        </div>
        
        <slot name="footer"></slot>
        <slot name="actions"></slot>
      </article>
    `;

    this.checkPerformance(startTime);
    return content;
  }

  getPossibleActions(): AIAction[] {
    return [
      {
        name: 'click',
        description: 'Click the card',
        available: this.clickable && !this.disabled,
        result: 'Triggers card action'
      },
      {
        name: 'select',
        description: 'Select/deselect the card',
        available: this.clickable && !this.disabled,
        parameters: [
          {
            name: 'selected',
            type: 'boolean',
            required: true,
            description: 'Selection state'
          }
        ],
        result: 'Changes card selection state'
      },
      {
        name: 'expand',
        description: 'Expand card details',
        available: false, // Could be implemented in future
        result: 'Shows expanded view'
      }
    ];
  }

  explainState(): AIStateExplanation {
    const states = ['default', 'hover', 'selected', 'disabled', 'loading'];
    let currentState = 'default';
    
    if (this.disabled) currentState = 'disabled';
    else if (this.loading) currentState = 'loading';
    else if (this.selected) currentState = 'selected';

    return {
      currentState,
      possibleStates: states,
      stateDescription: `Card is ${currentState}. ${this.clickable ? 'Interactive' : 'Static'} container with ${this.variant} variant.`,
      transitions: [
        {
          from: 'default',
          to: 'selected',
          trigger: 'Click or Enter/Space key'
        },
        {
          from: 'selected',
          to: 'default',
          trigger: 'Click again to deselect'
        }
      ],
      visualIndicators: [
        this.selected ? 'Blue border with shadow' : 'Default border',
        this.clickable ? 'Hover elevation effect' : 'Static appearance',
        this.loading ? 'Skeleton animation' : 'Normal content'
      ]
    };
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-card': ForgeCard;
  }
}