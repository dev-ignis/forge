/**
 * @fileoverview Unified React wrapper for ForgeIcon component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders semantic HTML icon with emoji/text fallbacks for common icons
 * - Client: Hydrates to full web component functionality with proper icon sets
 * - No separate SSR/client components needed
 * - Supports customizable sizes and colors
 */

import React from 'react';
import type { ForgeIconProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
// FallbackRenderers now defined inline within components

export const ForgeIcon = createUnifiedWrapper<HTMLElement, ForgeIconProps>({
  tagName: 'forge-icon',
  displayName: 'ForgeIcon',
  
  fallbackRenderer: (props, children) => (
    <i
      className={`forge-icon ${props.size ? `forge-icon--${props.size}` : ''} ${props.color ? `forge-icon--${props.color}` : ''}`}
      data-forge-component="forge-icon"
    >
      {children}
    </i>
  ),
  
  fallbackProps: {
    size: '16px',
    color: 'currentColor'
  },
  
  preserveAttributes: [
    'name',
    'size',
    'color',
    'role',
    'aria-label'
  ]
});