/**
 * @fileoverview Unified React wrapper for ForgeIcon component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders semantic HTML icon with emoji/text fallbacks for common icons
 * - Client: Hydrates to full web component functionality with proper icon sets
 * - No separate SSR/client components needed
 * - Supports customizable sizes and colors
 */

import type { ForgeIconProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
import { FallbackRenderers } from '../utils/createReactWrapperSSR';

export const ForgeIcon = createUnifiedWrapper<HTMLElement, ForgeIconProps>({
  tagName: 'forge-icon',
  displayName: 'ForgeIcon',
  
  fallbackRenderer: FallbackRenderers.icon,
  
  fallbackProps: {
    size: '16px',
    color: 'currentColor'
  },
  
  preserveAttributes: [
    'name',
    'size',
    'color',
    'role',
    'aria-label'
  ]
});