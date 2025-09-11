/**
 * @fileoverview React wrapper for ForgeProgress component
 * 
 * Addresses GitHub Issue #17 missing Progress export
 * Note: Issue mentioned "Did you mean to import ForgeProgress?" - this provides the React wrapper
 */

import type { ForgeProgressProps } from '../types';
import { createReactWrapper } from '../utils/createReactWrapper';


export const ForgeProgress = createReactWrapper<HTMLElement, ForgeProgressProps>({
  tagName: 'forge-progress',
  displayName: 'ForgeProgress',
});