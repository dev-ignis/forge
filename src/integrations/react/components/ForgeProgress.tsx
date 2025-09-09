/**
 * @fileoverview React wrapper for ForgeProgress component
 * 
 * Addresses GitHub Issue #17 missing Progress export
 * Note: Issue mentioned "Did you mean to import ForgeProgress?" - this provides the React wrapper
 */

import type { ForgeProgressProps } from '../types';
import { createReactWrapper } from '../utils/createReactWrapper';

// Import the web component to ensure it's registered
import '../../../components/atoms/progress/progress';

export const ForgeProgress = createReactWrapper<HTMLElement, ForgeProgressProps>({
  tagName: 'forge-progress',
  displayName: 'ForgeProgress',
  ssrFallback: () => null
});