/**
 * @fileoverview Unified React wrapper for ForgeCard component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders semantic HTML div with card styling and layout
 * - Client: Hydrates to full web component functionality
 * - No separate SSR/client components needed
 * - Perfect for content containers and layout structures
 */

import type { ForgeCardProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
import { FallbackRenderers } from '../utils/createReactWrapperSSR';

export const ForgeCard = createUnifiedWrapper<HTMLElement, ForgeCardProps>({
  tagName: 'forge-card',
  displayName: 'ForgeCard',
  
  eventMappings: {
    onClick: 'click'
  },
  
  fallbackRenderer: FallbackRenderers.card,
  
  fallbackProps: {
    variant: 'default',
    size: 'medium',
    hoverable: false
  },
  
  preserveAttributes: [
    'role',
    'tabindex',
    'aria-label',
    'variant',
    'size',
    'hoverable',
    'padding'
  ]
});