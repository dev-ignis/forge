import { ref, onMounted, onUnmounted } from 'vue';
import type { Ref } from 'vue';
import type { ForgeModalContext, ForgeCustomEvent } from '../types/forge-vue.types';

/**
 * Composable for modal management
 *
 * Provides reactive modal state and control functions for Forge modal components.
 * Automatically syncs with modal element events.
 *
 * @param modalRef - Vue ref to the modal element
 * @returns Modal state and control functions
 *
 * @example
 * ```vue
 * <script setup>
 * import { useForgeComponent, useForgeModal } from '@nexcraft/forge-vue';
 *
 * const { elementRef } = useForgeComponent();
 * const { isOpen, show, hide, toggle } = useForgeModal(elementRef);
 * </script>
 *
 * <template>
 *   <div>
 *     <button @click="show">Open Modal</button>
 *     <p v-if="isOpen">Modal is currently open</p>
 *     
 *     <forge-modal ref="elementRef" @open="onModalOpen" @close="onModalClose">
 *       <h2>Modal Title</h2>
 *       <p>Modal content goes here...</p>
 *       <button @click="hide">Close</button>
 *     </forge-modal>
 *   </div>
 * </template>
 * ```
 */
export function useForgeModal(modalRef: Ref<HTMLElement | undefined>): ForgeModalContext {
  const isOpen: Ref<boolean> = ref(false);
  let cleanup: (() => void)[] = [];

  const show = () => {
    const modal = modalRef.value;
    if (modal && 'show' in modal) {
      (modal as any).show();
    }
  };

  const hide = () => {
    const modal = modalRef.value;
    if (modal && 'hide' in modal) {
      (modal as any).hide();
    }
  };

  const toggle = () => {
    if (isOpen.value) {
      hide();
    } else {
      show();
    }
  };

  // Event handlers
  const handleOpen = (event: Event) => {
    isOpen.value = true;
  };

  const handleClose = (event: Event) => {
    isOpen.value = false;
  };

  // Setup event listeners
  onMounted(() => {
    const modal = modalRef.value;
    if (modal) {
      // Check initial state
      const initialOpen = modal.hasAttribute('open') || (modal as any).open;
      isOpen.value = Boolean(initialOpen);

      // Add event listeners
      modal.addEventListener('open', handleOpen);
      modal.addEventListener('close', handleClose);
      
      cleanup.push(
        () => modal.removeEventListener('open', handleOpen),
        () => modal.removeEventListener('close', handleClose)
      );
    }
  });

  // Cleanup on unmount
  onUnmounted(() => {
    cleanup.forEach(fn => fn());
    cleanup = [];
  });

  return {
    isOpen,
    show,
    hide,
    toggle
  };
}