/**
 * @fileoverview React wrapper for ForgeAvatar component
 * 
 * Provides React-style Avatar component with proper TypeScript support,
 * event handling, and SSR compatibility
 */

import type { ForgeAvatarProps } from '../types';
import { createReactWrapper } from '../utils/createReactWrapper';

// Import the web component to ensure it's registered
import '../../../components/atoms/avatar/avatar';

export const ForgeAvatar = createReactWrapper<HTMLElement, ForgeAvatarProps>({
  tagName: 'forge-avatar',
  displayName: 'ForgeAvatar',
  eventMappings: {
    onError: 'error',
    onLoad: 'load'
  },
  ssrFallback: () => null  // Return null during SSR, will hydrate on client
});