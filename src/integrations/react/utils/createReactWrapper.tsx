/**
 * @fileoverview Core React wrapper utility for Forge Web Components
 * 
 * Creates React wrapper components that provide:
 * - Proper TypeScript support
 * - Event handler mapping
 * - Prop-to-attribute conversion
 * - SSR compatibility
 * 
 * Addresses GitHub Issue #17 integration challenges
 */

import React, { 
  forwardRef, 
  useEffect, 
  useRef, 
  useImperativeHandle,
  useState,
  type Ref,
  type ReactElement,
  type HTMLAttributes,
  type PropsWithChildren
} from 'react';

// Utility type to extract event handlers from props
type EventHandlers<T> = {
  [K in keyof T as K extends `on${string}` ? K : never]: T[K];
};

// Utility type to extract non-event props
type NonEventProps<T> = {
  [K in keyof T as K extends `on${string}` ? never : K]: T[K];
};

export interface ReactWrapperOptions<P = any> {
  tagName: string;
  displayName: string;
  propMappings?: Record<string, string>;
  eventMappings?: Record<string, string>;
  ssrFallback?: (props: PropsWithChildren<P>) => ReactElement | null;
}

/**
 * Provides semantic HTML fallbacks for Forge components during SSR
 * This ensures content is accessible and styled properly until web components load
 */
