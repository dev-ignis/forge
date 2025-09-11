/**
 * @fileoverview Unified React wrapper for ForgeDataGrid component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders comprehensive HTML table with sorting, selection, search, toolbar, and virtual scrolling simulation
 * - Client: Hydrates to full enterprise web component with advanced data grid features
 * - No separate SSR/client components needed
 * - Advanced features: multi-column sorting, cell editing, row selection, search filtering, and toolbar
 * 
 * Advanced enterprise data grid with React integration
 * This is our Phase 8 flagship component with full unified SSR/client support
 */

import type { ForgeDataGridProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
import { FallbackRenderers } from '../utils/createReactWrapperSSR';

export const ForgeDataGrid = createUnifiedWrapper<HTMLElement, ForgeDataGridProps>({
  tagName: 'forge-data-grid',
  displayName: 'ForgeDataGrid',
  
  eventMappings: {
    onSelectionChanged: 'selection-changed',
    onCellEdit: 'cell-edit',
    onSortChanged: 'sort-changed',
    onSearchChanged: 'search-changed'
  },
  
  fallbackRenderer: FallbackRenderers.dataGrid,
  
  fallbackProps: {
    columns: [],
    data: [],
    selectable: false,
    selectionType: 'multiple',
    virtualScrolling: false,
    virtualThreshold: 100,
    showToolbar: false,
    showSearch: false,
    searchQuery: '',
    loading: false,
    editable: false
  },
  
  preserveAttributes: [
    'selectable',
    'selection-type',
    'virtual-scrolling',
    'virtual-threshold',
    'show-toolbar',
    'show-search',
    'search-query',
    'loading',
    'editable'
  ]
});