# Pagination Component

Production-ready comprehensive pagination component with multiple modes including standard pagination, infinite scroll, and load more functionality. Full TypeScript compliance with AI metadata support.

## Usage

```typescript
import '@nexcraft/forge/organisms/pagination';

// Basic usage
html`
  <forge-pagination 
    current-page="1" 
    total-pages="10"
    total-items="100"
  ></forge-pagination>
`;
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `currentPage` | `number` | `1` | Current active page number |
| `totalPages` | `number` | `1` | Total number of pages |
| `totalItems` | `number` | `0` | Total number of items across all pages |
| `pageSize` | `number` | `10` | Number of items per page |
| `mode` | `'pagination' \| 'infinite' \| 'load-more'` | `'pagination'` | Pagination mode |
| `showPageSize` | `boolean` | `true` | Show page size selector |
| `showJumpTo` | `boolean` | `true` | Show jump to page input |
| `showInfo` | `boolean` | `true` | Show pagination info text |
| `maxVisiblePages` | `number` | `7` | Maximum visible page buttons |
| `pageSizeOptions` | `number[]` | `[10, 25, 50, 100]` | Available page size options |
| `loading` | `boolean` | `false` | Loading state for async operations |
| `hasNextPage` | `boolean` | `true` | Whether there are more pages (infinite/load-more modes) |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `forge-page-change` | `{ page: number, previousPage: number }` | Fired when page changes |
| `forge-page-size-change` | `{ pageSize: number, previousPageSize: number }` | Fired when page size changes |
| `forge-load-more` | `{ currentPage: number }` | Fired when load more is triggered |

## Methods

### Public Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `goToPage(page)` | `page: number` | `void` | Navigate to specific page |
| `nextPage()` | - | `void` | Navigate to next page |
| `previousPage()` | - | `void` | Navigate to previous page |
| `firstPage()` | - | `void` | Navigate to first page |
| `lastPage()` | - | `void` | Navigate to last page |
| `setPageSize(size)` | `size: number` | `void` | Change page size |

### AI Metadata Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `explainState()` | `string` | Returns detailed explanation of current state |
| `getPossibleActions()` | `AIAction[]` | Returns available actions based on current state |
| `aiState` | `AIState` | Current component state for AI analysis |

## Keyboard Navigation

| Key | Action |
|-----|--------|
| `Arrow Left` | Previous page |
| `Arrow Right` | Next page |
| `Home` | First page |
| `End` | Last page |
| `Enter` | Activate focused page button |

## Styling

### CSS Custom Properties

```css
forge-pagination {
  --forge-pagination-bg: #ffffff;
  --forge-pagination-border: #e0e0e0;
  --forge-pagination-border-radius: 8px;
  --forge-pagination-button-size: 40px;
  --forge-pagination-button-gap: 4px;
  --forge-pagination-active-color: #007bff;
  --forge-pagination-active-bg: #007bff;
  --forge-pagination-hover-bg: #f8f9fa;
  --forge-pagination-disabled-opacity: 0.5;
  --forge-pagination-padding: 16px;
}
```

### CSS Parts

| Part | Description |
|------|-------------|
| `pagination-container` | Main container element |
| `pagination-info` | Information section |
| `pagination-controls` | Page navigation controls |
| `page-button` | Individual page button |
| `page-size-selector` | Page size selection dropdown |
| `jump-to-page` | Jump to page input |

## Pagination Modes

### Standard Pagination

Default mode with numbered page buttons and navigation controls.

```typescript
html`
  <forge-pagination 
    current-page="3" 
    total-pages="20"
    total-items="200"
    mode="pagination"
  ></forge-pagination>
`;
```

### Infinite Scroll Mode

Automatically loads more content as user scrolls to bottom.

```typescript
html`
  <forge-pagination 
    mode="infinite"
    .hasNextPage=${this.hasMore}
    .loading=${this.isLoading}
    @forge-load-more=${this.loadMoreItems}
  ></forge-pagination>
`;

