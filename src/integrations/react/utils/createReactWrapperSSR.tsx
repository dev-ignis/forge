'use client';

/**
 * @fileoverview SSR-Compatible React wrapper utility for Forge Web Components
 * 
 * Implements Progressive Enhancement pattern:
 * 1. Server: Renders semantic HTML fallback with proper styles
 * 2. Client: Hydrates into fully-featured web component
 * 3. Graceful degradation if JavaScript fails
 */

import React, { 
  forwardRef, 
  useEffect, 
  useRef, 
  useState, 
  useImperativeHandle,
  type Ref,
  type PropsWithChildren,
  type HTMLAttributes 
} from 'react';

export interface ReactWrapperOptions<P extends Record<string, any>> {
  /** Web component tag name (e.g., 'forge-button') */
  tagName: string;
  
  /** Display name for React DevTools */
  displayName: string;
  
  /** Map React event props to web component events */
  eventMappings?: Record<string, string>;
  
  /** Map React props to web component attributes/properties */
  propMappings?: Record<string, string>;
  
  /** Generate semantic HTML fallback for SSR */
  fallbackRenderer: (props: any, children: React.ReactNode) => React.ReactElement;
  
  /** Default props for the fallback component */
  fallbackProps?: Partial<P>;
  
  /** Attributes to preserve during hydration */
  preserveAttributes?: string[];
}

/**
 * Creates an SSR-compatible React wrapper for Forge Web Components
 * 
 * Features:
 * - Server-side semantic HTML fallback
 * - Client-side web component hydration  
 * - Progressive enhancement
 * - Graceful degradation
 * - Accessibility preservation
 */
export function createReactWrapperSSR<T extends HTMLElement, P extends Record<string, any>>(
  options: ReactWrapperOptions<P>
) {
  const WrappedComponent = forwardRef<T, PropsWithChildren<P>>((props, ref: Ref<T>) => {
    const elementRef = useRef<T>(null);
    const fallbackRef = useRef<HTMLElement>(null);
    const [isHydrated, setIsHydrated] = useState(false);
    const [isClient, setIsClient] = useState(false);
    
    const { children, ...restProps } = props;

    // Detect client-side environment
    useEffect(() => {
      setIsClient(true);
    }, []);

    // Separate event handlers from other props
    const eventHandlers = Object.keys(restProps).reduce((handlers, key) => {
      if (key.startsWith('on') && typeof restProps[key] === 'function') {
        handlers[key] = restProps[key];
      }
      return handlers;
    }, {} as Record<string, Function>);

    const nonEventProps = Object.keys(restProps).reduce((nonEvents, key) => {
      if (!key.startsWith('on') || typeof restProps[key] !== 'function') {
        nonEvents[key] = restProps[key];
      }
      return nonEvents;
    }, {} as Record<string, any>);

    // Expose the appropriate ref
    useImperativeHandle(ref, () => {
      return (isHydrated ? elementRef.current : fallbackRef.current) as T;
    }, [isHydrated]);

    // Client-side hydration effect
    useEffect(() => {
      if (!isClient) return;

      // Check if web components are supported and component is registered
      const isWebComponentsSupported = 'customElements' in window;
      const isComponentRegistered = isWebComponentsSupported && 
        customElements.get(options.tagName) !== undefined;

      if (isWebComponentsSupported && isComponentRegistered) {
        // Create web component element
        const webComponent = document.createElement(options.tagName) as T;
        
        // Copy fallback attributes to web component
        const fallbackElement = fallbackRef.current;
        if (fallbackElement && options.preserveAttributes) {
          options.preserveAttributes.forEach(attr => {
            const value = fallbackElement.getAttribute(attr);
            if (value !== null) {
              webComponent.setAttribute(attr, value);
            }
          });
        }

        // Set up web component properties and event listeners
        setupWebComponent(webComponent, nonEventProps, eventHandlers, options);

        // Replace fallback with web component
        if (fallbackElement?.parentNode) {
          // Transfer children content
          while (fallbackElement.firstChild) {
            webComponent.appendChild(fallbackElement.firstChild);
          }
          
          fallbackElement.parentNode.replaceChild(webComponent, fallbackElement);
          elementRef.current = webComponent;
          setIsHydrated(true);
        }
      } else {
        // Web components not supported or not loaded - enhance fallback
        const fallbackElement = fallbackRef.current;
        if (fallbackElement) {
          setupFallbackEnhancement(fallbackElement, eventHandlers);
        }
      }
    }, [isClient, nonEventProps, eventHandlers, options]);

    // Update web component when props change
    useEffect(() => {
      if (isHydrated && elementRef.current) {
        updateWebComponent(elementRef.current, nonEventProps, eventHandlers, options);
      }
    }, [isHydrated, nonEventProps, eventHandlers, options]);

    // Render semantic HTML fallback
    const fallbackElement = options.fallbackRenderer(
      { ...options.fallbackProps, ...restProps }, 
      children
    );

    // Add ref and data attributes to fallback
    return React.cloneElement(fallbackElement, {
      ref: fallbackRef,
      'data-forge-component': options.tagName,
      'data-hydration-target': true,
      suppressHydrationWarning: true,
      ...(fallbackElement.props || {})
    });
  });

  WrappedComponent.displayName = options.displayName;
  return WrappedComponent;
}

/**
 * Set up web component properties and event listeners
 */
function setupWebComponent<T extends HTMLElement, P extends Record<string, any>>(
  element: T,
  props: Record<string, any>,
  eventHandlers: Record<string, Function>,
  options: ReactWrapperOptions<P>
) {
  // Set properties and attributes
  updateWebComponent(element, props, eventHandlers, options);
}

/**
 * Update web component with new props and event handlers
 */
function updateWebComponent<T extends HTMLElement, P extends Record<string, any>>(
  element: T,
  props: Record<string, any>,
  eventHandlers: Record<string, Function>,
  options: ReactWrapperOptions<P>
) {
  // Set properties on the web component
  Object.entries(props).forEach(([key, value]) => {
    const mappedProp = options.propMappings?.[key] || key;
    
    if (typeof value === 'object' && value !== null) {
      // Set complex objects as properties
      (element as any)[mappedProp] = value;
    } else if (typeof value === 'boolean') {
      // Handle boolean attributes
      if (value) {
        element.setAttribute(mappedProp, '');
      } else {
        element.removeAttribute(mappedProp);
      }
    } else if (value !== undefined && value !== null) {
      // Set primitive values as attributes
      element.setAttribute(mappedProp, String(value));
    }
  });

  // Remove old event listeners and add new ones
  const existingListeners = (element as any)._forgeEventListeners || [];
  existingListeners.forEach(({ event, listener }: any) => {
    element.removeEventListener(event, listener);
  });

  const newListeners: Array<{ event: string; listener: EventListener }> = [];
  
  Object.entries(eventHandlers).forEach(([reactEventName, handler]) => {
    if (typeof handler !== 'function') return;
    
    const webComponentEventName = options.eventMappings?.[reactEventName] ||
      reactEventName.toLowerCase().replace(/^on/, '');

    const eventListener = (event: Event) => {
      // Map web component events to React-style handlers
      if (reactEventName === 'onChange' && (event as any).detail?.value !== undefined) {
        handler((event as any).detail.value, event);
      } else if (reactEventName === 'onClick' || reactEventName.includes('Click')) {
        handler(event);
      } else {
        handler((event as any).detail || event, event);
      }
    };

    element.addEventListener(webComponentEventName, eventListener);
    newListeners.push({ event: webComponentEventName, listener: eventListener });
  });

  (element as any)._forgeEventListeners = newListeners;
}

/**
 * Enhance fallback element with basic interactivity
 */
function setupFallbackEnhancement(
  element: HTMLElement,
  eventHandlers: Record<string, Function>
) {
  // Add basic event handling for fallback
  Object.entries(eventHandlers).forEach(([reactEventName, handler]) => {
    if (typeof handler !== 'function') return;
    
    if (reactEventName === 'onClick') {
      element.addEventListener('click', handler as EventListener);
    } else if (reactEventName === 'onChange' && element.tagName === 'INPUT') {
      element.addEventListener('input', (e) => {
        handler((e.target as HTMLInputElement).value, e);
      });
    }
    // Add more event mappings as needed
  });
}

/**
 * Utility to create semantic HTML fallback renderers
 */
