import { html, css, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from '../../../core/BaseElement';

/**
 * An aspect ratio component that maintains consistent proportions for content.
 * Essential for responsive design and media containers.
 * 
 * @element forge-aspect-ratio
 * 
 * @slot - Default slot for content with aspect ratio
 * 
 * @csspart container - The aspect ratio container element
 * @csspart content - The content wrapper element
 * 
 * @cssprop --forge-aspect-ratio - The aspect ratio value (calculated from ratio property)
 * @cssprop --forge-aspect-ratio-padding - The padding-bottom percentage used for aspect ratio
 */
@customElement('forge-aspect-ratio')
export class ForgeAspectRatio extends BaseElement {
  // Initialize AI metadata
  protected aiMetadata = {
    purpose: 'Aspect ratio maintenance and responsive layout control',
    context: 'layout',
    dataType: undefined,
    criticality: 'medium' as const,
    semanticRole: 'presentation'
  };

  static styles = css`
    :host {
      display: block;
      position: relative;
      width: 100%;
    }

    .aspect-ratio-container {
      position: relative;
      width: 100%;
      height: 0;
      padding-bottom: var(--forge-aspect-ratio-padding, 56.25%); /* 16:9 by default */
      overflow: hidden;
    }

    .aspect-ratio-content {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Common aspect ratio presets */
    :host([ratio="1:1"]) .aspect-ratio-container {
      padding-bottom: 100%; /* Square */
    }

    :host([ratio="16:9"]) .aspect-ratio-container {
      padding-bottom: 56.25%; /* Widescreen */
    }

    :host([ratio="4:3"]) .aspect-ratio-container {
      padding-bottom: 75%; /* Traditional video */
    }

    :host([ratio="3:2"]) .aspect-ratio-container {
      padding-bottom: 66.67%; /* Photo aspect ratio */
    }

    :host([ratio="21:9"]) .aspect-ratio-container {
      padding-bottom: 42.86%; /* Ultra-wide */
    }

    :host([ratio="2:1"]) .aspect-ratio-container {
      padding-bottom: 50%; /* Banner */
    }

    :host([ratio="3:4"]) .aspect-ratio-container {
      padding-bottom: 133.33%; /* Portrait 4:3 */
    }

    :host([ratio="9:16"]) .aspect-ratio-container {
      padding-bottom: 177.78%; /* Portrait 16:9 */
    }

    /* Support for modern CSS aspect-ratio when available */
    @supports (aspect-ratio: 16 / 9) {
      .aspect-ratio-container {
        aspect-ratio: var(--forge-aspect-ratio, 16 / 9);
        height: auto;
        padding-bottom: 0;
      }
    }

    /* Fallback for content overflow */
    .aspect-ratio-content > * {
      max-width: 100%;
      max-height: 100%;
    }

    /* Responsive adjustments */
    @media (max-width: 640px) {
      .aspect-ratio-content {
        /* Ensure content remains accessible on small screens */
        min-height: 0;
      }
    }
  `;

  /**
   * The aspect ratio as a string (e.g., "16:9", "4:3", "1:1")
   */
  @property({ reflect: true })
  ratio: string = '16:9';

  /**
   * Custom aspect ratio value (overrides ratio string)
   */
  @property({ type: Number })
  value: number = 0;

  /**
   * Maximum width constraint (CSS value)
   */
  @property({ attribute: 'max-width' })
  maxWidth: string = '';

  /**
   * Maximum height constraint (CSS value)
   */
  @property({ attribute: 'max-height' })
  maxHeight: string = '';

  /**
   * Whether to center content within the aspect ratio container
   */
  @property({ type: Boolean })
  center: boolean = true;

  /**
   * Object fit behavior for content (fill, contain, cover, none, scale-down)
   */
  @property({ attribute: 'object-fit' })
  objectFit: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down' = 'cover';

  protected firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    
    // Set up accessibility attributes
    this.setAttribute('role', 'presentation');
    
    // Apply initial aspect ratio
    this.updateAspectRatio();
    
    // Apply constraints
    this.updateConstraints();
  }

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    
    if (changedProperties.has('ratio') || changedProperties.has('value')) {
      this.updateAspectRatio();
    }
    
    if (changedProperties.has('maxWidth') || changedProperties.has('maxHeight')) {
      this.updateConstraints();
    }
    
    if (changedProperties.has('objectFit')) {
      this.updateObjectFit();
    }
  }

  private updateAspectRatio(): void {
    let aspectRatio: number;
    let paddingBottom: string;

    if (this.value > 0) {
      // Use custom numeric value
      aspectRatio = this.value;
      paddingBottom = `${100 / aspectRatio}%`;
    } else {
      // Parse ratio string
      const [width, height] = this.parseRatio(this.ratio);
      aspectRatio = width / height;
      paddingBottom = `${(height / width) * 100}%`;
    }

    // Set CSS custom properties
    this.style.setProperty('--forge-aspect-ratio', aspectRatio.toString());
    this.style.setProperty('--forge-aspect-ratio-padding', paddingBottom);

    // For modern browsers with native aspect-ratio support
    if (CSS.supports('aspect-ratio', '16 / 9')) {
      const [width, height] = this.parseRatio(this.ratio);
      this.style.setProperty('--forge-aspect-ratio', `${width} / ${height}`);
    }
  }

  private updateConstraints(): void {
    if (this.maxWidth) {
      this.style.maxWidth = this.maxWidth;
    } else {
      this.style.removeProperty('max-width');
    }

    if (this.maxHeight) {
      this.style.maxHeight = this.maxHeight;
    } else {
      this.style.removeProperty('max-height');
    }
  }

  private updateObjectFit(): void {
    const contentElement = this.shadowRoot?.querySelector('.aspect-ratio-content') as HTMLElement;
    if (contentElement) {
      // Apply object-fit style to direct children
      const children = contentElement.children;
      for (let i = 0; i < children.length; i++) {
        const child = children[i] as HTMLElement;
        if (child.tagName === 'IMG' || child.tagName === 'VIDEO') {
          child.style.objectFit = this.objectFit;
          child.style.width = '100%';
          child.style.height = '100%';
        }
      }
    }
  }

  private parseRatio(ratio: string): [number, number] {
    const parts = ratio.split(':').map(part => parseFloat(part.trim()));
    
    if (parts.length === 2 && parts.every(part => !isNaN(part) && part > 0)) {
      return [parts[0], parts[1]];
    }
    
    // Default to 16:9 for invalid ratios
    console.warn(`Invalid aspect ratio "${ratio}". Using default 16:9.`);
    return [16, 9];
  }

  /**
   * Get the calculated aspect ratio as a number
   */
  getAspectRatio(): number {
    if (this.value > 0) {
      return this.value;
    }
    
    const [width, height] = this.parseRatio(this.ratio);
    return width / height;
  }

  /**
   * Get the calculated padding-bottom percentage
   */
  getPaddingBottom(): string {
    const [width, height] = this.parseRatio(this.ratio);
    return `${(height / width) * 100}%`;
  }

  /**
   * Set aspect ratio from width and height values
   */
  setRatio(width: number, height: number): void {
    if (width > 0 && height > 0) {
      this.ratio = `${width}:${height}`;
    }
  }

  protected render() {
    const containerClasses = ['aspect-ratio-container'];
    const contentClasses = ['aspect-ratio-content'];
    
    if (!this.center) {
      contentClasses.push('no-center');
    }

    return html`
      <div class=${containerClasses.join(' ')} part="container">
        <div class=${contentClasses.join(' ')} part="content">
          <slot></slot>
        </div>
      </div>
    `;
  }

  // AI Integration Methods
  override explainState() {
    const aspectRatio = this.getAspectRatio();
    const isCustom = this.value > 0;
    
    return {
      currentState: isCustom ? 'custom' : 'preset',
      possibleStates: ['preset', 'custom'],
      stateDescription: this.getStateDescription(isCustom, aspectRatio)
    };
  }

  private getStateDescription(isCustom: boolean, aspectRatio: number): string {
    const [width, height] = this.parseRatio(this.ratio);
    
    if (isCustom) {
      return `Custom aspect ratio of ${aspectRatio.toFixed(2)} (${this.value}), ${width}:${height} equivalent`;
    } else {
      return `Preset aspect ratio of ${this.ratio} (${aspectRatio.toFixed(2)}), maintaining ${width}:${height} proportions`;
    }
  }

  override getPossibleActions() {
    return [
      {
        name: 'setRatio',
        description: 'Set aspect ratio from width and height values',
        available: true
      },
      {
        name: 'updateConstraints',
        description: 'Update maximum width and height constraints',
        available: true
      },
      {
        name: 'getAspectRatio',
        description: 'Get the calculated aspect ratio value',
        available: true
      }
    ];
  }

  override get aiState() {
    const aspectRatio = this.getAspectRatio();
    const [width, height] = this.parseRatio(this.ratio);
    
    return {
      ...super.aiState,
      ratio: this.ratio,
      value: this.value,
      calculatedAspectRatio: aspectRatio,
      calculatedPadding: this.getPaddingBottom(),
      dimensions: {
        width: width,
        height: height,
        aspectRatio: aspectRatio
      },
      maxWidth: this.maxWidth,
      maxHeight: this.maxHeight,
      center: this.center,
      objectFit: this.objectFit,
      supportsNativeAspectRatio: CSS.supports('aspect-ratio', '16 / 9')
    };
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-aspect-ratio': ForgeAspectRatio;
  }
}