import { ref, inject, provide, watch } from 'vue';
import type { Ref } from 'vue';
import type { ForgeTheme, ForgeThemeContext } from '../types/forge-vue.types';

const FORGE_THEME_KEY = Symbol('forge-theme');

/**
 * Composable for theme management
 *
 * Provides reactive theme state and theme switching functionality.
 * Automatically updates DOM attributes and CSS custom properties.
 *
 * @param initialTheme - Initial theme value (defaults to 'auto')
 * @returns Reactive theme state and control functions
 *
 * @example
 * ```vue
 * <script setup>
 * import { useForgeTheme } from '@nexcraft/forge-vue';
 *
 * const { theme, setTheme, toggleTheme } = useForgeTheme();
 * </script>
 *
 * <template>
 *   <div :data-forge-theme="theme">
 *     <button @click="toggleTheme">
 *       Current theme: {{ theme }}
 *     </button>
 *     <button @click="setTheme('light')">Light</button>
 *     <button @click="setTheme('dark')">Dark</button>
 *     <button @click="setTheme('auto')">Auto</button>
 *   </div>
 * </template>
 * ```
 */
export function useForgeTheme(initialTheme: ForgeTheme = 'auto'): ForgeThemeContext {
  const theme: Ref<ForgeTheme> = ref(initialTheme);

  const setTheme = (newTheme: ForgeTheme) => {
    theme.value = newTheme;
    
    // Update DOM
    document.documentElement.setAttribute('data-forge-theme', newTheme);
    document.documentElement.style.setProperty('--forge-theme', newTheme);
    
    // Store preference
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('forge-theme', newTheme);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme.value === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  // Watch for theme changes
  watch(theme, (newTheme) => {
    setTheme(newTheme);
  }, { immediate: true });

  // Load theme from localStorage if available
  if (typeof localStorage !== 'undefined') {
    const savedTheme = localStorage.getItem('forge-theme') as ForgeTheme;
    if (savedTheme && ['light', 'dark', 'auto'].includes(savedTheme)) {
      theme.value = savedTheme;
    }
  }

  return {
    theme,
    setTheme,
    toggleTheme
  };
}

/**
 * Composable for providing theme context to child components
 *
 * @param initialTheme - Initial theme value
 * @returns Theme context functions
 */
export function useForgeThemeContext(initialTheme?: ForgeTheme): ForgeThemeContext {
  const themeContext = useForgeTheme(initialTheme);
  provide(FORGE_THEME_KEY, themeContext);
  return themeContext;
}

/**
 * Composable for consuming theme context from parent components
 *
 * @returns Theme context or creates new one if not provided
 */
export function useForgeThemeInjection(): ForgeThemeContext {
  const injected = inject<ForgeThemeContext>(FORGE_THEME_KEY);
  return injected || useForgeTheme();
}