export const FallbackRenderers = {
  button: (props: any, children: React.ReactNode) => {
    const { variant = 'primary', size = 'md', disabled, loading, ...htmlProps } = props;
    
    return (
      <button
        type="button"
        disabled={disabled || loading}
        className={`forge-button forge-button--${variant} forge-button--${size} ${loading ? 'forge-button--loading' : ''}`}
        {...htmlProps}
        style={{
          // Critical CSS for proper fallback rendering
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: size === 'sm' ? '0 12px' : size === 'lg' ? '0 20px' : '0 16px',
          height: size === 'sm' ? '32px' : size === 'lg' ? '48px' : '40px',
          fontSize: size === 'sm' ? '14px' : size === 'lg' ? '18px' : '16px',
          fontWeight: '500',
          border: 'none',
          borderRadius: '6px',
          cursor: disabled || loading ? 'not-allowed' : 'pointer',
          backgroundColor: variant === 'primary' ? '#3b82f6' : 
                          variant === 'danger' ? '#ef4444' : 'transparent',
          color: variant === 'secondary' ? '#3b82f6' : '#ffffff',
          borderWidth: variant === 'secondary' ? '1px' : '0',
          borderStyle: variant === 'secondary' ? 'solid' : 'none',
          borderColor: variant === 'secondary' ? '#3b82f6' : 'transparent',
          opacity: disabled ? 0.5 : 1,
          ...props.style
        }}
      >
        {loading && <span style={{ marginRight: '8px' }}>⏳</span>}
        {children}
      </button>
    );
  },

  input: (props: any, children: React.ReactNode) => {
    const { variant = 'default', size = 'md', error, ...htmlProps } = props;
    
    return (
      <input
        className={`forge-input forge-input--${variant} forge-input--${size} ${error ? 'forge-input--error' : ''}`}
        {...htmlProps}
        style={{
          display: 'block',
          width: '100%',
          padding: size === 'sm' ? '8px 12px' : size === 'lg' ? '12px 16px' : '10px 14px',
          fontSize: size === 'sm' ? '14px' : size === 'lg' ? '18px' : '16px',
          border: `1px solid ${error ? '#ef4444' : '#d1d5db'}`,
          borderRadius: '6px',
          outline: 'none',
          backgroundColor: '#ffffff',
          color: '#1f2937',
          ...props.style
        }}
      />
    );
  },

  card: (props: any, children: React.ReactNode) => {
    const { variant = 'default', size = 'md', hoverable, ...htmlProps } = props;
    
    return (
      <div
        className={`forge-card forge-card--${variant} forge-card--${size} ${hoverable ? 'forge-card--hoverable' : ''}`}
        {...htmlProps}
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          border: '1px solid #e5e7eb',
          padding: size === 'sm' ? '16px' : size === 'lg' ? '32px' : '24px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          transition: hoverable ? 'box-shadow 0.2s ease-in-out' : 'none',
          cursor: hoverable ? 'pointer' : 'default',
          ...props.style
        }}
        onMouseEnter={hoverable ? (e) => {
          (e.target as HTMLElement).style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } : undefined}
        onMouseLeave={hoverable ? (e) => {
          (e.target as HTMLElement).style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
        } : undefined}
      >
        {children}
      </div>
    );
  },

  alert: (props: any, children: React.ReactNode) => {
    const { severity = 'info', variant = 'default', dismissible, title, ...htmlProps } = props;
    
    const severityColors = {
      success: { bg: '#f0fdf4', border: '#bbf7d0', text: '#166534' },
      warning: { bg: '#fffbeb', border: '#fed7aa', text: '#92400e' },
      error: { bg: '#fef2f2', border: '#fecaca', text: '#dc2626' },
      info: { bg: '#eff6ff', border: '#bfdbfe', text: '#1d4ed8' }
    };
    
    const colors = severityColors[severity as keyof typeof severityColors] || severityColors.info;
    
    return (
      <div
        role="alert"
        className={`forge-alert forge-alert--${severity} forge-alert--${variant} ${dismissible ? 'forge-alert--dismissible' : ''}`}
        {...htmlProps}
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          padding: '16px',
          borderRadius: '6px',
          border: `1px solid ${colors.border}`,
          backgroundColor: colors.bg,
          color: colors.text,
          fontSize: '14px',
          lineHeight: '1.5',
          ...props.style
        }}
      >
        <div style={{ flex: 1 }}>
          {title && (
            <div style={{ fontWeight: '600', marginBottom: '4px' }}>
              {title}
            </div>
          )}
          <div>
            {children}
          </div>
        </div>
        {dismissible && (
          <button
            type="button"
            style={{
              marginLeft: '12px',
              background: 'none',
              border: 'none',
              fontSize: '18px',
              cursor: 'pointer',
              color: colors.text,
              opacity: 0.7,
              padding: '0',
              lineHeight: 1
            }}
            onClick={props.onDismiss}
            aria-label="Dismiss alert"
          >
            ×
          </button>
        )}
      </div>
    );
  },

  aspectRatio: (props: any, children: React.ReactNode) => {
    const { ratio = '16/9', ...htmlProps } = props;
    
    // Parse ratio string (e.g., "16/9", "1", "4/3") or number
    let aspectRatio: number;
    if (typeof ratio === 'number') {
      aspectRatio = ratio;
    } else if (typeof ratio === 'string' && ratio.includes('/')) {
      const [width, height] = ratio.split('/').map(Number);
      aspectRatio = width / height;
    } else {
      aspectRatio = parseFloat(ratio as string) || 16/9;
    }
    
    return (
      <div
        className={`forge-aspect-ratio forge-aspect-ratio--${typeof ratio === 'string' ? ratio.replace('/', '-') : ratio}`}
        {...htmlProps}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: aspectRatio.toString(),
          // Fallback for browsers that don't support aspect-ratio
          paddingBottom: `${100 / aspectRatio}%`,
          height: '0',
          overflow: 'hidden',
          ...props.style
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {children}
        </div>
      </div>
    );
  },

  avatar: (props: any, children: React.ReactNode) => {
    const { 
      size = 'md', 
      src, 
      alt = '', 
      initials, 
      status, 
      statusPosition = 'bottom-right', 
      shape = 'circular', 
      badge, 
      loading,
      ...htmlProps 
    } = props;
    
    const sizeValues = {
      xs: '24px',
      sm: '32px', 
      md: '40px',
      lg: '48px',
      xl: '64px',
      '2xl': '80px'
    };
    
    const avatarSize = sizeValues[size as keyof typeof sizeValues] || sizeValues.md;
    
    return (
      <div
        className={`forge-avatar forge-avatar--${size} forge-avatar--${shape} ${status ? `forge-avatar--status-${status}` : ''}`}
        {...htmlProps}
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: avatarSize,
          height: avatarSize,
          borderRadius: shape === 'circular' ? '50%' : '8px',
          backgroundColor: src || loading ? 'transparent' : '#e5e7eb',
          color: '#6b7280',
          fontSize: size === 'xs' ? '10px' : size === 'sm' ? '12px' : size === 'lg' ? '18px' : size === 'xl' ? '24px' : size === '2xl' ? '32px' : '14px',
          fontWeight: '500',
          overflow: 'hidden',
          ...props.style
        }}
      >
        {loading && (
          <div 
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f3f4f6'
            }}
          >
            <span>⏳</span>
          </div>
        )}
        
        {!loading && src && (
          <img
            src={src}
            alt={alt}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 'inherit'
            }}
          />
        )}
        
        {!loading && !src && initials && (
          <span style={{ userSelect: 'none' }}>
            {initials.substring(0, 2).toUpperCase()}
          </span>
        )}
        
        {!loading && !src && !initials && children}
        
        {status && (
          <div
            className={`forge-avatar__status forge-avatar__status--${status} forge-avatar__status--${statusPosition}`}
            style={{
              position: 'absolute',
              width: size === 'xs' ? '6px' : size === 'sm' ? '8px' : '10px',
              height: size === 'xs' ? '6px' : size === 'sm' ? '8px' : '10px',
              borderRadius: '50%',
              border: '2px solid white',
              backgroundColor: status === 'online' ? '#10b981' : 
                             status === 'offline' ? '#6b7280' : 
                             status === 'away' ? '#f59e0b' : 
                             status === 'busy' ? '#ef4444' : '#6b7280',
              ...(statusPosition === 'bottom-right' && {
                bottom: '-1px',
                right: '-1px'
              }),
              ...(statusPosition === 'bottom-left' && {
                bottom: '-1px',
                left: '-1px'
              }),
              ...(statusPosition === 'top-right' && {
                top: '-1px',
                right: '-1px'
              }),
              ...(statusPosition === 'top-left' && {
                top: '-1px',
                left: '-1px'
              })
            }}
          />
        )}
        
        {badge && (
          <div
            className={`forge-avatar__badge`}
            style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              minWidth: size === 'xs' ? '14px' : '16px',
              height: size === 'xs' ? '14px' : '16px',
              borderRadius: '50%',
              backgroundColor: '#ef4444',
              color: 'white',
              fontSize: size === 'xs' ? '8px' : '10px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 4px',
              border: '2px solid white'
            }}
          >
            {badge}
          </div>
        )}
      </div>
    );
  },

  badge: (props: any, children: React.ReactNode) => {
    const { variant = 'default', size = 'md', dot = false, ...htmlProps } = props;
    
    const variantColors = {
      default: { bg: '#6b7280', color: 'white' },
      success: { bg: '#10b981', color: 'white' },
      warning: { bg: '#f59e0b', color: 'white' },
      error: { bg: '#ef4444', color: 'white' },
      info: { bg: '#3b82f6', color: 'white' }
    };
    
    const colors = variantColors[variant as keyof typeof variantColors] || variantColors.default;
    
    if (dot) {
      return (
        <span
          className={`forge-badge forge-badge--dot forge-badge--${variant} forge-badge--${size}`}
          {...htmlProps}
          style={{
            display: 'inline-block',
            width: size === 'sm' ? '6px' : size === 'lg' ? '10px' : '8px',
            height: size === 'sm' ? '6px' : size === 'lg' ? '10px' : '8px',
            borderRadius: '50%',
            backgroundColor: colors.bg,
            flexShrink: 0,
            ...props.style
          }}
        />
      );
    }
    
    return (
      <span
        className={`forge-badge forge-badge--${variant} forge-badge--${size}`}
        {...htmlProps}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: size === 'sm' ? '2px 6px' : size === 'lg' ? '4px 12px' : '2px 8px',
          fontSize: size === 'sm' ? '10px' : size === 'lg' ? '14px' : '12px',
          fontWeight: '500',
          lineHeight: '1',
          borderRadius: size === 'sm' ? '4px' : size === 'lg' ? '8px' : '6px',
          backgroundColor: colors.bg,
          color: colors.color,
          whiteSpace: 'nowrap',
          textTransform: 'uppercase',
          letterSpacing: '0.025em',
          ...props.style
        }}
      >
        {children}
      </span>
    );
  },

  icon: (props: any, children: React.ReactNode) => {
    const { name, size = '16px', color = 'currentColor', ...htmlProps } = props;
    
    const iconSize = typeof size === 'number' ? `${size}px` : size;
    
    return (
      <span
        className={`forge-icon forge-icon--${name}`}
        {...htmlProps}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: iconSize,
          height: iconSize,
          fontSize: iconSize,
          color: color,
          flexShrink: 0,
          lineHeight: 1,
          userSelect: 'none',
          ...props.style
        }}
        role="img"
        aria-label={props['aria-label'] || name || 'icon'}
      >
        {/* Fallback icon representation - could be enhanced with actual icon sets */}
        {name ? (
          // Simple text representation for common icons
          name === 'search' ? '🔍' :
          name === 'user' ? '👤' :
          name === 'home' ? '🏠' :
          name === 'settings' ? '⚙️' :
          name === 'mail' ? '📧' :
          name === 'phone' ? '📞' :
          name === 'edit' ? '✏️' :
          name === 'delete' ? '🗑️' :
          name === 'save' ? '💾' :
          name === 'check' ? '✓' :
          name === 'close' ? '✕' :
          name === 'arrow-left' ? '←' :
          name === 'arrow-right' ? '→' :
          name === 'arrow-up' ? '↑' :
          name === 'arrow-down' ? '↓' :
          name === 'plus' ? '+' :
          name === 'minus' ? '−' :
          name === 'star' ? '★' :
          name === 'heart' ? '♥' :
          name === 'warning' ? '⚠️' :
          name === 'error' ? '❌' :
          name === 'info' ? 'ℹ️' :
          name === 'success' ? '✅' :
          // Generic fallback
          '⬜'
        ) : (
          children || '⬜'
        )}
      </span>
    );
  },

  progressCircle: (props: any, children: React.ReactNode) => {
    const { 
      value = 0, 
      max = 100, 
      indeterminate = false,
      size = '48px',
      strokeWidth = 4,
      showValue = false,
      ...htmlProps 
    } = props;
    
    const circleSize = typeof size === 'number' ? `${size}px` : size;
    const radius = 20;
    const circumference = 2 * Math.PI * radius;
    const progress = indeterminate ? 0 : (value / max) * circumference;
    
    return (
      <div
        className={`forge-progress-circle ${indeterminate ? 'forge-progress-circle--indeterminate' : ''}`}
        {...htmlProps}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: circleSize,
          height: circleSize,
          position: 'relative',
          ...props.style
        }}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemax={max}
      >
        <svg 
          width={circleSize} 
          height={circleSize}
          style={{ transform: 'rotate(-90deg)' }}
        >
          <circle
            cx="50%" 
            cy="50%"
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
          />
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            stroke="#3b82f6"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            style={{
              transition: indeterminate ? 'none' : 'stroke-dashoffset 0.3s ease',
              animation: indeterminate ? 'forge-progress-spin 1s linear infinite' : 'none'
            }}
          />
        </svg>
        {showValue && !indeterminate && (
          <div 
            style={{
              position: 'absolute',
              fontSize: '12px',
              fontWeight: '500',
              color: '#374151'
            }}
          >
            {Math.round(value)}%
          </div>
        )}
      </div>
    );
  },

  radioGroup: (props: any, children: React.ReactNode) => {
    const { 
      name, 
      value, 
      disabled = false,
      orientation = 'vertical',
      options = [],
      onChange,
      ...htmlProps 
    } = props;
    
    return (
      <fieldset
        className={`forge-radio-group forge-radio-group--${orientation}`}
        {...htmlProps}
        disabled={disabled}
        style={{
          border: 'none',
          margin: 0,
          padding: 0,
          display: 'flex',
          flexDirection: orientation === 'horizontal' ? 'row' : 'column',
          gap: orientation === 'horizontal' ? '16px' : '8px',
          ...props.style
        }}
      >
        {options.map((option, index) => (
          <label
            key={option.value}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: disabled || option.disabled ? 'not-allowed' : 'pointer',
              opacity: disabled || option.disabled ? 0.5 : 1
            }}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              disabled={disabled || option.disabled}
              onChange={(e) => onChange?.(e.target.value, e as any)}
              style={{
                margin: 0,
                width: '16px',
                height: '16px',
                accentColor: '#3b82f6'
              }}
            />
            <span style={{ fontSize: '14px', color: '#374151' }}>
              {option.label}
            </span>
          </label>
        ))}
        {!options.length && children}
      </fieldset>
    );
  },

  select: (props: any, children: React.ReactNode) => {
    const { 
      value, 
      placeholder = 'Select option',
      disabled = false,
      multiple = false,
      options = [],
      onChange,
      ...htmlProps 
    } = props;
    
    return (
      <select
        className={`forge-select ${multiple ? 'forge-select--multiple' : ''}`}
        {...htmlProps}
        value={value || ''}
        disabled={disabled}
        multiple={multiple}
        onChange={(e) => {
          const selectedValue = multiple 
            ? Array.from(e.target.selectedOptions, option => option.value)
            : e.target.value;
          onChange?.(selectedValue, e as any);
        }}
        style={{
          width: '100%',
          padding: '10px 14px',
          fontSize: '14px',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          backgroundColor: '#ffffff',
          color: '#374151',
          outline: 'none',
          cursor: disabled ? 'not-allowed' : 'pointer',
          ...props.style
        }}
      >
        {!multiple && placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option 
            key={option.value} 
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
        {!options.length && children}
      </select>
    );
  },

  skeleton: (props: any, children: React.ReactNode) => {
    const { 
      width = '100%',
      height = '20px',
      animated = true,
      variant = 'text',
      ...htmlProps 
    } = props;
    
    const skeletonWidth = typeof width === 'number' ? `${width}px` : width;
    const skeletonHeight = typeof height === 'number' ? `${height}px` : height;
    
    return (
      <div
        className={`forge-skeleton forge-skeleton--${variant} ${animated ? 'forge-skeleton--animated' : ''}`}
        {...htmlProps}
        style={{
          display: 'block',
          width: skeletonWidth,
          height: skeletonHeight,
          backgroundColor: '#f3f4f6',
          borderRadius: variant === 'circular' ? '50%' : 
                        variant === 'rectangular' ? '4px' : '4px',
          animation: animated ? 'forge-skeleton-pulse 1.5s ease-in-out infinite' : 'none',
          ...props.style
        }}
        aria-label="Loading..."
      >
        {children}
      </div>
    );
  },

  checkbox: (props: any, children: React.ReactNode) => {
    const { checked, indeterminate, disabled, label, value, ...htmlProps } = props;
    
    return (
      <label
        className={`forge-checkbox ${checked ? 'forge-checkbox--checked' : ''} ${indeterminate ? 'forge-checkbox--indeterminate' : ''} ${disabled ? 'forge-checkbox--disabled' : ''}`}
        {...htmlProps}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          cursor: disabled ? 'not-allowed' : 'pointer',
          fontSize: '14px',
          lineHeight: '1.5',
          userSelect: 'none',
          ...props.style
        }}
      >
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          value={value}
          onChange={props.onChange ? (e) => props.onChange(e.target.checked, e) : undefined}
          style={{
            width: '16px',
            height: '16px',
            margin: 0,
            cursor: disabled ? 'not-allowed' : 'pointer'
          }}
          ref={(input) => {
            if (input && indeterminate) {
              input.indeterminate = true;
            }
          }}
        />
        {(label || children) && (
          <span style={{ color: disabled ? '#9ca3af' : '#374151' }}>
            {label || children}
          </span>
        )}
      </label>
    );
  },

  switch: (props: any, children: React.ReactNode) => {
    const { checked, disabled, label, size = 'md', ...htmlProps } = props;
    
    const switchSize = {
      sm: { width: '32px', height: '18px', thumb: '14px' },
      md: { width: '40px', height: '22px', thumb: '18px' },
      lg: { width: '48px', height: '26px', thumb: '22px' }
    };
    
    const currentSize = switchSize[size as keyof typeof switchSize] || switchSize.md;
    
    return (
      <label
        className={`forge-switch forge-switch--${size} ${checked ? 'forge-switch--checked' : ''} ${disabled ? 'forge-switch--disabled' : ''}`}
        {...htmlProps}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          cursor: disabled ? 'not-allowed' : 'pointer',
          fontSize: '14px',
          lineHeight: '1.5',
          userSelect: 'none',
          ...props.style
        }}
      >
        <div
          style={{
            position: 'relative',
            width: currentSize.width,
            height: currentSize.height,
            backgroundColor: checked ? '#3b82f6' : '#d1d5db',
            borderRadius: currentSize.height,
            transition: 'background-color 0.2s ease-in-out',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.5 : 1
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '2px',
              left: checked ? `calc(100% - ${currentSize.thumb} - 2px)` : '2px',
              width: currentSize.thumb,
              height: currentSize.thumb,
              backgroundColor: '#ffffff',
              borderRadius: '50%',
              transition: 'left 0.2s ease-in-out',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}
          />
        </div>
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={props.onChange ? (e) => props.onChange(e.target.checked, e) : undefined}
          style={{ display: 'none' }}
        />
        {(label || children) && (
          <span style={{ color: disabled ? '#9ca3af' : '#374151' }}>
            {label || children}
          </span>
        )}
      </label>
    );
  },

  progress: (props: any, children: React.ReactNode) => {
    const { value = 0, max = 100, indeterminate = false, size = 'medium', variant = 'linear', ...htmlProps } = props;
    
    const progressHeight = size === 'small' ? '4px' : size === 'large' ? '12px' : '8px';
    const percentage = indeterminate ? 0 : Math.min(100, Math.max(0, (value / max) * 100));
    
    if (variant === 'circular') {
      const circularSize = size === 'small' ? 24 : size === 'large' ? 48 : 32;
      const strokeWidth = size === 'small' ? 2 : size === 'large' ? 4 : 3;
      const radius = (circularSize - strokeWidth) / 2;
      const circumference = 2 * Math.PI * radius;
      const strokeDasharray = indeterminate ? circumference : `${(percentage / 100) * circumference} ${circumference}`;
      
      return (
        <div
          className={`forge-progress forge-progress--circular forge-progress--${size} ${indeterminate ? 'forge-progress--indeterminate' : ''}`}
          role="progressbar"
          aria-valuenow={indeterminate ? undefined : value}
          aria-valuemax={max}
          {...htmlProps}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            ...props.style
          }}
        >
          <svg
            width={circularSize}
            height={circularSize}
            style={{ transform: 'rotate(-90deg)' }}
          >
            <circle
              cx={circularSize / 2}
              cy={circularSize / 2}
              r={radius}
              strokeWidth={strokeWidth}
              stroke="#e5e7eb"
              fill="none"
            />
            <circle
              cx={circularSize / 2}
              cy={circularSize / 2}
              r={radius}
              strokeWidth={strokeWidth}
              stroke="#3b82f6"
              fill="none"
              strokeDasharray={strokeDasharray}
              strokeLinecap="round"
              style={{
                transition: indeterminate ? 'none' : 'stroke-dasharray 0.3s ease-in-out',
                animation: indeterminate ? 'spin 1s linear infinite' : 'none'
              }}
            />
          </svg>
          {children}
        </div>
      );
    }
    
    return (
      <div
        className={`forge-progress forge-progress--linear forge-progress--${size} ${indeterminate ? 'forge-progress--indeterminate' : ''}`}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemax={max}
        {...htmlProps}
        style={{
          width: '100%',
          backgroundColor: '#e5e7eb',
          borderRadius: progressHeight,
          overflow: 'hidden',
          ...props.style
        }}
      >
        <div
          style={{
            width: indeterminate ? '100%' : `${percentage}%`,
            height: progressHeight,
            backgroundColor: '#3b82f6',
            borderRadius: progressHeight,
            transition: indeterminate ? 'none' : 'width 0.3s ease-in-out',
            animation: indeterminate ? 'indeterminate 2s ease-in-out infinite' : 'none'
          }}
        />
        {children}
      </div>
    );
  },

  // Molecule Component Fallback Renderers

  datePicker: (props: any, children: React.ReactNode) => {
    const { 
      value, 
      min, 
      max, 
      disabled = false,
      placeholder = 'Select date',
      format = 'YYYY-MM-DD',
      ...htmlProps 
    } = props;
    
    return (
      <input
        type="date"
        className="forge-date-picker"
        {...htmlProps}
        value={value || ''}
        min={min}
        max={max}
        disabled={disabled}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '10px 14px',
          fontSize: '14px',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          backgroundColor: '#ffffff',
          color: '#374151',
          outline: 'none',
          cursor: disabled ? 'not-allowed' : 'pointer',
          ...props.style
        }}
      />
    );
  },

  dropdown: (props: any, children: React.ReactNode) => {
    const { 
      items = [], 
      label, 
      placeholder = 'Select option',
      disabled = false,
      ...htmlProps 
    } = props;
    
    return (
      <div className="forge-dropdown" style={{ position: 'relative', ...props.style }}>
        {label && (
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>
            {label}
          </label>
        )}
        <button
          className="forge-dropdown__trigger"
          {...htmlProps}
          disabled={disabled}
          style={{
            width: '100%',
            padding: '10px 14px',
            fontSize: '14px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            backgroundColor: '#ffffff',
            color: '#374151',
            textAlign: 'left',
            cursor: disabled ? 'not-allowed' : 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <span>{placeholder}</span>
          <span>▼</span>
        </button>
        {children}
      </div>
    );
  },

  formField: (props: any, children: React.ReactNode) => {
    const { 
      label, 
      required = false,
      error = false,
      errorMessage,
      helperText,
      disabled = false,
      ...htmlProps 
    } = props;
    
    return (
      <div 
        className={`forge-form-field ${error ? 'forge-form-field--error' : ''} ${disabled ? 'forge-form-field--disabled' : ''}`}
        {...htmlProps}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          ...props.style
        }}
      >
        {label && (
          <label 
            style={{ 
              fontSize: '14px', 
              fontWeight: '500', 
              color: error ? '#ef4444' : disabled ? '#9ca3af' : '#374151' 
            }}
          >
            {label}
            {required && <span style={{ color: '#ef4444', marginLeft: '2px' }}>*</span>}
          </label>
        )}
        <div style={{ position: 'relative' }}>
          {children}
        </div>
        {error && errorMessage && (
          <span style={{ fontSize: '12px', color: '#ef4444' }}>
            {errorMessage}
          </span>
        )}
        {!error && helperText && (
          <span style={{ fontSize: '12px', color: '#6b7280' }}>
            {helperText}
          </span>
        )}
      </div>
    );
  },

  modal: (props: any, children: React.ReactNode) => {
    const { 
      open = false, 
      title, 
      showCloseButton = true,
      size = 'medium',
      backdrop = true,
      ...htmlProps 
    } = props;
    
    if (!open) return null;
    
    return (
      <div
        className="forge-modal-overlay"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: backdrop ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}
      >
        <div
          className={`forge-modal forge-modal--${size}`}
          {...htmlProps}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'modal-title' : undefined}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            width: size === 'small' ? '320px' : size === 'large' ? '768px' : '512px',
            maxWidth: '90vw',
            maxHeight: '90vh',
            overflow: 'auto',
            ...props.style
          }}
        >
          {(title || showCloseButton) && (
            <div 
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 24px',
                borderBottom: '1px solid #e5e7eb'
              }}
            >
              {title && <h2 id="modal-title" style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>{title}</h2>}
              {showCloseButton && (
                <button
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '18px',
                    cursor: 'pointer',
                    padding: '4px',
                    color: '#6b7280'
                  }}
                  aria-label="Close modal"
                >
                  ✕
                </button>
              )}
            </div>
          )}
          <div style={{ padding: '24px' }}>
            {children}
          </div>
        </div>
      </div>
    );
  },

  multiSelect: (props: any, children: React.ReactNode) => {
    const { 
      options = [], 
      value = [],
      placeholder = 'Select options',
      disabled = false,
      searchable = false,
      maxSelections,
      ...htmlProps 
    } = props;
    
    return (
      <div className="forge-multi-select" style={{ position: 'relative', ...props.style }}>
        <div
          className="forge-multi-select__control"
          style={{
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            padding: '8px 12px',
            backgroundColor: '#ffffff',
            minHeight: '40px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '4px',
            cursor: disabled ? 'not-allowed' : 'pointer'
          }}
          {...htmlProps}
        >
          {value.length > 0 ? (
            value.map((val: string, idx: number) => {
              const option = options.find((opt: any) => opt.value === val);
              return (
                <span
                  key={val}
                  style={{
                    backgroundColor: '#e5e7eb',
                    color: '#374151',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  {option?.label || val}
                  <button
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      cursor: 'pointer',
                      fontSize: '10px',
                      color: '#6b7280'
                    }}
                  >
                    ✕
                  </button>
                </span>
              );
            })
          ) : (
            <span style={{ color: '#9ca3af', fontSize: '14px' }}>
              {placeholder}
            </span>
          )}
        </div>
        {children}
      </div>
    );
  },

  toast: (props: any, children: React.ReactNode) => {
    const { 
      title, 
      type = 'info',
      closeable = true,
      position = 'top-right',
      ...htmlProps 
    } = props;
    
    const typeColors = {
      success: { bg: '#f0fdf4', border: '#bbf7d0', text: '#166534', icon: '✅' },
      error: { bg: '#fef2f2', border: '#fecaca', text: '#dc2626', icon: '❌' },
      warning: { bg: '#fffbeb', border: '#fed7aa', text: '#92400e', icon: '⚠️' },
      info: { bg: '#eff6ff', border: '#bfdbfe', text: '#1d4ed8', icon: 'ℹ️' }
    };
    
    const colors = typeColors[type as keyof typeof typeColors] || typeColors.info;
    
    return (
      <div
        className={`forge-toast forge-toast--${type} forge-toast--${position}`}
        {...htmlProps}
        role="alert"
        style={{
          position: 'fixed',
          ...(position.includes('top') && { top: '16px' }),
          ...(position.includes('bottom') && { bottom: '16px' }),
          ...(position.includes('right') && { right: '16px' }),
          ...(position.includes('left') && { left: '16px' }),
          ...(position.includes('center') && { left: '50%', transform: 'translateX(-50%)' }),
          backgroundColor: colors.bg,
          border: `1px solid ${colors.border}`,
          color: colors.text,
          borderRadius: '8px',
          padding: '12px 16px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          minWidth: '300px',
          maxWidth: '500px',
          zIndex: 1050,
          ...props.style
        }}
      >
        <span style={{ fontSize: '16px' }}>{colors.icon}</span>
        <div style={{ flex: 1 }}>
          {title && <div style={{ fontWeight: '500', marginBottom: '4px' }}>{title}</div>}
          {children}
        </div>
        {closeable && (
          <button
            style={{
              background: 'none',
              border: 'none',
              color: colors.text,
              cursor: 'pointer',
              padding: '2px',
              fontSize: '14px'
            }}
            aria-label="Close toast"
          >
            ✕
          </button>
        )}
      </div>
    );
  },

  tooltip: (props: any, children: React.ReactNode) => {
    const { 
      content, 
      position = 'top',
      delay = 0,
      disabled = false,
      ...htmlProps 
    } = props;
    
    return (
      <div 
        className="forge-tooltip-wrapper"
        style={{ position: 'relative', display: 'inline-block', ...props.style }}
        {...htmlProps}
      >
        {children}
        {!disabled && content && (
          <div
            className={`forge-tooltip forge-tooltip--${position}`}
            style={{
              position: 'absolute',
              backgroundColor: '#1f2937',
              color: '#ffffff',
              padding: '6px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              whiteSpace: 'nowrap',
              zIndex: 1000,
              opacity: 0,
              pointerEvents: 'none',
              transition: 'opacity 0.2s',
              ...(position === 'top' && {
                bottom: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                marginBottom: '4px'
              }),
              ...(position === 'bottom' && {
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                marginTop: '4px'
              }),
              ...(position === 'left' && {
                right: '100%',
                top: '50%',
                transform: 'translateY(-50%)',
                marginRight: '4px'
              }),
              ...(position === 'right' && {
                left: '100%',
                top: '50%',
                transform: 'translateY(-50%)',
                marginLeft: '4px'
              })
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.opacity = '0';
            }}
          >
            {content}
          </div>
        )}
      </div>
    );
  },

  // Organism Component Fallback Renderers

  tabs: (props: any, children: React.ReactNode) => {
    const { 
      activeTab,
      variant = 'default',
      orientation = 'horizontal',
      tabs = [],
      onTabChange,
      ...htmlProps 
    } = props;
    
    const isVertical = orientation === 'vertical';
    
    return (
      <div
        className={`forge-tabs forge-tabs--${variant} forge-tabs--${orientation}`}
        {...htmlProps}
        style={{
          display: 'flex',
          flexDirection: isVertical ? 'row' : 'column',
          ...props.style
        }}
      >
        {/* Tab List */}
        <div
          role="tablist"
          aria-orientation={orientation}
          style={{
            display: 'flex',
            flexDirection: isVertical ? 'column' : 'row',
            borderBottom: !isVertical && variant === 'underline' ? '1px solid #e5e7eb' : 'none',
            borderRight: isVertical ? '1px solid #e5e7eb' : 'none',
            marginRight: isVertical ? '16px' : '0',
            marginBottom: !isVertical ? '16px' : '0'
          }}
        >
          {tabs.map((tab, index) => {
            const isActive = activeTab === tab.id || (!activeTab && index === 0);
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`tabpanel-${tab.id}`}
                id={`tab-${tab.id}`}
                disabled={tab.disabled}
                onClick={() => !tab.disabled && onTabChange?.(tab.id)}
                style={{
                  padding: '12px 16px',
                  border: 'none',
                  backgroundColor: variant === 'pills' && isActive ? '#3b82f6' : 
                                 variant === 'filled' && isActive ? '#f3f4f6' : 'transparent',
                  color: variant === 'pills' && isActive ? '#ffffff' : 
                         isActive ? '#3b82f6' : '#6b7280',
                  borderRadius: variant === 'pills' ? '6px' : '0',
                  borderBottom: variant === 'underline' && isActive ? '2px solid #3b82f6' : 
                               variant === 'underline' ? '2px solid transparent' : 'none',
                  cursor: tab.disabled ? 'not-allowed' : 'pointer',
                  opacity: tab.disabled ? 0.5 : 1,
                  fontWeight: isActive ? '600' : '400',
                  fontSize: '14px',
                  whiteSpace: 'nowrap'
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
        
        {/* Tab Panels */}
        <div style={{ flex: 1 }}>
          {tabs.map((tab, index) => {
            const isActive = activeTab === tab.id || (!activeTab && index === 0);
            return (
              <div
                key={tab.id}
                role="tabpanel"
                id={`tabpanel-${tab.id}`}
                aria-labelledby={`tab-${tab.id}`}
                hidden={!isActive}
                style={{
                  display: isActive ? 'block' : 'none',
                  padding: '16px 0'
                }}
              >
                {tab.content}
              </div>
            );
          })}
          {!tabs.length && children}
        </div>
      </div>
    );
  },

  accordion: (props: any, children: React.ReactNode) => {
    const { 
      title,
      open = false,
      disabled = false,
      variant = 'default',
      onToggle,
      ...htmlProps 
    } = props;
    
    return (
      <details
        className={`forge-accordion forge-accordion--${variant} ${disabled ? 'forge-accordion--disabled' : ''}`}
        {...htmlProps}
        open={open}
        style={{
          border: '1px solid #e5e7eb',
          borderRadius: '6px',
          overflow: 'hidden',
          backgroundColor: variant === 'filled' ? '#f9fafb' : '#ffffff',
          ...props.style
        }}
        onToggle={(e) => {
          if (!disabled) {
            const isOpen = (e.target as HTMLDetailsElement).open;
            onToggle?.(isOpen);
          }
        }}
      >
        <summary
          style={{
            padding: '16px',
            backgroundColor: variant === 'filled' ? '#f3f4f6' : 'transparent',
            border: variant === 'outlined' ? '1px solid #e5e7eb' : 'none',
            cursor: disabled ? 'not-allowed' : 'pointer',
            fontWeight: '500',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            listStyle: 'none',
            opacity: disabled ? 0.5 : 1
          }}
          onClick={(e) => {
            if (disabled) {
              e.preventDefault();
            }
          }}
        >
          <span>{title}</span>
          <span
            style={{
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease',
              fontSize: '12px'
            }}
          >
            ▼
          </span>
        </summary>
        <div
          style={{
            padding: '16px',
            borderTop: '1px solid #e5e7eb',
            backgroundColor: '#ffffff'
          }}
        >
          {children}
        </div>
      </details>
    );
  },

  pagination: (props: any, children: React.ReactNode) => {
    const {
      currentPage = 1,
      totalPages = 1,
      pageSize = 10,
      totalItems = 0,
      showSizeChanger = false,
      showQuickJumper = false,
      showTotal = false,
      disabled = false,
      onPageChange,
      onPageSizeChange,
      ...htmlProps
    } = props;

    const getVisiblePages = () => {
      const delta = 2;
      const range = [];
      const rangeWithDots = [];

      for (let i = Math.max(2, currentPage - delta);
           i <= Math.min(totalPages - 1, currentPage + delta);
           i++) {
        range.push(i);
      }

      if (currentPage - delta > 2) {
        rangeWithDots.push(1, '...');
      } else {
        rangeWithDots.push(1);
      }

      rangeWithDots.push(...range);

      if (currentPage + delta < totalPages - 1) {
        rangeWithDots.push('...', totalPages);
      } else if (totalPages > 1) {
        rangeWithDots.push(totalPages);
      }

      return rangeWithDots;
    };

    return (
      <nav
        className="forge-pagination"
        {...htmlProps}
        role="navigation"
        aria-label="Pagination"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexWrap: 'wrap',
          ...props.style
        }}
      >
        {showTotal && (
          <span style={{ fontSize: '14px', color: '#6b7280', marginRight: '16px' }}>
            Total {totalItems} items
          </span>
        )}

        {/* Previous Button */}
        <button
          disabled={disabled || currentPage <= 1}
          onClick={() => onPageChange?.(currentPage - 1)}
          style={{
            padding: '8px 12px',
            border: '1px solid #e5e7eb',
            borderRadius: '4px',
            backgroundColor: '#ffffff',
            cursor: (disabled || currentPage <= 1) ? 'not-allowed' : 'pointer',
            opacity: (disabled || currentPage <= 1) ? 0.5 : 1,
            fontSize: '14px'
          }}
          aria-label="Previous page"
        >
          ←
        </button>

        {/* Page Numbers */}
        {getVisiblePages().map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span style={{ padding: '8px', color: '#6b7280' }}>...</span>
            ) : (
              <button
                disabled={disabled}
                onClick={() => typeof page === 'number' && onPageChange?.(page)}
                style={{
                  padding: '8px 12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '4px',
                  backgroundColor: currentPage === page ? '#3b82f6' : '#ffffff',
                  color: currentPage === page ? '#ffffff' : '#374151',
                  cursor: disabled ? 'not-allowed' : 'pointer',
                  opacity: disabled ? 0.5 : 1,
                  fontSize: '14px',
                  fontWeight: currentPage === page ? '600' : '400'
                }}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}

        {/* Next Button */}
        <button
          disabled={disabled || currentPage >= totalPages}
          onClick={() => onPageChange?.(currentPage + 1)}
          style={{
            padding: '8px 12px',
            border: '1px solid #e5e7eb',
            borderRadius: '4px',
            backgroundColor: '#ffffff',
            cursor: (disabled || currentPage >= totalPages) ? 'not-allowed' : 'pointer',
            opacity: (disabled || currentPage >= totalPages) ? 0.5 : 1,
            fontSize: '14px'
          }}
          aria-label="Next page"
        >
          →
        </button>

        {showSizeChanger && (
          <select
            disabled={disabled}
            value={pageSize}
            onChange={(e) => onPageSizeChange?.(parseInt(e.target.value))}
            style={{
              padding: '8px 12px',
              border: '1px solid #e5e7eb',
              borderRadius: '4px',
              backgroundColor: '#ffffff',
              cursor: disabled ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              marginLeft: '16px'
            }}
            aria-label="Items per page"
          >
            <option value={10}>10 / page</option>
            <option value={20}>20 / page</option>
            <option value={50}>50 / page</option>
            <option value={100}>100 / page</option>
          </select>
        )}

        {showQuickJumper && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '16px' }}>
            <span style={{ fontSize: '14px', color: '#6b7280' }}>Go to</span>
            <input
              type="number"
              min={1}
              max={totalPages}
              disabled={disabled}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  const value = parseInt((e.target as HTMLInputElement).value);
                  if (value >= 1 && value <= totalPages) {
                    onPageChange?.(value);
                  }
                }
              }}
              style={{
                width: '60px',
                padding: '4px 8px',
                border: '1px solid #e5e7eb',
                borderRadius: '4px',
                fontSize: '14px'
              }}
              aria-label="Jump to page"
            />
          </div>
        )}
      </nav>
    );
  },

  navigationBar: (props: any, children: React.ReactNode) => {
    const {
      brand,
      items = [],
      variant = 'default',
      fixed = false,
      sticky = false,
      onItemClick,
      ...htmlProps
    } = props;

    const variantStyles = {
      default: { bg: '#ffffff', text: '#374151', border: '#e5e7eb' },
      dark: { bg: '#1f2937', text: '#ffffff', border: '#374151' },
      light: { bg: '#f9fafb', text: '#374151', border: '#e5e7eb' }
    };

    const styles = variantStyles[variant as keyof typeof variantStyles] || variantStyles.default;

    return (
      <nav
        className={`forge-navigation-bar forge-navigation-bar--${variant} ${fixed ? 'forge-navigation-bar--fixed' : ''} ${sticky ? 'forge-navigation-bar--sticky' : ''}`}
        {...htmlProps}
        role="navigation"
        aria-label="Main navigation"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 24px',
          backgroundColor: styles.bg,
          borderBottom: `1px solid ${styles.border}`,
          color: styles.text,
          position: fixed ? 'fixed' : sticky ? 'sticky' : 'static',
          top: (fixed || sticky) ? '0' : 'auto',
          left: fixed ? '0' : 'auto',
          right: fixed ? '0' : 'auto',
          zIndex: fixed ? 1000 : sticky ? 100 : 'auto',
          width: fixed ? '100%' : 'auto',
          ...props.style
        }}
      >
        {/* Brand/Logo */}
        {brand && (
          <div 
            className="forge-navigation-bar__brand"
            style={{
              fontWeight: '600',
              fontSize: '18px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {brand}
          </div>
        )}

        {/* Navigation Items */}
        <div 
          className="forge-navigation-bar__items"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginLeft: 'auto'
          }}
        >
          {items.map((item) => {
            const ItemComponent = item.href ? 'a' : 'button';
            return (
              <ItemComponent
                key={item.id}
                href={item.href}
                disabled={item.disabled}
                onClick={() => !item.disabled && onItemClick?.(item.id)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: item.active ? (variant === 'dark' ? '#374151' : '#f3f4f6') : 'transparent',
                  color: item.active ? styles.text : styles.text,
                  textDecoration: 'none',
                  cursor: item.disabled ? 'not-allowed' : 'pointer',
                  opacity: item.disabled ? 0.5 : 1,
                  fontSize: '14px',
                  fontWeight: item.active ? '500' : '400',
                  transition: 'background-color 0.2s ease',
                  display: 'flex',
                  alignItems: 'center'
                }}
                onMouseEnter={(e) => {
                  if (!item.disabled && !item.active) {
                    (e.target as HTMLElement).style.backgroundColor = variant === 'dark' ? '#374151' : '#f9fafb';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!item.disabled && !item.active) {
                    (e.target as HTMLElement).style.backgroundColor = 'transparent';
                  }
                }}
              >
                {item.label}
              </ItemComponent>
            );
          })}
        </div>

        {/* Custom children for additional content */}
        {!items.length && children}
      </nav>
    );
  },

  treeView: (props: any, children: React.ReactNode) => {
    const {
      data = [],
      selectable = true,
      multiSelect = false,
      expandable = true,
      showConnectors = true,
      onSelect,
      onExpand,
      ...htmlProps
    } = props;

    const renderTreeNode = (node: any, level: number = 0) => {
      const hasChildren = node.children && node.children.length > 0;
      const indentSize = level * 20;

      return (
        <li
          key={node.id}
          style={{
            listStyle: 'none',
            marginLeft: showConnectors ? `${indentSize}px` : '0'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '4px 8px',
              borderRadius: '4px',
              cursor: node.disabled ? 'not-allowed' : 'pointer',
              opacity: node.disabled ? 0.5 : 1,
              backgroundColor: node.selected ? '#e0f2fe' : 'transparent',
              border: node.selected ? '1px solid #0ea5e9' : '1px solid transparent',
              marginBottom: '2px'
            }}
            onClick={() => {
              if (!node.disabled) {
                if (expandable && hasChildren) {
                  onExpand?.(node.id, !node.expanded);
                }
                if (selectable) {
                  onSelect?.(node.id, !node.selected);
                }
              }
            }}
            onMouseEnter={(e) => {
              if (!node.disabled && !node.selected) {
                (e.target as HTMLElement).style.backgroundColor = '#f8fafc';
              }
            }}
            onMouseLeave={(e) => {
              if (!node.disabled && !node.selected) {
                (e.target as HTMLElement).style.backgroundColor = 'transparent';
              }
            }}
          >
            {/* Connector lines */}
            {showConnectors && level > 0 && (
              <div
                style={{
                  width: '16px',
                  height: '1px',
                  backgroundColor: '#d1d5db',
                  marginRight: '4px'
                }}
              />
            )}

            {/* Expand/Collapse icon */}
            {expandable && hasChildren && (
              <span
                style={{
                  fontSize: '12px',
                  marginRight: '8px',
                  transform: node.expanded ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease',
                  color: '#6b7280'
                }}
              >
                ▶
              </span>
            )}

            {/* Selection checkbox for multi-select */}
            {selectable && multiSelect && (
              <input
                type="checkbox"
                checked={node.selected || false}
                disabled={node.disabled}
                onChange={(e) => {
                  e.stopPropagation();
                  onSelect?.(node.id, e.target.checked);
                }}
                style={{
                  marginRight: '8px',
                  accentColor: '#3b82f6'
                }}
                aria-label={`Select ${node.label}`}
              />
            )}

            {/* Selection radio for single-select */}
            {selectable && !multiSelect && (
              <input
                type="radio"
                checked={node.selected || false}
                disabled={node.disabled}
                onChange={(e) => {
                  e.stopPropagation();
                  onSelect?.(node.id, e.target.checked);
                }}
                style={{
                  marginRight: '8px',
                  accentColor: '#3b82f6'
                }}
                aria-label={`Select ${node.label}`}
              />
            )}

            {/* Node label */}
            <span
              style={{
                fontSize: '14px',
                color: node.disabled ? '#9ca3af' : '#374151',
                fontWeight: node.selected ? '500' : '400'
              }}
            >
              {node.label}
            </span>
          </div>

          {/* Children nodes */}
          {hasChildren && (node.expanded || !expandable) && (
            <ul
              style={{
                margin: '0',
                padding: '0',
                marginTop: '4px'
              }}
            >
              {node.children.map((child: any) => renderTreeNode(child, level + 1))}
            </ul>
          )}
        </li>
      );
    };

    return (
      <div
        className="forge-tree-view"
        {...htmlProps}
        role="tree"
        aria-label="Tree view"
        style={{
          padding: '8px',
          border: '1px solid #e5e7eb',
          borderRadius: '6px',
          backgroundColor: '#ffffff',
          maxHeight: '400px',
          overflowY: 'auto',
          ...props.style
        }}
      >
        {data.length > 0 ? (
          <ul style={{ margin: '0', padding: '0' }}>
            {data.map((node: any) => renderTreeNode(node))}
          </ul>
        ) : (
          <div style={{ padding: '16px', textAlign: 'center', color: '#9ca3af' }}>
            No data available
          </div>
        )}
        {!data.length && children}
      </div>
    );
  },

  // High-Complexity Data Component Fallback Renderers

  dataGrid: (props: any, children: React.ReactNode) => {
    const {
      columns = [],
      data = [],
      selectable = false,
      selectionType = 'multiple',
      virtualScrolling = false,
      virtualThreshold = 100,
      showToolbar = false,
      showSearch = false,
      searchQuery = '',
      loading = false,
      editable = false,
      onSelectionChanged,
      onCellEdit,
      onSortChanged,
      onSearchChanged,
      ...htmlProps
    } = props;

    const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
    const [sortState, setSortState] = React.useState<Record<string, 'asc' | 'desc' | null>>({});
    const [currentSearchQuery, setCurrentSearchQuery] = React.useState(searchQuery);

    const filteredData = React.useMemo(() => {
      if (!currentSearchQuery) return data;
      return data.filter((row: any) =>
        Object.values(row).some((value: any) =>
          String(value).toLowerCase().includes(currentSearchQuery.toLowerCase())
        )
      );
    }, [data, currentSearchQuery]);

    const sortedData = React.useMemo(() => {
      const sortedEntries = Object.entries(sortState).filter(([, direction]) => direction !== null);
      if (sortedEntries.length === 0) return filteredData;
      
      return [...filteredData].sort((a, b) => {
        for (const [column, direction] of sortedEntries) {
          const aVal = a[column];
          const bVal = b[column];
          const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
          if (comparison !== 0) {
            return direction === 'asc' ? comparison : -comparison;
          }
        }
        return 0;
      });
    }, [filteredData, sortState]);

    const handleSort = (columnKey: string) => {
      const currentSort = sortState[columnKey];
      const nextSort = currentSort === null ? 'asc' : currentSort === 'asc' ? 'desc' : null;
      const newSortState = { ...sortState, [columnKey]: nextSort };
      setSortState(newSortState);
      onSortChanged?.(Object.entries(newSortState).filter(([, dir]) => dir !== null));
    };

    const handleRowSelection = (rowId: string, selected: boolean) => {
      let newSelection: string[];
      if (selectionType === 'single') {
        newSelection = selected ? [rowId] : [];
      } else {
        newSelection = selected 
          ? [...selectedRows, rowId]
          : selectedRows.filter(id => id !== rowId);
      }
      setSelectedRows(newSelection);
      onSelectionChanged?.(newSelection, newSelection.length === sortedData.length);
    };

    const handleSearch = (query: string) => {
      setCurrentSearchQuery(query);
      const filtered = data.filter((row: any) =>
        Object.values(row).some((value: any) =>
          String(value).toLowerCase().includes(query.toLowerCase())
        )
      );
      onSearchChanged?.(query, filtered);
    };

    if (loading) {
      return (
        <div
          className="forge-data-grid forge-data-grid--loading"
          {...htmlProps}
          style={{
            padding: '48px',
            textAlign: 'center',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            backgroundColor: '#ffffff',
            ...props.style
          }}
        >
          <div style={{ fontSize: '16px', color: '#6b7280', marginBottom: '16px' }}>
            ⏳ Loading data...
          </div>
        </div>
      );
    }

    return (
      <div
        className="forge-data-grid"
        {...htmlProps}
        style={{
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          backgroundColor: '#ffffff',
          overflow: 'hidden',
          ...props.style
        }}
      >
        {/* Toolbar */}
        {showToolbar && (
          <div
            style={{
              padding: '16px',
              borderBottom: '1px solid #e5e7eb',
              backgroundColor: '#f9fafb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ fontSize: '16px', fontWeight: '600', color: '#374151' }}>
              Data Grid ({sortedData.length} items)
            </div>
            {showSearch && (
              <input
                type="text"
                placeholder="Search..."
                value={currentSearchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                style={{
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  fontSize: '14px',
                  width: '200px'
                }}
              />
            )}
          </div>
        )}

        {/* Data Table */}
        <div style={{ overflowX: 'auto', maxHeight: virtualScrolling ? '400px' : 'none', overflowY: virtualScrolling ? 'auto' : 'visible' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#f9fafb' }}>
              <tr>
                {selectable && (
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', width: '40px' }}>
                    {selectionType === 'multiple' && (
                      <input
                        type="checkbox"
                        checked={selectedRows.length === sortedData.length && sortedData.length > 0}
                        onChange={(e) => {
                          const newSelection = e.target.checked ? sortedData.map((row: any) => row.id) : [];
                          setSelectedRows(newSelection);
                          onSelectionChanged?.(newSelection, e.target.checked);
                        }}
                        style={{ accentColor: '#3b82f6' }}
                      />
                    )}
                  </th>
                )}
                {columns.map((column: any) => (
                  <th
                    key={column.field}
                    style={{
                      padding: '12px',
                      textAlign: 'left',
                      borderBottom: '1px solid #e5e7eb',
                      fontWeight: '600',
                      fontSize: '14px',
                      color: '#374151',
                      cursor: column.sortable ? 'pointer' : 'default',
                      userSelect: 'none',
                      width: column.width
                    }}
                    onClick={() => column.sortable && handleSort(column.field)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {column.headerName}
                      {column.sortable && (
                        <span style={{ fontSize: '12px', color: '#9ca3af' }}>
                          {sortState[column.field] === 'asc' ? '↑' :
                           sortState[column.field] === 'desc' ? '↓' : '↕'}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedData.map((row: any, index: number) => (
                <tr
                  key={row.id || index}
                  style={{
                    backgroundColor: selectedRows.includes(row.id) ? '#eff6ff' : index % 2 === 0 ? '#ffffff' : '#f9fafb',
                    borderBottom: '1px solid #f3f4f6'
                  }}
                >
                  {selectable && (
                    <td style={{ padding: '12px', textAlign: 'left' }}>
                      <input
                        type={selectionType === 'single' ? 'radio' : 'checkbox'}
                        checked={selectedRows.includes(row.id)}
                        onChange={(e) => handleRowSelection(row.id, e.target.checked)}
                        style={{ accentColor: '#3b82f6' }}
                      />
                    </td>
                  )}
                  {columns.map((column: any) => (
                    <td
                      key={column.field}
                      style={{
                        padding: '12px',
                        fontSize: '14px',
                        color: '#374151',
                        borderBottom: '1px solid #f3f4f6'
                      }}
                    >
                      {editable ? (
                        <input
                          type="text"
                          defaultValue={row[column.field]}
                          onBlur={(e) => onCellEdit?.(row.id, column.field, row[column.field], e.target.value)}
                          style={{
                            border: 'none',
                            background: 'transparent',
                            width: '100%',
                            fontSize: '14px'
                          }}
                        />
                      ) : (
                        row[column.field]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              {sortedData.length === 0 && (
                <tr>
                  <td
                    colSpan={columns.length + (selectable ? 1 : 0)}
                    style={{
                      padding: '32px',
                      textAlign: 'center',
                      color: '#9ca3af',
                      fontStyle: 'italic'
                    }}
                  >
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {!columns.length && children}
      </div>
    );
  },

  dataTable: (props: any, children: React.ReactNode) => {
    const {
      columns = [],
      data = [],
      sortable = true,
      selectable = false,
      pagination = false,
      pageSize = 10,
      currentPage = 1,
      totalItems = data.length,
      loading = false,
      onSort,
      onSelectionChange,
      onPageChange,
      ...htmlProps
    } = props;

    const [selectedRows, setSelectedRows] = React.useState<any[]>([]);
    const [currentSort, setCurrentSort] = React.useState<{ column: string; direction: 'asc' | 'desc' } | null>(null);

    const sortedData = React.useMemo(() => {
      if (!currentSort || !sortable) return data;
      
      return [...data].sort((a, b) => {
        const aVal = a[currentSort.column];
        const bVal = b[currentSort.column];
        const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        return currentSort.direction === 'asc' ? comparison : -comparison;
      });
    }, [data, currentSort, sortable]);

    const paginatedData = React.useMemo(() => {
      if (!pagination) return sortedData;
      const start = (currentPage - 1) * pageSize;
      return sortedData.slice(start, start + pageSize);
    }, [sortedData, pagination, currentPage, pageSize]);

    const handleSort = (columnKey: string) => {
      if (!sortable) return;
      
      const newDirection = currentSort?.column === columnKey && currentSort.direction === 'asc' ? 'desc' : 'asc';
      const newSort = { column: columnKey, direction: newDirection as 'asc' | 'desc' };
      setCurrentSort(newSort);
      onSort?.(columnKey, newDirection);
    };

    const handleRowSelection = (row: any, selected: boolean) => {
      const newSelection = selected
        ? [...selectedRows, row]
        : selectedRows.filter(r => r !== row);
      setSelectedRows(newSelection);
      onSelectionChange?.(newSelection);
    };

    if (loading) {
      return (
        <div
          className="forge-data-table forge-data-table--loading"
          {...htmlProps}
          style={{
            padding: '48px',
            textAlign: 'center',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            backgroundColor: '#ffffff',
            ...props.style
          }}
        >
          <div style={{ fontSize: '16px', color: '#6b7280' }}>
            ⏳ Loading table data...
          </div>
        </div>
      );
    }

    const totalPages = pagination ? Math.ceil(totalItems / pageSize) : 1;

    return (
      <div
        className="forge-data-table"
        {...htmlProps}
        style={{
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          backgroundColor: '#ffffff',
          overflow: 'hidden',
          ...props.style
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#f9fafb' }}>
              <tr>
                {selectable && (
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', width: '40px' }}>
                    <input
                      type="checkbox"
                      checked={selectedRows.length === paginatedData.length && paginatedData.length > 0}
                      onChange={(e) => {
                        const newSelection = e.target.checked ? paginatedData : [];
                        setSelectedRows(newSelection);
                        onSelectionChange?.(newSelection);
                      }}
                      style={{ accentColor: '#3b82f6' }}
                    />
                  </th>
                )}
                {columns.map((column: any) => (
                  <th
                    key={column.key}
                    style={{
                      padding: '12px',
                      textAlign: 'left',
                      borderBottom: '1px solid #e5e7eb',
                      fontWeight: '600',
                      fontSize: '14px',
                      color: '#374151',
                      cursor: sortable && column.sortable !== false ? 'pointer' : 'default',
                      userSelect: 'none',
                      width: column.width
                    }}
                    onClick={() => (sortable && column.sortable !== false) && handleSort(column.key)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {column.title}
                      {sortable && column.sortable !== false && (
                        <span style={{ fontSize: '12px', color: '#9ca3af' }}>
                          {currentSort?.column === column.key ? 
                            (currentSort.direction === 'asc' ? '↑' : '↓') : '↕'}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row: any, index: number) => (
                <tr
                  key={row.id || index}
                  style={{
                    backgroundColor: selectedRows.includes(row) ? '#eff6ff' : index % 2 === 0 ? '#ffffff' : '#f9fafb'
                  }}
                >
                  {selectable && (
                    <td style={{ padding: '12px', textAlign: 'left' }}>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(row)}
                        onChange={(e) => handleRowSelection(row, e.target.checked)}
                        style={{ accentColor: '#3b82f6' }}
                      />
                    </td>
                  )}
                  {columns.map((column: any) => (
                    <td
                      key={column.key}
                      style={{
                        padding: '12px',
                        fontSize: '14px',
                        color: '#374151',
                        borderBottom: '1px solid #f3f4f6'
                      }}
                    >
                      {row[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
              {paginatedData.length === 0 && (
                <tr>
                  <td
                    colSpan={columns.length + (selectable ? 1 : 0)}
                    style={{
                      padding: '32px',
                      textAlign: 'center',
                      color: '#9ca3af',
                      fontStyle: 'italic'
                    }}
                  >
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination && totalPages > 1 && (
          <div
            style={{
              padding: '16px',
              borderTop: '1px solid #e5e7eb',
              backgroundColor: '#f9fafb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ fontSize: '14px', color: '#6b7280' }}>
              Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, totalItems)} of {totalItems} entries
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                disabled={currentPage <= 1}
                onClick={() => onPageChange?.(currentPage - 1)}
                style={{
                  padding: '8px 12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '4px',
                  backgroundColor: '#ffffff',
                  cursor: currentPage <= 1 ? 'not-allowed' : 'pointer',
                  opacity: currentPage <= 1 ? 0.5 : 1
                }}
              >
                Previous
              </button>
              <span style={{ padding: '8px 12px', fontSize: '14px' }}>
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage >= totalPages}
                onClick={() => onPageChange?.(currentPage + 1)}
                style={{
                  padding: '8px 12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '4px',
                  backgroundColor: '#ffffff',
                  cursor: currentPage >= totalPages ? 'not-allowed' : 'pointer',
                  opacity: currentPage >= totalPages ? 0.5 : 1
                }}
              >
                Next
              </button>
            </div>
          </div>
        )}
        
        {!columns.length && children}
      </div>
    );
  }
};