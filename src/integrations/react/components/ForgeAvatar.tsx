/**
 * @fileoverview Unified React wrapper for ForgeAvatar component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders semantic HTML avatar with image, initials, status indicators and badges
 * - Client: Hydrates to full web component functionality
 * - No separate SSR/client components needed
 * - Supports multiple sizes, shapes, status indicators, and loading states
 */

import type { ForgeAvatarProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
import { FallbackRenderers } from '../utils/createReactWrapperSSR';

export const ForgeAvatar = createUnifiedWrapper<HTMLElement, ForgeAvatarProps>({
  tagName: 'forge-avatar',
  displayName: 'ForgeAvatar',
  
  eventMappings: {
    onError: 'error',
    onLoad: 'load'
  },
  
  fallbackRenderer: FallbackRenderers.avatar,
  
  fallbackProps: {
    size: 'md',
    shape: 'circular',
    statusPosition: 'bottom-right',
    loading: false
  },
  
  preserveAttributes: [
    'size',
    'src', 
    'alt',
    'initials',
    'status',
    'status-position',
    'shape',
    'badge',
    'loading'
  ]
});