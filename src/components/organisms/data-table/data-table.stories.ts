import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './data-table.ts';

const meta: Meta = {
  title: 'Organisms/DataTable',
  component: 'forge-data-table',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A powerful data table component with sorting, filtering, pagination, and selection capabilities. Optimized for performance with virtual scrolling.',
      },
    },
  },
  argTypes: {
    selectable: {
      control: 'boolean',
      description: 'Enable row selection with checkboxes',
    },
    sortable: {
      control: 'boolean', 
      description: 'Enable column sorting',
    },
    filterable: {
      control: 'boolean',
      description: 'Enable column filtering',
    },
    paginated: {
      control: 'boolean',
      description: 'Enable pagination',
    },
    pageSize: {
      control: { type: 'number', min: 5, max: 100 },
      description: 'Number of rows per page',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'striped', 'bordered', 'compact'],
      description: 'Visual style variant',
    },
  },
};

export default meta;
type Story = StoryObj;

// Sample data for stories
const sampleUsers = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active', lastLogin: '2024-01-15' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User', status: 'Active', lastLogin: '2024-01-14' },
  { id: 3, name: 'Carol Davis', email: 'carol@example.com', role: 'Editor', status: 'Inactive', lastLogin: '2024-01-10' },
  { id: 4, name: 'David Wilson', email: 'david@example.com', role: 'User', status: 'Active', lastLogin: '2024-01-16' },
  { id: 5, name: 'Emma Brown', email: 'emma@example.com', role: 'Admin', status: 'Active', lastLogin: '2024-01-16' },
  { id: 6, name: 'Frank Miller', email: 'frank@example.com', role: 'User', status: 'Pending', lastLogin: '2024-01-12' },
  { id: 7, name: 'Grace Lee', email: 'grace@example.com', role: 'Editor', status: 'Active', lastLogin: '2024-01-15' },
  { id: 8, name: 'Henry Taylor', email: 'henry@example.com', role: 'User', status: 'Active', lastLogin: '2024-01-13' },
];

const tableColumns = [
  { key: 'name', title: 'Name', sortable: true, filterable: true },
  { key: 'email', title: 'Email', sortable: true, filterable: true },
  { key: 'role', title: 'Role', sortable: true, filterable: true },
  { key: 'status', title: 'Status', sortable: true, filterable: true },
  { key: 'lastLogin', title: 'Last Login', sortable: true, type: 'date' },
];

export const Default: Story = {
  render: () => html`
    <forge-data-table
      .columns="${tableColumns}"
      .data="${sampleUsers}"
    ></forge-data-table>
  `,
};

export const WithSelection: Story = {
  args: {
    selectable: true,
  },
  render: (args) => html`
    <forge-data-table
      .columns="${tableColumns}"
      .data="${sampleUsers}"
      ?selectable="${args.selectable}"
      @selection-change="${(e: CustomEvent) => console.log('Selected rows:', e.detail)}"
    ></forge-data-table>
  `,
};

export const Sortable: Story = {
  args: {
    sortable: true,
  },
  render: (args) => html`
    <forge-data-table
      .columns="${tableColumns}"
      .data="${sampleUsers}"
      ?sortable="${args.sortable}"
      @sort-change="${(e: CustomEvent) => console.log('Sort changed:', e.detail)}"
    ></forge-data-table>
  `,
};

export const WithFiltering: Story = {
  args: {
    filterable: true,
  },
  render: (args) => html`
    <forge-data-table
      .columns="${tableColumns}"
      .data="${sampleUsers}"
      ?filterable="${args.filterable}"
      @filter-change="${(e: CustomEvent) => console.log('Filter changed:', e.detail)}"
    ></forge-data-table>
  `,
};

export const Paginated: Story = {
  args: {
    paginated: true,
    pageSize: 5,
  },
  render: (args) => html`
    <forge-data-table
      .columns="${tableColumns}"
      .data="${sampleUsers}"
      ?paginated="${args.paginated}"
      page-size="${args.pageSize}"
      @page-change="${(e: CustomEvent) => console.log('Page changed:', e.detail)}"
    ></forge-data-table>
  `,
};

