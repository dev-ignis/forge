/**
 * @fileoverview Unified React wrapper for ForgeButton component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders semantic HTML button with proper styling
 * - Client: Hydrates to full web component functionality
 * - No separate SSR/client components needed
 */

import type { ForgeButtonProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
import { FallbackRenderers } from '../utils/createReactWrapperSSR';

export const ForgeButton = createUnifiedWrapper<HTMLElement, ForgeButtonProps>({
  tagName: 'forge-button',
  displayName: 'ForgeButton',
  
  eventMappings: {
    onClick: 'click'
  },
  
  propMappings: {
    'aria-label': 'aria-label',
    'aria-controls': 'aria-controls', 
    'aria-expanded': 'aria-expanded'
  },
  
  fallbackRenderer: FallbackRenderers.button,
  
  fallbackProps: {
    variant: 'primary',
    size: 'md'
  },
  
  preserveAttributes: [
    'aria-label',
    'aria-controls', 
    'aria-expanded',
    'aria-current',
    'role',
    'tabindex'
  ]
});