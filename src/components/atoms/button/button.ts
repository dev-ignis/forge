import { html, css, PropertyValues, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { BaseElement } from '../../../core/BaseElement';
import type { ButtonVariant, ButtonSize, ButtonType, ForgeButtonProps, ForgeButtonEventDetail } from '../../../types';
import type { AIComponentMetadata } from '../../../core/ai-metadata.types';

@customElement('forge-button')
export class ForgeButton extends BaseElement {
  // Comprehensive AI metadata for AI-native development
  static aiMetadata: AIComponentMetadata = {
    // Core Identity
    purpose: 'Primary action trigger with semantic meaning for user interactions',
    semanticRole: 'button',
    category: 'atom',
    criticality: 'medium',
    
    // AI Generation Guidance
    usagePatterns: [
      'form submission',
      'modal triggers',
      'navigation actions',
      'data operations (save, delete, edit)',
      'workflow progression',
      'menu interactions'
    ],
    antiPatterns: [
      'never use primary variant for destructive actions',
      'avoid disabled state for async operations - prefer loading state',
      'do not use buttons for navigation - use links for page changes',
      'avoid generic text like "Click here" - use descriptive labels'
    ],
    contextualRules: [
      'always provide accessible labels for icon-only buttons',
      'maintain consistent spacing using design tokens',
      'ensure WCAG 2.1 AA compliance automatically',
      'use primary variant sparingly - only one primary action per section',
      'provide loading states for async operations',
      'include proper focus management for keyboard users'
    ],
    
    // AI Prompts for Code Generation
    aiPrompts: {
      codeGeneration: 'Generate button with semantic HTML, proper ARIA attributes, and accessible interaction patterns',
      accessibility: 'Include keyboard navigation (Enter/Space), screen reader support, and proper focus management',
      performance: 'Implement efficient event handling, debounce rapid clicks, and optimize for mobile touch',
      designSystem: 'Use design tokens for consistent styling, spacing, and maintain design system alignment'
    },
    
    // Framework-Specific Code Examples
    codeExamples: {
      react: `import { ForgeButton } from '@nexcraft/forge/integrations/react';

function App() {
  const handleSubmit = () => {
    // Handle form submission
  };

  return (
    <ForgeButton 
      variant="primary" 
      onClick={handleSubmit}
      loading={isSubmitting}
      disabled={!isValid}
    >
      Submit Form
    </ForgeButton>
  );
}`,
      vue: `<template>
  <forge-button 
    variant="primary"
    @click="handleSubmit"
    :loading="isSubmitting"
    :disabled="!isValid"
  >
    Submit Form
  </forge-button>
</template>

<script>
export default {
  methods: {
    handleSubmit() {
      // Handle form submission
    }
  }
}
</script>`,
      angular: `<forge-button 
  variant="primary"
  (click)="handleSubmit()"
  [loading]="isSubmitting"
  [disabled]="!isValid">
  Submit Form
</forge-button>`,
      vanilla: `<forge-button variant="primary" id="submit-btn">
  Submit Form
</forge-button>

<script>
document.getElementById('submit-btn').addEventListener('click', () => {
  // Handle form submission
});
</script>`
    },
    
    // Design System Integration
    designTokens: {
      spacing: ['--forge-spacing-sm', '--forge-spacing-md', '--forge-spacing-lg'],
      colors: ['--forge-color-primary-*', '--forge-color-error', '--forge-color-surface-*'],
      typography: ['--forge-font-family', '--forge-font-size-*', '--forge-font-weight-*'],
      borders: ['--forge-border-radius-*'],
      shadows: ['--forge-shadow-*'],
      transitions: ['--forge-transition-fast', '--forge-transition-normal']
    },
    
    // Performance Guidelines
    performanceHints: [
      'debounce rapid clicks by default (300ms)',
      'lazy load when not in viewport for large button collections',
      'use CSS transforms for hover/active states instead of layout changes',
      'implement efficient ripple effect with requestAnimationFrame',
      'avoid excessive DOM manipulations during interactions'
    ],
    bundleImpact: 'minimal',
    
    // Accessibility Guidelines
    a11yGuidelines: [
      'WCAG 2.1 AA compliant focus indicators',
      'Support both keyboard (Enter/Space) and mouse interactions',
      'Provide clear, descriptive button labels',
      'Include loading and disabled state announcements',
      'Maintain minimum 44px touch target size',
      'Support high contrast mode'
    ],
    ariaPatterns: [
      'aria-label for icon-only buttons',
      'aria-expanded for dropdown/menu triggers',
      'aria-controls for elements controlled by button',
      'aria-current for navigation states',
      'aria-busy during loading states'
    ],
    keyboardInteractions: [
      'Enter: Activate button action',
      'Space: Activate button action',
      'Tab: Move focus to next interactive element',
      'Shift+Tab: Move focus to previous interactive element'
    ],
    
    // Component Composition Patterns
    compositionPatterns: {
      'with-icons': 'Use iconStart or iconEnd props, not nested icon elements for consistency',
      'in-forms': 'Automatically handle form submission context and validation states',
      'in-modals': 'Integrate with modal focus management and escape key handling',
      'in-toolbars': 'Support toolbar keyboard navigation patterns',
      'as-menu-trigger': 'Include proper ARIA attributes for dropdown menus'
    },
    childComponents: [], // Atomic component - no children
    parentComponents: ['forge-form-field', 'forge-modal', 'forge-toolbar', 'forge-card'],
    
    // Testing Guidance
    testingPatterns: [
      'test click event handling',
      'test keyboard activation (Enter/Space)',
      'test loading state behavior',
      'test disabled state prevention',
      'test accessibility attributes',
      'test focus management',
      'test variant styling',
      'test responsive behavior'
    ],
    commonTestCases: [
      'should render with correct variant class',
      'should handle click events',
      'should be keyboard accessible',
      'should show loading spinner when loading=true',
      'should be non-interactive when disabled=true',
      'should emit proper events with correct detail',
      'should have proper ARIA attributes',
      'should meet WCAG 2.1 AA contrast requirements'
    ]
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
  
  // ARIA and accessibility attributes
  @property({ type: String, attribute: 'aria-label' }) ariaLabel: string | null = null;
  @property({ type: String, attribute: 'aria-controls' }) ariaControls: string | null = null;
  @property({ type: String, attribute: 'aria-expanded' }) ariaExpanded: string | null = null;
  @property({ type: String, attribute: 'aria-current' }) ariaCurrent: string | null = null;
  @property({ type: String, attribute: 'aria-selected' }) ariaSelected: string | null = null;
  @property({ type: String }) role: string | null = null;
  @property({ type: Number }) tabIndex: number = 0;
  
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
        role=${this.role ? this.role : nothing}
        tabindex=${this.tabIndex !== undefined ? this.tabIndex : nothing}
        aria-label=${this.ariaLabel ? this.ariaLabel : nothing}
        aria-controls=${this.ariaControls ? this.ariaControls : nothing}
        aria-expanded=${this.ariaExpanded ? this.ariaExpanded : nothing}
        aria-current=${this.ariaCurrent ? this.ariaCurrent : nothing}
        aria-selected=${this.ariaSelected ? this.ariaSelected : nothing}
        aria-busy=${this.loading ? 'true' : nothing}
        aria-disabled=${this.disabled ? 'true' : nothing}
        aria-description=${this.ariaDescription || this.getDefaultAriaDescription()}
        data-semantic-role=${this.semanticRole || this.getDefaultSemanticRole()}
        data-ai-context=${this.aiContext || this.getDefaultAiContext()}
        @click=${this.handleClick}
        part="button"
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