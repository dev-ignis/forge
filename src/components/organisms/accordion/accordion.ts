import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { BaseElement } from '../../../core/base-element';
import type { AIState, AIAction } from '../../../core/types';
import '../../atoms/icon/icon';

export interface AccordionPanel {
  id: string;
  header: string;
  content: string | TemplateStringsArray;
  disabled?: boolean;
  icon?: string;
}

/**
 * @element forge-accordion
 * @description Expandable accordion component with smooth animations
 * @fires paneltoggle - When a panel is expanded or collapsed
 */
@customElement('forge-accordion')
export class ForgeAccordion extends BaseElement {
  static override styles = [
    BaseElement.styles,
    css`
      :host {
        display: block;
        width: 100%;
      }

      .accordion {
        border: 1px solid var(--forge-border-color, #e0e0e0);
        border-radius: var(--forge-border-radius-md, 8px);
        overflow: hidden;
        background: var(--forge-surface-color, #ffffff);
      }

      .panel {
        border-bottom: 1px solid var(--forge-border-color, #e0e0e0);
      }

      .panel:last-child {
        border-bottom: none;
      }

      .panel-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--forge-spacing-md, 16px);
        background: transparent;
        border: none;
        width: 100%;
        text-align: left;
        cursor: pointer;
        font-size: var(--forge-font-size-base, 14px);
        font-weight: var(--forge-font-weight-medium, 500);
        color: var(--forge-text-primary, #333333);
        transition: background 0.2s ease;
      }

      .panel-header:hover:not(.disabled) {
        background: var(--forge-hover-bg, rgba(0, 0, 0, 0.04));
      }

      .panel-header.disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }

      .panel-header-content {
        display: flex;
        align-items: center;
        gap: var(--forge-spacing-sm, 8px);
      }

      .panel-icon {
        transition: transform 0.3s ease;
      }

      .panel.expanded .panel-icon {
        transform: rotate(90deg);
      }

      .panel-content {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease;
      }

      .panel.expanded .panel-content {
        max-height: 1000px;
      }

      .panel-content-inner {
        padding: var(--forge-spacing-md, 16px);
        padding-top: 0;
      }
    `
  ];

  @property({ type: Array }) panels: AccordionPanel[] = [];
  @property({ type: Boolean }) multiple = false;
  @property({ type: Array, attribute: 'expanded-panels' }) expandedPanels: string[] = [];

  constructor() {
    super();
  }

  private togglePanel(panel: AccordionPanel) {
    if (panel.disabled) return;

    const isExpanded = this.expandedPanels.includes(panel.id);
    
    if (isExpanded) {
      this.expandedPanels = this.expandedPanels.filter(id => id !== panel.id);
    } else {
      if (this.multiple) {
        this.expandedPanels = [...this.expandedPanels, panel.id];
      } else {
        this.expandedPanels = [panel.id];
      }
    }

    this.dispatchEvent(new CustomEvent('paneltoggle', {
      detail: { panel: panel.id, expanded: !isExpanded },
      bubbles: true,
      composed: true
    }));
  }

  private expandAll() {
    this.expandedPanels = this.panels.filter(p => !p.disabled).map(p => p.id);
  }

  private collapseAll() {
    this.expandedPanels = [];
  }

  // AI Metadata
  override get aiState(): AIState {
    return {
      ...super.aiState,
      panelCount: this.panels.length,
      expandedCount: this.expandedPanels.length,
      multiple: this.multiple
    };
  }

  override explainState(): string {
    const parts = ['Accordion'];
    parts.push(`${this.panels.length} panels`);
    parts.push(`${this.expandedPanels.length} expanded`);
    if (this.multiple) parts.push('multiple expansion allowed');
    return parts.join(', ');
  }

  override getPossibleActions(): AIAction[] {
    const actions: AIAction[] = [];
    
    this.panels.forEach(panel => {
      if (!panel.disabled) {
        const isExpanded = this.expandedPanels.includes(panel.id);
        actions.push({
          name: isExpanded ? 'collapse' : 'expand',
          description: `${isExpanded ? 'Collapse' : 'Expand'} ${panel.header}`,
          available: true,
          params: [panel.id]
        });
      }
    });

    if (this.multiple) {
      actions.push({
        name: 'expandAll',
        description: 'Expand all panels',
        available: this.expandedPanels.length < this.panels.filter(p => !p.disabled).length
      });
      
      actions.push({
        name: 'collapseAll',
        description: 'Collapse all panels',
        available: this.expandedPanels.length > 0
      });
    }
    
    return actions;
  }

  override render() {
    return html`
      <div class="accordion" role="region">
        ${this.panels.map(panel => this.renderPanel(panel))}
      </div>
    `;
  }

  private renderPanel(panel: AccordionPanel) {
    const isExpanded = this.expandedPanels.includes(panel.id);
    const panelClasses = {
      'panel': true,
      'expanded': isExpanded,
      'disabled': panel.disabled || false
    };

    return html`
      <div class=${classMap(panelClasses)}>
        <button
          class="panel-header ${panel.disabled ? 'disabled' : ''}"
          @click=${() => this.togglePanel(panel)}
          aria-expanded=${isExpanded}
          aria-controls="panel-${panel.id}"
          ?disabled=${panel.disabled}
        >
          <div class="panel-header-content">
            <forge-icon 
              class="panel-icon"
              name="chevron-right" 
              size="sm"
            ></forge-icon>
            ${panel.icon ? html`
              <forge-icon name=${panel.icon} size="sm"></forge-icon>
            ` : ''}
            <span>${panel.header}</span>
          </div>
        </button>
        
        <div 
          class="panel-content"
          id="panel-${panel.id}"
          aria-hidden=${!isExpanded}
        >
          <div class="panel-content-inner">
            ${panel.content}
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-accordion': ForgeAccordion;
  }
}