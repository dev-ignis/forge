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
  type Ref,
  type ReactElement,
  type HTMLAttributes
} from 'react';

// Utility type to extract event handlers from props
type EventHandlers<T> = {
  [K in keyof T as K extends `on${string}` ? K : never]: T[K];
};

// Utility type to extract non-event props
type NonEventProps<T> = {
  [K in keyof T as K extends `on${string}` ? never : K]: T[K];
};

export interface ReactWrapperOptions {
  tagName: string;
  displayName: string;
  propMappings?: Record<string, string>;
  eventMappings?: Record<string, string>;
  ssrFallback?: () => ReactElement | null;
}

/**
 * Creates a React wrapper component for a Forge Web Component
 * 
 * @param options Configuration for the wrapper
 * @returns React component that wraps the web component
 */
export function createReactWrapper<T extends HTMLElement, P extends HTMLAttributes<T>>(
  options: ReactWrapperOptions
) {
  const WrappedComponent = forwardRef<T, P>((props, ref: Ref<T>) => {
    const elementRef = useRef<T>(null);
    const {
      children,
      ...restProps
    } = props;

    // Separate event handlers from other props
    const eventHandlers = Object.keys(restProps).reduce((handlers, key) => {
      if (key.startsWith('on') && typeof restProps[key as keyof P] === 'function') {
        handlers[key] = restProps[key as keyof P];
      }
      return handlers;
    }, {} as Record<string, any>);

    const nonEventProps = Object.keys(restProps).reduce((nonEvents, key) => {
      if (!key.startsWith('on') || typeof restProps[key as keyof P] !== 'function') {
        nonEvents[key] = restProps[key as keyof P];
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

    // SSR compatibility - render nothing on server, hydrate on client
    if (typeof window === 'undefined' && options.ssrFallback) {
      return options.ssrFallback();
    }

    // Create the web component element
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