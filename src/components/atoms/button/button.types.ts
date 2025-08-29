/**
 * Type definitions for ForgeButton component
 */

import type { ForgeInteractive } from '../../../types';

/**
 * Button component variants
 */
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'link';

/**
 * Button component sizes
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Button types for form submission
 */
export type ButtonType = 'button' | 'submit' | 'reset';

/**
 * Button component properties interface
 */
export interface ForgeButtonProps extends ForgeInteractive {
  /** Visual variant of the button */
  variant?: ButtonVariant;
  /** Size of the button */
  size?: ButtonSize;
  /** Type attribute for the button */
  type?: ButtonType;
  /** Whether the button is in a loading state */
  loading?: boolean;
  /** Whether the button should take full width of its container */
  fullWidth?: boolean;
  /** Icon to display before the text */
  iconStart?: string;
  /** Icon to display after the text */
  iconEnd?: string;
}

/**
 * Button click event detail
 */
export interface ForgeButtonEventDetail {
  variant: ButtonVariant;
  size: ButtonSize;
}

/**
 * Button events interface
 */
export interface ForgeButtonEvents {
  'click': CustomEvent<ForgeButtonEventDetail>;
}