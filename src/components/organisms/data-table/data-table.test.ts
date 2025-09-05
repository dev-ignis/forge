import { fixture, expect, html, elementUpdated } from '@open-wc/testing';
import './data-table';
import { ForgeDataTable } from './data-table';
import type { TableColumn, TableRow } from './data-table';

describe('ForgeDataTable', () => {
  const mockColumns: TableColumn[] = [
    { id: 'id', label: 'ID', sortable: true, width: '80px' },
    { id: 'name', label: 'Name', sortable: true },
    { id: 'email', label: 'Email', sortable: true },
    { id: 'status', label: 'Status', align: 'center' },
    { id: 'actions', label: 'Actions', align: 'right' }
  ];

  const mockData: TableRow[] = [
    { id: '1', data: { id: '1', name: 'John Doe', email: 'john@example.com', status: 'Active' } },
    { id: '2', data: { id: '2', name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' } },
    { id: '3', data: { id: '3', name: 'Bob Johnson', email: 'bob@example.com', status: 'Active' } },
    { id: '4', data: { id: '4', name: 'Alice Brown', email: 'alice@example.com', status: 'Pending' } }
  ];

  describe('Basic Rendering', () => {
    it('should render with default properties', async () => {
      const el = await fixture<ForgeDataTable>(html`<forge-data-table></forge-data-table>`);
      
      expect(el).to.exist;
      expect(el.columns).to.deep.equal([]);
      expect(el.rows).to.deep.equal([]);
      expect(el.selectable).to.be.false;
    });

    it('should render columns and data', async () => {
      const el = await fixture<ForgeDataTable>(html`
        <forge-data-table .columns=${mockColumns} .rows=${mockData}></forge-data-table>
      `);
      
      await el.updateComplete;
      
      const headers = el.shadowRoot?.querySelectorAll('th');
      expect(headers).to.have.length(5);
      
      const rows = el.shadowRoot?.querySelectorAll('tbody tr');
      expect(rows).to.have.length(4);
    });

    it('should render with striped rows', async () => {
      const el = await fixture<ForgeDataTable>(html`
        <forge-data-table .columns=${mockColumns} .rows=${mockData} striped></forge-data-table>
      `);
      
      await el.updateComplete;
      
      const table = el.shadowRoot?.querySelector('table');
      expect(table?.classList.contains('striped')).to.be.true;
    });
  });

  describe('Sorting', () => {
    it('should sort by column when header clicked', async () => {
      const el = await fixture<ForgeDataTable>(html`
        <forge-data-table .columns=${mockColumns} .rows=${mockData}></forge-data-table>
      `);
      
      await el.updateComplete;
      
      const nameHeader = el.shadowRoot?.querySelector('th:nth-child(2)') as HTMLElement;
      nameHeader.click();
      
      await el.updateComplete;
      
      expect(el.sortColumn).to.equal('name');
      expect(el.sortDirection).to.equal('asc');
    });

    it('should toggle sort direction on second click', async () => {
      const el = await fixture<ForgeDataTable>(html`
        <forge-data-table .columns=${mockColumns} .rows=${mockData}></forge-data-table>
      `);
      
      await el.updateComplete;
      
      const nameHeader = el.shadowRoot?.querySelector('th:nth-child(2)') as HTMLElement;
      nameHeader.click();
      await el.updateComplete;
      
      nameHeader.click();
      await el.updateComplete;
      
      expect(el.sortColumn).to.equal('name');
      expect(el.sortDirection).to.equal('desc');
    });

    it('should emit sort event', async () => {
      const el = await fixture<ForgeDataTable>(html`
        <forge-data-table .columns=${mockColumns} .rows=${mockData}></forge-data-table>
      `);
      
      let eventDetail: any = null;
      el.addEventListener('sort', (e: Event) => {
        eventDetail = (e as CustomEvent).detail;
      });
      
      const nameHeader = el.shadowRoot?.querySelector('th:nth-child(2)') as HTMLElement;
      nameHeader.click();
      
      await el.updateComplete;
      
      expect(eventDetail).to.exist;
      expect(eventDetail.column).to.equal('name');
      expect(eventDetail.direction).to.equal('asc');
    });

    it('should not sort non-sortable columns', async () => {
      const el = await fixture<ForgeDataTable>(html`
        <forge-data-table .columns=${mockColumns} .rows=${mockData}></forge-data-table>
      `);
      
      await el.updateComplete;
      
      const statusHeader = el.shadowRoot?.querySelector('th:nth-child(4)') as HTMLElement;
      statusHeader.click();
      
      await el.updateComplete;
      
      expect(el.sortColumn).to.be.undefined;
    });
  });

  describe('Selection', () => {
    it('should show checkboxes when selectable', async () => {
      const el = await fixture<ForgeDataTable>(html`
        <forge-data-table .columns=${mockColumns} .rows=${mockData} selectable></forge-data-table>
      `);
      
      await el.updateComplete;
      
      const checkboxes = el.shadowRoot?.querySelectorAll('forge-checkbox');
      expect(checkboxes).to.have.length(5); // 1 header + 4 rows
    });

    it('should select row on checkbox click', async () => {
      const el = await fixture<ForgeDataTable>(html`
        <forge-data-table .columns=${mockColumns} .rows=${mockData} selectable></forge-data-table>
      `);
      
      await el.updateComplete;
      
      const checkbox = el.shadowRoot?.querySelector('tbody forge-checkbox') as HTMLElement;
      checkbox.click();
      
      await el.updateComplete;
      
      expect(el.selectedRows.size).to.equal(1);
      expect(el.selectedRows.has('1')).to.be.true;
    });

    it('should select all rows on header checkbox click', async () => {
      const el = await fixture<ForgeDataTable>(html`
        <forge-data-table .columns=${mockColumns} .rows=${mockData} selectable></forge-data-table>
      `);
      
      await el.updateComplete;
      
      const headerCheckbox = el.shadowRoot?.querySelector('thead forge-checkbox') as HTMLElement;
      headerCheckbox.click();
      
      await el.updateComplete;
      
      expect(el.selectedRows.size).to.equal(4);
    });

    it('should emit selectionchange event', async () => {
      const el = await fixture<ForgeDataTable>(html`
        <forge-data-table .columns=${mockColumns} .rows=${mockData} selectable></forge-data-table>
      `);
      
      let eventDetail: any = null;
      el.addEventListener('selectionchange', (e: Event) => {
        eventDetail = (e as CustomEvent).detail;
      });
      
      const checkbox = el.shadowRoot?.querySelector('tbody forge-checkbox') as HTMLElement;
      checkbox.click();
      
      await el.updateComplete;
      
      expect(eventDetail).to.exist;
      expect(eventDetail.selectedIds).to.deep.equal(['1']);
    });
  });

  describe('Expandable Rows', () => {
    const dataWithDetails = mockData.map(row => ({
      ...row,
      expandedContent: `Details for ${row.data.name}`
    }));

    it('should show expand icon when expandable', async () => {
      const el = await fixture<ForgeDataTable>(html`
        <forge-data-table .columns=${mockColumns} .rows=${dataWithDetails} expandable></forge-data-table>
      `);
      
      await el.updateComplete;
      
      const expandIcons = el.shadowRoot?.querySelectorAll('.expand-icon');
      expect(expandIcons).to.have.length(4);
    });

    it('should expand row on icon click', async () => {
      const el = await fixture<ForgeDataTable>(html`
        <forge-data-table .columns=${mockColumns} .rows=${dataWithDetails} expandable></forge-data-table>
      `);
      
      await el.updateComplete;
      
      const expandIcon = el.shadowRoot?.querySelector('.expand-icon') as HTMLElement;
      expandIcon.click();
      
      await el.updateComplete;
      
      expect(el.expandedRows.size).to.equal(1);
      expect(el.expandedRows.has('1')).to.be.true;
    });
  });

  describe('Loading State', () => {
    it('should show loading indicator', async () => {
      const el = await fixture<ForgeDataTable>(html`
        <forge-data-table .columns=${mockColumns} loading></forge-data-table>
      `);
      
      await el.updateComplete;
      
      const loadingIndicator = el.shadowRoot?.querySelector('.loading-state');
      expect(loadingIndicator).to.exist;
    });
  });

  describe('Empty State', () => {
    it('should show empty message when no data', async () => {
      const el = await fixture<ForgeDataTable>(html`
        <forge-data-table .columns=${mockColumns} .rows=${[]}></forge-data-table>
      `);
      
      await el.updateComplete;
      
      const emptyMessage = el.shadowRoot?.querySelector('.empty-state');
      expect(emptyMessage).to.exist;
      expect(emptyMessage?.textContent).to.include('No data available');
    });
  });

  describe('AI Metadata', () => {
    it('should provide AI state', async () => {
      const el = await fixture<ForgeDataTable>(html`
        <forge-data-table .columns=${mockColumns} .rows=${mockData}></forge-data-table>
      `);
      
      const aiState = el.aiState;
      
      expect(aiState.state.rowCount).to.equal(4);
      expect(aiState.state.columnCount).to.equal(5);
      expect(aiState.state.sortable).to.be.true;
      expect(aiState.state.selectable).to.be.false;
    });

    it('should provide possible actions', async () => {
      const el = await fixture<ForgeDataTable>(html`
        <forge-data-table .columns=${mockColumns} .rows=${mockData} selectable></forge-data-table>
      `);
      
      const actions = el.getPossibleActions();
      
      expect(actions).to.be.an('array');
      
      const sortAction = actions.find(a => a.name === 'sort');
      expect(sortAction).to.exist;
      
      const selectAction = actions.find(a => a.name === 'selectRow');
      expect(selectAction).to.exist;
    });
  });
});