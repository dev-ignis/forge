/**
 * @fileoverview React wrapper for ForgeButton component
 * 
 * Addresses GitHub Issue #17 - provides React-style Button component
 * with proper TypeScript support and event handling
 */

import type { ForgeButtonProps } from '../types';
import { createReactWrapper } from '../utils/createReactWrapper';

export const ForgeButton = createReactWrapper<HTMLElement, ForgeButtonProps>({
  tagName: 'forge-button',
  displayName: 'ForgeButton',
  eventMappings: {
    onClick: 'click'
  }
  // SSR fallback automatically provided by createReactWrapper
});