# Data Table Component

Production-ready data table component with virtual scrolling, accessibility, performance optimizations, sorting, selection, and responsive modes for complex data display and management. Fully compliant with ADR-016 performance requirements and ADR-012 accessibility standards.

## Usage

```typescript
import '@nexcraft/forge/organisms/data-table';

// Basic usage
html`
  <forge-data-table 
    .columns=${this.columns}
    .rows=${this.rows}
  ></forge-data-table>
`;

// With virtual scrolling for large datasets
html`
  <forge-data-table 
    .columns=${this.columns}
    .rows=${this.rows}
    virtual-scrolling
    virtual-threshold="1000"
  ></forge-data-table>
`;

// With async data provider
html`
  <forge-data-table 
    .columns=${this.columns}
    .dataProvider=${async () => await this.fetchData()}
    .filters=${{ status: 'active' }}
  ></forge-data-table>
`;
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `columns` | `TableColumn[]` | `[]` | Column definitions |
| `rows` | `TableRow[]` | `[]` | Row data |
| `dataProvider` | `() => Promise<TableRow[]>` | `undefined` | Async data loading function |
| `filters` | `Record<string, any>` | `undefined` | Filter criteria for rows |
| `loading` | `boolean` | `false` | Loading state |
| `selectable` | `boolean` | `false` | Enable row selection |
| `expandable` | `boolean` | `false` | Enable row expansion |
| `striped` | `boolean` | `false` | Alternating row colors |
| `lazyLoad` | `boolean` | `false` | Enable lazy loading with dataProvider |
| **Performance Properties (ADR-016)** | | | |
| `virtualScrolling` | `boolean` | `false` | Enable virtual scrolling for large datasets |
| `virtualThreshold` | `number` | `1000` | Auto-enable virtual scrolling above this row count |
| `performanceMode` | `'auto' \| 'fast' \| 'quality'` | `'auto'` | Performance optimization mode |
| **State Properties** | | | |
| `sortColumn` | `string` | `undefined` | Currently sorted column ID |
| `sortDirection` | `'asc' \| 'desc'` | `'asc'` | Sort direction |
| `selectedRows` | `Set<string>` | `new Set()` | Selected row IDs |
| `expandedRows` | `Set<string>` | `new Set()` | Expanded row IDs |
| `dataError` | `Error \| null` | `null` | Data loading error |

## Interfaces

### TableColumn

```typescript
interface TableColumn {
  id: string;
  label: string;
  sortable?: boolean;
  resizable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  formatter?: (value: any) => string;
}
```

### TableRow

```typescript
interface TableRow {
  id: string;
  data: Record<string, any>;
  selected?: boolean;
  expanded?: boolean;
  expandedContent?: string | TemplateResult;
}
```

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `sort` | `{ column: string, direction: 'asc' \| 'desc' }` | Fired when column sorting changes |
| `selectionchange` | `{ selectedIds: string[] }` | Fired when row selection changes |
| `expand` | `{ rowId: string, expanded: boolean }` | Fired when row expansion changes |
| `dataload` | `{ count: number }` | Fired when data is loaded via dataProvider |
| `filterchange` | `{ filtered: number, total: number }` | Fired when filters are applied |
| **Deprecated Events** | | |
| `forge-table-*` | Various | Legacy events (still supported) |

## Methods

### Public Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `selectRow(rowId)` | `rowId: string` | `void` | Select a specific row |
| `deselectRow(rowId)` | `rowId: string` | `void` | Deselect a specific row |
| `selectAllRows()` | - | `void` | Select all visible rows |
| `deselectAllRows()` | - | `void` | Deselect all rows |
| `sortByColumn(columnId, direction?)` | `columnId: string, direction?: 'asc' \| 'desc'` | `void` | Sort table by column |
| `getSelectedRows()` | - | `TableRow[]` | Get currently selected rows |

### AI Metadata Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `explainState()` | `string` | Returns detailed explanation of current state |
| `getPossibleActions()` | `AIAction[]` | Returns available actions based on current state |
| `aiState` | `AIState` | Current component state for AI analysis |

## Keyboard Navigation (Enhanced - ADR-012 Compliant)

| Key | Action |
|-----|--------|
| `Arrow Up/Down` | Navigate between table cells vertically |
| `Arrow Left/Right` | Navigate between table cells horizontally |
| `Home` | Go to first cell in current row |
| `End` | Go to last cell in current row |
| `Ctrl+Home` | Go to first cell in table |
| `Ctrl+End` | Go to last cell in table |
| `Space` | Toggle selection for focused row (if selectable) |
| `Enter` | Activate focused cell or toggle expansion |
| `Tab/Shift+Tab` | Navigate between focusable elements |

**Accessibility Features:**
- All cells are focusable with `tabindex="0"`
- Screen reader announcements via ARIA live regions
- Cell content announced during navigation
- Sort changes and selections announced
- `role="grid"` for proper table semantics

## Styling

### CSS Custom Properties

```css
forge-data-table {
  --forge-table-bg: #ffffff;
  --forge-table-border: #e0e0e0;
  --forge-table-header-bg: #f8f9fa;
  --forge-table-header-color: #333333;
  --forge-table-row-hover-bg: #f8f9fa;
  --forge-table-selected-bg: #e3f2fd;
  --forge-table-striped-bg: #f9f9f9;
  --forge-table-cell-padding: 12px;
  --forge-table-border-radius: 8px;
  --forge-table-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  --forge-table-dense-padding: 8px;
}
```

### CSS Parts

| Part | Description |
|------|-------------|
| `table-container` | Main container wrapper |
| `table` | HTML table element |
| `table-header` | Table header section |
| `header-cell` | Header cell element |
| `table-body` | Table body section |
| `table-row` | Table row element |
| `table-cell` | Table cell element |
| `sort-indicator` | Column sort indicator |
| `selection-checkbox` | Row selection checkbox |

## Examples

### Basic Data Table

```typescript
const columns: TableColumn[] = [
  { id: 'name', label: 'Name', sortable: true },
  { id: 'email', label: 'Email', sortable: true },
  { id: 'role', label: 'Role' },
  { id: 'status', label: 'Status', align: 'center' }
];

