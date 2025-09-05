import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './tree-view.ts';
import type { TreeNode } from './tree-view.ts';

const meta: Meta = {
  title: 'Organisms/TreeView',
  component: 'forge-tree-view',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A hierarchical tree view component with expand/collapse functionality, selection, search, and virtual scrolling support.',
      },
    },
  },
  argTypes: {
    selectable: {
      control: 'boolean',
      description: 'Enable node selection',
    },
    selectionMode: {
      control: { type: 'select' },
      options: ['single', 'multiple'],
      description: 'Selection mode',
    },
    showCheckboxes: {
      control: 'boolean',
      description: 'Show checkboxes for selection',
    },
    showSearch: {
      control: 'boolean',
      description: 'Show search functionality',
    },
  },
};

export default meta;
type Story = StoryObj;

// Sample tree data
const basicTreeData: TreeNode[] = [
  {
    id: '1',
    label: 'Documents',
    icon: 'folder',
    expanded: true,
    children: [
      {
        id: '1-1',
        label: 'Projects',
        icon: 'folder',
        children: [
          { id: '1-1-1', label: 'Project A.docx', icon: 'description' },
          { id: '1-1-2', label: 'Project B.pdf', icon: 'picture_as_pdf' },
          { id: '1-1-3', label: 'Project C.xlsx', icon: 'table_chart' },
        ],
      },
      {
        id: '1-2',
        label: 'Reports',
        icon: 'folder',
        children: [
          { id: '1-2-1', label: 'Q1 Report.pdf', icon: 'picture_as_pdf' },
          { id: '1-2-2', label: 'Q2 Report.pdf', icon: 'picture_as_pdf' },
          { id: '1-2-3', label: 'Annual Summary.docx', icon: 'description' },
        ],
      },
    ],
  },
  {
    id: '2',
    label: 'Images',
    icon: 'folder',
    expanded: false,
    children: [
      { id: '2-1', label: 'photo1.jpg', icon: 'image' },
      { id: '2-2', label: 'photo2.png', icon: 'image' },
      { id: '2-3', label: 'screenshot.png', icon: 'image' },
    ],
  },
  {
    id: '3',
    label: 'Videos',
    icon: 'folder',
    children: [
      { id: '3-1', label: 'presentation.mp4', icon: 'video_file' },
      { id: '3-2', label: 'tutorial.mkv', icon: 'video_file' },
    ],
  },
  {
    id: '4',
    label: 'readme.txt',
    icon: 'description',
  },
];

const organizationData: TreeNode[] = [
  {
    id: 'org',
    label: 'Acme Corporation',
    icon: 'business',
    expanded: true,
    children: [
      {
        id: 'eng',
        label: 'Engineering',
        icon: 'engineering',
        expanded: true,
        children: [
          {
            id: 'frontend',
            label: 'Frontend Team',
            icon: 'web',
            children: [
              { id: 'dev1', label: 'Alice Johnson', icon: 'person' },
              { id: 'dev2', label: 'Bob Smith', icon: 'person' },
              { id: 'dev3', label: 'Carol Williams', icon: 'person' },
            ],
          },
          {
            id: 'backend',
            label: 'Backend Team',
            icon: 'storage',
            children: [
              { id: 'dev4', label: 'David Brown', icon: 'person' },
              { id: 'dev5', label: 'Eva Davis', icon: 'person' },
            ],
          },
          {
            id: 'devops',
            label: 'DevOps Team',
            icon: 'cloud',
            children: [
              { id: 'dev6', label: 'Frank Miller', icon: 'person' },
              { id: 'dev7', label: 'Grace Wilson', icon: 'person' },
            ],
          },
        ],
      },
      {
        id: 'design',
        label: 'Design',
        icon: 'palette',
        children: [
          { id: 'designer1', label: 'Henry Taylor', icon: 'person' },
          { id: 'designer2', label: 'Iris Anderson', icon: 'person' },
        ],
      },
      {
        id: 'marketing',
        label: 'Marketing',
        icon: 'campaign',
        children: [
          { id: 'marketer1', label: 'Jack Thompson', icon: 'person' },
          { id: 'marketer2', label: 'Kate Martinez', icon: 'person' },
          { id: 'marketer3', label: 'Liam Garcia', icon: 'person' },
        ],
      },
    ],
  },
];

