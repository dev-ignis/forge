import { html, css, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from '../../../core/BaseElement';

/**
 * A skeleton loading component for showing loading placeholders.
 * Essential for modern perceived performance and user experience.
 * 
 * @element forge-skeleton
 * 
 * @csspart container - The skeleton container element
 * 
 * @cssprop --forge-skeleton-base - Base color of the skeleton
 * @cssprop --forge-skeleton-highlight - Highlight color for shimmer effect
 * @cssprop --forge-skeleton-animation-duration - Duration of shimmer animation
 * @cssprop --forge-skeleton-border-radius - Border radius of the skeleton
 */
@customElement('forge-skeleton')
export class ForgeSkeleton extends BaseElement {
  // Initialize AI metadata
  protected aiMetadata = {
    purpose: 'Loading state placeholder and perceived performance enhancement',
    context: 'loading',
    dataType: undefined,
    criticality: 'low' as const,
    semanticRole: 'presentation'
  };

  static styles = css`
    :host {
      display: block;
      --forge-skeleton-base: var(--color-gray-200, #e5e7eb);
      --forge-skeleton-highlight: var(--color-gray-50, #f9fafb);
      --forge-skeleton-animation-duration: 2s;
      --forge-skeleton-border-radius: var(--radius-sm, 4px);
    }

    .skeleton {
      background: linear-gradient(
        90deg,
        var(--forge-skeleton-base) 0%,
        var(--forge-skeleton-highlight) 50%,
        var(--forge-skeleton-base) 100%
      );
      background-size: 200% 100%;
      animation: shimmer var(--forge-skeleton-animation-duration) ease-in-out infinite;
      border-radius: var(--forge-skeleton-border-radius);
      width: var(--skeleton-width, 100%);
      height: var(--skeleton-height, 1em);
      min-height: var(--skeleton-min-height, 16px);
    }

    @keyframes shimmer {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }

    /* Shape variants */
    :host([shape="circle"]) .skeleton {
      border-radius: 50%;
      aspect-ratio: 1;
    }

    :host([shape="rounded"]) .skeleton {
      border-radius: var(--forge-skeleton-border-radius);
    }

    :host([shape="square"]) .skeleton {
      border-radius: 0;
    }

    /* Size variants */
    :host([size="xs"]) {
      --skeleton-height: 12px;
    }

    :host([size="sm"]) {
      --skeleton-height: 16px;
    }

    :host([size="md"]) {
      --skeleton-height: 20px;
    }

    :host([size="lg"]) {
      --skeleton-height: 24px;
    }

    :host([size="xl"]) {
      --skeleton-height: 32px;
    }

    /* Disable animation when reduced motion is preferred */
    @media (prefers-reduced-motion: reduce) {
      .skeleton {
        animation: none;
        background: var(--forge-skeleton-base);
      }
    }

    /* Custom dimensions */
    :host([width]) {
      --skeleton-width: attr(width);
    }

    :host([height]) {
      --skeleton-height: attr(height);
    }
  `;

  /**
   * Width of the skeleton (CSS value)
   */
  @property()
  width: string = '';

  /**
   * Height of the skeleton (CSS value)
   */
  @property()
  height: string = '';

  /**
   * Shape variant of the skeleton
   */
  @property({ reflect: true })
  shape: 'rounded' | 'square' | 'circle' = 'rounded';

  /**
   * Size preset for the skeleton
   */
  @property({ reflect: true })
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /**
   * Whether to disable the shimmer animation
   */
  @property({ type: Boolean, attribute: 'no-animation' })
  noAnimation: boolean = false;

  /**
   * Accessible label for screen readers
   */
  @property({ attribute: 'aria-label' })
  ariaLabel: string = 'Loading content';

  protected firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    
    // Set up accessibility attributes
    this.setAttribute('aria-busy', 'true');
    this.setAttribute('aria-label', this.ariaLabel);
    this.setAttribute('role', 'presentation');
    
    // Apply custom dimensions if provided
    this.updateDimensions();
  }

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    
    if (changedProperties.has('width') || changedProperties.has('height')) {
      this.updateDimensions();
    }
    
    if (changedProperties.has('ariaLabel')) {
      this.setAttribute('aria-label', this.ariaLabel);
    }
  }

  private updateDimensions(): void {
    if (this.width) {
      this.style.setProperty('--skeleton-width', this.width);
    }
    if (this.height) {
      this.style.setProperty('--skeleton-height', this.height);
    }
  }

  protected render() {
    const skeletonStyles: Record<string, string> = {};
    
    if (this.noAnimation) {
      skeletonStyles['animation'] = 'none';
      skeletonStyles['background'] = 'var(--forge-skeleton-base)';
    }

    return html`
      <div 
        class="skeleton" 
        part="container"
        style=${Object.entries(skeletonStyles).map(([key, value]) => `${key}: ${value}`).join('; ')}
      ></div>
    `;
  }

  // AI Integration Methods
  override explainState() {
    const states = [];
    if (this.noAnimation) states.push('static');
    else states.push('animated');
    
    const currentState = states.join('-') || 'animated';
    
    return {
      currentState,
      possibleStates: ['animated', 'static'],
      stateDescription: this.getStateDescription(currentState)
    };
  }

  private getStateDescription(state: string): string {
    const descriptions: Record<string, string> = {
      'animated': `Animated skeleton placeholder with shimmer effect, ${this.shape} shape, ${this.size} size`,
      'static': `Static skeleton placeholder without animation, ${this.shape} shape, ${this.size} size`
    };
    
    return descriptions[state] || `Skeleton in ${state} state. Shape: ${this.shape}, Size: ${this.size}`;
  }

  override getPossibleActions() {
    return [
      {
        name: 'toggleAnimation',
        description: 'Toggle shimmer animation on/off',
        available: true
      },
      {
        name: 'updateDimensions',
        description: 'Update skeleton width and height',
        available: true
      }
    ];
  }

  override get aiState() {
    return {
      ...super.aiState,
      width: this.width,
      height: this.height,
      shape: this.shape,
      size: this.size,
      noAnimation: this.noAnimation,
      dimensions: {
        computedWidth: getComputedStyle(this).width,
        computedHeight: getComputedStyle(this).height
      }
    };
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-skeleton': ForgeSkeleton;
  }
}