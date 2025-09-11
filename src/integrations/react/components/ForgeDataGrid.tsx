/**
 * @fileoverview React wrapper for ForgeDataGrid component
 * 
 * Advanced enterprise data grid with React integration
 * This is our Phase 8 flagship component with full React support
 */

import type { ForgeDataGridProps } from '../types';
import { createReactWrapper } from '../utils/createReactWrapper';


export const ForgeDataGrid = createReactWrapper<HTMLElement, ForgeDataGridProps>({
  tagName: 'forge-data-grid',
  displayName: 'ForgeDataGrid',
  eventMappings: {
    onSelectionChanged: 'selection-changed',
    onCellEdit: 'cell-edit',
    onSortChanged: 'sort-changed',
    onSearchChanged: 'search-changed'
  },
  propMappings: {
    selectionType: 'selection-type',
    virtualScrolling: 'virtual-scrolling',
    virtualThreshold: 'virtual-threshold',
    showToolbar: 'show-toolbar',
    showSearch: 'show-search',
    searchQuery: 'search-query'
  },
});