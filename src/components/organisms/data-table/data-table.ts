import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { BaseElement } from '../../../core/base-element';
import type { AIState, AIAction } from '../../../core/types';
import '../../atoms/checkbox/checkbox';
import '../../atoms/icon/icon';
import '../pagination/pagination';

export interface TableColumn {
  id: string;
  label: string;
  sortable?: boolean;
  resizable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface TableRow {
  id: string;
  data: Record<string, any>;
  selected?: boolean;
  expanded?: boolean;
}

/**
 * @element forge-data-table
 * @description Advanced data table with sorting, selection, and responsive modes
 * @fires sort - When column sorting changes
 * @fires selectionchange - When row selection changes
 */
@customElement('forge-data-table')
export class ForgeDataTable extends BaseElement {
  static override styles = [
    BaseElement.styles,
    css`
      :host {
        display: block;
        width: 100%;
      }

      .table-container {
        overflow-x: auto;
        background: var(--forge-surface-color, #ffffff);
        border-radius: var(--forge-border-radius-md, 8px);
        box-shadow: var(--forge-elevation-1, 0 2px 4px rgba(0, 0, 0, 0.1));
      }

      table {
        width: 100%;
        border-collapse: collapse;
      }

      th, td {
        padding: var(--forge-spacing-md, 16px);
        text-align: left;
        border-bottom: 1px solid var(--forge-border-color, #e0e0e0);
      }

      th {
        background: var(--forge-surface-secondary, #f5f5f5);
        font-weight: var(--forge-font-weight-semibold, 600);
        color: var(--forge-text-primary, #333333);
        position: sticky;
        top: 0;
        z-index: 10;
      }

      th.sortable {
        cursor: pointer;
        user-select: none;
      }

      th.sortable:hover {
        background: var(--forge-hover-bg, rgba(0, 0, 0, 0.04));
      }

      .sort-icon {
        margin-left: var(--forge-spacing-xs, 4px);
        opacity: 0.5;
      }

      .sort-icon.active {
        opacity: 1;
        color: var(--forge-primary-color, #1976d2);
      }

      tr:hover {
        background: var(--forge-hover-bg, rgba(0, 0, 0, 0.02));
      }

      tr.selected {
        background: var(--forge-primary-bg-light, rgba(25, 118, 210, 0.08));
      }

      .checkbox-cell {
        width: 48px;
      }

      .empty-state {
        text-align: center;
        padding: var(--forge-spacing-xl, 32px);
        color: var(--forge-text-secondary, #666666);
      }

      .loading-state {
        text-align: center;
        padding: var(--forge-spacing-xl, 32px);
      }

      /* Responsive stack mode */
      @media (max-width: 768px) {
        .responsive-stack table,
        .responsive-stack thead,
        .responsive-stack tbody,
        .responsive-stack th,
        .responsive-stack td,
        .responsive-stack tr {
          display: block;
        }

        .responsive-stack thead {
          display: none;
        }

        .responsive-stack tr {
          margin-bottom: var(--forge-spacing-md, 16px);
          border: 1px solid var(--forge-border-color, #e0e0e0);
          border-radius: var(--forge-border-radius-sm, 4px);
        }

        .responsive-stack td {
          display: flex;
          justify-content: space-between;
          padding: var(--forge-spacing-sm, 8px) var(--forge-spacing-md, 16px);
        }

        .responsive-stack td::before {
          content: attr(data-label);
          font-weight: var(--forge-font-weight-medium, 500);
        }
      }
    `
  ];

  @property({ type: Array }) columns: TableColumn[] = [];
  @property({ type: Array }) rows: TableRow[] = [];
  @property({ type: Boolean }) loading = false;
  @property({ type: Boolean }) selectable = false;
  @property({ type: String, attribute: 'selection-mode' }) selectionMode: 'single' | 'multiple' = 'multiple';
  @property({ type: String, attribute: 'responsive-mode' }) responsiveMode: 'scroll' | 'stack' | 'hide' = 'scroll';
  @property({ type: Boolean, attribute: 'show-pagination' }) showPagination = false;
  @property({ type: Number, attribute: 'page-size' }) pageSize = 10;
  
  @state() private sortColumn = '';
  @state() private sortDirection: 'asc' | 'desc' = 'asc';
  @state() private selectedRows = new Set<string>();
  @state() private currentPage = 1;

  private handleSort(column: TableColumn) {
    if (!column.sortable) return;
    
    if (this.sortColumn === column.id) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column.id;
      this.sortDirection = 'asc';
    }
    
    this.dispatchEvent(new CustomEvent('sort', {
      detail: { column: column.id, direction: this.sortDirection },
      bubbles: true,
      composed: true
    }));
  }

  private handleRowSelect(row: TableRow) {
    if (!this.selectable) return;
    
    if (this.selectionMode === 'single') {
      this.selectedRows.clear();
      this.selectedRows.add(row.id);
    } else {
      if (this.selectedRows.has(row.id)) {
        this.selectedRows.delete(row.id);
      } else {
        this.selectedRows.add(row.id);
      }
    }
    
    this.requestUpdate();
    
    this.dispatchEvent(new CustomEvent('selectionchange', {
      detail: { selected: Array.from(this.selectedRows) },
      bubbles: true,
      composed: true
    }));
  }

