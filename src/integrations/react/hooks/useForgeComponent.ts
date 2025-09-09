/**
 * @fileoverview React hooks for Forge component integration
 * 
 * Provides utilities for working with Forge Web Components in React
 */

import { useRef, useEffect, type RefObject } from 'react';

/**
 * Hook to interact with a Forge Web Component instance
 * Provides direct access to the underlying web component
 */
export function useForgeComponent<T extends HTMLElement>(): {
  ref: RefObject<T>;
  component: T | null;
} {
  const ref = useRef<T>(null);

  return {
    ref,
    component: ref.current
  };
}

/**
 * Hook to call methods on a Forge Web Component
 */
export function useForgeMethod<T extends HTMLElement>(
  ref: RefObject<T>,
  methodName: string
) {
  return (...args: any[]) => {
    const element = ref.current;
    if (element && typeof (element as any)[methodName] === 'function') {
      return (element as any)[methodName](...args);
    }
    console.warn(`Method ${methodName} not found on Forge component`);
  };
}

/**
 * Hook to listen to custom events from Forge components
 */
export function useForgeEvent<T extends HTMLElement>(
  ref: RefObject<T>,
  eventName: string,
  handler: (event: CustomEvent) => void,
  deps: any[] = []
) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const eventListener = (event: Event) => {
      handler(event as CustomEvent);
    };

    element.addEventListener(eventName, eventListener);
    
    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [ref, eventName, handler, ...deps]);
}