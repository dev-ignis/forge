/**
 * @fileoverview React wrapper for ForgeModal component
 */

import type { ForgeModalProps } from '../types';
import { createReactWrapper } from '../utils/createReactWrapper';


export const ForgeModal = createReactWrapper<HTMLElement, ForgeModalProps>({
  tagName: 'forge-modal',
  displayName: 'ForgeModal',
  eventMappings: {
    onClose: 'close',
    onOpen: 'open'
  },
  propMappings: {
    showCloseButton: 'show-close-button',
    escapeClose: 'escape-close'
  },
});