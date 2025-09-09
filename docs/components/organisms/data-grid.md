# Data Grid Component

Enterprise-grade data grid component with **virtual scrolling**, advanced filtering, sorting, cell editing, and comprehensive accessibility. Designed for complex data management with 10,000+ rows, multi-column operations, and real-time interactions. Fully compliant with ADR-014 AI integration, ADR-012 accessibility standards, and ADR-002 Shadow DOM encapsulation.

## Usage

```typescript
import '@nexcraft/forge/organisms/data-grid';

// Basic usage
html`
  <forge-data-grid 
    .columns=${this.columns}
    .data=${this.data}
  ></forge-data-grid>
`;

// Advanced configuration with all features
html`
  <forge-data-grid 
    .columns=${this.columns}
    .data=${this.data}
    selectable
    selection-type="multiple"
    virtual-scrolling
    virtual-threshold="1000"
    show-toolbar
    show-search
    editable
    loading=${this.isLoading}
    @selection-changed=${this.handleSelectionChange}
    @cell-edit=${this.handleCellEdit}
    @sort-changed=${this.handleSort}
  ></forge-data-grid>
`;

// Column configuration example
const columns: GridColumn[] = [
  {
    id: 'name',
    title: 'Name',
    field: 'name',
    sortable: true,
    filterable: true,
    editable: true,
    width: '200px',
    align: 'left',
    type: 'text'
  },
  {
    id: 'salary',
    title: 'Salary',
    field: 'salary',
    sortable: true,
    type: 'currency',
    align: 'right',
    width: '120px',
    format: (value) => new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value as number)
  }
];
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `columns` | `GridColumn[]` | `[]` | Column definitions with sorting, filtering, editing config |
| `data` | `GridData[]` | `[]` | Row data objects |
| `selectable` | `boolean` | `false` | Enable row selection functionality |
| `selectionType` | `'single' \| 'multiple'` | `'multiple'` | Selection mode |
| `selectedRows` | `string[]` | `[]` | Currently selected row IDs |
| `virtualScrolling` | `boolean` | `false` | Enable virtual scrolling for large datasets |
| `virtualThreshold` | `number` | `1000` | Minimum rows to activate virtual scrolling |
| `showToolbar` | `boolean` | `true` | Display toolbar with search and actions |
| `showSearch` | `boolean` | `true` | Show global search input in toolbar |
| `searchQuery` | `string` | `''` | Current search query |
| `showPagination` | `boolean` | `false` | Enable pagination (alternative to virtual scrolling) |
| `pageSize` | `number` | `25` | Rows per page when pagination is enabled |
| `currentPage` | `number` | `1` | Current page number |
| `loading` | `boolean` | `false` | Show loading state with spinner |
| `editable` | `boolean` | `false` | Enable inline cell editing |
| `sorts` | `GridSort[]` | `[]` | Current sort configuration |
| `filters` | `GridFilter[]` | `[]` | Active column filters |
| `noDataMessage` | `string` | `'No data available'` | Message when no data to display |
| `emptySearchMessage` | `string` | `'No results found'` | Message when search yields no results |

## GridColumn Interface

```typescript
interface GridColumn {
  id: string;                    // Unique column identifier
  title: string;                 // Display title in header
  field: string;                 // Data field key
  width?: string;                // Column width (CSS value)
  minWidth?: number;             // Minimum width in pixels
  maxWidth?: number;             // Maximum width in pixels
  align?: 'left' | 'center' | 'right'; // Text alignment
  sortable?: boolean;            // Enable sorting
  filterable?: boolean;          // Enable filtering
  resizable?: boolean;           // Enable column resizing
  pinned?: 'left' | 'right' | false; // Pin column position
  type?: 'text' | 'number' | 'date' | 'boolean' | 'currency' | 'percentage'; // Data type
  format?: (value: unknown) => string; // Custom formatter function
  renderer?: (value: unknown, row: GridData) => TemplateResult; // Custom cell renderer
  editor?: GridEditor;           // Custom editor configuration
  validation?: ValidationRule[]; // Validation rules for editing
  aggregate?: 'sum' | 'avg' | 'count' | 'min' | 'max'; // Footer aggregation
}
```

## Events

| Event | Detail Type | Description |
|-------|-------------|-------------|
| `selection-changed` | `{ selectedRows: string[], allSelected: boolean }` | Fired when row selection changes |
| `cell-edit` | `{ rowId: string, field: string, oldValue: unknown, newValue: unknown }` | Fired when cell is edited |
| `cell-edit-start` | `{ rowId: string, field: string, value: unknown }` | Fired when cell editing begins |
| `cell-edit-cancel` | `{ rowId: string, field: string }` | Fired when cell editing is cancelled |
| `sort-changed` | `{ sorts: GridSort[] }` | Fired when sorting changes |
| `filter-changed` | `{ filters: GridFilter[] }` | Fired when filters change |
| `search-changed` | `{ query: string, results: GridData[] }` | Fired when search query changes |
| `export-request` | `{ format: 'csv' \| 'json', selectedOnly: boolean }` | Fired when export is requested |
| `page-changed` | `{ page: number, pageSize: number }` | Fired when pagination changes |

## Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| `selectRow(rowId: string)` | `rowId: string` | Select a specific row |
| `selectAllRows()` | - | Select all visible rows |
| `clearSelection()` | - | Clear all selections |
| `getSelectedData()` | - | Returns data for selected rows |
| `exportData(format, selectedOnly?)` | `format: 'csv' \| 'json'`, `selectedOnly?: boolean` | Export grid data |
| `applyFilter(columnId, value)` | `columnId: string`, `value: unknown` | Apply filter to column |
| `clearFilters()` | - | Remove all filters |
| `sort(columnId, direction?)` | `columnId: string`, `direction?: 'asc' \| 'desc'` | Sort by column |
| `refresh()` | - | Refresh grid display |

## CSS Custom Properties

```css
forge-data-grid {
  /* Grid appearance */
  --grid-header-bg: #f8fafc;
  --grid-header-text: #1f2937;
  --grid-row-bg: #ffffff;
  --grid-row-hover-bg: #f3f4f6;
  --grid-row-selected-bg: #dbeafe;
  --grid-border-color: #e5e7eb;
  
  /* Cell styling */
  --grid-cell-padding: 12px 16px;
  --grid-cell-font-size: 14px;
  --grid-header-font-weight: 600;
  
  /* Selection styling */
  --grid-selection-bg: #3b82f6;
  --grid-selection-color: white;
  
  /* Toolbar styling */
  --toolbar-bg: #ffffff;
  --toolbar-border: 1px solid #e5e7eb;
  --toolbar-padding: 16px;
  
  /* Loading state */
  --loading-overlay-bg: rgba(255, 255, 255, 0.8);
  --loading-spinner-color: #3b82f6;
  
  /* Virtual scrolling */
  --virtual-spacer-bg: transparent;
  
  /* Performance indicators */
  --performance-warning-color: #f59e0b;
  --performance-error-color: #ef4444;
}
```

## Advanced Features

### Virtual Scrolling

Automatically handles large datasets efficiently:

```typescript
html`
  <forge-data-grid 
    .columns=${columns}
    .data=${largeDataset}
    virtual-scrolling
    virtual-threshold="500"
  ></forge-data-grid>
`;
```

### Cell Editing

Configure inline editing with validation:

```typescript
const editableColumns: GridColumn[] = [
  {
    id: 'name',
    title: 'Name',
    field: 'name',
    editable: true,
    editor: {
      type: 'text',
      required: true,
      placeholder: 'Enter name...'
    },
    validation: [
      { type: 'required', message: 'Name is required' },
      { type: 'minLength', value: 2, message: 'Name must be at least 2 characters' }
    ]
  }
];
```

### Multi-Column Sorting

```typescript
// Handle sort changes
handleSort(event: CustomEvent) {
  const { sorts } = event.detail;
  console.log('Active sorts:', sorts);
  // sorts: [{ field: 'name', direction: 'asc' }, { field: 'age', direction: 'desc' }]
}
```

### Custom Cell Renderers

```typescript
const columns: GridColumn[] = [
  {
    id: 'status',
    title: 'Status',
    field: 'status',
    renderer: (value, row) => html`
      <forge-badge 
        variant=${value === 'active' ? 'success' : 'warning'}
      >
        ${value}
      </forge-badge>
    `
  }
];
```

### Export Functionality

```typescript
// Listen for export requests
handleExport(event: CustomEvent) {
  const { format, selectedOnly } = event.detail;
  // Handle CSV or JSON export
  this.dataGrid.exportData(format, selectedOnly);
}
```

## Accessibility Features

- **ARIA Labels**: Comprehensive labeling for screen readers
- **Keyboard Navigation**: Full keyboard support (Tab, Arrow keys, Enter, Escape)
- **Screen Reader Announcements**: Selection and state changes announced
- **High Contrast Support**: Respects user's contrast preferences
- **Focus Management**: Proper focus handling during editing
- **WCAG 2.1 AA Compliance**: Meets accessibility standards

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Tab` | Navigate between cells |
| `Arrow Keys` | Move focus within grid |
| `Space` | Toggle row selection |
| `Ctrl/Cmd + A` | Select all rows |
| `Enter` | Start editing cell |
| `Escape` | Cancel editing |
| `Ctrl/Cmd + F` | Focus search |

