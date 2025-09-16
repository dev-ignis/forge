import { html, css, TemplateResult } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { repeat } from 'lit/directives/repeat.js';
import { BaseElement } from '../../../core/BaseElement';
import type { AIMetadata, AIAction, AIStateExplanation } from '../../../core/ai-metadata.types';
import { debounce } from '../../../utils/debounce';
import '../../atoms/checkbox/checkbox';
import '../../atoms/icon/icon';
import '../../atoms/button/button';
import '../../molecules/dropdown/dropdown';

// ADR-013: TypeScript Interfaces - Comprehensive type definitions
export interface GridColumn {
  id: string;
  title: string;
  field: string;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  sortable?: boolean;
  filterable?: boolean;
  resizable?: boolean;
  pinned?: 'left' | 'right' | false;
  type?: 'text' | 'number' | 'date' | 'boolean' | 'currency' | 'percentage';
  align?: 'left' | 'center' | 'right';
  format?: (value: unknown) => string;
  renderer?: (value: unknown, row: GridData) => TemplateResult;
  editor?: GridEditor;
  validation?: ValidationRule[];
  aggregate?: 'sum' | 'avg' | 'count' | 'min' | 'max';
}

export interface GridData {
  id: string;
  [key: string]: unknown;
}

export interface GridSelection {
  type: 'none' | 'single' | 'multiple';
  selectedIds: Set<string>;
  focusedId?: string;
}

export interface GridEditor {
  type: 'text' | 'number' | 'date' | 'select' | 'checkbox' | 'custom';
  options?: unknown[];
  validation?: ValidationRule[];
  customRenderer?: (value: unknown, onChange: (value: unknown) => void) => TemplateResult;
}

export interface ValidationRule {
  type: 'required' | 'min' | 'max' | 'pattern' | 'custom';
  value?: string | number;
  message: string;
  validator?: (value: unknown) => boolean;
}

export interface VirtualScrollConfig {
  enabled: boolean;
  rowHeight: number | 'auto' | ((index: number) => number);
  bufferSize: number;
  threshold: number;
  overscan: number;
}

export interface GridFilter {
  columnId: string;
  operator: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'gt' | 'lt' | 'gte' | 'lte';
  value: unknown;
}

export interface GridSort {
  columnId: string;
  direction: 'asc' | 'desc';
  priority?: number; // For multi-column sorting
}

// ADR-014: AI-Ready Components - Virtual scroller with AI metadata
class VirtualScroller {
  private container: HTMLElement;
  private config: VirtualScrollConfig;
  private totalRows: number;
  private visibleRange: { start: number; end: number };
  private scrollTop = 0;

  constructor(container: HTMLElement, config: VirtualScrollConfig) {
    this.container = container;
    this.config = config;
    this.totalRows = 0;
    this.visibleRange = { start: 0, end: 0 };
    this.setupScrollListener();
  }

  private setupScrollListener(): void {
    this.container.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
  }

  private handleScroll(): void {
    this.scrollTop = this.container.scrollTop;
    this.updateVisibleRange();
  }

  updateData(totalRows: number): void {
    this.totalRows = totalRows;
    this.updateVisibleRange();
  }

  private updateVisibleRange(): void {
    if (!this.config.enabled) {
      this.visibleRange = { start: 0, end: this.totalRows };
      return;
    }

    const containerHeight = this.container.clientHeight;
    const rowHeight = this.getRowHeight(0);
    const startIndex = Math.floor(this.scrollTop / rowHeight);
    const visibleCount = Math.ceil(containerHeight / rowHeight);
    const endIndex = Math.min(startIndex + visibleCount + this.config.overscan, this.totalRows);
    
    this.visibleRange = {
      start: Math.max(0, startIndex - this.config.overscan),
      end: endIndex
    };
  }

  private getRowHeight(index: number): number {
    if (typeof this.config.rowHeight === 'number') {
      return this.config.rowHeight;
    } else if (typeof this.config.rowHeight === 'function') {
      return this.config.rowHeight(index);
    }
    return 40; // Default row height
  }

