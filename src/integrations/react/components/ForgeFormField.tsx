/**
 * @fileoverview Unified React wrapper for ForgeFormField component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders semantic HTML form field wrapper with labels, errors, and help text
 * - Client: Hydrates to full web component functionality
 * - No separate SSR/client components needed
 * - Supports validation states, required indicators, and accessibility
 */

import type { ForgeFormFieldProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
import { FallbackRenderers } from '../utils/createReactWrapperSSR';

export const ForgeFormField = createUnifiedWrapper<HTMLElement, ForgeFormFieldProps>({
  tagName: 'forge-form-field',
  displayName: 'ForgeFormField',
  
  fallbackRenderer: FallbackRenderers.formField,
  
  fallbackProps: {
    required: false,
    error: false,
    disabled: false
  },
  
  preserveAttributes: [
    'label',
    'required',
    'error',
    'error-message',
    'helper-text',
    'disabled'
  ]
});
