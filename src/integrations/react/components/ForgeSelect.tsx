/**
 * @fileoverview Unified React wrapper for ForgeSelect component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders semantic HTML select with proper form integration and accessibility
 * - Client: Hydrates to full web component functionality
 * - No separate SSR/client components needed
 * - Supports single/multiple selection and option arrays
 */

import type { ForgeSelectProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
import { FallbackRenderers } from '../utils/createReactWrapperSSR';

export const ForgeSelect = createUnifiedWrapper<HTMLElement, ForgeSelectProps>({
  tagName: 'forge-select',
  displayName: 'ForgeSelect',
  
  eventMappings: {
    onChange: 'change'
  },
  
  fallbackRenderer: FallbackRenderers.select,
  
  fallbackProps: {
    disabled: false,
    multiple: false,
    placeholder: 'Select option'
  },
  
  preserveAttributes: [
    'value',
    'placeholder',
    'disabled',
    'multiple',
    'name',
    'required'
  ]
});