function getDefaultFallback(tagName: string, props: any): ReactElement {
  const { children, className, style, ...restProps } = props;
  
  const baseStyles: React.CSSProperties = {
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontSize: '14px',
    lineHeight: '1.5',
    ...style
  };

  // Add CSS animations for fallback components
  React.useEffect(() => {
    if (typeof document !== 'undefined' && !document.getElementById('forge-fallback-styles')) {
      const style = document.createElement('style');
      style.id = 'forge-fallback-styles';
      style.textContent = `
        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  switch (tagName) {
    case 'forge-button':
      return (
        <button 
          {...restProps}
          className={`forge-button-fallback ${className || ''}`}
          style={{
            ...baseStyles,
            padding: '8px 16px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            background: props.variant === 'primary' ? '#3b82f6' : '#ffffff',
            color: props.variant === 'primary' ? '#ffffff' : '#374151',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.2s',
            ...style
          }}
        >
          {children}
        </button>
      );

    case 'forge-input':
      return (
        <input 
          {...restProps}
          className={`forge-input-fallback ${className || ''}`}
          style={{
            ...baseStyles,
            padding: '8px 12px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            background: '#ffffff',
            color: '#374151',
            fontSize: '14px',
            width: '100%',
            boxSizing: 'border-box',
            ...style
          }}
        />
      );

    case 'forge-card':
      return (
        <div 
          {...restProps}
          className={`forge-card-fallback ${className || ''}`}
          style={{
            ...baseStyles,
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            background: '#ffffff',
            padding: '16px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            ...style
          }}
        >
          {children}
        </div>
      );

    case 'forge-alert':
      return (
        <div 
          {...restProps}
          className={`forge-alert-fallback ${className || ''}`}
          style={{
            ...baseStyles,
            padding: '12px 16px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            background: props.severity === 'error' ? '#fef2f2' : 
                       props.severity === 'warning' ? '#fffbeb' :
                       props.severity === 'success' ? '#f0fdf4' : '#f8fafc',
            color: props.severity === 'error' ? '#dc2626' :
                   props.severity === 'warning' ? '#d97706' :
                   props.severity === 'success' ? '#16a34a' : '#475569',
            borderColor: props.severity === 'error' ? '#fecaca' :
                        props.severity === 'warning' ? '#fed7aa' :
                        props.severity === 'success' ? '#bbf7d0' : '#e2e8f0',
            ...style
          }}
        >
          {children}
        </div>
      );

    case 'forge-checkbox':
      return (
        <input 
          type="checkbox"
          {...restProps}
          className={`forge-checkbox-fallback ${className || ''}`}
          style={{
            ...baseStyles,
            width: '16px',
            height: '16px',
            accentColor: '#3b82f6',
            ...style
          }}
        />
      );

    case 'forge-progress':
      return (
        <div 
          {...restProps}
          className={`forge-progress-fallback ${className || ''}`}
          style={{
            ...baseStyles,
            width: '100%',
            height: '8px',
            background: '#e5e7eb',
            borderRadius: '4px',
            overflow: 'hidden',
            position: 'relative',
            ...style
          }}
        >
          <div 
            style={{
              width: `${props.value || 0}%`,
              height: '100%',
              background: '#3b82f6',
              borderRadius: '4px',
              transition: 'width 0.3s ease'
            }}
          />
        </div>
      );

    case 'forge-avatar':
      return (
        <div 
          {...restProps}
          className={`forge-avatar-fallback ${className || ''}`}
          style={{
            ...baseStyles,
            width: props.size === 'sm' ? '32px' : props.size === 'lg' ? '64px' : '48px',
            height: props.size === 'sm' ? '32px' : props.size === 'lg' ? '64px' : '48px',
            borderRadius: '50%',
            background: '#e5e7eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#6b7280',
            fontSize: props.size === 'sm' ? '12px' : props.size === 'lg' ? '20px' : '16px',
            fontWeight: '500',
            overflow: 'hidden',
            ...style
          }}
        >
          {props.src ? (
            <img 
              src={props.src} 
              alt={props.alt || ''} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            children || props.initials || '?'
          )}
        </div>
      );

    case 'forge-modal':
      return (
        <div 
          {...restProps}
          className={`forge-modal-fallback ${className || ''}`}
          style={{
            ...baseStyles,
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            background: 'rgba(0, 0, 0, 0.5)',
            display: props.open ? 'flex' : 'none',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            ...style
          }}
        >
          <div 
            style={{
              background: '#ffffff',
              borderRadius: '8px',
              padding: '24px',
              maxWidth: '500px',
              maxHeight: '80vh',
              overflow: 'auto',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
            }}
          >
            {children}
          </div>
        </div>
      );

    case 'forge-dropdown':
      return (
        <div 
          {...restProps}
          className={`forge-dropdown-fallback ${className || ''}`}
          style={{
            ...baseStyles,
            position: 'relative',
            display: 'inline-block',
            ...style
          }}
        >
          {children}
        </div>
      );

    // Additional Atom Components
    case 'forge-badge':
      return (
        <span 
          {...restProps}
          className={`forge-badge-fallback ${className || ''}`}
          style={{
            ...baseStyles,
            display: 'inline-flex',
            alignItems: 'center',
            padding: '2px 8px',
            fontSize: '12px',
            fontWeight: '500',
            borderRadius: '9999px',
            background: props.variant === 'success' ? '#dcfce7' : 
                       props.variant === 'warning' ? '#fef3c7' :
                       props.variant === 'error' ? '#fee2e2' : '#f3f4f6',
            color: props.variant === 'success' ? '#166534' :
                   props.variant === 'warning' ? '#92400e' :
                   props.variant === 'error' ? '#991b1b' : '#374151',
            ...style
          }}
        >
          {children}
        </span>
      );

    case 'forge-icon':
      return (
        <span 
          {...restProps}
          className={`forge-icon-fallback ${className || ''}`}
          style={{
            ...baseStyles,
            display: 'inline-block',
            width: props.size || '16px',
            height: props.size || '16px',
            ...style
          }}
          role="img"
          aria-label={props.name || 'icon'}
        >
          {children || '○'}
        </span>
      );

    case 'forge-select':
      return (
        <select 
          {...restProps}
          className={`forge-select-fallback ${className || ''}`}
          style={{
            ...baseStyles,
            padding: '8px 12px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            background: '#ffffff',
            color: '#374151',
            fontSize: '14px',
            width: '100%',
            ...style
          }}
        >
          {children}
        </select>
      );

    case 'forge-switch':
      return (
        <label 
          className={`forge-switch-fallback ${className || ''}`}
          style={{
            ...baseStyles,
            display: 'inline-flex',
            alignItems: 'center',
            cursor: 'pointer',
            ...style
          }}
        >
          <input 
            type="checkbox"
            {...restProps}
            style={{
              appearance: 'none',
              width: '44px',
              height: '24px',
              background: props.checked ? '#3b82f6' : '#e5e7eb',
              borderRadius: '12px',
              position: 'relative',
              cursor: 'pointer',
              transition: 'background 0.2s',
              marginRight: '8px'
            }}
          />
          {children}
        </label>
      );

    case 'forge-skeleton':
      return (
        <div 
          {...restProps}
          className={`forge-skeleton-fallback ${className || ''}`}
          style={{
            ...baseStyles,
            background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
            backgroundSize: '200% 100%',
            animation: 'loading 1.5s infinite',
            borderRadius: '4px',
            height: props.height || '20px',
            width: props.width || '100%',
            ...style
          }}
        />
      );

    case 'forge-radio-group':
      return (
        <fieldset 
          {...restProps}
          className={`forge-radio-group-fallback ${className || ''}`}
          style={{
            ...baseStyles,
            border: 'none',
            padding: '0',
            margin: '0',
            ...style
          }}
        >
          {children}
        </fieldset>
      );

    case 'forge-aspect-ratio':
      return (
        <div 
          {...restProps}
          className={`forge-aspect-ratio-fallback ${className || ''}`}
          style={{
            ...baseStyles,
            position: 'relative',
            width: '100%',
            aspectRatio: props.ratio || '16/9',
            ...style
          }}
        >
          {children}
        </div>
      );

    case 'forge-progress-circle':
      return (
        <div 
          {...restProps}
          className={`forge-progress-circle-fallback ${className || ''}`}
          style={{
            ...baseStyles,
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            border: '4px solid #e5e7eb',
            borderTopColor: '#3b82f6',
            animation: props.indeterminate ? 'spin 1s linear infinite' : 'none',
            position: 'relative',
            ...style
          }}
        >
          {!props.indeterminate && (
            <div 
              style={{
                position: 'absolute',
                inset: '0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: '500'
              }}
            >
              {props.value || 0}%
            </div>
          )}
        </div>
      );

    // Molecule Components
    case 'forge-tooltip':
      return (
        <div 
          {...restProps}
          className={`forge-tooltip-fallback ${className || ''}`}
          style={{
            ...baseStyles,
            position: 'relative',
            display: 'inline-block',
            ...style
          }}
          title={props.content}
        >
          {children}
        </div>
      );

    case 'forge-toast':
      return (
        <div 
          {...restProps}
          className={`forge-toast-fallback ${className || ''}`}
          style={{
            ...baseStyles,
            position: 'fixed',
            top: '16px',
            right: '16px',
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '16px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            maxWidth: '400px',
            zIndex: 1000,
            ...style
          }}
        >
          {children}
        </div>
      );

    case 'forge-form-field':
      return (
        <div 
          {...restProps}
          className={`forge-form-field-fallback ${className || ''}`}
          style={{
            ...baseStyles,
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            ...style
          }}
        >
          {children}
        </div>
      );

    case 'forge-date-picker':
      return (
        <input 
          type="date"
          {...restProps}
          className={`forge-date-picker-fallback ${className || ''}`}
          style={{
            ...baseStyles,
            padding: '8px 12px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            background: '#ffffff',
            color: '#374151',
            fontSize: '14px',
            ...style
          }}
        />
      );

    case 'forge-multi-select':
      return (
        <select 
          multiple
          {...restProps}
          className={`forge-multi-select-fallback ${className || ''}`}
          style={{
            ...baseStyles,
            padding: '8px 12px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            background: '#ffffff',
            color: '#374151',
            fontSize: '14px',
            minHeight: '80px',
            ...style
          }}
        >
          {children}
        </select>
      );

    // Organism Components
    case 'forge-tabs':
      return (
        <div 
          {...restProps}
          className={`forge-tabs-fallback ${className || ''}`}
          style={{
            ...baseStyles,
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            ...style
          }}
        >
          {children}
        </div>
      );

    case 'forge-accordion':
      return (
        <details 
          {...restProps}
          className={`forge-accordion-fallback ${className || ''}`}
          style={{
            ...baseStyles,
            border: '1px solid #e5e7eb',
            borderRadius: '6px',
            padding: '16px',
            ...style
          }}
        >
          <summary style={{ cursor: 'pointer', fontWeight: '500' }}>
            {props.title || 'Accordion'}
          </summary>
          <div style={{ marginTop: '12px' }}>
            {children}
          </div>
        </details>
      );

    case 'forge-data-table':
      return (
        <div 
          {...restProps}
          className={`forge-data-table-fallback ${className || ''}`}
          style={{
            ...baseStyles,
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            overflow: 'auto',
            ...style
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              {children}
            </tbody>
          </table>
        </div>
      );

    case 'forge-pagination':
      return (
        <nav 
          {...restProps}
          className={`forge-pagination-fallback ${className || ''}`}
          style={{
            ...baseStyles,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            ...style
          }}
        >
          {children}
        </nav>
      );

    case 'forge-navigation-bar':
      return (
        <nav 
          {...restProps}
          className={`forge-navigation-bar-fallback ${className || ''}`}
          style={{
            ...baseStyles,
            display: 'flex',
            alignItems: 'center',
            padding: '12px 24px',
            background: '#ffffff',
            borderBottom: '1px solid #e5e7eb',
            ...style
          }}
        >
          {children}
        </nav>
      );

    case 'forge-tree-view':
      return (
        <div 
          {...restProps}
          className={`forge-tree-view-fallback ${className || ''}`}
          style={{
            ...baseStyles,
            border: '1px solid #e5e7eb',
            borderRadius: '6px',
            padding: '8px',
            ...style
          }}
        >
          {children}
        </div>
      );

    default:
      // Generic fallback for unknown components
      return (
        <div 
          {...restProps}
          className={`forge-component-fallback ${className || ''}`}
          style={{
            ...baseStyles,
            border: '1px solid #e5e7eb',
            borderRadius: '4px',
            padding: '8px',
            background: '#f9fafb',
            ...style
          }}
        >
          {children}
        </div>
      );
  }
}

/**
 * Creates a React wrapper component for a Forge Web Component
 * 
 * @param options Configuration for the wrapper
 * @returns React component that wraps the web component
 */
export function createReactWrapper<T extends HTMLElement, P extends Record<string, any>>(
  options: ReactWrapperOptions<P>
) {
  const WrappedComponent = forwardRef<T, PropsWithChildren<P>>((props, ref: Ref<T>) => {
    const elementRef = useRef<T>(null);
    const [hasMounted, setHasMounted] = useState(false);
    const {
      children,
      ...restProps
    } = props;

    // Auto-detect client-side mounting for SSR compatibility
    useEffect(() => {
      setHasMounted(true);
    }, []);

    // Separate event handlers from other props
    const eventHandlers = Object.keys(restProps).reduce((handlers, key) => {
      if (key.startsWith('on') && typeof restProps[key] === 'function') {
        handlers[key] = restProps[key];
      }
      return handlers;
    }, {} as Record<string, any>);

    const nonEventProps = Object.keys(restProps).reduce((nonEvents, key) => {
      if (!key.startsWith('on') || typeof restProps[key] !== 'function') {
        nonEvents[key] = restProps[key];
      }
      return nonEvents;
    }, {} as Record<string, any>);

    useImperativeHandle(ref, () => elementRef.current!, []);

    // Handle prop-to-property mapping and event listeners
    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      // Set properties on the web component
      Object.entries(nonEventProps).forEach(([key, value]) => {
        const mappedProp = options.propMappings?.[key] || key;
        
        // Handle special prop mappings
        if (typeof value === 'object' && value !== null) {
          // Set complex objects as properties, not attributes
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

      // Add event listeners
      const removeEventListeners: (() => void)[] = [];
      
      Object.entries(eventHandlers).forEach(([reactEventName, handler]) => {
        if (typeof handler !== 'function') return;

        const webComponentEventName = options.eventMappings?.[reactEventName] || 
          reactEventName.toLowerCase().replace(/^on/, '');

        const eventListener = (event: CustomEvent) => {
          // Map web component events to React-style handlers
          if (reactEventName === 'onChange' && event.detail?.value !== undefined) {
            handler(event.detail.value, event);
          } else if (reactEventName === 'onClick' || reactEventName.includes('Click')) {
            handler(event);
          } else {
            handler(event.detail || event, event);
          }
        };

        element.addEventListener(webComponentEventName, eventListener as EventListener);
        removeEventListeners.push(() => 
          element.removeEventListener(webComponentEventName, eventListener as EventListener)
        );
      });

      return () => {
        removeEventListeners.forEach(remove => remove());
      };
    }, [nonEventProps, eventHandlers]);

    // Auto-SSR handling: render fallback until mounted, then render web component
    if (!hasMounted) {
      // Provide SSR fallback or default fallback
      if (options.ssrFallback) {
        return options.ssrFallback(props as PropsWithChildren<P>);
      }
      
      // Default semantic fallback based on component type
      const defaultFallback = getDefaultFallback(options.tagName, props);
      return defaultFallback;
    }

    // Create the web component element (client-side only)
    return React.createElement(
      options.tagName,
      { 
        ref: elementRef,
        suppressHydrationWarning: true  // Prevent hydration warnings
      },
      children
    );
  });

  WrappedComponent.displayName = options.displayName;
  return WrappedComponent;
}