export const Default: Story = {
  args: {
    selectable: true,
    selectionMode: 'single',
  },
  render: (args) => html`
    <forge-tree-view
      .nodes="${basicTreeData}"
      ?selectable="${args.selectable}"
      selection-mode="${args.selectionMode}"
      ?show-checkboxes="${args.showCheckboxes}"
      ?show-search="${args.showSearch}"
      @nodeexpand="${(e: CustomEvent) => console.log('Node expand:', e.detail)}"
      @nodeselect="${(e: CustomEvent) => console.log('Node select:', e.detail)}"
    ></forge-tree-view>
  `,
};

export const WithSearch: Story = {
  render: () => html`
    <forge-tree-view
      .nodes="${basicTreeData}"
      selectable
      show-search
      @nodeexpand="${(e: CustomEvent) => console.log('Node expand:', e.detail)}"
      @nodeselect="${(e: CustomEvent) => console.log('Node select:', e.detail)}"
    ></forge-tree-view>
  `,
};

export const WithCheckboxes: Story = {
  render: () => html`
    <forge-tree-view
      .nodes="${basicTreeData}"
      selectable
      selection-mode="multiple"
      show-checkboxes
      @nodeexpand="${(e: CustomEvent) => console.log('Node expand:', e.detail)}"
      @nodeselect="${(e: CustomEvent) => console.log('Node select:', e.detail)}"
    ></forge-tree-view>
  `,
};

export const OrganizationChart: Story = {
  render: () => html`
    <div style="width: 400px;">
      <h4 style="margin-bottom: 16px;">Company Organization</h4>
      <forge-tree-view
        .nodes="${organizationData}"
        selectable
        show-search
        @nodeexpand="${(e: CustomEvent) => console.log('Org expand:', e.detail)}"
        @nodeselect="${(e: CustomEvent) => console.log('Person select:', e.detail)}"
      ></forge-tree-view>
    </div>
  `,
};

export const LargeDataset: Story = {
  render: () => {
    // Generate a large tree structure for testing virtual scrolling
    const generateLargeTree = (): TreeNode[] => {
      const tree: TreeNode[] = [];
      
      for (let i = 1; i <= 20; i++) {
        const department: TreeNode = {
          id: `dept-${i}`,
          label: `Department ${i}`,
          icon: 'folder',
          children: [],
        };
        
        for (let j = 1; j <= 10; j++) {
          const team: TreeNode = {
            id: `dept-${i}-team-${j}`,
            label: `Team ${j}`,
            icon: 'group',
            children: [],
          };
          
          for (let k = 1; k <= 5; k++) {
            team.children?.push({
              id: `dept-${i}-team-${j}-person-${k}`,
              label: `Person ${k}`,
              icon: 'person',
            });
          }
          
          department.children?.push(team);
        }
        
        tree.push(department);
      }
      
      return tree;
    };

    return html`
      <div style="width: 500px; height: 400px;">
        <h4 style="margin-bottom: 16px;">Large Dataset (1000+ nodes)</h4>
        <forge-tree-view
          .nodes="${generateLargeTree()}"
          selectable
          show-search
          @nodeexpand="${(e: CustomEvent) => console.log('Large tree expand:', e.detail)}"
          @nodeselect="${(e: CustomEvent) => console.log('Large tree select:', e.detail)}"
        ></forge-tree-view>
      </div>
    `;
  },
};

export const DisabledNodes: Story = {
  render: () => {
    const treeWithDisabled: TreeNode[] = [
      {
        id: 'root',
        label: 'Project Files',
        icon: 'folder',
        expanded: true,
        children: [
          {
            id: 'src',
            label: 'Source Code',
            icon: 'folder',
            children: [
              { id: 'main.js', label: 'main.js', icon: 'code' },
              { id: 'utils.js', label: 'utils.js', icon: 'code' },
              { id: 'config.js', label: 'config.js', icon: 'code', disabled: true },
            ],
          },
          {
            id: 'build',
            label: 'Build Output',
            icon: 'folder',
            disabled: true,
            children: [
              { id: 'dist.js', label: 'dist.js', icon: 'code' },
              { id: 'dist.css', label: 'dist.css', icon: 'style' },
            ],
          },
          { id: 'readme', label: 'README.md', icon: 'description' },
          { id: 'license', label: 'LICENSE', icon: 'gavel', disabled: true },
        ],
      },
    ];

    return html`
      <forge-tree-view
        .nodes="${treeWithDisabled}"
        selectable
        show-checkboxes
        @nodeexpand="${(e: CustomEvent) => console.log('Disabled tree expand:', e.detail)}"
        @nodeselect="${(e: CustomEvent) => console.log('Disabled tree select:', e.detail)}"
      ></forge-tree-view>
    `;
  },
};

