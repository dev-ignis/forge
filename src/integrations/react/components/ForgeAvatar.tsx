/**
 * @fileoverview React wrapper for ForgeAvatar component
 * 
 * Provides React-style Avatar component with proper TypeScript support,
 * event handling, and SSR compatibility
 */

import type { ForgeAvatarProps } from '../types';
import { createReactWrapper } from '../utils/createReactWrapper';


export const ForgeAvatar = createReactWrapper<HTMLElement, ForgeAvatarProps>({
  tagName: 'forge-avatar',
  displayName: 'ForgeAvatar',
  eventMappings: {
    onError: 'error',
    onLoad: 'load'
  },
});