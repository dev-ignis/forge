export {
  VirtualScroller,
  type VirtualScrollerOptions,
  type VirtualScrollerRange,
} from './virtual-scroller';
export { debounce, throttle, raf } from './debounce';
export {
  TokenBridge,
  ColorConverter,
  type DesignToken,
  type TokenType,
  type TokenCollection,
  type ColorToken,
  type SpacingToken,
  type TypographyToken,
} from './token-bridge';
export {
  PerformanceDashboard,
  ForgePerformanceDashboard,
  performanceDashboard,
  type PerformanceMetricsHistory,
  type PerformanceViolation,
  type ComponentMetricsSummary,
} from './performance-dashboard';
export {
  enableGlobalDebug,
  disableGlobalDebug,
  isGlobalDebugEnabled,
  debugComponent,
  debugAllComponents,
  watchComponent,
  profileComponent,
  getAllForgeComponents,
  getAICapabilities,
  generatePerformanceReport,
  getDebugInfo,
  type DebugInfo,
  type DebugOptions,
} from './debug';
export {
  ForgeError,
  createComponentError,
  throwValidationError,
  throwRequiredPropertyError,
  throwFetchError,
  throwInvalidSVGError,
  throwCompatibilityError,
  warnDeprecated,
  warnPerformance,
  warnAccessibility,
  assert,
  assertOneOf,
  assertType,
  assertDefined,
  getFriendlyErrorMessage,
  logError,
  type ErrorContext,
} from './errors';
