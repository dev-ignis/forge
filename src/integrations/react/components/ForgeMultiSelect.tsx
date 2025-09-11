/**
 * @fileoverview Unified React wrapper for ForgeMultiSelect component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders semantic HTML multi-select control with tag display
 * - Client: Hydrates to full web component functionality with search and filtering
 * - No separate SSR/client components needed
 * - Supports searchable options, maximum selections, and tag management
 */

import type { ForgeMultiSelectProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
import { FallbackRenderers } from '../utils/createReactWrapperSSR';

export const ForgeMultiSelect = createUnifiedWrapper<HTMLElement, ForgeMultiSelectProps>({
  tagName: 'forge-multi-select',
  displayName: 'ForgeMultiSelect',
  
  eventMappings: {
    onChange: 'change'
  },
  
  fallbackRenderer: FallbackRenderers.multiSelect,
  
  fallbackProps: {
    value: [],
    disabled: false,
    searchable: false,
    placeholder: 'Select options',
    options: []
  },
  
  preserveAttributes: [
    'value',
    'placeholder',
    'disabled',
    'searchable',
    'max-selections',
    'name'
  ]
});