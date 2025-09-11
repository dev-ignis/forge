/**
 * @fileoverview Unified React wrapper for ForgeToast component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders semantic HTML toast notification with proper positioning and styling
 * - Client: Hydrates to full web component functionality with auto-dismiss and animations
 * - No separate SSR/client components needed
 * - Supports multiple types, positioning, and dismissal controls
 */

import type { ForgeToastProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
import { FallbackRenderers } from '../utils/createReactWrapperSSR';

export const ForgeToast = createUnifiedWrapper<HTMLElement, ForgeToastProps>({
  tagName: 'forge-toast',
  displayName: 'ForgeToast',
  
  eventMappings: {
    onClose: 'close'
  },
  
  fallbackRenderer: FallbackRenderers.toast,
  
  fallbackProps: {
    type: 'info',
    closeable: true,
    position: 'top-right',
    duration: 5000
  },
  
  preserveAttributes: [
    'title',
    'type',
    'duration',
    'closeable',
    'position',
    'role'
  ]
});
