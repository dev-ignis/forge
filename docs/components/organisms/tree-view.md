# Tree View Component

Production-ready hierarchical tree view component with **virtual scrolling** for large datasets, expand/collapse functionality, selection capabilities, and search features. Supports 10,000+ nodes with smooth performance.

## Usage

```typescript
import '@nexcraft/forge/organisms/tree-view';

// Basic usage
html`
  <forge-tree-view .nodes=${this.treeNodes}></forge-tree-view>
`;

// Large dataset with virtual scrolling (automatically enabled)
html`
  <forge-tree-view 
    .nodes=${this.largeTreeNodes}
    show-search
    selectable
    selection-mode="multiple"
  ></forge-tree-view>
`;

// With checkboxes and search
html`
  <forge-tree-view 
    .nodes=${this.treeNodes}
    show-checkboxes
    show-search
    selectable
  ></forge-tree-view>
`;
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `nodes` | `TreeNode[]` | `[]` | Array of root tree nodes - supports 10,000+ nodes with virtual scrolling |
| `selectable` | `boolean` | `true` | Enable node selection |
| `selection-mode` | `'single' \| 'multiple'` | `'single'` | Selection mode for nodes |
| `show-checkboxes` | `boolean` | `false` | Show checkboxes for selection |
| `show-search` | `boolean` | `false` | Enable search functionality |
| `search-term` | `string` | `''` | Current search query |

## Virtual Scrolling Features

✅ **Automatic Virtual Scrolling**: Handles large datasets (10,000+ nodes) automatically  
✅ **Smooth Performance**: 32px item height with 5-item buffer for optimal scrolling  
✅ **Dynamic Flattening**: Efficiently converts hierarchical tree to flat virtual list  
✅ **Debounced Updates**: 100ms debounced tree rebuilding on expand/collapse  
✅ **Memory Efficient**: Only renders visible nodes in viewport

## TreeNode Interface

```typescript
interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
  icon?: string;
  expanded?: boolean;
  selected?: boolean;
  disabled?: boolean;
  data?: any;
}
```

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `forge-node-select` | `{ nodeId: string, node: TreeNode, selected: boolean }` | Fired when node selection changes |
| `forge-node-expand` | `{ nodeId: string, node: TreeNode }` | Fired when node is expanded |
| `forge-node-collapse` | `{ nodeId: string, node: TreeNode }` | Fired when node is collapsed |
| `forge-node-toggle` | `{ nodeId: string, node: TreeNode, expanded: boolean }` | Fired when node expansion state changes |
| `forge-node-click` | `{ nodeId: string, node: TreeNode }` | Fired when node is clicked |

## Methods

### Public Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `selectNode(nodeId)` | `nodeId: string` | `void` | Select a specific node |
| `deselectNode(nodeId)` | `nodeId: string` | `void` | Deselect a specific node |
| `toggleNode(nodeId)` | `nodeId: string` | `void` | Toggle node selection |
| `expandNode(nodeId)` | `nodeId: string` | `void` | Expand a specific node |
| `collapseNode(nodeId)` | `nodeId: string` | `void` | Collapse a specific node |
| `expandAll()` | - | `void` | Expand all nodes |
| `collapseAll()` | - | `void` | Collapse all nodes |
| `getSelectedNodes()` | - | `TreeNode[]` | Get currently selected nodes |
| `searchNodes(query)` | `query: string` | `void` | Search nodes by query |

### AI Metadata Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `explainState()` | `string` | Returns detailed explanation of current state |
| `getPossibleActions()` | `AIAction[]` | Returns available actions based on current state |
| `aiState` | `AIState` | Current component state for AI analysis |

## Keyboard Navigation

| Key | Action |
|-----|--------|
| `Arrow Up/Down` | Navigate between visible nodes |
| `Arrow Left` | Collapse expanded node or move to parent |
| `Arrow Right` | Expand collapsed node or move to first child |
| `Enter/Space` | Select/toggle focused node |
| `Home` | Focus first visible node |
| `End` | Focus last visible node |
| `*` | Expand all nodes at current level |
| `Ctrl+A` | Select all visible nodes (multi-select mode) |

## Styling

### CSS Custom Properties

```css
forge-tree-view {
  --forge-tree-bg: #ffffff;
  --forge-tree-border: #e0e0e0;
  --forge-tree-border-radius: 8px;
  --forge-tree-node-padding: 8px;
  --forge-tree-node-hover-bg: #f8f9fa;
  --forge-tree-node-selected-bg: #e3f2fd;
  --forge-tree-node-focus-bg: #e8f4fd;
  --forge-tree-indent: 20px;
  --forge-tree-icon-size: 16px;
  --forge-tree-icon-color: #666666;
  --forge-tree-line-color: #e0e0e0;
  --forge-tree-expand-icon-size: 12px;
}
```

### CSS Parts

| Part | Description |
|------|-------------|
| `tree-view` | Main tree container |
| `tree-node` | Individual tree node |
| `tree-node-content` | Node content wrapper |
| `tree-node-label` | Node label text |
| `tree-node-icon` | Node icon |
| `tree-node-toggle` | Expand/collapse toggle |
| `tree-node-children` | Child nodes container |
| `search-input` | Search input field |

## Examples

### Basic Tree View

```typescript
const treeNodes: TreeNode[] = [
  {
    id: 'root1',
    label: 'Documents',
    icon: 'folder',
    children: [
      {
        id: 'doc1',
        label: 'Report.pdf',
        icon: 'description'
      },
      {
        id: 'doc2',
        label: 'Presentation.pptx',
        icon: 'slideshow'
      }
    ]
  },
  {
    id: 'root2',
    label: 'Images',
    icon: 'folder',
    children: [
      {
        id: 'img1',
        label: 'photo1.jpg',
        icon: 'image'
      },
      {
        id: 'img2',
        label: 'photo2.png',
        icon: 'image'
      }
    ]
  }
];

