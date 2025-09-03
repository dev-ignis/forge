# Data Table Component

Advanced data table component with sorting, selection, pagination, and responsive modes for complex data display and management.

## Usage

```typescript
import '@nexcraft/forge/organisms/data-table';

// Basic usage
html`
  <forge-data-table 
    .columns=${this.columns}
    .data=${this.rows}
  ></forge-data-table>
`;
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `columns` | `TableColumn[]` | `[]` | Column definitions |
| `data` | `TableRow[]` | `[]` | Row data |
| `sortable` | `boolean` | `true` | Enable column sorting |
| `selectable` | `boolean` | `false` | Enable row selection |
| `multiSelect` | `boolean` | `false` | Allow multiple row selection |
| `paginated` | `boolean` | `false` | Enable built-in pagination |
| `pageSize` | `number` | `10` | Items per page when paginated |
| `loading` | `boolean` | `false` | Loading state |
| `responsive` | `boolean` | `true` | Enable responsive layout |
| `striped` | `boolean` | `false` | Alternating row colors |
| `hoverable` | `boolean` | `true` | Row hover effects |
| `bordered` | `boolean` | `false` | Table borders |
| `dense` | `boolean` | `false` | Compact row height |
| `sortColumn` | `string` | `''` | Currently sorted column ID |
| `sortDirection` | `'asc' \| 'desc'` | `'asc'` | Sort direction |

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
}
```

### TableRow

```typescript
interface TableRow {
  id: string;
  data: Record<string, any>;
  selected?: boolean;
  expanded?: boolean;
}
```

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `forge-table-sort` | `{ column: string, direction: 'asc' \| 'desc' }` | Fired when column sorting changes |
| `forge-table-select` | `{ rowId: string, selected: boolean }` | Fired when row selection changes |
| `forge-table-select-all` | `{ selected: boolean, rows: string[] }` | Fired when all rows are selected/deselected |
| `forge-table-row-click` | `{ row: TableRow, column: string }` | Fired when table row is clicked |
| `forge-table-cell-click` | `{ row: TableRow, column: string, value: any }` | Fired when table cell is clicked |

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

## Keyboard Navigation

| Key | Action |
|-----|--------|
| `Arrow Up/Down` | Navigate between rows |
| `Arrow Left/Right` | Navigate between cells |
| `Space` | Select/deselect focused row |
| `Enter` | Activate focused cell/row |
| `Ctrl+A` | Select all rows |
| `Home/End` | First/last row |
| `Page Up/Down` | Navigate by page |

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
    .data=${data}
    sortable
    hoverable
  ></forge-data-table>
`;
```

### Selectable Table with Actions

```typescript
html`
  <forge-data-table 
    .columns=${this.columns}
    .data=${this.data}
    selectable
    multi-select
    @forge-table-select=${this.handleRowSelect}
    @forge-table-select-all=${this.handleSelectAll}
  ></forge-data-table>

  ${this.selectedRows.length > 0 ? html`
    <div class="table-actions">
      <forge-button @click=${this.deleteSelected}>
        Delete Selected (${this.selectedRows.length})
      </forge-button>
      <forge-button @click=${this.exportSelected}>
        Export Selected
      </forge-button>
    </div>
  ` : ''}
`;

private handleRowSelect(e: CustomEvent) {
  const { rowId, selected } = e.detail;
  if (selected) {
    this.selectedRows.add(rowId);
  } else {
    this.selectedRows.delete(rowId);
  }
}
```

### Paginated Table

```typescript
html`
  <forge-data-table 
    .columns=${this.columns}
    .data=${this.data}
    paginated
    page-size="25"
    sortable
    @forge-table-sort=${this.handleSort}
  ></forge-data-table>
`;

private handleSort(e: CustomEvent) {
  const { column, direction } = e.detail;
  this.sortData(column, direction);
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
    .data=${this.data}
    .loading=${this.isLoading}
  ></forge-data-table>
`;

private async loadData() {
  this.isLoading = true;
  try {
    this.data = await this.dataService.fetchTableData();
  } finally {
    this.isLoading = false;
  }
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

## Performance Considerations

- Virtual scrolling for large datasets (10,000+ rows)
- Efficient rendering with row virtualization
- Debounced sorting and filtering
- Memory management for event listeners
- Optimized selection state management

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

## Related Components

- [Pagination](./pagination.md) - Often used together for data navigation
- [Checkbox](../checkbox.md) - Used for row selection
- [Button](../button.md) - Used for action buttons
- [Icon](../icon.md) - Used for sort indicators and actions