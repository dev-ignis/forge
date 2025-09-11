/**
 * @fileoverview Unified React wrapper for ForgeModal component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders semantic HTML modal with overlay, proper ARIA attributes
 * - Client: Hydrates to full web component functionality with focus management
 * - No separate SSR/client components needed
 * - Supports multiple sizes, backdrop control, and keyboard interaction
 */

import type { ForgeModalProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
import { FallbackRenderers } from '../utils/createReactWrapperSSR';

export const ForgeModal = createUnifiedWrapper<HTMLElement, ForgeModalProps>({
  tagName: 'forge-modal',
  displayName: 'ForgeModal',
  
  eventMappings: {
    onClose: 'close',
    onOpen: 'open'
  },
  
  fallbackRenderer: FallbackRenderers.modal,
  
  fallbackProps: {
    open: false,
    size: 'medium',
    showCloseButton: true,
    backdrop: true,
    escapeClose: true
  },
  
  preserveAttributes: [
    'open',
    'size',
    'title',
    'show-close-button',
    'backdrop',
    'escape-close',
    'role',
    'aria-modal',
    'aria-labelledby'
  ]
});