html`
  <forge-tree-view .nodes=${treeNodes}></forge-tree-view>
`;
```

### Selectable Tree with Checkboxes

```typescript
html`
  <forge-tree-view 
    .nodes=${this.nodes}
    selectable
    multi-select
    checkboxes
    @forge-node-select=${this.handleNodeSelect}
  ></forge-tree-view>
`;

private handleNodeSelect(e: CustomEvent) {
  const { nodeId, node, selected } = e.detail;
  console.log(`Node ${node.label} is now ${selected ? 'selected' : 'deselected'}`);
}
```

### File System Tree

```typescript
const fileSystemNodes: TreeNode[] = [
  {
    id: 'src',
    label: 'src',
    icon: 'folder',
    children: [
      {
        id: 'components',
        label: 'components',
        icon: 'folder',
        children: [
          {
            id: 'button',
            label: 'button',
            icon: 'folder',
            children: [
              { id: 'button-ts', label: 'button.ts', icon: 'code' },
              { id: 'button-css', label: 'button.css', icon: 'style' }
            ]
          },
          {
            id: 'input',
            label: 'input',
            icon: 'folder',
            children: [
              { id: 'input-ts', label: 'input.ts', icon: 'code' }
            ]
          }
        ]
      },
      {
        id: 'utils',
        label: 'utils',
        icon: 'folder',
        children: [
          { id: 'helpers-ts', label: 'helpers.ts', icon: 'code' }
        ]
      }
    ]
  },
  {
    id: 'package-json',
    label: 'package.json',
    icon: 'settings'
  }
];

html`
  <forge-tree-view 
    .nodes=${fileSystemNodes}
    .expandedNodes=${['src', 'components']}
    selectable
    @forge-node-click=${this.handleFileClick}
  ></forge-tree-view>
`;
```

### Searchable Tree

```typescript
html`
  <forge-tree-view 
    .nodes=${this.nodes}
    searchable
    .searchQuery=${this.searchQuery}
    @forge-node-search=${this.handleSearch}
  ></forge-tree-view>
`;

private handleSearch(e: CustomEvent) {
  const { query } = e.detail;
  this.searchQuery = query;
  // Filter and highlight matching nodes
  this.filterNodes(query);
}
```

### Organization Chart

```typescript
const orgChart: TreeNode[] = [
  {
    id: 'ceo',
    label: 'CEO - John Smith',
    icon: 'person',
    expanded: true,
    children: [
      {
        id: 'cto',
        label: 'CTO - Jane Doe',
        icon: 'person',
        children: [
          {
            id: 'dev-lead',
            label: 'Development Lead - Bob Johnson',
            icon: 'person',
            children: [
              { id: 'dev1', label: 'Developer - Alice Brown', icon: 'person' },
              { id: 'dev2', label: 'Developer - Charlie Wilson', icon: 'person' }
            ]
          }
        ]
      },
      {
        id: 'cmo',
        label: 'CMO - Sarah Davis',
        icon: 'person',
        children: [
          { id: 'marketer1', label: 'Marketing Specialist - Mike Taylor', icon: 'person' }
        ]
      }
    ]
  }
];