## Performance Optimization

- **Virtual Scrolling**: Renders only visible rows
- **Debounced Search**: Prevents excessive filtering
- **Memoized Sorting**: Caches sort results
- **Efficient Updates**: Minimal DOM manipulation
- **Performance Monitoring**: Built-in render time tracking

## AI Integration

The ForgeDataGrid is AI-ready with comprehensive metadata:

```typescript
// AI can interact with the grid
const grid = document.querySelector('forge-data-grid');

// Get AI metadata
const metadata = grid.getAIMetadata();
console.log(metadata.purpose); // "Display and manage tabular data with advanced interactions"

// AI actions available
const actions = grid.getAIPossibleActions();
// Returns: select, sort, filter, search, export, edit actions

// Get current state explanation
const state = grid.explainState();
console.log(state.summary); // "Data grid displaying 150 items, 3 selected, sorted by name ascending"
```

## Examples

### Basic Data Grid

```typescript
class MyApp extends LitElement {
  @state() private data: GridData[] = [
    { id: '1', name: 'John Doe', email: 'john@example.com', status: 'active' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', status: 'inactive' }
  ];

  @state() private columns: GridColumn[] = [
    { id: 'name', title: 'Name', field: 'name', sortable: true },
    { id: 'email', title: 'Email', field: 'email', sortable: true },
    { id: 'status', title: 'Status', field: 'status', filterable: true }
  ];

  render() {
    return html`
      <forge-data-grid 
        .columns=${this.columns}
        .data=${this.data}
        selectable
        show-toolbar
        @selection-changed=${this.handleSelectionChange}
      ></forge-data-grid>
    `;
  }

  private handleSelectionChange(event: CustomEvent) {
    console.log('Selected rows:', event.detail.selectedRows);
  }
}
```

