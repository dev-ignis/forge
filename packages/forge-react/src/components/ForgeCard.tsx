/**
 * @fileoverview Unified React wrapper for ForgeCard component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders semantic HTML div with card styling and layout
 * - Client: Hydrates to full web component functionality
 * - No separate SSR/client components needed
 * - Perfect for content containers and layout structures
 */

import React from 'react';
import type { ForgeCardProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
// FallbackRenderers now defined inline within components

export const ForgeCard = createUnifiedWrapper<HTMLElement, ForgeCardProps>({
  tagName: 'forge-card',
  displayName: 'ForgeCard',
  
  eventMappings: {
    onClick: 'click'
  },
  
  fallbackRenderer: (props, children) => (
    <div
      className={`forge-card forge-card--${props.variant || 'default'} forge-card--${props.size || 'medium'}${props.border === false ? ' forge-card--no-border' : ''}`}
      data-forge-component="forge-card"
    >
      {children}
    </div>
  ),
  
  fallbackProps: {
    variant: 'default',
    size: 'medium',
    hoverable: false
  },
  
  preserveAttributes: [
    'role',
    'tabindex',
    'aria-label',
    'variant',
    'size',
    'hoverable',
    'padding',
    'border'
  ]
});