import { html, css, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from '../../../core/BaseElement';

/**
 * A circular progress component for showing progress in a compact, circular format.
 * Perfect for upload progress, loading indicators, and completion status.
 * 
 * @element forge-progress-circle
 * 
 * @slot - The text content displayed in the center of the circle
 * 
 * @csspart container - The circular progress container
 * @csspart svg - The SVG element containing the progress rings
 * @csspart track - The background track circle
 * @csspart fill - The progress fill circle
 * @csspart label - The center label text
 * 
 * @cssprop --forge-progress-circle-size - Size of the circular progress
 * @cssprop --forge-progress-circle-stroke - Stroke width of the progress ring
 * @cssprop --forge-progress-circle-track - Color of the background track
 * @cssprop --forge-progress-circle-fill - Color of the progress fill
 */
@customElement('forge-progress-circle')
export class ForgeProgressCircle extends BaseElement {
  // Initialize AI metadata
  protected aiMetadata = {
    purpose: 'Circular progress indication and loading state visualization',
    context: 'status',
    dataType: 'number' as const,
    criticality: 'medium' as const,
    semanticRole: 'progressbar'
  };

  static styles = css`
    :host {
      display: inline-block;
      --forge-progress-circle-size: 64px;
      --forge-progress-circle-stroke: 4px;
      --forge-progress-circle-track: var(--color-gray-200, #e5e7eb);
      --forge-progress-circle-fill: var(--color-primary-500, #3b82f6);
    }

    .progress-container {
      position: relative;
      width: var(--forge-progress-circle-size);
      height: var(--forge-progress-circle-size);
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .progress-svg {
      width: 100%;
      height: 100%;
      transform: rotate(-90deg);
    }

    .progress-track {
      fill: none;
      stroke: var(--forge-progress-circle-track);
      stroke-width: var(--forge-progress-circle-stroke);
    }

    .progress-fill {
      fill: none;
      stroke: var(--forge-progress-circle-fill);
      stroke-width: var(--forge-progress-circle-stroke);
      stroke-linecap: round;
      transition: stroke-dashoffset 300ms ease-out;
    }

    .progress-fill--indeterminate {
      animation: rotate 1.5s linear infinite;
    }

    .progress-label {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: var(--forge-font-size-sm, 14px);
      font-weight: 500;
      color: var(--forge-color-text-primary, #111827);
      text-align: center;
      line-height: 1.2;
    }

    /* Size variants */
    :host([size="small"]) {
      --forge-progress-circle-size: 32px;
      --forge-progress-circle-stroke: 3px;
    }

    :host([size="small"]) .progress-label {
      font-size: var(--forge-font-size-xs, 12px);
    }

    :host([size="medium"]) {
      --forge-progress-circle-size: 48px;
      --forge-progress-circle-stroke: 4px;
    }

    :host([size="large"]) {
      --forge-progress-circle-size: 80px;
      --forge-progress-circle-stroke: 6px;
    }

    :host([size="large"]) .progress-label {
      font-size: var(--forge-font-size-base, 16px);
    }

    /* Variant colors */
    :host([variant="primary"]) {
      --forge-progress-circle-fill: var(--color-primary-500, #3b82f6);
    }

    :host([variant="secondary"]) {
      --forge-progress-circle-fill: var(--color-secondary-500, #6b7280);
    }

    :host([variant="success"]) {
      --forge-progress-circle-fill: var(--color-success-500, #10b981);
    }

    :host([variant="warning"]) {
      --forge-progress-circle-fill: var(--color-warning-500, #f59e0b);
    }

    :host([variant="danger"]) {
      --forge-progress-circle-fill: var(--color-danger-500, #ef4444);
    }

    /* Animations */
    @keyframes rotate {
      from {
        transform: rotate(-90deg);
      }
      to {
        transform: rotate(270deg);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .progress-fill {
        transition: none;
      }
      
      .progress-fill--indeterminate {
        animation: none;
      }
    }

    /* Hide label when requested */
    :host([hide-label]) .progress-label {
      display: none;
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
   * Visual variant of the progress circle
   */
  @property({ reflect: true })
  variant: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' = 'primary';

  /**
   * Size of the progress circle
   */
  @property({ reflect: true })
  size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * Stroke width of the progress ring (overrides variant defaults)
   */
  @property({ type: Number, attribute: 'stroke-width' })
  strokeWidth?: number;

  /**
   * Whether to show the label in the center
   */
  @property({ type: Boolean, attribute: 'show-label', reflect: true })
  showLabel: boolean = true;

  /**
   * Whether to hide the label (overrides show-label)
   */
  @property({ type: Boolean, attribute: 'hide-label', reflect: true })
  hideLabel: boolean = false;

  /**
   * Whether the progress is in indeterminate state (loading without known duration)
   */
  @property({ type: Boolean, reflect: true })
  indeterminate: boolean = false;

  /**
   * Accessible label for the progress circle
   */
  @property({ attribute: 'aria-label', reflect: true })
  ariaLabel: string = '';

  private radius = 20;
  private circumference = 2 * Math.PI * this.radius;

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
    if (this.indeterminate) return 25; // Show partial progress for indeterminate
    return Math.min(Math.max((this.value / this.max) * 100, 0), 100);
  }

  private getStrokeDashOffset(): number {
    const percentage = this.getProgressPercentage();
    return this.circumference - (percentage / 100) * this.circumference;
  }

  protected render() {
    const strokeDashoffset = this.getStrokeDashOffset();
    const fillClasses = this.indeterminate ? 'progress-fill progress-fill--indeterminate' : 'progress-fill';

    return html`
      <div class="progress-container" part="container">
        <svg class="progress-svg" part="svg" viewBox="0 0 44 44">
          <!-- Background track -->
          <circle
            class="progress-track"
            part="track"
            cx="22"
            cy="22"
            r="${this.radius}"
          ></circle>
          
          <!-- Progress fill -->
          <circle
            class="${fillClasses}"
            part="fill"
            cx="22"
            cy="22"
            r="${this.radius}"
            stroke-dasharray="${this.circumference}"
            stroke-dashoffset="${strokeDashoffset}"
          ></circle>
        </svg>
        
        ${this.renderLabel()}
      </div>
    `;
  }

  private renderLabel() {
    if (this.hideLabel || !this.showLabel) {
      return '';
    }

    const hasSlotContent = this.innerHTML && this.innerHTML.trim();
    
    if (!hasSlotContent && !this.indeterminate) {
      return html`
        <div class="progress-label" part="label">
          ${Math.round(this.getProgressPercentage())}%
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

    if (this.indeterminate) {
      return html`
        <div class="progress-label" part="label">
          ...
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
      'not-started': `Circular progress at 0%, ready to show progress`,
      'in-progress': `Circular progress at ${this.getProgressPercentage().toFixed(1)}% (${this.value}/${this.max})`,
      'complete': `Circular progress complete at 100% (${this.value}/${this.max})`,
      'indeterminate': `Circular progress in loading state without specific completion percentage`
    };
    
    return descriptions[state] || `Circular progress in ${state} state. Variant: ${this.variant}, Size: ${this.size}`;
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
      complete: !this.indeterminate && this.value >= this.max,
      showLabel: this.showLabel && !this.hideLabel
    };
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-progress-circle': ForgeProgressCircle;
  }
}