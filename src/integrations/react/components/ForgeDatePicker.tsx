/**
 * @fileoverview Unified React wrapper for ForgeDatePicker component
 *
 * Works seamlessly in both SSR and client-only environments:
 * - SSR: Renders semantic HTML date input with proper form integration
 * - Client: Hydrates to full web component functionality with calendar popup
 * - No separate SSR/client components needed
 * - Supports date ranges, formatting, and validation
 */

import type { ForgeDatePickerProps } from '../types';
import { createUnifiedWrapper } from '../utils/createUnifiedWrapper';
import { FallbackRenderers } from '../utils/createReactWrapperSSR';

export const ForgeDatePicker = createUnifiedWrapper<HTMLElement, ForgeDatePickerProps>({
  tagName: 'forge-date-picker',
  displayName: 'ForgeDatePicker',
  
  eventMappings: {
    onChange: 'change'
  },
  
  fallbackRenderer: FallbackRenderers.datePicker,
  
  fallbackProps: {
    disabled: false,
    placeholder: 'Select date',
    format: 'YYYY-MM-DD'
  },
  
  preserveAttributes: [
    'value',
    'min',
    'max',
    'disabled',
    'placeholder',
    'format',
    'name',
    'required'
  ]
});
