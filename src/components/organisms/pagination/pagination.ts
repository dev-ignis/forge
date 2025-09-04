import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { BaseElement } from '../../../core/BaseElement';
import type { AIState, AIAction } from '../../../core/ai-metadata.types';
import '../../atoms/button/button';
import '../../atoms/select/select';
import '../../atoms/input/input';
import type { SelectOption } from '../../atoms/select/select';

/**
 * @element forge-pagination
 * @description Advanced pagination component with page size selector, jump to page, and responsive ellipsis
 * @fires pagechange - When page changes
 * @fires pagesizechange - When page size changes
 */
@customElement('forge-pagination')
export class ForgePagination extends BaseElement {
  static override styles = [
    BaseElement.styles,
    css`
      :host {
        display: block;
      }

      .pagination-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--forge-spacing-md, 16px);
        padding: var(--forge-spacing-md, 16px);
        background: var(--forge-surface-color, #ffffff);
        border-radius: var(--forge-border-radius-md, 8px);
        flex-wrap: wrap;
      }

      .pagination-info {
        display: flex;
        align-items: center;
        gap: var(--forge-spacing-md, 16px);
        flex-wrap: wrap;
      }

      .pagination-controls {
        display: flex;
        align-items: center;
        gap: var(--forge-spacing-xs, 4px);
      }

      .page-size-selector {
        display: flex;
        align-items: center;
        gap: var(--forge-spacing-sm, 8px);
      }

      .page-size-label {
        font-size: var(--forge-font-size-sm, 14px);
        color: var(--forge-text-secondary, #666666);
      }

      .total-info {
        font-size: var(--forge-font-size-sm, 14px);
        color: var(--forge-text-secondary, #666666);
      }

      .page-button {
        min-width: 40px;
        height: 40px;
        padding: 0 var(--forge-spacing-sm, 8px);
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid var(--forge-border-color, #e0e0e0);
        background: var(--forge-surface-color, #ffffff);
        color: var(--forge-text-primary, #333333);
        cursor: pointer;
        transition: all 0.2s ease;
        border-radius: var(--forge-border-radius-sm, 4px);
        font-size: var(--forge-font-size-sm, 14px);
        font-weight: var(--forge-font-weight-medium, 500);
      }

      .page-button:hover:not(:disabled) {
        background: var(--forge-hover-bg, rgba(0, 0, 0, 0.04));
        border-color: var(--forge-primary-color, #1976d2);
      }

      .page-button:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }

      .page-button.active {
        background: var(--forge-primary-color, #1976d2);
        color: white;
        border-color: var(--forge-primary-color, #1976d2);
      }

      .ellipsis {
        padding: 0 var(--forge-spacing-xs, 4px);
        color: var(--forge-text-secondary, #666666);
        user-select: none;
      }

      .jump-to-page {
        display: flex;
        align-items: center;
        gap: var(--forge-spacing-sm, 8px);
      }

      .jump-input {
        width: 60px;
      }

      .jump-label {
        font-size: var(--forge-font-size-sm, 14px);
        color: var(--forge-text-secondary, #666666);
      }

      /* Mobile responsive */
      @media (max-width: 768px) {
        .pagination-container {
          justify-content: center;
        }

        .pagination-info {
          width: 100%;
          justify-content: center;
        }

        .total-info {
          display: none;
        }

        .page-button {
          min-width: 36px;
          height: 36px;
        }

        .page-button.nav-text {
          display: none;
        }
      }

      /* Infinite scroll mode */
      .load-more-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--forge-spacing-md, 16px);
        padding: var(--forge-spacing-lg, 24px);
      }

      .load-more-info {
        font-size: var(--forge-font-size-sm, 14px);
        color: var(--forge-text-secondary, #666666);
      }

      /* Accessibility */
      [aria-live] {
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
      }
    `
  ];

