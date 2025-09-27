/**
 * @fileoverview Unified React wrapper for ForgeToast component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders semantic HTML toast notification with proper positioning and styling
 * - Client: Hydrates to full web component functionality with auto-dismiss and animations
 * - No separate SSR/client components needed
 * - Supports multiple types, positioning, and dismissal controls
 */

import React from 'react';
import type { ForgeToastProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
// FallbackRenderers now defined inline within components

export const ForgeToast = createUnifiedWrapper<HTMLElement, ForgeToastProps>({
  tagName: 'forge-toast',
  displayName: 'ForgeToast',
  
  eventMappings: {
    onClose: 'close'
  },
  
  fallbackRenderer: (props, children) => (
    <div
      className={`forge-toast ${props.type ? `forge-toast--${props.type}` : ''} ${props.position ? `forge-toast--${props.position}` : ''}`}
      role={props.role || 'alert'}
      data-forge-component="forge-toast"
    >
      {props.title && <div className="forge-toast-title">{props.title}</div>}
      <div className="forge-toast-content">{children}</div>
      {props.closeable && <button className="forge-toast-close" aria-label="Close">×</button>}
    </div>
  ),
  
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
