import { html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { BaseElement } from '../../../core/BaseElement';
import type { ButtonVariant, ButtonSize, ButtonType, ForgeButtonProps, ForgeButtonEventDetail } from '../../../types';

@customElement('forge-button')
export class ForgeButton extends BaseElement {
  // Initialize AI metadata
  protected aiMetadata = {
    purpose: 'User interaction trigger',
    context: 'action',
    dataType: undefined,  // Button doesn't have data type
    criticality: 'medium' as const,
    semanticRole: 'button'
  };

  static styles = css`
    :host {
      display: inline-block;
      --button-height-sm: 32px;
      --button-height-md: 40px;
      --button-height-lg: 48px;
      --button-padding-sm: 0 12px;
      --button-padding-md: 0 16px;
      --button-padding-lg: 0 20px;
    }

    .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--forge-spacing-sm);
      font-family: var(--forge-font-family);
      font-size: var(--forge-font-size-base);
      font-weight: 500;
      border: none;
      border-radius: var(--forge-border-radius-md);
      cursor: pointer;
      transition: all var(--forge-transition-fast);
      width: 100%;
      height: var(--button-height-md);
      padding: var(--button-padding-md);
      position: relative;
      overflow: hidden;
    }

    /* Variants */
    .button--primary {
      background-color: var(--forge-color-primary-500);
      color: white;
    }

    .button--primary:hover:not(:disabled) {
      background-color: var(--forge-color-primary-600);
    }

    .button--secondary {
      background-color: transparent;
      color: var(--forge-color-primary-500);
      border: 1px solid var(--forge-color-primary-500);
    }

    .button--secondary:hover:not(:disabled) {
      background-color: var(--forge-color-primary-50);
    }

    .button--danger {
      background-color: var(--forge-color-error);
      color: white;
    }

    .button--danger:hover:not(:disabled) {
      filter: brightness(0.9);
    }

    /* Sizes */
    .button--sm {
      height: var(--button-height-sm);
      padding: var(--button-padding-sm);
      font-size: var(--forge-font-size-sm);
    }

    .button--lg {
      height: var(--button-height-lg);
      padding: var(--button-padding-lg);
      font-size: var(--forge-font-size-lg);
    }

    /* States */
    .button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .button--loading {
      color: transparent;
    }

    .spinner {
      position: absolute;
      width: 16px;
      height: 16px;
      border: 2px solid currentColor;
      border-right-color: transparent;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* Focus styles */
    .button:focus-visible {
      outline: 2px solid var(--forge-color-primary-500);
      outline-offset: 2px;
    }

    /* Ripple effect */
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
    }

    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;

  @property({ type: String }) variant: ButtonVariant = 'primary';
  @property({ type: String }) size: ButtonSize = 'md';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) loading = false;
  @property({ type: String }) type: ButtonType = 'button';
  @property({ type: Boolean }) fullWidth = false;
  @property({ type: String }) iconStart?: string;
  @property({ type: String }) iconEnd?: string;
  
  // Note: AI-Ready, Performance, and Developer properties are inherited from BaseElement

  @state() private ripples: Array<{ x: number; y: number; id: number }> = [];
  @state() private renderMetrics = { time: 0, violations: 0 };

  connectedCallback() {
    super.connectedCallback();
    
    // Initialize component state for AI tracking
    this.updateComponentState('variant', this.variant);
    this.updateComponentState('size', this.size);
    this.updateComponentState('disabled', this.disabled);
    this.updateComponentState('loading', this.loading);
  }

  render() {
    const classes = {
      'button': true,
      [`button--${this.variant}`]: true,
      [`button--${this.size}`]: true,
      'button--loading': this.loading
    };

    // Performance monitoring start
    const renderStart = performance.now();
    
    const button = html`
      <button
        class=${classMap(classes)}
        ?disabled=${this.disabled || this.loading}
        type=${this.type}
        @click=${this.handleClick}
        part="button"
        aria-busy=${this.loading ? 'true' : undefined}
        aria-disabled=${this.disabled ? 'true' : undefined}
        aria-description=${this.ariaDescription || this.getDefaultAriaDescription()}
        data-semantic-role=${this.semanticRole || this.getDefaultSemanticRole()}
        data-ai-context=${this.aiContext || this.getDefaultAiContext()}
      >
        ${this.loading ? html`<span class="spinner" aria-label="Loading"></span>` : ''}
        <slot></slot>
        ${this.ripples.map(ripple => html`
          <span 
            class="ripple" 
            style="left: ${ripple.x}px; top: ${ripple.y}px;"
            @animationend=${() => this.removeRipple(ripple.id)}
          ></span>
        `)}
      </button>
    `;
    
    // Performance monitoring end
    const renderEnd = performance.now();
    this.checkPerformance(renderEnd - renderStart);
    
    // Developer mode metrics display
    if (this.devMode && this.showMetrics) {
      return html`
        <div style="position: relative; display: inline-block;">
          ${button}
          <div style="position: absolute; top: -20px; right: 0; font-size: 10px; background: rgba(0,0,0,0.8); color: white; padding: 2px 4px; border-radius: 2px; z-index: 1000;">
            ${this.renderMetrics.time.toFixed(2)}ms
            ${this.renderMetrics.violations > 0 ? html`<span style="color: red;"> ⚠️ ${this.renderMetrics.violations}</span>` : ''}
          </div>
        </div>
      `;
    }
    
    return button;
  }

  private handleClick(e: MouseEvent) {
    if (!this.disabled && !this.loading) {
      // Add ripple effect
      const rect = this.getBoundingClientRect();
      const ripple = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        id: Date.now()
      };
      this.ripples = [...this.ripples, ripple];

      // Emit custom click event with detail
      const detail: ForgeButtonEventDetail = {
        variant: this.variant,
        size: this.size
      };
      this.emit('click', detail);
    }
  }

  private removeRipple(id: number) {
    this.ripples = this.ripples.filter(r => r.id !== id);
  }

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    
    // Update AI state tracking
    if (changedProperties.has('variant')) {
      this.updateComponentState('variant', this.variant);
      this.aiMetadata.semanticRole = this.getDefaultSemanticRole();
    }
    
    if (changedProperties.has('size')) {
      this.updateComponentState('size', this.size);
    }
    
    if (changedProperties.has('disabled')) {
      this.updateComponentState('disabled', this.disabled);
      // Keep criticality as medium since it's const
    }
    
    if (changedProperties.has('loading')) {
      this.updateComponentState('loading', this.loading);
      if (this.loading) {
        this.announceToScreenReader('Loading, please wait');
      }
    }
    
    // Log component state for AI debugging if in dev mode
    if (this.devMode) {
      console.debug('ForgeButton state:', {
        variant: this.variant,
        size: this.size,
        disabled: this.disabled,
        loading: this.loading,
        semanticRole: this.semanticRole,
        aiContext: this.aiContext,
        renderTime: this.renderMetrics.time
      });
    }
  }
  
  private getDefaultSemanticRole(): string {
    switch(this.variant) {
      case 'primary': return 'primary-action';
      case 'secondary': return 'secondary-action';
      case 'danger': return 'destructive-action';
      default: return 'action';
    }
  }
  
  private getDefaultAiContext(): string {
    if (this.type === 'submit') return 'form-submission';
    if (this.variant === 'danger') return 'confirmation-required';
    return 'user-interaction';
  }
  
  private getDefaultAriaDescription(): string {
    const parts = [];
    if (this.variant) parts.push(`${this.variant} button`);
    if (this.size !== 'md') parts.push(`${this.size} size`);
    if (this.loading) parts.push('currently loading');
    if (this.disabled) parts.push('disabled');
    return parts.join(', ') || 'Interactive button';
  }

  // Override AI methods from BaseElement
  getPossibleActions() {
    return [
      {
        name: 'click',
        description: 'Trigger button action',
        available: !this.disabled && !this.loading
      },
      {
        name: 'focus',
        description: 'Focus the button',
        available: !this.disabled
      },
      {
        name: 'disable',
        description: 'Disable the button',
        available: !this.disabled
      },
      {
        name: 'enable',
        description: 'Enable the button',
        available: this.disabled
      }
    ];
  }

  explainState() {
    const states = [];
    if (this.disabled) states.push('disabled');
    if (this.loading) states.push('loading');
    if (!this.disabled && !this.loading) states.push('ready');
    
    const currentState = states.join('-') || 'ready';
    
    return {
      currentState,
      possibleStates: ['ready', 'loading', 'disabled', 'disabled-loading'],
      stateDescription: this.getStateDescription(currentState)
    };
  }

  private getStateDescription(state: string): string {
    const descriptions: Record<string, string> = {
      'ready': `${this.variant} button ready for interaction`,
      'loading': 'Button is processing, please wait',
      'disabled': 'Button is disabled and cannot be clicked',
      'disabled-loading': 'Button is disabled while processing'
    };
    return descriptions[state] || 'Button state';
  }
  
  protected checkPerformance(renderTime: number): void {
    this.renderMetrics.time = renderTime;
    
    if (renderTime > this.maxRenderMs) {
      this.renderMetrics.violations++;
      
      if (this.warnOnViolation) {
        console.warn(`ForgeButton render exceeded budget: ${renderTime.toFixed(2)}ms > ${this.maxRenderMs}ms`, {
          variant: this.variant,
          size: this.size,
          performanceMode: this.performanceMode
        });
      }
      
      // Auto-degrade performance if in auto mode
      if (this.performanceMode === 'auto' && this.renderMetrics.violations > 3) {
        this.performanceMode = 'fast';
        console.info('ForgeButton: Switching to fast performance mode due to violations');
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-button': ForgeButton;
  }
}