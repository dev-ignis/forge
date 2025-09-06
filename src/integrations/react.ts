/**
 * React Integration Utilities
 * Helper functions and hooks for using Forge components in React applications
 * 
 * @module ReactIntegration
 * @example
 * ```tsx
 * import { useForgeComponent, useForgeControlled, ForgeEventHandlers } from '@nexcraft/forge/integrations/react';
 * import type { ForgeButtonProps } from '@nexcraft/forge/types/framework-integration';
 * 
 * function MyComponent() {
 *   const { ref, getElement } = useForgeComponent();
 *   const [value, setValue] = useState('');
 *   
 *   return (
 *     <div>
 *       <forge-button ref={ref} variant="primary" onClick={ForgeEventHandlers.onClick(() => console.log('clicked'))}>
 *         Click Me
 *       </forge-button>
 *       <ForgeComponents.Input value={value} onChange={setValue} />
 *     </div>
 *   );
 * }
 * ```
 */

import React, { useEffect, useRef, useCallback, useState } from 'react';
import type { ForgeCustomEvent } from '../types/framework-integration';

/**
 * Hook for easier Web Component ref management
 * 
 * Provides a ref and helper function for accessing Forge components in React.
 * This is the foundational hook for all other Forge React integrations.
 * 
 * @template T - The type of HTML element (defaults to HTMLElement)
 * @returns Object containing ref and getElement function
 * 
 * @example
 * ```tsx
 * function MyModal() {
 *   const { ref, getElement } = useForgeComponent<HTMLElement>();
 *   
 *   const showModal = () => {
 *     const modal = getElement();
 *     if (modal && 'show' in modal) {
 *       (modal as any).show();
 *     }
 *   };
 *   
 *   return (
 *     <div>
 *       <button onClick={showModal}>Open Modal</button>
 *       <forge-modal ref={ref} title="My Modal">
 *         <p>Modal content here</p>
 *       </forge-modal>
 *     </div>
 *   );
 * }
 * ```
 * 
 * @since 0.5.0
 */
export function useForgeComponent<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  const getElement = useCallback(() => {
    return ref.current;
  }, []);

  return { ref, getElement };
}

/**
 * Hook for form integration with popular form libraries
 * 
 * Integrates Forge form components with React form libraries like React Hook Form and Formik.
 * Automatically handles value synchronization and event propagation.
 * 
 * @param formInstance - The form instance from your form library
 * @param fieldName - The name of the field in the form
 * @returns Object containing the component ref
 * 
 * @example React Hook Form
 * ```tsx
 * import { useForm } from 'react-hook-form';
 * 
 * function MyForm() {
 *   const form = useForm();
 *   const { ref } = useForgeForm(form, 'email');
 *   
 *   return (
 *     <form onSubmit={form.handleSubmit(data => console.log(data))}>
 *       <forge-input ref={ref} type="email" placeholder="Email" />
 *       <button type="submit">Submit</button>
 *     </form>
 *   );
 * }
 * ```
 * 
 * @example Formik
 * ```tsx
 * import { useFormik } from 'formik';
 * 
 * function MyForm() {
 *   const formik = useFormik({
 *     initialValues: { name: '' },
 *     onSubmit: values => console.log(values),
 *   });
 *   const { ref } = useForgeForm(formik, 'name');
 *   
 *   return (
 *     <form onSubmit={formik.handleSubmit}>
 *       <forge-input ref={ref} placeholder="Name" />
 *       <button type="submit">Submit</button>
 *     </form>
 *   );
 * }
 * ```
 * 
 * @since 0.5.0
 */
export function useForgeForm(formInstance: any, fieldName: string) {
  const { ref } = useForgeComponent();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleInput = (event: Event) => {
      // Works with React Hook Form, Formik, etc.
      const customEvent = event as ForgeCustomEvent;
      const value = customEvent.detail?.value ?? (event.target as any)?.value;
      formInstance.setValue?.(fieldName, value);
      formInstance.setFieldValue?.(fieldName, value); // Formik
    };

    element.addEventListener('input', handleInput);
    element.addEventListener('change', handleInput);

    return () => {
      element.removeEventListener('input', handleInput);
      element.removeEventListener('change', handleInput);
    };
  }, [formInstance, fieldName]);

  return { ref };
}

