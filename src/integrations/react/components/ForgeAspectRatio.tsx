/**
 * @fileoverview Unified React wrapper for ForgeAspectRatio component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders semantic HTML container with proper aspect ratio using CSS
 * - Client: Hydrates to full web component functionality
 * - No separate SSR/client components needed
 * - Supports string ratios (16/9, 4/3) and numeric ratios
 */

import type { ForgeAspectRatioProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
import { FallbackRenderers } from '../utils/createReactWrapperSSR';

export const ForgeAspectRatio = createUnifiedWrapper<HTMLElement, ForgeAspectRatioProps>({
  tagName: 'forge-aspect-ratio',
  displayName: 'ForgeAspectRatio',
  
  fallbackRenderer: FallbackRenderers.aspectRatio,
  
  fallbackProps: {
    ratio: '16/9'
  },
  
  preserveAttributes: [
    'ratio'
  ]
});