private async loadMoreItems() {
  this.isLoading = true;
  const newItems = await this.fetchMoreItems();
  this.items = [...this.items, ...newItems];
  this.hasMore = newItems.length === this.pageSize;
  this.isLoading = false;
}
```

### Load More Mode

Shows a "Load More" button to fetch additional content.

```typescript
html`
  <forge-pagination 
    mode="load-more"
    .hasNextPage=${this.hasMore}
    .loading=${this.isLoading}
    @forge-load-more=${this.loadMoreItems}
  ></forge-pagination>
`;
```

## Examples

### Basic Pagination

```typescript
html`
  <forge-pagination 
    current-page="1" 
    total-pages="15"
    total-items="150"
    @forge-page-change=${this.handlePageChange}
  ></forge-pagination>
`;

private handlePageChange(e: CustomEvent) {
  const { page } = e.detail;
  this.loadPage(page);
}
```

### Custom Page Sizes

```typescript
html`
  <forge-pagination 
    current-page="1" 
    total-pages="10"
    total-items="500"
    page-size="50"
    .pageSizeOptions=${[25, 50, 100, 200]}
    @forge-page-size-change=${this.handlePageSizeChange}
  ></forge-pagination>
`;

private handlePageSizeChange(e: CustomEvent) {
  const { pageSize } = e.detail;
  this.pageSize = pageSize;
  this.currentPage = 1; // Reset to first page
  this.loadPage(1);
}
```

### Minimal Pagination

```typescript
html`
  <forge-pagination 
    current-page="5" 
    total-pages="20"
    show-page-size="false"
    show-jump-to="false"
    max-visible-pages="5"
  ></forge-pagination>
`;
```

### Server-Side Pagination

```typescript
class MyComponent extends LitElement {
  @state() private currentPage = 1;
  @state() private totalPages = 1;
  @state() private totalItems = 0;
  @state() private loading = false;

  render() {
    return html`
      <forge-pagination 
        .currentPage=${this.currentPage}
        .totalPages=${this.totalPages}
        .totalItems=${this.totalItems}
        .loading=${this.loading}
        @forge-page-change=${this.handlePageChange}
        @forge-page-size-change=${this.handlePageSizeChange}
      ></forge-pagination>
    `;
  }

  private async handlePageChange(e: CustomEvent) {
    const { page } = e.detail;
    this.loading = true;
    
    try {
      const response = await this.fetchPage(page);
      this.currentPage = response.currentPage;
      this.totalPages = response.totalPages;
      this.totalItems = response.totalItems;
      this.data = response.data;
    } finally {
      this.loading = false;
    }
  }
}
```

## Accessibility

- Full WCAG 2.1 AA compliance
- Keyboard navigation support
- ARIA attributes for screen readers:
  - `role="navigation"` with `aria-label="Pagination"`
  - `aria-current="page"` for current page
  - `aria-label` descriptions for all buttons
- Screen reader announcements for page changes
- Focus management between page changes

## Performance Considerations

- Efficient rendering of page buttons with ellipsis for large page counts
- Debounced input handling for jump-to-page
- Lazy loading support for infinite scroll mode
- Memory efficient event handling
- Optimized re-rendering with `shouldUpdate`

## Integration Patterns

### With Data Table

```typescript
html`
  <forge-data-table .data=${this.paginatedData}></forge-data-table>
  <forge-pagination 
    .currentPage=${this.currentPage}
    .totalPages=${this.totalPages}
    @forge-page-change=${this.handlePageChange}
  ></forge-pagination>
`;
```

### With Search Results

```typescript
html`
  <div class="search-results">
    ${this.results.map(result => html`
      <div class="result-item">${result.title}</div>
    `)}
  </div>
  
  <forge-pagination 
    .currentPage=${this.currentPage}
    .totalPages=${this.totalPages}
    .totalItems=${this.totalResults}
    @forge-page-change=${this.handlePageChange}
  ></forge-pagination>
`;
```

## Browser Support

- Chrome 84+
- Firefox 78+
- Safari 14+
- Edge 84+

## Related Components

- [Data Table](./data-table.md) - Commonly used together for data display
- [Button](../button.md) - Used internally for navigation buttons
- [Select](../select.md) - Used for page size selection
- [Input](../input.md) - Used for jump to page functionality