  @property({ type: Number, attribute: 'current-page' }) currentPage = 1;
  @property({ type: Number, attribute: 'total-pages' }) totalPages = 1;
  @property({ type: Number, attribute: 'page-size' }) pageSize = 10;
  @property({ type: Array, attribute: 'page-sizes' }) pageSizes: number[] = [10, 25, 50, 100];
  @property({ type: Number, attribute: 'total-items' }) totalItems = 0;
  @property({ type: Boolean, attribute: 'show-page-size' }) showPageSize = true;
  @property({ type: Boolean, attribute: 'show-jump-to' }) showJumpTo = true;
  @property({ type: Boolean, attribute: 'show-total' }) showTotal = true;
  @property({ type: String }) mode: 'pagination' | 'infinite' | 'load-more' = 'pagination';
  @property({ type: Number, attribute: 'sibling-count' }) siblingCount = 1;
  @property({ type: Boolean }) loading = false;
  @property({ type: Boolean, attribute: 'has-more' }) hasMore = false;

  @state() private jumpValue = '';

  constructor() {
    super();
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this.handleKeyDown);
    
    // Persist page size preference
    const savedPageSize = localStorage.getItem('forge-pagination-size');
    if (savedPageSize && this.pageSizes.includes(Number(savedPageSize))) {
      this.pageSize = Number(savedPageSize);
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this.handleKeyDown);
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'ArrowLeft' && this.currentPage > 1) {
      e.preventDefault();
      this.goToPage(this.currentPage - 1);
    } else if (e.key === 'ArrowRight' && this.currentPage < this.totalPages) {
      e.preventDefault();
      this.goToPage(this.currentPage + 1);
    }
  }

  private goToPage(page: number) {
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;
    
    const oldPage = this.currentPage;
    this.currentPage = page;
    
    this.dispatchEvent(new CustomEvent('pagechange', {
      detail: { page, oldPage },
      bubbles: true,
      composed: true
    }));
    
    // Announce to screen readers
    this.announcePageChange();
  }

  private changePageSize(e: CustomEvent) {
    const newSize = Number(e.detail.value);
    if (newSize === this.pageSize) return;
    
    const oldSize = this.pageSize;
    this.pageSize = newSize;
    
    // Save preference
    localStorage.setItem('forge-pagination-size', String(newSize));
    
    // Recalculate current page to maintain position
    const firstItem = (this.currentPage - 1) * oldSize + 1;
    const newPage = Math.ceil(firstItem / newSize);
    
    if (newPage !== this.currentPage) {
      this.currentPage = newPage;
    }
    
    this.dispatchEvent(new CustomEvent('pagesizechange', {
      detail: { pageSize: newSize, oldPageSize: oldSize, page: this.currentPage },
      bubbles: true,
      composed: true
    }));
  }

  private handleJumpToPage() {
    const page = parseInt(this.jumpValue, 10);
    if (isNaN(page)) return;
    
    this.goToPage(Math.max(1, Math.min(page, this.totalPages)));
    this.jumpValue = '';
  }

  private loadMore() {
    this.dispatchEvent(new CustomEvent('loadmore', {
      detail: { page: this.currentPage + 1 },
      bubbles: true,
      composed: true
    }));
  }

  private getPageNumbers(): (number | string)[] {
    const pages: (number | string)[] = [];
    const totalNumbers = this.siblingCount * 2 + 5; // First, last, current, and siblings
    
    if (this.totalPages <= totalNumbers + 2) {
      // Show all pages
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show with ellipsis
      const leftSibling = Math.max(this.currentPage - this.siblingCount, 1);
      const rightSibling = Math.min(this.currentPage + this.siblingCount, this.totalPages);
      
      const showLeftEllipsis = leftSibling > 2;
      const showRightEllipsis = rightSibling < this.totalPages - 1;
      
      pages.push(1);
      
      if (showLeftEllipsis) {
        pages.push('...');
      } else if (leftSibling === 2) {
        pages.push(2);
      }
      
      for (let i = leftSibling; i <= rightSibling; i++) {
        if (i !== 1 && i !== this.totalPages) {
          pages.push(i);
        }
      }
      
      if (showRightEllipsis) {
        pages.push('...');
      } else if (rightSibling === this.totalPages - 1) {
        pages.push(this.totalPages - 1);
      }
      
      pages.push(this.totalPages);
    }
    
    return pages;
  }

  private announcePageChange() {
    const announcement = `Page ${this.currentPage} of ${this.totalPages}`;
    const liveRegion = this.shadowRoot?.querySelector('[aria-live]');
    if (liveRegion) {
      liveRegion.textContent = announcement;
    }
  }

  // AI Metadata
  override get aiState(): AIState {
    return {
      ...super.aiState,
      currentPage: this.currentPage,
      totalPages: this.totalPages,
      pageSize: this.pageSize,
      totalItems: this.totalItems,
      mode: this.mode,
      loading: this.loading,
      hasMore: this.hasMore
    };
  }

  override explainState(): string {
    const parts = ['Pagination component'];
    
    if (this.mode === 'pagination') {
      parts.push(`page ${this.currentPage} of ${this.totalPages}`);
      parts.push(`${this.pageSize} items per page`);
      
      if (this.totalItems) {
        const start = (this.currentPage - 1) * this.pageSize + 1;
        const end = Math.min(this.currentPage * this.pageSize, this.totalItems);
        parts.push(`showing items ${start}-${end} of ${this.totalItems}`);
      }
    } else if (this.mode === 'infinite') {
      parts.push('infinite scroll mode');
      parts.push(this.hasMore ? 'more items available' : 'all items loaded');
    } else if (this.mode === 'load-more') {
      parts.push('load more mode');
      parts.push(this.hasMore ? 'more items available' : 'all items loaded');
    }
    
    if (this.loading) parts.push('loading');
    
    return parts.join(', ');
  }

  override getPossibleActions(): AIAction[] {
    const actions: AIAction[] = [];
    
    if (this.mode === 'pagination') {
      if (this.currentPage > 1) {
        actions.push({
          name: 'previousPage',
          description: 'Go to previous page',
          available: true
        });
        
        actions.push({
          name: 'firstPage',
          description: 'Go to first page',
          available: true
        });
      }
      
      if (this.currentPage < this.totalPages) {
        actions.push({
          name: 'nextPage',
          description: 'Go to next page',
          available: true
        });
        
        actions.push({
          name: 'lastPage',
          description: 'Go to last page',
          available: true
        });
      }
      
      if (this.showJumpTo) {
        actions.push({
          name: 'jumpToPage',
          description: 'Jump to specific page',
          available: true,
          params: ['pageNumber']
        });
      }
      
      if (this.showPageSize) {
        actions.push({
          name: 'changePageSize',
          description: 'Change items per page',
          available: true,
          params: ['size']
        });
      }
    } else if (this.mode === 'load-more' && this.hasMore && !this.loading) {
      actions.push({
        name: 'loadMore',
        description: 'Load more items',
        available: true
      });
    }
    
    return actions;
  }

  override render() {
    if (this.mode === 'infinite') {
      return this.renderInfiniteScroll();
    } else if (this.mode === 'load-more') {
      return this.renderLoadMore();
    }
    
    return this.renderPagination();
  }

  private renderPagination() {
    return html`
      <div class="pagination-container">
        <div class="pagination-info">
          ${this.showPageSize ? this.renderPageSizeSelector() : ''}
          ${this.showTotal ? this.renderTotalInfo() : ''}
        </div>
        
        <div class="pagination-controls">
          ${this.renderPaginationButtons()}
        </div>
        
        ${this.showJumpTo ? this.renderJumpToPage() : ''}
      </div>
      
      <div aria-live="polite" aria-atomic="true"></div>
    `;
  }

  private renderPageSizeSelector() {
    const options: SelectOption[] = this.pageSizes.map(size => ({
      value: String(size),
      label: String(size)
    }));

    return html`
      <div class="page-size-selector">
        <span class="page-size-label">Items per page:</span>
        <forge-select
          .value=${String(this.pageSize)}
          .options=${options}
          @forge-change=${this.changePageSize}
          size="sm"
        ></forge-select>
      </div>
    `;
  }

  private renderTotalInfo() {
    if (!this.totalItems) return '';
    
    const start = (this.currentPage - 1) * this.pageSize + 1;
    const end = Math.min(this.currentPage * this.pageSize, this.totalItems);
    
    return html`
      <span class="total-info">
        ${start}-${end} of ${this.totalItems} items
      </span>
    `;
  }

  private renderPaginationButtons() {
    const pages = this.getPageNumbers();
    
    return html`
      <button
        class="page-button"
        ?disabled=${this.currentPage === 1}
        @click=${() => this.goToPage(1)}
        aria-label="First page"
      >
        <forge-icon name="chevron-double-left" size="sm"></forge-icon>
      </button>
      
      <button
        class="page-button"
        ?disabled=${this.currentPage === 1}
        @click=${() => this.goToPage(this.currentPage - 1)}
        aria-label="Previous page"
      >
        <forge-icon name="chevron-left" size="sm"></forge-icon>
        <span class="nav-text">Previous</span>
      </button>
      
      ${pages.map(page => {
        if (page === '...') {
          return html`<span class="ellipsis">...</span>`;
        }
        
        const pageNum = page as number;
        return html`
          <button
            class="page-button ${pageNum === this.currentPage ? 'active' : ''}"
            @click=${() => this.goToPage(pageNum)}
            aria-label="Page ${pageNum}"
            aria-current=${pageNum === this.currentPage ? 'page' : 'false'}
          >
            ${pageNum}
          </button>
        `;
      })}
      
      <button
        class="page-button"
        ?disabled=${this.currentPage === this.totalPages}
        @click=${() => this.goToPage(this.currentPage + 1)}
        aria-label="Next page"
      >
        <span class="nav-text">Next</span>
        <forge-icon name="chevron-right" size="sm"></forge-icon>
      </button>
      
      <button
        class="page-button"
        ?disabled=${this.currentPage === this.totalPages}
        @click=${() => this.goToPage(this.totalPages)}
        aria-label="Last page"
      >
        <forge-icon name="chevron-double-right" size="sm"></forge-icon>
      </button>
    `;
  }

  private renderJumpToPage() {
    return html`
      <div class="jump-to-page">
        <span class="jump-label">Go to page:</span>
        <forge-input
          class="jump-input"
          type="number"
          min="1"
          max=${this.totalPages}
          .value=${this.jumpValue}
          @input=${(e: Event) => this.jumpValue = (e.target as HTMLInputElement).value}
          @keypress=${(e: KeyboardEvent) => e.key === 'Enter' && this.handleJumpToPage()}
          size="sm"
        ></forge-input>
      </div>
    `;
  }

  private renderLoadMore() {
    return html`
      <div class="load-more-container">
        ${this.totalItems ? html`
          <span class="load-more-info">
            Showing ${this.currentPage * this.pageSize} of ${this.totalItems} items
          </span>
        ` : ''}
        
        ${this.hasMore ? html`
          <forge-button
            variant="primary"
            @click=${this.loadMore}
            ?loading=${this.loading}
            ?disabled=${this.loading}
          >
            Load More
          </forge-button>
        ` : html`
          <span class="load-more-info">All items loaded</span>
        `}
      </div>
    `;
  }

  private renderInfiniteScroll() {
    return html`
      <div class="load-more-container">
        ${this.loading ? html`
          <forge-button variant="text" loading>
            Loading...
          </forge-button>
        ` : ''}
        
        ${!this.hasMore && !this.loading ? html`
          <span class="load-more-info">All items loaded</span>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-pagination': ForgePagination;
  }
}