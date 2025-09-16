#!/usr/bin/env node
/*
  Generates ai-manifest.json.
  - Gracefully handles missing inputs (custom-elements.json, d.ts, examples)
  - Writes a minimal, valid manifest so builds don't fail
*/
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { globSync } from 'glob';

function readJSONSafe(path) {
  try { return JSON.parse(readFileSync(path, 'utf8')); } catch { return null; }
}

function readFileSafe(path) {
  try { return readFileSync(path, 'utf8'); } catch { return null; }
}

// Extract AI method implementations from TypeScript source
function extractAIMethodImplementations(componentTag) {
  const componentName = componentTag.replace('forge-', '');
  const sourceFiles = globSync(`src/components/**/${componentName}/${componentName}.ts`, { cwd: root });
  
  if (sourceFiles.length === 0) return null;
  
  const sourceContent = readFileSafe(resolve(root, sourceFiles[0]));
  if (!sourceContent) return null;
  
  const implementations = {};
  
  // Extract getPossibleActions implementation
  const actionsMatch = sourceContent.match(/override getPossibleActions\(\)[^{]*\{([\s\S]*?)\n  \}/);
  if (actionsMatch) {
    const actionsCode = actionsMatch[1];
    // Extract action objects from the return statement
    const returnMatch = actionsCode.match(/return\s*\[([\s\S]*?)\];/);
    if (returnMatch) {
      const actionsArray = returnMatch[1];
      const actions = [];
      
      // Parse individual action objects
      const actionMatches = actionsArray.matchAll(/\{\s*name:\s*['"`]([^'"`]+)['"`]\s*,\s*description:\s*['"`]([^'"`]+)['"`]\s*,\s*available:\s*([^}]+)\s*\}/g);
      for (const match of actionMatches) {
        actions.push({
          name: match[1],
          description: match[2],
          availableCondition: match[3].trim()
        });
      }
      
      if (actions.length > 0) {
        implementations.getPossibleActions = {
          description: "Returns array of available actions for the component",
          returns: "AIAction[] - Array of {name, description, available} objects",
          actions: actions
        };
      }
    }
  }
  
  // Extract explainState implementation
  const stateMatch = sourceContent.match(/override explainState\(\)[^{]*\{([\s\S]*?)\n  \}/);
  if (stateMatch) {
    const stateCode = stateMatch[1];
    const states = [];
    
    // Look for explicit state arrays like: const states = ['unchecked', 'checked', 'indeterminate'];
    const arrayMatch = stateCode.match(/(?:const|let)\s+states\s*=\s*\[([\s\S]*?)\];/);
    if (arrayMatch) {
      const stateArray = arrayMatch[1];
      const stateMatches = stateArray.matchAll(/['"`]([^'"`]+)['"`]/g);
      for (const match of stateMatches) {
        if (!states.includes(match[1])) {
          states.push(match[1]);
        }
      }
    }
    
    // Also look for currentState assignments like: currentState = 'checked';
    const currentStateMatches = stateCode.matchAll(/currentState\s*=\s*['"`]([^'"`]+)['"`]/g);
    for (const match of currentStateMatches) {
      if (!states.includes(match[1])) {
        states.push(match[1]);
      }
    }
    
    // Look for states.push() calls
    const pushMatches = stateCode.matchAll(/states\.push\(['"`]([^'"`]+)['"`]\)/g);
    for (const match of pushMatches) {
      if (!states.includes(match[1])) {
        states.push(match[1]);
      }
    }
    
    implementations.explainState = {
      description: "Explains the current state of the component",
      returns: "AIStateExplanation - {currentState, possibleStates, stateDescription}",
      possibleStates: states.length > 0 ? states : undefined
    };
  }
  
  return Object.keys(implementations).length > 0 ? implementations : null;
}

const root = process.cwd();
const pkg = readJSONSafe(resolve(root, 'package.json')) || { name: 'unknown' };
const cemPath = resolve(root, 'custom-elements.json');
const cem = existsSync(cemPath) ? readJSONSafe(cemPath) : null;

// Find example files for each component that are shipped with the package
function findExampleFiles(componentTag) {
  const examples = {};
  const componentName = componentTag.replace('forge-', '');
  
  // Look for component documentation in docs/components (shipped with package)
  const docsFiles = globSync(`docs/components/**/*${componentName}*.md`, { cwd: root });
  if (docsFiles.length > 0) {
    examples.documentation = docsFiles[0];
  }
  
  // Look for integration guide in docs/integrations (shipped with package)
  const integrationFiles = globSync(`docs/integrations/**/*${componentName}*.md`, { cwd: root });
  if (integrationFiles.length > 0) {
    examples.integration = integrationFiles[0];
  }
  
  // Reference the component source file (available in distributed types)
  const sourceFiles = globSync(`src/components/**/${componentName}/${componentName}.ts`, { cwd: root });
  if (sourceFiles.length > 0) {
    // Convert to dist path since that's what's shipped
    examples.source = `dist/components/${componentName}/${componentName}.d.ts`;
  }
  
  // Reference the README.md (always shipped)
  if (existsSync(resolve(root, 'README.md'))) {
    examples.readme = 'README.md';
  }
  
  return Object.keys(examples).length > 0 ? examples : undefined;
}

const components = [];
if (cem && Array.isArray(cem.modules)) {
  // Simplified extraction from CEM
  for (const m of cem.modules) {
    for (const d of (m.declarations || [])) {
      if (d.tagName) {
        components.push({
          id: d.tagName,
          tag: d.tagName,
          category: d.customElement ? 'atom' : undefined,
          props: (d.members || [])
            .filter(x => x.kind === 'field' || x.kind === 'property')
            .map(x => ({ name: x.name, type: x.type?.text })),
          events: (d.events || []).map(e => ({
            name: e.name,
            description: e.description || `${e.name} event`,
            detail: e.type?.text
          })),
          slots: (d.slots || []).length > 0 
            ? (d.slots || []).map(s => ({
                name: s.name || 'default',
                description: s.description || 'Default slot content'
              }))
            : undefined,
          a11y: {},
          examples: findExampleFiles(d.tagName),
          aiMethods: (() => {
            const extracted = extractAIMethodImplementations(d.tagName);
            return {
              getPossibleActions: extracted?.getPossibleActions || {
                description: "Returns array of available actions for the component",
                returns: "AIAction[] - Array of {name, description, available} objects"
              },
              explainState: extracted?.explainState || {
                description: "Explains the current state of the component",
                returns: "AIStateExplanation - {currentState, possibleStates, stateDescription}"
              },
              aiState: {
                description: "Getter that returns comprehensive component state for AI",
                returns: "AIComponentState - Complete component metadata and state"
              }
            };
          })()
        });
      }
    }
  }
}

const manifest = {
  manifestVersion: '1.0.0',
  package: pkg.name,
  generatedAt: new Date().toISOString(),
  components
};

const outPath = resolve(root, 'ai-manifest.json');
writeFileSync(outPath, JSON.stringify(manifest, null, 2));

// Optionally mirror to dist if present
const distPath = resolve(root, 'dist', 'ai-manifest.json');
try {
  mkdirSync(dirname(distPath), { recursive: true });
  writeFileSync(distPath, JSON.stringify(manifest, null, 2));
} catch {}

console.log(`[ai] Manifest generated at ${outPath}`);
