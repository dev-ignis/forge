/**
 * @fileoverview Unified React wrapper for ForgeAlert component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders semantic HTML alert with proper ARIA and styling
 * - Client: Hydrates to full web component functionality
 * - No separate SSR/client components needed
 */

import type { ForgeAlertProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
import { FallbackRenderers } from '../utils/createReactWrapperSSR';

export const ForgeAlert = createUnifiedWrapper<HTMLElement, ForgeAlertProps>({
  tagName: 'forge-alert',
  displayName: 'ForgeAlert',
  
  eventMappings: {
    onDismiss: 'dismiss'
  },
  
  propMappings: {
    'error-text': 'errorText'
  },
  
  fallbackRenderer: FallbackRenderers.alert,
  
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