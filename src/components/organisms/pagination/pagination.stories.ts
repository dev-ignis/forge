import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './pagination.ts';

const meta: Meta = {
  title: 'Organisms/Pagination',
  component: 'forge-pagination',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A comprehensive pagination component with multiple modes, keyboard navigation, accessibility, and responsive design.',
      },
    },
  },
  argTypes: {
    currentPage: {
      control: { type: 'number', min: 1 },
      description: 'Current active page',
    },
    totalPages: {
      control: { type: 'number', min: 1 },
      description: 'Total number of pages',
    },
    pageSize: {
      control: { type: 'number', min: 1 },
      description: 'Items per page',
    },
    totalItems: {
      control: { type: 'number', min: 0 },
      description: 'Total number of items',
    },
    mode: {
      control: { type: 'select' },
      options: ['pagination', 'infinite', 'load-more'],
      description: 'Pagination mode',
    },
    showPageSize: {
      control: 'boolean',
      description: 'Show page size selector',
    },
    showJumpTo: {
      control: 'boolean',
      description: 'Show jump to page input',
    },
    showTotal: {
      control: 'boolean',
      description: 'Show total items information',
    },
    siblingCount: {
      control: { type: 'number', min: 0, max: 5 },
      description: 'Number of sibling pages to show',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    pageSize: 10,
    totalItems: 100,
  },
  render: (args) => html`
    <forge-pagination
      current-page="${args.currentPage}"
      total-pages="${args.totalPages}"
      page-size="${args.pageSize}"
      total-items="${args.totalItems}"
      ?show-page-size="${args.showPageSize}"
      ?show-jump-to="${args.showJumpTo}"
      ?show-total="${args.showTotal}"
      @pagechange="${(e: CustomEvent) => console.log('Page changed:', e.detail)}"
      @pagesizechange="${(e: CustomEvent) => console.log('Page size changed:', e.detail)}"
    ></forge-pagination>
  `,
};

export const LargeDataset: Story = {
  render: () => html`
    <forge-pagination
      current-page="25"
      total-pages="100"
      page-size="25"
      total-items="2500"
      sibling-count="2"
      @pagechange="${(e: CustomEvent) => console.log('Page changed to:', e.detail.page)}"
      @pagesizechange="${(e: CustomEvent) => console.log('Page size changed to:', e.detail.pageSize)}"
    ></forge-pagination>
  `,
};

export const SmallDataset: Story = {
  render: () => html`
    <forge-pagination
      current-page="2"
      total-pages="3"
      page-size="10"
      total-items="25"
      @pagechange="${(e: CustomEvent) => console.log('Page changed to:', e.detail.page)}"
    ></forge-pagination>
  `,
};

export const LoadMoreMode: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <div>
        <h4 style="margin-bottom: 10px;">Load More - Has More Items</h4>
        <forge-pagination
          mode="load-more"
          current-page="3"
          page-size="20"
          total-items="1000"
          has-more
          @loadmore="${(e: CustomEvent) => {
            console.log('Load more requested for page:', e.detail.page);
            // Simulate loading
            const pagination = e.target as any;
            pagination.loading = true;
            setTimeout(() => {
              pagination.loading = false;
              pagination.currentPage = e.detail.page;
            }, 2000);
          }}"
        ></forge-pagination>
      </div>
      
      <div>
        <h4 style="margin-bottom: 10px;">Load More - All Items Loaded</h4>
        <forge-pagination
          mode="load-more"
          current-page="5"
          page-size="20"
          total-items="100"
          has-more="false"
        ></forge-pagination>
      </div>
    </div>
  `,
};

export const InfiniteScroll: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <div>
        <h4 style="margin-bottom: 10px;">Infinite Scroll - Loading</h4>
        <forge-pagination
          mode="infinite"
          loading
          has-more
        ></forge-pagination>
      </div>
      
      <div>
        <h4 style="margin-bottom: 10px;">Infinite Scroll - All Loaded</h4>
        <forge-pagination
          mode="infinite"
          has-more="false"
        ></forge-pagination>
      </div>
    </div>
  `,
};

export const CustomPageSizes: Story = {
  render: () => html`
    <forge-pagination
      current-page="1"
      total-pages="20"
      page-size="25"
      total-items="500"
      .pageSizes="${[5, 10, 25, 50, 100]}"
      @pagechange="${(e: CustomEvent) => console.log('Page changed to:', e.detail.page)}"
      @pagesizechange="${(e: CustomEvent) => console.log('Page size changed to:', e.detail.pageSize)}"
    ></forge-pagination>
  `,
};

