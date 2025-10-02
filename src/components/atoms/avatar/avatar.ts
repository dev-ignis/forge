import { html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { BaseElement } from '../../../core/BaseElement';
import type { AIMetadata, AIAction, AIStateExplanation } from '../../../core/ai-metadata.types';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away' | 'none';
export type StatusPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
export type AvatarShape = 'circle' | 'square' | 'rounded';

/**
 * @event forge-avatar-click - Fired when a clickable avatar is clicked
 */
@customElement('forge-avatar')
export class ForgeAvatar extends BaseElement {
  // Initialize AI metadata
  protected aiMetadata: AIMetadata = {
    purpose: 'User identity display with image or initials',
    context: 'profile',
    dataType: 'image',
    criticality: 'low',
    semanticRole: 'img',
  };

  static styles = css`
    ${BaseElement.styles}

    :host {
      display: inline-block;
      position: relative;
      --forge-avatar-size: 2.5rem;
      --forge-avatar-bg: var(--forge-color-neutral-200);
      --forge-avatar-color: var(--forge-color-neutral-700);
      --forge-avatar-border-radius: 50%;
      --forge-avatar-border-width: 0;
      --forge-avatar-border-color: transparent;
      --forge-avatar-status-size: 0.75rem;
      --forge-avatar-status-border: 2px solid var(--forge-color-background);
    }

    .avatar {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--forge-avatar-size);
      height: var(--forge-avatar-size);
      border-radius: var(--forge-avatar-border-radius);
      border: var(--forge-avatar-border-width) solid var(--forge-avatar-border-color);
      background-color: var(--forge-avatar-bg);
      color: var(--forge-avatar-color);
      font-family: var(--forge-font-family);
      font-weight: 500;
      overflow: hidden;
      transition: all var(--forge-transition-fast);
      outline: none;
    }

    .avatar--clickable {
      cursor: pointer;
    }

    .avatar--clickable:hover {
      transform: scale(1.02);
    }

    .avatar--clickable:focus {
      box-shadow: 0 0 0 2px var(--forge-color-primary-500);
    }

    .avatar--disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    .avatar--loading {
      background: linear-gradient(
        90deg,
        var(--forge-avatar-bg) 0%,
        var(--forge-color-neutral-300) 50%,
        var(--forge-avatar-bg) 100%
      );
      background-size: 200% 100%;
      animation: shimmer 2s infinite;
    }

    @keyframes shimmer {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }

    .avatar__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }

    .avatar__fallback {
      font-size: calc(var(--forge-avatar-size) * 0.4);
      line-height: 1;
      text-transform: uppercase;
      user-select: none;
    }

    /* Size variants */
    .avatar--xs {
      --forge-avatar-size: 1.5rem;
      --forge-avatar-status-size: 0.5rem;
    }

    .avatar--sm {
      --forge-avatar-size: 2rem;
      --forge-avatar-status-size: 0.625rem;
    }

    .avatar--md {
      --forge-avatar-size: 2.5rem;
      --forge-avatar-status-size: 0.75rem;
    }

    .avatar--lg {
      --forge-avatar-size: 3rem;
      --forge-avatar-status-size: 0.875rem;
    }

    .avatar--xl {
      --forge-avatar-size: 4rem;
      --forge-avatar-status-size: 1rem;
    }

    /* Shape variants */
    .avatar--circle {
      --forge-avatar-border-radius: 50%;
    }

    .avatar--square {
      --forge-avatar-border-radius: 0;
    }

    .avatar--rounded {
      --forge-avatar-border-radius: var(--forge-border-radius-md);
    }

    /* Status indicator */
    .avatar__status {
      position: absolute;
      width: var(--forge-avatar-status-size);
      height: var(--forge-avatar-status-size);
      border-radius: 50%;
      border: var(--forge-avatar-status-border);
      z-index: 1;
    }

    .avatar__status--top-right {
      top: 0;
      right: 0;
    }

    .avatar__status--top-left {
      top: 0;
      left: 0;
    }

    .avatar__status--bottom-right {
      bottom: 0;
      right: 0;
    }

    .avatar__status--bottom-left {
      bottom: 0;
      left: 0;
    }

    .avatar__status--online {
      background-color: var(--forge-color-success-500, #10b981);
    }

    .avatar__status--offline {
      background-color: var(--forge-color-neutral-400, #6b7280);
    }

    .avatar__status--busy {
      background-color: var(--forge-color-error-500, #ef4444);
    }

    .avatar__status--away {
      background-color: var(--forge-color-warning-500, #f59e0b);
    }
  `;

  @property({ type: String }) src?: string;
  @property({ type: String }) alt?: string;
  @property({ type: String }) fallback?: string;
  @property({ type: String }) size: AvatarSize = 'md';
  @property({ type: String }) status: AvatarStatus = 'none';
  @property({ type: String, attribute: 'status-position' }) statusPosition: StatusPosition =
    'top-right';
  @property({ type: String }) shape: AvatarShape = 'circle';
  @property({ type: Boolean }) clickable = false;
  @property({ type: Boolean }) loading = false;
  @property({ type: Boolean }) disabled = false;

  @state() private imageLoaded = false;
  @state() private imageError = false;

  protected override firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);

    if (this.clickable) {
      this.tabIndex = 0;
      this.addEventListener('keydown', this._handleKeyDown);
    }

    // Update AI metadata and state based on properties
    this.updateAIMetadata();
    this.updateAvatarState();
  }

  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (
      changedProperties.has('src') ||
      changedProperties.has('fallback') ||
      changedProperties.has('status') ||
      changedProperties.has('clickable') ||
      changedProperties.has('size') ||
      changedProperties.has('disabled') ||
      changedProperties.has('loading') ||
      changedProperties.has('shape')
    ) {
      this.updateAIMetadata();
      this.updateAvatarState();
    }
  }

  private updateAIMetadata(): void {
    this.aiMetadata = {
      ...this.aiMetadata,
      purpose: `User avatar ${this.src ? 'with image' : 'with initials'} ${this.status !== 'none' ? `showing ${this.status} status` : ''}`,
      context: this.clickable ? 'interactive-profile' : 'profile',
      criticality: (this.clickable ? 'medium' : 'low') as 'low' | 'medium',
    };
  }

  private _handleImageLoad = (): void => {
    this.imageLoaded = true;
    this.imageError = false;
    this.updateAvatarState();
  };

  private _handleImageError = (): void => {
    this.imageLoaded = false;
    this.imageError = true;
    this.updateAvatarState();
  };

  private _handleClick = (event: Event): void => {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    // Native click event already bubbles, no need to re-dispatch
  };

  private _handleKeyDown = (event: KeyboardEvent): void => {
    if (this.disabled) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      // Trigger a click event programmatically
      this.click();
    }
  };

  // AI Integration methods
  override explainState(): AIStateExplanation {
    const hasImage = this.src && !this.imageError;
    const displayMethod = hasImage
      ? `showing image from "${this.src}"`
      : this.fallback
        ? `displaying initials "${this.fallback}"`
        : 'showing default avatar';

    const statusInfo = this.status !== 'none' ? ` with ${this.status} status indicator` : '';
    const interactionInfo = this.clickable ? ' and is clickable' : '';
    const loadingInfo = this.loading ? ' (currently loading)' : '';

    const currentState = this.loading
      ? 'loading'
      : this.disabled
        ? 'disabled'
        : this.clickable
          ? 'interactive'
          : 'display';
    const possibleStates = ['display', 'interactive', 'loading', 'disabled'];
    const description = `Avatar component ${displayMethod}${statusInfo}${interactionInfo}${loadingInfo}. Size: ${this.size}, Shape: ${this.shape}.`;

    return {
      currentState,
      possibleStates,
      stateDescription: description,
      visualIndicators: [
        `Size: ${this.size}`,
        `Shape: ${this.shape}`,
        this.status !== 'none' ? `Status: ${this.status}` : '',
        this.loading ? 'Loading animation' : '',
        this.disabled ? 'Disabled appearance' : '',
      ].filter(Boolean),
    };
  }

  override getPossibleActions(): AIAction[] {
    const actions: AIAction[] = [];

    if (this.clickable && !this.disabled) {
      actions.push({
        name: 'click',
        description: 'Click avatar to trigger user profile action',
        available: true,
        parameters: [],
      });
    }

    return actions;
  }

  // Update component state for AI tracking
  private updateAvatarState(): void {
    this.updateComponentState('hasImage', !!(this.src && !this.imageError));
    this.updateComponentState('fallbackText', this.fallback || null);
    this.updateComponentState('size', this.size);
    this.updateComponentState('status', this.status);
    this.updateComponentState('clickable', this.clickable);
    this.updateComponentState('disabled', this.disabled);
    this.updateComponentState('loading', this.loading);
    this.updateComponentState('shape', this.shape);
  }

  protected override render() {
    const showImage = this.src && !this.imageError && !this.loading;
    const showFallback = !showImage && this.fallback && !this.loading;

    const avatarClasses = {
      avatar: true,
      [`avatar--${this.size}`]: true,
      [`avatar--${this.shape}`]: true,
      'avatar--clickable': this.clickable,
      'avatar--disabled': this.disabled,
      'avatar--loading': this.loading,
    };

    const statusClasses = {
      avatar__status: true,
      [`avatar__status--${this.statusPosition}`]: true,
      [`avatar__status--${this.status}`]: true,
    };

    return html`
      <div
        class=${classMap(avatarClasses)}
        role="img"
        aria-label=${this.alt ||
        (this.fallback ? `Avatar with initials ${this.fallback}` : 'User avatar')}
        aria-describedby=${this.status !== 'none' ? 'status-indicator' : ''}
        @click=${this.clickable ? this._handleClick : undefined}
        @keydown=${this.clickable ? this._handleKeyDown : undefined}
        part="avatar"
      >
        ${showImage
          ? html`
              <img
                class="avatar__image"
                src=${this.src!}
                alt=${this.alt || ''}
                @load=${this._handleImageLoad}
                @error=${this._handleImageError}
                part="image"
              />
            `
          : ''}
        ${showFallback
          ? html` <span class="avatar__fallback" part="fallback"> ${this.fallback} </span> `
          : ''}
        ${this.status !== 'none'
          ? html`
              <div
                class=${classMap(statusClasses)}
                id="status-indicator"
                role="status"
                aria-label=${`User is ${this.status}`}
                part="status"
              ></div>
            `
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-avatar': ForgeAvatar;
  }
}
