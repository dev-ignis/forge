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
 * Performance mode options
 */
export type PerformanceMode = 'auto' | 'fast' | 'normal';

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
  
  // AI-Ready attributes (UVP)
  /** Semantic role for AI understanding */
  semanticRole?: string;
  /** Context for AI assistants */
  aiContext?: string;
  /** Enhanced description for screen readers and AI */
  ariaDescription?: string;
  
  // Performance monitoring (UVP)
  /** Maximum render time in milliseconds */
  maxRenderMs?: number;
  /** Whether to warn on performance violations */
  warnOnViolation?: boolean;
  /** Performance mode setting */
  performanceMode?: PerformanceMode;
  
  // Developer experience (UVP)
  /** Enable development mode */
  devMode?: boolean;
  /** Show performance metrics overlay */
  showMetrics?: boolean;
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