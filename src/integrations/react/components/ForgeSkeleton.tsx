/**
 * @fileoverview Unified React wrapper for ForgeSkeleton component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders semantic HTML skeleton placeholder with proper styling and animations
 * - Client: Hydrates to full web component functionality
 * - No separate SSR/client components needed
 * - Supports multiple variants, custom dimensions, and animation control
 */

import type { ForgeSkeletonProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
import { FallbackRenderers } from '../utils/createReactWrapperSSR';

export const ForgeSkeleton = createUnifiedWrapper<HTMLElement, ForgeSkeletonProps>({
  tagName: 'forge-skeleton',
  displayName: 'ForgeSkeleton',
  
  fallbackRenderer: FallbackRenderers.skeleton,
  
  fallbackProps: {
    width: '100%',
    height: '20px',
    animated: true,
    variant: 'text'
  },
  
  preserveAttributes: [
    'width',
    'height',
    'animated',
    'variant',
    'aria-label'
  ]
});