export const WithoutOptionalFeatures: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <div>
        <h4 style="margin-bottom: 10px;">No Page Size Selector</h4>
        <forge-pagination
          current-page="5"
          total-pages="15"
          page-size="10"
          total-items="150"
          show-page-size="false"
        ></forge-pagination>
      </div>
      
      <div>
        <h4 style="margin-bottom: 10px;">No Jump To Page</h4>
        <forge-pagination
          current-page="8"
          total-pages="20"
          page-size="10"
          total-items="200"
          show-jump-to="false"
        ></forge-pagination>
      </div>
      
      <div>
        <h4 style="margin-bottom: 10px;">No Total Info</h4>
        <forge-pagination
          current-page="3"
          total-pages="10"
          page-size="15"
          show-total="false"
        ></forge-pagination>
      </div>
      
      <div>
        <h4 style="margin-bottom: 10px;">Minimal Configuration</h4>
        <forge-pagination
          current-page="2"
          total-pages="8"
          show-page-size="false"
          show-jump-to="false"
          show-total="false"
        ></forge-pagination>
      </div>
    </div>
  `,
};

export const DifferentSiblingCounts: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px; max-width: 800px;">
      <div>
        <h4 style="margin-bottom: 10px;">Sibling Count: 0</h4>
        <forge-pagination
          current-page="15"
          total-pages="30"
          page-size="10"
          total-items="300"
          sibling-count="0"
        ></forge-pagination>
      </div>
      
      <div>
        <h4 style="margin-bottom: 10px;">Sibling Count: 1 (Default)</h4>
        <forge-pagination
          current-page="15"
          total-pages="30"
          page-size="10"
          total-items="300"
          sibling-count="1"
        ></forge-pagination>
      </div>
      
      <div>
        <h4 style="margin-bottom: 10px;">Sibling Count: 2</h4>
        <forge-pagination
          current-page="15"
          total-pages="30"
          page-size="10"
          total-items="300"
          sibling-count="2"
        ></forge-pagination>
      </div>
      
      <div>
        <h4 style="margin-bottom: 10px;">Sibling Count: 3</h4>
        <forge-pagination
          current-page="15"
          total-pages="30"
          page-size="10"
          total-items="300"
          sibling-count="3"
        ></forge-pagination>
      </div>
    </div>
  `,
};

