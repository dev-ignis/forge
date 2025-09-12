/**
 * @fileoverview Unified React wrapper for ForgeBadge component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders semantic HTML badge with proper styling and variants
 * - Client: Hydrates to full web component functionality
 * - No separate SSR/client components needed
 * - Supports multiple variants, sizes, and dot badges
 */

import React from 'react';
import type { ForgeBadgeProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
// FallbackRenderers now defined inline within components

export const ForgeBadge = createUnifiedWrapper<HTMLElement, ForgeBadgeProps>({
  tagName: 'forge-badge',
  displayName: 'ForgeBadge',
  
  fallbackRenderer: (props, children) => (
    <span
      className={`forge-badge ${props.variant ? `forge-badge--${props.variant}` : ''} ${props.size ? `forge-badge--${props.size}` : ''}`}
      data-forge-component="forge-badge"
    >
      {children}
    </span>
  ),
  
  fallbackProps: {
    variant: 'default',
    size: 'md',
    dot: false
  },
  
  preserveAttributes: [
    'variant',
    'size',
    'dot'
  ]
});