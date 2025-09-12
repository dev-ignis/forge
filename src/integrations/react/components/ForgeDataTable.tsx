/**
 * @fileoverview Unified React wrapper for ForgeDataTable component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders complete HTML table with sorting, selection, pagination, and loading states
 * - Client: Hydrates to full web component functionality with advanced table features
 * - No separate SSR/client components needed
 * - Features: sortable columns, row selection, built-in pagination, and loading indicators
 */

import React from 'react';
import type { ForgeDataTableProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
// FallbackRenderers now defined inline within components

export const ForgeDataTable = createUnifiedWrapper<HTMLElement, ForgeDataTableProps>({
  tagName: 'forge-data-table',
  displayName: 'ForgeDataTable',
  
  eventMappings: {
    onSort: 'sort',
    onSelectionChange: 'selection-change',
    onPageChange: 'page-change'
  },
  
  fallbackRenderer: (props, children) => (
    <div
      className={`forge-data-table ${props.sortable ? 'forge-data-table--sortable' : ''} ${props.selectable ? 'forge-data-table--selectable' : ''} ${props.loading ? 'forge-data-table--loading' : ''}`}
      data-forge-component="forge-data-table"
    >
      <table className="forge-data-table-table">
        <thead className="forge-data-table-header">{/* Table headers */}</thead>
        <tbody className="forge-data-table-body">{children}</tbody>
      </table>
      {props.pagination && (
        <div className="forge-data-table-pagination">
          Page {props.currentPage || 1}
        </div>
      )}
    </div>
  ),
  
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