html`
  <div class="org-chart">
    <h3>Organization Structure</h3>
    <forge-tree-view 
      .nodes=${orgChart}
      .expandedNodes=${['ceo']}
    ></forge-tree-view>
  </div>
`;
```

### Dynamic Tree Loading

```typescript
class DynamicTreeView extends LitElement {
  @state() private nodes: TreeNode[] = [];

  async connectedCallback() {
    super.connectedCallback();
    this.nodes = await this.loadRootNodes();
  }

  render() {
    return html`
      <forge-tree-view 
        .nodes=${this.nodes}
        @forge-node-expand=${this.handleNodeExpand}
      ></forge-tree-view>
    `;
  }

  private async handleNodeExpand(e: CustomEvent) {
    const { nodeId, node } = e.detail;
    
    if (!node.children && node.data?.hasChildren) {
      // Load children dynamically
      const children = await this.loadNodeChildren(nodeId);
      
      // Update the node with children
      this.updateNodeChildren(nodeId, children);
    }
  }

  private updateNodeChildren(nodeId: string, children: TreeNode[]) {
    this.nodes = this.updateNodesRecursively(this.nodes, nodeId, children);
  }
}
```

### Custom Node Rendering

```typescript
class CustomTreeView extends LitElement {
  render() {
    return html`
      <forge-tree-view .nodes=${this.nodes}>
        ${this.nodes.map(node => this.renderCustomNode(node))}
      </forge-tree-view>
    `;
  }

  private renderCustomNode(node: TreeNode) {
    return html`
      <div slot="node-${node.id}" class="custom-node">
        <forge-icon name="${node.icon}"></forge-icon>
        <span class="node-label">${node.label}</span>
        ${node.data?.badge ? html`
          <forge-badge>${node.data.badge}</forge-badge>
        ` : ''}
        ${node.data?.actions ? html`
          <div class="node-actions">
            <forge-button size="small" @click=${() => this.editNode(node)}>
              Edit
            </forge-button>
            <forge-button size="small" variant="danger" @click=${() => this.deleteNode(node)}>
              Delete
            </forge-button>
          </div>
        ` : ''}
      </div>
    `;
  }
}
```

## Search and Filtering

### Basic Search

```typescript
html`
  <forge-tree-view 
    searchable
    .nodes=${this.nodes}
    @forge-node-search=${this.handleSearch}
  ></forge-tree-view>
`;
```

### Custom Search Logic

```typescript
private filterNodes(query: string): TreeNode[] {
  if (!query) return this.originalNodes;

  return this.originalNodes.filter(node => 
    this.nodeMatchesQuery(node, query.toLowerCase())
  );
}

private nodeMatchesQuery(node: TreeNode, query: string): boolean {
  if (node.label.toLowerCase().includes(query)) {
    return true;
  }
  
  if (node.children) {
    return node.children.some(child => this.nodeMatchesQuery(child, query));
  }
  
  return false;
}
```

## Performance Considerations

- Virtual scrolling for large trees (1000+ nodes)
- Lazy loading of child nodes
- Efficient search indexing
- Memory management for expanded state
- Optimized rendering with minimal DOM updates

## Accessibility

- Full WCAG 2.1 AA compliance
- Keyboard navigation support
- ARIA attributes for screen readers:
  - `role="tree"` on container
  - `role="treeitem"` on nodes
  - `aria-expanded` for expandable nodes
  - `aria-selected` for selectable nodes
  - `aria-level` for node hierarchy
- Screen reader announcements for state changes
- Focus management and visual indicators

## Integration Patterns

### With Context Menu

```typescript
html`
  <forge-tree-view 
    .nodes=${this.nodes}
    @forge-node-context=${this.handleContextMenu}
  ></forge-tree-view>
`;

private handleContextMenu(e: CustomEvent) {
  const { node, event } = e.detail;
  this.showContextMenu(node, event.clientX, event.clientY);
}
```

### With Drag and Drop

```typescript
html`
  <forge-tree-view 
    .nodes=${this.nodes}
    draggable
    @forge-node-drag-start=${this.handleDragStart}
    @forge-node-drop=${this.handleDrop}
  ></forge-tree-view>
`;
```

## Browser Support

- Chrome 84+
- Firefox 78+
- Safari 14+
- Edge 84+

## Related Components

- [Accordion](./accordion.md) - Similar expandable behavior
- [Navigation Bar](./navigation-bar.md) - For main navigation
- [Checkbox](../checkbox.md) - Used for node selection
- [Icon](../icon.md) - Used for node and state icons
- [Input](../input.md) - Used for search functionality