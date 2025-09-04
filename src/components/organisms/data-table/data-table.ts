import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { BaseElement } from '../../../core/BaseElement';
import type { AIComponentState, AIAction, AIStateExplanation } from '../../../core/ai-metadata.types';
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
  static override styles = css`
    
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

      .expand-cell {
        width: 48px;
      }

      .expand-cell forge-icon {
        transition: transform 0.2s ease;
      }

      .expand-cell forge-icon.expanded {
        transform: rotate(90deg);
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
  `;

  @property({ type: Array }) columns: TableColumn[] = [];
  @property({ type: Array }) rows: TableRow[] = [];
  @property({ type: Boolean }) loading = false;
  @property({ type: Boolean }) selectable = false;
  @property({ type: Boolean }) striped = false;
  @property({ type: Boolean }) expandable = false;
  @property({ type: String, attribute: 'selection-mode' }) selectionMode: 'single' | 'multiple' = 'multiple';
  @property({ type: String, attribute: 'responsive-mode' }) responsiveMode: 'scroll' | 'stack' | 'hide' = 'scroll';
  @property({ type: Boolean, attribute: 'show-pagination' }) showPagination = false;
  @property({ type: Number, attribute: 'page-size' }) pageSize = 10;
  
  @state() private sortColumn: string | undefined = undefined;
  @state() private sortDirection: 'asc' | 'desc' = 'asc';
  @state() private selectedRows = new Set<string>();
  @state() private expandedRows = new Set<string>();
  @state() private currentPage = 1;

  override updated(changedProperties: Map<PropertyKey, unknown>) {
    super.updated(changedProperties);
    this.attachEventListeners();
  }

  private attachEventListeners() {
    this.renderDynamicHeaders();
    this.renderDynamicRows();
    this.addSortingHandlers();
    this.addSelectionFeatures();
    this.addExpandFeatures();
  }

  private renderDynamicHeaders() {
    const headerRow = this.shadowRoot?.querySelector('thead tr');
    if (!headerRow || this.columns.length === 0) return;

    // Find the static headers and replace them with dynamic ones
    const staticHeaders = headerRow.querySelectorAll('th:not(.checkbox-cell):not(.expand-cell)');
    staticHeaders.forEach(header => header.remove());

    // Add dynamic headers
    this.columns.forEach(col => {
      const th = document.createElement('th');
      th.textContent = col.label;
      th.setAttribute('data-column-id', col.id);
      
      if (col.sortable) {
        th.classList.add('sortable');
      }
      if (col.width) {
        th.style.width = col.width;
      }
      if (col.align) {
        th.style.textAlign = col.align;
      }
      
      headerRow.appendChild(th);
    });
  }

  private renderDynamicRows() {
    const tbody = this.shadowRoot?.querySelector('tbody');
    if (!tbody) return;

    // Clear existing rows
    tbody.innerHTML = '';

    // Add rows based on data
    this.paginatedRows.forEach(row => {
      const tr = document.createElement('tr');
      tr.setAttribute('data-row-id', row.id);
      
      if (this.selectedRows.has(row.id)) {
        tr.classList.add('selected');
      }

      // Add expand cell if expandable
      if (this.expandable) {
        const expandCell = document.createElement('td');
        expandCell.className = 'expand-cell';
        const expandIcon = document.createElement('span');
        expandIcon.className = 'expand-icon';
        expandIcon.textContent = '+';
        expandIcon.style.cursor = 'pointer';
        expandIcon.onclick = () => this.handleRowExpand(row);
        expandCell.appendChild(expandIcon);
        tr.appendChild(expandCell);
      }

      // Add checkbox cell if selectable
      if (this.selectable) {
        const checkboxCell = document.createElement('td');
        checkboxCell.className = 'checkbox-cell';
        const checkbox = document.createElement('forge-checkbox');
        checkbox.setAttribute('aria-label', 'Select row');
        if (this.selectedRows.has(row.id)) {
          checkbox.setAttribute('checked', 'true');
        }
        checkbox.addEventListener('click', () => {
          const currentChecked = checkbox.hasAttribute('checked');
          const newChecked = !currentChecked;
          if (newChecked) {
            checkbox.setAttribute('checked', 'true');
          } else {
            checkbox.removeAttribute('checked');
          }
          this.handleRowSelect(row);
        });
        checkboxCell.appendChild(checkbox);
        tr.appendChild(checkboxCell);
      }

      // Add data cells
      this.columns.forEach(col => {
        const td = document.createElement('td');
        td.textContent = row.data[col.id] || '';
        if (col.align) {
          td.style.textAlign = col.align;
        }
        tr.appendChild(td);
      });

      tbody.appendChild(tr);
    });
  }

  private addSortingHandlers() {
    // Add click handlers to sortable headers
    const headers = this.shadowRoot?.querySelectorAll('th[data-column-id]');
    headers?.forEach((header) => {
      const columnId = header.getAttribute('data-column-id');
      const column = this.columns.find(col => col.id === columnId);
      if (column?.sortable) {
        header.style.cursor = 'pointer';
        header.onclick = () => this.handleSort(column);
      }
    });
  }

  private addSelectionFeatures() {
    if (!this.selectable) return;

    // Add click handler to existing header checkbox
    const headerCheckbox = this.shadowRoot?.querySelector('thead forge-checkbox');
    if (headerCheckbox && !headerCheckbox.hasAttribute('data-click-attached')) {
      headerCheckbox.setAttribute('data-click-attached', 'true');
      headerCheckbox.addEventListener('click', () => {
        // Toggle the checkbox manually and then handle the selection
        const currentChecked = headerCheckbox.hasAttribute('checked');
        const newChecked = !currentChecked;
        if (newChecked) {
          headerCheckbox.setAttribute('checked', 'true');
        } else {
          headerCheckbox.removeAttribute('checked');
        }
        this.handleSelectAll({ detail: { checked: newChecked } } as CustomEvent);
      });
    }
    
    // Row checkboxes are now handled directly in renderDynamicRows()
  }

  private addExpandFeatures() {
    // Expand features are now handled directly in renderDynamicRows()
  }

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
      detail: { selectedIds: Array.from(this.selectedRows) },
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
      detail: { selectedIds: Array.from(this.selectedRows) },
      bubbles: true,
      composed: true
    }));
  }

  private handleRowExpand(row: TableRow) {
    if (!this.expandable) return;
    
    if (this.expandedRows.has(row.id)) {
      this.expandedRows.delete(row.id);
    } else {
      this.expandedRows.add(row.id);
    }
    
    this.requestUpdate();
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
  override get aiState(): AIComponentState {
    return {
      ...super.aiState,
      rowCount: this.rows.length,
      columnCount: this.columns.length,
      selectedCount: this.selectedRows.size,
      expandedCount: this.expandedRows.size,
      sortColumn: this.sortColumn,
      sortDirection: this.sortDirection,
      currentPage: this.currentPage,
      loading: this.loading,
      sortable: this.columns.some(col => col.sortable),
      selectable: this.selectable,
      expandable: this.expandable
    };
  }

  override explainState(): AIStateExplanation {
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
    
    const description = parts.join(', ');
    return {
      currentState: this.loading ? 'loading' : 'ready',
      possibleStates: ['ready', 'loading'],
      stateDescription: description
    };
  }

  override getPossibleActions(): AIAction[] {
    const actions: AIAction[] = [];
    
    this.columns.forEach(column => {
      if (column.sortable) {
        actions.push({
          name: 'sort',
          description: `Sort by ${column.label}`,
          available: true
        });
      }
    });
    
    if (this.selectable) {
      actions.push({
        name: 'selectRow',
        description: 'Select individual rows',
        available: true
      });
      
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
    const containerClass = this.responsiveMode === 'stack' ? 'table-container responsive-stack' : 'table-container';

    return html`
      <div class=${containerClass}>
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
      <table class=${this.striped ? 'striped' : ''}>
        <thead>
          <tr>
            ${this.expandable ? html`<th class="expand-cell"></th>` : ''}
            ${this.selectable ? html`
              <th class="checkbox-cell">
                <forge-checkbox
                  ?checked=${this.selectedRows.size === this.rows.length && this.rows.length > 0}
                  ?indeterminate=${this.selectedRows.size > 0 && this.selectedRows.size < this.rows.length}
                  @change=${this.handleSelectAll}
                  aria-label="Select all"
                ></forge-checkbox>
              </th>
            ` : ''}
<th>ID</th><th>Name</th><th>Email</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        
        <tbody>
        </tbody>
      </table>
    `;
  }


  private renderEmpty() {
    return html`
      <div class="empty-state">
        <p>No data available</p>
      </div>
    `;
  }

  private renderLoading() {
    return html`
      <div class="loading-state">
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
