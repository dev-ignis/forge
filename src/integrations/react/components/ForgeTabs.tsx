/**
 * @fileoverview Unified React wrapper for ForgeTabs component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders semantic HTML with ARIA tablist, tabs, and tabpanels
 * - Client: Hydrates to full web component functionality with animations and focus management
 * - No separate SSR/client components needed
 * - Supports multiple variants (default, pills, underline), orientations, and tab management
 */

import type { ForgeTabsProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
import { FallbackRenderers } from '../utils/createReactWrapperSSR';

export const ForgeTabs = createUnifiedWrapper<HTMLElement, ForgeTabsProps>({
  tagName: 'forge-tabs',
  displayName: 'ForgeTabs',
  
  eventMappings: {
    onTabChange: 'tab-change'
  },
  
  fallbackRenderer: FallbackRenderers.tabs,
  
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
