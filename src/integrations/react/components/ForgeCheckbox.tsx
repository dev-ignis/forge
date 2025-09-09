/**
 * @fileoverview React wrapper for ForgeCheckbox component
 * 
 * Addresses GitHub Issue #17 missing Checkbox export
 */

import type { ForgeCheckboxProps } from '../types';
import { createReactWrapper } from '../utils/createReactWrapper';

// Import the web component to ensure it's registered
import '../../../components/atoms/checkbox/checkbox';

export const ForgeCheckbox = createReactWrapper<HTMLElement, ForgeCheckboxProps>({
  tagName: 'forge-checkbox',
  displayName: 'ForgeCheckbox',
  eventMappings: {
    onChange: 'change'
  },
  ssrFallback: () => null
});