/**
 * Vue Integration Utilities
 * Helper functions and composables for using Forge components in Vue applications
 * 
 * @module VueIntegration
 * @example
 * ```vue
 * <script setup>
 * import { ref } from 'vue';
 * import { useForgeComponent, useForgeVModel, useForgeTheme } from '@nexcraft/forge/integrations/vue';
 * 
 * const { elementRef } = useForgeComponent();
 * const { theme } = useForgeTheme();
 * const inputValue = ref('');
 * </script>
 * 
 * <template>
 *   <div :data-forge-theme="theme">
 *     <forge-button ref="elementRef" variant="primary">Click Me</forge-button>
 *     <forge-input v-model="inputValue" placeholder="Type something..." />
 *   </div>
 * </template>
 * ```
 */

import { ref, onMounted, onUnmounted, watch, computed, inject, provide } from 'vue';
import type { Ref } from 'vue';
import type { ForgeCustomEvent } from '../types/framework-integration';

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
 * import { useForgeComponent } from '@nexcraft/forge/integrations/vue';
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
 *   <div>
 *     <button @click="showModal">Open Modal</button>
 *     <forge-modal ref="elementRef" title="My Modal">
 *       <p>Modal content here</p>
 *     </forge-modal>
 *   </div>
 * </template>
 * ```
 * 
 * @since 0.5.0
 */
export function useForgeComponent<T extends HTMLElement = HTMLElement>() {
  const elementRef = ref<T | null>(null);

  const getElement = () => elementRef.value;

  return { elementRef, getElement };
}

/**
 * Composable for v-model integration
 * 
 * Enables seamless v-model support for Forge components in Vue 3.
 * Handles two-way data binding and event synchronization.
 * 
 * @template T - The type of the model value (defaults to string)
 * @param emit - The emit function from setup context
 * @param props - Component props containing modelValue
 * @param eventType - The event type to listen for (defaults to 'input')
 * @returns Object containing elementRef for the component
 * 
 * @example
 * ```vue
 * <script setup>
 * import { useForgeVModel } from '@nexcraft/forge/integrations/vue';
 * 
 * const props = defineProps({ modelValue: String });
 * const emit = defineEmits(['update:modelValue']);
 * 
 * const { elementRef } = useForgeVModel(emit, props);
 * </script>
 * 
 * <template>
 *   <forge-input ref="elementRef" v-bind="$attrs" />
 * </template>
 * ```
 * 
 * @since 0.5.0
 */
export function useForgeVModel<T = string>(
  emit: (event: 'update:modelValue', value: T) => void,
  props: { modelValue?: T },
  eventType: string = 'input'
) {
  const { elementRef } = useForgeComponent();

  onMounted(() => {
    const element = elementRef.value;
    if (!element) return;

    // Set initial value
    if (props.modelValue !== undefined) {
      (element as any).value = props.modelValue;
    }

    const handleChange = (event: ForgeCustomEvent) => {
      const value = event.detail?.value ?? (event.target as any)?.value;
      emit('update:modelValue', value);
    };

    element.addEventListener(eventType, handleChange);

    onUnmounted(() => {
      element.removeEventListener(eventType, handleChange);
    });
  });

  // Watch for external changes
  watch(
    () => props.modelValue,
    (newValue) => {
      const element = elementRef.value;
      if (element && (element as any).value !== newValue) {
        (element as any).value = newValue;
      }
    }
  );

  return { elementRef };
}

/**
 * Composable for theme management
 * 
 * Provides reactive theme management for Forge components.
 * Automatically applies theme changes to the document root and provides
 * the theme to child components.
 * 
 * @returns Object containing reactive theme ref
 * 
 * @example
 * ```vue
 * <script setup>
 * import { useForgeTheme } from '@nexcraft/forge/integrations/vue';
 * 
 * const { theme } = useForgeTheme();
 * 
 * const toggleTheme = () => {
 *   theme.value = theme.value === 'light' ? 'dark' : 'light';
 * };
 * </script>
 * 
 * <template>
 *   <div :data-forge-theme="theme">
 *     <button @click="toggleTheme">Toggle Theme</button>
 *     <forge-button variant="primary">Themed Button</forge-button>
 *   </div>
 * </template>
 * ```
 * 
 * @since 0.5.0
 */
export function useForgeTheme() {
  const theme = ref<'light' | 'dark' | 'auto'>('auto');

  watch(
    theme,
    (newTheme) => {
      document.documentElement.setAttribute('data-forge-theme', newTheme);
      document.documentElement.style.setProperty('--forge-theme', newTheme);
    },
    { immediate: true }
  );

  // Provide theme to child components
  provide('forgeTheme', theme);

  return { theme };
}

// Composable for using provided theme
export function useForgeThemeContext() {
  const theme = inject<Ref<string>>('forgeTheme');
  return { theme };
}

// Composable for form validation integration
export function useForgeValidation(
  elementRef: Ref<HTMLElement | null>,
  validator?: (value: any) => string | null
) {
  const error = ref<string | null>(null);
  const isValid = computed(() => !error.value);

  const validate = (value: any) => {
    if (validator) {
      error.value = validator(value);
    }
    return isValid.value;
  };

  onMounted(() => {
    const element = elementRef.value;
    if (!element) return;

    const handleValidation = (event: ForgeCustomEvent) => {
      const value = event.detail?.value ?? (event.target as any)?.value;
      validate(value);
    };

    element.addEventListener('input', handleValidation);
    element.addEventListener('blur', handleValidation);

    onUnmounted(() => {
      element.removeEventListener('input', handleValidation);
      element.removeEventListener('blur', handleValidation);
    });
  });

  return { error, isValid, validate };
}

// Composable for modal control
export function useForgeModal() {
  const { elementRef, getElement } = useForgeComponent();

  const show = () => {
    (getElement() as any)?.show?.();
  };

  const hide = () => {
    (getElement() as any)?.hide?.();
  };

  const toggle = () => {
    const element = getElement();
    const isOpen = (element as any)?.open;
    if (isOpen) {
      hide();
    } else {
      show();
    }
  };

  return { elementRef, show, hide, toggle };
}

// Composable for data table management
export function useForgeDataTable<T = any>(initialData: T[] = []) {
  const data = ref<T[]>(initialData);
  const selectedRows = ref<T[]>([]);
  const sortConfig = ref<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const filters = ref<Record<string, any>>({});

  const { elementRef } = useForgeComponent();

  // Computed filtered and sorted data
  const processedData = computed(() => {
    let result = [...data.value];

    // Apply filters
    Object.entries(filters.value).forEach(([key, value]) => {
      if (value) {
        result = result.filter((item) =>
          String(item[key as keyof T]).toLowerCase().includes(String(value).toLowerCase())
        );
      }
    });

    // Apply sorting
    if (sortConfig.value) {
      const { key, direction } = sortConfig.value;
      result.sort((a, b) => {
        const aVal = a[key as keyof T];
        const bVal = b[key as keyof T];
        const compare = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        return direction === 'asc' ? compare : -compare;
      });
    }

    return result;
  });

  const handleSort = (event: ForgeCustomEvent<{ key: string; direction: 'asc' | 'desc' }>) => {
    sortConfig.value = event.detail;
  };

  const handleFilter = (event: ForgeCustomEvent<{ filters: Record<string, any> }>) => {
    filters.value = event.detail.filters;
  };

  const handleSelect = (event: ForgeCustomEvent<{ selected: T[] }>) => {
    selectedRows.value = event.detail.selected;
  };

  return {
    elementRef,
    data,
    processedData,
    selectedRows,
    sortConfig,
    filters,
    handleSort,
    handleFilter,
    handleSelect,
  };
}

/**
 * Vue plugin for global Forge component registration
 * 
 * Provides easy setup for Forge components in Vue applications with
 * optional component registration and global theme management.
 * 
 * @namespace ForgeVuePlugin
 * @since 0.5.0
 * 
 * @example
 * ```js
 * import { createApp } from 'vue';
 * import { ForgeVuePlugin } from '@nexcraft/forge/integrations/vue';
 * import App from './App.vue';
 * 
 * const app = createApp(App);
 * app.use(ForgeVuePlugin, {
 *   components: ['all'], // Register all components globally
 *   prefix: 'forge'
 * });
 * app.mount('#app');
 * ```
 */
export const ForgeVuePlugin = {
  install(app: any, options: { components?: string[]; prefix?: string } = {}) {
    const { components = [] } = options;

    // Register common components globally if specified
    if (components.includes('all') || components.includes('button')) {
      app.component('ForgeButton', {
        props: ['variant', 'size', 'disabled', 'loading', 'modelValue'],
        emits: ['click', 'update:modelValue'],
        setup(props: any, { emit }: any) {
          const { elementRef } = useForgeComponent();

          onMounted(() => {
            const element = elementRef.value;
            if (!element) return;

            element.addEventListener('click', (event) => {
              emit('click', event);
            });
          });

          return { elementRef };
        },
        template: '<forge-button ref="elementRef" v-bind="$attrs"><slot></slot></forge-button>',
      });
    }

    // Add more components as needed...

    // Provide global theme
    const { theme } = useForgeTheme();
    app.provide('forgeTheme', theme);

    // Add global properties
    app.config.globalProperties.$forge = {
      theme,
      setTheme: (newTheme: string) => {
        theme.value = newTheme;
      },
    };
  },
};

// Directive for automatic Forge component enhancement
export const vForge = {
  mounted(el: HTMLElement, binding: any) {
    // Auto-apply theme
    if (binding.arg === 'theme') {
      el.setAttribute('data-forge-theme', binding.value);
    }

    // Auto-setup v-model
    if (binding.modifiers.model && binding.value) {
      const { emit, value } = binding.value;
      
      el.addEventListener('input', (event: any) => {
        const newValue = event.detail?.value ?? event.target?.value;
        emit('update:modelValue', newValue);
      });

      // Set initial value
      if (value !== undefined) {
        (el as any).value = value;
      }
    }
  },

  updated(el: HTMLElement, binding: any) {
    // Update theme
    if (binding.arg === 'theme') {
      el.setAttribute('data-forge-theme', binding.value);
    }

    // Update v-model value
    if (binding.modifiers.model && binding.value?.value !== undefined) {
      (el as any).value = binding.value.value;
    }
  },
};

// Export ready-to-use components
export const ForgeComponents = {
  // Input component with v-model
  Input: {
    props: ['modelValue', 'placeholder', 'type', 'disabled'],
    emits: ['update:modelValue', 'input', 'focus', 'blur'],
    setup(props: any, { emit }: any) {
      return useForgeVModel(emit, props);
    },
    template: '<forge-input ref="elementRef" v-bind="$attrs" />',
  },

  // Modal component with show/hide methods
  Modal: {
    props: ['title', 'size', 'closeable'],
    emits: ['open', 'close'],
    setup(props: any, { emit, expose }: any) {
      const { elementRef, show, hide, toggle } = useForgeModal();

      onMounted(() => {
        const element = elementRef.value;
        if (!element) return;

        element.addEventListener('open', (event) => emit('open', event));
        element.addEventListener('close', (event) => emit('close', event));
      });

      expose({ show, hide, toggle });

      return { elementRef, show, hide, toggle };
    },
    template: '<forge-modal ref="elementRef" v-bind="$attrs"><slot></slot></forge-modal>',
  },

  // Data table with reactive data
  DataTable: {
    props: ['data', 'columns', 'sortable', 'filterable', 'selectable'],
    emits: ['sort', 'filter', 'select', 'row-click'],
    setup(props: any, { emit }: any) {
      const {
        elementRef,
        processedData,
        selectedRows,
        handleSort,
        handleFilter,
        handleSelect,
      } = useForgeDataTable(props.data);

      onMounted(() => {
        const element = elementRef.value;
        if (!element) return;

        element.addEventListener('sort', (event) => {
          handleSort(event);
          emit('sort', event);
        });

        element.addEventListener('filter', (event) => {
          handleFilter(event);
          emit('filter', event);
        });

        element.addEventListener('select', (event) => {
          handleSelect(event);
          emit('select', event);
        });

        element.addEventListener('row-click', (event) => {
          emit('row-click', event);
        });
      });

      return {
        elementRef,
        processedData,
        selectedRows,
      };
    },
    template: '<forge-data-table ref="elementRef" :data="processedData" v-bind="$attrs" />',
  },
};