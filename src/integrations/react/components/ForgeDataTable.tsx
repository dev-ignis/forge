/**
 * @fileoverview Unified React wrapper for ForgeDataTable component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders complete HTML table with sorting, selection, pagination, and loading states
 * - Client: Hydrates to full web component functionality with advanced table features
 * - No separate SSR/client components needed
 * - Features: sortable columns, row selection, built-in pagination, and loading indicators
 */

import type { ForgeDataTableProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
import { FallbackRenderers } from '../utils/createReactWrapperSSR';

export const ForgeDataTable = createUnifiedWrapper<HTMLElement, ForgeDataTableProps>({
  tagName: 'forge-data-table',
  displayName: 'ForgeDataTable',
  
  eventMappings: {
    onSort: 'sort',
    onSelectionChange: 'selection-change',
    onPageChange: 'page-change'
  },
  
  fallbackRenderer: FallbackRenderers.dataTable,
  
  fallbackProps: {
    columns: [],
    data: [],
    sortable: true,
    selectable: false,
    pagination: false,
    pageSize: 10,
    currentPage: 1,
    loading: false
  },
  
  preserveAttributes: [
    'sortable',
    'selectable',
    'pagination',
    'page-size',
    'current-page',
    'total-items',
    'loading'
  ]
});
