/**
 * @fileoverview React wrapper for ForgeDataTable component
 */

import type { ForgeDataTableProps } from '../types';
import { createReactWrapper } from '../utils/createReactWrapper';

export const ForgeDataTable = createReactWrapper<HTMLElement, ForgeDataTableProps>({
  tagName: 'forge-data-table',
  displayName: 'ForgeDataTable',
  eventMappings: {
    onSort: 'sort',
    onSelectionChange: 'selection-change',
    onPageChange: 'page-change'
  }
});
