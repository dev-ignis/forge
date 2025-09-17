#!/usr/bin/env node
/*
  Generates ai-index.json - a compact AI index for fast component discovery.
  This provides a quick overview of available components without needing to parse the full manifest.
*/
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve } from 'path';

function readJSONSafe(path) {
  try { return JSON.parse(readFileSync(path, 'utf8')); } catch { return null; }
}

const root = process.cwd();
const pkg = readJSONSafe(resolve(root, 'package.json')) || { name: 'unknown' };
const aiManifest = readJSONSafe(resolve(root, 'ai-manifest.json'));

if (!aiManifest || !aiManifest.components) {
  console.error('[ai-index] No AI manifest found or no components available');
  process.exit(1);
}

// Count categories first
const categories = {};
const components = aiManifest.components.map(comp => {
  // Count categories
  if (comp.category) {
    categories[comp.category] = (categories[comp.category] || 0) + 1;
  }
  
  return {
    tag: comp.tag,
    id: comp.id,
    category: comp.category || 'component',
    description: `${comp.tag.replace('forge-', '').replace('-', ' ')} component`,
    props: (comp.props || []).length,
    events: (comp.events || []).length,
    slots: (comp.slots || []).length > 0,
    hasAiMethods: !!(comp.aiMethods?.getPossibleActions || comp.aiMethods?.explainState),
    a11yRole: comp.a11y?.role || 'generic',
    keyboardSupport: !!(comp.a11y?.keyboardNavigation?.length > 0),
    examples: !!(comp.examples && Object.keys(comp.examples).length > 0)
  };
});

// Create compact index
const aiIndex = {
  indexVersion: '1.0.0',
  package: pkg.name,
  generatedAt: new Date().toISOString(),
  summary: {
    totalComponents: aiManifest.components.length,
    categories: categories,
    frameworks: ['vanilla', 'react', 'vue', 'angular'],
    hasAiMethods: true,
    hasA11yInfo: true,
    hasExamples: true
  },
  quickAccess: {
    manifest: './ai-manifest.json',
    customElements: './custom-elements.json',
    readme: './README.md',
    docs: './docs/',
    examples: './examples/',
    integrations: {
      react: './integrations/react',
      vue: './integrations/vue', 
      angular: './integrations/angular'
    }
  },
  components: components,
  usage: {
    vanilla: {
      install: `npm install ${pkg.name}`,
      import: `import '${pkg.name}'`,
      example: `<forge-button>Click me</forge-button>`
    },
    react: {
      install: `npm install ${pkg.name}`,
      import: `import { ForgeButton } from '${pkg.name}/integrations/react'`,
      example: `<ForgeButton>Click me</ForgeButton>`
    },
    vue: {
      install: `npm install ${pkg.name}`,
      import: `import '${pkg.name}'`,
      example: `<forge-button>Click me</forge-button>`
    },
    angular: {
      install: `npm install ${pkg.name}`,
      import: `import '${pkg.name}'`,
      example: `<forge-button>Click me</forge-button>`
    }
  },
  aiIntegration: {
    manifestPath: './ai-manifest.json',
    functionCalling: './ai-tools/',
    methodsAvailable: ['getPossibleActions', 'explainState', 'aiState'],
    discovery: 'Use this index for quick component discovery, then reference the full manifest for detailed information',
    examples: {
      getComponentInfo: `const manifest = await import('${pkg.name}/ai-manifest.json')`,
      useComponent: `document.querySelector('forge-button').getPossibleActions()`,
      inspectState: `document.querySelector('forge-input').explainState()`
    }
  }
};

const outPath = resolve(root, 'ai-index.json');
writeFileSync(outPath, JSON.stringify(aiIndex, null, 2));

console.log(`[ai-index] Index generated at ${outPath}`);
console.log(`[ai-index] ${aiIndex.summary.totalComponents} components indexed`);
console.log(`[ai-index] Categories: ${Object.keys(aiIndex.summary.categories).join(', ')}`);