const data: TableRow[] = [
  {
    id: '1',
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Administrator',
      status: 'Active'
    }
  },
  {
    id: '2',
    data: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'Editor',
      status: 'Active'
    }
  }
];

html`
  <forge-data-table 
    .columns=${columns}
    .rows=${data}
    selectable
    striped
  ></forge-data-table>
`;
```

### Virtual Scrolling for Large Datasets

```typescript
// Auto-enables virtual scrolling for datasets > 1000 rows
html`
  <forge-data-table 
    .columns=${this.columns}
    .rows=${this.largeDataset}
    performance-mode="auto"
    virtual-threshold="500"
  ></forge-data-table>
`;

// Manual virtual scrolling
html`
  <forge-data-table 
    .columns=${this.columns}
    .rows=${this.rows}
    virtual-scrolling
  ></forge-data-table>
`;
```

### Async Data Loading with DataProvider

```typescript
html`
  <forge-data-table 
    .columns=${this.columns}
    .dataProvider=${this.loadTableData}
    .filters=${{ status: 'active', role: 'admin' }}
    lazy-load
    @dataload=${this.handleDataLoad}
    @filterchange=${this.handleFilterChange}
  ></forge-data-table>
`;

private async loadTableData(): Promise<TableRow[]> {
  try {
    const response = await fetch('/api/users');
    const users = await response.json();
    return users.map(user => ({
      id: user.id,
      data: user
    }));
  } catch (error) {
    console.error('Failed to load data:', error);
    throw error;
  }
}

private handleDataLoad(e: CustomEvent) {
  console.log(`Loaded ${e.detail.count} rows`);
}
```

### Selectable Table with Actions

```typescript
html`
  <forge-data-table 
    .columns=${this.columns}
    .rows=${this.rows}
    selectable
    @selectionchange=${this.handleSelectionChange}
  ></forge-data-table>

  ${this.selectedRows.size > 0 ? html`
    <div class="table-actions">
      <forge-button @click=${this.deleteSelected}>
        Delete Selected (${this.selectedRows.size})
      </forge-button>
      <forge-button @click=${this.exportSelected}>
        Export Selected
      </forge-button>
    </div>
  ` : ''}
`;

private handleSelectionChange(e: CustomEvent) {
  const { selectedIds } = e.detail;
  this.selectedRows = new Set(selectedIds);
}
```

### Paginated Table

```typescript
html`
  <forge-data-table 
    .columns=${this.columns}
    .rows=${this.rows}
    @sort=${this.handleSort}
  ></forge-data-table>
`;

private handleSort(e: CustomEvent) {
  const { column, direction } = e.detail;
  // Sort is handled automatically by the component
  // This event is for external sync/logging
  console.log(`Table sorted by ${column} ${direction}`);
}
```

### Custom Cell Rendering

```typescript
const columns: TableColumn[] = [
  { id: 'avatar', label: 'User', width: '60px' },
  { id: 'name', label: 'Name', sortable: true },
  { id: 'status', label: 'Status', align: 'center' },
  { id: 'actions', label: 'Actions', align: 'right' }
];

// Custom cell renderer using slot or custom rendering
html`
  <forge-data-table .columns=${columns}>
    ${this.data.map(row => html`
      <tr slot="row-${row.id}">
        <td>
          <img src="${row.data.avatar}" alt="${row.data.name}" class="avatar">
        </td>
        <td>${row.data.name}</td>
        <td>
          <forge-badge 
            variant="${row.data.status === 'active' ? 'success' : 'warning'}"
          >
            ${row.data.status}
          </forge-badge>
        </td>
        <td>
          <forge-button size="small" @click=${() => this.editUser(row.id)}>
            Edit
          </forge-button>
          <forge-button size="small" variant="danger" @click=${() => this.deleteUser(row.id)}>
            Delete
          </forge-button>
        </td>
      </tr>
    `)}
  </forge-data-table>
`;
```

### Responsive Table

```typescript
html`
  <forge-data-table 
    .columns=${this.columns}
    .data=${this.data}
    responsive
    striped
    bordered
  ></forge-data-table>
`;
```

### Loading State

```typescript
html`
  <forge-data-table 
    .columns=${this.columns}
    .dataProvider=${this.loadData}
    lazy-load
  ></forge-data-table>
`;