export const EdgeCases: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <div>
        <h4 style="margin-bottom: 10px;">Single Page</h4>
        <forge-pagination
          current-page="1"
          total-pages="1"
          page-size="10"
          total-items="5"
        ></forge-pagination>
      </div>
      
      <div>
        <h4 style="margin-bottom: 10px;">First Page (Large Dataset)</h4>
        <forge-pagination
          current-page="1"
          total-pages="100"
          page-size="10"
          total-items="1000"
        ></forge-pagination>
      </div>
      
      <div>
        <h4 style="margin-bottom: 10px;">Last Page (Large Dataset)</h4>
        <forge-pagination
          current-page="100"
          total-pages="100"
          page-size="10"
          total-items="1000"
        ></forge-pagination>
      </div>
      
      <div>
        <h4 style="margin-bottom: 10px;">No Items</h4>
        <forge-pagination
          current-page="1"
          total-pages="1"
          page-size="10"
          total-items="0"
        ></forge-pagination>
      </div>
    </div>
  `,
};

export const InteractiveDemo: Story = {
  render: () => html`
    <div style="max-width: 800px;">
      <h3>Interactive Pagination Demo</h3>
      <p>Try different pagination features:</p>
      
      <div style="margin: 20px 0; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <forge-pagination
          current-page="12"
          total-pages="25"
          page-size="20"
          total-items="500"
          sibling-count="1"
          @pagechange="${(e: CustomEvent) => {
            const info = document.getElementById('page-info');
            if (info) {
              const { page, oldPage } = e.detail;
              info.innerHTML = `<strong>Page changed:</strong> ${oldPage} → ${page}`;
            }
          }}"
          @pagesizechange="${(e: CustomEvent) => {
            const info = document.getElementById('size-info');
            if (info) {
              const { pageSize, oldPageSize, page } = e.detail;
              info.innerHTML = `<strong>Page size changed:</strong> ${oldPageSize} → ${pageSize} items per page (now on page ${page})`;
            }
          }}"
        ></forge-pagination>
      </div>
      
      <div style="margin: 20px 0;">
        <div id="page-info" style="padding: 8px; background: #f0f9ff; border: 1px solid #bfdbfe; border-radius: 4px; margin-bottom: 8px;">
          <strong>Page info:</strong> Currently on page 12 of 25
        </div>
        <div id="size-info" style="padding: 8px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 4px;">
          <strong>Size info:</strong> Showing 20 items per page
        </div>
      </div>
      
      <div style="margin-top: 30px; padding: 15px; background: #f8f9fa; border-radius: 6px;">
        <h4 style="margin-top: 0;">Features to try:</h4>
        <ul style="margin-bottom: 0; font-size: 14px;">
          <li><kbd>←</kbd>/<kbd>→</kbd> - Navigate with arrow keys</li>
          <li>Click page numbers or navigation buttons</li>
          <li>Change items per page in the dropdown</li>
          <li>Use "Go to page" input field</li>
          <li>Notice how ellipsis (...) appear for large page ranges</li>
          <li>Page size changes preserve your position in the dataset</li>
        </ul>
      </div>
    </div>
  `,
};

export const ResponsiveDemo: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => html`
    <div>
      <h3>Mobile Responsive</h3>
      <p>This pagination adapts to smaller screens by hiding text labels and reducing button sizes.</p>
      
      <forge-pagination
        current-page="5"
        total-pages="20"
        page-size="15"
        total-items="300"
      ></forge-pagination>
      
      <p style="margin-top: 20px; font-size: 14px; color: #666;">
        Try switching between mobile and desktop viewports to see the responsive behavior.
      </p>
    </div>
  `,
};

export const FormIntegration: Story = {
  render: () => html`
    <form @submit="${(e: Event) => {
      e.preventDefault();
      console.log('Form submitted with pagination state');
    }}">
      <div style="max-width: 600px;">
        <h3>Data Table with Pagination</h3>
        
        <div style="margin: 20px 0; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="border-bottom: 2px solid #e0e0e0;">
                <th style="padding: 12px; text-align: left;">ID</th>
                <th style="padding: 12px; text-align: left;">Name</th>
                <th style="padding: 12px; text-align: left;">Status</th>
              </tr>
            </thead>
            <tbody>
              ${Array.from({ length: 10 }, (_, i) => {
                const id = (2 - 1) * 10 + i + 1; // Simulate page 2
                return html`
                  <tr style="border-bottom: 1px solid #f0f0f0;">
                    <td style="padding: 12px;">${id.toString().padStart(3, '0')}</td>
                    <td style="padding: 12px;">User ${id}</td>
                    <td style="padding: 12px;">
                      <span style="padding: 2px 8px; background: ${i % 3 === 0 ? '#dcfce7' : i % 3 === 1 ? '#fef3c7' : '#fecaca'}; border-radius: 12px; font-size: 12px;">
                        ${i % 3 === 0 ? 'Active' : i % 3 === 1 ? 'Pending' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                `;
              })}
            </tbody>
          </table>
        </div>
        
        <forge-pagination
          current-page="2"
          total-pages="10"
          page-size="10"
          total-items="100"
          @pagechange="${(e: CustomEvent) => {
            console.log('Would load page:', e.detail.page);
            // In a real application, this would trigger a data fetch
          }}"
          @pagesizechange="${(e: CustomEvent) => {
            console.log('Would change page size to:', e.detail.pageSize);
            // In a real application, this would trigger a data refresh
          }}"
        ></forge-pagination>
        
        <button type="submit" style="margin-top: 20px; padding: 12px 24px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">
          Process Selected Data
        </button>
      </div>
    </form>
  `,
};

export const AIIntegration: Story = {
  render: () => html`
    <forge-pagination
      current-page="7"
      total-pages="15"
      page-size="25"
      total-items="375"
      semantic-role="navigation"
      ai-context="data-pagination"
      performance-mode="balanced"
      @pagechange="${(e: CustomEvent) => {
        console.log('AI-aware pagination:', {
          page: e.detail.page,
          context: 'data-pagination',
          userIntent: 'data-navigation'
        });
      }}"
      @pagesizechange="${(e: CustomEvent) => {
        console.log('AI-aware page size change:', {
          pageSize: e.detail.pageSize,
          context: 'data-pagination',
          userIntent: 'view-adjustment'
        });
      }}"
    ></forge-pagination>
  `,
};