  getVisibleRange(): { start: number; end: number } {
    return this.visibleRange;
  }

  getTotalHeight(): number {
    return this.totalRows * this.getRowHeight(0);
  }
}

/**
 * @element forge-data-grid
 * @description Advanced data grid with virtual scrolling, sorting, filtering, and editing capabilities
 * 
 * @slot expanded-row - Custom content for expanded row details
 * 
 * @fires sort - When column sorting changes
 * @fires filter - When filters change
 * @fires selection-change - When row selection changes
 * @fires cell-edit - When cell editing occurs
 * @fires row-expand - When row expansion state changes
 * @fires column-resize - When column is resized
 * @fires column-reorder - When columns are reordered
 * @fires export-request - When data export is requested
 */
@customElement('forge-data-grid')
export class ForgeDataGrid extends BaseElement {
  // ADR-002: Shadow DOM Encapsulation - Complete style isolation
  static override styles = css`
    :host {
      --grid-header-bg: var(--color-surface-secondary, #f8fafc);
      --grid-header-text: var(--color-text-primary, #1f2937);
      --grid-row-bg: var(--color-surface-primary, #ffffff);
      --grid-row-alt-bg: var(--color-surface-tertiary, #f9fafb);
      --grid-border: var(--color-border-subtle, #e5e7eb);
      --grid-selection-bg: var(--color-primary-50, #eff6ff);
      --grid-hover-bg: var(--color-neutral-50, #f9fafb);
      --grid-focus-ring: var(--color-primary-500, #3b82f6);
      
      display: block;
      width: 100%;
      height: 400px;
      border: 1px solid var(--grid-border);
      border-radius: var(--radius-md, 8px);
      overflow: hidden;
      background: var(--grid-row-bg);
      font-family: var(--font-family-base);
    }

    .grid-container {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      position: relative;
    }

    .grid-toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--spacing-sm);
      background: var(--grid-header-bg);
      border-bottom: 1px solid var(--grid-border);
      gap: var(--spacing-sm);
    }

    .toolbar-left,
    .toolbar-right {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
    }

    .search-input {
      padding: var(--spacing-xs) var(--spacing-sm);
      border: 1px solid var(--grid-border);
      border-radius: var(--radius-sm);
      font-size: var(--text-sm);
      min-width: 200px;
    }

    .grid-header {
      display: flex;
      background: var(--grid-header-bg);
      border-bottom: 2px solid var(--grid-border);
      position: sticky;
      top: 0;
      z-index: 10;
      overflow-x: auto;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }

    .grid-header::-webkit-scrollbar {
      display: none;
    }

    .header-cell {
      display: flex;
      align-items: center;
      padding: var(--spacing-sm);
      font-weight: var(--font-weight-semibold);
      color: var(--grid-header-text);
      border-right: 1px solid var(--grid-border);
      cursor: pointer;
      user-select: none;
      position: relative;
      min-width: 0;
      white-space: nowrap;
      transition: background-color 0.2s ease;
    }

    .header-cell:hover {
      background: var(--grid-hover-bg);
    }

    .header-cell.sortable:hover {
      background: var(--color-primary-25, #f0f9ff);
    }

    .header-cell:last-child {
      border-right: none;
    }

    .header-title {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .sort-indicator {
      margin-left: var(--spacing-xs);
      opacity: 0.6;
      transition: opacity 0.2s ease;
    }

    .header-cell.sorted .sort-indicator {
      opacity: 1;
    }

    .resize-handle {
      position: absolute;
      right: -2px;
      top: 0;
      width: 4px;
      height: 100%;
      cursor: col-resize;
      background: transparent;
      transition: background-color 0.2s ease;
    }

    .resize-handle:hover {
      background: var(--grid-focus-ring);
    }

    .grid-body {
      flex: 1;
      overflow: auto;
      position: relative;
    }

    .virtual-viewport {
      width: 100%;
      position: relative;
    }

    .virtual-spacer-top,
    .virtual-spacer-bottom {
      width: 100%;
      pointer-events: none;
    }

    .grid-row {
      display: flex;
      border-bottom: 1px solid var(--grid-border);
      cursor: pointer;
      transition: background-color 0.2s ease;
      position: relative;
    }

    .grid-row:hover {
      background: var(--grid-hover-bg);
    }

    .grid-row.selected {
      background: var(--grid-selection-bg);
    }

    .grid-row.focused {
      outline: 2px solid var(--grid-focus-ring);
      outline-offset: -2px;
    }

    .grid-row:nth-child(even):not(.selected):not(:hover) {
      background: var(--grid-row-alt-bg);
    }

    .grid-cell {
      display: flex;
      align-items: center;
      padding: var(--spacing-sm);
      border-right: 1px solid var(--grid-border);
      min-height: 40px;
      overflow: hidden;
      position: relative;
    }

    .grid-cell:last-child {
      border-right: none;
    }

    .cell-content {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .cell-editor {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: var(--color-white);
      border: 2px solid var(--grid-focus-ring);
      border-radius: var(--radius-sm);
      padding: var(--spacing-xs);
      z-index: 100;
    }

    .cell-editor input {
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      background: transparent;
      font-size: inherit;
    }

    .selection-checkbox {
      margin-right: var(--spacing-sm);
    }

    .expand-button {
      margin-right: var(--spacing-sm);
      padding: var(--spacing-xs);
      border: none;
      background: transparent;
      cursor: pointer;
      border-radius: var(--radius-sm);
      transition: background-color 0.2s ease;
    }

    .expand-button:hover {
      background: var(--grid-hover-bg);
    }

    .expanded-content {
      grid-column: 1 / -1;
      padding: var(--spacing-md);
      background: var(--color-neutral-25);
      border-bottom: 1px solid var(--grid-border);
    }

    .loading-indicator {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.8);
      z-index: 1000;
    }

    .no-data {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: var(--spacing-xl);
      color: var(--color-text-secondary);
    }

    .performance-warning {
      position: absolute;
      top: var(--spacing-sm);
      right: var(--spacing-sm);
      padding: var(--spacing-xs) var(--spacing-sm);
      background: var(--color-warning-100);
      border: 1px solid var(--color-warning-300);
      border-radius: var(--radius-sm);
      font-size: var(--text-xs);
      z-index: 20;
    }

    /* ADR-012: Accessibility Standards */
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    /* Focus management for keyboard navigation */
    .grid-row:focus-within {
      outline: 2px solid var(--grid-focus-ring);
      outline-offset: -2px;
    }

    /* Mobile responsive adjustments */
    @media (max-width: 768px) {
      .grid-toolbar {
        flex-direction: column;
        align-items: stretch;
        gap: var(--spacing-xs);
      }

      .toolbar-left,
      .toolbar-right {
        justify-content: space-between;
      }

      .search-input {
        min-width: auto;
        flex: 1;
      }
    }
  `;