private async loadData(): Promise<TableRow[]> {
  const data = await this.dataService.fetchTableData();
  return data.map(item => ({
    id: item.id,
    data: item
  }));
}
```

## Responsive Behavior

### Desktop
- Full table layout with all columns visible
- Column resizing and sorting available
- Horizontal scrolling for overflow

### Tablet
- May hide less important columns
- Compact column spacing
- Touch-friendly interaction targets

### Mobile
- Stacked card layout for rows
- Column headers as labels for each value
- Swipe actions for row operations

## Server-Side Integration

### Sorting

```typescript
private async handleSort(e: CustomEvent) {
  const { column, direction } = e.detail;
  
  this.isLoading = true;
  try {
    const response = await this.apiService.fetchData({
      sortBy: column,
      sortDirection: direction,
      page: this.currentPage,
      pageSize: this.pageSize
    });
    
    this.data = response.data;
    this.totalItems = response.total;
  } finally {
    this.isLoading = false;
  }
}
```

### Pagination

```typescript
private async handlePageChange(page: number) {
  this.isLoading = true;
  try {
    const response = await this.apiService.fetchData({
      page,
      pageSize: this.pageSize,
      sortBy: this.sortColumn,
      sortDirection: this.sortDirection
    });
    
    this.data = response.data;
    this.currentPage = page;
  } finally {
    this.isLoading = false;
  }
}
```

## Accessibility

- Full WCAG 2.1 AA compliance
- Keyboard navigation support
- ARIA attributes for screen readers:
  - `role="table"`, `role="row"`, `role="cell"`
  - `aria-sort` for sortable columns
  - `aria-selected` for selected rows
  - `aria-expanded` for expandable rows
- Screen reader announcements for sorting and selection
- Focus management and visual indicators

## Performance Considerations (ADR-016 Compliant)

- **Virtual scrolling**: Auto-enabled for datasets > 1000 rows
- **Debounced operations**: Sort (300ms) and filter (500ms) operations
- **Performance monitoring**: 60fps threshold with auto-optimization
- **Memory management**: Proper cleanup of event listeners and resources
- **Render optimization**: Only visible rows rendered in virtual mode
- **Performance modes**:
  - `auto`: Automatically optimizes based on dataset size
  - `fast`: Prioritizes speed over visual polish
  - `quality`: Prioritizes visual quality over speed

## Advanced Features

### Column Resizing

```typescript
const columns: TableColumn[] = [
  { id: 'name', label: 'Name', resizable: true, width: '200px' },
  { id: 'email', label: 'Email', resizable: true, width: '250px' }
];
```

### Expandable Rows

```typescript
const rowsWithDetails = data.map(row => ({
  ...row,
  expandable: true,
  details: html`
    <div class="row-details">
      <p>Additional information about ${row.data.name}</p>
    </div>
  `
}));
```

### Custom Filters

```typescript
html`
  <div class="table-filters">
    <forge-input 
      placeholder="Search..."
      @input=${this.handleSearch}
    ></forge-input>
    <forge-select 
      .options=${this.statusOptions}
      @change=${this.handleStatusFilter}
    ></forge-select>
  </div>
  
  <forge-data-table 
    .columns=${this.columns}
    .data=${this.filteredData}
  ></forge-data-table>
`;
```

## Browser Support

- Chrome 84+
- Firefox 78+
- Safari 14+
- Edge 84+

## ADR Compliance

This component is fully compliant with:

### ADR-016: Organism Components
- ✅ **Virtual Scrolling**: Auto-enabled for large datasets (>1000 rows)
- ✅ **DataProvider Pattern**: Async data loading with error handling
- ✅ **Performance Optimizations**: Debounced operations, render monitoring
- ✅ **Filter Support**: Complex filtering with functions, regex, and equality

### ADR-012: Accessibility Standards
- ✅ **Keyboard Navigation**: Complete arrow key navigation between cells
- ✅ **ARIA Live Regions**: Screen reader announcements for all changes
- ✅ **Focus Management**: Proper focus indicators and tab order
- ✅ **WCAG 2.1 AA**: Full accessibility compliance

### ADR-014: AI-Ready Components
- ✅ **AI Metadata**: Comprehensive state information for AI analysis
- ✅ **State Explanation**: Natural language descriptions of current state
- ✅ **Action Discovery**: Programmatic access to available actions

### Production Features
- ✅ **Error Handling**: Graceful failure modes with user feedback
- ✅ **Performance Monitoring**: 60fps threshold with console warnings
- ✅ **Memory Management**: Proper cleanup of resources
- ✅ **Type Safety**: 100% TypeScript coverage

## Related Components

- [Pagination](./pagination.md) - Often used together for data navigation
- [Checkbox](../checkbox.md) - Used for row selection
- [Button](../button.md) - Used for action buttons
- [Icon](../icon.md) - Used for sort indicators and actions