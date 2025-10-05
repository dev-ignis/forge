/**
 * @fileoverview Unified React wrapper that works for both client-only and SSR
 *
 * Single component that:
 * - Automatically detects SSR vs client environment
 * - Renders semantic HTML fallback during SSR
 * - Hydrates to web component on client
 * - No separate SSR/client components needed
 *
 * Note: Components created with this wrapper use React hooks and must be used in Client Components.
 * If using Next.js App Router, add 'use client' to the file that imports Forge components.
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
  fallbackRenderer: (props: P & Record<string, unknown>, children: React.ReactNode) => React.ReactElement | null;
  
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
      const fallbackElement = options.fallbackRenderer({ ...options.fallbackProps, ...restProps } as P & Record<string, unknown>, children);
      
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
  const WrappedComponent = forwardRef<T, PropsWithChildren<P>>((props, forwardedRef: Ref<T>) => {
    const elementRef = useRef<T | null>(null);
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
    useImperativeHandle(forwardedRef, () => {
      return (isHydrated ? elementRef.current : fallbackRef.current) as T;
    }, [isHydrated]);

    const assignForwardedRef = (node: T | null) => {
      if (!forwardedRef) return;
      if (typeof forwardedRef === 'function') {
        try { forwardedRef(node); } catch {}
      } else if (forwardedRef && 'current' in forwardedRef) {
        try { (forwardedRef as React.MutableRefObject<T | null>).current = node; } catch {}
      }
    };

    // Upgrade fallback to web component
    const upgradeToWebComponent = () => {
      const fallbackElement = fallbackRef.current as HTMLElement | null;
      if (!fallbackElement?.parentNode) return;

      // Create web component with possible form control properties
      interface WebComponentWithFormProps extends HTMLElement {
        checked?: boolean;
        value?: string | number;
        _forgeLinkedInput?: HTMLInputElement;
        _forgeLinkedInputListeners?: { wcToInput: (evt: Event) => void; inputToWc: () => void };
        [key: string]: unknown;
      }

      const webComponent = document.createElement(options.tagName) as T & WebComponentWithFormProps;

      // Transfer attributes we care about from the fallback element
      if (options.preserveAttributes) {
        options.preserveAttributes.forEach(attr => {
          const value = fallbackElement.getAttribute?.(attr);
          if (value !== null) {
            webComponent.setAttribute(attr, value);
          }
        });
      }

      // Transfer children
      while (fallbackElement.firstChild) {
        webComponent.appendChild(fallbackElement.firstChild);
      }

      // Set up web component with props/handlers
      updateWebComponent(webComponent, nonEventProps, eventHandlers, options);

      // Special handling: preserve native input for label/htmlFor and RHF register()
      const isNativeInput = fallbackElement.tagName === 'INPUT' || fallbackElement.tagName === 'TEXTAREA';

      if (isNativeInput) {
        const input = fallbackElement as HTMLInputElement;
        const type = (input.type || '').toLowerCase();

        // Insert the web component after the input, then visually hide the input
        input.parentNode!.insertBefore(webComponent, input.nextSibling);

        // Ensure the web component reflects the input's initial state
        try {
          if (type === 'checkbox' || type === 'radio') {
            const checked = !!input.checked;
            if (checked) webComponent.setAttribute('checked', ''); else webComponent.removeAttribute('checked');
            webComponent.checked = checked;
          } else {
            const value = input.value ?? '';
            if (value !== undefined) {
              webComponent.value = value;
              if (String(value).length > 0) webComponent.setAttribute('value', String(value));
            }
          }
        } catch {}

        // Visually hide the input but keep it in the DOM to preserve label association and RHF ref
        const prevStyle = input.getAttribute('style') || '';
        input.setAttribute('data-forge-hidden-input', '');
        input.setAttribute(
          'style',
          `${prevStyle};position:absolute;opacity:0;width:0;height:0;margin:0;padding:0;pointer-events:none;`
        );

        // Sync from web component -> input and dispatch native events so RHF sees them
        const wcToInput = (evt: Event) => {
          const customEvent = evt as CustomEvent<{ checked?: boolean; value?: string | number }>;
          if (type === 'checkbox' || type === 'radio') {
            const checked = customEvent.detail?.checked ?? webComponent.checked ?? webComponent.hasAttribute('checked');
            if (input.checked !== !!checked) {
              input.checked = !!checked;
              input.dispatchEvent(new Event('input', { bubbles: true }));
              input.dispatchEvent(new Event('change', { bubbles: true }));
            }
          } else {
            const value = customEvent.detail?.value ?? webComponent.value ?? '';
            if (input.value !== String(value ?? '')) {
              input.value = String(value ?? '');
              input.dispatchEvent(new Event('input', { bubbles: true }));
              input.dispatchEvent(new Event('change', { bubbles: true }));
            }
          }
        };
        webComponent.addEventListener('change', wcToInput);
        webComponent.addEventListener('input', wcToInput);

        // Sync from input -> web component (e.g., programmatic changes or label for=)
        const inputToWc = () => {
          if (type === 'checkbox' || type === 'radio') {
            const checked = !!input.checked;
            try { webComponent.checked = checked; } catch {}
            if (checked) webComponent.setAttribute('checked', ''); else webComponent.removeAttribute('checked');
            webComponent.dispatchEvent(new CustomEvent('change', { detail: { checked }, bubbles: true }));
          } else {
            const value = input.value;
            try { webComponent.value = value; } catch {}
            webComponent.setAttribute('value', String(value ?? ''));
            webComponent.dispatchEvent(new CustomEvent('input', { detail: { value }, bubbles: true }));
          }
        };
        input.addEventListener('change', inputToWc);
        input.addEventListener('input', inputToWc);

        // Store listeners for potential cleanup (using index signature from type definition)
        webComponent._forgeLinkedInput = input;
        webComponent._forgeLinkedInputListeners = { wcToInput, inputToWc };

        // Keep refs pointing at the web component (interactive element)
        (elementRef as React.MutableRefObject<T>).current = webComponent;
        assignForwardedRef(webComponent);
        setIsHydrated(true);
        return;
      }

      // Default path: replace fallback with web component
      fallbackElement.parentNode.replaceChild(webComponent, fallbackElement);
      (elementRef as React.MutableRefObject<T>).current = webComponent;
      assignForwardedRef(webComponent);
      setIsHydrated(true);
    };

    // Enhance fallback with basic interactivity
    const enhanceFallback = () => {
      const fallbackElement = fallbackRef.current;
      if (!fallbackElement) return;
      
      setupFallbackEnhancement(fallbackElement, eventHandlers, restProps);
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
      
      // Ensure listeners are attached via addEventListener, not React props
      useEffect(() => {
        if (elementRef.current) {
          updateWebComponent(elementRef.current as T, nonEventProps, eventHandlers, options);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [JSON.stringify(nonEventProps), Object.keys(eventHandlers).join(',')]);

      return React.createElement(options.tagName, {
        ref: (node: T | null) => {
          (elementRef as React.MutableRefObject<T | null>).current = node;
          assignForwardedRef(node);
          if (node) {
            updateWebComponent(node, nonEventProps, eventHandlers, options);
          }
        },
        suppressHydrationWarning: true,
        ...convertPropsToAttributes(nonEventProps, options)
      }, children);
    }

    // UNIFIED MODE: Render semantic HTML that upgrades to web component
    const fallbackElement = options.fallbackRenderer(
      { ...options.fallbackProps, ...restProps } as P & Record<string, unknown>,
      children
    );

    // Handle case where fallback renderer returns null (e.g., closed modal)
    if (fallbackElement === null) {
      return null;
    }

    const cloneProps: React.HTMLAttributes<HTMLElement> & {
      'data-forge-component'?: string;
      'data-hydration-target'?: boolean;
      suppressHydrationWarning?: boolean;
      ref?: React.Ref<HTMLElement>;
    } = {
      'data-forge-component': options.tagName,
      'data-hydration-target': !isSSR,
      suppressHydrationWarning: true,
      ...(fallbackElement.props || {})
    };

    // Only add ref if element supports it
    if (fallbackRef) {
      cloneProps.ref = (node: HTMLElement | null) => {
        // Keep internal ref for upgrade/hydration
        (fallbackRef as React.MutableRefObject<HTMLElement | null>).current = node;
        // Also forward to consumer (e.g., RHF register()) so ref remains valid pre/post upgrade
        assignForwardedRef(node as T);
      };
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
        const isCheckbox = (event.target as any)?.type === 'checkbox' ||
          options.tagName === 'forge-checkbox';

        let value: any;
        if (isCheckbox) {
          // For checkboxes, use checked state
          value = (event as any).detail?.checked ?? (event.target as any)?.checked;
        } else {
          // For other inputs, use value
          value = (event as any).detail?.value ?? (event.target as any)?.value;
        }

        const targetName = (event.target as any)?.name || (event.target as any)?.getAttribute?.('name');

        // Detect RHF-like handler
        const hasRHFPattern = Boolean(
          props.name &&
          (handler.length === 1 || eventHandlers.onBlur)
        );

        // If handler looks like Forge signature (2+ params), prefer (value, event). Otherwise pass event.
        const wantsForgeSignature = handler.length >= 2;

        if (hasRHFPattern || !wantsForgeSignature) {
          // React Hook Form style: onChange(event: ChangeEvent)
          const syntheticEvent = {
            target: {
              value,
              checked: isCheckbox ? value : undefined,
              name: targetName,
              type: isCheckbox ? 'checkbox' : ((event.target as any)?.type || 'text')
            },
            currentTarget: {
              value,
              checked: isCheckbox ? value : undefined,
              name: targetName,
              type: isCheckbox ? 'checkbox' : ((event.target as any)?.type || 'text')
            },
            type: 'change',
            preventDefault: () => {},
            stopPropagation: () => {},
            nativeEvent: event
          } as any;

          // Dev-only: warn if we are about to pass non-serializable objects as values
          if (process.env.NODE_ENV !== 'production') {
            try {
              const v = (syntheticEvent as any).target?.value;
              const isElem = typeof Element !== 'undefined' && v instanceof Element;
              const isEvt = typeof Event !== 'undefined' && v instanceof Event;
              if (isElem || isEvt) {
                // eslint-disable-next-line no-console
                console.warn(
                  '[Forge] onChange value appears non-serializable (Element/Event). Check mapping.',
                  { tag: options.tagName, name: targetName }
                );
              }
            } catch {}
          }

          try {
            handler(syntheticEvent);
            return;
          } catch {
            // Fall through to Forge signature if consumer expects it
          }
        }

        // Forge style: onChange(valueOrChecked, event)
        if (process.env.NODE_ENV !== 'production') {
          try {
            const isElem = typeof Element !== 'undefined' && (value as any) instanceof Element;
            const isEvt = typeof Event !== 'undefined' && (value as any) instanceof Event;
            if (isElem || isEvt) {
              // eslint-disable-next-line no-console
              console.warn(
                '[Forge] onChange first argument is Element/Event; expected primitive. Check mapping.',
                { tag: options.tagName, name: targetName }
              );
            }
          } catch {}
        }
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
  _eventHandlers: Record<string, Function>,
  _props: Record<string, any>
) {
  // No-op: React synthetic event handlers are already attached via JSX props
  // Avoid attaching native listeners here to prevent duplicate event dispatches.
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