  // ADR-008: Component API Design - Comprehensive property interface
  @property({ type: Array }) columns: GridColumn[] = [];
  @property({ type: Array }) data: GridData[] = [];
  @property({ type: Boolean }) loading = false;
  @property({ type: Boolean }) sortable = true;
  @property({ type: Boolean }) filterable = true;
  @property({ type: Boolean }) selectable = true;
  @property({ type: String }) selectionType: 'none' | 'single' | 'multiple' = 'multiple';
  @property({ type: Boolean }) editable = false;
  @property({ type: Boolean }) expandable = false;
  @property({ type: Boolean, attribute: 'virtual-scrolling' }) virtualScrolling = false;
  @property({ type: Number, attribute: 'row-height' }) rowHeight = 40;
  @property({ type: Boolean, attribute: 'show-toolbar' }) showToolbar = true;
  @property({ type: Boolean, attribute: 'show-search' }) showSearch = true;
  @property({ type: String }) searchPlaceholder = 'Search...';
  @property({ type: Number, attribute: 'page-size' }) pageSize = 50;
  @property({ type: Boolean }) paginated = false;

  // ADR-006: State Management - Internal component state
  @state() private selection: GridSelection = { type: 'none', selectedIds: new Set() };
  @state() private sortState: GridSort[] = [];
  @state() private filterState: GridFilter[] = [];
  @state() private editingCell: { rowId: string; columnId: string } | null = null;
  @state() private expandedRows: Set<string> = new Set();
  @state() private searchQuery = '';
  @state() private currentPage = 1;
  @state() private isPerformanceWarning = false;