export const StripedVariant: Story = {
  args: {
    variant: 'striped',
  },
  render: (args) => html`
    <forge-data-table
      .columns="${tableColumns}"
      .data="${sampleUsers}"
      variant="${args.variant}"
    ></forge-data-table>
  `,
};

export const CompactVariant: Story = {
  args: {
    variant: 'compact',
  },
  render: (args) => html`
    <forge-data-table
      .columns="${tableColumns}"
      .data="${sampleUsers}"
      variant="${args.variant}"
    ></forge-data-table>
  `,
};

export const FullFeatured: Story = {
  render: () => html`
    <forge-data-table
      .columns="${tableColumns}"
      .data="${sampleUsers}"
      selectable
      sortable
      filterable
      paginated
      page-size="4"
      variant="bordered"
      @selection-change="${(e: CustomEvent) => console.log('Selection:', e.detail)}"
      @sort-change="${(e: CustomEvent) => console.log('Sort:', e.detail)}"
      @filter-change="${(e: CustomEvent) => console.log('Filter:', e.detail)}"
      @page-change="${(e: CustomEvent) => console.log('Page:', e.detail)}"
    ></forge-data-table>
  `,
};

export const CustomColumnTemplate: Story = {
  render: () => html`
    <forge-data-table
      .columns="${[
        { key: 'name', title: 'Name', sortable: true },
        { key: 'email', title: 'Email', sortable: true },
        { key: 'role', title: 'Role', sortable: true },
        { 
          key: 'status', 
          title: 'Status', 
          sortable: true,
          template: (value: string) => html`
            <forge-badge 
              variant="${value === 'Active' ? 'success' : value === 'Pending' ? 'warning' : 'default'}"
            >
              ${value}
            </forge-badge>
          `
        },
        { 
          key: 'actions', 
          title: 'Actions',
          template: (_: any, row: any) => html`
            <forge-button size="small" variant="outline" @click="${() => console.log('Edit:', row)}">
              Edit
            </forge-button>
            <forge-button size="small" variant="danger-outline" @click="${() => console.log('Delete:', row)}">
              Delete
            </forge-button>
          `
        },
      ]}"
      .data="${sampleUsers}"
    ></forge-data-table>
  `,
};

export const LargeDataset: Story = {
  render: () => {
    // Generate larger dataset to demonstrate virtual scrolling
    const largeDataset = Array.from({ length: 1000 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: ['Admin', 'User', 'Editor'][i % 3],
      status: ['Active', 'Inactive', 'Pending'][i % 3],
      lastLogin: new Date(2024, 0, (i % 30) + 1).toISOString().split('T')[0],
    }));

    return html`
      <div style="height: 400px;">
        <forge-data-table
          .columns="${tableColumns}"
          .data="${largeDataset}"
          selectable
          sortable
          filterable
          paginated
          page-size="20"
          virtual-scrolling
        ></forge-data-table>
      </div>
    `;
  },
};

export const EmptyState: Story = {
  render: () => html`
    <forge-data-table
      .columns="${tableColumns}"
      .data="${[]}"
      empty-message="No users found. Try adjusting your search criteria."
    ></forge-data-table>
  `,
};

export const LoadingState: Story = {
  render: () => html`
    <forge-data-table
      .columns="${tableColumns}"
      .data="${[]}"
      loading
      loading-message="Loading user data..."
    ></forge-data-table>
  `,
};

export const AIIntegration: Story = {
  render: () => html`
    <forge-data-table
      .columns="${tableColumns}"
      .data="${sampleUsers}"
      selectable
      sortable
      filterable
      semantic-role="user-management-table"
      ai-context="administrative-dashboard"
      performance-mode="balanced"
      @selection-change="${(e: CustomEvent) => {
        console.log('AI-aware selection change:', {
          selectedRows: e.detail,
          context: 'user-management',
          action: 'bulk-operations-available'
        });
      }}"
    ></forge-data-table>
  `,
};