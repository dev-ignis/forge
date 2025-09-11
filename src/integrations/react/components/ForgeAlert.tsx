/**
 * @fileoverview React wrapper for ForgeAlert component
 * 
 * Addresses GitHub Issue #17 missing Alert export
 */

import type { ForgeAlertProps } from '../types';
import { createReactWrapper } from '../utils/createReactWrapper';


export const ForgeAlert = createReactWrapper<HTMLElement, ForgeAlertProps>({
  tagName: 'forge-alert',
  displayName: 'ForgeAlert',
  eventMappings: {
    onDismiss: 'dismiss'
  },
});