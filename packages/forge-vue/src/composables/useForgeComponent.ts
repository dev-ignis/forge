import { ref, onMounted, onUnmounted } from 'vue';
import type { Ref } from 'vue';
import type { ForgeComponentRef } from '../types/forge-vue.types';

/**
 * Composable for Web Component ref management
 *
 * Provides a Vue ref for accessing Forge component DOM elements.
 * Foundation for all other Forge Vue integrations.
 *
 * @template T - The type of HTML element (defaults to HTMLElement)
 * @returns Object containing elementRef and getElement function
 *
 * @example
 * ```vue
 * <script setup>
 * import { useForgeComponent } from '@nexcraft/forge-vue';
 *
 * const { elementRef, getElement } = useForgeComponent();
 *
 * const showModal = () => {
 *   const modal = getElement();
 *   if (modal && 'show' in modal) {
 *     modal.show();
 *   }
 * };
 * </script>
 *
 * <template>
 *   <forge-modal ref="elementRef">
 *     <h2>Modal Content</h2>
 *     <button @click="showModal">Show Modal</button>
 *   </forge-modal>
 * </template>
 * ```
 */
export function useForgeComponent<T extends HTMLElement = HTMLElement>(): ForgeComponentRef<T> {
  const elementRef: Ref<T | undefined> = ref();

  /**
   * Get the underlying HTML element
   * @returns The HTML element or undefined if not mounted
   */
  const getElement = (): T | undefined => {
    return elementRef.value;
  };

  return {
    elementRef,
    getElement
  };
}