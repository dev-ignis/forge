/**
 * @fileoverview Unified React wrapper for ForgeAlert component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders semantic HTML alert with proper ARIA and styling
 * - Client: Hydrates to full web component functionality
 * - No separate SSR/client components needed
 */

import React from 'react';
import type { ForgeAlertProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
// FallbackRenderers now defined inline within components

export const ForgeAlert = createUnifiedWrapper<HTMLElement, ForgeAlertProps>({
  tagName: 'forge-alert',
  displayName: 'ForgeAlert',
  
  eventMappings: {
    onDismiss: 'dismiss'
  },
  
  propMappings: {
    'error-text': 'errorText'
  },
  
  fallbackRenderer: (props, children) => (
    <div
      className={`forge-alert ${props.variant ? `forge-alert--${props.variant}` : ''} ${props.severity ? `forge-alert--${props.severity}` : ''}`}
      role="alert"
      data-forge-component="forge-alert"
    >
      {children}
    </div>
  ),
  
  fallbackProps: {
    severity: 'info',
    variant: 'standard'
  },
  
  preserveAttributes: [
    'role',
    'aria-label',
    'aria-describedby',
    'severity',
    'variant',
    'dismissible',
    'title'
  ]
});