### Advanced Configuration

```typescript
class AdvancedGrid extends LitElement {
  @state() private employees: Employee[] = [];
  @state() private loading = false;

  private columns: GridColumn[] = [
    {
      id: 'avatar',
      title: '',
      field: 'avatar',
      width: '60px',
      renderer: (value, row) => html`
        <img src=${value} alt=${row.name} style="width: 40px; height: 40px; border-radius: 50%;">
      `
    },
    {
      id: 'name',
      title: 'Full Name',
      field: 'name',
      sortable: true,
      filterable: true,
      editable: true,
      width: '200px'
    },
    {
      id: 'department',
      title: 'Department',
      field: 'department',
      sortable: true,
      filterable: true,
      width: '150px'
    },
    {
      id: 'salary',
      title: 'Salary',
      field: 'salary',
      sortable: true,
      type: 'currency',
      align: 'right',
      aggregate: 'avg'
    },
    {
      id: 'status',
      title: 'Status',
      field: 'status',
      filterable: true,
      renderer: (value) => html`
        <forge-badge variant=${value === 'active' ? 'success' : 'warning'}>
          ${value}
        </forge-badge>
      `
    }
  ];

  render() {
    return html`
      <forge-data-grid 
        .columns=${this.columns}
        .data=${this.employees}
        .loading=${this.loading}
        selectable
        selection-type="multiple"
        virtual-scrolling
        virtual-threshold="1000"
        editable
        show-toolbar
        show-search
        @cell-edit=${this.handleCellEdit}
        @export-request=${this.handleExport}
        @selection-changed=${this.handleSelectionChange}
      ></forge-data-grid>
    `;
  }

  private async handleCellEdit(event: CustomEvent) {
    const { rowId, field, newValue } = event.detail;
    try {
      await this.updateEmployee(rowId, { [field]: newValue });
      this.showSuccess('Employee updated successfully');
    } catch (error) {
      this.showError('Failed to update employee');
    }
  }

  private handleExport(event: CustomEvent) {
    const { format, selectedOnly } = event.detail;
    const grid = event.target as ForgeDataGrid;
    grid.exportData(format, selectedOnly);
  }
}
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Related Components

- [`<forge-data-table>`](./data-table.md) - Simpler table for basic data display
- [`<forge-pagination>`](./pagination.md) - Pagination controls
- [`<forge-checkbox>`](../atoms/checkbox.md) - Selection checkboxes
- [`<forge-button>`](../atoms/button.md) - Action buttons
- [`<forge-icon>`](../atoms/icon.md) - Sort and action icons