import { LitElement, PropertyValues, css } from 'lit';
import { property } from 'lit/decorators.js';
import type { 
  AIMetadata, 
  AIAction, 
  AIStateExplanation,
  AIComponentState,
  AIPerformanceMetrics
} from './ai-metadata.types';

// Re-export for backward compatibility
export type Action = AIAction;
export type StateExplanation = AIStateExplanation;

export abstract class BaseElement extends LitElement {
  // Base styles for all components
  static styles = css`
    :host {
      box-sizing: border-box;
    }
    
    *, *::before, *::after {
      box-sizing: inherit;
    }
  `;

  // AI-Ready properties (ADR-014)
  @property({ type: String, attribute: 'semantic-role' }) semanticRole?: string;
  @property({ type: String, attribute: 'ai-context' }) aiContext?: string;
  @property({ type: String, attribute: 'aria-description' }) ariaDescription: string | null = null;
  
  // Performance monitoring properties
  @property({ type: Number, attribute: 'max-render-ms' }) maxRenderMs = 16;
  @property({ type: Boolean, attribute: 'warn-on-violation' }) warnOnViolation = false;
  @property({ type: String, attribute: 'performance-mode' }) performanceMode: 'auto' | 'fast' | 'balanced' | 'quality' = 'auto';
  
  // Developer experience properties
  @property({ type: Boolean, attribute: 'dev-mode' }) devMode = false;
  @property({ type: Boolean, attribute: 'show-metrics' }) showMetrics = false;

  // Performance tracking
  protected renderTime = 0;
  protected renderCount = 0;
  private performanceStartTime = 0;

  // AI Metadata storage
  protected aiMetadata: AIMetadata = {
    purpose: 'UI Component',
    criticality: 'low'
  };

  // AI state tracking
  protected componentState: Map<string, any> = new Map();

  constructor() {
    super();
    this.performanceStartTime = globalThis.performance.now();
  }

  // Performance monitoring per ADR-014
  protected checkPerformance(startTime: number): void {
    const endTime = globalThis.performance.now();
    this.renderTime = endTime - startTime;
    this.renderCount++;

    if (this.renderTime > this.maxRenderMs) {
      const message = `${this.tagName} render exceeded budget: ${this.renderTime.toFixed(2)}ms > ${this.maxRenderMs}ms`;
      
      if (this.warnOnViolation) {
        console.warn(message, {
          component: this.tagName.toLowerCase(),
          renderTime: this.renderTime,
          maxRenderMs: this.maxRenderMs,
          renderCount: this.renderCount,
          performanceMode: this.performanceMode
        });
      }

      if (this.performanceMode === 'auto') {
        this.applyPerformanceDegradation();
      }
    }

    if (this.devMode) {
      // eslint-disable-next-line no-console
      console.log(`${this.tagName} render metrics:`, {
        component: this.tagName.toLowerCase(),
        renderTime: this.renderTime,
        renderCount: this.renderCount,
        totalTime: endTime - this.performanceStartTime
      });
    }
  }

  // Override in components to degrade gracefully
  protected applyPerformanceDegradation(): void {
    // Components should override this to disable animations, reduce updates, etc.
  }

  // AI State getter per ADR-014
  get aiState(): AIComponentState {
    const stateObject: Record<string, any> = {};
    this.componentState.forEach((value, key) => {
      stateObject[key] = value;
    });

    const performanceMetrics: AIPerformanceMetrics = {
      renderTime: this.renderTime,
      renderCount: this.renderCount,
      violations: 0,
      mode: this.performanceMode as 'auto' | 'fast' | 'balanced' | 'quality'
    };

    return {
      component: this.tagName.toLowerCase(),
      semanticRole: this.semanticRole,
      context: this.aiContext,
      description: this.ariaDescription,
      metadata: this.aiMetadata,
      state: stateObject,
      attributes: this.getAttributeNames().reduce((acc, name) => {
        acc[name] = this.getAttribute(name);
        return acc;
      }, {} as Record<string, string | null>),
      possibleActions: this.getPossibleActions(),
      stateExplanation: this.explainState(),
      performance: performanceMetrics
    };
  }

  // AI helper methods per ADR-014
  getAIDescription(): string {
    const base = `${this.tagName.toLowerCase()} component`;
    const purpose = this.aiMetadata.purpose || 'UI interaction';
    const role = this.semanticRole ? ` with role ${this.semanticRole}` : '';
    const context = this.aiContext ? ` in ${this.aiContext} context` : '';
    return `${base} for ${purpose}${role}${context}`;
  }

  getPossibleActions(): AIAction[] {
    // Override in components to provide specific actions
    return [];
  }

  explainState(): AIStateExplanation {
    // Override in components to provide state explanation
    return {
      currentState: 'default',
      possibleStates: ['default'],
      stateDescription: 'Component in default state'
    };
  }

  // Update component state for AI tracking
  protected updateComponentState(key: string, value: any): void {
    this.componentState.set(key, value);
    
    // Emit state change event for AI listeners
    this.emit('ai-state-change', {
      key,
      value,
      fullState: this.aiState
    });
  }

  // Get semantic HTML attributes for AI
  protected getSemanticAttributes(): Record<string, string> {
    const attrs: Record<string, string> = {};
    
    if (this.semanticRole) {
      attrs['data-semantic-role'] = this.semanticRole;
    }
    
    if (this.aiContext) {
      attrs['data-ai-context'] = this.aiContext;
    }
    
    if (this.aiMetadata.criticality && this.aiMetadata.criticality !== 'low') {
      attrs['data-criticality'] = this.aiMetadata.criticality;
    }
    
    if (this.aiMetadata.dataType) {
      attrs['data-type'] = this.aiMetadata.dataType;
    }
    
    return attrs;
  }
  // Event emission helper
  protected emit<T = unknown>(eventName: string, detail?: T, options?: EventInit): boolean {
    const event = new CustomEvent(eventName, {
      detail,
      bubbles: true,
      composed: true,
      cancelable: true,
      ...options
    });
    return this.dispatchEvent(event);
  }

  // Accessibility helpers
  protected announceToScreenReader(message: string): void {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  }

  // Lifecycle hooks
  protected firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);
    this.setAttribute('data-ready', 'true');
  }

  // Focus management helpers
  protected trapFocus(container: HTMLElement = this): void {
    const focusableElements = container.querySelectorAll(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0] as HTMLElement;
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

    container.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey && document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable?.focus();
      } else if (!e.shiftKey && document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable?.focus();
      }
    });
  }
}