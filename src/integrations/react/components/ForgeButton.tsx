/**
 * @fileoverview Unified React wrapper for ForgeButton component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders semantic HTML button with proper styling
 * - Client: Hydrates to full web component functionality
 * - No separate SSR/client components needed
 */

import React from 'react';
import type { ForgeButtonProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
// FallbackRenderers now defined inline within components

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
  
  fallbackRenderer: (props, children) => (
    <button
      className={`forge-button forge-button--${props.variant || 'primary'} forge-button--${props.size || 'md'} ${props.disabled ? 'forge-button--disabled' : ''} ${props.loading ? 'forge-button--loading' : ''}`}
      disabled={props.disabled}
      type={props.type || 'button'}
      aria-label={props['aria-label']}
      aria-controls={props['aria-controls']}
      aria-expanded={props['aria-expanded']}
      data-forge-component="forge-button"
    >
      {children}
    </button>
  ),
  
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