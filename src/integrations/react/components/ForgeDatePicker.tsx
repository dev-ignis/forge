/**
 * @fileoverview React wrapper for ForgeDatePicker component
 */

import type { ForgeDatePickerProps } from '../types';
import { createReactWrapper } from '../utils/createReactWrapper';

export const ForgeDatePicker = createReactWrapper<HTMLElement, ForgeDatePickerProps>({
  tagName: 'forge-date-picker',
  displayName: 'ForgeDatePicker',
  eventMappings: {
    onChange: 'change'
  }
});
