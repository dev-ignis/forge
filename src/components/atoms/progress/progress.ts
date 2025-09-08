import { html, css, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { BaseElement } from '../../../core/BaseElement';

/**
 * A linear progress component for showing file upload progress, loading states, or task completion.
 * Supports determinate and indeterminate states with customizable colors and sizes.
 * 
 * @element forge-progress
 * 
 * @slot - The text content displayed alongside the progress bar
 * 
 * @csspart container - The progress container element
 * @csspart track - The progress track background
 * @csspart fill - The progress fill element
 * @csspart label - The progress label text
 * 
 * @cssprop --forge-progress-height - Height of the progress bar
 * @cssprop --forge-progress-radius - Border radius of the progress bar
 * @cssprop --forge-progress-bg - Background color of the progress track
 * @cssprop --forge-progress-fill - Fill color of the progress bar
 */
@customElement('forge-progress')
export class ForgeProgress extends BaseElement {
  // Initialize AI metadata
  protected aiMetadata = {
    purpose: 'Progress indication and loading state visualization',
    context: 'status',
    dataType: 'number' as const,
    criticality: 'medium' as const,
    semanticRole: 'progressbar'
  };

  static styles = css`
    :host {
      display: block;
      --forge-progress-height: var(--size-2, 8px);
      --forge-progress-radius: var(--radius-full, 9999px);
      --forge-progress-bg: var(--color-gray-200, #e5e7eb);
      --forge-progress-fill: var(--color-primary-500, #3b82f6);
      --forge-progress-animation-duration: 2s;
    }

    .progress-container {
      display: flex;
      flex-direction: column;
      gap: var(--forge-spacing-xs, 4px);
    }

    .progress-track {
      width: 100%;
      height: var(--forge-progress-height);
      background-color: var(--forge-progress-bg);
      border-radius: var(--forge-progress-radius);
      overflow: hidden;
      position: relative;
    }

    .progress-fill {
      height: 100%;
      background-color: var(--forge-progress-fill);
      border-radius: var(--forge-progress-radius);
      transition: width 300ms ease-out;
      position: relative;
    }

    .progress-fill--indeterminate {
      width: 100%;
      animation: indeterminate var(--forge-progress-animation-duration) ease-in-out infinite;
      transform-origin: left;
    }

    .progress-label {
      font-size: var(--forge-font-size-sm, 14px);
      color: var(--forge-color-text-secondary, #6b7280);
      text-align: left;
    }

    /* Size variants */
    :host([size="small"]) {
      --forge-progress-height: 4px;
    }

    :host([size="medium"]) {
      --forge-progress-height: 8px;
    }

    :host([size="large"]) {
      --forge-progress-height: 12px;
    }

    /* Variant colors */
    :host([variant="primary"]) {
      --forge-progress-fill: var(--color-primary-500, #3b82f6);
    }

    :host([variant="secondary"]) {
      --forge-progress-fill: var(--color-secondary-500, #6b7280);
    }

    :host([variant="success"]) {
      --forge-progress-fill: var(--color-success-500, #10b981);
    }

    :host([variant="warning"]) {
      --forge-progress-fill: var(--color-warning-500, #f59e0b);
    }

    :host([variant="danger"]) {
      --forge-progress-fill: var(--color-danger-500, #ef4444);
    }

    /* Animations */
    @keyframes indeterminate {
      0% {
        transform: translateX(-100%) scaleX(0.3);
      }
      50% {
        transform: translateX(0%) scaleX(0.6);
      }
      100% {
        transform: translateX(100%) scaleX(0.3);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .progress-fill {
        transition: none;
      }
      
      .progress-fill--indeterminate {
        animation: none;
        width: 30%;
      }
    }
  `;

  /**
   * The current progress value (0-100)
   */
  @property({ type: Number })
  value: number = 0;

  /**
   * The maximum progress value
   */
  @property({ type: Number })
  max: number = 100;

  /**
   * Visual variant of the progress bar
   */
  @property({ reflect: true })
  variant: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' = 'primary';

  /**
   * Size of the progress bar
   */
  @property({ reflect: true })
  size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * Whether the progress is in indeterminate state (loading without known duration)
   */
  @property({ type: Boolean, reflect: true })
  indeterminate: boolean = false;

  /**
   * Accessible label for the progress bar
   */
  @property({ attribute: 'aria-label', reflect: true })
  ariaLabel: string = '';

  protected firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    
    // Set up accessibility attributes
    this.setAttribute('role', 'progressbar');
    this.updateAccessibilityAttributes();
  }

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    
    if (changedProperties.has('value') || 
        changedProperties.has('max') || 
        changedProperties.has('indeterminate')) {
      this.updateAccessibilityAttributes();
    }
  }

  private updateAccessibilityAttributes(): void {
    if (this.indeterminate) {
      this.removeAttribute('aria-valuenow');
      this.removeAttribute('aria-valuetext');
      this.setAttribute('aria-valuemin', '0');
      this.setAttribute('aria-valuemax', this.max.toString());
    } else {
      this.setAttribute('aria-valuenow', this.value.toString());
      this.setAttribute('aria-valuemin', '0');
      this.setAttribute('aria-valuemax', this.max.toString());
      this.setAttribute('aria-valuetext', `${this.value} of ${this.max}`);
    }

    if (this.ariaLabel) {
      this.setAttribute('aria-label', this.ariaLabel);
    }
  }

  private getProgressPercentage(): number {
    if (this.indeterminate) return 0;
    return Math.min(Math.max((this.value / this.max) * 100, 0), 100);
  }

  protected render() {
    const fillClasses = {
      'progress-fill': true,
      'progress-fill--indeterminate': this.indeterminate
    };

    const progressStyle = this.indeterminate 
      ? '' 
      : `width: ${this.getProgressPercentage()}%`;

    return html`
      <div class="progress-container" part="container">
        <div class="progress-track" part="track">
          <div 
            class=${classMap(fillClasses)} 
            part="fill"
            style=${progressStyle}
          ></div>
        </div>
        ${this.renderLabel()}
      </div>
    `;
  }

  private renderLabel() {
    const hasSlotContent = this.innerHTML && this.innerHTML.trim();
    
    if (!hasSlotContent && !this.indeterminate) {
      return html`
        <div class="progress-label" part="label">
          ${this.value}%
        </div>
      `;
    }

    if (hasSlotContent) {
      return html`
        <div class="progress-label" part="label">
          <slot></slot>
        </div>
      `;
    }

    return '';
  }

  /**
   * Updates the progress value
   * @param value New progress value
   */
  updateProgress(value: number): void {
    this.value = Math.min(Math.max(value, 0), this.max);
  }

  /**
   * Sets the progress to indeterminate state
   */
  setIndeterminate(): void {
    this.indeterminate = true;
  }

  /**
   * Sets the progress to determinate state with a specific value
   * @param value Progress value to set
   */
  setDeterminate(value: number = this.value): void {
    this.indeterminate = false;
    this.updateProgress(value);
  }

  // AI Integration Methods
  override explainState() {
    const states = [];
    if (this.indeterminate) states.push('indeterminate');
    else if (this.value === 0) states.push('not-started');
    else if (this.value >= this.max) states.push('complete');
    else states.push('in-progress');
    
    const currentState = states.join('-') || 'not-started';
    
    return {
      currentState,
      possibleStates: ['not-started', 'in-progress', 'complete', 'indeterminate'],
      stateDescription: this.getStateDescription(currentState)
    };
  }

  private getStateDescription(state: string): string {
    const descriptions: Record<string, string> = {
      'not-started': `Progress bar at 0%, ready to show progress`,
      'in-progress': `Progress bar at ${this.getProgressPercentage().toFixed(1)}% (${this.value}/${this.max})`,
      'complete': `Progress bar complete at 100% (${this.value}/${this.max})`,
      'indeterminate': `Progress bar in loading state without specific completion percentage`
    };
    
    return descriptions[state] || `Progress bar in ${state} state. Variant: ${this.variant}, Size: ${this.size}`;
  }

  override getPossibleActions() {
    return [
      {
        name: 'updateProgress',
        description: 'Update the progress value',
        available: !this.indeterminate
      },
      {
        name: 'setIndeterminate', 
        description: 'Switch to indeterminate loading state',
        available: !this.indeterminate
      },
      {
        name: 'setDeterminate',
        description: 'Switch to determinate progress state',
        available: this.indeterminate
      }
    ];
  }

  override get aiState() {
    return {
      ...super.aiState,
      value: this.value,
      max: this.max,
      percentage: this.getProgressPercentage(),
      variant: this.variant,
      size: this.size,
      indeterminate: this.indeterminate,
      complete: !this.indeterminate && this.value >= this.max
    };
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-progress': ForgeProgress;
  }
}