/**
 * @fileoverview Unified React wrapper for ForgeDropdown component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders semantic HTML button with dropdown trigger styling
 * - Client: Hydrates to full web component functionality with positioning and search
 * - No separate SSR/client components needed
 * - Supports single/multi-select, search functionality, and virtual scrolling
 */

import type { ForgeDropdownProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
import { FallbackRenderers } from '../utils/createReactWrapperSSR';

export const ForgeDropdown = createUnifiedWrapper<HTMLElement, ForgeDropdownProps>({
  tagName: 'forge-dropdown',
  displayName: 'ForgeDropdown',
  
  eventMappings: {
    onSelectionChange: 'selection-change',
    onOpen: 'open',
    onClose: 'close',
    onSearch: 'search'
  },
  
  fallbackRenderer: FallbackRenderers.dropdown,
  
  fallbackProps: {
    disabled: false,
    placeholder: 'Select option',
    items: []
  },
  
  preserveAttributes: [
    'label',
    'placeholder',
    'position',
    'variant',
    'size',
    'disabled',
    'multi-select',
    'selected-items'
  ]
});