/**
 * @fileoverview Unified React wrapper for ForgeTooltip component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders semantic HTML tooltip wrapper with hover behavior
 * - Client: Hydrates to full web component functionality with positioning and delays
 * - No separate SSR/client components needed
 * - Supports multiple positions, delays, and disable states
 */

import type { ForgeTooltipProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
import { FallbackRenderers } from '../utils/createReactWrapperSSR';

export const ForgeTooltip = createUnifiedWrapper<HTMLElement, ForgeTooltipProps>({
  tagName: 'forge-tooltip',
  displayName: 'ForgeTooltip',
  
  fallbackRenderer: FallbackRenderers.tooltip,
  
  fallbackProps: {
    position: 'top',
    delay: 0,
    disabled: false
  },
  
  preserveAttributes: [
    'content',
    'position',
    'delay',
    'disabled'
  ]
});
