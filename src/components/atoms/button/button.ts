import { html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { BaseElement } from '../../../core/BaseElement';
import type { ButtonVariant, ButtonSize, ButtonType, ForgeButtonProps, ForgeButtonEventDetail } from '../../../types';

@customElement('forge-button')
export class ForgeButton extends BaseElement {
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

  @state() private ripples: Array<{ x: number; y: number; id: number }> = [];

  render() {
    const classes = {
      'button': true,
      [`button--${this.variant}`]: true,
      [`button--${this.size}`]: true,
      'button--loading': this.loading
    };

    return html`
      <button
        class=${classMap(classes)}
        ?disabled=${this.disabled || this.loading}
        type=${this.type}
        @click=${this.handleClick}
        part="button"
        aria-busy=${this.loading ? 'true' : undefined}
        aria-disabled=${this.disabled ? 'true' : undefined}
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
    
    if (changedProperties.has('loading')) {
      if (this.loading) {
        this.announceToScreenReader('Loading, please wait');
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-button': ForgeButton;
  }
}