/**
 * Hook for controlled component patterns
 * 
 * Creates a controlled Forge component that synchronizes with React state.
 * Perfect for creating controlled inputs, selects, and other form components.
 * 
 * @template T - The type of the component value (defaults to string)
 * @param value - The current value from React state
 * @param onChange - Function to call when the value changes
 * @param eventType - The event type to listen for (defaults to 'input')
 * @returns Object containing the component ref
 * 
 * @example Basic controlled input
 * ```tsx
 * function ControlledInput() {
 *   const [value, setValue] = useState('');
 *   const { ref } = useForgeControlled(value, setValue);
 *   
 *   return (
 *     <div>
 *       <forge-input ref={ref} placeholder="Type something..." />
 *       <p>Current value: {value}</p>
 *     </div>
 *   );
 * }
 * ```
 * 
 * @example Number input with custom event
 * ```tsx
 * function NumberInput() {
 *   const [count, setCount] = useState(0);
 *   const { ref } = useForgeControlled(count, setCount, 'change');
 *   
 *   return <forge-number-input ref={ref} min="0" max="100" />;
 * }
 * ```
 * 
 * @since 0.5.0
 */
export function useForgeControlled<T = string>(
  value: T,
  onChange: (value: T) => void,
  eventType: string = 'input'
) {
  const { ref } = useForgeComponent();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Set initial value
    (element as any).value = value;

    const handleChange = (event: Event) => {
      const customEvent = event as ForgeCustomEvent;
      const newValue = customEvent.detail?.value ?? (event.target as any)?.value;
      onChange(newValue);
    };

    element.addEventListener(eventType, handleChange);

    return () => {
      element.removeEventListener(eventType, handleChange);
    };
  }, [value, onChange, eventType]);

  // Update element when value changes
  useEffect(() => {
    const element = ref.current;
    if (element && (element as any).value !== value) {
      (element as any).value = value;
    }
  }, [value]);

  return { ref };
}

/**
 * Hook for theme context
 * 
 * Provides theme management functionality for Forge components.
 * Automatically applies theme changes to the document root.
 * 
 * @returns Object containing current theme and setter function
 * 
 * @example
 * ```tsx
 * function ThemeProvider({ children }) {
 *   const { theme, setTheme } = useForgeTheme();
 * 
 *   return (
 *     <div>
 *       <div className="theme-controls">
 *         <button onClick={() => setTheme('light')}>Light</button>
 *         <button onClick={() => setTheme('dark')}>Dark</button>
 *         <button onClick={() => setTheme('auto')}>Auto</button>
 *       </div>
 *       <div data-forge-theme={theme}>
 *         {children}
 *       </div>
 *     </div>
 *   );
 * }
 * ```
 * 
 * @since 0.5.0
 */
export function useForgeTheme() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('auto');

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-forge-theme', theme);
    
    // Also update CSS custom property for components
    document.documentElement.style.setProperty('--forge-theme', theme);
  }, [theme]);

  return { theme, setTheme };
}

/**
 * Utility for handling Forge events in React
 * 
 * Creates a type-safe event handler for Forge component events.
 * Automatically extracts the detail from ForgeCustomEvent.
 * 
 * @template T - The type of the event detail
 * @param handler - Function to handle the event detail and full event
 * @returns Event handler function
 * 
 * @example
 * ```tsx
 * function DataTable() {
 *   const handleSort = createForgeEventHandler<{ key: string; direction: 'asc' | 'desc' }>(
 *     (detail, event) => {
 *       console.log('Sort by:', detail.key, detail.direction);
 *       console.log('Event:', event);
 *     }
 *   );
 * 
 *   return <forge-data-table onSort={handleSort} />;
 * }
 * ```
 * 
 * @since 0.5.0
 */
export function createForgeEventHandler<T = any>(
  handler: (detail: T, event: ForgeCustomEvent<T>) => void
) {
  return (event: ForgeCustomEvent<T>) => {
    handler(event.detail, event);
  };
}

/**
 * Higher-order component for easier Forge component integration
 * 
 * Wraps a React component to provide Forge component functionality.
 * Handles ref forwarding and provides access to the underlying element.
 * 
 * @template P - The props type of the wrapped component
 * @param Component - The React component to wrap
 * @returns Enhanced component with Forge integration
 * 
 * @example
 * ```tsx
 * const MyButton = withForgeComponent<{ variant: string }>(({ variant, ...props }) => {
 *   return React.createElement('forge-button', { variant, ...props });
 * });
 * 
 * function App() {
 *   const buttonRef = useRef();
 *   
 *   return (
 *     <MyButton 
 *       ref={buttonRef} 
 *       variant="primary"
 *       onClick={() => console.log('Button clicked!')}
 *     >
 *       Click Me
 *     </MyButton>
 *   );
 * }
 * ```
 * 
 * @since 0.5.0
 */
