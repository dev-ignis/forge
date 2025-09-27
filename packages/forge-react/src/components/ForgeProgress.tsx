/**
 * @fileoverview Unified React wrapper for ForgeProgress component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders semantic HTML progress bar with proper ARIA and styling
 * - Client: Hydrates to full web component functionality
 * - No separate SSR/client components needed
 * - Supports both linear and circular variants, indeterminate states
 */

import React from 'react';
import type { ForgeProgressProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
// FallbackRenderers now defined inline within components

export const ForgeProgress = createUnifiedWrapper<HTMLElement, ForgeProgressProps>({
  tagName: 'forge-progress',
  displayName: 'ForgeProgress',
  
  fallbackRenderer: (props, children) => (
    <progress
      className={`forge-progress ${props.variant ? `forge-progress--${props.variant}` : ''} ${props.size ? `forge-progress--${props.size}` : ''}`}
      value={props.indeterminate ? undefined : props.value || 0}
      max={props.max || 100}
      data-forge-component="forge-progress"
    >
      {children}
    </progress>
  ),
  
  fallbackProps: {
    value: 0,
    max: 100,
    size: 'medium',
    variant: 'linear',
    indeterminate: false
  },
  
  preserveAttributes: [
    'value',
    'max',
    'indeterminate',
    'size',
    'variant',
    'role',
    'aria-valuenow',
    'aria-valuemax',
    'aria-label'
  ]
});