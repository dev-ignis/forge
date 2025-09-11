/**
 * @fileoverview Unified React wrapper for ForgeProgressCircle component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders semantic SVG circular progress with proper ARIA and styling
 * - Client: Hydrates to full web component functionality
 * - No separate SSR/client components needed
 * - Supports indeterminate states, custom sizes, and value display
 */

import type { ForgeProgressCircleProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
import { FallbackRenderers } from '../utils/createReactWrapperSSR';

export const ForgeProgressCircle = createUnifiedWrapper<HTMLElement, ForgeProgressCircleProps>({
  tagName: 'forge-progress-circle',
  displayName: 'ForgeProgressCircle',
  
  fallbackRenderer: FallbackRenderers.progressCircle,
  
  fallbackProps: {
    value: 0,
    max: 100,
    size: '48px',
    strokeWidth: 4,
    indeterminate: false,
    showValue: false
  },
  
  preserveAttributes: [
    'value',
    'max',
    'indeterminate',
    'size',
    'stroke-width',
    'show-value',
    'role',
    'aria-valuenow',
    'aria-valuemax'
  ]
});
