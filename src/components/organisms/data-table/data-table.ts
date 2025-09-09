import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { BaseElement } from '../../../core/BaseElement';
import type { AIComponentState, AIAction, AIStateExplanation } from '../../../core/ai-metadata.types';
import { VirtualScroller, type VirtualScrollerRange } from '../../../utils/virtual-scroller';
import { debounce } from '../../../utils/debounce';
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
        position: relative;
      }

      .table-container.virtual {
        overflow-y: auto;
        height: 400px;
      }

      .virtual-spacer {
        height: var(--virtual-total-height, 0);
        position: relative;
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
  
  // ADR-016 Performance Properties
  @property({ type: Boolean, attribute: 'virtual-scrolling' }) virtualScrolling = false;
  @property({ type: Number, attribute: 'virtual-threshold' }) virtualThreshold = 1000;
  @property({ type: String, attribute: 'performance-mode' }) performanceMode: 'auto' | 'fast' | 'quality' = 'auto';
  
  // ADR-016 Data Provider Properties
  @property({ type: Function }) dataProvider?: () => Promise<TableRow[]>;
  @property({ type: Object }) filters?: Record<string, any>;
  @property({ type: Boolean, attribute: 'lazy-load' }) lazyLoad = true;
  
  @state() private sortColumn: string | undefined = undefined;
  @state() private sortDirection: 'asc' | 'desc' = 'asc';
  @state() private selectedRows = new Set<string>();
  @state() private expandedRows = new Set<string>();
  @state() private currentPage = 1;
  
  // ADR-016 Performance State
  @state() private visibleRange: VirtualScrollerRange = { start: 0, end: 50 };
  @state() private dataLoading = false;
  @state() private dataError: Error | null = null;
  @state() private focusedCell: { row: number, col: number } | null = null;
  
  // Private instances
  private virtualScroller?: VirtualScroller;
  private liveRegion?: HTMLDivElement;
  private debouncedSort = debounce(this.performSort.bind(this) as (...args: unknown[]) => unknown, 300);
  private debouncedFilter = debounce(this.performFilter.bind(this) as (...args: unknown[]) => unknown, 500);
  
  // Performance monitoring
  private renderStartTime = 0;
  private performanceThreshold = 16; // 60fps threshold

  override willUpdate(changedProperties: Map<PropertyKey, unknown>) {
    super.willUpdate(changedProperties);
    // Skip performance monitoring during tests
    if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'test') return;
    this.renderStartTime = performance.now();
  }

  override updated(changedProperties: Map<PropertyKey, unknown>) {
    super.updated(changedProperties);
    this.attachEventListeners();
    this.initializeVirtualScrolling();
    this.initializeLiveRegion();
    this.loadDataIfNeeded();
    this.trackRenderPerformance();
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
        td.setAttribute('tabindex', '0');
        td.setAttribute('role', 'gridcell');
        
        if (col.align) {
          td.style.textAlign = col.align;
        }
        
        // Add keyboard event listeners for navigation
        td.addEventListener('keydown', this.handleKeyboard.bind(this));
        
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
        (header as HTMLElement).style.cursor = 'pointer';
        (header as HTMLElement).onclick = () => this.handleSort(column);
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
    
    // Update sort state immediately for UI responsiveness
    if (this.sortColumn === column.id) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column.id;
      this.sortDirection = 'asc';
    }
    
    // Emit event immediately
    this.dispatchEvent(new CustomEvent('sort', {
      detail: { column: column.id, direction: this.sortDirection },
      bubbles: true,
      composed: true
    }));
    
    // Debounce the actual data sorting for performance
    this.debouncedSort(column);
  }

  private performSort(column: TableColumn) {
    // Sort the actual data
    this.rows = [...this.rows].sort((a, b) => {
      const aVal = a.data[column.id];
      const bVal = b.data[column.id];
      const modifier = this.sortDirection === 'asc' ? 1 : -1;
      
      if (aVal < bVal) return -1 * modifier;
      if (aVal > bVal) return 1 * modifier;
      return 0;
    });
    
    this.announceSort(column.label, this.sortDirection);
    this.requestUpdate();
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
    return this.displayRows;
  }

  private get displayRows() {
    // Auto-enable virtual scrolling for large datasets
    if (this.performanceMode === 'auto' && this.rows.length > this.virtualThreshold) {
      this.virtualScrolling = true;
    }
    
    let dataToDisplay = this.rows;
    
    // Apply filters first
    if (this.filters) {
      dataToDisplay = this.applyFilters(dataToDisplay);
    }
    
    // Handle virtual scrolling
    if (this.virtualScrolling && this.virtualScroller) {
      return dataToDisplay.slice(this.visibleRange.start, this.visibleRange.end);
    }
    
    // Handle pagination
    if (this.showPagination) {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return dataToDisplay.slice(start, end);
    }
    
    return dataToDisplay;
  }

  private get totalPages() {
    return Math.ceil(this.rows.length / this.pageSize);
  }

  // ADR-016 Virtual Scrolling Implementation
  private initializeVirtualScrolling() {
    if (!this.virtualScrolling) return;
    
    const container = this.shadowRoot?.querySelector('.table-container');
    if (!container || this.virtualScroller) return;
    
    this.virtualScroller = new VirtualScroller({
      container: container as HTMLElement,
      itemHeight: 48, // Row height in pixels
      totalItems: this.rows.length,
      buffer: 5,
      onVisibleRangeChange: (range) => {
        this.visibleRange = range;
        this.requestUpdate();
      }
    });
  }

  // ADR-016 Data Provider Implementation
  private async loadDataIfNeeded() {
    if (!this.dataProvider || !this.lazyLoad || this.dataLoading) return;
    
    try {
      this.dataLoading = true;
      this.dataError = null;
      const data = await this.dataProvider();
      this.rows = data;
      this.announceDataUpdate(this.rows.length);
    } catch (error) {
      this.dataError = error as Error;
      this.announceError((error as Error).message);
    } finally {
      this.dataLoading = false;
    }
  }

  private applyFilters(data: TableRow[]): TableRow[] {
    if (!this.filters || Object.keys(this.filters).length === 0) {
      return data;
    }
    
    return data.filter(item => {
      return Object.entries(this.filters!).every(([key, value]) => {
        const itemValue = item.data?.[key];
        
        // Support different filter types
        if (typeof value === 'function') {
          return value(itemValue);
        }
        if (value instanceof RegExp) {
          return value.test(String(itemValue));
        }
        return itemValue === value;
      });
    });
  }

  private performFilter() {
    // Trigger re-render with filtered data
    this.requestUpdate();
    this.announceDataUpdate(this.displayRows.length);
  }

  // ADR-012 ARIA Live Regions Implementation
  private initializeLiveRegion() {
    if (this.liveRegion) return;
    
    this.liveRegion = document.createElement('div');
    this.liveRegion.setAttribute('role', 'status');
    this.liveRegion.setAttribute('aria-live', 'polite');
    this.liveRegion.setAttribute('aria-atomic', 'true');
    this.liveRegion.className = 'sr-only';
    this.liveRegion.style.cssText = `
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    `;
    this.shadowRoot?.appendChild(this.liveRegion);
  }

  protected announce(message: string, priority: 'polite' | 'assertive' = 'polite') {
    if (!this.liveRegion) return;
    
    this.liveRegion.textContent = '';
    this.liveRegion.setAttribute('aria-live', priority);
    
    setTimeout(() => {
      if (this.liveRegion) {
        this.liveRegion.textContent = message;
      }
    }, 100);
  }

  private announceDataUpdate(count: number) {
    this.announce(`Data updated. Showing ${count} items.`);
  }

  private announceSort(column: string, direction: string) {
    this.announce(`Table sorted by ${column} in ${direction}ending order.`);
  }

  private announceSelection(count: number) {
    this.announce(`${count} row${count !== 1 ? 's' : ''} selected.`);
  }

  private announceError(message: string) {
    this.announce(`Error: ${message}`, 'assertive');
  }

  private announceCell(row: number, col: number) {
    const adjustedCol = col - (this.selectable ? 1 : 0) - (this.expandable ? 1 : 0);
    const column = this.columns[adjustedCol];
    const rowData = this.displayRows[row];
    const value = rowData?.data[column?.id] || '';
    this.announce(`Row ${row + 1}, ${column?.label || 'Column'}: ${value}`);
  }

  // ADR-012 Keyboard Navigation Implementation
  private handleKeyboard(e: KeyboardEvent) {
    const target = e.target as HTMLElement;
    const currentCell = target.closest('td');
    if (!currentCell) return;
    
    const currentRow = currentCell.parentElement as HTMLTableRowElement;
    const cellIndex = Array.from(currentRow.cells).indexOf(currentCell as HTMLTableCellElement);
    const rowIndex = Array.from(currentRow.parentElement!.children).indexOf(currentRow);
    
    switch(e.key) {
      case 'ArrowRight':
        e.preventDefault();
        this.focusCell(rowIndex, cellIndex + 1);
        break;
        
      case 'ArrowLeft':
        e.preventDefault();
        this.focusCell(rowIndex, cellIndex - 1);
        break;
        
      case 'ArrowDown':
        e.preventDefault();
        this.focusCell(rowIndex + 1, cellIndex);
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        this.focusCell(rowIndex - 1, cellIndex);
        break;
        
      case 'Home':
        if (e.ctrlKey) {
          e.preventDefault();
          this.focusCell(0, 0);
        } else {
          e.preventDefault();
          this.focusCell(rowIndex, 0);
        }
        break;
        
      case 'End':
        if (e.ctrlKey) {
          e.preventDefault();
          const lastRow = this.displayRows.length - 1;
          const lastCell = this.columns.length - 1 + (this.selectable ? 1 : 0) + (this.expandable ? 1 : 0);
          this.focusCell(lastRow, lastCell);
        } else {
          e.preventDefault();
          const lastCell = this.columns.length - 1 + (this.selectable ? 1 : 0) + (this.expandable ? 1 : 0);
          this.focusCell(rowIndex, lastCell);
        }
        break;
        
      case 'PageDown':
        e.preventDefault();
        const nextPage = Math.min(rowIndex + 10, this.displayRows.length - 1);
        this.focusCell(nextPage, cellIndex);
        break;
        
      case 'PageUp':
        e.preventDefault();
        const prevPage = Math.max(rowIndex - 10, 0);
        this.focusCell(prevPage, cellIndex);
        break;
        
      case ' ':
        if (this.selectable && cellIndex === (this.expandable ? 1 : 0)) {
          e.preventDefault();
          this.handleRowSelect(this.displayRows[rowIndex]);
        }
        break;
        
      case 'Enter':
        e.preventDefault();
        this.handleCellActivation(rowIndex, cellIndex);
        break;
    }
  }

  private focusCell(rowIndex: number, cellIndex: number) {
    const tbody = this.shadowRoot?.querySelector('tbody');
    if (!tbody) return;
    
    const rows = tbody.querySelectorAll('tr');
    const targetRow = rows[rowIndex];
    if (!targetRow) return;
    
    const cells = targetRow.querySelectorAll('td');
    const targetCell = cells[cellIndex];
    if (!targetCell) return;
    
    // Find focusable element in cell
    const focusable = targetCell.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) || targetCell;
    
    if (focusable instanceof HTMLElement) {
      focusable.focus();
      this.focusedCell = { row: rowIndex, col: cellIndex };
      this.announceCell(rowIndex, cellIndex);
    }
  }

  private handleCellActivation(rowIndex: number, cellIndex: number) {
    // Handle cell-specific activation (e.g., checkbox toggle, button click)
    if (this.selectable && cellIndex === (this.expandable ? 1 : 0)) {
      this.handleRowSelect(this.displayRows[rowIndex]);
    } else if (this.expandable && cellIndex === 0) {
      this.handleRowExpand(this.displayRows[rowIndex]);
    }
  }

  // Performance Monitoring Implementation
  private trackRenderPerformance() {
    if (this.renderStartTime === 0) return;
    
    // Skip performance monitoring during tests to avoid noise and memory issues
    if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'test') {
      this.renderStartTime = 0;
      return;
    }
    
    const renderTime = performance.now() - this.renderStartTime;
    
    // Warn if render time exceeds 60fps threshold
    if (renderTime > this.performanceThreshold) {
      console.warn(`DataTable render time exceeded threshold: ${renderTime.toFixed(2)}ms > ${this.performanceThreshold}ms`, {
        rows: this.rows.length,
        visibleRows: this.displayRows.length,
        virtualScrolling: this.virtualScrolling,
        performance: this.performanceMode
      });
      
      // Auto-enable virtual scrolling if not already enabled
      if (!this.virtualScrolling && this.rows.length > 500 && this.performanceMode === 'auto') {
        console.info('Auto-enabling virtual scrolling due to performance issues');
        this.virtualScrolling = true;
        this.requestUpdate();
      }
    }
    
    this.renderStartTime = 0;
  }

  // AI Metadata
  override get aiState(): AIComponentState {
    return {
      ...super.aiState,
      state: {
        ...super.aiState.state,
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
      }
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
