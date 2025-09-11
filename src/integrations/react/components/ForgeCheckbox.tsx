/**
 * @fileoverview Unified React wrapper for ForgeCheckbox component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders semantic HTML checkbox with label and proper styling
 * - Client: Hydrates to full web component functionality
 * - No separate SSR/client components needed
 * - Full form integration and indeterminate state support
 */

import type { ForgeCheckboxProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
import { FallbackRenderers } from '../utils/createReactWrapperSSR';

export const ForgeCheckbox = createUnifiedWrapper<HTMLElement, ForgeCheckboxProps>({
  tagName: 'forge-checkbox',
  displayName: 'ForgeCheckbox',
  
  eventMappings: {
    onChange: 'change'
  },
  
  fallbackRenderer: FallbackRenderers.checkbox,
  
  fallbackProps: {
    checked: false,
    indeterminate: false,
    disabled: false
  },
  
  preserveAttributes: [
    'checked',
    'indeterminate',
    'disabled',
    'value',
    'name',
    'aria-label',
    'aria-describedby',
    'required'
  ]
});