/**
 * @fileoverview React wrapper for ForgeSwitch component
 */

import type { ForgeSwitchProps } from '../types';
import { createReactWrapper } from '../utils/createReactWrapper';

export const ForgeSwitch = createReactWrapper<HTMLElement, ForgeSwitchProps>({
  tagName: 'forge-switch',
  displayName: 'ForgeSwitch',
  eventMappings: {
    onChange: 'change'
  }
});