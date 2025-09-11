/**
 * @fileoverview React wrapper for ForgeInput component
 * 
 * Addresses GitHub Issue #17 - provides React-style Input component
 * with controlled/uncontrolled patterns and form integration
 */

import type { ForgeInputProps } from '../types';
import { createReactWrapper } from '../utils/createReactWrapper';

export const ForgeInput = createReactWrapper<HTMLElement, ForgeInputProps>({
  tagName: 'forge-input',
  displayName: 'ForgeInput',
  eventMappings: {
    onChange: 'input',
    onFocus: 'focus',
    onBlur: 'blur'
  },
  propMappings: {
    helperText: 'helper-text'
  },
});