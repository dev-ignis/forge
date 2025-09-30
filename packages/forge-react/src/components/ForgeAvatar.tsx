/**
 * @fileoverview Unified React wrapper for ForgeAvatar component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders semantic HTML avatar with image, initials, status indicators and badges
 * - Client: Hydrates to full web component functionality
 * - No separate SSR/client components needed
 * - Supports multiple sizes, shapes, status indicators, and loading states
 */

import React from 'react';
import type { ForgeAvatarProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
// FallbackRenderers now defined inline within components

export const ForgeAvatar = createUnifiedWrapper<HTMLElement, ForgeAvatarProps>({
  tagName: 'forge-avatar',
  displayName: 'ForgeAvatar',
  
  eventMappings: {
    onError: 'error',
    onLoad: 'load'
  },
  
  fallbackRenderer: (props, children) => (
    <div
      className={`forge-avatar ${props.size ? `forge-avatar--${props.size}` : ''} ${props.shape ? `forge-avatar--${props.shape}` : ''}`}
      data-forge-component="forge-avatar"
    >
      {props.src ? (
        <img src={props.src} alt={props.alt || ''} />
      ) : (
        <span className="forge-avatar-initials">{props.initials || children}</span>
      )}
    </div>
  ),
  
  fallbackProps: {
    size: 'md',
    shape: 'circle',
    statusPosition: 'bottom-right',
    loading: false
  },
  
  preserveAttributes: [
    'size',
    'src', 
    'alt',
    'initials',
    'status',
    'status-position',
    'shape',
    'badge',
    'loading'
  ]
});