/**
 * @fileoverview Unified React wrapper for ForgePagination component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders semantic HTML navigation with proper ARIA labels and page buttons
 * - Client: Hydrates to full web component functionality with animations and keyboard navigation
 * - No separate SSR/client components needed
 * - Supports page size changing, quick jumper, total display, and smart page number truncation
 */

import React from 'react';
import type { ForgePaginationProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
// FallbackRenderers now defined inline within components

export const ForgePagination = createUnifiedWrapper<HTMLElement, ForgePaginationProps>({
  tagName: 'forge-pagination',
  displayName: 'ForgePagination',
  
  eventMappings: {
    onPageChange: 'page-change',
    onPageSizeChange: 'page-size-change'
  },
  
  fallbackRenderer: (props, children) => (
    <nav
      className={`forge-pagination ${props.disabled ? 'forge-pagination--disabled' : ''}`}
      role="navigation"
      aria-label="Pagination"
      data-forge-component="forge-pagination"
    >
      <button className="forge-pagination-prev" disabled={props.currentPage <= 1 || props.disabled}>
        Previous
      </button>
      <span className="forge-pagination-info">
        Page {props.currentPage || 1} of {props.totalPages || 1}
      </span>
      <button className="forge-pagination-next" disabled={props.currentPage >= (props.totalPages || 1) || props.disabled}>
        Next
      </button>
      {children}
    </nav>
  ),
  
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
