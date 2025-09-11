/**
 * @fileoverview React wrapper for ForgeCheckbox component
 * 
 * Addresses GitHub Issue #17 missing Checkbox export
 */

import type { ForgeCheckboxProps } from '../types';
import { createReactWrapper } from '../utils/createReactWrapper';


export const ForgeCheckbox = createReactWrapper<HTMLElement, ForgeCheckboxProps>({
  tagName: 'forge-checkbox',
  displayName: 'ForgeCheckbox',
  eventMappings: {
    onChange: 'change'
  },
});