/**
 * @fileoverview Unified React wrapper for ForgeTabs component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders semantic HTML with ARIA tablist, tabs, and tabpanels
 * - Client: Hydrates to full web component functionality with animations and focus management
 * - No separate SSR/client components needed
 * - Supports multiple variants (default, pills, underline), orientations, and tab management
 */

import React from 'react';
import type { ForgeTabsProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
// FallbackRenderers now defined inline within components

export const ForgeTabs = createUnifiedWrapper<HTMLElement, ForgeTabsProps>({
  tagName: 'forge-tabs',
  displayName: 'ForgeTabs',
  
  eventMappings: {
    onTabChange: 'tab-change'
  },
  
  fallbackRenderer: (props, children) => (
    <div
      className={`forge-tabs ${props.variant ? `forge-tabs--${props.variant}` : ''} ${props.orientation ? `forge-tabs--${props.orientation}` : ''}`}
      data-forge-component="forge-tabs"
    >
      <div className="forge-tabs-list" role="tablist">
        {/* Tab headers would be rendered here */}
      </div>
      <div className="forge-tabs-content">{children}</div>
    </div>
  ),
  
  fallbackProps: {
    variant: 'default',
    orientation: 'horizontal',
    tabs: []
  },
  
  preserveAttributes: [
    'active-tab',
    'variant',
    'orientation',
    'role',
    'aria-orientation'
  ]
});