  // Private instances for virtual scrolling and performance
  private virtualScroller?: VirtualScroller;
  private resizeObserver?: ResizeObserver;
  private debouncedSearch = debounce(this.performSearch.bind(this) as (...args: unknown[]) => unknown, 300);
  private gridPerformanceStartTime = 0;

  @query('.grid-body') private gridBody?: HTMLElement;
  @query('.grid-header') private gridHeader?: HTMLElement;

  // ADR-014: AI-Ready Components - AI metadata configuration
  protected override aiMetadata: AIMetadata = {
    purpose: 'Advanced data grid with virtual scrolling, sorting, filtering, and editing capabilities',
    context: 'Data management and visualization interface for large datasets',
    dataType: 'custom',
    criticality: 'high',
    semanticRole: 'data-grid',
    interactions: [
      {
        type: 'click',
        description: 'Select rows, sort columns, edit cells',
        outcome: 'Updates grid state and data manipulation'
      },
      {
        type: 'keyboard',
        description: 'Navigate grid with arrow keys, edit with Enter',
        shortcuts: ['ArrowKeys', 'Enter', 'Escape', 'Space']
      },
      {
        type: 'input',
        description: 'Search and filter data',
        outcome: 'Filters displayed data based on query'
      }
    ],
    validation: [
      {
        type: 'custom',
        message: 'Columns array must not be empty',
        value: 'validateColumns'
      },
      {
        type: 'custom',
        message: 'Data must be array of objects with id property',
        value: 'validateData'
      }
    ]
  };

  constructor() {
    super();
    this.setupPerformanceMonitoring();
  }

  private setupPerformanceMonitoring(): void {
    // ADR-014: Performance monitoring for virtual scrolling
    this.gridPerformanceStartTime = performance.now();
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setupVirtualScrolling();
    this.setupResizeObserver();
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.resizeObserver?.disconnect();
  }

  private setupVirtualScrolling(): void {
    if (this.virtualScrolling && this.gridBody) {
      this.virtualScroller = new VirtualScroller(this.gridBody, {
        enabled: this.virtualScrolling,
        rowHeight: this.rowHeight,
        bufferSize: 20,
        threshold: 100,
        overscan: 5
      });
    }
  }

