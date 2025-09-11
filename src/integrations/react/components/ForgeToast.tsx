/**
 * @fileoverview React wrapper for ForgeToast component
 */

import type { ForgeToastProps } from '../types';
import { createReactWrapper } from '../utils/createReactWrapper';

export const ForgeToast = createReactWrapper<HTMLElement, ForgeToastProps>({
  tagName: 'forge-toast',
  displayName: 'ForgeToast',
  eventMappings: {
    onClose: 'close'
  }
});
