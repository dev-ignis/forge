/**
 * @fileoverview Unified React wrapper for ForgeDropdown component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders semantic HTML button with dropdown trigger styling
 * - Client: Hydrates to full web component functionality with positioning and search
 * - No separate SSR/client components needed
 * - Supports single/multi-select, search functionality, and virtual scrolling
 */

import React from 'react';
import type { ForgeDropdownProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
// FallbackRenderers now defined inline within components

export const ForgeDropdown = createUnifiedWrapper<HTMLElement, ForgeDropdownProps>({
  tagName: 'forge-dropdown',
  displayName: 'ForgeDropdown',
  
  eventMappings: {
    onSelectionChange: 'selection-change',
    onOpen: 'open',
    onClose: 'close',
    onSearch: 'search'
  },
  
  fallbackRenderer: (props, children) => (
    <div
      className={`forge-dropdown ${props.variant ? `forge-dropdown--${props.variant}` : ''} ${props.size ? `forge-dropdown--${props.size}` : ''} ${props.disabled ? 'forge-dropdown--disabled' : ''}`}
      data-forge-component="forge-dropdown"
    >
      <button className="forge-dropdown-trigger" disabled={props.disabled}>
        {props.placeholder || 'Select option'}
      </button>
      <div className="forge-dropdown-content">{children}</div>
    </div>
  ),
  
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