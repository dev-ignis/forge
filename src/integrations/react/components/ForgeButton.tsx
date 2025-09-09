/**
 * @fileoverview React wrapper for ForgeButton component
 * 
 * Addresses GitHub Issue #17 - provides React-style Button component
 * with proper TypeScript support and event handling
 */

import type { ForgeButtonProps } from '../types';
import { createReactWrapper } from '../utils/createReactWrapper';

// Import the web component to ensure it's registered
import '../../../components/atoms/button/button';

export const ForgeButton = createReactWrapper<HTMLElement, ForgeButtonProps>({
  tagName: 'forge-button',
  displayName: 'ForgeButton',
  eventMappings: {
    onClick: 'click'
  },
  ssrFallback: () => null  // Return null during SSR, will hydrate on client
});