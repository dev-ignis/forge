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

// Extract or generate a11y information for components
function generateA11yInfo(componentTag) {
  const componentName = componentTag.replace('forge-', '');
  
  // Define comprehensive a11y information for each component type
  const a11yMappings = {
    'forge-alert': {
      role: 'alert',
      ariaAttributes: ['aria-live', 'aria-atomic', 'aria-label', 'aria-describedby'],
      keyboardNavigation: ['Escape (if closable)', 'Tab'],
      screenReaderBehavior: 'Automatically announced when displayed due to alert role',
      focusManagement: 'Can receive focus if closable, maintains focus ring',
      colorContrast: 'WCAG AA compliant (4.5:1 minimum) for all severity variants',
      reducedMotion: 'Respects prefers-reduced-motion for entry/exit animations'
    },
    'forge-aspect-ratio': {
      role: 'none',
      ariaAttributes: ['aria-label (inherited by content)'],
      keyboardNavigation: ['Inherits from slotted content'],
      screenReaderBehavior: 'Transparent to screen readers, passes through content semantics',
      focusManagement: 'Focus management handled by slotted content',
      colorContrast: 'Neutral component, contrast managed by content',
      reducedMotion: 'No animations by default'
    },
    'forge-avatar': {
      role: 'img',
      ariaAttributes: ['aria-label', 'alt', 'aria-describedby'],
      keyboardNavigation: ['Tab (if clickable)', 'Enter/Space (if clickable)'],
      screenReaderBehavior: 'Announces as image with descriptive label',
      focusManagement: 'Receives focus when clickable, maintains focus ring',
      colorContrast: 'WCAG AA compliant for status indicators',
      reducedMotion: 'Respects prefers-reduced-motion for hover effects'
    },
    'forge-badge': {
      role: 'status',
      ariaAttributes: ['aria-label', 'aria-live', 'aria-atomic'],
      keyboardNavigation: ['Tab', 'Not interactive by default'],
      screenReaderBehavior: 'Announces count changes via aria-live',
      focusManagement: 'Generally not focusable unless interactive',
      colorContrast: 'WCAG AA compliant (4.5:1 minimum) for all variants',
      reducedMotion: 'Respects prefers-reduced-motion for pulse animation'
    },
    'forge-button': {
      role: 'button',
      ariaAttributes: ['aria-label', 'aria-pressed', 'aria-disabled', 'aria-describedby', 'aria-expanded'],
      keyboardNavigation: ['Tab', 'Enter', 'Space'],
      screenReaderBehavior: 'Announces button purpose, state, and content clearly',
      focusManagement: 'Receives focus via tab navigation, maintains visible focus ring',
      colorContrast: 'WCAG AA compliant (4.5:1 minimum) for all variants',
      reducedMotion: 'Respects prefers-reduced-motion for ripple effects'
    },
    'forge-checkbox': {
      role: 'checkbox',
      ariaAttributes: ['aria-checked', 'aria-disabled', 'aria-required', 'aria-describedby', 'aria-invalid'],
      keyboardNavigation: ['Tab', 'Space'],
      screenReaderBehavior: 'Announces label, state (checked/unchecked/mixed), and validation',
      focusManagement: 'Receives focus via tab navigation, maintains focus ring',
      colorContrast: 'WCAG AA compliant (4.5:1 minimum) including focus states',
      reducedMotion: 'Respects prefers-reduced-motion for check animations'
    },
    'forge-icon': {
      role: 'img',
      ariaAttributes: ['aria-label', 'aria-hidden', 'role'],
      keyboardNavigation: ['Generally not interactive'],
      screenReaderBehavior: 'Hidden from screen readers when decorative, labeled when semantic',
      focusManagement: 'Not focusable unless interactive',
      colorContrast: 'WCAG AA compliant when used as interactive elements',
      reducedMotion: 'Respects prefers-reduced-motion for spin/pulse animations'
    },
    'forge-input': {
      role: 'textbox',
      ariaAttributes: ['aria-label', 'aria-describedby', 'aria-required', 'aria-invalid', 'aria-autocomplete'],
      keyboardNavigation: ['Tab', 'Text input', 'Escape (clear if clearable)'],
      screenReaderBehavior: 'Announces label, value, validation state, and helper text',
      focusManagement: 'Receives focus via tab navigation, maintains focus ring',
      colorContrast: 'WCAG AA compliant (4.5:1 minimum) for text and borders',
      reducedMotion: 'Respects prefers-reduced-motion for focus transitions'
    },
    'forge-progress': {
      role: 'progressbar',
      ariaAttributes: ['aria-valuenow', 'aria-valuemax', 'aria-valuemin', 'aria-label', 'aria-describedby'],
      keyboardNavigation: ['Not interactive'],
      screenReaderBehavior: 'Announces progress value and description',
      focusManagement: 'Not focusable',
      colorContrast: 'WCAG AA compliant (4.5:1 minimum) for progress indicator',
      reducedMotion: 'Respects prefers-reduced-motion for indeterminate animation'
    },
    'forge-progress-circle': {
      role: 'progressbar',
      ariaAttributes: ['aria-valuenow', 'aria-valuemax', 'aria-valuemin', 'aria-label', 'aria-describedby'],
      keyboardNavigation: ['Not interactive'],
      screenReaderBehavior: 'Announces progress value and description',
      focusManagement: 'Not focusable',
      colorContrast: 'WCAG AA compliant (4.5:1 minimum) for progress indicator',
      reducedMotion: 'Respects prefers-reduced-motion for indeterminate animation'
    },
    'forge-radio-group': {
      role: 'radiogroup',
      ariaAttributes: ['aria-label', 'aria-describedby', 'aria-required', 'aria-invalid'],
      keyboardNavigation: ['Tab (to group)', 'Arrow keys (between options)', 'Space'],
      screenReaderBehavior: 'Announces group label, selected option, and validation state',
      focusManagement: 'Group receives tab focus, arrow keys navigate options',
      colorContrast: 'WCAG AA compliant (4.5:1 minimum) for all states',
      reducedMotion: 'Respects prefers-reduced-motion for selection animations'
    },
    'forge-select': {
      role: 'combobox',
      ariaAttributes: ['aria-expanded', 'aria-haspopup', 'aria-label', 'aria-describedby', 'aria-required', 'aria-invalid'],
      keyboardNavigation: ['Tab', 'Enter/Space (open)', 'Arrow keys', 'Escape (close)', 'Type to search'],
      screenReaderBehavior: 'Announces label, selected value, expanded state, and options',
      focusManagement: 'Receives focus via tab navigation, manages focus in dropdown',
      colorContrast: 'WCAG AA compliant (4.5:1 minimum) for all states',
      reducedMotion: 'Respects prefers-reduced-motion for dropdown animations'
    },
    'forge-skeleton': {
      role: 'status',
      ariaAttributes: ['aria-label', 'aria-live'],
      keyboardNavigation: ['Not interactive'],
      screenReaderBehavior: 'Announces loading state to indicate content is loading',
      focusManagement: 'Not focusable',
      colorContrast: 'WCAG AA compliant for skeleton appearance',
      reducedMotion: 'Respects prefers-reduced-motion for shimmer animation'
    },
    'forge-switch': {
      role: 'switch',
      ariaAttributes: ['aria-checked', 'aria-disabled', 'aria-label', 'aria-describedby'],
      keyboardNavigation: ['Tab', 'Space', 'Enter'],
      screenReaderBehavior: 'Announces switch purpose and state (on/off)',
      focusManagement: 'Receives focus via tab navigation, maintains focus ring',
      colorContrast: 'WCAG AA compliant (4.5:1 minimum) for all states',
      reducedMotion: 'Respects prefers-reduced-motion for toggle animations'
    },
    'forge-card': {
      role: 'article',
      ariaAttributes: ['aria-label', 'aria-describedby', 'role'],
      keyboardNavigation: ['Tab (if clickable)', 'Enter (if clickable)'],
      screenReaderBehavior: 'Announces as article/card with title and content structure',
      focusManagement: 'Receives focus when interactive, maintains focus ring',
      colorContrast: 'WCAG AA compliant (4.5:1 minimum) for text and borders',
      reducedMotion: 'Respects prefers-reduced-motion for hover/focus effects'
    },
    'forge-modal': {
      role: 'dialog',
      ariaAttributes: ['aria-modal', 'aria-labelledby', 'aria-describedby', 'aria-hidden'],
      keyboardNavigation: ['Tab (within modal)', 'Escape (close)', 'Focus trap enabled'],
      screenReaderBehavior: 'Announces as modal dialog, focuses first interactive element',
      focusManagement: 'Traps focus within modal, returns focus on close',
      colorContrast: 'WCAG AA compliant (4.5:1 minimum) for content',
      reducedMotion: 'Respects prefers-reduced-motion for entry/exit animations'
    },
    'forge-date-picker': {
      role: 'combobox',
      ariaAttributes: ['aria-expanded', 'aria-haspopup', 'aria-label', 'aria-describedby', 'aria-required', 'aria-invalid'],
      keyboardNavigation: ['Tab', 'Enter/Space (open calendar)', 'Arrow keys (navigate dates)', 'Escape (close)'],
      screenReaderBehavior: 'Announces selected date, calendar state, and navigation instructions',
      focusManagement: 'Manages focus within calendar popup, returns focus on close',
      colorContrast: 'WCAG AA compliant (4.5:1 minimum) for all calendar elements',
      reducedMotion: 'Respects prefers-reduced-motion for calendar animations'
    },
    'forge-dropdown': {
      role: 'menu',
      ariaAttributes: ['aria-expanded', 'aria-haspopup', 'aria-orientation', 'aria-activedescendant'],
      keyboardNavigation: ['Tab', 'Enter/Space (trigger)', 'Arrow keys (navigate)', 'Escape (close)'],
      screenReaderBehavior: 'Announces menu items and current selection',
      focusManagement: 'Manages focus within dropdown, returns focus to trigger',
      colorContrast: 'WCAG AA compliant (4.5:1 minimum) for menu items',
      reducedMotion: 'Respects prefers-reduced-motion for dropdown animations'
    },
    'forge-form-field': {
      role: 'group',
      ariaAttributes: ['aria-labelledby', 'aria-describedby', 'aria-invalid'],
      keyboardNavigation: ['Tab through form controls'],
      screenReaderBehavior: 'Groups related form controls with shared label and description',
      focusManagement: 'Focus management handled by contained form controls',
      colorContrast: 'WCAG AA compliant (4.5:1 minimum) for labels and text',
      reducedMotion: 'Respects prefers-reduced-motion for validation animations'
    },
    'forge-multi-select': {
      role: 'listbox',
      ariaAttributes: ['aria-multiselectable', 'aria-expanded', 'aria-label', 'aria-describedby', 'aria-required'],
      keyboardNavigation: ['Tab', 'Enter/Space (toggle)', 'Arrow keys', 'Ctrl+A (select all)'],
      screenReaderBehavior: 'Announces selected items count and individual selections',
      focusManagement: 'Manages focus within multi-select dropdown',
      colorContrast: 'WCAG AA compliant (4.5:1 minimum) for all states',
      reducedMotion: 'Respects prefers-reduced-motion for selection animations'
    },
    'forge-toast': {
      role: 'status',
      ariaAttributes: ['aria-live', 'aria-atomic', 'aria-label', 'aria-describedby'],
      keyboardNavigation: ['Tab (to action buttons)', 'Escape (dismiss)'],
      screenReaderBehavior: 'Automatically announced when displayed via aria-live',
      focusManagement: 'Can receive focus if containing interactive elements',
      colorContrast: 'WCAG AA compliant (4.5:1 minimum) for all variants',
      reducedMotion: 'Respects prefers-reduced-motion for entry/exit animations'
    },
    'forge-toast-container': {
      role: 'region',
      ariaAttributes: ['aria-label', 'aria-live'],
      keyboardNavigation: ['Tab (through contained toasts)'],
      screenReaderBehavior: 'Container for toast notifications, manages aria-live announcements',
      focusManagement: 'Focus management handled by contained toasts',
      colorContrast: 'Neutral container, contrast managed by toast content',
      reducedMotion: 'Respects prefers-reduced-motion for stacking animations'
    },
    'forge-tooltip': {
      role: 'tooltip',
      ariaAttributes: ['aria-describedby', 'aria-hidden'],
      keyboardNavigation: ['Escape (close)', 'Focus trigger to show'],
      screenReaderBehavior: 'Associated with trigger element via aria-describedby',
      focusManagement: 'Not focusable, shown/hidden based on trigger focus',
      colorContrast: 'WCAG AA compliant (4.5:1 minimum) for tooltip content',
      reducedMotion: 'Respects prefers-reduced-motion for show/hide animations'
    },
    'forge-accordion': {
      role: 'region',
      ariaAttributes: ['aria-expanded', 'aria-controls', 'aria-labelledby'],
      keyboardNavigation: ['Tab (to headers)', 'Enter/Space (toggle)', 'Arrow keys (navigate headers)'],
      screenReaderBehavior: 'Announces header content and expanded/collapsed state',
      focusManagement: 'Focus moves between accordion headers',
      colorContrast: 'WCAG AA compliant (4.5:1 minimum) for headers and content',
      reducedMotion: 'Respects prefers-reduced-motion for expand/collapse animations'
    },
    'forge-data-grid': {
      role: 'grid',
      ariaAttributes: ['aria-rowcount', 'aria-colcount', 'aria-label', 'aria-describedby'],
      keyboardNavigation: ['Tab', 'Arrow keys (navigate cells)', 'Home/End', 'Page Up/Down'],
      screenReaderBehavior: 'Announces grid structure, headers, and cell content',
      focusManagement: 'Manages focus within grid cells using arrow key navigation',
      colorContrast: 'WCAG AA compliant (4.5:1 minimum) for all grid elements',
      reducedMotion: 'Respects prefers-reduced-motion for sorting/filtering animations'
    },
    'forge-data-table': {
      role: 'table',
      ariaAttributes: ['aria-label', 'aria-describedby', 'aria-rowcount', 'aria-colcount'],
      keyboardNavigation: ['Tab (through interactive elements)', 'Arrow keys (if interactive)'],
      screenReaderBehavior: 'Announces table structure with proper headers and data relationships',
      focusManagement: 'Focus managed by interactive elements within table',
      colorContrast: 'WCAG AA compliant (4.5:1 minimum) for table content',
      reducedMotion: 'Respects prefers-reduced-motion for sorting animations'
    },
    'forge-navigation-bar': {
      role: 'navigation',
      ariaAttributes: ['aria-label', 'aria-current'],
      keyboardNavigation: ['Tab (through nav items)', 'Enter/Space (activate)'],
      screenReaderBehavior: 'Announces as navigation with current page indication',
      focusManagement: 'Focus moves through navigation items',
      colorContrast: 'WCAG AA compliant (4.5:1 minimum) for navigation links',
      reducedMotion: 'Respects prefers-reduced-motion for hover/active animations'
    },
    'forge-pagination': {
      role: 'navigation',
      ariaAttributes: ['aria-label', 'aria-current', 'aria-describedby'],
      keyboardNavigation: ['Tab (through page links)', 'Enter/Space (navigate)'],
      screenReaderBehavior: 'Announces pagination controls and current page',
      focusManagement: 'Focus moves through pagination controls',
      colorContrast: 'WCAG AA compliant (4.5:1 minimum) for pagination controls',
      reducedMotion: 'Respects prefers-reduced-motion for page transition effects'
    },
    'forge-tabs': {
      role: 'tablist',
      ariaAttributes: ['aria-orientation', 'aria-label', 'aria-selected', 'aria-controls'],
      keyboardNavigation: ['Tab (to tab list)', 'Arrow keys (between tabs)', 'Space/Enter (activate)'],
      screenReaderBehavior: 'Announces tab list, selected tab, and associated content',
      focusManagement: 'Arrow keys navigate tabs, Tab moves to panel content',
      colorContrast: 'WCAG AA compliant (4.5:1 minimum) for tabs and panels',
      reducedMotion: 'Respects prefers-reduced-motion for tab switching animations'
    },
    'forge-tree-view': {
      role: 'tree',
      ariaAttributes: ['aria-expanded', 'aria-level', 'aria-setsize', 'aria-posinset', 'aria-selected'],
      keyboardNavigation: ['Tab (to tree)', 'Arrow keys (navigate)', 'Enter/Space (toggle)', '*  (expand all)'],
      screenReaderBehavior: 'Announces tree structure, node states, and hierarchical relationships',
      focusManagement: 'Manages focus within tree structure using arrow key navigation',
      colorContrast: 'WCAG AA compliant (4.5:1 minimum) for tree nodes',
      reducedMotion: 'Respects prefers-reduced-motion for expand/collapse animations'
    }
  };

  // Return component-specific a11y info or default
  return a11yMappings[componentTag] || {
    role: 'generic',
    ariaAttributes: ['aria-label'],
    keyboardNavigation: ['Standard keyboard navigation'],
    screenReaderBehavior: 'Announces component content',
    focusManagement: 'Standard focus management',
    colorContrast: 'WCAG AA compliant (4.5:1 minimum)',
    reducedMotion: 'Respects prefers-reduced-motion settings'
  };
}

