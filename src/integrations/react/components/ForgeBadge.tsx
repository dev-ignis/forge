/**
 * @fileoverview Unified React wrapper for ForgeBadge component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders semantic HTML badge with proper styling and variants
 * - Client: Hydrates to full web component functionality
 * - No separate SSR/client components needed
 * - Supports multiple variants, sizes, and dot badges
 */

import type { ForgeBadgeProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
import { FallbackRenderers } from '../utils/createReactWrapperSSR';

export const ForgeBadge = createUnifiedWrapper<HTMLElement, ForgeBadgeProps>({
  tagName: 'forge-badge',
  displayName: 'ForgeBadge',
  
  fallbackRenderer: FallbackRenderers.badge,
  
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