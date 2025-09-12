/**
 * @fileoverview Unified React wrapper that works for both client-only and SSR
 * 
 * Single component that:
 * - Automatically detects SSR vs client environment
 * - Renders semantic HTML fallback during SSR
 * - Hydrates to web component on client
 * - No separate SSR/client components needed
 */

import React, { 
  forwardRef, 
  useEffect, 
  useRef, 
  useState, 
  useImperativeHandle,
  type Ref,
  type PropsWithChildren 
} from 'react';

// Check if we're in a client environment
const isClient = typeof window !== 'undefined';

export interface UnifiedWrapperOptions<P extends Record<string, any>> {
  /** Web component tag name */
  tagName: string;
  
  /** Display name for React DevTools */
  displayName: string;
  
  /** Event mappings */
  eventMappings?: Record<string, string>;
  
  /** Prop mappings */
  propMappings?: Record<string, string>;
  
  /** Semantic HTML fallback renderer */
  fallbackRenderer: (props: any, children: React.ReactNode) => React.ReactElement | null;
  
  /** Default props for fallback */
  fallbackProps?: Partial<P>;
  
  /** Attributes to preserve during hydration */
  preserveAttributes?: string[];
  
  /** Force client-only mode (skip SSR fallback) */
  clientOnly?: boolean;
}

/**
 * Creates a unified React wrapper that works for both SSR and client-only
 * 
 * Usage: Same component works everywhere
 * ```tsx
 * // Works in SSR
 * <ForgeInput placeholder="Name" />
 * 
 * // Works client-only  
 * <ForgeInput placeholder="Name" />
 * ```
 */
export function createUnifiedWrapper<T extends HTMLElement, P extends Record<string, any>>(
  options: UnifiedWrapperOptions<P>
) {
  // Check if we're in SSR environment during wrapper creation
  if (typeof window === 'undefined') {
    // During SSR, return a simple functional component that renders the fallback
    const SSRComponent = forwardRef<T, PropsWithChildren<P>>((props, ref: Ref<T>) => {
      const { children, ...restProps } = props;
      const fallbackElement = options.fallbackRenderer({ ...options.fallbackProps, ...restProps }, children);
      
      if (fallbackElement === null) {
        return null;
      }
      
      const enhancedProps = {
        'data-forge-component': options.tagName,
        'data-ssr-fallback': true,
        suppressHydrationWarning: true,
        ...(fallbackElement.props || {}),
        ref
      };
      
      return React.cloneElement(fallbackElement, enhancedProps);
    });
    
    SSRComponent.displayName = `${options.displayName}_SSR`;
    return SSRComponent;
  }

  // Client-side: Return full unified component
  const WrappedComponent = forwardRef<T, PropsWithChildren<P>>((props, ref: Ref<T>) => {
    const elementRef = useRef<T>(null);
    const fallbackRef = useRef<HTMLElement>(null);
    const [isHydrated, setIsHydrated] = useState(false);
    const [isClient, setIsClient] = useState(false);
    
    // Detect if we're in SSR mode
    const isSSR = typeof window === 'undefined';
    
    const { children, ...restProps } = props;

    // Detect client-side environment
    useEffect(() => {
      setIsClient(true);
      
      // If client-only mode is forced, skip SSR fallback logic
      if (options.clientOnly) {
        return;
      }
      
      // Progressive enhancement: upgrade from semantic HTML to web component
      const shouldUpgrade = 'customElements' in window && 
                           customElements.get(options.tagName) !== undefined;
      
      if (shouldUpgrade) {
        upgradeToWebComponent();
      } else {
        enhanceFallback();
      }
    }, []);

    // Separate event handlers from props
    const { eventHandlers, nonEventProps } = separateProps(restProps);

    // Expose appropriate ref
    useImperativeHandle(ref, () => {
      return (isHydrated ? elementRef.current : fallbackRef.current) as T;
    }, [isHydrated]);

    // Upgrade fallback to web component
    const upgradeToWebComponent = () => {
      const fallbackElement = fallbackRef.current;
      if (!fallbackElement?.parentNode) return;

      // Create web component
      const webComponent = document.createElement(options.tagName) as T;
      
      // Transfer attributes
      if (options.preserveAttributes) {
        options.preserveAttributes.forEach(attr => {
          const value = fallbackElement.getAttribute(attr);
          if (value !== null) {
            webComponent.setAttribute(attr, value);
          }
        });
      }

      // Transfer children
      while (fallbackElement.firstChild) {
        webComponent.appendChild(fallbackElement.firstChild);
      }

      // Set up web component
      updateWebComponent(webComponent, nonEventProps, eventHandlers, options);

      // Replace fallback
      fallbackElement.parentNode.replaceChild(webComponent, fallbackElement);
      elementRef.current = webComponent;
      setIsHydrated(true);
    };

    // Enhance fallback with basic interactivity
    const enhanceFallback = () => {
      const fallbackElement = fallbackRef.current;
      if (!fallbackElement) return;
      
      setupFallbackEnhancement(fallbackElement, eventHandlers);
    };

    // Update web component when props change
    useEffect(() => {
      if (isHydrated && elementRef.current) {
        updateWebComponent(elementRef.current, nonEventProps, eventHandlers, options);
      }
    }, [isHydrated, nonEventProps, eventHandlers]);

    // CLIENT-ONLY MODE: Render web component directly
    if (options.clientOnly) {
      if (!isClient) {
        // SSR: return null or minimal placeholder
        return null;
      }
      
      return React.createElement(options.tagName, {
        ref: elementRef,
        suppressHydrationWarning: true,
        ...convertPropsToAttributes(nonEventProps, options),
        ...setupEventHandlers(eventHandlers, options)
      }, children);
    }

    // UNIFIED MODE: Render semantic HTML that upgrades to web component
    const fallbackElement = options.fallbackRenderer(
      { ...options.fallbackProps, ...restProps }, 
      children
    );

    // Handle case where fallback renderer returns null (e.g., closed modal)
    if (fallbackElement === null) {
      return null;
    }

    const cloneProps: any = {
      'data-forge-component': options.tagName,
      'data-hydration-target': !isSSR,
      suppressHydrationWarning: true,
      ...(fallbackElement.props || {})
    };
    
    // Only add ref if element supports it
    if (fallbackRef) {
      cloneProps.ref = fallbackRef;
    }
    
    return React.cloneElement(fallbackElement, cloneProps);
  });

  WrappedComponent.displayName = options.displayName;
  return WrappedComponent;
}

