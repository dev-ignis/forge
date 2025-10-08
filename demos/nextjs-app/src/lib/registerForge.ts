'use client';

/**
 * Register all Forge web components
 * The @customElement decorator doesn't auto-register in the bundled npm package
 */
export async function registerForge() {
  if (typeof window === 'undefined') return;

  console.log('[Forge] Starting component registration...');
  const forge = await import('@nexcraft/forge');
  console.log('[Forge] Module loaded:', forge);

  // Register all components manually
  const components = [
    ['forge-alert', forge.ForgeAlert],
    ['forge-aspect-ratio', forge.ForgeAspectRatio],
    ['forge-avatar', forge.ForgeAvatar],
    ['forge-badge', forge.ForgeBadge],
    ['forge-button', forge.ForgeButton],
    ['forge-card', forge.ForgeCard],
    ['forge-checkbox', forge.ForgeCheckbox],
    ['forge-data-grid', forge.ForgeDataGrid],
    ['forge-date-picker', forge.ForgeDatePicker],
    ['forge-dropdown', forge.ForgeDropdown],
    ['forge-form-field', forge.ForgeFormField],
    ['forge-icon', forge.ForgeIcon],
    ['forge-input', forge.ForgeInput],
    ['forge-modal', forge.ForgeModal],
    ['forge-multi-select', forge.ForgeMultiSelect],
    ['forge-progress', forge.ForgeProgress],
    ['forge-progress-circle', forge.ForgeProgressCircle],
    ['forge-radio-group', forge.ForgeRadioGroup],
    ['forge-select', forge.ForgeSelect],
    ['forge-skeleton', forge.ForgeSkeleton],
    ['forge-switch', forge.ForgeSwitch],
    ['forge-toast', forge.ForgeToast],
    ['forge-toast-container', forge.ForgeToastContainer],
    // Optional: performance dashboard (may be undefined if not exported)
    ['forge-performance-dashboard', (forge as any).ForgePerformanceDashboard],
  ] as const;

  components.forEach(([name, component]) => {
    if (!customElements.get(name) && component) {
      customElements.define(name, component);
      console.log('[Forge] Registered:', name);
    } else if (customElements.get(name)) {
      console.log('[Forge] Already registered:', name);
    } else {
      console.warn('[Forge] Component class not found:', name);
    }
  });

  console.log('[Forge] Registration complete!');

  // Debug: Check if components are actually defined
  setTimeout(() => {
    console.log('[Forge] Component check:');
    console.log('  forge-button:', customElements.get('forge-button'));
    console.log('  forge-card:', customElements.get('forge-card'));
    console.log('  forge-badge:', customElements.get('forge-badge'));

    // Check if any web components exist in DOM
    const buttons = document.querySelectorAll('forge-button');
    const cards = document.querySelectorAll('forge-card');
    console.log('[Forge] DOM check:');
    console.log('  forge-button elements:', buttons.length);
    console.log('  forge-card elements:', cards.length);
    if (buttons.length > 0) {
      console.log('  First button:', buttons[0]);
      console.log('  Has shadowRoot?', !!buttons[0].shadowRoot);
      console.log('  Computed display:', window.getComputedStyle(buttons[0]).display);
      console.log('  Computed visibility:', window.getComputedStyle(buttons[0]).visibility);
      console.log('  Parent element:', buttons[0].parentElement);

      // Check if there are also regular button elements (fallbacks)
      const regularButtons = document.querySelectorAll('button[data-forge-component]');
      console.log('  Fallback button elements:', regularButtons.length);
      if (regularButtons.length > 0) {
        console.log('  First fallback button:', regularButtons[0]);
        console.log('  Fallback display:', window.getComputedStyle(regularButtons[0]).display);
      }
    }
  }, 2000);

  // Register custom icons
  if (forge.ForgeIcon) {
    forge.ForgeIcon.registerIcons({
      'github': '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>',
      'components': '<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/>',
      'dashboard': '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
      'shopping-cart': '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>',
      'users': '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
      'trello': '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><rect x="7" y="7" width="3" height="9"/><rect x="14" y="7" width="3" height="5"/>',
      'settings': '<circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"/>',
      'palette': '<circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>',
      'sparkles': '<path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/><path d="M19 12l.75 2.25L22 15l-2.25.75L19 18l-.75-2.25L16 15l2.25-.75L19 12z"/><path d="M19 3l.375 1.125L21 4.5l-1.625.375L19 6l-.375-1.125L17 4.5l1.625-.375L19 3z"/>',
      'zap': '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
      'edit': '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>',
      'bell': '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
      'layout': '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>',
    });
  }

  return forge;
}