  private setupResizeObserver(): void {
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        this.handleResize();
      });
      this.resizeObserver.observe(this);
    }
  }

  private handleResize(): void {
    this.virtualScroller?.updateData(this.filteredData.length);
    this.requestUpdate();
  }

  private get filteredData(): GridData[] {
    let result = [...this.data];

    // Apply search filter
    if (this.searchQuery) {
      result = result.filter(row => 
        this.columns.some(column => 
          String(row[column.field] || '').toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      );
    }

    // Apply column filters
    this.filterState.forEach(filter => {
      result = result.filter(row => {
        const value = row[filter.columnId];
        return this.applyFilter(value, filter);
      });
    });

    // Apply sorting
    if (this.sortState.length > 0) {
      result.sort((a, b) => {
        for (const sort of this.sortState) {
          const aVal = a[sort.columnId];
          const bVal = b[sort.columnId];
          const comparison = this.compareValues(aVal, bVal);
          if (comparison !== 0) {
            return sort.direction === 'asc' ? comparison : -comparison;
          }
        }
        return 0;
      });
    }

    return result;
  }

  private applyFilter(value: unknown, filter: GridFilter): boolean {
    const strValue = String(value || '').toLowerCase();
    const filterValue = String(filter.value || '').toLowerCase();

    switch (filter.operator) {
      case 'equals':
        return strValue === filterValue;
      case 'contains':
        return strValue.includes(filterValue);
      case 'startsWith':
        return strValue.startsWith(filterValue);
      case 'endsWith':
        return strValue.endsWith(filterValue);
      default:
        return true;
    }
  }

  private compareValues(a: unknown, b: unknown): number {
    if (a === b) return 0;
    if (a == null) return -1;
    if (b == null) return 1;
    
    if (typeof a === 'number' && typeof b === 'number') {
      return a - b;
    }
    
    return String(a).localeCompare(String(b));
  }

  private performSearch(): void {
    this.currentPage = 1;
    this.requestUpdate();
  }

  private handleColumnSort(column: GridColumn): void {
    if (!column.sortable) return;

    const startTime = performance.now();
    
    const existingSort = this.sortState.find(sort => sort.columnId === column.id);
    
    if (existingSort) {
      if (existingSort.direction === 'asc') {
        existingSort.direction = 'desc';
      } else {
        this.sortState = this.sortState.filter(sort => sort.columnId !== column.id);
      }
    } else {
      this.sortState = [{ columnId: column.id, direction: 'asc' }, ...this.sortState];
    }

    const renderTime = performance.now() - startTime;
    if (renderTime > this.maxRenderMs) {
      this.isPerformanceWarning = true;
      setTimeout(() => {
        this.isPerformanceWarning = false;
        this.requestUpdate();
      }, 3000);
    }

    this.emit('sort', {
      column: column.id,
      direction: this.sortState.find(s => s.columnId === column.id)?.direction,
      sorts: [...this.sortState]
    });

    this.requestUpdate();
  }

  private handleRowSelection(rowId: string, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const isSelected = checkbox.checked;

    if (this.selectionType === 'single') {
      this.selection.selectedIds.clear();
      if (isSelected) {
        this.selection.selectedIds.add(rowId);
      }
    } else {
      if (isSelected) {
        this.selection.selectedIds.add(rowId);
      } else {
        this.selection.selectedIds.delete(rowId);
      }
    }

    this.emit('selection-change', {
      selectedIds: Array.from(this.selection.selectedIds),
      selectedRows: this.filteredData.filter(row => this.selection.selectedIds.has(row.id))
    });

    this.requestUpdate();
  }

  private handleCellEdit(rowId: string, columnId: string): void {
    if (!this.editable) return;
    
    const column = this.columns.find(col => col.id === columnId);
    if (!column?.editor) return;

    this.editingCell = { rowId, columnId };
    this.requestUpdate();

    // Focus the editor after render
    this.updateComplete.then(() => {
      const editor = this.shadowRoot?.querySelector('.cell-editor input') as HTMLInputElement;
      editor?.focus();
    });
  }

  private handleCellEditComplete(value: unknown): void {
    if (!this.editingCell) return;

    const { rowId, columnId } = this.editingCell;
    const rowIndex = this.data.findIndex(row => row.id === rowId);
    
    if (rowIndex >= 0) {
      this.data[rowIndex] = { ...this.data[rowIndex], [columnId]: value };
      
      this.emit('cell-edit', {
        rowId,
        columnId,
        value,
        row: this.data[rowIndex]
      });
    }

    this.editingCell = null;
    this.requestUpdate();
  }

  private handleSearchInput(event: InputEvent): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
    this.debouncedSearch();
  }

  private renderToolbar(): TemplateResult {
    if (!this.showToolbar) return html``;

    return html`
      <div class="grid-toolbar">
        <div class="toolbar-left">
          ${this.showSearch ? html`
            <input
              type="text"
              class="search-input"
              placeholder="${this.searchPlaceholder}"
              .value="${this.searchQuery}"
              @input="${this.handleSearchInput}"
              aria-label="Search data grid"
            />
          ` : ''}
          <span class="selection-info" aria-live="polite">
            ${this.selection.selectedIds.size > 0 
              ? `${this.selection.selectedIds.size} selected`
              : `${this.filteredData.length} items`}
          </span>
        </div>
        <div class="toolbar-right">
          <forge-button variant="outline" size="sm" @click="${this.exportData}">
            <forge-icon name="download"></forge-icon>
            Export
          </forge-button>
          ${this.selectable ? html`
            <forge-button variant="outline" size="sm" @click="${this.clearSelection}">
              Clear Selection
            </forge-button>
          ` : ''}
        </div>
      </div>
    `;
  }

  private renderHeader(): TemplateResult {
    return html`
      <div class="grid-header" role="row">
        ${this.selectable ? html`
          <div class="header-cell" style="width: 40px; min-width: 40px;">
            <forge-checkbox
              .checked="${this.selection.selectedIds.size === this.filteredData.length && this.filteredData.length > 0}"
              .indeterminate="${this.selection.selectedIds.size > 0 && this.selection.selectedIds.size < this.filteredData.length}"
              @change="${this.handleSelectAll}"
              aria-label="Select all rows"
            ></forge-checkbox>
          </div>
        ` : ''}
        
        ${this.columns.map(column => html`
          <div
            class="${classMap({
              'header-cell': true,
              'sortable': column.sortable || false,
              'sorted': this.sortState.some(sort => sort.columnId === column.id)
            })}"
            style="${styleMap({
              width: column.width || 'auto',
              minWidth: column.minWidth ? `${column.minWidth}px` : '120px',
              maxWidth: column.maxWidth ? `${column.maxWidth}px` : 'none'
            })}"
            @click="${() => this.handleColumnSort(column)}"
            role="columnheader"
            aria-sort="${this.getColumnSortState(column.id)}"
            tabindex="0"
            @keydown="${(e: KeyboardEvent) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.handleColumnSort(column);
              }
            }}"
          >
            <span class="header-title">${column.title}</span>
            ${column.sortable ? html`
              <forge-icon
                name="${this.getSortIcon(column.id)}"
                class="sort-indicator"
                aria-hidden="true"
              ></forge-icon>
            ` : ''}
            ${column.resizable ? html`
              <div class="resize-handle" @mousedown="${(e: MouseEvent) => this.startColumnResize(e, column)}"></div>
            ` : ''}
          </div>
        `)}
      </div>
    `;
  }

  private renderBody(): TemplateResult {
    if (this.loading) {
      return html`
        <div class="loading-indicator">
          <forge-icon name="spinner" aria-label="Loading data"></forge-icon>
          Loading...
        </div>
      `;
    }

    if (this.filteredData.length === 0) {
      return html`
        <div class="no-data">
          <forge-icon name="inbox" size="large"></forge-icon>
          <p>No data available</p>
          ${this.searchQuery ? html`<p>Try adjusting your search criteria</p>` : ''}
        </div>
      `;
    }

    const visibleRows = this.getVisibleRows();

    return html`
      <div class="virtual-viewport" style="height: ${this.virtualScroller?.getTotalHeight() || 'auto'}px">
        ${this.virtualScrolling && this.virtualScroller ? html`
          <div class="virtual-spacer-top" style="height: ${this.getSpacerHeight('top')}px"></div>
        ` : ''}
        
        ${repeat(visibleRows, (row) => row.id, (row, index) => this.renderRow(row, index))}
        
        ${this.virtualScrolling && this.virtualScroller ? html`
          <div class="virtual-spacer-bottom" style="height: ${this.getSpacerHeight('bottom')}px"></div>
        ` : ''}
      </div>
    `;
  }

  private getVisibleRows(): GridData[] {
    if (!this.virtualScrolling || !this.virtualScroller) {
      return this.filteredData;
    }

    const range = this.virtualScroller.getVisibleRange();
    return this.filteredData.slice(range.start, range.end);
  }

  private getSpacerHeight(type: 'top' | 'bottom'): number {
    if (!this.virtualScroller) return 0;
    
    const range = this.virtualScroller.getVisibleRange();
    const rowHeight = this.rowHeight;
    
    if (type === 'top') {
      return range.start * rowHeight;
    } else {
      return (this.filteredData.length - range.end) * rowHeight;
    }
  }

  private renderRow(row: GridData, index: number): TemplateResult {
    const isSelected = this.selection.selectedIds.has(row.id);
    const isExpanded = this.expandedRows.has(row.id);

    return html`
      <div
        class="${classMap({
          'grid-row': true,
          'selected': isSelected,
          'focused': this.selection.focusedId === row.id
        })}"
        role="row"
        aria-selected="${isSelected}"
        style="height: ${this.rowHeight}px"
      >
        ${this.selectable ? html`
          <div class="grid-cell" style="width: 40px; min-width: 40px;">
            <forge-checkbox
              class="selection-checkbox"
              .checked="${isSelected}"
              @change="${(e: Event) => this.handleRowSelection(row.id, e)}"
              aria-label="Select row ${index + 1}"
            ></forge-checkbox>
          </div>
        ` : ''}

        ${this.columns.map(column => html`
          <div
            class="grid-cell"
            style="${styleMap({
              width: column.width || 'auto',
              minWidth: column.minWidth ? `${column.minWidth}px` : '120px',
              textAlign: column.align || 'left'
            })}"
            role="gridcell"
            tabindex="0"
            @dblclick="${() => this.handleCellEdit(row.id, column.id)}"
            @keydown="${(e: KeyboardEvent) => this.handleCellKeydown(e, row.id, column.id)}"
          >
            ${this.editingCell?.rowId === row.id && this.editingCell?.columnId === column.id
              ? this.renderCellEditor(row, column)
              : html`
                  <span class="cell-content">
                    ${column.renderer 
                      ? column.renderer(row[column.field], row)
                      : this.formatCellValue(row[column.field], column)}
                  </span>
                `}
          </div>
        `)}
      </div>

      ${isExpanded && this.expandable ? html`
        <div class="expanded-content">
          <slot name="expanded-row" .row="${row}"></slot>
        </div>
      ` : ''}
    `;
  }

  private renderCellEditor(row: GridData, column: GridColumn): TemplateResult {
    const currentValue = row[column.field];

    return html`
      <div class="cell-editor">
        <input
          type="text"
          .value="${String(currentValue || '')}"
          @blur="${(e: FocusEvent) => this.handleCellEditComplete((e.target as HTMLInputElement).value)}"
          @keydown="${(e: KeyboardEvent) => {
            if (e.key === 'Enter') {
              this.handleCellEditComplete((e.target as HTMLInputElement).value);
            } else if (e.key === 'Escape') {
              this.editingCell = null;
              this.requestUpdate();
            }
          }}"
        />
      </div>
    `;
  }

  private formatCellValue(value: unknown, column: GridColumn): string {
    if (value == null) return '';
    
    if (column.format) {
      return column.format(value);
    }

    switch (column.type) {
      case 'number':
        return Number(value).toLocaleString();
      case 'currency':
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value));
      case 'percentage':
        return `${Number(value) * 100}%`;
      case 'date':
        return new Date(value as string).toLocaleDateString();
      default:
        return String(value);
    }
  }

  private handleCellKeydown(event: KeyboardEvent, rowId: string, columnId: string): void {
    if (event.key === 'Enter' && this.editable) {
      event.preventDefault();
      this.handleCellEdit(rowId, columnId);
    }
  }

  private getColumnSortState(columnId: string): string {
    const sort = this.sortState.find(s => s.columnId === columnId);
    if (!sort) return 'none';
    return sort.direction === 'asc' ? 'ascending' : 'descending';
  }

  private getSortIcon(columnId: string): string {
    const sort = this.sortState.find(s => s.columnId === columnId);
    if (!sort) return 'unfold-more';
    return sort.direction === 'asc' ? 'expand-less' : 'expand-more';
  }

  private handleSelectAll(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    
    if (checkbox.checked) {
      this.filteredData.forEach(row => this.selection.selectedIds.add(row.id));
    } else {
      this.selection.selectedIds.clear();
    }

    this.emit('selection-change', {
      selectedIds: Array.from(this.selection.selectedIds),
      selectedRows: this.filteredData.filter(row => this.selection.selectedIds.has(row.id))
    });

    this.requestUpdate();
  }

  private clearSelection(): void {
    this.selection.selectedIds.clear();
    this.emit('selection-change', { selectedIds: [], selectedRows: [] });
    this.requestUpdate();
  }

  private exportData(): void {
    const selectedData = this.selection.selectedIds.size > 0
      ? this.filteredData.filter(row => this.selection.selectedIds.has(row.id))
      : this.filteredData;

    this.emit('export-request', { data: selectedData, format: 'csv' });
  }

  private startColumnResize(event: MouseEvent, column: GridColumn): void {
    event.preventDefault();
    // Column resize implementation would go here
    // This is a placeholder for the resize functionality
  }

  override render(): TemplateResult {
    this.checkPerformance(this.gridPerformanceStartTime);

    return html`
      <div class="grid-container" role="grid" aria-label="Data grid">
        ${this.renderToolbar()}
        ${this.renderHeader()}
        <div class="grid-body" role="presentation">
          ${this.renderBody()}
        </div>
        
        ${this.isPerformanceWarning ? html`
          <div class="performance-warning" role="alert">
            ⚠️ Performance: Grid render time exceeded threshold
          </div>
        ` : ''}
        
        <!-- Screen reader announcements -->
        <div class="sr-only" aria-live="polite" aria-atomic="true">
          ${this.getScreenReaderAnnouncement()}
        </div>
      </div>
    `;
  }

  private getScreenReaderAnnouncement(): string {
    const total = this.filteredData.length;
    const selected = this.selection.selectedIds.size;
    return `Grid with ${total} rows. ${selected > 0 ? `${selected} rows selected.` : ''}`;
  }

  // ADR-014: AI-Ready Components - AI integration methods
  override getPossibleActions(): AIAction[] {
    return [
      {
        name: 'sort',
        description: 'Sort data by column',
        available: this.sortable && this.columns.some(col => col.sortable),
        parameters: [
          { name: 'columnId', type: 'selection', required: true, enum: this.columns.filter(c => c.sortable).map(c => c.id) },
          { name: 'direction', type: 'selection', required: true, enum: ['asc', 'desc'] }
        ]
      },
      {
        name: 'filter',
        description: 'Filter data by criteria',
        available: this.filterable,
        parameters: [
          { name: 'query', type: 'text', required: true }
        ]
      },
      {
        name: 'select',
        description: 'Select rows',
        available: this.selectable,
        parameters: [
          { name: 'rowIds', type: 'text', required: true }
        ]
      },
      {
        name: 'export',
        description: 'Export data',
        available: true,
        parameters: [
          { name: 'format', type: 'text', required: false, defaultValue: 'csv' }
        ]
      }
    ];
  }

  override explainState(): AIStateExplanation {
    const totalRows = this.data.length;
    const filteredRows = this.filteredData.length;
    const selectedRows = this.selection.selectedIds.size;

    return {
      currentState: `grid-with-${totalRows}-rows`,
      possibleStates: ['grid-empty', 'grid-loading', 'grid-with-data', 'grid-filtered', 'grid-sorted'],
      stateDescription: `Data grid showing ${filteredRows} of ${totalRows} rows. ${selectedRows} rows selected. ${this.sortState.length > 0 ? 'Sorted by ' + this.sortState.map(s => `${s.columnId} ${s.direction}`).join(', ') : 'No sorting applied'}.`,
      transitions: [
        {
          from: 'grid-with-data',
          to: 'grid-sorted',
          trigger: 'Column header click',
          conditions: ['Column is sortable']
        },
        {
          from: 'any',
          to: 'grid-filtered',
          trigger: 'Search input',
          conditions: ['Search query provided']
        }
      ],
      visualIndicators: [
        `${totalRows} total rows`,
        `${filteredRows} visible after filtering`,
        `${selectedRows} rows selected`,
        this.sortState.length > 0 ? `Sorted by ${this.sortState.length} column(s)` : 'No sorting',
        this.virtualScrolling ? 'Virtual scrolling enabled' : 'Standard scrolling'
      ]
    };
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-data-grid': ForgeDataGrid;
  }
}