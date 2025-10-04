/**
 * Error handling utilities for Forge components
 *
 * Provides consistent, helpful error messages with context and suggestions
 * for common issues developers might encounter.
 *
 * @example
 * ```ts
 * import { createComponentError, throwValidationError } from '@nexcraft/forge/utils';
 *
 * // Create a custom error
 * throw createComponentError('ForgeButton', 'Invalid variant', {
 *   received: 'invalid',
 *   expected: ['primary', 'secondary', 'ghost'],
 *   suggestion: 'Use one of the valid variant values'
 * });
 *
 * // Throw a validation error
 * throwValidationError('ForgeInput', 'value', value, 'string');
 * ```
 */

/* eslint-disable no-console */

export interface ErrorContext {
  component?: string;
  property?: string;
  received?: unknown;
  expected?: unknown;
  suggestion?: string;
  docs?: string;
}

export class ForgeError extends Error {
  component?: string;
  context?: ErrorContext;

  constructor(message: string, context?: ErrorContext) {
    super(message);
    this.name = 'ForgeError';
    this.component = context?.component;
    this.context = context;

    // Maintain proper stack trace for where error was thrown (V8 engines)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ForgeError);
    }
  }
}

/**
 * Create a formatted error message with context
 */
export function createComponentError(
  component: string,
  message: string,
  context?: Omit<ErrorContext, 'component'>,
): ForgeError {
  const fullContext: ErrorContext = {
    component,
    ...context,
  };

  let formattedMessage = `[${component}] ${message}`;

  if (context?.received !== undefined) {
    formattedMessage += `\n  Received: ${formatValue(context.received)}`;
  }

  if (context?.expected !== undefined) {
    formattedMessage += `\n  Expected: ${formatValue(context.expected)}`;
  }

  if (context?.suggestion) {
    formattedMessage += `\n  💡 Suggestion: ${context.suggestion}`;
  }

  if (context?.docs) {
    formattedMessage += `\n  📖 Docs: ${context.docs}`;
  }

  return new ForgeError(formattedMessage, fullContext);
}

/**
 * Format a value for display in error messages
 */
function formatValue(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map((v) => JSON.stringify(v)).join(', ')}]`;
  }
  if (typeof value === 'object' && value !== null) {
    return JSON.stringify(value, null, 2);
  }
  return JSON.stringify(value);
}

/**
 * Throw a validation error for invalid property values
 */
export function throwValidationError(
  component: string,
  property: string,
  received: unknown,
  expected: string | string[],
): never {
  const expectedStr = Array.isArray(expected) ? expected.join(' | ') : expected;

  throw createComponentError(component, `Invalid value for property "${property}"`, {
    property,
    received,
    expected: expectedStr,
    suggestion: `Provide a valid ${expectedStr} value`,
  });
}

/**
 * Throw a required property error
 */
export function throwRequiredPropertyError(component: string, property: string): never {
  throw createComponentError(component, `Required property "${property}" is missing`, {
    property,
    suggestion: `Set the "${property}" property before using the component`,
  });
}

/**
 * Throw a network/fetch error with helpful context
 */
export function throwFetchError(
  component: string,
  url: string,
  status: number,
  statusText: string,
): never {
  const suggestions: Record<number, string> = {
    404: 'Check that the URL is correct and the resource exists',
    403: 'Check that you have permission to access this resource',
    401: 'Authentication may be required',
    500: 'The server encountered an error - try again later',
    503: 'The server is temporarily unavailable - try again later',
  };

  throw createComponentError(component, `Failed to fetch resource`, {
    received: `${status} ${statusText}`,
    expected: '200 OK',
    suggestion: suggestions[status] || 'Check network connection and try again',
    docs: url,
  });
}

/**
 * Throw an invalid SVG error
 */
export function throwInvalidSVGError(component: string, reason?: string): never {
  throw createComponentError(component, 'Invalid SVG content', {
    received: reason || 'Non-SVG content',
    expected: 'Valid SVG markup',
    suggestion: 'Ensure the file contains valid SVG XML with an <svg> root element',
  });
}

/**
 * Throw a browser compatibility error
 */
export function throwCompatibilityError(component: string, feature: string): never {
  throw createComponentError(component, `Browser does not support required feature: ${feature}`, {
    received: 'Unsupported browser',
    expected: 'Modern browser with required features',
    suggestion: 'Update your browser or use a polyfill',
  });
}

/**
 * Create a deprecation warning
 */
export function warnDeprecated(
  component: string,
  deprecated: string,
  replacement?: string,
  removeVersion?: string,
): void {
  let message = `[${component}] "${deprecated}" is deprecated`;

  if (removeVersion) {
    message += ` and will be removed in v${removeVersion}`;
  }

  if (replacement) {
    message += `\n  💡 Use "${replacement}" instead`;
  }

  console.warn(message);
}

/**
 * Create a performance warning
 */
export function warnPerformance(component: string, issue: string, suggestion: string): void {
  console.warn(`[${component}] ⚡ Performance warning: ${issue}\n  💡 Suggestion: ${suggestion}`);
}

/**
 * Create an accessibility warning
 */
export function warnAccessibility(component: string, issue: string, suggestion: string): void {
  console.warn(`[${component}] ♿ Accessibility warning: ${issue}\n  💡 Suggestion: ${suggestion}`);
}

/**
 * Assert a condition and throw an error if false
 */
export function assert(
  condition: boolean,
  component: string,
  message: string,
  context?: Omit<ErrorContext, 'component'>,
): asserts condition {
  if (!condition) {
    throw createComponentError(component, message, context);
  }
}

/**
 * Validate that a value is one of the allowed values
 */
export function assertOneOf<T>(
  value: T,
  allowed: readonly T[],
  component: string,
  property: string,
): void {
  if (!allowed.includes(value)) {
    throwValidationError(component, property, value, Array.from(allowed) as string[]);
  }
}

/**
 * Validate that a value is of the expected type
 */
export function assertType(
  value: unknown,
  expectedType: string,
  component: string,
  property: string,
): void {
  const actualType = Array.isArray(value) ? 'array' : typeof value;

  if (actualType !== expectedType) {
    throwValidationError(component, property, actualType, expectedType);
  }
}

/**
 * Validate that a value is not null or undefined
 */
export function assertDefined<T>(
  value: T | null | undefined,
  component: string,
  property: string,
): asserts value is T {
  if (value === null || value === undefined) {
    throwRequiredPropertyError(component, property);
  }
}

/**
 * Create a friendly error message for common issues
 */
export function getFriendlyErrorMessage(error: Error): string {
  if (error instanceof ForgeError && error.context) {
    return error.message;
  }

  // Provide friendly messages for common errors
  const commonErrors: Record<string, string> = {
    'Failed to fetch': '❌ Network error: Could not load resource. Check your connection.',
    'JSON.parse': '❌ Invalid JSON: The response was not valid JSON.',
    'undefined is not a function':
      '❌ Method not found: Check that the method exists on this component.',
  };

  for (const [pattern, message] of Object.entries(commonErrors)) {
    if (error.message.includes(pattern)) {
      return message;
    }
  }

  return error.message;
}

/**
 * Log an error with full context (useful for debugging)
 */
export function logError(error: Error, component?: string): void {
  if (error instanceof ForgeError) {
    console.group(`❌ Error in ${error.component || component || 'Unknown'}`);
    console.error(error.message);
    if (error.context) {
      console.log('Context:', error.context);
    }
    console.log('Stack:', error.stack);
    console.groupEnd();
  } else {
    console.error(error);
  }
}
