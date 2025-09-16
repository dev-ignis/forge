/**
 * Simple script to create JavaScript exports for the new features
 */
const fs = require('fs');
const path = require('path');

// Ensure directories exist
fs.mkdirSync('dist/plugin', { recursive: true });
fs.mkdirSync('dist/exports', { recursive: true });

// Create plugin/index.js
const pluginContent = `
// Tailwind CSS Plugin for @nexcraft/forge
import plugin from 'tailwindcss/plugin';

const forgeTokens = {
  colors: {
    'forge-primary': {
      50: 'var(--forge-color-primary-50, #eff6ff)',
      500: 'var(--forge-color-primary-500, #3b82f6)',
      600: 'var(--forge-color-primary-600, #2563eb)',
    },
    'forge-secondary': {
      200: 'var(--forge-color-secondary-200, #e2e8f0)',
      500: 'var(--forge-color-secondary-500, #64748b)',
    },
    'forge-success': 'var(--forge-color-success, #10b981)',
    'forge-warning': 'var(--forge-color-warning, #f59e0b)',
    'forge-error': 'var(--forge-color-error, #ef4444)',
  }
};

const forgeUtilities = {
  '.btn-forge': {
    '@apply inline-flex items-center justify-center rounded px-4 py-2 font-medium transition-colors': {},
  },
  '.btn-forge-primary': {
    '@apply bg-blue-500 text-white hover:bg-blue-600': {},
  },
  '.input-forge': {
    '@apply block w-full rounded border border-gray-300 px-3 py-2': {},
  },
  '.card-forge': {
    '@apply rounded bg-white shadow border': {},
  }
};

const forgePlugin = plugin(
  function({ addUtilities, addBase }) {
    addBase({
      ':root': {
        '--forge-color-primary-500': '#3b82f6',
        '--forge-color-secondary-500': '#64748b',
      }
    });
    
    addUtilities(forgeUtilities);
  },
  {
    theme: {
      extend: forgeTokens
    }
  }
);

export default forgePlugin;
export { forgePlugin, forgeTokens as forgeTheme, forgeUtilities };
`;

fs.writeFileSync('dist/plugin/index.js', pluginContent.trim());

// Create individual component exports  
const components = [
  { name: 'button', component: 'ForgeButton', path: '../nexcraft-forge.es.js' },
  { name: 'input', component: 'ForgeInput', path: '../nexcraft-forge.es.js' },
  { name: 'checkbox', component: 'ForgeCheckbox', path: '../nexcraft-forge.es.js' },
  { name: 'select', component: 'ForgeSelect', path: '../nexcraft-forge.es.js' },
  { name: 'alert', component: 'ForgeAlert', path: '../nexcraft-forge.es.js' },
  { name: 'card', component: 'ForgeCard', path: '../nexcraft-forge.es.js' },
  { name: 'modal', component: 'ForgeModal', path: '../nexcraft-forge.es.js' }
];

components.forEach(({ name, component }) => {
  const exportContent = `
// Individual ${component} Component Export
// This provides selective imports for better tree-shaking

// Import the main bundle to ensure components are available
import '../nexcraft-forge.es.js';

// Get the component from the global namespace
const ${component} = globalThis.NexcraftForge?.${component} || 
  (typeof window !== 'undefined' && window.customElements?.get('forge-${name}')) ||
  null;

if (!${component}) {
  throw new Error('${component} not found. Make sure @nexcraft/forge is properly loaded.');
}

// Auto-register the component when imported
if (typeof customElements !== 'undefined' && !customElements.get('forge-${name}')) {
  customElements.define('forge-${name}', ${component});
}

// Export for both default and named imports
export { ${component} };
export default ${component};
`;

  fs.writeFileSync(`dist/exports/${name}.js`, exportContent.trim());
  
  // Create TypeScript definition file
  const typeContent = `import { ${component} } from '../index'

export { ${component} }
export default ${component}`;
  
  fs.writeFileSync(`dist/exports/${name}.d.ts`, typeContent);
});

// Create plugin TypeScript definition
const pluginTypeContent = `/**
 * Tailwind CSS Plugin for @nexcraft/forge
 */
import type { Config } from 'tailwindcss'

declare const forgePlugin: {
  (options?: any): {
    handler: (api: any) => void
    config?: Partial<Config>
  }
  forgePlugin: any
  forgeTheme: any
  forgeUtilities: any
}

export = forgePlugin`;

fs.writeFileSync('dist/plugin/index.d.ts', pluginTypeContent);

console.log('✅ Built plugin and exports successfully!');