export function withForgeComponent<P extends object>(
  Component: React.ComponentType<P>
) {
  return React.forwardRef<HTMLElement, P>((props, ref) => {
    const { ref: internalRef, getElement } = useForgeComponent();

    // Forward ref
    useEffect(() => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(getElement());
        } else {
          ref.current = getElement();
        }
      }
    }, [ref, getElement]);

    return React.createElement(Component, { ...(props as any), ref: internalRef });
  });
}

// React Hook Form integration helper
export function useForgeReactHookForm(name: string, control: any) {
  const { field } = control.useController({ name });
  const { ref } = useForgeControlled(field.value, field.onChange);

  return {
    ref,
    name: field.name,
    value: field.value,
    onBlur: field.onBlur,
  };
}

// Formik integration helper
export function useForgeFormik(name: string, formik: any) {
  const value = formik.values[name];
  const error = formik.errors[name];
  const touched = formik.touched[name];

  const { ref } = useForgeControlled(value, (newValue) => {
    formik.setFieldValue(name, newValue);
  });

  return {
    ref,
    name,
    value,
    error: touched ? error : undefined,
    onBlur: () => formik.setFieldTouched(name, true),
  };
}

/**
 * Ready-to-use React components with Forge integration
 * 
 * Pre-built React components that wrap Forge Web Components with
 * React-specific functionality like controlled state and refs.
 * 
 * @namespace ForgeComponents
 * @since 0.5.0
 */
export const ForgeComponents = {
  // Controlled input with React state
  Input: React.forwardRef<HTMLElement, {
    value: string;
    onChange: (value: string) => void;
    [key: string]: any;
  }>(({ value, onChange, ...props }, ref) => {
    const { ref: internalRef } = useForgeControlled(value, onChange);

    useEffect(() => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(internalRef.current);
        } else {
          ref.current = internalRef.current;
        }
      }
    }, [ref, internalRef]);

    return React.createElement('forge-input', { ref: internalRef, ...props });
  }),

  // Modal with imperative API
  Modal: React.forwardRef<HTMLElement, {
    children: React.ReactNode;
    [key: string]: any;
  }>(({ children, ...props }, ref) => {
    const { ref: internalRef, getElement } = useForgeComponent();

    const show = useCallback(() => {
      (getElement() as any)?.show?.();
    }, [getElement]);

    const hide = useCallback(() => {
      (getElement() as any)?.hide?.();
    }, [getElement]);

    // Expose imperative methods
    useEffect(() => {
      if (ref) {
        const methods = { show, hide, element: getElement() };
        if (typeof ref === 'function') {
          (ref as any)(methods);
        } else {
          (ref as any).current = methods;
        }
      }
    }, [ref, show, hide, getElement]);

    return React.createElement('forge-modal', { ref: internalRef, ...props }, children);
  }),
};

/**
 * Type-safe event handlers for Forge components
 * 
 * Pre-built event handler factories that provide type safety and
 * consistent patterns for handling Forge component events.
 * 
 * @namespace ForgeEventHandlers
 * @since 0.5.0
 * 
 * @example
 * ```tsx
 * function App() {
 *   const [value, setValue] = useState('');
 *   const [selected, setSelected] = useState([]);
 * 
 *   return (
 *     <div>
 *       <forge-input onInput={ForgeEventHandlers.onInput(setValue)} />
 *       <forge-data-table onSelect={ForgeEventHandlers.onSelect(setSelected)} />
 *     </div>
 *   );
 * }
 * ```
 */
export const ForgeEventHandlers = {
  /**
   * Creates a type-safe input event handler
   * @template T - The type of input value
   * @param handler - Function to call with the input value
   * @returns Event handler function
   */
  onInput: <T = string>(handler: (value: T) => void) =>
    createForgeEventHandler<{ value: T }>((detail) => handler(detail.value)),

  /**
   * Creates a type-safe click event handler
   * @param handler - Function to call when clicked
   * @returns Event handler function
   */
  onClick: (handler: () => void) =>
    createForgeEventHandler(() => handler()),

  /**
   * Creates a type-safe selection event handler
   * @template T - The type of selected items
   * @param handler - Function to call with selected items
   * @returns Event handler function
   */
  onSelect: <T = any>(handler: (selected: T[]) => void) =>
    createForgeEventHandler<{ selected: T[] }>((detail) => handler(detail.selected)),

  /**
   * Creates a type-safe sort event handler
   * @param handler - Function to call with sort key and direction
   * @returns Event handler function
   */
  onSort: (handler: (key: string, direction: 'asc' | 'desc') => void) =>
    createForgeEventHandler<{ key: string; direction: 'asc' | 'desc' }>((detail) =>
      handler(detail.key, detail.direction)
    ),
};