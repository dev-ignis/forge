/**
 * @fileoverview Unified React wrapper for ForgeSkeleton component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders semantic HTML skeleton placeholder with proper styling and animations
 * - Client: Hydrates to full web component functionality
 * - No separate SSR/client components needed
 * - Supports multiple variants, custom dimensions, and animation control
 */

import React from 'react';
import type { ForgeSkeletonProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
// FallbackRenderers now defined inline within components

export const ForgeSkeleton = createUnifiedWrapper<HTMLElement, ForgeSkeletonProps>({
  tagName: 'forge-skeleton',
  displayName: 'ForgeSkeleton',
  
  fallbackRenderer: (props, children) => (
    <div
      className={`forge-skeleton ${props.variant ? `forge-skeleton--${props.variant}` : ''} ${props.animated ? 'forge-skeleton--animated' : ''}`}
      style={{ width: props.width, height: props.height }}
      data-forge-component="forge-skeleton"
    >
      {children}
    </div>
  ),
  
  fallbackProps: {
    width: '100%',
    height: '20px',
    animated: true,
    variant: 'text'
  },
  
  preserveAttributes: [
    'width',
    'height',
    'animated',
    'variant',
    'aria-label'
  ]
});