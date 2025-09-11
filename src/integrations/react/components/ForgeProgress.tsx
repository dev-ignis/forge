/**
 * @fileoverview Unified React wrapper for ForgeProgress component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders semantic HTML progress bar with proper ARIA and styling
 * - Client: Hydrates to full web component functionality
 * - No separate SSR/client components needed
 * - Supports both linear and circular variants, indeterminate states
 */

import type { ForgeProgressProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
import { FallbackRenderers } from '../utils/createReactWrapperSSR';

export const ForgeProgress = createUnifiedWrapper<HTMLElement, ForgeProgressProps>({
  tagName: 'forge-progress',
  displayName: 'ForgeProgress',
  
  fallbackRenderer: FallbackRenderers.progress,
  
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