/**
 * @fileoverview Unified React wrapper for ForgeNavigationBar component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders semantic HTML navigation with proper brand, items, and positioning
 * - Client: Hydrates to full web component functionality with responsive behavior
 * - No separate SSR/client components needed
 * - Supports multiple variants (default, dark, light), fixed/sticky positioning, and brand customization
 */

import type { ForgeNavigationBarProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
import { FallbackRenderers } from '../utils/createReactWrapperSSR';

export const ForgeNavigationBar = createUnifiedWrapper<HTMLElement, ForgeNavigationBarProps>({
  tagName: 'forge-navigation-bar',
  displayName: 'ForgeNavigationBar',
  
  eventMappings: {
    onItemClick: 'item-click'
  },
  
  fallbackRenderer: FallbackRenderers.navigationBar,
  
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
