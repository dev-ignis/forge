/**
 * @fileoverview Unified React wrapper for ForgePagination component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders semantic HTML navigation with proper ARIA labels and page buttons
 * - Client: Hydrates to full web component functionality with animations and keyboard navigation
 * - No separate SSR/client components needed
 * - Supports page size changing, quick jumper, total display, and smart page number truncation
 */

import type { ForgePaginationProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
import { FallbackRenderers } from '../utils/createReactWrapperSSR';

export const ForgePagination = createUnifiedWrapper<HTMLElement, ForgePaginationProps>({
  tagName: 'forge-pagination',
  displayName: 'ForgePagination',
  
  eventMappings: {
    onPageChange: 'page-change',
    onPageSizeChange: 'page-size-change'
  },
  
  fallbackRenderer: FallbackRenderers.pagination,
  
  fallbackProps: {
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
    totalItems: 0,
    showSizeChanger: false,
    showQuickJumper: false,
    showTotal: false,
    disabled: false
  },
  
  preserveAttributes: [
    'current-page',
    'total-pages',
    'page-size',
    'total-items',
    'show-size-changer',
    'show-quick-jumper',
    'show-total',
    'disabled',
    'role',
    'aria-label'
  ]
});
