/**
 * @fileoverview Unified React wrapper for ForgeNavigationBar component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders semantic HTML navigation with proper brand, items, and positioning
 * - Client: Hydrates to full web component functionality with responsive behavior
 * - No separate SSR/client components needed
 * - Supports multiple variants (default, dark, light), fixed/sticky positioning, and brand customization
 */

import React from 'react';
import type { ForgeNavigationBarProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
// FallbackRenderers now defined inline within components

export const ForgeNavigationBar = createUnifiedWrapper<HTMLElement, ForgeNavigationBarProps>({
  tagName: 'forge-navigation-bar',
  displayName: 'ForgeNavigationBar',
  
  eventMappings: {
    onItemClick: 'item-click'
  },
  
  fallbackRenderer: (props, children) => (
    <nav
      className={`forge-navigation-bar ${props.variant ? `forge-navigation-bar--${props.variant}` : ''} ${props.fixed ? 'forge-navigation-bar--fixed' : ''} ${props.sticky ? 'forge-navigation-bar--sticky' : ''}`}
      role="navigation"
      data-forge-component="forge-navigation-bar"
    >
      <div className="forge-navigation-bar-content">{children}</div>
    </nav>
  ),
  
  fallbackProps: {
    variant: 'default',
    fixed: false,
    sticky: false,
    items: []
  },
  
  preserveAttributes: [
    'variant',
    'fixed',
    'sticky',
    'role',
    'aria-label'
  ]
});
