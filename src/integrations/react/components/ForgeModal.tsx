/**
 * @fileoverview React wrapper for ForgeModal component
 */

import type { ForgeModalProps } from '../types';
import { createReactWrapper } from '../utils/createReactWrapper';

// Import the web component to ensure it's registered
import '../../../components/molecules/modal/modal';

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
  ssrFallback: () => null
});