  private handleSelectAll(e: CustomEvent) {
    if (e.detail.checked) {
      this.rows.forEach(row => this.selectedRows.add(row.id));
    } else {
      this.selectedRows.clear();
    }
    
    this.requestUpdate();
    
    this.dispatchEvent(new CustomEvent('selectionchange', {
      detail: { selected: Array.from(this.selectedRows) },
      bubbles: true,
      composed: true
    }));
  }

  private get paginatedRows() {
    if (!this.showPagination) return this.rows;
    
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.rows.slice(start, end);
  }

  private get totalPages() {
    return Math.ceil(this.rows.length / this.pageSize);
  }

  // AI Metadata
  override get aiState(): AIState {
    return {
      ...super.aiState,
      rowCount: this.rows.length,
      columnCount: this.columns.length,
      selectedCount: this.selectedRows.size,
      sortColumn: this.sortColumn,
      sortDirection: this.sortDirection,
      currentPage: this.currentPage,
      loading: this.loading
    };
  }

  override explainState(): string {
    const parts = ['Data table'];
    
    parts.push(`${this.rows.length} rows`);
    parts.push(`${this.columns.length} columns`);
    
    if (this.selectedRows.size > 0) {
      parts.push(`${this.selectedRows.size} selected`);
    }
    
    if (this.sortColumn) {
      parts.push(`sorted by ${this.sortColumn} ${this.sortDirection}`);
    }
    
    if (this.showPagination) {
      parts.push(`page ${this.currentPage} of ${this.totalPages}`);
    }
    
    if (this.loading) parts.push('loading');
    
    return parts.join(', ');
  }

  override getPossibleActions(): AIAction[] {
    const actions: AIAction[] = [];
    
    this.columns.forEach(column => {
      if (column.sortable) {
        actions.push({
          name: 'sort',
          description: `Sort by ${column.label}`,
          available: true,
          params: [column.id]
        });
      }
    });
    
    if (this.selectable) {
      actions.push({
        name: 'selectAll',
        description: 'Select all rows',
        available: this.selectedRows.size < this.rows.length
      });
      
      actions.push({
        name: 'deselectAll',
        description: 'Deselect all rows',
        available: this.selectedRows.size > 0
      });
    }
    
    return actions;
  }

  override render() {
    const containerClasses = {
      'table-container': true,
      'responsive-stack': this.responsiveMode === 'stack'
    };

    return html`
      <div class=${classMap(containerClasses)}>
        ${this.loading ? this.renderLoading() : 
          this.rows.length === 0 ? this.renderEmpty() : this.renderTable()}
      </div>
      
      ${this.showPagination && this.rows.length > 0 ? html`
        <forge-pagination
          .currentPage=${this.currentPage}
          .totalPages=${this.totalPages}
          .pageSize=${this.pageSize}
          .totalItems=${this.rows.length}
          @pagechange=${(e: CustomEvent) => this.currentPage = e.detail.page}
        ></forge-pagination>
      ` : ''}
    `;
  }

  private renderTable() {
    return html`
      <table>
        <thead>
          <tr>
            ${this.selectable ? html`
              <th class="checkbox-cell">
                <forge-checkbox
                  .checked=${this.selectedRows.size === this.rows.length && this.rows.length > 0}
                  .indeterminate=${this.selectedRows.size > 0 && this.selectedRows.size < this.rows.length}
                  @change=${this.handleSelectAll}
                  aria-label="Select all"
                ></forge-checkbox>
              </th>
            ` : ''}
            
            ${this.columns.map(column => html`
              <th 
                class=${column.sortable ? 'sortable' : ''}
                @click=${() => this.handleSort(column)}
                style=${column.width ? `width: ${column.width}` : ''}
              >
                ${column.label}
                ${column.sortable ? html`
                  <forge-icon
                    class="sort-icon ${this.sortColumn === column.id ? 'active' : ''}"
                    name=${this.sortColumn === column.id ? 
                      (this.sortDirection === 'asc' ? 'arrow-up' : 'arrow-down') : 
                      'arrow-updown'}
                    size="xs"
                  ></forge-icon>
                ` : ''}
              </th>
            `)}
          </tr>
        </thead>
        
        <tbody>
          ${this.paginatedRows.map(row => html`
            <tr class=${this.selectedRows.has(row.id) ? 'selected' : ''}>
              ${this.selectable ? html`
                <td class="checkbox-cell">
                  <forge-checkbox
                    .checked=${this.selectedRows.has(row.id)}
                    @change=${() => this.handleRowSelect(row)}
                    aria-label="Select row"
                  ></forge-checkbox>
                </td>
              ` : ''}
              
              ${this.columns.map(column => html`
                <td 
                  data-label=${column.label}
                  style=${column.align ? `text-align: ${column.align}` : ''}
                >
                  ${row.data[column.id]}
                </td>
              `)}
            </tr>
          `)}
        </tbody>
      </table>
    `;
  }

  private renderEmpty() {
    return html`
      <div class="empty-state">
        <forge-icon name="inbox" size="xl" style="opacity: 0.5;"></forge-icon>
        <p>No data available</p>
      </div>
    `;
  }

  private renderLoading() {
    return html`
      <div class="loading-state">
        <forge-icon name="spinner" size="lg" spin></forge-icon>
        <p>Loading data...</p>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-data-table': ForgeDataTable;
  }
}