export const FileSystemExplorer: Story = {
  render: () => {
    const fileSystemData: TreeNode[] = [
      {
        id: 'home',
        label: 'Home',
        icon: 'home',
        expanded: true,
        children: [
          {
            id: 'documents',
            label: 'Documents',
            icon: 'folder',
            children: [
              { id: 'resume.pdf', label: 'Resume.pdf', icon: 'picture_as_pdf' },
              { id: 'cover-letter.docx', label: 'Cover Letter.docx', icon: 'description' },
            ],
          },
          {
            id: 'downloads',
            label: 'Downloads',
            icon: 'folder',
            children: [
              { id: 'installer.exe', label: 'installer.exe', icon: 'get_app' },
              { id: 'archive.zip', label: 'archive.zip', icon: 'archive' },
              { id: 'image.png', label: 'image.png', icon: 'image' },
            ],
          },
          {
            id: 'desktop',
            label: 'Desktop',
            icon: 'folder',
            children: [
              { id: 'shortcut1', label: 'Application.lnk', icon: 'link' },
              { id: 'notes.txt', label: 'Notes.txt', icon: 'description' },
            ],
          },
        ],
      },
      {
        id: 'system',
        label: 'System',
        icon: 'computer',
        children: [
          {
            id: 'program-files',
            label: 'Program Files',
            icon: 'folder',
            children: [
              { id: 'app1', label: 'Application 1', icon: 'apps' },
              { id: 'app2', label: 'Application 2', icon: 'apps' },
            ],
          },
          {
            id: 'windows',
            label: 'Windows',
            icon: 'folder',
            disabled: true,
            children: [
              { id: 'system32', label: 'System32', icon: 'folder' },
            ],
          },
        ],
      },
    ];

    return html`
      <div style="width: 350px;">
        <h4 style="margin-bottom: 16px;">File System Explorer</h4>
        <forge-tree-view
          .nodes="${fileSystemData}"
          selectable
          show-search
          @nodeexpand="${(e: CustomEvent) => console.log('File system expand:', e.detail)}"
          @nodeselect="${(e: CustomEvent) => console.log('File selected:', e.detail)}"
        ></forge-tree-view>
      </div>
    `;
  },
};

export const InteractiveDemo: Story = {
  render: () => html`
    <div style="max-width: 600px;">
      <h3>Interactive Tree View Demo</h3>
      <p>Try different tree view features:</p>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
        <div>
          <h4 style="margin-bottom: 10px;">Single Selection with Search</h4>
          <forge-tree-view
            .nodes="${basicTreeData}"
            selectable
            show-search
            @nodeexpand="${(e: CustomEvent) => {
              const info = document.getElementById('expand-info');
              if (info) {
                info.textContent = `Node ${e.detail.expanded ? 'expanded' : 'collapsed'}: ${e.detail.nodeId}`;
              }
            }}"
            @nodeselect="${(e: CustomEvent) => {
              const info = document.getElementById('select-info');
              if (info) {
                info.textContent = `Node ${e.detail.selected ? 'selected' : 'deselected'}: ${e.detail.nodeId}`;
              }
            }}"
          ></forge-tree-view>
        </div>
        
        <div>
          <h4 style="margin-bottom: 10px;">Multiple Selection with Checkboxes</h4>
          <forge-tree-view
            .nodes="${organizationData}"
            selectable
            selection-mode="multiple"
            show-checkboxes
            @nodeselect="${(e: CustomEvent) => {
              const info = document.getElementById('multi-select-info');
              if (info) {
                const action = e.detail.selected ? 'added to' : 'removed from';
                info.textContent = `${e.detail.nodeId} ${action} selection`;
              }
            }}"
          ></forge-tree-view>
        </div>
      </div>
      
      <div style="margin: 20px 0;">
        <div id="expand-info" style="padding: 8px; background: #f0f9ff; border: 1px solid #bfdbfe; border-radius: 4px; margin-bottom: 8px;">
          <strong>Expand/Collapse:</strong> Click folder icons to expand or collapse nodes
        </div>
        <div id="select-info" style="padding: 8px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 4px; margin-bottom: 8px;">
          <strong>Selection:</strong> Click nodes to select them
        </div>
        <div id="multi-select-info" style="padding: 8px; background: #fef3c7; border: 1px solid #fcd34d; border-radius: 4px;">
          <strong>Multi-Selection:</strong> Use checkboxes for multiple selections
        </div>
      </div>
      
      <div style="margin-top: 30px; padding: 15px; background: #f8f9fa; border-radius: 6px;">
        <h4 style="margin-top: 0;">Features to try:</h4>
        <ul style="margin-bottom: 0; font-size: 14px;">
          <li><kbd>↑</kbd>/<kbd>↓</kbd> - Navigate between nodes</li>
          <li><kbd>→</kbd> - Expand focused node</li>
          <li><kbd>←</kbd> - Collapse focused node</li>
          <li><kbd>Enter</kbd>/<kbd>Space</kbd> - Select node</li>
          <li>Search functionality filters and auto-expands</li>
          <li>Checkboxes for multiple selection mode</li>
          <li>Disabled nodes cannot be selected</li>
        </ul>
      </div>
    </div>
  `,
};

