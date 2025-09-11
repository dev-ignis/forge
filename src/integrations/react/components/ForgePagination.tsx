/**
 * @fileoverview React wrapper for ForgePagination component
 */

import type { ForgePaginationProps } from '../types';
import { createReactWrapper } from '../utils/createReactWrapper';

export const ForgePagination = createReactWrapper<HTMLElement, ForgePaginationProps>({
  tagName: 'forge-pagination',
  displayName: 'ForgePagination',
  eventMappings: {
    onPageChange: 'page-change',
    onPageSizeChange: 'page-size-change'
  }
});
