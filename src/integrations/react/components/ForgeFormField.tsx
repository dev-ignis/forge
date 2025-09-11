/**
 * @fileoverview React wrapper for ForgeFormField component
 */

import type { ForgeFormFieldProps } from '../types';
import { createReactWrapper } from '../utils/createReactWrapper';

export const ForgeFormField = createReactWrapper<HTMLElement, ForgeFormFieldProps>({
  tagName: 'forge-form-field',
  displayName: 'ForgeFormField'
});