// Helper functions
function separateProps(props: Record<string, any>) {
  const eventHandlers: Record<string, Function> = {};
  const nonEventProps: Record<string, any> = {};
  
  Object.entries(props).forEach(([key, value]) => {
    if (key.startsWith('on') && typeof value === 'function') {
      eventHandlers[key] = value;
    } else {
      nonEventProps[key] = value;
    }
  });
  
  return { eventHandlers, nonEventProps };
}

function updateWebComponent<T extends HTMLElement, P extends Record<string, any>>(
  element: T,
  props: Record<string, any>,
  eventHandlers: Record<string, Function>,
  options: UnifiedWrapperOptions<P>
) {
  // Set properties and attributes
  Object.entries(props).forEach(([key, value]) => {
    const mappedProp = options.propMappings?.[key] || key;
    
    if (typeof value === 'object' && value !== null) {
      (element as any)[mappedProp] = value;
    } else if (typeof value === 'boolean') {
      if (value) {
        element.setAttribute(mappedProp, '');
      } else {
        element.removeAttribute(mappedProp);
      }
    } else if (value !== undefined && value !== null) {
      element.setAttribute(mappedProp, String(value));
    }
  });

  // Handle event listeners
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
      if (reactEventName === 'onChange') {
        // Enhanced React Hook Form detection
        const value = (event as any).detail?.value ?? (event.target as any)?.value;
        const targetName = (event.target as any)?.name || (event.target as any)?.getAttribute?.('name');
        
        // Try React Hook Form style first (single event parameter)
        // Most React Hook Form handlers expect: onChange(event: ChangeEvent)
        try {
          if (handler.length <= 1) {
            const syntheticEvent = {
              target: { 
                value,
                name: targetName,
                type: (event.target as any)?.type || 'text'
              },
              currentTarget: {
                value,
                name: targetName,
                type: (event.target as any)?.type || 'text'
              },
              type: 'change',
              preventDefault: () => {},
              stopPropagation: () => {},
              nativeEvent: event
            };
            
            handler(syntheticEvent);
            return;
          }
        } catch (error) {
          // If React Hook Form style fails, fall back to Forge style
          console.debug('React Hook Form style onChange failed, falling back to Forge style:', error);
        }
        
        // Forge style: onChange(value, event)
        handler(value, event);
      } else if (reactEventName === 'onClick') {
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

function setupFallbackEnhancement(
  element: HTMLElement,
  eventHandlers: Record<string, Function>
) {
  Object.entries(eventHandlers).forEach(([reactEventName, handler]) => {
    if (typeof handler !== 'function') return;
    
    if (reactEventName === 'onClick') {
      element.addEventListener('click', handler as EventListener);
    } else if (reactEventName === 'onChange' && element.tagName === 'INPUT') {
      element.addEventListener('input', (e) => {
        const value = (e.target as HTMLInputElement).value;
        const targetName = (e.target as HTMLInputElement).name;
        
        // Enhanced React Hook Form detection for fallback inputs
        try {
          if (handler.length <= 1) {
            const syntheticEvent = {
              target: { 
                value,
                name: targetName,
                type: (e.target as HTMLInputElement).type || 'text'
              },
              currentTarget: {
                value,
                name: targetName,
                type: (e.target as HTMLInputElement).type || 'text'
              },
              type: 'change',
              preventDefault: () => {},
              stopPropagation: () => {},
              nativeEvent: e
            };
            
            handler(syntheticEvent);
            return;
          }
        } catch (error) {
          console.debug('React Hook Form style onChange failed in fallback, falling back to Forge style:', error);
        }
        
        // Forge style: onChange(value, event)
        handler(value, e);
      });
    }
  });
}

function convertPropsToAttributes(props: Record<string, any>, options: UnifiedWrapperOptions<any>) {
  const attributes: Record<string, any> = {};
  
  Object.entries(props).forEach(([key, value]) => {
    const mappedProp = options.propMappings?.[key] || key;
    
    if (typeof value === 'boolean') {
      if (value) attributes[mappedProp] = '';
    } else if (value !== undefined && value !== null && typeof value !== 'object') {
      attributes[mappedProp] = String(value);
    }
  });
  
  return attributes;
}

function setupEventHandlers(eventHandlers: Record<string, Function>, options: UnifiedWrapperOptions<any>) {
  const handlers: Record<string, Function> = {};
  
  Object.entries(eventHandlers).forEach(([reactEventName, handler]) => {
    const webComponentEventName = options.eventMappings?.[reactEventName] ||
      reactEventName.toLowerCase().replace(/^on/, '');
    
    handlers[`on${webComponentEventName.charAt(0).toUpperCase()}${webComponentEventName.slice(1)}`] = handler;
  });
  
  return handlers;
}