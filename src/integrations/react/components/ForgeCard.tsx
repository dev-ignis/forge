/**
 * @fileoverview React wrapper for ForgeCard component
 * 
 * Addresses GitHub Issue #17 missing Card export
 */

import type { ForgeCardProps } from '../types';
import { createReactWrapper } from '../utils/createReactWrapper';


export const ForgeCard = createReactWrapper<HTMLElement, ForgeCardProps>({
  tagName: 'forge-card',
  displayName: 'ForgeCard',
});