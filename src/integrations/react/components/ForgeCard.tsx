/**
 * @fileoverview React wrapper for ForgeCard component
 * 
 * Addresses GitHub Issue #17 missing Card export
 */

import type { ForgeCardProps } from '../types';
import { createReactWrapper } from '../utils/createReactWrapper';

// Import the web component to ensure it's registered
import '../../../components/molecules/card/card';

export const ForgeCard = createReactWrapper<HTMLElement, ForgeCardProps>({
  tagName: 'forge-card',
  displayName: 'ForgeCard',
  ssrFallback: () => null
});