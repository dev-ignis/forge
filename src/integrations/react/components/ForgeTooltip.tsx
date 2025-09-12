/**
 * @fileoverview Unified React wrapper for ForgeTooltip component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders semantic HTML tooltip wrapper with hover behavior
 * - Client: Hydrates to full web component functionality with positioning and delays
 * - No separate SSR/client components needed
 * - Supports multiple positions, delays, and disable states
 */

import React from 'react';
import type { ForgeTooltipProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
// FallbackRenderers now defined inline within components

export const ForgeTooltip = createUnifiedWrapper<HTMLElement, ForgeTooltipProps>({
  tagName: 'forge-tooltip',
  displayName: 'ForgeTooltip',
  
  fallbackRenderer: (props, children) => (
    <div
      className={`forge-tooltip ${props.position ? `forge-tooltip--${props.position}` : ''} ${props.disabled ? 'forge-tooltip--disabled' : ''}`}
      data-forge-component="forge-tooltip"
      title={props.content}
    >
      {children}
    </div>
  ),
  
  fallbackProps: {
    position: 'top',
    delay: 0,
    disabled: false
  },
  
  preserveAttributes: [
    'content',
    'position',
    'delay',
    'disabled'
  ]
});
