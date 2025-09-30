import { ref, watch, onMounted, onUnmounted } from 'vue';
import type { Ref } from 'vue';
import type { ForgeCustomEvent } from '../types/forge-vue.types';

/**
 * Composable for v-model integration with Forge components
 *
 * Provides reactive two-way binding between Vue state and Forge component values.
 * Handles both value and change events from web components.
 *
 * @template T - The type of the value (defaults to string)
 * @param initialValue - Initial value for the model
 * @param elementRef - Vue ref to the Forge component element
 * @param options - Configuration options
 * @returns Reactive model value and event handlers
 *
 * @example
 * ```vue
 * <script setup>
 * import { useForgeComponent, useForgeVModel } from '@nexcraft/forge-vue';
 *
 * const { elementRef } = useForgeComponent();
 * const { modelValue, onInput, onUpdate } = useForgeVModel('', elementRef);
 * </script>
 *
 * <template>
 *   <forge-input 
 *     ref="elementRef"
 *     :value="modelValue"
 *     @input="onInput"
 *     @change="onUpdate"
 *     placeholder="Type something..."
 *   />
 *   <p>Current value: {{ modelValue }}</p>
 * </template>
 * ```
 */
export function useForgeVModel<T = string>(
  initialValue: T,
  elementRef: Ref<HTMLElement | undefined>,
  options: {
    prop?: string;
    event?: string;
    transformValue?: (value: any) => T;
  } = {}
) {
  const {
    prop = 'value',
    event = 'input',
    transformValue = (value: any) => value as T
  } = options;

  const modelValue: Ref<T> = ref(initialValue) as Ref<T>;
  let cleanup: (() => void)[] = [];

  // Update element when model changes
  watch(modelValue, (newValue) => {
    const element = elementRef.value;
    if (element && (element as any)[prop] !== newValue) {
      (element as any)[prop] = newValue;
    }
  });

  // Handle input/change events from the element
  const onInput = (event: Event | ForgeCustomEvent) => {
    let newValue: any;
    
    if ('detail' in event && event.detail !== undefined) {
      // Custom event with detail
      newValue = event.detail.value ?? event.detail;
    } else {
      // Standard event
      newValue = (event.target as any)?.[prop];
    }
    
    modelValue.value = transformValue(newValue);
  };

  const onUpdate = (event: Event | ForgeCustomEvent) => {
    onInput(event);
  };

  // Setup element listeners when component mounts
  onMounted(() => {
    const element = elementRef.value;
    if (element) {
      // Set initial value
      if ((element as any)[prop] !== modelValue.value) {
        (element as any)[prop] = modelValue.value;
      }

      // Add event listeners
      element.addEventListener(event, onInput);
      element.addEventListener('change', onUpdate);
      
      cleanup.push(
        () => element.removeEventListener(event, onInput),
        () => element.removeEventListener('change', onUpdate)
      );
    }
  });

  // Cleanup on unmount
  onUnmounted(() => {
    cleanup.forEach(fn => fn());
    cleanup = [];
  });

  return {
    modelValue,
    onInput,
    onUpdate
  };
}