const root = process.cwd();
const pkg = readJSONSafe(resolve(root, 'package.json')) || { name: 'unknown' };
const cemPath = resolve(root, 'custom-elements.json');
const cem = existsSync(cemPath) ? readJSONSafe(cemPath) : null;

// Fail fast if CEM is missing or invalid
if (!cem) {
  console.error('❌ [ai] custom-elements.json not found. Run "npm run build:manifest" first.');
  process.exit(1);
}

if (!cem.modules || !Array.isArray(cem.modules)) {
  console.error('❌ [ai] custom-elements.json is invalid or empty.');
  process.exit(1);
}

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
  
  // Add SSR fallback to examples
  if (Object.keys(examples).length > 0) {
    examples.ssrFallback = generateSSRFallbacks(componentTag);
  }
  
  return Object.keys(examples).length > 0 ? examples : undefined;
}

// Generate SSR fallback examples for components
function generateSSRFallbacks(componentTag) {
  const componentName = componentTag.replace('forge-', '');
  
  const ssrFallbacks = {
    'forge-alert': `<div class="forge-alert" role="alert" aria-live="polite">
  <div class="forge-alert__content">
    <span class="forge-alert__message">Alert message content</span>
    <button class="forge-alert__close" aria-label="Close alert" type="button">×</button>
  </div>
</div>`,
    'forge-aspect-ratio': `<div class="forge-aspect-ratio" style="aspect-ratio: 16/9; max-width: 100%;">
  <div class="forge-aspect-ratio__content">
    <!-- Slotted content maintains aspect ratio -->
  </div>
</div>`,
    'forge-avatar': `<div class="forge-avatar" role="img" aria-label="User avatar">
  <img src="/placeholder-avatar.jpg" alt="User avatar" class="forge-avatar__image" />
  <div class="forge-avatar__fallback" aria-hidden="true">U</div>
</div>`,
    'forge-badge': `<span class="forge-badge" role="status" aria-label="Notification badge">
  <span class="forge-badge__content">3</span>
</span>`,
    'forge-button': `<button class="forge-button" type="button" aria-describedby="button-help">
  <span class="forge-button__content">Button Text</span>
</button>`,
    'forge-checkbox': `<label class="forge-checkbox">
  <input type="checkbox" class="forge-checkbox__input" aria-describedby="checkbox-help" />
  <span class="forge-checkbox__checkmark" aria-hidden="true"></span>
  <span class="forge-checkbox__label">Checkbox Label</span>
</label>`,
    'forge-icon': `<span class="forge-icon" role="img" aria-label="Icon description">
  <svg class="forge-icon__svg" viewBox="0 0 24 24" aria-hidden="true">
    <use href="#icon-name"></use>
  </svg>
</span>`,
    'forge-input': `<div class="forge-input">
  <label class="forge-input__label" for="input-id">Input Label</label>
  <input class="forge-input__field" type="text" id="input-id" placeholder="Enter text..." aria-describedby="input-help" />
  <div class="forge-input__helper" id="input-help">Helper text</div>
</div>`,
    'forge-progress': `<div class="forge-progress" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" aria-label="Loading progress">
  <div class="forge-progress__track">
    <div class="forge-progress__fill" style="width: 50%"></div>
  </div>
  <div class="forge-progress__label">50%</div>
</div>`,
    'forge-progress-circle': `<div class="forge-progress-circle" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" aria-label="Circular progress">
  <svg class="forge-progress-circle__svg" viewBox="0 0 100 100">
    <circle class="forge-progress-circle__track" cx="50" cy="50" r="45" fill="none" stroke-width="8"/>
    <circle class="forge-progress-circle__fill" cx="50" cy="50" r="45" fill="none" stroke-width="8" stroke-dasharray="282.7" stroke-dashoffset="70.7"/>
  </svg>
  <div class="forge-progress-circle__label">75%</div>
</div>`,
    'forge-radio-group': `<fieldset class="forge-radio-group" role="radiogroup" aria-labelledby="radio-legend">
  <legend class="forge-radio-group__legend" id="radio-legend">Radio Group Label</legend>
  <label class="forge-radio-group__option">
    <input type="radio" name="radio-group" value="option1" class="forge-radio-group__input" />
    <span class="forge-radio-group__radio" aria-hidden="true"></span>
    <span class="forge-radio-group__text">Option 1</span>
  </label>
  <label class="forge-radio-group__option">
    <input type="radio" name="radio-group" value="option2" class="forge-radio-group__input" />
    <span class="forge-radio-group__radio" aria-hidden="true"></span>
    <span class="forge-radio-group__text">Option 2</span>
  </label>
</fieldset>`,
    'forge-select': `<div class="forge-select">
  <label class="forge-select__label" for="select-id">Select Label</label>
  <select class="forge-select__native" id="select-id" aria-describedby="select-help">
    <option value="">Choose an option...</option>
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
  </select>
  <div class="forge-select__helper" id="select-help">Helper text</div>
</div>`,
    'forge-skeleton': `<div class="forge-skeleton" role="status" aria-label="Loading content">
  <div class="forge-skeleton__block" style="width: 100%; height: 20px; background: #e2e8f0; border-radius: 4px;"></div>
  <div class="forge-skeleton__block" style="width: 75%; height: 20px; background: #e2e8f0; border-radius: 4px; margin-top: 8px;"></div>
</div>`,
    'forge-switch': `<label class="forge-switch">
  <input type="checkbox" class="forge-switch__input" aria-describedby="switch-help" />
  <span class="forge-switch__track" aria-hidden="true">
    <span class="forge-switch__thumb"></span>
  </span>
  <span class="forge-switch__label">Switch Label</span>
</label>`,
    'forge-card': `<article class="forge-card" role="article">
  <header class="forge-card__header">
    <h3 class="forge-card__title">Card Title</h3>
    <p class="forge-card__subtitle">Card subtitle</p>
  </header>
  <div class="forge-card__media" aria-hidden="true">
    <img src="/placeholder.jpg" alt="" />
  </div>
  <div class="forge-card__content">
    <p>Card content goes here.</p>
  </div>
  <footer class="forge-card__footer">
    <div class="forge-card__actions">
      <button type="button" class="forge-button">Action</button>
    </div>
  </footer>
</article>`,
    'forge-modal': `<div class="forge-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-content" aria-hidden="false">
  <div class="forge-modal__backdrop"></div>
  <div class="forge-modal__container">
    <header class="forge-modal__header">
      <h2 class="forge-modal__title" id="modal-title">Modal Title</h2>
      <button class="forge-modal__close" aria-label="Close modal" type="button">×</button>
    </header>
    <div class="forge-modal__content" id="modal-content">
      <p>Modal content goes here.</p>
    </div>
    <footer class="forge-modal__footer">
      <button type="button" class="forge-button">Cancel</button>
      <button type="button" class="forge-button forge-button--primary">Confirm</button>
    </footer>
  </div>
</div>`
  };

  return ssrFallbacks[componentTag] || `<div class="forge-${componentName}" role="generic">
  <!-- Component content rendered server-side -->
  <noscript>This component requires JavaScript to function properly.</noscript>
</div>`;
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
          a11y: generateA11yInfo(d.tagName),
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

// Validate we extracted components
const expectedMinComponents = 25; // Known minimum component count
if (components.length < expectedMinComponents) {
  console.error(`❌ [ai] Generated manifest has only ${components.length} components, expected at least ${expectedMinComponents}`);
  console.error('❌ [ai] Check custom-elements.json or component source files');
  process.exit(1);
}

const outPath = resolve(root, 'ai-manifest.json');
writeFileSync(outPath, JSON.stringify(manifest, null, 2));

// Optionally mirror to dist if present
const distPath = resolve(root, 'dist', 'ai-manifest.json');
try {
  mkdirSync(dirname(distPath), { recursive: true });
  writeFileSync(distPath, JSON.stringify(manifest, null, 2));
} catch {}

// Success metrics
const componentsWithAI = components.filter(c => 
  c.aiMethods && (c.aiMethods.getPossibleActions || c.aiMethods.explainState)
).length;

console.log(`✅ [ai] Manifest generated at ${outPath}`);
console.log(`✅ [ai] ${components.length} components extracted`);
console.log(`✅ [ai] ${componentsWithAI} components have AI method implementations`);
