/**
 * @fileoverview Hook for listening to Forge component events
 */

import { useEffect, type RefObject } from 'react';

/**
 * Hook to listen to custom events from Forge Web Components
 * Simplifies event handling in React applications
 * 
 * @param ref Reference to the Forge component
 * @param eventName Name of the event to listen to
 * @param handler Event handler function
 * @param deps Dependency array for effect
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
  }, [ref.current, eventName, ...deps]);
}