export const ProgrammaticControl: Story = {
  render: () => html`
    <div style="max-width: 500px;">
      <h3>Programmatic Control Demo</h3>
      <p>Use buttons to control the tree view:</p>
      
      <div style="display: flex; gap: 8px; margin: 16px 0; flex-wrap: wrap;">
        <forge-button size="sm" @click="${() => {
          const tree = document.getElementById('controlled-tree') as any;
          tree?.expandNode('1');
        }}">
          Expand Documents
        </forge-button>
        <forge-button size="sm" @click="${() => {
          const tree = document.getElementById('controlled-tree') as any;
          tree?.collapseNode('1');
        }}">
          Collapse Documents
        </forge-button>
        <forge-button size="sm" @click="${() => {
          const tree = document.getElementById('controlled-tree') as any;
          tree?.selectNode('1-1-1');
        }}">
          Select Project A
        </forge-button>
        <forge-button size="sm" @click="${() => {
          const tree = document.getElementById('controlled-tree') as any;
          tree?.clearSelection();
        }}">
          Clear Selection
        </forge-button>
      </div>
      
      <forge-tree-view
        id="controlled-tree"
        .nodes="${basicTreeData}"
        selectable
        @nodeexpand="${(e: CustomEvent) => console.log('Programmatic expand:', e.detail)}"
        @nodeselect="${(e: CustomEvent) => console.log('Programmatic select:', e.detail)}"
      ></forge-tree-view>
    </div>
  `,
};

export const CustomStyling: Story = {
  render: () => html`
    <style>
      .custom-tree {
        --forge-primary-color: #10b981;
        --forge-primary-bg-light: rgba(16, 185, 129, 0.1);
        --forge-hover-bg: rgba(16, 185, 129, 0.05);
      }
    </style>
    <div style="width: 350px;">
      <h4 style="margin-bottom: 16px;">Custom Green Theme</h4>
      <forge-tree-view
        class="custom-tree"
        .nodes="${basicTreeData}"
        selectable
        show-search
      ></forge-tree-view>
    </div>
  `,
};

export const EmptyState: Story = {
  render: () => html`
    <div style="display: flex; gap: 30px;">
      <div>
        <h4 style="margin-bottom: 16px;">No Nodes</h4>
        <forge-tree-view
          .nodes="${[]}"
          selectable
        ></forge-tree-view>
      </div>
      
      <div>
        <h4 style="margin-bottom: 16px;">No Search Results</h4>
        <forge-tree-view
          .nodes="${basicTreeData}"
          selectable
          show-search
          search-term="nonexistent"
        ></forge-tree-view>
      </div>
    </div>
  `,
};

export const AIIntegration: Story = {
  render: () => html`
    <forge-tree-view
      .nodes="${organizationData}"
      selectable
      show-search
      semantic-role="navigation"
      ai-context="organizational-structure"
      performance-mode="balanced"
      @nodeexpand="${(e: CustomEvent) => {
        console.log('AI-aware tree expansion:', {
          nodeId: e.detail.nodeId,
          expanded: e.detail.expanded,
          context: 'organizational-structure',
          userIntent: 'structure-exploration'
        });
      }}"
      @nodeselect="${(e: CustomEvent) => {
        console.log('AI-aware tree selection:', {
          nodeId: e.detail.nodeId,
          selected: e.detail.selected,
          context: 'organizational-structure',
          userIntent: 'item-selection'
        });
      }}"
    ></forge-tree-view>
  `,
};