/**
 * @fileoverview Unified React wrapper for ForgeInput component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders semantic HTML input with proper styling and validation
 * - Client: Hydrates to full web component functionality  
 * - No separate SSR/client components needed
 * - Full form integration support
 */

import type { ForgeInputProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
import { FallbackRenderers } from '../utils/createReactWrapperSSR';

export const ForgeInput = createUnifiedWrapper<HTMLElement, ForgeInputProps>({
  tagName: 'forge-input',
  displayName: 'ForgeInput',
  
  eventMappings: {
    onChange: 'input',
    onFocus: 'focus',
    onBlur: 'blur'
  },
  
  propMappings: {
    errorText: 'error-text'
  },
  
  fallbackRenderer: FallbackRenderers.input,
  
  fallbackProps: {
    type: 'text',
    variant: 'default',
    size: 'md'
  },
  
  preserveAttributes: [
    'type',
    'placeholder',
    'value',
    'disabled',
    'required',
    'aria-label',
    'aria-describedby',
    'aria-invalid',
    'name',
    'id'
  ]
});